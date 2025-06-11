import express from 'express';
import db from '../config/db.config.js';

const router = express.Router();

// Test database connection
router.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({
      success: true,
      message: 'Successfully connected to the database',
      timestamp: result.rows[0].now
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to connect to the database',
      error: error.message
    });
  }
});

export default router;
