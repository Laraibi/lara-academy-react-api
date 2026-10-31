import { readFile } from 'node:fs/promises';
import bcrypt from 'bcrypt';
import { pool } from '../db.js';

const DEMO_USERS = [
  ['Sara', 'sara@example.com', 'demo-sara-123'],
  ['Youssef', 'youssef@example.com', 'demo-youssef-123'],
  ['Khadija', 'khadija@example.com', 'demo-khadija-123'],
];

await pool.query(await readFile(new URL('./schema.sql', import.meta.url), 'utf8'));
for (const [nom, email, password] of DEMO_USERS) {
  const hash = await bcrypt.hash(password, 10);
  await pool.execute(
    'INSERT INTO users (nom, email, password) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE nom = VALUES(nom), password = VALUES(password)',
    [nom, email, hash]
  );
}
console.log('Base prête : table users et comptes de démonstration.');
await pool.end();
