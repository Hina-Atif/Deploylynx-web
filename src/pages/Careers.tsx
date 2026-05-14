import { motion } from 'motion/react';
import { Briefcase, MapPin, Clock, ArrowRight, Zap, Target, Star } from 'lucide-react';

const positions = [
  {
    title: "Senior Cloud Architect (AWS)",
    location: "Remote / Islamabad",
    type: "Full-time",
    department: "Engineering",
    salary: "$3k - $5k",
    perks: ["Remote First", "Equity Options", "Learning Stipend"]
  },
  {
    title: "DevSecOps Engineer",
    location: "Remote",
    type: "Full-time",
    department: "Security",
    salary: "$2.5k - $4k",
    perks: ["Health Insurance", "Latest MacBook", "Yearly Retreat"]
  },
  {
    title: "Kubernetes Platform Engineer",
    location: "Hybrid (Karachi)",
    type: "Contract / Full-time",
    department: "Infrastructure",
    salary: "$2.8k - $4.5k",
    perks: ["Free Gym", "Flexible Hours", "Mental Health Support"]
  }
];

const values = [
  { icon: <Zap className="text-cyan-400" />, title: "Automate Everything", desc: "If you have to do it twice, it should have been a script. We value efficiency above all else." },
  { icon: <Target className="text-pink-500" />, title: "Precision First", desc: "We build systems that handle millions of requests. There is no room for 'good enough'." },
  { icon: <Star className="text-yellow-400" />, title: "Continuous Growth", desc: "The tech stack changes every 6 months. We ensure our team is always at the cutting edge." },
];

export default function Careers() {
  return (
    <div className="pt-24 min-h-screen bg-black">
      {/* Hero Section */}
      <header className="px-6 py-32 max-w-7xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-8"
        >
          We Are Hiring
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10"
        >
          Architect the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Infrastructure</span> <br /> of Tomorrow.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Join a team of elite engineers building the backbone of the next generation of SaaS. We value autonomy, rapid iteration, and technical mastery.
        </motion.p>
      </header>

      {/* Culture Section */}
      <section className="px-6 py-32 border-y border-white/5 relative bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          {values.map((v, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 bg-white/5 border border-white/10 rounded-[40px] hover:border-cyan-400/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{v.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Job Listings */}
      <section id="openings" className="px-6 py-32 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black mb-16 tracking-tight flex items-center gap-4">
          Open Positions <span className="text-xs bg-cyan-400 text-black px-3 py-1 rounded-full">{positions.length}</span>
        </h2>
        
        <div className="space-y-6">
          {positions.map((job, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white/5 border border-white/10 p-8 md:p-10 rounded-[32px] hover:bg-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">{job.department}</span>
                  <div className="w-1 h-1 rounded-full bg-slate-700" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{job.salary}</span>
                </div>
                <h3 className="text-2xl font-black tracking-tight group-hover:text-cyan-400 transition-colors">{job.title}</h3>
                <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5"><MapPin size={12}/> {job.location}</span>
                  <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5"><Clock size={12}/> {job.type}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end gap-2 pr-6 border-r border-white/10">
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Top Perks</p>
                  <div className="flex gap-2">
                    {job.perks.slice(0, 2).map((p, pIdx) => (
                      <span key={pIdx} className="text-[9px] font-bold text-white uppercase bg-white/5 px-2 py-1 rounded border border-white/5">{p}</span>
                    ))}
                  </div>
                </div>
                <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-cyan-400 transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* No Job? */}
      <section className="px-6 py-40 bg-white/5 text-center">
        <h2 className="text-3xl font-black mb-6">Don't see a fit?</h2>
        <p className="text-slate-400 mb-10">We are always looking for exceptional engineers who are obsessed with cloud-native tech.</p>
        <a 
          href="mailto:careers@deploylynx.tech" 
          className="inline-flex py-4 px-10 border border-white/20 rounded-full font-black text-xs uppercase tracking-widest hover:border-cyan-400 hover:text-cyan-400 transition-all"
        >
          Send Open Application
        </a>
      </section>
    </div>
  );
}
