import { useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);

  fetch('/api/users')
    .then(response => response.json())
    .then(data => setUsers(data));

  return (
    <section aria-label="Utilisateurs" className="mt-8">
      <ul className="space-y-3">
        {users.map(user => (
          <li key={user.id} className="rounded-xl border border-white/10 bg-panel p-4">
            <p className="font-semibold">{user.nom}</p>
            <p className="text-muted">{user.email}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
