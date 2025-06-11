import { Router } from 'express'
import BrandModel from '../models/brand.model.js'
import BrandController from '../controllers/brand.controller.js'

const brandRouter = new Router()
const brandController = new BrandController({ brandModel: BrandModel })

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

// Get all brands
brandRouter.get('/', asyncHandler(async (req, res) => {
    await brandController.getAllBrands(req, res)
}))

// Get brand by ID
brandRouter.get('/:id', asyncHandler(async (req, res) => {
    await brandController.getBrandById(req, res)
}))

// Create new brand
brandRouter.post('/', asyncHandler(async (req, res) => {
    await brandController.createBrand(req, res)
}))

// Update brand
brandRouter.put('/:id', asyncHandler(async (req, res) => {
    await brandController.updateBrand(req, res)
}))

// Delete brand
brandRouter.delete('/:id', asyncHandler(async (req, res) => {
    await brandController.deleteBrand(req, res)
}))

export default brandRouter
