import { Router } from 'express'
import CartItemModel from '../models/cart-item.model.js'
import CartModel from '../models/cart.model.js'
import CartItemController from '../controllers/cart-item.controller.js'

const cartItemRouter = new Router()
const cartItemController = new CartItemController({ 
    cartItemModel: CartItemModel,
    cartModel: CartModel
})

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

// Get cart item by ID
cartItemRouter.get('/:id', asyncHandler(async (req, res) => {
    await cartItemController.getCartItem(req, res)
}))

// Get all items in cart
cartItemRouter.get('/cart/:cartId', asyncHandler(async (req, res) => {
    await cartItemController.getCartItems(req, res)
}))

// Add item to cart
cartItemRouter.post('/', asyncHandler(async (req, res) => {
    await cartItemController.addToCart(req, res)
}))

// Update cart item quantity
cartItemRouter.put('/:id', asyncHandler(async (req, res) => {
    await cartItemController.updateCartItem(req, res)
}))

// Remove item from cart
cartItemRouter.delete('/:id', asyncHandler(async (req, res) => {
    await cartItemController.removeFromCart(req, res)
}))

// Clear all items from cart
cartItemRouter.delete('/cart/:cartId/clear', asyncHandler(async (req, res) => {
    await cartItemController.clearCart(req, res)
}))

export default cartItemRouter
