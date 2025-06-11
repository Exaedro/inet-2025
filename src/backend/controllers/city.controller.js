import ClientError from '../utils/clientError.js'

class CityController {
    constructor({ cityModel }) {
        this.cityModel = cityModel
    }

    async getAllCities(req, res) {
        try {
            const cities = await this.cityModel.getAll()
            res.json({ success: true, data: cities })
        } catch (error) {
            console.error('Error getting cities:', error)
            res.status(500).json({ success: false, message: 'Error retrieving cities' })
        }
    }

    async getCityById(req, res) {
        try {
            const city = await this.cityModel.getById(Number(req.params.id))
            res.json({ success: true, data: city })
        } catch (error) {
            console.error('Error getting city:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error retrieving city' 
            })
        }
    }

    async createCity(req, res) {
        try {
            const { name, country } = req.body
            
            if (!name || !country) {
                throw new ClientError('Name and country are required', 400)
            }
            
            const newCity = await this.cityModel.create({ name, country })
            res.status(201).json({ 
                success: true, 
                message: 'City created successfully',
                data: newCity 
            })
        } catch (error) {
            console.error('Error creating city:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error creating city' 
            })
        }
    }

    async updateCity(req, res) {
        try {
            const { name, country } = req.body
            
            if (!name || !country) {
                throw new ClientError('Name and country are required', 400)
            }
            
            const updatedCity = await this.cityModel.update(
                Number(req.params.id), 
                { name, country }
            )
            
            res.json({ 
                success: true, 
                message: 'City updated successfully',
                data: updatedCity 
            })
        } catch (error) {
            console.error('Error updating city:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error updating city' 
            })
        }
    }

    async deleteCity(req, res) {
        try {
            await this.cityModel.delete(Number(req.params.id))
            res.json({ success: true, message: 'City deleted successfully' })
        } catch (error) {
            console.error('Error deleting city:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error deleting city' 
            })
        }
    }

    async searchCities(req, res) {
        try {
            const { name } = req.query
            if (!name) {
                throw new ClientError('Search query parameter "name" is required', 400)
            }
            
            const cities = await this.cityModel.searchByName(name)
            res.json({ success: true, data: cities })
        } catch (error) {
            console.error('Error searching cities:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error searching cities' 
            })
        }
    }
}

export default CityController
