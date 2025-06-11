import express from 'express';

const app = express();

// Configuración
app.set('port', process.env.API_PORT || 3000);

// Middlewares
app.use(express.json());

// Importar rutas
import userRouter from './routes/user.routes.js';

// Rutas
app.use('/api/users', userRouter);

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