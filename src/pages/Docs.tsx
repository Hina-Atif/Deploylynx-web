import { motion } from 'motion/react';
import { Book, Code, Terminal, Zap, Shield, Layers, Search, ChevronRight, Layout } from 'lucide-react';

const sections = [
  {
    title: "Getting Started",
    icon: <Zap size={18} className="text-yellow-400" />,
    items: ["Infrastructure Overview", "Quickstart Guide", "Project Structure"]
  },
  {
    title: "Deployment Patterns",
    icon: <Layers size={18} className="text-cyan-400" />,
    items: ["Blue/Green Deployments", "Canary Releases", "Rollback Strategies"]
  },
  {
    title: "Security & Hardening",
    icon: <Shield size={18} className="text-pink-500" />,
    items: ["IAM Role Best Practices", "Network Segmentation", "Secret Management"]
  },
  {
    title: "API & Integration",
    icon: <Code size={18} className="text-green-400" />,
    items: ["Webhooks Specification", "Lynx CLI Reference", "External Collectors"]
  }
];

export default function Docs() {
  return (
    <div className="pt-24 min-h-screen bg-black flex">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:block w-72 h-[calc(100vh-6rem)] sticky top-24 border-r border-white/5 p-8 overflow-y-auto">
        <div className="relative mb-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input 
            type="text" 
            placeholder="Search docs..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-cyan-400/50 transition-colors"
          />
        </div>

        <nav className="space-y-10">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                {section.icon} {section.title}
              </h4>
              <ul className="space-y-2 border-l border-white/5 ml-2 pl-4">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a href="#" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors py-1 block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-4xl px-8 md:px-16 py-20 mx-auto">
          <header className="mb-20">
            <div className="flex items-center gap-3 text-cyan-400 font-bold uppercase tracking-widest text-[10px] mb-6">
              <Book size={14}/> Documentation
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
              Engineering <span className="text-slate-500 italic">Playbook.</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
              Exhaustive guides, architecture patterns, and technical references for our standard cloud infrastructure deployments.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-6 mb-20">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mb-6 font-black italic">
                01
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                Foundation Setup <ChevronRight size={20} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Learn how we provision base AWS infrastructure using Terraform and Ansible.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-500 mb-6 font-black italic">
                02
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                CI/CD Pipelines <ChevronRight size={20} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Standard Jenkins and GitHub Actions workflows for automated testing and deployment.
              </p>
            </motion.div>
          </div>

          <article className="prose prose-invert max-w-none space-y-12">
            <section className="space-y-6">
              <h2 className="text-3xl font-black tracking-tight pt-10 border-t border-white/5">The DeployLynx Architecture</h2>
              <p className="text-slate-400 leading-relaxed">
                Our infrastructure strategy revolves around the <span className="text-white font-medium">Immutable Infrastructure</span> principle. We treat servers as disposable resources that can be recreated at any time from a defined configuration.
              </p>
              <div className="bg-[#0b1120] rounded-2xl p-6 border border-white/5 font-mono text-sm overflow-x-auto">
                <pre className="text-cyan-400/80">
                  {`# Example Infrastructure Definition
resource "aws_eks_cluster" "main" {
  name     = "deploylynx-prod"
  role_arn = aws_iam_role.cluster.arn

  vpc_config {
    subnet_ids = aws_subnet.private[*].id
  }
}`}
                </pre>
              </div>
            </section>

            <section className="space-y-8 bg-white/5 p-10 rounded-3xl border border-white/10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-400 text-black rounded-xl"><Terminal size={20}/></div>
                <h3 className="text-xl font-black uppercase tracking-widest">Environment Setup</h3>
              </div>
              <ol className="space-y-6 list-none counter-reset-step">
                <li className="flex gap-6">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full border border-cyan-400/50 flex items-center justify-center text-cyan-400 font-bold text-xs italic">01</span>
                  <div className="space-y-2">
                    <h4 className="font-bold">Clone the Blueprint</h4>
                    <p className="text-sm text-slate-400">Initialize your local environment with our production blueprints.</p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full border border-cyan-400/50 flex items-center justify-center text-cyan-400 font-bold text-xs italic">02</span>
                  <div className="space-y-2">
                    <h4 className="font-bold">Configure AWS CLI</h4>
                    <p className="text-sm text-slate-400">Ensure your IAM credentials have the appropriate cross-account permissions.</p>
                  </div>
                </li>
              </ol>
            </section>
          </article>

          <footer className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center">
            <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Updated Today at 4:20 PM</div>
            <div className="flex gap-4">
              <button className="text-xs text-slate-500 hover:text-white transition-colors">Edit on GitHub</button>
              <button className="text-xs text-slate-500 hover:text-white transition-colors">Submit Feedback</button>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
