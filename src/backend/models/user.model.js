import { supabase } from '../database.js'
import bcrypt from 'bcrypt'
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
            .select('id, first_name, last_name, email, password, created_at')
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
     * @returns {Promise<Object>} Usuario creado
     */
    static async register({ first_name = null, last_name, email, password }) {
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
                    password: hashedPassword
                    // created_at se genera automáticamente por DEFAULT CURRENT_TIMESTAMP
                }
            ])
            .select('id, first_name, last_name, email, created_at')
            .single()

        if (error) {
            throw new Error(error.message)
        }

        return newUser
    }

    /**
     * Obtiene el perfil de un usuario por su ID
     * @param {number} userId - ID del usuario
     * @returns {Promise<Object>} Perfil del usuario
     */
    static async getProfile(userId) {
        const { data: user, error } = await supabase
            .from('users')
            .select('id, first_name, last_name, email, created_at')
            .eq('id', userId)
            .single()

        if (error || !user) {
            throw new ClientError('User not found', 404)
        }

        return user
    }

    /**
     * Actualiza el perfil de un usuario
     * @param {number} userId - ID del usuario
     * @param {Object} updates - Campos a actualizar (first_name, last_name, email, password)
     * @returns {Promise<Object>} Perfil actualizado
     */
    static async updateProfile(userId, updates) {
        // Si se está actualizando la contraseña, hashearla
        if (updates.password) {
            const saltRounds = 10
            updates.password = await bcrypt.hash(updates.password, saltRounds)
        }

        const { data: updatedUser, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', userId)
            .select('id, first_name, last_name, email, created_at')
            .single()

        if (error) {
            throw new Error(error.message)
        }

        return updatedUser
    }

    /**
     * Elimina un usuario por su ID
     * @param {number} userId - ID del usuario a eliminar
     * @returns {Promise<boolean>} True si se eliminó correctamente
     */
    static async deleteUser(userId) {
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', userId)

        if (error) {
            throw new Error(error.message)
        }

        return true
    }

    /**
     * Obtiene el carrito de compras de un usuario
     * @param {number} userId - ID del usuario
     * @returns {Promise<Object>} Carrito del usuario
     */
    static async getUserCart(userId) {
        // Primero obtenemos o creamos el carrito del usuario
        let { data: cart, error: cartError } = await supabase
            .from('cart')
            .select('*')
            .eq('user_id', userId)
            .single()

        if (cartError && cartError.code !== 'PGRST116') { // PGRST116 = no rows returned
            throw new Error(cartError.message)
        }

        // Si no existe el carrito, lo creamos
        if (!cart) {
            const { data: newCart, error: createError } = await supabase
                .from('cart')
                .insert([{ user_id: userId }])
                .select()
                .single()

            if (createError) {
                throw new Error(createError.message)
            }
            cart = newCart
        }

        // Obtenemos los ítems del carrito
        const { data: items, error: itemsError } = await supabase
            .from('cart_items')
            .select('*')
            .eq('cart_id', cart.id)

        if (itemsError) {
            throw new Error(itemsError.message)
        }

        return {
            ...cart,
            items: items || []
        }
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
     * Solicita un restablecimiento de contraseña
     * @param {string} email - Correo electrónico del usuario
     * @returns {Promise<void>}
     */
    static async requestPasswordReset(email) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.FRONTEND_URL}/reset-password`
        })
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