import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Configuración
app.set('port', process.env.API_PORT || 3000);

// Middlewares
app.use(express.json());

// Import routes
import userRouter from './routes/user.routes.js';
import testRouter from './routes/test.routes.js';

// Routes
app.use('/api/users', userRouter);
app.use('/api', testRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
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