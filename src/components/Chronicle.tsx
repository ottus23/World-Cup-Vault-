import { motion } from 'motion/react';
import { Fragment } from 'react';
import { tournaments, moments } from '../data';
import { Moments } from './Moments';

export function Chronicle() {
  return (
    <section className="relative w-full bg-[#090909] py-32 px-6 md:px-12 lg:px-24">
      {/* Central Timeline Line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#4E5661]/50 to-transparent -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col gap-48">
        {tournaments.map((tournament, idx) => {
          const isLeft = idx % 2 === 0;
          
          // Inject a moment every 4 tournaments just to break rhythm as requested
          const insertedMoment = idx > 0 && idx % 4 === 0 ? moments[(idx / 4) - 1] : null;

          return (
            <Fragment key={tournament.year}>
              {insertedMoment && (
                <div className="my-32 w-full">
                  <Moments moment={insertedMoment} />
                </div>
              )}

              <motion.div 
                className={`relative flex flex-col md:flex-row ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-24`}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                {/* Year Marker */}
                <div className="absolute left-0 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-[calc(50%+4px)] md:-translate-x-1/2 w-4 h-4 bg-[#090909] border border-[#D4AF37] rounded-full z-10 flex items-center justify-center">
                   <div className="w-1 h-1 bg-[#D4AF37] rounded-full"></div>
                </div>
                
                {/* Image Side */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <div className="relative aspect-[4/3] md:aspect-[3/4] overflow-hidden group">
                    <img 
                      src={tournament.image} 
                      alt={`${tournament.year} World Cup in ${tournament.host}`} 
                      className="w-full h-full object-cover filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-80" />
                  </div>
                </div>
                
                {/* Content Side */}
                <div className={`w-full md:w-1/2 flex flex-col pl-12 md:pl-0 ${isLeft ? 'md:items-start md:text-left' : 'md:items-end md:text-right'} justify-center`}>
                  <h2 className="font-serif text-[#D4AF37] text-6xl lg:text-8xl mb-2">{tournament.year}</h2>
                  <h3 className="font-sans text-[#DDD7C8] text-xl lg:text-2xl uppercase tracking-widest mb-8 opacity-80">{tournament.host}</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="font-sans text-xs tracking-widest text-[#69707A] uppercase mb-1">Champion</p>
                      <p className="font-serif text-[#F5F2EA] text-2xl md:text-3xl">{tournament.champion}</p>
                    </div>
                    <div>
                      <p className="font-sans text-xs tracking-widest text-[#69707A] uppercase mb-1">Runner Up</p>
                      <p className="font-serif text-[#DDD7C8] text-xl md:text-2xl opacity-80">{tournament.runnerUp}</p>
                    </div>
                    <div className="pt-6 border-t border-[#4E5661]/30">
                      <p className="font-sans text-xs tracking-widest text-[#69707A] uppercase mb-2">Historic Moment</p>
                      <p className="font-serif text-[#F5F2EA] text-lg italic">{tournament.historicMoment}</p>
                    </div>
                    <div>
                        <p className="font-sans text-xs tracking-widest text-[#D4AF37] uppercase mb-1 mt-4">Key Player</p>
                        <p className="font-serif text-[#F5F2EA] text-xl">{tournament.keyPlayer}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
