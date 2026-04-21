"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, ShieldCheck, Headset, Flame, 
  Gamepad2, Timer, ChevronRight, Search, 
  CreditCard, Wallet, Smartphone, Landmark,
  Star, Play, Users, TrendingUp
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function HomeClient({ games }: { games: any[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const searchRef = useRef<HTMLDivElement>(null);
  
  const filteredGames = games.filter((g: any) => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const searchResults = searchQuery.length > 0 ? filteredGames.slice(0, 6) : [];
  const popularGames = games.filter((g: any) => g.isPopular && (activeCategory === 'Semua' || g.category === activeCategory));
  const allGamesFiltered = filteredGames.filter((g: any) => activeCategory === 'Semua' || g.category === activeCategory);

  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 45, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          if (minutes > 0) { minutes--; seconds = 59; }
          else { if (hours > 0) { hours--; minutes = 59; seconds = 59; } else { hours = 4; minutes = 45; seconds = 12; } }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle outside click to close search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg selection:bg-brand-500/30">
      
      {/* 1. MINIMALIST HERO & INSTANT SEARCH */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-brand-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[20%] right-[-5%] w-[30vw] h-[30vw] bg-accent-purple/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-5xl md:text-7xl font-black italic mb-6 text-white tracking-tighter leading-none">
              TOP UP <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">TANPA RIBET</span>
            </h1>
            <p className="text-theme-muted text-lg font-medium mb-10 max-w-2xl mx-auto opacity-80">
              Cari game, masukkan ID, dan bayar. Kilat, aman, dan harga Sultan.
            </p>

            {/* THE INSTANT SEARCH BAR */}
            <div className="relative max-w-2xl mx-auto" ref={searchRef}>
              <div className={`relative flex items-center bg-dark-card border rounded-2xl shadow-2xl transition-all duration-300 ${isSearchFocused ? 'border-brand-500 ring-4 ring-brand-500/10 scale-[1.02]' : 'border-white/10'}`}>
                <Search className={`ml-6 transition-colors ${isSearchFocused ? 'text-brand-500' : 'text-theme-muted'}`} size={24} />
                <input 
                  type="text" 
                  placeholder="Ketik nama game (MLBB, Diamond, dll...)" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full bg-transparent px-6 py-6 text-white font-bold text-lg focus:outline-none placeholder-white/20"
                />
                <button className="mr-3 p-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-all shadow-lg shadow-brand-500/20 active:scale-95 group">
                  <Search size={20} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* INSTANT SEARCH DROPDOWN */}
              <AnimatePresence>
                {isSearchFocused && searchQuery.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-3 p-3 bg-dark-card border border-white/10 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl z-50 overflow-hidden"
                  >
                    {searchResults.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-black text-theme-muted uppercase tracking-[0.2em] px-3 py-2">Hasil Pencarian</p>
                        {searchResults.map((game: any) => (
                          <Link 
                            key={game.id} 
                            href={`/game/${game.id}`}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-brand-500/10 border border-transparent hover:border-brand-500/20 transition-all group"
                          >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                              <Image src={game.imageUrl} alt={game.name} fill className="object-cover" />
                            </div>
                            <div className="text-left">
                              <div className="text-white font-bold group-hover:text-brand-400 transition-colors uppercase italic text-sm">{game.name}</div>
                              <div className="text-[10px] text-theme-muted font-bold tracking-widest">{game.publisher}</div>
                            </div>
                            <ChevronRight size={16} className="ml-auto text-white/20 group-hover:text-brand-500" />
                          </Link>
                        ))}
                        <Link href="#games" onClick={() => setIsSearchFocused(false)} className="text-center py-2 text-[10px] font-bold text-brand-500 hover:underline">Lihat Semua Game</Link>
                      </div>
                    ) : (
                      <div className="p-8 text-center text-theme-muted font-medium italic">Game "{searchQuery}" tidak ditemukan.</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE TRUST & STATS BAR (CONSOLIDATED) */}
      <section className="bg-dark-card/20 border-y border-white/5 py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-around gap-12 text-center md:text-left">
            <div className="flex items-center gap-4 group">
               <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-500 border border-brand-500/20 group-hover:bg-brand-500 group-hover:text-white transition-all">
                  <Zap size={24} />
               </div>
               <div>
                  <div className="text-white font-black italic tracking-widest leading-none">INSTAN</div>
                  <p className="text-[10px] text-theme-muted font-bold mt-1 uppercase">Proses Otomatis 24/7</p>
               </div>
            </div>
            <div className="w-px h-8 bg-white/10 hidden md:block"></div>
            <div className="flex items-center gap-4 group">
               <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20 group-hover:bg-green-500 group-hover:text-white transition-all">
                  <ShieldCheck size={24} />
               </div>
               <div>
                  <div className="text-white font-black italic tracking-widest leading-none">100% LEGAL</div>
                  <p className="text-[10px] text-theme-muted font-bold mt-1 uppercase">Garansi Anti Banned</p>
               </div>
            </div>
            <div className="w-px h-8 bg-white/10 hidden md:block"></div>
            <div className="flex items-center gap-4 group text-center md:text-left">
               <div className="text-white">
                  <div className="text-2xl font-black italic leading-none">1JT+</div>
                  <p className="text-[10px] text-theme-muted font-bold mt-1 uppercase tracking-widest">Transaksi Sukses</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FLASH SALE (Sleeker Design) */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-r from-purple-800 to-brand-600 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10 group">
           <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/30 rounded-lg text-[10px] font-black uppercase text-brand-300 mb-4 tracking-widest border border-white/10 backdrop-blur-md">
                 <Timer size={14} className="animate-pulse" /> TERBATAS
              </div>
              <h2 className="text-3xl md:text-5xl font-black italic text-white leading-none mb-4">FLASH SALE <span className="text-yellow-400">SULTAN</span></h2>
              <p className="text-white/80 font-bold mb-6 italic underline decoration-brand-300 underline-offset-4">Diskon Diamond hingga 50%!</p>
              <Link href="#games" className="inline-flex items-center gap-2 bg-white text-dark-bg px-8 py-3 rounded-xl font-black italic text-sm hover:scale-105 active:scale-95 transition-all shadow-xl">
                 BELI SEKARANG <ChevronRight size={18} />
              </Link>
           </div>
           
           <div className="relative z-10 flex gap-4">
              {[
                { val: timeLeft.hours, label: 'JAM' },
                { val: timeLeft.minutes, label: 'MENIT' },
                { val: timeLeft.seconds, label: 'DETIK', col: 'text-yellow-400' }
              ].map((t, i) => (
                <div key={i} className="flex flex-col items-center bg-black/40 backdrop-blur-xl border border-white/10 w-20 h-24 md:w-24 md:h-28 rounded-2xl justify-center shadow-2xl">
                   <div className={`text-3xl md:text-4xl font-black ${t.col || 'text-white'}`}>{t.val.toString().padStart(2, '0')}</div>
                   <div className="text-[10px] font-black text-white/40 mt-1">{t.label}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 4. MODERN CATALOG SECTION */}
      <section id="games" className="py-12 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
           <div className="flex flex-col items-center md:items-start">
              <h2 className="text-2xl font-black italic text-white tracking-widest flex items-center gap-3">
                 <TrendingUp className="text-brand-500" /> TRENDING SEKARANG
              </h2>
              <div className="h-1 w-20 bg-brand-500 mt-2 rounded-full"></div>
           </div>
           
           <div className="flex p-1.5 bg-dark-card border border-white/5 rounded-2xl gap-1">
              {['Semua', 'Mobile', 'PC Game'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${activeCategory === cat ? 'bg-brand-500 text-white shadow-lg' : 'text-theme-muted hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        {/* TRENDING GAMES GRID */}
        {popularGames.length > 0 && searchQuery === '' && (
          <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-24">
            {popularGames.slice(0, 6).map((game: any) => (
              <motion.div variants={itemVariants} key={game.id}>
                <Link href={`/game/${game.id}`} className="group relative block aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-white/10 bg-dark-card shadow-2xl hover:border-brand-500/50 transition-all active:scale-95">
                  <Image src={game.imageUrl} alt={game.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-90"></div>
                  <div className="absolute top-3 right-3 bg-brand-500 text-white text-[9px] font-black px-2.5 py-1 rounded-sm shadow-xl z-20 italic">HOT</div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                    <h4 className="text-white font-black italic text-lg leading-tight group-hover:text-brand-400 transition-colors uppercase tracking-tight">{game.name}</h4>
                    <p className="text-[10px] text-theme-muted font-black uppercase tracking-widest mt-1 opacity-70">{game.publisher}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* FULL LIST GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          <div className="col-span-full mb-8">
             <h3 className="text-sm font-black text-theme-muted uppercase tracking-[0.4em] flex items-center gap-4">
                SEMUA KATALOG <div className="h-px flex-1 bg-white/5"></div>
             </h3>
          </div>
          {allGamesFiltered.map((game: any) => (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} key={game.id}>
              <Link href={`/game/${game.id}`} className="group p-1 rounded-2xl bg-white/5 border border-white/10 flex flex-col hover:border-brand-500/50 hover:bg-brand-500/5 transition-all h-full">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                  <Image src={game.imageUrl} alt={game.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-brand-500/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-10">
                    <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white shadow-glow"><Play size={20} fill="currentColor" /></div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <h4 className="text-white font-bold text-sm tracking-tight group-hover:text-brand-300 transition-colors line-clamp-1 uppercase italic">{game.name}</h4>
                  <p className="text-[9px] text-theme-muted font-bold mt-1 opacity-60">{game.publisher}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. FINALLY: SUPPORT & BRAND MARQUEE (The "Pro" Touch) */}
      <section className="py-24 bg-dark-card/10 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
           <h3 className="text-[10px] font-black text-theme-muted uppercase tracking-[1em] mb-4">Metode Pembayaran Sultan</h3>
           <div className="flex gap-12 animate-scroll-slower opacity-30 select-none grayscale">
              {['GOPAY', 'OVO', 'DANA', 'QRIS', 'BCA', 'BNI', 'MANDIRI', 'SHOPEE', 'INDOMARET', 'ALFAMART'].map((m) => (
                <span key={m} className="text-xl font-black italic text-white tracking-widest">{m}</span>
              ))}
              {['GOPAY', 'OVO', 'DANA', 'QRIS', 'BCA', 'BNI', 'MANDIRI', 'SHOPEE', 'INDOMARET', 'ALFAMART'].map((m) => (
                <span key={m+'d'} className="text-xl font-black italic text-white tracking-widest">{m}</span>
              ))}
           </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center">
           <div className="glass-card p-12 border-brand-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <Headset size={120} />
              </div>
              <h2 className="text-3xl font-black italic text-white mb-4">Butuh Bantuan Personal?</h2>
              <p className="text-theme-muted mb-8 font-medium">Tim support kami siap melayani Anda 24 jam untuk segala kendala transaksi.</p>
              <a href="https://wa.me/6285854080571" target="_blank" className="btn-primary py-4 px-12 inline-flex items-center gap-3">
                 <Headset size={20} /> HUBUNGI ADMIN SEKARANG
              </a>
           </div>
        </div>
      </section>
    </div>
  );
}


