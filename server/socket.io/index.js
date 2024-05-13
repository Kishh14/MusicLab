import { io } from '../main.js'
import authenticateSocket from './auth.js'

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
  })

  // Leave Voice Room
  socket.on('room:leave', async (id) => {
    console.log(`🔔 ${socket.user.username} (${socket.id}) left room ${id}`)
    socket.to(id).emit('user:leave', socket.user)
    socket.leave(id)
    roomId = null
  })

  // Handle incoming audio stream
  socket.on('audioStream', (audioData) => {
    socket.to(roomId).emit('audioStream', audioData, socket.user._id)
  })

  socket.on('disconnect', (reason) => {
    console.log(
      `disconnect ${socket.user.username} (${socket.id}) due to ${reason}`
    )
  })

  socket.on('music', (instrument, key) => {
    socket.to(roomId).emit('music', instrument, key)
  })
})
