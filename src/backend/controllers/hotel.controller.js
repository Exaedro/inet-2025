import ClientError from '../utils/clientError.js'

class HotelController {
    constructor({ hotelModel }) {
        this.hotelModel = hotelModel
    }

    async getAllHotels(req, res) {
        try {
            const hotels = await this.hotelModel.getAll()
            res.json({ success: true, data: hotels })
        } catch (error) {
            console.error('Error getting hotels:', error)
            res.status(500).json({ success: false, message: 'Error retrieving hotels' })
        }
    }

    async getHotelById(req, res) {
        try {
            const hotel = await this.hotelModel.getById(Number(req.params.id))
            res.json({ success: true, data: hotel })
        } catch (error) {
            console.error('Error getting hotel:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error retrieving hotel' 
            })
        }
    }

    async searchHotels(req, res) {
        try {
            const { city_id, stars, price_per_night, address, available_rooms } = req.query
            
            const hotels = await this.hotelModel.search({
                city_id: city_id ? Number(city_id) : null,
                stars: stars ? Number(stars) : null,
                price_per_night: price_per_night ? Number(price_per_night) : null,
                address,
                available_rooms
            })
            
            res.json({ success: true, data: hotels })
        } catch (error) {
            console.error('Error searching hotels:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error searching hotels' 
            })
        }
    }

    async createHotel(req, res) {
        try {
            const {
                name,
                city_id,
                address,
                stars,
                price_per_night,
                available_rooms
            } = req.body
            
            // Validate required fields
            if (!name || !city_id || !address || !stars || !price_per_night || available_rooms === undefined) {
                throw new ClientError('All fields are required', 400)
            }
            
            const newHotel = await this.hotelModel.create({
                name,
                city_id: Number(city_id),
                address,
                stars: Number(stars),
                price_per_night: Number(price_per_night),
                available_rooms: Number(available_rooms)
            })
            
            res.status(201).json({ 
                success: true, 
                message: 'Hotel created successfully',
                data: newHotel 
            })
        } catch (error) {
            console.error('Error creating hotel:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error creating hotel' 
            })
        }
    }

    async updateHotel(req, res) {
        try {
            const {
                name,
                city_id,
                address,
                stars,
                price_per_night,
                available_rooms
            } = req.body
            
            // Validate required fields
            if (!name || !city_id || !address || !stars || !price_per_night || available_rooms === undefined) {
                throw new ClientError('All fields are required', 400)
            }
            
            const updatedHotel = await this.hotelModel.update(
                Number(req.params.id),
                {
                    name,
                    city_id: Number(city_id),
                    address,
                    stars: Number(stars),
                    price_per_night: Number(price_per_night),
                    available_rooms: Number(available_rooms)
                }
            )
            
            res.json({ 
                success: true, 
                message: 'Hotel updated successfully',
                data: updatedHotel 
            })
        } catch (error) {
            console.error('Error updating hotel:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error updating hotel' 
            })
        }
    }

    async deleteHotel(req, res) {
        try {
            await this.hotelModel.delete(Number(req.params.id))
            res.json({ success: true, message: 'Hotel deleted successfully' })
        } catch (error) {
            console.error('Error deleting hotel:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error deleting hotel' 
            })
        }
    }

    async getHotelServices(req, res) {
        try {
            const services = await this.hotelModel.getHotelServices(Number(req.params.hotelId))
            res.json({ success: true, data: services })
        } catch (error) {
            console.error('Error getting hotel services:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error getting hotel services' 
            })
        }
    }

    async addHotelService(req, res) {
        try {
            const { serviceId } = req.body
            
            if (!serviceId) {
                throw new ClientError('serviceId is required', 400)
            }
            
            const services = await this.hotelModel.addHotelService(
                Number(req.params.hotelId),
                Number(serviceId)
            )
            
            res.status(201).json({ 
                success: true, 
                message: 'Service added to hotel successfully',
                data: services 
            })
        } catch (error) {
            console.error('Error adding hotel service:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error adding hotel service' 
            })
        }
    }

    async removeHotelService(req, res) {
        try {
            const { serviceId } = req.params
            
            if (!serviceId) {
                throw new ClientError('serviceId is required', 400)
            }
            
            const services = await this.hotelModel.removeHotelService(
                Number(req.params.hotelId),
                Number(serviceId)
            )
            
            res.json({ 
                success: true, 
                message: 'Service removed from hotel successfully',
                data: services 
            })
        } catch (error) {
            console.error('Error removing hotel service:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error removing hotel service' 
            })
        }
    }
}

export default HotelController
