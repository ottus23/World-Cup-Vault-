import { motion } from 'motion/react';
import { ArrowRight, Trophy, Award, Flame } from 'lucide-react';

interface PreviewsProps {
  onExploreLegends: () => void;
  onExploreRecords: () => void;
  onExploreMatches: () => void;
}

export function FeaturedPreviews({
  onExploreLegends,
  onExploreRecords,
  onExploreMatches
}: PreviewsProps) {
  return (
    <section className="relative bg-[#090909] py-32 px-6 md:px-12 border-t border-[#4E5661]/15 overflow-hidden">
      {/* Decorative background vectors representing a classical blueprints matrix */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.p
            className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-xs mb-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Curated Exhibits
          </motion.p>
          <motion.h2
            className="font-serif text-3xl md:text-5xl text-[#F5F2EA] tracking-wide mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            The Vault Galleries
          </motion.h2>
          <motion.div
            className="h-px w-20 bg-[#D4AF37] mx-auto opacity-40 mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <motion.p
            className="font-serif text-[#69707A] text-lg max-w-xl mx-auto italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Explore three specialized archives built to immortalize the game’s greatest titans, numbers, and cinematic drama.
          </motion.p>
        </div>

        {/* Previews Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          
          {/* Card 1: Legends Vault */}
          <motion.div
            className="group relative flex flex-col justify-between border border-[#4E5661]/20 bg-[#111111] p-10 h-[500px] hover:border-[#D4AF37] transition-all duration-700 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* Visual ambient light flare on hover */}
            <div className="absolute inset-x-0 -top-40 h-[250px] bg-[#D4AF37]/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            
            <div>
              <div className="flex justify-between items-start mb-12">
                <div className="p-3 bg-[#090909] border border-[#4E5661]/35 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37] transition-colors duration-500">
                  <Award size={24} strokeWidth={1.5} />
                </div>
                <span className="font-mono text-xs text-[#69707A] font-bold group-hover:text-[#D4AF37] transition-colors duration-500">EXHIBIT A</span>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-3xl text-[#F5F2EA] tracking-wide group-hover:text-[#D4AF37] transition-colors duration-500">
                  Legends Vault
                </h3>
                <p className="font-sans text-[#69707A] tracking-[0.2em] uppercase text-[10px] pb-3 border-b border-[#4E5661]/15">
                  Hall of Immortals
                </p>
                <p className="font-serif text-[#DDD7C8]/80 text-base leading-relaxed italic pt-2">
                  "Some players won trophies. Others defined history."
                </p>
                <p className="font-sans text-[#69707A] text-sm leading-relaxed pt-2">
                  Step inside interactive chambers commemorating monarchs like Pelé, Maradona, and Messi. Experience duel legacy comparison modes and journey timeline breakdowns.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onExploreLegends}
                className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase text-[#D4AF37] group-hover:text-[#F5F2EA] border-b border-[#D4AF37]/20 pb-1.5 hover:border-[#F5F2EA] transition-all duration-500 group/btn cursor-pointer w-fit"
              >
                Enter Legends Hall
                <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform duration-500" />
              </button>
            </div>

            {/* Corner border accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#69707A] group-hover:border-[#D4AF37] transition-colors duration-500" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#69707A] group-hover:border-[#D4AF37] transition-colors duration-500" />
          </motion.div>

          {/* Card 2: Records Vault */}
          <motion.div
            className="group relative flex flex-col justify-between border border-[#4E5661]/20 bg-[#111111] p-10 h-[500px] hover:border-[#D4AF37] transition-all duration-700 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-x-0 -top-40 h-[250px] bg-[#D4AF37]/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <div>
              <div className="flex justify-between items-start mb-12">
                <div className="p-3 bg-[#090909] border border-[#4E5661]/35 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37] transition-colors duration-500">
                  <Trophy size={24} strokeWidth={1.5} />
                </div>
                <span className="font-mono text-xs text-[#69707A] font-bold group-hover:text-[#D4AF37] transition-colors duration-500">EXHIBIT B</span>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-3xl text-[#F5F2EA] tracking-wide group-hover:text-[#D4AF37] transition-colors duration-500">
                  Records Vault
                </h3>
                <p className="font-sans text-[#69707A] tracking-[0.2em] uppercase text-[10px] pb-3 border-b border-[#4E5661]/15">
                  Monoliths of Glory
                </p>
                <p className="font-serif text-[#DDD7C8]/80 text-base leading-relaxed italic pt-2">
                  "Numbers fade. Records become permanent monuments."
                </p>
                <p className="font-sans text-[#69707A] text-sm leading-relaxed pt-2">
                  Browse the absolute peaks of athletic limits. From Fontaine's 13-goal blitz to Messi's 26 tournament games, explore historical record evolution pathways.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onExploreRecords}
                className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase text-[#D4AF37] group-hover:text-[#F5F2EA] border-b border-[#D4AF37]/20 pb-1.5 hover:border-[#F5F2EA] transition-all duration-500 group/btn cursor-pointer w-fit"
              >
                Reveal Records Hall
                <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform duration-500" />
              </button>
            </div>

            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#69707A] group-hover:border-[#D4AF37] transition-colors duration-500" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#69707A] group-hover:border-[#D4AF37] transition-colors duration-500" />
          </motion.div>

          {/* Card 3: Greatest Matches */}
          <motion.div
            className="group relative flex flex-col justify-between border border-[#4E5661]/20 bg-[#111111] p-10 h-[500px] hover:border-[#D4AF37] transition-all duration-700 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="absolute inset-x-0 -top-40 h-[250px] bg-[#D4AF37]/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <div>
              <div className="flex justify-between items-start mb-12">
                <div className="p-3 bg-[#090909] border border-[#4E5661]/35 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37] transition-colors duration-500">
                  <Flame size={24} strokeWidth={1.5} />
                </div>
                <span className="font-mono text-xs text-[#69707A] font-bold group-hover:text-[#D4AF37] transition-colors duration-500">EXHIBIT C</span>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-3xl text-[#F5F2EA] tracking-wide group-hover:text-[#D4AF37] transition-colors duration-500">
                  Greatest Matches
                </h3>
                <p className="font-sans text-[#69707A] tracking-[0.2em] uppercase text-[10px] pb-3 border-b border-[#4E5661]/15">
                  Cinema of Clashes
                </p>
                <p className="font-serif text-[#DDD7C8]/80 text-base leading-relaxed italic pt-2">
                  "Some matches decide champions. Others define generations."
                </p>
                <p className="font-sans text-[#69707A] text-sm leading-relaxed pt-2">
                  Relive iconic games in true widescreen Cinema Mode with active tactical boards, historical momentum wave charts, retro radio commentaries, and character maps.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onExploreMatches}
                className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase text-[#D4AF37] group-hover:text-[#F5F2EA] border-b border-[#D4AF37]/20 pb-1.5 hover:border-[#F5F2EA] transition-all duration-500 group/btn cursor-pointer w-fit"
              >
                Step Into Match Cinema
                <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform duration-500" />
              </button>
            </div>

            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#69707A] group-hover:border-[#D4AF37] transition-colors duration-500" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#69707A] group-hover:border-[#D4AF37] transition-colors duration-500" />
          </motion.div>

        </div>
        
      </div>
    </section>
  );
}
