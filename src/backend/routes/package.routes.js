import { Router } from 'express'

/**
 * Manejador de rutas relacionadas con los paquetes de viaje
 * @type {import('express').Router}
 */
const packageRouter = new Router()

// Importación de dependencias
import PackageModel from '../models/package.model.js'
import PackageController from '../controllers/package.controller.js'

/**
 * Instancia del controlador de paquetes
 * @type {import('../controllers/package.controller')}
 */
const packageController = new PackageController({ packageModel: PackageModel })

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
 * @desc Obtiene todos los paquetes disponibles
 * @access Público
 * @returns {Array<Object>} Lista de paquetes con sus detalles
 */
packageRouter.get('/', asyncHandler(async (req, res) => {
    await packageController.getAllPackages(req, res)
}))

/**
 * @route GET /search
 * @desc Busca paquetes según criterios específicos
 * @access Público
 * @param {string} [req.query.destination] - Ciudad o aeropuerto de destino
 * @param {string} [req.query.check_in] - Fecha de entrada (YYYY-MM-DD)
 * @param {string} [req.query.check_out] - Fecha de salida (YYYY-MM-DD)
 * @param {number} [req.query.guests] - Número de huéspedes
 * @param {number} [req.query.min_price] - Precio mínimo
 * @param {number} [req.query.max_price] - Precio máximo
 * @returns {Array<Object>} Lista de paquetes que coinciden con los criterios
 */
packageRouter.get('/search', asyncHandler(async (req, res) => {
    await packageController.searchPackages(req, res)
}))

/**
 * @route GET /:id
 * @desc Obtiene un paquete por su ID
 * @access Público
 * @param {string} req.params.id - ID del paquete
 * @returns {Object} Detalles completos del paquete
 */
packageRouter.get('/:id', asyncHandler(async (req, res) => {
    await packageController.getPackageById(req, res)
}))

/**
 * @route POST /
 * @desc Crea un nuevo paquete de viaje
 * @access Privado (solo administradores)
 * @param {string} req.body.name - Nombre del paquete
 * @param {string} req.body.description - Descripción detallada
 * @param {number} req.body.hotel_id - ID del hotel incluido
 * @param {number} req.body.flight_go_id - ID del vuelo de ida
 * @param {number} [req.body.flight_back_id] - ID del vuelo de vuelta (opcional)
 * @param {number} req.body.nights - Número de noches
 * @param {number} req.body.total_price - Precio total del paquete
 * @param {number} [req.body.discount=0] - Descuento aplicado
 * @param {number} req.body.max_people - Máximo de personas
 * @param {boolean} [req.body.is_available=true] - Disponibilidad del paquete
 * @returns {Object} Detalles del paquete creado
 */
packageRouter.post('/', asyncHandler(async (req, res) => {
    await packageController.createPackage(req, res)
}))

/**
 * @route PUT /:id
 * @desc Actualiza un paquete existente
 * @access Privado (solo administradores)
 * @param {string} req.params.id - ID del paquete a actualizar
 * @param {Object} req.body - Campos a actualizar
 * @returns {Object} Paquete actualizado
 */
packageRouter.put('/:id', asyncHandler(async (req, res) => {
    await packageController.updatePackage(req, res)
}))

/**
 * @route DELETE /:id
 * @desc Elimina un paquete
 * @access Privado (solo administradores)
 * @param {string} req.params.id - ID del paquete a eliminar
 * @returns {Object} Mensaje de confirmación
 */
packageRouter.delete('/:id', asyncHandler(async (req, res) => {
    await packageController.deletePackage(req, res)
}))

/**
 * Middleware para manejo centralizado de errores
 * @param {Error} err - Objeto de error
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} res - Objeto de respuesta de Express
 * @param {Function} next - Función para pasar al siguiente middleware
 */
packageRouter.use((err, req, res, next) => {
    console.error('Error en ruta de paquetes:', err.stack)
    res.status(500).json({ 
        success: false,
        error: err.message || 'Error interno del servidor' 
    })
})

export default packageRouter
