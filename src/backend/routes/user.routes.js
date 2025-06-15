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
 * @route GET /users
 * @desc Devuelve todos los usuarios registrados
 * @access Público
 */
userRouter.get('/', asyncHandler(userController.getAll.bind(userController)))

/**
 * @route GET /users/:id
 * @desc Devuelve un usuario por id
 * @access Público
 * @param {string} req.params.id - Id del usuario
 */
userRouter.get('/:id', asyncHandler(userController.getUserById.bind(userController)))

/**
 * @route GET /users/:email
 * @desc Devuelve un usuario por email
 * @access Público
 * @param {string} req.params.email - Email del usuario
 */
// userRouter.get('/:email', asyncHandler(userController.getUserByEmail.bind(userController)))

/**
 * @route POST /users/:id
 * @desc Crea un nuevo usuario
 * @access Privado
 * @param {string} req.body.first_name - Primer nombre del usuario
 * @param {string} req.body.last_name - Apellido del usuario
 * @param {string} req.body.email - Email del usuario
 * @param {string} req.body.password - Contraseña del usuario
 * @param {string} req.body.phone - Numero de telefono del usuario
 * @param {string} req.body.address - Dirección del usuario
 */
userRouter.post('/', asyncHandler(userController.createUser.bind(userController)))

/**
 * @route DELETE /users/:id
 * @desc Elimina un usuario por id
 * @access Privado
 * @param {string} req.body.first_name - Primer nombre del usuario
 * @param {string} req.body.last_name - Apellido del usuario
 * @param {string} req.body.email - Email del usuario
 * @param {string} req.body.password - Contraseña del usuario
 * @param {string} req.body.phone - Numero de telefono del usuario
 * @param {string} req.body.address - Dirección del usuario
 */
userRouter.delete('/:id', asyncHandler(userController.deleteUser.bind(userController)))

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