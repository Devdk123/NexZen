import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}

function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-16">
      <header className="mb-16 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">NEXZEN</p>
          <h1 className="mt-3 text-4xl font-black md:text-6xl">Build smarter. Launch faster.</h1>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <a href="#features">Features</a>
          <a href="#ecosystem">Ecosystem</a>
          <a href="#community">Community</a>
        </nav>
      </header>

      <section className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
            Future-ready platform
          </p>
          <h2 className="max-w-xl text-5xl font-black leading-tight md:text-7xl">
            The event and hackathon network for builders.
          </h2>
          <p className="mt-6 max-w-lg text-lg text-slate-300">
            Discover events, recruit standout teams, launch ideas faster, and turn momentum into real-world impact.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#features" className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
              Explore platform
            </a>
            <a href="/dashboard" className="rounded-full border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-white transition hover:border-cyan-400/60 hover:text-cyan-300">
              Open dashboard
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur">
          <div className="grid gap-4">
            <div className="rounded-2xl border border-violet-500/40 bg-violet-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-violet-300">Live momentum</p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-3xl font-black text-white">12k</p>
                  <p className="text-xs text-slate-300">Builders</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-white">240</p>
                  <p className="text-xs text-slate-300">Events</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-white">94%</p>
                  <p className="text-xs text-slate-300">Engagement</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
                <p className="text-sm text-slate-400">Upcoming launch</p>
                <p className="mt-2 text-xl font-bold">AI Builders Summit</p>
                <p className="mt-1 text-sm text-cyan-300">May 24 • Remote</p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
                <p className="text-sm text-slate-400">Top challenge</p>
                <p className="mt-2 text-xl font-bold">Climate Hack</p>
                <p className="mt-1 text-sm text-cyan-300">$25k prize pool</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mt-20 grid gap-6 md:grid-cols-3">
        {[
          ['Matchmaking', 'Find collaborators, mentors, and high-potential teams in one place.'],
          ['Event pipeline', 'Manage launches, show up for the right communities, and track conversion.'],
          ['Community growth', 'Turn every event into a flywheel for talent, partners, and content.'],
        ].map(([title, body]) => (
          <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="mb-5 h-11 w-11 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500" />
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="mt-3 text-slate-300">{body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

function DashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">Dashboard</p>
          <h1 className="mt-2 text-3xl font-black">Growth engine overview</h1>
        </div>
        <button className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 font-medium text-cyan-300">
          New campaign
        </button>
      </div>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          ['Members', '28,640'],
          ['Events launched', '184'],
          ['Conversion rate', '9.6%'],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-3 text-3xl font-black text-white">{value}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
