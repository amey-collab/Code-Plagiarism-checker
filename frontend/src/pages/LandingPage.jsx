import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdCode, MdSecurity, MdAnalytics } from 'react-icons/md';

const stats = [
  { icon: <MdCode size={24} />, title: 'Multi-language', description: 'C, C++, Java, Python, JavaScript support.' },
  { icon: <MdAnalytics size={24} />, title: 'Deep Analysis', description: 'LCS, cosine, N-gram and structural matching.' },
  { icon: <MdSecurity size={24} />, title: 'Secure Reports', description: 'JWT auth and user scan history.' }
];

const LandingPage = () => {
  return (
    <section className="mx-auto max-w-7xl space-y-10 px-4 py-10 md:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Detect copied logic across code with precision and speed.
          </motion.h1>
          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="max-w-2xl text-slate-300">
            A futuristic code plagiarism platform for developers, educators, and institutions. Compare files, highlight repeated structures, and store secure scan history in MongoDB.
          </motion.p>
          <div className="flex flex-wrap gap-4">
            <Link to="/register" className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              Start scanning
            </Link>
            <Link to="/compare" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white transition hover:border-cyan-400/40">
              Compare now
            </Link>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
          <div className="rounded-3xl bg-slate-950/70 p-5">
            <div className="mb-6 flex items-center justify-between text-slate-100">
              <span className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Insight feed</span>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs">Live</span>
            </div>
            <div className="space-y-4">
              {stats.map(item => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {['Dark mode interface', 'Real-time scoring', 'Side-by-side diff'].map(item => (
          <div key={item} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-center shadow-glow">
            <p className="text-lg font-semibold text-white">{item}</p>
            <p className="mt-3 text-sm text-slate-400">A premium view that keeps every code comparison sharp and readable.</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LandingPage;
