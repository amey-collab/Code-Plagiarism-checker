import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getHistory } from '../api';
import ScanCard from '../components/ScanCard';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await getHistory();
        setHistory(response.history);
      } catch (err) {
        setError(err.response?.data?.error || 'Unable to load history');
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
        <h1 className="text-3xl font-semibold text-white">Scan history</h1>
        <p className="mt-3 text-slate-400">Access every saved comparison and review previous reports for your account.</p>
      </motion.div>
      {loading ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 text-slate-300">Loading history...</div>
      ) : error ? (
        <div className="rounded-[2rem] border border-rose-500/20 bg-rose-500/5 p-8 text-rose-200">{error}</div>
      ) : history.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 text-slate-300">No scans saved yet. Run a compare to store your first report.</div>
      ) : (
        <div className="grid gap-6">
          {history.map(scan => <ScanCard key={scan.id} scan={scan} />)}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
