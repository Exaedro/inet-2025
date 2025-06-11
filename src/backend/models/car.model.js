import { query } from '../database.js'
import ClientError from '../utils/clientError.js'

class CarModel {
    static async getAll() {
        const rows = await query(`
            SELECT c.*, b.name as brand_name, ci.name as city_name 
            FROM cars c
            LEFT JOIN brands b ON c.brand_id = b.id
            LEFT JOIN cities ci ON c.city_id = ci.id
        `)
        return rows
    }

    static async getById(id) {
        const [row] = await query(`
            SELECT c.*, b.name as brand_name, ci.name as city_name 
            FROM cars c
            LEFT JOIN brands b ON c.brand_id = b.id
            LEFT JOIN cities ci ON c.city_id = ci.id
            WHERE c.id = ?
        `, [id])
        if (!row) throw new ClientError('Car not found', 404)
        return row
    }

    static async create({ brand_id, model, city_id, price_per_day, disponibility }) {
        const { insertId } = await query(
            'INSERT INTO cars (brand_id, model, city_id, price_per_day, disponibility) VALUES (?, ?, ?, ?, ?)',
            [brand_id, model, city_id, price_per_day, disponibility]
        )
        return { id: insertId, brand_id, model, city_id, price_per_day, disponibility }
    }

    static async update(id, { brand_id, model, city_id, price_per_day, disponibility }) {
        await this.getById(id)
        await query(
            'UPDATE cars SET brand_id = ?, model = ?, city_id = ?, price_per_day = ?, disponibility = ? WHERE id = ?',
            [brand_id, model, city_id, price_per_day, disponibility, id]
        )
        return { id, brand_id, model, city_id, price_per_day, disponibility }
    }

    static async delete(id) {
        await this.getById(id)
        await query('DELETE FROM cars WHERE id = ?', [id])
        return true
    }

    static async getByCityId(cityId) {
        const rows = await query('SELECT * FROM cars WHERE city_id = ?', [cityId])
        return rows
    }

    static async getAvailableCars() {
        const rows = await query('SELECT * FROM cars WHERE disponibility = 1')
        return rows
    }
}

export default CarModel
