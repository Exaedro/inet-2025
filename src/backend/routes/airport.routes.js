import { Router } from 'express'

/**
 * Manejador de rutas relacionadas con aeropuertos
 * @type {import('express').Router}
 */
const airportRouter = new Router()

// Importación de dependencias
import AirportModel from '../models/airport.model.js'
import AirportController from '../controllers/airport.controller.js'

/**
 * Instancia del controlador de aeropuertos
 * @type {import('../controllers/airport.controller')}
 */
const airportController = new AirportController({ airportModel: AirportModel })

/**
 * Envuelve las funciones asíncronas para manejar errores de manera centralizada
 * @param {Function} fn - Función controladora asíncrona
 * @returns {Function} Función middleware que maneja promesas
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

/**
 * @route GET /api/airports
 * @desc Obtiene todos los aeropuertos
 * @access Público
 */
airportRouter.get('/', asyncHandler(async (req, res) => {
    await airportController.getAllAirports(req, res)
}))

/**
 * @route GET /api/airports/city/:cityId
 * @desc Obtiene aeropuertos por ID de ciudad
 * @access Público
 */
airportRouter.get('/city/:cityId', asyncHandler(async (req, res) => {
    await airportController.getAirportsByCityId(req, res)
}))

/**
 * @route GET /api/airports/:id
 * @desc Obtiene un aeropuerto por su ID
 * @access Público
 */
airportRouter.get('/:id', asyncHandler(async (req, res) => {
    await airportController.getAirportById(req, res)
}))

/**
 * @route POST /api/airports
 * @desc Crea un nuevo aeropuerto
 * @access Privado (deberías agregar autenticación)
 */
airportRouter.post('/', asyncHandler(async (req, res) => {
    await airportController.createAirport(req, res)
}))

/**
 * @route PUT /api/airports/:id
 * @desc Actualiza un aeropuerto existente
 * @access Privado (deberías agregar autenticación)
 */
airportRouter.put('/:id', asyncHandler(async (req, res) => {
    await airportController.updateAirport(req, res)
}))

/**
 * @route DELETE /api/airports/:id
 * @desc Elimina un aeropuerto
 * @access Privado (deberías agregar autenticación)
 */
airportRouter.delete('/:id', asyncHandler(async (req, res) => {
    await airportController.deleteAirport(req, res)
}))

export default airportRouter
