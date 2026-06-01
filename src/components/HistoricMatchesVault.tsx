import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  ArrowLeft, 
  Clock, 
  Play, 
  Volume2, 
  VolumeX, 
  Radio, 
  Flame, 
  BookOpen, 
  TrendingUp, 
  User, 
  ShieldAlert, 
  Award, 
  Calendar, 
  Globe, 
  ChevronRight, 
  Sparkles,
  Search,
  Sliders,
  Share2,
  Camera
} from 'lucide-react';
import { StadiumAudioEngine, getDefaultCommentary, speakBroadcaster, CommentarySnippet } from '../utils/audioSystem';
import { MatchShareSystem } from './MatchShareSystem';
import { ContinueExploringSystem } from './ContinueExploringSystem';

// Type definitions
export interface MatchTimelineEvent {
  minute: string;
  type: 'goal' | 'card' | 'save' | 'penalty' | 'drama';
  title: string;
  narrative: string;
}

export interface MomentumPoint {
  minute: number;
  teamAIntensity: number; // 0 to 100
  teamBIntensity: number; // 0 to 100
  event: string;
}

export interface CharacterEntity {
  name: string;
  role: 'hero' | 'villain' | 'iconic';
  status: string;
  nation: string;
  quote: string;
  description: string;
}

export interface MatchDetails {
  id: string;
  title: string;
  year: number;
  stage: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  shootoutScore?: string;
  subtitle: string;
  era: 'vintage' | 'poster' | 'broadcast' | 'cinematic';
  stakes: string;
  heroImage: string;
  timeline: MatchTimelineEvent[];
  momentum: MomentumPoint[];
  definingMoment: {
    title: string;
    description: string;
  };
  tacticalView: {
    formationA: string;
    formationB: string;
    title: string;
    narrative: string;
  };
  characters: CharacterEntity[];
  stats: {
    possessionA: number;
    possessionB: number;
    shotsA: number;
    shotsB: number;
    passesA: number;
    passesB: number;
    foulsA: number;
    foulsB: number;
  };
  historicalImpact: string;
}

// Full-scale curated elite matches data
export const CLASSIC_MATCHES: MatchDetails[] = [
  {
    id: '2022-final',
    title: 'The Coronation of the King',
    year: 2022,
    stage: 'Final',
    teamA: 'Argentina',
    teamB: 'France',
    scoreA: 3,
    scoreB: 3,
    shootoutScore: '4-2 p',
    subtitle: 'Lionel Messi finishes football vs Mbappé\'s relentless army',
    era: 'cinematic',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg',
    stakes: 'Lionel Messi searched for his ultimate crown. Under the desert heat in Lusail, his final obstacle was a clinical French nation led by his Paris Saint-Germain companion, the unstoppable Kylian Mbappé.',
    timeline: [
      { minute: "23'", type: "goal", title: "Messi Conquers the Spot", narrative: "Di María is clipped inside the area by Dembélé. Messi steps up under astronomical pressure, sends Lloris the wrong way, and rolls the blue-and-white home." },
      { minute: "36'", type: "goal", title: "The Sovereign Counter-Attack", narrative: "Five touches of celestial beauty. Messi flick, Mac Allister burst, laying off precisely for Ángel Di María who sweeps it over the keeper. 2-0." },
      { minute: "80'", type: "penalty", title: "Mbappé Rekindles the Flame", narrative: "Otamendi brings down Kolo Muani. Mbappé drills his penalty past the fingertips of Emiliano Martínez. Shockwaves across Qatar." },
      { minute: "81'", type: "goal", title: "The Immortal Volley", narrative: "Marcus Thuram loops a soft header backward, and Kylian Mbappé executes an impossible, high-intensity side-volley. A bullet into the far corner. 2-2 in ninety seconds." },
      { minute: "108'", type: "goal", title: "The King’s Rebound", narrative: "Lautaro Martínez slams a shot, saved by Lloris. Messi is there to bundle the ball over the line. Upamecano clears it, but the goal-line sensor vibrates. 3-2." },
      { minute: "118'", type: "penalty", title: "Hat-trick of Steel", narrative: "Mbappé hits a thunderous shot that clips Montiel’s arm. Mbappé steps up again, slamming home his third of the night. 3-3." },
      { minute: "120+3'", type: "save", title: "The Legend of the Stretched Leg", narrative: "Kolo Muani faces Emiliano Martínez completely alone. A winner for France seems guaranteed. Martínez stretches his left leg, blocking a shot that defied physics." }
    ],
    momentum: [
      { minute: 0, teamAIntensity: 50, teamBIntensity: 50, event: 'Kickoff' },
      { minute: 23, teamAIntensity: 85, teamBIntensity: 30, event: 'Messi Penalty' },
      { minute: 36, teamAIntensity: 95, teamBIntensity: 20, event: 'Di Maria Masterpiece' },
      { minute: 60, teamAIntensity: 75, teamBIntensity: 45, event: 'Midfield Strangle' },
      { minute: 80, teamAIntensity: 30, teamBIntensity: 88, event: 'Mbappé Penalty' },
      { minute: 81, teamAIntensity: 15, teamBIntensity: 98, event: 'Mbappé Volley Strike' },
      { minute: 105, teamAIntensity: 65, teamBIntensity: 55, event: 'Extra Time Rally' },
      { minute: 108, teamAIntensity: 90, teamBIntensity: 40, event: 'Messi Double' },
      { minute: 118, teamAIntensity: 35, teamBIntensity: 95, event: 'Mbappé Hat-trick' },
      { minute: 123, teamAIntensity: 5, teamBIntensity: 99, event: 'Muani Clean Shot Saved' }
    ],
    definingMoment: {
      title: "Dibu\'s Left Leg Save (123rd Minute)",
      description: "With milliseconds remaining, Kolo Muani strikes. Emiliano Martínez acts on raw animal instinct, lunging wide and carving out the most consequential block in tournament history."
    },
    tacticalView: {
      formationA: '4-3-3',
      formationB: '4-2-3-1',
      title: 'Scaloni’s Di María Gambit',
      narrative: 'Lionel Scaloni deployed Ángel Di María wide on the left flank, completely exposing Dembélé who was forced deep, unlocking French tactical defensive lines before Deschamps rearranged the team before half-time.'
    },
    characters: [
      { name: 'Lionel Messi', role: 'hero', status: 'Crowned Deity', nation: 'Argentina', quote: 'I suffered so much, but I knew God would give me this.', description: 'The timeless magician. At 35, he orchestrates every heartbeat of Argentina to conquer his final peak.' },
      { name: 'Kylian Mbappé', role: 'villain', status: 'Relentless Antagonist', nation: 'France', quote: 'We will return.', description: 'A terrifying athletic predator. He scored a hat-trick in the final but was left stranded on the silver podium.' }
    ],
    stats: {
      possessionA: 46,
      possessionB: 54,
      shotsA: 20,
      shotsB: 10,
      passesA: 642,
      passesB: 673,
      foulsA: 26,
      foulsB: 19
    },
    historicalImpact: 'The final coronation of Lionel Messi. It resolved the longstanding debate over his status among the absolute immortals, bringing an ecstatic third star to a generation of Argentines after 36 years of longing.'
  },
  {
    id: '2014-semi',
    title: 'The Night the Music Stopped',
    year: 2014,
    stage: 'Semi-final',
    teamA: 'Brazil',
    teamB: 'Germany',
    scoreA: 1,
    scoreB: 7,
    subtitle: 'Neymar-less hosts collapsed into an historic national trauma',
    era: 'cinematic',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Team_Germany_World_Cup_2014.jpg',
    stakes: 'Brazil expected to march into the Maracanã final to erase the ghosts of 1950. But in Belo Horizonte, an ultra-composed, cold German engine executed a surgical demolition of national hopes.',
    timeline: [
      { minute: "11'", type: "goal", title: "Müller Stands Alone", narrative: "Thomas Müller drifts completely unmarked inside the penalty box from a corner kick, side-footing past Júlio César." },
      { minute: "23'", type: "goal", title: "Klose Rewrites History", narrative: "Miroslav Klose scores his 16th tournament goal, overtaking Ronaldo Luis as the ultimate goal king, in Brazil, against Brazil." },
      { minute: "24'", type: "goal", title: "Kroos Hammer Stroke", narrative: "A cross skips through the Brazilian defense. Toni Kroos hits a powerful half-volley into the bottom corner. 3-0." },
      { minute: "26'", type: "goal", title: "Midfield Theft", narrative: "Kroos robs Fernandinho, plays a sequence of quick passes with Khedira, and walks it into an empty net. 4-0." },
      { minute: "29'", type: "goal", title: "The 5-0 Blitz", narrative: "Sami Khedira joins the feast. Five goals in 29 minutes. Spectators on television and in the stadium begin to cry." },
      { minute: "79'", type: "goal", title: "Schürrle High Art", narrative: "André Schürrle takes a pass, slams a wicked volley that strikes the underside of the crossbar and bounces in. 7-0." }
    ],
    momentum: [
      { minute: 0, teamAIntensity: 50, teamBIntensity: 50, event: 'Kickoff' },
      { minute: 11, teamAIntensity: 30, teamBIntensity: 80, event: 'Muller Goal' },
      { minute: 23, teamAIntensity: 10, teamBIntensity: 95, event: 'Klose Record Goal' },
      { minute: 26, teamAIntensity: 5, teamBIntensity: 99, event: 'Kroos Double Shock' },
      { minute: 29, teamAIntensity: 2, teamBIntensity: 99, event: 'Khedira Goal 5-0' },
      { minute: 45, teamAIntensity: 15, teamBIntensity: 80, event: 'Halftime Despair' },
      { minute: 69, teamAIntensity: 20, teamBIntensity: 90, event: 'Schurrle Sixth' },
      { minute: 79, teamAIntensity: 10, teamBIntensity: 95, event: 'Schurrle Seventh' },
      { minute: 90, teamAIntensity: 45, teamBIntensity: 60, event: 'Oscar Consolation' }
    ],
    definingMoment: {
      title: "The Six-Minute Collapse",
      description: "Between minutes 23 and 29, Germany scored four goals. It was an unprecedented state of competitive dissociation where a global superpower disintegrated in real time."
    },
    tacticalView: {
      formationA: '4-2-3-1',
      formationB: '4-3-3',
      title: 'The Open Midfield Crevasse',
      narrative: 'Without Thiago Silva (suspended) and Neymar (injured), Luiz Felipe Scolari fielded a hyper-emotional, disorganized press. Germany exploited the void with Khedira, Schweinsteiger, and Kroos dominating the center.'
    },
    characters: [
      { name: 'Toni Kroos', role: 'hero', status: 'Surgical Engineer', nation: 'Germany', quote: 'We came to win, but even we didn\'t expect this.', description: 'An icy, unflappable midfielder who picked apart Brazil with mechanical ease, scoring twice and setting up others.' },
      { name: 'David Luiz', role: 'villain', status: 'Tragic Captain', nation: 'Brazil', quote: 'I only wanted to bring joy to my people.', description: 'Left with the captain\'s armband, he chased ghosts all night, abandoning his post and sinking into despair.' }
    ],
    stats: {
      possessionA: 48,
      possessionB: 52,
      shotsA: 18,
      shotsB: 14,
      passesA: 542,
      passesB: 590,
      foulsA: 11,
      foulsB: 14
    },
    historicalImpact: 'Permanently baptized as the Mineirazo. It redefined Brazilian soccer trauma, superseding even the Maracanazo of 1950, and stands as the most shocking international team result of all time.'
  },
  {
    id: '1986-quarter',
    title: 'Angels and Demons in the Sky',
    year: 1986,
    stage: 'Quarter-final',
    teamA: 'Argentina',
    teamB: 'England',
    scoreA: 2,
    scoreB: 1,
    subtitle: 'Maradona\'s dual masterpiece of rogue genius and sheer divinity',
    era: 'broadcast',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Diego_Maradona_contra_Inglaterra_Mundial_1986.jpg',
    stakes: 'Just four years after the Falklands War (Guerra de las Malvinas), this was no longer a game. It was a proxy clash of national grief, pride, and sovereignty on the elevated stage of Mexico City.',
    timeline: [
      { minute: "51'", type: "drama", title: "The Hand of God", narrative: "Diego Maradona drives into the box, connects with an awkward clearance, and punches the ball past Peter Shilton's glove. The referee misses it, and Diego celebrates." },
      { minute: "55'", type: "goal", title: "The Goal of the Century", narrative: "One man, 60 meters, 10 seconds. Diego receives the ball, spins past two English players, glides over three more, rounds Shilton, and tucks it home. Divinity." },
      { minute: "81'", type: "goal", title: "Lineker Clawback", narrative: "Gary Lineker, the clinical English striker, heads a cross home at the back post to set up a terrifying, frantic final ten minutes." }
    ],
    momentum: [
      { minute: 0, teamAIntensity: 50, teamBIntensity: 50, event: 'Tense Kickoff' },
      { minute: 30, teamAIntensity: 55, teamBIntensity: 45, event: 'Physical Midfield Clashes' },
      { minute: 51, teamAIntensity: 85, teamBIntensity: 35, event: 'The Hand of God Controversy' },
      { minute: 55, teamAIntensity: 99, teamBIntensity: 15, event: 'The Goal of the Century' },
      { minute: 75, teamAIntensity: 80, teamBIntensity: 50, event: 'Argentina Dominance' },
      { minute: 81, teamAIntensity: 50, teamBIntensity: 85, event: 'Lineker Life-line' },
      { minute: 90, teamAIntensity: 60, teamBIntensity: 40, event: 'Full Time Triumph' }
    ],
    definingMoment: {
      title: "The Cosmos Turn (55th Minute)",
      description: "Receiving the ball in his own half, Maradona performs an elegant double-spin to beat Beardsley and Reid, creating a 60-meter canvas that redefined what human feet can do."
    },
    tacticalView: {
      formationA: '3-5-2',
      formationB: '4-4-2',
      title: 'Bilardo\'s Asymmetrical Shield',
      narrative: 'Argentina head coach Carlos Bilardo introduced a 3-5-2 layout specifically engineered to free Maradona from defensive duties while choking the wing lanes of England.'
    },
    characters: [
      { name: 'Diego Maradona', role: 'hero', status: 'Deified Rebellious Hero', nation: 'Argentina', quote: 'A little with the head of Maradona, a little with the hand of God.', description: 'The absolute master. In a span of 240 seconds, he embodied both the clever street urchin and the supreme artist.' },
      { name: 'Peter Shilton', role: 'villain', status: 'The Defeated Guardian', nation: 'England', quote: 'He had greatness, but no sportsmanship.', description: 'The legendary England goalkeeper who was outjumped, and outpunched, by the hand of a trickster.' }
    ],
    stats: {
      possessionA: 51,
      possessionB: 49,
      shotsA: 15,
      shotsB: 11,
      passesA: 412,
      passesB: 395,
      foulsA: 18,
      foulsB: 22
    },
    historicalImpact: 'This match cemented Diego Maradona as a permanent god in Argentina. The victory was felt as a metaphorical resolution of the Falklands conflict, transforming a soccer match into a piece of sacred regional lore.'
  },
  {
    id: '1970-final',
    title: 'The Beautiful Symphony',
    year: 1970,
    stage: 'Final',
    teamA: 'Brazil',
    teamB: 'Italy',
    scoreA: 4,
    scoreB: 1,
    subtitle: 'The zenith of Brazilian Samba overload beats Catenaccio',
    era: 'poster',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Carlos_Alberto_Torres_1970.jpg',
    stakes: 'A battle of ideological blockbusters. The raw Samba creative freedom of Brazil went head-on against the rigid, military Catenaccio lock-and-key system of Italy.',
    timeline: [
      { minute: "18'", type: "goal", title: "Pelé Hovers in Air", narrative: "Rivelino sends a cross. Pelé leaps high, defying gravity to linger in the air before header-smashing past Albertosi." },
      { minute: "37'", type: "goal", title: "Boninsegna Snaps Equalizer", narrative: "Taking advantage of an uncharacteristic slip in the Brazilian defense, Boninsegna darts through and sweeps it in." },
      { minute: "66'", type: "goal", title: "Gérson Rocket Launch", narrative: "Gérson cuts onto his magical left foot and releases a projectile from outside the area that flies into the corner. 2-1." },
      { minute: "71'", type: "goal", title: "Jairzinho Bundles", narrative: "Pelé nods a long pass into the path of Jairzinho, who scrambles it home, scoring in every single match of the tournament." },
      { minute: "86'", type: "goal", title: "The Ultimate Team Symphony", narrative: "Nine players touch the ball. Pelé delivers a blind, casual horizontal pass, and Carlos Alberto arrives like a freight train to crash it home." }
    ],
    momentum: [
      { minute: 0, teamAIntensity: 60, teamBIntensity: 40, event: 'Kickoff' },
      { minute: 18, teamAIntensity: 85, teamBIntensity: 30, event: 'Pele Header' },
      { minute: 37, teamAIntensity: 40, teamBIntensity: 75, event: 'Italy Equalizer' },
      { minute: 66, teamAIntensity: 90, teamBIntensity: 25, event: 'Gerson Bomb' },
      { minute: 71, teamAIntensity: 95, teamBIntensity: 20, event: 'Jairzinho Tap-in' },
      { minute: 86, teamAIntensity: 100, teamBIntensity: 10, event: 'Carlos Alberto Iconic Goal' }
    ],
    definingMoment: {
      title: "The Carlos Alberto Strike (86th Minute)",
      description: "The complete tactical crystallization of beautiful football. Simple, collaborative, mesmerizing, and closed with absolute physical force."
    },
    tacticalView: {
      formationA: '1-4-5 (Attacking Carousel)',
      formationB: '1-3-3-3 (Catenaccio)',
      title: 'Five Number 10s on the Field',
      narrative: 'Mario Zagallo fielded Pelé, Tostão, Gérson, Rivellino, and Jairzinho together—all clinical playmakers—overloading Italy\'s rigid man-to-man marking.'
    },
    characters: [
      { name: 'Pelé', role: 'hero', status: 'Eternal King', nation: 'Brazil', quote: 'I told myself before the game, he is made of skin and bones like everyone else. But I was wrong.', description: 'Winning his third Jules Rimet crown, Pelé completed his transformation from youthful wonder into an immortal sporting king.' },
      { name: 'Giacinto Facchetti', role: 'iconic', status: 'The Stretched Leader', nation: 'Italy', quote: 'They were simply unplayable.', description: 'The absolute icon of Italian defense who was stretched to breaking point by the relentless rotation of the Seleção.' }
    ],
    stats: {
      possessionA: 59,
      possessionB: 41,
      shotsA: 26,
      shotsB: 12,
      passesA: 605,
      passesB: 489,
      foulsA: 15,
      foulsB: 18
    },
    historicalImpact: 'Brazil won the Jules Rimet trophy permanently. Football was globalized as gorgeous pop-art, and this team is universally recognized as the absolute aesthetic gold standard of football history.'
  },
  {
    id: '2006-final',
    title: 'The Headbutt and the Heavens',
    year: 2006,
    stage: 'Final',
    teamA: 'Italy',
    teamB: 'France',
    scoreA: 1,
    scoreB: 1,
    shootoutScore: '5-3 p',
    subtitle: 'Zinedine Zidane\'s shocking exit and the Azzurri redemption',
    era: 'broadcast',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Zinedine_Zidane_by_Tasnim_1.jpg',
    stakes: 'Zinedine Zidane returned from retirement to carry France on one final, majestic crusade. To stop him stood an Italian nation forged in domestic scandal, ready to fight with every fiber.',
    timeline: [
      { minute: "7'", type: "penalty", title: "Zidane\'s Cold Panenka", narrative: "French penalty awarded. Zidane steps up, chips a Panenka that hits the underside of the crossbar and crosses the line. High-risk art." },
      { minute: "19'", type: "goal", title: "Materazzi Towers High", narrative: "Marco Materazzi leaps above the French defense to meet Andrea Pirlo’s floating corner, blasting a header home. 1-1." },
      { minute: "104'", type: "save", title: "Buffon Fingertip Stretch", narrative: "Zidane connects with a powerful header. Buffon flings his arm backward to tip the ball over the bar. Massive sliding door." },
      { minute: "110'", type: "drama", title: "The Shock of the Century", narrative: "Provoked by words, Zinedine Zidane turns and strikes Materazzi with his head. Red card. Zidane walks past the trophy into retirement." }
    ],
    momentum: [
      { minute: 0, teamAIntensity: 50, teamBIntensity: 50, event: 'Kickoff' },
      { minute: 7, teamAIntensity: 30, teamBIntensity: 85, event: 'Zidane Panenka' },
      { minute: 19, teamAIntensity: 80, teamBIntensity: 45, event: 'Materazzi Equalizer' },
      { minute: 60, teamAIntensity: 55, teamBIntensity: 55, event: 'Tense Chess-match' },
      { minute: 104, teamAIntensity: 35, teamBIntensity: 85, event: 'Buffon Saves Zidane Header' },
      { minute: 110, teamAIntensity: 75, teamBIntensity: 10, event: 'Zidane Red Card Shock' },
      { minute: 120, teamAIntensity: 60, teamBIntensity: 40, event: 'Shootout Preparation' }
    ],
    definingMoment: {
      title: "The Long Walk (110th Minute)",
      description: "Zinedine Zidane, walking off the pitch for the last time, passes the gold trophy without a glance—a tragic ending of a god who fell to human weakness."
    },
    tacticalView: {
      formationA: '4-4-1-1',
      formationB: '4-2-3-1',
      title: 'Lippi’s Lockout',
      narrative: 'Marcello Lippi created an unbreakable box of Gattuso and Cannavaro to surround Zidane, choking his supply lines and forcing France to look wide.'
    },
    characters: [
      { name: 'Fabio Cannavaro', role: 'hero', status: 'The Berlin Wall', nation: 'Italy', quote: 'We won because we had a mountain of heart.', description: 'The diminutive captain who was near-flawless the entire tournament, securing the World Cup and later the Ballon d\'Or.' },
      { name: 'Zinedine Zidane', role: 'villain', status: 'Tragic Master', nation: 'France', quote: 'I ask forgiveness, but I do not regret.', description: 'The majestic wizard who fell from grace in a single moment of anger, ending one of the greatest careers in soccer history.' }
    ],
    stats: {
      possessionA: 45,
      possessionB: 55,
      shotsA: 10,
      shotsB: 17,
      passesA: 512,
      passesB: 584,
      foulsA: 17,
      foulsB: 24
    },
    historicalImpact: 'Italy won its fourth star, proving their resilience amidst a massive home scandal. Zidane\'s headbutt became one of the most parsed pop-culture events in modern human history.'
  },
  {
    id: '1950-decider',
    title: 'The Silent Giant',
    year: 1950,
    stage: 'Deciding Match',
    teamA: 'Uruguay',
    teamB: 'Brazil',
    scoreA: 2,
    scoreB: 1,
    subtitle: 'The ultimate silence of 200,000 souls at the Maracanã',
    era: 'vintage',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Obdulio_Varela_1950.jpg',
    stakes: 'Brazil only needed a draw to win the World Cup in their newly built cathedral, the Maracanã. An entire nation had already written the celebrating songs. Uruguay walked in as complete lambs to slaughter.',
    timeline: [
      { minute: "47'", type: "goal", title: "Friaça Strikes First", narrative: "The home crowd erupts as Friaça drills it in. The stadium goes wild with firecrackers and horns. Celebrations spark." },
      { minute: "66'", type: "goal", title: "The Equalizer of Hope", narrative: "Uruguay winger Ghiggia runs past his marker, crosses for Schiaffino to blast it into the roof of the net. Volume drops slightly." },
      { minute: "79'", type: "goal", title: "The Strike that Silenced Brazil", narrative: "Ghiggia breaks on the right wing again. Expecting a cross, keeper Barbosa cheats offline. Ghiggia slots a low shot into the tight near-post gap." },
      { minute: "90'", type: "drama", title: "Absolute Mortification", narrative: "The referee blows his whistle. The Maracanã is completely silent. 200,000 people are paralyzed, unable to process the mourning." }
    ],
    momentum: [
      { minute: 0, teamAIntensity: 30, teamBIntensity: 70, event: 'Kickoff under hostile pressure' },
      { minute: 30, teamAIntensity: 40, teamBIntensity: 80, event: 'Brazil relentless attacking waves' },
      { minute: 47, teamAIntensity: 10, teamBIntensity: 95, event: 'Friaca Goal' },
      { minute: 60, teamAIntensity: 35, teamBIntensity: 80, event: 'Uruguay steady counter tactics' },
      { minute: 66, teamAIntensity: 70, teamBIntensity: 65, event: 'Schiaffino Goal' },
      { minute: 79, teamAIntensity: 90, teamBIntensity: 30, event: 'Ghiggia Historic near-post goal' },
      { minute: 90, teamAIntensity: 95, teamBIntensity: 5, event: 'Stunned Silence' }
    ],
    definingMoment: {
      title: "The Near-Post Laser (79th Minute)",
      description: "Uruguay wing champion Alcides Ghiggia targets the tiny near-post crack. Moacir Barbosa, anticipating a cross, slips sideways. The ball slides in, shifting the axis of South American sport forever."
    },
    tacticalView: {
      formationA: '1-3-2-4 (Diagonal Varela)',
      formationB: '3-2-2-3 (Diagonal WM)',
      title: 'Varela\'s Psychology Block',
      narrative: 'When Brazil scored, Uruguay captain Obdulio Varela walked slowly with the ball, arguing with officials to purposely waste time and allow the Brazilian crowd noise to pass, breaking home competitive rhythm.'
    },
    characters: [
      { name: 'Alcides Ghiggia', role: 'hero', status: 'The Silent Assassin', nation: 'Uruguay', quote: 'Only three people have silenced the Maracanã: Frank Sinatra, the Pope, and me.', description: 'The rapid right winger whose cross and shot dismantled Brazil\'s home party.' },
      { name: 'Moacir Barbosa', role: 'villain', status: 'The Scapegoat', nation: 'Brazil', quote: 'The maximum punishment in Brazil is 30 years, but I am serving 50.', description: 'The Brazilian keeper who carried the blame of the nation for a single near-post error, isolated for the rest of his life.' }
    ],
    stats: {
      possessionA: 38,
      possessionB: 62,
      shotsA: 9,
      shotsB: 23,
      passesA: 290,
      passesB: 412,
      foulsA: 19,
      foulsB: 12
    },
    historicalImpact: 'Brazil suffered a deep cultural crisis. The nation changed its complete playing uniform from white to yellow and green to wipe out the bad luck of the match, beginning the modern yellow reign.'
  }
];

export function HistoricMatchesVault({ 
  activeMatchId, 
  onClose,
  onExploreMatches,
  onExploreNations,
  onExploreLegends,
  onExploreStadiums,
  onExploreTournament
}: { 
  activeMatchId?: string; 
  onClose?: () => void;
  onExploreMatches?: (matchId: string) => void;
  onExploreNations?: (nationId: string) => void;
  onExploreLegends?: (legendId: string) => void;
  onExploreStadiums?: (stadiumId: string) => void;
  onExploreTournament?: (year: number) => void;
}) {
  const [selectedMatch, setSelectedMatch] = useState<MatchDetails | null>(
    activeMatchId ? CLASSIC_MATCHES.find(m => m.id === activeMatchId) || null : null
  );

  const [shareOpen, setShareOpen] = useState(false);

  // Filters for Archive shelves
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEra, setFilterEra] = useState<string>('all');
  const [filterStage, setFilterStage] = useState<string>('all');

  // Interactive timeline active event
  const [hoveredMomentum, setHoveredMomentum] = useState<number | null>(null);
  const [expandedTimelineIndex, setExpandedTimelineIndex] = useState<number | null>(0);

  // Sound Integration
  const audioEngineRef = useRef<StadiumAudioEngine | null>(null);
  const [audioMuted, setAudioMuted] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [runningSubtitle, setRunningSubtitle] = useState("");
  const [showSubtitlePrompt, setShowSubtitlePrompt] = useState(false);
  const [commentarySnippet, setCommentarySnippet] = useState<CommentarySnippet | null>(null);

  // When a match is selected, boot its custom soundscape
  useEffect(() => {
    if (selectedMatch) {
      if (audioEngineRef.current) {
        audioEngineRef.current.stop();
      }

      // Initialize sound engine for the selected match year
      const engine = new StadiumAudioEngine(selectedMatch.year);
      audioEngineRef.current = engine;
      engine.init();
      engine.setVolume(volume);
      setAudioMuted(engine.getMutedState());

      // Commentary preparation
      const commentary = getDefaultCommentary(selectedMatch.year);
      setCommentarySnippet(commentary);

      // Auto speak intro subtitle after a cinematic transition delay
      const voiceDelayTimer = setTimeout(() => {
        triggerCommentaryVoice(commentary);
      }, 2500);

      window.scrollTo({ top: 0, behavior: 'smooth' });

      return () => {
        clearTimeout(voiceDelayTimer);
        engine.stop();
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        setIsSpeaking(false);
        setRunningSubtitle("");
        setShowSubtitlePrompt(false);
      };
    }
  }, [selectedMatch]);

  const triggerCommentaryVoice = (overrideSnippet?: CommentarySnippet) => {
    const activeSnippet = overrideSnippet || commentarySnippet;
    if (!activeSnippet) return;

    if (isSpeaking) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setRunningSubtitle("");
      setShowSubtitlePrompt(false);
      return;
    }

    setIsSpeaking(true);
    setShowSubtitlePrompt(true);
    setRunningSubtitle("");

    const fullText = activeSnippet.transcript;
    let charIdx = 0;
    const interval = setInterval(() => {
      setRunningSubtitle((prev) => prev + fullText.charAt(charIdx));
      charIdx++;
      if (charIdx >= fullText.length) {
        clearInterval(interval);
      }
    }, 30);

    speakBroadcaster(
      activeSnippet,
      () => {
        clearInterval(interval);
        setRunningSubtitle(fullText);
        setIsSpeaking(false);
        // Retain subtitle briefly, then hide
        setTimeout(() => {
          setShowSubtitlePrompt(false);
        }, 3500);
      },
      audioMuted
    );
  };

  const handleVolumeChange = (newVal: number) => {
    setVolume(newVal);
    if (audioEngineRef.current) {
      audioEngineRef.current.setVolume(newVal);
    }
  };

  const toggleMute = () => {
    if (audioEngineRef.current) {
      const currentlyMuted = audioEngineRef.current.toggleMute();
      setAudioMuted(currentlyMuted);
      if (currentlyMuted) {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setRunningSubtitle("");
        setShowSubtitlePrompt(false);
      } else {
        audioEngineRef.current.triggerCheerSwell();
      }
    }
  };

  const triggerSwell = () => {
    if (audioEngineRef.current && !audioMuted) {
      audioEngineRef.current.triggerCheerSwell();
    }
  };

  // Archive Filter Logic
  const filteredMatches = CLASSIC_MATCHES.filter(match => {
    const matchesSearch = 
      match.teamA.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.teamB.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.year.toString().includes(searchQuery);

    if (!matchesSearch) return false;

    if (filterEra !== 'all') {
      if (filterEra === 'vintage' && match.year > 1950) return false;
      if (filterEra === 'poster' && (match.year <= 1950 || match.year > 1980)) return false;
      if (filterEra === 'broadcast' && (match.year <= 1980 || match.year > 2008)) return false;
      if (filterEra === 'cinematic' && match.year <= 2008) return false;
    }

    if (filterStage !== 'all' && match.stage.toLowerCase() !== filterStage.toLowerCase()) {
      return false;
    }

    return true;
  });

  // Theme configuration based on Era
  const getEraTheme = (era: 'vintage' | 'poster' | 'broadcast' | 'cinematic') => {
    switch (era) {
      case 'vintage':
        return {
          wrapperClass: 'bg-[#1b1915] text-[#eadcb9] font-serif selection:bg-[#4a3f2b] selection:text-[#f7ebd0]',
          borderClass: 'border-[#5c4e36]/35',
          textMuted: 'text-[#9c8a6c]',
          primaryAccent: 'text-[#cfa65c]',
          bgLight: 'bg-[#211f1a]',
          overlayClass: 'sepia-[0.4] grayscale-[0.3]',
          subtitleClass: 'font-serif italic text-[#c8ba9b]',
          cardClass: 'bg-[#292620] border-[#5c4e36]/40',
          timelineTheme: 'bg-[#3b362c]'
        };
      case 'poster':
        return {
          wrapperClass: 'bg-[#18110b] text-[#ebd8c8] font-sans selection:bg-[#D4AF37] selection:text-black',
          borderClass: 'border-[#ff6f00]/30',
          textMuted: 'text-[#b19985]',
          primaryAccent: 'text-[#ff5500]',
          bgLight: 'bg-[#211812]',
          overlayClass: 'saturate-[1.3] brightness-95 text-orange-200',
          subtitleClass: 'font-sans uppercase tracking-[0.2em] text-[#ff8800]',
          cardClass: 'bg-[#241a13] border-2 border-[#ff5500]/25 rounded-none',
          timelineTheme: 'bg-[#ff5500]'
        };
      case 'broadcast':
        return {
          wrapperClass: 'bg-[#0b1016] text-[#ccdee9] font-mono selection:bg-[#00ffd2] selection:text-black',
          borderClass: 'border-[#009bde]/30',
          textMuted: 'text-[#7e9ba9]',
          primaryAccent: 'text-[#00ffd2]',
          bgLight: 'bg-[#111822]',
          overlayClass: 'contrast-[1.2] brightness-90 saturate-[0.8] shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]',
          subtitleClass: 'font-mono uppercase tracking-[0.1em] text-[#009bde]',
          cardClass: 'bg-[#0f1620] border border-[#009bde]/20 shadow-[0_0_15px_rgba(0,155,222,0.15)] rounded-md',
          timelineTheme: 'bg-[#009bde]'
        };
      case 'cinematic':
      default:
        return {
          wrapperClass: 'bg-[#090909] text-[#F5F2EA] font-sans selection:bg-[#D4AF37] selection:text-[#090909]',
          borderClass: 'border-[#4E5661]/15',
          textMuted: 'text-[#69707A]',
          primaryAccent: 'text-[#D4AF37]',
          bgLight: 'bg-[#111111]',
          overlayClass: 'opacity-100',
          subtitleClass: 'font-sans uppercase tracking-[0.3em] text-[#D4AF37]',
          cardClass: 'bg-[#111111] border border-[#4E5661]/20 rounded-md',
          timelineTheme: 'bg-[#D4AF37]'
        };
    }
  };

  return (
    <div id="matches-vault-view" className="w-full min-h-screen bg-[#090909] text-[#F5F2EA] relative">
      <AnimatePresence mode="wait">
        {!selectedMatch ? (
          // --- MATCH SELECT / DISCOVERY SCREEN (The Archives Shelves) ---
          <motion.div 
            key="discovery"
            className="max-w-7xl mx-auto px-6 py-24 md:py-32"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
          >
            {/* Opening cinematic statement */}
            <div className="text-center mb-16 md:mb-24">
              <motion.span 
                className="font-sans text-[#D4AF37] tracking-[0.4em] uppercase text-xs font-bold mb-3 block"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                World Cup Vault • Cinematic Records
              </motion.span>
              <motion.h1 
                className="font-serif text-4xl md:text-6xl text-[#F5F2EA] tracking-tight mb-6 leading-tight max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Historic Matches Vault
              </motion.h1>
              <div className="h-px w-24 bg-[#D4AF37] mx-auto mb-8 opacity-40" />
              <motion.blockquote 
                className="font-serif text-xl md:text-2xl italic text-[#69707A] font-light max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                "Some matches decide champions. Others define generations."
              </motion.blockquote>
            </div>

            {/* Custom Interactive Shelf Filter controls */}
            <div className="bg-[#111111]/80 border border-[#4E5661]/20 p-6 rounded-md mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#69707A]" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Query by Nation, Year, or Arena details..."
                  className="w-full bg-[#090909] text-[#F5F2EA] border border-[#4E5661]/25 py-2.5 pl-11 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
                />
              </div>

              {/* Shelf Controls - Era & Stage */}
              <div className="flex flex-wrap gap-4 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-[10px] uppercase text-[#69707A] tracking-wider font-bold">Era:</span>
                  <select 
                    value={filterEra}
                    onChange={(e) => setFilterEra(e.target.value)}
                    className="bg-[#090909] text-[#DDD7C8] border border-[#4E5661]/20 py-1.5 px-3 rounded-none text-xs focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="all">All Timelines</option>
                    <option value="vintage">1930 - 1950 (Vintage)</option>
                    <option value="poster">1954 - 1978 (Poster Era)</option>
                    <option value="broadcast">1982 - 2006 (Broadcast)</option>
                    <option value="cinematic">2010 - 2026 (Cinematic)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-sans text-[10px] uppercase text-[#69707A] tracking-wider font-bold">Stage:</span>
                  <select 
                    value={filterStage}
                    onChange={(e) => setFilterStage(e.target.value)}
                    className="bg-[#090909] text-[#DDD7C8] border border-[#4E5661]/20 py-1.5 px-3 rounded-none text-xs focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="all">All Stages</option>
                    <option value="final">Finals</option>
                    <option value="semi-final">Semi-Finals</option>
                    <option value="quarter-final">Quarter-Finals</option>
                    <option value="deciding match">Deciding Matches</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Shelves Layout - The Archive Wall */}
            <div className="space-y-16">
              <div className="relative border-b-4 border-[#3a3528] pb-10">
                <div className="flex justify-between items-end mb-6">
                  <span className="font-serif text-[#D4AF37] text-lg italic tracking-wider">Curated Chronicle Shelf</span>
                  <span className="font-mono text-[10px] text-[#69707A]">{filteredMatches.length} Matches Found</span>
                </div>

                {filteredMatches.length === 0 ? (
                  <div className="text-center py-20 text-[#69707A] italic font-serif">
                    No historic documents found matching the search matrix.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredMatches.map((match, idx) => {
                      const eraColors = getEraTheme(match.era);
                      return (
                        <motion.div 
                          key={match.id}
                          className="group relative cursor-pointer flex flex-col justify-between bg-[#111] border border-[#4E5661]/20 overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/50"
                          onClick={() => setSelectedMatch(match)}
                          whileHover={{ scale: 1.01 }}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-5%" }}
                          transition={{ 
                            type: 'spring', 
                            stiffness: 70, 
                            damping: 15,
                            delay: (idx % 3) * 0.08,
                            duration: 0.8
                          }}
                        >
                          {/* Image Thumbnail Header with overlay */}
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={match.heroImage} 
                              alt={match.title}
                              className={`w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 ${eraColors.overlayClass}`}
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                            <span className="absolute top-4 left-4 bg-black/60 backdrop-blur text-[#D4AF37] border border-[#D4AF37]/30 text-[9px] font-mono tracking-widest px-2.5 py-1 uppercase">
                              {match.year} World Cup
                            </span>
                          </div>

                          <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-center mb-3">
                                <span className={`font-mono text-[9px] uppercase tracking-widest ${eraColors.primaryAccent}`}>
                                  {match.stage}
                                </span>
                                <span className="font-mono text-xs text-[#69707A]">{match.era} aesthetic</span>
                              </div>

                              <h3 className="font-serif text-[#F5F2EA] text-xl group-hover:text-[#D4AF37] transition-colors mb-2">
                                {match.title}
                              </h3>
                              <p className="font-sans text-[#69707A] text-xs leading-relaxed mb-6 line-clamp-2">
                                {match.subtitle}
                              </p>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-[#4E5661]/15">
                              <span className="font-serif text-[#F5F2EA] text-sm group-hover:underline">
                                Relive Chronicles
                              </span>
                              <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold">
                                <span>{match.teamA}</span>
                                <span className="text-[#69707A] font-light">vs</span>
                                <span>{match.teamB}</span>
                              </div>
                            </div>
                          </div>

                          {/* Decorative Corner Lights */}
                          <div className="absolute top-0 right-0 w-2 h-2 bg-gradient-to-tr from-transparent to-[#D4AF37]/40" />
                        </motion.div>
                      );
                    })}
                  </div>
                )}
                {/* Visual Shelf Board underneath of the grid cards */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-[#4a3f2b] to-[#252014] translate-y-full border-t border-[#D4AF37]/10" />
              </div>
            </div>

            {/* Quick close page layout */}
            {onClose && (
              <div className="mt-20 text-center">
                <button 
                  onClick={onClose}
                  className="px-8 py-3.5 border border-[#4E5661]/40 text-[#69707A] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all font-sans text-xs uppercase tracking-widest font-semibold"
                >
                  Return to Main Lobby
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          // --- DETAILED DOCUMENTARY VIEW (Cinema Mode) ---
          (() => {
            const era = getEraTheme(selectedMatch.era);
            return (
              <motion.div 
                key={selectedMatch.id}
                className={`w-full min-h-screen ${era.wrapperClass} pb-32 relative`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Floating Media & Navigation Headrail */}
                <div className="sticky top-0 left-0 right-0 z-[450] bg-black/90 backdrop-blur-md px-6 py-4 border-b border-[#4E5661]/20 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        if (audioEngineRef.current) audioEngineRef.current.stop();
                        setSelectedMatch(null);
                      }}
                      className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest font-bold text-[#F5F2EA] hover:text-[#D4AF37] transition-colors"
                    >
                      <ArrowLeft size={14} />
                      <span>Back to Archive Shelves</span>
                    </button>

                    <button
                      onClick={() => setShareOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-1 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-white text-[9px] font-bold uppercase tracking-wider transform transition-all active:scale-95 cursor-pointer rounded-xs"
                      title="Share Match Snapshot"
                    >
                      <Share2 size={12} />
                      <span>Share Snapshot</span>
                    </button>
                  </div>

                  {/* Sound indicators and volume controls */}
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={toggleMute}
                      className={`w-8 h-8 rounded-full border border-current flex items-center justify-center transition-all ${
                        audioMuted ? 'text-[#ff4d4d] bg-red-950/20' : 'text-[#D4AF37] bg-[#D4AF37]/10'
                      }`}
                      title={audioMuted ? "Unmute Soundscape" : "Mute Soundscape"}
                    >
                      {audioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>

                    <div className="hidden sm:flex items-center gap-2">
                      <span className="font-mono text-[8px] uppercase text-[#69707A]">Stadium Out:</span>
                      <input 
                        type="range"
                        min="0"
                        max="0.9"
                        step="0.05"
                        value={volume}
                        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                        className="w-12 h-1 bg-[#4E5661]/30 appearance-none cursor-pointer accent-[#D4AF37]"
                      />
                      <span className="font-mono text-[8px] text-[#D4AF37]">{Math.round(volume * 100)}%</span>
                    </div>

                    <button
                      onClick={() => triggerCommentaryVoice()}
                      className="hidden md:flex items-center gap-2 px-3  py-1.5 border border-[#4E5661]/35 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all text-[9px] uppercase tracking-wider font-bold"
                    >
                      <Radio size={12} className={isSpeaking ? "text-[#D4AF37] animate-pulse" : "opacity-60"} />
                      <span>{isSpeaking ? "Mute Broadcast" : "Tune Broadcaster"}</span>
                    </button>

                    <button 
                      onClick={triggerSwell}
                      disabled={audioMuted}
                      className="px-3.5 py-1 border border-[#D4AF37]/35 text-[#D4AF37] disabled:opacity-30 disabled:border-[#69707A]/25 disabled:text-[#69707A] text-[9px] font-bold uppercase hover:bg-[#D4AF37]/10 transform transition-all active:scale-95"
                    >
                      Crowd Swell
                    </button>
                  </div>
                </div>

                {/* CHAPTER 1: MATCH INTRODUCTION */}
                <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={selectedMatch.heroImage} 
                      alt={selectedMatch.title}
                      className={`w-full h-full object-cover select-none brightness-40 saturate-[0.85] filter ${era.overlayClass}`}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                  </div>

                  <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <motion.span 
                      className={`${era.subtitleClass} block mb-6`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      FIFA World Cup {selectedMatch.year} • {selectedMatch.stage}
                    </motion.span>

                    <motion.div 
                      className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-14 my-8"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex flex-col items-center md:items-end">
                        <span className="font-serif text-4xl md:text-6xl text-white font-black uppercase tracking-tight">
                          {selectedMatch.teamA}
                        </span>
                        <span className="font-mono text-xs text-[#69707A] mt-1">HOST / REPRESENTATIVE</span>
                      </div>

                      <div className="flex flex-col items-center justify-center bg-black/60 border border-[#D4AF37]/40 px-8 py-4 min-w-[150px]">
                        <span className="font-sans text-[9px] text-[#69707A] uppercase tracking-widest mb-1">Final Score</span>
                        <span className="font-serif text-3xl md:text-5xl text-[#D4AF37] font-semibold">
                          {selectedMatch.scoreA} - {selectedMatch.scoreB}
                        </span>
                        {selectedMatch.shootoutScore && (
                          <span className="font-mono text-xs text-red-500 font-bold mt-1.5 uppercase tracking-widest animate-pulse">
                            {selectedMatch.shootoutScore}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col items-center md:items-start">
                        <span className="font-serif text-4xl md:text-6xl text-white font-black uppercase tracking-tight">
                          {selectedMatch.teamB}
                        </span>
                        <span className="font-mono text-xs text-[#69707A] mt-1">CHALLENGER / VISITOR</span>
                      </div>
                    </motion.div>

                    <motion.h2 
                      className="font-serif text-3xl md:text-5xl text-white italic font-normal max-w-3xl mx-auto mt-10 leading-snug"
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      "{selectedMatch.title}"
                    </motion.h2>

                    <motion.p 
                      className={`font-sans ${era.textMuted} text-xs uppercase tracking-[0.2em] mt-3`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      {selectedMatch.subtitle}
                    </motion.p>
                  </div>

                  {/* Absolute subtle bottom indicator */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
                    <span className="font-sans text-[8px] uppercase tracking-widest text-[#69707A]">Scroll down to relive</span>
                    <span className="text-[#D4AF37] text-md">↓</span>
                  </div>
                </section>

                {/* SUBTITLES TRANSMISSION BOX (STATIC FLOATING BAR DURING BROADCAST SPEECH EXPLAINER) */}
                <AnimatePresence>
                  {showSubtitlePrompt && (
                    <motion.div 
                      className="fixed bottom-6 left-6 right-6 md:left-1/2 md:right-auto md:-translate-x-1/2 z-[490] max-w-2xl w-[calc(100%-3rem)] bg-black/95 backdrop-blur-md border border-[#D4AF37]/50 p-4 md:p-5 rounded-sm shadow-2xl flex gap-4 items-center"
                      initial={{ opacity: 0, y: 50, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 30, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 200, damping: 22 }}
                    >
                      <div className="w-9 h-9 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/35 flex items-center justify-center shrink-0">
                        <Radio size={16} className={`${era.primaryAccent} animate-pulse`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4 mb-0.5">
                          <span className="font-mono text-[8px] uppercase tracking-widest text-[#D4AF37] font-extrabold flex items-center gap-1">
                            <span className="w-1 h-1 bg-[#D4AF37] rounded-full animate-ping"></span>
                            ACTIVE TRANSMISSION
                          </span>
                          <span className="font-mono text-[8px] uppercase tracking-widest text-[#69707A] font-semibold italic truncate">
                            {commentarySnippet?.commentator}
                          </span>
                        </div>
                        <p className="font-serif text-[#F5F2EA] text-xs sm:text-sm leading-relaxed italic">
                          {runningSubtitle || "Tuning radio frequency..."}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CHAPTER 2: THE STAKES */}
                <section className={`py-24 px-6 md:px-12 border-t ${era.borderClass} ${era.bgLight} relative`}>
                  <div className="max-w-4xl mx-auto text-center">
                    <Trophy size={44} className="text-[#D4AF37] mx-auto mb-6 opacity-60" strokeWidth={1} />
                    <p className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-[9px] mb-4 font-bold">Chapter II • The Stakes</p>
                    <h3 className="font-serif text-3xl md:text-5xl text-white font-semibold mb-8 italic">
                      Why Did This Match Matter?
                    </h3>
                    <p className="font-serif text-[#DDD7C8]/90 text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto italic font-light">
                      "{selectedMatch.stakes}"
                    </p>
                  </div>
                </section>

                {/* CHAPTER 3: INTERACTIVE TIMELINE */}
                <section className={`py-24 px-6 md:px-12 border-t ${era.borderClass}`}>
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                      <Clock size={36} className="text-[#D4AF37] mx-auto mb-4 opacity-60" />
                      <p className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-[9px] mb-2 font-bold">Chapter III • Chronicles in Real Time</p>
                      <h3 className="font-serif text-3xl md:text-4xl text-white font-semibold">
                        Dramatic Match Timeline
                      </h3>
                      <p className="font-sans text-[#69707A] text-xs mt-2">
                        Click any chapter point to expand the detailed historical story log.
                      </p>
                    </div>

                    {/* Vertical Timeline implementation */}
                    <div className="relative border-l-2 border-[#4E5661]/25 ml-4 md:ml-24 space-y-12">
                      {selectedMatch.timeline.map((event, idx) => {
                        const isExpanded = expandedTimelineIndex === idx;
                        return (
                          <div key={idx} className="relative pl-6 md:pl-10">
                            {/* Bullet marker */}
                            <button 
                              onClick={() => setExpandedTimelineIndex(isExpanded ? null : idx)}
                              className={`absolute -left-[14px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono border transition-all ${
                                isExpanded 
                                  ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-[0_0_10px_rgba(212,175,55,0.4)]' 
                                  : 'bg-black border-[#4E5661]/40 text-[#69707A] hover:border-white hover:text-white'
                              }`}
                            >
                              {event.minute.replace("'", "")}
                            </button>

                            {/* Timeline content Card */}
                            <div 
                              className={`p-6 cursor-pointer transform transition-all ${era.cardClass} ${
                                isExpanded ? 'border-l-4 border-l-[#D4AF37] shadow-xl translate-x-1' : 'opacity-85 hover:opacity-100'
                              }`}
                              onClick={() => setExpandedTimelineIndex(idx)}
                            >
                              <div className="flex justify-between items-start gap-4 mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs text-[#D4AF37] font-bold bg-[#D4AF37]/10 px-2 py-0.5 uppercase tracking-wider">
                                    {event.type}
                                  </span>
                                  <span className="font-sans text-[11px] text-[#69707A] font-bold tracking-widest uppercase">
                                    {event.minute} Timestamp
                                  </span>
                                </div>
                                <span className="font-serif text-[#69707A] text-xs italic">
                                  {isExpanded ? "Collapse ▲" : "Expand Description ▼"}
                                </span>
                              </div>

                              <h4 className="font-serif text-[#F5F2EA] text-lg md:text-xl font-bold mb-3">
                                {event.title}
                              </h4>

                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.p 
                                    className="font-serif text-[#DDD7C8] text-sm leading-relaxed border-t border-[#4E5661]/15 pt-3 mt-3 italic"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    {event.narrative}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                {/* SIGNATURE FEATURE: MATCH MOMENTUM RIVER */}
                <section className={`py-24 px-6 md:px-12 border-t ${era.borderClass} ${era.bgLight} relative overflow-hidden`}>
                  <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                      <TrendingUp size={36} className="text-[#D4AF37] mx-auto mb-4 opacity-60" />
                      <p className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-[9px] mb-2 font-bold">Signature Feature • Match flow metrics</p>
                      <h3 className="font-serif text-3xl md:text-4xl text-white font-semibold">
                        Match Momentum River
                      </h3>
                      <p className="font-sans text-[#69707A] text-xs max-w-xl mx-auto mt-2">
                        Observe the shifting ocean of territorial threat and psychological dominance. Hover markers to decode crucial turning points.
                      </p>
                    </div>

                    {/* Momentum River Visual System */}
                    <div className="bg-black/40 border border-[#4E5661]/15 p-6 md:p-8 rounded-sm relative">
                      {/* Top labels */}
                      <div className="flex justify-between font-serif text-[11px] text-[#69707A] uppercase tracking-wider mb-2">
                        <span className="text-[#D4AF37]">{selectedMatch.teamA} DOMINANCE</span>
                        <span>NEUTRAL FLOW</span>
                        <span className="text-blue-400">{selectedMatch.teamB} DOMINANCE</span>
                      </div>

                      {/* SVG Flow Wave representing "The River" */}
                      <div className="relative h-64 w-full bg-gradient-to-b from-[#D4AF37]/5 via-transparent to-blue-500/5 rounded-xs border-y border-[#4E5661]/15">
                        <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="gradientRiver" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
                              <stop offset="50%" stopColor="#4E5661" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="#00ffd2" stopOpacity="0.8" />
                            </linearGradient>
                          </defs>

                          {/* Center dividing axis line */}
                          <line x1="0" y1="100" x2="1000" y2="100" stroke="#4E5661" strokeWidth="1" strokeDasharray="5,5" opacity="0.4" />

                          {/* The River Wave Area filled */}
                          <path 
                            d={(() => {
                              let pathStr = 'M 0 100 ';
                              const step = 1000 / (selectedMatch.momentum.length - 1);
                              selectedMatch.momentum.forEach((p, index) => {
                                const x = index * step;
                                // Core calculation: map intensities A vs B. Dominance A pulls it UP (0-100), B pulls it DOWN (100-200)
                                const bias = p.teamAIntensity - p.teamBIntensity; // positive = team A, negative = team B
                                const y = 100 - (bias / 100) * 80; // Bound within safe bounds
                                pathStr += `L ${x} ${y} `;
                              });
                              pathStr += 'L 1000 100 Z';
                              return pathStr;
                            })()}
                            fill="url(#gradientRiver)"
                            opacity="0.22"
                          />

                          {/* The River Line Stroke */}
                          <path 
                            d={(() => {
                              let pathStr = 'M 0 100 ';
                              const step = 1000 / (selectedMatch.momentum.length - 1);
                              selectedMatch.momentum.forEach((p, index) => {
                                const x = index * step;
                                const bias = p.teamAIntensity - p.teamBIntensity;
                                const y = 100 - (bias / 100) * 80;
                                pathStr += `S ${x - step/2} ${y}, ${x} ${y} `;
                              });
                              return pathStr;
                            })()}
                            stroke={selectedMatch.era === 'vintage' ? '#cfa65c' : '#D4AF37'}
                            strokeWidth="2.5"
                            fill="none"
                            strokeLinecap="round"
                          />

                          {/* Render clickable nodes representing events */}
                          {(() => {
                            const step = 1000 / (selectedMatch.momentum.length - 1);
                            return selectedMatch.momentum.map((p, index) => {
                              const x = index * step;
                              const bias = p.teamAIntensity - p.teamBIntensity;
                              const y = 100 - (bias / 100) * 80;
                              const isHovered = hoveredMomentum === index;

                              return (
                                <g 
                                  key={index} 
                                  className="cursor-pointer"
                                  onMouseEnter={() => setHoveredMomentum(index)}
                                  onMouseLeave={() => setHoveredMomentum(null)}
                                  onClick={() => setHoveredMomentum(index)}
                                >
                                  {/* Pulsing ring on hover */}
                                  {isHovered && (
                                    <circle cx={x} cy={y} r="12" fill={bias > 0 ? "#D4AF37" : "#00d2ff"} opacity="0.3" className="animate-ping" />
                                  )}
                                  <circle 
                                    cx={x} 
                                    cy={y} 
                                    r={isHovered ? "6" : "4.5"} 
                                    fill={isHovered ? "#fff" : (bias > 0 ? "#D4AF37" : "#3b82f6")} 
                                    stroke="black" 
                                    strokeWidth="1.5" 
                                    className="transition-all duration-300" 
                                  />
                                </g>
                              );
                            });
                          })()}
                        </svg>

                        {/* Interactive HUD bubble over river */}
                        <div className="absolute inset-x-6 bottom-4 bg-[#090909]/95 border border-[#4E5661]/25 px-4 py-2.5 rounded-sm flex justify-between items-center text-xs">
                          {hoveredMomentum !== null ? (
                            <>
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-[#D4AF37] font-bold bg-[#D4AF37]/10 px-1.5 py-0.5 rounded-xs">
                                  {selectedMatch.momentum[hoveredMomentum].minute}' MIN
                                </span>
                                <span className="font-serif text-[#F5F2EA] italic">
                                  "{selectedMatch.momentum[hoveredMomentum].event}"
                                </span>
                              </div>
                              <div className="flex items-center gap-3 font-mono text-[10px]">
                                <span className="text-[#D4AF37]">{selectedMatch.teamA}: {selectedMatch.momentum[hoveredMomentum].teamAIntensity}%</span>
                                <span className="text-blue-400">{selectedMatch.teamB}: {selectedMatch.momentum[hoveredMomentum].teamBIntensity}%</span>
                              </div>
                            </>
                          ) : (
                            <span className="font-sans text-[#69707A] italic text-center w-full">
                              Hover nodes along the momentum line to analyze key tactical events and surges.
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Timestamps indicators underneath */}
                      <div className="flex justify-between font-mono text-[10px] text-[#69707A] mt-4 px-2">
                        <span>0' KICKOFF</span>
                        <span>15'</span>
                        <span>30'</span>
                        <span>45' HT</span>
                        <span>60'</span>
                        <span>75'</span>
                        <span>90' FULL TIME</span>
                        {selectedMatch.momentum.length > 8 && <span>120' ET</span>}
                      </div>
                    </div>
                  </div>
                </section>

                {/* CHAPTER 4: DEFINING MOMENTS */}
                <section className={`py-24 px-6 md:px-12 border-t ${era.borderClass}`}>
                  <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/2">
                      <span className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-[9px] mb-2 block font-bold">Chapter IV • Legendary Highlight</span>
                      <h3 className="font-serif text-3xl md:text-4xl text-white font-bold leading-tight mb-6">
                        The Defining Moment
                      </h3>
                      <div className="h-0.5 w-16 bg-[#D4AF37] mb-6" />
                      <h4 className="font-serif text-xl italic text-[#D4AF37] mb-4">
                        "{selectedMatch.definingMoment.title}"
                      </h4>
                      <p className="font-serif text-[#DDD7C8] text-base leading-relaxed italic opacity-90">
                        {selectedMatch.definingMoment.description}
                      </p>
                    </div>

                    {/* Creative artistic illustration block simulating movie reels */}
                    <button 
                      onClick={() => setShareOpen(true)}
                      className="w-full md:w-1/2 bg-[#111] hover:bg-[#151515] p-1 border-2 border-dashed border-[#D4AF37]/50 hover:border-[#D4AF37] rounded-sm relative aspect-video flex flex-col items-center justify-center text-center transition-all group/moment cursor-pointer"
                    >
                      <div className="absolute top-2 left-2 font-mono text-[8px] text-[#69707A] uppercase group-hover/moment:text-[#D4AF37]">Archival Reel No. {selectedMatch.year}</div>
                      <Camera size={36} className="text-[#D4AF37] mb-2 opacity-60 group-hover/moment:opacity-100 group-hover/moment:scale-110 transition-all duration-300" />
                      <span className="font-serif italic text-[#F5F2EA] text-md px-6 mb-1">
                        "{selectedMatch.timeline[selectedMatch.timeline.length - 1].title}"
                      </span>
                      <span className="font-mono text-[8.5px] text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-1.5 rounded-xs mt-2 group-hover/moment:bg-[#D4AF37] group-hover/moment:text-black transition-all">
                        Generate Snapshot Memento
                      </span>
                    </button>
                  </div>
                </section>

                {/* CHAPTER 5: TACTICAL VIEW */}
                <section className={`py-24 px-6 md:px-12 border-t ${era.borderClass} ${era.bgLight}`}>
                  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Visual schematic of match setup */}
                    <div className="bg-[#090909] border border-double border-[#4E5661]/35 p-6 rounded-none relative">
                      <span className="absolute top-3 left-3 font-mono text-[8px] text-[#69707A] uppercase">Chalkboard Schematic</span>
                      <div className="mt-6 flex justify-around items-center h-48 bg-[#111] border border-[#ff5500]/10 border-solid relative overflow-hidden">
                        {/* Interactive Tactics Grid representing miniature soccer pitch */}
                        <div className="absolute inset-y-0 left-1/2 w-px bg-[#4E5661]/25" />
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-[#4E5661]/25" />

                        {/* Team A markers */}
                        <div className="flex flex-col items-center gap-6">
                          <span className="font-mono text-[10px] text-[#D4AF37] font-bold">▲ {selectedMatch.teamA}</span>
                          <span className="font-mono text-[9px] text-[#69707A] font-medium uppercase tracking-wider bg-black/50 px-2 py-0.5">
                            Formation: {selectedMatch.tacticalView.formationA}
                          </span>
                        </div>

                        {/* Team B markers */}
                        <div className="flex flex-col items-center gap-6">
                          <span className="font-mono text-[10px] text-blue-400 font-bold">▼ {selectedMatch.teamB}</span>
                          <span className="font-mono text-[9px] text-[#69707A] font-medium uppercase tracking-wider bg-black/50 px-2 py-0.5">
                            Formation: {selectedMatch.tacticalView.formationB}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-[9px] mb-2 block font-bold">Chapter V • Board Setup</span>
                      <h3 className="font-serif text-3xl md:text-4xl text-white font-bold leading-tight mb-4">
                        {selectedMatch.tacticalView.title}
                      </h3>
                      <p className="font-serif text-[#DDD7C8]/90 text-sm leading-relaxed italic mt-4 opacity-90">
                        {selectedMatch.tacticalView.narrative}
                      </p>
                    </div>
                  </div>
                </section>

                {/* CHAPTER 6: HEROES & VILLAINS */}
                <section className={`py-24 px-6 md:px-12 border-t ${era.borderClass}`}>
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                      <User size={36} className="text-[#D4AF37] mx-auto mb-4 opacity-60" />
                      <p className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-[9px] mb-2 font-bold">Chapter VI • Key Characters</p>
                      <h3 className="font-serif text-3xl md:text-4xl text-white font-bold">
                        Protagonists and Antagonists
                      </h3>
                      <p className="font-sans text-[#69707A] text-xs mt-2">
                        Relive the match through the eyes of the key actors on the pitch.
                      </p>
                    </div>

                    {/* Dual columns of Characters */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {selectedMatch.characters.map((char, index) => (
                        <div 
                          key={index}
                          className={`p-6 md:p-8 relative ${era.cardClass} flex flex-col justify-between`}
                        >
                          <div>
                            <div className="flex justify-between items-center mb-4">
                              <span className={`font-mono text-[9px] uppercase tracking-wider font-extrabold px-3 py-1 ${
                                char.role === 'hero' 
                                  ? 'bg-[#D4AF37]/25 text-[#D4AF37]' 
                                  : 'bg-red-500/25 text-red-500'
                              }`}>
                                {char.role.toUpperCase()}
                              </span>
                              <span className="font-sans text-xs text-[#69707A] uppercase tracking-widest">{char.nation}</span>
                            </div>

                            <h4 className="font-serif text-[#F5F2EA] text-2xl font-bold mb-1">{char.name}</h4>
                            <span className="font-sans text-[10px] text-[#69707A] font-semibold uppercase tracking-widest block mb-4">
                              {char.status}
                            </span>
                            
                            <blockquote className="font-serif text-[#DDD7C8] italic text-sm leading-relaxed border-l-2 border-[#D4AF37]/45 pl-4 mb-6">
                              "{char.quote}"
                            </blockquote>

                            <p className="font-serif text-[#69707A] text-xs leading-relaxed italic">
                              {char.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* CHAPTER 7: MATCH STATISTICS */}
                <section className={`py-24 px-6 md:px-12 border-t ${era.borderClass} ${era.bgLight}`}>
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                      <Award size={36} className="text-[#D4AF37] mx-auto mb-4 opacity-60" />
                      <p className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-[9px] mb-2 font-bold">Chapter VII • Curated Stats</p>
                      <h3 className="font-serif text-3xl md:text-4xl text-white font-bold">
                        Numerical Landscape
                      </h3>
                      <p className="font-sans text-[#69707A] text-xs mt-2">
                        Key statistics represented in clean, elegant comparisons to sustain structural aesthetics over complex dashboards.
                      </p>
                    </div>

                    <div className="space-y-8 max-w-xl mx-auto">
                      {/* STAT 1: Possession */}
                      <div className="space-y-2">
                        <div className="flex justify-between font-mono text-xs uppercase text-[#69707A]">
                          <span>{selectedMatch.teamA} ({selectedMatch.stats.possessionA}%)</span>
                          <span>Possession</span>
                          <span>{selectedMatch.teamB} ({selectedMatch.stats.possessionB}%)</span>
                        </div>
                        <div className="h-2 w-full bg-[#111] flex rounded-none overflow-hidden">
                          <div className="bg-[#D4AF37]" style={{ width: `${selectedMatch.stats.possessionA}%` }} />
                          <div className="bg-blue-500" style={{ width: `${selectedMatch.stats.possessionB}%` }} />
                        </div>
                      </div>

                      {/* STAT 2: Shots */}
                      <div className="space-y-2">
                        <div className="flex justify-between font-mono text-xs uppercase text-[#69707A]">
                          <span>{selectedMatch.stats.shotsA} Shots</span>
                          <span>Total Attempts</span>
                          <span>{selectedMatch.stats.shotsB} Shots</span>
                        </div>
                        <div className="h-2 w-full bg-[#111] flex rounded-none overflow-hidden">
                          <div className="bg-[#D4AF37]" style={{ width: `${(selectedMatch.stats.shotsA / (selectedMatch.stats.shotsA + selectedMatch.stats.shotsB)) * 100}%` }} />
                          <div className="bg-blue-500" style={{ width: `${(selectedMatch.stats.shotsB / (selectedMatch.stats.shotsA + selectedMatch.stats.shotsB)) * 100}%` }} />
                        </div>
                      </div>

                      {/* STAT 3: Passes */}
                      <div className="space-y-2">
                        <div className="flex justify-between font-mono text-xs uppercase text-[#69707A]">
                          <span>{selectedMatch.stats.passesA} Passes</span>
                          <span>Completed Passes</span>
                          <span>{selectedMatch.stats.passesB} Passes</span>
                        </div>
                        <div className="h-2 w-full bg-[#111] flex rounded-none overflow-hidden">
                          <div className="bg-[#D4AF37]" style={{ width: `${(selectedMatch.stats.passesA / (selectedMatch.stats.passesA + selectedMatch.stats.passesB)) * 100}%` }} />
                          <div className="bg-blue-500" style={{ width: `${(selectedMatch.stats.passesB / (selectedMatch.stats.passesA + selectedMatch.stats.passesB)) * 100}%` }} />
                        </div>
                      </div>

                      {/* STAT 4: Fouls */}
                      <div className="space-y-2">
                        <div className="flex justify-between font-mono text-xs uppercase text-[#69707A]">
                          <span>{selectedMatch.stats.foulsA} Fouls</span>
                          <span>Total Infractions</span>
                          <span>{selectedMatch.stats.foulsB} Fouls</span>
                        </div>
                        <div className="h-2 w-full bg-[#111] flex rounded-none overflow-hidden">
                          <div className="bg-[#D4AF37]" style={{ width: `${(selectedMatch.stats.foulsA / (selectedMatch.stats.foulsA + selectedMatch.stats.foulsB)) * 100}%` }} />
                          <div className="bg-blue-500" style={{ width: `${(selectedMatch.stats.foulsB / (selectedMatch.stats.foulsA + selectedMatch.stats.foulsB)) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* CHAPTER 8: HISTORICAL IMPACT */}
                <section className={`py-32 px-6 md:px-12 border-t ${era.borderClass}`}>
                  <div className="max-w-3xl mx-auto text-center">
                    <BookOpen size={44} className="text-[#D4AF37] mx-auto mb-6 opacity-60" />
                    <p className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-[9px] mb-4 font-bold">Chapter VIII • Eternal Aftermath</p>
                    <h3 className="font-serif text-3xl md:text-5xl text-white font-bold mb-8">
                      The Historical Impact
                    </h3>
                    <p className="font-serif text-[#DDD7C8] text-lg md:text-xl leading-relaxed italic mb-12">
                      "{selectedMatch.historicalImpact}"
                    </p>

                    <div className="h-px w-24 bg-[#D4AF37]/45 mx-auto mb-12" />

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                      <button
                        onClick={() => {
                          if (audioEngineRef.current) {
                            audioEngineRef.current.stop();
                          }
                          setSelectedMatch(null);
                        }}
                        className="w-full sm:w-auto px-8 py-3.5 border border-[#D4AF37]/55 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all font-sans text-xs uppercase tracking-widest font-bold cursor-pointer"
                      >
                        Return to Archive Shelves
                      </button>

                      <button
                        onClick={() => setShareOpen(true)}
                        className="w-full sm:w-auto px-8 py-3.5 bg-[#D4AF37] text-[#090909] hover:bg-white hover:text-black transition-all font-sans text-xs uppercase tracking-widest font-bold cursor-pointer"
                      >
                        Generate Match Snapshot
                      </button>
                    </div>

                    {/* CONTINUE EXPLORING SYSTEM */}
                    <div className="w-full mt-24 pt-16 border-t border-[#4E5661]/15 text-left">
                      <ContinueExploringSystem 
                        currentItemType="match"
                        currentItemId={selectedMatch.id}
                        onExploreMatches={(mId) => { setSelectedMatch(CLASSIC_MATCHES.find(m => m.id === mId) || null); }}
                        onExploreNations={(nId) => { setSelectedMatch(null); onClose?.(); if (onExploreNations) onExploreNations(nId); }}
                        onExploreLegends={(lId) => { setSelectedMatch(null); onClose?.(); if (onExploreLegends) onExploreLegends(lId); }}
                        onExploreStadiums={(sId) => { setSelectedMatch(null); onClose?.(); if (onExploreStadiums) onExploreStadiums(sId); }}
                        onExploreTournament={(year) => { setSelectedMatch(null); onClose?.(); if (onExploreTournament) onExploreTournament(year); }}
                      />
                    </div>
                  </div>
                </section>
              </motion.div>
            );
          })()
        )}
      </AnimatePresence>

      {/* Visual Match Snapshot Share Modal */}
      <AnimatePresence>
        {shareOpen && selectedMatch && (
          <MatchShareSystem 
            match={selectedMatch}
            onClose={() => setShareOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
