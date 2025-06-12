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
        // Validate type_item against allowed values
        const allowedTypes = ['flight', 'hotel', 'car', 'package']
        if (!allowedTypes.includes(type_item)) {
            throw new ClientError('Invalid item type', 400)
        }

        // Check if item already exists in cart
        const existingItem = await this.findExisting(cart_id, type_item, item_id)
        if (existingItem) {
            // Update amount if item already exists in cart
            return this.update(existingItem.id, { amount: existingItem.amount + amount })
        }

        // Extra: Validar que no exista otro item igual (unicidad lógica)
        const { data: duplicate, error: dupError } = await supabase
            .from('cart_items')
            .select('*')
            .eq('cart_id', cart_id)
            .eq('type_item', type_item)
            .eq('item_id', item_id)
            .maybeSingle();
        if (dupError) throw new ClientError('Error checking for duplicates', 500);
        if (duplicate) throw new ClientError('Cart item already exists', 400);

        // Create new cart item
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
        // Validar existencia antes de actualizar
        const { data: exists, error: existsError } = await supabase
            .from('cart_items')
            .select('*')
            .eq('id', id)
            .maybeSingle();
        if (existsError) throw new ClientError('Error checking cart item', 500);
        if (!exists) throw new ClientError('Cart item not found', 404);

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
        // Validar existencia antes de eliminar
        const { data: exists, error: existsError } = await supabase
            .from('cart_items')
            .select('*')
            .eq('id', id)
            .maybeSingle();
        if (existsError) throw new ClientError('Error checking cart item', 500);
        if (!exists) throw new ClientError('Cart item not found', 404);

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
