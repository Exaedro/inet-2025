import { Router } from "express";
const orderRouter = Router()

import OrderController from "../controllers/order.controller.js";
import OrderModel from "../models/order.model.js";
const orderController = new OrderController({ orderModel: OrderModel })

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

// Get all orders
orderRouter.get('/', asyncHandler(async (req, res) => {
    await orderController.getAll(req, res)
}))

// Get order by ID
orderRouter.get('/:id', asyncHandler(async (req, res) => {
    await orderController.getById(req, res)
}))

orderRouter.get('/:id/pay', asyncHandler(async (req, res) => {
    await orderController.pay(req, res)
}))

// Create new order
orderRouter.post('/', asyncHandler(async (req, res) => {
    await orderController.create(req, res)
}))

// Update order
orderRouter.put('/:id', asyncHandler(async (req, res) => {
    await orderController.update(req, res)
}))

// Delete order
orderRouter.delete('/:id', asyncHandler(async (req, res) => {
    await orderController.delete(req, res)
}))

// Add order item
orderRouter.post('/:id/order-items', asyncHandler(async (req, res) => {
    await orderController.addOrderItem(req, res)
}))

// Remove order item
orderRouter.delete('/:id/order-items/:orderItemId', asyncHandler(async (req, res) => {
    await orderController.removeOrderItem(req, res)
}))

export default orderRouter
