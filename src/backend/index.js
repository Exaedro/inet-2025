import express from 'express';

const app = express()

// Configuración
app.set('port', process.env.API_PORT)

// Middlewares
app.use(express.json())

// Rutas
app.get('/', (req, res) => {
    res.send('Hola mundo desde el backend')
})

// Arrancar servidor
app.listen(app.get('port'), () => {
    console.log(`API activa, puerto: ${app.get('port')}`)
})