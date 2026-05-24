const SimilarityCard = ({ title, value, label, description, accent }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-glow">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm uppercase tracking-[0.24em] text-slate-400">{title}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${accent}`}>{label}</span>
      </div>
      <div className="mt-4 text-4xl font-semibold text-white">{value}</div>
      <p className="mt-3 text-sm text-slate-400">{description}</p>
    </div>
  );
};

export default SimilarityCard;
