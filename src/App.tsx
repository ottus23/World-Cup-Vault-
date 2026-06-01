import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Chronicle, completeTournaments } from './components/Chronicle';
import { RecordsVault } from './components/Records';
import { LegendsVault } from './components/Legends';
import { VaultNav } from './components/VaultNav';
import { EraNav } from './components/EraNav';
import { HistoricMatchesVault } from './components/HistoricMatchesVault';
import { NationsVault } from './components/NationsVault';
import { FeaturedPreviews } from './components/FeaturedPreviews';
import { StadiumsShowcase } from './components/StadiumsShowcase';
import { TournamentArchive } from './components/TournamentArchive';
import { ArchiveNavSystem } from './components/ArchiveNavSystem';
import { TimeMachine } from './components/TimeMachine';
import { FootballAtlas } from './components/FootballAtlas';
import { motion, AnimatePresence } from 'motion/react';
import { ArchiveCommandCenter } from './components/ArchiveCommandCenter';
import { MediaAuthoritySystem } from './components/MediaAuthoritySystem';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [matchesVaultOpen, setMatchesVaultOpen] = useState(false);
  const [nationsVaultOpen, setNationsVaultOpen] = useState(false);
  const [footballAtlasOpen, setFootballAtlasOpen] = useState(false);
  const [legendsVaultOpen, setLegendsVaultOpen] = useState(false);
  const [recordsVaultOpen, setRecordsVaultOpen] = useState(false);
  const [stadiumsVaultOpen, setStadiumsVaultOpen] = useState(false);
  const [timeMachineOpen, setTimeMachineOpen] = useState(false);
  const [activeClassicMatchId, setActiveClassicMatchId] = useState<string | undefined>(undefined);

  // New deep link state parameters for cross-exhibition travel
  const [activeTournamentYear, setActiveTournamentYear] = useState<number | null>(null);
  const [initialLegendId, setInitialLegendId] = useState<string | undefined>(undefined);
  const [initialNationId, setInitialNationId] = useState<string | undefined>(undefined);
  const [initialStadiumId, setInitialStadiumId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (entered) {
      window.scrollTo(0, 0);
    }
  }, [entered]);

  // Reactive telemetry to feed explorations directly to the Command Center
  useEffect(() => {
    if (activeTournamentYear) {
      window.dispatchEvent(new CustomEvent('track-vault-explore', { 
        detail: { type: 'tournament', id: activeTournamentYear, label: `${activeTournamentYear} World Cup` } 
      }));
    }
  }, [activeTournamentYear]);

  useEffect(() => {
    if (activeClassicMatchId) {
      window.dispatchEvent(new CustomEvent('track-vault-explore', { 
        detail: { type: 'match', id: activeClassicMatchId, label: activeClassicMatchId === '2022-final' ? 'Argentina 3-3 France (2022)' : activeClassicMatchId } 
      }));
    }
  }, [activeClassicMatchId]);

  useEffect(() => {
    if (initialLegendId) {
      window.dispatchEvent(new CustomEvent('track-vault-explore', { 
        detail: { type: 'legend', id: initialLegendId, label: initialLegendId === 'pele' ? 'Pelé' : initialLegendId === 'maradona' ? 'Diego Maradona' : initialLegendId.toUpperCase() } 
      }));
    }
  }, [initialLegendId]);

  useEffect(() => {
    if (initialNationId) {
      window.dispatchEvent(new CustomEvent('track-vault-explore', { 
        detail: { type: 'nation', id: initialNationId, label: initialNationId === 'argentina' ? 'Argentina' : initialNationId === 'brazil' ? 'Brazil' : initialNationId.toUpperCase() } 
      }));
    }
  }, [initialNationId]);

  useEffect(() => {
    if (initialStadiumId) {
      window.dispatchEvent(new CustomEvent('track-vault-explore', { 
        detail: { type: 'stadium', id: initialStadiumId, label: initialStadiumId === 'maracana' ? 'Maracanã' : initialStadiumId === 'azteca' ? 'Estadio Azteca' : initialStadiumId.toUpperCase() } 
      }));
    }
  }, [initialStadiumId]);

  const handleExploreClassicMatch = (matchId: string) => {
    setActiveClassicMatchId(matchId);
    setMatchesVaultOpen(true);
  };

  const handleOpenMatchesFromNav = (matchId?: string) => {
    setActiveClassicMatchId(matchId);
    setMatchesVaultOpen(true);
  };

  const handleExploreLegend = (legendId?: string) => {
    setInitialLegendId(legendId);
    setLegendsVaultOpen(true);
  };

  const handleExploreNation = (nationId?: string) => {
    setInitialNationId(nationId);
    setNationsVaultOpen(true);
  };

  const handleExploreStadium = (stadiumId?: string) => {
    setInitialStadiumId(stadiumId);
    setStadiumsVaultOpen(true);
  };

  const handleExploreRecords = (recordId?: string) => {
    setRecordsVaultOpen(true);
  };

  const handleBeginJourney = () => {
    setTimeMachineOpen(true);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-[#F5F2EA] font-sans selection:bg-[#D4AF37] selection:text-[#090909]">
      <div
        className="fixed inset-0 z-[100] pointer-events-none mix-blend-overlay opacity-12"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* GLOBAL PERSISTENT ARCHIVE CATALOG NAVIGATION */}
      <ArchiveNavSystem 
        onExploreMatches={handleOpenMatchesFromNav}
        onExploreNations={handleExploreNation}
        onExploreLegends={handleExploreLegend}
        onExploreRecords={handleExploreRecords}
        onExploreStadiums={handleExploreStadium}
        onExploreTournament={setActiveTournamentYear}
        onExploreHistory={handleBeginJourney}
        onExploreAtlas={() => setFootballAtlasOpen(true)}
      />

      {/* SECTION 1 — HERO */}
      <Hero onBegin={handleBeginJourney} />

      {/* NEW STORYTELLING STREAMLINED HOMEPAGE */}
      <div className="w-full relative">
        {/* SECTION 2 — THE HISTORY OF THE FIFA WORLD CUP */}
        <div className="w-full flex justify-center py-24 bg-vault-bg-1 relative z-10 border-t border-vault-gold-1/10">
           <div className="max-w-7xl mx-auto px-6 text-center">
             <div className="museum-chapter-number text-vault-gold-1 mb-6">01</div>
             <h2 className="museum-level-2 uppercase">The Chronicle</h2>
             <p className="museum-level-4 mt-6 max-w-2xl mx-auto italic text-vault-muted-1">
               Trace the cinematic evolution of the grandest stage in the beautiful game, from the vintage steamship era of 1930 to the pan-continental expansion of 2026.
             </p>
           </div>
        </div>
        <Chronicle 
          onExploreClassicMatch={handleExploreClassicMatch} 
          onExploreTournament={setActiveTournamentYear} 
        />
        
        {/* SECTION 3 — EXPLORE THE VAULT */}
        <div className="w-full flex justify-center py-32 bg-vault-bg-2 relative z-10 border-t border-white/5">
           <div className="max-w-7xl mx-auto px-6 text-center">
             <div className="museum-chapter-number text-vault-gold-1 mb-6">02</div>
             <h2 className="museum-level-2 uppercase">The Curated Archives</h2>
             <p className="museum-level-4 mt-6 max-w-2xl mx-auto italic text-vault-muted-1">
               Immerse yourself within five dedicated thematic exhibitions housing the deepest records and tactical relics.
             </p>
           </div>
        </div>
        <VaultNav 
          onExploreMatches={handleOpenMatchesFromNav} 
          onExploreNations={handleExploreNation}
          onExploreLegends={handleExploreLegend}
          onExploreRecords={handleExploreRecords}
          onExploreStadiums={handleExploreStadium}
          onExploreAtlas={() => setFootballAtlasOpen(true)}
        />
        
        {/* SECTION 4 — FOOTER */}
        <footer className="relative bg-vault-bg-1 py-24 px-6 border-t border-vault-gold-1/10 flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          
          <div className="mb-6 opacity-30 text-vault-gold-1 animate-pulse">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
            </svg>
          </div>
          
          <h2 className="museum-level-5 mb-4 leading-none select-none">WORLD CUP VAULT</h2>
          
          <div className="museum-divider" />
          
          <p className="museum-level-4 text-xs italic max-w-sm mt-8 mb-8 leading-relaxed opacity-75">
            "Immortalizing the triumphs, structural landmarks, and cinematic titans that shaped the grandest stage of the beautiful game."
          </p>
          
          <p className="museum-level-5">
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
              onExploreMatches={handleExploreClassicMatch}
              onExploreNations={handleExploreNation}
              onExploreLegends={handleExploreLegend}
              onExploreStadiums={handleExploreStadium}
              onExploreTournament={setActiveTournamentYear}
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
              onClose={() => {
                setNationsVaultOpen(false);
                setInitialNationId(undefined);
              }}
              initialNationId={initialNationId}
              onExploreMatches={handleExploreClassicMatch}
              onExploreNations={handleExploreNation}
              onExploreLegends={handleExploreLegend}
              onExploreStadiums={handleExploreStadium}
              onExploreTournament={setActiveTournamentYear}
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
              onClose={() => {
                setLegendsVaultOpen(false);
                setInitialLegendId(undefined);
              }}
              initialLegendId={initialLegendId}
              onExploreMatches={handleExploreClassicMatch}
              onExploreNations={handleExploreNation}
              onExploreLegends={handleExploreLegend}
              onExploreStadiums={handleExploreStadium}
              onExploreTournament={setActiveTournamentYear}
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
          <motion.div 
            className="fixed inset-0 z-[500] bg-[#050505] overflow-y-auto"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          >
            <StadiumsShowcase 
              onClose={() => {
                setStadiumsVaultOpen(false);
                setInitialStadiumId(undefined);
              }}
              initialStadiumId={initialStadiumId}
              onExploreMatches={handleExploreClassicMatch}
              onExploreNations={handleExploreNation}
              onExploreLegends={handleExploreLegend}
              onExploreStadiums={handleExploreStadium}
              onExploreTournament={setActiveTournamentYear}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Center-Scale Drawer for global Tournament Archives */}
      <AnimatePresence>
        {activeTournamentYear && (
          <TournamentArchive 
            tournament={completeTournaments.find(t => t.year === activeTournamentYear)!} 
            onClose={() => setActiveTournamentYear(null)} 
            onExploreClassicMatch={handleExploreClassicMatch} 
            onExploreLegend={handleExploreLegend}
            onExploreNation={handleExploreNation}
            onExploreStadium={handleExploreStadium}
            onExploreTournament={setActiveTournamentYear}
          />
        )}
      </AnimatePresence>

      {/* THE WORLD CUP TIME MACHINE SIGNATURE IMMERSIVE EXPERIENCE */}
      <AnimatePresence>
        {timeMachineOpen && (
          <motion.div
            className="fixed inset-0 z-[600]"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          >
            <TimeMachine 
              onClose={() => setTimeMachineOpen(false)}
              onExploreClassicMatch={handleExploreClassicMatch}
              onExploreLegend={handleExploreLegend}
              onExploreNation={handleExploreNation}
              onExploreStadium={handleExploreStadium}
              onExploreRecords={handleExploreRecords}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE WORLD CUP FOOTBALL ATLAS EXPERIENCE */}
      <AnimatePresence>
        {footballAtlasOpen && (
          <motion.div
            className="fixed inset-0 z-[500] bg-[#0c0d10] overflow-hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          >
            <FootballAtlas 
              onClose={() => setFootballAtlasOpen(false)}
              onExploreClassicMatch={handleExploreClassicMatch}
              onExploreLegend={handleExploreLegend}
              onExploreNation={handleExploreNation}
              onExploreStadium={handleExploreStadium}
              onExploreTournament={setActiveTournamentYear}
              onExploreHistory={() => {
                setFootballAtlasOpen(false);
                setTimeMachineOpen(true);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* GLOBAL PERSISTENT ARCHIVE COMMAND CENTER */}
      <ArchiveCommandCenter 
        onExploreMatches={handleOpenMatchesFromNav}
        onExploreNations={handleExploreNation}
        onExploreLegends={handleExploreLegend}
        onExploreRecords={handleExploreRecords}
        onExploreStadiums={handleExploreStadium}
        onExploreTournament={setActiveTournamentYear}
        onExploreHistory={handleBeginJourney}
        onExploreAtlas={() => setFootballAtlasOpen(true)}
      />

      {/* OFFICIAL MEDIA INTEGRITY & SECURITY SYSTEM */}
      <MediaAuthoritySystem />
    </div>
  );
}

