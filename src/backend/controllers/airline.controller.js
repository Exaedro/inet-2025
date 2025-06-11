import ClientError from '../utils/clientError.js'

/**
 * Controlador para manejar las operaciones relacionadas con aerolíneas
 */
class AirlineController {
    /**
     * Crea una nueva instancia del controlador de aerolíneas
     * @param {Object} param0 - Objeto de dependencias
     * @param {Object} param0.airlineModel - Modelo de aerolínea para interactuar con la base de datos
     */
    constructor({ airlineModel }) {
        this.airlineModel = airlineModel
    }

    /**
     * Obtiene todas las aerolíneas
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} res - Objeto de respuesta de Express
     */
    async getAllAirlines(req, res) {
        try {
            const airlines = await this.airlineModel.getAll()
            res.json({ success: true, data: airlines })
        } catch (error) {
            console.error('Error getting airlines:', error)
            res.status(500).json({ 
                success: false, 
                message: 'Error retrieving airlines' 
            })
        }
    }

    /**
     * Obtiene una aerolínea por su ID
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} res - Objeto de respuesta de Express
     */
    async getAirlineById(req, res) {
        try {
            const airline = await this.airlineModel.getById(Number(req.params.id))
            res.json({ success: true, data: airline })
        } catch (error) {
            console.error('Error getting airline:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error retrieving airline' 
            })
        }
    }

    /**
     * Crea una nueva aerolínea
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} res - Objeto de respuesta de Express
     */
    async createAirline(req, res) {
        try {
            const { name } = req.body
            if (!name) {
                throw new ClientError('Name is required', 400)
            }
            
            const newAirline = await this.airlineModel.create({ name })
            res.status(201).json({ 
                success: true, 
                message: 'Airline created successfully',
                data: newAirline 
            })
        } catch (error) {
            console.error('Error creating airline:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error creating airline' 
            })
        }
    }

    /**
     * Actualiza una aerolínea existente
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} res - Objeto de respuesta de Express
     */
    async updateAirline(req, res) {
        try {
            const { name } = req.body
            if (!name) {
                throw new ClientError('Name is required', 400)
            }
            
            const updatedAirline = await this.airlineModel.update(
                Number(req.params.id), 
                { name }
            )
            
            res.json({ 
                success: true, 
                message: 'Airline updated successfully',
                data: updatedAirline 
            })
        } catch (error) {
            console.error('Error updating airline:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error updating airline' 
            })
        }
    }

    /**
     * Elimina una aerolínea
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} res - Objeto de respuesta de Express
     */
    async deleteAirline(req, res) {
        try {
            await this.airlineModel.delete(Number(req.params.id))
            res.json({ 
                success: true, 
                message: 'Airline deleted successfully' 
            })
        } catch (error) {
            console.error('Error deleting airline:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error deleting airline' 
            })
        }
    }
}

export default AirlineController
