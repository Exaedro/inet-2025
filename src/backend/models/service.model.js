import { query } from '../database.js'
import ClientError from '../utils/clientError.js'

class ServiceModel {
    static async getAll() {
        const rows = await query('SELECT * FROM services')
        return rows
    }

    static async getById(id) {
        const [row] = await query('SELECT * FROM services WHERE id = ?', [id])
        if (!row) throw new ClientError('Service not found', 404)
        return row
    }

    static async create({ name, description }) {
        const { insertId } = await query(
            'INSERT INTO services (name, description) VALUES (?, ?)',
            [name, description]
        )
        return { id: insertId, name, description }
    }

    static async update(id, { name, description }) {
        await this.getById(id)
        await query(
            'UPDATE services SET name = ?, description = ? WHERE id = ?',
            [name, description, id]
        )
        return { id, name, description }
    }

    static async delete(id) {
        await this.getById(id)
        // Remove from hotel_service junction table first
        await query('DELETE FROM hotel_service WHERE service_id = ?', [id])
        await query('DELETE FROM services WHERE id = ?', [id])
        return true
    }

    static async searchByName(name) {
        const rows = await query(
            'SELECT * FROM services WHERE name LIKE ?',
            [`%${name}%`]
        )
        return rows
    }

    static async getHotelsWithService(serviceId) {
        const rows = await query(`
            SELECT h.*
            FROM hotels h
            JOIN hotel_service hs ON h.id = hs.hotel_id
            WHERE hs.service_id = ?
        `, [serviceId])
        return rows
    }
}

export default ServiceModel
