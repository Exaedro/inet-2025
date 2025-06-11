import { query } from '../database.js'
import ClientError from '../utils/clientError.js'

class CartModel {
    static async getByUserId(userId) {
        const [cart] = await query('SELECT * FROM cart WHERE user_id = ?', [userId])
        if (!cart) throw new ClientError('Cart not found', 404)
        return cart
    }

    static async create(userId) {
        const { insertId } = await query(
            'INSERT INTO cart (user_id) VALUES (?)',
            [userId]
        )
        return { id: insertId, user_id: userId }
    }

    static async getOrCreateCart(userId) {
        try {
            return await this.getByUserId(userId)
        } catch (error) {
            if (error.statusCode === 404) {
                return await this.create(userId)
            }
            throw error
        }
    }

    static async getCartWithItems(userId) {
        const [cart] = await query(
            `SELECT c.*, 
                    ci.id as item_id, ci.type_item, ci.item_id as related_item_id, ci.amount
             FROM cart c
             LEFT JOIN cart_items ci ON c.id = ci.cart_id
             WHERE c.user_id = ?`,
            [userId]
        )
        if (!cart) throw new ClientError('Cart not found', 404)
        return cart
    }
}

export default CartModel
