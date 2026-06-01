import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Trophy, ArrowRight, Star, History, Award, PlayCircle, BarChart3, Clock, MapPin, Sparkles } from 'lucide-react';
import { tournaments as originalTournaments, Tournament } from '../data';
import { TournamentArchive } from './TournamentArchive';

// Add 2026 to the complete timeline list
export const completeTournaments: Tournament[] = [
  ...originalTournaments,
  {
    year: 2026,
    host: 'USA, Canada & Mexico',
    champion: 'The Next Champion',
    runnerUp: 'The Contenders',
    historicMoment: 'A New Globe Carnival of 48 Nations',
    keyPlayer: 'The Next Generation',
    finalScore: 'To Be Decided',
    story: 'Expanding to an unprecedented 48 nations across 16 world-class host cities, the 2026 World Cup represents a monumental landmark in the history of football. It marks a new frontier of scale, theatricality, and global unity spanning three massive co-host nations.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Estadio_Azteca_Interior.jpg'
  }
];

// Rich era mappings as specified in visual evolution
function getEraVisuals(year: number) {
  if (year <= 1950) {
    // 1930-1950: Vintage aesthetic, historical textures, Double borders, sepia text, archive feel
    return {
      bg: 'bg-[#120F0B]',
      border: 'border-[#3D3020]',
      subBorder: 'border-[#4A3C2A]/40',
      text: 'text-[#EAE5D9]',
      mutedText: 'text-[#9C927E]',
      accentColor: 'text-[#C5A059]',
      borderAccent: 'border-[#C5A059]/30',
      badgeBg: 'bg-[#2B2216] text-[#C5A059]',
      filter: 'sepia-[0.35] grayscale-[0.25] brightness-[0.85] contrast-[1.1]',
      cardBorder: 'border-[5px] border-double border-[#4C3E2D]',
      fontClass: 'font-serif',
      eraTitle: 'THE BIRTH OF THE WORLD CUP',
      eraSubtitle: 'The Dawn of Football (1930 - 1950)',
      bgNoise: 'opacity-10 bg-[radial-gradient(#C5A059_0.5px,transparent_0.5px)] [background-size:12px_12px]',
      cornerDecor: '🏰',
      grain: true
    };
  } else if (year <= 1978) {
    // 1954-1978: Golden era, poster influences, classic football atmosphere, warm amber/yellow, elegant gold
    return {
      bg: 'bg-[#151108]',
      border: 'border-[#4D3A1B]',
      subBorder: 'border-[#5C4524]/40',
      text: 'text-[#F9F5EA]',
      mutedText: 'text-[#AFA58D]',
      accentColor: 'text-[#D4AF37]',
      borderAccent: 'border-[#D4AF37]/35',
      badgeBg: 'bg-[#3A2D12] text-[#D4AF37]',
      filter: 'contrast-[1.15] saturate-[1.2] brightness-[0.95]',
      cardBorder: 'border-2 border-[#D4AF37]/45 rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.03)]',
      fontClass: 'font-serif',
      eraTitle: 'THE GOLDEN AGE OF BRAZIL',
      eraSubtitle: 'Samba, Passion, and Elegance (1954 - 1978)',
      bgNoise: 'opacity-5 bg-[linear-gradient(45deg,#D4AF37_10%,transparent_10%)] [background-size:20px_20px]',
      cornerDecor: '🌟',
      grain: false
    };
  } else if (year <= 2006) {
    // 1982-2006: Broadcast era, bold typography, television CRT side bars, design details, scanlines
    return {
      bg: 'bg-[#060810]',
      border: 'border-[#1B273A]',
      subBorder: 'border-[#24354F]/40',
      text: 'text-[#EAF0F9]',
      mutedText: 'text-[#87A0C4]',
      accentColor: 'text-[#3EBAFF]',
      borderAccent: 'border-[#3EBAFF]/30',
      badgeBg: 'bg-[#101C2F] text-[#3EBAFF] font-mono',
      filter: 'contrast-[1.2] saturate-[1.15] brightness-[1.0]',
      cardBorder: 'border border-[#1B273A] rounded-none shadow-[0_0_25px_rgba(62,186,255,0.02)] relative before:absolute before:inset-0 before:bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.15)_50%)] before:bg-[size:100%_4px] before:pointer-events-none',
      fontClass: 'font-sans font-semibold',
      eraTitle: 'THE ERA OF LEGENDS',
      eraSubtitle: 'Global Superstars and Satellites (1982 - 2006)',
      bgNoise: 'opacity-[0.02] bg-[radial-gradient(#3EBAFF_1.5px,transparent_1.5px)] [background-size:24px_24px]',
      cornerDecor: '📺',
      grain: false
    };
  } else if (year <= 2022) {
    // 2010-2022: Modern premium presentation, clean elegant layouts, refined visual language, gold status glow
    return {
      bg: 'bg-[#080809]',
      border: 'border-[#2C2C2F]',
      subBorder: 'border-[#3D3D42]/40',
      text: 'text-[#FAFAFA]',
      mutedText: 'text-[#A1A1A4]',
      accentColor: 'text-[#D4AF37]',
      borderAccent: 'border-[#D4AF37]/25',
      badgeBg: 'bg-[#171719] text-[#D4AF37]',
      filter: 'opacity-100',
      cardBorder: 'border border-[#2C2C2F] rounded-sm shadow-2xl',
      fontClass: 'font-sans',
      eraTitle: 'THE MODERN GAME',
      eraSubtitle: 'Tactical Mastery and Speed (2010 - 2022)',
      bgNoise: 'opacity-[0.015] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]',
      cornerDecor: '💎',
      grain: false
    };
  } else {
    // 2026: Road to 2026
    return {
      bg: 'bg-[#090A09]',
      border: 'border-[#2D332D]',
      subBorder: 'border-[#3D453D]/40',
      text: 'text-[#F5FAF5]',
      mutedText: 'text-[#A3B3A3]',
      accentColor: 'text-[#4ade80]',
      borderAccent: 'border-[#4ade80]/20',
      badgeBg: 'bg-[#151D15] text-[#4ade80]',
      filter: 'opacity-100 animate-pulse',
      cardBorder: 'border-2 border-dashed border-[#4ade80]/30 rounded-md shadow-[0_0_30px_rgba(74,222,128,0.05)]',
      fontClass: 'font-sans',
      eraTitle: 'THE ROAD TO 2026',
      eraSubtitle: 'Uncharted Frontiers (2026)',
      bgNoise: 'opacity-[0.03] bg-[linear-gradient(90deg,transparent_50%,#4ade80_50%)] [background-size:10px_100%]',
      cornerDecor: '🚀',
      grain: false
    };
  }
}

// Addon data structure matching requested legends, records, matches integrated directly
interface ChapterAddon {
  definingMoment: {
    title: string;
    description: string;
  };
  featuredLegend?: {
    name: string;
    badge: string;
    description: string;
  };
  classicMatch?: {
    id: string;
    title: string;
    score: string;
  };
  record?: {
    title: string;
    value: string;
    holder: string;
    description: string;
  };
}

// Full rich narrative and record data aligned strictly where they happened
const timelineAddons: Record<number, ChapterAddon> = {
  1930: {
    definingMoment: {
      title: 'The Battle of Two Balls',
      description: 'Host nation Uruguay and neighbors Argentina had such a intense rivalry that they could not agree on which match ball to play with. By decree of FIFA, Argentina supplied their chosen ball for the first half (leading 2-1), while Uruguay supplied their heavier ball for the second half, storming back to win 4-2.'
    },
    featuredLegend: {
      name: 'Guillermo Stábile',
      badge: 'First Golden Boot King',
      description: 'The prolific Argentine striker who did not even play the first match, but ended up scoring a stunning 8 goals in just 4 games to become the World Cup\'s inaugural top scorer.'
    },
    record: {
      title: 'The First Ever World Cup Goal',
      value: '1st',
      holder: 'Lucien Laurent (FRA)',
      description: 'In the 19th minute against Mexico on July 13, 1930, Laurent carved his name into permanent immortality by striking the historic first goal of the tournament.'
    }
  },
  1934: {
    definingMoment: {
      title: 'Pozzo\'s Metodo System',
      description: 'Vittorio Pozzo revolutionized football tactics by creating the "Metodo" (2-3-2-3) system. He emphasized rigorous defensive shape combined with rapid, direct counter-attacks, creating the blueprint for Italian tactical supremacy.'
    },
    featuredLegend: {
      name: 'Giuseppe Meazza',
      badge: 'Il Genio',
      description: 'Widely considered Italy\'s first soccer superstar, Meazza was an artistic playmaker of supreme vision, dribbling elegance, and lethal scoring prowess on home soil.'
    }
  },
  1938: {
    definingMoment: {
      title: 'Pozzo\'s Historic Double',
      description: 'Vittorio Pozzo became the first and only tactical manager to win consecutive FIFA World Cups, guiding a disciplined Italian squad through hostile French crowds under the dark, looming shadows of global conflict.'
    },
    featuredLegend: {
      name: 'Leônidas da Silva',
      badge: 'The Bicycle Kick Pioneer',
      description: 'Dazzled the Parisian crowds with unmatched acrobatic athleticism. Better known as the "Black Diamond", he popularized the spectacular overhead bicycle kick and scored 7 goals.'
    }
  },
  1950: {
    definingMoment: {
      title: 'The Silent Maracanã',
      description: 'With Brazil needing only a draw to secure their first title in the final group format, the stage was set for a massive carnival. Yet in front of 199,854 stunned Brazilians, Uruguay came from behind to score late, pulling off the most devastating upset in football history.'
    },
    featuredLegend: {
      name: 'Obdulio Varela',
      badge: 'El Gran Capitán',
      description: 'Uruguay\'s mythical leader who famously told his nervous teammates before kickoff: "Outsiders don\'t play. Let\'s start the show."'
    },
    classicMatch: {
      id: '1950-decider',
      title: 'Uruguay vs Brazil (The Maracanazo)',
      score: '2-1'
    },
    record: {
      title: 'All-Time Attendance Monument',
      value: '199,854',
      holder: 'Maracanã Stadium',
      description: 'Remains the largest verified crowd to ever assemble for a single football match in global history, a record that will almost certainly never be broken.'
    }
  },
  1954: {
    definingMoment: {
      title: 'The Screw-In Stud Advantage',
      description: 'Down 2-0 early in driving Swiss rain against Hungary\'s legendary undefeated "Mighty Magyars", West Germany made use of pioneering screw-in cleats developed by Adi Dassler. This allowed superior footing to storm back and win 3-2.'
    },
    featuredLegend: {
      name: 'Ferenc Puskás',
      badge: 'The Galloping Major',
      description: 'The lethal left-footed conductor of Hungary\'s golden team, Puskás scored even while playing injured, reinforcing his status as a football deity.'
    }
  },
  1958: {
    definingMoment: {
      title: 'The Birth of the 17-Year-Old King',
      description: 'A teenager named Pelé entered the tournament unknown and left as a global emperor. He became the youngest player to score in a World Cup final, scoring a breathtaking brace against hosts Sweden.'
    },
    featuredLegend: {
      name: 'Pelé (Age 17)',
      badge: 'Global Sensation',
      description: 'Announced his arrival with gravity-defying headers, brilliant chest-and-volleys, and a childish smile that conquered Sweden and the world.'
    },
    record: {
      title: 'Unbreakable Single Tournament Goals',
      value: '13',
      holder: 'Just Fontaine (FRA)',
      description: 'Sensationally scored 13 goals in just 6 games in Sweden. This remains the absolute record for goals in a single tournament.'
    }
  },
  1962: {
    definingMoment: {
      title: 'Garrincha\'s Solitary Triumph',
      description: 'With Pelé injured in the second game, Brazil\'s chances seemed ruined. But Garrincha took full control, putting on an unplayable display of dribbling and goalscoring, leading Brazil to back-to-back stars.'
    },
    featuredLegend: {
      name: 'Garrincha',
      badge: 'Alegria do Povo',
      description: 'The bent-legged dribbler whose absolute joy and unpredictable moves made him one of the most beloved figures in Brazilian football.'
    }
  },
  1966: {
    definingMoment: {
      title: 'The Crossbar Controversy',
      description: 'In extra time of the final, England\'s Geoff Hurst struck a thunderous shot that hit the underside of the crossbar, bounced down, and was ruled a goal by the linesman, triggering debates that lasted decades.'
    },
    featuredLegend: {
      name: 'Bobby Moore',
      badge: 'Captain of England',
      description: 'Represented England with immaculate tackling, tactical leadership, and elegant grace, hoisting the Jules Rimet trophy on Wembley soil.'
    }
  },
  1970: {
    definingMoment: {
      title: 'The Symmetric Team Goal of Beautiful Play',
      description: 'During the 4-1 thrashing of Italy in Mexico\'s high heat, Brazil put together a move of nine passes, culminating in Pelé\'s blind layout pass to flying captain Carlos Alberto who struck a rocket. The perfect coronation.'
    },
    featuredLegend: {
      name: 'Pelé (Peak)',
      badge: 'The Sovereign King',
      description: 'Claimed his historic third World Cup winner medal, confirming his legacy as the immortal monarch of the beautiful game.'
    },
    classicMatch: {
      id: '1970-final',
      title: 'Brazil vs Italy',
      score: '4-1'
    },
    record: {
      title: 'Sovereign Winner Medal Record',
      value: '3x',
      holder: 'Pelé',
      description: 'Pelé remains the only footballer in history to win three FIFA World Cups (1958, 1962, 1970).'
    }
  },
  1974: {
    definingMoment: {
      title: 'The Turn That Redefined Space',
      description: 'Johan Cruyff introduced the world to the "Cruyff Turn" against Sweden, leaving a defender completely lost in space, symbolizing the intellectual poetry of Dutch Total Football.'
    },
    featuredLegend: {
      name: 'Johan Cruyff',
      badge: 'The Total Football Mastermind',
      description: 'Redefined active spacing and positions on the pitch, leading Netherlands in their tactical revolution.'
    }
  },
  1978: {
    definingMoment: {
      title: 'Buenos Aires Confetti Storm',
      description: 'The pitch at Estadio Monumental was blanketed in a rain of millions of white ticker-tape papers cascading from the roaring Argentine stands, providing the ultimate atmosphere for Argentina\'s first star.'
    },
    featuredLegend: {
      name: 'Mario Kempes',
      badge: 'El Matador',
      description: 'The tall, flying striker whose explosive power scored twice in the final to seal victory over the Netherlands.'
    }
  },
  1982: {
    definingMoment: {
      title: 'Redemption of Paolo Rossi',
      description: 'Rossi sat out of football for two long years before the World Cup. He returned to score a legendary hat-trick against favorites Brazil, then three more to win the tournament as Golden Boot champion.'
    },
    featuredLegend: {
      name: 'Paolo Rossi',
      badge: 'Redeemed Icon',
      description: 'Captured the World Cup, Golden Ball, and Golden Boot within two weeks of pure grace.'
    }
  },
  1986: {
    definingMoment: {
      title: 'Four Minutes of Complete Human Paradox',
      description: 'At the Azteca, Diego Maradona first scored controversial "Hand of God" goal against England. Four minutes later, he took the ball in his own half and dribbled past five English players to score the "Goal of the Century".'
    },
    featuredLegend: {
      name: 'Diego Maradona',
      badge: 'The Cosmic Kite',
      description: 'Dominated the entire tournament like no player ever before or after, creating the ultimate narrative of solo genius.'
    },
    classicMatch: {
      id: '1986-quarter',
      title: 'Argentina vs England',
      score: '2-1'
    }
  },
  1990: {
    definingMoment: {
      title: 'Pavarotti’s Roman Nights',
      description: 'The haunting notes of Luciano Pavarotti\'s "Nessun Dorma" soundscaped Italy\'s warm, dramatic nights, which culminated in unified West Germany’s defensive masterpiece over Argentina.'
    },
    featuredLegend: {
      name: 'Lothar Matthäus',
      badge: 'The Ultimate Captain',
      description: 'The versatile midfield engine who dominated play, earning praise from Maradona as his toughest opponent.'
    },
    record: {
      title: 'Goalkeeper Clean Sheet Record',
      value: '517m',
      holder: 'Walter Zenga (ITA)',
      description: 'Kept five consecutive clean sheets on home soil. He went over five matches without conceding a single goal.'
    }
  },
  1994: {
    definingMoment: {
      title: 'The Tragedy of the Rose Bowl',
      description: 'After single-handedly dragging Italy to the final, the talismanic Roberto Baggio stepped up to take the must-score penalty. On a blazing hot day in Pasadena, his shot sailed into the empty California sky.'
    },
    featuredLegend: {
      name: 'Romário',
      badge: 'King of the Box',
      description: 'The clinical Brazilian genius whose legendary finishing and composure on the counter-attack brought the fourth star to Brazil.'
    },
    record: {
      title: 'Defying Age in America',
      value: '42y',
      holder: 'Roger Milla (CMR)',
      description: 'Milla scored against Russia to become the oldest goalscorer in World Cup history at 42 years and 39 days.'
    }
  },
  1998: {
    definingMoment: {
      title: 'Zidane\'s Towering Headers',
      description: 'Before a record crowd at Stade de France, Zinedine Zidane rose above the Brazilian defense to score two powerful headers from corners, uniting a modern, multi-cultural France in a 3-0 triumph.'
    },
    featuredLegend: {
      name: 'Zinedine Zidane',
      badge: 'The Balletic Giant',
      description: 'Confronted huge pressure with absolute grace, masterfully sealing France\'s very first World Cup title.'
    }
  },
  2002: {
    definingMoment: {
      title: 'Ronaldo\'s Redemption Haircut',
      description: 'After collapsing mysteriously before the 1998 final, Ronaldo returned with a bizarre triangular haircut to distract the media. He then scored 8 goals, including both in the final, to secure Brazil\'s fifth star.'
    },
    featuredLegend: {
      name: 'Ronaldo Nazário',
      badge: 'O Fenômeno',
      description: 'Defied career-ending knee injuries to carve out the ultimate story of professional resurrection.'
    },
    record: {
      title: 'Fastest Goal in World Cup History',
      value: '10.8s',
      holder: 'Hakan Şükür (TUR)',
      description: 'Straight from South Korea\'s kickoff, Şükür dispossessed the defenders to score in under 11 seconds.'
    }
  },
  2006: {
    definingMoment: {
      title: 'Tragedy in Berlin',
      description: 'Playing in his final tournament, Zinedine Zidane carried France to the final. But in extra time, in full view of millions, he headbutted Marco Materazzi after a verbal altercation, walking off into a tragic retirement.'
    },
    featuredLegend: {
      name: 'Fabio Cannavaro',
      badge: 'The Berlin Wall',
      description: 'The diminutive central defender captained Italy to the trophy without receiving a single yellow card, executing defensive perfection.'
    },
    classicMatch: {
      id: '2006-final',
      title: 'Italy vs France',
      score: '1-1 (5-3 p)'
    }
  },
  2010: {
    definingMoment: {
      title: 'Iniesta\'s Eternal Tribute',
      description: 'In the 116th minute of a bruising extra-time battle against the Dutch, Andrés Iniesta struck a historic half-volley, removing his shirt to reveal a tribute to the late Dani Jarque: "Always with us."'
    },
    featuredLegend: {
      name: 'Andrés Iniesta',
      badge: 'The Elegant Mind',
      description: 'The quiet midfielder whose fluid turns and exquisite passing unlocked defenses to crown Spain\'s tiki-taka era.'
    }
  },
  2014: {
    definingMoment: {
      title: 'The Mineirazo Shockwave',
      description: 'A night of absolute surrealism in Belo Horizonte. Without injured Neymar, hosts Brazil faced a ruthless Germany who scored 5 times in the first 29 minutes, finishing with an unbelievable 7-1 scoreline.'
    },
    featuredLegend: {
      name: 'Miroslav Klose',
      badge: 'History\'s Scorer',
      description: 'Scored his 16th tournament goal against Brazil during the 7-1 match, writing his name into record books on Brazilian soil.'
    },
    classicMatch: {
      id: '2014-semi',
      title: 'Germany vs Brazil',
      score: '7-1'
    },
    record: {
      title: 'All-Time World Cup Leading Scorer',
      value: '16',
      holder: 'Miroslav Klose (GER)',
      description: 'Surpassed Ronaldo\'s legendary tally of 15 goals, cementing an unmatched career of loyalty and positioning.'
    }
  },
  2022: {
    definingMoment: {
      title: 'The Ultimate Coronation in Lusail',
      description: 'In what was hailed as the greatest football final ever played, Argentina led 2-0, Mbappé scored twice in 90 seconds, Messi scored again in extra time, and Mbappé matched it with a hat-trick, before Argentina won on penalties.'
    },
    featuredLegend: {
      name: 'Lionel Messi',
      badge: 'Football Completed',
      description: 'At age 35, Messi scored in every single knockout round, lifting the long-desired trophy to cement his immortal legacy.'
    },
    classicMatch: {
      id: '2022-final',
      title: 'Argentina vs France',
      score: '3-3 (4-2 p)'
    },
    record: {
      title: 'Most World Cup Matches Played',
      value: '26',
      holder: 'Lionel Messi (ARG)',
      description: 'During the dramatic final, Messi surpassed Germany’s legendary Lothar Matthäus to record his 26th appearance.'
    }
  },
  2026: {
    definingMoment: {
      title: 'Pan-Continental Expansion Fest',
      description: 'The tournament grows to an astonishing 48 nations across 16 world-class venues in Canada, Mexico, and the USA. It introduces 104 matches of continental scale and unprecedented footballing drama.'
    },
    featuredLegend: {
      name: 'The Next Generation',
      badge: 'Stars of Tomorrow',
      description: 'A brilliant crop of young athletes stepping up into the grandest lights across North America, ready to write their own mythology.'
    },
    record: {
      title: 'Largest World Cup in History',
      value: '48',
      holder: 'USA, CAN, MEX',
      description: 'The first co-hosted event by three nations, expanding the global footprint of the FIFA World Cup to new, uncharted frontiers.'
    }
  }
};

interface EraDividerProps {
  title: string;
  subtitle: string;
  id?: string;
  year: number;
}

function EraDivider({ title, subtitle, id, year }: EraDividerProps) {
  const visuals = getEraVisuals(year);
  return (
    <motion.div 
      id={id}
      className={`w-full py-40 md:py-60 flex flex-col items-center justify-center text-center px-6 relative overflow-hidden ${visuals.bg} border-y ${visuals.border}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ margin: "-20%" }}
      transition={{ duration: 1.5 }}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none select-none">
        <Trophy size={600} strokeWidth={0.2} className={visuals.accentColor} />
      </div>
      
      {/* Visual background noise texture */}
      <div className={`absolute inset-0 pointer-events-none ${visuals.bgNoise}`} />

      <motion.div
        className={`px-4 py-1.5 border ${visuals.borderAccent} ${visuals.badgeBg} text-[10px] tracking-[0.4em] uppercase mb-8 rounded-[2px] font-sans font-bold flex items-center gap-2`}
        initial={{ y: 25, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ margin: "-20%" }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <span className="animate-pulse">{visuals.cornerDecor}</span>
        {subtitle}
      </motion.div>

      <motion.h2 
        className={`font-serif text-[#F5F2EA] text-4xl sm:text-6xl md:text-8xl uppercase tracking-[0.1em] leading-none mb-4`}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ margin: "-20%" }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        {title}
      </motion.h2>

      <div className={`w-24 h-[1px] my-4 ${visuals.borderAccent} opacity-50`} />
    </motion.div>
  );
}

interface ChapterProps {
  tournament: Tournament;
  isLeft: boolean;
  onExploreClassicMatch?: (matchId: string) => void;
  onExploreTournament?: (year: number) => void;
}

function TournamentChapter({ tournament, isLeft, onExploreClassicMatch, onExploreTournament }: ChapterProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const visuals = getEraVisuals(tournament.year);
  const addons = timelineAddons[tournament.year] || {
    definingMoment: { title: 'Tournament Milestone', description: tournament.historicMoment }
  };

  return (
    <motion.section 
      className="min-h-screen relative flex items-center justify-center overflow-hidden py-24 md:py-36 group border-b border-[#4E5661]/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ margin: "-10%" }}
      transition={{ duration: 1 }}
    >
      {/* Decorative vertical era indicator ribbon */}
      <div className="absolute top-0 bottom-0 left-6 md:left-[8%] lg:left-12 w-[1px] bg-gradient-to-b from-transparent via-[#4E5661]/25 to-transparent z-0 hidden md:block" />

      {/* Background Giant Year Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] transition-opacity duration-1000 group-hover:opacity-[0.05] z-0">
        <span className={`${visuals.fontClass} text-[35vw] font-black leading-none select-none transition-transform duration-1000 group-hover:scale-105`}>
          {tournament.year}
        </span>
      </div>

      <div className="z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left Column: Visual/Poster Frame (occupies 5 cols) */}
        <div className={`w-full lg:col-span-5 order-last ${isLeft ? 'lg:order-first' : 'lg:order-last'}`}>
          <div className={`${visuals.cardBorder} overflow-hidden bg-black relative aspect-[3/4] md:aspect-[4/5]`}>
            {/* Vintage Noise Texture Overlay */}
            {visuals.grain && (
              <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay z-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')]" />
            )}
            
            <motion.img 
              src={tournament.image} 
              alt={`${tournament.year} FIFA World Cup`} 
              className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${visuals.filter}`}
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ margin: "-10%" }}
              transition={{ duration: 1.2 }}
            />

            {/* Aesthetic Vignette Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/35 opacity-90 z-10" />

            {/* Corner Deco Stamp */}
            <div className={`absolute top-4 right-4 ${visuals.badgeBg} text-[9px] font-mono font-black tracking-widest px-2 py-1 uppercase border ${visuals.borderAccent} rounded-[2px] z-20`}>
              {visuals.eraTitle}
            </div>

            {/* Bottom Info Plate */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end border-t border-[#4E5661]/25 pt-4">
              <div>
                <p className="font-mono text-[9px] text-[#AFA58D] uppercase tracking-widest leading-none mb-1">FINAL MATCH SCORE</p>
                <p className="font-serif text-[#F5F2EA] text-2xl font-black leading-none">{tournament.finalScore}</p>
              </div>
              
              {/* Gold Star indicator */}
              <div className="flex gap-1">
                <Star size={16} fill="currentColor" stroke="none" className={visuals.accentColor} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Documentary Narrative Section (occupies 7 cols) */}
        <div className="w-full lg:col-span-7 flex flex-col justify-center order-first lg:order-none relative z-20">
          
          {/* Year and Location header */}
          <div className="mb-6">
            <motion.h3 
              className={`${visuals.fontClass} text-6xl sm:text-7xl lg:text-9xl font-black text-[#F5F2EA] tracking-tighter leading-none mb-2`}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {tournament.year}
            </motion.h3>
            
            <div className="flex items-center gap-3">
              <span className={`w-8 h-[2px] ${visuals.borderAccent} bg-current`} />
              <div className="flex items-center gap-1.5 font-sans font-bold text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                <MapPin size={12} className={visuals.accentColor} />
                <span>{tournament.host.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Champion Banner */}
          <motion.div 
            className={`border-l-4 ${visuals.borderAccent} pl-6 mb-8`}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="font-mono text-[9px] text-[#9C927E] tracking-widest uppercase mb-1">CROWNED CHAMPIONS</p>
            <h4 className="font-serif text-2xl md:text-3xl font-black text-[#F5F2EA] tracking-wide mb-1 flex items-baseline gap-2">
              {tournament.champion}
              {tournament.year !== 2026 && (
                <span className="font-sans text-xs text-[#8AA2C2] font-normal italic">
                  Defeated {tournament.runnerUp}
                </span>
              )}
            </h4>
          </motion.div>

          {/* Emotion and narrative story */}
          <motion.p 
            className="font-sans text-[#DDD7C8] text-base md:text-lg leading-relaxed mb-8 font-light max-w-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {tournament.story}
          </motion.p>

          {/* Defining Moment Plaque (interactive museum piece) */}
          <motion.div 
            className={`p-5 mb-8 border border-dashed ${visuals.borderAccent} bg-white/[0.02] rounded-sm max-w-xl`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock size={14} className={visuals.accentColor} />
              <span className={`font-sans font-bold text-[9px] tracking-widest uppercase ${visuals.accentColor}`}>DEFINING MOMENT</span>
            </div>
            <h5 className="font-serif text-lg font-black text-[#F5F2EA] mb-2">"{addons.definingMoment.title}"</h5>
            <p className="font-sans text-xs leading-relaxed text-[#69707A]">{addons.definingMoment.description}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mb-10">
            {/* Record Integration */}
            {addons.record && (
              <motion.div 
                className="p-4 border border-[#4E5661]/15 bg-black/30 rounded-[3px]"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <BarChart3 size={13} className="text-[#D4AF37]" />
                  <span className="font-mono text-[8px] text-[#AFA58D] uppercase tracking-widest">RECORD BREAK</span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-serif text-xl font-bold text-[#D4AF37]">{addons.record.value}</span>
                  <span className="font-sans text-[10px] text-white font-bold tracking-wider truncate uppercase">{addons.record.holder}</span>
                </div>
                <p className="font-sans text-[10px] leading-relaxed text-[#69707A] line-clamp-2">{addons.record.description}</p>
              </motion.div>
            )}

            {/* Featured Legend Panel */}
            {addons.featuredLegend && (
              <motion.div 
                className="p-4 border border-[#4E5661]/15 bg-black/30 rounded-[3px] flex flex-col justify-between"
                whileHover={{ y: -4 }}
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Award size={13} className="text-[#D4AF37]" />
                    <span className="font-mono text-[8px] text-[#AFA58D] uppercase tracking-widest">FEATURED TITAN</span>
                  </div>
                  <h6 className="font-serif text-sm font-bold text-white mb-0.5">{addons.featuredLegend.name}</h6>
                  <span className="text-[8px] font-mono text-[#D4AF37] uppercase tracking-[0.15em] block mb-2">{addons.featuredLegend.badge}</span>
                </div>
                <p className="font-sans text-[10px] leading-relaxed text-[#69707A] line-clamp-2">{addons.featuredLegend.description}</p>
              </motion.div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {/* Historic Match Link (slides in match cinema screen) */}
            {addons.classicMatch && onExploreClassicMatch && (
              <motion.button 
                onClick={() => onExploreClassicMatch(addons.classicMatch!.id)}
                className="inline-flex items-center gap-2.5 font-sans font-bold text-xs tracking-widest uppercase text-[#D4AF37] px-4 py-2 border border-[#D4AF37]/35 rounded-[2px] bg-[#D4AF37]/5 hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer shadow-lg shadow-black/40"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayCircle size={14} />
                <span>RELIVE CINEMATIC MATCH</span>
              </motion.button>
            )}

            {/* Standard Year Explorer (Drawer) */}
            {tournament.year !== 2026 && (
              <button 
                onClick={() => {
                  if (onExploreTournament) {
                    onExploreTournament(tournament.year);
                  } else {
                    setIsDrawerOpen(true);
                  }
                }}
                className="inline-flex items-center gap-3 font-sans text-[10px] md:text-xs tracking-[0.2em] font-medium uppercase text-[#DDD7C8] border-b border-[#DDD7C8]/20 pb-2 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all group/btn cursor-pointer"
              >
                <span>EXPLORE {tournament.year} PORTFOLIO</span>
                <ArrowRight size={13} className="group-hover/btn:translate-x-1.5 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isDrawerOpen && (
          <TournamentArchive 
            tournament={tournament} 
            onClose={() => setIsDrawerOpen(false)} 
            onExploreClassicMatch={(id) => {
              setIsDrawerOpen(false);
              if (onExploreClassicMatch) onExploreClassicMatch(id);
            }} 
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export function Chronicle({ onExploreClassicMatch, onExploreTournament }: { onExploreClassicMatch?: (matchId: string) => void; onExploreTournament?: (year: number) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll tracker updates
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setScrollProgress(latest);
    });
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} id="history-start" className="relative w-full bg-[#050505]">
      
      {/* Central progress tracker (a golden line where the trophy travels) */}
      <div className="absolute left-6 md:left-[8%] lg:left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#111111] via-[#D4AF37]/45 to-[#111111] z-10 hidden md:block">
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#090909] border border-[#D4AF37] flex items-center justify-center z-20 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
          style={{ 
            top: `${scrollProgress * 100}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'top 50ms linear'
          }}
        >
          <Trophy size={14} color="#D4AF37" className="animate-pulse" />
        </div>
      </div>

      {/* Persistent floating progress bar sidebar for desktop tracking 1930 -> 2026 */}
      <div className="fixed right-10 top-1/4 bottom-1/4 w-1 flex-col items-center justify-between z-30 hidden xl:flex">
        {/* Timeline top stamp */}
        <span className="font-mono text-[8px] text-[#D4AF37]/40 tracking-wider font-bold select-none uppercase absolute -top-8 -translate-x-1/2">Start</span>
        
        {/* Full tracking line */}
        <div className="w-[1.5px] h-full bg-[#1A1A1C] relative rounded-full overflow-visible">
          {/* Active progress bar indicator */}
          <div 
            className="absolute top-0 left-0 right-0 rounded-full bg-gradient-to-b from-[#C5A059] to-[#D4AF37] shadow-[0_0_8px_#D4AF37]"
            style={{ height: `${scrollProgress * 100}%` }}
          />

          {/* Era ticks along the line */}
          <div className="absolute top-[0%] right-3 flex items-center gap-1">
            <span className="font-mono text-[9px] text-[#A39985] font-light">1930</span>
            <span className="w-1.5 h-1.5 bg-[#4A3C2A] rounded-full border border-[#C5A059]/40" />
          </div>
          <div className="absolute top-[28%] right-3 flex items-center gap-1">
            <span className="font-mono text-[9px] text-[#AFA58D] font-light">1958</span>
            <span className="w-1.5 h-1.5 bg-[#3A2D12] rounded-full border border-[#D4AF37]/40" />
          </div>
          <div className="absolute top-[55%] right-3 flex items-center gap-1">
            <span className="font-mono text-[9px] text-[#87A0C4] font-light">1986</span>
            <span className="w-1.5 h-1.5 bg-[#1B273A] rounded-full border border-[#3EBAFF]/30" />
          </div>
          <div className="absolute top-[82%] right-3 flex items-center gap-1">
            <span className="font-mono text-[9px] text-[#A1A1A4] font-light">2014</span>
            <span className="w-1.5 h-1.5 bg-[#2C2C2F] rounded-full border border-[#D4AF37]/30" />
          </div>
          <div className="absolute top-[100%] right-3 flex items-center gap-1">
            <span className="font-mono text-[9px] text-green-400 font-bold">2026</span>
            <span className="w-2 h-2 bg-green-500 rounded-full border-2 border-green-300 shadow-[0_0_8px_green]" />
          </div>

          {/* Little Floating Golden Trophy on the sidebar tracker */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 w-7 h-7 bg-black border border-[#D4AF37] rounded-full flex items-center justify-center z-40 float-left shadow-[0_0_12px_rgba(212,175,55,0.45)]"
            style={{ 
              top: `${scrollProgress * 100}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'top 50ms linear'
            }}
          >
            <Trophy size={11} className="text-[#D4AF37]" strokeWidth={2} />
          </motion.div>
        </div>

        {/* Timeline bottom stamp */}
        <span className="font-mono text-[8px] text-[#D4AF37]/40 tracking-wider font-bold select-none uppercase absolute -bottom-8 -translate-x-1/2">End</span>
      </div>

      <div className="w-full flex flex-col">
        {completeTournaments.map((tournament, idx) => {
          const isLeft = idx % 2 === 0;
          
          let eraDivider = null;
          if (tournament.year === 1930) {
            eraDivider = (
              <EraDivider 
                id="era-vintage" 
                title="THE BIRTH OF THE WORLD CUP" 
                subtitle="The Dawn of Football (1930 - 1950)" 
                year={1930}
              />
            );
          }
          if (tournament.year === 1954) {
            eraDivider = (
              <EraDivider 
                id="era-golden" 
                title="THE GOLDEN AGE OF BRAZIL" 
                subtitle="Samba, Passion, and Elegance (1954 - 1978)" 
                year={1954}
              />
            );
          }
          if (tournament.year === 1982) {
            eraDivider = (
              <EraDivider 
                id="era-broadcast" 
                title="THE ERA OF LEGENDS" 
                subtitle="Global Superstars and Satellites (1982 - 2006)" 
                year={1982}
              />
            );
          }
          if (tournament.year === 2010) {
            eraDivider = (
              <EraDivider 
                id="era-modern" 
                title="THE MODERN GAME" 
                subtitle="Tactical Mastery and Speed (2010 - 2022)" 
                year={2010}
              />
            );
          }
          if (tournament.year === 2026) {
            eraDivider = (
              <EraDivider 
                id="era-road2026" 
                title="THE ROAD TO 2026" 
                subtitle="Uncharted Frontiers (2026)" 
                year={2026}
              />
            );
          }

          return (
            <div key={tournament.year} className="relative">
              {eraDivider}
              <TournamentChapter 
                tournament={tournament} 
                isLeft={isLeft} 
                onExploreClassicMatch={onExploreClassicMatch} 
                onExploreTournament={onExploreTournament}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
