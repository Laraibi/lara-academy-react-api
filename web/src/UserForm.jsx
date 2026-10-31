import { useState } from 'react';

const INPUT = 'mt-2 block w-full rounded-xl border border-indigo-300/40 bg-surface p-3 text-copy';

export default function UserForm({ onAdd }) {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    try {
      await onAdd({ nom, email, password });
      setNom('');
      setEmail('');
      setPassword('');
    } catch (addError) {
      setError(addError.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="self-start rounded-2xl border border-white/10 bg-panel p-6">
      <h2 className="text-xl font-bold">Ajouter</h2>
      <label className="mt-4 block font-semibold">Nom
        <input className={INPUT} value={nom} onChange={event => setNom(event.target.value)} />
      </label>
      <label className="mt-4 block font-semibold">Email
        <input className={INPUT} type="email" value={email} onChange={event => setEmail(event.target.value)} />
      </label>
      <label className="mt-4 block font-semibold">Mot de passe
        <input className={INPUT} type="password" value={password} onChange={event => setPassword(event.target.value)} />
      </label>
      {error && <p role="alert" className="mt-4 text-red-300">{error}</p>}
      <button className="mt-5 w-full cursor-pointer rounded-lg bg-accent px-4 py-3 font-semibold text-ink">Ajouter</button>
    </form>
  );
}
