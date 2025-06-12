import { supabase } from '../database.js'
import ClientError from '../utils/clientError.js'

class CartModel {
    static async getByUserId(userId) {
        const { data, error } = await supabase
            .from('cart')
            .select('*')
            .eq('user_id', userId)
            .maybeSingle() 

        if (error) throw new Error(error.message)
        if (!data) throw new ClientError('Cart not found', 404)
        return data
    }

    static async create(userId) {
        const { data: exists, error: existsError } = await supabase
            .from('cart')
            .select('*')
            .eq('user_id', userId)
            .maybeSingle()
        if (existsError) throw new Error(existsError.message)
        if (exists) throw new ClientError('Cart already exists for user', 400)

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
}

export default CartModel
