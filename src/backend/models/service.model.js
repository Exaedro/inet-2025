import { supabase } from '../database.js'
import ClientError from '../utils/clientError.js'

class ServiceModel {
    static async getAll() {
        const { data: services, error } = await supabase
            .from('services')
            .select('*')
            .order('name', { ascending: true })

        if (error) throw new Error(error.message)
        return services
    }

    static async getById(id) {
        const { data: service, error } = await supabase
            .from('services')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw new Error(error.message)
        if (!service) throw new ClientError('Service not found', 404)
        return service
    }

    static async create({ name }) {
        const { data: newService, error } = await supabase
            .from('services')
            .insert({ name })
            .select()
            .single()

        if (error) throw new Error(error.message)
        return newService
    }

    static async update(id, { name }) {
        await this.getById(id)

        const { data: updatedService, error } = await supabase
            .from('services')
            .update({ name })
            .eq('id', id)
            .select()
            .single()

        if (error) throw new Error(error.message)
        return updatedService
    }

    static async delete(id) {
        await this.getById(id)

        // Remove from hotel_service junction table first
        const { error: junctionError } = await supabase
            .from('hotel_service')
            .delete()
            .eq('service_id', id)

        if (junctionError) throw new Error(junctionError.message)

        const { error } = await supabase
            .from('services')
            .delete()
            .eq('id', id)

        if (error) throw new Error(error.message)
        return true
    }

    static async searchByName(name) {
        const { data: services, error } = await supabase
            .from('services')
            .select('*')
            .ilike('name', `%${name}%`)
            .order('name', { ascending: true })

        if (error) throw new Error(error.message)
        return services
    }

    static async getHotelsWithService(serviceId) {
        const { data, error } = await supabase
            .from('hotel_service')
            .select(`
                hotels (
                id,
                nombre,
                city_id,
                address,
                stars,
                price_per_night,
                available_rooms
                )
            `)
            .eq('service_id', serviceId)

        if (error) {
            return console.error('Error al obtener hoteles:', error)
        } 
        
        const hotels = data.map(item => item.hotels)

        if (error) throw new Error(error.message)
        return hotels || []
    }
}

export default ServiceModel
