import express from 'express';

const app = express()

// Configuración
app.set('port', process.env.API_PORT)

// Middlewares
app.use(express.json())

// Rutas
import userRouter from './routes/user.routes.js'

app.use('/api/users', userRouter)

// Arrancar servidor
app.listen(app.get('port'), () => {
    console.log(`API activa, puerto: ${app.get('port')}`)
})