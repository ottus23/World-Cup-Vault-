import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { Trophy, ArrowRight, X } from 'lucide-react';
import { tournaments, moments, Tournament } from '../data';
import { Moments } from './Moments';
import { TournamentArchive } from './TournamentArchive';

function getEraStyling(year: number) {
  if (year <= 1950) return 'sepia-[0.5] grayscale contrast-[1.2] opacity-80'; // Vintage
  if (year <= 1978) return 'sepia-[0.2] contrast-[1.1] saturate-[1.2] opacity-90'; // Golden
  if (year <= 2006) return 'contrast-[1.2] saturate-[1.1] opacity-95'; // TV
  return 'contrast-[1.05] saturate-[1.05] opacity-100'; // Modern
}

function EraDivider({ title, subtitle, id }: { title: string, subtitle: string, id?: string }) {
  return (
    <motion.div 
      id={id}
      className="w-full h-screen flex flex-col items-center justify-center bg-[#111111] text-center px-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ margin: "-20%" }}
      transition={{ duration: 1.5 }}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <Trophy size={800} strokeWidth={0.2} color="#D4AF37" />
      </div>
      <motion.p 
        className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-sm md:text-md mb-6"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ margin: "-20%" }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        {subtitle}
      </motion.p>
      <motion.h2 
        className="font-serif text-[#F5F2EA] text-5xl md:text-7xl lg:text-8xl uppercase tracking-wider"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ margin: "-20%" }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {title}
      </motion.h2>
    </motion.div>
  );
}

function TournamentChapter({ tournament, isLeft }: { tournament: Tournament, isLeft: boolean }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const filterStyle = getEraStyling(tournament.year);

  return (
    <motion.section 
      className="min-h-screen relative flex items-center justify-center overflow-hidden py-32 group"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ margin: "-10%" }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {/* Background Year Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 transition-opacity duration-1000 group-hover:opacity-10 z-0">
        <motion.span 
          className="text-[40vw] font-serif font-bold text-[#F5F2EA] leading-none select-none mix-blend-overlay"
          initial={{ y: 100 }}
          whileInView={{ y: 0 }}
          viewport={{ margin: "0%" }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          {tournament.year}
        </motion.span>
      </div>

      <div className="z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Visual/Image Side */}
        <div className={`w-full order-last ${isLeft ? 'lg:order-first' : 'lg:order-last'}`}>
          <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-sm group/img">
            <motion.img 
              src={tournament.image} 
              alt={`${tournament.year} World Cup in ${tournament.host}`} 
              className={`w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-105 ${filterStyle}`}
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ margin: "-10%" }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            {/* Cinematic Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-sans text-[#F5F2EA] text-xs uppercase tracking-widest opacity-80">Final Score</p>
              <p className="font-serif text-[#D4AF37] text-3xl">{tournament.finalScore}</p>
            </div>
          </div>
        </div>
        
        {/* Story/Content Side */}
        <div className={`w-full flex flex-col justify-center order-first ${isLeft ? 'lg:order-last' : 'lg:order-first'} ${isLeft ? 'lg:items-start lg:text-left' : 'lg:items-start lg:text-left'} z-20`}>
          <motion.p 
             className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-sm mb-4"
             initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
          >
             Hosted in {tournament.host}
          </motion.p>

          <motion.h3 
            className="font-serif text-[#F5F2EA] text-5xl md:text-7xl mb-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {tournament.champion}
          </motion.h3>

          <motion.p 
            className="font-sans text-[#DDD7C8] text-lg md:text-xl uppercase tracking-widest mb-10 opacity-70"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Defeated {tournament.runnerUp}
          </motion.p>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.5 }}
          >
             <h4 className="font-serif text-[#F5F2EA] text-2xl md:text-3xl mb-4 italic">{tournament.historicMoment}</h4>
             <p className="font-sans text-[#69707A] leading-relaxed mb-12 max-w-lg text-lg">
               {tournament.story}
             </p>

            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-4 font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-[#D4AF37] border-b border-[#D4AF37]/30 pb-2 hover:border-[#D4AF37] transition-all group/btn w-fit"
            >
              Explore {tournament.year} 
              <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isDrawerOpen && (
          <TournamentArchive tournament={tournament} onClose={() => setIsDrawerOpen(false)} />
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export function Chronicle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const trophyY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#090909]">
      
      {/* Central Progress Line & Trophy */}
      <div className="absolute left-6 md:left-[8%] lg:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-[#111111] via-[#4E5661]/40 to-[#111111] z-30 hidden md:block">
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#090909] border border-[#D4AF37] flex items-center justify-center z-40 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          style={{ top: trophyY }}
        >
          <Trophy size={14} color="#D4AF37" />
        </motion.div>
      </div>

      <div className="w-full flex flex-col">
        {tournaments.map((tournament, idx) => {
          const isLeft = idx % 2 === 0;
          
          let eraDivider = null;
          if (tournament.year === 1930) eraDivider = <EraDivider id="era-vintage" title="The Vintage Era" subtitle="The Dawn of Football" />;
          if (tournament.year === 1954) eraDivider = <EraDivider id="era-golden" title="The Golden Age" subtitle="Post-War Renaissance" />;
          if (tournament.year === 1982) eraDivider = <EraDivider id="era-broadcast" title="The Broadcast Era" subtitle="Global Superstars" />;
          if (tournament.year === 2010) eraDivider = <EraDivider id="era-modern" title="The Modern Era" subtitle="Tactical Perfection" />;

          return (
            <div key={tournament.year}>
              {eraDivider}
              <TournamentChapter tournament={tournament} isLeft={isLeft} />
              
              {/* Insert historic moment scenes optionally */}
              {idx > 0 && idx % 4 === 0 && moments[(idx / 4) - 1] && (
                <div className="w-full">
                  <Moments moment={moments[(idx / 4) - 1]} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
