import { supabase } from '../database.js'
import ClientError from '../utils/clientError.js'

class BrandModel {
    static async getAll() {
        const { data: brands, error } = await supabase
            .from('brands')
            .select('*')
            .order('name', { ascending: true })
            
        if (error) throw new Error(error.message)
        return brands
    }

    static async getById(id) {
        const { data: brand, error } = await supabase
            .from('brands')
            .select('*')
            .eq('id', id)
            .single()
            
        if (error) throw new Error(error.message)
        if (!brand) throw new ClientError('Brand not found', 404)
        return brand
    }

    static async create({ name }) {
        // Validar que no exista la marca
        const { data: exists, error: existsError } = await supabase
            .from('brands')
            .select('*')
            .eq('name', name)
            .maybeSingle();
        if (existsError) throw new Error('Error checking for duplicates');
        if (exists) throw new ClientError('Brand already exists', 400);

        const { data: newBrand, error } = await supabase
            .from('brands')
            .insert({ name })
            .select()
            .single()
        if (error) throw new Error(error.message)
        return newBrand
    }

    static async update(id, { name }) {
        // Validar existencia antes de actualizar
        const { data: exists, error: existsError } = await supabase
            .from('brands')
            .select('*')
            .eq('id', id)
            .maybeSingle();
        if (existsError) throw new Error('Error checking brand existence');
        if (!exists) throw new ClientError('Brand not found', 404);

        const { data: updatedBrand, error } = await supabase
            .from('brands')
            .update({ name })
            .eq('id', id)
            .select()
            .single()
        if (error) throw new Error(error.message)
        return updatedBrand
    }

    static async delete(id) {
        // Validar existencia antes de eliminar
        const { data: exists, error: existsError } = await supabase
            .from('brands')
            .select('*')
            .eq('id', id)
            .maybeSingle();
        if (existsError) throw new Error('Error checking brand existence');
        if (!exists) throw new ClientError('Brand not found', 404);

        const { error } = await supabase
            .from('brands')
            .delete()
            .eq('id', id)
        if (error) throw new Error(error.message)
        return true
    }
}

export default BrandModel
