export interface NationJourneyMilestone {
  year: number;
  result: string;
  players: string[];
  moment: string;
  story: string;
}

export interface NationLegendLegendary {
  name: string;
  years: string;
  role: string;
  myth: string;
  image: string;
}

export interface NationGreatestMatch {
  opponent: string;
  year: number;
  score: string;
  description: string;
  type: 'victory' | 'classic' | 'defeat';
}

export interface NationRecord {
  title: string;
  value: string;
  story: string;
}

export interface NationRivalry {
  rivalId: string;
  rivalName: string;
  title: string;
  story: string;
  decadesCount: string;
}

export interface NationCivilization {
  id: string;
  name: string;
  continent: 'South America' | 'Europe' | 'North America' | 'Africa' | 'Asia';
  titlesCount: number;
  appearancesCount: number;
  motto: string;
  story: string;
  themeColor: string; 
  accentColor: string; 
  secondaryColor: string;
  bgColor: string; 
  spirit: string; 
  goldenEraTitle: string;
  goldenEraStory: string;
  timeline: NationJourneyMilestone[];
  legends: NationLegendLegendary[];
  matches: NationGreatestMatch[];
  records: NationRecord[];
  rivalries: NationRivalry[];
  dynastyLevels: { year: number; level: number }[]; 
}

export const nationsData: NationCivilization[] = [
  {
    id: 'brazil',
    name: 'Brazil',
    continent: 'South America',
    titlesCount: 5,
    appearancesCount: 22,
    motto: 'O País do Futebol',
    spirit: 'Samba-infused flow, unbridled individual genius, and the golden weight of "Joga Bonito".',
    story: 'The ultimate symbol of football of aesthetic purity. Brazil has shaped the world’s football consciousness. From the beaches of Rio to five gold stars, they made football an art form, a religion, and a global celebration.',
    themeColor: 'from-[#EAB308] to-[#16A34A]',
    accentColor: '#D4AF37',
    secondaryColor: '#16A34A',
    bgColor: '#0c1a0c',
    goldenEraTitle: 'The Age of Pelé (1958-1970)',
    goldenEraStory: 'Under the command of the boy king, Pelé, Brazil captured three World Cups in twelve years. Accompanied by magicians like Garrincha, Didi, and Tostão, they played an organic, flowing style that baffled structured defensive systems of Europe.',
    timeline: [
      { year: 1958, result: 'Champions', players: ['Pelé', 'Garrincha', 'Vavá'], moment: '17-year-old Pelé’s masterclass', story: 'A young Pelé scores a stunning hat-trick in the semi-final and a historic brace in the final, establishing Brazil’s world dominance.' },
      { year: 1962, result: 'Champions', players: ['Garrincha', 'Amarildo'], moment: 'Garrincha’s unilateral triumph', story: 'With Pelé injured early, Garrincha rose to play the tournament of his life, dribbling past entire nations to retain the crown.' },
      { year: 1970, result: 'Champions', players: ['Pelé', 'Carlos Alberto', 'Rivellino', 'Jairzinho'], moment: 'The perfect 1970 symphony', story: 'Considered the greatest football squad ever assembled. They won every qualifying and final stage match, scoring iconic team goals.' },
      { year: 1994, result: 'Champions', players: ['Romário', 'Bebeto', 'Dunga'], moment: 'Pasadena penalty drama', story: 'Ending a 24-year drought, Romário’s lethal finishing paired with Bebeto guided standard industrial team to World Cup glory.' },
      { year: 2002, result: 'Champions', players: ['Ronaldo Nazário', 'Ronaldinho', 'Rivaldo'], moment: 'R9’s redemption in Yokohama', story: 'The famous "Three Rs" tore defences apart. Ronaldo scored 8 goals, claiming absolute redemption and the fifth star.' }
    ],
    legends: [
      { name: 'Pelé', years: '1958 - 1970', role: 'Royal King of Football', myth: 'The only person to win three FIFA World Cups. He combined physical grace, supersonic intuition, and clinical finish to write the definitive football gospel.', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Pel%C3%A9_%281966%29.jpg' },
      { name: 'Ronaldo Nazário', years: '1994 - 2006', role: 'O Fenômeno', myth: 'A blend of raw explosive speed, terrifying power, and divine dribbling skill. He resurrected his career after severe knee injuries to conquer the 2002 cup.', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Ronaldo_Fen%C3%B4meno.jpg' }
    ],
    matches: [
      { opponent: 'Italy', year: 1970, score: '4-1', description: 'The absolute pinnacle of beautiful football. Carlos Alberto’s final goal remains the ultimate team masterpiece.', type: 'victory' },
      { opponent: 'Sweden', year: 1958, score: '5-2', description: 'Taking the world crown on European soil, putting on an unmitigated showcase of youthful Samba flair.', type: 'victory' },
      { opponent: 'Uruguay', year: 1950, score: '1-2', description: 'The "Maracanazo". The most traumatic loss in Brazilian history before an official record crowd of nearly 200,000.', type: 'defeat' }
    ],
    records: [
      { title: 'Five-Star Dominance', value: '5 Titles', story: 'The only country to lift the trophy five times, and the only nation to compete in every single tournament since 1930.' },
      { title: 'Golden Legacy scorer', value: '77 Goals', story: 'Pelé remained the top historic talisman of the Seleção on the grandest stage with the highest goals-per-game in final play.' }
    ],
    rivalries: [
      { rivalId: 'argentina', rivalName: 'Argentina', title: 'The Battle for South American Royalty', story: 'Brazilians boast Pele’s beauty and five stars; Argentines wave Maradona’s madness and Messi’s completeness. A high-voltage collision of pride, rhythm, and theological football debate.', decadesCount: '9 Decades' }
    ],
    dynastyLevels: [
      { year: 1930, level: 30 },
      { year: 1950, level: 85 },
      { year: 1958, level: 100 },
      { year: 1962, level: 100 },
      { year: 1970, level: 100 },
      { year: 1982, level: 75 },
      { year: 1994, level: 95 },
      { year: 2002, level: 98 },
      { year: 2014, level: 60 },
      { year: 2022, level: 70 }
    ]
  },
  {
    id: 'germany',
    name: 'Germany',
    continent: 'Europe',
    titlesCount: 4,
    appearancesCount: 20,
    motto: 'Die Mannschaft',
    spirit: 'Unyielding structural precision, machine-like resolve, and a lethal habit of winning when others falter.',
    story: 'The ultimate football architecture. Germany represents competitive longevity, tactical discipline, and mental fortitude. Gary Lineker once noted: "Football is a simple game; 22 men chase a ball for 90 minutes and at the end, the Germans win."',
    themeColor: 'from-[#FFFFFF] to-[#121212]',
    accentColor: '#9CA3AF',
    secondaryColor: '#EF4444',
    bgColor: '#171717',
    goldenEraTitle: 'The Machine / Tournament Monsters (1970-1990)',
    goldenEraStory: 'Germany mastered the world by combining the defensive brilliance of Franz Beckenbauer and the explosive finishing of Gerd Müller. They built an unbreakable squad that played consecutive finals and stopped the most romantic teams in history.',
    timeline: [
      { year: 1954, result: 'Champions', players: ['Fritz Walter', 'Helmut Rahn'], moment: 'The Miracle of Bern', story: 'In torrential rain, Germany defeated Hungary’s legendary "Mighty Magyars" 3-2, rebuilding a nation’s self-esteem after the war.' },
      { year: 1974, result: 'Champions', players: ['Franz Beckenbauer', 'Gerd Müller', 'Paul Breitner'], moment: 'Taming Cruyff’s Total Football', story: 'Beckenbauer’s strategic mastery neutralised the beautiful Dutch systems to claim their second world championship on home soil.' },
      { year: 1990, result: 'Champions', players: ['Lothar Matthäus', 'Andreas Brehme', 'Jürgen Klinsmann'], moment: 'Reunification Redemption in Rome', story: 'A united German state captured the title under the tactical leadership of Matthäus, field-marshalling past Maradona’s Argentina.' },
      { year: 2014, result: 'Champions', players: ['Bastian Schweinsteiger', 'Thomas Müller', 'Mario Götze', 'Philipp Lahm'], moment: '7-1 Belo Horizonte Siege', story: 'A ruthless performance that broke Brazilian culture forever, culminating in Mario Götze’s elegant extra-time final winner.' }
    ],
    legends: [
      { name: 'Franz Beckenbauer', years: '1966 - 1978', role: 'Der Kaiser', myth: 'The commander who invented the modern "Sweeper" (Libero) position. He played through a dislocated shoulder in 1970’s Match of the Century, showing unmatched mental steel.', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Franz_Beckenbauer_1971.jpg' },
      { name: 'Miroslav Klose', years: '2002 - 2014', role: 'The Airborne Assassin', myth: 'A true tournament legend who specialized in peaking on the highest stage. He flipped his way to 16 historical goals, becoming the greatest target-man in World Cup play.', image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Miroslav_Klose_2011.jpg' }
    ],
    matches: [
      { opponent: 'Brazil', year: 2014, score: '7-1', description: 'The most stunning blowout in football history. A masterclass of structural precision in front of a horrified Brazilian crowd.', type: 'victory' },
      { opponent: 'Hungary', year: 1954, score: '3-2', description: 'The legendary "Miracle of Bern". They stopped a 31-match unbeaten streak to write the greatest comeback saga.', type: 'victory' },
      { opponent: 'Italy', year: 1970, score: '3-4', description: 'The "Match of the Century" in Mexico City. Beckenbauer fought with a sling in a five-goal extra-time dramatic duel.', type: 'defeat' }
    ],
    records: [
      { title: 'The Ultimate Target', value: '16 Goals', story: 'Miroslav Klose holds the absolute historical record for the most goals ever scored in the World Cup stages.' },
      { title: 'Consistent Supremacy', value: '8 Finals', story: 'Germany has reached the ultimate final stage more than any other nation in history.' }
    ],
    rivalries: [
      { rivalId: 'netherlands', rivalName: 'Netherlands', title: 'Ideological Border War', story: 'An intense battle of philosophies. The beautiful, freewheeling design of Dutch total football against the ruthless tactical execution of the German block.', decadesCount: '5 Decades' }
    ],
    dynastyLevels: [
      { year: 1930, level: 10 },
      { year: 1954, level: 88 },
      { year: 1966, level: 85 },
      { year: 1974, level: 98 },
      { year: 1982, level: 90 },
      { year: 1990, level: 96 },
      { year: 2002, level: 82 },
      { year: 2014, level: 100 },
      { year: 2018, level: 45 },
      { year: 2022, level: 40 }
    ]
  },
  {
    id: 'argentina',
    name: 'Argentina',
    continent: 'South America',
    titlesCount: 3,
    appearancesCount: 18,
    motto: 'La Albiceleste',
    spirit: 'Fierce passion, divine theatrical drama, and individual saviours carrying a nation’s absolute devotion.',
    story: 'The theater of football. Argentina does not play football; they exist in it. It is a cinematic experience driven by messianic figures, extreme tactical grit, and magical plays that blur raw reality and religious ecstasy.',
    themeColor: 'from-[#7dd3fc] to-[#38bdf8]',
    accentColor: '#38bdf8',
    secondaryColor: '#D4AF37',
    bgColor: '#061a29',
    goldenEraTitle: 'The Age of Maradona (1986-1990)',
    goldenEraStory: 'Decidedly carried by the rebellious genius of Diego Armando Maradona. In 1986, he orchestrated the most single-handed cup-winning conquest in history, producing goals that defined political and athletic narratives forever.',
    timeline: [
      { year: 1978, result: 'Champions', players: ['Mario Kempes', 'Daniel Passarella'], moment: 'Ticker-Tape Blizzard in BA', story: 'Mario Kempes scored twice in the final in a ticker-tape storm to secure their first championship on home soil.' },
      { year: 1986, result: 'Champions', players: ['Diego Maradona', 'Jorge Valdano', 'Jorge Burruchaga'], moment: 'The Cosmic Kite over Azteca', story: 'Maradona’s infamous "Hand of God" and sublime "Goal of the Century" against England paved the path to absolute glory.' },
      { year: 1990, result: 'Runner-Up', players: ['Diego Maradona', 'Sergio Goycochea'], moment: 'Heroic penalty defiance', story: 'Goycochea’s penalty-saving miracles against Italy and Yugoslavia dragged a wounded, bleeding squad to the final.' },
      { year: 2014, result: 'Runner-Up', players: ['Lionel Messi', 'Javier Mascherano'], moment: 'Maracanã heartbreak', story: 'Argentina battled valiantly to the final step in Rio, only to be denied in the dying minutes of extra time.' },
      { year: 2022, result: 'Champions', players: ['Lionel Messi', 'Ángel Di María', 'Emiliano Martínez'], moment: 'The Greatest Final Ever Played', story: 'Messi scored twice and Emiliano Martínez pulled off a 123rd-minute miraculous save to complete football’s ultimate epic.' }
    ],
    legends: [
      { name: 'Diego Maradona', years: '1982 - 1994', role: 'El Pibe de Oro (Golden Boy)', myth: 'A mythical figure of untamed genius. He captured the imagination of the planet in 1986 with supernatural plays and combative charisma that defied world empires.', image: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Diego_Maradona_1986.jpg' },
      { name: 'Lionel Messi', years: '2006 - 2022', role: 'D10S Reincarnate', myth: 'The quiet titan of structural precision. He completed football by carrying the weight of Argentina to lift the 2022 trophy in Qatar, winning two World Cup Golden Balls in his tenure.', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg' }
    ],
    matches: [
      { opponent: 'France', year: 2022, score: '3-3 (4-2 p)', description: 'Widely called the greatest game in public television history. An operatic cycle of goals, penalty saves, and Messi’s ultimate triumph.', type: 'victory' },
      { opponent: 'England', year: 1986, score: '2-1', description: 'The peak historical crossroads. In four minutes, Maradona combined street cunning and celestial beauty to defeat the British.', type: 'victory' },
      { opponent: 'West Germany', year: 1990, score: '0-1', description: 'A raw, dramatic defeat in Rome, ending with Maradona crying on the silver platform after a late disputed penalty.', type: 'defeat' }
    ],
    records: [
      { title: 'The Ultimate Captain', value: '26 Appearances', story: 'Lionel Messi holds the ultimate tournament record for the most World Cup matches played by any human.' },
      { title: 'Penalty Execution Wall', value: '11 MOTM Awards', story: 'No player has ever accrued as many official Man of the Match awards in final play as Lionel Messi.' }
    ],
    rivalries: [
      { rivalId: 'brazil', rivalName: 'Brazil', title: 'Battle for South American Royalty', story: 'The ultimate stylistic and cultural civil war. Pelé vs Maradona, Samba vs Tango, Rio beaches vs Buenos Aires concrete.', decadesCount: '9 Decades' }
    ],
    dynastyLevels: [
      { year: 1930, level: 75 },
      { year: 1950, level: 10 },
      { year: 1978, level: 95 },
      { year: 1986, level: 100 },
      { year: 1990, level: 85 },
      { year: 1998, level: 65 },
      { year: 2006, level: 70 },
      { year: 2014, level: 90 },
      { year: 2018, level: 50 },
      { year: 2022, level: 100 }
    ]
  },
  {
    id: 'italy',
    name: 'Italy',
    continent: 'Europe',
    titlesCount: 4,
    appearancesCount: 18,
    motto: 'Gli Azzurri',
    spirit: 'Flawless defensive artistry, tactical intelligence, and a stoic ability to thrive under severe national pressure.',
    story: 'The birthplace of tactical football. Italy turned defending into high classic art. While other cultures celebrated scoring, Italy built monuments to the clean sheet—weaving blockades of "Catenaccio" with counter-attacks that struck with surgical lethality.',
    themeColor: 'from-[#1D4ED8] to-[#1E3A8A]',
    accentColor: '#1D4ED8',
    secondaryColor: '#D4AF37',
    bgColor: '#09152b',
    goldenEraTitle: 'The Pre-War Empire & Pozzo’s Reign (1934-1938)',
    goldenEraStory: 'Vittorio Pozzo’s tactical genius designed back-to-back championships under immense geopolitical strain. They operated with ruthless conditioning, marking systems, and clinical executions that established Italy’s early gold standard.',
    timeline: [
      { year: 1934, result: 'Champions', players: ['Giuseppe Meazza', 'Angelo Schiavio'], moment: 'Pozzo’s home triumph', story: 'Italy ground out victories against Austria and Czechoslovakia to claim their first title under intense physical play.' },
      { year: 1938, result: 'Champions', players: ['Giuseppe Meazza', 'Silvio Piola'], moment: 'Parisian defense of the realm', story: 'Silvio Piola scored double in final against Hungary to secure Pozzo’s legacy as the only coach to defend the World Cup successfully.' },
      { year: 1982, result: 'Champions', players: ['Paolo Rossi', 'Dino Zoff', 'Claudio Gentile'], moment: 'Gentile’s shadow on Maradona', story: 'Unfancied and surrounded by critics, they beat Brazil and West Germany behind Paolo Rossi’s explosive redemption hat-trick.' },
      { year: 2006, result: 'Champions', players: ['Fabio Cannavaro', 'Andrea Pirlo', 'Gianluigi Buffon', 'Marco Materazzi'], moment: 'The Berlin Wall of Cannavaro', story: 'Conceding only two goals in the entire tournament (an own goal and a penalty), Cannavaro marshalled a historic defensive monument.' }
    ],
    legends: [
      { name: 'Giuseppe Meazza', years: '1934 - 1938', role: 'The First Superstar', myth: 'A player of sublime technique, elegant stroll, and dead-ball precision. He captained Pozzo’s grand army and scored the famous falling-shorts penalty in 1938.', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Meazza_Mondiale_1934.jpg' },
      { name: 'Fabio Cannavaro', years: '1998 - 2006', role: 'The Golden Defender', myth: 'The pocket Hercules who proved size does not register in headers. His performance in 2006 remains the benchmark for world defensive play, earning him the FIFA Player of the Year award.', image: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Fabio_Cannavaro.png' }
    ],
    matches: [
      { opponent: 'Germany', year: 2006, score: '2-0 (aet)', description: 'Two late, dramatic extra-time goals by Grosso and Del Piero in Dortmund broke German hearts in legendary fashion.', type: 'victory' },
      { opponent: 'Brazil', year: 1982, score: '3-2', description: 'The day beautiful football died, or the day Italian cynicism became high art. Rossi’s hat-trick shocked Brazil’s class of 82.', type: 'victory' },
      { opponent: 'Brazil', year: 1994, score: '0-0 (2-3 p)', description: 'A tragic final decided in Pasadena’s dry heat, where Roberto Baggio’s skyward penalty sent the crown to Brazil.', type: 'defeat' }
    ],
    records: [
      { title: 'The Iron Curtain', value: '517 Minutes', story: 'Goalkeeper Walter Zenga went 517 consecutive minutes without conceding a goal in 1990, an unbroken record.' },
      { title: 'Defensive Masterclass', value: '2 Conceded', story: 'In 2006, Italy lifted the World Cup conceding a historic-low two goals: an own goal and a penalty kick.' }
    ],
    rivalries: [
      { rivalId: 'france', rivalName: 'France', title: 'The Alps Derby', story: 'A geographic and philosophical duel. Masterful Italian structure versus artistic French flair. Highlighted by 1998/2006 penalty shootouts and Zidane’s historic final exit.', decadesCount: '4 Decades' }
    ],
    dynastyLevels: [
      { year: 1930, level: 40 },
      { year: 1934, level: 100 },
      { year: 1938, level: 100 },
      { year: 1970, level: 85 },
      { year: 1982, level: 98 },
      { year: 1990, level: 80 },
      { year: 1994, level: 92 },
      { year: 2006, level: 99 },
      { year: 2018, level: 20 },
      { year: 2022, level: 25 }
    ]
  },
  {
    id: 'france',
    name: 'France',
    continent: 'Europe',
    titlesCount: 2,
    appearancesCount: 16,
    motto: 'Les Bleus',
    spirit: 'Multicultural brilliance, explosive transition speed, and a legacy of producing legendary creative artists.',
    story: 'The rise of a football empire. France pivoted from romantic losers in the Platini era to the most dominant physical and tactical pipeline of modern football. Combining diverse cultural backgrounds, French football balances elegance and explosive athleticism.',
    themeColor: 'from-[#2563EB] to-[#DC2626]',
    accentColor: '#3B82F6',
    secondaryColor: '#EF4444',
    bgColor: '#111827',
    goldenEraTitle: 'The Era of Zidane (1998-2006)',
    goldenEraStory: 'Under the divine movement of Zinedine Zidane, France captured their first title at home in 1998 with two crushing headers in the final. They redefined European football through robust midfield dominance and defensive strength.',
    timeline: [
      { year: 1958, result: 'Third Place', players: ['Just Fontaine', 'Raymond Kopa'], moment: 'Fontaine’s 13-goal blitz', story: 'A high-velocity performance where Just Fontaine scored 13 goals in 6 matches, a record that remains completely secure.' },
      { year: 1982, result: 'Fourth Place', players: ['Michel Platini', 'Alain Giresse'], moment: 'Seville Tragedy', story: 'The legendary semi-final shootout loss to Germany after Battiston was knocked unconscious, defining French romantic tragic lore.' },
      { year: 1998, result: 'Champions', players: ['Zinedine Zidane', 'Didier Deschamps', 'Lilian Thuram'], moment: 'Zidane’s Coronation', story: 'Zizou’s two headers against Brazil at Stade de France united a nation and delivered their maiden World Cup.' },
      { year: 2006, result: 'Runner-Up', players: ['Zinedine Zidane', 'Thierry Henry', 'Patrick Vieira'], moment: 'The Berlin Headbutt', story: 'Zidane carried France past Spain, Brazil, and Portugal, only to exit in extra-time after striking Marco Materazzi.' },
      { year: 2018, result: 'Champions', players: ['Kylian Mbappé', 'Antoine Griezmann', 'Paul Pogba', 'N’Golo Kanté'], moment: 'Mbappé’s Moscow Speedrun', story: 'A young Kylian Mbappé sprinted past defenses as a clinical French team cruised to their second star in Moscow.' }
    ],
    legends: [
      { name: 'Zinedine Zidane', years: '1998 - 2006', role: 'Le Magicien', myth: 'A ballet dancer in football cleats. His spatial awareness, technical touch, and performance in critical finals turned him into a national monument.', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Zinedine_Zidane_photo.jpg' },
      { name: 'Kylian Mbappé', years: '2018 - Present', role: 'The Speed of Light', myth: 'An absolute cheetah who emerged in 2018 and scored a jaw-dropping final score hat-trick in 2022, becoming the greatest active threat in world sports.', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Kylian_Mbapp%C3%A9_-_France_vs._Poland_-_FIFA_World_Cup_2022.jpg' }
    ],
    matches: [
      { opponent: 'Brazil', year: 1998, score: '3-0', description: 'The absolute victory that changed French culture. Zidane’s towering performance shattered Ronaldo’s Brazil.', type: 'victory' },
      { opponent: 'Argentina', year: 2018, score: '4-3', description: 'A wild, breathless classic round of 16 match where Pavard’s half-volley and Mbappé’s speed announced a change in world order.', type: 'victory' },
      { opponent: 'Italy', year: 2006, score: '1-1 (3-5 p)', description: 'Zidane’s parting tragedy. He scored a panenka penalty, struck Materazzi, and watched Italy lift the cup from the locker room.', type: 'defeat' }
    ],
    records: [
      { title: 'The Bullet Proof Record', value: '13 Goals', story: 'Just Fontaine scored 13 goals in 1958, the most goals ever scored in a single World Cup tournament.' },
      { title: 'The Double Legend', value: 'Deschamps Legacy', story: 'Didier Deschamps became one of only three men to lift the World Cup as both a captain (1998) and a manager (2018).' }
    ],
    rivalries: [
      { rivalId: 'italy', rivalName: 'Italy', title: 'The Battle of the European elite', story: 'Highlighting dramatic finals and cross-border pride. The 1998 shootout and the 2006 headbutt saga locked both nations in an eternal classical drama.', decadesCount: '4 Decades' }
    ],
    dynastyLevels: [
      { year: 1930, level: 20 },
      { year: 1958, level: 75 },
      { year: 1982, level: 80 },
      { year: 1986, level: 78 },
      { year: 1998, level: 100 },
      { year: 2002, level: 35 },
      { year: 2006, level: 92 },
      { year: 2010, level: 25 },
      { year: 2018, level: 100 },
      { year: 2022, level: 95 }
    ]
  },
  {
    id: 'uruguay',
    name: 'Uruguay',
    continent: 'South America',
    titlesCount: 2,
    appearancesCount: 14,
    motto: 'La Garra Charrúa',
    spirit: 'Indomitable defiance, mythical street cunning, and a small nation’s giant fist conquering empires.',
    story: 'The cradle of world conquest. With a tiny population of only 3 million, Uruguay achieved the first gold standard. Their spirit is "La Garra Charrúa" — an ancient warrior grit that enables them to bite, claw, and conquer giants against all logical odds.',
    themeColor: 'from-[#38bdf8] to-[#0284c7]',
    accentColor: '#38bdf8',
    secondaryColor: '#D4AF37',
    bgColor: '#02182b',
    goldenEraTitle: 'The Golden Founders (1930-1950)',
    goldenEraStory: 'Uruguay hosted and won the inaugural tournament in 1930, and followed it up with the most shocking heist in cultural history—the 1950 Maracanazo. For twenty years, they stood as the absolute lords of competitive courage.',
    timeline: [
      { year: 1930, result: 'Champions', players: ['José Nasazzi', 'Hector Castro'], moment: 'The First Coronation', story: 'Down 1-2 in the final to Argentina, the hosts rallied behind Captain Nasazzi to win 4-2 with the heavy ball.' },
      { year: 1950, result: 'Champions', players: ['Obdulio Varela', 'Alcides Ghiggia'], moment: 'Silencing the Maracanã', story: 'Trailing 0-1 to Brazil in front of 200,000 in Maracanã, Captain Varela told his team "Do not think about the crowd". They won 2-1.' },
      { year: 1970, result: 'Fourth Place', players: ['Ladislao Mazurkiewicz'], moment: 'Semi-final grit', story: 'Battling to the semi-finals, they pushed Pele’s Brazil to the limit in a physically demanding battle.' },
      { year: 2010, result: 'Fourth Place', players: ['Diego Forlán', 'Luis Suárez'], moment: 'The Hand of Johannesburg & Forlán’s Jabulani', story: 'Luis Suárez’s red-card handball block on the line in the dying seconds against Ghana allowed Uruguay to win the shootout.' }
    ],
    legends: [
      { name: 'Obdulio Varela', years: '1950 - 1954', role: 'El Negro Jefe (The Black Chief)', myth: 'One of the greatest leaders in human sport. In 1950, he delayed the game after Brazil scored, walked to the referee, and killed the crowd’s momentum before pushing his men forward.', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Obdulio_Varela_1950.jpg' },
      { name: 'Diego Forlán', years: '2002 - 2014', role: 'The Jabulani Wizard', myth: 'The only forward who completely tamed the chaotic, spinning 2010 "Jabulani" ball. He curled and dipped shots from 40 yards, scoring 5 goals and claiming Golden Ball honors.', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Diego_Forl%C3%A1n_2010.jpg' }
    ],
    matches: [
      { opponent: 'Brazil', year: 1950, score: '2-1', description: 'The absolute heist in Rio. Ghiggia’s late winner sent Brazil into decades of national depression.', type: 'victory' },
      { opponent: 'Argentina', year: 1930, score: '4-2', description: 'The inaugural battle. A high-voltage game played with two separate balls (one for each half) to determine world supremacy.', type: 'victory' },
      { opponent: 'Ghana', year: 2010, score: '1-1 (4-2 p)', description: 'One of the most controversial matches ever played. Suárez blocked a goal with his hands, got sent off, and celebrated as Ghana missed the penalty.', type: 'victory' }
    ],
    records: [
      { title: 'The Perfect Start', value: '100% Final Win', story: 'Uruguay competed in two World Cup finals (1930, 1950) and won both, maintaining a flawless crown record.' },
      { title: 'Ghiggia’s Gold Streak', value: 'Every Game goal', story: 'Alcides Ghiggia is one of the rare players who scored in every single match of a World Cup campaign (1950).' }
    ],
    rivalries: [
      { rivalId: 'argentina', rivalName: 'Argentina', title: 'Clásico del Río de la Plata', story: 'The oldest international match on earth. Separated by a river, both nations have battled for regional, political, and football power since the 1900s.', decadesCount: '10 Decades' }
    ],
    dynastyLevels: [
      { year: 1930, level: 100 },
      { year: 1950, level: 100 },
      { year: 1954, level: 82 },
      { year: 1970, level: 75 },
      { year: 1990, level: 45 },
      { year: 2002, level: 40 },
      { year: 2010, level: 85 },
      { year: 2014, level: 68 },
      { year: 2018, level: 70 },
      { year: 2022, level: 45 }
    ]
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    continent: 'Europe',
    titlesCount: 0,
    appearancesCount: 11,
    motto: 'Oranje',
    spirit: 'Fluid spatial geometry ("Total Football"), rebellious tactical arrogance, and a tragic legacy of beautiful near-misses.',
    story: 'The uncrowned kings. The Netherlands revolutionized football through Rinus Michels’ and Johan Cruyff’s "Total Football" — a system where any outfield player could switch roles on the fly. They built an aesthetic masterwork that captured the heart of the world, despite losing three tragic finals.',
    themeColor: 'from-[#f97316] to-[#ea580c]',
    accentColor: '#f97316',
    secondaryColor: '#EA580c',
    bgColor: '#1c0f06',
    goldenEraTitle: 'The Symphony of Total Football (1974-1978)',
    goldenEraStory: 'Under Johan Cruyff’s magnetic leadership, the Orangemen dismantled conventional structures in 1974. They passed opponents into dizzy spirals of space exploration, establishing an intellectual blueprint that shaped modern football forever.',
    timeline: [
      { year: 1974, result: 'Runner-Up', players: ['Johan Cruyff', 'Johan Neeskens', 'Ruud Krol'], moment: 'The Cruyff Turn', story: 'The Dutch stunned the globe with Total Football, scoring in the final before West Germany can even touch the ball, only to succumb 1-2.' },
      { year: 1978, result: 'Runner-Up', players: ['Rob Rensenbrink', 'Ruud Krol'], moment: 'Buenos Aires post-drama', story: 'Playing without Cruyff, they reached the final and hit the post in the 90th minute, losing in extra-time to host Argentina.' },
      { year: 1998, result: 'Fourth Place', players: ['Dennis Bergkamp', 'Patrick Kluivert', 'Frank de Boer'], moment: 'Bergkamp’s Marseille touch', story: 'Dennis Bergkamp scored one of the most mechanically perfect goals in history in the 90th minute to defeat Argentina.' },
      { year: 2010, result: 'Runner-Up', players: ['Arjen Robben', 'Wesley Sneijder', 'Mark van Bommel'], moment: 'The Johannesburg standoff', story: 'Arjen Robben was denied in a one-on-one with Casillas, as Spain secured their winner in a tense, brutal battle.' },
      { year: 2014, result: 'Third Place', players: ['Arjen Robben', 'Robin van Persie', 'Louis van Gaal'], moment: 'The Flying Dutchman', story: 'Robin van Persie scored a breathtaking gravity-defying header as they dismantled Spain 5-1.' }
    ],
    legends: [
      { name: 'Johan Cruyff', years: '1974', role: 'The Pythagoras in Cleats', myth: 'A revolutionary general of spatial science. His "Cruyff Turn" split opposing defenders, and his intellectual control of the pitch created the Barca/Dutch legacy.', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Cruijff_1974.jpg' },
      { name: 'Dennis Bergkamp', years: '1994 - 1998', role: 'The Architect', myth: 'A man whose touch could tame falling objects from space. His iconic goal against Argentina in 1998—receiving a 60-yard pass, turning past Ayala, and scoring in three touches—stands as pure high-art.', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Dennis_Bergkamp_1993.jpg' }
    ],
    matches: [
      { opponent: 'Spain', year: 2014, score: '5-1', description: 'The ultimate tactical revenge. Van Persie’s soaring bird-header dismantled Spain’s reigning generation.', type: 'victory' },
      { opponent: 'Argentina', year: 1998, score: '2-1', description: 'A dramatic quarterfinal settled by Bergkamp’s historic piece of individual genius in the final minute.', type: 'victory' },
      { opponent: 'West Germany', year: 1974, score: '1-2', description: 'The tragic final in Munich where the most gorgeous football system was stopped by German industrial resilience.', type: 'defeat' }
    ],
    records: [
      { title: 'The Tragic Milestone', value: '3 Finals Played', story: 'The Netherlands holds the ultimate record for reaching the most World Cup finals (1974, 1978, 2010) without winning.' },
      { title: 'Explosive Revival', value: '15 Unbeaten', story: 'Van Gaal maintained a 15-game undefeated streak in general play during his two tournament management phases.' }
    ],
    rivalries: [
      { rivalId: 'germany', rivalName: 'Germany', title: 'Philosophical Border War', story: 'An intellectual rivalry over who owns the soul of modern play. The Dutch style focuses on individual shape-shifting while Germans focus on team structural precision.', decadesCount: '5 Decades' }
    ],
    dynastyLevels: [
      { year: 1930, level: 5 },
      { year: 1974, level: 98 },
      { year: 1978, level: 92 },
      { year: 1990, level: 65 },
      { year: 1994, level: 75 },
      { year: 1998, level: 88 },
      { year: 2006, level: 55 },
      { year: 2010, level: 90 },
      { year: 2014, level: 89 },
      { year: 2022, level: 76 }
    ]
  },
  {
    id: 'england',
    name: 'England',
    continent: 'Europe',
    titlesCount: 1,
    appearancesCount: 16,
    motto: 'The Three Lions',
    spirit: 'Relentless historic hype, physical aerial dominance, and an internal burden of living up to 1966 lore.',
    story: 'The split personality of football. As the inventors of the game, England lives inside an endless cycle of historic projection and tragic collapses. When they won on home soil in 1966 behind Hurst’s hat-trick, they created a benchmark that has burdened every generation since.',
    themeColor: 'from-[#FFFFFF] to-[#1E3A8A]',
    accentColor: '#1E3A8A',
    secondaryColor: '#EF4444',
    bgColor: '#091523',
    goldenEraTitle: 'The Class of ’66 & Ramsey’s Men (1966-1970)',
    goldenEraStory: 'Sir Alf Ramsey designed the "Wingless Wonders" — a highly structured, hard-working unit that focused on central solidity, Bobby Charlton’s explosive shots, and Bobby Moore’s flawless defensive reads.',
    timeline: [
      { year: 1966, result: 'Champions', players: ['Bobby Moore', 'Bobby Charlton', 'Geoff Hurst'], moment: 'They think it’s all over... it is now!', story: 'England conquered West Germany 4-2 in extra-time, marked by Hurst’s disputed crossbar bounce and pitch-invasion goal.' },
      { year: 1970, result: 'Quarter-Final', players: ['Bobby Moore', 'Bobby Charlton'], moment: 'The Golden Save of Banks', story: 'England pushed Pele’s Brazil in Guadalajara, marked by Gordon Banks’ legendary save of Pelé’s downward header.' },
      { year: 1990, result: 'Fourth Place', players: ['Gary Lineker', 'Paul Gascoigne'], moment: 'Gazza’s Tears in Turin', story: 'A young Gascoigne wept as he received a yellow card banning him from the final, culminating in penalty shootout heartbreak against Germany.' },
      { year: 2018, result: 'Fourth Place', players: ['Harry Kane', 'Kieran Trippier'], moment: 'The Russian Renaissance', story: 'A young squad surprised the country by cruising to the semi-finals, briefly singing "It’s Coming Home" to the world.' }
    ],
    legends: [
      { name: 'Bobby Moore', years: '1962 - 1970', role: 'The Flawless Captain', myth: 'A defender who did not tackle; he intercepted. Pelé called him the cleanest, fairest, and most intelligent defender he ever played against.', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Bobby_Moore_with_the_Jules_Rimet_trophy.jpg' },
      { name: 'Bobby Charlton', years: '1958 - 1970', role: 'The Heart of the Nation', myth: 'Survivor of the Munich air disaster, Charlton combined incredible physical stamina, thunderbolt long-range shooting, and dignity to become England’s spiritual talisman.', image: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Bobby_Charlton_1968.jpg' }
    ],
    matches: [
      { opponent: 'West Germany', year: 1966, score: '4-2 (aet)', description: 'The absolute high point. Hurst scored a hat-trick including the "Russian Linesman-approved" crossbar bounce.', type: 'victory' },
      { opponent: 'Argentina', year: 1986, score: '1-2', description: 'Maradona’s hand and divine feet knocked England out in one of the most politically charged matches of the century.', type: 'defeat' },
      { opponent: 'West Germany', year: 1990, score: '1-1 (3-4 p)', description: 'The first chapter of England’s penalty curse in Turin. Gascoigne’s tears became the symbol of a generation.', type: 'defeat' }
    ],
    records: [
      { title: 'The Ultimate Hat-Trick', value: '3 Goals in Final', story: 'Geoff Hurst remained the only player in world history to score a hat-trick in a World Cup final match for 56 years.' },
      { title: 'Golden Boot Talisman', value: '6 Goals', story: 'Gary Lineker (1986) and Harry Kane (2018) both secured Golden Boots, leading England’s historical scoring charts.' }
    ],
    rivalries: [
      { rivalId: 'argentina', rivalName: 'Argentina', title: 'The Hand vs The Crown', story: 'A rivalry built on geopolitical conflict, Beckham red cards, and Maradona’s hand. Every match resembles a battle for absolute sovereign honor.', decadesCount: '4 Decades' }
    ],
    dynastyLevels: [
      { year: 1930, level: 5 },
      { year: 1954, level: 45 },
      { year: 1966, level: 100 },
      { year: 1970, level: 90 },
      { year: 1982, level: 60 },
      { year: 1986, level: 75 },
      { year: 1990, level: 85 },
      { year: 2002, level: 70 },
      { year: 2018, level: 82 },
      { year: 2022, level: 80 }
    ]
  }
];
