import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SimilarityCard from '../components/SimilarityCard';
import CodePanel from '../components/CodePanel';
import { getReport } from '../api';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [report, setReport] = useState(location.state?.report || null);
  const [loading, setLoading] = useState(!location.state?.report);
  const [error, setError] = useState('');

  useEffect(() => {
    if (report || !id) return;
    getReport(id)
      .then(data => setReport(data.report))
      .catch(err => setError(err.response?.data?.error || 'Unable to load report'))
      .finally(() => setLoading(false));
  }, [id, report]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center text-slate-300 md:px-8">
        <h2 className="text-3xl font-semibold text-white">Loading report...</h2>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center text-slate-300 md:px-8">
        <h2 className="text-3xl font-semibold text-white">No report available</h2>
        <p className="mt-4">{error || 'Run a new scan in the Compare page or select a report from history.'}</p>
        <button onClick={() => navigate('/compare')} className="mt-6 rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
          Go to Compare
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 md:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Scan report</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">{report.title}</h1>
          </div>
          <div className="rounded-3xl bg-slate-950/80 px-5 py-3 text-sm text-slate-300">
            Generated on {new Date(report.generatedAt).toLocaleString()}
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        <SimilarityCard title="Similarity" value={`${report.similarity}%`} label={report.suspiciousness} description="Overall plagiarism score based on token and structure analysis." accent="bg-violet-500/15 text-violet-200" />
        <SimilarityCard title="Confidence" value={report.confidence} label="Reliability" description="Confidence score derived from composite similarity metrics." accent="bg-cyan-500/15 text-cyan-200" />
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-glow">
          <h3 className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Tokens</h3>
          <div className="mt-4 text-3xl font-semibold text-white">{report.tokenCountA} / {report.tokenCountB}</div>
          <p className="mt-3 text-sm text-slate-400">Token counts in each source file.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-6">
          <CodePanel title={`File A • ${report.filenameA}`} code="" lines={report.linesA || report.linesA || []} highlighted={report.matchedLinesA} />
          <CodePanel title={`File B • ${report.filenameB}`} code="" lines={report.linesB || report.linesB || []} highlighted={report.matchedLinesB} />
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
          <h3 className="text-base font-semibold text-white">Report summary</h3>
          <p className="mt-3 text-sm text-slate-300">{report.summary.description}</p>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl bg-slate-950/70 p-4">
              <span className="block text-xs uppercase tracking-[0.24em] text-cyan-300/80">Metrics</span>
              <div className="mt-3 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span className="text-sm text-slate-300">LCS similarity</span>
                  <strong className="text-white">{report.metricBreakdown.lcs}</strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span className="text-sm text-slate-300">N-gram score</span>
                  <strong className="text-white">{report.metricBreakdown.ngram}</strong>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span className="text-sm text-slate-300">Cosine similarity</span>
                  <strong className="text-white">{report.metricBreakdown.cosine}</strong>
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-950/70 p-4">
              <span className="block text-xs uppercase tracking-[0.24em] text-cyan-300/80">Matches</span>
              <div className="mt-3 space-y-3">
                {report.matchingSegments.length ? (
                  report.matchingSegments.slice(0, 4).map((segment, index) => (
                    <div key={index} className="rounded-2xl bg-white/5 p-3">
                      <p className="text-sm text-slate-200">Lines A: {segment.linesA.join(', ')} | Lines B: {segment.linesB.join(', ')}</p>
                      <p className="mt-2 text-xs text-slate-400">Matched tokens: {segment.length}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">No matching segments found in the selected scan.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
