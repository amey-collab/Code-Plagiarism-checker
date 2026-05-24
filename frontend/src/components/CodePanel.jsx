import { motion } from 'framer-motion';

const CodePanel = ({ title, code, lines, highlighted }) => {
  const displayLines = lines.length ? lines : code.split(/\r?\n/);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="glow-panel overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl"
    >
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
        <h3 className="text-sm uppercase tracking-[0.24em] text-cyan-300/90">{title}</h3>
      </div>
      <div className="space-y-1 text-left text-sm leading-6 text-slate-200">
        {displayLines.map((line, index) => {
          const number = index + 1;
          const active = highlighted?.includes(number);
          return (
            <div key={index} className={`flex items-start gap-4 rounded-2xl px-3 py-1 transition ${active ? 'bg-cyan-500/15 text-cyan-100' : 'hover:bg-white/5'}`}>
              <span className="min-w-[2rem] select-none text-right text-xs text-slate-500">{number}</span>
              <code className="whitespace-pre-wrap break-words text-[13px] leading-5">{line}</code>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CodePanel;
