import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { MatchDetails } from './HistoricMatchesVault';

interface TacticalReportViewProps {
  match: MatchDetails;
  onBack: () => void;
}

export function TacticalReportView({ match, onBack }: TacticalReportViewProps) {
  return (
    <div className="col-span-12 flex flex-col h-full z-10 text-[#F5F2EA] p-4 md:p-8 overflow-y-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[#69707A] hover:text-[#D4AF37] transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        <span className="font-sans text-xs uppercase tracking-widest font-bold">Back to Share</span>
      </button>

      <h2 className="font-serif text-3xl md:text-5xl font-black uppercase mb-4 tracking-tight">Tactical Summary</h2>
      <p className="font-serif italic text-lg text-amber-500 mb-8">{match.tacticalView.title}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-black/50 p-6 border border-white/10 rounded-sm">
          <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#69707A] mb-4">Formation</h3>
          <div className="text-xl font-bold">{match.teamA}: {match.tacticalView.formationA}</div>
          <div className="text-xl font-bold">{match.teamB}: {match.tacticalView.formationB}</div>
        </div>
        <div className="bg-black/50 p-6 border border-white/10 rounded-sm">
           <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#69707A] mb-4">Tactical Narrative</h3>
           <p className="text-sm italic text-gray-300 leading-relaxed">{match.tacticalView.narrative}</p>
        </div>
      </div>

      <div className="bg-black/50 p-6 border border-white/10 rounded-sm">
        <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#69707A] mb-6">Match Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           <div><div className="text-sm font-bold text-[#69707A]">Possession</div><div className="text-2xl font-bold mt-1">{match.stats.possessionA}% - {match.stats.possessionB}%</div></div>
           <div><div className="text-sm font-bold text-[#69707A]">Shots</div><div className="text-2xl font-bold mt-1">{match.stats.shotsA} - {match.stats.shotsB}</div></div>
           <div><div className="text-sm font-bold text-[#69707A]">Passes</div><div className="text-2xl font-bold mt-1">{match.stats.passesA} - {match.stats.passesB}</div></div>
           <div><div className="text-sm font-bold text-[#69707A]">Fouls</div><div className="text-2xl font-bold mt-1">{match.stats.foulsA} - {match.stats.foulsB}</div></div>
        </div>
      </div>
    </div>
  );
}
