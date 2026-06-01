import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Award, 
  BarChart3, 
  Globe, 
  Film, 
  Map, 
  Search, 
  X, 
  Compass, 
  ChevronRight, 
  Layers,
  History,
} from 'lucide-react';
import { tournaments, legends, recordHalls } from '../data';
import { nationsData } from '../nationsData';
import { stadiumsData } from '../stadiumsData';

const SEARCHABLE_MATCHES = [
  { id: '1930-final', title: 'Uruguay vs Argentina (1930)', year: 1930, score: '4-2', desc: 'The inaugural final in Montevideo.' },
  { id: '1950-uruguay-brazil', title: 'Uruguay vs Brazil (1950)', year: 1950, score: '2-1', desc: 'The historic "Maracanazo" which shocked Brazil.' },
  { id: '1954-germany-hungary', title: 'West Germany vs Hungary (1954)', year: 1954, score: '3-2', desc: 'The "Miracle of Bern".' },
  { id: '1966-england-germany', title: 'England vs West Germany (1966)', year: 1966, score: '4-2 (aet)', desc: 'Geoff Hurst’s legendary hat-trick.' },
  { id: '1970-italy-germany', title: 'Italy vs West Germany (1970)', year: 1970, score: '4-3 (aet)', desc: 'The "Game of the Century".' },
  { id: '1982-italy-brazil', title: 'Italy vs Brazil (1982)', year: 1982, score: '3-2', desc: 'Paolo Rossi’s iconic hat-trick.' },
  { id: '1986-argentina-england', title: 'Argentina vs England (1986)', year: 1986, score: '2-1', desc: 'Diego Maradona’s hand-of-god.' },
  { id: '1994-brazil-italy', title: 'Brazil vs Italy (1994)', year: 1994, score: '0-0 (3-2 p)', desc: 'The Pasadena drama.' },
  { id: '1998-france-brazil', title: 'France vs Brazil (1998)', year: 1998, score: '3-0', desc: 'Zidane’s double headers.' },
  { id: '2002-brazil-germany', title: 'Brazil vs Germany (2002)', year: 2002, score: '2-0', desc: 'Ronaldo’s magnificent double.' },
  { id: '2014-germany-brazil', title: 'Germany vs Brazil (2014)', year: 2014, score: '7-1', desc: 'The absolute dismantling of Brazil.' },
  { id: '2022-argentina-france', title: 'Argentina vs France (2022)', year: 2022, score: '3-3 (4-2 p)', desc: 'Conclusions of Lionel Messi’s path to divinity.' }
];

interface ArchiveNavSystemProps {
  onExploreMatches: (matchId?: string) => void;
  onExploreNations: (nationId?: string) => void;
  onExploreLegends: (legendId?: string) => void;
  onExploreRecords: (recordId?: string) => void;
  onExploreStadiums: (stadiumId?: string) => void;
  onExploreTournament: (year: number) => void;
  onExploreHistory: () => void;
  onExploreAtlas: () => void;
}

export function ArchiveNavSystem({
  onExploreMatches,
  onExploreNations,
  onExploreLegends,
  onExploreRecords,
  onExploreStadiums,
  onExploreTournament,
  onExploreHistory,
  onExploreAtlas
}: ArchiveNavSystemProps) {
  const [indexOpen, setIndexOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenFolder = (catalogId: string) => {
    setIndexOpen(false);
    switch (catalogId) {
      case 'atlas': onExploreAtlas(); break;
      case 'history': onExploreHistory(); break;
      case 'tournaments': onExploreHistory(); break;
      case 'legends': onExploreLegends(); break;
      case 'records': onExploreRecords(); break;
      case 'nations': onExploreNations(); break;
      case 'matches': onExploreMatches(); break;
      case 'stadiums': onExploreStadiums(); break;
      default: break;
    }
  };

  interface SearchResult {
    id: string;
    type: 'player' | 'tournament' | 'nation' | 'stadium' | 'match' | 'record';
    title: string;
    subtitle: string;
  }

  const getFilteredResults = (): SearchResult[] => {
    const results: SearchResult[] = [];
    const query = searchQuery.toLowerCase().trim();
    if (!query) return [];

    legends.forEach(l => {
      if (l.name.toLowerCase().includes(query)) {
        results.push({ id: l.id, type: 'player', title: l.name, subtitle: `Legend • ${l.nation}` });
      }
    });

    tournaments.forEach(t => {
      if (t.year.toString().includes(query) || t.host.toLowerCase().includes(query)) {
        results.push({ id: t.year.toString(), type: 'tournament', title: `${t.year} World Cup`, subtitle: `Host: ${t.host}` });
      }
    });

    nationsData.forEach(n => {
      if (n.name.toLowerCase().includes(query)) {
        results.push({ id: n.id, type: 'nation', title: n.name, subtitle: `${n.continent} Nation` });
      }
    });

    stadiumsData.forEach(s => {
      if (s.name.toLowerCase().includes(query)) {
        results.push({ id: s.id, type: 'stadium', title: s.name, subtitle: `${s.city}, ${s.country}` });
      }
    });

    SEARCHABLE_MATCHES.forEach(m => {
      if (m.title.toLowerCase().includes(query)) {
        results.push({ id: m.id, type: 'match', title: m.title, subtitle: `Match • ${m.year}` });
      }
    });

    return results;
  };

  const results = getFilteredResults();

  const handleResultSelect = (result: SearchResult) => {
    setSearchOpen(false);
    setSearchQuery('');
    switch (result.type) {
      case 'player': onExploreLegends(result.id); break;
      case 'tournament': onExploreTournament(Number(result.id)); break;
      case 'nation': onExploreNations(result.id); break;
      case 'stadium': onExploreStadiums(result.id); break;
      case 'match': onExploreMatches(result.id); break;
      case 'record': onExploreRecords(result.id); break;
    }
  };

  return (
    <>
      <nav id="archive-navbar" className={`fixed top-0 left-0 right-0 z-[400] transition-all duration-500 py-5 px-6 md:px-12 flex justify-between items-center ${scrolled ? 'bg-[#050505]/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
        <div onClick={onExploreHistory} className="flex items-center gap-3 cursor-pointer group">
          <Trophy size={18} className="text-[#D4AF37]" />
          <span className="font-serif text-white text-sm tracking-[0.3em] font-bold uppercase">WC VAULT</span>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setSearchOpen(true)} className="p-2 text-white/50 hover:text-[#D4AF37] transition-colors">
            <Search size={20} />
          </button>
          <button onClick={() => setIndexOpen(true)} className="bg-[#D4AF37] hover:bg-white text-black text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded transition-all">
            Vault Index
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {indexOpen && (
          <motion.div className="fixed inset-0 z-[600] bg-[#050505] p-6 md:p-12 overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-white uppercase tracking-widest">The Index</h2>
                <button onClick={() => setIndexOpen(false)} className="text-white/50 hover:text-white"><X size={24} /></button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'history', title: 'Time Machine', icon: History },
                  { id: 'atlas', title: 'Football Atlas', icon: Compass },
                  { id: 'legends', title: 'Legends Hall', icon: Award },
                  { id: 'records', title: 'Records Monolith', icon: BarChart3 },
                  { id: 'nations', title: 'Nations Atlas', icon: Globe },
                  { id: 'matches', title: 'Classic Matches', icon: Film },
                  { id: 'stadiums', title: 'Stadiums Showcase', icon: Map }
                ].map((item) => (
                  <button key={item.id} onClick={() => handleOpenFolder(item.id)} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded hover:border-[#D4AF37] transition-all text-left">
                    <item.icon className="text-[#D4AF37]" size={20} />
                    <span className="text-white font-bold uppercase tracking-widest text-sm">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div className="fixed inset-0 z-[600] bg-[#050505]/95 backdrop-blur-xl p-6 md:p-12 overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-4 border-b border-white/20 pb-4 mb-8">
                <Search size={24} className="text-[#D4AF37]" />
                <input 
                  autoFocus
                  placeholder="Search World Cup history..."
                  className="bg-transparent border-none outline-none text-white text-xl w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => setSearchOpen(false)} className="text-white/50 hover:text-white"><X size={24} /></button>
              </div>

              <div className="space-y-2">
                {results.map((r) => (
                  <button key={r.id} onClick={() => handleResultSelect(r)} className="w-full flex items-center justify-between p-4 bg-white/5 rounded hover:bg-white/10 transition-all text-left group">
                    <div>
                      <h4 className="text-white font-bold">{r.title}</h4>
                      <p className="text-white/40 text-xs uppercase tracking-widest">{r.subtitle}</p>
                    </div>
                    <ChevronRight size={16} className="text-white/20 group-hover:text-[#D4AF37] transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
