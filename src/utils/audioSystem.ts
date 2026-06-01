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
  private ctx: AudioContext | null = null;
  private primaryGain: GainNode | null = null;
  private crowdGain: GainNode | null = null;
  private staticGain: GainNode | null = null;
  private murmurSource: AudioBufferSourceNode | null = null;
  private swellSource: AudioBufferSourceNode | null = null;
  private crackleSource: AudioBufferSourceNode | null = null;
  
  private isMuted: boolean = false;
  private crowdVolume: number = 0.45;
  private year: number = 2022;
  private swellInterval: any = null;

  constructor(year: number) {
    this.year = year;
  }

  // Generate white noise for synthesized murmur and static
  private createNoiseBuffer(duration: number = 2): AudioBuffer {
    if (!this.ctx) throw new Error("AudioContext not initialized");
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  // Generate pink/brown colored noise filter curves
  private createBrownNoiseBuffer(duration: number = 4): AudioBuffer {
    if (!this.ctx) throw new Error("AudioContext not initialized");
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // 1-pole lowpass filter to brown-ize the noise spectrum
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 4.5; // Compensate for loss of energy
    }
    return buffer;
  }

  public init() {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      this.ctx = new AudioContextClass();
      
      // Main Out Volume Controller
      this.primaryGain = this.ctx.createGain();
      this.primaryGain.gain.value = this.isMuted ? 0 : 1;
      this.primaryGain.connect(this.ctx.destination);

      // Stadium Murmur Gain Controller
      this.crowdGain = this.ctx.createGain();
      this.crowdGain.gain.value = this.crowdVolume;
      this.crowdGain.connect(this.primaryGain);

      // Era Retro Static Cracker Gain
      this.staticGain = this.ctx.createGain();
      // Retro eras (1930 - 1986) get higher white noise crackle to represent old radios!
      this.staticGain.gain.value = this.year < 1990 ? 0.08 : 0.01;
      this.staticGain.connect(this.primaryGain);

      this.startAmbientCrowd();
      this.startSwellRoutine();
      if (this.year < 1990) {
        this.startRadioStatic();
      }
    } catch (err) {
      console.warn("Could not start ambient sport audio structures:", err);
    }
  }

  private startAmbientCrowd() {
    if (!this.ctx || !this.crowdGain) return;

    // 1. Gentle heavy murmur based on low-passed brown noise
    const brownBuffer = this.createBrownNoiseBuffer(5);
    this.murmurSource = this.ctx.createBufferSource();
    this.murmurSource.buffer = brownBuffer;
    this.murmurSource.loop = true;

    // Deep lowpass filtering representing giant hollow arenas
    const lpFilter = this.ctx.createBiquadFilter();
    lpFilter.type = "lowpass";
    lpFilter.frequency.value = this.year <= 1950 ? 150 : 220; // old arenas are tinnier/deeper
    lpFilter.Q.value = 1.0;

    this.murmurSource.connect(lpFilter);
    lpFilter.connect(this.crowdGain);
    this.murmurSource.start(0);
  }

  private startRadioStatic() {
    if (!this.ctx || !this.staticGain) return;

    // Retro continuous white-noise vinyl/radio static hiss
    const whiteBuffer = this.createNoiseBuffer(2);
    this.crackleSource = this.ctx.createBufferSource();
    this.crackleSource.buffer = whiteBuffer;
    this.crackleSource.loop = true;

    const hpFilter = this.ctx.createBiquadFilter();
    hpFilter.type = "highpass";
    hpFilter.frequency.value = 1800; // very high-pitched crispy hiss

    const lpFilter = this.ctx.createBiquadFilter();
    lpFilter.type = "lowpass";
    lpFilter.frequency.value = 4500;

    this.crackleSource.connect(hpFilter);
    hpFilter.connect(lpFilter);
    lpFilter.connect(this.staticGain);
    this.crackleSource.start(0);
  }

  // Simulate waves of random cheering chants
  public triggerCheerSwell() {
    if (!this.ctx || !this.crowdGain || this.isMuted) return;

    try {
      // Create a temporary high energy swell synth
      const swellBuffer = this.createNoiseBuffer(3);
      const source = this.ctx.createBufferSource();
      source.buffer = swellBuffer;

      // Bandpass centered filter sweeps representing stadium acoustics chanting
      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(450, this.ctx.currentTime);
      // Sweep the bandpass frequency up and down for emotional acoustic curves
      bandpass.frequency.linearRampToValueAtTime(850, this.ctx.currentTime + 1.2);
      bandpass.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 3.0);
      bandpass.Q.value = 4.0; // tight resonance to give standard chanting 'ahhh' or 'oooh' tonal resonance

      const envGain = this.ctx.createGain();
      envGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      // Swell up fast, decay slow
      envGain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 0.9);
      envGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3.0);

      source.connect(bandpass);
      bandpass.connect(envGain);
      envGain.connect(this.crowdGain);

      source.start(0);
      source.stop(this.ctx.currentTime + 3.1);
    } catch (e) {
      // Fallback
    }
  }

  private startSwellRoutine() {
    // Periodically create cheering stadium spikes
    this.swellInterval = setInterval(() => {
      this.triggerCheerSwell();
    }, 9000);
  }

  public setVolume(vol: number) {
    this.crowdVolume = vol;
    if (this.crowdGain) {
      this.crowdGain.gain.setValueAtTime(vol, this.ctx ? this.ctx.currentTime : 0);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.primaryGain && this.ctx) {
      this.primaryGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  public stop() {
    if (this.swellInterval) clearInterval(this.swellInterval);
    
    try {
      if (this.murmurSource) {
        this.murmurSource.stop();
        this.murmurSource.disconnect();
      }
      if (this.crackleSource) {
        this.crackleSource.stop();
        this.crackleSource.disconnect();
      }
      if (this.ctx) {
        this.ctx.close();
      }
    } catch (e) {
      // Ignored
    }
  }
}

// Speaks commentators snippets aloud using speech synthesis with options
export function speakBroadcaster(snippet: CommentarySnippet, callback?: () => void, isMuted: boolean = false) {
  if (isMuted || !('speechSynthesis' in window)) {
    if (callback) callback();
    return;
  }

  // Cancel any running speech synthesis
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(snippet.text);
  utterance.lang = snippet.lang;
  
  // Set parameters and try to find a matching voice
  utterance.rate = 1.05; // commentary is fast-paced
  utterance.pitch = 1.1; // broadcast voice is excited

  try {
    const voices = window.speechSynthesis.getVoices();
    // Prefer matching languages
    const matchingVoice = voices.find(v => v.lang.startsWith(snippet.lang.split('-')[0]));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }
  } catch (e) {
    // Fallback
  }

  utterance.onend = () => {
    if (callback) callback();
  };

  utterance.onerror = () => {
    if (callback) callback();
  };

  window.speechSynthesis.speak(utterance);
}
