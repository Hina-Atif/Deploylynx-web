import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Services from './pages/Services';
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import CaseStudies from './pages/CaseStudies';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Docs from './pages/Docs';
import Admin from './pages/Admin';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

function Placeholder({ title }: { title: string }) {
  return (
    <div className="pt-24 min-h-screen flex items-center justify-center text-center px-6">
      <div className="max-w-2xl bg-white/5 backdrop-blur-xl p-12 rounded-[40px] border border-white/10 shadow-2xl">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400 mb-6 tracking-tighter italic">{title}</h1>
        <p className="text-slate-400 font-medium">We're currently documenting our success stories and technical breakthroughs. Detailed case studies will be released soon.</p>
        <div className="mt-8 flex justify-center">
            <div className="w-16 h-1.5 bg-cyan-400/20 rounded-full overflow-hidden">
                <motion.div 
                    animate={{ x: [-64, 64] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-1/2 h-full bg-cyan-400 shadow-[0_0_10px_#00c6ff]"
                />
            </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen relative bg-dark-bg overflow-x-hidden text-white font-sans selection:bg-primary-cyan/30">
        {/* Background Glows removed for solid black look */}


        <div className="relative z-10 min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Chatbot />
          <Footer />
        </div>
      </div>
    </Router>
  );
}
