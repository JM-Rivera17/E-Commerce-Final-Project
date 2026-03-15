import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Login = () => {
  const navigate = useNavigate();
  const { userLogin } = useStore();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await userLogin(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md p-8"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold font-rajdhani mb-2 tracking-tighter">WELCOME BACK</h2>
          <p className="text-white/40 text-sm italic">Enter the orbit of gaming universe.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-xs mb-6 text-center font-bold uppercase">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/60 tracking-widest">EMAIL ADDRESS</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-white/20" />
              <input 
                type="email" 
                required
                placeholder="commander@saturn.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-2.5 focus:outline-none focus:border-saturn-accent transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/60 tracking-widest">PASSWORD</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-white/20" />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-2.5 focus:outline-none focus:border-saturn-accent transition-all"
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary py-3 flex items-center justify-center gap-2 mt-4">
            <LogIn className="w-4 h-4" />
            INITIATE LOGIN
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-white/40">
          DON'T HAVE AN ACCOUNT? <Link to="/register" className="text-saturn-accent hover:underline">SIGN UP HERE</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
