import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Info,
  Image as ImageIcon
} from 'lucide-react';

interface VerifiedImageProps {
  src?: string;
  alt: string;
  className?: string;
  aspectRatio?: '16:9' | '4:5' | '3:2' | '1:1' | 'auto';
  date?: string; 
  tournament?: string; 
  location?: string; 
  context?: string; 
  photographer?: string; 
  entityType?: 'player' | 'stadium' | 'match' | 'trophy' | 'document';
}

export const VerifiedImage = React.memo(function VerifiedImage({
  src,
  alt,
  className = '',
  aspectRatio = '16:9',
  date,
  tournament,
  location,
  context,
  photographer = 'FIFA Historical Media Archive',
  entityType
}: VerifiedImageProps) {
  const [hasError, setHasError] = useState(!src);
  const [isHovered, setIsHovered] = useState(false);

  // Coordinate ratio sizing
  const ratioClasses = {
    '16:9': 'aspect-[16/9]',
    '4:5': 'aspect-[4/5]',
    '3:2': 'aspect-[3/2]',
    '1:1': 'aspect-square',
    'auto': 'aspect-auto'
  }[aspectRatio];

  if (hasError || !src) {
    return (
      <div 
        className={`relative w-full ${ratioClasses} bg-[#121212] border border-white/5 rounded p-4 flex flex-col items-center justify-center overflow-hidden group ${className}`}
      >
        <ImageIcon className="text-white/10 w-12 h-12 mb-2" />
        <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest text-center px-4">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div 
      className={`relative group rounded overflow-hidden border border-white/5 bg-[#0D0D0D] select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${ratioClasses} overflow-hidden w-full h-full relative`}>
        <img 
          src={src} 
          alt={alt} 
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Subtle Ambient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-90 transition-opacity duration-300 pointer-events-none z-10" />

        {/* Discreet Verified Status Badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10 z-20">
          <ShieldCheck size={10} className="text-[#D4AF37]" />
          <span className="font-mono text-[7px] text-white/70 uppercase tracking-widest leading-none">
            Verified
          </span>
        </div>

        {/* Caption Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 to-transparent z-15 flex flex-col justify-end">
          <div className="flex items-center gap-2 mb-1">
            {tournament && (
              <span className="font-sans text-[7px] text-[#D4AF37] tracking-widest font-bold uppercase leading-none">
                {tournament}
              </span>
            )}
            {date && (
              <span className="font-mono text-[7px] text-white/40 tracking-wider uppercase leading-none">
                {date}
              </span>
            )}
          </div>
          
          <p className="font-serif text-[10px] font-bold text-white tracking-wide leading-tight line-clamp-1 pr-4">
            {alt}
          </p>
          
          {context && isHovered && (
             <motion.p 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-[9px] text-white/50 italic mt-1 line-clamp-2 leading-relaxed"
             >
               {context}
             </motion.p>
          )}
        </div>
      </div>
    </div>
  );
});
