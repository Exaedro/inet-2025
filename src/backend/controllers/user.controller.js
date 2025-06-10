class UserController {
    constructor({ userModel }) {
        this.userModel = userModel
    }

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