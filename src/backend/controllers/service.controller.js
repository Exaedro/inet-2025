import ClientError from '../utils/clientError.js'

class ServiceController {
    constructor({ serviceModel }) {
        this.serviceModel = serviceModel
    }

    async getAllServices(req, res) {
        try {
            const services = await this.serviceModel.getAll()
            res.json({ success: true, data: services })
        } catch (error) {
            console.error('Error getting services:', error)
            res.status(500).json({ success: false, message: 'Error retrieving services' })
        }
    }

    async getServiceById(req, res) {
        try {
            const service = await this.serviceModel.getById(Number(req.params.id))
            res.json({ success: true, data: service })
        } catch (error) {
            console.error('Error getting service:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error retrieving service' 
            })
        }
    }

    async searchServices(req, res) {
        try {
            const { name } = req.query
            const services = await this.serviceModel.searchByName(name || '')
            res.json({ success: true, data: services })
        } catch (error) {
            console.error('Error searching services:', error)
            res.status(500).json({ 
                success: false, 
                message: 'Error searching services' 
            })
        }
    }

    async createService(req, res) {
        try {
            const { name, description } = req.body
            
            if (!name) {
                throw new ClientError('Name is required', 400)
            }
            
            const newService = await this.serviceModel.create({ 
                name, 
                description: description || null 
            })
            
            res.status(201).json({ 
                success: true, 
                message: 'Service created successfully',
                data: newService 
            })
        } catch (error) {
            console.error('Error creating service:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error creating service' 
            })
        }
    }

    async updateService(req, res) {
        try {
            const { name, description } = req.body
            
            if (!name) {
                throw new ClientError('Name is required', 400)
            }
            
            const updatedService = await this.serviceModel.update(
                Number(req.params.id),
                { name, description: description || null }
            )
            
            res.json({ 
                success: true, 
                message: 'Service updated successfully',
                data: updatedService 
            })
        } catch (error) {
            console.error('Error updating service:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error updating service' 
            })
        }
    }

    async deleteService(req, res) {
        try {
            await this.serviceModel.delete(Number(req.params.id))
            res.json({ success: true, message: 'Service deleted successfully' })
        } catch (error) {
            console.error('Error deleting service:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error deleting service' 
            })
        }
    }

    async getHotelsWithService(req, res) {
        try {
            const hotels = await this.serviceModel.getHotelsWithService(
                Number(req.params.serviceId)
            )
            res.json({ success: true, data: hotels })
        } catch (error) {
            console.error('Error getting hotels with service:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error getting hotels with service' 
            })
        }
    }
}

export default ServiceController
