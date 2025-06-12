import { supabase } from '../database.js'
import ClientError from '../utils/clientError.js'

class HotelModel {
    static async getAll() {
        const { data: hotels, error } = await supabase
            .from('hotels')
            .select(`
                *,
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
                *,
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

    static async search({ city_id, min_stars, max_price, check_in, check_out }) {
        let query = supabase
            .from('hotels')
            .select(`
                *,
                city:city_id (id, name)
            `)
            
        // Apply filters
        if (city_id) {
            query = query.eq('city_id', city_id)
        }
        if (min_stars) {
            query = query.gte('stars', min_stars)
        }
        if (max_price) {
            query = query.lte('price_per_night', max_price)
        }
        if (check_in && check_out) {
            // This is a simplified availability check
            query = query.gt('available_rooms', 0)
            // Add more complex availability logic here if needed
        }
        
        const { data: hotels, error } = await query
        if (error) throw new Error(error.message)
        
        return hotels.map(hotel => ({
            ...hotel,
            city_name: hotel.city?.name
        }))
    }

    static async create({
        nombre,
        city_id,
        address,
        stars,
        price_per_night,
        available_rooms
    }) {
        const { data: newHotel, error } = await supabase
            .from('hotels')
            .insert({
                nombre,
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
        nombre,
        city_id,
        address,
        stars,
        price_per_night,
        available_rooms
    }) {
        await this.getById(id)
        
        const updateData = {}
        if (nombre !== undefined) updateData.nombre = nombre
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

    static async updateAvailability(id, roomsChange) {
        const { data: hotel, error } = await supabase
            .from('hotels')
            .select('available_rooms')
            .eq('id', id)
            .single()
            
        if (error) throw new Error(error.message)
        
        const newAvailability = hotel.available_rooms + roomsChange
        
        const { data: updatedHotel, error: updateError } = await supabase
            .from('hotels')
            .update({
                available_rooms: newAvailability,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single()
            
        if (updateError) throw new Error(updateError.message)
        return this.getById(id)
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
