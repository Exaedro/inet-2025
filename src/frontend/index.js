import express from 'express';

const app = express()

// Configuración
app.set('port', process.env.WEB_PORT)
app.set('views', process.cwd() + '/src/frontend/views')
app.set('view engine', 'ejs')

// Rutas
app.get('/', (req, res) => {
    res.send('Hola mundo desde el frontend')
})

// Arrancar servidor
app.listen(app.get('port'), () => {
    console.log(`WEB activa, puerto: ${app.get('port')}`) 
})