import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Compass,
  Eye,
  Heart,
  RotateCcw,
  Shuffle,
  VolumeX,
  Volume2,
  User,
  MapPin,
  Tv,
  Check,
  TrendingUp,
  ChevronRight,
  PlayCircle,
  Clock,
  Layers,
  Zap,
  Info,
} from "lucide-react";
import { tournaments } from "../data";
import { completeTournaments } from "./Chronicle";
import { Tournament } from "../data";
import { VerifiedImage } from "./VerifiedImage";

// Richly enhanced database containing the 5 historic layers for each tournament
interface TimeMachineNode {
  year: number;
  story: string;
  champion: string;
  runnerUp: string;
  host: string;
  finalScore: string;
  hero: {
    name: string;
    description: string;
    stats: string;
  };
  definingMatch: {
    title: string;
    score: string;
    description: string;
    stats?: string;
  };
  legacy: string;
  atmosphereEmoji: string;
  fact: string;
}

const nodeDatabase: Record<number, TimeMachineNode> = {
  1930: {
    year: 1930,
    story:
      "Football steps into a new dawn. In Montevideo’s sweltering July heat, thirteen pioneering nations gathered without qualifiers, traveling weeks by steamships across the Atlantic to inaugurate the world’s grandest sporting theater.",
    champion: "Uruguay",
    runnerUp: "Argentina",
    host: "Uruguay",
    finalScore: "4-2",
    hero: {
      name: "Guillermo Stábile",
      description:
        "Entering as a backup striker, Argentine 'El Filtrador' scored a sensational hat-trick on his debut and became the tournament's inaugural Golden Boot king.",
      stats: "8 Goals in 4 Matches",
    },
    definingMatch: {
      title: "Uruguay vs Argentina (The Battle of the Balls)",
      score: "4-2",
      description:
        "Both nations insisted on using their own matchball. Ultimately, Argentina's ball was used in the first half (Argentina leading 2-1), while Uruguay's heavier ball was used in the second (Uruguay winning 4-2).",
    },
    legacy:
      "Set the permanent gold standard for intercontinental tournaments and built Estadio Centenario in just nine months as a monument of human speed.",
    atmosphereEmoji: "📜",
    fact: "The tournament did not feature any draws. Every match resulted in a definitive outcome.",
  },
  1934: {
    year: 1934,
    story:
      "Tactics take center stage. Vittorio Pozzo introduced a high-intensity, militaristic focus to training combined with the pioneering 'Metodo' formation, turning the Italian squad into a tactical engine.",
    champion: "Italy",
    runnerUp: "Czechoslovakia",
    host: "Italy",
    finalScore: "2-1 (aet)",
    hero: {
      name: "Giuseppe Meazza",
      description:
        "Italy's first genuine superstar. Known for his tactical intelligence, beautiful playmaking, and outstanding scoring flair in crucial knockout matches.",
      stats: "Golden Ball Winner",
    },
    definingMatch: {
      title: "Italy vs Czechoslovakia",
      score: "2-1 (aet)",
      description:
        "Fierce final in Rome. Trailing with 19 minutes left, Orsi scored an incredible curling equalizer, before Schiavio fired home the winner in extra time.",
    },
    legacy:
      "Introduced the fundamental concept of home advantage, intense crowd atmosphere, and qualification stages.",
    atmosphereEmoji: "🏛️",
    fact: "Egypt became the first African nation to compete in a World Cup during this tournament.",
  },
  1938: {
    year: 1938,
    story:
      "With clouds of global conflict gathering over Europe, France hosted a tense, emotionally charged tournament. Defending champions Italy marched through hostile crowds to establish a footballing empire.",
    champion: "Italy",
    runnerUp: "Hungary",
    host: "France",
    finalScore: "4-2",
    hero: {
      name: "Leônidas da Silva",
      description:
        "The magnificent Brazilian pioneer. Dubbed 'The Black Diamond', he captured the audience's hearts with acrobatics and pioneered the scissor bicycle kick.",
      stats: "7 Goals (Top Scorer)",
    },
    definingMatch: {
      title: "Brazil vs Poland",
      score: "6-5 (aet)",
      description:
        "A rain-soaked masterwork in Strasbourg. Leônidas famously took off his boots to play barefoot in the thick mud, scoring an unmatched hat-trick.",
    },
    legacy:
      "Vittorio Pozzo cement-cast his name as the only manager to win back-to-back World Cups, demonstrating defensive perfection.",
    atmosphereEmoji: "🥖",
    fact: "This was the last World Cup for 12 years due to the outbreak of World War II.",
  },
  1950: {
    year: 1950,
    story:
      "A long-awaited resurrection. Brazil built the colossal Maracanã Stadium as a Roman theater for their first crowning. Needing only a single point in the group decider, an entire nation was ready to throw a historic carnival.",
    champion: "Uruguay",
    runnerUp: "Brazil",
    host: "Brazil",
    finalScore: "2-1",
    hero: {
      name: "Obdulio Varela",
      description:
        "The legendary defensive captain of Uruguay, whose iron-willed composure single-handedly prevented Uruguay from breaking in front of 200,000 hostile fans.",
      stats: "El Gran Capitán",
    },
    definingMatch: {
      title: "Uruguay vs Brazil (Maracanazo shockwave)",
      score: "2-1",
      description:
        "Brazil took the lead, but Uruguayan wizard Schiaffino equalized. With 11 minutes left, Ghiggia squeezed a low shot past Friaça, creating absolute silence.",
    },
    legacy:
      "The term 'Maracanazo' entered the human languages as the definitive term for a devastating football upset.",
    atmosphereEmoji: "🏟️",
    fact: "India famously withdrew from the tournament after FIFA banned barefoot play, though travel costs also played a part.",
  },
  1954: {
    year: 1954,
    story:
      "The 'Mighty Magyars' of Hungary were considered the greatest assembly of talent of all time, undefeated for four years. Yet West Germany, utilizing technological genius, mounted an impossible heist in Swiss rains.",
    champion: "West Germany",
    runnerUp: "Hungary",
    host: "Switzerland",
    finalScore: "3-2",
    hero: {
      name: "Ferenc Puskás",
      description:
        "The sublime left-footed architect of Hungary, who scored in the final despite carrying a fractured ankle, cementing his status as a footballing titan.",
      stats: "The Galloping Major",
    },
    definingMatch: {
      title: "West Germany vs Hungary (The Miracle of Bern)",
      score: "3-2",
      description:
        "Hungary led 2-0 in eight minutes. West Germany, wearing pioneering screw-in stud boots developed by Adi Dassler, gained footing in mud to storm back and win.",
    },
    legacy:
      "Symbolized the spiritual rebirth of post-war Germany, showing the magic of team solidarity and technical ingenuity.",
    atmosphereEmoji: "🏔️",
    fact: "This tournament remains the highest-scoring World Cup in history, averaging an incredible 5.38 goals per game.",
  },
  1958: {
    year: 1958,
    story:
      "A teenager changed football forever. Traveling to Sweden, Brazil combined tactical speed and samba rhythm to unveil a 17-year-old child whose name would define eternity.",
    champion: "Brazil",
    runnerUp: "Sweden",
    host: "Sweden",
    finalScore: "5-2",
    hero: {
      name: "Pelé (Age 17)",
      description:
        "The youthful King of Football. Scored a hat-trick in the semi-final and a breathtaking brace in the final to take Sweden and the globe by storm.",
      stats: "Youngest Finals Scorer",
    },
    definingMatch: {
      title: "Brazil vs Sweden",
      score: "5-2",
      description:
        "In the final, Pelé hit a legendary goal by flicking the ball directly over a defender's head and volleying it into the bottom corner.",
      stats: "Unreal Dribbling Showcase",
    },
    legacy:
      "Established Brazil as the ultimate spiritual homeland of beautiful play (O Jogo Bonito) and began the golden age of worldwide television broadcasts.",
    atmosphereEmoji: "👑",
    fact: "Just Fontaine (France) scored an unbelievable 13 goals in this tournament - a single-tournament record that may never be matched.",
  },
  1962: {
    year: 1962,
    story:
      "A physically brutal tournament in Chile. When Pelé suffered a tournament-ending muscle tear in the second group game, Brazil’s dynasty seemed vulnerable, until the 'Bent-Legged Angel' stepped up.",
    champion: "Brazil",
    runnerUp: "Czechoslovakia",
    host: "Chile",
    finalScore: "3-1",
    hero: {
      name: "Garrincha",
      description:
        "The ultimate dribbler of Brazil. Born with deformed legs, his impossible balance made him unplayable, scoring braces in the quarters and semis.",
      stats: "Golden Ball & Boot",
    },
    definingMatch: {
      title: "Brazil vs England",
      score: "3-1",
      description:
        "Quarterfinal masterwork. Garrincha scored a bullet header, set up another, and hit an impossible curling banana-shot past English hands.",
    },
    legacy:
      "Unified defensive systems were introduced to contain solo talents, signaling the shift to more structural speed.",
    atmosphereEmoji: "🍷",
    fact: "The group match between Chile and Italy is known as the 'Battle of Santiago' due to players throwing punches, requiring police intervention.",
  },
  1966: {
    year: 1966,
    story:
      "Football comes home. Hosted in Wembley’s majestic shadows, England built an unbreakable defensive force around Bobby Moore, culminating in the most analyzed refereeing decision in human history.",
    champion: "England",
    runnerUp: "West Germany",
    host: "England",
    finalScore: "4-2 (aet)",
    hero: {
      name: "Bobby Moore",
      description:
        "The elegant captain. Never a sliding defender, his tackling lay in supreme reading of the field and immaculate forward transitions.",
      stats: "Sovereign Leader",
    },
    definingMatch: {
      title: "England vs West Germany",
      score: "4-2 (aet)",
      description:
        "In extra time, Hurst's shot hit the bar and bounded onto the line. Assarov, the referee's assistant, ruled it a goal, triggering debates for 60 years.",
    },
    legacy:
      "Brought English football its only star and introduced iconic stadium banners, matches of theatrical scale, and press coverage.",
    atmosphereEmoji: "🦁",
    fact: "The Jules Rimet trophy went missing before the tournament and was famously found in a garden bush by a dog named Pickles.",
  },
  1970: {
    year: 1970,
    story:
      "The zenith of pure play. Mexico hosted the first World Cup broadcast in full, glorious living color. On high-heat pitches, Pelé returned to conduct what remains the most beautiful team ever assembled.",
    champion: "Brazil",
    runnerUp: "Italy",
    host: "Mexico",
    finalScore: "4-1",
    hero: {
      name: "Pelé (Peak)",
      description:
        "His absolute career coronation. Claiming his third winner medal with headers, passes, and near-misses that remain the hallmark of pure footballing art.",
      stats: "The Greatest of All Time",
    },
    definingMatch: {
      title: "Brazil vs Italy (The Perfect Coronate Final)",
      score: "4-1",
      description:
        "A nine-pass symphony ending in Pelé throwing a blind pass wide right to charging captain Carlos Alberto, who struck a rocket of sheer beauty.",
    },
    legacy:
      "Remains the absolute gold standard for offensive play, forever linking football with samba art.",
    atmosphereEmoji: "🇲🇽",
    fact: "This was the first World Cup to introduce colored yellow and red cards, plus the rule allowing tactical player substitutions.",
  },
  1974: {
    year: 1974,
    story:
      "An ideological revolution. Cruyff’s Netherlands introduced 'Total Football'—a system where any player could swap positions dynamically. In the host nation, they met German tactical rigidity in a clash of intellects.",
    champion: "West Germany",
    runnerUp: "Netherlands",
    host: "West Germany",
    finalScore: "2-1",
    hero: {
      name: "Johan Cruyff",
      description:
        "The intellectual conductor. Dazzled with speed, turn techniques, and spatial choreography that redefined the modern midfielder.",
      stats: "Golden Ball Icon",
    },
    definingMatch: {
      title: "Netherlands vs West Germany",
      score: "1-2",
      description:
        "In the first minute, Netherlands put together 17 passes before Cruyff was tripped for a penalty. Germany equalized, and Gerd Müller poked home the winner.",
    },
    legacy:
      "Integrated dynamic space, spatial orientation, and movement into tactical structures.",
    atmosphereEmoji: "🥨",
    fact: "This is when the modern FIFA World Cup Trophy was introduced, replacing the Jules Rimet trophy which was kept permanently by Brazil.",
  },
  1978: {
    year: 1978,
    story:
      "In a highly politicized tournament, the warm skies of Buenos Aires were blanketed in a rain of white ticker-tape ticker papers cascading from roaring stands as hosts Argentina claimed their first star.",
    champion: "Argentina",
    runnerUp: "Netherlands",
    host: "Argentina",
    finalScore: "3-1 (aet)",
    hero: {
      name: "Mario Kempes",
      description:
        "The tall, long-locked talisman. Combining relentless energy and lethal left-footed power, he finished as top scorer and Golden Ball holder.",
      stats: "6 Goals (Golden Ball & Boot)",
    },
    definingMatch: {
      title: "Argentina vs Netherlands",
      score: "3-1 (aet)",
      description:
        "A brutal, deafening final at Estadio Monumental. Kempes scored twice, sliding through defenders, sealing Argentina's maiden victory.",
      stats: "Extra-time Triumph",
    },
    legacy:
      "Began Argentina's rise as a global powerhouse of modern soccer with dramatic visual aesthetics.",
    atmosphereEmoji: "🇦🇷",
    fact: "Uniquely, France played one match in green-and-white striped shirts borrowed from a local amateur club after a jersey clash.",
  },
  1982: {
    year: 1982,
    story:
      "Hosted in beautiful Spain, this tournament became a collision of brilliant artistic philosophies. Brazil brought a magnificent midfield of Socrates and Zico, but Italy's direct counter-attacks proved fatal.",
    champion: "Italy",
    runnerUp: "West Germany",
    host: "Spain",
    finalScore: "3-1",
    hero: {
      name: "Paolo Rossi",
      description:
        "Italy's ultimate poacher. Returning from suspension, he caught lightning in a bottle, scoring six crucial goals in the final stages.",
      stats: "6 Goals (Golden Ball & Boot)",
    },
    definingMatch: {
      title: "Italy vs Brazil (The Day Football Died)",
      score: "3-2",
      description:
        "The greatest second-round match in history. Rossi scored an iconic hat-trick to dismantle Brazil's legendary samba midfielders.",
      stats: "Dramatic Classic",
    },
    legacy:
      "Cemented the modern counter-attacking blueprint (Catenaccio and beyond) as defense transitioned to attack.",
    atmosphereEmoji: "🇪🇸",
    fact: "Kuwait's football association president ran onto the pitch in a protest against a goal, successfully convincing the referee to disallow it!",
  },
  1986: {
    year: 1986,
    story:
      "One man conquers history. On Azteca's high-altitude stages, Diego Armando Maradona put on a displays of skill, intelligence, and street cunning that will never be matched in human history.",
    champion: "Argentina",
    runnerUp: "West Germany",
    host: "Mexico",
    finalScore: "3-2",
    hero: {
      name: "Diego Maradona",
      description:
        "The sublime Cosmic Kite. Led his team with unbelievable direct goalscoring, solo runs, and majestic tactical playmaking.",
      stats: "5 Goals & 5 Assists (Golden Ball)",
    },
    definingMatch: {
      title: "Argentina vs England (The Hand and the Century)",
      score: "2-1",
      description:
        "Within four minutes, Maradona scored using the controversial 'Hand of God', then dribbled past five English players from his own half to hit the 'Goal of the Century'.",
    },
    legacy:
      "Immortalized Maradona as a footballing deity and established Azteca as a modern temple of sporting drama.",
    atmosphereEmoji: "🌪️",
    fact: "This tournament popularized 'The Wave' in stadiums, making it a permanent part of international sporting experience.",
  },
  1990: {
    year: 1990,
    story:
      "A defensive tournament soundscaped by Pavarotti’s haunting 'Nessun Dorma'. On warm Italian nights, Germany’s structured midfield engine engineered a tactical march through tight defensive structures.",
    champion: "West Germany",
    runnerUp: "Argentina",
    host: "Italy",
    finalScore: "1-0",
    hero: {
      name: "Lothar Matthäus",
      description:
        "The complete German captain. Capable of driving, direct overlapping runs, and dictating play from deep areas.",
      stats: "Silver Ball Winner",
    },
    definingMatch: {
      title: "West Germany vs England (The penalty shootout curse)",
      score: "1-1 (4-3 p)",
      description:
        "A tense semifinal in Turin. Lineker scored the late equalizer, and Germany progressed via a penalty shootout, beginning England's shootout heartache.",
      stats: "Unreal Drama",
    },
    legacy:
      "Prompted a critical revision of rules—including the introduction of three points for wins and banning backpasses to goalkeepers.",
    atmosphereEmoji: "🇮🇹",
    fact: "Roger Milla (Cameroon) celebrated his goals by dancing with the corner flag at age 38, captivating fans globally.",
  },
  1994: {
    year: 1994,
    story:
      "The World Cup crossed into North America. Giant, sun-drenched sports bowls saw rapid, attacking plays in front of massive, celebratory crowds, concluding in Pasadena's dry, hot air.",
    champion: "Brazil",
    runnerUp: "Italy",
    host: "USA",
    finalScore: "0-0 (3-2 p)",
    hero: {
      name: "Romário",
      description:
        "The clinical master of the box. Possessing incredible speed over small spaces and sublime finishing calmness.",
      stats: "Golden Ball Winner",
    },
    definingMatch: {
      title: "Brazil vs Italy (The Tragedy of the Rose Bowl)",
      score: "0-0 (3-2 p)",
      description:
        "After carrying an injured Italy to the final, Roberto Baggio stepped up in Pasadena heat, only to put his shootout penalty high into the sky.",
    },
    legacy:
      "Broke the all-time attendance models, introducing millions of North Americans to professional soccer.",
    atmosphereEmoji: "🗽",
    fact: "Roger Milla broke his own record, scoring at 42 years old, making him the oldest goalscorer in World Cup history.",
  },
  1998: {
    year: 1998,
    story:
      "A modern revolution of identity. Hosted in France, a multicultural and unified 'One France' team combined football strength and creative elegance to claim their inaugural star.",
    champion: "France",
    runnerUp: "Brazil",
    host: "France",
    finalScore: "3-0",
    hero: {
      name: "Zinedine Zidane",
      description:
        "The balletic giant. Facing tremendous pressure on home soil, he rose above corners in the final to seal French history.",
      stats: "2 Goals in Final",
    },
    definingMatch: {
      title: "France vs Brazil",
      score: "3-0",
      description:
        "Ronaldo suffered a mystery seizure hours before kickoff. Zidane struck two towering headers from corners, sending St. Denis into absolute euphoria.",
    },
    legacy:
      "United a Nation under a multi-racial banner and modernized the brand of physical playmaking.",
    atmosphereEmoji: "🥐",
    fact: "Croatia debuted in this World Cup post-independence and achieved a stunning 3rd place finish, led by Davor Šuker.",
  },
  2002: {
    year: 2002,
    story:
      "The first World Cup in Asia, defined by surprises and massive, chanting crowds. It became the stage for one of football's greatest redemption stories.",
    champion: "Brazil",
    runnerUp: "Germany",
    host: "Japan/South Korea",
    finalScore: "2-0",
    hero: {
      name: "Ronaldo Nazário",
      description:
        "O Fenômeno. Overcoming years of career-ending knee reconstructions, he returned with a triangular haircut to score 8 golden goals.",
      stats: "8 Goals (Golden Boot)",
    },
    definingMatch: {
      title: "Brazil vs Germany",
      score: "2-0",
      description:
        "In the Yokohama final, Ronaldo capitalized on Oliver Kahn's spill, then struck a low shot in the bottom corner to seal the match.",
    },
    legacy:
      "Confirmed Brazil's status as a 5-star football civilization (the Pentacampeão) in high-tech stadiums.",
    atmosphereEmoji: "⛩️",
    fact: "Hakan Şükür (Turkey) scored the fastest goal in World Cup history after just 10.8 seconds against South Korea.",
  },
  2006: {
    year: 2006,
    story:
      "A highly defensive, star-studded tournament in Germany. Under unified, premium branding, Italian defensive stability and midfield coordination forged a path to glory under dramatic circumstances.",
    champion: "Italy",
    runnerUp: "France",
    host: "Germany",
    finalScore: "1-1 (5-3 p)",
    hero: {
      name: "Fabio Cannavaro",
      description:
        "The Berlin Wall. Despite standing just 5'9\", his perfect timing, positioning, and leadership earned him the Ballon d'Or as a defender.",
      stats: "Captain & Silver Ball",
    },
    definingMatch: {
      title: "Italy vs France (Tragedy in Berlin)",
      score: "1-1 (5-3 p)",
      description:
        "Playing his final game, Zidane opened with a cheeky penalty, but Marco Materazzi equalized. In extra time, Zidane headbutted Materazzi after a provocation, receiving a red card.",
    },
    legacy:
      "Remains an iconic broadcast-era event, defining the retirement of a brilliant generation of modern masters.",
    atmosphereEmoji: "🍻",
    fact: "In the Croatia vs Australia match, referee Graham Poll mistakenly showed defender Josip Šimunić three yellow cards before sending him off.",
  },
  2010: {
    year: 2010,
    story:
      "The first World Cup on African soil, soundtracked by vuvuzelas and Shakira's 'Waka Waka'. Spain’s Tiki-Taka pass-and-move carousel wore down opponents to write history in golden colors.",
    champion: "Spain",
    runnerUp: "Netherlands",
    host: "South Africa",
    finalScore: "1-0 (aet)",
    hero: {
      name: "Andrés Iniesta",
      description:
        "The quiet conductor of Tiki-Taka, who moved into pockets with ball control and unlocked the final's bruising deadlock.",
      stats: "Golden Ball Final MVP",
    },
    definingMatch: {
      title: "Spain vs Netherlands",
      score: "1-0 (aet)",
      description:
        "In a physical final in Johannesburg with 14 yellow cards, Iniesta slammed home Fabregas's layout pass in the 116th minute, dedicating it to late friend Dani Jarque.",
    },
    legacy:
      "Tiki-Taka entered the history books as a tactical school that dominated both club and international platforms.",
    atmosphereEmoji: "🎺",
    fact: "This was the first time the host country was eliminated in the first round of the competition.",
  },
  2014: {
    year: 2014,
    story:
      "Returning to Brazil, a carnival of pure speed and goals unfolded. But Germany's engineered tactical unity would deliver a brutal, historic shockwave to the hosts on their own holy ground.",
    champion: "Germany",
    runnerUp: "Argentina",
    host: "Brazil",
    finalScore: "1-0 (aet)",
    hero: {
      name: "Miroslav Klose",
      description:
        "The veteran target man. By scoring in the historic semifinal, he became the all-time leading scorer in World Cup history.",
      stats: "16 All-Time Goals",
    },
    definingMatch: {
      title: "Germany vs Brazil (The Mineirazo)",
      score: "7-1",
      description:
        "In Belo Horizonte, Germany scored five times in the opening 29 minutes, delivering a tragic shock to an entire host nation.",
    },
    legacy:
      "German tactical systems set a new benchmark for counter-pressing, ending in Mario Götze's brilliant chest-and-volley winner in Rio.",
    atmosphereEmoji: "🌴",
    fact: "Germany became the first European team to win a World Cup in the Americas.",
  },
  2018: {
    year: 2018,
    story:
      "A fast, transition-centered tournament. France, built around the speed of Kylian Mbappé and the midfield structure of N'Golo Kanté, marched through opponents with pragmatic efficiency.",
    champion: "France",
    runnerUp: "Croatia",
    host: "Russia",
    finalScore: "4-2",
    hero: {
      name: "Luka Modrić",
      description:
        "The tireless Croatian engine. Dragg'd a nation of four million to the final, showing midfield vision, stamina, and captaincy.",
      stats: "Golden Ball Winner",
    },
    definingMatch: {
      title: "France vs Croatia",
      score: "4-2",
      description:
        "A thriller final in Moscow. France scored via an own goal, penalty, and strikes from Pogba and Mbappé, while Croatia fought heroically.",
      stats: "Modern High Score Final",
    },
    legacy:
      "Introduced VAR to football history, changing defensive setups and penalty statistics forever.",
    atmosphereEmoji: "🏰",
    fact: "Kylian Mbappé became only the second teenager to score in a World Cup final, after Pelé in 1958.",
  },
  2022: {
    year: 2022,
    story:
      "The ultimate crowning. Set against Qatar’s winter skies, Lionel Messi embarked on a final mission. Over seven high-pressure matches, he led Argentina in what became a cinematic conquest of soccer divinity.",
    champion: "Argentina",
    runnerUp: "France",
    host: "Qatar",
    finalScore: "3-3 (4-2 p)",
    hero: {
      name: "Lionel Messi",
      description:
        "The immortal master of Rosario. Scored in every single knockout stage, claiming his desired crown.",
      stats: "Golden Ball Winner",
    },
    definingMatch: {
      title: "Argentina vs France (The Greatest Final)",
      score: "3-3 (4-2 p)",
      description:
        "Argentina led 2-0; Mbappé hit a 97-second brace. Messi scored in extra time; Mbappé matched with a penalty. Penalties decided Messi's absolute crowning.",
    },
    legacy:
      "Cemented Lionel Messi as the greatest footballer in history and completed his epic trophy collection.",
    atmosphereEmoji: "✨",
    fact: "This World Cup saw a record-breaking 172 goals scored, surpassing the 171 of both 1998 and 2014.",
  },
  2026: {
    year: 2026,
    story:
      "Expanding to an unprecedented 48 nations across three massive co-host countries, the 2026 World Cup starts a new frontier of scale, theatricality, and global unity.",
    champion: "The Next Champion",
    runnerUp: "The Contenders",
    host: "USA, Canada & Mexico",
    finalScore: "To Be Decided",
    hero: {
      name: "The Next Generation",
      description:
        "Brilliant young athletes stepping into the grandest lights across North America, ready to write their own mythology.",
      stats: "48 Nations Peak",
    },
    definingMatch: {
      title: "104 Matches of Scale",
      score: "Pan-Continental",
      description:
        "Setting foot in 16 venues from Mexico City's historic Azteca to New York, the scale introduces an unmatched crucible of soccer drama.",
    },
    legacy:
      "The first tri-national co-hosted tournament, expanding the sport's global footprint permanently.",
    atmosphereEmoji: "🚀",
    fact: "This is the first World Cup to feature a 48-team tournament layout, starting from a Round of 32.",
  },
};

interface TimeMachineProps {
  onClose: () => void;
  onExploreClassicMatch?: (matchId: string) => void;
  onExploreLegend?: (legendId: string) => void;
  onExploreNation?: (nationId: string) => void;
  onExploreStadium?: (stadiumId: string) => void;
  onExploreRecords?: (recordId?: string) => void;
}

export function TimeMachine({
  onClose,
  onExploreClassicMatch,
  onExploreLegend,
  onExploreNation,
  onExploreStadium,
  onExploreRecords,
}: TimeMachineProps) {
  const [status, setStatus] = useState<"intro" | "active">("intro");
  const [activeYear, setActiveYear] = useState<number>(1930);
  const [introStep, setIntroStep] = useState<number>(0);
  const [activePath, setActivePath] = useState<
    "tournaments" | "nations" | "legends" | "records" | "stadiums"
  >("tournaments");
  const [selectedSubpath, setSelectedSubpath] = useState<string>("all");
  const [activeFracture, setActiveFracture] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  const yearsList = [
    1930, 1934, 1938, 1950, 1954, 1958, 1962, 1966, 1970, 1974, 1978, 1982,
    1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022, 2026,
  ];

  // Auto-build years for the entry sequence animation
  useEffect(() => {
    if (status === "intro") {
      const interval = setInterval(() => {
        setIntroStep((prev) => {
          if (prev >= yearsList.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 90);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status !== "active") return;
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, activeYear, activePath, selectedSubpath]);

  // Era determination based on year
  function getEraStyles(year: number) {
    if (year <= 1950) {
      return {
        id: "era1",
        name: "The Birth of the World Cup",
        years: "1930 - 1950",
        styles: {
          wrapper: "bg-[#12100e] text-[#f5efe4] border-[#362f27]",
          accentText: "text-[#C5A059]",
          decorBg: "bg-[#211b15]",
          borderClass: "border border-[#C5A059]/30 border-double border-4 p-6",
          fontClass: "font-serif",
          tagClass: "text-[9px] font-mono tracking-widest text-[#9C927E]",
          headerGlow: "shadow-[0_0_50px_rgba(197,160,89,0.05)]",
          texture:
            "bg-[radial-gradient(#3a2e21_1px,transparent_1px)] [background-size:16px_16px] opacity-15",
        },
      };
    } else if (year <= 1978) {
      return {
        id: "era2",
        name: "The Golden Rise",
        years: "1954 - 1978",
        styles: {
          wrapper: "bg-[#15120a] text-[#FAF8F5] border-[#423315]",
          accentText: "text-[#D4AF37]",
          decorBg: "bg-[#291f0c]",
          borderClass:
            "border-2 border-[#D4AF37]/45 rounded-lg p-6 shadow-[0_0_30px_rgba(212,175,55,0.04)]",
          fontClass: "font-serif",
          tagClass:
            "text-[9px] font-mono tracking-[0.25em] text-[#AFA58D] font-bold",
          headerGlow: "shadow-[0_0_60px_rgba(212,175,55,0.08)]",
          texture:
            "bg-[linear-gradient(45deg,#291f0a_25%,transparent_25%,transparent_75%,#291f0a_75%,#291f0a)] [background-size:30px_30px] opacity-10",
        },
      };
    } else if (year <= 2006) {
      return {
        id: "era3",
        name: "The Age of Legends",
        years: "1982 - 2006",
        styles: {
          wrapper: "bg-[#070912] text-[#eef3fa] border-[#18233c]",
          accentText: "text-[#3EBAFF]",
          decorBg: "bg-[#0f1424]",
          borderClass:
            "border border-[#18233c] rounded-sm p-6 relative before:absolute before:inset-0 before:bg-[linear-gradient(rgba(24,35,60,0)_95%,_rgba(62,186,255,0.08)_95%)] before:bg-[size:100%_8px] before:pointer-events-none",
          fontClass: "font-sans font-semibold",
          tagClass: "text-[9px] font-mono tracking-wider text-[#87A0C4]",
          headerGlow: "shadow-[0_0_50px_rgba(62,186,255,0.06)]",
          texture:
            "bg-[linear-gradient(rgba(6,8,16,0.3)_50%,_rgba(0,0,0,0.4)_50%)] bg-[size:100%_4px] opacity-25",
        },
      };
    } else {
      return {
        id: "era4",
        name: "The Modern Era",
        years: "2010 - 2026",
        styles: {
          wrapper: "bg-[#080809] text-[#FAFAFA] border-[#222225]",
          accentText: "text-[#D4AF37]",
          decorBg: "bg-[#141416]",
          borderClass:
            "border border-[#2d2d32] rounded-none p-6 shadow-2xl shadow-black",
          fontClass: "font-sans",
          tagClass: "text-[8px] font-mono tracking-[0.4em] text-[#A1A1A4]",
          headerGlow: "shadow-[0_0_60px_rgba(212,175,55,0.05)]",
          texture:
            "bg-[radial-gradient(#1c1c1f_1px,transparent_1px)] [background-size:20px_20px] opacity-35",
        },
      };
    }
  }

  // Handle alternate paths and their nodes filtering/highlighting
  const pathConfig = {
    tournaments: {
      subpaths: [{ id: "all", label: "Complete Chronicles" }],
    },
    nations: {
      subpaths: [
        { id: "all", label: "All Dynasties" },
        { id: "brazil", label: "Brazil (5x Stars)" },
        { id: "argentina", label: "Argentina (3x Stars)" },
        { id: "italy", label: "Italy (4x Stars)" },
        { id: "germany", label: "Germany (4x Stars)" },
      ],
    },
    legends: {
      subpaths: [
        { id: "all", label: "All Titans" },
        { id: "messi", label: "Lionel Messi Roads" },
        { id: "pele", label: "Pelé Coronation Years" },
        { id: "maradona", label: "Maradona Solo Drama" },
        { id: "zidane", label: "Zidane Heights" },
      ],
    },
    records: {
      subpaths: [{ id: "all", label: "Unbelievable Records" }],
    },
    stadiums: {
      subpaths: [{ id: "all", label: "Coliseum Landmarks" }],
    },
  };

  function getFilteredYears() {
    if (activePath === "tournaments") return yearsList;
    if (activePath === "stadiums") {
      return [1930, 1950, 1970, 1986, 1998, 2006, 2014, 2022];
    }
    if (activePath === "records") {
      return [1930, 1950, 1958, 1970, 1990, 1994, 2002, 2014, 2022];
    }
    if (activePath === "nations") {
      if (selectedSubpath === "brazil") return [1958, 1962, 1970, 1994, 2002];
      if (selectedSubpath === "argentina") return [1978, 1986, 2022];
      if (selectedSubpath === "italy") return [1934, 1938, 1982, 2006];
      if (selectedSubpath === "germany") return [1954, 1974, 1990, 2014];
      return [
        1934, 1938, 1954, 1958, 1962, 1970, 1974, 1978, 1982, 1986, 1990, 1994,
        2002, 2006, 2014, 2022,
      ];
    }
    if (activePath === "legends") {
      if (selectedSubpath === "messi") return [2006, 2010, 2014, 2018, 2022];
      if (selectedSubpath === "pele") return [1958, 1962, 1966, 1970];
      if (selectedSubpath === "maradona") return [1982, 1986, 1990, 1994];
      if (selectedSubpath === "zidane") return [1998, 2002, 2006];
      return [1958, 1970, 1974, 1986, 1998, 2002, 2006, 2022];
    }
    return yearsList;
  }

  const activeYears = getFilteredYears();

  // Reset active year if filtered out
  useEffect(() => {
    if (!activeYears.includes(activeYear)) {
      setActiveYear(activeYears[0] || 1930);
    }
  }, [activePath, selectedSubpath]);

  const handleNext = () => {
    const currIdx = activeYears.indexOf(activeYear);
    if (currIdx < activeYears.length - 1) {
      setActiveYear(activeYears[currIdx + 1]);
    } else {
      // Loop around
      setActiveYear(activeYears[0]);
    }
  };

  const handlePrev = () => {
    const currIdx = activeYears.indexOf(activeYear);
    if (currIdx > 0) {
      setActiveYear(activeYears[currIdx - 1]);
    } else {
      setActiveYear(activeYears[activeYears.length - 1]);
    }
  };

  const activeNode = nodeDatabase[activeYear] || nodeDatabase[1930];
  const currentSetup = getEraStyles(activeYear);

  // Time Fracture detector logic
  const isFractureAvailable = [1958, 1986, 2014, 2022].includes(activeYear);
  const fractureDetails: Record<
    number,
    { title: string; subtitle: string; desc: string; graphicText: string }
  > = {
    1958: {
      title: "THE ARRIVAL OF PELÉ",
      subtitle: "August 1958 • Sweden skies",
      desc: "An unknown, scrawny 17-year-old child steps into the world spotlight. With a childish smile, impossible agility, and a touch from God, he flicks balls over giant veterans' heads, scoring a semi-final hat-trick and a brace in the final to claim Brazil's first crown.",
      graphicText: "PELÉ",
    },
    1986: {
      title: "THE HAND OF D10S",
      subtitle: "June 22, 1986 • Estadio Azteca",
      desc: "Four minutes of total, sublime human contradiction. In the 51st minute, Diego Maradona leaps into the sky to flick the ball past Shilton using the 'Hand of God'. In the 55th minute, he takes the ball in his own half and dances beautifully past five English players to hit the 'Goal of the Century'.",
      graphicText: "DIEGO",
    },
    2014: {
      title: "THE MINEIRAZO IN Belo Horizonte",
      subtitle: "July 8, 2014 • Estadio Mineirão",
      desc: "An incredible collapse that stunned the planet. Hosts Brazil, in front of a crying, roaring home crowd, faced a German tactical pressing machine. Five goals are struck by Germany in just 29 opening minutes, ending in an unbelievable 7-1 scoreline.",
      graphicText: "7 - 1",
    },
    2022: {
      title: "MESSI'S HEAVENLY CROWNING",
      subtitle: "Dec 18, 2022 • Lusail Gold Stadium",
      desc: "The ultimate coronation final of footballing history. Argentina dominates 2-0, Mbappé scores twice in 90 seconds. Messi scores in extra time; Mbappé scores a penalty. Martinez pulls off an impossible 123rd-minute stretch save. In the penalty shootout, Lionel Messi finally completes sports.",
      graphicText: "GOAT",
    },
  };

  // Auto-trigger fractures when entering them (optional feature, but we let them click on a glowing trigger banner for interactive discovery)
  const activeFractureData =
    activeFracture !== null ? fractureDetails[activeFracture] : null;

  return (
    <div className="fixed inset-0 z-[600] bg-[#050505] overflow-hidden flex flex-col font-sans text-white focus:outline-none select-none">
      {/* BACKGROUND GRAPHIC INTERACTIVE NOISE GRIDS */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* IMAGE PRELOADER FOR ADJACENT NODES (PERFORMANCE OPTIMIZATION) */}
      <div className="fixed opacity-0 pointer-events-none w-0 h-0 overflow-hidden" aria-hidden="true">
        {activeYears
          .filter(y => Math.abs(y - activeYear) === 4 || Math.abs(y - activeYear) === 2) // Common jump gaps
          .map(y => {
            const t = tournaments.find(tourn => tourn.year === y);
            return t?.image ? <img key={`preload-${y}`} src={t.image} /> : null;
          })
        }
      </div>

      <AnimatePresence mode="wait">
        {status === "intro" ? (
          /* SEQUENCE 1: INTRODUCTION STAGE */
          <motion.div
            key="intro-deck"
            className="flex-1 flex flex-col justify-center items-center px-6 relative z-10 text-center h-full"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            {/* Museum outer frame border lines */}
            <div className="absolute inset-6 md:inset-12 border border-[#D4AF37]/10 pointer-events-none" />
            <div className="absolute inset-8 md:inset-16 border border-[#2c2214]/30 pointer-events-none" />

            {/* Backdrop glowing giant Trophy icon Silhouette */}
            <motion.div
              className="absolute pointer-events-none opacity-[0.02] text-[#D4AF37]"
              initial={{ scale: 0.6, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 4, ease: "easeOut" }}
            >
              <Trophy size={600} strokeWidth={0.25} />
            </motion.div>

            <motion.div
              className="mb-6 font-mono text-[9px] tracking-[0.5em] text-[#D4AF37]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.3 }}
            >
              WORLD CUP TIME MACHINE // ARCHIVE VAULT PROJECT
            </motion.div>

            <motion.h1
              className="museum-level-1 mb-2 select-none drop-shadow-xl"
              initial={{ letterSpacing: "0.4em", opacity: 0 }}
              animate={{ letterSpacing: "0.2em", opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              THE WORLD CUP
            </motion.h1>
            <motion.h2
              className="museum-level-1 text-vault-gold-1 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.4 }}
            >
              TIME MACHINE
            </motion.h2>

            {/* Statement of travels */}
            <motion.p
              className="museum-level-4 italic text-vault-muted-1 !text-lg sm:!text-xl md:!text-2xl mb-16"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
            >
              «Travel through football history.»
            </motion.p>

            {/* Assembling Years timeline animation */}
            <div className="max-w-4xl w-full mx-auto relative mb-20 overflow-hidden py-4 px-2 border-y border-[#D4AF37]/10 bg-black/20">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 max-h-[140px] overflow-y-auto">
                {yearsList.map((y, idx) => (
                  <motion.span
                    key={y}
                    className={`font-serif text-xs md:text-sm font-bold tracking-wider ${
                      idx < introStep
                        ? "opacity-85 text-[#D4AF37]"
                        : "opacity-0 text-gray-800"
                    } transition-colors duration-500`}
                    initial={{ scale: 0.8 }}
                    animate={idx < introStep ? { scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {y}
                  </motion.span>
                ))}
              </div>

              {/* Golden line divider below years */}
              <div className="h-[1px] w-48 bg-[#D4AF37]/35 mx-auto mt-4 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
              </div>
            </div>

            {/* Enter Button available after assembly starts */}
            <motion.button
              onClick={() => setStatus("active")}
              className="font-serif text-xs sm:text-sm text-[#050505] bg-[#D4AF37] hover:bg-[#F5F2EA] border-2 border-[#D4AF37] hover:border-[#F5F2EA] px-14 py-5 font-black uppercase tracking-[0.4em] transition-all duration-500 ease-out cursor-pointer shadow-[0_0_35px_rgba(212,175,55,0.25)] hover:shadow-[0_0_55px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 rounded-[2px]"
              initial={{ opacity: 0, y: 20 }}
              animate={introStep > 5 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              ENTER THE TIME MACHINE
            </motion.button>
          </motion.div>
        ) : (
          /* SEQUENCE 2: IMMERSIVE ACTIVE TIMELINE TRAVEL DECK */
          <motion.div
            key="travel-deck"
            className="flex-1 flex flex-col justify-between h-full relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* TOP NAVIGATION / CONTROL HEADER */}
            <header className="px-6 md:px-12 py-5 border-b border-white/5 bg-black/45 backdrop-blur-md flex justify-between items-center z-40 relative">
              <div className="flex items-center gap-4">
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 group/back text-[#AFA58D] hover:text-[#D4AF37] font-mono text-[10px] uppercase tracking-widest leading-none min-h-[44px]"
                  title="Return to Exhibition Hall"
                >
                  <ArrowLeft
                    size={14}
                    className="group-hover/back:-translate-x-1.5 transition-transform"
                  />
                  <span>VAULT REGISTER</span>
                </button>
              </div>

              {/* CENTER ACTIVE ERA HEADER BANNER */}
              <div className="hidden md:flex flex-col items-center text-center">
                <span className="font-mono text-[8px] text-[#AFA58D] tracking-[0.3em] uppercase mb-0.5 font-bold">
                  ERA{" "}
                  {activeYear <= 1950
                    ? "I"
                    : activeYear <= 1978
                      ? "II"
                      : activeYear <= 2006
                        ? "III"
                        : "IV"}{" "}
                  // TRAVEL ENVELOPE
                </span>
                <span
                  className={`museum-level-5 italic uppercase font-black tracking-widest ${currentSetup.styles.accentText} transition-all duration-500`}
                >
                  {currentSetup.name} ({currentSetup.years})
                </span>
              </div>

              {/* GENERAL CONTROL TOOLS */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowHelp((prev) => !prev)}
                  className={`min-w-[44px] min-h-[44px] rounded-full border border-white/10 flex items-center justify-center text-[#AFA58D] hover:text-[#D4AF37] hover:border-[#D4AF37]/35 transition-all bg-black/45 ${showHelp ? "border-[#D4AF37]/75 text-[#D4AF37]" : ""}`}
                  title="Exhibition Key Commands Help"
                >
                  <Info size={14} />
                </button>

                {/* ACCESSIBILITY / ACCURATE MOTION MODULATOR BUTTON */}
                <button
                  onClick={() => setReducedMotion((prev) => !prev)}
                  className={`min-h-[44px] px-3 py-1.5 border rounded-[3px] font-mono text-[8px] uppercase tracking-wider transition-all cursor-pointer ${
                    reducedMotion
                      ? "border-[#D4AF37]/80 bg-[#D4AF37]/10 text-[#D4AF37] font-bold"
                      : "border-white/10 bg-white/[0.02] text-[#AFA58D] hover:text-white"
                  }`}
                  title="Modulate transitions for performance or accessibility"
                >
                  {reducedMotion ? "Reduced Motion: ON" : "Reduced Motion: OFF"}
                </button>
              </div>
            </header>

            {/* DYNAMIC PATHS / PERSISTENT ALTERNATIVE FILTER ROUTERS */}
            <div className="px-6 md:px-12 py-3 border-b border-white/5 bg-black/20 flex flex-wrap gap-2 md:gap-4 items-center justify-between z-30 relative scrollbar-none">
              <div className="flex items-center gap-2">
                <Compass size={13} className="text-[#D4AF37]/70" />
                <span className="font-mono text-[9px] tracking-wider text-[#AFA58D] uppercase font-bold mr-2">
                  CHRONICLE AXIS:
                </span>
                <div className="flex items-center gap-1.5 bg-[#121214] p-1 border border-white/5 rounded-[4px]">
                  {(
                    [
                      { id: "tournaments", label: "WORLD CUPS" },
                      { id: "nations", label: "DYNASTIES" },
                      { id: "legends", label: "TITANS" },
                      { id: "records", label: "RECORDS" },
                      { id: "stadiums", label: "COLISEUMS" },
                    ] as const
                  ).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActivePath(p.id);
                        setSelectedSubpath("all");
                      }}
                      className={`min-h-[44px] px-3 py-1 rounded-[3px] font-mono text-[9px] uppercase tracking-wider transition-all duration-300 ${
                        activePath === p.id
                          ? "bg-[#D4AF37] text-black font-black"
                          : "text-[#AFA58D] hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subpath Selection Chips (Dynamic based on selected lens) */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
                {pathConfig[activePath]?.subpaths.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubpath(sub.id)}
                    className={`min-h-[44px] px-2 py-0.5 rounded-[2px] transition-all duration-300 text-[8px] font-mono uppercase border ${
                      selectedSubpath === sub.id
                        ? "border-[#D4AF37]/60 bg-[#D4AF37]/15 text-[#D4AF37] font-semibold"
                        : "border-white/5 text-[#69707A] hover:text-[#AFA58D] hover:border-white/10"
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>

            {/* HELPFUL OVERLAY TO EXPLAIN SHORTCUT KEYS */}
            <AnimatePresence>
              {showHelp && (
                <motion.div
                  className="mx-6 md:mx-12 mt-4 p-4 border border-[#D4AF37]/30 bg-[#12100e] text-xs max-w-xl self-end absolute right-4 top-16 z-50 rounded-sm shadow-2xl font-mono text-[#D7D2C4]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <p className="font-bold text-[#D4AF37] mb-2 museum-level-5">
                    ARCHIVAL KEYBOARD CONTROLS
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <strong className="text-white">← Left Arrow:</strong> Step
                      backward in time
                    </li>
                    <li>
                      <strong className="text-white">→ Right Arrow:</strong>{" "}
                      Step forward in time
                    </li>
                    <li>
                      <strong className="text-white">Esc Key:</strong> Sift back
                      to Vault lobby
                    </li>
                  </ul>
                  <button
                    onClick={() => setShowHelp(false)}
                    className="mt-3 text-[#D4AF37] hover:underline font-bold text-[9px] uppercase hover:text-white"
                  >
                    Dismiss Manual
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* THE IMMERSIVE DESTINATION STAGE (CENTER OF HISTORY) */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-12 relative overflow-hidden h-full">
              {/* STAGE ENVIRONMENT BACKGROUND TEXTURE INK */}
              <div
                className={`absolute inset-0 transition-colors duration-1000 select-none pointer-events-none -z-10 ${currentSetup.styles.texture}`}
              />

              {/* BACKGROUND GIANT YEAR WATERMARK */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] transition-opacity duration-1000 -z-10">
                <span
                  className={`font-black text-[38vw] leading-none text-[#F5F2EA] ${reducedMotion ? "" : "animate-pulse"}`}
                >
                  {activeYear}
                </span>
              </div>

              {/* HISTORICAL GENERATOR ECHOES PATH (Saves the generations link) */}
              <div className="absolute top-4 left-6 right-6 flex items-center justify-between text-[#8E8B83]/45 tracking-widest font-mono text-[8.5px] uppercase select-none pointer-events-none border-b border-white/5 pb-2 hidden lg:flex">
                <span>ECHOES LINK VERIFICATION:</span>
                <div className="flex items-center gap-2">
                  <span
                    className={
                      activeYear >= 1958 ? "text-[#D4AF37] font-bold" : ""
                    }
                  >
                    1958 CORONATION (PELÉ)
                  </span>
                  <span>→</span>
                  <span
                    className={
                      activeYear >= 1986 ? "text-[#D4AF37] font-bold" : ""
                    }
                  >
                    1986 SOLO GENIUS (MARADONA)
                  </span>
                  <span>→</span>
                  <span
                    className={
                      activeYear >= 2022 ? "text-[#D4AF37] font-bold" : ""
                    }
                  >
                    2022 SOVEREIGN DIGNITY (MESSI)
                  </span>
                </div>
              </div>

              {/* CORE DESTINATION INTERFACES */}
              <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center z-13 relative py-6">
                {/* COLUMN ONE: THE ERA POSTER / CANVAS FRAME (4 Cols) */}
                <div className="col-span-1 lg:col-span-5 flex justify-center w-full">
                  <motion.div
                    key={activeYear}
                    className={`${currentSetup.styles.borderClass} ${currentSetup.styles.wrapper} flex flex-col gap-4 max-w-sm w-full transition-all duration-1000 relative overflow-hidden`}
                    initial={
                      reducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, x: -50, scale: 0.95 }
                    }
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {/* Grains for Vintage Feel */}
                    {activeYear <= 1950 && (
                      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.95\' numOctaves=\'3\' .../%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')]" />
                    )}

                    <div className="flex justify-between items-start border-b border-[#4E5661]/15 pb-3">
                      <div>
                        <span
                          className={`${currentSetup.styles.tagClass} uppercase block mb-0.5 font-bold`}
                        >
                          DESTINATION CARD NUMÉRO {activeYear}
                        </span>
                        <h3 className="museum-level-3 text-2xl">
                          {activeYear}
                        </h3>
                      </div>
                      <span className="text-2xl opacity-80">
                        {activeNode.atmosphereEmoji}
                      </span>
                    </div>

                    <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/5">
                      <VerifiedImage
                        src={
                          completeTournaments.find((t) => t.year === activeYear)
                            ?.image ||
                          "https://upload.wikimedia.org/wikipedia/commons/1/1d/1930_FIFA_World_Cup_Final.jpg"
                        }
                        alt={`${activeYear} World Cup Poster`}
                        className="w-full h-full animate-[pulse_8s_ease-in-out_infinite]"
                        aspectRatio="auto"
                        tournament={activeNode.host}
                        date={`${activeYear} World Cup`}
                        context={`Archival representation of the ${activeYear} tournament in ${activeNode.host}.`}
                        eraStyle={activeYear <= 1954 ? "antique" : activeYear <= 1986 ? "vintage" : "retro"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-85" />

                      <div className="absolute bottom-3 left-3">
                        <span className="font-mono text-[8px] text-[#AFA58D] block uppercase tracking-widest leading-none mb-1">
                          HOST NATION
                        </span>
                        <span className="museum-level-3 text-sm md:text-md uppercase tracking-wider">
                          {activeNode.host}
                        </span>
                      </div>
                    </div>

                    {/* CHAMPION DATA LAYER */}
                    <div className="p-3.5 bg-black/40 border border-white/5 rounded-xs mt-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Trophy
                          size={14}
                          className={currentSetup.styles.accentText}
                        />
                        <span className="font-mono text-[8.5px] uppercase text-[#AFA58D] tracking-widest font-black">
                          CROWNED CHAMPIONS
                        </span>
                      </div>
                      <h4 className="museum-level-3 text-xl uppercase">
                        {activeNode.champion}
                      </h4>
                      {activeYear !== 2026 && (
                        <p className="font-sans text-[10px] text-[#69707A] font-light mt-0.5">
                          Silver: {activeNode.runnerUp} • Final Match Count:{" "}
                          {activeNode.finalScore}
                        </p>
                      )}
                    </div>

                    {/* FACT TIP BAR */}
                    <div className="flex items-start gap-2 text-[10px] text-[#8E8B83] mt-1 leading-relaxed opacity-85">
                      <Zap
                        size={11}
                        className="text-[#D4AF37] mt-0.5 flex-shrink-0"
                      />
                      <p className="font-sans italic font-light">
                        {activeNode.fact}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* COLUMN TWO: DRAMATIC DOCUMENTARY LAYERS (7 Cols) */}
                <div className="col-span-1 lg:col-span-7 flex flex-col justify-center">
                  {/* HERO HEADER ERA LOGO TITLE */}
                  <motion.div
                    key={`header-${activeYear}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                  >
                    <span
                      className={`font-mono text-[9px] ${currentSetup.styles.accentText} tracking-[0.35em] font-black uppercase mb-1.5 block`}
                    >
                      CHRONICLE DESTINATION AT THE TEMPLE
                    </span>
                    <h2 className="museum-level-1 leading-none tracking-tight">
                      THE {activeYear} STORY
                    </h2>
                  </motion.div>

                  {/* LAYER 1: HISTORICAL STORY COMPASS */}
                  <motion.p
                    key={`story-${activeYear}`}
                    className="museum-level-4 pr-4 max-w-2xl mb-6 opacity-95 transition-opacity"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.95 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    {activeNode.story}
                  </motion.p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mb-6">
                    {/* LAYER 2: THE HERO COLUMN */}
                    <motion.div
                      key={`hero-${activeYear}`}
                      className="p-4 bg-gradient-to-br from-white/[0.015] to-white/[0.002] border border-white/5 rounded-xs"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <div className="flex items-center gap-1.5 mb-2 border-b border-white/5 pb-1.5">
                        <User
                          size={13}
                          className={currentSetup.styles.accentText}
                        />
                        <span className="font-mono text-[8px] text-[#AFA58D] font-black uppercase tracking-widest">
                          CHAPTER TITAN HERP
                        </span>
                      </div>
                      <h4 className="museum-level-3 text-md text-vault-text-1">
                        {activeNode.hero.name}
                      </h4>
                      <p className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-wide mt-0.5 mb-2 font-bold">
                        {activeNode.hero.stats}
                      </p>
                      <p className="font-sans text-[11px] text-[#69707A] leading-relaxed font-light">
                        {activeNode.hero.description}
                      </p>
                    </motion.div>

                    {/* LAYER 3: THE DEFINING MATCH COLUMN */}
                    <motion.div
                      key={`match-${activeYear}`}
                      className="p-4 bg-gradient-to-br from-white/[0.015] to-white/[0.002] border border-white/5 rounded-xs"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <div className="flex items-center gap-1.5 mb-2 border-b border-white/5 pb-1.5">
                        <Clock
                          size={13}
                          className={currentSetup.styles.accentText}
                        />
                        <span className="font-mono text-[8px] text-[#AFA58D] font-black uppercase tracking-widest">
                          DEFINING CLASH
                        </span>
                      </div>
                      <h4 className="museum-level-3 text-md text-vault-text-1 line-clamp-1">
                        {activeNode.definingMatch.title}
                      </h4>
                      <p className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-wide mt-0.5 mb-2 font-bold">
                        Result: {activeNode.definingMatch.score}
                      </p>
                      <p className="font-sans text-[11px] text-[#69707A] leading-relaxed font-light line-clamp-3">
                        {activeNode.definingMatch.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* LAYER 4: TEMPLE LEGACY STATEMENT */}
                  <motion.div
                    key={`legacy-${activeYear}`}
                    className="p-4 bg-black/30 border border-[#D4AF37]/15 rounded-xs max-w-2xl mb-6 border-l-4 border-l-[#D4AF37]"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <span className="font-mono text-[8px] text-[#AFA58D] font-black uppercase tracking-wider block mb-1">
                      CHRONOLOGY LEGACY VERDICT
                    </span>
                    <p className="museum-level-4 text-xs italic">
                      "{activeNode.legacy}"
                    </p>
                  </motion.div>

                  {/* TIME FRACTURES GLOWING DETECTOR CHIP */}
                  <AnimatePresence>
                    {isFractureAvailable && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="max-w-2xl"
                      >
                        <motion.button
                          onClick={() => setActiveFracture(activeYear)}
                          className="w-full flex items-center justify-between gap-4 p-3 bg-gradient-to-r from-red-950/40 via-red-900/10 to-transparent border border-red-800/40 hover:border-red-500 rounded-sm cursor-pointer transition-all duration-300 relative overflow-hidden group shadow-lg shadow-red-950/25"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="absolute inset-y-0 left-0 w-1 bg-red-500 animate-pulse" />
                          <div className="flex items-center gap-3">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <div className="text-left">
                              <span className="font-mono text-[8px] text-red-400 tracking-widest uppercase font-black block">
                                FRACTURED INSTANT DETECTED IN TIMELINE
                              </span>
                              <span className="font-serif text-[11px] text-[#F1EBE0] font-bold uppercase tracking-wider group-hover:text-red-300 transition-colors">
                                Explore Time Fracture: "
                                {fractureDetails[activeYear]?.title}"
                              </span>
                            </div>
                          </div>
                          <ChevronRight
                            size={14}
                            className="text-red-500 group-hover:translate-x-1.5 transition-transform"
                          />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* INTEGRATIONS EXPLORE PORTALS (JUMPS TO OTHER VAULTS BASED ON YEAR SELECTION) */}
                  <div className="flex flex-wrap gap-2.5 items-center mt-6 max-w-2xl border-t border-white/5 pt-5 select-none z-10">
                    <span className="font-mono text-[8.5px] text-[#69707A] tracking-wider uppercase font-bold mr-1">
                      EXHIBITION SHORTCUTS:
                    </span>

                    <button
                      onClick={() => {
                        const recNameClass =
                          activeYear === 1930
                            ? "First Ever World Cup Goal"
                            : activeYear === 1950
                              ? "All-Time Attendance Monument"
                              : activeYear === 2022
                                ? "Most World Cup Matches Played"
                                : "";
                        if (onExploreRecords) onExploreRecords();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] border border-white/5 rounded-[2px] font-mono text-[9px] uppercase text-[#AFA58D] hover:text-white hover:border-[#D4AF37]/50 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <Layers size={11} />
                      Records Monolith
                    </button>

                    <button
                      onClick={() => {
                        if (onExploreStadium) {
                          const codeMap: Record<number, string> = {
                            1930: "centenario",
                            1950: "maracana",
                            1970: "azteca",
                            1986: "azteca",
                            1998: "stade-france",
                            2006: "olympiastadion",
                            2014: "maracana",
                            2022: "lusail",
                          };
                          onExploreStadium(codeMap[activeYear] || "azteca");
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] border border-white/5 rounded-[2px] font-mono text-[9px] uppercase text-[#AFA58D] hover:text-white hover:border-[#D4AF37]/50 hover:bg-white/5 transition-colors cursor-pointer min-h-[44px]"
                    >
                      <MapPin size={11} />
                      Coliseums Vault
                    </button>

                    <button
                      onClick={() => {
                        if (onExploreLegend) {
                          const legMap: Record<number, string> = {
                            1958: "pele",
                            1970: "pele",
                            1974: "cruyff",
                            1986: "maradona",
                            1998: "zidane",
                            2002: "ronaldo",
                            2006: "zidane",
                            2022: "messi",
                          };
                          onExploreLegend(legMap[activeYear] || "pele");
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] border border-white/5 rounded-[2px] font-mono text-[9px] uppercase text-[#AFA58D] hover:text-white hover:border-[#D4AF37]/50 hover:bg-white/5 transition-colors cursor-pointer min-h-[44px]"
                    >
                      <Sparkles size={11} />
                      Legends Cabinets
                    </button>

                    {activeYear !== 2026 && (
                      <button
                        onClick={() => {
                          if (onExploreClassicMatch) {
                            const mtchMap: Record<number, string> = {
                              1930: "1930-final",
                              1950: "1950-uruguay-brazil",
                              1954: "1954-germany-hungary",
                              1966: "1966-england-germany",
                              1970: "1970-italy-germany",
                              1982: "1982-italy-brazil",
                              1986: "1986-argentina-england",
                              1994: "1994-brazil-italy",
                              1998: "1998-france-brazil",
                              2002: "2002-brazil-germany",
                              2014: "2014-germany-brazil",
                              2022: "2022-argentina-france",
                            };
                            onExploreClassicMatch(
                              mtchMap[activeYear] || "2022-argentina-france",
                            );
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37]/5 border border-[#D4AF37]/30 rounded-[2px] font-mono text-[9px] uppercase text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all cursor-pointer font-bold min-h-[44px]"
                      >
                        <PlayCircle size={11} />
                        MATCH SCREEN
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* LOWER PORTION: NAVIGATION SLIDER TIMELINE RAILS */}
            <footer className="w-full border-t border-white/5 bg-[#09090b] px-6 py-6 md:px-12 relative z-20">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                {/* PREVIOUS CHRONICLE ARROW BUTTON */}
                <button
                  onClick={handlePrev}
                  className="inline-flex items-center gap-3 px-6 py-3.5 border border-white/10 hover:border-[#D4AF37]/65 hover:text-[#D4AF37] bg-white/[0.01] hover:bg-[#D4AF37]/5 rounded-[2px] font-sans font-bold text-xs uppercase tracking-widest transition-all cursor-pointer select-none group min-h-[44px]"
                >
                  <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  <span>PREV ERA GATEWAY</span>
                </button>

                {/* THE ACTIVE HORIZONTAL ROAD TICK TIMELINE (Virtualized Decade Rails) */}
                <div className="flex-1 max-w-2xl px-6 py-2 overflow-x-auto scrollbar-none flex justify-between gap-4 items-center border border-white/5 bg-black/35 rounded-xs p-1">
                  {activeYears
                    .filter((year) => {
                      // Only render years within +20/-20 of active year to prevent heavy DOM
                      const diff = Math.abs(year - activeYear);
                      return diff <= 24;
                    })
                    .map((year) => {
                      const isSelected = year === activeYear;
                      const eraSet = getEraStyles(year);
                      return (
                        <button
                          key={year}
                          onClick={() => setActiveYear(year)}
                          className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] select-none py-1.5 rounded-sm transition-all cursor-pointer ${
                            isSelected
                              ? "bg-white/10 border border-[#D4AF37]/60 shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                              : "hover:bg-white/5 border border-transparent"
                          }`}
                          title={`Travel to ${year} chronicle node`}
                        >
                          <span
                            className={`museum-level-5 font-black ${
                              isSelected
                                ? eraSet.styles.accentText
                                : "text-[#69707A] hover:text-[#AFA58D]"
                            }`}
                          >
                            {year}
                          </span>

                          {/* Selected Indicator Pin point */}
                          <div
                            className={`w-1 h-1 rounded-full mt-1 ${
                              isSelected
                                ? "bg-[#D4AF37] animate-pulse"
                                : "bg-transparent"
                            }`}
                          />
                        </button>
                      );
                    })}
                </div>

                {/* NEXT CHRONICLE ARROW BUTTON */}
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-3 px-6 py-3.5 border border-white/10 hover:border-[#D4AF37]/65 hover:text-[#D4AF37] bg-white/[0.01] hover:bg-[#D4AF37]/5 rounded-[2px] font-sans font-bold text-xs uppercase tracking-widest transition-all cursor-pointer select-none group min-h-[44px]"
                >
                  <span>NEXT ERA GATEWAY</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </footer>

            {/* FRACTURE DIALOG MODAL LAYOVER */}
            <AnimatePresence>
              {activeFractureData && (
                <motion.div
                  className="fixed inset-0 bg-[#020202]/98 backdrop-blur-md z-[700] flex justify-center items-center p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Subtle red scanline flicker */}
                  <div className="absolute inset-0 z-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(240,0,0,0.4)_50%,_rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px]" />

                  <motion.div
                    className="max-w-2xl w-full border border-red-500/40 bg-gradient-to-b from-red-950/20 to-black p-8 rounded-xs relative z-10 border-double border-4"
                    initial={
                      reducedMotion ? { scale: 1 } : { scale: 0.94, y: 15 }
                    }
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 24 }}
                  >
                    {/* Glowing Red Pulse corners */}
                    <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-red-500" />
                    <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-red-500" />
                    <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-red-500" />
                    <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-red-500" />

                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-1.5 border border-red-500/35 bg-red-950/30 text-red-400 font-mono text-[9px] font-black px-4 py-1.5 uppercase tracking-widest mb-4">
                        <Zap size={12} className="animate-pulse" />
                        TIME FRACTURE HIGH DEVIATION DETECTED
                      </div>

                      <h2 className="museum-level-2 tracking-wide uppercase leading-tight">
                        {activeFractureData.title}
                      </h2>
                      <span className="font-mono text-xs text-[#A9A091] block uppercase tracking-widest mt-2">
                        {activeFractureData.subtitle}
                      </span>
                    </div>

                    {/* Massive decorative central code watermark */}
                    <div className="relative border border-white/5 bg-black/45 p-5 mb-8 rounded-[3px] overflow-hidden text-left h-48 overflow-y-auto">
                      <div className="absolute -right-6 -bottom-12 font-mono text-[10vw] font-black text-red-500/5 select-none tracking-tighter">
                        {activeFractureData.graphicText}
                      </div>

                      <p className="font-sans text-xs leading-relaxed text-[#DDD7C8] pr-12 relative z-10 font-normal">
                        {activeFractureData.desc}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      {/* REDIRECT INTEGRATIONS IN THE FRACTURE FOR MAXIMUM ENGAGEMENT */}
                      {activeFracture === 1958 && onExploreLegend && (
                        <button
                          onClick={() => {
                            setActiveFracture(null);
                            onExploreLegend("pele");
                          }}
                          className="flex-1 py-3 text-center border border-[#D4AF37]/40 bg-[#D4AF37]/5 hover:bg-[#D4AF37] hover:text-black font-mono text-[10px] tracking-wider uppercase font-bold transition-all cursor-pointer rounded-sm min-h-[44px]"
                        >
                          Observe Pelé Archive
                        </button>
                      )}

                      {activeFracture === 1986 && onExploreClassicMatch && (
                        <button
                          onClick={() => {
                            setActiveFracture(null);
                            onExploreClassicMatch("1986-argentina-england");
                          }}
                          className="flex-1 py-3 text-center border border-[#D4AF37]/40 bg-[#D4AF37]/5 hover:bg-[#D4AF37] hover:text-black font-mono text-[10px] tracking-wider uppercase font-bold transition-all cursor-pointer rounded-sm min-h-[44px]"
                        >
                          Relive The Match
                        </button>
                      )}

                      {activeFracture === 2014 && onExploreClassicMatch && (
                        <button
                          onClick={() => {
                            setActiveFracture(null);
                            onExploreClassicMatch("2014-germany-brazil");
                          }}
                          className="flex-1 py-3 text-center border border-[#D4AF37]/40 bg-[#D4AF37]/5 hover:bg-[#D4AF37] hover:text-black font-mono text-[10px] tracking-wider uppercase font-bold transition-all cursor-pointer rounded-sm min-h-[44px]"
                        >
                          Sift 7-1 Match Cinema
                        </button>
                      )}

                      {activeFracture === 2022 && onExploreLegend && (
                        <button
                          onClick={() => {
                            setActiveFracture(null);
                            onExploreLegend("messi");
                          }}
                          className="flex-1 py-3 text-center border border-[#D4AF37]/40 bg-[#D4AF37]/5 hover:bg-[#D4AF37] hover:text-black font-mono text-[10px] tracking-wider uppercase font-bold transition-all cursor-pointer rounded-sm min-h-[44px]"
                        >
                          Messi's Legend Registry
                        </button>
                      )}

                      <button
                        onClick={() => setActiveFracture(null)}
                        className="flex-1 py-3 text-center border border-red-500 bg-red-500 hover:bg-white hover:border-white hover:text-black text-black font-mono text-[10px] tracking-wider uppercase font-extrabold transition-all cursor-pointer rounded-sm min-h-[44px]"
                      >
                        RESTORE TIMELINE CONTINUITY
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
