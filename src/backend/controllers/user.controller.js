class UserController {
    constructor({ userModel }) {
        this.userModel = userModel
    }

    async register(req, res) {
        const { first_name, last_name, email, password } = req.body

        try {
            const user = await this.userModel.register(first_name, last_name, email, password)
            return user
        } catch(err) {
            console.log(err)
            throw new Error('Error al registrar el usuario')
        }
    }

    async login(req, res) {
        const { email, password } = req.body

        try {
            const user = await this.userModel.login(email, password)
            return user
        } catch(err) {
            throw new Error('Error al iniciar sesión')
        }
    }

}

export default UserController