import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { records } from '../data';

export function Records() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative py-48 bg-[#111111] overflow-hidden border-y border-[#4E5661]/20">
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
        <span className="font-serif text-[30vw] text-[#F5F2EA] whitespace-nowrap leading-none tracking-tighter">
          RECORDS
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-32">
          <motion.h2 
            className="font-serif text-5xl md:text-7xl text-[#F5F2EA] mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Living Records
          </motion.h2>
          <motion.p 
            className="font-sans text-[#D4AF37] tracking-[0.2em] uppercase text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Engraved into History
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {records.map((record, idx) => (
            <motion.div 
              key={record.title}
              className="flex flex-col items-center text-center border-t border-[#4E5661]/30 pt-8"
              style={{ y: idx % 2 === 0 ? y : useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              <h3 className="font-sans text-xs tracking-widest text-[#69707A] uppercase mb-4">{record.title}</h3>
              <p className="font-serif text-5xl md:text-6xl text-[#D4AF37] mb-4">{record.value}</p>
              <p className="font-serif text-[#F5F2EA] text-xl opacity-90">{record.holder}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
