import { supabase } from '../database.js'
import ClientError from '../utils/clientError.js'

class CartModel {
    static async getByUserId(userId) {
        const { data, error } = await supabase
            .from('cart')
            .select('*')
            .eq('user_id', userId)
            .single()
            
        if (error || !data) throw new ClientError('Cart not found', 404)
        return data
    }

    static async create(userId) {
        const { data, error } = await supabase
            .from('cart')
            .insert({ user_id: userId })
            .select()
            .single()
            
        if (error) throw new ClientError(`Error creating cart: ${error.message}`, 500)
        return data
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
        const { data: cart, error: cartError } = await supabase
            .from('cart')
            .select('*')
            .eq('user_id', userId)
            .single()
            
        if (cartError || !cart) {
            throw new ClientError('Cart not found', 404)
        }
        
        const { data: items, error: itemsError } = await supabase
            .from('cart_items')
            .select('*')
            .eq('cart_id', cart.id)
            
        if (itemsError) {
            throw new ClientError('Error fetching cart items', 500)
        }
        
        return {
            ...cart,
            items: items || []
        }
    }
}

export default CartModel
