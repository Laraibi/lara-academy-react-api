import { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadUsers() {
      try {
        const response = await fetch('/api/users');
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
  }, []);

  return (
    <section aria-label="Utilisateurs" className="mt-8">
      {loading && <p className="text-muted">Chargement…</p>}
      {!loading && error && <p role="alert" className="text-red-300">{error}</p>}
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
