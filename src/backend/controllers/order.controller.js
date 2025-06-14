import { submit } from "../config/mercadoPagoClient.js"

class OrderController {
    constructor({ orderModel }) {
        this.orderModel = orderModel
    }

    async getAll(req, res) {
        try {
            const orders = await this.orderModel.getAll()

            res.json({ 
                success: true, 
                data: orders 
            })
        } catch (error) {
            console.error('Error getting orders:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error getting orders' 
            })
        }
    }

    async getById(req, res) {
        try {
            const order = await this.orderModel.getById(Number(req.params.id))

            res.json({ 
                success: true, 
                data: order 
            })
        } catch (error) {
            console.error('Error getting order:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error getting order' 
            })
        }
    }

    async create(req, res) {
        try {
            const newOrder = await this.orderModel.create(req.body)

            res.json({ 
                success: true,
                message: 'order created', 
                data: newOrder
            })
        } catch (error) {
            console.error('Error creating order:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error creating order' 
            })
        }
    }

    async update(req, res) {
        try {
            const updatedOrder = await this.orderModel.update(Number(req.params.id), req.body)

            res.json({ 
                success: true,
                message: 'order updated', 
                data: updatedOrder
            })
        } catch (error) {
            console.error('Error updating order:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error updating order' 
            })
        }
    }

    async delete(req, res) {
        try {
            await this.orderModel.delete(Number(req.params.id))

            res.json({ 
                success: true,
                message: 'order deleted'
            })
        } catch (error) {
            console.error('Error deleting order:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error deleting order' 
            })
        }
    }

    async addOrderItem(req, res) {
        try {
            const newOrderItem = await this.orderModel.addOrderItem(Number(req.params.id), req.body)

            res.json({ 
                success: true,
                message: 'order item added', 
                data: newOrderItem
            })
        } catch (error) {
            console.error('Error adding order item:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error adding order item' 
            })
        }
    }

    async removeOrderItem(req, res) {
        try {
            await this.orderModel.removeOrderItem(Number(req.params.id), Number(req.params.orderItemId))

            res.json({ 
                success: true,
                message: 'order item removed'
            })
        } catch (error) {
            console.error('Error removing order item:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error removing order item' 
            })
        }
    }   

    async pay(req, res) {
        try {
            const data = await this.orderModel.getById(Number(req.params.id))
            
            const order = data.order_items.map(item => ({
                id: item.id,
                title: item.name,
                unit_price: item.price,
                quantity: item.quantity
            }))

            const paymentUrl = await submit(order)
            
            res.redirect(paymentUrl)
        } catch (error) {
            console.error('Error paying order:', error)
            const status = error.statusCode || 500
            res.status(status).json({ 
                success: false, 
                message: error.message || 'Error paying order' 
            })
        }
    }
}

export default OrderController