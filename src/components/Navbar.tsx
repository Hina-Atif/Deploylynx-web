import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'Services',
    href: '/services',
    dropdown: [
      { name: 'Cloud Migration', href: '/services#migration' },
      { name: 'DevSecOps & Security', href: '/services#security' },
      { name: 'Auto Scaling Systems', href: '/services#scaling' },
      { name: 'CI/CD Automation', href: '/services#automation' },
    ]
  },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/5 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex justify-between items-center">
        <a href="/" className="text-2xl font-black tracking-tighter flex items-center gap-1 group">
          <span className="text-white">Deploy</span>
          <span className="text-cyan-400 group-hover:text-pink-500 transition-colors">Lynx</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-widest">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative group"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
              onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
            >
              <a
                href={link.href}
                className={`transition-colors flex items-center gap-1 ${
                  activeDropdown === link.name ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                {link.name}
                {link.dropdown && <ChevronRight size={12} className={`transition-transform ${activeDropdown === link.name ? 'rotate-90 text-cyan-400' : 'rotate-0'}`} />}
              </a>
              
              {link.dropdown && (
                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-4 w-64 bg-dark-bg/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden"
                    >
                      <div className="flex flex-col gap-2">
                        {link.dropdown.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="p-3 text-[10px] text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          <a
            href="/contact"
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-black transition-all shadow-xl shadow-blue-900/20 active:scale-95"
          >
            Contact
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-dark-bg border-b border-white/10 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-slate-300 hover:text-primary-cyan transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/contact"
                className="bg-blue-600 text-white p-3 rounded-lg text-center font-bold"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
