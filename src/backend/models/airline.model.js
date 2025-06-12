import { supabase } from '../database.js'
import ClientError from '../utils/clientError.js'

/**
 * Modelo que maneja las operaciones de base de datos relacionadas con aerolíneas
 */
class AirlineModel {
    /**
     * Obtiene todas las aerolíneas
     * @returns {Promise<Array>} Lista de aerolíneas
     */
    static async getAll() {
        const { data: airlines, error } = await supabase
            .from('airlines')
            .select('*')
            .order('name', { ascending: true })
            
        if (error) throw new Error(error.message)
        return airlines
    }

    /**
     * Obtiene una aerolínea por su ID
     * @param {number} id - ID de la aerolínea
     * @returns {Promise<Object>} Datos de la aerolínea
     */
    static async getById(id) {
        const { data: airline, error } = await supabase
            .from('airlines')
            .select('*')
            .eq('id', id)
            .single()
            
        if (error) throw new Error(error.message)
        if (!airline) throw new ClientError('Airline not found', 404)
        return airline
    }

    /**
     * Crea una nueva aerolínea
     * @param {string} name - Nombre de la aerolínea
     * @returns {Promise<Object>} Resultado de la operación
     */
    static async create({ name }) {
        // Validar que no exista la aerolínea
        const { data: exists, error: existsError } = await supabase
            .from('airlines')
            .select('*')
            .eq('name', name)
            .maybeSingle();
        if (existsError) throw new Error('Error checking for duplicates');
        if (exists) throw new ClientError('Airline already exists', 400);

        const { data: newAirline, error } = await supabase
            .from('airlines')
            .insert({ name })
            .select()
            .single()
        if (error) throw new Error(error.message)
        return newAirline
    }

    /**
     * Actualiza una aerolínea existente
     * @param {number} id - ID de la aerolínea
     * @param {string} name - Nuevo nombre de la aerolínea
     * @returns {Promise<Object>} Resultado de la operación
     */
    static async update(id, { name }) {
        // Validar existencia antes de actualizar
        const { data: exists, error: existsError } = await supabase
            .from('airlines')
            .select('*')
            .eq('id', id)
            .maybeSingle();
        if (existsError) throw new Error('Error checking airline existence');
        if (!exists) throw new ClientError('Airline not found', 404);

        const { data: updatedAirline, error } = await supabase
            .from('airlines')
            .update({ 
                name,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single()
        if (error) throw new Error(error.message)
        return updatedAirline
    }

    /**
     * Elimina una aerolínea
     * @param {number} id - ID de la aerolínea a eliminar
     * @returns {Promise<boolean>} true si se eliminó correctamente
     */
    static async delete(id) {
        // Validar existencia antes de eliminar
        const { data: exists, error: existsError } = await supabase
            .from('airlines')
            .select('*')
            .eq('id', id)
            .maybeSingle();
        if (existsError) throw new Error('Error checking airline existence');
        if (!exists) throw new ClientError('Airline not found', 404);

        const { error } = await supabase
            .from('airlines')
            .delete()
            .eq('id', id)
        if (error) throw new Error(error.message)
        return true
    }

    /**
     * Busca aerolíneas por nombre
     * @param {string} name - Nombre o parte del nombre a buscar
     * @returns {Promise<Array>} Lista de aerolíneas que coinciden con la búsqueda
     */
    static async searchByName(name) {
        const { data: airlines, error } = await supabase
            .from('airlines')
            .select('*')
            .ilike('name', `%${name}%`)
            .order('name', { ascending: true })
            
        if (error) throw new Error(error.message)
        return airlines
    }
}

export default AirlineModel
