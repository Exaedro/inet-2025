import { Router } from 'express'
const userRouter = new Router()

import UserModel from '../models/user.model.js'

import UserController from '../controllers/user.controller.js'
const userController = new UserController({ userModel: UserModel })

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)

export default userRouter