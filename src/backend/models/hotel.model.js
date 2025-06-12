import { supabase } from '../database.js'
import ClientError from '../utils/clientError.js'

class HotelModel {
    static async getAll() {
        const { data: hotels, error } = await supabase
            .from('hotels')
            .select(`
                id, name, address, stars, price_per_night, available_rooms,
                city:city_id (id, name)
            `)
            .order('name', { ascending: true })
            
        if (error) throw new Error(error.message)
        
        return hotels.map(hotel => ({
            ...hotel,
            city_name: hotel.city?.name
        }))
    }

    static async getById(id) {
        const { data: hotel, error } = await supabase
            .from('hotels')
            .select(`
                id, name, address, stars, price_per_night, available_rooms,
                city:city_id (id, name)
            `)
            .eq('id', id)
            .single()
            
        if (error) throw new Error(error.message)
        if (!hotel) throw new ClientError('Hotel not found', 404)
        
        return {
            ...hotel,
            city_name: hotel.city?.name
        }
    }

    static async search({ city_id, stars, price_per_night, address, available_rooms }) {
        let query = supabase
            .from('hotels')
            .select(`
                id, name, address, stars, price_per_night, available_rooms,
                city:city_id (id, name)
            `)
            
        // Apply filters
        if (city_id) {
            query = query.eq('city_id', city_id)
        }
        if (stars) {
            query = query.gte('stars', stars)
        }
        if (price_per_night) {
            query = query.lte('price_per_night', price_per_night)
        }
        if (address) {
            query = query.ilike('address', `%${address}%`)
        }
        if (available_rooms) {
            query = query.eq('available_rooms', available_rooms)
        }
        
        const { data: hotels, error } = await query
        if (error) throw new Error(error.message)
        
        return hotels.map(hotel => ({
            ...hotel,
            city_name: hotel.city?.name
        }))
    }

    static async create({
        name,
        city_id,
        address,
        stars,
        price_per_night,
        available_rooms
    }) {
        const { data: newHotel, error } = await supabase
            .from('hotels')
            .insert({
                name,
                city_id,
                address,
                stars: Number(stars),
                price_per_night: Number(price_per_night),
                available_rooms: Number(available_rooms)
                // created_at is set automatically by DEFAULT CURRENT_TIMESTAMP in the schema
            })
            .select()
            .single()
            
        if (error) throw new Error(error.message)
        return this.getById(newHotel.id)
    }

    static async update(id, {
        name,
        city_id,
        address,
        stars,
        price_per_night,
        available_rooms
    }) {
        await this.getById(id)
        
        const updateData = {}
        if (name !== undefined) updateData.name = name
        if (city_id !== undefined) updateData.city_id = city_id
        if (address !== undefined) updateData.address = address
        if (stars !== undefined) updateData.stars = Number(stars)
        if (price_per_night !== undefined) updateData.price_per_night = Number(price_per_night)
        if (available_rooms !== undefined) updateData.available_rooms = Number(available_rooms)
        
        const { data: updatedHotel, error } = await supabase
            .from('hotels')
            .update(updateData)
            .eq('id', id)
            .select()
            .single()
            
        if (error) throw new Error(error.message)
        return this.getById(updatedHotel.id)
    }

    static async delete(id) {
        await this.getById(id)
        
        // Delete hotel services first to maintain referential integrity
        const { error: serviceError } = await supabase
            .from('hotel_service')
            .delete()
            .eq('hotel_id', id)
            
        if (serviceError) throw new Error(serviceError.message)
        
        const { error } = await supabase
            .from('hotels')
            .delete()
            .eq('id', id)
            
        if (error) throw new Error(error.message)
        return true
    }

    static async getHotelServices(hotelId) {
        const { data: services, error } = await supabase
            .from('hotel_service')
            .select(`
                service:service_id (id, name)
            `)
            .eq('hotel_id', hotelId)
            
        if (error) throw new Error(error.message)
        
        return services.map(item => item.service)
    }

    static async addHotelService(hotelId, serviceId) {
        const { error } = await supabase
            .from('hotel_service')
            .insert({
                hotel_id: hotelId,
                service_id: serviceId
            })
            
        if (error) throw new Error(error.message)
        return this.getHotelServices(hotelId)
    }

    static async removeHotelService(hotelId, serviceId) {
        const { error } = await supabase
            .from('hotel_service')
            .delete()
            .match({ hotel_id: hotelId, service_id: serviceId })
            
        if (error) throw new Error(error.message)
        return this.getHotelServices(hotelId)
    }
}

export default HotelModel
