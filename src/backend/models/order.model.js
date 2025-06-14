import { supabase } from '../database.js'

function calculateTotalPrice(orders) {
    if (!orders) return orders;

    const isSingle = !Array.isArray(orders);
    const ordersArray = isSingle ? [orders] : orders;

    const result = ordersArray.map(order => {
        const total_price = order.order_items?.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        ) || 0;

        return { ...order, total_price };
    });

    return isSingle ? result[0] : result;
}


class OrderModel {
    static async getAll() {
        const { data, error } = await supabase
            .from('orders')
            .select('id, created_at, users(id, first_name, last_name, phone, address), order_items(id, order_id, type_item, item_id, quantity, price)')

        if (error) throw new Error(error.message)

        const orders = calculateTotalPrice(data)

        return orders
    }

    static async getById(id) {
        const { data, error } = await supabase
            .from('orders')
            .select('id, created_at, users(id, first_name, last_name, phone, address), order_items(id, order_id, type_item, item_id, quantity, price)')
            .eq('id', id)
            .single()

        if (error) throw new Error(error.message)

        const orders = calculateTotalPrice(data)

        return orders
    }

    static async create(order) {
        const { data, error } = await supabase
            .from('orders')
            .insert([order])
            .select('id, created_at, users(id, first_name, last_name, phone, address), order_items(id, order_id, type_item, item_id, quantity, price)')
            .single()

        if (error) throw new Error(error.message)

        const newOrder = calculateTotalPrice(data)

        return newOrder
    }

    static async update(id, order) {
        const { data, error } = await supabase
            .from('orders')
            .update(order)
            .eq('id', id)
            .select('id, created_at, users(id, first_name, last_name, phone, address), order_items(id, order_id, type_item, item_id, quantity, price)')
            .single()

        if (error) throw new Error(error.message)

        const updatedOrder = calculateTotalPrice(data)

        return updatedOrder
    }

    static async delete(id) {
        const { error } = await supabase
            .from('orders')
            .delete()
            .eq('id', id)

        if (error) throw new Error(error.message)
    }

    static async addOrderItem(id, orderItem) {
        orderItem.order_id = id

        const { data: newOrderItem, error } = await supabase
            .from('order_items')
            .insert([orderItem])
            .select('id, order_id, type_item, item_id, quantity, price')
            .single()

        if (error) throw new Error(error.message)

        return newOrderItem
    }

    static async removeOrderItem(id, orderItemId) {
        const { error } = await supabase
            .from('order_items')
            .delete()
            .eq('id', id)
            .eq('order_id', orderItemId)

        if (error) throw new Error(error.message)
    }
}

export default OrderModel