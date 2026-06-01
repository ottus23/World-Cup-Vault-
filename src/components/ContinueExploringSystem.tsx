import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  ArrowRight, 
  GitCommit, 
  Layers, 
  Hourglass, 
  Network, 
  ChevronRight, 
  History, 
  Sparkles, 
  MapPin, 
  Award,
  Link,
  Milestone
} from 'lucide-react';
import { tournaments, legends, Legend, Tournament } from '../data';
import { nationsData, NationCivilization } from '../nationsData';
import { stadiumsData, Stadium } from '../stadiumsData';
import { CLASSIC_MATCHES, MatchDetails } from './HistoricMatchesVault';

interface ContinueExploringSystemProps {
  currentItemType: 'tournament' | 'legend' | 'nation' | 'stadium' | 'match';
  currentItemId: string | number;
  onExploreMatches?: (matchId: string) => void;
  onExploreNations?: (nationId: string) => void;
  onExploreLegends?: (legendId: string) => void;
  onExploreStadiums?: (stadiumId: string) => void;
  onExploreTournament?: (year: number) => void;
  onExploreHistory?: () => void;
}

// Interfaces for our recommendation candidates
interface DiscoveryCandidate {
  type: 'tournament' | 'legend' | 'nation' | 'stadium' | 'match';
  id: string | number;
  title: string;
  subtitle: string;
  image?: string;
  score: number;
  bondMessage: string;
}

export function ContinueExploringSystem({
  currentItemType,
  currentItemId,
  onExploreMatches,
  onExploreNations,
  onExploreLegends,
  onExploreStadiums,
  onExploreTournament,
  onExploreHistory
}: ContinueExploringSystemProps) {
  // Local interaction states
  const [activeTrailId, setActiveTrailId] = useState<string>('argentina-rise');
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | number | null>(null);

  // Sound Engine feedback helper matching global tone
  const playSfx = (type: 'tick' | 'warp') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      if (type === 'tick') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1500, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.015);
        gain.gain.setValueAtTime(0.012, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.018);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.02);
      } else if (type === 'warp') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      }
    } catch(e) {}
  };

  // 1. DISCOVERY TRAILS DEFINITIONS (CURATED NARRATIVE-DRIVEN PATHWAYS THROUGH TIME)
  const discoveryTrails = useMemo(() => [
    {
      id: 'argentina-rise',
      title: 'THE RISE OF ARGENTINA',
      desc: 'Follow the dramatic, multi-generational ascension of light-blue legends and street grit across World Cup folklore.',
      steps: [
        { year: 1978, type: 'tournament' as const, id: 1978, label: 'Ticker-Tape Triumph', highlight: 'Mario Kempes fires Argentina to their maiden title in Buenos Aires in front of a passionate host crowd.' },
        { year: 1986, type: 'legend' as const, id: 'maradona', label: 'Diego Maradona Pin', highlight: 'Maradona creates Mexico 86 in his own individual image, leading with artistry, grit, and the controversial Hand of God.' },
        { year: 1986, type: 'match' as const, id: '1986-quarterfinal', label: 'Aesthetic Duel', highlight: 'The unforgettable 2-1 quarterfinal against England featuring both the Hand of God and the Goal of the Century.' },
        { year: 2022, type: 'legend' as const, id: 'messi', label: 'Lionel Messi Era', highlight: 'A lifetime of expectations culminate as Messi leads a fearless modern collective to complete football history.' },
        { year: 2022, type: 'tournament' as const, id: 2022, label: 'Lusail Coronation', highlight: 'The greatest final ever drawn: a staggering 3-3 shootout victory seals Argentina’s third grand star.' }
      ]
    },
    {
      id: 'samba-dynasty',
      title: 'THE SAMBA HEIRLOOM',
      desc: 'Trace the five-star lineage of Brazil, showcasing joyous beach-honed individual flair and historical dominance.',
      steps: [
        { year: 1958, type: 'legend' as const, id: 'pele', label: 'O Rei Is Born', highlight: 'A breathtaking 17-year-old Pelé scores two goals in the final to claim Brazil\'s first trophy in Sweden.' },
        { year: 1970, type: 'tournament' as const, id: 1970, label: 'The Perfect Team', highlight: 'Pelé joins Jairzinho, Tostão, and Rivellino, orchestrating a beautiful stadium symphony that claims the Jules Rimet forever.' },
        { year: 1994, type: 'tournament' as const, id: 1994, label: 'Duality In Pasadena', highlight: 'Romário and Bebeto lead a pragmatic Brazilian machine back to the summit of international glory in the heat of California.' },
        { year: 2002, type: 'legend' as const, id: 'ronaldo', label: 'R9 Redemption Pin', highlight: 'Ronaldo Nazário overcomes devastating knee injuries to fire a phenomenal double in South Korea/Japan.' },
        { year: 2002, type: 'stadium' as const, id: 'maracana', label: 'Maracanã Sanctuary', highlight: 'The mythical Rio de Janeiro temple where Brazilian legends forged their identity and mourned local upsets.' }
      ]
    },
    {
      id: 'european-tactics',
      title: 'EUROPEAN CRUCIBLE & TACTICAL MAESTROS',
      desc: 'Witness how radical thinkers and absolute defensive titans transformed international systems from Switzerland to Rome.',
      steps: [
        { year: 1954, type: 'tournament' as const, id: 1954, label: 'Miracle of Bern', highlight: 'A clinical West German squad overrides Ferenc Puskas’ unstoppable Mighty Magyars in Bern\'s pouring rain.' },
        { year: 1974, type: 'legend' as const, id: 'cruyff', label: 'Dutch Total Football', highlight: 'Johan Cruyff and Rinus Michels introduce beautiful, fluid space changes, forever rewriting football choreography.' },
        { year: 1990, type: 'tournament' as const, id: 1990, label: 'German Efficiency', highlight: 'Lothar Matthäus conducts a highly disciplined tactical masterclass to conquer Rome and exact revenge on Argentina.' },
        { year: 1998, type: 'legend' as const, id: 'zidane', label: 'Zinedine Zidane Ascent', highlight: 'Zizou rises above the pressure at the Stade de France, heading two flawless corners to defeat mighty Brazil.' },
        { year: 2006, type: 'match' as const, id: '2006-semifinal', label: 'Westfalen Echoes', highlight: 'The dramatic, breathtaking extra-time climax in Dortmund where Fabio Grosso stuns host Germany (2-0).' }
      ]
    }
  ], []);

  // 2. INTELLIGENT ROUTE DISCOVERY & SCORING SYSTEM (PROGRAMMATIC RELEVANCE ENGINE)
  const recommendations = useMemo<DiscoveryCandidate[]>(() => {
    const candidates: DiscoveryCandidate[] = [];

    // Gather and normalize facts about current context
    const idStr = String(currentItemId).toLowerCase();
    const typeStr = currentItemType;

    // Helper references to extract details of current item if matching
    const currentLegend = legends.find(l => l.id.toLowerCase() === idStr);
    const currentNation = nationsData.find(n => n.id.toLowerCase() === idStr);
    const currentStadium = stadiumsData.find(s => s.id.toLowerCase() === idStr);
    const currentMatch = CLASSIC_MATCHES.find(m => m.id.toLowerCase() === idStr);
    const currentTourney = tournaments.find(t => t.year === Number(currentItemId));

    // Consolidate candidate pool
    // A. Tournaments
    tournaments.forEach(t => {
      let score = 0;
      let reasons: string[] = [];

      // Scoring factors
      if (typeStr === 'tournament' && t.year === Number(currentItemId)) return; // bypass same

      if (currentLegend) {
        if (currentLegend.worldCupJourney.includes(t.year)) {
          score += 60;
          reasons.push(`Featured player during the ${t.year} campaign`);
        }
        if (currentLegend.nation === t.champion) {
          score += 30;
          reasons.push(`Led country ${t.champion} to glory or dominance`);
        }
      }

      if (currentNation) {
        if (currentNation.timeline.some(mile => mile.year === t.year)) {
          score += 55;
          reasons.push(`Key timeline era for ${currentNation.name}'s side`);
        }
        if (currentNation.name === t.champion) {
          score += 45;
          reasons.push(`Victorious champion year for ${currentNation.name}`);
        }
      }

      if (currentStadium) {
        if (currentStadium.yearBuilt <= t.year && (currentStadium.country === t.host || currentStadium.city === t.host)) {
          score += 50;
          reasons.push(`Venue built or active during the ${t.year} tournament`);
        }
      }

      if (currentMatch) {
        if (currentMatch.year === t.year) {
          score += 70;
          reasons.push(`Host tournament year of this classic match`);
        }
      }

      // Decade proximity bonus for context continuity
      if (currentTourney) {
        const decadeDiff = Math.abs(t.year - currentTourney.year);
        if (decadeDiff === 4) {
          score += 25;
          reasons.push(`Direct chronological counterpart tournament`);
        } else if (decadeDiff <= 12) {
          score += 15;
          reasons.push(`Same historical football era`);
        }
      }

      if (score > 10) {
        candidates.push({
          type: 'tournament',
          id: t.year,
          title: `${t.year} World Cup`,
          subtitle: `Hosts: ${t.host} • Champions: ${t.champion}`,
          image: t.image,
          score,
          bondMessage: reasons[0] || 'Historically connected era'
        });
      }
    });

    // B. Legends
    legends.forEach(l => {
      let score = 0;
      let reasons: string[] = [];

      if (typeStr === 'legend' && l.id.toLowerCase() === idStr) return; // bypass same

      if (currentLegend) {
        if (currentLegend.nation === l.nation) {
          score += 50;
          reasons.push(`Shared homeland heritage: ${l.nation}`);
        }
        // shared tournament
        const sharedYears = l.worldCupJourney.filter(y => currentLegend.worldCupJourney.includes(y));
        if (sharedYears.length > 0) {
          score += sharedYears.length * 25;
          reasons.push(`Clashed or co-starred in ${sharedYears.join(', ')}`);
        }
      }

      if (currentNation) {
        if (l.nation === currentNation.name) {
          score += 75;
          reasons.push(`Monarch legend of the ${currentNation.name} civilization`);
        }
      }

      if (currentTourney) {
        if (l.worldCupJourney.includes(currentTourney.year)) {
          score += 60;
          reasons.push(`Definitive star of the ${currentTourney.year} edition`);
        }
      }

      if (currentMatch) {
        if (currentMatch.title.toLowerCase().includes(l.name.toLowerCase()) || 
            (currentMatch.teamA === l.nation || currentMatch.teamB === l.nation)) {
          score += 45;
          reasons.push(`Legendary pioneer for ${l.nation} during match battles`);
        }
      }

      if (score > 10) {
        candidates.push({
          type: 'legend',
          id: l.id,
          title: l.name,
          subtitle: `${l.nation} Legend • ${l.era}`,
          image: l.image,
          score,
          bondMessage: reasons[0] || 'Historical mastermind'
        });
      }
    });

    // C. Nations
    nationsData.forEach(n => {
      let score = 0;
      let reasons: string[] = [];

      if (typeStr === 'nation' && n.id.toLowerCase() === idStr) return; // bypass same

      if (currentLegend) {
        if (currentLegend.nation === n.name) {
          score += 80;
          reasons.push(`Country represented by the iconic ${currentLegend.name}`);
        }
      }

      if (currentTourney) {
        if (currentTourney.champion === n.name) {
          score += 60;
          reasons.push(`Star champion of the ${currentTourney.year} expedition`);
        } else if (currentTourney.runnerUp === n.name) {
          score += 40;
          reasons.push(`Finalist podium challenger in ${currentTourney.year}`);
        }
      }

      if (currentMatch) {
        if (currentMatch.teamA === n.name || currentMatch.teamB === n.name) {
          score += 70;
          reasons.push(`Main combatant team in this historic classic match`);
        }
      }

      if (currentStadium) {
        if (currentStadium.country === n.name) {
          score += 55;
          reasons.push(`National home soil containing ${currentStadium.name}`);
        }
      }

      if (score > 10) {
        candidates.push({
          type: 'nation',
          id: n.id,
          title: n.name,
          subtitle: `${n.titlesCount}x World Champions • ${n.continent}`,
          score,
          bondMessage: reasons[0] || 'Continental superpower'
        });
      }
    });

    // D. Stadiums
    stadiumsData.forEach(s => {
      let score = 0;
      let reasons: string[] = [];

      if (typeStr === 'stadium' && s.id.toLowerCase() === idStr) return; // bypass same

      if (currentLegend) {
        if (currentLegend.nation === s.country) {
          score += 40;
          reasons.push(`Temple located in ${currentLegend.name}'s home country`);
        }
      }

      if (currentNation) {
        if (currentNation.name === s.country) {
          score += 65;
          reasons.push(`Sovereign architectural temple built in ${s.city}`);
        }
      }

      if (currentTourney) {
        if (currentTourney.host === s.country) {
          score += 60;
          reasons.push(`Hosted critical final battles of ${currentTourney.year}`);
        }
      }

      if (currentMatch) {
        if (s.appearances.includes(currentMatch.year) || s.country === currentMatch.teamA || s.country === currentMatch.teamB) {
          score += 80;
          reasons.push(`Colosseum venue that hosted epic battles during ${currentMatch.year}`);
        }
      }

      if (score > 10) {
        candidates.push({
          type: 'stadium',
          id: s.id,
          title: s.name,
          subtitle: `${s.city}, ${s.country} • Cap: ${s.capacity}`,
          image: s.image,
          score,
          bondMessage: reasons[0] || 'Elite architectural museum colosseum'
        });
      }
    });

    // E. Matches
    CLASSIC_MATCHES.forEach(m => {
      let score = 0;
      let reasons: string[] = [];

      if (typeStr === 'match' && m.id.toLowerCase() === idStr) return; // bypass same

      if (currentLegend) {
        if (m.teamA === currentLegend.nation || m.teamB === currentLegend.nation) {
          score += 45;
          reasons.push(`Classic fixture involving country of ${currentLegend.name}`);
        }
        if (currentPageCurationDetails(currentItemId, currentItemType, m)) {
          score += 35;
          reasons.push(`Featuring or representing teammate eras`);
        }
      }

      if (currentNation) {
        if (m.teamA === currentNation.name || m.teamB === currentNation.name) {
          score += 75;
          reasons.push(`Iconic cinematic clash registered in ${currentNation.name}'s history`);
        }
      }

      if (currentTourney) {
        if (m.year === currentTourney.year) {
          score += 80;
          reasons.push(`Legendary final or match played during this exact tournament`);
        }
      }

      if (currentStadium) {
        if (currentStadium.appearances.includes(m.year) || currentStadium.country === m.teamA || currentStadium.country === m.teamB) {
          score += 75;
          reasons.push(`Epic clash staged on the turf in ${currentStadium.city}`);
        }
      }

      if (score > 10) {
        candidates.push({
          type: 'match',
          id: m.id,
          title: `${m.teamA} vs ${m.teamB}`,
          subtitle: `${m.year} • ${m.stage} (${m.shootoutScore || `${m.scoreA}-${m.scoreB}`})`,
          score,
          bondMessage: reasons[0] || 'Drama-fueled historic epic match'
        });
      }
    });

    // Sort by descending score to bubble up the absolute strongest historical connections
    return candidates.sort((a,b) => b.score - a.score).slice(0, 5);
  }, [currentItemType, currentItemId]);

  // Secondary helper context validator
  function currentPageCurationDetails(id: string | number, type: string, match: MatchDetails) {
    if (type === 'legend' && String(id).toLowerCase() === 'pele') {
      return match.year === 1970 || match.year === 1958;
    }
    if (type === 'legend' && String(id).toLowerCase() === 'maradona') {
      return match.year === 1986 || match.year === 1990;
    }
    return false;
  }

  const selectedConnectionText = useMemo(() => {
    if (!selectedConnectionId) return '';
    const cand = recommendations.find(c => c.id === selectedConnectionId);
    if (!cand) return '';
    return cand.bondMessage;
  }, [selectedConnectionId, recommendations]);

  // Jump to recommended explore action and update explorer progress status list
  const handleWarp = (type: DiscoveryCandidate['type'], id: string | number, label: string) => {
    // Play sci-fi futuristic telescope warp sound
    playSfx('warp');

    // Trigger localStorage tracker to notify the general Command Center
    window.dispatchEvent(new CustomEvent('track-vault-explore', {
      detail: { type, id, label }
    }));

    // Trigger custom navigation callbacks
    if (type === 'tournament' && onExploreTournament) {
      onExploreTournament(Number(id));
    } else if (type === 'legend' && onExploreLegends) {
      onExploreLegends(String(id));
    } else if (type === 'nation' && onExploreNations) {
      onExploreNations(String(id));
    } else if (type === 'stadium' && onExploreStadiums) {
      onExploreStadiums(String(id));
    } else if (type === 'match' && onExploreMatches) {
      onExploreMatches(String(id));
    }
  };

  const activeTrail = useMemo(() => {
    return discoveryTrails.find(t => t.id === activeTrailId) || discoveryTrails[0];
  }, [activeTrailId, discoveryTrails]);

  return (
    <section id="continue-exploring-intelligent-system-block" className="w-full bg-[#080808] border-t border-[#D4AF37]/15 py-16 px-6 md:px-12 select-none relative overflow-hidden">
      {/* Editorial Decorative Overlays resembling museum catalog */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#D4AF37]/15" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]/5" />
      <div className="absolute top-12 left-12 w-32 h-32 opacity-[0.015] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* HEADER STATEMENT SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Milestone className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">Where should this journey continue?</span>
            </div>
            <h2 className="font-serif text-[#F5F2EA] text-3xl md:text-5xl uppercase tracking-[0.1em] font-extrabold leading-none">CONTINUE EXPLORING</h2>
            <p className="font-sans text-xs text-[#AFA58D]/70 max-w-xl mt-3 leading-relaxed">
              Every detail in the archive is part of an unbroken constellation. Follow the historical trails, explore adjacent eras, or warp through hidden bonds.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[9px] text-[#69707A] bg-white/5 px-3 py-1.5 border border-white/5">
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></span>
            <span>INTELLECTUAL DISCOVERY ROUTING</span>
          </div>
        </div>

        {/* THREE COLUMNS: SENSATIONAL LAYOUTS ACCORDING TO PROMPT MANDATES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN 1: INTEL HISTORICAL CONNECTIONS CONSTELLATION NETWORK (5 COLS) */}
          <div className="lg:col-span-5 bg-[#0b0b0b] border border-[#4E5661]/15 p-6 rounded-none flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
                <Network className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="font-serif text-white text-xs uppercase tracking-[0.16em] font-semibold">Historical Connections</h3>
              </div>
              <p className="font-sans text-[11px] text-[#AFA58D] leading-relaxed mb-6">
                Programmatic distance metrics computed from shared achievements, stadiums, matches, and eras. Tap an entity shell to inspect of its direct bond details.
              </p>

              {/* Spider-Graph Visual Representation Circle Network */}
              <div className="relative h-[180px] bg-[#121212]/30 border border-white/5 rounded-none overflow-hidden my-4 flex items-center justify-center">
                {/* Connecting Web Lines */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <line x1="50%" y1="50%" x2="20%" y2="25%" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="50%" y1="50%" x2="80%" y2="25%" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="50%" y1="50%" x2="15%" y2="75%" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="50%" y1="50%" x2="85%" y2="75%" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" />
                  </svg>
                </div>

                {/* Central Anchor Node representing Current Item */}
                <div className="z-10 bg-[#080808] border border-[#D4AF37] text-[#D4AF37] px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider font-semibold rounded-none">
                  {currentItemType} • ID #{currentItemId}
                </div>

                {/* Satellite Entity Nodes */}
                {recommendations.slice(0, 5).map((cand, idx) => {
                  // Coordinate array for satellites: [top, left]
                  const positions = [
                    ['15%', '20%'], // top left
                    ['15%', '80%'], // top right
                    ['65%', '12%'], // mid left
                    ['65%', '85%'], // mid right
                    ['5%', '50%'],  // top mid
                  ];
                  const pos = positions[idx] || ['10%', '10%'];
                  const isSelected = selectedConnectionId === cand.id;

                  return (
                    <button
                      key={idx}
                      className={`absolute z-10 px-2 py-1 rounded-none border text-[8px] font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        isSelected 
                          ? 'bg-[#D4AF37] text-[#050505] border-[#D4AF37] scale-105 shadow-[0_0_12px_rgba(212,175,55,0.4)]' 
                          : 'bg-[#1a1a1a] text-[#AFA58D] border-white/10 hover:border-[#D4AF37]/50 hover:text-[#F5F2EA]'
                      }`}
                      style={{ top: pos[0], left: pos[1] }}
                      onClick={() => { playSfx('tick'); setSelectedConnectionId(cand.id); }}
                    >
                      {cand.type === 'tournament' ? '🏆' : cand.type === 'legend' ? '👑' : cand.type === 'nation' ? '🛡️' : cand.type === 'stadium' ? '🏟️' : '⚽'} {cand.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bond details output display */}
            <div>
              {selectedConnectionId ? (
                <div className="bg-[#121212] border border-[#D4AF37]/10 p-3.5 mt-3 rounded-none relative">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[8px] text-[#D4AF37] uppercase tracking-widest font-semibold">Bond Fact Statement</span>
                    <button onClick={() => handleWarp(
                      recommendations.find(c => c.id === selectedConnectionId)!.type,
                      recommendations.find(c => c.id === selectedConnectionId)!.id,
                      recommendations.find(c => c.id === selectedConnectionId)!.title
                    )} className="font-mono text-[8px] text-[#F5F2EA] hover:text-[#D4AF37] transition-all cursor-pointer flex items-center gap-1">
                      WARP TO ENTRY <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                  <p className="font-serif text-xs text-[#F5F2EA] leading-relaxed italic">
                    "{selectedConnectionText}"
                  </p>
                </div>
              ) : (
                <div className="bg-[#121212]/30 border border-dashed border-white/5 py-4 text-center">
                  <span className="font-mono text-[8.5px] text-[#69707A] uppercase">Select satellite nodes to read narrative bonds</span>
                </div>
              )}
            </div>

          </div>

          {/* COLUMN 2: CURATED HISTORICAL DISCOVERY TRAILS (7 COLS) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* TRAILL BLOCK */}
            <div className="bg-[#0b0b0b] border border-[#4E5661]/15 p-6 rounded-none shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Milestone className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="font-serif text-white text-xs uppercase tracking-[0.16em] font-semibold">Discovery Trails</h3>
                </div>

                {/* Trail Tab selector */}
                <div className="flex bg-[#121212] border border-white/5 p-0.5 rounded-[2px] font-mono text-[8px] uppercase tracking-wider">
                  <button 
                    className={`px-2.5 py-1 rounded-[1.5px] ${activeTrailId === 'argentina-rise' ? 'bg-[#D4AF37] text-black font-semibold' : 'text-[#69707A]'}`}
                    onClick={() => { playSfx('tick'); setActiveTrailId('argentina-rise'); }}
                  >
                    🇦🇷 La Albiceleste
                  </button>
                  <button 
                    className={`px-2.5 py-1 rounded-[1.5px] ${activeTrailId === 'samba-dynasty' ? 'bg-[#D4AF37] text-black font-semibold' : 'text-[#69707A]'}`}
                    onClick={() => { playSfx('tick'); setActiveTrailId('samba-dynasty'); }}
                  >
                    🇧🇷 Samba Heirloom
                  </button>
                  <button 
                    className={`px-2.5 py-1 rounded-[1.5px] ${activeTrailId === 'european-tactics' ? 'bg-[#D4AF37] text-black font-semibold' : 'text-[#69707A]'}`}
                    onClick={() => { playSfx('tick'); setActiveTrailId('european-tactics'); }}
                  >
                    🇪🇺 European Crucible
                  </button>
                </div>
              </div>

              {/* TRAIL CONTENT DETAIL */}
              <div className="text-left mb-6">
                <h4 className="font-serif text-[#F5F2EA] text-md font-bold tracking-tight uppercase">{activeTrail.title}</h4>
                <p className="font-sans text-xs text-[#AFA58D]/80 leading-relaxed max-w-2xl mt-1">{activeTrail.desc}</p>
              </div>

              {/* STAGES PROGRESS SEQUENCE */}
              <div className="relative pl-6 md:pl-0 md:flex md:items-start md:justify-between gap-4 py-2 mt-4">
                
                {/* Horizontal line background on Desktop */}
                <div className="hidden md:block absolute left-4 right-4 top-[24px] h-[1px] bg-gradient-to-r from-[#D4AF37]/50 via-[#4E5661]/20 to-[#D4AF37]/10 pointer-events-none" />

                {/* Vertical line background on Mobile */}
                <div className="md:hidden absolute left-[15px] top-4 bottom-4 w-[1px] bg-[#D4AF37]/30 pointer-events-none" />

                {activeTrail.steps.map((step, idx) => {
                  const isMatch = String(step.id).toLowerCase() === String(currentItemId).toLowerCase();

                  return (
                    <div key={idx} className="relative mb-6 md:mb-0 md:flex-1 group">
                      {/* Circle anchor */}
                      <div className="absolute left-[-21px] md:left-1/2 md:top-[16px] md:-translate-x-1/2 -translate-y-[0px] z-10">
                        <motion.button
                          className={`w-4 h-4 rounded-full flex items-center justify-center border font-mono text-[7px] font-bold cursor-pointer transition-all duration-300 ${
                            isMatch 
                              ? 'bg-[#D4AF37] border-[#D4AF37] text-[#050505] scale-125 shadow-[0_0_8px_rgba(212,175,55,0.5)]' 
                              : 'bg-[#121212] border-[#4E5661]/45 text-[#AFA58D] group-hover:border-[#D4AF37]'
                          }`}
                          whileHover={{ scale: 1.25 }}
                          onClick={() => handleWarp(step.type, step.id, step.label)}
                          title={`Fly to ${step.label}`}
                        >
                          {idx + 1}
                        </motion.button>
                      </div>

                      {/* Content block */}
                      <div className="md:text-center pl-4 md:pl-0 mt-0.5 md:mt-[44px]">
                        <span className="font-mono text-[9px] font-bold text-[#D4AF37] uppercase">{step.year}</span>
                        <h5 className="font-serif text-[#F5F2EA] text-xs font-semibold uppercase leading-tight mt-0.5 group-hover:text-[#D4AF37] transition-all">{step.label}</h5>
                        
                        {/* Hover reveal box detail */}
                        <div className="bg-[#121212] border border-white/5 p-2 rounded-none mt-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 max-h-none md:max-h-0 md:group-hover:max-h-[140px] overflow-hidden transition-all duration-500 ease-in-out">
                          <p className="font-sans text-[10px] text-[#AFA58D]/80 leading-normal md:text-left">
                            {step.highlight}
                          </p>
                          <button
                            className="font-mono text-[8px] text-[#D4AF37] flex items-center gap-1 px-1 py-1 bg-white/5 mt-1 border border-[#D4AF37]/20 w-fit cursor-pointer mx-auto md:mx-0 font-medium"
                            onClick={() => handleWarp(step.type, step.id, step.label)}
                          >
                            Explore Path →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DIRECT JUMPS BOX: THE PATHWAYS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 select-none">
              {recommendations.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b0b0b] hover:bg-[#D4AF37]/[0.02] border border-[#4E5661]/15 hover:border-[#D4AF37]/40 p-4 rounded-none group flex flex-col justify-between transition-all duration-300 hover:shadow-lg cursor-pointer"
                  onClick={() => handleWarp(item.type, item.id, item.title)}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[8px] bg-white/5 text-[#AFA58D] border border-white/5 px-2 py-0.5 uppercase tracking-widest font-semibold">
                        {item.type}
                      </span>
                      <span className="font-mono text-[9px] text-[#69707A] font-medium">Relevance: {item.score}%</span>
                    </div>
                    <h5 className="font-serif text-[#F5F2EA] text-sm group-hover:text-[#D4AF37] transition-all leading-snug">{item.title}</h5>
                    <p className="font-sans text-[10px] text-[#AFA58D]/70 mt-1 truncate block leading-normal">{item.subtitle}</p>
                  </div>

                  <div className="border-t border-white/5 pt-2.5 mt-4 flex items-center justify-between">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-[#D4AF37]">Explore pathway</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#69707A] group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* BOTTOM METADATA BAR FOR RECOGNIZABILITY */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-[#0c0c0c] border border-[#4E5661]/15 p-4 py-3 font-mono text-[9px] text-[#69707A] uppercase select-none rounded-none shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ACTIVE CONTEXT POINTER: {currentItemType.toUpperCase()} (ID: {currentItemId})</span>
          </div>
          <span className="mt-1 sm:mt-0">© INTELLECTUAL DISCOVERY ROUTING MAP</span>
        </div>

      </div>
    </section>
  );
}
