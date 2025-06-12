import { supabase } from '../database.js'
import ClientError from '../utils/clientError.js'

class FlightModel {
    static async getAll() {
        const { data: flights, error } = await supabase
            .from('flights')
            .select(`
            *,
            origin:origin_id (
            id,
            name,
            code,
            city:city_id (
                id,
                name,
                country
            )
            ),
            destination:destiny_id (
            id,
            name,
            code,
            city:city_id (
                id,
                name,
                country
            )
            ),
            airline:airline_id (
            id,
            name
            )
        `);

        if (error) throw new Error('Error retrieving flights: ' + error.message);

        return flights.map(flight => ({
            id: flight.id,
            price: flight.price,
            class: flight.class,
            duration: flight.duration,
            out_date: flight.out_date,
            back_date: flight.back_date,
            available_seats: flight.available_seats,

            origin_airport: flight.origin?.name,
            origin_code: flight.origin?.code,
            origin_city: flight.origin?.city?.name,
            origin_country: flight.origin?.city?.country,

            destination_airport: flight.destination?.name,
            destination_code: flight.destination?.code,
            destination_city: flight.destination?.city?.name,
            destination_country: flight.destination?.city?.country,

            airline_name: flight.airline?.name
        }));
    }

    static async getById(id) {
        const { data: flight, error } = await supabase
            .from('flights')
            .select(`
                *,
                origin:origin_id (
                id,
                name,
                code,
                city:city_id (
                    id,
                    name,
                    country
                )
                ),
                destination:destiny_id (
                id,
                name,
                code,
                city:city_id (
                    id,
                    name,
                    country
                )
                ),
                airline:airline_id (
                id,
                name
            )
            `)
            .eq('id', id)
            .single()

        if (error) throw new Error(error.message)
        if (!flight) throw new ClientError('Flight not found', 404)

        return {
            id: flight.id,
            price: flight.price,
            class: flight.class,
            duration: flight.duration,
            out_date: flight.out_date,
            back_date: flight.back_date,
            available_seats: flight.available_seats,

            origin_airport: flight.origin?.name,
            origin_code: flight.origin?.code,
            origin_city: flight.origin?.city?.name,
            origin_country: flight.origin?.city?.country,

            destination_airport: flight.destination?.name,
            destination_code: flight.destination?.code,
            destination_city: flight.destination?.city?.name,
            destination_country: flight.destination?.city?.country,

            airline_name: flight.airline?.name
        }
    }

    static async search({ origin_id, destiny_id, out_date, class: flightClass }) {
        let query = supabase
            .from('flights')
            .select(`
                *,
                origin:origin_id (
                id,
                name,
                code,
                city:city_id (
                    id,
                    name,
                    country
                )
                ),
                destination:destiny_id (
                id,
                name,
                code,
                city:city_id (
                    id,
                    name,
                    country
                )
                ),
                airline:airline_id (
                id,
                name
                )
            `)

        if (origin_id) query = query.eq('origin_id', origin_id)
        if (destiny_id) query = query.eq('destiny_id', destiny_id)
        if (out_date) query = query.eq('out_date', out_date)
        if (flightClass) query = query.eq('class', flightClass)

        const { data: flights, error } = await query
        if (error) throw new Error(error.message)

        return flights.map(flight => ({
            id: flight.id,
            price: flight.price,
            class: flight.class,
            duration: flight.duration,
            out_date: flight.out_date,
            back_date: flight.back_date,
            available_seats: flight.available_seats,

            origin_airport: flight.origin?.name,
            origin_code: flight.origin?.code,
            origin_city: flight.origin?.city?.name,
            origin_country: flight.origin?.city?.country,

            destination_airport: flight.destination?.name,
            destination_code: flight.destination?.code,
            destination_city: flight.destination?.city?.name,
            destination_country: flight.destination?.city?.country,

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
        // Verify flight exists
        const { data } = await supabase
            .from('flights')
            .select()
            .eq('id', id)
            .single()

        if (!data) throw new ClientError('Flight not found', 404)

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
        const { data } = await supabase
            .from('flights')
            .select()
            .eq('id', id)
            .single()

        if (!data) throw new ClientError('Flight not found', 404)

        const { error } = await supabase
            .from('flights')
            .delete()
            .eq('id', id)

        if (error) throw new Error(error.message)

        return true
    }
}

export default FlightModel
