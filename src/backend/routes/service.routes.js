import { Router } from 'express'

/**
 * Manejador de rutas relacionadas con servicios de hoteles
 * @type {import('express').Router}
 */
const serviceRouter = new Router()

// Importación de dependencias
import ServiceModel from '../models/service.model.js'
import ServiceController from '../controllers/service.controller.js'

/**
 * Instancia del controlador de servicios
 * @type {import('../controllers/service.controller')}
 */
const serviceController = new ServiceController({ serviceModel: ServiceModel })

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
 * @desc Obtiene todos los servicios disponibles
 * @access Público
 * @returns {Array<Object>} Lista de servicios con sus detalles
 */
serviceRouter.get('/', asyncHandler(async (req, res) => {
    await serviceController.getAllServices(req, res)
}))

/**
 * @route GET /search
 * @desc Busca servicios por nombre
 * @access Público
 * @param {string} req.query.name - Nombre o parte del nombre a buscar
 * @returns {Array<Object>} Lista de servicios que coinciden con la búsqueda
 */
serviceRouter.get('/search', asyncHandler(async (req, res) => {
    await serviceController.searchServices(req, res)
}))

/**
 * @route GET /:id
 * @desc Obtiene un servicio por su ID
 * @access Público
 * @param {string} req.params.id - ID del servicio
 * @returns {Object} Detalles completos del servicio
 */
serviceRouter.get('/:id', asyncHandler(async (req, res) => {
    await serviceController.getServiceById(req, res)
}))

/**
 * @route POST /
 * @desc Crea un nuevo servicio
 * @access Privado (solo administradores)
 * @param {string} req.body.name - Nombre del servicio
 * @param {string} [req.body.description] - Descripción detallada del servicio
 * @returns {Object} Detalles del servicio creado
 */
serviceRouter.post('/', asyncHandler(async (req, res) => {
    await serviceController.createService(req, res)
}))

/**
 * @route PUT /:id
 * @desc Actualiza un servicio existente
 * @access Privado (solo administradores)
 * @param {string} req.params.id - ID del servicio a actualizar
 * @param {string} [req.body.name] - Nuevo nombre del servicio
 * @param {string} [req.body.description] - Nueva descripción del servicio
 * @returns {Object} Servicio actualizado
 */
serviceRouter.put('/:id', asyncHandler(async (req, res) => {
    await serviceController.updateService(req, res)
}))

/**
 * @route DELETE /:id
 * @desc Elimina un servicio
 * @access Privado (solo administradores)
 * @param {string} req.params.id - ID del servicio a eliminar
 * @returns {Object} Mensaje de confirmación
 */
serviceRouter.delete('/:id', asyncHandler(async (req, res) => {
    await serviceController.deleteService(req, res)
}))

/**
 * @route GET /:serviceId/hotels
 * @desc Obtiene los hoteles que ofrecen un servicio específico
 * @access Público
 * @param {string} req.params.serviceId - ID del servicio
 * @returns {Array<Object>} Lista de hoteles que ofrecen el servicio
 */
serviceRouter.get('/:serviceId/hotels', asyncHandler(async (req, res) => {
    await serviceController.getHotelsWithService(req, res)
}))

/**
 * Middleware para manejo centralizado de errores
 * @param {Error} err - Objeto de error
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} res - Objeto de respuesta de Express
 * @param {Function} next - Función para pasar al siguiente middleware
 */
serviceRouter.use((err, req, res, next) => {
    console.error('Error en ruta de servicios:', err.stack)
    res.status(500).json({ 
        success: false,
        error: err.message || 'Error interno del servidor' 
    })
})

export default serviceRouter
