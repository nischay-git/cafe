import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Mail, Star, Coffee, Utensils, ArrowRight, ImagePlus, Upload } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
}

const INITIAL_BEVERAGES: MenuItem[] = [
  { id: 'b1', name: "Ginger Cardamom Tea", description: "Our signature 'Cutting' chai", price: "₹15", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=200" },
  { id: 'b2', name: "Masala Chai", description: "Black tea brewed with aromatic spices", price: "₹20", image: "https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?auto=format&fit=crop&q=80&w=200" },
  { id: 'b3', name: "Filter Coffee", description: "Authentic South Indian strong coffee", price: "₹30", image: "https://images.unsplash.com/photo-1620138546344-7b6c30e20e36?auto=format&fit=crop&q=80&w=200" },
  { id: 'b4', name: "Nimbu Pani", description: "Freshly squeezed sweet & salt lemon water", price: "₹25", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=200" }
];

const INITIAL_SNACKS: MenuItem[] = [
  { id: 's1', name: "Classic Bun Maska", description: "Double buttered, lightly toasted sweet buns", price: "₹45", image: "https://images.unsplash.com/photo-1509440159596-024908877f0b?auto=format&fit=crop&q=80&w=200" },
  { id: 's2', name: "Samosa Platter", description: "Crusty exterior, spicy potato filling", price: "₹60", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=200" },
  { id: 's3', name: "Paneer Pakora", description: "Deep fried cottage cheese with mint chutney", price: "₹80", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=200" },
  { id: 's4', name: "Aloo Sandwich", description: "Grilled sandwich with spiced potato filling", price: "₹50", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=200" }
];

function MenuItemRow({ item, onImageUpload }: { item: MenuItem, onImageUpload: (id: string, url: string) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageUpload(item.id, url);
    }
  };

  return (
    <div className="flex gap-4 items-center border-b border-white/10 pb-4">
      <div 
        className="w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center overflow-hidden relative group cursor-pointer transition-all hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] aspect-square"
        onClick={() => fileInputRef.current?.click()}
      >
        {item.image ? (
          <>
            <div className="absolute inset-0 w-full h-full p-2 flex items-center justify-center">
               <img src={item.image} alt={item.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 z-10">
              <Upload className="w-5 h-5 text-white" />
            </div>
          </>
        ) : (
           <div className="text-white/20 group-hover:text-amber-500 transition-colors flex flex-col items-center">
             <ImagePlus className="w-6 h-6 mb-1" />
             <span className="text-[9px] uppercase tracking-wider">Add Image</span>
           </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      <div className="flex-1 flex justify-between items-start">
        <div>
          <h4 className="font-bold text-amber-500">{item.name}</h4>
          <p className="text-xs text-white/40 mt-1 max-w-[200px] md:max-w-[250px]">{item.description}</p>
        </div>
        <span className="font-mono text-sm ml-4 mt-1">
          <span className="bg-amber-500/10 text-amber-500 px-2 py-1 rounded-md">{item.price}</span>
        </span>
      </div>
    </div>
  );
}

const BUSINESS = {
  name: "Sharma Ji Tea Stall",
  category: "Cafe",
  rating: 4.3,
  reviews: 128,
  address: "MG Road, Gurgaon, Haryana",
  phone: "+91 9876543210",
  email: "sharmaji.tea@gmail.com",
  opening_hours: "6:00 AM - 10:00 PM",
  price_range: "₹",
  description: "Famous for cutting chai and bun maska.",
  image: "https://images.unsplash.com/photo-1576092768241-dec231879bfc?auto=format&fit=crop&q=80&w=2000"
};

export default function App() {
  const [beverages, setBeverages] = useState<MenuItem[]>(INITIAL_BEVERAGES);
  const [snacks, setSnacks] = useState<MenuItem[]>(INITIAL_SNACKS);

  const handleBeverageImageUpload = (id: string, url: string) => {
    setBeverages(beverages.map(item => item.id === id ? { ...item, image: url } : item));
  };

  const handleSnackImageUpload = (id: string, url: string) => {
    setSnacks(snacks.map(item => item.id === id ? { ...item, image: url } : item));
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#E5E5E5] font-sans relative overflow-hidden flex flex-col selection:bg-amber-600 selection:text-black">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-900/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className="h-24 flex items-center justify-between px-6 md:px-16 relative z-10 border-b border-white/5 bg-[#0D0D0D]/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border-2 border-amber-600 rounded-lg flex items-center justify-center font-serif text-amber-600 font-bold text-xl">S</div>
          <span className="text-xl tracking-tighter font-medium hidden md:block">SHARMA JI <span className="text-amber-600">CAFE</span></span>
        </div>
        <div className="flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
          <a href="#menu" className="hover:text-white transition-colors">Menu</a>
          <a href="#visit" className="hover:text-white transition-colors">Visit Us</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 md:py-24 z-10 text-left min-h-[80vh]">
        <div className="w-full md:w-7/12 flex flex-col justify-center pr-0 md:pr-12 text-center md:text-left z-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-amber-600 text-sm font-bold uppercase tracking-[0.3em] mb-4"
          >
            Legendary Since 1974
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[60px] md:text-[90px] font-bold leading-[0.9] tracking-tighter mb-8"
          >
            AUTHENTIC <br/>
            <span className="text-amber-600 font-serif italic font-light">Cutting Chai</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-white/40 leading-relaxed max-w-lg mb-10 mx-auto md:mx-0"
          >
            {BUSINESS.description} Experience the soul of Gurgaon in every sip. Our secret blend of spices and slow-brewed tea, perfectly paired with our iconic bun maska.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center md:justify-start"
          >
            <a href="#menu" className="px-10 py-5 bg-amber-600 text-black font-black text-xs uppercase tracking-widest hover:bg-amber-500 transition-colors cursor-pointer">
              View Menu
            </a>
            <div className="flex -space-x-3 items-center">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-[#0D0D0D] flex items-center justify-center text-[10px]">⭐</div>
              ))}
              <div className="pl-6 flex flex-col items-start">
                <span className="text-sm font-bold">{BUSINESS.rating}/5 Rating</span>
                <span className="text-[10px] text-white/40 uppercase">{BUSINESS.reviews} Reviews</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full md:w-5/12 mt-16 md:mt-0 relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-transparent opacity-20 blur-lg rounded-[2rem]"></div>
          <img 
            src={BUSINESS.image} 
            alt="Tea Stall" 
            className="relative bg-zinc-900 border border-white/5 rounded-[2rem] object-cover aspect-[4/5] w-full shadow-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-700 max-w-md mx-auto md:ml-auto"
          />
        </motion.div>
      </header>

      {/* Quick Info Bar */}
      <div className="relative z-30 border-y border-white/5 bg-[#0D0D0D]/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center md:justify-items-start text-sm">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start gap-1"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1 flex items-center gap-2"><MapPin className="w-3 h-3" /> Location</span>
            <span className="font-bold text-amber-500 text-center md:text-left">{BUSINESS.address}</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start gap-1"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1 flex items-center gap-2"><Clock className="w-3 h-3" /> Daily Hours</span>
            <span className="font-bold text-amber-500">{BUSINESS.opening_hours}</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start gap-1"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1 flex items-center gap-2"><Utensils className="w-3 h-3" /> Category</span>
            <span className="font-bold text-amber-500">{BUSINESS.category} • {BUSINESS.price_range}</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start gap-1"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1 flex items-center gap-2"><Phone className="w-3 h-3" /> Contact</span>
            <span className="font-bold text-amber-500">{BUSINESS.phone}</span>
          </motion.div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-16 py-24 md:py-32 w-full relative z-10">
        
        {/* Story Section */}
        <section className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
              A Taste of <br/>
              <span className="text-amber-600 font-serif italic font-light">Nostalgia</span>
            </h2>
            <p className="text-lg text-white/40 leading-relaxed mb-6">
              Nestled in the heart of Gurgaon, Sharma Ji Tea Stall isn't just a place to grab a drink. It's an institution where conversations brew as warmly as our signature cutting chai.
            </p>
            <p className="text-lg text-white/40 leading-relaxed mb-8">
              Whether you're stopping by for a hurried morning cup or taking a moment to savor our perfectly toasted bun maska, you're experiencing a recipe refined over decades.
            </p>
            <a href="#menu" className="inline-flex items-center gap-2 border-b border-amber-600 pb-1 text-amber-500 font-bold uppercase tracking-widest text-[11px] hover:gap-4 transition-all">
              Learn More <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-transparent opacity-20 blur-lg rounded-[2rem]"></div>
            <img 
              src="https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&q=80&w=800" 
              alt="Pouring Tea" 
              className="relative bg-zinc-900 border border-white/5 rounded-[2rem] object-cover aspect-square w-full shadow-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />
          </motion.div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="mt-32 pt-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Our <span className="text-amber-600 font-serif italic font-light">Menu</span>
            </h2>
            <p className="text-white/40 text-sm tracking-[0.2em] uppercase">Authentic & Freshly Prepared</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Beverages */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-transparent opacity-10 blur-lg rounded-xl"></div>
              <div className="relative bg-zinc-900 border border-white/5 p-8 md:p-10 rounded-xl h-full">
                <h3 className="text-2xl font-serif italic mb-8">Beverages</h3>
                <div className="space-y-6">
                  {beverages.map(item => (
                    <MenuItemRow key={item.id} item={item} onImageUpload={handleBeverageImageUpload} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Snacks */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-transparent opacity-10 blur-lg rounded-xl"></div>
              <div className="relative bg-zinc-900 border border-white/5 p-8 md:p-10 rounded-xl h-full">
                <h3 className="text-2xl font-serif italic mb-8">Snacks</h3>
                <div className="space-y-6">
                  {snacks.map(item => (
                    <MenuItemRow key={item.id} item={item} onImageUpload={handleSnackImageUpload} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Location & Contact */}
        <section id="visit" className="mt-32 pt-32 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-transparent opacity-20 blur-lg rounded-xl z-0"></div>
            <div className="relative bg-zinc-900 border border-white/5 p-10 md:p-14 rounded-xl flex flex-col md:flex-row gap-12 md:gap-24 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
              
              <div className="flex-1 space-y-8 relative z-10">
                <h2 className="text-4xl font-serif italic mb-2 text-white">Visit Us</h2>
                <div className="h-px bg-white/10 w-full mb-8"></div>
                
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Address</h3>
                  <p className="text-xl font-bold text-amber-500 mb-2">{BUSINESS.name}</p>
                  <p className="text-white/60 mb-2">{BUSINESS.address}</p>
                </div>
                
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Hours</h3>
                  <p className="text-white/60">{BUSINESS.opening_hours}</p>
                </div>
              </div>
              
              <div className="flex-1 space-y-8 relative z-10">
                <h2 className="text-4xl font-serif italic mb-2 text-white opacity-0 hidden md:block">Contact</h2>
                <div className="h-px bg-white/10 w-full mb-8 mt-4 md:mt-14 hidden md:block"></div>
                
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Contact Info</h3>
                  <a href={`tel:${BUSINESS.phone}`} className="flex items-center gap-4 text-white/60 hover:text-amber-500 mb-6 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-amber-500" />
                    </div>
                    <span className="font-mono">{BUSINESS.phone}</span>
                  </a>
                  <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-4 text-white/60 hover:text-amber-500 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-amber-500" />
                    </div>
                    <span className="text-sm">{BUSINESS.email}</span>
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        </section>
      </main>

      <footer className="h-16 border-t border-white/5 flex items-center px-6 md:px-16 text-[50px] md:text-[90px] font-black opacity-[0.02] whitespace-nowrap overflow-hidden select-none z-10 w-full mt-16">
        {Array(20).fill("TEA").join(" ")}
      </footer>
    </div>
  );
}
