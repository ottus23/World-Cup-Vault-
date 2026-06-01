import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass,
  Search,
  Bookmark,
  Clock,
  X,
  Award,
  Zap,
  User,
  Cpu,
  HelpCircle,
  Flame,
  ArrowRight,
  Sparkles,
  MapPin,
  ChevronRight,
  BookOpen,
  Dribbble,
  Calendar,
  Globe,
  Star,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Database,
} from "lucide-react";
import { tournaments, legends, Legend, Tournament } from "../data";
import { nationsData, NationCivilization } from "../nationsData";
import { VerifiedImage } from "./VerifiedImage";
import { stadiumsData, Stadium } from "../stadiumsData";
import { CLASSIC_MATCHES, MatchDetails } from "./HistoricMatchesVault";

interface ArchiveCommandCenterProps {
  onExploreMatches: (matchId?: string) => void;
  onExploreNations: (nationId?: string) => void;
  onExploreLegends: (legendId?: string) => void;
  onExploreRecords: (recordId?: string) => void;
  onExploreStadiums: (stadiumId?: string) => void;
  onExploreTournament: (year: number | null) => void;
  onExploreHistory: () => void;
  onExploreAtlas: () => void;
}

type SearchItem = {
  id: string | number;
  type: "tournament" | "legend" | "nation" | "stadium" | "match";
  title: string;
  subtitle: string;
  label: string;
  metadata?: string;
};

type RecentVisit = {
  type: "tournament" | "legend" | "nation" | "stadium" | "match";
  id: string | number;
  label: string;
  timestamp: number;
};

type FavoriteItem = {
  type: "tournament" | "legend" | "nation" | "stadium" | "match";
  id: string | number;
  label: string;
};

type StampDef = {
  id: string;
  title: string;
  subtitle: string;
  req: string;
  unlocked: boolean;
  icon: string;
  color: string;
};

// Quiz Question Definition
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export function ArchiveCommandCenter({
  onExploreMatches,
  onExploreNations,
  onExploreLegends,
  onExploreRecords,
  onExploreStadiums,
  onExploreTournament,
  onExploreHistory,
  onExploreAtlas,
}: ArchiveCommandCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<
    "directory" | "compare" | "quiz" | "profile"
  >("directory");
  const overlayRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // States with localStorage persistence
  const [recentVisits, setRecentVisits] = useState<RecentVisit[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [xp, setXp] = useState(100);
  const [unlockedStamps, setUnlockedStamps] = useState<string[]>([
    "centrifuge",
  ]); // default entry stamp

  // Comparison Lab Selection State
  const [compareType, setCompareType] = useState<"legend" | "nation">("legend");
  const [compareLegendA, setCompareLegendA] = useState("pele");
  const [compareLegendB, setCompareLegendB] = useState("maradona");
  const [compareNationA, setCompareNationA] = useState("argentina");
  const [compareNationB, setCompareNationB] = useState("brazil");

  // Quiz State
  const [quizActive, setQuizActive] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedXPInSession, setEarnedXPInSession] = useState(0);

  // Load persistence on Mount & Event trigger listener
  useEffect(() => {
    try {
      const storedRecents = localStorage.getItem("wc_command_recent_visits");
      if (storedRecents) setRecentVisits(JSON.parse(storedRecents));

      const storedFavs = localStorage.getItem("wc_command_favorites");
      if (storedFavs) setFavorites(JSON.parse(storedFavs));

      const storedXp = localStorage.getItem("wc_command_xp");
      if (storedXp) setXp(Number(storedXp));

      const storedStamps = localStorage.getItem("wc_command_stamps");
      if (storedStamps) setUnlockedStamps(JSON.parse(storedStamps));
    } catch (e) {
      console.error("Local storage failure in Command Center", e);
    }
  }, [isOpen]);

  // Handle outside exploration clicks tracking
  useEffect(() => {
    const handleAddRecentVisit = (e: Event) => {
      const customEvt = e as CustomEvent;
      if (customEvt.detail) {
        trackVisit(
          customEvt.detail.type,
          customEvt.detail.id,
          customEvt.detail.label,
        );
      }
    };

    window.addEventListener("track-vault-explore", handleAddRecentVisit);
    return () => {
      window.removeEventListener("track-vault-explore", handleAddRecentVisit);
    };
  }, [recentVisits]);

  // Handle global escape key to close command center
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Auto focus search input when opened or when directory clicked
  useEffect(() => {
    if (isOpen && activeTab === "directory") {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, activeTab]);

  // Unified search target consolidation
  const searchPool = useMemo<SearchItem[]>(() => {
    const pool: SearchItem[] = [];

    // 1. Tournaments
    tournaments.forEach((t) => {
      pool.push({
        id: t.year,
        type: "tournament",
        title: `${t.year} World Cup`,
        subtitle: `Champions: ${t.champion} • Hosts: ${t.host}`,
        label: `${t.year} ${t.host}`,
        metadata: `${t.year} ${t.champion} ${t.runnerUp} ${t.host} tournament final`,
      });
    });

    // 2. Legends
    legends.forEach((l) => {
      pool.push({
        id: l.id,
        type: "legend",
        title: l.name,
        subtitle: `${l.nation} Legend (${l.era})`,
        label: l.name,
        metadata: `${l.name} ${l.nation} ${l.era} legend golden ball goal scorer`,
      });
    });

    // 3. Nations
    nationsData.forEach((n) => {
      pool.push({
        id: n.id,
        type: "nation",
        title: `${n.name}`,
        subtitle: `${n.titlesCount}x Champion • ${n.appearancesCount} App.`,
        label: n.name,
        metadata: `${n.name} ${n.motto} ${n.continent} nation country representative team`,
      });
    });

    // 4. Stadiums
    stadiumsData.forEach((s) => {
      pool.push({
        id: s.id,
        type: "stadium",
        title: s.name,
        subtitle: `${s.city}, ${s.country} • Cap: ${s.capacity}`,
        label: s.name,
        metadata: `${s.name} ${s.city} ${s.country} stadium venue architectural arena`,
      });
    });

    // 5. Classic Matches
    CLASSIC_MATCHES.forEach((m) => {
      pool.push({
        id: m.id,
        type: "match",
        title: `${m.teamA} vs ${m.teamB}`,
        subtitle: `${m.year} final • ${m.stage} (${m.shootoutScore || `${m.scoreA}-${m.scoreB}`})`,
        label: `${m.teamA} vs ${m.teamB} (${m.year})`,
        metadata: `${m.teamA} vs ${m.teamB} ${m.year} match shootout champion game classic`,
      });
    });

    return pool;
  }, []);

  // Filter search items matching query
  const filteredSearchItems = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return searchPool
      .filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.subtitle.toLowerCase().includes(query) ||
          item.metadata?.toLowerCase().includes(query),
      )
      .slice(0, 5); // display top 5 matches
  }, [searchQuery, searchPool]);

  // Track visit in memory and storage
  const trackVisit = (
    type: RecentVisit["type"],
    id: string | number,
    label: string,
  ) => {
    const timestamp = Date.now();
    const newVisit: RecentVisit = { type, id, label, timestamp };

    setRecentVisits((prev) => {
      const filtered = prev.filter((v) => !(v.type === type && v.id === id));
      const updated = [newVisit, ...filtered].slice(0, 8);
      try {
        localStorage.setItem(
          "wc_command_recent_visits",
          JSON.stringify(updated),
        );
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    // Unlock explorer stamp based on first visit elements
    if (type === "nation" && String(id).toLowerCase() === "argentina") {
      unlockStamp("albiceleste_pride");
    } else if (type === "tournament" && Number(id) === 1950) {
      unlockStamp("maracanazo_witness");
    } else if (type === "legend" && String(id).toLowerCase() === "pele") {
      unlockStamp("pele_samba");
    } else if (type === "stadium" && String(id).toLowerCase() === "azteca") {
      unlockStamp("azteca_cathedral");
    }
  };

  // Toggle favorite bookmark
  const toggleFavorite = (
    type: FavoriteItem["type"],
    id: string | number,
    label: string,
    e?: React.MouseEvent,
  ) => {
    e?.stopPropagation(); // stop click through to entry jump

    setFavorites((prev) => {
      const exists = prev.some((f) => f.type === type && f.id === id);
      let updated: FavoriteItem[];

      if (exists) {
        updated = prev.filter((f) => !(f.type === type && f.id === id));
      } else {
        updated = [...prev, { type, id, label }];
        gainXP(20); // reward bookmark additions
      }

      try {
        localStorage.setItem("wc_command_favorites", JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const isFavorited = (type: string, id: string | number) => {
    return favorites.some((f) => f.type === type && f.id === id);
  };

  // Helper to gain XP
  const gainXP = (amount: number) => {
    setXp((prev) => {
      const updated = prev + amount;
      try {
        localStorage.setItem("wc_command_xp", String(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  // Helper to unlock passport stamp
  const unlockStamp = (stampId: string) => {
    setUnlockedStamps((prev) => {
      if (prev.includes(stampId)) return prev;
      const updated = [...prev, stampId];
      try {
        localStorage.setItem("wc_command_stamps", JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      // Reward substantial XP for stamp unlocks
      gainXP(100);
      return updated;
    });
  };

  // Navigate to targets from Command Center and close overlay
  const handleItemNavigation = (
    type: SearchItem["type"],
    id: string | number,
    label: string,
  ) => {
    trackVisit(type, id, label);
    setIsOpen(false);
    setSearchQuery("");

    setTimeout(() => {
      switch (type) {
        case "tournament":
          if (typeof id === "number") onExploreTournament(id);
          break;
        case "legend":
          onExploreLegends(String(id));
          break;
        case "nation":
          onExploreNations(String(id));
          break;
        case "stadium":
          onExploreStadiums(String(id));
          break;
        case "match":
          onExploreMatches(String(id));
          break;
      }
    }, 100);
  };

  // Master lists of passport stamps definition
  const stampDefs = useMemo<StampDef[]>(
    () => [
      {
        id: "centrifuge",
        title: "GOLDEN WATERMARK",
        subtitle: "Command Access",
        req: "Unlocked upon entering the Archives",
        unlocked: unlockedStamps.includes("centrifuge"),
        icon: "🎟️",
        color: "border-[#D4AF37] text-[#D4AF37]",
      },
      {
        id: "albiceleste_pride",
        title: "ALBICELESTE CORONATION",
        subtitle: "Argentina Vault",
        req: "Explore Argentina in the Nations Vault",
        unlocked: unlockedStamps.includes("albiceleste_pride"),
        icon: "🇦🇷",
        color: "border-sky-400 text-sky-400",
      },
      {
        id: "pele_samba",
        title: "3-STAR KINGDOM",
        subtitle: "Pelé Legacy Stamp",
        req: "View the Legendary Pelé profile",
        unlocked: unlockedStamps.includes("pele_samba"),
        icon: "👑",
        color: "border-yellow-400 text-yellow-400",
      },
      {
        id: "maracanazo_witness",
        title: "MARACANAZO MEMOIR",
        subtitle: "1950 World Cup Stamp",
        req: "Explore the 1950 World Cup history",
        unlocked: unlockedStamps.includes("maracanazo_witness"),
        icon: "🇺🇾",
        color: "border-blue-400 text-blue-400",
      },
      {
        id: "azteca_cathedral",
        title: "THE AZTECA ECHO",
        subtitle: "Stadium Temple Stamp",
        req: "Visit Estadio Azteca in Stadiums",
        unlocked: unlockedStamps.includes("azteca_cathedral"),
        icon: "🏟️",
        color: "border-amber-500 text-amber-500",
      },
      {
        id: "trivia_adept",
        title: "GRAND TRIVIA SEAL",
        subtitle: "Quiz Arena Victor",
        req: "Perform a flawless trivia session",
        unlocked: unlockedStamps.includes("trivia_adept"),
        icon: "🎖️",
        color: "border-emerald-400 text-emerald-400",
      },
      {
        id: "curator_license",
        title: "CURATOR COMMUNIQUE",
        subtitle: "Duel Analyst Badge",
        req: "Conduct a Dual Comparison Lab search",
        unlocked: unlockedStamps.includes("curator_license"),
        icon: "⚓",
        color: "border-purple-400 text-purple-400",
      },
    ],
    [unlockedStamps],
  );

  // Curated Pointers representing "Continue exploring"
  const lastStateCurations = useMemo(() => {
    // Read individual recent visits, or get default iconic ones
    const tournamentVisit = recentVisits.find((v) => v.type === "tournament");
    const legendVisit = recentVisits.find((v) => v.type === "legend");
    const nationVisit = recentVisits.find((v) => v.type === "nation");
    const stadiumVisit = recentVisits.find((v) => v.type === "stadium");
    const matchVisit = recentVisits.find((v) => v.type === "match");

    return {
      tournament: tournamentVisit
        ? { id: tournamentVisit.id, label: tournamentVisit.label }
        : { id: 2022, label: "2022 Qatar" },
      legend: legendVisit
        ? { id: legendVisit.id, label: legendVisit.label }
        : { id: "pele", label: "Pelé (Brazil)" },
      nation: nationVisit
        ? { id: nationVisit.id, label: nationVisit.label }
        : { id: "argentina", label: "Argentina" },
      stadium: stadiumVisit
        ? { id: stadiumVisit.id, label: stadiumVisit.label }
        : { id: "maracana", label: "Maracanã" },
      match: matchVisit
        ? { id: matchVisit.id, label: matchVisit.label }
        : { id: "2022-final", label: "Argentina 3-3 France (2022)" },
    };
  }, [recentVisits]);

  // Recommended smart suggestions based on last legend or team examined
  const recommendedJourneys = useMemo(() => {
    // If user's last legend is Maradona, suggest Argentina, 1986, Azteca
    const lastLegendVisit = recentVisits.find((v) => v.type === "legend");
    if (lastLegendVisit && String(lastLegendVisit.id) === "maradona") {
      return [
        {
          type: "tournament" as const,
          id: 1986,
          label: "Mexico 1986 Tournament",
          icon: "🏆",
          desc: "Step back to Argentina's pinnacle victory",
        },
        {
          type: "match" as const,
          id: "1986-quarterfinal",
          label: "Hand of God Duel",
          icon: "⚽",
          desc: "The most controversial game in history",
        },
        {
          type: "stadium" as const,
          id: "azteca",
          label: "Estadio Azteca",
          icon: "🏟️",
          desc: "The stage of Maradona's Goal of the Century",
        },
      ];
    }
    // Default Iconic Recommendations
    return [
      {
        type: "tournament" as const,
        id: 1970,
        label: "Brazil 1970 Dynasty",
        icon: "🏆",
        desc: "The finest collective exhibition of collective football",
      },
      {
        type: "legend" as const,
        id: "pele",
        label: "Pelé Heritage",
        icon: "👑",
        desc: "The King's classic records and vintage exhibits",
      },
      {
        type: "match" as const,
        id: "2022-final",
        label: "2022 Coronation Final",
        icon: "⚽",
        desc: "Explore the definitive, dramatic final in Lusail",
      },
    ];
  }, [recentVisits]);

  // Explorer Profile details based on accumulated XP
  const profileDetails = useMemo(() => {
    let level = 1;
    let title = "Museum Novice";
    let xpNeeded = 200;
    let progress = 0;

    if (xp < 200) {
      level = 1;
      title = "Novice Explorer";
      xpNeeded = 200;
      progress = (xp / 200) * 100;
    } else if (xp < 500) {
      level = 2;
      title = "Vault Cataloger";
      xpNeeded = 500;
      progress = ((xp - 200) / 300) * 100;
    } else if (xp < 1000) {
      level = 3;
      title = "Samba Curator";
      xpNeeded = 1000;
      progress = ((xp - 500) / 500) * 100;
    } else if (xp < 2000) {
      level = 4;
      title = "Grand Archivist";
      xpNeeded = 2000;
      progress = ((xp - 1000) / 1000) * 100;
    } else {
      level = 5;
      title = "Keeper of the Football Grail";
      xpNeeded = 5000; // max cap representation
      progress = Math.min(((xp - 2000) / 3000) * 100, 100);
    }

    return { level, title, xpNeeded, progress };
  }, [xp]);

  // Quiz Questions Database (static elite)
  const quizQuestions = useMemo<QuizQuestion[]>(
    () => [
      {
        id: 1,
        question:
          "Which iconic player stands alone in historical annals as the owner of three FIFA World Cup titles?",
        options: [
          "Pelé (Brazil)",
          "Diego Maradona (Argentina)",
          "Franz Beckenbauer (Germany)",
          "Garrincha (Brazil)",
        ],
        correctAnswer: "Pelé (Brazil)",
        explanation:
          "Pelé won the championship in 1958, 1962, and 1970, confirming his crown in footballing folklore.",
      },
      {
        id: 2,
        question:
          "In which tournament did the legendary shock nicknamed 'The Maracanazo' shatter the host nation's dreams?",
        options: [
          "France 1938",
          "Brazil 1950",
          "Switzerland 1954",
          "Chile 1962",
        ],
        correctAnswer: "Brazil 1950",
        explanation:
          "Uruguay defeated host nation Brazil 2-1 on July 16, 1950, in front of a staggering 200,000 spectators.",
      },
      {
        id: 3,
        question:
          "Which conceptual tactical system was brought to revolutionized glory by Johan Cruyff's Netherlands in 1974?",
        options: [
          "Catenaccio Defensive Block",
          "Total Football (Totaalvoetbal)",
          "Tiki-Taka Pass Harmony",
          "Gegenpressing Counter-Blitz",
        ],
        correctAnswer: "Total Football (Totaalvoetbal)",
        explanation:
          "Total Football allowed players to switch roles fluidly across positions, creating beautiful, coordinated football choreography.",
      },
      {
        id: 4,
        question:
          "In the dramatic 3-3 Lusail final of 2022, who registered a relentless hat-trick for France to keep them in contention?",
        options: [
          "Antoine Griezmann",
          "Olivier Giroud",
          "Kylian Mbappé",
          "Zinedine Zidane",
        ],
        correctAnswer: "Kylian Mbappé",
        explanation:
          "Kylian Mbappé scored two quick penalties and a classic high-intensity volley to secure his stunning final hat-trick.",
      },
    ],
    [],
  );

  // Compute stats comparison data for Legend A vs Legend B
  const legendsComparison = useMemo(() => {
    const defaultA = legends.find((l) => l.id === compareLegendA) || legends[0];
    const defaultB = legends.find((l) => l.id === compareLegendB) || legends[1];

    // Curated Stats representation matrix for classic legends
    const statsMap: Record<
      string,
      {
        titles: number;
        goals: number;
        matches: number;
        longevityScore: number;
        rating: number;
      }
    > = {
      pele: {
        titles: 3,
        goals: 12,
        matches: 14,
        longevityScore: 92,
        rating: 99,
      },
      maradona: {
        titles: 1,
        goals: 8,
        matches: 21,
        longevityScore: 88,
        rating: 98,
      },
      cruyff: {
        titles: 0,
        goals: 3,
        matches: 7,
        longevityScore: 85,
        rating: 96,
      },
      ronaldo: {
        titles: 2,
        goals: 15,
        matches: 19,
        longevityScore: 91,
        rating: 97,
      },
      zidane: {
        titles: 1,
        goals: 5,
        matches: 12,
        longevityScore: 90,
        rating: 97,
      },
    };

    const statsA = statsMap[defaultA.id] || {
      titles: 1,
      goals: 4,
      matches: 10,
      longevityScore: 85,
      rating: 95,
    };
    const statsB = statsMap[defaultB.id] || {
      titles: 1,
      goals: 4,
      matches: 10,
      longevityScore: 85,
      rating: 95,
    };

    // Verdict editorial dynamic synthesis
    let verdictStr = "";
    if (defaultA.id === "pele" && defaultB.id === "maradona") {
      verdictStr =
        "COLLECTIVE KING VS MASTER OF FORCE. Pelé represents the absolute collective pinnacle of a dominant golden Brazilian generation, claiming 3 stars. Diego Maradona represents the ultimate peak of individual orchestration, famously bending Mexico '86 into his sole personal canvas. A deadlock between system supremacy and artistic rebellion.";
    } else if (defaultA.id === "pele" && defaultB.id === "ronaldo") {
      verdictStr =
        "THE KINGS OF SAMBA. Pelé remains the original teenager who took Sweden by storm and established Brazil's global sovereignty. Ronaldo Nazário conquered horrific knee traumas for his iconic 2002 redemptive double. Both stand as absolute symbols of Brazilian goalscoring flair.";
    } else {
      verdictStr = `A high-intensity comparison between two masters of different eras. ${defaultA.name}'s legendary legacy, marked by ${defaultA.hallOfAchievements[0]}, collides with ${defaultB.name}'s supreme contribution of $^{defaultB.hallOfAchievements[0]}. Both encapsulate the beautiful game's majestic evolution.`;
    }

    return {
      legendA: defaultA,
      legendB: defaultB,
      statsA,
      statsB,
      verdict: verdictStr,
    };
  }, [compareLegendA, compareLegendB]);

  // Compute stats comparison data for Nation A vs Nation B
  const nationsComparison = useMemo(() => {
    const defaultA =
      nationsData.find((n) => n.id === compareNationA) || nationsData[0];
    const defaultB =
      nationsData.find((n) => n.id === compareNationB) || nationsData[1];

    let verdictStr = "";
    if (defaultA.id === "brazil" && defaultB.id === "argentina") {
      verdictStr =
        "THE SUPERCLÁSICO DE LAS AMÉRICAS. A historic rivalry of continental masters. Brazil's five-star samba heritage emphasizes joyful, beach-honed collective flair. Argentina's three-star legacy, forged in intense Buenos Aires streets, combines clinical street grit (el potrero) and sheer tactical artistry. The ultimate ideological duel.";
    } else {
      verdictStr = `An elite matchup between ${defaultA.name} and ${defaultB.name}. ${defaultA.name} carries a rich historical legacy in Europe and South America, highlighted by ${defaultA.titlesCount} titles. ${defaultB.name}, with ${defaultB.titlesCount} titles, brings tactical flexibility and historic structural benchmarks.`;
    }

    return {
      nationA: defaultA,
      nationB: defaultB,
      verdict: verdictStr,
    };
  }, [compareNationA, compareNationB]);

  // Handle Quiz answer submission
  const handleAnswerSubmit = (option: string) => {
    if (hasSubmitted) return;
    setSelectedOpt(option);
    setHasSubmitted(true);

    const question = quizQuestions[currentIdx];
    if (option === question.correctAnswer) {
      setScore((prev) => prev + 1);
      setEarnedXPInSession((prev) => prev + 50);
      gainXP(50);
    } else {
      setEarnedXPInSession((prev) => prev + 10); // partial participation award
      gainXP(10);
    }
  };

  // Move to next quiz question
  const handleNextQuestion = () => {
    setSelectedOpt(null);
    setHasSubmitted(false);

    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      // Perfect score stamp unlock
      if (
        score +
          (selectedOpt === quizQuestions[currentIdx].correctAnswer ? 1 : 0) ===
        quizQuestions.length
      ) {
        unlockStamp("trivia_adept");
      }
    }
  };

  const setQuizFinished = (finished: boolean) => {
    setQuizActive(!finished);
    if (finished) {
      // Completed state
    }
  };

  const startNewQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setHasSubmitted(false);
    setScore(0);
    setEarnedXPInSession(0);
    setQuizActive(true);
  };

  const triggerCompareLabUnlock = () => {
    unlockStamp("curator_license");
  };

  // Reset progress clear function
  const resetVaultProgress = () => {
    if (
      confirm(
        "Are you sure you want to reset your Archive Explorer progression? This will clear your XP, unlocked stamps, and recently viewed contents.",
      )
    ) {
      setXp(100);
      setUnlockedStamps(["centrifuge"]);
      setRecentVisits([]);
      setFavorites([]);

      try {
        localStorage.setItem("wc_command_xp", "100");
        localStorage.setItem(
          "wc_command_stamps",
          JSON.stringify(["centrifuge"]),
        );
        localStorage.setItem("wc_command_recent_visits", JSON.stringify([]));
        localStorage.setItem("wc_command_favorites", JSON.stringify([]));
      } catch (e) {
        console.error(e);
      }

      alert("Archive progression reset successfully.");
    }
  };

  return (
    <>
      {/* FLOATING ACTION ENTRY TRIGGER BUTTON */}
      <motion.button
        id="archive-command-center-trigger-button"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[480] bg-[#0c0c0c] border border-[#D4AF37]/35 rounded-full p-4 md:p-5 shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] cursor-pointer group flex items-center gap-3 transition-all duration-300 backdrop-blur-sm hover:border-[#D4AF37]"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Archive Command Center"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]"></span>
        </span>
        <Compass className="w-5 h-5 text-[#D4AF37] group-hover:rotate-45 transition-transform duration-500 ease-out" />
        <span className="font-mono text-xs text-[#F5F2EA] tracking-wider uppercase font-medium max-w-0 overflow-hidden group-hover:max-w-[140px] transition-all duration-300 ease-out whitespace-nowrap">
          Command Center
        </span>
      </motion.button>

      {/* PERSISTENT FULL-BLEED OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="archive-command-center-overlay"
            ref={overlayRef}
            className="fixed inset-0 z-[600] bg-[#060606]/98 backdrop-blur-md overflow-hidden flex flex-col focus:outline-none"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            {/* AMBIENT GLOW LINES */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.06),transparent_60%)] pointer-events-none" />
            <div className="absolute top-[80px] left-0 right-0 h-[1px] bg-[#D4AF37]/10" />

            {/* MASTER COMMAND CENTER HEADER */}
            <div className="px-6 md:px-12 py-5 flex items-center justify-between z-10 select-none">
              <div className="flex items-center gap-3">
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-2.5 rounded-sm">
                  <Compass className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] opacity-80">
                      Museum Control Room
                    </span>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  </div>
                  <h1 className="font-serif text-[#F5F2EA] text-xl tracking-[0.15em] uppercase font-bold leading-none">
                    ARCHIVE COMMAND CENTER
                  </h1>
                </div>
              </div>

              {/* TABS SELECTOR */}
              <div className="hidden lg:flex items-center bg-[#111111] border border-white/5 p-1 rounded-[3px] gap-1 font-mono text-[10px] tracking-wider uppercase">
                <button
                  className={`px-4 py-1.5 rounded-[2px] transition-all cursor-pointer ${activeTab === "directory" ? "bg-[#D4AF37] text-[#050505] font-semibold" : "text-[#69707A] hover:text-[#F5F2EA]"}`}
                  onClick={() => setActiveTab("directory")}
                >
                  🗺️ Index Directory
                </button>
                <button
                  className={`px-4 py-1.5 rounded-[2px] transition-all cursor-pointer ${activeTab === "compare" ? "bg-[#D4AF37] text-[#050505] font-semibold" : "text-[#69707A] hover:text-[#F5F2EA]"}`}
                  onClick={() => {
                    setActiveTab("compare");
                    triggerCompareLabUnlock();
                  }}
                >
                  ⚔️ Comparison Lab
                </button>
                <button
                  className={`px-4 py-1.5 rounded-[2px] transition-all cursor-pointer ${activeTab === "quiz" ? "bg-[#D4AF37] text-[#050505] font-semibold" : "text-[#69707A] hover:text-[#F5F2EA]"}`}
                  onClick={() => setActiveTab("quiz")}
                >
                  🏅 Quiz Arena
                </button>
                <button
                  className={`px-4 py-1.5 rounded-[2px] transition-all cursor-pointer ${activeTab === "profile" ? "bg-[#D4AF37] text-[#050505] font-semibold" : "text-[#69707A] hover:text-[#F5F2EA]"}`}
                  onClick={() => setActiveTab("profile")}
                >
                  🛡️ Profile Passport
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline font-mono text-[9px] text-[#69707A] uppercase tracking-widest bg-white/5 px-2.5 py-1 border border-white/5 rounded-none">
                  ESC / CLOSE
                </span>
                <button
                  className="bg-white/5 hover:bg-[#D4AF37]/10 text-[#69707A] hover:text-[#D4AF37] border border-white/10 hover:border-[#D4AF37]/50 p-2.5 rounded-sm transition-all cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* MOBILE ONLY BOTTOM NAVIGATION BAR */}
            <div className="lg:hidden flex items-center bg-[#111111] border-b border-white/5 p-2 gap-1 font-mono text-[9px] tracking-wider uppercase justify-around z-10 select-none">
              <button
                className={`flex-1 py-2 text-center rounded-[2px] ${activeTab === "directory" ? "bg-[#D4AF37] text-[#050505] font-semibold" : "text-[#69707A]"}`}
                onClick={() => setActiveTab("directory")}
              >
                🗺️ Index
              </button>
              <button
                className={`flex-1 py-2 text-center rounded-[2px] ${activeTab === "compare" ? "bg-[#D4AF37] text-[#050505] font-semibold" : "text-[#69707A]"}`}
                onClick={() => {
                  setActiveTab("compare");
                  triggerCompareLabUnlock();
                }}
              >
                ⚔️ Compare
              </button>
              <button
                className={`flex-1 py-2 text-center rounded-[2px] ${activeTab === "quiz" ? "bg-[#D4AF37] text-[#050505] font-semibold" : "text-[#69707A]"}`}
                onClick={() => setActiveTab("quiz")}
              >
                🏅 Quiz
              </button>
              <button
                className={`flex-1 py-2 text-center rounded-[2px] ${activeTab === "profile" ? "bg-[#D4AF37] text-[#050505] font-semibold" : "text-[#69707A]"}`}
                onClick={() => setActiveTab("profile")}
              >
                🛡️ Passport
              </button>
            </div>

            {/* MAIN CONTAINER LAYOUT */}
            <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8 z-10 flex flex-col lg:grid lg:grid-cols-12 gap-8">
              {/* LEFT COLUMN: ARCHIVE TELEMETRY AND PERSONAL PASSPORT STATUS (4 COLS) */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* 1. EXPLORER PROFILE PROGRESS CARD */}
                <div className="bg-[#0b0b0b] border border-[#4E5661]/15 p-5 relative overflow-hidden shadow-lg select-none">
                  {/* Subtle Background Mark */}
                  <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.02] text-[#D4AF37]">
                    <Trophy className="w-40 h-40" />
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/45 rounded-sm flex items-center justify-center text-xl">
                        🎖️
                      </div>
                      <div className="absolute bottom-[-4px] right-[-4px] bg-[#D4AF37] text-[#050505] font-mono text-[9px] font-bold px-1 items-center justify-center leading-normal">
                        Lvl {profileDetails.level}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-sans font-semibold text-sm tracking-wide text-[#F5F2EA] truncate">
                          {profileDetails.title}
                        </span>
                      </div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-[#69707A]">
                        World Cup Vault Explorer
                      </p>

                      {/* XP Bar */}
                      <div className="mt-3">
                        <div className="flex justify-between font-mono text-[9px] text-[#AFA58D] mb-1">
                          <span>Archive XP: {xp} PTS</span>
                          <span>Next Level</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#ca9d25] to-[#D4AF37] transition-all duration-500 ease-out"
                            style={{ width: `${profileDetails.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. CONTINUE YOUR JOURNEY (SMART SHORTCUT STATE) */}
                <div className="bg-[#0b0b0b] border border-[#4E5661]/15 p-6 rounded-none shadow-lg">
                  <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <h3 className="font-serif text-[#F5F2EA] text-xs uppercase tracking-[0.2em] font-semibold">
                      Continue Your Journey
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2.5">
                    {/* Last Tournament */}
                    <button
                      className="bg-[#121212] hover:bg-[#1a1a1a] border border-white/5 p-3 rounded-none text-left flex items-center justify-between transition-all group cursor-pointer"
                      onClick={() =>
                        handleItemNavigation(
                          "tournament",
                          lastStateCurations.tournament.id,
                          lastStateCurations.tournament.label,
                        )
                      }
                    >
                      <div className="min-w-0">
                        <span className="block font-mono text-[8px] uppercase tracking-wider text-[#69707A] mb-0.5">
                          Last Explored Year
                        </span>
                        <span className="font-sans text-xs text-[#AFA58D] font-medium group-hover:text-white transition-all truncate block">
                          {lastStateCurations.tournament.label}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#D4AF37] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                    </button>

                    {/* Last Legend */}
                    <button
                      className="bg-[#121212] hover:bg-[#1a1a1a] border border-white/5 p-3 rounded-none text-left flex items-center justify-between transition-all group cursor-pointer"
                      onClick={() =>
                        handleItemNavigation(
                          "legend",
                          lastStateCurations.legend.id,
                          lastStateCurations.legend.label,
                        )
                      }
                    >
                      <div className="min-w-0">
                        <span className="block font-mono text-[8px] uppercase tracking-wider text-[#69707A] mb-0.5">
                          Last Legend Opened
                        </span>
                        <span className="font-sans text-xs text-[#AFA58D] font-medium group-hover:text-white transition-all truncate block">
                          {lastStateCurations.legend.label}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#D4AF37] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                    </button>

                    {/* Last Nation */}
                    <button
                      className="bg-[#121212] hover:bg-[#1a1a1a] border border-white/5 p-3 rounded-none text-left flex items-center justify-between transition-all group cursor-pointer"
                      onClick={() =>
                        handleItemNavigation(
                          "nation",
                          lastStateCurations.nation.id,
                          lastStateCurations.nation.label,
                        )
                      }
                    >
                      <div className="min-w-0">
                        <span className="block font-mono text-[8px] uppercase tracking-wider text-[#69707A] mb-0.5">
                          Last Nation Searched
                        </span>
                        <span className="font-sans text-xs text-[#AFA58D] font-medium group-hover:text-white transition-all truncate block">
                          {lastStateCurations.nation.label}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#D4AF37] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                    </button>

                    {/* Last Stadium */}
                    <button
                      className="bg-[#121212] hover:bg-[#1a1a1a] border border-white/5 p-3 rounded-none text-left flex items-center justify-between transition-all group cursor-pointer"
                      onClick={() =>
                        handleItemNavigation(
                          "stadium",
                          lastStateCurations.stadium.id,
                          lastStateCurations.stadium.label,
                        )
                      }
                    >
                      <div className="min-w-0">
                        <span className="block font-mono text-[8px] uppercase tracking-wider text-[#69707A] mb-0.5">
                          Last Stadium Visited
                        </span>
                        <span className="font-sans text-xs text-[#AFA58D] font-medium group-hover:text-white transition-all truncate block">
                          {lastStateCurations.stadium.label}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#D4AF37] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                    </button>
                  </div>
                </div>

                {/* 3. SAVED COLLECTIONS (FAVORITES) */}
                <div className="bg-[#0b0b0b] border border-[#4E5661]/15 p-6 rounded-none shadow-lg">
                  <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2.5">
                    <Bookmark className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <h3 className="font-serif text-[#F5F2EA] text-xs uppercase tracking-[0.2em] font-semibold">
                      Saved Collections
                    </h3>
                  </div>

                  {favorites.length === 0 ? (
                    <div className="bg-[#121212]/50 border border-dashed border-[#4E5661]/10 px-4 py-8 rounded-none text-center">
                      <Bookmark className="w-5 h-5 mx-auto text-[#69707A]/40 mb-2" />
                      <p className="font-sans text-xs text-[#69707A] leading-normal">
                        No bookmarked archives yet.
                        <br />
                        Tap stars on search cards to pin elements here.
                      </p>
                    </div>
                  ) : (
                    <div className="max-h-[140px] overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-white/10 pr-1 select-none">
                      {favorites.map((fav, i) => (
                        <div
                          key={i}
                          className="bg-[#121212] border border-white/5 p-2 px-3 flex items-center justify-between gap-2.5 relative group hover:border-[#D4AF37]/20 transition-all cursor-pointer"
                          onClick={() =>
                            handleItemNavigation(fav.type, fav.id, fav.label)
                          }
                        >
                          <div className="min-w-0 flex-1">
                            <span className="font-mono text-[7px] uppercase tracking-wider text-[#69707A] block">
                              {fav.type}
                            </span>
                            <span className="font-sans text-xs text-[#AFA58D] font-medium truncate block leading-tight group-hover:text-white transition-all">
                              {fav.label}
                            </span>
                          </div>
                          <button
                            className="text-[#D4AF37]/60 hover:text-red-400 p-1 transition-colors cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(fav.type, fav.id, fav.label);
                            }}
                            title="Remove pin"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT TABS DYNAMIC AREA (8 COLS) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* TAB 1: INDEX DIRECTORY & SEARCH */}
                {activeTab === "directory" && (
                  <div className="flex flex-col gap-6">
                    {/* SEARCH CHOP */}
                    <div className="bg-[#0b0b0b] border border-[#D4AF37]/20 p-5 rounded-none shadow-xl relative">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 relative text-[#D4AF37] pointer-events-none" />
                        <input
                          id="command-center-search-input"
                          ref={searchInputRef}
                          type="text"
                          className="w-full bg-[#121212] border border-[#4E5661]/15 focus:border-[#D4AF37]/50 p-4 pl-12 rounded-none text-sm text-[#F5F2EA] tracking-wide placeholder-[#69707A] focus:outline-none transition-all font-sans"
                          placeholder="Search the archive (e.g. 1970, Pelé, Maracanã, Argentina)..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                          <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#69707A] hover:text-white cursor-pointer"
                            onClick={() => setSearchQuery("")}
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      {/* SEARCH RESULTS OVERLAY INJECT */}
                      {searchQuery && (
                        <div className="absolute left-0 right-0 top-full mt-2 bg-[#090909] border border-[#D4AF37]/35 shadow-2.5xl max-h-[300px] overflow-y-auto z-[200] divide-y divide-white/[0.03] select-none">
                          {filteredSearchItems.length === 0 ? (
                            <div className="p-6 text-center text-[#69707A] text-xs">
                              No historic entries found matching and cataloged
                              under "{searchQuery}".
                            </div>
                          ) : (
                            filteredSearchItems.map((item, idx) => (
                              <div
                                key={idx}
                                className="p-3.5 px-6 hover:bg-[#D4AF37]/5 flex items-center justify-between transition-colors cursor-pointer group"
                                onClick={() =>
                                  handleItemNavigation(
                                    item.type,
                                    item.id,
                                    item.label,
                                  )
                                }
                              >
                                <div className="min-w-0 pr-4">
                                  <div className="flex items-center gap-2 mb-0.5">
                                    <span className="font-mono text-[8px] uppercase tracking-widest bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-none leading-none font-semibold">
                                      {item.type}
                                    </span>
                                    <span className="font-mono text-[9px] text-[#69707A]">
                                      #{item.id}
                                    </span>
                                  </div>
                                  <h4 className="font-serif text-[#F5F2EA] text-sm group-hover:text-[#D4AF37] transition-all leading-snug truncate whitespace-nowrap">
                                    {item.title}
                                  </h4>
                                  <p className="font-sans text-xs text-[#AFA58D]/70 truncate max-w-lg leading-normal block">
                                    {item.subtitle}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button
                                    className="p-2 bg-[#121212] hover:bg-[#D4AF37]/10 text-[#69707A] hover:text-[#D4AF37] border border-white/5 transition-all cursor-pointer"
                                    onClick={(e) =>
                                      toggleFavorite(
                                        item.type,
                                        item.id,
                                        item.label,
                                        e,
                                      )
                                    }
                                    title={
                                      isFavorited(item.type, item.id)
                                        ? "Remove Bookmark"
                                        : "Bookmark Entry"
                                    }
                                  >
                                    <Star
                                      className={`w-3.5 h-3.5 ${isFavorited(item.type, item.id) ? "fill-[#D4AF37] text-[#D4AF37]" : ""}`}
                                    />
                                  </button>
                                  <ChevronRight className="w-4 h-4 text-[#69707A] group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>

                    {/* DIRECTORY BOX GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
                      {/* SUB-SECTION 1: EXPLORE SYSTEMS */}
                      <div className="bg-[#0b0b0b] border border-[#4E5661]/15 p-5 rounded-none flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 font-serif text-[#F5F2EA] text-xs font-semibold tracking-wider uppercase mb-3 text-[#D4AF37] border-b border-[#D4AF37]/10 pb-2">
                            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                            EXPLORE HISTORY
                          </div>
                          <p className="font-sans text-xs text-[#AFA58D] leading-relaxed mb-4">
                            Step into large historical chronicles and geographic
                            representations mapping the triumphs of the
                            beautiful game.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <button
                            className="w-full text-left bg-[#121212] hover:bg-[#D4AF37]/5 border border-white/5 p-3 rounded-none flex items-center justify-between group transition-all cursor-pointer"
                            onClick={() => {
                              onExploreHistory();
                              setIsOpen(false);
                            }}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-sm">🧭</span>
                              <span className="font-sans text-xs text-[#F5F2EA] hover:text-white transition-all font-medium">
                                History Journey
                              </span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-[#F5F2EA]/40 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
                          </button>

                          <button
                            className="w-full text-left bg-[#121212] hover:bg-[#D4AF37]/5 border border-white/5 p-3 rounded-none flex items-center justify-between group transition-all cursor-pointer"
                            onClick={() => {
                              onExploreHistory();
                              setIsOpen(false);
                            }} // mapped to time machine
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-sm">⏳</span>
                              <span className="font-sans text-xs text-[#F5F2EA] hover:text-white transition-all font-medium">
                                World Cup Time Machine
                              </span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-[#F5F2EA]/40 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
                          </button>

                          <button
                            className="w-full text-left bg-[#121212] hover:bg-[#D4AF37]/5 border border-white/5 p-3 rounded-none flex items-center justify-between group transition-all cursor-pointer"
                            onClick={() => {
                              onExploreAtlas();
                              setIsOpen(false);
                            }}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-sm">🗺️</span>
                              <span className="font-sans text-xs text-[#F5F2EA] hover:text-white transition-all font-medium">
                                Football Atlas Explorer
                              </span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-[#F5F2EA]/40 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
                          </button>
                        </div>
                      </div>

                      {/* SUB-SECTION 2: ARCHIVE SYSTEMS */}
                      <div className="bg-[#0b0b0b] border border-[#4E5661]/15 p-5 rounded-none flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 font-serif text-[#F5F2EA] text-xs font-semibold tracking-wider uppercase mb-3 text-[#D4AF37] border-b border-[#D4AF37]/10 pb-2">
                            <Database className="w-3.5 h-3.5 text-[#D4AF37]" />
                            THE VAULTS
                          </div>
                          <p className="font-sans text-xs text-[#AFA58D] leading-relaxed mb-4">
                            Direct queries into curated collections cataloged by
                            stadiums, historic matches, and legendary
                            individuals.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => {
                              onExploreLegends();
                              setIsOpen(false);
                            }}
                            className="bg-[#121212] hover:bg-[#D4AF37]/5 border border-white/5 p-2 rounded-none text-center block transition-all text-[11px] font-medium text-[#AFA58D] hover:text-white cursor-pointer"
                          >
                            👤 Legends Vault
                          </button>
                          <button
                            onClick={() => {
                              onExploreNations();
                              setIsOpen(false);
                            }}
                            className="bg-[#121212] hover:bg-[#D4AF37]/5 border border-white/5 p-2 rounded-none text-center block transition-all text-[11px] font-medium text-[#AFA58D] hover:text-white cursor-pointer"
                          >
                            🏳️ Nations Vault
                          </button>
                          <button
                            onClick={() => {
                              onExploreMatches();
                              setIsOpen(false);
                            }}
                            className="bg-[#121212] hover:bg-[#D4AF37]/5 border border-white/5 p-2 rounded-none text-center block transition-all text-[11px] font-medium text-[#AFA58D] hover:text-white cursor-pointer"
                          >
                            ⚽ Matches Vault
                          </button>
                          <button
                            onClick={() => {
                              onExploreStadiums();
                              setIsOpen(false);
                            }}
                            className="bg-[#121212] hover:bg-[#D4AF37]/5 border border-white/5 p-2 rounded-none text-center block transition-all text-[11px] font-medium text-[#AFA58D] hover:text-white cursor-pointer"
                          >
                            🏟️ Stadiums Vault
                          </button>
                          <button
                            onClick={() => {
                              onExploreRecords();
                              setIsOpen(false);
                            }}
                            className="bg-[#121212] hover:bg-[#D4AF37]/5 border border-white/5 p-2 rounded-none text-center block transition-all text-[11px] font-medium text-[#AFA58D] hover:text-white cursor-pointer col-span-2"
                          >
                            🏅 Records Vault
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* SMART SUGGESTED DISCOVERIES (RECOMMENDED JOURNEYS) */}
                    <div className="bg-[#0b0b0b] border border-[#4E5661]/15 p-5 shadow-lg select-none">
                      <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <h4 className="font-serif text-[#F5F2EA] text-xs uppercase tracking-[0.2em] font-semibold">
                          Recommended Discovery Paths
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                        {recommendedJourneys.map((rec, idx) => (
                          <div
                            key={idx}
                            className="bg-[#121212] hover:bg-[#D4AF37]/5 border border-white/5 p-3 flex flex-col justify-between transition-all group cursor-pointer"
                            onClick={() =>
                              handleItemNavigation(rec.type, rec.id, rec.label)
                            }
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-mono text-[7px] uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 py-0.5 leading-none">
                                  Suggested
                                </span>
                                <span className="text-xs">{rec.icon}</span>
                              </div>
                              <h5 className="font-serif text-[#F5F2EA] text-xs font-semibold group-hover:text-[#D4AF37] transition-all leading-snug">
                                {rec.label}
                              </h5>
                              <p className="font-sans text-[10px] text-[#69707A] leading-normal mt-1">
                                {rec.desc}
                              </p>
                            </div>
                            <div className="mt-3.5 flex items-center justify-end">
                              <span className="font-mono text-[8px] uppercase tracking-wider text-[#D4AF37] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                                Explore <ArrowRight className="w-2.5 h-2.5" />
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* TOURNAMENT INSTANT SELECTOR */}
                    <div className="bg-[#0b0b0b] border border-[#4E5661]/15 p-5 shadow-lg select-none">
                      <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                        <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <h4 className="font-serif text-[#F5F2EA] text-xs uppercase tracking-[0.2em] font-semibold">
                          Instant Tournament Selector
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 pr-1 select-none">
                        {tournaments
                          .slice()
                          .reverse()
                          .map((t) => (
                            <button
                              key={t.year}
                              onClick={() =>
                                handleItemNavigation(
                                  "tournament",
                                  t.year,
                                  `${t.year} World Cup`,
                                )
                              }
                              className="bg-[#121212] hover:bg-[#D4AF37] border border-white/5 hover:border-transparent px-3 py-1.5 rounded-none text-center font-mono text-[10px] tracking-wider text-[#AFA58D] hover:text-[#050505] transition-all duration-150 font-medium cursor-pointer"
                            >
                              {t.year}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: COMPARISON LAB */}
                {activeTab === "compare" && (
                  <div className="bg-[#0b0b0b] border border-[#4E5661]/15 p-6 rounded-none shadow-xl flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 select-none">
                      <div>
                        <h3 className="font-serif text-[#F5F2EA] text-base uppercase tracking-widest font-bold">
                          ⚔️ COMPARISON LAB
                        </h3>
                        <p className="font-sans text-xs text-[#69707A] leading-normal mt-0.5">
                          Calculate dual stats and simulated clashes between
                          historical icons.
                        </p>
                      </div>

                      {/* Type Toggle Slider */}
                      <div className="flex items-center bg-[#111111] border border-white/5 p-1 rounded-[3px] mt-3 sm:mt-0 font-mono text-[9px] tracking-wider uppercase select-none">
                        <button
                          className={`px-3 py-1 rounded-[2px] transition-all cursor-pointer ${compareType === "legend" ? "bg-[#D4AF37] text-[#050505] font-semibold" : "text-[#69707A]"}`}
                          onClick={() => setCompareType("legend")}
                        >
                          Legends Duel
                        </button>
                        <button
                          className={`px-3 py-1 rounded-[2px] transition-all cursor-pointer ${compareType === "nation" ? "bg-[#D4AF37] text-[#050505] font-semibold" : "text-[#69707A]"}`}
                          onClick={() => setCompareType("nation")}
                        >
                          Nations Duel
                        </button>
                      </div>
                    </div>

                    {/* SELECTORS GRID */}
                    {compareType === "legend" ? (
                      <div className="grid grid-cols-2 gap-4 select-none">
                        {/* Selector Legend A */}
                        <div className="flex flex-col">
                          <label className="font-mono text-[9px] uppercase tracking-widest text-[#69707A] mb-1.5">
                            LEGEND INDEX A
                          </label>
                          <select
                            className="bg-[#121212] border border-[#4E5661]/15 focus:border-[#D4AF37]/50 p-2.5 rounded-none text-xs text-[#F5F2EA]"
                            value={compareLegendA}
                            onChange={(e) => {
                              setCompareLegendA(e.target.value);
                              if (e.target.value === compareLegendB) {
                                // set to other
                                setCompareLegendB(
                                  legends.find((l) => l.id !== e.target.value)
                                    ?.id || "maradona",
                                );
                              }
                            }}
                          >
                            {legends.map((l) => (
                              <option key={l.id} value={l.id}>
                                {l.name} ({l.nation})
                              </option>
                            ))}
                          </select>
                        </div>
                        {/* Selector Legend B */}
                        <div className="flex flex-col">
                          <label className="font-mono text-[9px] uppercase tracking-widest text-[#69707A] mb-1.5">
                            LEGEND INDEX B
                          </label>
                          <select
                            className="bg-[#121212] border border-[#4E5661]/15 focus:border-[#D4AF37]/50 p-2.5 rounded-none text-xs text-[#F5F2EA]"
                            value={compareLegendB}
                            onChange={(e) => {
                              setCompareLegendB(e.target.value);
                              if (e.target.value === compareLegendA) {
                                setCompareLegendA(
                                  legends.find((l) => l.id !== e.target.value)
                                    ?.id || "pele",
                                );
                              }
                            }}
                          >
                            {legends.map((l) => (
                              <option key={l.id} value={l.id}>
                                {l.name} ({l.nation})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 select-none">
                        {/* Selector Nation A */}
                        <div className="flex flex-col">
                          <label className="font-mono text-[9px] uppercase tracking-widest text-[#69707A] mb-1.5">
                            NATION CIVILIZATION A
                          </label>
                          <select
                            className="bg-[#121212] border border-[#4E5661]/15 focus:border-[#D4AF37]/50 p-2.5 rounded-none text-xs text-[#F5F2EA]"
                            value={compareNationA}
                            onChange={(e) => {
                              setCompareNationA(e.target.value);
                              if (e.target.value === compareNationB) {
                                setCompareNationB(
                                  nationsData.find(
                                    (n) => n.id !== e.target.value,
                                  )?.id || "brazil",
                                );
                              }
                            }}
                          >
                            {nationsData.map((n) => (
                              <option key={n.id} value={n.id}>
                                {n.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        {/* Selector Nation B */}
                        <div className="flex flex-col">
                          <label className="font-mono text-[9px] uppercase tracking-widest text-[#69707A] mb-1.5">
                            NATION CIVILIZATION B
                          </label>
                          <select
                            className="bg-[#121212] border border-[#4E5661]/15 focus:border-[#D4AF37]/50 p-2.5 rounded-none text-xs text-[#F5F2EA]"
                            value={compareNationB}
                            onChange={(e) => {
                              setCompareNationB(e.target.value);
                              if (e.target.value === compareNationA) {
                                setCompareNationA(
                                  nationsData.find(
                                    (n) => n.id !== e.target.value,
                                  )?.id || "argentina",
                                );
                              }
                            }}
                          >
                            {nationsData.map((n) => (
                              <option key={n.id} value={n.id}>
                                {n.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {/* COMPARISON CHART RESULTS */}
                    {compareType === "legend" ? (
                      <div className="flex flex-col gap-6">
                        {/* H2H Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
                          <div className="bg-[#121212] border border-[#4E5661]/10 p-5 rounded-none flex items-start gap-4">
                            <VerifiedImage
                              src={legendsComparison.legendA.image}
                              alt={legendsComparison.legendA.name}
                              className="w-14 h-14 shrink-0"
                              aspectRatio="1:1"
                              tournament={legendsComparison.legendA.nation}
                              date="H2H Profile"
                              context={legendsComparison.legendA.legacyStatement}
                              eraStyle={legendsComparison.legendA.eraStyle || "vintage"}
                            />
                            <div>
                              <span className="font-mono text-[8px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 leading-none">
                                DEITY A
                              </span>
                              <h4 className="font-serif text-[#F5F2EA] text-sm font-semibold truncate leading-snug mt-1">
                                {legendsComparison.legendA.name}
                              </h4>
                              <p className="font-mono text-[9px] text-[#AFA58D]">
                                {legendsComparison.legendA.nation}
                              </p>
                              <p className="font-sans text-[10px] italic text-[#69707A] mt-2 block line-clamp-2">
                                "{legendsComparison.legendA.quote}"
                              </p>
                            </div>
                          </div>

                          <div className="bg-[#121212] border border-[#4E5661]/10 p-5 rounded-none flex items-start gap-4">
                            <VerifiedImage
                              src={legendsComparison.legendB.image}
                              alt={legendsComparison.legendB.name}
                              className="w-14 h-14 shrink-0"
                              aspectRatio="1:1"
                              tournament={legendsComparison.legendB.nation}
                              date="H2H Profile"
                              context={legendsComparison.legendB.legacyStatement}
                              eraStyle={legendsComparison.legendB.eraStyle || "vintage"}
                            />
                            <div>
                              <span className="font-mono text-[8px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 leading-none">
                                DEITY B
                              </span>
                              <h4 className="font-serif text-[#F5F2EA] text-sm font-semibold truncate leading-snug mt-1">
                                {legendsComparison.legendB.name}
                              </h4>
                              <p className="font-mono text-[9px] text-[#AFA58D]">
                                {legendsComparison.legendB.nation}
                              </p>
                              <p className="font-sans text-[10px] italic text-[#69707A] mt-2 block line-clamp-2">
                                "{legendsComparison.legendB.quote}"
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Stats Battle Row */}
                        <div className="bg-[#121212] border border-white/5 p-4 rounded-none select-none">
                          <h4 className="font-mono text-[9px] tracking-widest text-[#69707A] uppercase border-b border-white/5 pb-2 mb-3.5 text-center">
                            HISTORICAL BENCHMARK MATRIX
                          </h4>

                          <div className="space-y-3.5">
                            {/* World Cup Titles Comparison */}
                            <div>
                              <div className="flex justify-between text-xs font-mono mb-1">
                                <span className="text-[#AFA58D]">
                                  {legendsComparison.statsA.titles} Titles
                                </span>
                                <span className="uppercase tracking-wider text-xs font-serif font-bold text-[#F5F2EA] py-0.5">
                                  WORLD CUP CHAMPIONSHIPS
                                </span>
                                <span className="text-[#AFA58D]">
                                  {legendsComparison.statsB.titles} Titles
                                </span>
                              </div>
                              <div className="w-full flex h-2.5 bg-[#1a1a1a] gap-0.5 rounded-none overflow-hidden">
                                <div
                                  className="h-full bg-[#D4AF37] transition-all duration-300"
                                  style={{
                                    width: `${(legendsComparison.statsA.titles / (legendsComparison.statsA.titles + legendsComparison.statsB.titles || 1)) * 100}%`,
                                  }}
                                />
                                <div
                                  className="h-full bg-[#AFA58D]/40 transition-all duration-300"
                                  style={{
                                    width: `${(legendsComparison.statsB.titles / (legendsComparison.statsA.titles + legendsComparison.statsB.titles || 1)) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>

                            {/* World Cup Goals */}
                            <div>
                              <div className="flex justify-between text-xs font-mono mb-1">
                                <span className="text-[#AFA58D]">
                                  {legendsComparison.statsA.goals} Goals
                                </span>
                                <span className="uppercase tracking-wider text-xs font-serif font-bold text-[#F5F2EA] py-0.5">
                                  TOURNAMENT GOALS REGISTERED
                                </span>
                                <span className="text-[#AFA58D]">
                                  {legendsComparison.statsB.goals} Goals
                                </span>
                              </div>
                              <div className="w-full flex h-2.5 bg-[#1a1a1a] gap-0.5 rounded-none overflow-hidden">
                                <div
                                  className="h-full bg-[#D4AF37] transition-all duration-300"
                                  style={{
                                    width: `${(legendsComparison.statsA.goals / (legendsComparison.statsA.goals + legendsComparison.statsB.goals || 1)) * 100}%`,
                                  }}
                                />
                                <div
                                  className="h-full bg-[#AFA58D]/40 transition-all duration-300"
                                  style={{
                                    width: `${(legendsComparison.statsB.goals / (legendsComparison.statsA.goals + legendsComparison.statsB.goals || 1)) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>

                            {/* Legacy Rating Gauge */}
                            <div>
                              <div className="flex justify-between text-xs font-mono mb-1">
                                <span className="text-[#AFA58D]">
                                  Rating {legendsComparison.statsA.rating}
                                </span>
                                <span className="uppercase tracking-wider text-xs font-serif font-bold text-[#F5F2EA] py-0.5">
                                  LEGACY RATING INDEX
                                </span>
                                <span className="text-[#AFA58D]">
                                  Rating {legendsComparison.statsB.rating}
                                </span>
                              </div>
                              <div className="w-full flex h-2.5 bg-[#1a1a1a] gap-0.5 rounded-none overflow-hidden">
                                <div
                                  className="h-full bg-[#D4AF37] transition-all duration-300"
                                  style={{
                                    width: `${(legendsComparison.statsA.rating / (legendsComparison.statsA.rating + legendsComparison.statsB.rating || 1)) * 100}%`,
                                  }}
                                />
                                <div
                                  className="h-full bg-[#AFA58D]/40 transition-all duration-300"
                                  style={{
                                    width: `${(legendsComparison.statsB.rating / (legendsComparison.statsA.rating + legendsComparison.statsB.rating || 1)) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Analytical Dynamic Synthesis Verdict */}
                        <div className="bg-[#121212] border-l-2 border-[#D4AF37] p-4 text-xs font-sans leading-relaxed text-[#AFA58D] select-none">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#D4AF37] block mb-1">
                            CURATORIAL ANALYSIS DUEL VERDICT:
                          </span>
                          {legendsComparison.verdict}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-6">
                        {/* H2H Nations Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
                          <div
                            className="border p-5 rounded-none flex flex-col justify-between"
                            style={{
                              backgroundColor: `${nationsComparison.nationA.bgColor || "#090909"}`,
                              borderColor: `${nationsComparison.nationA.themeColor || "#D4AF37"}1f`,
                            }}
                          >
                            <div>
                              <span
                                className="font-mono text-[8px] opacity-75 uppercase tracking-wider block"
                                style={{
                                  color: nationsComparison.nationA.accentColor,
                                }}
                              >
                                NATION CIVILIZATION A
                              </span>
                              <h4
                                className="font-serif text-lg font-bold tracking-wider leading-snug mt-1"
                                style={{
                                  color: nationsComparison.nationA.accentColor,
                                }}
                              >
                                {nationsComparison.nationA.name}
                              </h4>
                              <p className="font-sans text-xs italic opacity-85 mt-2 block">
                                "{nationsComparison.nationA.motto}"
                              </p>
                            </div>
                            <div className="flex gap-4 border-t border-white/5 pt-3 mt-4 text-xs font-mono">
                              <div>
                                🏆 {nationsComparison.nationA.titlesCount}{" "}
                                Titles
                              </div>
                              <div>
                                🗺️ {nationsComparison.nationA.continent}
                              </div>
                            </div>
                          </div>

                          <div
                            className="border p-5 rounded-none flex flex-col justify-between"
                            style={{
                              backgroundColor: `${nationsComparison.nationB.bgColor || "#090909"}`,
                              borderColor: `${nationsComparison.nationB.themeColor || "#D4AF37"}1f`,
                            }}
                          >
                            <div>
                              <span
                                className="font-mono text-[8px] opacity-75 uppercase tracking-wider block"
                                style={{
                                  color: nationsComparison.nationB.accentColor,
                                }}
                              >
                                NATION CIVILIZATION B
                              </span>
                              <h4
                                className="font-serif text-lg font-bold tracking-wider leading-snug mt-1"
                                style={{
                                  color: nationsComparison.nationB.accentColor,
                                }}
                              >
                                {nationsComparison.nationB.name}
                              </h4>
                              <p className="font-sans text-xs italic opacity-85 mt-2 block">
                                "{nationsComparison.nationB.motto}"
                              </p>
                            </div>
                            <div className="flex gap-4 border-t border-white/5 pt-3 mt-4 text-xs font-mono">
                              <div>
                                🏆 {nationsComparison.nationB.titlesCount}{" "}
                                Titles
                              </div>
                              <div>
                                🗺️ {nationsComparison.nationB.continent}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Dynamic Verdict */}
                        <div className="bg-[#121212] border-l-2 border-[#D4AF37] p-4 text-xs font-sans leading-relaxed text-[#AFA58D] select-none">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#D4AF37] block mb-1">
                            CURATORIAL SOUTH AMERICAN VS EUROPEAN CLASH REPORT:
                          </span>
                          {nationsComparison.verdict}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 3: QUIZ ARENA */}
                {activeTab === "quiz" && (
                  <div className="bg-[#0b0b0b] border border-[#4E5661]/15 p-6 rounded-none shadow-xl">
                    {!quizActive ? (
                      <div className="text-center py-12 select-none">
                        <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/35 rounded-full flex items-center justify-center mx-auto mb-5">
                          <Award className="w-8 h-8 text-[#D4AF37]" />
                        </div>
                        <h3 className="font-serif text-[#F5F2EA] text-xl tracking-wider uppercase font-bold mb-2">
                          🏅 TRIVIA VAULT ARENA
                        </h3>
                        <p className="font-sans text-xs text-[#AFA58D] max-w-md mx-auto leading-relaxed mb-8">
                          Validate your grasp of World Cup folklore, earn
                          substantial Archive XP, and claim the coveted 'Trivia
                          Medal' passport stamp.
                        </p>
                        <button
                          onClick={startNewQuiz}
                          className="px-6 py-3.5 bg-[#D4AF37] text-[#050505] font-mono text-xs tracking-wider uppercase font-semibold hover:bg-white transition-all cursor-pointer"
                        >
                          COMMENCE RAPID TRIVIA FIELD
                        </button>
                      </div>
                    ) : (
                      <div className="select-none">
                        {/* Quiz Header progress */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-3.5 mb-5 font-mono text-[10px] text-[#69707A] uppercase tracking-widest">
                          <span>
                            QUIZ PROGRESS: {currentIdx + 1} OF{" "}
                            {quizQuestions.length}
                          </span>
                          <span className="text-[#D4AF37]/80">
                            ACCUMULATED SCORE: {score} / {currentIdx}
                          </span>
                        </div>

                        {/* Question Panel */}
                        <div className="mb-6">
                          <span className="font-mono text-[9px] tracking-widest text-[#D4AF37] uppercase font-semibold">
                            QUESTION CHOP {currentIdx + 1}
                          </span>
                          <h4 className="font-serif text-[#F5F2EA] text-sm md:text-base font-bold leading-relaxed mt-1.5">
                            {quizQuestions[currentIdx].question}
                          </h4>
                        </div>

                        {/* Multiple Choice Blocks */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                          {quizQuestions[currentIdx].options.map(
                            (option, idx) => {
                              const isCorrectAnswer =
                                option ===
                                quizQuestions[currentIdx].correctAnswer;
                              const isChosen = option === selectedOpt;

                              return (
                                <button
                                  key={idx}
                                  disabled={hasSubmitted}
                                  onClick={() => handleAnswerSubmit(option)}
                                  className={`w-full p-4 text-left border rounded-none transition-all duration-200 cursor-pointer flex justify-between items-center text-xs font-sans ${
                                    hasSubmitted
                                      ? isCorrectAnswer
                                        ? "bg-emerald-900/25 border-emerald-500 text-emerald-400"
                                        : isChosen
                                          ? "bg-red-900/25 border-red-500 text-red-400"
                                          : "bg-[#121212] border-[#4E5661]/10 text-[#69707A]"
                                      : "bg-[#121212] border-[#4E5661]/10 hover:border-[#D4AF37]/50 text-[#AFA58D] hover:text-white"
                                  }`}
                                >
                                  <span>{option}</span>
                                  {hasSubmitted && isCorrectAnswer && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                  )}
                                  {hasSubmitted &&
                                    isChosen &&
                                    !isCorrectAnswer && (
                                      <AlertCircle className="w-4 h-4 text-red-400" />
                                    )}
                                </button>
                              );
                            },
                          )}
                        </div>

                        {/* Solution Feedback Box */}
                        {hasSubmitted && (
                          <div className="bg-[#121212] border border-white/5 p-4 rounded-none mb-6 animate-fade-in text-xs font-sans leading-relaxed text-[#AFA58D]">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[#D4AF37] block mb-1">
                              HISTORICAL ANALYSIS ECHO:
                            </span>
                            {quizQuestions[currentIdx].explanation}
                          </div>
                        )}

                        {/* Flow Control Button */}
                        {hasSubmitted && (
                          <div className="flex justify-end">
                            <button
                              onClick={handleNextQuestion}
                              className="px-5 py-3 bg-[#D4AF37]/15 hover:bg-[#D4AF37] hover:text-[#050505] text-[#D4AF37] font-mono text-xs uppercase tracking-wider font-semibold border border-[#D4AF37]/45 hover:border-transparent transition-all cursor-pointer"
                            >
                              {currentIdx + 1 === quizQuestions.length
                                ? "FINALIZE CHALLENGE"
                                : "NEXT HISTORIC FIELD →"}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 4: PROFILE PASSPORT (PASSPORT WITH STAMPS EXH) */}
                {activeTab === "profile" && (
                  <div className="bg-[#0b0b0b] border border-[#4E5661]/15 p-6 rounded-none shadow-xl flex flex-col gap-6">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4 select-none">
                      <div>
                        <h3 className="font-serif text-[#F5F2EA] text-base uppercase tracking-widest font-bold">
                          📜 ARCHIVE EXPLORER PASSPORT
                        </h3>
                        <p className="font-sans text-xs text-[#69707A] leading-normal mt-0.5">
                          Visually collect official custom stamps by exploring
                          vaults and solving trivia.
                        </p>
                      </div>
                      <button
                        className="font-mono text-[8.5px] uppercase tracking-wider text-red-400 hover:text-red-300 border border-red-500/10 hover:border-red-500/40 p-2.5 transition-colors cursor-pointer"
                        onClick={resetVaultProgress}
                      >
                        Reset Passport
                      </button>
                    </div>

                    {/* Passport Stamps Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 select-none">
                      {stampDefs.map((stamp, i) => (
                        <div
                          key={i}
                          className={`border p-4.5 text-center flex flex-col justify-between relative group rounded-none transition-all ${
                            stamp.unlocked
                              ? "bg-[#121212] border-[#D4AF37]/35 shadow-inner"
                              : "bg-[#121212]/30 border-[#4E5661]/5 opacity-40"
                          }`}
                        >
                          {/* Circle stamp vector mock */}
                          <div
                            className={`w-14 h-14 mx-auto rounded-full border-2 border-dashed flex items-center justify-center text-xl mb-3.5 transition-all group-hover:scale-105 duration-300 ${stamp.color}`}
                          >
                            {stamp.unlocked ? stamp.icon : "🔒"}
                          </div>

                          <div className="min-w-0">
                            <h4 className="font-serif text-[10px] tracking-widest uppercase text-[#F5F2EA] truncate font-bold leading-tight select-none">
                              {stamp.title}
                            </h4>
                            <p className="font-mono text-[8px] text-[#AFA58D] truncate select-none mt-1">
                              {stamp.subtitle}
                            </p>
                          </div>

                          <div className="absolute inset-0 bg-[#060606]/95 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-center text-[9px] text-[#69707A] font-sans leading-relaxed text-center pointer-events-none">
                            <span className="font-mono text-[8px] text-[#D4AF37] uppercase tracking-wider font-semibold block mb-1">
                              REQUIREMENT:
                            </span>
                            {stamp.req}
                          </div>
                        </div>
                      ))}
                    </div>
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
