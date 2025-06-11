import { supabase } from '../database.js'
import ClientError from '../utils/clientError.js'

class CarModel {
    static async getAll() {
        const { data: cars, error } = await supabase
            .from('cars')
            .select(`
                *,
                brand:brand_id (id, name),
                city:city_id (id, name)
            `)
            .order('model', { ascending: true })
            
        if (error) throw new Error(error.message)
        
        return cars.map(car => ({
            ...car,
            brand_name: car.brand?.name,
            city_name: car.city?.name
        }))
    }

    static async getById(id) {
        const { data: car, error } = await supabase
            .from('cars')
            .select(`
                *,
                brand:brand_id (id, name),
                city:city_id (id, name)
            `)
            .eq('id', id)
            .single()
            
        if (error) throw new Error(error.message)
        if (!car) throw new ClientError('Car not found', 404)
        
        return {
            ...car,
            brand_name: car.brand?.name,
            city_name: car.city?.name
        }
    }

    static async create({ brand_id, model, city_id, price_per_day, disponibility = true }) {
        const { data: newCar, error } = await supabase
            .from('cars')
            .insert({
                brand_id,
                model,
                city_id,
                price_per_day,
                disponibility
            })
            .select()
            .single()
            
        if (error) throw new Error(error.message)
        return this.getById(newCar.id)
    }

    static async update(id, { brand_id, model, city_id, price_per_day, disponibility }) {
        await this.getById(id)
        
        const { data: updatedCar, error } = await supabase
            .from('cars')
            .update({
                brand_id,
                model,
                city_id,
                price_per_day,
                disponibility
            })
            .eq('id', id)
            .select()
            .single()
            
        if (error) throw new Error(error.message)
        return this.getById(updatedCar.id)
    }

    static async delete(id) {
        await this.getById(id)
        
        const { error } = await supabase
            .from('cars')
            .delete()
            .eq('id', id)
            
        if (error) throw new Error(error.message)
        return true
    }

    static async getByCityId(cityId) {
        const { data: cars, error } = await supabase
            .from('cars')
            .select('*')
            .eq('city_id', cityId)
            .order('model', { ascending: true })
            
        if (error) throw new Error(error.message)
        return cars
    }

    static async getAvailableCars() {
        const { data: cars, error } = await supabase
            .from('cars')
            .select('*')
            .eq('disponibility', true)
            .order('model', { ascending: true })
            
        if (error) throw new Error(error.message)
        return cars
    }
}

export default CarModel
