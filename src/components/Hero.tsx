import { motion } from 'motion/react';
import { Trophy } from 'lucide-react';

interface HeroProps {
  onEnter: () => void;
  entered: boolean;
}

export function Hero({ onEnter, entered }: HeroProps) {
  const years = [1930, 1934, 1938, 1950, 1954, 1958, 1962, 1966, 1970, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022];

  return (
    <motion.section 
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden z-50 bg-[#090909]"
      initial={{ opacity: 1 }}
      animate={{ opacity: entered ? 0 : 1, y: entered ? '-100%' : 0 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background Icon Silhouette */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.03 }}
        transition={{ duration: 3, ease: 'easeOut' }}
      >
        <Trophy size={600} strokeWidth={0.5} color="#D4AF37" />
      </motion.div>

      {/* Background timeline text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden mix-blend-overlay">
        <motion.div 
          className="whitespace-nowrap font-serif text-[15vw] text-[#F5F2EA] flex gap-[10vw]"
          animate={{ x: [0, -2000] }}
          transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
        >
          {years.map(y => <span key={y}>{y}</span>)}
        </motion.div>
      </div>

      <motion.div 
        className="z-10 flex flex-col items-center text-center px-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.h1 
          className="font-serif text-5xl md:text-7xl lg:text-9xl uppercase tracking-widest text-[#F5F2EA] mb-6"
          initial={{ letterSpacing: '0.5em' }}
          animate={{ letterSpacing: '0.1em' }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          World Cup <br/>Vault
        </motion.h1>
        
        <motion.div 
          className="h-px w-24 bg-[#D4AF37] mb-8 opacity-50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />

        <motion.p 
          className="font-sans text-[#DDD7C8] text-sm md:text-lg lg:text-xl tracking-widest uppercase mb-16 max-w-xl mx-auto opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Every Tournament. Every Legend. Every Story.
        </motion.p>
        
        <motion.button 
          onClick={onEnter}
          className="font-serif text-[#D4AF37] border border-[#D4AF37] px-10 py-4 tracking-widest uppercase text-sm hover:bg-[#D4AF37] hover:text-[#090909] transition-all duration-500 ease-out"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enter the Vault
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
