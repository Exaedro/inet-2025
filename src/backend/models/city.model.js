import { query } from '../database.js'
import ClientError from '../utils/clientError.js'

class CityModel {
    static async getAll() {
        const rows = await query('SELECT * FROM cities')
        return rows
    }

    static async getById(id) {
        const [row] = await query('SELECT * FROM cities WHERE id = ?', [id])
        if (!row) throw new ClientError('City not found', 404)
        return row
    }

    static async create({ name, country }) {
        const { insertId } = await query(
            'INSERT INTO cities (name, country) VALUES (?, ?)',
            [name, country]
        )
        return { id: insertId, name, country }
    }

    static async update(id, { name, country }) {
        await this.getById(id)
        await query(
            'UPDATE cities SET name = ?, country = ? WHERE id = ?',
            [name, country, id]
        )
        return { id, name, country }
    }

    static async delete(id) {
        await this.getById(id)
        await query('DELETE FROM cities WHERE id = ?', [id])
        return true
    }

    static async searchByName(name) {
        const rows = await query(
            'SELECT * FROM cities WHERE name LIKE ?',
            [`%${name}%`]
        )
        return rows
    }
}

export default CityModel
