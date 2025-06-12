import ClientError from '../utils/clientError.js'

class FlightController {
    constructor({ flightModel }) {
        this.flightModel = flightModel
    }

    async getAllFlights(req, res) {
        try {
            const flights = await this.flightModel.getAll()
            res.json({ success: true, data: flights })
        } catch (error) {
            console.error('Error getting flights:', error)
            res.status(500).json({ success: false, message: 'Error retrieving flights' })
        }
    }

    async getFlightById(req, res) {
        try {
            const flight = await this.flightModel.getById(Number(req.params.id))
            res.json({ success: true, data: flight })
        } catch (error) {
            console.error('Error getting flight:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error retrieving flight' 
            })
        }
    }

    async searchFlights(req, res) {
        try {
            const { origin_id, destiny_id, out_date, class: flightClass } = req.query

            const flights = await this.flightModel.search({
                origin_id: Number(origin_id),
                destiny_id: Number(destiny_id),
                out_date,
                class: flightClass
            })
            
            res.json({ success: true, data: flights })
        } catch (error) {
            console.error('Error searching flights:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error searching flights' 
            })
        }
    }

    async createFlight(req, res) {
        try {
            const {
                origin_id,
                destiny_id,
                out_date,
                back_date,
                airline_id,
                price,
                duration,
                class: flightClass,
                available_seats
            } = req.body
            
            // Validate required fields
            Validation.validateCreateFlight(req.body)

            const newFlight = await this.flightModel.create({
                origin_id: Number(origin_id),
                destiny_id: Number(destiny_id),
                out_date,
                back_date,
                airline_id: Number(airline_id),
                price: Number(price),
                duration,
                class: flightClass,
                available_seats: Number(available_seats)
            })
            
            res.status(201).json({ 
                success: true, 
                message: 'Flight created successfully',
                data: newFlight 
            })
        } catch (error) {
            console.error('Error creating flight:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error creating flight' 
            })
        }
    }

    async updateFlight(req, res) {
        try {
            const {
                origin_id,
                destiny_id,
                out_date,
                back_date,
                airline_id,
                price,
                duration,
                class: flightClass,
                available_seats
            } = req.body
            
            // Validate required fields
            if (!origin_id || !destiny_id || !out_date || !airline_id || !price || !duration || !flightClass || available_seats === undefined) {
                throw new ClientError('All fields are required', 400)
            }
            
            const updatedFlight = await this.flightModel.update(
                Number(req.params.id),
                {
                    origin_id: Number(origin_id),
                    destiny_id: Number(destiny_id),
                    out_date,
                    back_date,
                    airline_id: Number(airline_id),
                    price: Number(price),
                    duration,
                    class: flightClass,
                    available_seats: Number(available_seats)
                }
            )
            
            res.json({ 
                success: true, 
                message: 'Flight updated successfully',
                data: updatedFlight 
            })
        } catch (error) {
            console.error('Error updating flight:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error updating flight' 
            })
        }
    }

    async deleteFlight(req, res) {
        try {
            await this.flightModel.delete(Number(req.params.id))
            res.json({ success: true, message: 'Flight deleted successfully' })
        } catch (error) {
            console.error('Error deleting flight:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error deleting flight' 
            })
        }
    }
}

class Validation {
    static validateCreateFlight(data) {
        const { origin_id, destiny_id, out_date, back_date, airline_id, price, duration, class: flightClass, available_seats } = data
        
        if (!origin_id || !destiny_id || !out_date || !airline_id || !price || !duration || !flightClass || available_seats === undefined) {
            throw new ClientError('All fields are required', 400)
        }
        
        if (origin_id == destiny_id) {
            throw new ClientError('Origin and destiny airports cannot be the same', 400)    
        }
    }
}

export default FlightController
