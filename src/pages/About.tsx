import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect, useRef } from 'react';

const stats = [
  { label: 'Active Clients', value: 12, suffix: '+' },
  { label: 'Deployments', value: 45, suffix: '+' },
  { label: 'SLA Uptime', value: 99, suffix: '%' },
  { label: 'Cost Optimization', value: 70, suffix: '%' },
];

const technologies = [
  'Docker', 'Kubernetes', 'AWS', 'Terraform', 'Jenkins', 'GitHub Actions', 'Prometheus', 'Grafana'
];

const testimonials = [
  {
    quote: "DeployLynx transformed our infrastructure into a scalable system. Deployment time reduced drastically.",
    author: "Startup Founder"
  },
  {
    quote: "Professional, reliable, and highly skilled team. Our uptime improved significantly.",
    author: "Tech Lead"
  }
];

function Counter({ value, suffix }: { value: number, suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);

  useEffect(() => {
    const controls = animate(count, value, { duration: 2 });
    return controls.stop;
  }, [count, value]);

  return (
    <motion.h3 className="text-3xl md:text-5xl font-black text-cyan-400 tracking-tighter">
      <motion.span ref={ref}>{rounded}</motion.span>
      {suffix}
    </motion.h3>
  );
}

export default function About() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-black leading-tight tracking-tighter bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent"
        >
          Engineering Scalable <br /> Digital Infrastructure
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-8 text-slate-400 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
        >
          At DeployLynx, we architect, automate, and optimize cloud-native systems that power modern businesses. Our mission is to transform ideas into resilient, high-performance infrastructure with enterprise-grade reliability.
        </motion.p>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center flex flex-col items-center justify-center h-48 group hover:bg-white/10 transition-colors"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Who We Are Content */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="bg-white/5 backdrop-blur-lg p-10 md:p-16 rounded-[40px] border border-white/10 relative overflow-hidden"
        >
          {/* Background Glare removed for solid black look */}

          
          <h2 className="text-3xl md:text-5xl font-black mb-10 tracking-tight text-cyan-400">Who We Are</h2>
          <div className="space-y-8 text-slate-300 text-lg md:text-xl leading-relaxed">
            <p>
              DeployLynx is a cloud engineering and DevOps solutions company focused on building scalable, secure, and automated infrastructure for startups and enterprises. We specialize in transforming traditional systems into modern cloud-native architectures.
            </p>
            <p>
              Our expertise spans across cloud platforms, containerization, CI/CD pipelines, and infrastructure as code. We don't just deploy applications—we design ecosystems that ensure performance, scalability, and reliability at every stage.
            </p>
            <p>
              Whether you're launching a startup or scaling an enterprise system, DeployLynx ensures your infrastructure evolves with your business needs.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Tech Stack Section */}
      <section className="px-6 py-20 text-center max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black mb-16 tracking-tight">Our Technology Stack</h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {technologies.map((tech, idx) => (
            <motion.div
              key={idx}
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: idx * 0.2 
              }}
              className="bg-white/5 backdrop-blur-sm px-8 py-5 rounded-2xl border border-white/10 text-sm font-bold tracking-wider text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors uppercase h-fit"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-32 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-16 tracking-tight">What Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 p-10 rounded-3xl border border-white/10 relative group"
              >
                <div className="text-4xl text-cyan-400/30 absolute top-6 left-6 font-serif">“</div>
                <p className="text-slate-300 text-lg md:text-xl italic relative z-10 leading-relaxed mb-8">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-1 h-0.5 bg-cyan-400/50 rounded-full" />
                  <h4 className="font-black text-xs uppercase tracking-widest text-cyan-400">{t.author}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
