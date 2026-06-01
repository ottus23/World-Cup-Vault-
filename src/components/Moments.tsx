import { motion } from 'motion/react';
import { HistoricalMoment } from '../data';

export function Moments({ moment }: { moment: HistoricalMoment }) {
  return (
    <motion.div 
      className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0%" }}
      transition={{ duration: 1.5 }}
    >
      <div className="absolute inset-0">
        <img 
          src={moment.image} 
          alt={moment.title} 
          className="w-full h-full object-cover filter grayscale opacity-30 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#090909]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-[#090909]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-6">
        <motion.p 
          className="font-sans text-[#D4AF37] tracking-[0.2em] uppercase text-sm mb-4"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {moment.year} — Historic Moment
        </motion.p>
        <motion.h3 
          className="font-serif text-[#F5F2EA] text-4xl md:text-6xl lg:text-7xl mb-8"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {moment.title}
        </motion.h3>
        <motion.p 
          className="font-sans text-[#DDD7C8] text-lg md:text-xl lg:text-2xl font-light italic max-w-2xl opacity-80"
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
