"use client";

import { motion } from 'framer-motion';
import { LockKeyhole, Eye, Database, ShieldCheck, Mail } from 'lucide-react';

export default function KebijakanPrivasiPage() {
  const policies = [
    {
      icon: <Eye className="text-brand-400" />,
      title: "Data yang Kami Kumpulkan",
      content: "Kami hanya mengumpulkan data yang diperlukan untuk transaksi, seperti User ID Game, Zone ID, Nomor WhatsApp (untuk bukti transaksi), dan Email."
    },
    {
      icon: <Database className="text-brand-400" />,
      title: "Penggunaan Informasi",
      content: "Informasi Anda digunakan semata-mata untuk memproses pesanan top-up dan memberikan bantuan layanan pelanggan jika terjadi kendala pada transaksi Anda."
    },
    {
      icon: <ShieldCheck className="text-brand-400" />,
      title: "Perlindungan Data",
      content: "Sultan Top Up menggunakan enkripsi SSL tingkat lanjut untuk memastikan setiap data yang Anda masukkan aman dari akses pihak ketiga yang tidak sah."
    },
    {
      icon: <Mail className="text-brand-400" />,
      title: "Kontak & Informasi",
      content: "Jika Anda memiliki pertanyaan mengenai privasi data Anda, silakan hubungi tim dukungan kami melalui WhatsApp resmi Sultan Top Up."
    }
  ];

  return (
    <div className="min-h-screen py-24 px-6 overflow-hidden bg-dark-bg relative">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[0%] left-[0%] w-[400px] h-[400px] bg-accent-purple/10 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 font-bold mb-6 text-sm uppercase tracking-widest">
            <LockKeyhole size={16} /> Privacy Protocol
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            Kebijakan <span className="text-neon">Privasi</span>
          </h1>
          <p className="text-theme-muted text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            Keamanan data Anda adalah prioritas utama. Pelajari bagaimana kami melindungi identitas dan informasi transaksi Anda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {policies.map((policy, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 group hover:bg-white/5 transition-all"
            >
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-brand-500/50 group-hover:bg-brand-500/10 transition-all">
                {policy.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{policy.title}</h3>
              <p className="text-theme-muted leading-relaxed font-medium text-sm">{policy.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="glass-card p-6 border-brand-500/20 bg-brand-500/5 text-center"
        >
          <p className="text-theme-muted text-xs font-semibold italic text-center">Kami tidak pernah menjual data pribadi Anda kepada pihak manapun. Transaksi Anda aman bersama Sultan Top Up.</p>
        </motion.div>
      </div>
    </div>
  );
}

