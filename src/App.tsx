import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Chronicle } from './components/Chronicle';
import { RecordsVault } from './components/Records';
import { LegendsVault } from './components/Legends';
import { VaultNav } from './components/VaultNav';
import { EraNav } from './components/EraNav';
import { HistoricMatchesVault } from './components/HistoricMatchesVault';
import { NationsVault } from './components/NationsVault';
import { FeaturedPreviews } from './components/FeaturedPreviews';
import { StadiumsShowcase } from './components/StadiumsShowcase';
import { motion, AnimatePresence } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [matchesVaultOpen, setMatchesVaultOpen] = useState(false);
  const [nationsVaultOpen, setNationsVaultOpen] = useState(false);
  const [legendsVaultOpen, setLegendsVaultOpen] = useState(false);
  const [recordsVaultOpen, setRecordsVaultOpen] = useState(false);
  const [stadiumsVaultOpen, setStadiumsVaultOpen] = useState(false);
  const [activeClassicMatchId, setActiveClassicMatchId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (entered) {
      window.scrollTo(0, 0);
    }
  }, [entered]);

  const handleExploreClassicMatch = (matchId: string) => {
    setActiveClassicMatchId(matchId);
    setMatchesVaultOpen(true);
  };

  const handleOpenMatchesFromNav = () => {
    setActiveClassicMatchId(undefined);
    setMatchesVaultOpen(true);
  };

  const handleBeginJourney = () => {
    const el = document.getElementById('history-start');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-[#F5F2EA] font-sans selection:bg-[#D4AF37] selection:text-[#090909]">
      <div
        className="fixed inset-0 z-[100] pointer-events-none mix-blend-overlay opacity-12"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* SECTION 1 — HERO */}
      <Hero onBegin={handleBeginJourney} />

      {/* NEW STORYTELLING STREAMLINED HOMEPAGE */}
      <div className="w-full relative">
        {/* SECTION 2 — THE HISTORY OF THE FIFA WORLD CUP */}
        <Chronicle onExploreClassicMatch={handleExploreClassicMatch} />
        
        {/* SECTION 3 — EXPLORE THE VAULT */}
        <VaultNav 
          onExploreMatches={handleOpenMatchesFromNav} 
          onExploreNations={() => setNationsVaultOpen(true)}
          onExploreLegends={() => setLegendsVaultOpen(true)}
          onExploreRecords={() => setRecordsVaultOpen(true)}
          onExploreStadiums={() => setStadiumsVaultOpen(true)}
        />
        
        {/* SECTION 4 — FOOTER */}
        <footer className="relative bg-[#050505] py-24 px-6 border-t border-[#D4AF37]/10 flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          
          <div className="mb-6 opacity-30 text-[#D4AF37] animate-pulse">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
            </svg>
          </div>
          
          <h2 className="font-serif text-[#F5F2EA] text-sm tracking-[0.4em] uppercase mb-4 leading-none select-none">WORLD CUP VAULT</h2>
          
          <div className="h-[1px] w-16 bg-[#D4AF37]/35 my-4" />
          
          <p className="font-serif text-[#AFA58D] text-xs italic max-w-sm mb-8 leading-relaxed opacity-75">
            "Immortalizing the triumphs, structural landmarks, and cinematic titans that shaped the grandest stage of the beautiful game."
          </p>
          
          <p className="font-mono text-[#69707A] text-[9px] uppercase tracking-[0.25em]">
            © {new Date().getFullYear()} FIFA World Cup Vault • Pre-eminent Museum Exhibition
          </p>
        </footer>
      </div>

      {/* Cinematic Slide-in Overlay for Matches Vault Cinema Screen */}
      <AnimatePresence>
        {matchesVaultOpen && (
          <motion.div 
            className="fixed inset-0 z-[500] bg-[#090909] overflow-y-auto"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          >
            <HistoricMatchesVault 
              activeMatchId={activeClassicMatchId}
              onClose={() => {
                setMatchesVaultOpen(false);
                setActiveClassicMatchId(undefined);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Slide-in Overlay for Nations Vault Mappe-Monde */}
      <AnimatePresence>
        {nationsVaultOpen && (
          <motion.div 
            className="fixed inset-0 z-[500] bg-[#070707] overflow-y-auto"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          >
            <NationsVault 
              onClose={() => setNationsVaultOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Slide-in Overlay for Legends Vault Exhibit */}
      <AnimatePresence>
        {legendsVaultOpen && (
          <motion.div 
            className="fixed inset-0 z-[500] bg-[#090909] overflow-y-auto"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          >
            <LegendsVault 
              onClose={() => setLegendsVaultOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Slide-in Overlay for Records Vault Exhibit */}
      <AnimatePresence>
        {recordsVaultOpen && (
          <motion.div 
            className="fixed inset-0 z-[500] bg-[#111111] overflow-y-auto"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          >
            <RecordsVault 
              onClose={() => setRecordsVaultOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Slide-in Overlay for Stadiums Exhibit */}
      <AnimatePresence>
        {stadiumsVaultOpen && (
          <StadiumsShowcase 
            onClose={() => setStadiumsVaultOpen(false)}
          />
        )}
      </AnimatePresence>
      
      <Analytics />
    </div>
  );
}

