import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Compass, 
  Trophy, 
  Award, 
  Map as MapIcon, 
  Globe, 
  CalendarDays, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  ArrowUpRight, 
  Layers, 
  Info, 
  Database,
  Tv,
  Eye,
  History,
  Anchor,
  Wind
} from 'lucide-react';
import { tournaments, legends, Tournament, Legend } from '../data';
import { nationsData, NationCivilization } from '../nationsData';
import { stadiumsData, Stadium } from '../stadiumsData';

interface FootballAtlasProps {
  onClose: () => void;
  onExploreClassicMatch: (matchId: string) => void;
  onExploreLegend: (legendId?: string) => void;
  onExploreNation: (nationId?: string) => void;
  onExploreStadium: (stadiumId?: string) => void;
  onExploreTournament: (year: number) => void;
  onExploreHistory: () => void;
}

// Coordinate mappings for countries & venues to plot overlay nodes on our 1000x500 2D SVG
const COORDINATE_MAP: Record<string, { x: number; y: number; name: string; country: string }> = {
  uruguay: { x: 310, y: 435, name: 'Montevideo', country: 'Uruguay' },
  italy: { x: 508, y: 198, name: 'Rome', country: 'Italy' },
  france: { x: 480, y: 175, name: 'Paris', country: 'France' },
  brazil: { x: 345, y: 375, name: 'Rio de Janeiro', country: 'Brazil' },
  switzerland: { x: 494, y: 182, name: 'Bern', country: 'Switzerland' },
  sweden: { x: 512, y: 135, name: 'Stockholm', country: 'Sweden' },
  chile: { x: 275, y: 440, name: 'Santiago', country: 'Chile' },
  england: { x: 468, y: 158, name: 'London', country: 'England' },
  mexico: { x: 155, y: 245, name: 'Mexico City', country: 'Mexico' },
  germany: { x: 502, y: 168, name: 'Berlin', country: 'Germany' },
  argentina: { x: 295, y: 442, name: 'Buenos Aires', country: 'Argentina' },
  spain: { x: 450, y: 202, name: 'Madrid', country: 'Spain' },
  usa: { x: 135, y: 185, name: 'Pasadena', country: 'USA' },
  japan: { x: 818, y: 215, name: 'Tokyo', country: 'Japan' },
  south_korea: { x: 790, y: 210, name: 'Seoul', country: 'South Korea' },
  south_africa: { x: 535, y: 410, name: 'Johannesburg', country: 'South Africa' },
  russia: { x: 575, y: 145, name: 'Moscow', country: 'Russia' },
  qatar: { x: 605, y: 238, name: 'Doha', country: 'Qatar' },
  canada: { x: 180, y: 140, name: 'Toronto', country: 'Canada' },
  netherlands: { x: 488, y: 164, name: 'Amsterdam', country: 'Netherlands' },
  portugal: { x: 440, y: 206, name: 'Lisbon', country: 'Portugal' },
  hungary: { x: 518, y: 178, name: 'Budapest', country: 'Hungary' }
};

// Chronological migration path list representing where the tournament traveled
const MIGRATION_STOPS = [
  { year: 1930, country: 'Uruguay', key: 'uruguay', x: 310, y: 435, label: 'Montevideo \'30' },
  { year: 1934, country: 'Italy', key: 'italy', x: 508, y: 198, label: 'Rome \'34' },
  { year: 1938, country: 'France', key: 'france', x: 480, y: 175, label: 'Paris \'38' },
  { year: 1950, country: 'Brazil', key: 'brazil', x: 345, y: 375, label: 'Rio \'50' },
  { year: 1954, country: 'Switzerland', key: 'switzerland', x: 494, y: 182, label: 'Bern \'54' },
  { year: 1958, country: 'Sweden', key: 'sweden', x: 512, y: 135, label: 'Stockholm \'58' },
  { year: 1962, country: 'Chile', key: 'chile', x: 275, y: 440, label: 'Santiago \'62' },
  { year: 1966, country: 'England', key: 'england', x: 468, y: 158, label: 'London \'66' },
  { year: 1970, country: 'Mexico', key: 'mexico', x: 155, y: 245, label: 'Mexico City \'70' },
  { year: 1974, country: 'Germany', key: 'germany', x: 502, y: 168, label: 'Munich \'74' },
  { year: 1978, country: 'Argentina', key: 'argentina', x: 295, y: 442, label: 'Buenos Aires \'78' },
  { year: 1982, country: 'Spain', key: 'spain', x: 450, y: 202, label: 'Madrid \'82' },
  { year: 1986, country: 'Mexico', key: 'mexico', x: 155, y: 245, label: 'Azteca \'86' },
  { year: 1990, country: 'Italy', key: 'italy', x: 508, y: 198, label: 'Rome \'90' },
  { year: 1994, country: 'USA', key: 'usa', x: 135, y: 185, label: 'Pasadena \'94' },
  { year: 1998, country: 'France', key: 'france', x: 480, y: 175, label: 'Saint-Denis \'98' },
  { year: 2002, country: 'Japan/S.Korea', key: 'japan', x: 804, y: 212, label: 'Yokohama \'02' },
  { year: 2006, country: 'Germany', key: 'germany', x: 502, y: 168, label: 'Berlin \'06' },
  { year: 2010, country: 'South Africa', key: 'south_africa', x: 535, y: 410, label: 'Johannesburg \'10' },
  { year: 2014, country: 'Brazil', key: 'brazil', x: 345, y: 375, label: 'Maracanã \'14' },
  { year: 2018, country: 'Russia', key: 'russia', x: 575, y: 145, label: 'Moscow \'18' },
  { year: 2022, country: 'Qatar', key: 'qatar', x: 605, y: 238, label: 'Lusail \'22' },
  { year: 2026, country: 'USA/Can/Mex', key: 'canada', x: 160, y: 160, label: 'North America \'26' }
];

export function FootballAtlas({
  onClose,
  onExploreClassicMatch,
  onExploreLegend,
  onExploreNation,
  onExploreStadium,
  onExploreTournament,
  onExploreHistory
}: FootballAtlasProps) {
  // Opening state for slow cartographic reveal
  const [revealing, setRevealing] = useState(true);
  const [revealProgress, setRevealProgress] = useState(0);

  // Active perspective
  // 'hosts' | 'champions' | 'legends' | 'stadiums' | 'migration'
  const [activeMode, setActiveMode] = useState<'hosts' | 'champions' | 'legends' | 'stadiums' | 'migration'>('hosts');
  
  // Custom civilization layers toggles
  const [layersOpen, setLayersOpen] = useState(false);
  const [layerFilters, setLayerFilters] = useState({
    hosts: true,
    champions: true,
    legends: true,
    stadiums: true,
    matches: true
  });

  // Timeline slider state for historical evolution from 1930 to 2026
  const [currentTimelineYear, setCurrentTimelineYear] = useState<number>(2026);
  const YEARS_INDEX = [1930, 1934, 1938, 1950, 1954, 1958, 1962, 1966, 1970, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022, 2026];

  // Selected item dossier
  const [activeDossier, setActiveDossier] = useState<{
    type: 'nation' | 'stadium' | 'legend' | 'migration';
    title: string;
    subtitle: string;
    country: string;
    continent: string;
    yearEstablished?: number;
    details: string;
    stats: { label: string; value: string | number }[];
    bullets: string[];
    links: { label: string; action: () => void }[];
    metaId?: string;
  } | null>(null);

  // Migration playback state
  const [playbackActive, setPlaybackActive] = useState(false);
  const [migrationIndex, setMigrationIndex] = useState(0);

  // Sound generator
  const triggerAudioTick = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      // Audio context may be blocked initially
    }
  };

  const triggerAudioSwoosh = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, audioCtx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.45);
    } catch (e) {
      // Ignored
    }
  };

  // Entry animation
  useEffect(() => {
    let timer: any;
    let progressTimer: any;
    
    // Increment reveal text fake progress for aesthetic pleasure
    progressTimer = setInterval(() => {
      setRevealProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 4;
      });
    }, 80);

    timer = setTimeout(() => {
      setRevealing(false);
      triggerAudioSwoosh();
    }, 2400);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, []);

  // Playback timer for World Cup Migration timeline
  useEffect(() => {
    let playTimer: any;
    if (playbackActive && activeMode === 'migration') {
      playTimer = setInterval(() => {
        setMigrationIndex(prev => {
          const next = (prev + 1) % MIGRATION_STOPS.length;
          triggerAudioTick();
          handleSelectMigrationStop(next);
          return next;
        });
      }, 3500);
    } else {
      clearInterval(playTimer);
    }
    return () => clearInterval(playTimer);
  }, [playbackActive, activeMode]);

  // If perspective changes, clear dossier or load first preset stops
  useEffect(() => {
    if (activeMode === 'migration') {
      handleSelectMigrationStop(0);
      setMigrationIndex(0);
    } else {
      setActiveDossier(null);
      setPlaybackActive(false);
    }
    triggerAudioSwoosh();
  }, [activeMode]);

  // Core selector handlers
  const handleSelectNationNode = (nationId: string) => {
    triggerAudioTick();
    const cleanId = nationId.toLowerCase();
    const nat = nationsData.find(n => n.id === cleanId);
    if (!nat) return;

    const coords = COORDINATE_MAP[cleanId] || { x: 500, y: 250 };
    
    setActiveDossier({
      type: 'nation',
      title: `${nat.name} dynasty`,
      subtitle: nat.motto,
      country: nat.name,
      continent: nat.continent,
      details: nat.story,
      stats: [
        { label: 'TITLES (STARS ★)', value: nat.titlesCount },
        { label: 'WORLD CUP APPEARANCES', value: `${nat.appearancesCount} editions` },
        { label: 'SPIRIT ACCENT', value: nat.spirit },
        { label: 'DOMESTIC REGION', value: nat.continent }
      ],
      bullets: nat.legends.map(l => `${l.name} (${l.role}): ${l.myth.split('.')[0]}.`),
      links: [
        { label: 'Deep dive inside National Dynasties Room', action: () => onExploreNation(nat.id) },
        { label: 'Examine legendary matches logs', action: () => onExploreHistory() }
      ],
      metaId: nat.id
    });
  };

  const handleSelectStadiumNode = (stadiumId: string) => {
    triggerAudioTick();
    const stad = stadiumsData.find(s => s.id === stadiumId);
    if (!stad) return;

    setActiveDossier({
      type: 'stadium',
      title: stad.name,
      subtitle: stad.architecturalIdentity,
      country: stad.country,
      continent: stad.city,
      yearEstablished: stad.yearBuilt,
      details: stad.description,
      stats: [
        { label: 'ERECTION YEAR', value: stad.yearBuilt },
        { label: 'ORIGINAL CAPACITY', value: `${stad.capacity} observers` },
        { label: 'HISTORICAL WEIGHT', value: stad.historicalImportance.toUpperCase() },
        { label: 'SECTOR ATTENDANCE', value: stad.recordAttendance }
      ],
      bullets: stad.definingMoments.map(m => `[${m.year}] ${m.title}: ${m.description}`),
      links: [
        { label: 'Step inside Stadium Exhibition', action: () => onExploreStadium(stad.id) },
        { label: 'Examine local historic match logs', action: () => onExploreClassicMatch(stad.historicMatches[0]?.teams.includes('Uruguay') ? '1930-final' : '1950-uruguay-brazil') }
      ],
      metaId: stad.id
    });
  };

  const handleSelectLegendNode = (legendId: string) => {
    triggerAudioTick();
    const leg = legends.find(l => l.id === legendId);
    if (!leg) return;

    setActiveDossier({
      type: 'legend',
      title: leg.name,
      subtitle: leg.legacyStatement,
      country: leg.nation,
      continent: leg.era,
      details: leg.quote,
      stats: [
        { label: 'ASSOCIATED ERA', value: leg.era },
        { label: 'CROWN SHIELDS', value: leg.legacyNumber },
        { label: 'HERITAGE MARK', value: leg.legacyLabel },
        { label: 'PRIMARY COUNTRY', value: leg.nation }
      ],
      bullets: leg.hallOfAchievements,
      links: [
        { label: 'Step inside Legends Hall', action: () => onExploreLegend(leg.id) }
      ],
      metaId: leg.id
    });
  };

  // Migration stop select mapping
  const handleSelectMigrationStop = (index: number) => {
    const stop = MIGRATION_STOPS[index];
    const tour = tournaments.find(t => t.year === stop.year);
    if (!tour) return;

    setActiveDossier({
      type: 'migration',
      title: `${tour.year} • ${tour.host}`,
      subtitle: `Sovereign World Cup Year`,
      country: tour.host,
      continent: `Chamber Stop ${index + 1} of ${MIGRATION_STOPS.length}`,
      yearEstablished: tour.year,
      details: tour.story,
      stats: [
        { label: 'CHAMPION CROWNED', value: tour.champion },
        { label: 'RUNNER UP COMBATANT', value: tour.runnerUp },
        { label: 'FINAL COMBAT SCORE', value: tour.finalScore },
        { label: 'VINTAGE HIGHLIGHT', value: tour.historicMoment }
      ],
      bullets: [
        `Key Legendary Titan of Era: ${tour.keyPlayer}`,
        `Defining Moment recorded in archives: ${tour.historicMoment}`
      ],
      links: [
        { label: 'Unseal complete Year Archive', action: () => onExploreTournament(tour.year) },
        { label: 'Launch Immersive Time Machine', action: () => onExploreHistory() }
      ],
      metaId: String(tour.year)
    });
  };

  // Timeline slider handles
  const handleTimelineChange = (year: number) => {
    triggerAudioTick();
    setCurrentTimelineYear(year);
  };

  // Helper filters to see if entity is unlocked within timeline slider
  const isAvailableInYear = (itemYear: number) => {
    return itemYear <= currentTimelineYear;
  };

  // Filter nations and elements by active mode & layer toggle filters
  const visibleNations = nationsData.filter(n => {
    const coords = COORDINATE_MAP[n.id];
    if (!coords) return false;
    
    // Check timeline era filter
    const minJoined = n.id === 'uruguay' ? 1930 : n.id === 'italy' ? 1934 : n.id === 'france' ? 1938 : n.id === 'brazil' ? 1930 : n.id === 'germany' ? 1934 : n.id === 'argentina' ? 1930 : n.id === 'netherlands' ? 1934 : n.id === 'england' ? 1950 : 1930;
    if (minJoined > currentTimelineYear) return false;

    if (activeMode === 'hosts') {
      return MIGRATION_STOPS.slice(0, YEARS_INDEX.indexOf(currentTimelineYear) + 1).some(stop => stop.key === n.id);
    }
    if (activeMode === 'champions') {
      return n.titlesCount > 0 && tournaments.filter(t => t.year <= currentTimelineYear).some(t => t.champion.toLowerCase().includes(n.name.toLowerCase()));
    }
    
    // Default fallback layers
    return layerFilters.hosts || (layerFilters.champions && n.titlesCount > 0);
  });

  const visibleStadiums = stadiumsData.filter(s => {
    if (activeMode !== 'stadiums' && !layerFilters.stadiums) return false;
    return s.yearBuilt <= currentTimelineYear;
  });

  const visibleLegends = legends.filter(l => {
    if (activeMode !== 'legends' && !layerFilters.legends) return false;
    // Extract first active year
    const legYear = l.worldCupJourney[0];
    return legYear <= currentTimelineYear;
  });

  return (
    <div className="fixed inset-0 z-[530] bg-[#0c0d10] text-[#E5E1D8] flex flex-col overflow-hidden select-none font-sans">
      <div 
        className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-[0.22] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* VINTAGE CARTOGRAPHIC GRID BACKGROUND SCROLL */}
      <div className="absolute inset-0 z-0 bg-[#060607] opacity-80 pointer-events-none" />

      {/* SLOW CARTOGRAPHIC REVEAL DIAL OVERLAY */}
      <AnimatePresence>
        {revealing && (
          <motion.div 
            className="absolute inset-0 z-[600] bg-[#050505] flex flex-col justify-center items-center p-6 text-center select-none"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <div className="max-w-xl mx-auto relative px-8 py-16 border border-[#D4AF37]/20 bg-black/60 rounded">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
              <div className="absolute inset-0 bg-[#D4AF37]/[0.01] pointer-events-none" />
              
              <div className="mb-8 font-mono text-[#D4AF37] tracking-[0.4em] uppercase text-xs flex justify-center items-center gap-2">
                <Compass className="animate-spin text-[#D4AF37]" size={14} style={{ animationDuration: '6s' }} />
                <span>CHRONICLE ATLAS GEOGRAPHIA</span>
              </div>
              
              <h1 className="font-serif text-[#F5F2EA] text-4xl sm:text-5xl font-black mb-4 uppercase tracking-widest leading-none">
                FOOTBALL ATLAS
              </h1>
              
              <p className="font-serif italic text-[#AFA58D] text-sm md:text-base opacity-90 max-w-md mx-auto mb-12">
                "Every World Cup left its mark somewhere on Earth."
              </p>

              <div className="w-full h-[2px] bg-white/5 relative mb-2">
                <div 
                  className="absolute top-0 bottom-0 left-0 bg-[#D4AF37]/75 transition-all duration-75"
                  style={{ width: `${revealProgress}%` }}
                />
              </div>
              <p className="font-mono text-[8px] text-[#AFA58D]/60 uppercase tracking-widest">
                PREPARING EDITORIAL CARTOGRAPHY CARTES // {revealProgress}%
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER SECTION IN HARMONY WITH MUSEUM STYLE */}
      <div className="w-full bg-[#0d0d10] border-b border-[#D4AF37]/10 px-6 py-4.5 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 border border-[#D4AF37]/35 rounded-[3px] flex items-center justify-center text-[#D4AF37] bg-black/40">
            <Compass size={16} />
          </div>
          <div>
            <span className="font-mono text-[8.5px] text-[#AFA58D] tracking-[0.25em] uppercase font-bold block leading-none mb-1">MUSEUM SPECIAL EXHIBITION</span>
            <span className="font-serif text-[#F5F2EA] text-lg font-black uppercase tracking-wide leading-none">THE FOOTBALL ATLAS</span>
          </div>
        </div>

        {/* MID PERSPECTIVE MODES SWITCHERS */}
        <div className="hidden lg:flex items-center gap-1.5 bg-black/55 p-1 rounded border border-white/5">
          {[
            { id: 'hosts', label: 'Host Nations', icon: Trophy },
            { id: 'champions', label: 'Champions Map', icon: Globe },
            { id: 'legends', label: 'Legends Atlas', icon: Award },
            { id: 'stadiums', label: 'Stadium Atlas', icon: MapIcon },
            { id: 'migration', label: 'Tournament Migration', icon: CalendarDays }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setActiveMode(m.id as any)}
              className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wide rounded-[2px] flex items-center gap-2 border cursor-pointer transition-all ${
                activeMode === m.id 
                  ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]' 
                  : 'bg-transparent text-gray-400 hover:text-white border-transparent'
              }`}
            >
              <m.icon size={11} />
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* EXIT ACTION */}
        <button
          onClick={onClose}
          className="px-3 py-1.5 border border-white/10 hover:border-[#D4AF37]/30 text-xs font-mono rounded bg-black/30 hover:text-white transition-all flex items-center gap-1.5 uppercase cursor-pointer"
        >
          <X size={12} /> Close Museum Atlas
        </button>
      </div>

      {/* MOBILE PERSPECTIVE BAR */}
      <div className="lg:hidden w-full bg-[#0a0a0d] border-b border-white/5 overflow-x-auto py-2.5 px-4 flex gap-1.5 scrollbar-none z-10">
        {[
          { id: 'hosts', label: 'Hosts', icon: Trophy },
          { id: 'champions', label: 'Champions', icon: Globe },
          { id: 'legends', label: 'Legends', icon: Award },
          { id: 'stadiums', label: 'Stadiums', icon: MapIcon },
          { id: 'migration', label: 'Migration', icon: CalendarDays }
        ].map(m => (
          <button
            key={m.id}
            onClick={() => setActiveMode(m.id as any)}
            className={`px-2.5 py-1 text-[9.5px] font-mono uppercase tracking-normal rounded flex items-center gap-1.5 border flex-shrink-0 transition-all ${
              activeMode === m.id 
                ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]' 
                : 'bg-black/40 text-gray-400 hover:text-white border-white/5'
            }`}
          >
            <m.icon size={10} />
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {/* SPLIT LAYOUT MAIN FRAME */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden w-full relative">
        
        {/* LEFT COMPONENT - MAP PANEL */}
        <div className="lg:col-span-8 flex flex-col justify-between p-4 sm:p-6 overflow-hidden bg-[#09090c]/45 relative h-full">
          
          {/* Subtle paper grid coordinates of ocean */}
          <div className="absolute inset-0 opacity-[0.018] bg-[linear-gradient(to_right,#D4AF37_1px,transparent_1px),linear-gradient(to_bottom,#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          {/* EXTRA INFOGRAPHICS INSIDE CARTOGRAPHY */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none bg-black/50 border border-white/5 backdrop-blur px-3 py-2 rounded">
            <span className="font-mono text-[8px] text-[#AFA58D] tracking-widest block uppercase font-black">ACTIVE DISPLAY FRAME</span>
            <div className="font-serif text-[#F5F2EA] text-xs font-bold flex items-center gap-1.5 mt-0.5 uppercase">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-ping" />
              <span>
                {activeMode === 'hosts' ? 'Exhibiting World Cup Host Coordinates' :
                 activeMode === 'champions' ? 'Exhibiting Champion Title Realms' :
                 activeMode === 'legends' ? 'Origin Geography of Football Titans' :
                 activeMode === 'stadiums' ? 'Coordinates of Hallowed Stadium Landmarks' :
                 'Chronological Path of World Cup Migration'}
              </span>
            </div>
          </div>

          <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5">
            {/* LAYER PANEL FILTER */}
            <div className="relative">
              <button 
                onClick={() => setLayersOpen(!layersOpen)}
                className="px-3 py-1.5 bg-[#141416]/90 hover:bg-[#1a1a1e] border border-[#D4AF37]/35 rounded-[3px] text-[10px] font-mono text-[#D4AF37] flex items-center gap-1.5 cursor-pointer uppercase transition-all shadow-md"
              >
                <Layers size={11} /> Map Legend & Layers
              </button>
              
              {layersOpen && (
                <div className="absolute right-0 mt-2 bg-[#0c0c0e]/95 border border-[#D4AF37]/20 p-4 w-52 rounded-[3px] shadow-2xl z-50 text-left">
                  <span className="font-mono text-[8px] text-[#69707A] uppercase tracking-widest block mb-2.5">TOGGLE MAP OBJECTS</span>
                  <div className="space-y-2">
                    {[
                      { key: 'hosts', label: 'Host Countries' },
                      { key: 'champions', label: 'Champion Nations' },
                      { key: 'legends', label: 'Legend Origins' },
                      { key: 'stadiums', label: 'Stadium Landmarks' }
                    ].map(lay => (
                      <label key={lay.key} className="flex items-center gap-2 cursor-pointer text-[11px] font-mono text-gray-300 hover:text-white">
                        <input 
                          type="checkbox"
                          checked={(layerFilters as any)[lay.key]}
                          onChange={() => setLayerFilters(prev => ({ ...prev, [lay.key]: !(prev as any)[lay.key] }))}
                          className="rounded text-[#D4AF37] focus:ring-0 bg-black/40 border-white/10 w-3.5 h-3.5"
                        />
                        <span>{lay.label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-3.5 border-t border-[#D4AF37]/15 pt-2 flex flex-col gap-1 font-mono text-[7px] text-[#69707A]">
                    <p>● SEPIA GRADIENT = LANDMASSES</p>
                    <p>● GOLD ACCENTS = ACTIVE RECORDS</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* HISTORICAL CARTOGRAPHY MAP PLOT (DYNAMIC SVG DESIGNED TO BE AN ARTWORK) */}
          <div className="flex-1 w-full relative flex items-center justify-center">
            
            <svg 
              viewBox="0 0 1000 500" 
              className="w-full h-auto select-none max-h-full"
              style={{ background: 'radial-gradient(circle, #0e0f14 0%, #060608 100%)' }}
            >
              {/* VINTAGE MERIDIAN AND LONGITUDE DRAWINGS */}
              {Array.from({ length: 9 }).map((_, idx) => (
                <line 
                  key={`grid-long-${idx}`}
                  x1={100 + idx * 100} y1="0" x2={100 + idx * 100} y2="500"
                  stroke="#D4AF37" strokeOpacity="0.015" strokeWidth="1"
                />
              ))}
              {Array.from({ length: 5 }).map((_, idx) => (
                <line 
                  key={`grid-lat-${idx}`}
                  x1="0" y1={100 + idx * 100} x2="1000" y2={100 + idx * 100}
                  stroke="#D4AF37" strokeOpacity="0.015" strokeWidth="1"
                />
              ))}

              {/* Equator & Meridians Line styled elegantly */}
              <line x1="0" y1="250" x2="1000" y2="250" stroke="#D4AF37" strokeOpacity="0.1" strokeWidth="1.2" strokeDasharray="6, 4" />
              <text x="945" y="245" fill="#D4AF37" fillOpacity="0.3" className="font-mono text-[7px] tracking-widest">EQUATOR LINE</text>
              
              <line x1="500" y1="0" x2="500" y2="500" stroke="#D4AF37" strokeOpacity="0.1" strokeWidth="1.2" strokeDasharray="6, 4" />
              <text x="505" y="16" fill="#D4AF37" fillOpacity="0.3" className="font-mono text-[7px] tracking-widest">PRIME MERIDIAN</text>

              {/* COMPASS ROSE ILLUSTRATION FOR VINTAGE BEAUTY */}
              <g transform="translate(100, 390) scale(0.65)" opacity="0.2">
                <circle cx="0" cy="0" r="55" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
                <circle cx="0" cy="0" r="48" fill="none" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="3, 3" />
                <line x1="-65" y1="0" x2="65" y2="0" stroke="#D4AF37" strokeWidth="0.8" />
                <line x1="0" y1="-65" x2="0" y2="65" stroke="#D4AF37" strokeWidth="0.8" />
                <polygon points="0,-70 7,-14 0,0 -7,-14" fill="#D4AF37" stroke="#D4AF37" strokeWidth="0.5" />
                <polygon points="0,70 7,14 0,0 -7,14" fill="#D4AF37" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6" />
                <polygon points="70,0 14,7 0,0 14,-7" fill="#D4AF37" stroke="#D4AF37" strokeWidth="0.5" opacity="0.8" />
                <polygon points="-70,0 -14,7 0,0 -14,-7" fill="#D4AF37" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
                <text x="-3" y="-76" fill="#D4AF37" className="font-mono text-[8.5px] font-bold">N</text>
                <text x="-3" y="85" fill="#D4AF37" className="font-mono text-[8.5px]">S</text>
                <text x="75" y="3" fill="#D4AF37" className="font-mono text-[8.5px]">E</text>
                <text x="-86" y="3" fill="#D4AF37" className="font-mono text-[8.5px]">W</text>
              </g>

              {/* RETRO SAILING SHIP */}
              <g transform="translate(680, 345) scale(0.4)" opacity="0.14">
                <path d="M 0 0 C 12 -18 36 -24 45 4 C 24 28 -10 24 -24 0 Z" fill="#D4AF37" />
                <line x1="8" y1="5" x2="8" y2="-48" stroke="#D4AF37" strokeWidth="2.2" />
                <line x1="28" y1="12" x2="28" y2="-38" stroke="#D4AF37" strokeWidth="2.2" />
                <path d="M 8 -48 C 3 -38 3 -22 8 -16 C 22 -22 22 -38 8 -48 Z M 28 -38 C 23 -30 23 -20 28 -14 C 38 -16 38 -30 28 -38 Z" fill="#D4AF37" opacity="0.8" />
                <text x="-40" y="-12" fill="#D4AF37" className="font-mono text-[14px] font-black italic">M/v Jules Rimet</text>
              </g>
              
              {/* EDITORIAL CONTINENTS BACKGROUND DECORATORS */}
              <g opacity="0.1">
                {/* 1. North America Outline */}
                <path 
                  d="M 60,80 L 150,70 L 220,65 L 260,85 L 245,140 L 210,170 L 165,225 L 140,230 L 115,200 L 90,165 L 50,110 Z" 
                  fill="#D4AF37" fillOpacity="0.1" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3,3"
                />
                {/* 2. South America Outline */}
                <path 
                  d="M 250,250 L 320,270 L 380,335 L 350,420 L 310,480 L 295,475 L 275,415 L 245,345 L 235,285 Z" 
                  fill="#D4AF37" fillOpacity="0.15" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3,3"
                />
                {/* 3. Europe / Eurasia Outline */}
                <path 
                  d="M 440,95 L 500,80 L 550,75 L 540,145 L 570,195 L 500,215 L 450,195 Z" 
                  fill="#D4AF37" fillOpacity="0.15" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3,3"
                />
                <path 
                  d="M 550,75 L 770,65 L 870,105 L 880,245 L 840,265 L 740,285 L 690,305 L 620,265 L 570,205 Z" 
                  fill="#D4AF37" fillOpacity="0.08" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3,3"
                />
                {/* 4. Africa Outline */}
                <path 
                  d="M 450,215 L 530,220 L 580,255 L 590,315 L 560,395 L 520,415 L 490,395 L 470,345 L 440,265 Z" 
                  fill="#D4AF37" fillOpacity="0.15" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3,3"
                />
                {/* 5. Australia Outline */}
                <path 
                  d="M 800,375 L 870,365 L 900,405 L 860,445 L 820,435 Z" 
                  fill="#D4AF37" fillOpacity="0.1" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3,3"
                />
              </g>

              {/* CONTINENT ELEGANT HISTORICAL TYPOGRAPHY */}
              <text x="140" y="115" fill="#DDD7C8" fillOpacity="0.12" className="font-serif text-[18px] tracking-[0.25em] font-black uppercase">NORTH AMERICA</text>
              <text x="210" y="325" fill="#DDD7C8" fillOpacity="0.15" className="font-serif text-[18px] tracking-[0.25em] font-black uppercase">SOUTH AMERICA</text>
              <text x="480" y="105" fill="#DDD7C8" fillOpacity="0.15" className="font-serif text-[18px] tracking-[0.25em] font-black uppercase">EUROPE</text>
              <text x="510" y="275" fill="#DDD7C8" fillOpacity="0.15" className="font-serif text-[18px] tracking-[0.25em] font-black uppercase">AFRICA</text>
              <text x="710" y="145" fill="#DDD7C8" fillOpacity="0.1" className="font-serif text-[18px] tracking-[0.25em] font-black uppercase">ASIA</text>
              <text x="810" y="405" fill="#DDD7C8" fillOpacity="0.08" className="font-serif text-[14px] tracking-[0.25em] font-black uppercase">OCEANIA</text>

              {/* WORLD CUP MIGRATION DYNAMIC FLIGHT ROUTE (PERSPECTIVE 5) */}
              {activeMode === 'migration' && (
                <g>
                  {/* Drawing connecting routes stop by stop up to current visible index */}
                  {MIGRATION_STOPS.slice(0, migrationIndex + 1).map((stop, mIdx) => {
                    if (mIdx === 0) return null;
                    const prevStop = MIGRATION_STOPS[mIdx - 1];
                    
                    // Bezier bend calculator to add elegant cartographic arcs
                    const bendX = (prevStop.x + stop.x) / 2;
                    const bendY = (prevStop.y + stop.y) / 2 - Math.abs(prevStop.x - stop.x) * 0.15 - 15;
                    const controlPath = `M ${prevStop.x} ${prevStop.y} Q ${bendX} ${bendY} ${stop.x} ${stop.y}`;
                    
                    return (
                      <g key={`route-link-${mIdx}`}>
                        {/* Shadow path backdrop */}
                        <path 
                          d={controlPath} 
                          fill="none" 
                          stroke="#000000" 
                          strokeWidth="3" 
                          opacity="0.5" 
                        />
                        {/* Vintage glowing dashed arc */}
                        <path 
                          d={controlPath} 
                          fill="none" 
                          stroke="#D4AF37" 
                          strokeWidth="1.5" 
                          strokeDasharray="4, 4" 
                          className={mIdx === migrationIndex ? "animate-pulse" : ""}
                          opacity={mIdx === migrationIndex ? 0.95 : 0.45}
                        />
                      </g>
                    );
                  })}
                </g>
              )}

              {/* DYNAMIC NATIONS SPATIAL NODES (PERSPECTIVE 1 / 2) */}
              {visibleNations.map((nation) => {
                const coords = COORDINATE_MAP[nation.id];
                if (!coords) return null;
                
                const isSelected = activeDossier?.type === 'nation' && activeDossier.metaId === nation.id;
                
                return (
                  <g 
                    key={`nation-${nation.id}`}
                    transform={`translate(${coords.x}, ${coords.y})`}
                    className="cursor-pointer group"
                    onClick={() => handleSelectNationNode(nation.id)}
                  >
                    {/* Ring highlight behind active selection */}
                    <circle 
                      cx="0" cy="0" 
                      r={isSelected ? 18 : 10} 
                      className="transition-all duration-300"
                      fill={activeMode === 'champions' ? '#D4AF37' : '#FFFFFF'} 
                      fillOpacity={isSelected ? 0.15 : 0.03}
                    />

                    {activeMode === 'champions' && (
                      <circle 
                        cx="0" cy="0" r="14"
                        fill="none" 
                        stroke="#D4AF37" 
                        strokeWidth="0.5"
                        strokeDasharray="2, 2"
                        className="animate-spin"
                        style={{ animationDuration: '10s' }}
                        opacity={0.4}
                      />
                    )}

                    {/* Central anchor node dot */}
                    <circle 
                      cx="0" cy="0" 
                      r={isSelected ? 5.5 : 4} 
                      fill={activeMode === 'champions' ? '#D4AF37' : '#FFFFFF'} 
                      stroke="#000" 
                      strokeWidth="1.2"
                      className="transition-all duration-200 group-hover:fill-[#D4AF37]"
                    />

                    {/* Nation Name Label overlaying map */}
                    <text 
                      x="10" 
                      y="3.5" 
                      className="font-mono text-[8.5px] font-bold tracking-wider uppercase pointer-events-none text-shadow transition-all duration-300"
                      fill={isSelected ? '#D4AF37' : '#E5E1D8'}
                      fillOpacity={isSelected ? 1 : 0.6}
                    >
                      {nation.name} {activeMode === 'champions' && Array.from({ length: nation.titlesCount }).map(() => '★').join('')}
                    </text>
                  </g>
                );
              })}

              {/* DYNAMIC STADIUM REALMS NODES (PERSPECTIVE 4) */}
              {(activeMode === 'stadiums' || layerFilters.stadiums) && visibleStadiums.map((stad) => {
                const isSelected = activeDossier?.type === 'stadium' && activeDossier.metaId === stad.id;
                const stop = MIGRATION_STOPS.find(s => s.country.toLowerCase().includes(stad.country.toLowerCase()) || stad.country === 'South Africa' && s.country === 'South Africa');
                const x = stop ? stop.x : 500;
                const y = stop ? stop.y + 12 : 250; // offset slightly down from nation center node for clarity

                return (
                  <g 
                    key={`stad-node-${stad.id}`}
                    transform={`translate(${x}, ${y})`}
                    className="cursor-pointer group"
                    onClick={() => handleSelectStadiumNode(stad.id)}
                  >
                    <circle cx="0" cy="0" r={isSelected ? 12 : 7} fill="#10b981" fillOpacity={isSelected ? 0.25 : 0.08} className="transition-all" />
                    <rect 
                      x="-3" y="-3" width="6" height="6" 
                      fill="#10b981" 
                      stroke="#000" 
                      strokeWidth="0.8"
                      className="transition-all group-hover:fill-[#D4AF37]"
                    />
                    <text 
                      x="8" y="2" 
                      className="font-sans text-[7.5px] font-semibold tracking-wide pointer-events-none text-shadow transition-all text-[#AFA58D]"
                      fillOpacity={0.7}
                    >
                      🏟 {stad.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}

              {/* DYNAMIC LEGENDS GEOGRAPHIC ROOTS (PERSPECTIVE 3) */}
              {(activeMode === 'legends' || layerFilters.legends) && visibleLegends.map((leg) => {
                const isSelected = activeDossier?.type === 'legend' && activeDossier.metaId === leg.id;
                // find country coordinates
                const coords = COORDINATE_MAP[leg.nation.toLowerCase()] || { x: 500, y: 250 };
                // Offset slightly right / up to prevent dot piles
                const offsetMultiplier = leg.id === 'pele' ? -12 : leg.id === 'maradona' ? 12 : -10;
                const lx = coords.x + offsetMultiplier;
                const ly = coords.y - 12;

                return (
                  <g 
                    key={`leg-node-${leg.id}`}
                    transform={`translate(${lx}, ${ly})`}
                    className="cursor-pointer group"
                    onClick={() => handleSelectLegendNode(leg.id)}
                  >
                    <polygon 
                      points="0,-5 5,3 -5,3" 
                      fill="#3b82f6" 
                      stroke="#000" 
                      strokeWidth="0.8" 
                      className="transition-all group-hover:fill-[#D4AF37]" 
                    />
                    <text 
                      x="6" 
                      y="1.5" 
                      className="font-mono text-[7px] font-semibold pointer-events-none text-shadow text-[#93c5fd]"
                      fillOpacity={isSelected ? 1 : 0.65}
                    >
                      👑 {leg.name.split(' ').pop()}
                    </text>
                  </g>
                );
              })}

              {/* CHRONOLOGICAL TIMELINE PATHWAY STOP PINS (PERSPECTIVE 5) */}
              {activeMode === 'migration' && MIGRATION_STOPS.slice(0, migrationIndex + 1).map((stop, sfIdx) => {
                const isSelected = migrationIndex === sfIdx;
                
                return (
                  <g 
                    key={`migration-stop-pin-${sfIdx}`}
                    transform={`translate(${stop.x}, ${stop.y})`}
                    className="cursor-pointer group animate-fade-in"
                    onClick={() => {
                      triggerAudioTick();
                      setMigrationIndex(sfIdx);
                      handleSelectMigrationStop(sfIdx);
                    }}
                  >
                    <circle 
                      cx="0" cy="0" r="14" 
                      fill="#D4AF37" 
                      fillOpacity={isSelected ? 0.22 : 0.05} 
                      className="transition-all animate-ping"
                      style={{ animationDuration: '4s' }}
                    />
                    <circle 
                      cx="0" cy="0" r={isSelected ? 6 : 4} 
                      fill={isSelected ? '#D4AF37' : '#141416'} 
                      stroke="#D4AF37" 
                      strokeWidth="1.2"
                    />
                    <text 
                      x="10" y="-8"
                      className="font-mono text-[7px] bg-black/80 font-black tracking-widest text-[#D4AF37]"
                    >
                      {stop.year}
                    </text>
                  </g>
                );
              })}

            </svg>
          </div>

          {/* LOWER INTERACTIVE HISTORICAL TIMELINE SYSTEM */}
          <div className="w-full bg-[#111216]/95 border border-white/5 p-4 rounded-[4px] relative z-10 flex flex-col md:flex-row items-center gap-6 shadow-xl">
            <div className="flex-shrink-0 flex items-center gap-3">
              <CalendarDays className="text-[#D4AF37] animate-pulse" size={18} />
              <div>
                <p className="font-mono text-[8px] text-[#AFA58D] uppercase tracking-widest leading-none mb-1">CHRONOLOGICAL REGISTER</p>
                <div className="font-serif text-[#F5F2EA] text-base font-black uppercase tracking-wide leading-none select-none">
                  DIAL FOOTBALL ERA: <span className="text-[#D4AF37]">{currentTimelineYear}</span>
                </div>
              </div>
            </div>

            {/* ERA DYNAMIC RANGE SLIDER */}
            <div className="flex-1 w-full flex items-center gap-4">
              <span className="font-mono text-[9px] text-gray-500 font-bold select-none">1930</span>
              <div className="flex-1 relative flex items-center">
                <input 
                  type="range"
                  min="0"
                  max={YEARS_INDEX.length - 1}
                  step="1"
                  value={YEARS_INDEX.indexOf(currentTimelineYear)}
                  onChange={e => handleTimelineChange(YEARS_INDEX[Number(e.target.value)])}
                  className="w-full accent-[#D4AF37] h-1.5 bg-black/60 rounded-full cursor-ew-resize opacity-85 hover:opacity-100 transition-all"
                />
                
                {/* Year indicators overlay */}
                <div className="absolute left-0 right-0 -bottom-3.5 flex justify-between px-1 pointer-events-none">
                  {YEARS_INDEX.filter((_, k) => k % 4 === 0 || k === YEARS_INDEX.length - 1).map((yr, index) => (
                    <span 
                      key={yr} 
                      className={`font-mono text-[7px] font-semibold text-center select-none ${yr === currentTimelineYear ? 'text-[#D4AF37]' : 'text-gray-600'}`}
                    >
                      {yr === 2026 ? '2026★' : yr}
                    </span>
                  ))}
                </div>
              </div>
              <span className="font-mono text-[9px] text-[#D4AF37] font-bold select-none">2026★</span>
            </div>

            {/* ERA EXCLUSIVITY HUD INDICATOR */}
            <div className="flex-shrink-0 border-l border-white/10 pl-4 py-1 flex items-center gap-3">
              <div className="text-right">
                <span className="font-mono text-[7px] text-[#69707A] uppercase block">FILTER OUTCOME</span>
                <span className="font-mono text-[10px] text-[#AFA58D] font-black uppercase">
                  {currentTimelineYear === 2026 ? 'GLOBAL WORLD MATRIX' : `${visibleNations.length} REALMS DETECTED`}
                </span>
              </div>
              <Compass className="text-[#D4AF37]/45 animate-spin" size={20} style={{ animationDuration: '12s' }} />
            </div>

          </div>

        </div>

        {/* RIGHT COMPONENT - IMMERSIVE VINTAGE PARCHMENT DOSSIER */}
        <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#D4AF37]/15 bg-[#0a0a0d] p-6 overflow-y-auto flex flex-col justify-between h-full relative z-20">
          
          {/* Faded parchment simulation texture */}
          <div className="absolute inset-0 opacity-[0.012] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(212,175,55,0.03)] pointer-events-none" />

          {/* DOSSIER BODY */}
          <div className="z-10 select-text">
            
            {activeDossier ? (
              <motion.div
                key={`${activeDossier.type}-${activeDossier.title}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                {/* Catalog Divider line */}
                <div className="flex justify-between items-start border-b border-[#D4AF37]/15 pb-4 mb-6">
                  <div>
                    <span className="font-mono text-[8px] tracking-[0.2em] text-[#AFA58D] uppercase block">
                      {activeDossier.type === 'nation' ? 'CHAMBER IV // NATIONAL DYNASTY FILE' :
                       activeDossier.type === 'stadium' ? 'CHAMBER VI // COLISEUMS REGISTRY' :
                       activeDossier.type === 'legend' ? 'CHAMBER II // TITAN COMMODITY' :
                       'MIGRATION PATH STOP DATA'}
                    </span>
                    <span className="font-mono text-[9px] bg-[#221e19] border border-[#D4AF37]/30 text-[#D4AF37] font-black px-2 py-0.5 rounded-[1px] mt-2 inline-block uppercase tracking-wider select-none">
                      REG-PL-{activeDossier.metaId?.toUpperCase() || 'MIGRATION'}
                    </span>
                  </div>
                  {/* Ink stamp stamp simulation */}
                  <div className="w-10 h-10 rounded-full border border-dashed border-[#D4AF37]/25 flex items-center justify-center rotate-6 text-[6px] font-mono text-[#D4AF37]/75 text-center leading-tight select-none">
                    ATLAS<br/>PROVED
                  </div>
                </div>

                {/* Main Dossier Header */}
                <span className="font-sans text-[8px] text-[#69707A] uppercase tracking-[0.25em] block mb-1">ARCHIVE CHRONOLOGY SHEET</span>
                <h3 className="font-serif text-[#F5F2EA] text-2xl md:text-3xl font-black mb-1 leading-tight tracking-tight uppercase">
                  {activeDossier.title}
                </h3>
                <p className="font-serif italic text-xs text-[#AFA58D] mb-6">{activeDossier.subtitle}</p>

                {/* Core Attributes Ledger Grid */}
                <div className="grid grid-cols-1 gap-3.5 bg-[#141210] p-4 border border-white/5 rounded-[2px] mb-6 select-text shadow-inner">
                  <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                    <span className="font-mono text-[9px] text-[#69707A] uppercase">PRIMARY REGION</span>
                    <span className="font-serif text-xs text-[#E5E1D8] font-bold uppercase">{activeDossier.country}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                    <span className="font-mono text-[9px] text-[#69707A] uppercase">DIAL ACCENT</span>
                    <span className="font-serif text-xs text-[#D4AF37] italic font-medium">{activeDossier.continent}</span>
                  </div>
                  {activeDossier.yearEstablished && (
                    <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                      <span className="font-mono text-[9px] text-[#69707A] uppercase">ESTABLISHMENT STAMP</span>
                      <span className="font-mono text-xs text-[#E5E1D8]">{activeDossier.yearEstablished} era</span>
                    </div>
                  )}
                  {activeDossier.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="flex justify-between border-b border-white/[0.02] last:border-0 pb-1.5 last:pb-0">
                      <span className="font-mono text-[9px] text-[#69707A] uppercase">{stat.label}</span>
                      <span className="font-sans text-xs text-[#DDD7C8] font-semibold text-right">{stat.value}</span>
                    </div>
                  ))}
                </div>

                {/* Elegant description body excerpt */}
                <div className="relative border-l-2 border-[#D4AF37]/50 pl-4 py-1.5 mb-6">
                  <span className="absolute -top-3.5 left-2 font-mono text-[7px] text-[#D4AF37]/45 bg-[#0a0a0d] px-1.5 uppercase tracking-widest select-none">HISTORICAL REEL STATEMENTS</span>
                  <p className="font-serif text-xs italic text-[#DDD7C8] leading-relaxed">
                    "{activeDossier.details}"
                  </p>
                </div>

                {/* Bullet details achievements of point */}
                <div className="mb-6">
                  <span className="block font-sans text-[8.5px] text-[#AFA58D] uppercase tracking-widest mb-3 font-bold border-b border-[#D4AF37]/15 pb-1 select-none">
                    {activeDossier.type === 'nation' ? 'DYNASTIC RECORDS & MONUMENTS' :
                     activeDossier.type === 'stadium' ? 'ATMOSPHERE ARCHIVE & SEISMICS' :
                     activeDossier.type === 'legend' ? 'IMMORTAL FOOTPRINTS RECORDED' :
                     'HISTORIC HIGHLIGHT CHRONICLES'}
                  </span>
                  <ul className="space-y-3">
                    {activeDossier.bullets.slice(0, 3).map((bul, k) => (
                      <li key={k} className="flex gap-2.5 items-start text-[11.5px] font-sans text-gray-300 leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-1.5 flex-shrink-0" />
                        <span>{bul}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deep-linking interconnectivity buttons */}
                {activeDossier.links && activeDossier.links.length > 0 && (
                  <div className="space-y-2 mt-8">
                    <span className="block font-mono text-[7.5px] text-[#69707A] uppercase tracking-widest mb-1.5 select-none">MUSEUM INTERCONNECTED LINKAGES</span>
                    {activeDossier.links.map((link, lIdx) => (
                      <button
                        key={lIdx}
                        onClick={() => {
                          triggerAudioTick();
                          link.action();
                        }}
                        className="w-full text-left py-2.5 px-3 bg-white/[0.02] hover:bg-[#D4AF37]/5 border border-white/5 hover:border-[#D4AF37]/40 text-xs font-mono text-[#DDD7C8] hover:text-[#D4AF37] rounded transition-all cursor-pointer flex justify-between items-center group"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight size={13} className="text-gray-500 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                )}

              </motion.div>
            ) : (
              <div className="py-20 text-center text-gray-500 max-w-xs mx-auto">
                <Compass className="w-12 h-12 text-[#D4AF37]/20 mx-auto mb-4 animate-spin" style={{ animationDuration: '14s' }} />
                <h4 className="font-serif text-[#DDD7C8] text-sm uppercase tracking-wider mb-2">Unseal a Region Map Node</h4>
                <p className="font-sans text-[11px] text-[#69707A] leading-relaxed">
                  {activeMode === 'migration' 
                    ? 'Press play or hit any stop along the chronological timeline on the left to unroll the migration log of the World Cup.'
                    : 'Choose an active node on the 2D SVG map or hover/click host countries to construct and open its full historical museum chronicle sheets.'}
                </p>
              </div>
            )}

          </div>

          {/* LOWER CONTROLS / OR PLAYBACK STATUS FOR MIGRATION ROUTE */}
          <div className="mt-8 border-t border-dashed border-[#D4AF37]/20 pt-6">
            
            {activeMode === 'migration' ? (
              <div className="bg-[#121216] p-4.5 border border-[#D4AF37]/20 rounded-md shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-widest font-black">AUTOMATED STREAM PLAYHEAD</span>
                  <span className="font-mono text-[10px] text-gray-400">Stop {migrationIndex + 1} of {MIGRATION_STOPS.length}</span>
                </div>
                
                <h4 className="font-serif text-[#F5F2EA] text-base font-bold uppercase mb-1">
                  {MIGRATION_STOPS[migrationIndex].year} ➔ {MIGRATION_STOPS[migrationIndex].country}
                </h4>
                <p className="font-sans text-[11px] text-gray-400 mb-4 h-8 overflow-hidden line-clamp-2">
                  Watching the World Cup migrate coordinates. Select play below to automatically cruise through decades of travel history.
                </p>

                <div className="flex gap-2.5">
                  <button
                    onClick={() => {
                      triggerAudioTick();
                      setPlaybackActive(!playbackActive);
                    }}
                    className={`flex-1 py-2 rounded font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      playbackActive 
                        ? 'bg-red-950/45 text-red-400 border border-red-500/30' 
                        : 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37]/25'
                    }`}
                  >
                    {playbackActive ? <Pause size={12} /> : <Play size={12} />}
                    <span>{playbackActive ? 'Pause Cruise' : 'Begin Auto-Cruise'}</span>
                  </button>
                  <button
                    onClick={() => {
                      triggerAudioTick();
                      setMigrationIndex(0);
                      handleSelectMigrationStop(0);
                      setPlaybackActive(false);
                    }}
                    className="p-2 bg-black/40 hover:bg-black/85 border border-white/5 hover:border-white/20 text-gray-400 hover:text-white rounded transition-all cursor-pointer"
                    title="Reset Timeline Index"
                  >
                    <RotateCcw size={12} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-black/30 p-4 border border-white/5 rounded">
                <div className="flex items-center gap-3">
                  <Info size={16} className="text-[#D4AF37] flex-shrink-0" />
                  <p className="font-sans text-[11px] text-[#AFA58D] leading-relaxed">
                    <strong>Pre-eminent Geography Tip:</strong> Use the lower chronological timeline to filter out states or arenas built before that decade epoch. Watch the football empire expand!
                  </p>
                </div>
              </div>
            )}

            {/* DIRECT CONNECTIVITY ACTION TO TIME TRAVEL MACHINE */}
            <button
              onClick={() => {
                triggerAudioTick();
                onExploreHistory();
              }}
              className="mt-4 w-full py-3.5 bg-transparent hover:bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/45 hover:border-[#D4AF37] rounded-[3px] font-serif text-[11px] font-black tracking-[0.25em] uppercase hover:shadow-[0_0_15px_rgba(212,175,55,0.08)] flex items-center justify-center gap-2 transition-all cursor-pointer duration-300"
            >
              <History size={13} />
              <span>Launch Immersive Time Machine</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
