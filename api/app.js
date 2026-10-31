import 'dotenv/config';
import express from 'express';
import { router as usersRouter } from './routes/users.js';
import { router as authRouter } from './routes/auth.js';

if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET manque dans .env');

const app = express();
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api', authRouter);

app.use((req, res) => res.status(404).json({ error: 'Route introuvable.' }));

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Erreur du serveur.' });
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, '127.0.0.1', () => console.log(`API prête sur http://127.0.0.1:${port}`));
