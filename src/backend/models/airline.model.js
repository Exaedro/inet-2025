import { query } from '../database.js'
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
        const rows = await query('SELECT * FROM airlines')
        return rows
    }

    /**
     * Obtiene una aerolínea por su ID
     * @param {number} id - ID de la aerolínea
     * @returns {Promise<Object>} Datos de la aerolínea
     */
    static async getById(id) {
        const [row] = await query('SELECT * FROM airlines WHERE id = ?', [id])
        if (!row) {
            throw new ClientError('Airline not found', 404)
        }
        return row
    }

    /**
     * Crea una nueva aerolínea
     * @param {string} name - Nombre de la aerolínea
     * @returns {Promise<Object>} Resultado de la operación
     */
    static async create({ name }) {
        const { insertId } = await query(
            'INSERT INTO airlines (name) VALUES (?)',
            [name]
        )
        return { id: insertId, name }
    }

    /**
     * Actualiza una aerolínea existente
     * @param {number} id - ID de la aerolínea
     * @param {string} name - Nuevo nombre de la aerolínea
     * @returns {Promise<Object>} Resultado de la operación
     */
    static async update(id, { name }) {
        await this.getById(id) // Verificar que existe
        await query(
            'UPDATE airlines SET name = ? WHERE id = ?',
            [name, id]
        )
        return { id, name }
    }

    /**
     * Elimina una aerolínea
     * @param {number} id - ID de la aerolínea a eliminar
     * @returns {Promise<boolean>} true si se eliminó correctamente
     */
    static async delete(id) {
        await this.getById(id) // Verificar que existe
        await query('DELETE FROM airlines WHERE id = ?', [id])
        return true
    }

    /**
     * Busca aerolíneas por nombre
     * @param {string} name - Nombre o parte del nombre a buscar
     * @returns {Promise<Array>} Lista de aerolíneas que coinciden con la búsqueda
     */
    static async searchByName(name) {
        const rows = await query(
            'SELECT * FROM airlines WHERE name LIKE ?',
            [`%${name}%`]
        )
        return rows
    }
}

export default AirlineModel
