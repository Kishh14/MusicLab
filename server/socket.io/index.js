import { io } from '../main.js'
import Room from '../models/Room.js'
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

  // Join Voice Room
  socket.on('room:join', async (roomId) => {
    console.log(
      `🔔 ${socket.user.username} (${socket.id}) joined room ${roomId}`
    )
    socket.to(roomId).emit('user:new', socket.user)
    socket.join(roomId)
  })

  // Handle incoming audio stream
  socket.on('audioStream', (audioData) => {
    socket.to('project').emit('audioStream', audioData)
  })

  socket.on('disconnect', (reason) => {
    console.log(
      `disconnect ${socket.user.username} (${socket.id}) due to ${reason}`
    )
  })
})
