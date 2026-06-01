import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  X, 
  ChevronRight, 
  FolderOpen, 
  Folder, 
  Map, 
  Activity, 
  User, 
  MapPin, 
  Tv, 
  Layers, 
  Sparkles, 
  TrendingUp, 
  Award, 
  Compass, 
  Flame,
  Clock,
  Volume2,
  VolumeX,
  Radio,
  Megaphone
} from 'lucide-react';
import { Tournament } from '../data';
import { getTournamentDetails, GroupFolder, BattleMatch, HeroExhibit, StadiumExhibit, MetricStat } from '../tournamentData';
import { StadiumAudioEngine, getDefaultCommentary, speakBroadcaster, CommentarySnippet } from '../utils/audioSystem';

function getEraStyling(year: number) {
  if (year <= 1950) {
    return {
      filterClass: 'sepia-[0.5] grayscale-[0.2] contrast-[1.1] brightness-90 saturate-75',
      borderColor: 'border-[#B49E7C]/30',
      bgColor: 'bg-[#15130E]',
      hoverBorder: 'hover:border-[#B49E7C]/60',
      textColor: 'text-[#B49E7C]',
      capsuleBg: 'bg-[#1C1813]',
      tagline: 'Archival Historical Record • 1930s-1950s',
      fontClass: 'font-serif'
    };
  }
  if (year <= 1978) {
    return {
      filterClass: 'sepia-[0.1] contrast-[1.2] saturate-[1.15] brightness-95',
      borderColor: 'border-[#D4AF37]/30',
      bgColor: 'bg-[#0E1218]',
      hoverBorder: 'hover:border-[#D4AF37]/60',
      textColor: 'text-[#D4AF37]',
      capsuleBg: 'bg-[#141A22]',
      tagline: 'Golden Era Heritage • 1950s-1970s',
      fontClass: 'font-serif'
    };
  }
  if (year <= 2006) {
    return {
      filterClass: 'contrast-[1.25] saturate-[1.3] brightness-95 hue-rotate-[5deg]',
      borderColor: 'border-[#3B82F6]/30',
      bgColor: 'bg-[#0F0D15]',
      hoverBorder: 'hover:border-[#3B82F6]/60',
      textColor: 'text-[#3B82F6]',
      capsuleBg: 'bg-[#15121B]',
      tagline: 'Broadcast Television Era • 1980s-2000s',
      fontClass: 'font-sans'
    };
  }
  return {
    filterClass: 'contrast-[1.1] saturate-[1.05] brightness-100',
    borderColor: 'border-[#69707A]/30',
    bgColor: 'bg-[#090909]',
    hoverBorder: 'hover:border-[#D4AF37]/60',
    textColor: 'text-[#D4AF37]',
    capsuleBg: 'bg-[#111111]',
    tagline: 'Refined Modern Cinematic Vault • 2010s-Present',
    fontClass: 'font-sans'
  };
}

export function TournamentArchive({ tournament, onClose }: { tournament: Tournament; onClose: () => void }) {
  const details = getTournamentDetails(tournament.year);
  const era = getEraStyling(tournament.year);
  
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [timeCapsuleSealed, setTimeCapsuleSealed] = useState(true);

  // Immersive sound states and refs
  const audioEngineRef = useRef<StadiumAudioEngine | null>(null);
  const [audioMuted, setAudioMuted] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSubtitlePrompt, setShowSubtitlePrompt] = useState(false);
  const [runningSubtitle, setRunningSubtitle] = useState("");
  const [commentarySnippet, setCommentarySnippet] = useState<CommentarySnippet>(() => getDefaultCommentary(tournament.year));

  // Disable body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  // Initialize Web Audio crowd synthesis
  useEffect(() => {
    const engine = new StadiumAudioEngine(tournament.year);
    audioEngineRef.current = engine;
    engine.init();
    
    // Check initial mute state from client perspective
    setAudioMuted(engine.getMutedState());

    // Auto speak introductory commentary snip after a delay once modal transitions in
    const timer = setTimeout(() => {
      triggerCommentaryVoice();
    }, 1800);

    return () => {
      clearTimeout(timer);
      if (engine) engine.stop();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [tournament.year]);

  const triggerCommentaryVoice = () => {
    if (isSpeaking) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setRunningSubtitle("");
      return;
    }

    setIsSpeaking(true);
    setShowSubtitlePrompt(true);
    setRunningSubtitle("");

    const fullText = commentarySnippet.transcript;
    let charIdx = 0;
    const interval = setInterval(() => {
      setRunningSubtitle((prev) => prev + fullText.charAt(charIdx));
      charIdx++;
      if (charIdx >= fullText.length) {
        clearInterval(interval);
      }
    }, 35);

    speakBroadcaster(
      commentarySnippet,
      () => {
        clearInterval(interval);
        setRunningSubtitle(fullText);
        setIsSpeaking(false);
        // Fade subtitle bar out after a slight delay
        setTimeout(() => {
          setShowSubtitlePrompt(false);
        }, 4000);
      },
      audioMuted
    );
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (audioEngineRef.current) {
      audioEngineRef.current.setVolume(newVol);
    }
  };

  const toggleMute = () => {
    if (audioEngineRef.current) {
      const isCurrentlyMuted = audioEngineRef.current.toggleMute();
      setAudioMuted(isCurrentlyMuted);
      if (isCurrentlyMuted) {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setRunningSubtitle("");
      } else {
        // Trigger a cheerful swell as soon as they unmute to show it works!
        audioEngineRef.current.triggerCheerSwell();
      }
    }
  };

  const triggerSwell = () => {
    if (audioEngineRef.current) {
      audioEngineRef.current.triggerCheerSwell();
    }
  };

  return (
    <motion.div 
      className={`fixed inset-0 z-[400] ${era.bgColor} overflow-y-auto overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#090909] text-[#F5F2EA]`}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Decorative grain/dust overlay for historic vibes */}
      <div className="fixed inset-0 pointer-events-none opacity-5 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1.2\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')] z-[410]" />

      {/* Floating Immersive Media & Navigation Headrail */}
      <div className="fixed top-6 left-6 right-6 md:top-10 md:left-12 md:right-12 z-[500] flex justify-between items-center bg-black/45 backdrop-blur px-6 py-4 border border-[#4E5661]/25 rounded-md">
        {/* Sound waves reactive visual indicator */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleMute}
            className={`w-10 h-10 rounded-full border ${era.borderColor} flex items-center justify-center transition-all ${
              audioMuted ? 'text-[#69707A] bg-transparent' : 'text-[#D4AF37] bg-[#D4AF37]/10'
            }`}
            title={audioMuted ? "Unmute Stadium Soundscape" : "Mute Soundscape"}
          >
            {audioMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          {/* Slices of reactive waves */}
          <div className="flex items-end gap-1 h-5 w-16 px-1">
            {!audioMuted ? (
              <>
                <div className="w-1 bg-[#D4AF37]/75 rounded-sm animate-[bounce_0.8s_infinite_0.1s] h-1.5" style={{ animationDuration: '0.6s' }}></div>
                <div className="w-1 bg-[#D4AF37]/75 rounded-sm animate-[bounce_0.8s_infinite_0.2s] h-4" style={{ animationDuration: '0.8s' }}></div>
                <div className="w-1 bg-[#D4AF37]/75 rounded-sm animate-[bounce_0.8s_infinite_0.3s] h-2.5" style={{ animationDuration: '0.5s' }}></div>
                <div className="w-1 bg-[#D4AF37]/75 rounded-sm animate-[bounce_0.8s_infinite_0.4s] h-3.5" style={{ animationDuration: '0.7s' }}></div>
                <div className="w-1 bg-[#D4AF37]/75 rounded-sm animate-[bounce_0.8s_infinite_0.5s] h-1" style={{ animationDuration: '0.4s' }}></div>
              </>
            ) : (
              <>
                <div className="w-1 bg-[#4E5661]/40 rounded-sm h-1"></div>
                <div className="w-1 bg-[#4E5661]/40 rounded-sm h-1"></div>
                <div className="w-1 bg-[#4E5661]/40 rounded-sm h-1"></div>
                <div className="w-1 bg-[#4E5661]/40 rounded-sm h-1"></div>
                <div className="w-1 bg-[#4E5661]/40 rounded-sm h-1"></div>
              </>
            )}
          </div>

          <div className="hidden sm:flex flex-col gap-1">
             <span className="font-sans text-[9px] uppercase tracking-widest text-[#69707A] font-semibold">Stadium Soundscape</span>
             <div className="flex items-center gap-2">
               <input 
                 type="range"
                 min="0"
                 max="0.9"
                 step="0.05"
                 value={volume}
                 onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                 className="w-16 h-1 bg-[#4E5661]/35 rounded-sm appearance-none cursor-pointer accent-[#D4AF37]"
               />
               <span className="font-mono text-[9px] text-[#D4AF37]">{Math.round(volume * 100)}%</span>
             </div>
          </div>
        </div>

        {/* Dynamic Transmission trigger indicator */}
        <div className="flex items-center gap-4">
          <button
            onClick={triggerCommentaryVoice}
            className={`px-5 py-2 rounded-full border ${era.borderColor} bg-white/[0.02] flex items-center gap-2.5 text-xs font-sans uppercase tracking-widest font-semibold text-[#DDD7C8] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all`}
          >
            <Radio size={14} className={isSpeaking ? "text-[#D4AF37] animate-pulse" : "text-[#69707A]"} />
            <span>{isSpeaking ? "Mute Radio" : "Radio Broadcast"}</span>
          </button>

          <button 
            onClick={onClose}
            className={`w-10 h-10 rounded-full bg-[#090909]/80 border ${era.borderColor} flex items-center justify-center text-[#F5F2EA] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all`}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Section 1 - Entry Cinematic */}
      <section className="relative min-h-screen w-full flex flex-col justify-end pb-24 md:pb-32 overflow-hidden px-6 md:px-12">
        <div className="absolute inset-0 z-0">
          <motion.img 
            src={tournament.image} 
            alt={tournament.host}
            className={`w-full h-full object-cover origin-center ${era.filterClass}`}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>
        
        {/* Giant Year in Background */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-center pointer-events-none opacity-15 z-10 mix-blend-overlay">
          <motion.span 
             className={`font-serif text-[35vw] text-[#F5F2EA] leading-none ${tournament.year <= 1950 ? 'tracking-tighter italic' : 'tracking-normal'}`}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 2, delay: 0.5 }}
          >
            {tournament.year}
          </motion.span>
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="w-full md:w-2/3">
             <motion.p 
               className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-xs md:text-sm mb-6 flex items-center gap-2"
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, delay: 0.8 }}
             >
               <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
               {era.tagline}
             </motion.p>
             <motion.h1 
               className="font-serif text-[4rem] sm:text-[6rem] lg:text-[8rem] leading-none text-[#F5F2EA] uppercase mb-4 tracking-tighter"
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 1 }}
             >
               {tournament.host}
             </motion.h1>
             <motion.p 
                className="font-serif text-[#DDD7C8] text-2xl lg:text-4xl italic opacity-85"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
             >
                {tournament.champion} Crowned Champions
             </motion.p>
          </div>

          <motion.div 
            className={`w-full md:w-1/3 grid grid-cols-2 gap-x-8 gap-y-6 border-l ${era.borderColor} pl-8`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
             <div>
               <p className="font-sans text-[10px] text-[#69707A] uppercase tracking-widest mb-1">Teams</p>
               <p className="font-serif text-[#F5F2EA] text-xl font-medium">{details.teamsCount} Contenders</p>
             </div>
             <div>
               <p className="font-sans text-[10px] text-[#69707A] uppercase tracking-widest mb-1">Dates</p>
               <p className="font-serif text-[#F5F2EA] text-xl font-medium">{details.dates}</p>
             </div>
             <div>
               <p className="font-sans text-[10px] text-[#69707A] uppercase tracking-widest mb-1">Golden Ball</p>
               <p className="font-serif text-[#F5F2EA] text-xl font-medium">{details.goldenBall}</p>
             </div>
             <div>
               <p className="font-sans text-[10px] text-[#69707A] uppercase tracking-widest mb-1">Golden Boot</p>
               <p className="font-serif text-[#F5F2EA] text-xl font-medium">{details.goldenBoot} ({details.goldenBootGoals})</p>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Signature Feature: Tournament Time Capsule Box */}
      <section className="relative w-full bg-[#0a0a0a] py-20 px-6 border-y border-[#4E5661]/10 flex flex-col items-center">
         <div className="max-w-4xl w-full">
            <motion.div 
               className={`border ${era.borderColor} bg-gradient-to-br from-[#121212] to-[#0d0d0d] p-8 md:p-12 text-center rounded-sm relative overflow-hidden`}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
              
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-[#D4AF37]/10 rounded-full blur-xl animate-pulse"></div>
                  <Trophy size={40} className="text-[#D4AF37] relative z-10" strokeWidth={1} />
                </div>
              </div>

              <h2 className="font-serif text-[#F5F2EA] text-3xl md:text-4xl mb-3 tracking-wide">Tournament Time Capsule</h2>
              <p className="font-sans text-[#69707A] md:text-sm text-xs uppercase tracking-widest mb-8">
                Unseal the historical box to view certified tournament attributes.
              </p>

              <AnimatePresence mode="wait">
                 {timeCapsuleSealed ? (
                   <motion.div
                     key="sealed"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="py-4"
                   >
                     <p className="font-serif italic text-lg text-[#DDD7C8]/70 mb-8 max-w-xl mx-auto">
                       "Sealed deep in the football chronicle vaults, holding the definitive facts of the {tournament.year} tournament."
                     </p>
                     <button
                       onClick={() => setTimeCapsuleSealed(false)}
                       className="px-8 py-3.5 bg-[#D4AF37] text-black font-sans text-xs font-semibold tracking-widest uppercase hover:bg-white transition-all shadow-lg active:scale-95"
                     >
                       Unseal Capsule
                     </button>
                   </motion.div>
                 ) : (
                   <motion.div
                     key="unsealed"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -20 }}
                     className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left pt-6 border-t border-[#4E5661]/20 mt-6"
                   >
                     <div className="p-4 bg-white/5 border border-white/5">
                        <p className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-widest mb-1 font-semibold">Champion Team</p>
                        <p className="font-serif text-[#F5F2EA] text-lg">{details.capsule?.champion || tournament.champion}</p>
                     </div>
                     <div className="p-4 bg-white/5 border border-white/5">
                        <p className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-widest mb-1 font-semibold">Runner Up</p>
                        <p className="font-serif text-[#F5F2EA] text-lg">{details.capsule?.runnerUp || tournament.runnerUp}</p>
                     </div>
                     <div className="p-4 bg-white/5 border border-white/5">
                        <p className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-widest mb-1 font-semibold">Tournament Host</p>
                        <p className="font-serif text-[#F5F2EA] text-lg">{details.capsule?.host || tournament.host}</p>
                     </div>
                     <div className="p-4 bg-white/5 border border-white/5">
                        <p className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-widest mb-1 font-semibold">Tournament MVP (Golden Ball)</p>
                        <p className="font-serif text-[#F5F2EA] text-lg">{details.capsule?.mvp || details.goldenBall}</p>
                     </div>
                     <div className="p-4 bg-white/5 border border-white/5">
                        <p className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-widest mb-1 font-semibold">Top Goal Scorer</p>
                        <p className="font-serif text-[#F5F2EA] text-lg">{details.capsule?.topScorer || `${details.goldenBoot} (${details.goldenBootGoals} Goals)`}</p>
                     </div>
                     <div className="p-4 bg-white/5 border border-white/5">
                        <p className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-widest mb-1 font-semibold">Defining Legacy Moment</p>
                        <p className="font-serif text-[#F5F2EA] text-sm line-clamp-2">{details.capsule?.definingMoment || tournament.historicMoment}</p>
                     </div>
                     <div className="sm:col-span-2 md:col-span-3 p-4 bg-white/5 border border-white/10 mt-2">
                        <p className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-widest mb-2 font-semibold">Historical Significance</p>
                        <p className="font-serif text-[#DDD7C8] text-sm leading-relaxed italic">
                          "{details.capsule?.historicalSignificance || "Determined tactical paradigms and highlighted beautiful individual runs for a global following."}"
                        </p>
                     </div>
                     <div className="sm:col-span-2 md:col-span-3 flex justify-center mt-6">
                       <button
                         onClick={() => setTimeCapsuleSealed(true)}
                         className="font-sans text-[10px] uppercase tracking-widest text-[#69707A] hover:text-[#D4AF37] border-b border-[#69707A]/50 hover:border-[#D4AF37] pb-1 transition-all"
                       >
                         Re-seal Time Capsule
                       </button>
                     </div>
                   </motion.div>
                 )}
              </AnimatePresence>
            </motion.div>
         </div>
      </section>

      {/* Chapter 2 - The Narrative Story */}
      <section className="relative w-full bg-[#0a0a0a] py-32 px-6 md:px-12 border-t border-[#4E5661]/10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
           <Trophy size={48} className="text-[#D4AF37] mx-auto mb-10 opacity-70" strokeWidth={1} />
           <p className="font-sans text-[#D4AF37] tracking-[0.2em] uppercase text-[10px] mb-8 font-semibold">Chapter II • The Epic Narrative</p>
           <h2 className="font-serif text-[#F5F2EA] text-3xl md:text-5xl leading-relaxed italic opacity-95 mb-16">
             "{details.storyExtended}"
           </h2>

           {/* Immersive Retro Transceiver Control Panel */}
           <motion.div 
             className="w-full max-w-2xl bg-[#111111] border border-double border-[#D4AF37]/45 p-6 md:p-8 rounded-sm shadow-xl text-left"
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
           >
             {/* Header */}
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#4E5661]/25 pb-4 mb-6">
               <div className="flex items-center gap-3">
                 <Radio className="text-[#D4AF37] animate-pulse" size={24} />
                 <div>
                   <h3 className="font-serif text-[#F5F2EA] text-lg font-bold tracking-wide">Archival Radio Transceiver</h3>
                   <span className="font-sans text-[9px] uppercase tracking-widest text-[#69707A] font-semibold">Shortwave Band • Simulating {tournament.year} sound frequencies</span>
                 </div>
               </div>
               <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] font-mono text-xs px-3 py-1 rounded-sm">
                 {tournament.year <= 1960 ? "7.21 MHz AM" : "104.5 MHz FM Stereo"}
               </div>
             </div>

             <p className="font-serif text-[#DDD7C8] text-xs leading-relaxed italic opacity-80 mb-6">
               Step inside the stadium chronicle. Experience synthesized live spectator crowd murmurs, triggering acoustic chanting surges or invoking historic broadcast highlights.
             </p>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
               {/* Transceiver Controls column */}
               <div className="flex flex-col gap-3 justify-center">
                 <p className="font-sans text-[9px] uppercase tracking-widest text-[#69707A] font-bold">Transmission Actions</p>
                 
                 <button
                   onClick={triggerCommentaryVoice}
                   className={`w-full py-3 px-4 border ${isSpeaking ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-transparent text-[#F5F2EA] border-[#4E5661]/35'} hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all font-sans text-[10px] font-bold uppercase tracking-widest flex items-center justify-between`}
                 >
                   <span>{isSpeaking ? "Mute Active Voice" : `Tune Broadcast`}</span>
                   <Megaphone size={14} className={isSpeaking ? "animate-bounce" : "opacity-60"} />
                 </button>

                 <button
                   onClick={triggerSwell}
                   className="w-full py-3 px-4 bg-transparent text-[#F5F2EA] border border-[#4E5661]/35 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all font-sans text-[10px] font-bold uppercase tracking-widest flex items-center justify-between"
                 >
                   <span>Trigger Arena Surge</span>
                   <span className="text-[10px] text-[#D4AF37] font-mono font-bold">SWELL</span>
                 </button>
               </div>

               {/* Transceiver Monitor details & visual dials */}
               <div className="bg-[#090909] p-4 border border-[#4E5661]/15 rounded-sm flex flex-col justify-between">
                 <div>
                   <p className="font-sans text-[9px] uppercase tracking-widest text-[#69707A] font-bold mb-2">Radio Status</p>
                   <div className="flex items-center gap-2 mb-4">
                     <span className={`w-2 h-2 rounded-full ${audioMuted ? 'bg-[#ff4d4d]' : 'bg-[#2ecc71] animate-ping'}`} />
                     <span className="font-mono text-[10px] text-[#DDD7C8]/80">{audioMuted ? "TRANSMITTER SILENCED" : "LIVE ATMOSPHERIC EMISSION"}</span>
                   </div>
                 </div>

                 <div className="flex items-center justify-between border-t border-[#4E5661]/15 pt-3 mt-3">
                   <div className="flex flex-col gap-1">
                     <span className="font-sans text-[8px] text-[#69707A] uppercase">Volume</span>
                     <span className="font-mono text-xs text-[#D4AF37] font-semibold">{Math.round(volume * 100)}%</span>
                   </div>
                   <button
                     onClick={toggleMute}
                     className={`px-3 py-1.5 border font-sans text-[9px] uppercase font-bold tracking-wider transition-all ${
                       audioMuted ? 'border-[#ff4d4d]/40 text-[#ff4d4d] bg-[#ff4d4d]/5' : 'border-[#4E5661]/35 text-[#69707A]'
                     }`}
                   >
                     {audioMuted ? "UNMUTE ENGINE" : "MUTE INPUT"}
                   </button>
                 </div>
               </div>
             </div>
           </motion.div>
        </div>
      </section>

      {/* Chapter 3 - Group Stage Atlas (Interactive Folder Explorer) */}
      <section className="relative w-full bg-[#111] py-32 px-6 md:px-12 border-t border-[#4E5661]/10">
        <div className="max-w-7xl mx-auto">
           <div className="mb-20 flex shrink-0 items-end gap-6 text-left">
              <span className="font-serif text-[#4E5661] text-6xl md:text-8xl leading-none opacity-20">03</span>
              <div>
                <h2 className="font-serif text-[#F5F2EA] text-4xl md:text-6xl mb-2">Group Stage Atlas</h2>
                <p className="font-sans text-[#D4AF37] tracking-[0.2em] uppercase text-xs">Sealed Cabinet Folders</p>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             {/* Left Column: Folders List switcher */}
             <div className="lg:col-span-4 flex flex-col gap-4">
               <p className="font-sans text-[#69707A] text-[10px] uppercase tracking-widest mb-2 font-medium">Select Archival Portfolio</p>
               {details.groups.map((group, idx) => (
                 <button
                   key={idx}
                   onClick={() => setActiveGroupIndex(idx)}
                   className={`flex items-center gap-4 p-5 text-left border rounded-sm transition-all relative ${
                     activeGroupIndex === idx 
                       ? `border-[#D4AF37] bg-white/5` 
                       : `border-[#4E5661]/20 hover:border-white/25 bg-transparent`
                   }`}
                 >
                   {activeGroupIndex === idx ? (
                     <FolderOpen className="text-[#D4AF37]" size={24} />
                   ) : (
                     <Folder className="text-[#69707A]" size={24} />
                   )}
                   <div>
                     <span className="font-sans text-xs text-[#69707A] uppercase tracking-wider block">Portfolio Case</span>
                     <span className="font-serif text-lg text-[#F5F2EA] font-semibold">{group.name}</span>
                   </div>
                   {activeGroupIndex === idx && (
                     <div className="absolute right-6 w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                   )}
                 </button>
               ))}
               
               <div className="p-6 border border-[#4E5661]/10 bg-white/[0.02] mt-4 rounded-sm">
                  <Compass className="text-[#D4AF37] mb-3" size={20} strokeWidth={1} />
                  <p className="font-serif text-xs text-[#69707A] italic leading-relaxed">
                    Unfolding a folder reveals tactical standings, detailed matches, and historical keys of the early stage.
                  </p>
               </div>
             </div>

             {/* Right Column: Folder details */}
             <div className="lg:col-span-8">
               <AnimatePresence mode="wait">
                 {details.groups.map((group, idx) => (
                   idx === activeGroupIndex && (
                     <motion.div
                       key={idx}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -20 }}
                       transition={{ duration: 0.5 }}
                       className="border border-[#4E5661]/25 bg-[#0d0d0d] p-6 md:p-10 rounded-sm relative"
                     >
                       <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#4E5661]/20">
                          <h3 className="font-serif text-[#F5F2EA] text-2xl font-bold">{group.name} Chronicle</h3>
                          <span className="font-sans text-[10px] text-[#D4AF37] tracking-widest uppercase bg-[#D4AF37]/10 px-3 py-1 font-semibold rounded-sm">
                            Opened Cabinet
                          </span>
                       </div>

                       {/* Group Standings list */}
                       <div className="mb-10">
                         <h4 className="font-sans text-[10px] text-[#69707A] uppercase tracking-widest mb-4 font-semibold">Table Standings</h4>
                         <div className="space-y-2">
                           <div className="grid grid-cols-12 text-[10px] uppercase tracking-widest text-[#69707A] font-semibold px-4 pb-2 border-b border-white/5">
                             <div className="col-span-6">Country</div>
                             <div className="col-span-2 text-center">W</div>
                             <div className="col-span-2 text-center">D</div>
                             <div className="col-span-2 text-center">PTS</div>
                           </div>
                           {group.standings.map((teamRow, tIdx) => (
                             <div 
                               key={tIdx} 
                               className={`grid grid-cols-12 text-sm px-4 py-3 border-b border-white/[0.02] items-center ${
                                 tIdx < 2 ? 'bg-white/[0.03] text-[#F5F2EA]' : 'text-[#69707A]'
                               }`}
                             >
                               <div className="col-span-6 font-serif flex items-center gap-3">
                                 <span className="text-[10px] font-sans opacity-40">{tIdx + 1}</span>
                                 <span>{teamRow.team}</span>
                                 {tIdx < 2 && (
                                   <span className="text-[9px] font-sans text-[#D4AF37]/80 uppercase px-1.5 py-0.5 border border-[#D4AF37]/20 rounded-sm scale-90">Qualified</span>
                                 )}
                               </div>
                               <div className="col-span-2 text-center font-serif">{teamRow.w}</div>
                               <div className="col-span-2 text-center font-serif">{teamRow.d}</div>
                               <div className="col-span-2 text-center font-serif font-bold text-[#D4AF37]">{teamRow.pts}</div>
                             </div>
                           ))}
                         </div>
                       </div>

                       {/* Matches Results */}
                       <div className="mb-10">
                         <h4 className="font-sans text-[10px] text-[#69707A] uppercase tracking-widest mb-4 font-semibold">Match Results & Story</h4>
                         <div className="space-y-4">
                           {group.matches.map((match, mIdx) => (
                             <div key={mIdx} className="p-4 bg-white/[0.01] border border-white/5 rounded-sm">
                               <div className="flex justify-between items-center mb-2">
                                 <p className="font-serif text-sm font-semibold text-[#DDD7C8]">
                                   {match.home} vs {match.away}
                                 </p>
                                 <p className="font-serif text-[#D4AF37] text-md font-bold bg-white/5 px-2.5 py-0.5 border border-white/5">
                                   {match.score}
                                 </p>
                               </div>
                               {match.story && (
                                 <p className="font-serif text-xs text-[#69707A] leading-relaxed italic">
                                   "{match.story}"
                                 </p>
                               )}
                             </div>
                           ))}
                         </div>
                       </div>

                       {/* Key Moment */}
                       <div className="p-5 border-l-2 border-[#D4AF37] bg-white/[0.01]">
                          <p className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-widest mb-1.5 font-semibold">Key Stage Moment</p>
                          <p className="font-serif text-[#DDD7C8] italic text-sm leading-relaxed">
                            "{group.keyMoment}"
                          </p>
                       </div>
                     </motion.div>
                   )
                 ))}
               </AnimatePresence>
             </div>
           </div>
        </div>
      </section>

      {/* Chapter 4 - Road to Glory */}
      <section className="relative w-full bg-[#0a0a0a] py-32 px-6 md:px-12 border-t border-[#4E5661]/10">
        <div className="max-w-7xl mx-auto">
           <div className="mb-24 flex shrink-0 items-end gap-6 text-left">
              <span className="font-serif text-[#4E5661] text-6xl md:text-8xl leading-none opacity-20">04</span>
              <div>
                <h2 className="font-serif text-[#F5F2EA] text-4xl md:text-6xl mb-2">Road to Glory</h2>
                <p className="font-sans text-[#D4AF37] tracking-[0.2em] uppercase text-xs">The Victor's Path</p>
              </div>
           </div>

           <div className="flex flex-col gap-8 md:gap-16 relative">
              {/* Vertical Path Line */}
              <div className="absolute left-[15px] top-4 bottom-4 w-px bg-gradient-to-b from-[#D4AF37]/50 via-[#4E5661]/20 to-[#D4AF37]/50 z-0 hidden md:block"></div>
              
              {details.roadToGlory.map((match, idx) => (
                <motion.div 
                  key={idx} 
                  className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                >
                  <div className="hidden md:flex w-8 h-8 rounded-full bg-[#111111] border border-[#D4AF37] items-center justify-center shrink-0">
                     <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                  </div>
                  
                  <div className="flex-1 bg-[#111111] border border-[#4E5661]/20 p-8 md:p-12 group hover:border-[#D4AF37]/50 transition-all rounded-sm shadow-xl">
                     <p className="font-sans text-[#69707A] text-[10px] uppercase tracking-[0.25em] mb-6 font-semibold">{match.stage}</p>
                     
                     <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8 pb-8 border-b border-[#4E5661]/20">
                        <div>
                          <p className="font-sans text-[#D4AF37] text-[10px] uppercase tracking-widest mb-2 font-semibold">Opponent Matchup</p>
                          <p className="font-serif text-[#F5F2EA] text-2xl sm:text-4xl lg:text-5xl font-bold">{match.opponent}</p>
                        </div>
                        <div className="text-left md:text-right">
                          <p className="font-sans text-[#D4AF37] text-[10px] uppercase tracking-widest mb-2 font-semibold font-medium">Result score</p>
                          <p className="font-serif text-[#DDD7C8] text-3xl sm:text-4xl font-bold">{match.score}</p>
                        </div>
                     </div>
                     
                     <p className="font-serif text-[#69707A] text-lg lg:text-xl italic leading-relaxed">
                       "{match.story}"
                     </p>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Chapter 5 - Knockout Drama (Historical Battle Maps) */}
      <section className="relative w-full bg-[#111] py-32 px-6 md:px-12 border-t border-[#4E5661]/10">
         <div className="max-w-7xl mx-auto">
           <div className="mb-24 flex shrink-0 items-end gap-6 text-left">
              <span className="font-serif text-[#4E5661] text-6xl md:text-8xl leading-none opacity-20">05</span>
              <div>
                <h2 className="font-serif text-[#F5F2EA] text-4xl md:text-6xl mb-2">Knockout Battleground</h2>
                <p className="font-sans text-[#D4AF37] tracking-[0.2em] uppercase text-xs">Tactical Confrontation Maps</p>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             {details.knockoutDrama?.map((match, idx) => (
               <motion.div
                 key={idx}
                 className="bg-[#0c0c0c] border border-white/5 rounded-sm p-8 flex flex-col justify-between relative overflow-hidden group shadow-2xl"
                 initial={{ opacity: 0, scale: 0.98 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
               >
                 <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 animate-pulse rounded-bl-full pointer-events-none" />
                 
                 <div>
                   <div className="flex justify-between items-center mb-6">
                     <span className="font-sans text-[10px] text-[#69707A] uppercase tracking-widest border border-white/10 px-3 py-1 font-semibold rounded-sm">
                       {match.stage}
                     </span>
                     <div className="flex items-center gap-2 text-xs text-[#69707A]">
                       <Map size={14} className="text-[#D4AF37]" />
                       <span className="font-sans uppercase tracking-widest text-[9px] font-semibold">Battlefield Report</span>
                     </div>
                   </div>

                   <div className="flex justify-between items-center mb-8 bg-black/60 p-5 border border-[#4E5661]/15 rounded-sm">
                     <div className="text-left">
                       <span className="block font-sans text-[9px] text-[#69707A] uppercase tracking-wider mb-1">Forces A</span>
                       <span className="font-serif text-lg sm:text-xl font-bold text-white">{match.home}</span>
                     </div>
                     <span className="font-serif text-2xl lg:text-3xl text-[#D4AF37] font-extrabold px-4">{match.score}</span>
                     <div className="text-right">
                       <span className="block font-sans text-[9px] text-[#69707A] uppercase tracking-wider mb-1">Forces B</span>
                       <span className="font-serif text-lg sm:text-xl font-bold text-white">{match.away}</span>
                     </div>
                   </div>

                   <div className="mb-6">
                     <p className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-widest mb-2 font-semibold">Tactical Setup & Fight</p>
                     <p className="font-serif text-[#DDD7C8] text-sm leading-relaxed opacity-90">
                       {match.mapNote}
                     </p>
                   </div>
                 </div>

                 <div className="mt-6 pt-6 border-t border-[#4E5661]/15">
                    <p className="font-sans text-[10px] text-[#69707A] uppercase tracking-widest mb-2 font-semibold">Moments of Conquest</p>
                    <div className="flex gap-3 items-start bg-white/[0.02] p-4 border-l-2 border-[#D4AF37]/50">
                      <Flame size={16} className="text-[#D4AF37] mt-0.5 shrink-0" />
                      <p className="font-serif text-xs text-[#DDD7C8]/80 leading-relaxed italic">
                        "{match.moment}"
                      </p>
                    </div>
                 </div>
               </motion.div>
             ))}
           </div>
         </div>
      </section>

      {/* Chapter 6 - Tournament Heroes Exhibit */}
      <section className="relative w-full bg-[#0a0a0a] py-32 px-6 md:px-12 border-t border-[#4E5661]/10">
         <div className="max-w-7xl mx-auto">
           <div className="mb-24 flex shrink-0 items-end gap-6 text-left">
              <span className="font-serif text-[#4E5661] text-6xl md:text-8xl leading-none opacity-20">06</span>
              <div>
                <h2 className="font-serif text-[#F5F2EA] text-4xl md:text-6xl mb-2">Tournament Stars</h2>
                <p className="font-sans text-[#D4AF37] tracking-[0.2em] uppercase text-xs">Certified Protagonists</p>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             {details.heroes?.map((hero, idx) => (
               <motion.div
                 key={idx}
                 className="bg-[#111] border border-[#4E5661]/15 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl group relative"
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.7 }}
               >
                 {/* Hero Image */}
                 <div className="w-full md:w-5/12 h-64 md:h-auto relative overflow-hidden shrink-0 bg-[#090909]">
                   <img 
                     src={hero.image} 
                     alt={hero.name} 
                     className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter saturate-75 brightness-90" 
                     referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#111]/40 to-[#111]" />
                 </div>

                 {/* Hero details */}
                 <div className="w-full md:w-7/12 p-8 flex flex-col justify-between">
                   <div>
                     <div className="flex items-center gap-2 mb-3">
                       <User size={14} className="text-[#D4AF37]" />
                       <span className="font-sans text-[10px] text-[#69707A] uppercase tracking-widest font-semibold">{hero.role}</span>
                     </div>
                     <h3 className="font-serif text-white text-3xl font-bold mb-4 tracking-tight">{hero.name}</h3>

                     {/* Stats Indicators */}
                     <div className="grid grid-cols-3 gap-4 mb-6 pt-4 border-t border-white/5">
                        {hero.stats.map((stat, sIdx) => (
                          <div key={sIdx} className="text-left">
                            <span className="block font-sans text-[9px] text-[#69707A] uppercase tracking-wider mb-1 truncate">{stat.label}</span>
                            <span className="font-serif text-xl sm:text-2xl font-bold text-[#D4AF37]/90">{stat.value}</span>
                          </div>
                        ))}
                     </div>
                   </div>

                   <div className="pt-4 border-t border-white/5 font-serif text-xs text-[#69707A] leading-relaxed">
                     <span className="block font-sans text-[9px] text-[#D4AF37] uppercase tracking-widest mb-1.5 font-semibold">Legendary Exhibit Moment</span>
                     <p className="italic">
                       "{hero.legacyMoment}"
                     </p>
                   </div>
                 </div>
               </motion.div>
             ))}
           </div>
         </div>
      </section>

      {/* Chapter 7 - Defining Moments */}
      {details.definingMoments.length > 0 && (
      <section className="relative w-full bg-[#111111] py-32 px-6 md:px-12 border-t border-[#4E5661]/20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 flex shrink-0 items-end gap-6 text-left">
              <span className="font-serif text-[#4E5661] text-6xl md:text-8xl leading-none opacity-20">07</span>
              <div>
                <h2 className="font-serif text-[#F5F2EA] text-4xl md:text-6xl mb-2">Defining Moments</h2>
                <p className="font-sans text-[#D4AF37] tracking-[0.2em] uppercase text-xs">Visual Archive Exhibition</p>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {details.definingMoments.map((moment, idx) => (
              <motion.div 
                key={idx}
                className="group relative overflow-hidden aspect-[4/3] bg-[#090909] border border-white/5 rounded-sm shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                 <img src={moment.image} alt={moment.title} className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${era.filterClass}`} />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                 
                 <div className="absolute bottom-8 left-8 right-8">
                   <h3 className="font-serif text-white text-2xl md:text-3xl mb-2 tracking-tight">{moment.title}</h3>
                   <p className="font-sans text-[#DDD7C8] text-[10px] md:text-xs opacity-80 leading-relaxed uppercase tracking-widest font-semibold">{moment.desc}</p>
                 </div>
                 <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity m-8"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Chapter 8 - Stadium Collection */}
      <section className="relative w-full bg-[#0a0a0a] py-32 px-6 md:px-12 border-t border-[#4E5661]/10">
         <div className="max-w-7xl mx-auto">
           <div className="mb-24 flex shrink-0 items-end gap-6 text-left">
              <span className="font-serif text-[#4E5661] text-6xl md:text-8xl leading-none opacity-20">08</span>
              <div>
                <h2 className="font-serif text-[#F5F2EA] text-4xl md:text-6xl mb-2">Stadium Collection</h2>
                <p className="font-sans text-[#D4AF37] tracking-[0.2em] uppercase text-xs">Architectural Host Venues</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             {details.stadiums?.map((stadium, idx) => (
               <motion.div
                 key={idx}
                 className="bg-[#111] border border-white/5 rounded-sm overflow-hidden flex flex-col shadow-xl group"
                 initial={{ opacity: 0, y: 25 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
               >
                 <div className="aspect-[16/10] bg-[#090909] overflow-hidden relative">
                   <img 
                     src={stadium.image} 
                     alt={stadium.name} 
                     className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-95 saturate-100" 
                     referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                   
                   <div className="absolute bottom-6 left-6 flex items-center gap-3">
                     <MapPin className="text-[#D4AF37]" size={16} />
                     <p className="font-sans text-xs uppercase tracking-widest text-white/90 font-medium">{stadium.location}</p>
                   </div>
                 </div>

                 <div className="p-6 md:p-8">
                   <div className="flex justify-between items-baseline mb-4">
                     <h3 className="font-serif text-white text-2xl font-bold tracking-tight">{stadium.name}</h3>
                     <span className="font-sans text-xs text-[#D4AF37] font-semibold tracking-wider">Cap: {stadium.capacity}</span>
                   </div>
                   
                   <div className="pt-4 border-t border-white/5 flex items-center gap-4">
                      <span className="font-sans text-[9px] uppercase tracking-widest text-[#69707A] font-semibold">Notable Matchup</span>
                      <p className="font-serif text-xs text-[#DDD7C8]/90 italic">{stadium.notableMatch}</p>
                   </div>
                 </div>
               </motion.div>
             ))}
           </div>
         </div>
      </section>

      {/* Chapter 9 - Tournament Statistics & Tactical Trend */}
      <section className="relative w-full bg-[#111] py-32 px-6 md:px-12 border-t border-[#4E5661]/10">
         <div className="max-w-7xl mx-auto">
           <div className="mb-24 flex shrink-0 items-end gap-6 text-left">
              <span className="font-serif text-[#4E5661] text-6xl md:text-8xl leading-none opacity-20">09</span>
              <div>
                <h2 className="font-serif text-[#F5F2EA] text-4xl md:text-6xl mb-2">Aesthetic Metrics</h2>
                <p className="font-sans text-[#D4AF37] tracking-[0.2em] uppercase text-xs">Historical Analytical Indexes</p>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
             {details.stats?.map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="bg-[#0b0b0b] border border-[#4E5661]/15 p-8 rounded-sm text-left shadow-xl"
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <span className="block font-sans text-[10px] text-[#69707A] uppercase tracking-widest mb-4 font-semibold">{stat.label}</span>
                  <p className="font-serif text-5xl font-extrabold text-[#D4AF37] mb-4 tracking-tighter">{stat.value}</p>
                  <p className="font-serif text-sm text-[#DDD7C8]/80 leading-relaxed italic">{stat.subText}</p>
                </motion.div>
             ))}
           </div>

           {/* Tactical Trend Breakdown */}
           <motion.div 
              className="bg-[#0b0b0b] border border-l-4 border-l-[#D4AF37] border-y-[#4E5661]/15 border-r-[#4E5661]/15 p-8 md:p-12 text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
           >
             <div className="flex items-center gap-3 mb-4">
               <TrendingUp className="text-[#D4AF37]" size={20} />
               <h3 className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-widest font-semibold">Historical Tactical Trend Evolution</h3>
             </div>
             <p className="font-serif text-lg md:text-xl leading-relaxed text-[#DDD7C8] italic max-w-4xl opacity-95">
               "{details.tacticalTrend || "The tournament served to catalog and accelerate tactical adjustments, defining professional lineups for the subsequent decade."}"
             </p>
           </motion.div>
         </div>
      </section>

      {/* Chapter 10 - Legacy */}
      <section className="relative w-full bg-[#090909] py-48 px-6 md:px-12 flex flex-col justify-center items-center text-center border-t border-[#4E5661]/15">
         <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')] mix-blend-overlay"></div>
         
         <p className="font-sans text-[#69707A] tracking-[0.3em] uppercase text-[10px] mb-8 font-semibold">Chapter X • Eternal Epilogue</p>
         <h2 className="font-serif text-[#D4AF37] text-4xl sm:text-5xl md:text-7xl mb-12 italic opacity-95 border-y border-[#4E5661]/20 py-8 max-w-4xl tracking-wide">
           Why the {tournament.year} Matters
         </h2>
         <p className="font-serif text-[#F5F2EA] text-xl md:text-3xl max-w-4xl leading-relaxed opacity-90 font-light italic px-4">
           {details.legacy}
         </p>
         
         <button 
           onClick={onClose}
           className="mt-24 font-sans text-xs tracking-[0.25em] uppercase text-[#69707A] hover:text-[#D4AF37] border-b border-[#69707A]/40 hover:border-[#D4AF37] pb-2.5 transition-all flex items-center gap-2"
         >
           Close Archive
         </button>
      </section>

      {/* Subtitles Overlay Bar */}
      <AnimatePresence>
        {showSubtitlePrompt && (
          <motion.div 
            className="fixed bottom-6 left-6 right-6 md:left-1/2 md:right-auto md:-translate-x-1/2 z-[500] max-w-2xl w-full sm:w-[calc(100%-3rem)] bg-black/95 backdrop-blur border border-[#D4AF37]/50 p-5 rounded-md shadow-2xl flex gap-4 items-center"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
          >
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <Megaphone size={18} className="text-[#D4AF37] animate-bounce" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4 mb-1">
                <span className="font-sans text-[9px] uppercase tracking-widest text-[#D4AF37] font-extrabold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></span>
                  Active Transmission
                </span>
                <span className="font-sans text-[9px] uppercase tracking-widest text-[#69707A] font-semibold italic truncate">{commentarySnippet.commentator}</span>
              </div>
              <p className="font-serif text-[#F5F2EA] text-xs sm:text-sm leading-relaxed italic">
                {runningSubtitle || "Initializing tuner match..."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
