import { query } from '../database.js'
import ClientError from '../utils/clientError.js'

class FlightModel {
    static async getAll() {
        const rows = await query(`
            SELECT f.*, 
                   o.name as origin_name, o.code as origin_code,
                   d.name as destination_name, d.code as destination_code,
                   a.name as airline_name
            FROM flights f
            LEFT JOIN airports o ON f.origin_id = o.id
            LEFT JOIN airports d ON f.destiny_id = d.id
            LEFT JOIN airlines a ON f.airline_id = a.id
        `)
        return rows
    }

    static async getById(id) {
        const [row] = await query(`
            SELECT f.*, 
                   o.name as origin_name, o.code as origin_code,
                   d.name as destination_name, d.code as destination_code,
                   a.name as airline_name
            FROM flights f
            LEFT JOIN airports o ON f.origin_id = o.id
            LEFT JOIN airports d ON f.destiny_id = d.id
            LEFT JOIN airlines a ON f.airline_id = a.id
            WHERE f.id = ?
        `, [id])
        if (!row) throw new ClientError('Flight not found', 404)
        return row
    }

    static async search({ origin_id, destiny_id, out_date, class: flightClass }) {
        let sql = `
            SELECT f.*, 
                   o.name as origin_name, o.code as origin_code,
                   d.name as destination_name, d.code as destination_code,
                   a.name as airline_name
            FROM flights f
            LEFT JOIN airports o ON f.origin_id = o.id
            LEFT JOIN airports d ON f.destiny_id = d.id
            LEFT JOIN airlines a ON f.airline_id = a.id
            WHERE 1=1
        `
        const params = []

        if (origin_id) {
            sql += ' AND f.origin_id = ?'
            params.push(origin_id)
        }
        if (destiny_id) {
            sql += ' AND f.destiny_id = ?'
            params.push(destiny_id)
        }
        if (out_date) {
            sql += ' AND DATE(f.out_date) = ?'
            params.push(out_date)
        }
        if (flightClass) {
            sql += ' AND f.class = ?'
            params.push(flightClass)
        }

        const rows = await query(sql, params)
        return rows
    }

    static async create({
        origin_id, 
        destiny_id, 
        out_date, 
        back_date, 
        airline_id, 
        price, 
        duration, 
        flight_class, 
        available_seats 
    }) {
        const { insertId } = await query(
            `INSERT INTO flights 
                (origin_id, destiny_id, out_date, back_date, airline_id, price, duration, class, available_seats)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [origin_id, destiny_id, out_date, back_date, airline_id, price, duration, flight_class, available_seats]
        )
        return { 
            id: insertId, 
            origin_id, 
            destiny_id, 
            out_date, 
            back_date, 
            airline_id, 
            price, 
            duration, 
            class: flight_class, 
            available_seats 
        }
    }

    static async update(id, {
        origin_id, 
        destiny_id, 
        out_date, 
        back_date, 
        airline_id, 
        price, 
        duration, 
        flight_class, 
        available_seats 
    }) {
        await this.getById(id)
        await query(
            `UPDATE flights 
             SET origin_id = ?, destiny_id = ?, out_date = ?, back_date = ?, 
                 airline_id = ?, price = ?, duration = ?, class = ?, available_seats = ?
             WHERE id = ?`,
            [origin_id, destiny_id, out_date, back_date, airline_id, price, duration, flight_class, available_seats, id]
        )
        return { 
            id, 
            origin_id, 
            destiny_id, 
            out_date, 
            back_date, 
            airline_id, 
            price, 
            duration, 
            class: flight_class, 
            available_seats 
        }
    }

    static async delete(id) {
        await this.getById(id)
        await query('DELETE FROM flights WHERE id = ?', [id])
        return true
    }

    static async updateSeats(id, seatsChange) {
        await query('UPDATE flights SET available_seats = available_seats + ? WHERE id = ?', [seatsChange, id])
        return this.getById(id)
    }
}

export default FlightModel
