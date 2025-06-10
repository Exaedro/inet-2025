import express from 'express';
import path from 'node:path';

const app = express()

// Configuración
app.set('port', process.env.WEB_PORT)
app.set('views', process.cwd() + '/src/frontend/views')
app.set('view engine', 'ejs')

// Rutas
import indexRouter from './routes/index.routes.js'
app.use('/', indexRouter)

// Archivos estaticos
app.use(express.static(path.join(process.cwd(), 'src/frontend/public')))

// Arrancar servidor
app.listen(app.get('port'), () => {
    console.log(`WEB activa, puerto: ${app.get('port')}`) 
})