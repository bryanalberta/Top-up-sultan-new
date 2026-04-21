"use client";

import { motion } from 'framer-motion';
import { ShieldAlert, BookOpen, AlertCircle, RefreshCcw, Scale } from 'lucide-react';

export default function SyaratKetentuanPage() {
  const sections = [
    {
      icon: <BookOpen className="text-brand-400" />,
      title: "Ketentuan Umum",
      content: "Sultan Top Up adalah platform penyedia layanan pengisian (top-up) mata uang digital game dan voucher. Dengan mengakses situs ini, Anda dianggap telah membaca dan menyetujui seluruh aturan yang berlaku."
    },
    {
      icon: <AlertCircle className="text-brand-400" />,
      title: "Tanggung Jawab ID",
      content: "Kesalahan dalam memasukkan User ID, Zone ID, atau nomor tujuan sepenuhnya merupakan tanggung jawab pengguna. Kami tidak dapat melakukan refund atau pembatalan untuk transaksi yang gagal terkirim akibat kesalahan input pengguna."
    },
    {
      icon: <RefreshCcw className="text-brand-400" />,
      title: "Kebijakan Pengembalian (Refund)",
      content: "Seluruh produk digital yang sudah berhasil diproses dan masuk ke akun game tujuan tidak dapat dikembalikan atau ditukar dengan uang tunai. Refund hanya diberikan apabila sistem kami gagal memproses pesanan akibat kendala teknis internal."
    },
    {
      icon: <Scale className="text-brand-400" />,
      title: "Kepatuhan Hukum",
      content: "Segala bentuk penyalahgunaan sistem, penipuan, atau peretasan akan dilaporkan kepada pihak berwajib sesuai dengan hukum yang berlaku di Republik Indonesia."
    }
  ];

  return (
    <div className="min-h-screen py-24 px-6 overflow-hidden bg-dark-bg relative">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[0%] right-[0%] w-[400px] h-[400px] bg-accent-purple/10 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 font-bold mb-6 text-sm uppercase tracking-widest">
            <ShieldAlert size={16} /> Legal Compliance
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            Syarat & <span className="text-neon">Ketentuan</span>
          </h1>
          <p className="text-theme-muted text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            Aturan main yang transparan demi keamanan dan kenyamanan transaksi Anda di ekosistem Sultan Top Up.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {sections.map((sec, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 group hover:bg-white/5 transition-all"
            >
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-brand-500/50 group-hover:bg-brand-500/10 transition-all">
                {sec.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{sec.title}</h3>
              <p className="text-theme-muted leading-relaxed font-medium text-sm">{sec.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="glass-card p-6 border-brand-500/20 bg-brand-500/5 text-center"
        >
          <p className="text-theme-muted text-xs font-semibold italic">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}. Sultan Top Up berhak mengubah kebijakan ini sewaktu-waktu tanpa pemberitahuan.</p>
        </motion.div>
      </div>
    </div>
  );
}

