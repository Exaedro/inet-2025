import ClientError from '../utils/clientError.js'

class PackageController {
    constructor({ packageModel }) {
        this.packageModel = packageModel
    }

    async getAllPackages(req, res) {
        try {
            const packages = await this.packageModel.getAll()
            res.json({ success: true, data: packages })
        } catch (error) {
            console.error('Error getting packages:', error)
            res.status(500).json({ success: false, message: 'Error retrieving packages' })
        }
    }

    async getPackageById(req, res) {
        try {
            const pkg = await this.packageModel.getById(Number(req.params.id))
            res.json({ success: true, data: pkg })
        } catch (error) {
            console.error('Error getting package:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error retrieving package' 
            })
        }
    }

    async searchPackages(req, res) {
        try {
            const { 
                destination, 
                check_in, 
                check_out, 
                guests, 
                min_price, 
                max_price 
            } = req.query

            const packages = await this.packageModel.search({
                destination,
                check_in,
                check_out,
                guests: guests ? Number(guests) : null,
                min_price: min_price ? Number(min_price) : null,
                max_price: max_price ? Number(max_price) : null
            })
            
            res.json({ success: true, data: packages })
        } catch (error) {
            console.error('Error searching packages:', error)
            res.status(500).json({ 
                success: false, 
                message: 'Error searching packages' 
            })
        }
    }

    async createPackage(req, res) {
        try {
            const {
                name,
                description,
                hotel_id,
                flight_go_id,
                flight_back_id,
                nights,
                total_price,
                discount = 0,
                max_people,
                is_available = true
            } = req.body
            
            // Validate required fields
            if (!name || !hotel_id || !flight_go_id || !nights || !total_price || !max_people) {
                throw new ClientError('Missing required fields', 400)
            }
            
            const newPackage = await this.packageModel.create({
                name,
                description: description || '',
                hotel_id: Number(hotel_id),
                flight_go_id: Number(flight_go_id),
                flight_back_id: flight_back_id ? Number(flight_back_id) : null,
                nights: Number(nights),
                total_price: Number(total_price),
                discount: Number(discount),
                max_people: Number(max_people),
                is_available: Boolean(is_available)
            })
            
            res.status(201).json({ 
                success: true, 
                message: 'Package created successfully',
                data: newPackage 
            })
        } catch (error) {
            console.error('Error creating package:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error creating package' 
            })
        }
    }

    async updatePackage(req, res) {
        try {
            const {
                name,
                description,
                hotel_id,
                flight_go_id,
                flight_back_id,
                nights,
                total_price,
                discount,
                max_people,
                is_available
            } = req.body
            
            const updatedPackage = await this.packageModel.update(
                Number(req.params.id),
                {
                    name,
                    description,
                    hotel_id: hotel_id ? Number(hotel_id) : undefined,
                    flight_go_id: flight_go_id ? Number(flight_go_id) : undefined,
                    flight_back_id: flight_back_id !== undefined ? (flight_back_id ? Number(flight_back_id) : null) : undefined,
                    nights: nights ? Number(nights) : undefined,
                    total_price: total_price ? Number(total_price) : undefined,
                    discount: discount !== undefined ? Number(discount) : undefined,
                    max_people: max_people ? Number(max_people) : undefined,
                    is_available: is_available !== undefined ? Boolean(is_available) : undefined
                }
            )
            
            res.json({ 
                success: true, 
                message: 'Package updated successfully',
                data: updatedPackage 
            })
        } catch (error) {
            console.error('Error updating package:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error updating package' 
            })
        }
    }

    async deletePackage(req, res) {
        try {
            await this.packageModel.delete(Number(req.params.id))
            res.json({ success: true, message: 'Package deleted successfully' })
        } catch (error) {
            console.error('Error deleting package:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error deleting package' 
            })
        }
    }

    async updatePackageAvailability(req, res) {
        try {
            const { is_available } = req.body
            
            if (is_available === undefined) {
                throw new ClientError('is_available is required', 400)
            }
            
            const pkg = await this.packageModel.updateAvailability(
                Number(req.params.id),
                Boolean(is_available)
            )
            
            res.json({ 
                success: true, 
                message: 'Package availability updated successfully',
                data: pkg 
            })
        } catch (error) {
            console.error('Error updating package availability:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error updating package availability' 
            })
        }
    }
}

export default PackageController
