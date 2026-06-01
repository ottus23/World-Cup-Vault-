import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Share2, 
  Download, 
  Copy, 
  Check, 
  X, 
  Trophy,
} from 'lucide-react';
import { MatchDetails } from './HistoricMatchesVault';

interface MatchShareSystemProps {
  match: MatchDetails;
  onClose: () => void;
}

export function MatchShareSystem({ match, onClose }: MatchShareSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [theme, setTheme] = useState<'gold' | 'silver' | 'sepia'>('gold');

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

  // Redraw/Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 600 * dpr;
    canvas.height = 800 * dpr;
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    ctx.scale(dpr, dpr);

    let bgFill = '#060606';
    let borderColor = '#D4AF37';
    let textPrimary = '#FFFFFF';
    let textMuted = '#BAC5CF';
    let bannerBg = '#111111';
    let scoreColor = '#D4AF37';

    if (theme === 'silver') {
      bgFill = '#0A0A0A';
      borderColor = '#D1D5DB';
      textMuted = '#9CA3AF';
      bannerBg = '#1F2937';
      scoreColor = '#F9FAFB';
    } else if (theme === 'sepia') {
      bgFill = '#1c0f06';
      borderColor = '#D97706';
      textPrimary = '#FEF3C7';
      textMuted = '#FCD34D';
      bannerBg = '#2F1809';
      scoreColor = '#FBBF24';
    }

    ctx.fillStyle = bgFill;
    ctx.fillRect(0, 0, 600, 800);

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, 560, 760);

    ctx.fillStyle = borderColor;
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('WORLD CUP MEMENTO', 300, 55);

    ctx.fillStyle = textPrimary;
    ctx.font = 'bold 32px serif';
    ctx.fillText(`${match.teamA.toUpperCase()} VS ${match.teamB.toUpperCase()}`, 300, 160);
    
    ctx.fillStyle = bannerBg;
    ctx.fillRect(150, 220, 300, 80);
    
    ctx.fillStyle = scoreColor;
    ctx.font = 'bold 48px serif';
    ctx.fillText(`${match.scoreA} - ${match.scoreB}`, 300, 275);

    ctx.fillStyle = textPrimary;
    ctx.font = 'italic bold 20px serif';
    wrapText(ctx, `"${match.definingMoment.title}"`, 300, 380, 500, 28);

    ctx.fillStyle = textMuted;
    ctx.font = '16px serif';
    wrapText(ctx, match.definingMoment.description, 300, 480, 500, 22);

    ctx.fillStyle = borderColor;
    ctx.font = 'italic 18px serif';
    ctx.fillText(`${match.year} World Cup • ${match.title}`, 300, 740);

    setDownloadUrl(canvas.toDataURL('image/png'));
  }, [match, theme]);

  const handleSocialShare = async () => {
    const shareMessage = `🔥 Reliving ${match.year}'s match: "${match.title}".`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${match.year} World Cup Snapshot`,
          text: shareMessage,
          url: shareUrl,
        });
      } catch (err) {
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
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const design = {
    bg: theme === 'silver' ? 'bg-[#0A0A0A]' : theme === 'sepia' ? 'bg-[#1c0f06]' : 'bg-[#060606]',
    text: theme === 'sepia' ? 'text-[#FEF3C7]' : 'text-white',
    textMuted: theme === 'silver' ? 'text-[#9CA3AF]' : theme === 'sepia' ? 'text-[#FCD34D]' : 'text-[#BAC5CF]',
    border: theme === 'silver' ? 'border-[#D1D5DB]' : theme === 'sepia' ? 'border-[#D97706]' : 'border-[#D4AF37]',
    scoreText: theme === 'silver' ? 'text-[#F9FAFB]' : theme === 'sepia' ? 'text-[#FBBF24]' : 'text-[#D4AF37]',
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/95 p-4 overflow-y-auto">
      <motion.div 
        className="w-full max-w-4xl bg-[#0d0d0d] border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8 relative shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-2 cursor-pointer z-50"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center">
          <div className={`w-full aspect-[3/4] border-2 ${design.border} ${design.bg} p-6 flex flex-col justify-between relative shadow-xl`}>
             <canvas ref={canvasRef} className="absolute inset-0 opacity-0 pointer-events-none" />
             
             <div className="text-center relative z-10">
               <span className={`text-[10px] font-bold tracking-[0.3em] ${design.border.replace('border-', 'text-')} opacity-80 uppercase`}>World Cup Memento</span>
               <div className="flex flex-col items-center mt-12 text-center">
                 <h3 className={`text-lg font-bold font-serif ${design.text} uppercase tracking-tight`}>{match.teamA} VS {match.teamB}</h3>
                 <div className={`mt-4 py-2 px-6 bg-black/40 border ${design.border} inline-block`}>
                   <span className={`text-3xl font-bold font-serif ${design.scoreText}`}>{match.scoreA} - {match.scoreB}</span>
                 </div>
               </div>
             </div>

             <div className="my-8 text-center relative z-10 px-2 min-h-[140px] flex flex-col justify-center">
               <p className={`italic font-bold text-sm leading-snug mb-3 ${design.text}`}>"{match.definingMoment.title}"</p>
               <p className={`text-[10px] leading-relaxed line-clamp-4 ${design.textMuted}`}>{match.definingMoment.description}</p>
             </div>

             <div className="mt-auto text-center border-t border-white/5 pt-4 relative z-10">
               <p className={`text-[10px] italic font-serif ${design.textMuted}`}>{match.year} World Cup • {match.title}</p>
             </div>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h2 className="text-[#F5F2EA] text-2xl font-bold uppercase tracking-tight font-serif">Snapshot Memento</h2>
            <p className="text-[#8E9AA6] text-sm mt-1 italic">Preserve a digital certificate of this legendary match.</p>
          </div>

          <div className="space-y-3">
             <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Select Theme</span>
             <div className="grid grid-cols-3 gap-2">
                {['gold', 'silver', 'sepia'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setTheme(s as any)}
                    className={`py-2 text-[10px] uppercase font-bold tracking-widest border transition-all cursor-pointer ${theme === s ? 'bg-white/10 border-white text-white' : 'bg-transparent border-white/5 text-gray-500 hover:text-white'}`}
                  >
                    {s}
                  </button>
                ))}
             </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <button 
              onClick={handleSocialShare}
              className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-white text-black py-3 font-bold uppercase text-[11px] tracking-widest transition-all cursor-pointer"
            >
              {copied ? <Check size={16} /> : <Share2 size={16} />}
              {copied ? 'Copied Link' : 'Share Snapshot'}
            </button>
            <a 
              href={downloadUrl}
              download={`${match.year}_${match.id}.png`}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 font-bold uppercase text-[11px] tracking-widest transition-all cursor-pointer"
            >
              <Download size={16} />
              Download PNG
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
