import { supabase } from '../database.js'
import ClientError from '../utils/clientError.js'

class CityModel {
    static async getAll() {
        const { data: cities, error } = await supabase
            .from('cities')
            .select('*')
            .order('name', { ascending: true })

        if (error) throw new Error(error.message)
        return cities
    }

    static async getById(id) {
        // Validaciones
        const { data: exists } = await supabase
            .from('cities')
            .select('*')
            .eq('id', id)
            .single()

        if (!exists) throw new ClientError('City not found', 404)


        const { data: city, error } = await supabase
            .from('cities')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw new Error(error.message)
        if (!city) throw new ClientError('City not found', 404)
        return city
    }

    static async create({ name, country }) {
        // Validaciones
        const { data: exists } = await supabase
            .from('cities')
            .select('*')
            .eq('name', name)
            .single()

        if (exists) throw new ClientError('City already exists', 400)


        const { data: newCity, error } = await supabase
            .from('cities')
            .insert({ name, country })
            .select()
            .single()

        if (error) throw new Error(error.message)
        return newCity
    }

    static async update(id, { name, country }) {
        // Validaciones
        const { data: exists } = await supabase
            .from('cities')
            .select('*')
            .eq('id', id)
            .single()

        if (!exists) throw new ClientError('City not found', 404)


        const { data: updatedCity, error } = await supabase
            .from('cities')
            .update({
                name,
                country
            })
            .eq('id', id)
            .select('*')

        if (error) throw new Error(error.message)
        return updatedCity
    }

    static async delete(id) {
        // Validaciones
        const { data: exists } = await supabase
            .from('cities')
            .select('*')
            .eq('id', id)
            .single()

        if (!exists) throw new ClientError('City not found', 404)

        const { error } = await supabase
            .from('cities')
            .delete()
            .eq('id', id)

        if (error) throw new Error(error.message)
        return true
    }

    static async searchByName(name) {
        const { data: cities, error: citiesError } = await supabase
            .from('cities')
            .select('*')
            .or(`name.ilike.%${name}%,country.ilike.%${name}%`)
            .order('name', { ascending: true })

        if (citiesError) throw new Error(`Error searching cities: ${citiesError.message}`)
        if (!cities.length) return []

        const cityIds = cities.map(city => city.id)

        const { data: flights, error: flightsError } = await supabase
            .from('flights')
            .select(`
            id, price, class, duration, out_date, back_date, available_seats,
            origin:origin_id (
                id, name, code,
                city:city_id (
                    id, name, country
                )
            ),
            destination:destiny_id (
                id, name, code,
                city:city_id (
                    id, name, country
                )
            ),
            airline:airline_id (
                id, name
            )
        `)

        if (flightsError) throw new Error(`Error searching flights: ${flightsError.message}`)

        const filteredFlights = flights.filter(flight =>
            cityIds.includes(flight.destination?.city?.id)
        )

        return filteredFlights
    }



}

export default CityModel
