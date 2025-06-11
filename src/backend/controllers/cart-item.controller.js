import ClientError from '../utils/clientError.js'

class CartItemController {
    constructor({ cartItemModel, cartModel }) {
        this.cartItemModel = cartItemModel
        this.cartModel = cartModel
    }

    async getCartItem(req, res) {
        try {
            const item = await this.cartItemModel.getById(Number(req.params.id))
            res.json({ success: true, data: item })
        } catch (error) {
            console.error('Error getting cart item:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error retrieving cart item' 
            })
        }
    }

    async getCartItems(req, res) {
        try {
            const cartId = req.params.cartId || req.body.cart_id
            if (!cartId) throw new ClientError('Cart ID is required', 400)
            
            const items = await this.cartItemModel.getByCartId(cartId)
            res.json({ success: true, data: items })
        } catch (error) {
            console.error('Error getting cart items:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error retrieving cart items' 
            })
        }
    }

    async addToCart(req, res) {
        try {
            const { cart_id, type_item, item_id, amount = 1 } = req.body
            
            if (!cart_id || !type_item || !item_id) {
                throw new ClientError('Cart ID, type item, and item ID are required', 400)
            }
            
            // Check if item already exists in cart
            const existingItem = await this.cartItemModel.findExisting(cart_id, type_item, item_id)
            
            let result
            if (existingItem) {
                // Update quantity if item already in cart
                const newAmount = existingItem.amount + (amount || 1)
                result = await this.cartItemModel.update(existingItem.id, { amount: newAmount })
            } else {
                // Add new item to cart
                result = await this.cartItemModel.create({ cart_id, type_item, item_id, amount })
            }
            
            res.status(201).json({ 
                success: true, 
                message: 'Item added to cart successfully',
                data: result 
            })
        } catch (error) {
            console.error('Error adding to cart:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error adding item to cart' 
            })
        }
    }

    async updateCartItem(req, res) {
        try {
            const { amount } = req.body
            
            if (amount === undefined) {
                throw new ClientError('Amount is required', 400)
            }
            
            const result = await this.cartItemModel.update(
                Number(req.params.id), 
                { amount: Number(amount) }
            )
            
            res.json({ 
                success: true, 
                message: 'Cart item updated successfully',
                data: result 
            })
        } catch (error) {
            console.error('Error updating cart item:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error updating cart item' 
            })
        }
    }

    async removeFromCart(req, res) {
        try {
            await this.cartItemModel.delete(Number(req.params.id))
            res.json({ 
                success: true, 
                message: 'Item removed from cart successfully' 
            })
        } catch (error) {
            console.error('Error removing from cart:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error removing item from cart' 
            })
        }
    }

    async clearCart(req, res) {
        try {
            const cartId = req.params.cartId || req.body.cart_id
            if (!cartId) throw new ClientError('Cart ID is required', 400)
            
            await this.cartItemModel.deleteByCartId(cartId)
            res.json({ 
                success: true, 
                message: 'Cart cleared successfully' 
            })
        } catch (error) {
            console.error('Error clearing cart:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error clearing cart' 
            })
        }
    }
}

export default CartItemController
