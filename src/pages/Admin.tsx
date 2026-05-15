import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock, ShieldCheck, ArrowRight, Chrome } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function Admin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'deploylynx@gmail.com') {
        localStorage.setItem('deploylynx_admin', 'true');
        navigate('/blog');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      if (result.user.email !== 'deploylynx@gmail.com') {
        setErrorMessage(`Access Denied: ${result.user.email} is not authorized.`);
        await auth.signOut();
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setErrorMessage(err.message || "Failed to authenticate with Google");
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    // Simple mock password for professional look
    if (password === "admin123") {
      localStorage.setItem('deploylynx_admin', 'true');
      navigate('/blog');
    } else {
      setErrorMessage("Invalid Password");
      setTimeout(() => setErrorMessage(""), 2000);
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
          <h1 className="text-3xl font-black tracking-tighter uppercase">Admin Terminal</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-2">Authorized Access Only</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-black py-5 rounded-2xl hover:bg-cyan-400/20 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3 group"
            >
              <Chrome size={18} />
              {loading ? "Authenticating..." : "Sign in with Google"}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.4em] text-cyan-400 bg-black px-4">
              PASSWORD
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full bg-black border ${errorMessage ? 'border-red-500' : 'border-white/10 focus:border-cyan-400'} rounded-2xl py-5 px-6 text-sm transition-all outline-none text-center tracking-widest`}
            />
            {errorMessage && (
              <p className="text-red-500 text-[10px] uppercase font-bold text-center mt-2 px-4 leading-relaxed">
                {errorMessage}
              </p>
            )}

            <button 
              type="submit"
              className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-cyan-400 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 group"
            >
              Login <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

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
