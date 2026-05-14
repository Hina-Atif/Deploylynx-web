import { motion } from 'motion/react';
import { Linkedin, Github, Mail, Phone, ArrowUpRight } from 'lucide-react';

const footerLinks = [
  {
    title: 'Quick Links',
    links: [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Case Studies', href: '/case-studies' },
    ]
  },
  {
    title: 'Services',
    links: [
      { name: 'Cloud Migration', href: '/services#migration' },
      { name: 'DevSecOps & Security', href: '/services#security' },
      { name: 'CI/CD Automation', href: '/services#automation' },
      { name: 'Kubernetes & Scaling', href: '/services#scaling' },
      { name: 'Infrastructure as Code', href: '/services#iac' },
    ]
  },
  {
    title: 'Company & Support',
    links: [
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Help Center', href: '/contact' },
      { name: 'Documentation', href: '/docs' },
    ]
  }
];

export default function Footer() {
  return (
    <footer className="relative bg-dark-bg border-t border-white/5 pt-20 pb-10 px-6 overflow-hidden">
      {/* Background Subtle Gradient removed for solid black look */}


      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          {/* Company Identity */}
          <div className="lg:col-span-4 space-y-6">
            <a href="/" className="text-2xl font-black tracking-tighter flex items-center gap-1 group">
              <span className="text-white">Deploy</span>
              <span className="text-cyan-400 group-hover:text-pink-500 transition-colors">Lynx</span>
            </a>
            <div className="space-y-4">
              <h4 className="text-cyan-400 font-bold uppercase tracking-widest text-[10px]">
                Scalable Cloud & DevOps Solutions
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Engineering resilient digital ecosystems. We architect, automate, and optimize enterprise-grade infrastructure to accelerate your business growth through CI/CD, AWS, and modern cloud-native practices.
              </p>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <motion.a 
                whileHover={{ y: -3 }}
                href="https://www.linkedin.com/company/linkedin-deploylynx-devops/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all"
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3 }}
                href="https://github.com/Deploylynx-tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all"
              >
                <Github size={18} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3 }}
                href="mailto:deploylynx26@gmail.com" 
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all"
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-6">
                <h5 className="text-[10px] font-black text-white uppercase tracking-widest">{section.title}</h5>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href} 
                        className="text-slate-500 text-sm hover:text-cyan-400 hover:translate-x-1 transition-all inline-block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:items-start items-center gap-1">
            <p className="text-slate-500 text-[10px] font-medium uppercase tracking-[0.2em]">
              © 2026 DEPLOYLYNX | ALL RIGHTS RESERVED
            </p>
            <p className="text-cyan-400/50 text-[9px] font-bold uppercase tracking-widest italic">
              ENGINEERING SCALABLE DIGITAL ECOSYSTEMS
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
