import { query } from '../database.js'
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
        const rows = await query('SELECT * FROM airports')
        return rows
    }

    /**
     * Obtiene un aeropuerto por su ID
     * @param {number} id - ID del aeropuerto
     * @returns {Promise<Object>} Datos del aeropuerto
     */
    static async getById(id) {
        const [row] = await query('SELECT * FROM airports WHERE id = ?', [id])
        if (!row) {
            throw new ClientError('Airport not found', 404)
        }
        return row
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
        const { insertId } = await query(
            'INSERT INTO airports (name, code, city_id) VALUES (?, ?, ?)',
            [name, code, city_id]
        )
        return { id: insertId, name, code, city_id }
    }

    /**
     * Actualiza un aeropuerto existente
     * @param {number} id - ID del aeropuerto
     * @param {Object} data - Datos a actualizar
     * @returns {Promise<Object>} Resultado de la operación
     */
    static async update(id, { name, code, city_id }) {
        await this.getById(id) // Verificar que existe
        await query(
            'UPDATE airports SET name = ?, code = ?, city_id = ? WHERE id = ?',
            [name, code, city_id, id]
        )
        return { id, name, code, city_id }
    }

    /**
     * Elimina un aeropuerto
     * @param {number} id - ID del aeropuerto a eliminar
     * @returns {Promise<boolean>} True si se eliminó correctamente
     */
    static async delete(id) {
        await this.getById(id) // Verificar que existe
        await query('DELETE FROM airports WHERE id = ?', [id])
        return true
    }

    /**
     * Obtiene aeropuertos por ID de ciudad
     * @param {number} cityId - ID de la ciudad
     * @returns {Promise<Array>} Lista de aeropuertos en la ciudad
     */
    static async getByCityId(cityId) {
        const rows = await query('SELECT * FROM airports WHERE city_id = ?', [cityId])
        return rows
    }
}

export default AirportModel
