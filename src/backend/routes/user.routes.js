import { Router } from 'express'

/**
 * Manejador de rutas relacionadas con la autenticación de usuarios
 * @type {import('express').Router}
 */
const userRouter = new Router()

// Importación de dependencias
import UserModel from '../models/user.model.js'
import UserController from '../controllers/user.controller.js'

/**
 * Instancia del controlador de usuarios
 * @type {import('../controllers/user.controller')}
 */
const userController = new UserController({ userModel: UserModel })

/**
 * Envuelve las funciones asíncronas para manejar errores de manera centralizada
 * @param {Function} fn - Función controladora asíncrona
 * @returns {Function} Función middleware que maneja promesas
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

/**
 * @route POST /register
 * @desc Registra un nuevo usuario
 * @access Público
 * @param {string} req.body.first_name - Nombre del usuario
 * @param {string} req.body.last_name - Apellido del usuario
 * @param {string} req.body.email - Correo electrónico del usuario
 * @param {string} req.body.password - Contraseña del usuario
 */
userRouter.post('/register', asyncHandler(userController.register.bind(userController)))

/**
 * @route POST /login
 * @desc Inicia sesión con un usuario existente
 * @access Público
 * @param {string} req.body.email - Correo electrónico del usuario
 * @param {string} req.body.password - Contraseña del usuario
 */
userRouter.post('/login', asyncHandler(userController.login.bind(userController)))

/**
 * Middleware para manejo centralizado de errores
 * @param {Error} err - Objeto de error
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} res - Objeto de respuesta de Express
 * @param {Function} next - Función para pasar al siguiente middleware
 */
userRouter.use((err, req, res, next) => {
    console.error('Error en ruta de usuario:', err.stack)
    res.status(500).json({ 
        success: false,
        error: err.message || 'Error interno del servidor' 
    })
})

export default userRouter