import { query } from '../database.js'
import ClientError from '../utils/clientError.js'

class HotelModel {
    static async getAll() {
        const rows = await query(`
            SELECT h.*, c.name as city_name
            FROM hotels h
            LEFT JOIN cities c ON h.city_id = c.id
        `)
        return rows
    }

    static async getById(id) {
        const [row] = await query(`
            SELECT h.*, c.name as city_name
            FROM hotels h
            LEFT JOIN cities c ON h.city_id = c.id
            WHERE h.id = ?
        `, [id])
        if (!row) throw new ClientError('Hotel not found', 404)
        return row
    }

    static async search({ city_id, min_stars, max_price, check_in, check_out }) {
        let sql = `
            SELECT DISTINCT h.*, c.name as city_name
            FROM hotels h
            LEFT JOIN cities c ON h.city_id = c.id
            WHERE 1=1
        `
        const params = []

        if (city_id) {
            sql += ' AND h.city_id = ?'
            params.push(city_id)
        }
        if (min_stars) {
            sql += ' AND h.stars >= ?'
            params.push(min_stars)
        }
        if (max_price) {
            sql += ' AND h.price_per_night <= ?'
            params.push(max_price)
        }
        if (check_in && check_out) {
            // This is a simplified availability check - you might need to adjust based on your booking system
            sql += ` AND h.available_rooms > 0`
            // Add more complex availability logic here if needed
        }

        const rows = await query(sql, params)
        return rows
    }

    static async create({
        nombre,
        city_id,
        address,
        stars,
        price_per_night,
        available_rooms
    }) {
        const { insertId } = await query(
            `INSERT INTO hotels 
                (nombre, city_id, address, stars, price_per_night, available_rooms)
                VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, city_id, address, stars, price_per_night, available_rooms]
        )
        return { 
            id: insertId, 
            nombre, 
            city_id, 
            address, 
            stars, 
            price_per_night, 
            available_rooms 
        }
    }

    static async update(id, {
        nombre,
        city_id,
        address,
        stars,
        price_per_night,
        available_rooms
    }) {
        await this.getById(id)
        await query(
            `UPDATE hotels 
             SET nombre = ?, city_id = ?, address = ?, stars = ?, 
                 price_per_night = ?, available_rooms = ?
             WHERE id = ?`,
            [nombre, city_id, address, stars, price_per_night, available_rooms, id]
        )
        return { 
            id, 
            nombre, 
            city_id, 
            address, 
            stars, 
            price_per_night, 
            available_rooms 
        }
    }

    static async delete(id) {
        await this.getById(id)
        // Delete hotel services first to maintain referential integrity
        await query('DELETE FROM hotel_service WHERE hotel_id = ?', [id])
        await query('DELETE FROM hotels WHERE id = ?', [id])
        return true
    }

    static async updateAvailability(id, roomsChange) {
        await query(
            'UPDATE hotels SET available_rooms = available_rooms + ? WHERE id = ?', 
            [roomsChange, id]
        )
        return this.getById(id)
    }

    static async getHotelServices(hotelId) {
        const rows = await query(`
            SELECT s.id, s.name
            FROM hotel_service hs
            JOIN services s ON hs.service_id = s.id
            WHERE hs.hotel_id = ?
        `, [hotelId])
        return rows
    }

    static async addHotelService(hotelId, serviceId) {
        await query(
            'INSERT INTO hotel_service (hotel_id, service_id) VALUES (?, ?)',
            [hotelId, serviceId]
        )
        return this.getHotelServices(hotelId)
    }

    static async removeHotelService(hotelId, serviceId) {
        await query(
            'DELETE FROM hotel_service WHERE hotel_id = ? AND service_id = ?',
            [hotelId, serviceId]
        )
        return this.getHotelServices(hotelId)
    }
}

export default HotelModel
