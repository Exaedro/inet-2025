import { Router } from 'express'

/**
 * Manejador de rutas relacionadas con vuelos
 * @type {import('express').Router}
 */
const flightRouter = new Router()

// Importación de dependencias
import FlightModel from '../models/flight.model.js'
import FlightController from '../controllers/flight.controller.js'

/**
 * Instancia del controlador de vuelos
 * @type {import('../controllers/flight.controller')}
 */
const flightController = new FlightController({ flightModel: FlightModel })

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
 * @desc Obtiene todos los vuelos disponibles
 * @access Público
 * @returns {Array<Object>} Lista de vuelos con sus detalles
 */
flightRouter.get('/', asyncHandler(async (req, res) => {
    await flightController.getAllFlights(req, res)
}))

/**
 * @route GET /search
 * @desc Busca vuelos según criterios específicos
 * @access Público
 * @param {string} [req.query.origin_city_id] - ID de la ciudad de origen
 * @param {string} [req.query.destination_city_id] - ID de la ciudad de destino
 * @param {string} [req.query.departure_date] - Fecha de salida (YYYY-MM-DD)
 * @param {string} [req.query.airline_id] - ID de la aerolínea
 * @param {number} [req.query.passengers] - Número de pasajeros (para ver disponibilidad)
 * @returns {Array<Object>} Lista de vuelos que coinciden con los criterios
 */
flightRouter.get('/search', asyncHandler(async (req, res) => {
    await flightController.searchFlights(req, res)
}))

/**
 * @route GET /:id
 * @desc Obtiene un vuelo por su ID
 * @access Público
 * @param {string} req.params.id - ID del vuelo
 * @returns {Object} Detalles completos del vuelo
 */
flightRouter.get('/:id', asyncHandler(async (req, res) => {
    await flightController.getFlightById(req, res)
}))

/**
 * @route POST /
 * @desc Crea un nuevo vuelo
 * @access Privado (solo administradores)
 * @param {string} req.body.airline_id - ID de la aerolínea
 * @param {string} req.body.origin_airport_id - ID del aeropuerto de origen
 * @param {string} req.body.destination_airport_id - ID del aeropuerto de destino
 * @param {string} req.body.departure_time - Hora de salida (ISO 8601)
 * @param {string} req.body.arrival_time - Hora de llegada (ISO 8601)
 * @param {number} req.body.available_seats - Asientos disponibles
 * @param {number} req.body.price - Precio del vuelo
 * @returns {Object} Detalles del vuelo creado
 */
flightRouter.post('/', asyncHandler(async (req, res) => {
    await flightController.createFlight(req, res)
}))

/**
 * @route PUT /:id
 * @desc Actualiza un vuelo existente
 * @access Privado (solo administradores)
 * @param {string} req.params.id - ID del vuelo a actualizar
 * @param {Object} req.body - Campos a actualizar
 * @returns {Object} Vuelo actualizado
 */
flightRouter.put('/:id', asyncHandler(async (req, res) => {
    await flightController.updateFlight(req, res)
}))

/**
 * @route DELETE /:id
 * @desc Elimina un vuelo
 * @access Privado (solo administradores)
 * @param {string} req.params.id - ID del vuelo a eliminar
 * @returns {Object} Mensaje de confirmación
 */
flightRouter.delete('/:id', asyncHandler(async (req, res) => {
    await flightController.deleteFlight(req, res)
}))

/**
 * Middleware para manejo centralizado de errores
 * @param {Error} err - Objeto de error
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} res - Objeto de respuesta de Express
 * @param {Function} next - Función para pasar al siguiente middleware
 */
flightRouter.use((err, req, res, next) => {
    console.error('Error en ruta de vuelos:', err.stack)
    res.status(500).json({ 
        success: false,
        error: err.message || 'Error interno del servidor' 
    })
})

export default flightRouter
