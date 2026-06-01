import { motion } from 'motion/react';
import { HistoricalMoment } from '../data';
import { VerifiedImage } from './VerifiedImage';

export function Moments({ moment }: { moment: HistoricalMoment }) {
  return (
    <motion.div 
      className="relative w-full h-[75vh] flex flex-col md:flex-row items-center justify-around overflow-hidden border-y border-white/5 bg-[#0A0A0A] px-6 py-12 md:px-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0%" }}
      transition={{ duration: 1.5 }}
    >
      {/* Background radial gradient to set premium mood */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.03),transparent)] pointer-events-none" />

      {/* Frame on Left or Center depending on screen size */}
      <div className="w-full md:w-5/12 max-w-md relative z-10 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-500">
        <VerifiedImage 
          src={moment.image} 
          alt={`${moment.title} Historical Moment`} 
          className="w-full shadow-2xl rounded"
          aspectRatio="3:2"
          tournament={`World Cup ${moment.year}`}
          date={`${moment.year}`}
          context={moment.description}
          eraStyle={moment.year <= 1954 ? 'antique' : moment.year <= 1986 ? 'vintage' : 'retro'}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left max-w-xl px-2 mt-8 md:mt-0">
        <motion.p 
          className="font-sans text-[#D4AF37] tracking-[0.2em] uppercase text-[10px] md:text-xs mb-3 font-semibold border-b border-[#D4AF37]/20 pb-1"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {moment.year} — Verified Historical Chronicle
        </motion.p>
        <motion.h3 
          className="font-serif text-[#F5F2EA] text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {moment.title}
        </motion.h3>
        <motion.p 
          className="font-serif text-[#DDD7C8]/90 text-sm md:text-base leading-relaxed italic max-w-lg border-l-2 border-[#D4AF37]/30 pl-4 py-1"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          "{moment.description}"
        </motion.p>
      </div>
    </motion.div>
  );
}
