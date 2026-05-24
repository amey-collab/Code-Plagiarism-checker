import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser, registerUser } from '../api';
import { setStoredUser } from '../utils/auth';

const AuthPage = ({ mode }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });
  const navigate = useNavigate();
  const isRegister = mode === 'register';

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, message: 'Processing...', type: 'info' });
    try {
      const payload = isRegister ? { name: form.name, email: form.email, password: form.password } : { email: form.email, password: form.password };
      const response = isRegister ? await registerUser(payload) : await loginUser(payload);
      setStoredUser({ token: response.token, user: response.user });
      navigate('/compare');
    } catch (error) {
      setStatus({ loading: false, message: error.response?.data?.error || 'Unable to authenticate', type: 'error' });
    }
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-10 md:px-8">
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">{isRegister ? 'Create account' : 'Welcome back'}</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">{isRegister ? 'Secure your scanning workspace' : 'Log in to your dashboard'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <label className="block text-sm text-slate-200">
              Name
              <input name="name" value={form.name} onChange={handleChange} required className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50" />
            </label>
          )}
          <label className="block text-sm text-slate-200">
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50" />
          </label>
          <label className="block text-sm text-slate-200">
            Password
            <input name="password" type="password" value={form.password} onChange={handleChange} required className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400/50" />
          </label>
          <button type="submit" className="w-full rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400" disabled={status.loading}>
            {status.loading ? 'Processing...' : isRegister ? 'Create account' : 'Login'}
          </button>
          {status.message && (
            <p className={`text-sm ${status.type === 'error' ? 'text-rose-400' : 'text-cyan-200'}`}>{status.message}</p>
          )}
        </form>

        <p className="mt-6 text-sm text-slate-400">
          {isRegister ? 'Already have an account?' : 'New user?'}{' '}
          <Link to={isRegister ? '/login' : '/register'} className="text-cyan-300 hover:text-cyan-200">
            {isRegister ? 'Login here' : 'Create one'}
          </Link>
        </p>
      </motion.section>
    </div>
  );
};

export default AuthPage;
