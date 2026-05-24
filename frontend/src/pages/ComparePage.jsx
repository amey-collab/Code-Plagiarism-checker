import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { uploadFiles, compareCode } from '../api';
import SimilarityCard from '../components/SimilarityCard';

const ComparePage = () => {
  const [codeA, setCodeA] = useState('');
  const [codeB, setCodeB] = useState('');
  const [fileAName, setFileAName] = useState('Paste or upload code');
  const [fileBName, setFileBName] = useState('Paste or upload code');
  const [languageA, setLanguageA] = useState('javascript');
  const [languageB, setLanguageB] = useState('javascript');
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async (event, target) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append(target, file);
    setStatus({ loading: true, message: 'Uploading file...', type: 'info' });
    try {
      const data = await uploadFiles(formData);
      const uploaded = data.uploaded[0];
      if (target === 'codeFileA') {
        setCodeA(uploaded.contents);
        setFileAName(uploaded.filename);
        setLanguageA(uploaded.filename.split('.').pop());
      } else {
        setCodeB(uploaded.contents);
        setFileBName(uploaded.filename);
        setLanguageB(uploaded.filename.split('.').pop());
      }
      setStatus({ loading: false, message: 'File uploaded successfully', type: 'success' });
    } catch (error) {
      setStatus({ loading: false, message: error.response?.data?.error || 'Upload failed', type: 'error' });
    }
  };

  const handleCompare = async (event) => {
    event.preventDefault();
    if (!codeA || !codeB) {
      setStatus({ loading: false, message: 'Provide both code samples before comparing.', type: 'error' });
      return;
    }
    setStatus({ loading: true, message: 'Analyzing code...', type: 'info' });
    try {
      const data = await compareCode({ codeA, codeB, languageA, languageB });
      setSummary(data.report);
      setStatus({ loading: false, message: 'Comparison complete.', type: 'success' });
      navigate('/results', { state: { report: data.report } });
    } catch (error) {
      setStatus({ loading: false, message: error.response?.data?.error || 'Comparison failed', type: 'error' });
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 md:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Compare code</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Upload or paste both files.</h2>
            </div>
          </div>
          <form onSubmit={handleCompare} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-sm font-semibold text-white">Code A</label>
                  <span className="text-xs text-slate-400">{fileAName}</span>
                </div>
                <textarea value={codeA} onChange={(e) => setCodeA(e.target.value)} rows={8} placeholder="Paste code A here" className="w-full resize-none rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-400/50" />
                <div className="flex items-center gap-3">
                  <select value={languageA} onChange={(e) => setLanguageA(e.target.value)} className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-slate-100 outline-none">
                    {['javascript','python','java','c','cpp'].map(lang => <option key={lang} value={lang}>{lang}</option>)}
                  </select>
                  <label className="cursor-pointer rounded-3xl bg-white/5 px-4 py-2 text-sm text-cyan-300 transition hover:bg-white/10">
                    Upload
                    <input type="file" accept=".js,.jsx,.ts,.tsx,.py,.java,.c,.cpp" onChange={(e) => handleUpload(e, 'codeFileA')} className="hidden" />
                  </label>
                </div>
              </div>
              <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-sm font-semibold text-white">Code B</label>
                  <span className="text-xs text-slate-400">{fileBName}</span>
                </div>
                <textarea value={codeB} onChange={(e) => setCodeB(e.target.value)} rows={8} placeholder="Paste code B here" className="w-full resize-none rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-400/50" />
                <div className="flex items-center gap-3">
                  <select value={languageB} onChange={(e) => setLanguageB(e.target.value)} className="rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-slate-100 outline-none">
                    {['javascript','python','java','c','cpp'].map(lang => <option key={lang} value={lang}>{lang}</option>)}
                  </select>
                  <label className="cursor-pointer rounded-3xl bg-white/5 px-4 py-2 text-sm text-cyan-300 transition hover:bg-white/10">
                    Upload
                    <input type="file" accept=".js,.jsx,.ts,.tsx,.py,.java,.c,.cpp" onChange={(e) => handleUpload(e, 'codeFileB')} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
            <button type="submit" className="w-full rounded-3xl bg-cyan-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400" disabled={status.loading}>
              {status.loading ? 'Analyzing...' : 'Compare code now'}
            </button>
            {status.message && <p className={`text-sm ${status.type === 'error' ? 'text-rose-400' : 'text-cyan-200'}`}>{status.message}</p>}
          </form>
        </div>

        <div className="space-y-6">
          <SimilarityCard title="Latest scan" value={summary?.similarity ? `${summary.similarity}%` : 'Ready'} label={summary?.suspiciousness || 'Awaiting scan'} description={summary?.summary?.description || 'Upload or paste code to start a new analysis.'} accent="bg-violet-500/15 text-violet-200" />
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
            <h3 className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">How it works</h3>
            <ul className="mt-5 space-y-4 text-sm text-slate-300">
              <li>1. Remove comments and normalize code.</li>
              <li>2. Analyze tokens, N-grams, structure and similarity.</li>
              <li>3. Highlight matching lines and generate a detailed report.</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ComparePage;
