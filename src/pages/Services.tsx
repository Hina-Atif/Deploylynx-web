import { motion } from 'motion/react';
import { Server, Cpu, Database, Shield, Zap, TrendingUp, BarChart, Users, ArrowRight } from 'lucide-react';

const miniServices = [
  {
    icon: <Zap className="text-primary-cyan" size={24} />,
    title: "DevOps CI/CD Pipelines",
    description: "Automated, production-ready pipelines for rapid release cycles using GitHub Actions & Jenkins."
  },
  {
    icon: <Server className="text-primary-cyan" size={24} />,
    title: "AWS Cloud Architecture",
    description: "Secure and cost-efficient environments built with Terraform and IaC best practices."
  },
  {
    icon: <Cpu className="text-primary-cyan" size={24} />,
    title: "AI Automation Systems",
    description: "Deploying LLMs and AI agents to eliminate manual operations and boost productivity."
  },
  {
    icon: <Database className="text-primary-cyan" size={24} />,
    title: "Kubernetes & Containerization",
    description: "Production-grade orchestration ensuring system resilience and global scalability."
  }
];

const fullServices = [
  {
    title: "Cloud Migration & Architecture",
    description: "Migrate workloads with zero downtime. Optimized for cost, performance, and resilience.",
    features: ["Cloud readiness assessment", "Multi-cloud strategy & design", "Zero-downtime migration"]
  },
  {
    title: "Infrastructure as Code (IaC)",
    description: "Reproducible, version-controlled infrastructure with Terraform and Ansible. No more manual drift.",
    features: ["Terraform modules & state mgmt", "Ansible playbooks & roles", "Drift detection & remediation"]
  },
  {
    title: "DevSecOps & Compliance",
    description: "Security integrated into every step of the pipeline to protect your data and reputation.",
    features: ["Vulnerability scanning (Trivy/Prisma)", "Secrets management (HashiCorp Vault)", "Policy-as-code (OPA) & Audits"]
  },
  {
    title: "Monitoring & Observability",
    description: "Full-stack observability. Never be blindsided by outages again.",
    features: ["Prometheus + Grafana dashboards", "Log aggregation & alerting", "SLO/SLI tracking & Response"]
  }
];

export default function Services() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <header className="px-6 py-20 text-center max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent mb-6 tracking-tight"
        >
          Enterprise-Grade Cloud Solutions
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 underline-offset-4 text-lg md:text-xl"
        >
          Automate deployments, scale infrastructure, and reduce risk.
        </motion.p>
      </header>

      {/* Interactive Visual Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className="relative flex justify-center items-center h-[400px]">
          <div className="absolute w-[300px] h-[300px] border-2 border-dashed border-cyan-400/20 rounded-full spin-slow" />
          
          <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-lg shadow-cyan-400/30 font-mono">
            AWS
          </div>
          <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-lg shadow-cyan-400/30 font-mono">
            CI/CD
          </div>
          <div className="absolute left-[-30px] top-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-lg shadow-cyan-400/30 font-mono">
            DOCKER
          </div>
          <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-lg shadow-cyan-400/30 font-mono">
            K8S
          </div>
          
          <div className="text-center z-10">
            <div className="text-cyan-400 font-mono text-sm tracking-widest">CORE</div>
            <div className="text-4xl font-black">HUB</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {miniServices.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-default"
            >
              <div className="text-cyan-400 text-2xl mb-3">
                {idx === 0 ? "⚙️" : idx === 1 ? "☁️" : idx === 2 ? "🤖" : "🛡️"}
              </div>
              <h3 className="font-bold text-white mb-2">{service.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
          
          <div className="col-span-1 sm:col-span-2 mt-4 bg-gradient-to-r from-blue-600/20 to-transparent p-5 rounded-xl border border-blue-500/30 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-blue-400 text-sm uppercase tracking-tight">Ready to scale?</h4>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Join 50+ enterprises modernizing their stack.</p>
            </div>
            <a href="/contact" className="bg-cyan-400 text-black px-6 py-2 rounded-full font-bold text-xs shadow-lg shadow-cyan-400/20 hover:scale-105 transition-transform">
              Consultation →
            </a>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="px-6 py-20 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-cyan-400 mb-12 flex items-center justify-center gap-4">
             Challenges We Solve
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cyan-400/10">
                  <th className="p-6 text-cyan-400 font-bold uppercase tracking-widest text-[10px]">The Challenge</th>
                  <th className="p-6 text-cyan-400 font-bold uppercase tracking-widest text-[10px]">DeployLynx Solution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  ["Slow, manual deployments", "End-to-end CI/CD Pipelines"],
                  ["Frequent downtime under load", "Kubernetes + Auto-scaling Infrastructure"],
                  ["Skyrocketing AWS/Cloud costs", "Architecture Optimization & Cost Controls"],
                  ["Security vulnerabilities & leaks", "DevSecOps & Automated Compliance"]
                ].map(([problem, solution], idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-6 text-slate-300 font-medium">{problem}</td>
                    <td className="p-6 text-cyan-400 font-bold">{solution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-16 tracking-tight">Comprehensive Service Portfolio</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {fullServices.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group"
            >
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-4 text-xs font-medium text-slate-300">
                    <div className="w-1 h-1 bg-pink-500 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32 text-center bg-black">
        <div className="max-w-3xl mx-auto px-6 py-16 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h2 className="text-3xl font-bold mb-6">Ready to Scale Your Infrastructure?</h2>
          <p className="text-slate-400 mb-10 text-lg">Let's build a reliable, automated foundation for your business.</p>
          <a 
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary-cyan hover:bg-white text-black px-10 py-5 rounded-full font-bold text-xl transition-all hover:scale-105 shadow-xl shadow-primary-cyan/20"
          >
            Book a Free Consultation
            <ArrowRight size={24} />
          </a>
        </div>
      </section>
    </div>
  );
}
