import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../database.js';
import { compareEncrypt } from '../utils/encrypt.js';

const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecreto';

// Crear token JWT
function createToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
}

// Middleware opcional si después querés proteger rutas
export function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'unauthorized' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
}

authRouter.post('/register', async (req, res) => {
  const { email, password, first_name, last_name, phone, address } = req.body;

  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ error: 'missing required fields' });
  }

  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (existingUser) {
    return res.status(409).json({ error: 'user already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data: userData, error } = await supabase
    .from('users')
    .insert({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      phone,
      address,
    })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  const token = createToken(userData.id);

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    maxAge: 1000 * 60 * 60,
  });

  res.status(201).json({ user: userData });
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    return res.status(401).json({ error: 'invalid credentials' });
  }

  const isMatch = await compareEncrypt(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'invalid credentials' });
  }

  const token = createToken(user.id);

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    maxAge: 1000 * 60 * 60,
  });

  res.json({ user });
});

authRouter.get('/me', authenticateToken, async (req, res) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', req.userId)
    .single();

  if (error || !user) {
    return res.status(401).json({ error: 'invalid token' });
  }

  res.json({ user });
});

authRouter.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'session closed' });
});

export default authRouter;
