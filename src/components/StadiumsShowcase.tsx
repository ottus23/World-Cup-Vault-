import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Compass, 
  Map, 
  Globe, 
  ArrowLeft, 
  Award, 
  ChevronRight, 
  Volume2, 
  BookOpen, 
  Sparkles, 
  Clock, 
  Check, 
  SlidersHorizontal,
  LayoutGrid
} from 'lucide-react';
import { stadiumsData, Stadium, HistoricMatch, DefiningMoment, EchoEvent } from '../stadiumsData';

interface StadiumsShowcaseProps {
  onClose: () => void;
  initialStadiumId?: string;
}

export function StadiumsShowcase({ onClose, initialStadiumId }: StadiumsShowcaseProps) {
  // Navigation states
  const [showIntroduction, setShowIntroduction] = useState<boolean>(!initialStadiumId);
  const [selectedStadiumId, setSelectedStadiumId] = useState<string | null>(initialStadiumId || null);

  useEffect(() => {
    if (initialStadiumId) {
      setSelectedStadiumId(initialStadiumId);
      setShowIntroduction(false);
    }
  }, [initialStadiumId]);
  const [viewMode, setViewMode] = useState<'map' | 'grid'>('map');

  // Filter states
  const [filterYear, setFilterYear] = useState<string>('all');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [filterImportance, setFilterImportance] = useState<string>('all');
  const [hoveredStadiumId, setHoveredStadiumId] = useState<string | null>(null);

  // Progressive image loading tracker
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  // Select a stadium
  const selectedStadium = useMemo(() => {
    if (!selectedStadiumId) return null;
    return stadiumsData.find(s => s.id === selectedStadiumId) || null;
  }, [selectedStadiumId]);

  // Unique lists for dropdowns
  const availableYears = useMemo(() => {
    const yearsSet = new Set<number>();
    stadiumsData.forEach(s => s.appearances.forEach(yr => yearsSet.add(yr)));
    return Array.from(yearsSet).sort((a, b) => a - b);
  }, []);

  const availableCountries = useMemo(() => {
    const countriesSet = new Set<string>();
    stadiumsData.forEach(s => countriesSet.add(s.country));
    return Array.from(countriesSet).sort();
  }, []);

  // Filtered dataset
  const filteredStadiums = useMemo(() => {
    return stadiumsData.filter(stadium => {
      // Filter by Tournament Year
      if (filterYear !== 'all') {
        const yr = parseInt(filterYear, 10);
        if (!stadium.appearances.includes(yr)) return false;
      }
      // Filter by Host Nation
      if (filterCountry !== 'all' && stadium.country !== filterCountry) {
        return false;
      }
      // Filter by Importance
      if (filterImportance !== 'all') {
        if (filterImportance === 'finals' && stadium.historicalImportance !== 'finals') return false;
        if (filterImportance === 'legends' && stadium.historicalImportance !== 'legends') return false;
        if (filterImportance === 'attendance' && stadium.historicalImportance !== 'attendance') return false;
        if (filterImportance === 'drama' && stadium.historicalImportance !== 'drama') return false;
      }
      return true;
    });
  }, [filterYear, filterCountry, filterImportance]);

  // Handle auto scrolling down to active exhibits inside selected view
  const activeDetailRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selectedStadiumId && activeDetailRef.current) {
      activeDetailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedStadiumId]);

  return (
    <motion.div 
      className="fixed inset-0 z-[500] bg-[#070707] text-[#F5F2EA] flex flex-col overflow-y-auto font-sans selection:bg-[#D4AF37] selection:text-[#070707]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      id="stadiums_vault_experience_root"
    >
      {/* BACKGROUND GRAPHIC FILTERS AND MUSIC-BOX AMBIENCE ELEMENTS */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.06),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(7,7,7,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(7,7,7,0.4)_1px,transparent_1px)] bg-[size:32px_32px] opacity-15 pointer-events-none" />

      {/* STICKY ARCHIVAL REGULATION HEADER */}
      <header className="sticky top-0 z-50 bg-[#070707]/95 backdrop-blur-md px-4 sm:px-8 py-4 border-b border-[#4E5661]/20 flex justify-between items-center">
        <button 
          onClick={onClose} 
          className="text-[#69707A] hover:text-[#F5F2EA] transition-all flex items-center gap-2 group cursor-pointer text-xs uppercase tracking-widest font-semibold"
          id="stadiums_close_vault_button"
        >
          <X size={18} className="group-hover:rotate-90 transition-transform duration-300 text-[#D4AF37]" />
          <span>Exit Vault Archive</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="font-serif text-sm tracking-widest text-[#D4AF37] font-medium uppercase">
            STADIUMS VAULT EXHIBIT
          </span>
        </div>
      </header>

      {/* SCREEN ONE: ENTRY EXPERIENCE - THE HALL OF STADIUMS */}
      <AnimatePresence>
        {showIntroduction ? (
          <motion.div 
            key="intro_hall_experience"
            className="flex-1 flex flex-col justify-center items-center px-6 relative py-12"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8 }}
            id="stadiums_hall_intro_screen"
          >
            {/* Monumental background silhouette effect */}
            <div className="absolute inset-0 flex justify-center items-center opacity-[0.04] pointer-events-none overflow-hidden select-none">
              <Compass size={600} className="stroke-[#F5F2EA] stroke-[0.3]" />
            </div>

            <div className="max-w-4xl text-center space-y-12 relative z-10 my-auto">
              {/* Cinematic Quote */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="space-y-4"
              >
                <div className="text-[10px] md:text-xs text-[#D4AF37] tracking-[0.4em] uppercase font-mono">
                  ARCHIVAL OPENING STATEMENT
                </div>
                <blockquote className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F5F2EA] leading-tight italic tracking-tight font-extralight px-4">
                  «Some stadiums host matches.
                  <br />
                  <span className="text-[#D4AF37] font-normal not-italic tracking-wide mt-2 block">
                    Others host history.»
                  </span>
                </blockquote>
              </motion.div>

              {/* Decorative Line Spacer */}
              <motion.div 
                className="flex items-center justify-center gap-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#D4AF37]/55" />
                <div className="p-1 border border-[#D4AF37]/35 rounded-full">
                  <Globe size={14} className="text-[#D4AF37]" />
                </div>
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#D4AF37]/55" />
              </motion.div>

              {/* Majestic Headers */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-widest text-shadow-sm font-bold uppercase text-white">
                  STADIUMS VAULT
                </h1>
                <p className="font-sans text-[#69707A] text-sm sm:text-lg max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
                  Enter a hallowed collection of ten football cathedrals. Explore the architectural wonders, legendary moments and decades of history written on their hallowed turf.
                </p>
              </motion.div>

              {/* Begin Exploration Trigger */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="pt-6"
              >
                <button
                  onClick={() => setShowIntroduction(false)}
                  className="px-8 py-4 bg-transparent border-2 border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#070707] text-[#D4AF37] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer shadow-[0_0_25px_rgba(212,175,55,0.15)] flex items-center gap-3 mx-auto"
                  id="stadiums_begin_discovery_btn"
                >
                  <span>Unseal Stadium Atlas</span>
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            </div>

            {/* Vintage bottom frame lines */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-[#69707A] text-[9px] font-mono tracking-widest uppercase">
              <span>MUSEUM ARCHIVES // PART VII</span>
              <span className="h-px flex-1 mx-4 bg-[#4E5661]/10" />
              <span>EST. 1930 - 2026</span>
            </div>
          </motion.div>
        ) : (
          /* WORKSPACE MAIN EXPOSURE PANEL */
          <motion.div
            key="atlas_discovery_hall"
            className="flex-1 flex flex-col justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            id="stadiums_main_exploration_panel"
          >
            {/* SUB-HEADER WITH INTERACTIVE MAP SWITCHERS & BACK OPTION */}
            <div className="bg-[#0b0b0b]/60 border-b border-[#4E5661]/15 px-4 sm:px-8 py-3 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <button
                onClick={() => setShowIntroduction(true)}
                className="text-xs text-[#69707A] hover:text-[#D4AF37] flex items-center gap-2 group transition-all"
                id="stadiums_back_to_intro_btn"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>Return to Entrance</span>
              </button>

              {/* View Selector Controls */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#69707A]">DISPLAY FORM:</span>
                <div className="flex bg-[#121212] border border-[#4E5661]/20 p-1 rounded-sm gap-1 w-full sm:w-auto">
                  <button
                    onClick={() => setViewMode('map')}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer rounded-sm ${viewMode === 'map' ? 'bg-[#D4AF37] text-[#070707]' : 'text-[#69707A] hover:text-[#F5F2EA]'}`}
                    id="stadiums_toggle_map_view"
                  >
                    <Map size={14} />
                    <span>Stadium Atlas</span>
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer rounded-sm ${viewMode === 'grid' ? 'bg-[#D4AF37] text-[#070707]' : 'text-[#69707A] hover:text-[#F5F2EA]'}`}
                    id="stadiums_toggle_grid_view"
                  >
                    <LayoutGrid size={14} />
                    <span>Visual Catalog</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SELECTION TWO: THE FILTER BAR GRID */}
            <div className="bg-[#090909] py-6 px-4 sm:px-8 border-b border-[#4E5661]/15">
              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl text-white tracking-wide">
                    The World Cup Arena Vault
                  </h2>
                  <p className="text-xs text-[#69707A] font-light mt-1">
                    Isolate stadiums by host tournament, country of origin, or historical priority to unseal archives.
                  </p>
                </div>

                {/* Filter Selector Selectors */}
                <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                  {/* Years select */}
                  <div className="flex flex-col gap-1 flex-1 sm:flex-initial min-w-[130px]">
                    <label className="text-[9px] font-mono tracking-widest text-[#69707A] uppercase flex items-center gap-1.5">
                      <Clock size={10} className="text-[#D4AF37]" /> Tournament Year
                    </label>
                    <select
                      value={filterYear}
                      onChange={(e) => setFilterYear(e.target.value)}
                      className="bg-[#121212] border border-[#4E5661]/25 px-3 py-2 text-xs text-[#DDD7C8] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none rounded-sm"
                      id="stadiums_filter_year_select"
                    >
                      <option value="all">All Tournaments</option>
                      {availableYears.map(yr => (
                        <option key={yr} value={yr.toString()}>{yr}</option>
                      ))}
                    </select>
                  </div>

                  {/* Countries select */}
                  <div className="flex flex-col gap-1 flex-1 sm:flex-initial min-w-[130px]">
                    <label className="text-[9px] font-mono tracking-widest text-[#69707A] uppercase flex items-center gap-1.5">
                      <MapPin size={10} className="text-[#D4AF37]" /> Host Nation
                    </label>
                    <select
                      value={filterCountry}
                      onChange={(e) => setFilterCountry(e.target.value)}
                      className="bg-[#121212] border border-[#4E5661]/25 px-3 py-2 text-xs text-[#DDD7C8] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none rounded-sm"
                      id="stadiums_filter_country_select"
                    >
                      <option value="all">All Nations</option>
                      {availableCountries.map(ctr => (
                        <option key={ctr} value={ctr}>{ctr}</option>
                      ))}
                    </select>
                  </div>

                  {/* Importance select */}
                  <div className="flex flex-col gap-1 flex-1 sm:flex-initial min-w-[160px]">
                    <label className="text-[9px] font-mono tracking-widest text-[#69707A] uppercase flex items-center gap-1.5">
                      <Award size={10} className="text-[#D4AF37]" /> Historic Dimension
                    </label>
                    <select
                      value={filterImportance}
                      onChange={(e) => setFilterImportance(e.target.value)}
                      className="bg-[#121212] border border-[#4E5661]/25 px-3 py-2 text-xs text-[#DDD7C8] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none rounded-sm"
                      id="stadiums_filter_importance_select"
                    >
                      <option value="all">All Categories</option>
                      <option value="finals">Epic Final Hosts</option>
                      <option value="legends">Legends Coronas</option>
                      <option value="attendance">High Audience Peaks</option>
                      <option value="drama">High Structural Drama</option>
                    </select>
                  </div>

                  {/* Reset filters */}
                  {(filterYear !== 'all' || filterCountry !== 'all' || filterImportance !== 'all') && (
                    <button
                      onClick={() => {
                        setFilterYear('all');
                        setFilterCountry('all');
                        setFilterImportance('all');
                      }}
                      className="bg-[#161616] hover:bg-[#D4AF37]/10 hover:text-white border border-[#D4AF37]/30 text-xs text-[#D4AF37] px-4 py-2 transition-all self-end rounded-sm font-mono cursor-pointer"
                      id="stadiums_reset_filters_btn"
                    >
                      CLEAR FILTERS
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* SELECTION THREE: THE ATLAS VECTOR MAP OR IMAGERY CATALOG */}
            <div className="flex-1 bg-[#090909] relative flex flex-col justify-center min-h-[500px]">
              {viewMode === 'map' ? (
                /* INTERACTIVE 2D ART ATLAS DISPLAY */
                <div className="relative w-full max-w-7xl mx-auto px-4 py-8 flex-1 flex flex-col justify-center items-center overflow-hidden">
                  {/* Deco Vintage Corner Accents */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/30 pointer-events-none" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/30 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/30 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/30 pointer-events-none" />

                  {/* Header info indicator */}
                  <div className="text-center mb-4 relative z-10 w-full">
                    <p className="font-mono text-[9px] text-[#D4AF37] tracking-[0.3em] uppercase">
                      THE WORLD CUP HISTORICAL ATLAS
                    </p>
                    <p className="text-xs text-[#69707A] font-light mt-1">
                      Interact with the glowing gold anchors to launch archival journals of arenas.
                    </p>
                  </div>

                  {/* Stylized Illustrated World Outline Map container */}
                  <div className="relative w-full aspect-[21/10] bg-[#070707] border border-[#4E5661]/15 rounded-sm overflow-hidden flex items-center justify-center p-2 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
                    {/* Retro coordinate grid lines */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
                      {/* Generates latitude lines */}
                      <div className="absolute top-[10%] left-0 right-0 h-px bg-white" />
                      <div className="absolute top-[25%] left-0 right-0 h-px bg-white" />
                      <div className="absolute top-[40%] left-0 right-0 h-px bg-white" />
                      <div className="absolute top-[55%] left-0 right-0 h-px bg-white" />
                      <div className="absolute top-[70%] left-0 right-0 h-px bg-white" />
                      <div className="absolute top-[85%] left-0 right-0 h-px bg-white" />
                      {/* Generates longitude lines */}
                      <div className="absolute left-[15%] top-0 bottom-0 w-px bg-white" />
                      <div className="absolute left-[30%] top-0 bottom-0 w-px bg-white" />
                      <div className="absolute left-[45%] top-0 bottom-0 w-px bg-white" />
                      <div className="absolute left-[60%] top-0 bottom-0 w-px bg-white" />
                      <div className="absolute left-[75%] top-0 bottom-0 w-px bg-white" />
                      <div className="absolute left-[90%] top-0 bottom-0 w-px bg-white" />
                    </div>

                    {/* Highly aesthetic background vector world projection outline */}
                    <svg viewBox="0 0 1000 480" className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                      {/* North America */}
                      <path d="M50 100 C100 80, 200 110, 250 80 C270 50, 300 40, 320 20 C340 50, 380 40, 400 90 C320 120, 220 180, 150 200 C150 250, 180 260, 200 280 L180 290" fill="none" stroke="#F5F2EA" strokeWidth="2.5" />
                      <path d="M180 290 C190 300, 210 320, 220 340" fill="none" stroke="#F5F2EA" strokeWidth="2" strokeDasharray="3 3" />
                      {/* South America */}
                      <path d="M220 340 C240 330, 290 350, 320 370 C340 400, 310 440, 290 470 C280 470, 250 430, 240 390 Z" fill="none" stroke="#F5F2EA" strokeWidth="2.5" />
                      {/* Africa */}
                      <path d="M430 250 C450 230, 480 220, 500 230 C550 240, 580 275, 570 320 C560 360, 540 390, 510 410 C500 410, 485 365, 465 340 C435 320, 415 300, 430 250 Z" fill="none" stroke="#F5F2EA" strokeWidth="2.5" />
                      {/* Europe */}
                      <path d="M410 130 C450 110, 480 120, 520 150 L540 180 C500 210, 460 210, 410 180 Z" fill="none" stroke="#F5F2EA" strokeWidth="2.5" />
                      {/* Asia / Eurasia */}
                      <path d="M520 150 C580 120, 680 110, 780 120 C850 140, 890 200, 850 260 C800 260, 720 280, 680 290 C620 250, 580 230, 540 180 Z" fill="none" stroke="#F5F2EA" strokeWidth="2.5" />
                      {/* Japan / Islands / Oceania */}
                      <path d="M830 180 C840 160, 860 210, 850 230 Z" fill="none" stroke="#D4AF37" strokeWidth="2" />
                      <path d="M720 390 C780 380, 835 410, 860 440 L810 470" fill="none" stroke="#F5F2EA" strokeWidth="1.5" strokeDasharray="4 4" />
                    </svg>

                    {/* VINTAGE MAP ACCENT: Compass Rose */}
                    <div className="absolute top-[30%] right-[10%] opacity-30 select-none pointer-events-none hidden md:block">
                      <div className="relative w-20 h-20 border border-[#D4AF37]/25 rounded-full flex items-center justify-center animate-[spin_50s_linear_infinite]">
                        <Compass className="text-[#D4AF37]" size={36} />
                        <span className="absolute -top-3 font-mono text-[9px] text-[#D4AF37]">N</span>
                        <span className="absolute -bottom-3 font-mono text-[9px] text-[#D4AF37]">S</span>
                        <span className="absolute -right-3 font-mono text-[9px] text-[#D4AF37]">E</span>
                        <span className="absolute -left-3 font-mono text-[9px] text-[#D4AF37]">W</span>
                      </div>
                    </div>

                    {/* MAP SCALE INDICATOR */}
                    <div className="absolute bottom-4 left-6 opacity-35 text-[9px] font-mono hidden sm:block">
                      <div className="flex items-center gap-1">
                        <div className="w-6 h-1 w- bg-[#F5F2EA]" />
                        <div className="w-6 h-1 bg-transparent border-t border-[#F5F2EA]" />
                        <span>1:45,000,000 MERCATOR PROJECTION</span>
                      </div>
                    </div>

                    {/* RENDER DYNAMIC FILTERED GOLD RADIO PINS ON MAP */}
                    {filteredStadiums.map((stadium) => {
                      const isHovered = hoveredStadiumId === stadium.id || selectedStadiumId === stadium.id;
                      return (
                        <div
                          key={stadium.id}
                          className="absolute z-20"
                          style={{ left: `${stadium.mapX}%`, top: `${stadium.mapY}%` }}
                        >
                          {/* Pulsing Signal Wave */}
                          <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-[#D4AF37]/35 animate-ping pointer-events-none" />

                          {/* Interactive Pin Anchor */}
                          <button
                            onMouseEnter={() => setHoveredStadiumId(stadium.id)}
                            onMouseLeave={() => setHoveredStadiumId(null)}
                            onClick={() => setSelectedStadiumId(stadium.id)}
                            className={`relative focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-full p-2 block cursor-pointer transition-transform duration-300 ${isHovered ? 'scale-135' : 'scale-100'}`}
                            id={`stadium_pin_${stadium.id}`}
                            aria-label={`Select ${stadium.name}`}
                          >
                            <span className={`block w-2.5 h-2.5 rounded-full border border-[#070707] shadow-lg transition-colors duration-300 ${isHovered ? 'bg-white bg-radial:[#D4AF37]' : 'bg-[#D4AF37]'}`} />
                          </button>

                          {/* Float Card Popover when hovered */}
                          <AnimatePresence>
                            {hoveredStadiumId === stadium.id && (
                              <motion.div
                                className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#0c0c0c]/95 border border-[#D4AF37]/45 p-4 rounded-sm shadow-[0_15px_30px_rgba(0,0,0,0.9)] w-[240px] z-50 pointer-events-none"
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="space-y-2">
                                  <div className="relative h-20 overflow-hidden bg-[#161616] border border-[#4E5661]/15 leading-[0]">
                                    <img 
                                      src={stadium.image} 
                                      alt="" 
                                      className="w-full h-full object-cover filter grayscale"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
                                    <span className="absolute bottom-1 right-2 text-[8px] font-mono tracking-widest text-[#D4AF37] uppercase">
                                      {stadium.country}
                                    </span>
                                  </div>
                                  <div>
                                    <h4 className="font-serif text-sm text-white font-medium">{stadium.name}</h4>
                                    <p className="text-[10px] text-[#69707A] flex items-center gap-1">
                                      <MapPin size={10} className="text-[#D4AF37]" /> {stadium.city}
                                    </p>
                                  </div>
                                  <div className="h-px bg-[#4E5661]/15" />
                                  <div className="flex justify-between text-[9px] font-mono text-[#DDD7C8]">
                                    <span>CAPACITY:</span>
                                    <span className="text-[#D4AF37] font-semibold">{stadium.capacity}</span>
                                  </div>
                                  <p className="text-[10px] text-[#69707A] italic leading-tight">
                                    "{stadium.legacy}"
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}

                    {/* Zero results message inside map */}
                    {filteredStadiums.length === 0 && (
                      <div className="absolute inset-0 bg-[#070707]/90 z-30 flex items-center justify-center text-center p-6">
                        <div className="max-w-md space-y-3">
                          <Compass size={40} className="mx-auto text-[#69707A] animate-pulse" />
                          <h4 className="font-serif text-lg text-[#DDD7C8]">No Stadium Matches Criteria</h4>
                          <p className="text-xs text-[#69707A] leading-relaxed">
                            No architectural cathedrals were unsealed with this combination. Try modifying your filter settings.
                          </p>
                          <button
                            onClick={() => {
                              setFilterYear('all');
                              setFilterCountry('all');
                              setFilterImportance('all');
                            }}
                            className="px-4 py-2 bg-transparent border border-[#D4AF37] text-xs text-[#D4AF37] uppercase tracking-wider font-semibold hover:bg-[#D4AF37] hover:text-[#070707] transition-all cursor-pointer rounded-sm"
                            id="stadiums_map_no_results_reset"
                          >
                            Reset Filter Framework
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Filter Status Summary Tag */}
                  <div className="mt-4 text-xs font-mono text-[#69707A] flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                    <span>SECTOR STATUS:</span>
                    <span>ACTIVE MONUMENTS UNSEALED: <strong className="text-[#D4AF37]">{filteredStadiums.length} OF 10</strong></span>
                    {filterYear !== 'all' && <span>• TOURNAMENT: <strong className="text-white">{filterYear}</strong></span>}
                    {filterCountry !== 'all' && <span>• NATION: <strong className="text-white">{filterCountry}</strong></span>}
                    {filterImportance !== 'all' && <span>• THEME: <strong className="text-white">{filterImportance}</strong></span>}
                  </div>
                </div>
              ) : (
                /* ALTERNATE GRID VIEW FOR RESPONSIVE MEDIA LOAD */
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10" id="stadiums_grid_layout_view">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredStadiums.map((stadium) => (
                      <motion.div
                        key={stadium.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-[#0c0c0c] border border-[#4E5661]/15 overflow-hidden group hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between"
                        id={`stadium_grid_card_${stadium.id}`}
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#161616]">
                          {/* Image Loader */}
                          <img
                            src={stadium.image}
                            alt={stadium.name}
                            onLoad={() => handleImageLoad(stadium.id)}
                            className={`w-full h-full object-cover filter grayscale transition-transform duration-700 group-hover:scale-105 ${loadedImages[stadium.id] ? 'opacity-85' : 'opacity-0'}`}
                            referrerPolicy="no-referrer"
                          />
                          {!loadedImages[stadium.id] && (
                            <div className="absolute inset-0 bg-[#161616] flex items-center justify-center">
                              <span className="w-6 h-6 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-90" />
                          <span className="absolute bottom-3 left-4 font-mono text-[9px] text-[#D4AF37] uppercase tracking-widest border border-[#D4AF37]/25 px-2 py-0.5 bg-[#070707]/80">
                            {stadium.country}
                          </span>
                        </div>

                        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <h3 className="font-serif text-lg text-white font-medium group-hover:text-[#D4AF37] transition-colors leading-tight">
                                {stadium.name}
                              </h3>
                              <span className="font-mono text-[10px] text-[#69707A] tracking-wider whitespace-nowrap">
                                EST. {stadium.yearBuilt}
                              </span>
                            </div>
                            <p className="text-xs text-[#69707A] flex items-center gap-1">
                              <MapPin size={12} className="text-[#D4AF37]" /> {stadium.city}
                            </p>
                            <p className="text-xs text-[#DDD7C8]/80 line-clamp-3 font-light leading-relaxed">
                              {stadium.description}
                            </p>
                          </div>

                          <div className="space-y-4 pt-4 border-t border-[#4E5661]/15">
                            <div className="flex justify-between text-[11px] font-mono">
                              <span className="text-[#69707A]">CAPACITY:</span>
                              <span className="text-[#DDD7C8] font-bold">{stadium.capacity}</span>
                            </div>
                            <button
                              onClick={() => setSelectedStadiumId(stadium.id)}
                              className="w-full py-2 bg-transparent hover:bg-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-xs text-[#D4AF37] hover:text-[#070707] uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer flex items-center justify-center gap-1"
                            >
                              <span>Unseal Archive</span>
                              <ChevronRight size={12} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {filteredStadiums.length === 0 && (
                    <div className="text-center py-24 space-y-3">
                      <LayoutGrid size={44} className="mx-auto text-[#69707A] animate-pulse" />
                      <h4 className="font-serif text-xl text-[#DDD7C8]">No Stadiums Meet Filters</h4>
                      <button
                        onClick={() => {
                          setFilterYear('all');
                          setFilterCountry('all');
                          setFilterImportance('all');
                        }}
                        className="px-5 py-2 bg-transparent border border-[#D4AF37] text-xs text-[#D4AF37] uppercase tracking-wider font-semibold hover:bg-[#D4AF37] hover:text-[#070707] transition-all cursor-pointer rounded-sm"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SELECTION FOUR: THE IMMERSIVE STADIUM PAGE ARCHIVE (SHOWN BELOW WHEN SELECTED) */}
            <AnimatePresence>
              {selectedStadiumId && selectedStadium && (
                <div 
                  ref={activeDetailRef}
                  className="bg-[#070707] border-t-2 border-[#D4AF37]/45 text-[#F5F2EA] flex flex-col w-full relative z-30"
                  id={`immersive_museum_documentary_${selectedStadium.id}`}
                >
                  {/* FLOATING RETRACT CONTROLS */}
                  <div className="bg-[#0c0c0c] border-b border-[#4E5661]/15 px-4 sm:px-8 py-3 flex justify-between items-center sticky top-[53px] z-40">
                    <button
                      onClick={() => setSelectedStadiumId(null)}
                      className="text-xs text-[#D4AF37] hover:text-white transition-colors flex items-center gap-1.5 font-mono uppercase tracking-widest"
                      id="stadiums_back_to_atlas_bottom"
                    >
                      <ArrowLeft size={14} />
                      <span>Back to Atlas Selection</span>
                    </button>

                    <span className="font-mono text-[10px] text-[#69707A] tracking-wider uppercase hidden sm:inline">
                      EXPLORING ARCHIVE JOURNAL NO. {selectedStadium.yearBuilt}-{selectedStadium.id.slice(0, 3).toUpperCase()}
                    </span>
                  </div>

                  {/* THE VERTICAL INTEGRATED STADIUM DOCUMENTARY LAYOUT */}
                  <div className="w-full">
                    
                    {/* CHAPTER 1 — MONUMENT REVEAL */}
                    <section className="relative min-h-[90vh] flex flex-col justify-end overflow-hidden pb-12 pt-24 px-4 sm:px-8 md:px-16" id="stadium_chapter_monument_reveal">
                      {/* Dominant dynamic hero wallpaper container */}
                      <div className="absolute inset-0 bg-black z-0">
                        <img 
                          src={selectedStadium.image} 
                          alt={selectedStadium.name} 
                          className="w-full h-full object-cover filter grayscale contrast-[1.1] scale-102 animate-[pulse_10s_ease-in-out_infinite] opacity-70"
                          referrerPolicy="no-referrer"
                        />
                        {/* Immersive cinematic shadows overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/60 to-transparent" />
                        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#070707]/90 to-transparent" />
                      </div>

                      <div className="max-w-6xl w-full mx-auto relative z-10 space-y-8">
                        {/* Legacy Badge Label */}
                        <motion.div 
                          className="inline-block"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                        >
                          <span className="font-mono text-xs text-[#070707] bg-[#D4AF37] font-semibold tracking-[0.25em] uppercase px-4 py-1.5 shadow-[0_5px_15px_rgba(212,175,55,0.25)] rounded-sm">
                            {selectedStadium.legacy}
                          </span>
                        </motion.div>

                        {/* Large Monument Heading Block */}
                        <div className="space-y-4">
                          <motion.h2 
                            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white leading-[0.9] font-extrabold"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                          >
                            {selectedStadium.name}
                          </motion.h2>

                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm font-mono tracking-widest text-[#DDD7C8]/85">
                            <span className="flex items-center gap-1.5">
                              <MapPin size={16} className="text-[#D4AF37]" /> {selectedStadium.city}, {selectedStadium.country}
                            </span>
                            <span className="text-[#69707A] hidden sm:inline">•</span>
                            <span className="flex items-center gap-1.5">
                              <Compass size={16} className="text-[#D4AF37]" /> COORDINATES: {selectedStadium.latitude} / {selectedStadium.longitude}
                            </span>
                          </div>
                        </div>

                        {/* Primary Stat Pillar Blocks */}
                        <motion.div 
                          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#4E5661]/25"
                          initial={{ opacity: 0, y: 25 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3, duration: 0.8 }}
                        >
                          {/* Built year */}
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#69707A] uppercase block">ARCHITECTURAL PREMIERE</span>
                            <span className="font-serif text-2xl sm:text-3xl text-white font-bold block">{selectedStadium.yearBuilt}</span>
                            <span className="text-[10px] text-[#69707A] font-light">Original Construction</span>
                          </div>

                          {/* Capacity */}
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#69707A] uppercase block">CURRENT CAPACITY SEATS</span>
                            <span className="font-serif text-2xl sm:text-3xl text-[#D4AF37] font-bold block">{selectedStadium.capacity}</span>
                            <span className="text-[10px] text-[#69707A] font-light">All-Seated Configuration</span>
                          </div>

                          {/* World Cups */}
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#69707A] uppercase block">TOURNAMENT EDITIONS</span>
                            <span className="font-serif text-2xl sm:text-3xl text-white font-bold block">{selectedStadium.appearances.join(' & ')}</span>
                            <span className="text-[10px] text-[#69707A] font-light">World Cup Usage Years</span>
                          </div>

                          {/* Record Attendance */}
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#69707A] uppercase block">HISTORICAL AUDIENCE PEAK</span>
                            <span className="font-serif text-lg sm:text-xl text-white font-bold leading-tight block truncate" title={selectedStadium.recordAttendance}>
                              {selectedStadium.recordAttendance.split(' ')[0]}
                            </span>
                            <span className="text-[10px] text-[#69707A] font-light block truncate">{selectedStadium.recordAttendance.split(' ')[1] || 'Spectators Record'}</span>
                          </div>
                        </motion.div>
                      </div>
                    </section>


                    {/* CHAPTER 2 — ARCHITECTURAL IDENTITY */}
                    <section className="bg-[#090909] py-24 px-4 sm:px-8 md:px-16 border-t border-b border-[#4E5661]/15" id="stadium_chapter_architecture">
                      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 text-[#F5F2EA]">
                        
                        <div className="md:col-span-4 space-y-4">
                          <p className="font-mono text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">CHAPTER II</p>
                          <h3 className="font-serif text-3xl sm:text-4xl leading-tight font-medium text-white">
                            Architectural
                            <br />
                            Identity
                          </h3>
                          <div className="h-1 w-12 bg-[#D4AF37]" />
                          
                          {/* Side note compass decorative block */}
                          <div className="pt-6 text-xs text-[#69707A] font-mono uppercase space-y-2 hidden md:block">
                            <div className="flex items-center gap-2">
                              <Compass size={14} className="text-[#D4AF37] animate-spin-slow" />
                              <span>FIELD AXIS: NORTH-SOUTH</span>
                            </div>
                            <p className="text-[9px] leading-tight text-[#69707A] font-light">
                              Built from deep structural foundations to capture sunlight geometry perfectly during match play.
                            </p>
                          </div>
                        </div>

                        {/* Narrative Column */}
                        <div className="md:col-span-8 space-y-6 relative">
                          {/* Golden Corner brackets for premium journal look */}
                          <div className="absolute -top-4 -left-4 w-3 h-3 border-t border-l border-[#D4AF37]/45" />
                          <div className="absolute -bottom-4 -right-4 w-3 h-3 border-b border-r border-[#D4AF37]/45" />

                          <p className="font-serif text-xl sm:text-2xl text-[#DDD7C8] leading-relaxed italic font-light">
                            {selectedStadium.description}
                          </p>
                          <div className="h-px bg-[#4E5661]/20" />
                          <p className="text-xs sm:text-sm text-[#69707A] leading-relaxed tracking-wide font-light">
                            {selectedStadium.architecturalIdentity}
                          </p>
                        </div>

                      </div>
                    </section>


                    {/* CHAPTER 3 — WORLD CUP LEGACY */}
                    <section className="bg-[#070707] py-24 px-4 sm:px-8 md:px-16" id="stadium_chapter_legacy_evolution">
                      <div className="max-w-4xl mx-auto space-y-12">
                        <div className="text-center space-y-3">
                          <p className="font-mono text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">CHAPTER III</p>
                          <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium">World Cup Legacy</h3>
                          <p className="text-xs text-[#69707A] max-w-xl mx-auto">
                            Trace this historic cathedral's footprint across successive tournament eras through decades.
                          </p>
                        </div>

                        {/* Interactive Legacy Connected Flow */}
                        <div className="bg-[#0c0c0c] border border-[#4E5661]/15 p-8 rounded-sm relative">
                          <p className="text-xs sm:text-sm text-[#DDD7C8] leading-relaxed text-center italic max-w-2xl mx-auto font-serif mb-8">
                            "{selectedStadium.legacyStory}"
                          </p>

                          {/* Visual Flow Indicator */}
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 relative max-w-lg mx-auto">
                            {selectedStadium.appearances.map((year, idx) => (
                              <div key={idx} className="flex items-center gap-6 sm:gap-12 w-full sm:w-auto">
                                <div className="bg-[#121212] border-2 border-[#D4AF37] p-6 rounded-sm text-center flex-1 sm:flex-initial min-w-[100px] shadow-[0_5px_15px_rgba(212,175,55,0.08)]">
                                  <span className="block text-[10px] font-mono text-[#D4AF37] uppercase">EDITION</span>
                                  <span className="block font-serif text-3xl text-white font-bold mt-1">{year}</span>
                                </div>
                                {idx < selectedStadium.appearances.length - 1 && (
                                  <div className="flex flex-col sm:flex-row items-center gap-1 w-full text-[#D4AF37]">
                                    <div className="h-6 sm:h-px w-px sm:w-16 bg-gradient-to-b sm:bg-gradient-to-r from-[#D4AF37] to-transparent flex-1" />
                                    <span className="font-mono text-[10px] rotate-90 sm:rotate-0">➔</span>
                                    <div className="h-6 sm:h-px w-px sm:w-16 bg-gradient-to-b sm:bg-gradient-to-r from-transparent to-[#D4AF37] flex-1" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>


                    {/* CHAPTER 4 — THE MATCHES THAT MADE HISTORY */}
                    <section className="bg-[#090909] py-24 px-4 sm:px-8 md:px-16 border-t border-b border-[#4E5661]/15" id="stadium_chapter_historic_matches">
                      <div className="max-w-6xl mx-auto space-y-16">
                        <div className="space-y-3">
                          <p className="font-mono text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">CHAPTER IV</p>
                          <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium">The Matches That Made History</h3>
                          <p className="text-xs text-[#69707A] max-w-xl">
                            Each ticket represents a preserved historical artifact. Walk through the epic battles fought right on this grass coordinate.
                          </p>
                        </div>

                        {/* Match card catalog */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {selectedStadium.historicMatches.map((match, idx) => (
                            <div 
                              key={idx}
                              className="bg-[#070707] border border-[#4E5661]/15 p-6 sm:p-8 rounded-sm relative overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/45 transition-colors duration-300 group"
                              id={`stadium_match_ticket_${selectedStadiumId}_${idx}`}
                            >
                              {/* Background decorative match coordinates watermark */}
                              <span className="absolute right-4 bottom-4 font-mono text-8xl text-white/[0.015] font-bold tracking-tight select-none pointer-events-none group-hover:text-[#D4AF37]/[0.01] transition-colors">
                                {match.year}
                              </span>

                              <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs font-mono pb-4 border-b border-[#4E5661]/15 text-[#69707A]">
                                  <span className="text-[#D4AF37] font-semibold tracking-wider">
                                    {match.year} • {match.stage.toUpperCase()}
                                  </span>
                                  <span>{match.result}</span>
                                </div>

                                <div className="space-y-2">
                                  <h4 className="font-serif text-xl sm:text-2xl text-white font-semibold leading-tight group-hover:text-[#D4AF37] transition-colors">
                                    {match.title}
                                  </h4>
                                  <p className="text-[10px] font-mono tracking-widest text-[#69707A] uppercase flex items-center gap-1.5">
                                    <Award size={10} className="text-[#D4AF37]" /> NATIONAL FORCES: {match.teams}
                                  </p>
                                </div>

                                <p className="text-xs sm:text-sm text-[#DDD7C8]/85 leading-relaxed font-light">
                                  {match.story}
                                </p>
                              </div>

                              {/* Historical document seal accent */}
                              <div className="mt-6 pt-4 border-t border-[#4E5661]/10 flex justify-between items-center text-[10px] font-mono tracking-widest text-[#69707A]">
                                <span>WORLD CUP VAULT SEAL</span>
                                <span>SEC. DEC // AUTHENTIC</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>


                    {/* CHAPTER 5 — DEFING MOMENTS */}
                    <section className="bg-[#070707] py-24 px-4 sm:px-8 md:px-16" id="stadium_chapter_defining_moments">
                      <div className="max-w-4xl mx-auto space-y-16">
                        <div className="text-center space-y-3">
                          <p className="font-mono text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">CHAPTER V</p>
                          <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium">Defining Moments</h3>
                          <p className="text-xs text-[#69707A] max-w-xl mx-auto">
                            Trophy lifts, gasps of sorrow, and immortal actions that left beautiful traces in modern athletic folklore.
                          </p>
                        </div>

                        {/* Bento Grid panels for storytelling */}
                        <div className="space-y-8">
                          {selectedStadium.definingMoments.map((moment, idx) => (
                            <div 
                              key={idx}
                              className="bg-[#0c0c0c] border border-[#4E5661]/15 p-6 sm:p-10 rounded-sm relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                              id={`stadium_moment_${selectedStadiumId}_${idx}`}
                            >
                              <div className="md:col-span-3 text-center md:text-left space-y-1">
                                <span className="font-mono text-[10px] text-[#69707A] tracking-widest uppercase block">MOMENT OF ERA</span>
                                <span className="font-serif text-3xl sm:text-4xl text-[#D4AF37] font-extrabold block">
                                  {moment.year}
                                </span>
                              </div>

                              <div className="md:col-span-9 space-y-3">
                                <h4 className="font-serif text-lg sm:text-xl text-white font-semibold flex items-center gap-2">
                                  <Sparkles size={16} className="text-[#D4AF37]" />
                                  <span>{moment.title}</span>
                                </h4>
                                <p className="text-xs sm:text-sm text-[#DDD7C8]/85 leading-relaxed font-light">
                                  {moment.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>


                    {/* CHAPTER 6 — ATMOSPHERE ARCHIVE */}
                    <section className="relative py-24 px-4 sm:px-8 md:px-16 overflow-hidden border-t border-[#4E5661]/15" id="stadium_chapter_atmosphere_archive">
                      {/* Gradient Ambient Backdrop mimicking deep crowd presence */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.08),transparent_60%)] pointer-events-none" />
                      
                      <div className="max-w-4xl mx-auto bg-[#0a0a0a]/90 border border-[#D4AF37]/35 p-8 sm:p-12 rounded-sm relative">
                        {/* Decorative Vintage borders */}
                        <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#4E5661]/10 pointer-events-none" />

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                          <div className="md:col-span-4 text-center md:text-left space-y-3">
                            <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase flex items-center justify-center md:justify-start gap-1.5">
                              <Volume2 size={13} /> CHAPTER VI
                            </span>
                            <h4 className="font-serif text-2xl sm:text-3xl text-white leading-tight font-light">
                              Atmosphere
                              <br />
                              <span className="font-semibold text-[#D4AF37]">Archive</span>
                            </h4>
                          </div>

                          <div className="md:col-span-8">
                            <p className="font-serif text-base sm:text-lg text-[#DDD7C8] leading-relaxed italic font-light">
                              "{selectedStadium.atmosphereArchive}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>


                    {/* CHAPTER 7 — STADIUM FACTS AND STRUCTURED VISUALS */}
                    <section className="bg-[#090909] py-24 px-4 sm:px-8 md:px-16 border-t border-b border-[#4E5661]/15" id="stadium_chapter_technical_charts">
                      <div className="max-w-6xl mx-auto space-y-16">
                        <div className="text-center space-y-3">
                          <p className="font-mono text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">CHAPTER VII</p>
                          <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium">Dimension & Structural Parameters</h3>
                          <p className="text-xs text-[#69707A] max-w-xl mx-auto">
                            Examine the engineered facts, coordinates, renovations and concrete matrices of the physical monuments.
                          </p>
                        </div>

                        {/* Interactive Visual Metrics Block */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          
                          {/* Radial Dim Chart card  */}
                          <div className="bg-[#070707] border border-[#4E5661]/15 p-6 rounded-sm text-center space-y-6 flex flex-col justify-between">
                            <h4 className="font-mono text-xs tracking-widest text-[#69707A] uppercase">
                              Pitch Dimensions
                            </h4>
                            
                            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                              {/* SVG circular dimension layout */}
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="72" cy="72" r="60" fill="none" stroke="#4E5661" strokeWidth="2" className="opacity-15" />
                                <circle cx="72" cy="72" r="60" fill="none" stroke="#D4AF37" strokeWidth="3" strokeDasharray="376" strokeDashoffset="94" />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
                                <span className="font-serif text-lg text-white font-bold">{selectedStadium.pitchDimensions.split(' ')[0]}</span>
                                <span className="text-[10px] text-[#69707A] uppercase font-mono">meters</span>
                              </div>
                            </div>

                            <p className="text-xs text-[#69707A] font-light leading-relaxed px-2">
                              Standard modern FIFA playing layout with optimized underground drainage and geothermal hydration control.
                            </p>
                          </div>

                          {/* Technical table details represented minimally */}
                          <div className="bg-[#070707] border border-[#4E5661]/15 p-6 rounded-sm flex flex-col justify-between space-y-6">
                            <h4 className="font-mono text-xs tracking-widest text-[#69707A] uppercase text-center md:text-left">
                              Material Matrix & Renovation
                            </h4>

                            <div className="space-y-4">
                              <div className="space-y-1">
                                <span className="text-[9px] font-mono text-[#69707A] block">RENOVATION LANDMARKS</span>
                                <span className="text-xs text-[#DDD7C8] font-medium leading-relaxed block">
                                  {selectedStadium.renovations}
                                </span>
                              </div>

                              <div className="space-y-1">
                                <span className="text-[9px] font-mono text-[#69707A] block">PRIMARY COMPONENT CONCRETE</span>
                                <span className="text-xs text-[#DDD7C8] font-medium leading-relaxed block">
                                  {selectedStadium.materialsUsed}
                                </span>
                              </div>
                            </div>

                            <div className="text-[10px] font-mono text-[#D4AF37] border-t border-[#4E5661]/15 pt-3 text-center md:text-left">
                              STRUCTURAL INTEGRITY: 100% RATED
                            </div>
                          </div>

                          {/* Capacity Dial Card compared to global max capacity in list */}
                          <div className="bg-[#070707] border border-[#4E5661]/15 p-6 rounded-sm flex flex-col justify-between text-center space-y-6">
                            <h4 className="font-mono text-xs tracking-widest text-[#69707A] uppercase">
                              National Crowd footprint
                            </h4>

                            <div className="space-y-2">
                              <span className="text-xs text-[#69707A] block">PROPORTIONAL AUDIENCE FOOTPRINT</span>
                              <div className="h-4 w-full bg-[#121212] overflow-hidden rounded-full border border-[#4E5661]/25 relative">
                                {/* Max reference: Soccer City at 94,736 */}
                                <div 
                                  className="h-full bg-gradient-to-r from-[#D4AF37]/40 to-[#D4AF37] transition-all duration-1000"
                                  style={{ width: `${Math.min(100, (parseInt(selectedStadium.capacity.replace(/,/g, ''), 10) / 94736) * 100)}%` }}
                                />
                              </div>
                              <div className="flex justify-between text-[9px] font-mono text-[#69707A]">
                                <span>MIN REGISTRATION</span>
                                <span className="text-[#D4AF37] font-semibold">{selectedStadium.capacity} SEATS</span>
                              </div>
                            </div>

                            <p className="text-xs text-[#69707A] font-light leading-relaxed">
                              Proportional scaling relative to the FNB Calabash Stadium, the largest designated sports bowl utilized in modern finals history.
                            </p>
                          </div>

                        </div>
                      </div>
                    </section>


                    {/* SIGNATURE VISUALIZATION: HISTORY ECHOES TIMELINE */}
                    <section className="bg-[#070707] py-24 px-4 sm:px-8 md:px-16" id="stadium_chapter_echo_timeline">
                      <div className="max-w-4xl mx-auto space-y-16">
                        <div className="text-center space-y-3">
                          <span className="font-mono text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase flex items-center justify-center gap-1.5/2">
                            SIGNATURE CHRONOGRAPH
                          </span>
                          <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium">History Echoes</h3>
                          <p className="text-xs text-[#69707A] max-w-xl mx-auto">
                            Observe how decades of athletic achievements accumulate marks. Tapping each node reveals the recorded acoustic resonance description.
                          </p>
                        </div>

                        {/* Styled interactive vertical line chronograph */}
                        <div className="relative py-12">
                          {/* Chrono central axis */}
                          <div className="absolute top-0 bottom-0 left-[30px] md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#D4AF37]/80 via-[#4E5661]/35 to-transparent shadow-[0_0_15px_rgba(212,175,55,0.4)]" />

                          <div className="space-y-12">
                            {selectedStadium.historyEchoes.map((echo, idx) => {
                              const isEven = idx % 2 === 0;
                              return (
                                <motion.div 
                                  key={idx}
                                  className={`flex flex-col md:flex-row items-start relative ${isEven ? 'md:flex-row-reverse' : ''}`}
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true, margin: "-10%" }}
                                  transition={{ duration: 0.6 }}
                                  id={`stadium_echo_event_${selectedStadiumId}_${idx}`}
                                >
                                  {/* Axis coordinate node */}
                                  <div className="absolute left-[30px] md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                                    <div className="w-5 h-5 rounded-full bg-[#070707] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-[pulse_1.5s_infinite]" />
                                    </div>
                                  </div>

                                  {/* Chrono item content card */}
                                  <div className="w-full md:w-[45%] pl-16 md:pl-0 space-y-3">
                                    <div className={`flex items-center gap-3 ${isEven && 'md:justify-end'}`}>
                                      <span className="font-serif text-2xl font-black text-[#D4AF37]">{echo.year}</span>
                                      <span className="h-px w-6 bg-[#D4AF37]/25 hidden md:inline" />
                                      <span className="font-mono text-[9px] text-[#070707] bg-[#DDD7C8] px-2 py-0.5 rounded-sm font-bold tracking-widest uppercase">
                                        {echo.type}
                                      </span>
                                    </div>

                                    <div className={`space-y-2 cursor-pointer bg-[#0c0c0c] hover:bg-[#121212] border border-[#4E5661]/15 hover:border-[#D4AF37]/50 p-6 rounded-sm transition-all duration-300 shadow-[0_5px_20px_rgba(0,0,0,0.6)] ${isEven && 'md:text-right'}`}>
                                      <h4 className="font-serif text-base text-white font-semibold">
                                        {echo.label}
                                      </h4>
                                      <p className="text-xs text-[#69707A] leading-relaxed font-light">
                                        {echo.details}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Spacer for MD screens visual balancing */}
                                  <div className="hidden md:block w-[10%] pointer-events-none" />
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Closing Action Back up to selection */}
                        <div className="text-center pt-10 border-t border-[#4E5661]/15">
                          <p className="text-xs text-[#69707A] italic italic mb-4">
                            You have completed the historical unsealing of {selectedStadium.name}.
                          </p>
                          <button
                            onClick={() => {
                              setSelectedStadiumId(null);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-8 py-3 bg-[#121212] border-2 border-[#D4AF37]/35 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#070707] transition-all duration-300 text-xs font-semibold tracking-widest uppercase cursor-pointer"
                            id="stadiums_back_to_map_final_btn"
                          >
                            Close Archive & Back to Atlas
                          </button>
                        </div>

                      </div>
                    </section>

                  </div>
                </div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
