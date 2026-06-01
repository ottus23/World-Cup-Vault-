import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useState, useEffect } from 'react';

const eras = [
  { id: 'era-vintage', label: 'Vintage', year: '1930' },
  { id: 'era-golden', label: 'Golden', year: '1954' },
  { id: 'era-broadcast', label: 'Broadcast', year: '1982' },
  { id: 'era-modern', label: 'Modern', year: '2010' },
];

export function EraNav() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show the nav only after scrolling past the hero section (approx 80vh)
    if (latest > (typeof window !== 'undefined' ? window.innerHeight * 0.8 : 800)) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const scrollToEra = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-[#090909]/90 backdrop-blur-xl border border-[#4E5661]/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] px-2 py-2 rounded-full overflow-hidden"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50, scale: isVisible ? 1 : 0.9 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <ul className="flex items-center gap-1 md:gap-2 m-0 p-0 list-none">
        {eras.map((era) => (
          <li key={era.id}>
            <button
              onClick={() => scrollToEra(era.id)}
              className="px-4 md:px-5 py-2 hover:bg-[#D4AF37]/10 rounded-full transition-colors flex items-center gap-2 group cursor-pointer"
            >
              <span className="font-serif text-[#D4AF37] text-xs md:text-sm group-hover:text-[#F5F2EA] transition-colors">{era.year}</span>
              <span className="font-sans text-[#DDD7C8] text-[10px] md:text-xs tracking-[0.2em] uppercase hidden md:inline group-hover:text-[#F5F2EA] transition-colors">
                {era.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
