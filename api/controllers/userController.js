import bcrypt from 'bcrypt';
import * as User from '../models/userModel.js';

const EMAIL_TAKEN = { error: 'Cet email existe déjà.' };

export async function index(req, res) {
  res.json(await User.findAll());
}

export async function store(req, res) {
  const { nom, email, password } = req.body;
  if (!nom || !email || !password) {
    return res.status(400).json({ error: 'Nom, email et mot de passe sont obligatoires.' });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    res.status(201).json(await User.create(nom, email, hash));
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') return res.status(409).json(EMAIL_TAKEN);
    throw error;
  }
}

export async function update(req, res) {
  const { nom, email } = req.body;
  if (!nom || !email) {
    return res.status(400).json({ error: 'Nom et email sont obligatoires.' });
  }
  try {
    const user = await User.update(req.params.id, nom, email);
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' });
    res.json(user);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') return res.status(409).json(EMAIL_TAKEN);
    throw error;
  }
}

export async function destroy(req, res) {
  const removed = await User.remove(req.params.id);
  if (!removed) return res.status(404).json({ error: 'Utilisateur introuvable.' });
  res.status(204).end();
}
