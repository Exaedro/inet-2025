import { Router } from 'express'
import CarModel from '../models/car.model.js'
import CarController from '../controllers/car.controller.js'

const carRouter = new Router()
const carController = new CarController({ carModel: CarModel })

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

// Get all cars
carRouter.get('/', asyncHandler(async (req, res) => {
    await carController.getAllCars(req, res)
}))

// Get available cars
carRouter.get('/available', asyncHandler(async (req, res) => {
    await carController.getAvailableCars(req, res)
}))

// Get cars by city ID
carRouter.get('/city/:cityId', asyncHandler(async (req, res) => {
    await carController.getCarsByCityId(req, res)
}))

// Get car by ID
carRouter.get('/:id', asyncHandler(async (req, res) => {
    await carController.getCarById(req, res)
}))

// Create new car
carRouter.post('/', asyncHandler(async (req, res) => {
    await carController.createCar(req, res)
}))

// Update car
carRouter.put('/:id', asyncHandler(async (req, res) => {
    await carController.updateCar(req, res)
}))

// Delete car
carRouter.delete('/:id', asyncHandler(async (req, res) => {
    await carController.deleteCar(req, res)
}))

export default carRouter
