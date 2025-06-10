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
     * @param {Object} res - Objeto de respuesta de Express
     * @returns {Promise<void>} No devuelve ningún valor directamente, pero envía una respuesta JSON
     */
    async register(req, res) {
        const { first_name, last_name, email, password } = req.body

        try {
            const result = await this.userModel.register(first_name, last_name, email, password)
            res.status(201).json({ 
                success: true, 
                message: 'Usuario registrado exitosamente',
                data: result 
            })
        } catch(err) {
            console.error('Error en register:', err)
            res.status(400).json({ 
                success: false, 
                message: err.message || 'Error al registrar el usuario' 
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
        const { email, password } = req.body

        try {
            const user = await this.userModel.login(email, password)
            res.status(200).json({ 
                success: true, 
                message: 'Inicio de sesión exitoso',
                data: user 
            })
        } catch(err) {
            console.error('Error en login:', err)
            res.status(401).json({ 
                success: false, 
                message: err.message || 'Error al iniciar sesión' 
            })
        }
    }
}

export default UserController