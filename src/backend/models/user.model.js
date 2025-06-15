import { supabase } from '../database.js'
import bcrypt from 'bcrypt'
import { encrypt } from '../utils/encrypt.js'
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
        // Buscar usuario por email
        const { data: user, error } = await supabase
            .from('users')
            .select('id, first_name, last_name, email, password, phone, address, created_at')
            .eq('email', email)
            .single()

        if (error || !user) {
            throw new ClientError('Invalid email or password', 401)
        }

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new ClientError('Invalid email or password', 401)
        }

        // Eliminar la contraseña del objeto de retorno
        const { password: _, ...userWithoutPassword } = user
        return userWithoutPassword
    }

    /**
     * Crea un nuevo usuario en la base de datos
     * @param {Object} userData - Datos del usuario a crear
     * @param {string} userData.first_name - Nombre del usuario (opcional)
     * @param {string} userData.last_name - Apellido del usuario (requerido)
     * @param {string} userData.email - Correo electrónico del usuario
     * @param {string} userData.password - Contraseña del usuario
     * @param {string} userData.phone - Telefono del usuario
     * @param {string} userData.address - Direccion del usuario
     * @returns {Promise<Object>} Usuario creado
     */
    static async register({ first_name = null, last_name, email, password, phone, address }) {
        // Validar campos requeridos según el esquema
        if (!last_name || !email || !password) {
            throw new ClientError('Last name, email and password are required', 400)
        }

        // Verificar si el usuario ya existe
        const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single()

        if (existingUser) {
            throw new ClientError('Email already in use', 400)
        }

        // Hashear la contraseña
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // Crear el usuario con los campos exactos del esquema
        const { data: newUser, error } = await supabase
            .from('users')
            .insert([
                {
                    first_name,
                    last_name,
                    email,
                    password: hashedPassword,
                    phone,
                    address
                }
            ])
            .select('id, first_name, last_name, email, phone, address, created_at')
            .single()

        if (error) {
            throw new Error(error.message)
        }

        return newUser
    }

    static async getAll(filters) {
        let query = supabase.from('users').select('id, first_name, last_name, email, phone, address, created_at')
        
        if(filters?.email) {
            query = query.eq('email', filters.email)
        }

        const { data, error } = await query

        if(error) throw new Error(error)

        const users = data.map(user => {
            return {
                ...user  
            }
        })

        return users
    } 

    static async getUserById(id) {
        const { data: user, error } = await supabase
        .from('users')
        .select('id, first_name, last_name, email, phone, address, created_at')
        .eq('id', id)
        .single()

        if(error) throw new Error(error)

        return user
    }

    // static async getUserByEmail(email) {
    //     const { data: user, error } = await supabase
    //     .from('users')
    //     .select('id, first_name, last_name, email, phone, address, created_at')
    //     .eq('email', email)
    //     .single()

    //     if(error) throw new Error(error)

    //     return user
    // }

    static async createUser({ 
        first_name,
        last_name,
        email,
        phone,
        password,
        address,
        created_at
    }) {
        const hashedPassword = await encrypt(password)

        const { data, error } = await supabase
        .from('users')
        .insert({
            first_name,
            last_name,
            email,
            phone,
            password: hashedPassword,
            address,
            created_at
        })
        .select('id, first_name, last_name, email, phone, address, created_at')
        .single()

        if(error) throw new Error(error.message)

        return data
    }

    static async deleteUser(id) {
        const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)

        if(error) throw new Error(error)

        return data
    }

    /**
     * Cierra la sesión del usuario actual
     * @returns {Promise<void>}
     */
    static async logout() {
        const { error } = await supabase.auth.signOut()
        if (error) throw new Error(error.message)
    }

    /**
     * Actualiza la contraseña de un usuario
     * @param {string} newPassword - Nueva contraseña
     * @returns {Promise<void>}
     */
    static async updatePassword(newPassword) {
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        })
        if (error) throw new Error(error.message)
    }
}

export default UserModel