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
                city_destiny_id,
                total_price,
                includes_flight,
                includes_hotel,
                includes_car
            } = req.body
            
            // Validate required fields
            if (!name || !city_destiny_id || !total_price || !includes_flight || !includes_hotel || !includes_car) {
                throw new ClientError('Missing required fields', 400)
            }
            
            const newPackage = await this.packageModel.create({
                name,
                description: description || '',
                city_destiny_id: Number(city_destiny_id),
                total_price: Number(total_price),
                includes_flight: Boolean(includes_flight),
                includes_hotel: Boolean(includes_hotel),
                includes_car: Boolean(includes_car)
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
                city_destiny_id,
                total_price,
                includes_flight,
                includes_hotel,
                includes_car
            } = req.body
            
            const updatedPackage = await this.packageModel.update(
                Number(req.params.id),
                {
                    name,
                    description,
                    city_destiny_id: city_destiny_id ? Number(city_destiny_id) : undefined,
                    total_price: total_price ? Number(total_price) : undefined,
                    includes_flight: includes_flight !== undefined ? Boolean(includes_flight) : undefined,
                    includes_hotel: includes_hotel !== undefined ? Boolean(includes_hotel) : undefined,
                    includes_car: includes_car !== undefined ? Boolean(includes_car) : undefined
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
}

export default PackageController
