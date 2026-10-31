import { useState } from 'react';
import LoginForm from './LoginForm.jsx';
import Users from './Users.jsx';

export default function App() {
  const [session, setSession] = useState(null);

  return (
    <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <span className="font-bold tracking-wide text-accent">Lara Academy</span>
        {session && (
          <div className="flex items-center gap-4">
            <span>Mer7ba {session.user.nom}</span>
            <button className="cursor-pointer rounded-lg bg-surface px-3 py-2 font-semibold" onClick={() => setSession(null)}>Déconnexion</button>
          </div>
        )}
      </header>
      {session ? <Users token={session.token} /> : <LoginForm onLogin={setSession} />}
    </main>
  );
}
