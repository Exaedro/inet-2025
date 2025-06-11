import express from 'express';

const app = express();

// Configuración
app.set('port', process.env.API_PORT || 3000);

// Middlewares
app.use(express.json());

// Importar rutas
import userRouter from './routes/user.routes.js';
import airlineRouter from './routes/airline.routes.js';
import airportRouter from './routes/airport.routes.js';
import brandRouter from './routes/brand.routes.js';
import carRouter from './routes/car.routes.js';
import cartRouter from './routes/cart.routes.js';
import cityRouter from './routes/city.routes.js';
import flightRouter from './routes/flight.routes.js';
import hotelRouter from './routes/hotel.routes.js';
import packageRouter from './routes/package.routes.js';
import serviceRouter from './routes/service.routes.js';

// Rutas
app.use('/api/users', userRouter);
app.use('/api/airlines', airlineRouter)
app.use('/api/airports', airportRouter)
app.use('/api/brands', brandRouter)
app.use('/api/cars', carRouter)
app.use('/api/carts', cartRouter)
app.use('/api/cities', cityRouter)
app.use('/api/flights', flightRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/packages', packageRouter)
app.use('/api/services', serviceRouter)

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Iniciar servidor
const server = app.listen(app.get('port'), () => {
  console.log(`API activa, puerto: ${app.get('port')}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});