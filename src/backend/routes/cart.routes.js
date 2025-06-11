import { Router } from 'express'

/**
 * Manejador de rutas relacionadas con el carrito de compras
 * @type {import('express').Router}
 */
const cartRouter = new Router()

// Importación de dependencias
import CartModel from '../models/cart.model.js'
import CartController from '../controllers/cart.controller.js'

/**
 * Instancia del controlador del carrito
 * @type {import('../controllers/cart.controller')}
 */
const cartController = new CartController({ cartModel: CartModel })

/**
 * Envuelve las funciones asíncronas para manejar errores de manera centralizada
 * @param {Function} fn - Función controladora asíncrona
 * @returns {Function} Función middleware que maneja promesas
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

/**
 * @route GET /:userId
 * @desc Obtiene el carrito de un usuario
 * @access Privado (usuario autenticado)
 * @param {string} req.params.userId - ID del usuario
 * @returns {Object} Contenido del carrito con sus ítems
 */
cartRouter.get('/:userId', asyncHandler(async (req, res) => {
    await cartController.getUserCart(req, res)
}))

/**
 * @route POST /:userId/items
 * @desc Añade un ítem al carrito
 * @access Privado (usuario autenticado)
 * @param {string} req.params.userId - ID del usuario
 * @param {string} req.body.itemType - Tipo de ítem (flight, hotel, package)
 * @param {string} req.body.itemId - ID del ítem a añadir
 * @param {number} [req.body.quantity=1] - Cantidad (opcional, por defecto 1)
 * @param {Object} [req.body.options] - Opciones adicionales del ítem
 * @returns {Object} Carrito actualizado con el nuevo ítem
 */
cartRouter.post('/:userId/items', asyncHandler(async (req, res) => {
    await cartController.addItemToCart(req, res)
}))

/**
 * @route PATCH /:userId/items/:itemId
 * @desc Actualiza la cantidad de un ítem en el carrito
 * @access Privado (usuario autenticado)
 * @param {string} req.params.userId - ID del usuario
 * @param {string} req.params.itemId - ID del ítem en el carrito
 * @param {number} req.body.quantity - Nueva cantidad del ítem
 * @returns {Object} Carrito actualizado
 */
cartRouter.patch('/:userId/items/:itemId', asyncHandler(async (req, res) => {
    await cartController.updateCartItem(req, res)
}))

/**
 * @route DELETE /:userId/items/:itemId
 * @desc Elimina un ítem del carrito
 * @access Privado (usuario autenticado)
 * @param {string} req.params.userId - ID del usuario
 * @param {string} req.params.itemId - ID del ítem a eliminar
 * @returns {Object} Carrito actualizado sin el ítem eliminado
 */
cartRouter.delete('/:userId/items/:itemId', asyncHandler(async (req, res) => {
    await cartController.removeItemFromCart(req, res)
}))

/**
 * @route DELETE /:userId
 * @desc Vacía el carrito de un usuario
 * @access Privado (usuario autenticado)
 * @param {string} req.params.userId - ID del usuario
 * @returns {Object} Mensaje de confirmación
 */
cartRouter.delete('/:userId', asyncHandler(async (req, res) => {
    await cartController.clearCart(req, res)
}))

/**
 * Middleware para manejo centralizado de errores
 * @param {Error} err - Objeto de error
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} res - Objeto de respuesta de Express
 * @param {Function} next - Función para pasar al siguiente middleware
 */
cartRouter.use((err, req, res, next) => {
    console.error('Error en ruta de carrito:', err.stack)
    res.status(500).json({ 
        success: false,
        error: err.message || 'Error interno del servidor' 
    })
})

export default cartRouter
