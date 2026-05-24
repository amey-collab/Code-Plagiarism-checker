import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clearStoredUser, getStoredUser } from '../utils/auth';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Compare', path: '/compare' },
  { label: 'History', path: '/history' }
];

const SiteHeader = () => {
  const [auth, setAuth] = useState(getStoredUser());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setAuth(getStoredUser());
  }, [location.pathname]);

  const handleLogout = () => {
    clearStoredUser();
    setAuth({ token: null, user: null });
    navigate('/login');
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="sticky top-0 z-30 border-b border-white/10 bg-surface/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="inline-flex items-center gap-3 text-xl font-semibold text-white">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 text-slate-950 shadow-glow">CP</span>
          CodePlagiarism
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {auth.token && navItems.map(item => (
            <Link key={item.path} to={item.path} className="text-sm text-slate-300 hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {auth.token ? (
            <>
              <span className="hidden rounded-full bg-white/5 px-3 py-2 text-sm text-slate-200 sm:inline-flex">{auth.user?.name}</span>
              <button onClick={handleLogout} className="rounded-2xl bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-400">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400">
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default SiteHeader;
