import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Chronicle } from './components/Chronicle';
import { RecordsVault } from './components/Records';
import { LegendsVault } from './components/Legends';
import { VaultNav } from './components/VaultNav';
import { EraNav } from './components/EraNav';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (entered) {
      window.scrollTo(0, 0);
    }
  }, [entered]);

  return (
    <div className="bg-[#090909] min-h-screen text-[#F5F2EA] font-sans selection:bg-[#D4AF37] selection:text-[#090909]">
      <motion.div
        className="fixed inset-0 z-[100] pointer-events-none mix-blend-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 0.12 : 0 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <AnimatePresence>
        {!entered && (
          <motion.div 
            className="fixed inset-0 z-50"
            exit={{ opacity: 0, transition: { duration: 1, delay: 0.5 } }}
          >
            <Hero onEnter={() => setEntered(true)} entered={entered} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="w-full relative"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: entered ? 1 : 0, y: entered ? 0 : 100 }}
        transition={{ duration: 1.5, delay: entered ? 1 : 0, ease: 'easeOut' }}
        style={{ pointerEvents: entered ? 'auto' : 'none' }}
      >
        <EraNav />
        <Chronicle />
        <RecordsVault />
        <LegendsVault />
        <VaultNav />
        
        <footer className="bg-[#090909] text-center py-12 border-t border-[#4E5661]/20">
          <p className="font-serif text-[#69707A] text-sm tracking-widest uppercase">
            © {new Date().getFullYear()} World Cup Vault
          </p>
        </footer>
      </motion.div>
    </div>
  );
}

