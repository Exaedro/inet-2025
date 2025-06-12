import { Router } from 'express'

/**
 * Manejador de rutas relacionadas con hoteles
 * @type {import('express').Router}
 */
const hotelRouter = new Router()

// Importación de dependencias
import HotelModel from '../models/hotel.model.js'
import HotelController from '../controllers/hotel.controller.js'

/**
 * Instancia del controlador de hoteles
 * @type {import('../controllers/hotel.controller')}
 */
const hotelController = new HotelController({ hotelModel: HotelModel })

/**
 * Envuelve las funciones asíncronas para manejar errores de manera centralizada
 * @param {Function} fn - Función controladora asíncrona
 * @returns {Function} Función middleware que maneja promesas
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

/**
 * @route GET /
 * @desc Obtiene todos los hoteles disponibles
 * @access Público
 * @returns {Array<Object>} Lista de hoteles con sus detalles
 */
hotelRouter.get('/', asyncHandler(async (req, res) => {
    await hotelController.getAllHotels(req, res)
}))

/**
 * @route GET /search
 * @desc Busca hoteles según criterios específicos
 * @access Público
 * @param {string} [req.query.city_id] - ID de la ciudad para filtrar
 * @param {number} [req.query.min_stars] - Número mínimo de estrellas
 * @param {number} [req.query.max_price] - Precio máximo por noche
 * @param {string} [req.query.check_in] - Fecha de entrada (YYYY-MM-DD)
 * @param {string} [req.query.check_out] - Fecha de salida (YYYY-MM-DD)
 * @returns {Array<Object>} Lista de hoteles que coinciden con los criterios
 */
hotelRouter.get('/search', asyncHandler(async (req, res) => {
    await hotelController.searchHotels(req, res)
}))

/**
 * @route GET /:id
 * @desc Obtiene un hotel por su ID
 * @access Público
 * @param {string} req.params.id - ID del hotel
 * @returns {Object} Detalles completos del hotel
 */
hotelRouter.get('/:id', asyncHandler(async (req, res) => {
    await hotelController.getHotelById(req, res)
}))

/**
 * @route POST /
 * @desc Crea un nuevo hotel
 * @access Privado (solo administradores)
 * @param {string} req.body.nombre - Nombre del hotel
 * @param {number} req.body.city_id - ID de la ciudad donde se encuentra
 * @param {string} req.body.address - Dirección del hotel
 * @param {number} req.body.stars - Número de estrellas (1-5)
 * @param {number} req.body.price_per_night - Precio por noche
 * @param {number} req.body.available_rooms - Habitaciones disponibles
 * @returns {Object} Detalles del hotel creado
 */
hotelRouter.post('/', asyncHandler(async (req, res) => {
    await hotelController.createHotel(req, res)
}))

/**
 * @route PUT /:id
 * @desc Actualiza un hotel existente
 * @access Privado (solo administradores)
 * @param {string} req.params.id - ID del hotel a actualizar
 * @param {Object} req.body - Campos a actualizar
 * @returns {Object} Hotel actualizado
 */
hotelRouter.put('/:id', asyncHandler(async (req, res) => {
    await hotelController.updateHotel(req, res)
}))

/**
 * @route DELETE /:id
 * @desc Elimina un hotel
 * @access Privado (solo administradores)
 * @param {string} req.params.id - ID del hotel a eliminar
 * @returns {Object} Mensaje de confirmación
 */
hotelRouter.delete('/:id', asyncHandler(async (req, res) => {
    await hotelController.deleteHotel(req, res)
}))

/**
 * @route GET /:hotelId/services
 * @desc Obtiene los servicios de un hotel
 * @access Público
 * @param {string} req.params.hotelId - ID del hotel
 * @returns {Array<Object>} Lista de servicios del hotel
 */
hotelRouter.get('/:hotelId/services', asyncHandler(async (req, res) => {
    await hotelController.getHotelServices(req, res)
}))

/**
 * @route POST /:hotelId/services
 * @desc Añade un servicio a un hotel
 * @access Privado (solo administradores)
 * @param {string} req.params.hotelId - ID del hotel
 * @param {number} req.body.serviceId - ID del servicio a añadir
 * @returns {Array<Object>} Lista actualizada de servicios del hotel
 */
hotelRouter.post('/:hotelId/services', asyncHandler(async (req, res) => {
    await hotelController.addHotelService(req, res)
}))

/**
 * @route DELETE /:hotelId/services/:serviceId
 * @desc Elimina un servicio de un hotel
 * @access Privado (solo administradores)
 * @param {string} req.params.hotelId - ID del hotel
 * @param {string} req.params.serviceId - ID del servicio a eliminar
 * @returns {Array<Object>} Lista actualizada de servicios del hotel
 */
hotelRouter.delete('/:hotelId/services/:serviceId', asyncHandler(async (req, res) => {
    await hotelController.removeHotelService(req, res)
}))

/**
 * Middleware para manejo centralizado de errores
 * @param {Error} err - Objeto de error
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} res - Objeto de respuesta de Express
 * @param {Function} next - Función para pasar al siguiente middleware
 */
hotelRouter.use((err, req, res, next) => {
    console.error('Error en ruta de hoteles:', err.stack)
    res.status(500).json({ 
        success: false,
        error: err.message || 'Error interno del servidor' 
    })
})

export default hotelRouter
