import { Router } from 'express'
const userRouter = new Router()

import UserModel from '../models/user.model.js'
import UserController from '../controllers/user.controller.js'

// Create controller instance with the UserModel class (not an instance)
const userController = new UserController({ userModel: UserModel })

// Add error handling middleware
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

// Use the controller methods with proper binding
userRouter.post('/register', asyncHandler(userController.register.bind(userController)))
userRouter.post('/login', asyncHandler(userController.login.bind(userController)))

// Error handling middleware
userRouter.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: err.message || 'Something went wrong!' })
})

export default userRouter