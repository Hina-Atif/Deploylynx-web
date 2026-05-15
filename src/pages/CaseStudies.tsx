import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Plus, X, Trash2 } from 'lucide-react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError, auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const quotes = [
  { text: "Success is not final, failure is not fatal.", author: "Churchill" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
  { text: "The system is the solution.", author: "AT&T" },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { text: "Architecture starts where engineering ends.", author: "Walter Gropius" },
  { text: "Move fast and break things with stable infra.", author: "DevOps Motto" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
];

const DEFAULT_CASES = [
  {
    id: "1",
    category: "Portfolio Deployment | SaaS Startup",
    title: "FinTech Scalability",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    problem: [
      "Slow manual deployments (45 mins+)",
      "Frequent downtime during traffic spikes",
      "Zero infrastructure visibility"
    ],
    solution: [
      "Automated AWS EKS (Kubernetes) Setup",
      "Dockerized microservices architecture",
      "Jenkins Groovy-based Pipeline"
    ],
    impact: [
      "🚀 70% Faster Deployments",
      "⚡ 99.99% Infrastructure Uptime"
    ]
  },
  {
    id: "2",
    category: "Demo Project | E-Commerce",
    title: "Auto-Scaling Architecture",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    problem: [
      "High monthly cloud waste ($2k+)",
      "Security vulnerabilities in OS",
      "Manual database backups"
    ],
    solution: [
      "Terraform Infrastructure as Code",
      "Implemented FinOps cost tagging",
      "Automated RDS failover systems"
    ],
    impact: [
      "💰 60% Reduced Cloud Bill",
      "🛡️ 100% Security Patch Compliance"
    ]
  }
];

const techStack = [
  { icon: "☸️", title: "Orchestration", desc: "Kubernetes (EKS/GKE) for high-availability microservices." },
  { icon: "🏗️", title: "Provisioning", desc: "Terraform & Ansible for immutable infrastructure." },
  { icon: "🔄", title: "CI/CD", desc: "Jenkins & GitHub Actions for 1-click deployments." },
  { icon: "📊", title: "Observability", desc: "Prometheus & Grafana for real-time system health." },
];

export default function CaseStudies() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [caseHistory, setCaseHistory] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [newCase, setNewCase] = useState({
    title: "",
    category: "Internal Deployment",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    problem: "",
    solution: "",
    impact: ""
  });

  useEffect(() => {
    // Listen for case studies
    const q = query(collection(db, 'case_studies'), orderBy('createdAt', 'desc'));
    const unsubscribeCases = onSnapshot(q, (snapshot) => {
      const caseList = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as any[];
      
      if (caseList.length === 0) {
        setCaseHistory(DEFAULT_CASES);
      } else {
        setCaseHistory(caseList);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'case_studies');
    });

    // Listen for auth state
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      const adminStatus = localStorage.getItem('deploylynx_admin') === 'true' || 
                         (user && user.email === 'deploylynx26@gmail.com');
      setIsAdmin(!!adminStatus);
    });

    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => {
      unsubscribeCases();
      unsubscribeAuth();
      clearInterval(interval);
    };
  }, []);

  const handleAddCase = async (e: FormEvent) => {
    e.preventDefault();
    const item = {
      category: newCase.category,
      title: newCase.title,
      image: newCase.image,
      problem: newCase.problem.split('\n').filter(l => l.trim()),
      solution: newCase.solution.split('\n').filter(l => l.trim()),
      impact: newCase.impact.split('\n').filter(l => l.trim()),
      createdAt: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, 'case_studies'), item);
      setIsAdding(false);
      setNewCase({ title: "", category: "Internal Deployment", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", problem: "", solution: "", impact: "" });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'case_studies');
    }
  };

  const handleDeleteCase = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'case_studies', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `case_studies/${id}`);
    }
  };

  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <header className="px-6 py-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "fit-content" }}
            className="overflow-hidden whitespace-nowrap border-r-4 border-cyan-400 pr-2"
          >
            <span className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-sm md:text-lg">
              Engineering Excellence
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-7xl font-black mt-6 mb-8 tracking-tighter leading-none"
          >
            Proven Cloud <br /> Architecture.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl"
          >
            Detailed breakdowns of how we solve high-stakes infrastructure problems for growing tech companies.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex justify-center"
        >
          {/* Background Glare removed for solid black look */}

          <div className="relative z-10 w-full max-w-md aspect-square bg-white/5 backdrop-blur-3xl rounded-[40px] border border-white/10 flex items-center justify-center p-12">
            <motion.div 
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-full h-full border-2 border-dashed border-cyan-400/30 rounded-full flex items-center justify-center"
            >
              {/* Background Glare removed for solid black look */}

            </motion.div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <span className="text-xs uppercase tracking-widest font-black text-slate-500 mb-2">Internal Metric</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={quoteIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-2xl md:text-3xl font-black italic tracking-tighter text-white leading-tight">
                      {quotes[quoteIndex].text}
                    </span>
                    <span className="mt-2 text-[10px] uppercase tracking-widest font-bold text-cyan-400 group-hover:text-pink-500 transition-colors">
                      — {quotes[quoteIndex].author}
                    </span>
                  </motion.div>
                </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Admin Actions */}
      <AnimatePresence>
        {isAdmin && (
          <div className="px-6 pb-20 max-w-7xl mx-auto">
            <div className="bg-cyan-400/5 border border-cyan-400/20 rounded-[40px] p-10">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <h3 className="text-sm font-black uppercase tracking-widest text-cyan-400">Admin Case Terminal</h3>
                </div>
                <button 
                  onClick={() => setIsAdding(!isAdding)}
                  className="bg-white text-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-colors"
                >
                  {isAdding ? "Close Terminal" : "New Case Study"}
                </button>
              </div>

              {isAdding && (
                <motion.form 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleAddCase} 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Project Title" 
                      required 
                      value={newCase.title}
                      onChange={e => setNewCase({...newCase, title: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm focus:border-cyan-400 outline-none" 
                    />
                    <input 
                      type="text" 
                      placeholder="Category (e.g. SaaS Setup)" 
                      required 
                      value={newCase.category}
                      onChange={e => setNewCase({...newCase, category: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm focus:border-cyan-400 outline-none" 
                    />
                    <input 
                      type="text" 
                      placeholder="Project Image URL" 
                      required 
                      value={newCase.image}
                      onChange={e => setNewCase({...newCase, image: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm focus:border-cyan-400 outline-none" 
                    />
                    <textarea 
                      placeholder="Problems (One per line)" 
                      required 
                      value={newCase.problem}
                      onChange={e => setNewCase({...newCase, problem: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm focus:border-cyan-400 outline-none h-40" 
                    />
                  </div>
                  <div className="space-y-4">
                    <textarea 
                      placeholder="Solutions (One per line)" 
                      required 
                      value={newCase.solution}
                      onChange={e => setNewCase({...newCase, solution: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm focus:border-cyan-400 outline-none h-40" 
                    />
                    <textarea 
                      placeholder="Impacts (One per line)" 
                      required 
                      value={newCase.impact}
                      onChange={e => setNewCase({...newCase, impact: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm focus:border-cyan-400 outline-none h-40" 
                    />
                    <button type="submit" className="w-full bg-cyan-400 text-black py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-colors">
                      Deploy Case Study
                    </button>
                  </div>
                </motion.form>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Grid Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-slate-500 uppercase tracking-widest mb-16">Internal Portfolio Projects</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {caseHistory.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0b1120] rounded-3xl p-10 md:p-12 border border-white/5 border-l-4 border-l-cyan-400 relative overflow-hidden group hover:bg-white/5 transition-all"
            >
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="text-cyan-400 text-xs font-black uppercase tracking-widest">{item.category}</div>
                {isAdmin && (
                  <button 
                    onClick={() => handleDeleteCase(item.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors bg-black/50 rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              
              {item.image && (
                <div className="aspect-[16/6] overflow-hidden rounded-2xl mb-8 border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              )}

              <h3 className="text-3xl md:text-5xl font-black text-white mb-10 tracking-tight relative z-10">{item.title}</h3>

              <div className="space-y-10">
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Problem</h4>
                  <ul className="space-y-3">
                    {item.problem.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-3 text-slate-300 font-medium text-sm">
                        <ArrowRight size={14} className="text-cyan-400" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Solution</h4>
                  <ul className="space-y-3">
                    {item.solution.map((s, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-3 text-slate-300 font-medium text-sm">
                        <ArrowRight size={14} className="text-cyan-400" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#111827] -mx-10 -mb-12 mt-12 p-10 border-t border-white/5">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Impact</h4>
                  <div className="space-y-4">
                    {item.impact.map((imp, impIdx) => (
                      <div key={impIdx} className="text-xl font-black text-white tracking-tight">
                        {imp}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Framework Section */}
      <section className="px-6 py-32 bg-black/30 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-4">The DeployLynx Standard</div>
          <h2 className="text-3xl md:text-5xl font-black mb-16 tracking-tight">Core Technology Framework</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {techStack.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white/5 p-10 rounded-3xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all"
              >
                <div className="text-4xl mb-6">{item.icon}</div>
                <h4 className="text-lg font-bold mb-3">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-40 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter">Ready to scale your stack?</h2>
          <p className="text-slate-400 text-lg md:text-xl mb-12">Let’s build a high-availability roadmap for your business.</p>
          <a 
            href="/contact"
            className="inline-flex bg-white text-black px-12 py-6 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-cyan-400/20"
          >
            Let's build your infrastructure
          </a>
        </motion.div>
      </section>
    </div>
  );
}
