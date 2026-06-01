// Web Audio API and Speech Synthesis Immersive Sound Engine
// Synthesizes realistic ambient stadium crowd murmurs, cheering swells, and retro radio static.
// Controls voice commentary with typewriter subtitle synchronization.

export interface CommentarySnippet {
  text: string;
  lang: string;
  transcript: string;
  commentator: string;
}

export const YEAR_COMMENTARIES: Record<number, CommentarySnippet> = {
  2022: {
    text: "Lionel Messi has conquered his final peak! Argentina are the champions of the world! The child from Rosario has draped the sky in blue and white!",
    lang: "en-US",
    transcript: "「 Lionel Messi has conquered his final peak! Argentina are the champions of the world! The child from Rosario has draped the sky in blue and white! 」",
    commentator: "Peter Drury (Broadcaster)"
  },
  1986: {
    text: "¡Barrilete cósmico! ¿De qué planeta viniste para dejar en el camino a tanto inglés? ¡Gracias Dios por el fútbol, por Maradona, por estas lágrimas!",
    lang: "es-AR",
    transcript: "「 ¡Barrilete cósmico! ¿De qué planeta viniste para dejar en el camino a tanto inglés? ¡Gracias Dios por el fútbol, por Maradona, por estas lágrimas! 」",
    commentator: "Víctor Hugo Morales (Radio Argentina)"
  },
  1970: {
    text: "Carlos Alberto! What a beautiful goal! The crown of the beautiful game rests upon Brazil, and Pelé is the absolute king!",
    lang: "en-GB",
    transcript: "「 Carlos Alberto! What a beautiful goal! The crown of the beautiful game rests upon Brazil, and Pelé is the absolute king! 」",
    commentator: "Hugh Johns (ITV)"
  },
  1998: {
    text: "Et un, et deux, et trois - zéro! Zinédine Zidane a frappé deux fois de la tête, la France est sur le toit du monde!",
    lang: "fr-FR",
    transcript: "「 Et un, et deux, et trois - zéro! Zinédine Zidane a frappé deux fois de la tête, la France est sur le toit du monde! 」",
    commentator: "Thierry Roland (TF1)"
  },
  2014: {
    text: "Mario Götze! It's there! Germany has found the winning moment in extra time! A masterpiece of absolute steel and precision!",
    lang: "de-DE",
    transcript: "「 Mario Götze! Das ist der Wahnsinn! Deutschland ist Weltmeister! Ein meisterwerk aus absolutem stahl! 」",
    commentator: "Tom Bartels (ARD)"
  },
  1930: {
    text: "¡Uruguay es el campeón absoluto! ¡La tribuna del Centenario ruge bajo una tarde helada de sol, naciendo la leyenda eterna de la Copa del Mundo!",
    lang: "es-UY",
    transcript: "「 ¡Uruguay es el campeón absoluto! ¡La tribuna del Centenario ruge bajo una tarde helada de sol, naciendo la leyenda eterna de la Copa del Mundo! 」",
    commentator: "Archival Radio Broadcaster"
  },
  1950: {
    text: "¡Silencio en el Maracaná! El gol de Ghiggia paraliza a doscientas mil almas. Uruguay desafía al destino en la hazaña más grande del deporte.",
    lang: "es-UY",
    transcript: "「 ¡Silencio en el Maracaná! El gol de Ghiggia paraliza a doscientas mil almas. Uruguay desafía al destino en la hazaña más grande del deporte. 」",
    commentator: "Radio El Espectador"
  }
};

export function getDefaultCommentary(year: number): CommentarySnippet {
  return YEAR_COMMENTARIES[year] || {
    text: `A historic championship strike! The stadium crowd erupts in absolute joy as the ${year} tournament writes its immortal final page!`,
    lang: "en-US",
    transcript: `「 A historic championship strike! The stadium crowd erupts in absolute joy as the ${year} tournament writes its immortal final page! 」`,
    commentator: "Archival World Broadcaster"
  };
}

export class StadiumAudioEngine {
  private ctx: any = null;
  private primaryGain: any = null;
  private crowdGain: any = null;
  private staticGain: any = null;
  private murmurSource: any = null;
  private swellSource: any = null;
  private crackleSource: any = null;
  
  private isMuted: boolean = true;
  private crowdVolume: number = 0;
  private year: number = 2022;
  private swellInterval: any = null;

  constructor(year: number) {
    this.year = year;
  }

  public init() {
    // Audio synthesis disabled
  }

  public triggerCheerSwell() {
    // Audio synthesis disabled
  }

  public setVolume(vol: number) {
    this.crowdVolume = vol;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  public stop() {
    // Audio synthesis disabled
  }
}

// Speaks commentators snippets aloud using speech synthesis with options - stubbed out for silence
export function speakBroadcaster(snippet: CommentarySnippet, callback?: () => void, isMuted: boolean = false) {
  if (callback) {
    callback();
  }
}
