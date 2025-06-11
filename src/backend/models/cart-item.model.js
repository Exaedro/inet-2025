import { query } from '../database.js'
import ClientError from '../utils/clientError.js'

class CartItemModel {
    static async getById(id) {
        const [row] = await query('SELECT * FROM cart_items WHERE id = ?', [id])
        if (!row) throw new ClientError('Cart item not found', 404)
        return row
    }

    static async getByCartId(cartId) {
        const rows = await query('SELECT * FROM cart_items WHERE cart_id = ?', [cartId])
        return rows
    }

    static async create({ cart_id, type_item, item_id, amount = 1 }) {
        const { insertId } = await query(
            'INSERT INTO cart_items (cart_id, type_item, item_id, amount) VALUES (?, ?, ?, ?)',
            [cart_id, type_item, item_id, amount]
        )
        return { id: insertId, cart_id, type_item, item_id, amount }
    }

    static async update(id, { amount }) {
        await this.getById(id)
        await query(
            'UPDATE cart_items SET amount = ? WHERE id = ?',
            [amount, id]
        )
        return { id, amount }
    }

    static async delete(id) {
        await this.getById(id)
        await query('DELETE FROM cart_items WHERE id = ?', [id])
        return true
    }

    static async deleteByCartId(cartId) {
        await query('DELETE FROM cart_items WHERE cart_id = ?', [cartId])
        return true
    }

    static async findExisting(cartId, typeItem, itemId) {
        const [row] = await query(
            'SELECT * FROM cart_items WHERE cart_id = ? AND type_item = ? AND item_id = ?',
            [cartId, typeItem, itemId]
        )
        return row
    }
}

export default CartItemModel
