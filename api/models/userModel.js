import { pool } from '../db.js';

// Le hash du mot de passe ne sort jamais de l'API : on choisit les colonnes.
const PUBLIC_COLUMNS = 'id, nom, email';

export async function findAll() {
  const [rows] = await pool.execute(`SELECT ${PUBLIC_COLUMNS} FROM users ORDER BY id`);
  return rows;
}

export async function findById(id) {
  const [rows] = await pool.execute(`SELECT ${PUBLIC_COLUMNS} FROM users WHERE id = ?`, [id]);
  return rows[0];
}

export async function findByEmailWithPassword(email) {
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

export async function create(nom, email, passwordHash) {
  const [result] = await pool.execute(
    'INSERT INTO users (nom, email, password) VALUES (?, ?, ?)',
    [nom, email, passwordHash]
  );
  return findById(result.insertId);
}

export async function update(id, nom, email) {
  const [result] = await pool.execute('UPDATE users SET nom = ?, email = ? WHERE id = ?', [nom, email, id]);
  return result.affectedRows > 0 ? findById(id) : undefined;
}

export async function remove(id) {
  const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows > 0;
}
