import jwt from 'jsonwebtoken'
import User from '../models/User.js'

import { JWT_SECRET } from '../constants.js'
import { io } from '../main.js'

io.on('connection', async (socket) => {
  console.log('Socket connected:', socket.id)

  socket.auth = false

  // Authenticate user
  await new Promise((resolve) => {
    socket.once('authenticate', ({ token }) => {
      if (!token) {
        return resolve(
          socket.emit('error', { status: 401, message: 'Token not recieved' })
        )
      }

      jwt.verify(token, JWT_SECRET, async (err, payload) => {
        if (err) {
          return resolve(
            socket.emit('error', { status: 403, message: 'Invalid token' })
          )
        }

        const user = await User.findById(payload.userId).select('-password')

        if (!user) {
          return resolve(
            socket.emit('error', { status: 404, message: 'User not found' })
          )
        }

        socket.auth = true
        socket.user = user
        resolve()
      })
    })

    // Auth timeout
    setTimeout(() => {
      if (!socket.auth) {
        resolve()
      }
    }, 10_000)
  })

  if (!socket.auth) {
    console.log('Unauthorized: Disconnecting socket', socket.id)
    return socket.disconnect('unauthorized')
  }

  console.log('🔥 User Socket Authenticated:', socket.id)
  socket.emit('authorized')

  // Enabling all the other events

  // Join Voice Room
  socket.on('room:join', (roomId) => {
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
