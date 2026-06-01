import { motion } from 'motion/react';
import { useRef } from 'react';
import { recordHalls, RecordMonolith } from '../data';

function Monolith({ record, idx }: { record: RecordMonolith; idx: number }) {
  return (
    <motion.div 
      className="relative flex flex-col md:flex-row items-center border border-[#4E5661]/20 bg-[#090909] group overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, delay: idx * 0.1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      {/* Big Number Section */}
      <div className="w-full md:w-5/12 flex items-center justify-center p-12 lg:p-24 border-b md:border-b-0 md:border-r border-[#4E5661]/20 relative">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1.5\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')] mix-blend-overlay"></div>
        <motion.p 
          className="font-serif text-[6rem] sm:text-[8rem] lg:text-[12rem] text-[#D4AF37] leading-none tracking-tighter mix-blend-screen opacity-90 drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]"
        >
          {record.value}
        </motion.p>
      </div>
      
      {/* Information Section */}
      <div className="w-full md:w-7/12 p-8 lg:p-16 flex flex-col justify-center relative z-10 w-full overflow-hidden">
         <p className="font-sans text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-4">{record.nation} • {record.year}</p>
         <h3 className="font-serif text-[#F5F2EA] text-4xl lg:text-5xl mb-2 leading-tight">{record.title}</h3>
         <h4 className="font-sans text-[#DDD7C8] text-lg uppercase tracking-widest mb-8 opacity-80">{record.holder}</h4>
         
         <p className="font-serif text-[#69707A] text-xl leading-relaxed italic mb-8 max-w-lg">
           "{record.story}"
         </p>

         {record.evolution && (
           <div className="pt-8 border-t border-[#4E5661]/30">
              <p className="font-sans text-[#D4AF37] text-[10px] uppercase tracking-widest mb-6 border border-[#D4AF37]/30 inline-block px-3 py-1">Record Evolution</p>
              <div className="flex flex-col gap-4 relative">
                <div className="absolute left-[3px] top-2 bottom-2 w-px bg-[#4E5661]/30"></div>
                {record.evolution.map((ev, eIdx) => (
                  <div key={eIdx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 relative group/ev">
                    <div className="hidden sm:block w-[7px] h-[7px] rounded-full bg-[#4E5661] group-hover/ev:bg-[#D4AF37] transition-colors z-10"></div>
                    <div className="sm:hidden absolute -left-[7px] top-[14px] w-[7px] h-[7px] rounded-full bg-[#4E5661] group-hover/ev:bg-[#D4AF37] transition-colors z-10"></div>
                    <div className="flex items-baseline gap-4 ml-4 sm:ml-0">
                      <span className="font-sans text-[#D4AF37] text-xs tracking-widest w-12 sm:w-auto">{ev.year}</span>
                      <span className="font-serif text-[#F5F2EA] text-xl opacity-90">{ev.value}</span>
                      <span className="font-sans text-[#69707A] text-xs uppercase tracking-widest truncate">{ev.holder}</span>
                    </div>
                  </div>
                ))}
              </div>
           </div>
         )}
      </div>
    </motion.div>
  );
}

export function RecordsVault() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={containerRef} className="relative w-full bg-[#111111] pb-48 pt-32 border-y border-[#4E5661]/20 overflow-hidden">
      
      {/* Entry Statement */}
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative mb-24">
        {/* Giant architectural background typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
           <span className="font-serif text-[20vw] text-[#F5F2EA] whitespace-nowrap leading-none mix-blend-overlay font-bold">MONUMENTS</span>
        </div>
        
        <motion.p 
          className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-sm mb-12 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Records Vault
        </motion.p>
        
        <motion.h2 
           className="font-serif text-[#F5F2EA] text-4xl md:text-6xl lg:text-8xl leading-tight max-w-4xl mx-auto italic opacity-90 relative z-10"
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.2 }}
        >
          "Numbers fade. Records become history."
        </motion.h2>
      </div>

      {/* Halls */}
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        {recordHalls.map((hall, hIdx) => (
          <div key={hall.id} className="mb-48 relative">
            
            {/* Hall Title Marker */}
            <motion.div 
               className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#4E5661]/30 pb-8"
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1 }}
            >
               <div className="relative z-10">
                  <h3 className="font-serif text-[#F5F2EA] text-5xl md:text-7xl mb-4">{hall.title}</h3>
                  <p className="font-sans text-[#D4AF37] uppercase tracking-widest text-sm md:text-base">{hall.description}</p>
               </div>
               <div className="font-serif text-[#4E5661] text-7xl md:text-9xl leading-none opacity-20 relative top-6">
                  0{hIdx + 1}
               </div>
            </motion.div>

            {/* Monoliths Grid */}
            <div className="flex flex-col gap-12 lg:gap-24 relative z-20">
              {hall.records.map((record, rIdx) => (
                <Monolith key={record.title} record={record} idx={rIdx} />
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
