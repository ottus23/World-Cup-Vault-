import { motion } from 'motion/react';
import { legends } from '../data';

export function Legends() {
  return (
    <section className="relative py-48 bg-[#090909] px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-32">
          <motion.h2 
            className="font-serif text-5xl md:text-7xl text-[#F5F2EA] mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            The Icons
          </motion.h2>
          <motion.p 
            className="font-sans text-[#D4AF37] tracking-[0.2em] uppercase text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Immortals of the Beautiful Game
          </motion.p>
        </div>

        <div className="flex flex-col gap-32">
          {legends.map((legend, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.div 
                key={legend.name}
                className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1 }}
              >
                <div className="w-full md:w-1/2 relative group">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={legend.image} 
                      alt={legend.name} 
                      className="w-full h-full object-cover filter sepia-[0.3] grayscale-[0.8] contrast-125 group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                    />
                  </div>
                  {/* Decorative Frame */}
                  <div className="absolute -inset-4 border border-[#4E5661]/20 scale-[0.98] group-hover:scale-100 transition-transform duration-1000 pointer-events-none"></div>
                </div>

                <div className={`w-full md:w-1/2 flex flex-col ${isLeft ? 'items-start text-left' : 'items-end text-right'}`}>
                  <p className="font-sans text-[#D4AF37] tracking-[0.2em] uppercase text-xs mb-4">{legend.nation} • {legend.era}</p>
                  <h3 className="font-serif text-[#F5F2EA] text-5xl md:text-7xl mb-6">{legend.name}</h3>
                  <p className="font-sans text-[#69707A] uppercase tracking-widest text-sm mb-12">{legend.achievements}</p>
                  
                  <blockquote className="relative">
                    <span className="absolute -top-8 -left-8 text-8xl font-serif text-[#4E5661]/20">"</span>
                    <p className="font-serif text-[#DDD7C8] text-xl md:text-2xl leading-relaxed italic relative z-10 max-w-lg">
                      {legend.quote}
                    </p>
                  </blockquote>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
