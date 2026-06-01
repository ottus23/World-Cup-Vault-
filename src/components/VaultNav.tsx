import { motion } from 'motion/react';

const archives = [
  { id: 'tournaments', title: 'Tournaments', icon: '🏆', desc: 'The Complete History' },
  { id: 'legends', title: 'Legends', icon: '👑', desc: 'Hall of Immortals' },
  { id: 'records', title: 'Records', icon: '📊', desc: 'Numbers that Define' },
  { id: 'nations', title: 'Nations', icon: '🌍', desc: 'Flags of Glory' },
  { id: 'matches', title: 'Matches', icon: '🎬', desc: 'Cinematic Classics' },
  { id: 'stadiums', title: 'Stadiums', icon: '🏟️', desc: 'The Grand Stages' }
];

export function VaultNav({ 
  onExploreMatches, 
  onExploreNations,
  onExploreLegends,
  onExploreRecords,
  onExploreStadiums
}: { 
  onExploreMatches?: () => void; 
  onExploreNations?: () => void; 
  onExploreLegends?: () => void; 
  onExploreRecords?: () => void; 
  onExploreStadiums?: () => void; 
}) {
  const handleArchiveClick = (archiveId: string) => {
    if (archiveId === 'matches' && onExploreMatches) {
      onExploreMatches();
    } else if (archiveId === 'nations' && onExploreNations) {
      onExploreNations();
    } else if (archiveId === 'legends' && onExploreLegends) {
      onExploreLegends();
    } else if (archiveId === 'records' && onExploreRecords) {
      onExploreRecords();
    } else if (archiveId === 'stadiums' && onExploreStadiums) {
      onExploreStadiums();
    } else if (archiveId === 'tournaments') {
      const el = document.getElementById('era-vintage');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative py-48 bg-[#171717] px-6 border-t border-[#4E5661]/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            className="font-serif text-3xl md:text-5xl text-[#F5F2EA] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Explore the Vault
          </motion.h2>
          <motion.div 
            className="h-px w-24 bg-[#D4AF37] mx-auto opacity-50"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {archives.map((archive, idx) => (
            <motion.div
              key={archive.title}
              className="group relative cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              onClick={() => handleArchiveClick(archive.id)}
            >
              <div className="relative p-12 flex flex-col items-center text-center border border-[#4E5661]/30 bg-[#090909] transition-all duration-500 hover:border-[#D4AF37]/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <span className="text-4xl mb-6 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 filter grayscale group-hover:grayscale-0">{archive.icon}</span>
                
                <h3 className="font-serif text-[#F5F2EA] text-2xl tracking-wide mb-3 group-hover:text-[#D4AF37] transition-colors duration-500">
                  {archive.title}
                </h3>
                
                <p className="font-sans text-[#69707A] text-xs uppercase tracking-[0.2em]">
                  {archive.desc}
                </p>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#69707A] group-hover:border-[#D4AF37] transition-colors duration-500"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#69707A] group-hover:border-[#D4AF37] transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#69707A] group-hover:border-[#D4AF37] transition-colors duration-500"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#69707A] group-hover:border-[#D4AF37] transition-colors duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
