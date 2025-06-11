import { query } from '../database.js'
import ClientError from '../utils/clientError.js'

class BrandModel {
    static async getAll() {
        const rows = await query('SELECT * FROM brands')
        return rows
    }

    static async getById(id) {
        const [row] = await query('SELECT * FROM brands WHERE id = ?', [id])
        if (!row) throw new ClientError('Brand not found', 404)
        return row
    }

    static async create({ name }) {
        const { insertId } = await query(
            'INSERT INTO brands (name) VALUES (?)',
            [name]
        )
        return { id: insertId, name }
    }

    static async update(id, { name }) {
        await this.getById(id)
        await query('UPDATE brands SET name = ? WHERE id = ?', [name, id])
        return { id, name }
    }

    static async delete(id) {
        await this.getById(id)
        await query('DELETE FROM brands WHERE id = ?', [id])
        return true
    }
}

export default BrandModel
