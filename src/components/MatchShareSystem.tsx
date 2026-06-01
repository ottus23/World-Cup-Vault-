import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Share2, 
  Download, 
  Bookmark, 
  Trash2, 
  Copy, 
  Check, 
  X, 
  Camera, 
  Calendar,
  Sparkles,
  Trophy,
  Award
} from 'lucide-react';
import { MatchDetails } from './HistoricMatchesVault';

interface MatchShareSystemProps {
  match: MatchDetails;
  onClose: () => void;
}

interface SavedSnapshot {
  id: string; // unique timestamp key
  matchId: string;
  matchTitle: string;
  year: number;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  definingMomentTitle: string;
  savedAt: string;
}

export function MatchShareSystem({ match, onClose }: MatchShareSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedLocally, setSavedLocally] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [localHistory, setLocalHistory] = useState<SavedSnapshot[]>([]);

  // Cinematic film developing states
  const [developingProgress, setDevelopingProgress] = useState(0);
  const [developingStep, setDevelopingStep] = useState('Booting developer chemical chambers...');
  const [isDeveloping, setIsDeveloping] = useState(true);
  const [devStyle, setDevStyle] = useState<'royal' | 'chrome' | 'sepia'>('royal');

  // Sound/Vibe feedbacks
  const playGearTick = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2600, audioCtx.currentTime); 
      osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.01);

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1400, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.006, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.015);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.02);
    } catch (e) {}
  };
  const playClick = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      // Ignored if browser blocks audio autoplay/context
    }
  };

  const playSuccess = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {}
  };

  // Helper to wrap text cleanly inside an HTML5 Canvas context
  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ): number => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
    return currentY + lineHeight;
  };

  // Redraw/Render Canvas dynamically based on Selected Developer Formula
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI scaling (super crisp render)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 600 * dpr;
    canvas.height = 800 * dpr;
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    ctx.scale(dpr, dpr);

    // Dynamic Color Design parameters based on Developer Style Recipe
    let bgFill = '#060606';
    let borderColor = '#D4AF37'; // Gold
    let subBorderColor = '#D4AF37';
    let watermarkColor = 'rgba(212, 175, 55, 0.04)';
    let titleStampColor = '#D4AF37';
    let labelColor = '#8E9AA6';
    let textPrimary = '#FFFFFF';
    let textMuted = '#BAC5CF';
    let matchBannerBg = '#111111';
    let scoreColor = '#D4AF37';
    let momentPanelBg = 'rgba(212, 175, 55, 0.15)';
    let momentPanelBorder = 'rgba(212, 175, 55, 0.4)';
    let cardDescription = 'MEMENTO CHRONICLED ON BRONZE • WORLD CUP DECREE';

    if (devStyle === 'chrome') {
      bgFill = '#030303';
      borderColor = '#D1D5DB'; // Matte Silver
      subBorderColor = '#4B5563';
      watermarkColor = 'rgba(255, 255, 255, 0.03)';
      titleStampColor = '#F3F4F6';
      labelColor = '#9CA3AF';
      textPrimary = '#FFFFFF';
      textMuted = '#9CA3AF';
      matchBannerBg = '#1F2937';
      scoreColor = '#F9FAFB';
      momentPanelBg = 'rgba(255, 255, 255, 0.05)';
      momentPanelBorder = 'rgba(255, 255, 255, 0.25)';
      cardDescription = 'MEMENTO CHRONICLED ON CHROME • SILVER HALIDE PRINT';
    } else if (devStyle === 'sepia') {
      bgFill = '#1c0f06'; // Old parchment / dark amber wood tint
      borderColor = '#D97706'; // Antique copper / bronze
      subBorderColor = '#B45309';
      watermarkColor = 'rgba(217, 119, 6, 0.05)';
      titleStampColor = '#FBBF24';
      labelColor = '#D97706';
      textPrimary = '#FEF3C7';
      textMuted = '#FCD34D';
      matchBannerBg = '#2F1809';
      scoreColor = '#FBBF24';
      momentPanelBg = 'rgba(217, 119, 6, 0.08)';
      momentPanelBorder = 'rgba(217, 119, 6, 0.35)';
      cardDescription = 'MEMENTO CHRONICLED ON PAPYRUS • AMBER SEPIA GLOW';
    }

    // 1. Core Background Styling
    ctx.fillStyle = bgFill;
    ctx.fillRect(0, 0, 600, 800);

    // Subtle grain texture overlay
    ctx.fillStyle = devStyle === 'sepia' ? 'rgba(217, 119, 6, 0.015)' : 'rgba(255, 255, 255, 0.015)';
    for (let i = 0; i < 4000; i++) {
      const rx = Math.random() * 600;
      const ry = Math.random() * 800;
      ctx.fillRect(rx, ry, 1.2, 1.2);
    }

    // 2. Ornate Double Gold/Silver/Bronze Borders
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2.5;
    ctx.strokeRect(16, 16, 568, 768);

    ctx.strokeStyle = subBorderColor;
    ctx.lineWidth = 0.75;
    ctx.strokeRect(22, 22, 556, 756);

    // Corner decorative brackets
    const drawBracket = (cx: number, cy: number, dx: number, dy: number) => {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy + dy * 24);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx + dx * 24, cy);
      ctx.stroke();
    };
    drawBracket(22, 22, 1, 1);
    drawBracket(578, 22, -1, 1);
    drawBracket(22, 778, 1, -1);
    drawBracket(578, 778, -1, -1);

    // 3. Watermark Year background numbering
    ctx.fillStyle = watermarkColor;
    ctx.font = 'bold 220px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(match.year.toString(), 300, 360);

    // 4. Header Stamp
    ctx.fillStyle = titleStampColor;
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.letterSpacing = '0.45em';
    ctx.fillText('HISTORIC MATCH CHRONICLES', 300, 52);

    ctx.strokeStyle = devStyle === 'chrome' ? 'rgba(255, 255, 255, 0.15)' : devStyle === 'sepia' ? 'rgba(217, 119, 6, 0.25)' : 'rgba(212, 175, 55, 0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, 68);
    ctx.lineTo(540, 68);
    ctx.stroke();

    // 5. Match Metadata Row
    ctx.fillStyle = labelColor;
    ctx.font = 'bold 10px monospace, monospace';
    ctx.letterSpacing = '0.15em';
    const stampText = `STAMP ID: WC-${match.year}-${match.id.toUpperCase()}`;
    ctx.fillText(stampText, 300, 92);

    // 6. Grand Teams Layout
    ctx.fillStyle = textPrimary;
    ctx.font = '900 24px Georgia, serif';
    ctx.letterSpacing = '0.05em';
    ctx.textAlign = 'center';
    
    // Team A
    ctx.fillText(match.teamA.toUpperCase(), 300, 160);
    
    // Versus Line
    ctx.fillStyle = borderColor;
    ctx.font = 'italic 16px Georgia, serif';
    ctx.letterSpacing = '0.1em';
    ctx.fillText('versus', 300, 195);

    // Team B
    ctx.fillText(match.teamB.toUpperCase(), 300, 240);

    // 7. Dynamic Score Display Banner
    ctx.fillStyle = matchBannerBg;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(180, 275, 240, 65, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = scoreColor;
    ctx.font = 'bold 44px Georgia, serif';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${match.scoreA} - ${match.scoreB}`, 300, 308);

    if (match.shootoutScore) {
      ctx.fillStyle = devStyle === 'chrome' ? '#9CA3AF' : devStyle === 'sepia' ? '#D97706' : '#ef4444';
      ctx.font = '900 9px monospace, monospace';
      ctx.letterSpacing = '0.25em';
      ctx.fillText(match.shootoutScore.toUpperCase(), 300, 355);
    }

    // 8. Defining Moment Title & Segment
    ctx.fillStyle = momentPanelBg;
    ctx.beginPath();
    ctx.roundRect(45, 395, 510, 190, 2);
    ctx.fill();
    
    ctx.strokeStyle = momentPanelBorder;
    ctx.beginPath();
    ctx.roundRect(45, 395, 510, 190, 2);
    ctx.stroke();

    ctx.fillStyle = titleStampColor;
    ctx.font = '900 10px system-ui, sans-serif';
    ctx.letterSpacing = '0.3em';
    ctx.fillText('DEFINING MOMENT', 300, 424);

    ctx.fillStyle = textPrimary;
    ctx.font = 'italic bold 17px Georgia, serif';
    wrapText(ctx, `"${match.definingMoment.title}"`, 300, 460, 440, 24);

    // Moment Description (Slightly smaller, muted gold/grey/amber)
    ctx.fillStyle = textMuted;
    ctx.font = 'normal 12px Georgia, serif';
    wrapText(ctx, match.definingMoment.description, 300, 508, 450, 18);

    // 9. Match Stamp details
    ctx.strokeStyle = devStyle === 'chrome' ? 'rgba(255, 255, 255, 0.1)' : devStyle === 'sepia' ? 'rgba(217, 119, 6, 0.15)' : 'rgba(212, 175, 55, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, 610);
    ctx.lineTo(540, 610);
    ctx.stroke();

    ctx.fillStyle = textPrimary;
    ctx.font = 'normal 13px Georgia, serif';
    ctx.fillText(`“${match.title}”`, 300, 634);

    ctx.font = 'normal 10px system-ui, sans-serif';
    ctx.fillStyle = labelColor;
    ctx.letterSpacing = '0.05em';
    ctx.fillText(cardDescription, 300, 660);

    // 10. Archival Barcode at the bottom
    const barcodeXStart = 160;
    const barcodeY = 690;
    const barcodeHeight = 35;
    ctx.fillStyle = borderColor;
    for (let i = 0; i < 48; i++) {
      const weight = ((i % 3 === 0) || (i % 7 === 0)) ? 4.5 : 1.5;
      const gap = Math.sin(i * 1.5) > 0 ? 6 : 2;
      ctx.fillRect(barcodeXStart + (i * 5.8), barcodeY, weight, barcodeHeight);
    }

    ctx.fillStyle = labelColor;
    ctx.font = 'bold 9px monospace, monospace';
    ctx.letterSpacing = '0.4em';
    ctx.fillText(`*DECDEC-${match.year}-${match.id}*`, 300, 746);

    // Extract temporary download URL pattern
    setDownloadUrl(canvas.toDataURL('image/png'));
  }, [match, devStyle]);

  // Tactile film exposure & developing interval simulation
  useEffect(() => {
    setDevelopingProgress(0);
    setIsDeveloping(true);

    let progressLocal = 0;
    let audioCtx: AudioContext | null = null;
    let osc: OscillatorNode | null = null;
    let filter: BiquadFilterNode | null = null;
    let gain: GainNode | null = null;

    try {
      // Initialize an organic projector vintage hum
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      osc = audioCtx.createOscillator();
      filter = audioCtx.createBiquadFilter();
      gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(58, audioCtx.currentTime); // low 50Hz hum
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(100, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.006, audioCtx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
    } catch (e) {
      // Browser blocked autoplay audio
    }

    const interval = setInterval(() => {
      progressLocal += Math.floor(Math.random() * 3) + 2;
      
      if (progressLocal >= 100) {
        progressLocal = 100;
        clearInterval(interval);
        setIsDeveloping(false);
        playSuccess(); // vintage exposure flash tone

        if (osc && audioCtx) {
          try {
            gain?.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);
            setTimeout(() => {
              osc?.stop();
              audioCtx?.close();
            }, 200);
          } catch (e) {}
        }
      } else {
        // Play satisfying high-speed mechanical film ticks during rotation progress!
        if (progressLocal % 7 === 0 || progressLocal % 8 === 0) {
          playGearTick();
        }

        if (osc && audioCtx) {
          try {
            // Procedural camera vibration frequency flutter
            osc.frequency.setValueAtTime(58 + Math.sin(progressLocal * 0.9) * 2, audioCtx.currentTime);
          } catch (e) {}
        }
      }

      setDevelopingProgress(progressLocal);

      // Procedural messages based on selected developer recipe
      if (progressLocal < 20) {
        setDevelopingStep(
          devStyle === 'chrome' 
            ? 'Preparing silver halide bath chambers...' 
            : devStyle === 'sepia' 
              ? 'Brewing aged amber sepia developer acids...' 
              : 'Stirring gilded ink photoactive solution...'
        );
      } else if (progressLocal < 38) {
        setDevelopingStep(
          devStyle === 'chrome' 
            ? 'Exposing high-contrast photolytic film...' 
            : devStyle === 'sepia' 
              ? 'Sensitizing carbon papyrus grain layout...' 
              : 'Sensitizing photoactive gold leaf emulsion...'
        );
      } else if (progressLocal < 55) {
        setDevelopingStep(
          devStyle === 'chrome' 
            ? 'Etching chrome double panel frame lines...' 
            : devStyle === 'sepia' 
              ? 'Imprinting warm rustic bronze bracket borders...' 
              : 'Laying down ornate double-gilded gold borders...'
        );
      } else if (progressLocal < 75) {
        setDevelopingStep(
          devStyle === 'chrome' 
            ? 'Engraving high-contrast stamp barcodes...' 
            : devStyle === 'sepia' 
              ? 'Applying vintage weathered stamps & grids...' 
              : 'Synthesizing vintage metadata stamp barcodes...'
        );
      } else if (progressLocal < 92) {
        setDevelopingStep(
          devStyle === 'chrome' 
            ? 'Treating print in high-resolution fixative...' 
            : devStyle === 'sepia' 
              ? 'Sealing antique cellulose papyrus coat...' 
              : 'Coating surface with glossy protective lacquer...'
        );
      } else {
        setDevelopingStep(
          devStyle === 'chrome' 
            ? 'Finalizing silver-grain dry certificate...' 
            : devStyle === 'sepia' 
              ? 'Drawing old signature decider timestamps...' 
              : 'Polishing signature gold decree of the match...'
        );
      }
    }, 55);

    return () => {
      clearInterval(interval);
      if (osc) {
        try {
          osc.stop();
        } catch (e) {}
      }
      if (audioCtx) {
        try {
          audioCtx.close();
        } catch (e) {}
      }
    };
  }, [match, devStyle]);

  // Load storage history
  useEffect(() => {
    loadLocalHistory();
    checkIfSaved();
  }, [match]);

  const loadLocalHistory = () => {
    try {
      const historyStr = localStorage.getItem('vault_saved_snapshots');
      if (historyStr) {
        const parsed = JSON.parse(historyStr);
        setLocalHistory(parsed);
      }
    } catch (e) {
      console.warn("Could not read local shared history from localStorage", e);
    }
  };

  const checkIfSaved = () => {
    try {
      const historyStr = localStorage.getItem('vault_saved_snapshots');
      if (historyStr) {
        const parsed: SavedSnapshot[] = JSON.parse(historyStr);
        const exists = parsed.some(item => item.matchId === match.id);
        setSavedLocally(exists);
      }
    } catch (e) {}
  };

  // PERSIST TO BROWSER LOCAL STORAGE
  const handleSaveToVault = () => {
    if (isDeveloping) return;
    playSuccess();
    try {
      const historyStr = localStorage.getItem('vault_saved_snapshots') || '[]';
      const parsed: SavedSnapshot[] = JSON.parse(historyStr);
      
      // Avoid duplicate saves for the same match
      const existsIndex = parsed.findIndex(item => item.matchId === match.id);
      const newSnapshot: SavedSnapshot = {
        id: `snap_${Date.now()}`,
        matchId: match.id,
        matchTitle: match.title,
        year: match.year,
        teamA: match.teamA,
        teamB: match.teamB,
        scoreA: match.scoreA,
        scoreB: match.scoreB,
        definingMomentTitle: match.definingMoment.title,
        savedAt: new Date().toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      };

      if (existsIndex >= 0) {
        parsed[existsIndex] = newSnapshot;
      } else {
        parsed.unshift(newSnapshot);
      }

      localStorage.setItem('vault_saved_snapshots', JSON.stringify(parsed));
      setSavedLocally(true);
      loadLocalHistory();
    } catch (e) {
      console.error("Local storage error:", e);
    }
  };

  const handleDeleteSaved = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const historyStr = localStorage.getItem('vault_saved_snapshots') || '[]';
      const parsed: SavedSnapshot[] = JSON.parse(historyStr);
      const updated = parsed.filter(item => item.id !== id);
      localStorage.setItem('vault_saved_snapshots', JSON.stringify(updated));
      loadLocalHistory();
      
      // If the currently viewed match snapshot is deleted, update indicator state
      const stillSaved = updated.some(item => item.matchId === match.id);
      setSavedLocally(stillSaved);
    } catch (e) {}
  };

  // SYSTEM SOCIAL SHARE TRIGGER
  const handleSocialShare = async () => {
    playClick();
    const shareMessage = `🔥 Reliving ${match.year}'s legendary "${match.title}" World Cup classic! Defining Moment: "${match.definingMoment.title}". Explorer:`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${match.year} World Cup Snapshot`,
          text: shareMessage,
          url: shareUrl,
        });
      } catch (err) {
        // Ignored close/abort actions
        copyFallback(shareMessage, shareUrl);
      }
    } else {
      copyFallback(shareMessage, shareUrl);
    }
  };

  const copyFallback = (text: string, url: string) => {
    const combined = `${text} ${url}`;
    navigator.clipboard.writeText(combined).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div id="match-share-overlay" className="fixed inset-0 z-[600] flex items-center justify-center bg-black/95 p-4 md:p-6 overflow-y-auto">
      <motion.div 
        className="w-full max-w-5xl bg-[#0d0d0d] border border-[#D4AF37]/35 grid grid-cols-1 md:grid-cols-12 gap-8 p-6 md:p-10 relative shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 220, damping: 25 }}
      >
        {/* Background decorative grid */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
          style={{
            backgroundImage: `radial-gradient(#D4AF37 0.8px, transparent 0.8px)`,
            backgroundSize: '24px 24px'
          }} 
        />

        {/* Floating Close Header button */}
        <button 
          id="close-share-overlay-btn"
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-[#69707A] hover:text-[#D4AF37] transition-colors p-2 cursor-pointer z-50"
        >
          <X size={24} />
        </button>

        {/* 1. Ticket Card Canvas Stage Preview Column (Left) with Tactile Film Reel Borders */}
        <div className="col-span-1 md:col-span-6 flex flex-col items-center justify-center relative z-10 w-full">
          
          {/* Complete Film Strip Outer Container */}
          <div className="w-full max-w-[430px] flex items-stretch bg-neutral-950 border border-neutral-800 rounded-sm p-2 shadow-[0_0_60px_rgba(0,0,0,0.85)] select-none">
            
            {/* Left sprocket hole rail */}
            <div className="flex flex-col justify-around px-1.5 bg-neutral-900/40 border-r border-neutral-900 shrink-0">
              {Array.from({ length: 14 }).map((_, i) => (
                <div 
                  key={`sprock-l-${i}`} 
                  className="w-2.5 h-1.5 bg-neutral-950 border border-neutral-800 rounded-[1.5px] opacity-60 transition-all duration-200"
                  style={{
                    borderColor: isDeveloping 
                      ? devStyle === 'chrome' ? 'rgba(239, 68, 68, 0.4)' : devStyle === 'sepia' ? 'rgba(249, 115, 22, 0.4)' : 'rgba(212, 175, 55, 0.4)'
                      : 'rgba(120,120,120,0.15)',
                    boxShadow: isDeveloping
                      ? `0 0 5px ${devStyle === 'chrome' ? 'rgba(239, 68, 68, 0.25)' : devStyle === 'sepia' ? 'rgba(249, 115, 22, 0.25)' : 'rgba(212, 175, 55, 0.25)'}`
                      : 'none'
                  }} 
                />
              ))}
            </div>

            {/* Canvas Main Developing Bay */}
            <div className="flex-1 min-w-0 bg-[#050505] relative rounded-sm group overflow-hidden aspect-[3/4]">
              {/* Realtime HTML Mirror as loading preview before canvas is initialized/rendered */}
              <canvas 
                ref={canvasRef} 
                className="w-full h-full object-contain block transition-all duration-300"
                style={{
                  filter: isDeveloping
                    ? `blur(${Math.max(0, 16 - developingProgress * 0.2)}px) grayscale(${Math.max(0, 100 - developingProgress)}%) brightness(${0.25 + (developingProgress / 100) * 0.75})`
                    : 'none'
                }}
              />

              {/* Cinematic Developing Overlay */}
              <AnimatePresence>
                {isDeveloping && (
                  <motion.div 
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/75 backdrop-blur-[1px] p-6 text-center select-none"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                  >
                    {/* Safelight Room warn indicator decal */}
                    <div 
                      className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-0.5 border rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: devStyle === 'chrome' ? 'rgba(127, 29, 29, 0.85)' : devStyle === 'sepia' ? 'rgba(120, 53, 4, 0.85)' : 'rgba(40, 26, 6, 0.85)',
                        borderColor: devStyle === 'chrome' ? 'rgba(239, 68, 68, 0.4)' : devStyle === 'sepia' ? 'rgba(249, 115, 22, 0.4)' : 'rgba(212, 175, 55, 0.4)',
                      }}
                    >
                      <span 
                        className="w-1.5 h-1.5 rounded-full animate-pulse" 
                        style={{
                          backgroundColor: devStyle === 'chrome' ? '#ef4444' : devStyle === 'sepia' ? '#f97316' : '#D4AF37'
                        }}
                      />
                      <span 
                        className="font-mono text-[7px] uppercase tracking-widest font-bold"
                        style={{
                          color: devStyle === 'chrome' ? '#fca5a5' : devStyle === 'sepia' ? '#fed7aa' : '#F5F2EA'
                        }}
                      >
                        {devStyle === 'chrome' ? 'RUBY SAFELIGHT' : devStyle === 'sepia' ? 'AMBER SAFELIGHT' : 'GOLD SAFELIGHT'}
                      </span>
                    </div>

                    {/* Horizontal scanning laser */}
                    <motion.div 
                      className="absolute left-0 right-0 h-[2px] z-30"
                      style={{
                        backgroundColor: devStyle === 'chrome' ? '#ef4444' : devStyle === 'sepia' ? '#f97316' : '#D4AF37',
                        boxShadow: `0 0 15px ${devStyle === 'chrome' ? '#ef4444' : devStyle === 'sepia' ? '#f97316' : '#D4AF37'}`
                      }}
                      animate={{ y: [0, 420, 0] }}
                      transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                    />

                    <div className="space-y-4">
                      {/* Rotating film aperture gear emblem */}
                      <div className="flex justify-center">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                          style={{
                            color: devStyle === 'chrome' ? '#ef4444' : devStyle === 'sepia' ? '#f97316' : '#D4AF37'
                          }}
                        >
                          <Camera size={34} />
                        </motion.div>
                      </div>

                      <div 
                        className="font-mono text-[8px] tracking-[0.3em] uppercase font-bold animate-pulse"
                        style={{
                          color: devStyle === 'chrome' ? '#ef4444' : devStyle === 'sepia' ? '#f97316' : '#D4AF37'
                        }}
                      >
                        {devStyle === 'chrome' ? 'Developing Silver Halides...' : devStyle === 'sepia' ? 'Dyeing Parchment Fiber...' : 'Infusing Golden Leaf...'}
                      </div>

                      {/* Mechanical progress percentage */}
                      <div className="font-serif text-[#F5F2EA] text-5xl font-extrabold tracking-tight">
                        {developingProgress}%
                      </div>

                      {/* Step log descriptor */}
                      <div className="font-mono text-[8px] text-[#8E9AA6] tracking-wider uppercase h-8 max-w-[240px] mx-auto text-center leading-relaxed">
                        {developingStep}
                      </div>

                      {/* Vintage procedural loading bar */}
                      <div 
                        className="w-36 h-1.5 bg-[#111] p-[1px] mx-auto border"
                        style={{
                          borderColor: devStyle === 'chrome' ? 'rgba(239, 68, 68, 0.3)' : devStyle === 'sepia' ? 'rgba(249, 115, 22, 0.3)' : 'rgba(212, 175, 55, 0.3)'
                        }}
                      >
                        <div 
                          className="h-full transition-all duration-100 ease-out" 
                          style={{ 
                            width: `${developingProgress}%`,
                            backgroundColor: devStyle === 'chrome' ? '#ef4444' : devStyle === 'sepia' ? '#f97316' : '#D4AF37'
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right sprocket hole rail */}
            <div className="flex flex-col justify-around px-1.5 bg-neutral-900/40 border-l border-neutral-900 shrink-0">
              {Array.from({ length: 14 }).map((_, i) => (
                <div 
                  key={`sprock-r-${i}`} 
                  className="w-2.5 h-1.5 bg-neutral-950 border border-neutral-800 rounded-[1.5px] opacity-60 transition-all duration-200"
                  style={{
                    borderColor: isDeveloping 
                      ? devStyle === 'chrome' ? 'rgba(239, 68, 68, 0.4)' : devStyle === 'sepia' ? 'rgba(249, 115, 22, 0.4)' : 'rgba(212, 175, 55, 0.4)'
                      : 'rgba(120,120,120,0.15)',
                    boxShadow: isDeveloping
                      ? `0 0 5px ${devStyle === 'chrome' ? 'rgba(239, 68, 68, 0.25)' : devStyle === 'sepia' ? 'rgba(249, 115, 22, 0.25)' : 'rgba(212, 175, 55, 0.25)'}`
                      : 'none'
                  }} 
                />
              ))}
            </div>

          </div>

          <span className="font-mono text-[8px] text-[#69707A] tracking-wider uppercase mt-4 block">
            Archival Memento Certificate • procedurally synthesized at {new Date().getFullYear()} UTC
          </span>
        </div>

        {/* 2. Custom Interactions & Keepsake Collection Drawer (Right) */}
        <div className="col-span-1 md:col-span-6 flex flex-col justify-between space-y-8 relative z-10 h-full">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-[#D4AF37]" />
              <span className="font-sans text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold">MATCH TRANSMISSION DESK</span>
            </div>
            <h2 className="font-serif text-[#F5F2EA] text-2xl md:text-3.5xl tracking-tight font-black uppercase leading-none">
              Snapshot Memento
            </h2>
            <p className="font-serif text-[#8E9AA6] text-xs italic mt-2 leading-relaxed">
              Export this beautifully curated heritage passport celebrating the extreme adrenaline and core dramatic turn of the game.
            </p>

            <div className="h-px bg-[#D4AF37]/25 my-5" />

            {/* Quick Summary Block details */}
            <div className="space-y-4 font-serif bg-black/40 border border-white/5 p-4 rounded-none">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#69707A]">Historic Era</span>
                <span className="text-[#F5F2EA] font-semibold font-mono tracking-wider uppercase">{match.era} Timeline</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#69707A]">Match Year</span>
                <span className="text-[#D4AF37] font-bold font-mono text-sm">{match.year} decider</span>
              </div>
              <div className="flex justify-between items-start text-xs border-t border-white/5 pt-3">
                <span className="text-[#69707A] shrink-0 w-24">Defining Moment</span>
                <span className="text-white font-serif italic text-right leading-relaxed font-semibold">
                  "{match.definingMoment.title}"
                </span>
              </div>
            </div>

            {/* Chemical Formula Option Preset Selector */}
            <div className="mt-5 border border-zinc-800 bg-black/60 p-4 relative rounded-none">
              <div className="absolute top-0 right-4 translate-y-[-50%] bg-[#0d0d0d] border border-zinc-800 px-2 font-mono text-[7px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold">
                Chemical Formula Preset
              </div>
              <span className="block font-sans text-[9px] tracking-wider text-[#69707A] uppercase font-bold mb-2.5">
                Select Photographic Paper & Developer Formula/Emulsion:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    playClick();
                    setDevStyle('royal');
                  }}
                  className={`py-2 px-1.5 font-mono text-[8.5px] uppercase tracking-wider text-center border transition-all cursor-pointer ${
                    devStyle === 'royal'
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                      : 'bg-transparent border-white/5 hover:border-white/20 text-[#69707A]'
                  }`}
                >
                  Royal Gold
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setDevStyle('chrome');
                  }}
                  className={`py-2 px-1.5 font-mono text-[8.5px] uppercase tracking-wider text-center border transition-all cursor-pointer ${
                    devStyle === 'chrome'
                      ? 'bg-zinc-800/15 border-white text-white'
                      : 'bg-transparent border-white/5 hover:border-white/20 text-[#69707A]'
                  }`}
                >
                  Halide Chrome
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setDevStyle('sepia');
                  }}
                  className={`py-2 px-1.5 font-mono text-[8.5px] uppercase tracking-wider text-center border transition-all cursor-pointer ${
                    devStyle === 'sepia'
                      ? 'bg-amber-950/15 border-amber-600 text-amber-500'
                      : 'bg-transparent border-white/5 hover:border-white/20 text-[#69707A]'
                  }`}
                >
                  Aged Sepia
                </button>
              </div>

              {/* Developer Trigger Button when already finalized */}
              {!isDeveloping && (
                <button
                  onClick={() => {
                    playSuccess();
                    setIsDeveloping(true);
                    setDevelopingProgress(0);
                  }}
                  className="w-full mt-3.5 flex items-center justify-center gap-2 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 font-mono text-[8.5px] text-[#A3A3A3] hover:text-[#D4AF37] uppercase tracking-widest transition-all cursor-pointer"
                >
                  <Camera size={12} className="animate-pulse" />
                  <span>Re-Develop Chemistry Batch</span>
                </button>
              )}
            </div>

            {/* Action buttons list */}
            <div className="flex flex-col gap-3 mt-5">
              {/* BUTTON 1: Download Snapshot PNG */}
              {isDeveloping ? (
                <div className="w-full flex items-center justify-center gap-2.5 bg-[#121212] border border-[#D4AF37]/15 text-[#69707A] font-sans text-xs font-bold uppercase tracking-widest py-3 select-none">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin inline-block" />
                  <span>Processing Silver Film ({developingProgress}%)</span>
                </div>
              ) : (
                downloadUrl && (
                  <a 
                    id="download-snapshot-anchor"
                    href={downloadUrl} 
                    download={`WorldCup_${match.year}_Snapshot.png`}
                    onClick={playClick}
                    className="w-full flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-white text-black font-sans text-xs font-bold uppercase tracking-widest py-3 transition-colors cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Download Collectible Card</span>
                  </a>
                )
              )}

              {/* BUTTON 2: Save to Storage */}
              <button 
                id="save-to-storage-vault-btn"
                onClick={handleSaveToVault}
                disabled={isDeveloping}
                className={`w-full flex items-center justify-center gap-2.5 font-sans text-xs font-bold uppercase tracking-widest py-3 border transition-colors ${
                  isDeveloping 
                    ? 'border-white/5 bg-[#090909] text-[#4E5661] cursor-not-allowed opacity-45 select-none'
                    : savedLocally 
                      ? 'border-[#22c55e]/50 bg-[#22c55e]/15 text-[#22c55e] cursor-pointer' 
                      : 'border-[#D4AF37]/50 hover:border-white text-[#D4AF37] hover:text-white bg-transparent cursor-pointer'
                }`}
              >
                <Bookmark size={14} className={savedLocally && !isDeveloping ? "fill-[#22c55e]" : ""} />
                <span>{isDeveloping ? "Please wait..." : savedLocally ? "Saved in Local Vault" : "Store as Keepsake"}</span>
              </button>

              {/* BUTTON 3: Trigger Social Share / Clipboard Fallback */}
              <button 
                id="trigger-social-share-btn"
                onClick={handleSocialShare}
                disabled={isDeveloping}
                className={`w-full flex items-center justify-center gap-2.5 border font-sans text-xs font-bold uppercase tracking-widest py-3 transition-all ${
                  isDeveloping
                    ? 'border-white/5 bg-[#090909] text-[#4E5661] cursor-not-allowed opacity-45 select-none'
                    : 'border-white/10 hover:border-white text-[#8E9AA6] hover:text-white bg-transparent cursor-pointer'
                }`}
              >
                <Share2 size={14} />
                <span>{isDeveloping ? "Analyzing Stream..." : copied ? "Copied Link & Text!" : "Share Match Stream"}</span>
              </button>
            </div>
          </div>

          {/* Local Collector Vault list */}
          <div className="pt-4 border-t border-[#4E5661]/25">
            <div className="flex justify-between items-center mb-3">
              <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#69707A] font-extrabold flex items-center gap-1.5">
                <Trophy size={11} className="text-[#D4AF37]" />
                Your Collective Records ({localHistory.length})
              </span>
            </div>

            {localHistory.length === 0 ? (
              <div className="bg-black/25 outline-dashed outline-1 outline-white/5 py-4 px-3 text-center text-[10px] text-[#69707A] font-serif italic">
                No keepsakes stored in local memory. Select "Store as Keepsake" to start your tournament collection folder.
              </div>
            ) : (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin max-h-[110px]">
                {localHistory.slice(0, 5).map((snap) => (
                  <div 
                    key={snap.id}
                    className="flex-shrink-0 w-44 bg-[#141414] border border-[#D4AF37]/20 p-2.5 flex flex-col justify-between group/snap relative overflow-hidden"
                  >
                    <div className="font-mono text-[9px] text-[#D4AF37] font-bold flex justify-between items-center mb-1">
                      <span>{snap.year} decider</span>
                      <button 
                        onClick={(e) => handleDeleteSaved(snap.id, e)}
                        className="text-[#69707A] hover:text-red-500 opacity-0 group-hover/snap:opacity-100 transition-opacity p-0.5"
                        title="Delete this keepsake"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                    <p className="font-sans font-extrabold text-[10px] text-white tracking-tight truncate">
                      {snap.teamA} vs {snap.teamB}
                    </p>
                    <p className="font-serif italic text-[8.5px] text-[#69707A] truncate mt-1">
                      "{snap.definingMomentTitle}"
                    </p>
                    <span className="text-[7px] font-mono text-[#4E5661] text-right block mt-2">
                       {snap.savedAt}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
