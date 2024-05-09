import { io } from '../main.js'

import jwt from 'jsonwebtoken'
import User from '../models/User.js'

import { JWT_SECRET } from '../constants.js'

/**
 * @param {ReturnType<typeof io.of>} socket
 * @returns {Promise<boolean>}
 */

function authenticateSocket(socket) {
  let isAuthenticated = false
  // Authenticate user
  return new Promise((resolve) => {
    socket.once('authenticate', ({ token }) => {
      if (!token) {
        socket.emit('error', { status: 401, message: 'Token not recieved' })
        return resolve(false)
      }

      jwt.verify(token, JWT_SECRET, async (err, payload) => {
        if (err) {
          socket.emit('error', { status: 403, message: 'Invalid token' })
          return resolve(false)
        }

        const user = await User.findById(payload.userId).select('-password')

        if (!user) {
          socket.emit('error', { status: 404, message: 'User not found' })
          return resolve(false)
        }

        isAuthenticated = true
        socket.user = user
        resolve(true)
      })
    })

    // Auth timeout
    setTimeout(() => {
      if (!isAuthenticated) {
        resolve(false)
      }
    }, 10_000)
  })
}

export default authenticateSocket
