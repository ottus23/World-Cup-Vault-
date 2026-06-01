import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Scale } from 'lucide-react';
import { legends, Legend } from '../data';
import { ContinueExploringSystem } from './ContinueExploringSystem';

// Styles for different eras
const ERA_STYLES: Record<string, string> = {
  vintage: 'sepia-[0.6] grayscale-[0.5] contrast-[1.2] brightness-90 saturate-50',
  contrast: 'contrast-[1.4] saturate-50 grayscale-[0.2] brightness-95 filter',
  editorial: 'grayscale-[1] contrast-125 brightness-90',
  modern: 'contrast-[1.1] saturate-[1.1] brightness-95'
};

function LegendExhibit({ legend, onCompare }: { legend: Legend; onCompare: () => void; key?: string }) {
  return (
    <section 
      id={`legend-${legend.id}`}
      className="relative min-h-[100vh] w-full flex flex-col lg:flex-row items-center border-b border-[#4E5661]/20 bg-[#090909]"
    >
      {/* Portrait side */}
      <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen relative overflow-hidden group">
         <motion.img 
            src={legend.image} 
            className={`w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 ${ERA_STYLES[legend.eraStyle]}`} 
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
         />
         <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#090909] via-[#090909]/60 lg:via-[#090909]/20 to-transparent opacity-90" />
         
         <div className="absolute bottom-12 lg:bottom-24 left-6 lg:left-12 pointer-events-none">
            <motion.h3 
              className="font-serif text-[#F5F2EA] text-6xl md:text-8xl lg:text-[7rem] tracking-tighter leading-none mb-2 opacity-90 mix-blend-plus-lighter"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {legend.name}
            </motion.h3>
            <motion.p 
              className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-sm md:text-md opacity-90"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {legend.nation}
            </motion.p>
         </div>
      </div>

      {/* Content side */}
      <div className="w-full lg:w-1/2 min-h-[50vh] flex flex-col justify-center px-6 lg:px-24 py-16 lg:py-24 relative z-10">
        
        {/* Legacy Statement */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.3 }}
        >
           <h4 className="font-serif text-[#F5F2EA] text-3xl md:text-5xl italic mb-16 opacity-90 leading-tight">
             "{legend.legacyStatement}"
           </h4>
        </motion.div>

        {/* Legacy Number */}
        <motion.div 
           className="relative mb-24 flex items-baseline gap-6"
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.4 }}
        >
           <span className="font-serif text-[#D4AF37] text-7xl md:text-[8rem] lg:text-[10rem] leading-none opacity-50 mix-blend-screen">{legend.legacyNumber}</span>
           <span className="font-sans text-[#69707A] uppercase tracking-widest text-sm max-w-[120px]">{legend.legacyLabel}</span>
        </motion.div>

        {/* World Cup Journey */}
        <motion.div 
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="font-sans text-[#D4AF37] text-xs uppercase tracking-[0.2em] mb-6">World Cup Journey</p>
          <div className="flex gap-4 md:gap-8 overflow-x-auto pb-4 scrollbar-hide items-center">
            {legend.worldCupJourney.map((year, idx) => (
              <div key={year} className="flex items-center gap-4 md:gap-8 flex-shrink-0">
                <span className="font-serif text-[#F5F2EA] text-2xl md:text-4xl opacity-80">{year}</span>
                {idx !== legend.worldCupJourney.length - 1 && (
                   <div className="w-8 md:w-12 h-px bg-[#4E5661]/50" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hall of Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="flex justify-between items-baseline mb-6">
            <p className="font-sans text-[#D4AF37] text-xs uppercase tracking-[0.2em]">Hall of Achievements</p>
            <button 
              onClick={onCompare}
              className="text-[#69707A] hover:text-[#D4AF37] transition-colors flex items-center gap-2 group"
              title="Compare Legacy"
            >
              <Scale size={16} />
              <span className="font-sans text-[10px] uppercase tracking-widest hidden md:inline group-hover:text-[#F5F2EA]">Duel Mode</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {legend.hallOfAchievements.map((ach) => (
              <div key={ach} className="border border-[#4E5661]/30 p-8 bg-[#111111] font-serif text-[#DDD7C8] text-sm md:text-lg flex items-center justify-center text-center leading-snug hover:border-[#D4AF37] transition-colors duration-500">
                {ach}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LegacyCompareModal({ onClose }: { onClose: () => void }) {
  const [player1, setPlayer1] = useState(legends[0]);
  const [player2, setPlayer2] = useState(legends[legends.length - 1]);

  return (
    <motion.div 
      className="fixed inset-0 z-[300] bg-[#090909]/95 backdrop-blur-xl flex flex-col overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="sticky top-0 z-10 bg-gradient-to-b from-[#090909] to-transparent pt-8 pb-4 px-6 md:px-12 flex justify-between items-center">
        <h2 className="font-sans text-[#D4AF37] uppercase tracking-[0.2em] text-sm md:text-base">Legacy vs Legacy</h2>
        <button onClick={onClose} className="text-[#69707A] hover:text-[#F5F2EA] transition-colors">
          <X size={32} />
        </button>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start mt-8">
        
        {/* Player 1 Selection & Stats */}
        <div className="flex flex-col border-r-0 md:border-r border-[#4E5661]/20 pr-0 md:pr-16">
          <select 
            className="bg-transparent font-serif text-4xl text-[#F5F2EA] border-b border-[#4E5661]/50 pb-2 outline-none mb-12"
            value={player1.id}
            onChange={(e) => setPlayer1(legends.find(l => l.id === e.target.value) || player1)}
          >
            {legends.map(l => (
              <option key={`p1-${l.id}`} value={l.id} className="bg-[#111111] text-base font-sans">{l.name}</option>
            ))}
          </select>

          <img src={player1.image} alt={player1.name} className={`w-full h-64 object-cover mb-8 ${ERA_STYLES[player1.eraStyle]}`} referrerPolicy="no-referrer" />
          
          <div className="space-y-8">
            <div>
              <p className="font-sans text-[#69707A] uppercase tracking-widest text-xs mb-2">Legacy Statement</p>
              <p className="font-serif text-[#DDD7C8] text-xl italic leading-relaxed">"{player1.legacyStatement}"</p>
            </div>
            <div>
              <p className="font-sans text-[#69707A] uppercase tracking-widest text-xs mb-2">{player1.legacyLabel}</p>
              <p className="font-serif text-[#D4AF37] text-6xl">{player1.legacyNumber}</p>
            </div>
            <div>
              <p className="font-sans text-[#69707A] uppercase tracking-widest text-xs mb-4">Journey</p>
              <p className="font-serif text-[#F5F2EA] text-lg">{player1.worldCupJourney.join(" • ")}</p>
            </div>
            <div>
               <p className="font-sans text-[#69707A] uppercase tracking-widest text-xs mb-4">Achievements</p>
               <ul className="space-y-2">
                 {player1.hallOfAchievements.map(ach => (
                   <li key={`p1-ach-${ach}`} className="font-serif text-[#DDD7C8] border-l-2 border-[#D4AF37] pl-4">{ach}</li>
                 ))}
               </ul>
            </div>
          </div>
        </div>

        {/* Player 2 Selection & Stats */}
        <div className="flex flex-col pl-0 md:pl-8">
          <select 
            className="bg-transparent font-serif text-4xl text-[#F5F2EA] border-b border-[#4E5661]/50 pb-2 outline-none mb-12 text-right"
            value={player2.id}
            onChange={(e) => setPlayer2(legends.find(l => l.id === e.target.value) || player2)}
          >
            {legends.map(l => (
              <option key={`p2-${l.id}`} value={l.id} className="bg-[#111111] text-base font-sans">{l.name}</option>
            ))}
          </select>

          <img src={player2.image} alt={player2.name} className={`w-full h-64 object-cover mb-8 ${ERA_STYLES[player2.eraStyle]}`} referrerPolicy="no-referrer" />
          
          <div className="space-y-8 text-right">
            <div>
              <p className="font-sans text-[#69707A] uppercase tracking-widest text-xs mb-2">Legacy Statement</p>
              <p className="font-serif text-[#DDD7C8] text-xl italic leading-relaxed">"{player2.legacyStatement}"</p>
            </div>
            <div>
              <p className="font-sans text-[#69707A] uppercase tracking-widest text-xs mb-2">{player2.legacyLabel}</p>
              <p className="font-serif text-[#D4AF37] text-6xl">{player2.legacyNumber}</p>
            </div>
            <div>
              <p className="font-sans text-[#69707A] uppercase tracking-widest text-xs mb-4">Journey</p>
              <p className="font-serif text-[#F5F2EA] text-lg">{player2.worldCupJourney.join(" • ")}</p>
            </div>
            <div>
               <p className="font-sans text-[#69707A] uppercase tracking-widest text-xs mb-4">Achievements</p>
               <ul className="space-y-2 flex flex-col items-end">
                 {player2.hallOfAchievements.map(ach => (
                   <li key={`p2-ach-${ach}`} className="font-serif text-[#DDD7C8] border-r-2 border-[#D4AF37] pr-4">{ach}</li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LegacyConstellation() {
  // A visual network representation between the legends (non-blocking decorative background)
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 hidden lg:block z-[5]">
       <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
         <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
               <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.5" />
               <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>
         </defs>
         {/* Decorative lines representing legacy connections */}
         <line x1="20%" y1="10%" x2="40%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
         <line x1="40%" y1="50%" x2="70%" y2="30%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
         <line x1="70%" y1="30%" x2="80%" y2="80%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
         <line x1="40%" y1="50%" x2="30%" y2="90%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 4" />
       </svg>
    </div>
  );
}

export function LegendsVault({ 
  onClose, 
  initialLegendId,
  onExploreMatches,
  onExploreNations,
  onExploreLegends,
  onExploreStadiums,
  onExploreTournament
}: { 
  onClose?: () => void; 
  initialLegendId?: string;
  onExploreMatches?: (matchId: string) => void;
  onExploreNations?: (nationId: string) => void;
  onExploreLegends?: (legendId: string) => void;
  onExploreStadiums?: (stadiumId: string) => void;
  onExploreTournament?: (year: number) => void;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    if (initialLegendId) {
      const scrollTimer = setTimeout(() => {
        const el = document.getElementById(`legend-${initialLegendId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 700);
      return () => clearTimeout(scrollTimer);
    }
  }, [initialLegendId]);

  const filteredLegends = legends.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.nation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToLegend = (id: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    document.getElementById(`legend-${id}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full bg-[#090909] pb-32">
       {onClose && (
         <div className="sticky top-0 z-[100] bg-[#090909]/90 backdrop-blur-md px-6 py-4 border-b border-[#4E5661]/20 flex justify-between items-center">
           <button 
             onClick={onClose} 
             className="text-[#69707A] hover:text-[#F5F2EA] transition-colors flex items-center gap-2 cursor-pointer"
           >
             <X size={20} />
             <span className="font-sans text-xs uppercase tracking-widest">Return to Lobby</span>
           </button>
           <span className="font-serif text-sm tracking-widest uppercase text-[#D4AF37]">Legends Vault</span>
         </div>
       )}
       
      {/* Entry Title Statement */}
      <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <LegacyConstellation />
        
        <motion.p 
          className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-sm md:text-base mb-12 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Legends Vault
        </motion.p>
        
        <motion.h2 
          className="font-serif text-[#F5F2EA] text-4xl md:text-6xl lg:text-8xl leading-tight max-w-5xl mx-auto italic opacity-90 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          "Some players won trophies. Others defined history."
        </motion.h2>

        <motion.button
          onClick={() => setIsSearchOpen(true)}
          className="mt-20 font-sans text-[#69707A] text-xs uppercase tracking-widest border border-[#4E5661]/40 px-8 py-4 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors flex items-center gap-4 group bg-[#090909]/40 backdrop-blur-sm z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Search size={16} className="group-hover:scale-110 transition-transform" />
          Search Archive
        </motion.button>
      </div>

      {/* The Exhibits */}
      <div className="relative z-10">
        {legends.map((legend) => (
          <LegendExhibit key={legend.id} legend={legend} onCompare={() => setShowCompare(true)} />
        ))}
      </div>

      {/* CONTINUE EXPLORING SYSTEM */}
      <div className="relative z-10 mt-16">
        <ContinueExploringSystem 
          currentItemType="legend"
          currentItemId={initialLegendId || "pele"}
          onExploreMatches={onExploreMatches}
          onExploreNations={onExploreNations}
          onExploreLegends={onExploreLegends}
          onExploreStadiums={onExploreStadiums}
          onExploreTournament={onExploreTournament}
        />
      </div>

      {/* Archive Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            className="fixed inset-0 z-[200] bg-[#090909]/95 backdrop-blur-lg flex flex-col p-6 lg:p-24"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-4xl mx-auto w-full relative">
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-0 top-0 text-[#69707A] hover:text-[#D4AF37] transition-colors"
              >
                 <X size={32} />
              </button>

              <p className="font-sans text-[#D4AF37] tracking-[0.2em] uppercase text-xs mb-8">Archive Directory</p>
              
              <div className="relative border-b-2 border-[#4E5661]/50 mb-16 pb-4">
                 <input 
                   type="text" 
                   autoFocus
                   placeholder="Enter a name or nation..." 
                   className="w-full bg-transparent font-serif text-4xl md:text-6xl lg:text-7xl text-[#F5F2EA] outline-none placeholder-[#4E5661] opacity-90"
                   value={searchQuery}
                   onChange={e => setSearchQuery(e.target.value)}
                 />
                 <Search size={40} className="absolute right-0 bottom-6 text-[#4E5661]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredLegends.map(l => (
                   <div 
                     key={`search-${l.id}`} 
                     onClick={() => scrollToLegend(l.id)}
                     className="group cursor-pointer border border-[#4E5661]/20 bg-[#111111] p-6 hover:border-[#D4AF37] transition-colors"
                   >
                     <p className="font-sans text-[#D4AF37] text-[10px] uppercase tracking-widest mb-2 opacity-80">{l.nation} • {l.era}</p>
                     <p className="font-serif text-[#F5F2EA] text-2xl group-hover:text-[#D4AF37] transition-colors">{l.name}</p>
                   </div>
                ))}
                {filteredLegends.length === 0 && (
                  <p className="font-sans text-[#69707A] tracking-widest uppercase text-sm">No records found matching "{searchQuery}"</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
         {showCompare && <LegacyCompareModal onClose={() => setShowCompare(false)} />}
      </AnimatePresence>

    </section>
  );
}
