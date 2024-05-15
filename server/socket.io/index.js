import { io } from '../main.js'
import Room from '../models/Room.js'
import authenticateSocket from './auth.js'

let micStates = {} // Store mic states for all users

io.on('connection', async (socket) => {
  console.log('Socket connected:', socket.id)

  const isAuthenticated = await authenticateSocket(socket)

  if (!isAuthenticated) {
    console.log('Unauthorized: Disconnecting socket', socket.id)
    return socket.disconnect('Socket not authenticated')
  }

  console.log('🔥 User Socket Authenticated:', socket.id)
  socket.emit('authorized')

  // Enabling all the other events

  let roomId = null

  // Join Voice Room
  socket.on('room:join', async (id) => {
    if (roomId) {
      socket.leave(roomId)
      socket.to(roomId).emit('user:leave', socket.user)
    }
    console.log(`🔔 ${socket.user.username} (${socket.id}) joined room ${id}`)
    roomId = id
    socket.to(id).emit('user:new', socket.user)
    socket.join(id)

    // If we have a mic state for this user, send it to the room
    if (micStates[socket.user._id]) {
      socket.to(roomId).emit('user:mic', micStates[socket.user._id])
    }

    const room = await Room.findById(roomId)
    if (!room) {
      console.error(`Room ${id} not found`)
      return
    }

    const members = room.members
    for (let member of members) {
      if (member && micStates[member.toString()]) {
        socket.to(roomId).emit('user:mic', member, micStates[member.toString()])
      }
    }
  })

  // Leave Voice Room
  socket.on('room:leave', async (id) => {
    console.log(`🔔 ${socket.user.username} (${socket.id}) left room ${id}`)
    socket.to(id).emit('user:leave', socket.user)
    socket.leave(id)
    roomId = null
  })

  socket.on('room:mic', async (micState) => {
    // Store the user's mic state
    micStates[socket.user._id] = micState

    // Notify other users in the room
    io.to(roomId).emit('user:mic', socket.user._id, micState)
  })

  // Handle incoming audio stream
  socket.on('audioStream', (audioData) => {
    socket.to(roomId).emit('audioStream', audioData, socket.user._id)
  })

  socket.on('disconnect', (reason) => {
    console.log(
      `disconnect ${socket.user.username} (${socket.id}) due to ${reason}`
    )

    // Clean up mic state when a user disconnects
    delete micStates[socket.id]
  })

  socket.on('music', (instrument, key) => {
    socket.to(roomId).emit('music', instrument, key)
  })
})
