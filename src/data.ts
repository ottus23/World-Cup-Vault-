export interface Tournament {
  year: number;
  host: string;
  champion: string;
  runnerUp: string;
  historicMoment: string;
  keyPlayer: string;
  image: string; // url or placeholder
  finalScore: string;
  story: string;
}

export const tournaments: Tournament[] = [
  {
    year: 1930,
    host: "Uruguay",
    champion: "Uruguay",
    runnerUp: "Argentina",
    historicMoment: "The First Final",
    keyPlayer: "Guillermo Stábile",
    finalScore: "4-2",
    story:
      "The inaugural FIFA World Cup saw the hosts emerge victorious in front of 93,000 spectators.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/Uruguay_1930_world_cup_champion.jpg",
  },
  {
    year: 1934,
    host: "Italy",
    champion: "Italy",
    runnerUp: "Czechoslovakia",
    historicMoment: "Pozzo’s Masterclass",
    keyPlayer: "Giuseppe Meazza",
    finalScore: "2-1 (aet)",
    story:
      "Vittorio Pozzo guided Italy to their first title in a physically demanding tournament on home soil.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/30/Italy_1934_champion.jpg",
  },
  {
    year: 1938,
    host: "France",
    champion: "Italy",
    runnerUp: "Hungary",
    historicMoment: "Back-to-Back Glory",
    keyPlayer: "Leônidas",
    finalScore: "4-2",
    story:
      "Italy became the first nation to successfully defend their title under the shadow of looming global conflict.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/14/Italy_1938_champion.jpg",
  },
  {
    year: 1950,
    host: "Brazil",
    champion: "Uruguay",
    runnerUp: "Brazil",
    historicMoment: "The Maracanazo",
    keyPlayer: "Obdulio Varela",
    finalScore: "2-1",
    story:
      "In the most shocking upset in football history, Uruguay silenced a record crowd of 199,854 at the Maracanã.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1b/Obdulio_Varela_1950.jpg",
  },
  {
    year: 1954,
    host: "Switzerland",
    champion: "West Germany",
    runnerUp: "Hungary",
    historicMoment: "The Miracle of Bern",
    keyPlayer: "Ferenc Puskás",
    finalScore: "3-2",
    story:
      "West Germany achieved the impossible, coming back against the heavily favored Mighty Magyars in driving rain.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Deutschland_Kader_1954.jpg",
  },
  {
    year: 1958,
    host: "Sweden",
    champion: "Brazil",
    runnerUp: "Sweden",
    historicMoment: "A King is Born",
    keyPlayer: "Pelé",
    finalScore: "5-2",
    story:
      "A 17-year-old Pelé announced himself to the world, leading Brazil to their first World Cup triumph with dazzling skill.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/52/Brazilian_team_1958_champions.jpg",
  },
  {
    year: 1962,
    host: "Chile",
    champion: "Brazil",
    runnerUp: "Czechoslovakia",
    historicMoment: "Garrincha’s Show",
    keyPlayer: "Garrincha",
    finalScore: "3-1",
    story:
      "With Pelé injured early, Garrincha stepped up to conduct an unplayable symphony that secured back-to-back titles.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b3/Brazil_1962_champion.jpg",
  },
  {
    year: 1966,
    host: "England",
    champion: "England",
    runnerUp: "West Germany",
    historicMoment: "They Think It’s All Over",
    keyPlayer: "Bobby Moore",
    finalScore: "4-2 (aet)",
    story:
      "Football came home as Geoff Hurst scored a controversial hat-trick in a final forever etched in English folklore.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/Bobby_Moore_with_the_Jules_Rimet_trophy.jpg",
  },
  {
    year: 1970,
    host: "Mexico",
    champion: "Brazil",
    runnerUp: "Italy",
    historicMoment: "The Beautiful Team",
    keyPlayer: "Pelé",
    finalScore: "4-1",
    story:
      "Often considered the greatest team of all time, the legendary 1970 Brazil squad reached the pinnacle of football aesthetics.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/57/Brazil_1970_champion.jpg",
  },
  {
    year: 1974,
    host: "West Germany",
    champion: "West Germany",
    runnerUp: "Netherlands",
    historicMoment: "Total Football vs Efficiency",
    keyPlayer: "Johan Cruyff",
    finalScore: "2-1",
    story:
      'The Dutch brought "Total Football" to the world, but West German efficiency prevailed in an iconic ideological clash.',
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/46/West_Germany_1974_champions.jpg",
  },
  {
    year: 1978,
    host: "Argentina",
    champion: "Argentina",
    runnerUp: "Netherlands",
    historicMoment: "Ticker Tape in Buenos Aires",
    keyPlayer: "Mario Kempes",
    finalScore: "3-1 (aet)",
    story:
      "Amidst a sea of ticker tape, Mario Kempes inspired the host nation to their maiden World Cup victory.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/36/Argentina_1978_champion.jpg",
  },
  {
    year: 1982,
    host: "Spain",
    champion: "Italy",
    runnerUp: "West Germany",
    historicMoment: "Rossi’s Redemption",
    keyPlayer: "Paolo Rossi",
    finalScore: "3-1",
    story:
      "Paolo Rossi returned from suspension to claim the Golden Boot and lead the Azzurri to an unexpected triumph.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1a/Italy_1982_champion.jpg",
  },
  {
    year: 1986,
    host: "Mexico",
    champion: "Argentina",
    runnerUp: "West Germany",
    historicMoment: "The Hand of God",
    keyPlayer: "Diego Maradona",
    finalScore: "3-2",
    story:
      "Diego Maradona dominated the tournament like no player before or since, cementing his status as a football god.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/af/Maradona_trophy_1986.jpg",
  },
  {
    year: 1990,
    host: "Italy",
    champion: "West Germany",
    runnerUp: "Argentina",
    historicMoment: "Nights in Rome",
    keyPlayer: "Lothar Matthäus",
    finalScore: "1-0",
    story:
      "A unified German team ground out a final victory in a tournament defined by tight defenses and dramatic penalty shootouts.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b2/West_Germany_1990_champion.jpg",
  },
  {
    year: 1994,
    host: "USA",
    champion: "Brazil",
    runnerUp: "Italy",
    historicMoment: "Baggio’s Miss",
    keyPlayer: "Romário",
    finalScore: "0-0 (3-2 p)",
    story:
      "The first final decided by penalties ended with Roberto Baggio's tragic miss in the sprawling American stadiums.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/1c/Brazil_1994_champion.jpg",
  },
  {
    year: 1998,
    host: "France",
    champion: "France",
    runnerUp: "Brazil",
    historicMoment: "Zidane’s Headers",
    keyPlayer: "Zinedine Zidane",
    finalScore: "3-0",
    story:
      "Zinedine Zidane rose to the occasion with two towering headers, securing World Cup glory for the hosts on home soil.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8c/France_1998_champion.jpg",
  },
  {
    year: 2002,
    host: "Japan/South Korea",
    champion: "Brazil",
    runnerUp: "Germany",
    historicMoment: "Ronaldo’s Redemption",
    keyPlayer: "Ronaldo",
    finalScore: "2-0",
    story:
      "After the heartbreak of 1998, Ronaldo claimed his redemption by leading Brazil to an unprecedented pentacampeonato.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/db/Brazil_2002_champion.jpg",
  },
  {
    year: 2006,
    host: "Germany",
    champion: "Italy",
    runnerUp: "France",
    historicMoment: "The Headbutt",
    keyPlayer: "Fabio Cannavaro",
    finalScore: "1-1 (5-3 p)",
    story:
      "A dramatic final marked by Zidane's infamous headbutt saw Italy masterfully claim their fourth world title via shootout.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/dc/Italy_2006_champion.jpg",
  },
  {
    year: 2010,
    host: "South Africa",
    champion: "Spain",
    runnerUp: "Netherlands",
    historicMoment: "Iniesta’s Strike",
    keyPlayer: "Andrés Iniesta",
    finalScore: "1-0 (aet)",
    story:
      "Tiki-taka conquered the world as Spain passed their way to their first star, crowned by Iniesta's extra-time winner.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/bf/Spain_2010_champion.jpg",
  },
  {
    year: 2014,
    host: "Brazil",
    champion: "Germany",
    runnerUp: "Argentina",
    historicMoment: "7-1",
    keyPlayer: "Thomas Müller",
    finalScore: "1-0 (aet)",
    story:
      "Following the historic 7-1 dismantling of the hosts, Germany shattered Argentine hearts in extra time at the Maracanã.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3a/Germany_2014_champion.jpg",
  },
  {
    year: 2018,
    host: "Russia",
    champion: "France",
    runnerUp: "Croatia",
    historicMoment: "Mbappé Emerges",
    keyPlayer: "Luka Modrić",
    finalScore: "4-2",
    story:
      "A young Kylian Mbappé announced himself on the grandest stage, as a cohesive French squad dismantled the competition.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/60/France_2018_champion.jpg",
  },
  {
    year: 2022,
    host: "Qatar",
    champion: "Argentina",
    runnerUp: "France",
    historicMoment: "Messi Completes Football",
    keyPlayer: "Lionel Messi",
    finalScore: "3-3 (4-2 p)",
    story:
      "In perhaps the greatest final ever played, Lionel Messi finally lifted the last trophy eluding him, cementing his immortal legacy.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f6/Argentina_2022_champion.jpg",
  },
];

export interface Legend {
  id: string;
  name: string;
  nation: string;
  era: string;
  quote: string;
  image: string;
  legacyNumber: string;
  legacyLabel: string;
  legacyStatement: string;
  worldCupJourney: number[];
  hallOfAchievements: string[];
  eraStyle: "vintage" | "contrast" | "editorial" | "modern";
}

export const legends: Legend[] = [
  {
    id: "pele",
    name: "Pelé",
    nation: "Brazil",
    era: "1958-1970",
    quote:
      "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f3/Pel%C3%A9_%281966%29.jpg",
    legacyNumber: "3",
    legacyLabel: "World Cup Titles",
    legacyStatement: "The King of Football.",
    worldCupJourney: [1958, 1962, 1966, 1970],
    hallOfAchievements: [
      "3x World Cup Winner",
      "Best Young Player 1958",
      "Golden Ball 1970",
      "TIME Player of the Century",
    ],
    eraStyle: "vintage",
  },
  {
    id: "maradona",
    name: "Diego Maradona",
    nation: "Argentina",
    era: "1982-1994",
    quote:
      "I am Maradona, who makes goals, who makes mistakes. I can take it all, I have shoulders big enough to fight with everybody.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/54/Diego_Maradona_1986.jpg",
    legacyNumber: "86",
    legacyLabel: "The Year of D10S",
    legacyStatement: "The Magician of Mexico 86.",
    worldCupJourney: [1982, 1986, 1990, 1994],
    hallOfAchievements: [
      "World Cup Winner 1986",
      "Golden Ball 1986",
      "Goal of the Century",
      "World Cup Runner-up 1990",
    ],
    eraStyle: "contrast",
  },
  {
    id: "cruyff",
    name: "Johan Cruyff",
    nation: "Netherlands",
    era: "1974",
    quote:
      "Playing football is very simple, but playing simple football is the hardest thing there is.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e0/Cruijff_1974.jpg",
    legacyNumber: "14",
    legacyLabel: "Revolutionary Icons",
    legacyStatement: "The Architect of Total Football.",
    worldCupJourney: [1974],
    hallOfAchievements: [
      "Golden Ball 1974",
      "World Cup Finalist 1974",
      "Dutch Player of the Century",
      "European Player of the Century",
    ],
    eraStyle: "vintage",
  },
  {
    id: "ronaldo",
    name: "Ronaldo Nazário",
    nation: "Brazil",
    era: "1994-2006",
    quote: "I love scoring goals; it is the best feeling in the world.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b2/Ronaldo_Fen%C3%B4meno.jpg",
    legacyNumber: "15",
    legacyLabel: "World Cup Goals",
    legacyStatement: "O Fenômeno.",
    worldCupJourney: [1994, 1998, 2002, 2006],
    hallOfAchievements: [
      "2x World Cup Winner",
      "Golden Ball 1998",
      "Golden Shoe 2002",
      "3x FIFA World Player of the Year",
    ],
    eraStyle: "editorial",
  },
  {
    id: "zidane",
    name: "Zinedine Zidane",
    nation: "France",
    era: "1998-2006",
    quote: "Magic is sometimes very close to nothing at all.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f3/Zinedine_Zidane_by_Tasnim_1.jpg",
    legacyNumber: "2",
    legacyLabel: "Final Headers",
    legacyStatement: "Elegance personified on the world stage.",
    worldCupJourney: [1998, 2002, 2006],
    hallOfAchievements: [
      "World Cup Winner 1998",
      "Golden Ball 2006",
      "Man of the Match 1998 Final",
      "3x FIFA World Player of the Year",
    ],
    eraStyle: "editorial",
  },
  {
    id: "messi",
    name: "Lionel Messi",
    nation: "Argentina",
    era: "2006-2022",
    quote:
      "I start early and I stay late, day after day, year after year. It took me 17 years and 114 days to become an overnight success.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
    legacyNumber: "26",
    legacyLabel: "World Cup Matches",
    legacyStatement: "The Man Who Completed Football.",
    worldCupJourney: [2006, 2010, 2014, 2018, 2022],
    hallOfAchievements: [
      "World Cup Winner 2022",
      "2x Golden Ball (2014, 2022)",
      "Most Appearances (26)",
      "Most Man of the Match awards (11)",
    ],
    eraStyle: "modern",
  },
];

export interface RecordMonolith {
  title: string;
  value: string;
  holder: string;
  nation: string;
  year: string;
  story: string;
  evolution?: { year: string; value: string; holder: string }[];
}

export interface RecordCategory {
  id: string;
  title: string;
  description: string;
  records: RecordMonolith[];
}

export const recordHalls: RecordCategory[] = [
  {
    id: "goal-scorers",
    title: "The Goal Scorers",
    description: "The most lethal finishers in the history of the tournament.",
    records: [
      {
        title: "Most World Cup Goals",
        value: "16",
        holder: "Miroslav Klose",
        nation: "Germany",
        year: "2002-2014",
        story:
          "A testament to longevity and predatory instinct, Klose surpassed Ronaldo's record in 2014 against Brazil in the infamous 7-1 semi-final.",
        evolution: [
          { year: "1958", value: "13", holder: "Just Fontaine (FRA)" },
          { year: "1974", value: "14", holder: "Gerd Müller (FRG)" },
          { year: "2006", value: "15", holder: "Ronaldo (BRA)" },
          { year: "2014", value: "16", holder: "Miroslav Klose (GER)" },
        ],
      },
      {
        title: "Most Goals in a Single Tournament",
        value: "13",
        holder: "Just Fontaine",
        nation: "France",
        year: "1958",
        story:
          "An unbreakable milestone. Fontaine scored 13 goals in just 6 matches in Sweden, a feat that has never been remotely challenged.",
      },
      {
        title: "Fastest Goal",
        value: "10.8s",
        holder: "Hakan Şükür",
        nation: "Turkey",
        year: "2002",
        story:
          "Straight from the third-place playoff kickoff, Şükür dispossessed the South Korean defense and struck history in under 11 seconds.",
      },
    ],
  },
  {
    id: "champions",
    title: "The Champions Hall",
    description: "Nations that conquered the world.",
    records: [
      {
        title: "Most Titles",
        value: "5",
        holder: "Brazil",
        nation: "Brazil",
        year: "1958, 1962, 1970, 1994, 2002",
        story:
          "The only nation to participate in every World Cup, and the pentacampeões who defined the beautiful game.",
      },
      {
        title: "Most Finals Reached",
        value: "8",
        holder: "Germany",
        nation: "Germany",
        year: "1954-2014",
        story:
          "A machine of consistency, reaching the ultimate match in eight different tournaments, lifting the trophy four times.",
      },
    ],
  },
  {
    id: "appearances",
    title: "Legendary Appearances",
    description: "Endurance and longevity on the grandest stage.",
    records: [
      {
        title: "Most Appearances",
        value: "26",
        holder: "Lionel Messi",
        nation: "Argentina",
        year: "2006-2022",
        story:
          "Spanning five tournaments, Messi broke Lothar Matthäus's record during the 2022 final, ending his journey with the ultimate prize.",
        evolution: [
          { year: "1970", value: "21", holder: "Uwe Seeler (FRG)" },
          { year: "1998", value: "25", holder: "Lothar Matthäus (GER)" },
          { year: "2022", value: "26", holder: "Lionel Messi (ARG)" },
        ],
      },
      {
        title: "Most Tournaments Played",
        value: "5",
        holder: "Multiple Players",
        nation: "Various",
        year: "1950-2022",
        story:
          "Including Antonio Carbajal, Lothar Matthäus, Rafael Márquez, Lionel Messi, Cristiano Ronaldo, and Andrés Guardado, demonstrating incredible multi-decade endurance.",
      },
    ],
  },
  {
    id: "goalkeeper",
    title: "Goalkeeper Fortress",
    description: "The last line of defense entering immortality.",
    records: [
      {
        title: "Most Clean Sheets",
        value: "10",
        holder: "Fabien Barthez & Peter Shilton",
        nation: "France / England",
        year: "1982-2006",
        story:
          "The ultimate defensive metric. Barthez and Shilton both recorded 10 clean sheets, forming impassable walls for their respective nations.",
      },
      {
        title: "Longest Streak Without Conceding",
        value: "517m",
        holder: "Walter Zenga",
        nation: "Italy",
        year: "1990",
        story:
          "On home soil in 1990, Zenga went over five full matches without conceding a single goal until Canniggia's semi-final header.",
      },
    ],
  },
  {
    id: "youth",
    title: "Records of Youth",
    description: "Teenage prodigies who stunned the world.",
    records: [
      {
        title: "Youngest Scorer",
        value: "17y 239d",
        holder: "Pelé",
        nation: "Brazil",
        year: "1958",
        story:
          "A boy against men. Pelé introduced himself to the world with a goal against Wales, leading Brazil to their first World Cup.",
      },
      {
        title: "Youngest Captain",
        value: "21y 109d",
        holder: "Tony Meola",
        nation: "USA",
        year: "1990",
        story:
          "Entrusted with leadership against Czechoslovakia, Meola became the youngest leader in World Cup history for a rising US team.",
      },
    ],
  },
  {
    id: "longevity",
    title: "Records of Longevity",
    description: "Defying time at the highest level.",
    records: [
      {
        title: "Oldest Goalscorer",
        value: "42y 39d",
        holder: "Roger Milla",
        nation: "Cameroon",
        year: "1994",
        story:
          "Milla shocked the world again in 1994, scoring against Russia to become the oldest to ever find the net in a World Cup.",
      },
      {
        title: "Oldest Player",
        value: "45y 161d",
        holder: "Essam El-Hadary",
        nation: "Egypt",
        year: "2018",
        story:
          "A true marvel of longevity, the Egyptian goalkeeper not only played at 45 but also saved a penalty in his historic match against Saudi Arabia.",
      },
    ],
  },
];

export interface HistoricalMoment {
  id: string;
  title: string;
  description: string;
  year: number;
  image: string;
}

export const moments: HistoricalMoment[] = [
  {
    id: "miracle-bern",
    title: "The Miracle of Bern",
    description:
      "West Germany achieves the impossible, coming back against the Mighty Magyars in the driving rain of Switzerland.",
    year: 1954,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Deutschland_Kader_1954.jpg",
  },
  {
    id: "brazil-1970",
    title: "The Beautiful Team",
    description:
      "The 1970 Brazil squad reached the pinnacle of football aesthetics, culminating in Carlos Alberto's stunning team goal.",
    year: 1970,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/70/Carlos_Alberto_Torres_1970.jpg",
  },
  {
    id: "hand-of-god",
    title: "The Hand of God & Goal of the Century",
    description:
      "Diego Maradona writes his own mythology in four minutes against England at the Estadio Azteca.",
    year: 1986,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/Diego_Maradona_contra_Inglaterra_Mundial_1986.jpg",
  },
  {
    id: "mineirazo",
    title: "The 7-1 Shock",
    description:
      "A night of disbelief in Belo Horizonte as the hosts are dismantled on their own soil.",
    year: 2014,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/5a/Team_Germany_World_Cup_2014.jpg",
  },
  {
    id: "messis-triumph",
    title: "End of a Wait",
    description:
      "One of the greatest finals in history finishes with Lionel Messi finally lifting the trophy in Lusail.",
    year: 2022,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
  },
];
