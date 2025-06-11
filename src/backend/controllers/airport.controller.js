import ClientError from '../utils/clientError.js'

/**
 * Controlador para manejar las operaciones relacionadas con aeropuertos
 */
class AirportController {
    /**
     * Crea una nueva instancia del controlador de aeropuertos
     * @param {Object} param0 - Objeto de dependencias
     * @param {Object} param0.airportModel - Modelo de aeropuerto para interactuar con la base de datos
     */
    constructor({ airportModel }) {
        this.airportModel = airportModel
    }

    /**
     * Obtiene todos los aeropuertos
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} res - Objeto de respuesta de Express
     */
    async getAllAirports(req, res) {
        try {
            const airports = await this.airportModel.getAll()
            res.json({ success: true, data: airports })
        } catch (error) {
            console.error('Error getting airports:', error)
            res.status(500).json({ 
                success: false, 
                message: 'Error retrieving airports' 
            })
        }
    }

    /**
     * Obtiene un aeropuerto por su ID
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} res - Objeto de respuesta de Express
     */
    async getAirportById(req, res) {
        try {
            const airport = await this.airportModel.getById(Number(req.params.id))
            res.json({ success: true, data: airport })
        } catch (error) {
            console.error('Error getting airport:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error retrieving airport' 
            })
        }
    }

    /**
     * Crea un nuevo aeropuerto
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} res - Objeto de respuesta de Express
     */
    async createAirport(req, res) {
        try {
            const { name, code, city_id } = req.body
            
            if (!name || !code || !city_id) {
                throw new ClientError('Name, code and city_id are required', 400)
            }
            
            const newAirport = await this.airportModel.create({ 
                name, 
                code, 
                city_id: Number(city_id) 
            })
            
            res.status(201).json({ 
                success: true, 
                message: 'Airport created successfully',
                data: newAirport 
            })
        } catch (error) {
            console.error('Error creating airport:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error creating airport' 
            })
        }
    }

    /**
     * Actualiza un aeropuerto existente
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} res - Objeto de respuesta de Express
     */
    async updateAirport(req, res) {
        try {
            const { name, code, city_id } = req.body
            
            if (!name || !code || !city_id) {
                throw new ClientError('Name, code and city_id are required', 400)
            }
            
            const updatedAirport = await this.airportModel.update(
                Number(req.params.id), 
                { name, code, city_id: Number(city_id) }
            )
            
            res.json({ 
                success: true, 
                message: 'Airport updated successfully',
                data: updatedAirport 
            })
        } catch (error) {
            console.error('Error updating airport:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error updating airport' 
            })
        }
    }

    /**
     * Elimina un aeropuerto
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} res - Objeto de respuesta de Express
     */
    async deleteAirport(req, res) {
        try {
            await this.airportModel.delete(Number(req.params.id))
            res.json({ 
                success: true, 
                message: 'Airport deleted successfully' 
            })
        } catch (error) {
            console.error('Error deleting airport:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error deleting airport' 
            })
        }
    }

    /**
     * Obtiene aeropuertos por ID de ciudad
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} res - Objeto de respuesta de Express
     */
    async getAirportsByCityId(req, res) {
        try {
            const airports = await this.airportModel.getByCityId(Number(req.params.cityId))
            res.json({ success: true, data: airports })
        } catch (error) {
            console.error('Error getting airports by city:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error retrieving airports by city' 
            })
        }
    }
}

export default AirportController
