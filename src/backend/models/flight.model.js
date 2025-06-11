import { supabase } from '../database.js'
import ClientError from '../utils/clientError.js'

class FlightModel {
    static async getAll() {
        const { data: flights, error } = await supabase
            .from('flights')
            .select(`
                *,
                origin:origin_id (id, name, code),
                destination:destiny_id (id, name, code),
                airline:airline_id (id, name)
            `)
            
        if (error) throw new Error(error.message)
        
        return flights.map(flight => ({
            ...flight,
            origin_name: flight.origin?.name,
            origin_code: flight.origin?.code,
            destination_name: flight.destination?.name,
            destination_code: flight.destination?.code,
            airline_name: flight.airline?.name
        }))
    }

    static async getById(id) {
        const { data: flight, error } = await supabase
            .from('flights')
            .select(`
                *,
                origin:origin_id (id, name, code),
                destination:destiny_id (id, name, code),
                airline:airline_id (id, name)
            `)
            .eq('id', id)
            .single()
            
        if (error) throw new Error(error.message)
        if (!flight) throw new ClientError('Flight not found', 404)
        
        return {
            ...flight,
            origin_name: flight.origin?.name,
            origin_code: flight.origin?.code,
            destination_name: flight.destination?.name,
            destination_code: flight.destination?.code,
            airline_name: flight.airline?.name
        }
    }

    static async search({ origin_id, destiny_id, out_date, class: flightClass }) {
        let query = supabase
            .from('flights')
            .select(`
                *,
                origin:origin_id (id, name, code),
                destination:destiny_id (id, name, code),
                airline:airline_id (id, name)
            `)
            
        if (origin_id) query = query.eq('origin_id', origin_id)
        if (destiny_id) query = query.eq('destiny_id', destiny_id)
        if (out_date) query = query.eq('out_date', out_date)
        if (flightClass) query = query.eq('class', flightClass)
        
        const { data: flights, error } = await query
        if (error) throw new Error(error.message)
        
        return flights.map(flight => ({
            ...flight,
            origin_name: flight.origin?.name,
            origin_code: flight.origin?.code,
            destination_name: flight.destination?.name,
            destination_code: flight.destination?.code,
            airline_name: flight.airline?.name
        }))
    }

    static async create({
        origin_id, 
        destiny_id, 
        out_date, 
        back_date = null, 
        airline_id, 
        price, 
        duration, 
        class: flightClass, 
        available_seats 
    }) {
        const { data: flight, error } = await supabase
            .from('flights')
            .insert({
                origin_id,
                destiny_id,
                out_date,
                back_date,
                airline_id,
                price,
                duration,
                class: flightClass,
                available_seats
            })
            .select()
            .single()
            
        if (error) throw new Error(error.message)
        return this.getById(flight.id)
    }

    static async update(id, {
        origin_id, 
        destiny_id, 
        out_date, 
        back_date = null, 
        airline_id, 
        price, 
        duration, 
        class: flightClass, 
        available_seats 
    }) {
        await this.getById(id)
        
        const { data: flight, error } = await supabase
            .from('flights')
            .update({
                origin_id,
                destiny_id,
                out_date,
                back_date,
                airline_id,
                price,
                duration,
                class: flightClass,
                available_seats
            })
            .eq('id', id)
            .select()
            .single()
            
        if (error) throw new Error(error.message)
        return this.getById(flight.id)
    }

    static async delete(id) {
        // Verify flight exists
        await this.getById(id)
        
        const { error } = await supabase
            .from('flights')
            .delete()
            .eq('id', id)
            
        if (error) throw new Error(error.message)
        
        return true
    }

    static async updateSeats(id, seatsChange) {
        const { data: flight, error } = await supabase
            .from('flights')
            .select('available_seats')
            .eq('id', id)
            .single()
            
        if (error) throw new Error(error.message)
        
        const newSeats = flight.available_seats + seatsChange
        
        const { error: updateError } = await supabase
            .from('flights')
            .update({ 
                available_seats: newSeats,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            
        if (updateError) throw new Error(updateError.message)
        
        return this.getById(id)
    }
}

export default FlightModel
