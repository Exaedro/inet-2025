import { query } from '../database.js'
import { encrypt, compareEncrypt } from '../utils/encrypt.js'
import ClientError from '../utils/clientError.js'

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
        // Validación de campos
        const rows = await Validation.validateLogin({ email, password })

        // Objeto de respuesta
        const user = {
            first_name: rows[0].first_name,
            last_name: rows[0].last_name,
            email: rows[0].email
        }

        return user
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

class Validation {
    static async validateLogin({ email, password }) {
        // Email existente
        const rows = await query(`SELECT * FROM users WHERE email = ?`, [email])
        if (rows.length === 0) {
            throw new ClientError('email not found')
        }
        
        // Verificación de contraseña
        const passwordHash = await compareEncrypt(password, rows[0].password)
        if (!passwordHash) {
            throw new ClientError('password is incorrect')
        }

        return rows
    }
}
export default UserModel