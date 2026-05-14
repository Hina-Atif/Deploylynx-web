import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, type FormEvent } from 'react';
import { Phone, Mail, MessageSquare, Linkedin, Shield, Zap, TrendingDown, Clock, Video, Gem, CheckCircle, ArrowRight, Loader2, XCircle, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

const contactCards = [
  { icon: <Phone size={24} className="text-cyan-400" />, label: "Call Us", value: "+92 371 3600892", href: "tel:+923713600892" },
  { icon: <Mail size={24} className="text-cyan-400" />, label: "Email", value: "deploylynx26@gmail.com", href: "mailto:deploylynx26@gmail.com" },
  { icon: <MessageSquare size={24} className="text-cyan-400" />, label: "WhatsApp", value: "Business Chat", href: "https://wa.me/message/VXHPTQC4ZU46A1" },
  { icon: <Linkedin size={24} className="text-cyan-400" />, label: "LinkedIn", value: "Connect", href: "https://www.linkedin.com/company/deploylynx" },
];

const whyFeatures = [
  { 
    icon: <Shield size={40} className="text-cyan-400" />, 
    title: "Security First", 
    description: "DevSecOps is not an afterthought; it's integrated into every line of code. We architect for high availability and fault tolerance from day one." 
  },
  { 
    icon: <Zap size={40} className="text-cyan-400" />, 
    title: "Seamless Migration", 
    description: "Zero-downtime migrations from on-premise or legacy systems to AWS and Azure, ensuring full data integrity and minimal disruption." 
  },
  { 
    icon: <TrendingDown size={40} className="text-cyan-400" />, 
    title: "Cost Efficiency", 
    description: "We optimize resource allocation with advanced autoscaling solutions, growing infrastructure with your users to reduce AWS spend." 
  },
];

const consultItems = [
  { icon: <Clock size={24} />, title: "30 Minutes", subtitle: "Free one-on-one consultation call" },
  { icon: <Video size={24} />, title: "Google Meet / Zoom", subtitle: "Virtual meeting at your convenience", highlight: true },
  { icon: <Gem size={24} />, title: "100% Free", subtitle: "No obligations, no hidden charges" },
];

const pricingPlans = [
  {
    title: "Cloud Audit",
    price: "$499",
    suffix: "/flat",
    description: "A deep-dive analysis identifying security gaps and cost inefficiencies.",
    cta: "Get Started",
    link: "mailto:deploylynx26@gmail.com?subject=Inquiry: Cloud Audit"
  },
  {
    title: "DevOps Dedicated",
    price: "$1,999",
    suffix: "/mo",
    description: "Your on-demand team. Ongoing CI/CD management and 24/7 reliability.",
    cta: "Scale Now",
    link: "https://wa.me/message/VXHPTQC4ZU46A1",
    featured: true
  },
  {
    title: "Custom Project",
    price: "Quote",
    suffix: "",
    description: "For large-scale migrations or complex enterprise data pipelines.",
    cta: "Inquire",
    link: "#booking-form"
  }
];

export default function Contact() {
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });

  // Auto-reset success message after 8 seconds
  useEffect(() => {
    if (formSuccess) {
      const timer = setTimeout(() => {
        setFormSuccess(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [formSuccess]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          ...formData,
          package: formData.service // mapping for backend
        }),
      });

      clearTimeout(timeoutId);
      
      const contentType = response.headers.get("content-type");
      let result;
      
      try {
        if (contentType && contentType.includes("application/json")) {
          result = await response.json();
        } else {
          // If status is 200, try to parse text as JSON anyway, or fallback nicely
          const text = await response.text();
          try {
            result = JSON.parse(text);
          } catch {
            result = { text, success: response.ok };
          }
        }
      } catch (parseErr) {
        console.error("Parse Error:", parseErr);
        result = { error: "Failed to parse server response" };
      }

      if (!response.ok) {
        console.error("Server responded with error:", result);
        throw new Error(result.error || `Error ${response.status}: Failed to send message`);
      }

      setFormSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        date: '',
        time: '',
        message: ''
      });
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00c6ff', '#ff6ec7', '#ffffff']
      });
    } catch (err: any) {
      console.error("Fetch Error Detail:", err);
      if (err.name === 'AbortError') {
        setError('Request timed out. The server is taking too long to respond.');
      } else {
        setError(err.message || 'Connection failed. Please check your network or try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen">
      {/* Hero & Form Section */}
      <section className="container-main grid lg:grid-cols-2 gap-16 px-6 py-16 max-w-7xl mx-auto items-start relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 -left-20 w-72 h-72 bg-cyan-400/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-40 -right-20 w-96 h-96 bg-cyan-400/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="space-y-12 relative z-10">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Next-Gen Delivery Protocol</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black leading-none tracking-tighter"
            >
              Ready to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-cyan-500 italic">Architect</span> <br />
              Your Scale?
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl font-medium"
            >
              Enterprise-grade infrastructure designed for the high-velocity requirements of modern SaaS. Secure your tailored infrastructure audit today.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            id="booking-form"
            className="bg-white/[0.03] backdrop-blur-2xl p-8 md:p-12 rounded-[48px] border border-white/10 shadow-[0_20px_50px_-20px_rgba(0,198,255,0.15)] relative overflow-hidden group"
          >
            {/* Inner Glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-50" />
            
            <AnimatePresence mode="wait">
              {formSuccess ? (
                <motion.div 
                  key="success-container"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="py-12 flex flex-col items-center text-center space-y-6"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 bg-cyan-400/20 rounded-full flex items-center justify-center relative shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                  >
                    <CheckCircle size={40} className="text-cyan-400" />
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                    />
                  </motion.div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight">🎉 Message Sent Successfully!</h3>
                    <p className="text-slate-400 font-medium text-sm md:text-base max-w-[320px] mx-auto leading-relaxed">
                      Thank you for contacting us. We will get back to you soon.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col items-center gap-4">
                    <button 
                      onClick={() => setFormSuccess(false)}
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-400 hover:text-white transition-colors bg-white/5 px-6 py-3 rounded-xl border border-white/10"
                    >
                      <ChevronLeft size={14} />
                      Back to Form
                    </button>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Auto-closing in a few moments...</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4" 
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-cyan-400 transition-colors text-sm" 
                    />
                    <input 
                      type="email" 
                      placeholder="Work Email" 
                      required 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-cyan-400 transition-colors text-sm" 
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Company / Startup Name" 
                    required 
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-cyan-400 transition-colors text-sm" 
                  />
                  <select 
                    required 
                    value={formData.service}
                    onChange={e => setFormData({...formData, service: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-slate-400 focus:outline-none focus:border-cyan-400 transition-colors text-sm appearance-none"
                  >
                    <option value="" disabled>Select Service</option>
                    <option value="Cloud Migration">AWS Cloud Migration</option>
                    <option value="CI/CD">CI/CD Pipeline Automation</option>
                    <option value="Kubernetes">Kubernetes Orchestration</option>
                    <option value="Security">DevSecOps & Security</option>
                  </select>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="date" 
                      required 
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                      className="bg-white/5 border border-white/10 rounded-2xl p-5 text-slate-400 focus:outline-none focus:border-cyan-400 transition-colors text-sm" 
                    />
                    <select 
                      required 
                      value={formData.time}
                      onChange={e => setFormData({...formData, time: e.target.value})}
                      className="bg-white/5 border border-white/10 rounded-2xl p-5 text-slate-400 focus:outline-none focus:border-cyan-400 transition-colors text-sm appearance-none"
                    >
                      <option value="" disabled>Time (PKT)</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                    </select>
                  </div>
                  <textarea 
                    rows={4} 
                    placeholder="Tell us about your project infrastructure needs..." 
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-cyan-400 transition-colors text-sm resize-none" 
                  />
                  
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl"
                    >
                      <XCircle size={18} className="text-red-500 flex-shrink-0" />
                      <p className="text-red-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                        ❌ {error}
                      </p>
                    </motion.div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-cyan-400 text-black font-black py-6 rounded-2xl hover:bg-white transition-all uppercase tracking-widest text-xs shadow-xl shadow-cyan-400/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : null}
                    {isSubmitting ? "Initiating Protocol..." : "Send Booking Request →"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactCards.map((card, idx) => (
              <motion.a
                key={idx}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all group"
              >
                <div className="p-3 bg-cyan-400/10 rounded-xl group-hover:scale-110 transition-transform flex-shrink-0">
                  {card.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{card.label}</p>
                  <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors break-all line-clamp-1 group-hover:line-clamp-none transition-all">{card.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="sticky top-32 space-y-8"
        >
          <div className="rounded-[40px] overflow-hidden border border-white/10 relative group shadow-2xl">
            <div className="absolute inset-0 bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80" 
              alt="Collaboration" 
              className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 object-cover aspect-[4/5]" 
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black to-transparent">
              <p className="text-white font-black italic tracking-tighter text-2xl uppercase">Building Tomorrow's Infrastructure</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Why Section */}
      <section className="px-6 py-24 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-16 tracking-tight">Why Partner with DeployLynx?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyFeatures.map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white/5 p-10 rounded-[32px] border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all text-center"
              >
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation & Topics */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {consultItems.map((item, idx) => (
            <div 
              key={idx}
              className={`flex items-center gap-6 p-8 rounded-3xl border transition-all ${
                item.highlight ? 'bg-cyan-400/5 border-cyan-400/30' : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="p-4 bg-cyan-400/10 rounded-2xl text-cyan-400">
                {item.icon}
              </div>
              <div>
                <h4 className="font-black text-lg text-white">{item.title}</h4>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 md:p-20 relative overflow-hidden">
          <div className="relative z-10 flex items-center gap-4 mb-10">
            <div className="text-3xl">💡</div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400 italic">
              What We Can Discuss
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-6 relative z-10">
            {[
              "Cloud Migration Strategy (AWS, Azure, GCP)",
              "Kubernetes Architecture & Deployment",
              "CI/CD Pipeline Design & Optimization",
              "Infrastructure as Code (Terraform/Ansible)",
              "DevSecOps & Security Best Practices",
              "Cloud Cost Optimization (FinOps)",
              "Monitoring & Observability Setup"
            ].map((topic, idx) => (
              <div key={idx} className="flex items-center gap-4 text-slate-300 font-medium">
                <div className="w-2 h-2 bg-pink-500 rounded-full" />
                {topic}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-32 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-20 tracking-tighter">Transparent Pricing Solutions</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className={`p-10 rounded-[40px] border transition-all text-center flex flex-col ${
                plan.featured 
                ? 'bg-cyan-400/5 border-cyan-400/30 shadow-2xl shadow-cyan-400/10 scale-105 relative z-10' 
                : 'bg-white/5 border-white/10'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-400 text-black px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-black uppercase tracking-widest text-slate-400">{plan.title}</h3>
              <div className="my-8">
                <span className="text-5xl md:text-7xl font-black text-cyan-400 tracking-tighter">{plan.price}</span>
                <span className="text-sm font-bold text-slate-500 ml-2 uppercase tracking-widest">{plan.suffix}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-10 flex-grow">{plan.description}</p>
              <a 
                href={plan.link}
                className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                  plan.featured 
                  ? 'bg-cyan-400 text-black shadow-xl shadow-cyan-400/20 hover:bg-white' 
                  : 'border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Direct Contact Footer */}
      <section className="px-6 py-20 text-center relative z-10">
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-8">Prefer a direct line?</p>
        <div className="flex justify-center gap-6 flex-wrap">
          <a href="tel:+923713600892" className="group flex items-center gap-3 px-8 py-4 border border-white/10 rounded-2xl hover:border-cyan-400 transition-all">
            <Phone size={20} className="text-slate-500 group-hover:text-cyan-400" />
            <span className="text-sm font-bold text-slate-300 group-hover:text-white uppercase tracking-widest font-mono">Call Support</span>
          </a>
          <a href="mailto:deploylynx26@gmail.com" className="group flex items-center gap-3 px-8 py-4 border border-white/10 rounded-2xl hover:border-cyan-400 transition-all">
            <Mail size={20} className="text-slate-500 group-hover:text-cyan-400" />
            <span className="text-sm font-bold text-slate-300 group-hover:text-white uppercase tracking-widest font-mono">Email Team</span>
          </a>
        </div>
      </section>
    </div>
  );
}

