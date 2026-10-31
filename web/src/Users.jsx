import { useEffect, useState } from 'react';

export default function Users() {
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
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error(`Erreur ${response.status}`);
        const data = await response.json();
        if (!ignore) setUsers(data);
      } catch (loadError) {
        if (!ignore) setError(loadError.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadUsers();
    return () => { ignore = true; };
  }, [attempt]);

  return (
    <section aria-label="Utilisateurs" className="mt-8">
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
            <li key={user.id} className="rounded-xl border border-white/10 bg-panel p-4">
              <p className="font-semibold">{user.nom}</p>
              <p className="text-muted">{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
