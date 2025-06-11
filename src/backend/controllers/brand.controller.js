import ClientError from '../utils/clientError.js'

class BrandController {
    constructor({ brandModel }) {
        this.brandModel = brandModel
    }

    async getAllBrands(req, res) {
        try {
            const brands = await this.brandModel.getAll()
            res.json({ success: true, data: brands })
        } catch (error) {
            console.error('Error getting brands:', error)
            res.status(500).json({ success: false, message: 'Error retrieving brands' })
        }
    }

    async getBrandById(req, res) {
        try {
            const brand = await this.brandModel.getById(Number(req.params.id))
            res.json({ success: true, data: brand })
        } catch (error) {
            console.error('Error getting brand:', error)
            const status = error.statusCode || 500
            res.status(status).json({ success: false, message: error.message || 'Error retrieving brand' })
        }
    }

    async createBrand(req, res) {
        try {
            const { name } = req.body
            if (!name) throw new ClientError('Name is required', 400)
            
            const newBrand = await this.brandModel.create({ name })
            res.status(201).json({ 
                success: true, 
                message: 'Brand created successfully',
                data: newBrand 
            })
        } catch (error) {
            console.error('Error creating brand:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error creating brand' 
            })
        }
    }

    async updateBrand(req, res) {
        try {
            const { name } = req.body
            if (!name) throw new ClientError('Name is required', 400)
            
            const updatedBrand = await this.brandModel.update(Number(req.params.id), { name })
            res.json({ 
                success: true, 
                message: 'Brand updated successfully',
                data: updatedBrand 
            })
        } catch (error) {
            console.error('Error updating brand:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error updating brand' 
            })
        }
    }

    async deleteBrand(req, res) {
        try {
            await this.brandModel.delete(Number(req.params.id))
            res.json({ success: true, message: 'Brand deleted successfully' })
        } catch (error) {
            console.error('Error deleting brand:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error deleting brand' 
            })
        }
    }
}

export default BrandController
