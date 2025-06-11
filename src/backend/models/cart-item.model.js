import { supabase } from '../database.js'
import ClientError from '../utils/clientError.js'

class CartItemModel {
    static async getById(id) {
        const { data, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('id', id)
            .single()
            
        if (error || !data) throw new ClientError('Cart item not found', 404)
        return data
    }

    static async getByCartId(cartId) {
        const { data, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('cart_id', cartId)
            
        if (error) throw new ClientError('Error fetching cart items', 500)
        return data || []
    }

    static async create({ cart_id, type_item, item_id, amount = 1 }) {
        const { data, error } = await supabase
            .from('cart_items')
            .insert({
                cart_id,
                type_item,
                item_id,
                amount
            })
            .select()
            .single()
            
        if (error) throw new ClientError(`Error creating cart item: ${error.message}`, 500)
        return data
    }

    static async update(id, { amount }) {
        const { data, error } = await supabase
            .from('cart_items')
            .update({ amount })
            .eq('id', id)
            .select()
            .single()
            
        if (error) throw new ClientError(`Error updating cart item: ${error.message}`, 500)
        return data
    }

    static async delete(id) {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', id)
            
        if (error) throw new ClientError(`Error deleting cart item: ${error.message}`, 500)
        return true
    }

    static async deleteByCartId(cartId) {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('cart_id', cartId)
            
        if (error) throw new ClientError(`Error clearing cart: ${error.message}`, 500)
        return true
    }

    static async findExisting(cartId, typeItem, itemId) {
        const { data, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('cart_id', cartId)
            .eq('type_item', typeItem)
            .eq('item_id', itemId)
            .maybeSingle()
            
        if (error) throw new ClientError('Error finding cart item', 500)
        return data
    }
}

export default CartItemModel
