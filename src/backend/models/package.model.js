import { query } from '../database.js'
import ClientError from '../utils/clientError.js'

class PackageModel {
    static async getAll() {
        const rows = await query(`
            SELECT p.*, 
                   h.nombre as hotel_name, 
                   f1.out_date as flight_out_date,
                   f1.destiny_id as destination_airport_id,
                   a1.name as destination_airport_name,
                   c1.name as destination_city_name
            FROM packages p
            LEFT JOIN hotels h ON p.hotel_id = h.id
            LEFT JOIN flights f1 ON p.flight_go_id = f1.id
            LEFT JOIN airports a1 ON f1.destiny_id = a1.id
            LEFT JOIN cities c1 ON a1.city_id = c1.id
        `)
        return rows
    }

    static async getById(id) {
        const [row] = await query(`
            SELECT p.*, 
                   h.nombre as hotel_name, 
                   f1.out_date as flight_out_date,
                   f1.destiny_id as destination_airport_id,
                   a1.name as destination_airport_name,
                   c1.name as destination_city_name,
                   f1.back_date as flight_back_date,
                   f2.out_date as return_flight_out_date,
                   f2.destiny_id as origin_airport_id,
                   a2.name as origin_airport_name,
                   c2.name as origin_city_name
            FROM packages p
            LEFT JOIN hotels h ON p.hotel_id = h.id
            LEFT JOIN flights f1 ON p.flight_go_id = f1.id
            LEFT JOIN flights f2 ON p.flight_back_id = f2.id
            LEFT JOIN airports a1 ON f1.destiny_id = a1.id
            LEFT JOIN airports a2 ON f2.destiny_id = a2.id
            LEFT JOIN cities c1 ON a1.city_id = c1.id
            LEFT JOIN cities c2 ON a2.city_id = c2.id
            WHERE p.id = ?
        `, [id])
        
        if (!row) throw new ClientError('Package not found', 404)
        return row
    }

    static async search({ destination, check_in, check_out, guests, min_price, max_price }) {
        let sql = `
            SELECT p.*, 
                   h.nombre as hotel_name, 
                   f1.out_date as flight_out_date,
                   f1.destiny_id as destination_airport_id,
                   a1.name as destination_airport_name,
                   c1.name as destination_city_name
            FROM packages p
            LEFT JOIN hotels h ON p.hotel_id = h.id
            LEFT JOIN flights f1 ON p.flight_go_id = f1.id
            LEFT JOIN airports a1 ON f1.destiny_id = a1.id
            LEFT JOIN cities c1 ON a1.city_id = c1.id
            WHERE 1=1
        `
        const params = []

        if (destination) {
            sql += ' AND (c1.name LIKE ? OR a1.city LIKE ?)'
            const likeDestination = `%${destination}%`
            params.push(likeDestination, likeDestination)
        }
        if (check_in) {
            sql += ' AND DATE(f1.out_date) >= ?'
            params.push(check_in)
        }
        if (check_out) {
            sql += ' AND (p.flight_back_id IS NULL OR DATE(f1.back_date) <= ?)'
            params.push(check_out)
        }
        if (guests) {
            sql += ' AND p.max_people >= ?'
            params.push(Number(guests))
        }
        if (min_price) {
            sql += ' AND p.total_price >= ?'
            params.push(Number(min_price))
        }
        if (max_price) {
            sql += ' AND p.total_price <= ?'
            params.push(Number(max_price))
        }

        const rows = await query(sql, params)
        return rows
    }

    static async create({
        name,
        description,
        hotel_id,
        flight_go_id,
        flight_back_id,
        nights,
        total_price,
        discount,
        max_people,
        is_available
    }) {
        const { insertId } = await query(
            `INSERT INTO packages 
                (name, description, hotel_id, flight_go_id, flight_back_id, 
                 nights, total_price, discount, max_people, is_available)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name, description, hotel_id, flight_go_id, flight_back_id,
                nights, total_price, discount, max_people, is_available ? 1 : 0
            ]
        )
        return this.getById(insertId)
    }

    static async update(id, {
        name,
        description,
        hotel_id,
        flight_go_id,
        flight_back_id,
        nights,
        total_price,
        discount,
        max_people,
        is_available
    }) {
        await this.getById(id)
        await query(
            `UPDATE packages 
             SET name = ?, description = ?, hotel_id = ?, flight_go_id = ?, 
                 flight_back_id = ?, nights = ?, total_price = ?, discount = ?, 
                 max_people = ?, is_available = ?
             WHERE id = ?`,
            [
                name, description, hotel_id, flight_go_id, flight_back_id,
                nights, total_price, discount, max_people, is_available ? 1 : 0, id
            ]
        )
        return this.getById(id)
    }

    static async delete(id) {
        await this.getById(id)
        await query('DELETE FROM packages WHERE id = ?', [id])
        return true
    }

    static async updateAvailability(id, isAvailable) {
        await query(
            'UPDATE packages SET is_available = ? WHERE id = ?',
            [isAvailable ? 1 : 0, id]
        )
        return this.getById(id)
    }
}

export default PackageModel
