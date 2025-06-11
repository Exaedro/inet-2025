import ClientError from '../utils/clientError.js'

class CartController {
    constructor({ cartModel }) {
        this.cartModel = cartModel
    }

    async getCart(req, res) {
        try {
            const userId = req.user?.id || req.body.user_id
            if (!userId) throw new ClientError('User ID is required', 400)
            
            const cart = await this.cartModel.getCartWithItems(userId)
            res.json({ success: true, data: cart })
        } catch (error) {
            console.error('Error getting cart:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error retrieving cart' 
            })
        }
    }

    async createCart(req, res) {
        try {
            const { user_id } = req.body
            if (!user_id) throw new ClientError('User ID is required', 400)
            
            const cart = await this.cartModel.create(user_id)
            res.status(201).json({ 
                success: true, 
                message: 'Cart created successfully',
                data: cart 
            })
        } catch (error) {
            console.error('Error creating cart:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error creating cart' 
            })
        }
    }

    async getOrCreateCart(req, res) {
        try {
            const userId = req.user?.id || req.body.user_id
            if (!userId) throw new ClientError('User ID is required', 400)
            
            const cart = await this.cartModel.getOrCreateCart(userId)
            res.json({ success: true, data: cart })
        } catch (error) {
            console.error('Error getting or creating cart:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error processing cart' 
            })
        }
    }
}

export default CartController
