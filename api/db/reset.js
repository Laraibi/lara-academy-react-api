import { pool } from '../db.js';

await pool.query('DROP TABLE IF EXISTS users');
await import('./init.js');
