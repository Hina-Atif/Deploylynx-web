import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, User, ArrowRight, Plus, X, Tag, Trash2 } from 'lucide-react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError, auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "1",
    title: "Scaling Kubernetes: Lessons from 1000+ Nodes",
    excerpt: "Discover the architectural patterns and pitfalls we encountered while scaling EKS clusters for global SaaS platforms.",
    content: "Scaling Kubernetes is not just about increasing node counts. It's about networking, storage, and control plane stability...",
    author: "DeployLynx Team",
    date: "April 28, 2026",
    category: "Kubernetes",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "The Shift to Platform Engineering",
    excerpt: "Why modern enterprises are moving away from traditional DevOps towards internal developer platforms (IDPs).",
    content: "Platform engineering is the art of building toolchains and workflows that enable self-service capabilities for software engineering teams in the cloud-native era.",
    author: "DeployLynx Team",
    date: "May 2, 2026",
    category: "Architecture",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
  }
];

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // New Blog State
  const [newBlog, setNewBlog] = useState({
    title: "",
    excerpt: "",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
  });

  useEffect(() => {
    // Listen for blogs
    const q = query(collection(db, 'blogs'), orderBy('date', 'desc'));
    const unsubscribeBlogs = onSnapshot(q, (snapshot) => {
      const blogList = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as BlogPost[];
      
      if (blogList.length === 0) {
        setBlogs(INITIAL_BLOGS);
      } else {
        setBlogs(blogList);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'blogs');
    });

    // Listen for auth state
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      const adminStatus = localStorage.getItem('deploylynx_admin') === 'true' || 
                         (user && user.email === 'deploylynx@gmail.com');
      setIsAdmin(!!adminStatus);
    });

    return () => {
      unsubscribeBlogs();
      unsubscribeAuth();
    };
  }, []);

  const handleAddBlog = async (e: FormEvent) => {
    e.preventDefault();
    const blogData = {
      ...newBlog,
      content: "Full content coming soon...",
      author: "DeployLynx Team",
      date: new Date().toISOString(), // Use ISO string for reliable sorting
      readTime: "5 min read"
    };
    
    try {
      await addDoc(collection(db, 'blogs'), blogData);
      setIsAdding(false);
      setNewBlog({ title: "", excerpt: "", category: "Cloud", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'blogs');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'blogs', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `blogs/${id}`);
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 min-h-screen bg-black">
      {/* Header */}
      <header className="px-6 py-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "fit-content" }}
              className="overflow-hidden whitespace-nowrap border-r-4 border-cyan-400 pr-2 mb-4"
            >
              <span className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-sm">Insights & Engineering</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
              The DeployLynx <br /> <span className="text-slate-500 italic">Journal.</span>
            </h1>
          </div>
          
          <div className="w-full md:w-auto space-y-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search articles, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-cyan-400 transition-all w-full md:w-80"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Admin Actions */}
      <AnimatePresence>
        {isAdmin && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-12 max-w-7xl mx-auto overflow-hidden"
          >
            <div className="bg-cyan-400/5 border border-cyan-400/20 rounded-3xl p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Admin Session Active</span>
                </div>
                <button 
                  onClick={async () => {
                    await auth.signOut();
                    localStorage.removeItem('deploylynx_admin');
                    setIsAdmin(false);
                  }}
                  className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
              {!isAdding ? (
                <button 
                  onClick={() => setIsAdding(true)}
                  className="flex items-center gap-3 bg-cyan-400 text-black px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white transition-colors"
                >
                  <Plus size={18} /> Create New Post
                </button>
              ) : (
                <form onSubmit={handleAddBlog} className="space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-black uppercase tracking-widest text-sm">New Article</h3>
                    <button type="button" onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-white"><X size={20}/></button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Title" 
                      required 
                      value={newBlog.title}
                      onChange={e => setNewBlog({...newBlog, title: e.target.value})}
                      className="bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-cyan-400 outline-none" 
                    />
                    <input 
                      type="text" 
                      placeholder="Image URL (Unsplash or direct link)" 
                      required 
                      value={newBlog.image}
                      onChange={e => setNewBlog({...newBlog, image: e.target.value})}
                      className="bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-cyan-400 outline-none" 
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <select 
                      value={newBlog.category}
                      onChange={e => setNewBlog({...newBlog, category: e.target.value})}
                      className="bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-cyan-400 outline-none text-slate-400"
                    >
                      <option>Cloud</option>
                      <option>Kubernetes</option>
                      <option>DevOps</option>
                      <option>Security</option>
                      <option>Engineering</option>
                    </select>
                  </div>
                  <textarea 
                    placeholder="Short Excerpt" 
                    required 
                    value={newBlog.excerpt}
                    onChange={e => setNewBlog({...newBlog, excerpt: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-cyan-400 outline-none h-32" 
                  />
                  <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white">Cancel</button>
                    <button type="submit" className="bg-white text-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-colors">Publish Post</button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog Grid */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 font-medium">No articles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post, idx) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col bg-white/5 border border-white/10 rounded-[40px] overflow-hidden hover:border-cyan-400/50 transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-cyan-400 border border-white/10">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                      <div className="flex items-center gap-2"><Calendar size={12}/> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                      <div className="flex items-center gap-2 underline text-cyan-400/60 decoration-cyan-400/30">{post.readTime}</div>
                    </div>
                  
                  <h3 className="text-2xl font-black mb-4 tracking-tighter leading-tight group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400 font-bold text-[10px]">
                        D
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">DeployLynx Team</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isAdmin && (
                        <button 
                          onClick={() => handleDeleteBlog(post.id)}
                          className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                          title="Delete Post"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                      <button className="text-white hover:text-cyan-400 transition-colors">
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="px-6 py-40 border-t border-white/5">
        <div className="max-w-4xl mx-auto rounded-[60px] bg-white/5 p-12 md:p-20 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Stay ahead <br /> of the <span className="text-cyan-400">stack.</span></h2>
          <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">Get monthly engineering deep-dives, architecture reviews, and performance tips delivered to your inbox.</p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your engineering email" 
              className="flex-grow bg-black border border-white/10 rounded-2xl py-5 px-6 text-sm focus:outline-none focus:border-cyan-400 transition-all" 
            />
            <button className="bg-white text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all whitespace-nowrap">
              Subscribe Free
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
