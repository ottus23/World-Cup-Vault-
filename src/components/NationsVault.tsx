import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Search, Compass, Shield, Award, Users, Crosshair, 
  Tv, History, Scale, Zap, Info, ArrowLeft, Heart, Sparkles, ChevronRight, Play
} from 'lucide-react';
import { nationsData, NationCivilization, NationJourneyMilestone } from '../nationsData';
import { ContinueExploringSystem } from './ContinueExploringSystem';
import { VerifiedImage } from './VerifiedImage';

// --- Web Audio Engine for Immersive Football Cartography ---
const playSound = (type: 'map-hover' | 'page-open' | 'gear-tick' | 'clash' | 'success') => {
  // Audio disabled for now
};

export function NationsVault({ 
  onClose, 
  initialNationId,
  onExploreMatches,
  onExploreNations,
  onExploreLegends,
  onExploreStadiums,
  onExploreTournament
}: { 
  onClose: () => void; 
  initialNationId?: string;
  onExploreMatches?: (matchId: string) => void;
  onExploreNations?: (nationId: string) => void;
  onExploreLegends?: (legendId: string) => void;
  onExploreStadiums?: (stadiumId: string) => void;
  onExploreTournament?: (year: number) => void;
}) {
  const [selectedNation, setSelectedNation] = useState<NationCivilization | null>(
    initialNationId ? nationsData.find(n => n.id === initialNationId) || null : null
  );

  useEffect(() => {
    if (initialNationId) {
      const nat = nationsData.find(n => n.id === initialNationId);
      if (nat) setSelectedNation(nat);
    }
  }, [initialNationId]);
  const [searchQuery, setSearchQuery] = useState('');
  const [continentFilter, setContinentFilter] = useState<string>('All');
  const [minTitlesFilter, setMinTitlesFilter] = useState<number>(-1);
  const [hoveredNation, setHoveredNation] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'atlas' | 'comparison'>('atlas');

  // Interactive Timeline state inside the nation view
  const [expandedMilestoneYear, setExpandedMilestoneYear] = useState<number | null>(null);
  
  // Interactive Rivalry State
  const [activeRivalryIndex, setActiveRivalryIndex] = useState<number>(0);

  // Dynamic state for selected year on Dynasty Meter
  const [focusedDynastyYear, setFocusedDynastyYear] = useState<number>(2022);

  // Comparison Lab Selection
  const [compLeftId, setCompLeftId] = useState<string>('brazil');
  const [compRightId, setCompRightId] = useState<string>('germany');

  const compLeft = nationsData.find(n => n.id === compLeftId) || nationsData[0];
  const compRight = nationsData.find(n => n.id === compRightId) || nationsData[1];

  // Filtering nations
  const filteredNations = nationsData.filter(nation => {
    const matchesSearch = nation.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          nation.motto.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          nation.spirit.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesContinent = continentFilter === 'All' || nation.continent === continentFilter;
    const matchesTitles = minTitlesFilter === -1 || nation.titlesCount >= minTitlesFilter;
    return matchesSearch && matchesContinent && matchesTitles;
  });

  const handleSelectNation = (nation: NationCivilization) => {
    playSound('page-open');
    setSelectedNation(nation);
    setExpandedMilestoneYear(nation.timeline[0]?.year || null);
    
    // Choose closest available year in this nation's dynastyLevels to focus on initially
    const years = nation.dynastyLevels.map(d => d.year);
    if (years.includes(2022)) {
      setFocusedDynastyYear(2022);
    } else if (years.length > 0) {
      setFocusedDynastyYear(years[years.length - 1]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToAtlas = () => {
    playSound('page-open');
    setSelectedNation(null);
  };

  const currentFocusedDynastyLevel = selectedNation?.dynastyLevels.find(d => d.year === focusedDynastyYear);
  const currentFocusedTimelineMilestone = selectedNation?.timeline.find(t => t.year === focusedDynastyYear) || 
                                          selectedNation?.timeline[0];

  return (
    <div className="min-h-screen bg-[#070707] text-[#F5F2EA] relative selection:bg-[#D4AF37] selection:text-black">
      {/* Absolute top-left corner emblem style navigation bar */}
      <div className="absolute top-0 left-0 right-0 h-16 border-b border-white/5 bg-black/40 backdrop-blur-md px-6 md:px-12 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
          <Compass className="text-[#D4AF37]" size={20} />
          <span className="font-mono text-xs tracking-[0.3em] text-[#D4AF37] uppercase font-bold">NATIONS VAULT</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              playSound('gear-tick');
              setActiveTab(prev => prev === 'atlas' ? 'comparison' : 'atlas');
            }}
            className="font-mono text-[10px] tracking-widest uppercase border border-[#D4AF37]/35 px-4 py-1.5 rounded-sm hover:bg-[#D4AF37]/15 hover:border-[#D4AF37] transition-all cursor-pointer"
          >
            {activeTab === 'atlas' ? '⚔️ COMPARISON LAB' : '🗺️ ATLAS EXPLORER'}
          </button>
          
          <button 
            onClick={onClose}
            className="p-1 px-2 border border-white/10 hover:border-[#D4AF37] text-neutral-400 hover:text-white transition-all text-xs flex items-center gap-1 cursor-pointer"
          >
            <X size={16} /> <span className="hidden md:inline font-mono">CLOSE</span>
          </button>
        </div>
      </div>

      <div className="pt-24 pb-20 px-4 md:px-12 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedNation ? (
            /* --- CENTRAL VAULT PORTAL: ATLAS & SEARCH LAB --- */
            <motion.div
              key="explorer-portal"
              className="space-y-12"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <p className="font-mono text-[9px] tracking-[0.4em] text-[#D4AF37] uppercase font-semibold animate-pulse">WORLD RECORDS DEPOSITARY</p>
                <h1 className="font-serif text-3xl md:text-5xl font-black text-white tracking-tight">The Civilizations of Football</h1>
                <div className="h-px w-24 bg-[#D4AF37] mx-auto opacity-50 my-4" />
                <p className="font-serif italic text-[#A3AAB2] text-sm md:text-base leading-relaxed">
                  "Every World Cup tells a story. Every nation writes a chapter." Explore the heritage, systems, and empires that captured global silver.
                </p>
              </div>

              {/* TABS SELECTOR */}
              <div className="flex justify-center border-b border-white/5 max-w-sm mx-auto">
                <button
                  onClick={() => { playSound('gear-tick'); setActiveTab('atlas'); }}
                  className={`w-1/2 pb-3 font-mono text-[10px] tracking-widest uppercase text-center transition-all ${
                    activeTab === 'atlas' ? 'border-b border-[#D4AF37] text-[#D4AF37] font-black' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  Cartography Atlas
                </button>
                <button
                  onClick={() => { playSound('gear-tick'); setActiveTab('comparison'); }}
                  className={`w-1/2 pb-3 font-mono text-[10px] tracking-widest uppercase text-center transition-all ${
                    activeTab === 'comparison' ? 'border-b border-[#D4AF37] text-[#D4AF37] font-black' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  Duel Comparison
                </button>
              </div>

              {activeTab === 'atlas' ? (
                <>
                  {/* --- ATLAS SECTION: CUSTOM VECTOR WORLD MAP MAPPE-MONDE --- */}
                  <div className="relative border border-zinc-900 bg-black/60 rounded-sm p-4 md:p-8 overflow-hidden">
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-neutral-950/80 border border-neutral-800 rounded-sm">
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-ping" />
                      <span className="font-mono text-[8px] text-zinc-400 tracking-widest uppercase">REAL-TIME SEISMIC SYMPHONIES</span>
                    </div>

                    <div className="text-center font-mono text-[8px] text-[#D4AF37] tracking-[0.25em] uppercase mb-4">
                      FOOTBALL ATLAS MONDE — CARTOGRAPHIC EDITION
                    </div>

                    {/* Interactive Old Navy SVG Map Grid */}
                    <div className="w-full aspect-[2/1] relative bg-[#090909] border border-zinc-800/80 rounded-sm overflow-hidden flex items-center justify-center">
                      <svg 
                        viewBox="0 0 1000 500" 
                        className="w-full h-full select-none"
                        style={{ background: 'radial-gradient(circle, #0e0e0e 0%, #030303 100%)' }}
                      >
                        {/* Longitudinal Grid Lines */}
                        {Array.from({ length: 9 }).map((_, idx) => (
                          <line 
                            key={`grid-long-${idx}`}
                            x1={100 + idx * 100} y1="0" x2={100 + idx * 100} y2="500"
                            stroke="#ffffff" strokeOpacity="0.015" strokeWidth="1"
                          />
                        ))}
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <line 
                            key={`grid-lat-${idx}`}
                            x1="0" y1={100 + idx * 100} x2="1000" y2={100 + idx * 100}
                            stroke="#ffffff" strokeOpacity="0.015" strokeWidth="1"
                          />
                        ))}

                        {/* Equator & Meridians Line */}
                        <line x1="0" y1="250" x2="1000" y2="250" stroke="#D4AF37" strokeOpacity="0.1" strokeWidth="1.5" strokeDasharray="5, 5" />
                        <text x="960" y="245" fill="#D4AF37" fillOpacity="0.3" className="font-mono text-[8px] tracking-widest">EQUATOR</text>
                        
                        <line x1="500" y1="0" x2="500" y2="500" stroke="#D4AF37" strokeOpacity="0.1" strokeWidth="1.5" strokeDasharray="5, 5" />
                        <text x="505" y="20" fill="#D4AF37" fillOpacity="0.3" className="font-mono text-[8px] tracking-widest">PRIME MERIDIAN</text>

                        {/* Compass Rose Illustration bottom-left */}
                        <g transform="translate(120, 380) scale(0.65)" opacity="0.15">
                          <circle cx="0" cy="0" r="60" fill="none" stroke="#D4AF37" strokeWidth="1" />
                          <circle cx="0" cy="0" r="54" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2, 2" />
                          <line x1="-70" y1="0" x2="70" y2="0" stroke="#D4AF37" strokeWidth="1" />
                          <line x1="0" y1="-70" x2="0" y2="70" stroke="#D4AF37" strokeWidth="1" />
                          <polygon points="0,-75 8,-15 0,0 -8,-15" fill="#D4AF37" stroke="#D4AF37" strokeWidth="0.5" />
                          <polygon points="0,75 8,15 0,0 -8,15" fill="#D4AF37" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6" />
                          <polygon points="75,0 15,8 0,0 15,-8" fill="#D4AF37" stroke="#D4AF37" strokeWidth="0.5" opacity="0.8" />
                          <polygon points="-75,0 -15,8 0,0 -15,-8" fill="#D4AF37" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
                          <text x="-5" y="-82" fill="#D4AF37" className="font-mono text-[10px] font-bold">N</text>
                          <text x="-5" y="92" fill="#D4AF37" className="font-mono text-[10px]">S</text>
                          <text x="82" y="3" fill="#D4AF37" className="font-mono text-[10px]">E</text>
                          <text x="-95" y="3" fill="#D4AF37" className="font-mono text-[10px]">W</text>
                        </g>

                        {/* Retro Sailing Vessel Illustration near Atlantic */}
                        <g transform="translate(480, 320) scale(0.4)" opacity="0.08">
                          <path d="M 0 0 C 10 -15 30 -20 40 5 C 20 25 -10 20 -20 0 Z" fill="#ffffff" />
                          <line x1="10" y1="5" x2="10" y2="-45" stroke="#ffffff" strokeWidth="2" />
                          <line x1="30" y1="10" x2="30" y2="-35" stroke="#ffffff" strokeWidth="2" />
                          <path d="M 10 -45 C 5 -35 5 -20 10 -15 C 25 -20 25 -35 10 -45 Z M 30 -35 C 25 -28 25 -18 30 -12 C 40 -15 40 -28 30 -35 Z" fill="#ffffff" />
                        </g>

                        {/* CONTINENTS TEXT EMBELLISHMENTS */}
                        <text x="180" y="210" fill="#E2E8F0" fillOpacity="0.04" className="font-serif text-[28px] tracking-[0.3em] font-extrabold uppercase">North America</text>
                        <text x="220" y="380" fill="#E2E8F0" fillOpacity="0.04" className="font-serif text-[28px] tracking-[0.3em] font-extrabold uppercase">South America</text>
                        <text x="540" y="110" fill="#E2E8F0" fillOpacity="0.04" className="font-serif text-[28px] tracking-[0.3em] font-extrabold uppercase">Europe</text>
                        <text x="560" y="280" fill="#E2E8F0" fillOpacity="0.04" className="font-serif text-[28px] tracking-[0.3em] font-extrabold uppercase">Africa</text>

                        {/* RIVALRY RAYS: PULSATING LEY CONNECTIONS AT HIGHLIGHT */}
                        {hoveredNation === 'brazil' && (
                          <path 
                            d="M 380 340 Q 360 380 340 420" 
                            fill="none" 
                            stroke="#38bdf8" 
                            strokeWidth="1.5" 
                            strokeDasharray="4,4" 
                            className="animate-pulse"
                            opacity="0.8"
                          />
                        )}
                        {hoveredNation === 'argentina' && (
                          <g>
                            <path d="M 340 420 Q 360 380 380 340" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.8" />
                            <path d="M 340 420 Q 410 280 480 140" fill="none" stroke="#EF4444" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.6" />
                          </g>
                        )}
                        {hoveredNation === 'germany' && (
                          <path d="M 530 160 Q 520 155 510 150" fill="none" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.8" />
                        )}
                        {hoveredNation === 'italy' && (
                          <path d="M 535 190 Q 515 180 500 170" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.8" />
                        )}

                        {/* NATIONS GEOGRAPHIC NODES */}
                        {nationsData.map((nation) => {
                          // Coordinates Map
                          const coords: Record<string, { x: number; y: number }> = {
                            brazil: { x: 380, y: 340 },
                            germany: { x: 530, y: 160 },
                            argentina: { x: 340, y: 420 },
                            italy: { x: 535, y: 190 },
                            france: { x: 500, y: 170 },
                            uruguay: { x: 370, y: 400 },
                            netherlands: { x: 512, y: 152 },
                            england: { x: 480, y: 140 }
                          };
                          
                          const node = coords[nation.id] || { x: 500, y: 250 };
                          const isHovered = hoveredNation === nation.id;
                          
                          return (
                            <g 
                              key={`map-node-${nation.id}`}
                              className="cursor-pointer"
                              onClick={() => { playSound('success'); handleSelectNation(nation); }}
                              onMouseEnter={() => {
                                playSound('map-hover');
                                setHoveredNation(nation.id);
                              }}
                              onMouseLeave={() => setHoveredNation(null)}
                            >
                              {/* Pulsing Backlight */}
                              <circle 
                                cx={node.x} 
                                cy={node.y} 
                                r={isHovered ? 25 : 10} 
                                fill={nation.id === 'brazil' ? '#EAB308' : '#e2e8f0'} 
                                fillOpacity={isHovered ? 0.25 : 0.05} 
                                className="transition-all duration-300"
                              />

                              {/* Target Ring */}
                              {isHovered && (
                                <circle 
                                  cx={node.x} 
                                  cy={node.y} 
                                  r="16" 
                                  fill="none" 
                                  stroke={nation.id === 'brazil' || nation.id === 'netherlands' ? '#f97316' : '#D4AF37'} 
                                  strokeWidth="0.8" 
                                  className="animate-spin"
                                  strokeDasharray="4,2"
                                />
                              )}

                              {/* Core Center Dot */}
                              <circle 
                                cx={node.x} 
                                cy={node.y} 
                                r={isHovered ? 6 : 4.5} 
                                fill={nation.id === 'brazil' ? '#EAB308' : nation.id === 'netherlands' ? '#f97316' : '#ffffff'} 
                                stroke="#000000" 
                                strokeWidth="1"
                                className="transition-all duration-200"
                              />

                              {/* Glowing Tag Labels */}
                              <text 
                                x={node.x + 10} 
                                y={node.y + 4} 
                                fill={isHovered ? '#D4AF37' : '#FFFFFF'} 
                                fillOpacity={isHovered ? 1 : 0.45}
                                className="font-mono text-[9px] font-bold tracking-wider pointer-events-none transition-all duration-200 uppercase"
                              >
                                {nation.name} {Array.from({ length: nation.titlesCount }).map(() => '★').join('')}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                      
                      {/* Floating HUD display for hovered item */}
                      <AnimatePresence>
                        {hoveredNation && (() => {
                          const nat = nationsData.find(n => n.id === hoveredNation);
                          if (!nat) return null;
                          return (
                            <motion.div 
                              className="absolute bottom-4 left-4 p-4 border border-zinc-800 bg-neutral-950/95 backdrop-blur-md w-72 pointer-events-none text-left rounded-sm"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-serif text-lg font-bold text-white tracking-wide">{nat.name}</span>
                                <span className="font-mono text-[#D4AF37] text-xs font-black">
                                  {Array.from({ length: nat.titlesCount }).map(() => '★').join('')}
                                </span>
                              </div>
                              <div className="font-mono text-[8px] text-[#A3AAB2] tracking-[0.2em] uppercase mb-2">{nat.motto}</div>
                              <p className="font-sans text-[10px] text-zinc-400 leading-relaxed mb-3 italic">"{nat.spirit}"</p>
                              <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-2.5 text-center">
                                <div>
                                  <div className="font-mono text-[10px] text-neutral-300 font-bold">{nat.titlesCount}</div>
                                  <div className="font-mono text-[7px] text-neutral-500 uppercase tracking-widest">WORLD STARS</div>
                                </div>
                                <div>
                                  <div className="font-mono text-[10px] text-neutral-300 font-bold">{nat.appearancesCount}</div>
                                  <div className="font-mono text-[7px] text-neutral-500 uppercase tracking-widest">APPEARANCES</div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })()}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* --- DISCOVERY SYSTEM ("ATLAS EXPLORER" SEARCH LAB) --- */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-zinc-950 border border-zinc-900 p-6 rounded-none relative">
                      <div className="absolute top-0 left-6 translate-y-[-50%] bg-[#070707] border border-zinc-900 px-3 py-0.5 font-mono text-[8px] tracking-[0.2em] text-[#D4AF37] uppercase font-bold">
                        DIAGNOSTIC CRITERIA SYSTEM
                      </div>
                      
                      {/* Target input search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                        <input
                          type="text"
                          placeholder="Search Chronicles (e.g. 'Joga', 'Machine')..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 bg-black border border-zinc-800 focus:border-[#D4AF37] focus:outline-none font-mono text-xs text-[#F5F2EA] transition-all rounded-sm placeholder-zinc-600"
                        />
                      </div>

                      {/* Continent Filter */}
                      <div className="flex gap-1.5 items-center">
                        <span className="font-mono text-[9px] text-zinc-500 uppercase">ZONE:</span>
                        <select
                          value={continentFilter}
                          onChange={(e) => { playSound('gear-tick'); setContinentFilter(e.target.value); }}
                          className="flex-1 bg-black border border-zinc-800 p-2 text-xs font-mono text-neutral-300 rounded-sm focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                        >
                          <option value="All">All Continents</option>
                          <option value="South America">South America</option>
                          <option value="Europe">Europe</option>
                        </select>
                      </div>

                      {/* Stars Filter */}
                      <div className="flex gap-1.5 items-center">
                        <span className="font-mono text-[9px] text-zinc-500 uppercase">REGIME:</span>
                        <select
                          value={minTitlesFilter}
                          onChange={(e) => { playSound('gear-tick'); setMinTitlesFilter(Number(e.target.value)); }}
                          className="flex-1 bg-black border border-zinc-800 p-2 text-xs font-mono text-neutral-300 rounded-sm focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                        >
                          <option value="-1">All Regimes</option>
                          <option value="4">4+ Titles (Giants)</option>
                          <option value="2">2+ Titles (Powerhouses)</option>
                          <option value="0">Participating Civilizations</option>
                        </select>
                      </div>

                      {/* Reset Button */}
                      <button
                        onClick={() => {
                          playSound('gear-tick');
                          setSearchQuery('');
                          setContinentFilter('All');
                          setMinTitlesFilter(-1);
                        }}
                        className="bg-zinc-90 w-full py-2 bg-neutral-900 border border-neutral-800 text-[10px] font-mono tracking-widest text-[#D4AF37] hover:bg-[#D4AF37]/10 uppercase transition-all cursor-pointer"
                      >
                        RESET FILTERS
                      </button>
                    </div>

                    {/* Nation Grid Results */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filteredNations.map((nation, idx) => (
                        <motion.div
                          key={`explorer-card-${nation.id}`}
                          className="group relative cursor-pointer"
                          onClick={() => handleSelectNation(nation)}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          {/* Retro frame box styling */}
                          <div className="relative border border-zinc-900 bg-black/40 hover:border-[#D4AF37]/50 p-6 flex flex-col justify-between aspect-[4/3] transition-all duration-300">
                            
                            {/* Accent indicators */}
                            <div className="absolute top-0 right-4 translate-y-[-50%] bg-[#070707] px-2 font-mono text-[7px] tracking-widest text-zinc-600 group-hover:text-[#D4AF37] uppercase font-bold transition-all">
                              {nation.continent}
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="font-serif text-xl tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">{nation.name}</span>
                                <span className="font-serif text-[#D4AF37] text-xs">
                                  {Array.from({ length: nation.titlesCount }).map(() => '★').join('')}
                                </span>
                              </div>
                              <div className="font-mono text-[7.5px] uppercase text-[#A3AAB2] tracking-widest leading-relaxed">
                                {nation.motto}
                              </div>
                              <p className="font-sans text-[11px] text-zinc-500 line-clamp-3 leading-relaxed py-2">
                                {nation.spirit}
                              </p>
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-white/5 font-mono text-[9px] text-zinc-500">
                              <span>{nation.appearancesCount} PLAYS</span>
                              <span className="flex items-center gap-1 text-[#D4AF37]/80 group-hover:text-[#D4AF37] font-bold">
                                OPEN EXPEDITIONS <ChevronRight size={10} />
                              </span>
                            </div>

                            {/* Old map stylized corners */}
                            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-zinc-800 group-hover:border-[#D4AF37]/45 transition-colors" />
                            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-zinc-800 group-hover:border-[#D4AF37]/45 transition-colors" />
                            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-zinc-800 group-hover:border-[#D4AF37]/45 transition-colors" />
                            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-zinc-800 group-hover:border-[#D4AF37]/45 transition-colors" />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {filteredNations.length === 0 && (
                      <div className="text-center py-20 border border-zinc-900 bg-black/20 font-mono text-zinc-500">
                        NO FOOTBALL DYNASTIES MATCHED YOUR INQUIRY
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* --- NATION COMPARISON LAB ("HISTORICAL DUEL") --- */
                <div className="space-y-8 bg-zinc-950 border border-zinc-900 p-6 md:p-12 relative rounded-sm">
                  <div className="absolute top-0 left-6 translate-y-[-50%] bg-[#070707] border border-zinc-900 px-3 py-0.5 font-mono text-[8px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold">
                    SECURED SEISMIC DUEL ENGINE
                  </div>

                  <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
                    <h2 className="font-serif text-2xl font-bold tracking-tight text-white">The Duel Arena</h2>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-400">
                      Weigh two football dynasties in the scales of global history.
                    </p>
                  </div>

                  {/* Dual selectors */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    {/* Left Challenger Select */}
                    <div className="space-y-2 text-center md:text-right">
                      <label className="block font-mono text-[8px] text-zinc-500 tracking-widest uppercase">CHALLENGER INFINITE ALPHA</label>
                      <select
                        value={compLeftId}
                        onChange={(e) => { playSound('clash'); setCompLeftId(e.target.value); }}
                        className="w-full bg-black border border-zinc-800 p-3 text-sm font-mono text-neutral-300 rounded-sm focus:outline-none focus:border-[#D4AF37] text-center cursor-pointer"
                      >
                        {nationsData.map(n => (
                          <option key={`left-opt-${n.id}`} value={n.id} disabled={n.id === compRightId}>
                            {n.name} ({n.titlesCount}★)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Swords Icon */}
                    <div className="flex flex-col items-center justify-center p-4">
                      <div className="w-12 h-12 rounded-full border border-[#D4AF37]/45 bg-black flex items-center justify-center text-[#D4AF37] font-black text-xs animate-pulse">
                        VS
                      </div>
                    </div>

                    {/* Right Challenger Select */}
                    <div className="space-y-2 text-center md:text-left">
                      <label className="block font-mono text-[8px] text-zinc-500 tracking-widest uppercase">CHALLENGER INFINITE OMEGA</label>
                      <select
                        value={compRightId}
                        onChange={(e) => { playSound('clash'); setCompRightId(e.target.value); }}
                        className="w-full bg-black border border-zinc-800 p-3 text-sm font-mono text-neutral-300 rounded-sm focus:outline-none focus:border-[#D4AF37] text-center cursor-pointer"
                      >
                        {nationsData.map(n => (
                          <option key={`right-opt-${n.id}`} value={n.id} disabled={n.id === compLeftId}>
                            {n.name} ({n.titlesCount}★)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <hr className="border-white/5 my-8" />

                  {/* DUEL STATISTICS GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    {/* Stat Side 1 */}
                    <div className="space-y-6 md:border-r md:border-white/5 md:pr-8">
                      <div className="flex justify-between items-center text-left">
                        <div>
                          <span className="font-serif text-3xl font-extrabold text-white tracking-tight">{compLeft.name}</span>
                          <span className="block font-mono text-[7px] text-zinc-500 uppercase tracking-widest">{compLeft.motto}</span>
                        </div>
                        <span className="font-mono text-xl text-[#D4AF37] font-black">
                          {Array.from({ length: compLeft.titlesCount }).map(() => '★').join('')}
                        </span>
                      </div>

                      <div className="space-y-4 font-mono text-xs">
                        {/* Title Row */}
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-zinc-500 uppercase tracking-wider text-[9px]">WORLD CHAMPIONS</span>
                          <span className="text-white font-bold">{compLeft.titlesCount} Times</span>
                        </div>
                        {/* Appearances */}
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-zinc-500 uppercase tracking-wider text-[9px]">GLOBAL EXPEDITIONS</span>
                          <span className="text-white font-bold">{compLeft.appearancesCount} Stages</span>
                        </div>
                        {/* Core Philosophy */}
                        <div className="space-y-1">
                          <span className="text-zinc-500 uppercase tracking-wider text-[9px]">SENSE OF CIVILIZATION:</span>
                          <p className="text-[11px] text-zinc-400 font-sans italic leading-relaxed capitalize">
                            {compLeft.spirit}
                          </p>
                        </div>
                        {/* Golden era milestone */}
                        <div className="space-y-1 pt-2">
                          <span className="text-zinc-500 uppercase tracking-wider text-[9px]">PEAK REGIME:</span>
                          <p className="text-[11px] text-white font-serif leading-relaxed">
                            {compLeft.goldenEraTitle}
                          </p>
                        </div>
                        {/* Headliner Legend */}
                        <div className="space-y-1 pt-2">
                          <span className="text-zinc-500 uppercase tracking-wider text-[9px]">NATIONAL TREASURE:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#D4AF37] font-semibold">{compLeft.legends[0]?.name}</span>
                            <span className="text-[8px] text-zinc-500 font-mono">({compLeft.legends[0]?.years})</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stat Side 2 */}
                    <div className="space-y-6">
                      <div className="flex justify-between items-center text-left">
                        <div>
                          <span className="font-serif text-3xl font-extrabold text-white tracking-tight">{compRight.name}</span>
                          <span className="block font-mono text-[7px] text-zinc-500 uppercase tracking-widest">{compRight.motto}</span>
                        </div>
                        <span className="font-mono text-xl text-[#D4AF37] font-black">
                          {Array.from({ length: compRight.titlesCount }).map(() => '★').join('')}
                        </span>
                      </div>

                      <div className="space-y-4 font-mono text-xs">
                        {/* Title Row */}
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-zinc-500 uppercase tracking-wider text-[9px]">WORLD CHAMPIONS</span>
                          <span className="text-white font-bold">{compRight.titlesCount} Times</span>
                        </div>
                        {/* Appearances */}
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-zinc-500 uppercase tracking-wider text-[9px]">GLOBAL EXPEDITIONS</span>
                          <span className="text-white font-bold">{compRight.appearancesCount} Stages</span>
                        </div>
                        {/* Core Philosophy */}
                        <div className="space-y-1">
                          <span className="text-zinc-500 uppercase tracking-wider text-[9px]">SENSE OF CIVILIZATION:</span>
                          <p className="text-[11px] text-zinc-400 font-sans italic leading-relaxed capitalize">
                            {compRight.spirit}
                          </p>
                        </div>
                        {/* Golden era milestone */}
                        <div className="space-y-1 pt-2">
                          <span className="text-zinc-500 uppercase tracking-wider text-[9px]">PEAK REGIME:</span>
                          <p className="text-[11px] text-white font-serif leading-relaxed">
                            {compRight.goldenEraTitle}
                          </p>
                        </div>
                        {/* Headliner Legend */}
                        <div className="space-y-1 pt-2">
                          <span className="text-zinc-500 uppercase tracking-wider text-[9px]">NATIONAL TREASURE:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#D4AF37] font-semibold">{compRight.legends[0]?.name}</span>
                            <span className="text-[8px] text-zinc-500 font-mono">({compRight.legends[0]?.years})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DUEL COGNITIVE EVALUATION ANALYSIS */}
                  <div className="mt-8 border border-zinc-900 bg-neutral-900/40 p-6 rounded-none space-y-3">
                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#D4AF37] tracking-wider uppercase font-bold">
                      <Tv size={12} /> DALLAS-FORTUNE COGNITIVE HISTORICAL EVALUATION MODEL
                    </div>
                    <p className="font-serif italic text-xs text-neutral-300 leading-relaxed">
                      "A clash of football civilizations. {compLeft.name} ({compLeft.spirit.slice(0, 30)}...) locks shields with {compRight.name} ({compRight.spirit.slice(0, 30)}...). While {compLeft.name} peaked in {compLeft.goldenEraTitle.match(/\d+-\d+/)?.[0] || 'history'}, {compRight.name} counters with the unyielding strength of {compRight.goldenEraTitle.match(/\d+-\d+/)?.[0] || 'their record days'}. A duel that lives eternally in the tactical archives."
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            /* --- IMMERSIVE FOOTBALL CIVILIZATION DOSSIER VIEW --- */
            <motion.div
              key={`dossier-view-${selectedNation.id}`}
              className="space-y-16"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: 'spring', damping: 30 }}
            >
              {/* Back Button to explorer portal */}
              <button 
                onClick={handleBackToAtlas}
                className="group flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-widest text-[#D4AF37] border border-zinc-800 hover:border-[#D4AF37]/50 px-4 py-2 hover:bg-[#D4AF37]/10 transition-all rounded-sm cursor-pointer"
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Back to Cartography Atlas
              </button>

              {/* Dynamic Styled Canvas Header based on Nation Identity */}
              <div 
                className="relative overflow-hidden p-8 md:p-16 border rounded-sm"
                style={{
                  background: `linear-gradient(135deg, ${selectedNation.bgColor} 0%, #050505 100%)`,
                  borderColor: `${selectedNation.accentColor}35`,
                  boxShadow: `0 0 60px ${selectedNation.accentColor}0e`
                }}
              >
                {/* Decorative glowing nation emblem accent lines */}
                <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.06] pointer-events-none" style={{ background: `radial-gradient(circle, ${selectedNation.accentColor} 0%, transparent 70%)` }} />

                <div className="relative z-10 space-y-6">
                  {/* CHAPTER 1: IDENTITY REVEAL */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[9px] tracking-[0.3em] uppercase opacity-70" style={{ color: selectedNation.accentColor }}>CHAPTER I — IDENTITY DECREE</span>
                      <div className="h-px w-12 opacity-50" style={{ backgroundColor: selectedNation.accentColor }} />
                    </div>
                    <div className="flex flex-wrap items-baseline gap-4">
                      <h1 className="font-serif text-5xl md:text-8xl font-black tracking-tight text-white uppercase">{selectedNation.name}</h1>
                      <div className="font-sans text-xs md:text-md uppercase tracking-[0.25em] font-medium" style={{ color: selectedNation.accentColor }}>
                        {Array.from({ length: selectedNation.titlesCount }).map(() => '★').join(' ')}
                      </div>
                    </div>
                    <p className="font-mono text-sm md:text-lg italic tracking-widest text-[#A3AAB2] uppercase border-b border-white/5 pb-4">
                      {selectedNation.motto}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
                    <div className="md:col-span-8 space-y-4">
                      <p className="font-mono text-[9px] tracking-widest uppercase opacity-45">TERRESTRIAL SPIRIT CHRONICLE</p>
                      <p className="font-serif text-lg md:text-xl leading-relaxed text-zinc-100">
                        {selectedNation.story}
                      </p>
                    </div>

                    <div className="md:col-span-4 grid grid-cols-2 gap-4 bg-black/40 border border-white/5 p-6 text-center">
                      <div className="space-y-1">
                        <div className="font-serif text-3xl font-extrabold text-white">{selectedNation.titlesCount}</div>
                        <div className="font-mono text-[7.5px] text-zinc-500 uppercase tracking-widest">WORLD GOLD</div>
                      </div>
                      <div className="space-y-1">
                        <div className="font-serif text-3xl font-extrabold text-white">{selectedNation.appearancesCount}</div>
                        <div className="font-mono text-[7.5px] text-zinc-500 uppercase tracking-widest">APPEARANCES</div>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-white/5">
                        <div className="font-mono text-[8px] text-zinc-400 tracking-wider uppercase">CORE SPIRIT VIBE</div>
                        <div className="font-sans text-[11px] font-bold mt-1 text-white leading-relaxed capitalize">{selectedNation.spirit}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CHAPTER 2: NATION TIMELINE JOURNEY */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase font-bold">CHAPTER II — WORLD CUP JOURNEY</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                
                <p className="font-sans text-xs text-zinc-500 uppercase tracking-wider max-w-xl">
                  Decades of glory. Click a historical milestone to unlock the squad rosters, defining stories, and legendary narratives.
                </p>

                {/* Horizontal touch/scroll milestones tracker */}
                <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x select-none">
                  {selectedNation.timeline.map((mile) => {
                    const isExpanded = expandedMilestoneYear === mile.year;
                    return (
                      <div 
                        key={`milestone-step-${mile.year}`}
                        className={`flex-shrink-0 w-64 p-6 border snap-center transition-all duration-300 rounded-sm cursor-pointer ${
                          isExpanded 
                            ? 'bg-neutral-950/90 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.05)]' 
                            : 'bg-black/30 border-zinc-900 hover:border-zinc-700'
                        }`}
                        onClick={() => {
                          playSound('gear-tick');
                          setExpandedMilestoneYear(mile.year === expandedMilestoneYear ? null : mile.year);
                        }}
                      >
                        <div className="flex justify-between items-baseline mb-2">
                          <span className="font-serif text-3xl font-extrabold text-white">{mile.year}</span>
                          <span className="font-mono text-[9px] px-2 py-0.5 bg-neutral-900 border border-white/5 uppercase font-bold tracking-widest text-[#D4AF37]">
                            {mile.result}
                          </span>
                        </div>
                        <div className="font-mono text-[8px] text-zinc-500 tracking-widest uppercase mb-4 leading-normal line-clamp-1">
                          HELM: {mile.players.join(' • ')}
                        </div>
                        
                        <p className="font-serif text-xs text-neutral-200 line-clamp-3 leading-relaxed mb-3">
                          "{mile.moment}"
                        </p>

                        <div className="flex items-center justify-between text-[10px] font-mono hover:text-[#D4AF37] transition-colors mt-auto">
                          <span>{isExpanded ? 'HARVESTED LOGS' : 'EXPAND CHRONICLE'}</span>
                          <span className="text-xs">{isExpanded ? '▲' : '▼'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Milestone Expanded Detail Box */}
                <AnimatePresence mode="wait">
                  {expandedMilestoneYear && (() => {
                    const activeMile = selectedNation.timeline.find(t => t.year === expandedMilestoneYear);
                    if (!activeMile) return null;
                    return (
                      <motion.div
                        key={`expanded-mile-box-${activeMile.year}`}
                        className="p-6 border border-zinc-900 bg-neutral-950 relative rounded-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <div className="absolute top-0 right-6 translate-y-[-50%] bg-[#070707] border border-zinc-900 px-3 py-0.5 font-mono text-[8px] tracking-[0.2em] text-[#D4AF37] uppercase font-bold">
                          RECONSTRUCTED ARCHIVE SYSTEM
                        </div>
                        <div className="space-y-4">
                          <div className="flex flex-wrap items-baseline gap-3">
                            <span className="font-serif text-2xl font-bold text-white">The Expedition of {activeMile.year}</span>
                            <span className="font-mono text-xs text-[#D4AF37]">Result: {activeMile.result}</span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="md:col-span-3 space-y-2">
                              <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">TACTICAL REPORT SUMMARY</p>
                              <p className="font-serif text-sm leading-relaxed text-zinc-300">
                                {activeMile.story}
                              </p>
                            </div>
                            <div className="bg-black/40 border border-white/5 p-4 rounded-none h-fit">
                              <span className="block font-mono text-[8.5px] text-zinc-500 uppercase tracking-wider mb-2">PROMINENT HEROES</span>
                              <div className="space-y-1">
                                {activeMile.players.map((p, i) => (
                                  <div key={`p-list-${i}`} className="font-mono text-xs text-[#F5F2EA] flex items-center gap-1.5">
                                    <span className="text-[#D4AF37]">✦</span> {p}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>

              {/* CHAPTER 3 & CHAPTER 4 BLOCK: GOLDEN ERA & LEGENDS */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* CHAPTER 3: GOLDEN ERA (Left 5 cols) */}
                <div className="md:col-span-5 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase font-bold">CHAPTER III — GOLDEN ERA</span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  
                  <div className="border border-zinc-900 bg-neutral-950/60 p-6 md:p-8 space-y-4 h-full flex flex-col justify-center rounded-sm">
                    <History className="text-[#D4AF37]" size={24} />
                    <h3 className="font-serif text-2xl font-black text-white tracking-tight">
                      {selectedNation.goldenEraTitle}
                    </h3>
                    <div className="h-px w-16 opacity-30" style={{ backgroundColor: selectedNation.accentColor }} />
                    <p className="font-serif text-sm leading-relaxed text-[#A3AAB2]">
                      {selectedNation.goldenEraStory}
                    </p>
                  </div>
                </div>

                {/* CHAPTER 4: LEGENDARY PLAYERS (Right 7 cols) */}
                <div className="md:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase font-bold">CHAPTER IV — FEAURED NATIONAL TREASURES</span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                    {selectedNation.legends.map((legend, id) => (
                      <div 
                        key={`treasure-${id}`}
                        className="group border border-zinc-900 bg-black/40 hover:border-[#D4AF37]/50 p-6 flex flex-col justify-between rounded-sm relative transition-all duration-300"
                      >
                        <div className="space-y-4">
                          {/* Image Placeholder Frame */}
                          <div className="w-full aspect-[4/3] overflow-hidden border border-zinc-900 rounded-sm relative">
                            <VerifiedImage 
                              src={legend.image} 
                              alt={`${legend.name} (National Treasure)`} 
                              className="w-full h-full"
                              aspectRatio="auto"
                              tournament={selectedNation.name}
                              date={legend.years}
                              context={legend.myth}
                              eraStyle="retro"
                            />
                          </div>

                          <div className="space-y-1">
                            <h4 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">{legend.name}</h4>
                            <div className="flex items-center justify-between text-zinc-500 font-mono text-[8px] tracking-widest uppercase">
                              <span>{legend.role}</span>
                              <span className="text-[#D4AF37]">{legend.years}</span>
                            </div>
                          </div>

                          <p className="font-serif text-xs text-zinc-400 leading-relaxed italic">
                            "{legend.myth}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CHAPTER 5 & CHAPTER 6 BLOCK: MATCHES & STORIES */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* CHAPTER 5: GREATEST MATCHES (Left 7 cols) */}
                <div className="md:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase font-bold">CHAPTER V — PRESERVED MATCH ARTIFACTS</span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>

                  <div className="space-y-4">
                    {selectedNation.matches.map((match, id) => (
                      <div 
                        key={`artifact-match-${id}`}
                        className="border border-zinc-900 bg-neutral-950/70 p-5 rounded-none flex items-center justify-between relative"
                      >
                        {/* Battle Outcome Accent Indicator */}
                        <div 
                          className="absolute left-0 top-0 bottom-0 w-1" 
                          style={{ 
                            backgroundColor: match.type === 'victory' ? '#22c55e' : match.type === 'defeat' ? '#ef4444' : '#eab308' 
                          }} 
                        />
                        
                        <div className="pl-4 space-y-1 flex-1">
                          <span className="font-mono text-[8px] text-[#D4AF37] tracking-[0.2em] uppercase font-black">
                            {match.type === 'victory' ? 'HISTORICAL CONQUEST' : match.type === 'defeat' ? 'CELESTIAL TRAGEDY' : 'CLASSIC EPIC'}
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span className="font-serif text-lg font-bold text-white">vs {match.opponent} ({match.year})</span>
                            <span className="font-mono text-xs text-neutral-400 font-bold">{match.score}</span>
                          </div>
                          <p className="font-serif text-xs text-zinc-400 leading-relaxed max-w-xl">
                            {match.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CHAPTER 6: STORYTELLING RECORDS (Right 5 cols) */}
                <div className="md:col-span-5 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase font-bold">CHAPTER VI — NATIONAL RECORDS DEPOSITS</span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {selectedNation.records.map((rec, id) => (
                      <div 
                        key={`rec-item-${id}`}
                        className="group border border-zinc-900 bg-black/40 hover:border-[#D4AF37]/30 p-5 rounded-sm transition-all"
                      >
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="font-serif text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">{rec.title}</h4>
                          <span className="font-mono text-[#D4AF37] font-black text-lg">{rec.value}</span>
                        </div>
                        <p className="font-serif text-xs text-zinc-500 leading-relaxed">
                          {rec.story}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SIGNATURE FEATURE: THE DYNASTY METER (POWER OVER DECADES) */}
              <div className="space-y-6 border border-zinc-900 bg-zinc-950 p-6 md:p-10 relative rounded-sm">
                <div className="absolute top-0 left-6 translate-y-[-50%] bg-[#070707] border border-zinc-900 px-3 py-0.5 font-mono text-[8px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold">
                  SIGNATURE SYSTEM — DYNASTY POWER METER
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                      <Award className="text-[#D4AF37]" size={18} /> The Power Matrix (1930 - 2022)
                    </h3>
                    <p className="font-sans text-xs text-zinc-400">
                      Observe how {selectedNation.name}’s relative national force and tactical energy expanded across history. Select years to view era rosters.
                    </p>
                  </div>
                  
                  {currentFocusedDynastyLevel && (
                    <div className="bg-[#070707] border border-zinc-800 p-3 flex gap-4 min-w-[200px] hover:border-[#D4AF37]/50 transition-colors">
                      <div className="font-serif text-3xl font-black text-[#D4AF37] leading-none self-center">
                        {currentFocusedDynastyLevel.level}%
                      </div>
                      <div className="text-left">
                        <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest block font-bold">ERA POWER CAP</span>
                        <span className="font-serif text-xs font-bold text-white block">{focusedDynastyYear} Timeline</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Vertical/Horizontal interactive bar graph of Dynasty */}
                <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-3 items-end pt-4 min-h-[140px] border-b border-white/5 pb-6">
                  {selectedNation.dynastyLevels.map((d) => {
                    const isFocused = d.year === focusedDynastyYear;
                    return (
                      <div 
                        key={`dynasty-bar-${d.year}`}
                        className="flex flex-col gap-2 items-center cursor-pointer group w-full"
                        onClick={() => {
                          playSound('gear-tick');
                          setFocusedDynastyYear(d.year);
                        }}
                      >
                        {/* Numerical value on hover / focus */}
                        <span className={`font-mono text-[9px] transition-all ${
                          isFocused ? 'text-[#D4AF37] font-black scale-110' : 'text-zinc-600 group-hover:text-neutral-400'
                        }`}>
                          {d.level}%
                        </span>

                        {/* Bar Segment */}
                        <div className="w-full bg-neutral-900 h-28 border border-white/5 relative p-[1px] rounded-sm">
                          <motion.div 
                            className="absolute bottom-0 inset-x-0 transition-colors duration-300"
                            style={{ 
                              height: `${d.level}%`,
                              background: isFocused 
                                ? `linear-gradient(to top, ${selectedNation.secondaryColor} 0%, ${selectedNation.accentColor} 100%)` 
                                : 'linear-gradient(to top, #1c1c1c 0%, #3e3e3e 100%)',
                              boxShadow: isFocused ? `0 0 10px ${selectedNation.accentColor}2c` : 'none'
                            }}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            originY={1}
                          />
                        </div>

                        {/* Legislative Label */}
                        <span className={`font-mono text-[9.5px] transition-all tracking-wider ${
                          isFocused ? 'text-[#D4AF37] font-black' : 'text-zinc-500 group-hover:text-neutral-300'
                        }`}>
                          {d.year}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Dynasty Era focus details */}
                {focusedDynastyYear && currentFocusedTimelineMilestone && (
                  <div className="bg-[#070707] border border-zinc-900 p-6 md:grid md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-8 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-0.5 border border-zinc-800 font-mono text-[7px] text-[#A3AAB2] tracking-widest uppercase">HISTORICAL SNAPSHOT REGISTRATION</div>
                        <span className="font-mono text-xs text-neutral-500">{focusedDynastyYear} World Cup Vault</span>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-white">The Expedition Moment: "{currentFocusedTimelineMilestone.moment}"</h4>
                      <p className="font-serif text-xs text-[#A3AAB2] leading-relaxed">
                        {currentFocusedTimelineMilestone.story}
                      </p>
                    </div>

                    <div className="md:col-span-4 mt-4 md:mt-0 bg-neutral-950 p-4 border border-zinc-900 rounded-none h-fit">
                      <span className="block font-mono text-[8px] text-zinc-500 tracking-wider uppercase mb-1.5">HISTORIC EXPEDITIONS TEAM KEY</span>
                      <p className="font-mono text-[10px] text-zinc-400 italic">
                        {currentFocusedTimelineMilestone.players.join(' • ')}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* INTERACTIVE RIVALRY THEATRE */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase font-bold">CHAPTER VII — SIGNATURE RIVALRY THEATRE</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-4">
                  {/* Left Column: Rivals listing */}
                  <div className="md:col-span-4 space-y-4 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <h3 className="font-serif text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                        <Zap className="text-[#D4AF37]" size={16} /> Legendary Duels
                      </h3>
                      <p className="font-sans text-xs text-zinc-500">
                        Explore generations of dramatic disputes and historical border wars for the throne of football.
                      </p>
                    </div>

                    <div className="space-y-3 pt-4">
                      {selectedNation.rivalries.map((riv, id) => (
                        <div 
                          key={`riv-card-${id}`}
                          onClick={() => { playSound('clash'); setActiveRivalryIndex(id); }}
                          className={`p-4 border rounded-none cursor-pointer transition-all ${
                            activeRivalryIndex === id 
                              ? 'bg-neutral-950 border-[#D4AF37]' 
                              : 'bg-black/30 border-zinc-900 hover:border-zinc-800'
                          }`}
                        >
                          <div className="flex justify-between items-baseline mb-1">
                            <span className="font-serif text-sm font-semibold text-white">vs {riv.rivalName}</span>
                            <span className="font-mono text-[8px] text-[#D4AF37] tracking-widest font-black uppercase">{riv.decadesCount}</span>
                          </div>
                          <span className="block font-mono text-[8.5px] text-zinc-500 tracking-wider uppercase">{riv.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Active Duel Details Theater Screen */}
                  <div className="md:col-span-8 border border-zinc-900 bg-zinc-950/40 p-6 md:p-8 flex flex-col justify-center rounded-sm">
                    {selectedNation.rivalries[activeRivalryIndex] && (() => {
                      const riv = selectedNation.rivalries[activeRivalryIndex];
                      return (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[8px] text-[#D4AF37] tracking-[0.25em] uppercase font-bold px-2 py-0.5 border border-[#D4AF37]/35 rounded-[2px]">ACTIVE RIVALRY ARCHIVE</span>
                            <span className="font-mono text-[9px] text-[#A3AAB2] uppercase">DECIMAL FACTOR: {riv.decadesCount}</span>
                          </div>

                          <h4 className="font-serif text-2xl font-black text-white tracking-tight">{riv.title}</h4>
                          <div className="h-px w-24 bg-white/10" />

                          <p className="font-serif text-sm leading-relaxed text-zinc-300">
                            {riv.story}
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* CONTINUE EXPLORING SYSTEM */}
              <div className="mt-12">
                <ContinueExploringSystem 
                  currentItemType="nation"
                  currentItemId={selectedNation.id}
                  onExploreMatches={onExploreMatches}
                  onExploreNations={onExploreNations}
                  onExploreLegends={onExploreLegends}
                  onExploreStadiums={onExploreStadiums}
                  onExploreTournament={onExploreTournament}
                />
              </div>

              {/* End Screen prompt quote */}
              <div className="text-center py-12 border-t border-white/5 space-y-3">
                <p className="font-serif italic text-sm text-[#A3AAB2]">
                  "You didn't browse a country's statistics. You experienced its football history."
                </p>
                <div className="flex justify-center gap-1.5 font-mono text-[8px] text-[#D4AF37] tracking-widest uppercase">
                  <span>HISTORICAL REGISTRY SECTOR</span> • <span>WORLD CUP VAULT</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
