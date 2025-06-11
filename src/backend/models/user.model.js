import { query } from '../database.js'
import { encrypt, compareEncrypt } from '../utils/encrypt.js'

/**
 * Modelo de usuario que maneja las operaciones de base de datos relacionadas con usuarios
 */
class UserModel {
    /**
     * Autentica un usuario con su correo electrónico y contraseña
     * @param {string} email - Correo electrónico del usuario
     * @param {string} password - Contraseña del usuario
     * @returns {Promise<Object>} Información del usuario autenticado
     * @throws {Error} Si las credenciales son incorrectas
     */
    static async login({ email, password }) {
        const rows = await query(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password])

        if (rows.length === 0) {
            throw new Error('email or password incorrect')
        }

        return rows[0]
    }

    /**
     * Crea un nuevo usuario en la base de datos
     * @param {string} first_name - Nombre del usuario
     * @param {string} last_name - Apellido del usuario
     * @param {string} email - Correo electrónico del usuario
     * @param {string} password - Contraseña del usuario
     * @returns {Promise<Object>} Resultado de la operación de inserción
     */
    static async register({ first_name, last_name, email, password }) {
        // Encriptación de contraseña
        const passwordHash = await encrypt(password)

        await query(
            `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`, 
            [first_name, last_name, email, passwordHash]
        )
    }
}

export default UserModel