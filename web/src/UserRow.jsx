import { useState } from 'react';

const INPUT = 'w-full rounded-lg border border-indigo-300/40 bg-surface p-2 text-copy';
const BUTTON = 'cursor-pointer rounded-lg px-3 py-2 font-semibold';

export default function UserRow({ user, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [nom, setNom] = useState(user.nom);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState('');

  async function handleSave() {
    setError('');
    try {
      await onSave(user.id, { nom, email });
      setEditing(false);
    } catch (saveError) {
      setError(saveError.message);
    }
  }

  async function handleDelete() {
    setError('');
    try {
      await onDelete(user.id);
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  return (
    <li className="rounded-xl border border-white/10 bg-panel p-4">
      {editing ? (
        <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input aria-label="Nom" className={INPUT} value={nom} onChange={event => setNom(event.target.value)} />
          <input aria-label="Email" className={INPUT} type="email" value={email} onChange={event => setEmail(event.target.value)} />
          <button className={`${BUTTON} bg-accent text-ink`} onClick={handleSave}>Enregistrer</button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-semibold">{user.nom}</p>
            <p className="text-muted">{user.email}</p>
          </div>
          <div className="flex gap-2">
            <button className={`${BUTTON} bg-surface`} onClick={() => setEditing(true)}>Modifier</button>
            <button className={`${BUTTON} bg-surface text-red-300`} aria-label={`Supprimer ${user.nom}`} onClick={handleDelete}>Supprimer</button>
          </div>
        </div>
      )}
      {error && <p role="alert" className="mt-3 text-red-300">{error}</p>}
    </li>
  );
}
