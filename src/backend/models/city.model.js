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
        const { data: newCity, error } = await supabase
            .from('cities')
            .insert({ name, country })
            .select()
            .single()
            
        if (error) throw new Error(error.message)
        return newCity
    }

    static async update(id, { name, country }) {
        await this.getById(id)
        
        const { data: updatedCity, error } = await supabase
            .from('cities')
            .update({ 
                name, 
                country
                // No updated_at in schema
            })
            .eq('id', id)
            .select()
            .single()
            
        if (error) throw new Error(error.message)
        return updatedCity
    }

    static async delete(id) {
        await this.getById(id)
        
        const { error } = await supabase
            .from('cities')
            .delete()
            .eq('id', id)
            
        if (error) throw new Error(error.message)
        return true
    }

    static async searchByName(name) {
        const { data: cities, error } = await supabase
            .from('cities')
            .select('*')
            .ilike('name', `%${name}%`)
            .order('name', { ascending: true })
            
        if (error) throw new Error(error.message)
        return cities
    }
}

export default CityModel
