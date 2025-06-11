import { Router } from 'express'

/**
 * Manejador de rutas relacionadas con ciudades
 * @type {import('express').Router}
 */
const cityRouter = new Router()

// Importación de dependencias
import CityModel from '../models/city.model.js'
import CityController from '../controllers/city.controller.js'

/**
 * Instancia del controlador de ciudades
 * @type {import('../controllers/city.controller')}
 */
const cityController = new CityController({ cityModel: CityModel })

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
 * @desc Obtiene todas las ciudades disponibles
 * @access Público
 * @returns {Array<Object>} Lista de ciudades con sus detalles
 */
cityRouter.get('/', asyncHandler(async (req, res) => {
    await cityController.getAllCities(req, res)
}))

/**
 * @route GET /search
 * @desc Busca ciudades por nombre
 * @access Público
 * @param {string} req.query.name - Nombre o parte del nombre de la ciudad a buscar
 * @returns {Array<Object>} Lista de ciudades que coinciden con la búsqueda
 */
cityRouter.get('/search', asyncHandler(async (req, res) => {
    await cityController.searchCities(req, res)
}))

/**
 * @route GET /:id
 * @desc Obtiene una ciudad por su ID
 * @access Público
 * @param {string} req.params.id - ID de la ciudad
 * @returns {Object} Detalles completos de la ciudad
 */
cityRouter.get('/:id', asyncHandler(async (req, res) => {
    await cityController.getCityById(req, res)
}))

/**
 * @route POST /
 * @desc Crea una nueva ciudad
 * @access Privado (solo administradores)
 * @param {string} req.body.name - Nombre de la ciudad
 * @param {string} req.body.country - País al que pertenece la ciudad
 * @returns {Object} Detalles de la ciudad creada
 */
cityRouter.post('/', asyncHandler(async (req, res) => {
    await cityController.createCity(req, res)
}))

/**
 * @route PUT /:id
 * @desc Actualiza una ciudad existente
 * @access Privado (solo administradores)
 * @param {string} req.params.id - ID de la ciudad a actualizar
 * @param {string} [req.body.name] - Nuevo nombre de la ciudad
 * @param {string} [req.body.country] - Nuevo país de la ciudad
 * @returns {Object} Ciudad actualizada
 */
cityRouter.put('/:id', asyncHandler(async (req, res) => {
    await cityController.updateCity(req, res)
}))

/**
 * @route DELETE /:id
 * @desc Elimina una ciudad
 * @access Privado (solo administradores)
 * @param {string} req.params.id - ID de la ciudad a eliminar
 * @returns {Object} Mensaje de confirmación
 */
cityRouter.delete('/:id', asyncHandler(async (req, res) => {
    await cityController.deleteCity(req, res)
}))

/**
 * Middleware para manejo centralizado de errores
 * @param {Error} err - Objeto de error
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} res - Objeto de respuesta de Express
 * @param {Function} next - Función para pasar al siguiente middleware
 */
cityRouter.use((err, req, res, next) => {
    console.error('Error en ruta de ciudades:', err.stack)
    res.status(500).json({ 
        success: false,
        error: err.message || 'Error interno del servidor' 
    })
})

export default cityRouter
