import query from '../database.js'

class UserModel {
    static async login(email, password) {
        const [rows] = await query(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password])

        if (rows.length === 0) {
            throw new Error('Usuario o contraseña incorrectos')
        }

        return rows
    }

    static async register(first_name, last_name, email, password) {
        try {
            const [rows] = await query(`INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`, [first_name, last_name, email, password])

            return rows
        } catch(err) {
            throw new Error('Error al registrar el usuario')
        }
    }
}

export default UserModel