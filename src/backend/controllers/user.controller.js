import ClientError from '../utils/clientError.js'

/**
 * Controlador para manejar las operaciones relacionadas con usuarios
 */
class UserController {
    /**
     * Crea una nueva instancia del controlador de usuarios
     * @param {Object} param0 - Objeto de dependencias
     * @param {Object} param0.userModel - Modelo de usuario para interactuar con la base de datos
     */
    constructor({ userModel }) {
        this.userModel = userModel
    }

    /**
     * Maneja la solicitud de registro de un nuevo usuario
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} req.body - Cuerpo de la solicitud
     * @param {string} req.body.first_name - Nombre del usuario
     * @param {string} req.body.last_name - Apellido del usuario
     * @param {string} req.body.email - Correo electrónico del usuario
     * @param {string} req.body.password - Contraseña del usuario
     * @param {string} req.body.phone - Telefono del usuario
     * @param {string} req.body.address - Direccion del usuario
     * @param {Object} res - Objeto de respuesta de Express
     * @returns {Promise<void>} No devuelve ningún valor directamente, pero envía una respuesta JSON
     */
    async register(req, res) {
        const { first_name, last_name, email, password, phone, address } = req.body

        // Validación de campos
        Validation.validateRegister({ first_name, last_name, email, password, phone, address })

        try {
            const result = await this.userModel.register({ first_name, last_name, email, password, phone, address })

            res.status(201).json({ 
                success: true, 
                message: 'user registered successfully',
                data: result 
            })
        } catch(err) {
            console.error('Error en register:', err)
            res.status(400).json({ 
                success: false, 
                message: err.message || 'error registering user'
            })
        }
    }

    /**
     * Maneja la solicitud de inicio de sesión de un usuario
     * @param {Object} req - Objeto de solicitud de Express
     * @param {Object} req.body - Cuerpo de la solicitud
     * @param {string} req.body.email - Correo electrónico del usuario
     * @param {string} req.body.password - Contraseña del usuario
     * @param {Object} res - Objeto de respuesta de Express
     * @returns {Promise<void>} No devuelve ningún valor directamente, pero envía una respuesta JSON
     */
    async login(req, res) {
        const { email, password } = req.body || {}

        // Validación de campos
        Validation.validateLogin({ email, password })

        try {
            const user = await this.userModel.login({ email, password })
            res.status(200).json({ 
                success: true, 
                message: 'login successful',
                data: user 
            })
        } catch(err) {
            console.error('Error en login:', err.message)
            res.status(401).json({ 
                success: false, 
                message: err.message || 'error logging in'
            })
        }
    }
}

/**
 * Clase para validar las entradas de los usuarios
 */
class Validation {
    /**
     * Valida las entradas de registro de un nuevo usuario
     * @param {Object} params - Parámetros de la solicitud
     * @param {string} params.first_name - Nombre del usuario
     * @param {string} params.last_name - Apellido del usuario
     * @param {string} params.email - Correo electrónico del usuario
     * @param {string} params.password - Contraseña del usuario
     * @param {string} params.phone - Telefono del usuario
     * @param {string} params.address - Direccion del usuario
     * @throws {ClientError} Si las entradas no son válidas
     * @returns {void}
     */
    static validateRegister({ first_name, last_name, email, password, phone, address }) {
        // Validaciones de campos
        if (
            !first_name || 
            !last_name || 
            !email || 
            !password || 
            !phone || 
            !address || 
            email.length == 0 || 
            password.length == 0
        ) { 
            throw new ClientError('all fields are required', 400)
        }

        if (first_name.length < 3 || last_name.length < 3) {
            throw new ClientError('first and last name are too short', 400)
        }

        if (typeof first_name !== 'string' || typeof last_name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            throw new ClientError('all fields must be strings', 400)
        }

        // Validaciones de contraseña
        if (password.length < 8) {
            throw new ClientError('password must be at least 8 characters long', 400)
        }

        // Validaciones de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ClientError('invalid email format', 400)
        }

        // Validaciones de password
        const passwordRegex = /^[a-zA-Z0-9]{8,}$/;
        if (!passwordRegex.test(password)) {
            throw new ClientError('password must contain at least one letter and one number', 400)
        }
    }

    static validateLogin({ email, password }) {
        // Validaciones de campos
        if (!email || !password) {
            throw new ClientError('email and password are required', 400)
        }

        if (typeof email !== 'string' || typeof password !== 'string') {
            throw new ClientError('all fields must be strings', 400)
        }

        // Validaciones de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ClientError('invalid email format', 400)
        }
    }
}

export default UserController