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
  BookOpen, 
  ChevronRight, 
  ArrowUpRight, 
  FileText, 
  Layers,
  History,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Undo2,
  Library,
  Fingerprint,
  CalendarDays
} from 'lucide-react';
import { tournaments, legends, recordHalls, Tournament, Legend } from '../data';
import { nationsData, NationCivilization } from '../nationsData';
import { stadiumsData, Stadium } from '../stadiumsData';

// Classic matches data matching HistoricMatchesVault list for searchability
const SEARCHABLE_MATCHES = [
  { id: '1930-final', title: 'Uruguay vs Argentina (1930)', year: 1930, score: '4-2', desc: 'The inaugural final in Montevideo with two separate balls.' },
  { id: '1950-uruguay-brazil', title: 'Uruguay vs Brazil (1950)', year: 1950, score: '2-1', desc: 'The historic "Maracanazo" which shocked 200,000 Brazil spectators.' },
  { id: '1954-germany-hungary', title: 'West Germany vs Hungary (1954)', year: 1954, score: '3-2', desc: 'The "Miracle of Bern" where Germany beat the Mighty Magyars.' },
  { id: '1966-england-germany', title: 'England vs West Germany (1966)', year: 1966, score: '4-2 (aet)', desc: 'Geoff Hurst’s legendary hat-trick and the Russian linesman contour.' },
  { id: '1970-italy-germany', title: 'Italy vs West Germany (1970)', year: 1970, score: '4-3 (aet)', desc: 'The "Game of the Century" with five extra-time goals.' },
  { id: '1982-italy-brazil', title: 'Italy vs Brazil (1982)', year: 1982, score: '3-2', desc: 'Paolo Rossi’s iconic hat-trick dismantling the beautiful samba orchestra.' },
  { id: '1986-argentina-england', title: 'Argentina vs England (1986)', year: 1986, score: '2-1', desc: 'Diego Maradona’s hand-of-god and the solo Goal of the Century.' },
  { id: '1994-brazil-italy', title: 'Brazil vs Italy (1994)', year: 1994, score: '0-0 (3-2 p)', desc: 'The Pasadena drama ending in Roberto Baggio’s tragic skies penalty shot.' },
  { id: '1998-france-brazil', title: 'France vs Brazil (1998)', year: 1998, score: '3-0', desc: 'Zidane’s double headers conquering Ronaldo’s mystery-struck night.' },
  { id: '2002-brazil-germany', title: 'Brazil vs Germany (2002)', year: 2002, score: '2-0', desc: 'O Fenômeno Ronaldo’s magnificent double scoring golden redemption.' },
  { id: '2014-germany-brazil', title: 'Germany vs Brazil (2014)', year: 2014, score: '7-1', desc: 'The absolute dismantling of Belo Horizonte in front of a crying nation.' },
  { id: '2022-argentina-france', title: 'Argentina vs France (2022)', year: 2022, score: '3-3 (4-2 p)', desc: 'The greatest final ever played, concluding Lionel Messi’s path to divinity.' }
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

  // Archive Search Engine specific state variables
  const [searchMode, setSearchMode] = useState<'everything' | 'player' | 'nation' | 'match' | 'record' | 'stadium' | 'tournament'>('everything');
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [mobileDossierView, setMobileDossierView] = useState(false);

  // Monitor scroll for nav opacity shift
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenFolder = (catalogId: string) => {
    setIndexOpen(false);
    switch (catalogId) {
      case 'atlas':
        onExploreAtlas();
        break;
      case 'history':
        onExploreHistory();
        break;
      case 'tournaments':
        onExploreHistory();
        break;
      case 'legends':
        onExploreLegends();
        break;
      case 'records':
        onExploreRecords();
        break;
      case 'nations':
        onExploreNations();
        break;
      case 'matches':
        onExploreMatches();
        break;
      case 'stadiums':
        onExploreStadiums();
        break;
      default:
        break;
    }
  };

  const handleSearchSelect = (result: SearchResult) => {
    setSearchOpen(false);
    setSearchQuery('');
    setSelectedResult(null);
    setMobileDossierView(false);
    
    switch (result.type) {
      case 'player':
        onExploreLegends(result.id);
        break;
      case 'tournament':
        onExploreTournament(Number(result.id));
        break;
      case 'nation':
        onExploreNations(result.id);
        break;
      case 'stadium':
        onExploreStadiums(result.id);
        break;
      case 'match':
        onExploreMatches(result.id);
        break;
      case 'record':
        onExploreRecords(result.id);
        break;
      default:
        break;
    }
  };

  // Compile Search Results
  interface SearchResult {
    id: string;
    type: 'player' | 'tournament' | 'nation' | 'stadium' | 'match' | 'record';
    title: string;
    subtitle: string;
    meta: string;
    description: string;
    year?: number;
  }

  // Classic system forgotten histories database for immersive surprises
  const FORGOTTEN_MOMENTS = [
    {
      id: 'forgotten-dog-1966',
      title: 'The Dog That Saved the Cup (1966)',
      period: 'London, 1966',
      concept: 'Jules Rimet Recovery',
      body: 'In March 1966, four months before the tournament, the Jules Rimet trophy went missing from a hallowed stamp exhibition in Westminster. While Scotland Yard searched frantically, a mongrel dog named Pickles discovered the treasure wrapped in newspaper under a suburban garden hedge. Pickles acquired overnight global fame, eating free premium rations for life, and celebrating alongside the victorious England squad.',
      connections: ['England', '1966', 'Jules Rimet']
    },
    {
      id: 'forgotten-ball-1930',
      title: 'The Two-Ball Dispute (1930)',
      period: 'Montevideo, 1930',
      concept: 'Separate Match Sovereignty',
      body: 'Uruguay and Argentina disputed so fiercely that they refused to kick the same football. Argentina wanted their own smaller Argentine ball; Uruguay insisted on their native T-Model ball. FIFA declared a dual compromise: Argentina provided their ball for the first half (leading 2-1), and Uruguay threw in their own ball for the second half, completing a triumphant 4-2 comeback.',
      connections: ['Uruguay', 'Argentina', '1930']
    },
    {
      id: 'forgotten-white-1950',
      title: 'The Abolishment of White Kits (1950)',
      period: 'Rio de Janeiro, 1950',
      concept: 'The Curse of Maracanã',
      body: 'Before 1950, Brazil played exclusively in clean white jerseys. Following the tragic defeat to Uruguay at the crowded Maracanã, the white uniform was branded cursed and unpatriotic. A public competition was held to outline a patriotic kit utilizing all four colors of the Brazilian flag. The outcome was the iconic yellow and blue jersey, which carried Brazil to its subsequent 5 titles.',
      connections: ['Brazil', 'Uruguay', '1950']
    },
    {
      id: 'forgotten-studs-1954',
      title: 'Screw-In Studs Revolution (1954)',
      period: 'Bern, 1954',
      concept: 'The Miracle of Bern',
      body: 'During the rain-soaked final against the Golden Hungarian side, West Germany deployed a hidden technological advantage. Adidas founder Adi Dassler personally outfitted the German squad with innovative screw-in studs. While Hungary struggled to stand on wet leather soles, Germany adjusted their traction mid-match, pulling off one of football’s greatest upsets in the mud.',
      connections: ['West Germany', '1954', 'Hungary']
    },
    {
      id: 'forgotten-stripes-1974',
      title: 'Cruyff’s Two-Stripe Rebellion (1974)',
      period: 'Munich, 1974',
      concept: 'The Sponsor War',
      body: 'Sovereign Dutch captain Johan Cruyff was sponsored personally by Puma. He refused to wear the official Adidas national kit, which featured three royal black stripes down the sleeves. Cruyff demanded a bespoke orange jersey with only two stripes to protect his commercial alliance. Looking closely at historic photos reveals that the legendary master wore a custom two-striped shirt during the tournament.',
      connections: ['Netherlands', 'Cruyff', '1974']
    }
  ];

  const getFilteredResults = (): SearchResult[] => {
    const results: SearchResult[] = [];
    const query = searchQuery.toLowerCase().trim();

    // 1. Players / Legends
    legends.forEach(l => {
      const matchText = `${l.name} ${l.nation} ${l.quote} ${l.legacyStatement} ${l.era}`.toLowerCase();
      if (!query || matchText.includes(query)) {
        results.push({
          id: l.id,
          type: 'player',
          title: l.name,
          subtitle: `Titan • ${l.nation}`,
          meta: `Exhibition Room II • Era ${l.era}`,
          description: `"${l.legacyStatement}" — ${l.quote.substring(0, 100)}...`,
          year: l.worldCupJourney[0]
        });
      }
    });

    // 2. Tournaments
    tournaments.forEach(t => {
      const matchText = `${t.year} ${t.host} ${t.champion} ${t.story} ${t.historicMoment}`.toLowerCase();
      if (!query || matchText.includes(query)) {
        results.push({
          id: t.year.toString(),
          type: 'tournament',
          title: `${t.year} FIFA World Cup`,
          subtitle: `Host Nation: ${t.host}`,
          meta: `Exhibition Room I • Winner: ${t.champion}`,
          description: `${t.story.substring(0, 110)}...`,
          year: t.year
        });
      }
    });

    // 3. Nations
    nationsData.forEach(n => {
      const matchText = `${n.name} ${n.continent} ${n.spirit} ${n.story} ${n.motto}`.toLowerCase();
      if (!query || matchText.includes(query)) {
        results.push({
          id: n.id,
          type: 'nation',
          title: `${n.name} Record`,
          subtitle: `National Civilization • ${n.continent}`,
          meta: `Exhibition Room IV • ${n.titlesCount} Stars`,
          description: `Historical overview of tactical evolutions and victories: ${n.story.substring(0, 110)}...`
        });
      }
    });

    // 4. Stadiums
    stadiumsData.forEach(s => {
      const matchText = `${s.name} ${s.country} ${s.city} ${s.description} ${s.atmosphereArchive}`.toLowerCase();
      if (!query || matchText.includes(query)) {
        results.push({
          id: s.id,
          type: 'stadium',
          title: s.name,
          subtitle: `Coliseum Landmark • ${s.city}, ${s.country}`,
          meta: `Exhibition Room VI • Capacity: ${s.capacity}`,
          description: `${s.architecturalIdentity}. Significance: ${s.description.substring(0, 100)}...`,
          year: s.yearBuilt
        });
      }
    });

    // 5. Matches
    SEARCHABLE_MATCHES.forEach(m => {
      const matchText = `${m.title} ${m.desc} ${m.year} ${m.score}`.toLowerCase();
      if (!query || matchText.includes(query)) {
        results.push({
          id: m.id,
          type: 'match',
          title: m.title,
          subtitle: `Cinema Clash • Score ${m.score}`,
          meta: `Exhibition Room V • Played in ${m.year}`,
          description: m.desc,
          year: m.year
        });
      }
    });

    // 6. Records
    recordHalls.forEach(hall => {
      hall.records.forEach(rec => {
        const matchText = `${rec.title} ${rec.holder} ${rec.story} ${rec.nation} ${rec.year}`.toLowerCase();
        if (!query || matchText.includes(query)) {
          results.push({
            id: hall.id,
            type: 'record',
            title: rec.title,
            subtitle: `${rec.holder} (${rec.nation})`,
            meta: `Exhibition Room III • Record: ${rec.value} (${rec.year})`,
            description: rec.story,
            year: Number(rec.year)
          });
        }
      });
    });

    // Filter by active Search Mode
    if (searchMode !== 'everything') {
      return results.filter(r => r.type === searchMode);
    }

    return results;
  };

  const currentResults = getFilteredResults();

  // If there's an active query and our highlighted index is out of bounds, clip it
  useEffect(() => {
    if (highlightedIndex >= currentResults.length) {
      setHighlightedIndex(0);
    }
  }, [currentResults, highlightedIndex]);

  // Handle active Dossier parsing for the golden parchment side pane
  const currentDossierSelection = selectedResult || currentResults[highlightedIndex] || null;

  // Retrieve rich metadata stamps of the selected library card
  const getDossierRichMetadata = (result: SearchResult | null) => {
    if (!result) return null;
    
    if (result.type === 'player') {
      const lgd = legends.find(l => l.id === result.id);
      if (lgd) {
        return {
          stamp: `REG-P-${lgd.id.toUpperCase()}`,
          chamber: 'CHAMBER II • LEGENDS COLLECTION',
          field1Label: 'SOVEREIGN NATIONALITY',
          field1Value: lgd.nation,
          field2Label: 'RECOGNIZED ERA',
          field2Value: lgd.era,
          field3Label: 'IMMORTAL EMBLEM',
          field3Value: `№ ${lgd.legacyNumber} • ${lgd.legacyLabel}`,
          accentTitle: 'Legendary Words',
          accentText: lgd.quote,
          bulletsLabel: 'EXHIBIT ACCOMPLISHMENTS',
          bullets: lgd.hallOfAchievements,
          relationships: [
            { query: lgd.nation, label: `${lgd.nation} Dynasty` },
            { query: String(lgd.worldCupJourney[lgd.worldCupJourney.length - 1]), label: `${lgd.worldCupJourney[lgd.worldCupJourney.length - 1]} Cup` },
            { query: lgd.id === 'pele' ? 'Maracanã' : lgd.id === 'maradona' ? 'Azteca' : 'Stadiums', label: 'Home Coliseum' }
          ]
        };
      }
    }
    if (result.type === 'tournament') {
      const tourn = tournaments.find(t => t.year === Number(result.id));
      if (tourn) {
        return {
          stamp: `REG-T-${tourn.year}`,
          chamber: 'CHAMBER I • TOURNAMENT HISTORY',
          field1Label: 'HOST REGION',
          field1Value: tourn.host,
          field2Label: 'CHAMPION CROWNED',
          field2Value: tourn.champion,
          field3Label: 'FINAL COMBAT',
          field3Value: `${tourn.finalScore} vs ${tourn.runnerUp}`,
          accentTitle: 'Chronicle Excerpt',
          accentText: tourn.story,
          bulletsLabel: 'TOURNAMENT HIGHLIGHTS',
          bullets: [
            `Pre-eminent Icon: ${tourn.keyPlayer}`,
            `Historic Epoch Moment: ${tourn.historicMoment}`
          ],
          relationships: [
            { query: tourn.champion, label: 'Explore Champions' },
            { query: tourn.host, label: 'Host Country' },
            { query: String(tourn.year), label: 'Classic Clashes' }
          ]
        };
      }
    }
    if (result.type === 'nation') {
      const nat = nationsData.find(n => n.id === result.id);
      if (nat) {
        return {
          stamp: `REG-N-${nat.id.toUpperCase()}`,
          chamber: 'CHAMBER IV • NATIONAL CONTESTANTS',
          field1Label: 'CONTINENT SENSE',
          field1Value: nat.continent,
          field2Label: 'SPORTS SPIRIT',
          field2Value: nat.spirit,
          field3Label: 'WORLD STAR COUNT',
          field3Value: `${nat.titlesCount} Legendary Cups`,
          accentTitle: 'Societal Ethos',
          accentText: nat.story,
          bulletsLabel: 'DYNASTIC RECORDS',
          bullets: nat.timeline.slice(0, 3).map(t => `${t.year} - ${t.story.substring(0, 50)}...`),
          relationships: [
            { query: nat.name, label: 'National Atlas' },
            { query: nat.spirit, label: 'Tactical Evolution' }
          ]
        };
      }
    }
    if (result.type === 'stadium') {
      const stad = stadiumsData.find(s => s.id === result.id);
      if (stad) {
        return {
          stamp: `REG-S-${stad.id.toUpperCase()}`,
          chamber: 'CHAMBER VI • COLISEUMS DESIGN',
          field1Label: 'CIVIC CITY',
          field1Value: `${stad.city}, ${stad.country}`,
          field2Label: 'CAPACITY RECORD',
          field2Value: `${stad.capacity} (${stad.recordAttendance} max)`,
          field3Label: 'ORIGINAL ERECTED',
          field3Value: `${stad.yearBuilt}`,
          accentTitle: 'Architectural Spirit',
          accentText: stad.description,
          bulletsLabel: 'DECISIVE CONTESTS',
          bullets: stad.definingMoments.slice(0, 2).map(m => `${m.title}: ${m.description}`),
          relationships: [
            { query: stad.country, label: 'Sovereign Region' },
            { query: String(stad.yearBuilt), label: 'Decade Epoch' }
          ]
        };
      }
    }
    if (result.type === 'match') {
      const mtch = SEARCHABLE_MATCHES.find(m => m.id === result.id);
      if (mtch) {
        return {
          stamp: `REG-M-${mtch.id.toUpperCase()}`,
          chamber: 'CHAMBER V • CINEMA CLASHES',
          field1Label: 'COMBATANTS',
          field1Value: mtch.title,
          field2Label: 'DIAL EPOCH',
          field2Value: `Year ${mtch.year}`,
          field3Label: 'COMBAT OUTCOME',
          field3Value: `Final: ${mtch.score}`,
          accentTitle: 'Dramatica Abstract',
          accentText: mtch.desc,
          bulletsLabel: 'CINEMATIC LOGS',
          bullets: ['Historical film reel restored in widescreen format', 'Authentic commentary audio logs available inside.'],
          relationships: [
            { query: mtch.title.split(' vs ')[0], label: 'Home Team' },
            { query: String(mtch.year), label: 'Year Tournament' }
          ]
        };
      }
    }
    if (result.type === 'record') {
      // search and extract record detail
      let matchRec: any = null;
      recordHalls.forEach(h => {
        const found = h.records.find(re => re.title === result.title);
        if (found) matchRec = found;
      });
      if (matchRec) {
        return {
          stamp: `REG-R-${result.title.substring(0, 6).toUpperCase().replace(/\s/g, 'X')}`,
          chamber: 'CHAMBER III • MONOLITHIC RECORDS',
          field1Label: 'RECORD REGISTER',
          field1Value: matchRec.title,
          field2Label: 'TITAN HOLDER',
          field2Value: `${matchRec.holder} (${matchRec.nation})`,
          field3Label: 'ESTABLISHED SCORE',
          field3Value: matchRec.value,
          accentTitle: 'Historical Height',
          accentText: matchRec.story,
          bulletsLabel: 'ARCHIVAL PROOF',
          bullets: [`Achieved in Year ${matchRec.year}`, 'Guaranteed permanent ledger entry.'],
          relationships: [
            { query: matchRec.holder, label: 'Titan Holder' },
            { query: matchRec.nation, label: 'Sovereign Nation' }
          ]
        };
      }
    }

    return {
      stamp: 'REG-U-UNKNOWN',
      chamber: 'CLASSIFIED MUSEUM DIRECTORY',
      field1Label: 'TITLE REGISTER',
      field1Value: result.title,
      field2Label: 'PREVIEW TYPE',
      field2Value: result.type.toUpperCase(),
      field3Label: 'CLASSIFICATION STAMP',
      field3Value: result.meta,
      accentTitle: 'Exhibition Summary',
      accentText: result.description,
      bulletsLabel: 'EXHIBIT ARCHIVAL REFERENCE',
      bullets: [result.subtitle, 'Double click card catalog to enter immersive room.'],
      relationships: []
    };
  };

  const richMetadata = getDossierRichMetadata(currentDossierSelection);

  // Compile standard continue exploring trails based on active selection
  const getJourneyTrail = (result: SearchResult | null) => {
    if (!result) return [];
    
    const list: { title: string; type: string; query: string; actionText: string }[] = [];
    const name = result.title;
    
    if (result.type === 'player') {
      if (name.includes('Pelé')) {
        list.push({ title: 'Sweden 1958 Crown', type: 'tournament', query: '1958', actionText: 'Explore Sweden 1958' });
        list.push({ title: 'The 1970 Beautiful Team', type: 'tournament', query: '1970', actionText: 'Examine Mexico 1970' });
        list.push({ title: 'The Cathedral Maracanã', type: 'stadium', query: 'Maracanã', actionText: 'Tour the Coliseum' });
        list.push({ title: 'Most Goals Record', type: 'record', query: 'scorers', actionText: 'View World Records' });
      } else if (name.includes('Maradona')) {
        list.push({ title: 'Azteca Stadium', type: 'stadium', query: 'Azteca', actionText: 'Explore Azteca Stadium' });
        list.push({ title: 'Mexico 1986 Epic', type: 'tournament', query: '1986', actionText: 'Examine 1986 Tournament' });
        list.push({ title: 'Argentina vs England 1986', type: 'match', query: 'Argentina vs England', actionText: 'Play Classic Final' });
      } else if (name.includes('Messi')) {
        list.push({ title: 'Lusail Monument', type: 'stadium', query: 'Lusail', actionText: 'Explore Lusail Stadium' });
        list.push({ title: 'Qatar 2022 Milestone', type: 'tournament', query: '2022', actionText: 'Sift 2022 Documents' });
        list.push({ title: 'Argentina vs France Match', type: 'match', query: 'Argentina vs France', actionText: 'Replay Final Clash' });
      } else if (name.includes('Cruyff')) {
        list.push({ title: 'Netherlands Total Football', type: 'nation', query: 'Netherlands', actionText: 'Review Dutch Records' });
        list.push({ title: 'West Germany 1974 Combat', type: 'tournament', query: '1974', actionText: 'Sift 1974 Papers' });
      } else {
        list.push({ title: 'Legends Main Exhibition', type: 'player', query: 'Pelé', actionText: 'Go to Titans' });
      }
    } else if (result.type === 'nation') {
      if (name.toLowerCase().includes('brazil')) {
        list.push({ title: 'Immortal King Pelé', type: 'player', query: 'Pelé', actionText: 'Discover Pelé' });
        list.push({ title: 'Mexico 1970 Pinnacle', type: 'tournament', query: '1970', actionText: 'Examine 1970' });
        list.push({ title: 'The Cataclysmic 7-1 Match', type: 'match', query: 'Germany vs Brazil', actionText: 'Replay 2014 Clash' });
      } else if (name.toLowerCase().includes('argentina')) {
        list.push({ title: 'Diego Maradona', type: 'player', query: 'Maradona', actionText: 'Discover Maradona' });
        list.push({ title: 'Lionel Messi', type: 'player', query: 'Messi', actionText: 'Explore Messi' });
        list.push({ title: 'Azteca Stadium', type: 'stadium', query: 'Azteca', actionText: 'Visit Azteca Stadium' });
      } else {
        list.push({ title: 'Sovereign Records Hall', type: 'record', query: 'goals', actionText: 'Explore Records' });
      }
    } else if (result.type === 'match') {
      list.push({ title: 'The Associated Tournament', type: 'tournament', query: String(result.year || '1970'), actionText: 'View World Cup Year' });
    } else {
      list.push({ title: 'Return to Legends', type: 'player', query: 'Pelé', actionText: 'Examine Legends' });
      list.push({ title: 'Return to Records', type: 'record', query: 'Most goals', actionText: 'Review Records' });
    }
    
    return list;
  };

  const journeyTrail = getJourneyTrail(currentDossierSelection);

  // Retrieve matching forgotten stories based on the input string to surprise users
  const getMatchingForgottenStory = () => {
    if (!searchQuery.trim()) {
      return FORGOTTEN_MOMENTS[0]; // default: Pickles the dog!
    }
    const q = searchQuery.toLowerCase().trim();
    const matches = FORGOTTEN_MOMENTS.filter(m => 
      m.title.toLowerCase().includes(q) || 
      m.body.toLowerCase().includes(q) || 
      m.connections.some(c => c.toLowerCase().includes(q))
    );
    return matches.length > 0 ? matches[0] : FORGOTTEN_MOMENTS[1]; // fallback: secret Uruguay match balls
  };

  const activeForgottenStory = getMatchingForgottenStory();

  // Keyboard navigation listeners inside terminal overlay
  useEffect(() => {
    if (!searchOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex(prev => (prev + 1) % Math.max(1, currentResults.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex(prev => (prev - 1 + currentResults.length) % Math.max(1, currentResults.length));
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
        setSelectedResult(null);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const activeItem = currentResults[highlightedIndex];
        if (activeItem) {
          if (selectedResult && selectedResult.id === activeItem.id) {
            handleSearchSelect(activeItem);
          } else {
            setSelectedResult(activeItem);
            setMobileDossierView(true);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, currentResults, highlightedIndex, selectedResult]);

  return (
    <>
      {/* 1. PERSISTENT NAVIGATION BAR */}
      <nav 
        id="persistent-archive-navbar" 
        className={`fixed top-0 left-0 right-0 z-[400] transition-all duration-500 py-5 px-6 md:px-12 flex justify-between items-center ${
          scrolled 
            ? 'bg-[#050505]/95 backdrop-blur-md border-b border-[#D4AF37]/10 py-4 shadow-xl' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* LOGO */}
        <div 
          onClick={onExploreHistory}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#070707] transition-all duration-500 group-hover:border-[#D4AF37]/75">
            <Trophy size={14} className="text-[#D4AF37] group-hover:rotate-12 transition-transform duration-500" />
          </div>
          <span className="font-serif text-[#F5F2EA] text-sm md:text-md tracking-[0.35em] font-extrabold uppercase select-none group-hover:text-[#D4AF37] transition-colors duration-350">
            WORLD CUP VAULT
          </span>
        </div>

        {/* NAVIGATION CONTROLS */}
        <div className="flex items-center gap-6">
          {/* Subtle Search Activation Link */}
          <button 
            id="nav-search-trigger"
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 group text-[#AFA58D] hover:text-[#D4AF37] transition-colors text-xs tracking-wider font-sans uppercase font-medium bg-black/15 hover:bg-[#D4AF37]/5 px-3 py-1.5 border border-white/5 hover:border-[#D4AF37]/25 rounded-[3px] duration-350"
          >
            <Search size={14} className="group-hover:scale-110 transition-transform duration-350" />
            <span className="hidden md:inline text-[10px]">Search Archive</span>
          </button>

          {/* Golden Index Directory Trigger */}
          <button 
            id="nav-index-trigger"
            onClick={() => setIndexOpen(true)}
            className="flex items-center gap-2 cursor-pointer group text-[#050505] bg-[#D4AF37] hover:bg-[#EAE5D9] transition-all duration-300 font-sans font-bold text-[10px] md:text-xs tracking-widest uppercase px-4 py-2 rounded-[3px] shadow-[0_2px_15px_rgba(212,175,55,0.15)] hover:shadow-[0_4px_20px_rgba(212,175,55,0.25)] border border-[#D4AF37]/20"
          >
            <Layers size={13} className="text-[#050505]" />
            <span>Vault Index</span>
          </button>
        </div>
      </nav>

      {/* 2. THE VAULT INDEX OVERLAY (Full screen archive index) */}
      <AnimatePresence>
        {indexOpen && (
          <motion.div 
            id="the-vault-index-overlay"
            className="fixed inset-0 z-[600] bg-[#050505]/98 flex flex-col justify-between overflow-y-auto p-6 md:p-16 lg:p-24 selection:bg-[#D4AF37] selection:text-[#050505]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            {/* Elegant Background Stamp Sheet */}
            <div className="absolute inset-0 opacity-[0.012] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            
            {/* TOP HEADER */}
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto z-10">
              <span className="font-mono text-[9px] text-[#D4AF37] tracking-[0.35em] font-black uppercase">SYSTEM REGISTER // CATALOGUE NUMÉRO VI</span>
              
              <button 
                id="vault-index-close-btn"
                onClick={() => setIndexOpen(false)}
                className="w-10 h-10 border border-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#AFA58D] hover:text-[#D4AF37] hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/5 transition-all duration-300"
                title="Seal Index"
              >
                <X size={20} />
              </button>
            </div>

            {/* MASTER SYSTEM OVERVIEW CONTENT */}
            <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full py-12 md:py-20 z-10">
              <div className="mb-12 border-b border-[#D4AF37]/15 pb-8">
                <motion.h1 
                  className="font-serif text-[#F5F2EA] text-5xl md:text-7xl tracking-wide uppercase font-black mb-3 leading-tight"
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  THE VAULT INDEX
                </motion.h1>
                <motion.p 
                  className="font-serif italic text-[#AFA58D] text-lg md:text-xl md:max-w-xl"
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.85 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Explore football history. Browse through our hallowed halls of architectural monuments, cinematic drama records, and immortal titans.
                </motion.p>
              </div>

              {/* ARCHIVE DIRECTORY COLLECTIONS (NOT CARDS, CARD CATALOG DIRECTORY VIEW) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-12">
                {[
                  { id: 'history', title: 'Immersive Time Machine', chamber: 'SIGNATURE EXPERIENCE', desc: 'The defining cinematic time travel journey across nearly a century of World Cup history.', icon: History },
                  { id: 'atlas', title: 'The Football Atlas', chamber: 'SIGNATURE EXPERIENCE', desc: 'An artistic, hand-drawn cartographic world of football civilizations, champions, hosts, legend origins, and stadium coliseums.', icon: Compass },
                  { id: 'tournaments', title: 'Tournaments Archive', chamber: 'CHAMBER I', desc: 'Deep dive into specialized vintage historical records & golden tournament details.', icon: Trophy },
                  { id: 'legends', title: 'Legends Hall', chamber: 'CHAMBER II', desc: 'The hallowed portal of football legends, duel structures, and immortal goals.', icon: Award },
                  { id: 'records', title: 'Records Monolith', chamber: 'CHAMBER III', desc: 'The permanent registry of unbelievable defensive runtimes and scoring metrics.', icon: BarChart3 },
                  { id: 'nations', title: 'Nations Atlas', chamber: 'CHAMBER IV', desc: 'Interactive atlas charting the evolution of tactical dynasties and civilizations.', icon: Globe },
                  { id: 'matches', title: 'Historic Matches Cinema', chamber: 'CHAMBER V', desc: 'Wide dramatic matches cinema mode mapping historical video/commentary audio.', icon: Film },
                  { id: 'stadiums', title: 'Stadiums & Coliseums', chamber: 'CHAMBER VI', desc: 'An architectural mapping of legendary world arenas. Map view included.', icon: Map },
                  { id: 'search', title: 'Search Vault Directory', chamber: 'GLOBAL FINDER', desc: 'Direct keyword lookup for every team, titan, milestone, or stadium milestone.', icon: Search }
                ].map((col, idx) => (
                  <motion.div
                    key={col.id}
                    onClick={() => {
                      if (col.id === 'search') {
                        setIndexOpen(false);
                        setSearchOpen(true);
                      } else {
                        handleOpenFolder(col.id);
                      }
                    }}
                    className="flex items-center justify-between py-4.5 border-b border-[#4E5661]/15 group cursor-pointer hover:border-[#D4AF37]/50"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + idx * 0.04 }}
                  >
                    <div className="flex items-center gap-4.5">
                      <div className="w-10 h-10 rounded border border-[#4E5661]/25 flex items-center justify-center bg-black/40 text-[#69707A] group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]/40 transition-colors duration-300">
                        <col.icon size={16} strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2">
                           <span className="font-serif font-black text-lg text-[#F5F2EA] group-hover:text-[#D4AF37] transition-colors uppercase tracking-wide">
                             {col.title}
                           </span>
                           <span className="font-mono text-[7.5px] text-[#D4AF37]/45 font-black uppercase">{col.chamber}</span>
                        </div>
                        <p className="font-sans text-xs text-[#69707A] leading-relaxed max-w-sm mt-0.5 line-clamp-1 group-hover:text-[#AFA58D] transition-colors">{col.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-[#4E5661]/50 group-hover:text-[#D4AF37] group-hover:translate-x-1.5 transition-all duration-300" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* LOWER STATS FOOTER */}
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center gap-4 py-8 border-t border-[#4E5661]/10 z-10">
              <span className="font-mono text-[8px] text-[#69707A] tracking-widest uppercase">CATALOG ENTRIES: 22 TOURNAMENTS // 6 LEGENDS // 12 CINEMA CLASHES // 8 COLISEUMS</span>
              <span className="font-serif text-[10px] italic text-[#AFA58D]">"The hallowed registries of football's pre-eminent history exhibition."</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. THE ARCHIVE SEARCH ENGINE (Completely redesigned high fidelity Phase 2J Experience) */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            id="the-archive-search-overlay"
            className="fixed inset-0 z-[600] bg-[#060606] flex flex-col selection:bg-[#D4AF37] selection:text-[#090909] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Library Grid subtle nodes */}
            <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#D4AF37_1px,transparent_1px),linear-gradient(to_bottom,#D4AF37_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

            {/* UPPER SYSTEM STRIP */}
            <div className="w-full bg-[#0b0b0d]/90 border-b border-white/[0.04] px-6 py-4 flex justify-between items-center z-20">
              <div className="flex items-center gap-3">
                <Library size={15} className="text-[#D4AF37]" />
                <span className="font-mono text-[9px] text-[#AFA58D] tracking-[0.2em] uppercase font-bold">SYSTEM DIVISION: DEPT OF ARCHIVES // GLOBAL FINDER</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline font-mono text-[9px] text-[#555] bg-white/[0.02] border border-white/5 py-1 px-2.5 rounded-[2px]">
                  PRESS ARROWS <span className="text-[#D4AF37]">↑↓</span> TO NAVIGATE • <span className="text-[#D4AF37]">ESC</span> TO SEAL
                </span>
                <button 
                  id="search-portal-close-btn"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                    setSelectedResult(null);
                  }}
                  className="px-3.5 py-1.5 border border-white/10 hover:border-[#D4AF37]/45 rounded-[3px] bg-black/40 text-[10px] font-mono text-[#AFA58D] hover:text-[#D4AF37] flex items-center gap-2 transition-all cursor-pointer shadow-lg uppercase"
                >
                  <X size={12} /> Seal Finder
                </button>
              </div>
            </div>

            {/* SPLIT SCREEN LAYOUT CONTAINER */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden w-full max-w-8xl mx-auto h-full">
              
              {/* LEFT PANEL: GOLDEN PARCHMENT EXPANDED HISTORICAL DOSSIER (DESKTOP) */}
              <div className={`lg:col-span-4 border-r border-white/[0.04] p-6 bg-[#0a0908] overflow-y-auto flex-col h-full hidden lg:flex relative ${mobileDossierView ? '!flex fixed inset-0 z-50 bg-[#080706]' : ''}`}>
                {/* Paper texture and vintage vignette */}
                <div className="absolute inset-0 opacity-[0.012] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(212,175,55,0.04)] pointer-events-none" />

                {mobileDossierView && (
                  <button 
                    onClick={() => setMobileDossierView(false)}
                    className="absolute top-4 right-4 z-20 px-3 py-1 bg-[#1a1816] border border-white/10 text-[10px] font-mono text-[#AFA58D] rounded uppercase"
                  >
                    ← Back to Index
                  </button>
                )}

                {richMetadata ? (
                  <motion.div 
                    key={currentDossierSelection?.id}
                    className="flex flex-col justify-between h-full z-10"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* DOSSIER PARCHMENT BODY */}
                    <div>
                      {/* Catalog Stamp Mark */}
                      <div className="flex justify-between items-start border-b border-[#D4AF37]/15 pb-4 mb-6">
                        <div>
                          <p className="font-mono text-[8px] text-[#AFA58D] uppercase tracking-widest">{richMetadata.chamber}</p>
                          <span className="font-mono text-[10px] bg-[#221e1a] border border-[#D4AF37]/20 text-[#D4AF37] font-bold px-2.5 py-0.5 rounded-[2px] mt-1 inline-block uppercase tracking-wider">
                            {richMetadata.stamp}
                          </span>
                        </div>
                        {/* Circular ink stamp simulation */}
                        <div className="w-11 h-11 rounded-full border border-dashed border-[#D4AF37]/30 flex items-center justify-center rotate-12 bg-[#D4AF37]/[0.02] text-[6px] font-mono text-[#D4AF37]/65 text-center leading-tight">
                          VAULT<br/>SEAL
                        </div>
                      </div>

                      {/* Title Header */}
                      <p className="font-sans text-[9px] text-[#69707A] uppercase tracking-[0.25em] mb-1">MUSEUM SOURCE DOSSIER</p>
                      <h3 className="font-serif text-[#F5F2EA] text-3xl md:text-4xl font-black mb-4 tracking-normal uppercase leading-tight select-text">
                        {currentDossierSelection?.title}
                      </h3>
                      
                      {/* Key Attribute Ledger Grid */}
                      <div className="grid grid-cols-1 gap-3.5 bg-[#141210]/60 p-4 border border-white/5 rounded-[3px] mb-6 select-text">
                        <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                          <span className="font-mono text-[9px] text-[#69707A] uppercase">{richMetadata.field1Label}</span>
                          <span className="font-serif text-xs text-[#DDD7C8] font-bold text-right">{richMetadata.field1Value}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                          <span className="font-mono text-[9px] text-[#69707A] uppercase">{richMetadata.field2Label}</span>
                          <span className="font-serif text-xs text-[#D4AF37] font-bold text-right italic">{richMetadata.field2Value}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-mono text-[9px] text-[#69707A] uppercase">{richMetadata.field3Label}</span>
                          <span className="font-sans text-xs text-[#DDD7C8] text-right font-medium">{richMetadata.field3Value}</span>
                        </div>
                      </div>

                      {/* Elegant handwriting quote box */}
                      <div className="relative border-l-2 border-[#D4AF37]/45 pl-4.5 py-1 mb-6 select-text">
                        <span className="absolute -top-3.5 left-2 font-mono text-[7px] text-[#D4AF37]/40 bg-[#0a0908] px-1.5 uppercase tracking-widest">{richMetadata.accentTitle || 'Historical Significance'}</span>
                        <p className="font-serif text-[12.5px] italic text-[#DDD7C8]/90 leading-relaxed">
                          {richMetadata.accentText}
                        </p>
                      </div>

                      {/* Bullets achievements panel */}
                      <div className="mb-6">
                        <span className="block font-sans text-[10px] text-[#AFA58D] uppercase tracking-widest mb-3.5 font-bold border-b border-[#D4AF37]/10 pb-1">
                          {richMetadata.bulletsLabel}
                        </span>
                        <ul className="space-y-2.5">
                          {richMetadata.bullets.map((bullet, k) => (
                            <li key={k} className="flex gap-2.5 items-start text-xs font-sans text-[#DDD7C8]/80 leading-relaxed select-text">
                              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mt-1.5 flex-shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Connections Nodes block */}
                      {richMetadata.relationships && richMetadata.relationships.length > 0 && (
                        <div className="mb-6">
                          <span className="block font-sans text-[10px] text-[#69707A] uppercase tracking-widest mb-2.5 font-semibold">
                            ARCHIVE CONNECTIONS
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {richMetadata.relationships.map((rel, rIdx) => (
                              <button
                                key={rIdx}
                                onClick={() => {
                                  setSearchQuery(rel.query);
                                  setSelectedResult(null);
                                }}
                                className="px-2.5 py-1 bg-[#1c1815] hover:bg-[#D4AF37]/10 border border-[#D4AF37]/15 hover:border-[#D4AF37]/60 text-[9.5px] font-mono text-[#D4AF37] rounded-[2px] transition-all cursor-pointer flex items-center gap-1"
                              >
                                <span>{rel.label}</span>
                                <ArrowUpRight size={10} />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* JOURNEY MAP & DEEP LAUNCH ACTION */}
                    <div className="mt-8 border-t border-dashed border-[#D4AF37]/20 pt-6">
                      
                      {/* CONTINUE EXPLORING JOURNEY PATHWAY */}
                      {journeyTrail && journeyTrail.length > 0 && (
                        <div className="mb-6 bg-black/45 hover:bg-black/75 p-3.5 rounded-[3px] border border-white/5 transition-all">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles size={11} className="text-[#D4AF37] animate-pulse" />
                            <span className="font-mono text-[9px] text-[#D4AF37] tracking-wider uppercase font-bold">SEARCH JOURNEY PATHWAY</span>
                          </div>
                          <p className="font-sans text-[11px] text-[#69707A] leading-relaxed mb-3">
                            You navigated to {currentDossierSelection?.title}. Continue exploring along this chronological history line:
                          </p>
                          <div className="space-y-2">
                            {journeyTrail.map((step, jIdx) => (
                              <div 
                                key={jIdx}
                                onClick={() => {
                                  setSearchQuery(step.query);
                                  setSelectedResult(null);
                                }}
                                className="group/step p-1.5 rounded-[2px] hover:bg-white/[0.02] border border-transparent hover:border-white/5 cursor-pointer flex justify-between items-center transition-all"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-[9px] text-[#69707A]">{jIdx + 1}.</span>
                                  <span className="font-sans text-[11px] text-[#DDD7C8] group-hover/step:text-[#D4AF37] transition-all">{step.title}</span>
                                </div>
                                <span className="font-mono text-[8.5px] text-[#AFA58D] opacity-0 group-hover/step:opacity-100 transition-opacity">
                                  {step.actionText} →
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => handleSearchSelect(currentDossierSelection!)}
                        className="w-full py-4.5 bg-[#D4AF37] hover:bg-[#EAE5D9] text-[#050505] font-serif text-sm font-black tracking-[0.25em] uppercase rounded-[3px] shadow-[0_4px_25px_rgba(212,175,55,0.15)] flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-[0.98] cursor-pointer"
                      >
                        <Compass size={16} />
                        <span>ENTER IMMERSIVE VAULT CHAMBER</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-[#4E5661]">
                    <Fingerprint size={48} className="text-[#D4AF37]/20 mb-3" />
                    <p className="font-serif text-sm italic mb-1 text-[#69707A]">Dossier Ledger Closed</p>
                    <p className="font-sans text-[11px] text-[#4E5661] max-w-xs">Highlight or click any card index registry in the right panel to unroll its parchment dossier sheet.</p>
                  </div>
                )}
              </div>

              {/* RIGHT PANEL: IMMERSIVE FINDER AND CARD CATALOG CABINET (SCROLLS) */}
              <div className="lg:col-span-8 flex flex-col p-6 overflow-hidden h-full">
                
                {/* ARCHIVE KEYWORD ENTRY EXPERIMENTAL */}
                <div className="mb-6 relative">
                  <div className="flex justify-between items-baseline mb-2">
                    <h1 className="font-serif text-white text-3xl font-black uppercase tracking-wide flex items-center gap-2">
                      SEARCH THE VAULT
                    </h1>
                    <span className="font-mono text-[8px] text-[#D4AF37] tracking-widest uppercase">REGISTRY FINDER SYSTEM</span>
                  </div>
                  <p className="font-sans text-[#AFA58D] text-xs leading-relaxed mb-4 max-w-xl">
                    Discover vintage tournaments, legendary titans, severe dynasties, defining classic matches, monolithic records, and architectural coliseums across nearly a century of World Cup records.
                  </p>

                  <div className="relative border-b-2 border-[#D4AF37]/35 focus-within:border-[#D4AF37] pb-1.5 transition-all">
                    <input 
                      id="archive-finder-input"
                      type="text" 
                      autoFocus
                      placeholder="Type metadata (e.g., 'Pelé', '1986', 'Azteca', 'Maracanazo')..." 
                      className="w-full bg-transparent font-serif text-xl sm:text-2xl text-[#F5F2EA] outline-none placeholder-[#4E5661]/60 font-light pr-12 select-text"
                      value={searchQuery}
                      onChange={e => {
                        setSearchQuery(e.target.value);
                        setHighlightedIndex(0);
                      }}
                    />
                    <div className="absolute right-1 bottom-1 text-[#D4AF37]/45 flex items-center gap-2">
                      {searchQuery && (
                        <button 
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedResult(null);
                          }}
                          className="p-1 hover:text-[#D4AF37] text-[#555] transition-colors"
                        >
                          <X size={15} />
                        </button>
                      )}
                      <Search size={22} className="animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* CLASSIFICATION SEARCH MODES TAB BAR */}
                <div className="mb-6 flex gap-1.5 overflow-x-auto pb-1.5 custom-scrollbar-thin">
                  {[
                    { id: 'everything', label: 'All Collections' },
                    { id: 'player', label: 'Titans & Legends' },
                    { id: 'nation', label: 'Dynasties' },
                    { id: 'match', label: 'Cinema Clashes' },
                    { id: 'record', label: 'Records Hall' },
                    { id: 'stadium', label: 'Coliseums' },
                    { id: 'tournament', label: 'Tournaments' }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => {
                        setSearchMode(mode.id as any);
                        setHighlightedIndex(0);
                      }}
                      className={`px-3 py-1.5 text-[10px] font-mono rounded-[2px] uppercase whitespace-nowrap border cursor-pointer transition-all duration-300 flex-shrink-0 ${
                        searchMode === mode.id
                          ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]'
                          : 'bg-black/35 text-[#69707A] border-white/5 hover:text-[#AFA58D] hover:border-white/10'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>

                {/* RESULTS LAYOUT DIVISION */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 overflow-hidden h-full">
                  
                  {/* SEARCH RESULTS SCROLL CABINET */}
                  <div className={`overflow-y-auto pr-1.5 custom-scrollbar-thin flex flex-col gap-4 h-full ${activeForgottenStory ? 'md:col-span-8' : 'md:col-span-12'}`}>
                    {currentResults.length > 0 ? (
                      <>
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="font-mono text-[9px] text-[#AFA58D] tracking-widest uppercase">
                            FOUND {currentResults.length} ALIGNMENTS IN THE CABINETS
                          </span>
                        </div>

                        {currentResults.map((result, idx) => {
                          const isHighlighted = idx === highlightedIndex;
                          const isDossierOpen = currentDossierSelection && currentDossierSelection.id === result.id && currentDossierSelection.type === result.type;
                          return (
                            <motion.div
                              key={`${result.type}-${result.id}-${idx}`}
                              onClick={() => {
                                setHighlightedIndex(idx);
                                setSelectedResult(result);
                              }}
                              onDoubleClick={() => handleSearchSelect(result)}
                              className={`group relative p-4 rounded-[2px] border cursor-pointer shadow-xl overflow-hidden transition-all ${
                                isDossierOpen
                                  ? 'bg-[#181512] border-[#D4AF37]'
                                  : isHighlighted
                                    ? 'bg-[#0f0f12] border-[#D4AF37]/50'
                                    : 'bg-[#09090b] border-white/[0.04] hover:bg-[#0c0c0e] hover:border-[#4E5661]/35'
                              }`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: Math.min(6, idx) * 0.035 }}
                              whileHover={{ x: 2 }}
                            >
                              {/* Library classification tab colors */}
                              <div className={`absolute top-0 left-0 right-0 h-[2.5px] transition-opacity duration-300 ${
                                isDossierOpen 
                                  ? 'bg-[#D4AF37]' 
                                  : result.type === 'player' 
                                    ? 'bg-emerald-600' 
                                    : result.type === 'nation' 
                                      ? 'bg-blue-600' 
                                      : result.type === 'match' 
                                        ? 'bg-amber-600' 
                                        : result.type === 'stadium' 
                                          ? 'bg-amber-950'
                                          : 'bg-purple-600'
                              } opacity-60 group-hover:opacity-100`} />

                              <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-[7.5px] bg-white/[0.03] border border-white/5 text-[#D4AF37] px-1.5 py-0.5 rounded-[1px] uppercase tracking-wider font-bold">
                                      {result.type}
                                    </span>
                                    <span className="font-mono text-[7.5px] text-[#69707A] tracking-wider uppercase">
                                      {result.meta}
                                    </span>
                                  </div>
                                  <span className="font-mono text-[8px] text-[#444] group-hover:text-[#D4AF37]/20 select-none">
                                    RG-STAMP #{idx + 101}
                                  </span>
                                </div>

                                <div className="flex justify-between items-start gap-4">
                                  <div>
                                    <h4 className="font-serif text-[#F5F2EA] text-md font-bold group-hover:text-[#D4AF37] transition-all tracking-wide uppercase leading-tight select-text">
                                      {result.title}
                                    </h4>
                                    <p className="font-serif text-[11px] italic text-[#AFA58D]/85 mt-0.5">{result.subtitle}</p>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-[#69707A] group-hover:text-[#D4AF37] font-mono text-[8px] uppercase tracking-widest font-bold flex-shrink-0">
                                    <span className="hidden sm:inline">Inspect Dossier</span>
                                    <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                                  </div>
                                </div>

                                <p className="font-sans text-[11px] text-[#828892] leading-relaxed line-clamp-2 mt-1 select-text">
                                  {result.description}
                                </p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-12 border border-dashed border-[#4E5661]/15 bg-black/10 rounded">
                        <FileText size={36} className="text-[#D4AF37]/20 mb-3 animate-pulse" />
                        {searchQuery.trim() ? (
                          <>
                            <h4 className="font-serif text-[#DDD7C8] text-sm font-bold uppercase mb-1">NO ARCHIVAL SHEETS ALIGNED</h4>
                            <p className="font-sans text-[11px] text-[#69707A] max-w-xs leading-relaxed">
                              We find no papers matching "{searchQuery}" inside this cabinet slot. Please verify your query or switch the classification mode to 'All Collections'.
                            </p>
                          </>
                        ) : (
                          <>
                            <h4 className="font-serif text-[#69707A] text-sm uppercase tracking-widest mb-1.5 font-bold">Cabinet Ready</h4>
                            <p className="font-sans text-[11px] text-[#4E5661] max-w-xs leading-relaxed">
                              Select a classification filter above or type keywords to begin unrolling archive sheets.
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* SURPRISE HISTORICAL REVELATION SIDE PANEL (FORGOTTEN HISTORY) */}
                  {activeForgottenStory && (
                    <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-white/[0.04] pt-4 md:pt-0 md:pl-4.5 flex flex-col justify-between h-full">
                      <div className="bg-[#120a06]/45 p-4 rounded border border-[#a28646]/10 relative overflow-hidden select-text">
                        <div className="absolute top-0 right-0 w-16 h-16 opacity-5 pointer-events-none bg-[radial-gradient(#a28646_1px,transparent_1px)] [background-size:8px_8px]" />
                        
                        <div className="flex items-center gap-2 mb-2 pb-1 border-b border-[#a28646]/10">
                          <Sparkles size={11} className="text-[#D4AF37]" strokeWidth={2.5} />
                          <span className="font-mono text-[8px] text-[#D4AF37] tracking-[0.2em] font-extrabold uppercase">FORGOTTEN REVELATION</span>
                        </div>
                        
                        <h5 className="font-serif text-[#F5F2EA] text-md font-black uppercase mb-1.5 leading-snug">
                          {activeForgottenStory.title}
                        </h5>
                        <div className="flex gap-2 mb-3.5 select-none">
                          <span className="font-mono text-[7px] text-[#69707A] border border-white/5 px-1.5 rounded-[1px] uppercase">{activeForgottenStory.period}</span>
                          <span className="font-mono text-[7px] text-[#a28646] uppercase font-bold">{activeForgottenStory.concept}</span>
                        </div>

                        <p className="font-sans text-[11px] text-[#DDD7C8]/80 leading-relaxed italic pr-1 select-text">
                          "{activeForgottenStory.body}"
                        </p>
                        
                        <div className="mt-4 border-t border-dashed border-white/5 pt-3">
                          <span className="font-mono text-[7.5px] text-[#555] uppercase block mb-1">REASONED CONNECTIONS</span>
                          <div className="flex flex-wrap gap-1.5 select-none">
                            {activeForgottenStory.connections.map((conn, cIdx) => (
                              <span 
                                key={cIdx}
                                onClick={() => {
                                  setSearchQuery(conn);
                                  setSelectedResult(null);
                                }}
                                className="font-mono text-[7.5px] bg-[#221e1a] border border-[#a28646]/10 text-[#DDD7C8] px-1.5 py-0.5 rounded-[1px] cursor-pointer hover:border-[#D4AF37] transition-all"
                              >
                                {conn}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Interactive shortcuts info stamp */}
                      <div className="hidden md:block p-3.5 bg-black/45 hover:bg-black/85 rounded-[3px] border border-white/5 transition-all">
                        <div className="flex items-center gap-2 mb-1.5">
                          <CalendarDays size={11} className="text-[#AFA58D]" />
                          <span className="font-mono text-[8px] text-[#AFA58D] font-bold uppercase tracking-wider">HISTORIAN INDEX KEYS</span>
                        </div>
                        <p className="font-sans text-[10.5px] text-[#69707A] leading-relaxed">
                          Try searching <span className="text-[#D4AF37] cursor-pointer font-semibold underline" onClick={() => setSearchQuery('Maracanazo')}>'Maracanazo'</span>, <span className="text-[#D4AF37] cursor-pointer font-semibold underline" onClick={() => setSearchQuery('Miracle')}>'Miracle'</span>, <span className="text-[#D4AF37] cursor-pointer font-semibold underline" onClick={() => setSearchQuery('Pickles')}>'Pickles'</span>, or <span className="text-[#D4AF37] cursor-pointer font-semibold underline" onClick={() => setSearchQuery('adidas')}>'Adidas'</span> to summon more forgotten truths.
                        </p>
                      </div>
                    </div>
                  )}

                </div>

                {/* MOBILE ACTIVE REVELATION DETAILS FLOATER BUTTON */}
                {selectedResult && (
                  <div className="lg:hidden mt-4 pt-2.5 border-t border-white/5 flex gap-3">
                    <button 
                      onClick={() => setMobileDossierView(true)}
                      className="flex-1 py-3 border border-[#D4AF37]/35 bg-[#D4AF37]/5 text-[#D4AF37] font-serif text-[11px] tracking-widest uppercase font-black rounded cursor-pointer"
                    >
                      Inspect Expanded Parchment Sheet
                    </button>
                    <button 
                      onClick={() => handleSearchSelect(selectedResult)}
                      className="flex-1 py-3 bg-[#D4AF37] text-black font-serif text-[11px] tracking-widest uppercase font-black rounded cursor-pointer"
                    >
                      Enter Vault Room
                    </button>
                  </div>
                )}

              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
