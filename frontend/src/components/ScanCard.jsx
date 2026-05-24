import { Link } from 'react-router-dom';

const ScanCard = ({ scan }) => {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-glow transition hover:-translate-y-1 hover:border-cyan-400/25">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{scan.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{scan.filenameA} vs {scan.filenameB}</p>
        </div>
        <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-sm font-semibold text-cyan-200">{scan.languageA} → {scan.languageB}</span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-300">
        <span>Similarity: <strong className="text-white">{scan.similarity}%</strong></span>
        <span>{scan.suspiciousness}</span>
        <span>{new Date(scan.createdAt).toLocaleDateString()}</span>
      </div>
      <Link to={`/results/${scan.id}`} className="mt-5 inline-flex rounded-2xl bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-400">
        View Report
      </Link>
    </article>
  );
};

export default ScanCard;
