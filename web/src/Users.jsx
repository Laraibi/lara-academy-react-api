import { useEffect, useState } from 'react';
import { request } from './api.js';
import UserForm from './UserForm.jsx';
import UserRow from './UserRow.jsx';

export default function Users({ token }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadUsers() {
      setLoading(true);
      setError('');
      try {
        const data = await request('/api/users', { token });
        if (!ignore) setUsers(data);
      } catch (loadError) {
        if (!ignore) setError(loadError.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadUsers();
    return () => { ignore = true; };
  }, [token, attempt]);

  async function handleAdd(values) {
    const user = await request('/api/users', { token, method: 'POST', body: values });
    setUsers(previous => [...previous, user]);
  }

  async function handleSave(id, values) {
    const saved = await request(`/api/users/${id}`, { token, method: 'PUT', body: values });
    setUsers(previous => previous.map(user => (user.id === id ? saved : user)));
  }

  async function handleDelete(id) {
    await request(`/api/users/${id}`, { token, method: 'DELETE' });
    setUsers(previous => previous.filter(user => user.id !== id));
  }

  return (
    <div className="mt-8 grid gap-7 lg:grid-cols-[2fr_1fr]">
      <section aria-label="Utilisateurs">
        {loading && <p className="text-muted">Chargement…</p>}
        {!loading && error && (
          <div role="alert" className="rounded-xl border border-red-300/40 p-4">
            <p className="text-red-300">{error}</p>
            <button className="mt-3 cursor-pointer rounded-lg bg-accent px-4 py-2 font-semibold text-ink" onClick={() => setAttempt(value => value + 1)}>Réessayer</button>
          </div>
        )}
        {!loading && !error && (
          <ul className="space-y-3">
            {users.map(user => (
              <UserRow key={user.id} user={user} onSave={handleSave} onDelete={handleDelete} />
            ))}
          </ul>
        )}
      </section>
      <UserForm onAdd={handleAdd} />
    </div>
  );
}
