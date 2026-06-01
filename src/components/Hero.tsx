import { motion } from 'motion/react';
import { Trophy } from 'lucide-react';

interface HeroProps {
  onBegin: () => void;
}

export function Hero({ onBegin }: HeroProps) {
  const years = [1930, 1934, 1938, 1950, 1954, 1958, 1962, 1966, 1970, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022, 2026];

  return (
    <motion.section 
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#050505] border-b border-[#D4AF37]/15"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Background Icon Silhouette */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none z-0"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.035 }}
        transition={{ duration: 3, ease: 'easeOut' }}
      >
        <Trophy size={650} strokeWidth={0.35} color="#D4AF37" />
      </motion.div>

      {/* Background timeline text rotating slowly */}
      <div className="absolute inset-0 flex items-center justify-center opacity-8 pointer-events-none overflow-hidden mix-blend-overlay z-0">
        <motion.div 
          className="whitespace-nowrap font-serif text-[18vw] text-[#F5F2EA] flex gap-[10vw] font-black"
          animate={{ x: [0, -3000] }}
          transition={{ repeat: Infinity, duration: 80, ease: 'linear' }}
        >
          {years.map(y => <span key={y} className="tracking-tighter">{y}</span>)}
        </motion.div>
      </div>

      {/* Decorative Outer Museum Frame lines */}
      <div className="absolute inset-6 border border-[#D4AF37]/10 pointer-events-none z-10" />
      <div className="absolute inset-10 border border-[#4E5661]/5 pointer-events-none z-10" />

      <motion.div 
        className="z-20 flex flex-col items-center text-center px-6 max-w-4xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
      >
        {/* World Cup Vault Logo Emblem Above */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-8"
        >
          <div className="w-16 h-16 rounded-full border border-[#D4AF37]/35 flex items-center justify-center bg-black/50 shadow-lg shadow-[#D4AF37]/5">
            <Trophy size={24} className="text-[#D4AF37]" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Elegant Headline */}
        <motion.h1 
          className="font-serif text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-[0.25em] text-[#F5F2EA] mb-4 text-center leading-none select-none drop-shadow-xl"
          initial={{ letterSpacing: '0.4em', opacity: 0 }}
          animate={{ letterSpacing: '0.2em', opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        >
          WORLD CUP <br />
          <span className="text-[#D4AF37] font-medium tracking-[0.3em]">VAULT</span>
        </motion.h1>
        
        <motion.div 
          className="h-[2px] w-32 bg-[#D4AF37] my-8 opacity-45 relative"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#D4AF37]" />
        </motion.div>

        {/* Cinematic Split Multi-Line Subheadline */}
        <motion.div 
          className="font-sans text-[#DDD7C8] text-base sm:text-lg lg:text-xl tracking-[0.4em] uppercase mb-16 space-y-2 opacity-75 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <div>Every Tournament.</div>
          <div>Every Legend.</div>
          <div>Every Story.</div>
        </motion.div>
        
        {/* Pure Professional CTA */}
        <motion.button 
          onClick={onBegin}
          className="font-serif text-[#D4AF37] border-2 border-[#D4AF37]/45 px-12 py-5 tracking-[0.3em] uppercase text-xs sm:text-sm hover:bg-[#D4AF37] hover:text-[#090909] hover:border-[#D4AF37] transition-all duration-500 ease-out cursor-pointer bg-black/40 shadow-xl overflow-hidden group select-none relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 font-bold">BEGIN THE JOURNEY</span>
          <div className="absolute inset-0 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 -z-0" />
        </motion.button>
      </motion.div>

      {/* Scroll Down Hint Emblem at footer of hero */}
      <motion.div 
        className="absolute bottom-10 flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity cursor-pointer text-[#DDD7C8]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.2, duration: 1 }}
        onClick={onBegin}
      >
        <span className="font-mono text-[8px] tracking-[0.3em] uppercase mb-2">SCROLL DOWN TO INITIATE</span>
        <motion.div 
          className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.section>
  );
}

