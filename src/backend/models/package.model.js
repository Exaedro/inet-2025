import { supabase } from '../database.js'
import ClientError from '../utils/clientError.js'

class PackageModel {
    static async getAll() {
        const { data: packages, error } = await supabase
            .from('packages')
            .select(`
            *,
            cities:city_destiny_id (
            id,
            name,
            country,
            hotels (
                id,
                nombre,
                address
            )
            )
        `)

        if (error) throw new Error(error.message)

        return packages.map(pkg => ({
            ...pkg,
            hotel_name: pkg.hotels?.nombre,
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
          city:city_destiny_id (
            id,
            name,
            country,
            hotels (
              id,
              nombre,
              address,
              stars,
              price_per_night,
              available_rooms
            ),
            flights (
              id,
              out_date,
              back_date,
              origin:origin_id (id, name),
              airline:airline_id (id, name),
              class,
              duration,
              price
            )
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

    static async search({ destination, min_price, max_price }) {
        let query = supabase
            .from('packages')
            .select(`
            *,
            city_destiny:city_destiny_id (id, name, country)
        `);

        const { data: packages, error } = await query;
        if (error) throw new Error(error.message);

        // Filtro manual (cliente) por destino
        const filtered = packages.filter(pkg => {
            const name = pkg.city_destiny?.name?.toLowerCase() || '';
            const country = pkg.city_destiny?.country?.toLowerCase() || '';
            const search = destination?.toLowerCase() || '';
            return name.includes(search) || country.includes(search);
        });

        // Agrega precios si es necesario
        const finalResult = filtered
            .filter(pkg => {
                if (min_price && pkg.total_price < min_price) return false;
                if (max_price && pkg.total_price > max_price) return false;
                return true;
            })
            .map(pkg => ({
                ...pkg,
            }));

        return finalResult;
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
}

export default PackageModel
