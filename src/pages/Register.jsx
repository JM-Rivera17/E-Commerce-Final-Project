import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useStore();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    const result = register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    if (result.success) {
      alert(result.message);
      navigate('/login');
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
          <h2 className="text-3xl font-bold font-rajdhani mb-2 tracking-tighter">NEW COMMANDER</h2>
          <p className="text-white/40 text-sm italic">Join the Saturn elite forces.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-xs mb-6 text-center font-bold">
            {error.toUpperCase()}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/60 tracking-widest">FULL NAME</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-2.5 focus:outline-none focus:border-saturn-accent transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/60 tracking-widest">EMAIL ADDRESS</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-white/20" />
              <input 
                type="email" 
                required
                placeholder="commander@saturn.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-2.5 focus:outline-none focus:border-saturn-accent transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/60 tracking-widest">CONFIRM PASSWORD</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-white/20" />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-2.5 focus:outline-none focus:border-saturn-accent transition-all"
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary py-3 flex items-center justify-center gap-2 mt-4">
            <UserPlus className="w-4 h-4" />
            CREATE ACCOUNT
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-white/40">
          ALREADY HAVE AN ACCOUNT? <Link to="/login" className="text-saturn-accent hover:underline">SIGN IN HERE</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
