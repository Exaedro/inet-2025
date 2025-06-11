import { Router } from 'express'

/**
 * Manejador de rutas relacionadas con aerolíneas
 * @type {import('express').Router}
 */
const airlineRouter = new Router()

// Importación de dependencias
import AirlineModel from '../models/airline.model.js'
import AirlineController from '../controllers/airline.controller.js'

/**
 * Instancia del controlador de aerolíneas
 * @type {import('../controllers/airline.controller')}
 */
const airlineController = new AirlineController({ airlineModel: AirlineModel })

/**
 * Envuelve las funciones asíncronas para manejar errores de manera centralizada
 * @param {Function} fn - Función controladora asíncrona
 * @returns {Function} Función middleware que maneja promesas
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

/**
 * @route GET /api/airlines
 * @desc Obtiene todas las aerolíneas
 * @access Público
 */
airlineRouter.get('/', asyncHandler(async (req, res) => {
    await airlineController.getAllAirlines(req, res)
}))

/**
 * @route GET /api/airlines/:id
 * @desc Obtiene una aerolínea por su ID
 * @access Público
 */
airlineRouter.get('/:id', asyncHandler(async (req, res) => {
    await airlineController.getAirlineById(req, res)
}))

/**
 * @route POST /api/airlines
 * @desc Crea una nueva aerolínea
 * @access Privado (deberías agregar autenticación)
 */
airlineRouter.post('/', asyncHandler(async (req, res) => {
    await airlineController.createAirline(req, res)
}))

/**
 * @route PUT /api/airlines/:id
 * @desc Actualiza una aerolínea existente
 * @access Privado (deberías agregar autenticación)
 */
airlineRouter.put('/:id', asyncHandler(async (req, res) => {
    await airlineController.updateAirline(req, res)
}))

/**
 * @route DELETE /api/airlines/:id
 * @desc Elimina una aerolínea
 * @access Privado (deberías agregar autenticación)
 */
airlineRouter.delete('/:id', asyncHandler(async (req, res) => {
    await airlineController.deleteAirline(req, res)
}))

export default airlineRouter
