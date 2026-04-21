"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function SupportFAB() {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsApp = () => {
    // Official CS number
    const phoneNumber = "6285854080571"; 
    const message = encodeURIComponent("Halo Sultan Top Up, saya butuh bantuan mengenai pesanan saya.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');

  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass-card mb-2 p-6 w-72 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-brand-500/30"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-white font-bold text-lg">Pusat Bantuan</h3>
                <p className="text-theme-muted text-xs">Ada kendala? Kami siap membantu 24/7.</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-theme-muted hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                    <MessageCircle size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-white text-sm font-bold">Chat WhatsApp</div>
                    <div className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Fast Response</div>
                  </div>
                </div>
              </button>

              <a 
                href="/bantuan"
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <HelpCircle size={20} />
                </div>
                <div className="text-left">
                  <div className="text-white text-sm font-bold">Pusat Informasi</div>
                  <div className="text-[10px] text-theme-muted font-medium">Bantuan & FAQ</div>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(14,165,233,0.4)] border-2 transition-all duration-300 ${isOpen ? 'bg-dark-card border-brand-500 text-brand-400' : 'bg-brand-500 border-white/10 text-white'}`}
      >
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-dark-bg animate-bounce"></span>
        )}
      </motion.button>
    </div>
  );
}
