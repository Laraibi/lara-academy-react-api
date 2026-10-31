import { pool } from '../db.js';

// Le hash du mot de passe ne sort jamais de l'API : on choisit les colonnes.
const PUBLIC_COLUMNS = 'id, nom, email';

export async function findAll() {
  const [rows] = await pool.execute(`SELECT ${PUBLIC_COLUMNS} FROM users ORDER BY id`);
  return rows;
}
