import { supabase } from '../database.js'
import ClientError from '../utils/clientError.js'

class PackageModel {
    static async getAll() {
        const { data: packages, error } = await supabase
            .from('packages')
            .select(`
                *,
                hotel:hotel_id (id, nombre),
                flight_go:flight_go_id (
                    id,
                    out_date,
                    destiny:destiny_id (id, name, city:city_id (id, name))
                )
            `)
            
        if (error) throw new Error(error.message)
        
        return packages.map(pkg => ({
            ...pkg,
            hotel_name: pkg.hotel?.nombre,
            flight_out_date: pkg.flight_go?.out_date,
            destination_airport_id: pkg.flight_go?.destiny?.id,
            destination_airport_name: pkg.flight_go?.destiny?.name,
            destination_city_name: pkg.flight_go?.destiny?.city?.name
        }))
    }

    static async getById(id) {
        const { data: pkg, error } = await supabase
            .from('packages')
            .select(`
                *,
                hotel:hotel_id (id, nombre),
                flight_go:flight_go_id (
                    id,
                    out_date,
                    back_date,
                    destiny:destiny_id (id, name, city:city_id (id, name))
                ),
                flight_back:flight_back_id (
                    id,
                    out_date,
                    destiny:destiny_id (id, name, city:city_id (id, name))
                )
            `)
            .eq('id', id)
            .single()
            
        if (error) throw new Error(error.message)
        if (!pkg) throw new ClientError('Package not found', 404)
        
        return {
            ...pkg,
            hotel_name: pkg.hotel?.nombre,
            flight_out_date: pkg.flight_go?.out_date,
            destination_airport_id: pkg.flight_go?.destiny?.id,
            destination_airport_name: pkg.flight_go?.destiny?.name,
            destination_city_name: pkg.flight_go?.destiny?.city?.name,
            flight_back_date: pkg.flight_go?.back_date,
            return_flight_out_date: pkg.flight_back?.out_date,
            origin_airport_id: pkg.flight_back?.destiny?.id,
            origin_airport_name: pkg.flight_back?.destiny?.name,
            origin_city_name: pkg.flight_back?.destiny?.city?.name
        }
    }

    static async search({ destination, check_in, check_out, guests, min_price, max_price }) {
        let query = supabase
            .from('packages')
            .select(`
                *,
                hotel:hotel_id (id, nombre),
                flight_go:flight_go_id (
                    id,
                    out_date,
                    back_date,
                    destiny:destiny_id (id, name, city:city_id (id, name))
                )
            `)
            
        // Apply filters
        if (destination) {
            query = query.or(`flight_go.destiny.name.ilike.%${destination}%,flight_go.destiny.city.name.ilike.%${destination}%`)
        }
        if (check_in) {
            query = query.gte('flight_go.out_date', check_in)
        }
        if (check_out) {
            query = query.or(`flight_back_id.is.null,flight_go.back_date.lte.${check_out}`)
        }
        if (guests) {
            query = query.gte('max_people', Number(guests))
        }
        if (min_price) {
            query = query.gte('total_price', Number(min_price))
        }
        if (max_price) {
            query = query.lte('total_price', Number(max_price))
        }
        
        const { data: packages, error } = await query
        if (error) throw new Error(error.message)
        
        return packages.map(pkg => ({
            ...pkg,
            hotel_name: pkg.hotel?.nombre,
            flight_out_date: pkg.flight_go?.out_date,
            destination_airport_id: pkg.flight_go?.destiny?.id,
            destination_airport_name: pkg.flight_go?.destiny?.name,
            destination_city_name: pkg.flight_go?.destiny?.city?.name
        }))
    }

    static async create({
        name,
        description,
        city_destiny_id,
        total_price,
        includes_flight = false,
        includes_hotel = false,
        includes_car = false
    }) {
        const { data: newPackage, error } = await supabase
            .from('packages')
            .insert({
                name,
                description,
                city_destiny_id,
                total_price: Number(total_price),
                includes_flight: Boolean(includes_flight),
                includes_hotel: Boolean(includes_hotel),
                includes_car: Boolean(includes_car)
            })
            .select()
            .single()
            
        if (error) throw new Error(error.message)
        return this.getById(newPackage.id)
    }

    static async update(id, {
        name,
        description,
        city_destiny_id,
        total_price,
        includes_flight,
        includes_hotel,
        includes_car
    }) {
        await this.getById(id)
        
        const updateData = {}
        if (name !== undefined) updateData.name = name
        if (description !== undefined) updateData.description = description
        if (city_destiny_id !== undefined) updateData.city_destiny_id = city_destiny_id
        if (total_price !== undefined) updateData.total_price = Number(total_price)
        if (includes_flight !== undefined) updateData.includes_flight = Boolean(includes_flight)
        if (includes_hotel !== undefined) updateData.includes_hotel = Boolean(includes_hotel)
        if (includes_car !== undefined) updateData.includes_car = Boolean(includes_car)
        
        const { data: updatedPackage, error } = await supabase
            .from('packages')
            .update(updateData)
            .eq('id', id)
            .select()
            .single()
            
        if (error) throw new Error(error.message)
        return this.getById(updatedPackage.id)
    }

    static async delete(id) {
        await this.getById(id)
        
        const { error } = await supabase
            .from('packages')
            .delete()
            .eq('id', id)
            
        if (error) throw new Error(error.message)
        return true
    }

    static async updateAvailability(id, isAvailable) {
        const { data: updatedPackage, error } = await supabase
            .from('packages')
            .update({
                is_available: isAvailable,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single()
            
        if (error) throw new Error(error.message)
        return updatedPackage
    }
}

export default PackageModel
