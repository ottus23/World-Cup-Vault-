export interface HistoricMatch {
  year: number;
  stage: string;
  result: string;
  teams: string;
  title: string;
  story: string;
}

export interface DefiningMoment {
  year: number;
  title: string;
  description: string;
  icon?: string;
}

export interface EchoEvent {
  year: number;
  type: 'final' | 'match' | 'moment' | 'milestone';
  label: string;
  details: string;
}

export interface Stadium {
  id: string;
  name: string;
  city: string;
  country: string;
  yearBuilt: number;
  capacity: string;
  recordAttendance: string;
  appearances: number[];
  legacy: string;
  architecturalIdentity: string;
  historicalImportance: 'finals' | 'legends' | 'attendance' | 'drama';
  description: string;
  image: string;
  longitude: string;
  latitude: string;
  mapX: number; // percentage X on custom SVG (0 to 100)
  mapY: number; // percentage Y on custom SVG (0 to 100)
  legacyStory: string;
  definingMoments: DefiningMoment[];
  historicMatches: HistoricMatch[];
  atmosphereArchive: string;
  pitchDimensions: string;
  renovations: string;
  materialsUsed: string;
  historyEchoes: EchoEvent[];
}

export const stadiumsData: Stadium[] = [
  {
    id: "centenario",
    name: "Estadio Centenario",
    city: "Montevideo",
    country: "Uruguay",
    yearBuilt: 1930,
    capacity: "60,235",
    recordAttendance: "93,000 (1930 Uruguay vs Argentina)",
    appearances: [1930],
    legacy: "The Birthplace of World Cups",
    historicalImportance: "finals",
    longitude: "34.8944° S",
    latitude: "56.1528° W",
    mapX: 30,
    mapY: 82,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Estadio_Centenario_Uruguay.jpg",
    description: "Declaring it the only 'Historical Monument of World Football' by FIFA, this arena is the starting page of the World Cup's grand chronology. Formed in under a year, it was built by laborers working in double shifts to celebrate the centenary of Uruguay's independence and host every game of the inaugural 1930 tournament.",
    architecturalIdentity: "Designed by the visionary architect Juan Antonio Scasso, the Centenario represents classic European expressionist modernism. Its iconic Torre de los Homenajes (Tower of Homages), a massive 100-meter concrete needle with nine distinct balconies symbolising the nine stripes of the Uruguayan flag, was constructed to represent the triumphs of early Uruguayan football. The stadium is set into a natural hollow, producing sightlines that feel like a sunken classical amphitheater of raw concrete.",
    legacyStory: "When Jules Rimet sailed to Montevideo with the golden goddess statue in his trunk, the Centenario was the destination. It hosted the very first final where Uruguay overcame Argentina containing two different matchballs, laying the immortal foundations of global tournament passion.",
    definingMoments: [
      {
        year: 1930,
        title: "The Inception Match",
        description: "On July 18, 1930, the Centenario opened its heavy gates to host Uruguay's first game against Peru. Héctor Castro, playing with a partially amputated arm, scored the arena's first official goal, triggering an era of football theater."
      },
      {
        year: 1930,
        title: "The Double-Ball Controversy",
        description: "In the inaugural final, Argentina insisted on using their own ball in the first half, leading 2-1. Uruguay introduced their preferred T-shape heavy leather ball in the second half, mounting a furious comeback to win 4-2."
      }
    ],
    historicMatches: [
      {
        year: 1930,
        stage: "Final",
        result: "Uruguay 4-2 Argentina",
        teams: "URU - ARG",
        title: "The Inaugural Duel of Independence",
        story: "In front of 93,000 screaming fans, the host nation established their early-century absolute supremacy in a tournament final filled with immense nationalist tension and spectacular sporting theater."
      }
    ],
    atmosphereArchive: "The acoustics behave like an acoustic bowl. Because of its deep sunken concrete form, noise does not drift away—it circulates in massive, rotating echoes. When local fans drum the traditional Candombe rhythms, the entire solid structure vibrates, generating a low physical rumble.",
    pitchDimensions: "105m x 68m",
    renovations: "1980 (Mundialito upgrades), 2021 (LED installation and pitch relay)",
    materialsUsed: "Reinforced poured concrete, local river gravel mix",
    historyEchoes: [
      { year: 1930, type: "milestone", label: "Groundbreaking", details: "Hand-poured concrete foundations laid during freezing winter downpours." },
      { year: 1930, type: "final", label: "Inaugural Final", details: "Uruguay defeats Argentina 4-2 to claim the first Jules Rimet Trophy." },
      { year: 1980, type: "match", label: "Mundialito Tournament", details: "The Centenario hosts the World Champions Gold Cup as Uruguay defeats Brazil in the final." },
      { year: 1983, type: "moment", label: "Copa América Peak", details: "The stadium serves as Uruguay's fortress on their road to South American glory." },
      { year: 2021, type: "moment", label: "Continental Double Header", details: "Hosts both the Copa Libertadores and Copa Sudamericana finals in a single historical week." }
    ]
  },
  {
    id: "azteca",
    name: "Estadio Azteca",
    city: "Mexico City",
    country: "Mexico",
    yearBuilt: 1966,
    capacity: "87,523",
    recordAttendance: "119,853 (1970 Mexico vs Brazil tournament run)",
    appearances: [1970, 1986, 2026],
    legacy: "The Colosseum of Legends",
    historicalImportance: "finals",
    longitude: "19.3031° N",
    latitude: "99.1506° W",
    mapX: 18,
    mapY: 53,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Estadio_Azteca_Interior.jpg",
    description: "Perched 2,200 meters above sea level in the high-altitude thin air of Mexico City, the Azteca is a behemoth. It is the first stadium to host two distinct World Cup finals, serving as the setting where the two greatest kings of the 20th century, Pelé and Diego Maradona, were officially coronated.",
    architecturalIdentity: "Designed by architects Pedro Ramírez Vázquez and Rafael Mijares Alcérreca, the Azteca is an engineering masterpiece. It was sculpted out of the volcanic basalt stone of the ancient Xitle volcano. The arena features a suspension-style concrete double-ring outline that blocks direct sunlight while keeping the sound pressurized inside. Its massive open-bowl structure acts as a monumental megaphone, projecting match noise directly down onto the pitch.",
    legacyStory: "The Azteca is the holy land of individual soccer genius. It is the only stretch of turf in the universe to have witnessed Pelé's legendary head header in 1970, and Diego Maradona's four-minute sequence of the 'Hand of God' and the 'Goal of the Century' in 1986.",
    definingMoments: [
      {
        year: 1970,
        title: "The Pinnacle of King Pelé",
        description: "In the 1970 final, Pelé leaped impossibly high, appearing to hang in the thin air to score Brazil's opening goal, before being carried off the field on shoulders, wearing a Mexican sombrero in sheer bliss."
      },
      {
        year: 1986,
        title: "The Hand of God & Century Goal",
        description: "Within only four minutes of playing time, Diego Maradona secured his eternal divinity. First, punch-scoring past Peter Shilton, then executing an eleven-touch, sixty-meter weave through five England players."
      }
    ],
    historicMatches: [
      {
        year: 1970,
        stage: "Final",
        result: "Brazil 4-1 Italy",
        teams: "BRA - ITA",
        title: "The Beautiful Symphony",
        story: "The definitive display of 'Jogo Bonito' capped by Carlos Alberto's legendary team-passing goal, earning Brazil permanent possession of the Jules Rimet."
      },
      {
        year: 1970,
        stage: "Semi-final",
        result: "Italy 4-3 West Germany",
        teams: "ITA - FRG",
        title: "The Game of the Century",
        story: "Five goals scored during extra-time by players exhausted from the grueling altitude, with Franz Beckenbauer playing courageously with a dislocated shoulder bound in a sling."
      },
      {
        year: 1986,
        stage: "Quarter-final",
        result: "Argentina 2-1 England",
        teams: "ARG - ENG",
        title: "The Celestial Intervention",
        story: "Perhaps the most culturally and politically charged single match in history, decided by Diego Maradona's twin polar displays of trickery and absolute perfection."
      }
    ],
    atmosphereArchive: "At 2,200 meters elevation, the air is thin, making the sound waves travel faster and sharper. The physical sensation is like standing inside a giant drum. Over 100,000 spectators chanting 'MÉ-XI-CO' creates a thick wave of sonic weight that causes physical disorientation for visiting opponents.",
    pitchDimensions: "105m x 68m",
    renovations: "2013 (executive boxes integration), 2016 (seat layout redesign and modern illumination, preparing for 2026 MLS and World Cup matches)",
    materialsUsed: "Poured concrete, reinforced steel, local volcanic basalt stone aggregates",
    historyEchoes: [
      { year: 1966, type: "milestone", label: "The Opening", details: "Inaugurated with a match between Club América and Italian giants Torino." },
      { year: 1970, type: "final", label: "The Pelé Coronation", details: "Brazil secures their third World Cup title in a masterclass of majestic team play." },
      { year: 1970, type: "match", label: "Game of the Century", details: "Italy defeats West Germany 4-3 in a grueling, physical 120-minute classic." },
      { year: 1986, type: "moment", label: "Maradona Reaches Divinity", details: "Argentina's talisman scores the 'Hand of God' and 'Goal of the Century' against England." },
      { year: 1986, type: "final", label: "Argentina Golden Apex", details: "Maradona leads Argentina to a spectacular 3-2 victory over West Germany." },
      { year: 2026, type: "milestone", label: "Historic Triple Host", details: "Preparing to become the very first stadium to host matches in three separate World Cup editions." }
    ]
  },
  {
    id: "maracana",
    name: "Maracanã Stadium",
    city: "Rio de Janeiro",
    country: "Brazil",
    yearBuilt: 1950,
    capacity: "78,838",
    recordAttendance: "199,854 (1950 Uruguay vs Brazil final round)",
    appearances: [1950, 2014],
    legacy: "The Cathedral of Samba and Tears",
    historicalImportance: "attendance",
    longitude: "22.9121° S",
    latitude: "43.2302° W",
    mapX: 36,
    mapY: 76,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Maracan%C3%A3_Stadium_in_Rio_de_Janeiro.jpg",
    description: "Known globally as the beating heart of Brazilian football, the Maracanã was built as a giant physical colosseum to celebrate Brazil's expected 1950 triumph. Instead, it bore witness to the 'Maracanazo'—the ultimate national tragedy that plunged a country into silence, before returning decades later to host the 2014 Final.",
    architecturalIdentity: "Designed as a perfectly circular concrete amphitheater, the Maracanã's columns radiate outwards to resemble a massive floating crown. In 2013, the stadium underwent a massive reconstruction for the 2014 finals, replacing the original two-tier concrete bowl with a sweeping single-tier ring. Under its state-of-the-art white Teflon roof that acts as a canvas reflecting the vibrant Brazilian sun, the stadium remains an absolute architectural monument.",
    legacyStory: "There is no stadium with a deeper psychological legacy. In 1950, 200,000 spectators entered with celebratory firecrackers, only to leave in absolute complete silent grief. Sixty-four years later, Germany crossed its turf to claim their fourth crown, breaking Brazilian soil once again.",
    definingMoments: [
      {
        year: 1950,
        title: "The Silent Tragedy",
        description: "Brazil only needed a draw to win. But Alcides Ghiggia's low, tight shot bypassed Moacir Barbosa, putting Uruguay up 2-1 and silencing 200,000 people. It remains the heaviest sport-induced collective shock ever recorded."
      },
      {
        year: 2014,
        title: "Götze's Golden Volley",
        description: "In the 113th minute of a deadlocked final between Argentina and Germany, Mario Götze controlled André Schürrle's cross with his chest and unleashed an acrobatic volley, securing the trophy for Germany."
      }
    ],
    historicMatches: [
      {
        year: 1950,
        stage: "Final Round Decider",
        result: "Uruguay 2-1 Brazil",
        teams: "URU - BRA",
        title: "The Maracanazo",
        story: "A match that defined Uruguay's absolute grit and Barbosa's tragic legacy, forcing Brazil to abandon their traditional white shirts forever."
      },
      {
        year: 2014,
        stage: "Final",
        result: "Germany 1-0 Argentina (aet)",
        teams: "GER - ARG",
        title: "The Clash of Hemispheres",
        story: "Lionel Messi fought valiantly against Germany's complete tactical machine, culminating in extra-time drama on the hallowed Rio turf."
      }
    ],
    atmosphereArchive: "Maracanã behaves like an interactive ocean wave. The local fans bounce and sing in rhythmic synchronization, creating a massive sway. It is a festival of percussion, color, and high-octane emotional energy that instantly turns into heavy, suffocating pressure if the team falters.",
    pitchDimensions: "105m x 68m",
    renovations: "1999 (structural safety repairs), 2013 (complete conversion into single-tier seated configuration and Teflon roof installation)",
    materialsUsed: "Reinforced concrete, floating steel roof, white membrane coating",
    historyEchoes: [
      { year: 1950, type: "milestone", label: "Completed in Haste", details: "Opened unfinished just days before the World Cup with temporary wooden rafters." },
      { year: 1950, type: "final", label: "The Maracanazo Disaster", details: "Uruguay shocks Brazil 2-1 in front of a record 199,854 spectators." },
      { year: 1969, type: "moment", label: "Pelé's Thousandth Goal", details: "The King scores his 1000th career goal 'O Milésimo' via penalty, rushing to kiss the ball." },
      { year: 2013, type: "milestone", label: "Chamber Devolution", details: "Reopened as a modern all-seater bowl, losing its standing terraces." },
      { year: 2014, type: "final", label: "Germany Conquers Rio", details: "Germany defeats Messi's Argentina 1-0 in extra-time to win their fourth star." }
    ]
  },
  {
    id: "olympiastadion",
    name: "Olympiastadion",
    city: "Berlin",
    country: "Germany",
    yearBuilt: 1936,
    capacity: "74,475",
    recordAttendance: "110,000 (Historic athletic games)",
    appearances: [1974, 2006],
    legacy: "The Theater of High Drama",
    historicalImportance: "drama",
    longitude: "52.5147° N",
    latitude: "13.2394° E",
    mapX: 52,
    mapY: 34,
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Olympiastadion_Berlin_2004.jpg",
    description: "A monumental stadium crafted with immense historical and structural gravity, Berlin's Olympiastadion is a venue where shadows of the past meet highly modern architectural execution. It was the stage of the dramatic 2006 World Cup Final, forever immortalized by the fateful headbutt of a football icon.",
    architecturalIdentity: "Designed by Werner March, the Olympiastadion is a rare neoclassical monument built of natural shell limestone and granite blocks. For the 2006 World Cup, it was retrofitted with an ultra-lightweight translucent ring canopy roof that floats seamlessly above the stone pillars, leaving a deliberate gap that opens towards the Maifeld and the bell tower. This blend of ancient stone and modern high-tech steel generates an unparalleled sense of athletic scale.",
    legacyStory: "The Olympiastadion is where football's modern legends came to terms with mortality. In 2006, Italy built their famous defensive wall to survive Zidane's onslaught, culminating in one of the most cinematic and shocking exits in sports history.",
    definingMoments: [
      {
        year: 2006,
        title: "Zidane's Silent Walk of Shame",
        description: "In extra time of the 2006 final, after scoring a panenka and trading words with Materazzi, Zinedine Zidane headbutted the Italian defender. Sent off, he walked past the golden cup, head bowed, into the dressing rooms."
      },
      {
        year: 2006,
        title: "The Italian Wall Prevails",
        description: "Led by Fabio Cannavaro, Italy remained unbreakable against France, converting all five penalties to win their fourth world title under the intense Berlin night sky."
      }
    ],
    historicMatches: [
      {
        year: 2006,
        stage: "Final",
        result: "Italy 1-1 France (5-3 p)",
        teams: "ITA - FRA",
        title: "The Fall of the Titan",
        story: "A final filled with pure theatrical narrative, combining Zidane's panenka, a sudden overhead header saved, physical clashes, and eventual penalty resolution."
      },
      {
        year: 2006,
        stage: "Quarter-final",
        result: "Germany 1-1 Argentina (4-2 p)",
        teams: "GER - ARG",
        title: "The Lehmann Sticky Note",
        story: "German keeper Jens Lehmann pulled a crumpled note from his sock containing Argentina's penalty tendencies, saving two key shots to spark national euphoria."
      }
    ],
    atmosphereArchive: "The atmosphere inside Olympiastadion feels stone-cold and serious, yet grand. Its deep track keeps the spectators somewhat distanced, but the neoclassical walls bounce the sound around, generating a heavy, thunderous roar similar to a distant mountain storm.",
    pitchDimensions: "105m x 68m",
    renovations: "2004 (Complete reconstruction: lowered pitch, integrated floating steel roof, state-of-the-art light ring)",
    materialsUsed: "Natural Franconian shell limestone, structural steel, membrane cover",
    historyEchoes: [
      { year: 1936, type: "milestone", label: "Completed", details: "Constructed as a stone stadium to host the Berlin Summer Games." },
      { year: 1974, type: "match", label: "Inter-German Clash", details: "Olympiastadion hosts matches of the group stage as West Germany meets East Germany." },
      { year: 2004, type: "milestone", label: "Modern Rebirth", details: "Upgraded with a 68-million euro translucent roof structure and a blue running track." },
      { year: 2006, type: "final", label: "Zidane Headbutt Final", details: "Italy defeats France on penalties to claim their fourth world championship." },
      { year: 2015, type: "moment", label: "UEFA Champions League Peak", details: "Hosts the historic final where Barcelona's MSN trio defeats Juventus." }
    ]
  },
  {
    id: "lusail",
    name: "Lusail Stadium",
    city: "Lusail",
    country: "Qatar",
    yearBuilt: 2021,
    capacity: "88,966",
    recordAttendance: "88,966 (2022 Argentina vs France final)",
    appearances: [2022],
    legacy: "The Horizon of Modernity",
    historicalImportance: "finals",
    longitude: "25.4211° N",
    latitude: "51.4878° E",
    mapX: 63,
    mapY: 53,
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Lusail_Iconic_Stadium_2022.jpg",
    description: "Emerging like a colossal golden vessel from the sands of the Qatari desert, Lusail Stadium is the ultimate pinnacle of modern high-concept stadium design. In 2022, it became the setting for the consensus greatest final ever played, concluding Lionel Messi's lifelong quest for sporting immortality.",
    architecturalIdentity: "Designed by Foster + Partners, the stadium resembling a traditional hand-crafted basket bowl features a spectacular golden shroud of triangular steel panelling. These panels act as a giant lattice screen, filtering the hot desert sun and casting intricate patterns of light and shade inside. At night, a state-of-the-art integrated lighting system illuminates the golden façade, causing the structure to glow like an radiant lantern.",
    legacyStory: "Under the hot desert night in December 2022, Lusail became a theatre of cosmic alignment. It hosted a breathtaking 3-3 battle between Lionel Messi's grit and Kylian Mbappé's unstoppable force, concluding with a penalty shootout that completed modern football history.",
    definingMoments: [
      {
        year: 2022,
        title: "The Coronation of the Messiah",
        description: "After 1,003 professional matches, five World Cups, and endless heartbreak, Lionel Messi lifted the solid gold trophy into the desert sky, draped in a traditional black and gold Bisht."
      },
      {
        year: 2022,
        title: "Mbappé's Triple Fire",
        description: "With Argentina leading 2-0 and coasting, Kylian Mbappé scored two goals in 97 seconds, later converting a third in extra time to score only the second-ever hat-trick in a World Cup final."
      }
    ],
    historicMatches: [
      {
        year: 2022,
        stage: "Final",
        result: "Argentina 3-3 France (4-2 p)",
        teams: "ARG - FRA",
        title: "The Ultimate Battle of Titans",
        story: "A dramatic final defined by Messi's early lead, Mbappé's spectacular comebacks, Martinez's last-second kick save, and intense penalty shootout madness."
      },
      {
        year: 2022,
        stage: "Group Stage",
        result: "Saudi Arabia 2-1 Argentina",
        teams: "KSA - ARG",
        title: "The Desert Storm",
        story: "One of the greatest upsets in football history, as Saudi Arabia mounted a spectacular two-goal comeback to break Argentina's 36-match unbeaten streak."
      }
    ],
    atmosphereArchive: "Lusail possesses a highly modern, acoustics-focused atmosphere. Its tight vertical seating bowl keeps fans extremely close to the pitch. The massive roof acts as a parabolic reflector that traps and focuses the crowd chants, projecting a wall of physical noise directly down upon the grass.",
    pitchDimensions: "105m x 68m",
    renovations: "Designed as a legacy venue with plans for future boutique conversions of its outer tiers.",
    materialsUsed: "High-spec structural steel, polished gold-colored aluminium sheeting, PTFE roof canopy",
    historyEchoes: [
      { year: 2018, type: "milestone", label: "Foundations Poured", details: "Over 80,000 cubic meters of heavy concrete poured to form the core." },
      { year: 2021, type: "milestone", label: "Opening Unveiling", details: "Completed as Qatars crown jewel venue to host ten separate World Cup games." },
      { year: 2022, type: "moment", label: "Saudi Shock", details: "Saudi Arabia shocks Messi's Argentina in their opening group stage game." },
      { year: 2022, type: "final", label: "The Cosmic Final", details: "Argentina wins on penalties against France as Messi ascends to the absolute peak." }
    ]
  },
  {
    id: "rosebowl",
    name: "Rose Bowl",
    city: "Pasadena (Los Angeles)",
    country: "USA",
    yearBuilt: 1922,
    capacity: "92,542",
    recordAttendance: "94,194 (1994 Brazil vs Italy final)",
    appearances: [1994],
    legacy: "The Monument of the New World",
    historicalImportance: "attendance",
    longitude: "34.1613° N",
    latitude: "118.1676° W",
    mapX: 14,
    mapY: 46,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Rose_Bowl_Stadium_interior.jpg",
    description: "Nestled in the beautiful rolling hills of Pasadena, the Rose Bowl is an sprawling, open-air amphitheater that represents the classic American colosseum. In 1994, it served as the center stage for a World Cup that shattered attendance records and introduced modern global entertainment to the beautiful game.",
    architecturalIdentity: "Designed by Myron Hunt, the Rose Bowl is a single-tier earthen-mound stadium shaped in an elegant, unbroken oval. It lacks any overhanging roofs or concrete rafters, exposing the entire crowd of 94,000 spectators to the bright, hot California sun and open sky. This lack of overhead division produces a panoramic display of humanity, styled with natural brick trims and rustic American stadium steel structures.",
    legacyStory: "The Rose Bowl is where tragedy and triumph collided in the midday sun. Under intense sweltering heat, the 1994 Final between Brazil and Italy became a war of high-stress physical attrition, decided by the most heartbreaking spot-kick miss in history.",
    definingMoments: [
      {
        year: 1994,
        title: "Roberto Baggio's Sorrow",
        description: "Having single-handedly carried Italy to the final, Roberto Baggio stepped up to the spot. His penalty sailed high over the crossbar. Baggio stood motionless, head bowed in complete silence, as Brazil celebrated."
      }
    ],
    historicMatches: [
      {
        year: 1994,
        stage: "Final",
        result: "Brazil 0-0 (3-2 p) Italy",
        teams: "BRA - ITA",
        title: "The Battle of Pasadena",
        story: "The first World Cup final decided by a penalty shootout, following 120 minutes of intense, hot defensive chess."
      }
    ],
    atmosphereArchive: "The atmosphere here feels incredibly open and vast. Sound does not echo or bounce—it escapes directly into the mountain air, replaced by visual waves of color. The massive, flat, sun-baked landscape generates a summer festival vibe filled with dramatic tension.",
    pitchDimensions: "105m x 68m",
    renovations: "2011 (Locker room modernization and rustic structural stabilization)",
    materialsUsed: "Earthen terracing, stone rubble walls, structural timber and concrete",
    historyEchoes: [
      { year: 1922, type: "milestone", label: "Construction", details: "Completed as a flat horseshoe stadium, later joined into a complete oval." },
      { year: 1994, type: "moment", label: "Maradona's Last Goal", details: "Diego Maradona scores his final World Cup goal, roaring directly into the sideline television camera." },
      { year: 1994, type: "final", label: "The Heartbreak Peak", details: "Baggio misses his penalty as Brazil secures their historic fourth world title." },
      { year: 1999, type: "moment", label: "World Cup Women's Peak", details: "Hosts the historic 1999 Women's Final where Brandi Chastain scores the winning penalty." }
    ]
  },
  {
    id: "stade_de_france",
    name: "Stade de France",
    city: "Saint-Denis (Paris)",
    country: "France",
    yearBuilt: 1998,
    capacity: "80,698",
    recordAttendance: "80,000 (1998 France vs Brazil final)",
    appearances: [1998],
    legacy: "The Palace of the New Dawn",
    historicalImportance: "legends",
    longitude: "48.9244° N",
    latitude: "2.3601° E",
    mapX: 47,
    mapY: 33,
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stade_de_France_Interior_2016.jpg",
    description: "Built on the industrial outskirts of northern Paris for the 1998 World Cup, Stade de France became a temple of unity and social celebration. On a warm July night in 1998, it witnessed a diverse, multi-ethnic French squad, led by the magical Zinedine Zidane, defeat Brazil to earn France's very first yellow star.",
    architecturalIdentity: "The standout feature of Stade de France is its spectacular, eleven-thousand-ton floating roof designed by architects Michel Macary, Aymeric Zublena, Michel Regembal, and Claude Costantini. Designed to look like a giant floating metal disc or flying saucer, this elliptical roof is suspended forty meters above the grass by eighteen steel pylons. It features adjustable spectator tiers that can glide inwards, keeping the crowd close to the athletic action.",
    legacyStory: "Stade de France represents a national rebirth. It is where 'Black-Blanc-Beur' (black, white, Arab) unity was temporarily forged, as Zidane's face was projected onto Paris landmarks under the thunderous roar of eighty thousand fans.",
    definingMoments: [
      {
        year: 1998,
        title: "Zidane's Double-Header Rise",
        description: "Known primarily as a playmaker with his feet, Zidane used his head twice from corner kicks in the first half of the 1998 final, shocking Brazil's defense and rising to legendary status."
      },
      {
        year: 1998,
        title: "The Ronaldo Mystery",
        description: "Brazil's superstar Ronaldo was omitted from the team sheet, then reinstated just 72 hours down to match time after suffering a sudden medical seizure. He played, but remained a shadow of himself on the Paris turf."
      }
    ],
    historicMatches: [
      {
        year: 1998,
        stage: "Final",
        result: "France 3-0 Brazil",
        teams: "FRA - BRA",
        title: "The Coronation of Paris",
        story: "France claims their maiden World Cup title in a dominant display, capping an emotionally charged national campaign."
      }
    ],
    atmosphereArchive: "An atmosphere carrying a Parisian theatrical weight. The circular floating roof locks down and traps the high-pitched french chants. On matchdays, the surrounding stadium bowl becomes a sea of blue, red, and white, accompanied by the powerful, synchronized chants of 'Allez Les Bleus'.",
    pitchDimensions: "105m x 68m",
    renovations: "Minor cosmetic upgrades preparing for UEFA Champions League finals and the 2024 Olympic athletics.",
    materialsUsed: "High-grade structural steel, architectural glass panels, raw concrete columns",
    historyEchoes: [
      { year: 1995, type: "milestone", label: "Groundbreaking", details: "Constructed on the site of old gasworks in Saint-Denis." },
      { year: 1998, type: "final", label: "Zidane's Double Headers", details: "France dismantles Brazil 3-0 in a legendary display of home dominance." },
      { year: 2006, type: "moment", label: "Champions League Peak", details: "Hosts the final where Barcelona defeats Arsenal to claim European glory." },
      { year: 2016, type: "moment", label: "Euro 2016 Final Heartbreak", details: "Portugal shocks France in extra-time to win the continental crown on Paris soil." }
    ]
  },
  {
    id: "olimpico",
    name: "Stadio Olimpico",
    city: "Rome",
    country: "Italy",
    yearBuilt: 1953,
    capacity: "70,634",
    recordAttendance: "73,000 (1990 West Germany vs Argentina final)",
    appearances: [1990],
    legacy: "The Arena of Italian Nights",
    historicalImportance: "drama",
    longitude: "41.9339° N",
    latitude: "12.4547° E",
    mapX: 49,
    mapY: 36,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Stadio_Olimpico_Roma_Tribuna_Tevere.jpg",
    description: "Located within the historic Foro Italico sports complex along the banks of the Tiber River, Rome's Stadio Olimpico is a venue bound to the romanticism of 'Notti Magiche' (Magical Nights). It served as the theater for the tense, tactical 1990 final, witnessing Argentina and West Germany clash in an emotional rematch.",
    architecturalIdentity: "The Olimpico features a signature lightweight tensile white membrane roof that spans the entire concrete bowl, supported by massive perimeter columns. It is shaped like a giant open-air racetrack arena. This low-slung, sweeping design keeps the structure visually balanced within the scenic natural hills of Mount Mario, blending modern sporting structural design with ancient Roman architectural history.",
    legacyStory: "Stadio Olimpico in 1990 was a hotbed of tactical, physical, and political drama. It is where Diego Maradona's defending champions fought through multiple red cards, only to be stopped by Andreas Brehme's clinical penalty.",
    definingMoments: [
      {
        year: 1990,
        title: "Brehme's Ice-Cold Strike",
        description: "In the 85th minute of an incredibly tense final, West Germany was awarded a penalty. Showing complete ice-cold nerve, left-back Andreas Brehme stepped up and struck the ball with his right foot into the bottom corner."
      }
    ],
    historicMatches: [
      {
        year: 1990,
        stage: "Final",
        result: "West Germany 1-0 Argentina",
        teams: "FRG - ARG",
        title: "The Revenge of Rome",
        story: "A bitter, highly physical final that saw West Germany claim redemption for their 1986 defeat in Mexico."
      }
    ],
    atmosphereArchive: "An atmosphere structured by dramatic, sweeping choruses. Because of the open-air layout and surrounding hills, the chants ring out with an operatic, echo-ey resonance. When fans light modern flares, the stadium glows with a beautiful, raw visual weight under the Roman night.",
    pitchDimensions: "105m x 68m",
    renovations: "1990 (Complete rebuilding and roof integration for Copa 90), 2008 (interior upgrades for UEFA Elite status)",
    materialsUsed: "White travertine stone, steel support framing, PVC membrane roof coating",
    historyEchoes: [
      { year: 1953, type: "milestone", label: "Opening", details: "Opened as the Stadio dei Centomila with a capacity for 100,000 spectators." },
      { year: 1977, type: "moment", label: "European Cup Peak", details: "Liverpool wins their first European Cup defeating Borussia Mönchengladbach." },
      { year: 1990, type: "final", label: "Brehme's Spot-Kick Glory", details: "West Germany defeats Argentina 1-0 in a tense, physical final showdown." },
      { year: 2009, type: "moment", label: "Guardiola's Barca Peak", details: "Barcelona defeats Manchester United 2-0 with Messi's famous looping header." }
    ]
  },
  {
    id: "soccercity",
    name: "Soccer City (FNB Stadium)",
    city: "Johannesburg",
    country: "South Africa",
    yearBuilt: 1989,
    capacity: "94,736",
    recordAttendance: "94,736 (2010 Spain vs Netherlands final)",
    appearances: [2010],
    legacy: "The Calabash of the African Continent",
    historicalImportance: "attendance",
    longitude: "26.2347° S",
    latitude: "27.9824° E",
    mapX: 53,
    mapY: 79,
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Soccer_City_Johannesburg_2010.jpg",
    description: "Located in the historic township of Soweto, Soccer City (FNB Stadium) is a monument of South African unity and sporting pride. It served as the setting for Nelson Mandela's first major public address after his release from prison, and later hosted the historic 2010 World Cup—the first ever held on African soil.",
    architecturalIdentity: "Designed by Boogertman + Partners, Soccer City's facade is modeled after the 'Calabash'—a traditional African cooking pot. The exterior is covered in a spectacular mosaic of glass-fiber concrete panels in warm earthy colors (reds, ochres, ambers) that mimic fire. A ring of lights circles the base, simulating a fire burning underneath the massive cooking pot, while a continuous translucent ring canopy floats seamlessly overhead.",
    legacyStory: "FNB Stadium is a monument where history, politics, and football converged. It was where Siphiwe Tshabalala scored his opening tournament screamer to ignite a continent, and where Andrés Iniesta struck his historic 116th-minute winner to crown Spain.",
    definingMoments: [
      {
        year: 2010,
        title: "Tshabalala's Opening Shaker",
        description: "In the opening match, Siphiwe Tshabalala unleashed a spectacular, high-powered left-foot shot into the top corner, provoking a thunderous explosion of joy and vuvuzela noise across the continent."
      },
      {
        year: 2010,
        title: "Iniesta's Golden Peak",
        description: "Under the Johannesburg night, in the 116th minute of an incredibly physical final, Andrés Iniesta controlled Cesc Fàbregas' pass and struck a half-volley, dedicating the goal to his late friend Dani Jarque."
      }
    ],
    historicMatches: [
      {
        year: 2010,
        stage: "Final",
        result: "Spain 1-0 Netherlands (aet)",
        teams: "ESP - NED",
        title: "The Battle of Soweto",
        story: "A brutal, highly confrontational match marked by Nigel de Jong's chest-kick and fourteen yellow cards, resolved late in extra time."
      },
      {
        year: 2010,
        stage: "Quarter-final",
        result: "Uruguay 1-1 (4-2 p) Ghana",
        teams: "URU - GHA",
        title: "The Hand of Suarez",
        story: "In the final second of extra time, Luis Suárez blocked a goal-bound shot with his hands. Asamoah Gyan hit the crossbar, sending Uruguay to the semi-finals on penalties."
      }
    ],
    atmosphereArchive: "An atmosphere defined by the deep, continuous drone of thousands of vuvuzelas. The sound is not like normal European singing—it is a massive swarm of buzzing sound that vibrates through the concrete foundation, generating a trance-like state of continuous physical energy.",
    pitchDimensions: "105m x 68m",
    renovations: "2009 (Complete major rebuild, capacity increased to 94,700 for the World Cup specifications)",
    materialsUsed: "Fiber-reinforced concrete panels, structural glass roof elements, steel frame structure",
    historyEchoes: [
      { year: 1989, type: "milestone", label: "Construction Completion", details: "Completed as FNB Stadium, South Africa's premier national arena." },
      { year: 1990, type: "moment", label: "Mandela's Welcoming Speech", details: "Nelson Mandela addresses over 100,000 supporters immediately after his release." },
      { year: 2009, type: "milestone", label: "The Golden Mosaic", details: "Completely renovated with the iconic multi-colored pottery facade." },
      { year: 2010, type: "moment", label: "Africa's Screamer", details: "Siphiwe's goal opens the tournament in Soweto with an unforgettable roar." },
      { year: 2010, type: "final", label: "La Roja Conquers Africa", details: "Iniesta's strike crowns Spain World Champions for the absolute first time." }
    ]
  },
  {
    id: "yokohama",
    name: "Yokohama International Stadium",
    city: "Yokohama",
    country: "Japan",
    yearBuilt: 1997,
    capacity: "72,327",
    recordAttendance: "69,029 (2002 Brazil vs Germany final)",
    appearances: [2002],
    legacy: "The Eastern Gateway of Redemption",
    historicalImportance: "legends",
    longitude: "35.5101° N",
    latitude: "139.6062° E",
    mapX: 84,
    mapY: 45,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Nissan_Stadium_International_Stadium_Yokohama.jpg",
    description: "Located on the waterfront of Yokohama, Japan, this sprawling, state-of-the-art arena served as the flagship stadium for the 2002 World Cup—the first edition held in Asia. It was the setting of 'O Fenômeno' Ronaldo's ultimate football redemption.",
    architecturalIdentity: "The International Stadium Yokohama (known as Nissan Stadium) features a spectacular symmetrical arch steel cantilever structure. Its sweeping geometric gray and silver frame represents Japanese futuristic design, with state-of-the-art moving camera rails and subterranean cooling tunnels. Its low, sleek profile sits harmoniously along the bay, reflecting a modern industrial and technological visual style.",
    legacyStory: "In 1998, Ronaldo left Paris in a state of physical shock and mystery. In 2002, he stepped onto the Yokohama turf with a bizarre half-moon haircut. He scored eight goals in the tournament, culminating in two decisive final strikes that restored his king status.",
    definingMoments: [
      {
        year: 2002,
        title: "Ronaldo's Tears of Redemption",
        description: "After tap-scoring his second goal past Oliver Kahn, Ronaldo was subbed off late in the match. He sat on the bench, crying tears of absolute release after surviving multiple career-threatening knee surgeries."
      }
    ],
    historicMatches: [
      {
        year: 2002,
        stage: "Final",
        result: "Brazil 2-0 Germany",
        teams: "BRA - GER",
        title: "The Battle of Titans",
        story: "The very first World Cup encounter between the two most successful nations, decided by Ronaldo's striking second-half clinical double."
      }
    ],
    atmosphereArchive: "An atmosphere defined by massive synthetic stadium lights and incredibly polite, high-pitched Japanese cheers mixed with thunderous Brazilian drum beats. The absolute scale of the sweeping arches gives stadium events a sense of clean, high-precision theater, like a sports arena inside a sci-fi set.",
    pitchDimensions: "105m x 68m",
    renovations: "Minor turf replacements and field heat control system installations.",
    materialsUsed: "High-grade structural steel, anti-corrosive aluminium alloy panels, heavy concrete pylons",
    historyEchoes: [
      { year: 1997, type: "milestone", label: "Opening Ceremony", details: "Inaugurated as Nissan Stadium, Japan's largest sport arena structure." },
      { year: 2002, type: "final", label: "The Pentacampeonato", details: "Ronaldo scores twice to crown Brazil champions of the world for the fifth time." },
      { year: 2019, type: "moment", label: "Rugby World Cup Peak", details: "Hosts the monumental Rugby World Cup final as South Africa defeats England." },
      { year: 2021, type: "moment", label: "Tokyo Olympic Peak", details: "Hosts key matches of the Tokyo 2020 Summer Olympic football tournaments." }
    ]
  }
];
