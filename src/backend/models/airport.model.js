import { supabase } from '../database.js'
import ClientError from '../utils/clientError.js'

/**
 * Modelo que maneja las operaciones de base de datos relacionadas con aeropuertos
 */
class AirportModel {
    /**
     * Obtiene todos los aeropuertos
     * @returns {Promise<Array>} Lista de aeropuertos
     */
    static async getAll() {
        const { data: airports, error } = await supabase
            .from('airports')
            .select('*')
            .order('name', { ascending: true })
            
        if (error) throw new Error(error.message)
        return airports
    }

    /**
     * Obtiene un aeropuerto por su ID
     * @param {number} id - ID del aeropuerto
     * @returns {Promise<Object>} Datos del aeropuerto
     */
    static async getById(id) {
        const { data: airport, error } = await supabase
            .from('airports')
            .select('*')
            .eq('id', id)
            .single()
            
        if (error) throw new Error(error.message)
        if (!airport) throw new ClientError('Airport not found', 404)
        return airport
    }

    /**
     * Crea un nuevo aeropuerto
     * @param {Object} data - Datos del aeropuerto
     * @param {string} data.name - Nombre del aeropuerto
     * @param {string} data.code - Código del aeropuerto
     * @param {number} data.city_id - ID de la ciudad donde se encuentra el aeropuerto
     * @returns {Promise<Object>} Resultado de la operación
     */
    static async create({ name, code, city_id }) {
        const { data: newAirport, error } = await supabase
            .from('airports')
            .insert({
                name,
                code,
                city_id
                // created_at is set automatically by DEFAULT CURRENT_TIMESTAMP in the schema
            })
            .select()
            .single()
            
        if (error) throw new Error(error.message)
        return newAirport
    }

    /**
     * Actualiza un aeropuerto existente
     * @param {number} id - ID del aeropuerto
     * @param {Object} data - Datos a actualizar
     * @returns {Promise<Object>} Resultado de la operación
     */
    static async update(id, { name, code, city_id }) {
        await this.getById(id) // Verify it exists
        
        const { data: updatedAirport, error } = await supabase
            .from('airports')
            .update({
                name,
                code,
                city_id
                // No updated_at field in the schema
            })
            .eq('id', id)
            .select()
            .single()
            
        if (error) throw new Error(error.message)
        return updatedAirport
    }

    /**
     * Elimina un aeropuerto
     * @param {number} id - ID del aeropuerto a eliminar
     * @returns {Promise<boolean>} True si se eliminó correctamente
     */
    static async delete(id) {
        await this.getById(id) // Verificar que existe
        
        const { error } = await supabase
            .from('airports')
            .delete()
            .eq('id', id)
            
        if (error) throw new Error(error.message)
        return true
    }

    /**
     * Obtiene aeropuertos por ID de ciudad
     * @param {number} cityId - ID de la ciudad
     * @returns {Promise<Array>} Lista de aeropuertos en la ciudad
     */
    static async getByCityId(cityId) {
        const { data: airports, error } = await supabase
            .from('airports')
            .select('*')
            .eq('city_id', cityId)
            .order('name', { ascending: true })
            
        if (error) throw new Error(error.message)
        return airports
    }
}

export default AirportModel
