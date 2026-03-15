import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Lock, LogIn, ChevronLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminLogin } = useStore();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = adminLogin(email, password);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090d] flex items-center justify-center p-4">
      <div className="absolute top-8 left-8">
        <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
          <ChevronLeft className="w-4 h-4" /> Back to Store
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-saturn-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-saturn-accent/20">
            <ShieldAlert className="w-8 h-8 text-saturn-accent" />
          </div>
          <h2 className="text-3xl font-bold font-rajdhani tracking-tighter text-white">ADMINISTRATOR PORTAL</h2>
          <p className="text-white/40 text-sm mt-2">Restricted access for station commanders only.</p>
        </div>

        <div className="glass-card p-8 border-saturn-accent/10">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-lg text-[10px] font-black uppercase tracking-widest mb-6 text-center">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 tracking-widest uppercase">Admin Identifier</label>
              <input 
                type="email" 
                required
                placeholder="admin@saturn.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-saturn-accent transition-all text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 tracking-widest uppercase">Security Key</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-saturn-accent transition-all text-white"
              />
            </div>

            <button type="submit" className="w-full bg-saturn-accent text-black font-black py-4 rounded text-xs tracking-[0.2em] uppercase hover:bg-white transition-all flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" />
              Authorize Access
            </button>
          </form>
        </div>
        
        <p className="text-center text-[10px] text-white/10 mt-8 font-bold tracking-[0.3em] uppercase">
          Unauthorized Access is Strictly Prohibited
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
