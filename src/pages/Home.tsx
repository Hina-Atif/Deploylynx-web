import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, type FormEvent } from 'react';
import { ArrowRight, X, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const expertises = [
  {
    title: "Seamless Migration",
    description: "Zero-downtime migrations from on-premise or legacy systems to AWS."
  },
  {
    title: "Advanced DevSecOps",
    description: "Embedding security into your CI/CD pipelines with automated vulnerability scanning."
  },
  {
    title: "Auto Scaling Solutions",
    description: "Infrastructure that grows with your users. We optimize resource allocation."
  }
];

const teamPhotos = [
  { title: "Cloud Strategy", url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1000" },
  { title: "Infrastructure", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000" },
  { title: "Automation", url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=1000" },
  { title: "Security", url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" },
];

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [location, setLocation] = useState({ country: 'Unknown', city: 'Unknown' });

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setLocation({ country: data.country_name || 'Unknown', city: data.city || 'Unknown' });
      })
      .catch(() => console.log("Location tracker blocked"));
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSuccess(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00c6ff', '#ff6ec7', '#ffffff']
    });
    // Reset form after delay
    setTimeout(() => {
      setShowPopup(false);
      setFormSuccess(false);
    }, 3000);
  };

  return (
    <div className="relative">
      {/* Announcement Marquee */}
      <div className="bg-blue-600/10 border-b border-blue-500/20 py-2 overflow-hidden whitespace-nowrap">
        <div className="flex animate-[marquee_30s_linear_infinite] items-center space-x-12 text-[10px] font-bold tracking-widest uppercase text-cyan-400">
          <span className="flex-shrink-0">🚀 NEW: AWS Infrastructure Audits now available</span>
          <span className="flex-shrink-0">💎 20% Discount for First-Time SaaS Migrations</span>
          <span className="flex-shrink-0">⚡ DeployLynx: The Future of Cloud Automation</span>
          {/* Duplicate for seamless scroll */}
          <span className="flex-shrink-0">🚀 NEW: AWS Infrastructure Audits now available</span>
          <span className="flex-shrink-0">💎 20% Discount for First-Time SaaS Migrations</span>
          <span className="flex-shrink-0">⚡ DeployLynx: The Future of Cloud Automation</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center px-6 py-24 max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-left"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9]">
            Build Scalable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400">Cloud Systems</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
            Enterprise-grade infrastructure for modern SaaS. We automate your DevOps so you can focus on building your product.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://wa.me/923713600892" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-8 py-5 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-blue-600/20 active:scale-95"
            >
              Get Free Consultation
            </a>
            <button 
              onClick={() => setShowPopup(true)}
              className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
            >
              Quick Lead Form
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* Background Glare removed for solid black look */}

          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Tech" 
            className="rounded-[40px] border border-white/10 shadow-2xl relative z-10 w-full object-cover aspect-video md:aspect-square"
          />
        </motion.div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-4 tracking-tight"
          >
            Our Core Expertise
          </motion.h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Specialized solutions designed to handle the complexity of modern cloud architecture.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {expertises.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm p-10 rounded-[32px] border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all group"
            >
              <div className="w-12 h-12 bg-cyan-400/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio/Who We Are Gallery */}
      <section className="py-24 px-6 max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tight">Who We Are</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamPhotos.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[3rem] h-[500px] group border border-white/10"
            >
              <img 
                src={item.url} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={item.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-10 flex flex-col justify-end text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="font-black text-2xl tracking-tight text-cyan-400">{item.title}</h4>
                <p className="text-slate-400 text-sm mt-2 font-medium">Expert technical solutions for high-scale environments.</p>
              </div>
              {/* Default view label */}
              <div className="absolute bottom-10 left-10 text-white font-black text-xl tracking-tighter transition-opacity duration-300 group-hover:opacity-0">
                {item.title}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Blue CTA Banner */}
      <section className="px-6 py-24 max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-blue-600 rounded-[4rem] p-12 md:p-24 grid md:grid-cols-2 gap-16 items-center overflow-hidden relative"
        >
          {/* Background Glare removed for solid black look */}

          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter leading-tight text-white">
              Ready to scale your infrastructure?
            </h2>
            <button 
              onClick={() => setShowPopup(true)}
              className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-3 shadow-2xl shadow-black/20 active:scale-95"
            >
              Speak with our experts
              <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="relative hidden md:block group">
            {/* Background Glare removed for solid black look */}

            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
              className="rounded-3xl relative z-10 shadow-2xl"
              alt="Dashboard Analysis"
            />
          </div>
        </motion.div>
      </section>

      {/* Lead Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-dark-bg/90 backdrop-blur-xl p-10 rounded-[40px] w-full max-w-lg relative border border-white/20 shadow-2xl z-10"
          >
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            
            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400 mb-2 tracking-tight text-center">
              {formSuccess ? 'Congrats!' : 'Get Free Quote'}
            </h3>
            <p className="text-slate-400 text-sm text-center mb-10 font-medium">
              {formSuccess ? '✨ Message Sent Successfully!' : 'Modernize your infrastructure today.'}
            </p>
            
            <AnimatePresence mode="wait">
              {formSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10"
                >
                  <CheckCircle size={80} className="text-cyan-400 mb-4 animate-bounce" />
                  <p className="text-slate-300 font-bold tracking-widest text-xs uppercase">Wait for our experts...</p>
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4" 
                  onSubmit={handleSubmit}
                >
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-cyan-400 transition-colors text-sm" 
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-cyan-400 transition-colors text-sm" 
                  />
                  <textarea 
                    placeholder="Project details" 
                    rows={4} 
                    required 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-cyan-400 transition-colors text-sm resize-none" 
                  />
                  {/* Hidden inputs to capture location as in the original HTML */}
                  <input type="hidden" name="country" value={location.country} />
                  <input type="hidden" name="city" value={location.city} />
                  
                  <button 
                    type="submit" 
                    className="w-full bg-cyan-400 text-black font-black py-5 rounded-2xl hover:bg-white transition-all uppercase tracking-widest text-xs shadow-xl shadow-cyan-400/20 active:scale-95"
                  >
                    Send Inquiry →
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
