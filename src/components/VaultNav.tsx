import { motion } from 'motion/react';
import { Trophy, Award, BarChart3, Globe, Film, Map, Compass } from 'lucide-react';

const archives = [
  { 
    id: 'tournaments', 
    title: 'Tournaments', 
    chamber: 'CHAMBER I', 
    desc: 'The Complete History portfolio from 1930 onwards',
    Icon: Trophy 
  },
  { 
    id: 'legends', 
    title: 'Legends', 
    chamber: 'CHAMBER II', 
    desc: 'The Hall of Immortals celebrating game-defining kings',
    Icon: Award 
  },
  { 
    id: 'records', 
    title: 'Records', 
    chamber: 'CHAMBER III', 
    desc: 'The Monolith of athletic giants and permanent scores',
    Icon: BarChart3 
  },
  { 
    id: 'atlas', 
    title: 'Football Atlas', 
    chamber: 'CHAMBER IV', 
    desc: 'An artistic cartographic world tracking nations, stadiums, legends, and migration',
    Icon: Compass 
  },
  { 
    id: 'matches', 
    title: 'Historic Matches', 
    chamber: 'CHAMBER V', 
    desc: 'Widescreen Cinema Mode of the ultimate drama clashes',
    Icon: Film 
  },
  { 
    id: 'stadiums', 
    title: 'Stadiums', 
    chamber: 'CHAMBER VI', 
    desc: 'An architectural catalog of legendary football coliseums',
    Icon: Map 
  }
];

export function VaultNav({ 
  onExploreMatches, 
  onExploreNations,
  onExploreLegends,
  onExploreRecords,
  onExploreStadiums,
  onExploreAtlas
}: { 
  onExploreMatches?: () => void; 
  onExploreNations?: () => void; 
  onExploreLegends?: () => void; 
  onExploreRecords?: () => void; 
  onExploreStadiums?: () => void; 
  onExploreAtlas?: () => void;
}) {
  const handleArchiveClick = (archiveId: string) => {
    if (archiveId === 'matches' && onExploreMatches) {
      onExploreMatches();
    } else if (archiveId === 'nations' && onExploreNations) {
      onExploreNations();
    } else if (archiveId === 'atlas' && onExploreAtlas) {
      onExploreAtlas();
    } else if (archiveId === 'legends' && onExploreLegends) {
      onExploreLegends();
    } else if (archiveId === 'records' && onExploreRecords) {
      onExploreRecords();
    } else if (archiveId === 'stadiums' && onExploreStadiums) {
      onExploreStadiums();
    } else if (archiveId === 'tournaments') {
      const el = document.getElementById('history-start');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative py-36 bg-[#030303] px-6 border-t border-[#D4AF37]/15 overflow-hidden">
      {/* Delicate linear blueprint accent background */}
      <div className="absolute inset-0 opacity-[0.012] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heavy Neoclassical Chambers entries */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {archives.map((archive, idx) => (
            <motion.div
              key={archive.title}
              className="group relative cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: idx * 0.08 }}
              onClick={() => handleArchiveClick(archive.id)}
            >
              {/* Massive Outer Vault heavy frame border */}
              <div className="museum-card min-h-[290px] relative p-10 flex flex-col justify-between group-hover:shadow-[0_0_30px_rgba(212,175,55,0.06)] overflow-hidden">
                
                {/* Internal warm glow on hover */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.04),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                
                <div className="space-y-4 relative z-10">
                  {/* Chamber Code Header */}
                  <div className="flex justify-between items-center pb-4 border-b border-vault-gold-1/10">
                    <span className="museum-level-5 text-vault-gold-1">{archive.chamber}</span>
                    
                    {/* Metal rivet circles mimicking heavy gates */}
                    <div className="flex gap-1.5 opacity-40">
                      <div className="w-1.5 h-1.5 rounded-full bg-vault-gold-1" />
                      <div className="w-1.5 h-1.5 rounded-full bg-vault-gold-1" />
                    </div>
                  </div>
                  
                  {/* Archive icon block */}
                  <div className="w-12 h-12 rounded-full border border-vault-gold-1/15 flex items-center justify-center bg-black/40 text-vault-muted-1 group-hover:text-vault-gold-1 group-hover:border-vault-gold-1/45 transition-colors duration-500">
                    <archive.Icon size={18} strokeWidth={1.5} />
                  </div>

                  {/* Title and descriptions */}
                  <div>
                    <h3 className="museum-level-3 group-hover:text-vault-gold-1 transition-colors duration-500 uppercase mb-2">
                      {archive.title}
                    </h3>
                    <p className="museum-level-4 text-xs font-light">
                      {archive.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-vault-gold-1/5 flex justify-between items-center relative z-10">
                  <span className="museum-level-5 text-vault-gold-1/40 group-hover:text-vault-gold-1 transition-colors duration-500">UNLATCH PORTAL</span>
                  <div className="w-4 h-4 text-vault-gold-1/35 group-hover:translate-x-1.5 group-hover:text-vault-gold-1 transition-all duration-500">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </div>
                </div>

                {/* Neoclassical Heavy Corner Accent Framing L-Plates */}
                {/* Top-Left */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-vault-gold-1/25 group-hover:border-vault-gold-1 transition-colors duration-500" />
                {/* Top-Right */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-vault-gold-1/25 group-hover:border-vault-gold-1 transition-colors duration-500" />
                {/* Bottom-Left */}
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-vault-gold-1/25 group-hover:border-vault-gold-1 transition-colors duration-500" />
                {/* Bottom-Right */}
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-vault-gold-1/25 group-hover:border-vault-gold-1 transition-colors duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
