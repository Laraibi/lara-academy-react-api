import Users from './Users.jsx';

export default function App() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <span className="font-bold tracking-wide text-accent">Lara Academy</span>
      </header>
      <Users />
    </main>
  );
}
