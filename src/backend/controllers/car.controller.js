import ClientError from '../utils/clientError.js'

class CarController {
    constructor({ carModel }) {
        this.carModel = carModel
    }

    async getAllCars(req, res) {
        try {
            const cars = await this.carModel.getAll()
            res.json({ success: true, data: cars })
        } catch (error) {
            console.error('Error getting cars:', error)
            res.status(500).json({ success: false, message: 'Error retrieving cars' })
        }
    }

    async getCarById(req, res) {
        try {
            const car = await this.carModel.getById(Number(req.params.id))
            res.json({ success: true, data: car })
        } catch (error) {
            console.error('Error getting car:', error)
            const status = error.statusCode || 500
            res.status(status).json({ success: false, message: error.message || 'Error retrieving car' })
        }
    }

    async createCar(req, res) {
        try {
            const { brand_id, model, city_id, price_per_day, disponibility } = req.body
            
            if (!brand_id || !model || !city_id || !price_per_day || disponibility === undefined) {
                throw new ClientError('All fields are required', 400)
            }
            
            const newCar = await this.carModel.create({ 
                brand_id: Number(brand_id), 
                model, 
                city_id: Number(city_id),
                price_per_day: Number(price_per_day),
                disponibility: Boolean(disponibility)
            })
            
            res.status(201).json({ 
                success: true, 
                message: 'Car created successfully',
                data: newCar 
            })
        } catch (error) {
            console.error('Error creating car:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error creating car' 
            })
        }
    }

    async updateCar(req, res) {
        try {
            const { brand_id, model, city_id, price_per_day, disponibility } = req.body
            
            if (!brand_id || !model || !city_id || !price_per_day || disponibility === undefined) {
                throw new ClientError('All fields are required', 400)
            }
            
            const updatedCar = await this.carModel.update(
                Number(req.params.id), 
                { 
                    brand_id: Number(brand_id), 
                    model, 
                    city_id: Number(city_id),
                    price_per_day: Number(price_per_day),
                    disponibility: Boolean(disponibility)
                }
            )
            
            res.json({ 
                success: true, 
                message: 'Car updated successfully',
                data: updatedCar 
            })
        } catch (error) {
            console.error('Error updating car:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error updating car' 
            })
        }
    }

    async deleteCar(req, res) {
        try {
            await this.carModel.delete(Number(req.params.id))
            res.json({ success: true, message: 'Car deleted successfully' })
        } catch (error) {
            console.error('Error deleting car:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error deleting car' 
            })
        }
    }

    async getCarsByCityId(req, res) {
        try {
            const cars = await this.carModel.getByCityId(Number(req.params.cityId))
            res.json({ success: true, data: cars })
        } catch (error) {
            console.error('Error getting cars by city:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error retrieving cars by city' 
            })
        }
    }

    async getAvailableCars(req, res) {
        try {
            const cars = await this.carModel.getAvailableCars()
            res.json({ success: true, data: cars })
        } catch (error) {
            console.error('Error getting available cars:', error)
            res.status(500).json({ 
                success: false, 
                message: 'Error retrieving available cars' 
            })
        }
    }
}

export default CarController
