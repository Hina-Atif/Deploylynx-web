import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  text: string;
  type: 'user' | 'bot';
}

const quickQuestions = [
  { id: 'services', label: 'Services?', q: "What services do you offer?", a: "We provide AWS, CI/CD, Kubernetes, DevSecOps, and cloud optimization." },
  { id: 'pricing', label: 'Pricing?', q: "What is pricing?", a: "Plans start from $499 and scale based on your needs." },
  { id: 'aws', label: 'AWS Migration?', q: "AWS migration?", a: "We provide secure zero-downtime AWS migration." },
  { id: 'kubernetes', label: 'Kubernetes?', q: "Kubernetes support?", a: "Yes, full cluster setup and management." },
  { id: 'consultation', label: 'Free Call?', q: "Free consultation?", a: "Yes, 30-minute free consultation." },
  { id: 'contact', label: 'Contact?', q: "How to contact?", a: "Phone, email, WhatsApp, and LinkedIn available." },
  { id: 'security', label: 'Security?', q: "Do you provide security?", a: "Yes, DevSecOps and cloud security best practices included." },
  { id: 'cost', label: 'Cost Optimization?', q: "Cost optimization?", a: "We reduce cloud bills using autoscaling and FinOps strategies." }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi, this is DeployLynx Agent. How may I help you?", type: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (text: string, type: 'user' | 'bot') => {
    setMessages(prev => [...prev, { text, type }]);
  };

  const handleSend = (text?: string) => {
    const msgText = text || inputText;
    if (!msgText.trim()) return;

    addMessage(msgText, 'user');
    setInputText('');

    setTimeout(() => {
      addMessage("Thanks! Our team will assist you shortly 🚀", 'bot');
    }, 600);
  };

  const handleQuickQuestion = (q: string, a: string) => {
    addMessage(q, 'user');
    setTimeout(() => {
      addMessage(a, 'bot');
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-cyan-400 text-black p-4 rounded-full shadow-xl shadow-cyan-400/20 flex items-center justify-center relative group"
      >
        <div className="absolute -inset-1 bg-cyan-400 opacity-20 blur-lg group-hover:opacity-40 transition-opacity" />
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-[320px] h-[500px] bg-dark-bg/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="bg-cyan-400 p-4 text-black font-black text-sm flex justify-between items-center tracking-tight">
              <span>DeployLynx Agent</span>
              <button onClick={() => setIsOpen(false)}><X size={18} /></button>
            </div>

            <div 
              ref={scrollRef}
              className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/10"
            >
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${
                      msg.type === 'user' 
                      ? 'bg-cyan-400 text-black rounded-tr-none' 
                      : 'bg-white/5 text-slate-300 border border-white/10 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-black/20 border-t border-white/5">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {quickQuestions.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleQuickQuestion(item.q, item.a)}
                    className="text-[10px] p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-all text-left whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button
                  onClick={() => handleSend()}
                  className="bg-cyan-400 text-black p-2 rounded-xl"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
