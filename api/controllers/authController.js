import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as User from '../models/userModel.js';

export async function login(req, res) {
  const { email, password } = req.body;
  const user = email && password ? await User.findByEmailWithPassword(email) : undefined;
  const valid = user ? await bcrypt.compare(password, user.password) : false;
  if (!valid) return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { id: user.id, nom: user.nom, email: user.email } });
}

export async function me(req, res) {
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ error: 'Connexion requise.' });
  res.json(user);
}
