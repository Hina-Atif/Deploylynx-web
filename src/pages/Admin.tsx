import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Simple mock password for professional look
    if (password === "admin123") {
      localStorage.setItem('deploylynx_admin', 'true');
      navigate('/blog');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-transparent opacity-50" />
        
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">Nexus Terminal</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-2">Authorized Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Access Key</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full bg-black border ${error ? 'border-red-500' : 'border-white/10 focus:border-cyan-400'} rounded-2xl py-5 px-6 text-sm transition-all outline-none text-center tracking-widest`}
            />
            {error && <p className="text-red-500 text-[10px] uppercase font-bold text-center mt-2">Invalid Protocol Key</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-cyan-400 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 group"
          >
            Initiate Session <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-white/5 flex justify-between items-center opacity-30">
          <div className="flex items-center gap-2">
            <ShieldCheck size={12} className="text-cyan-400" />
            <span className="text-[8px] font-bold uppercase tracking-widest">TLS 1.3 Active</span>
          </div>
          <span className="text-[8px] font-bold uppercase tracking-widest">v2.4.0-stable</span>
        </div>
      </motion.div>
    </div>
  );
}
