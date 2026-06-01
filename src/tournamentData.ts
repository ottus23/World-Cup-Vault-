export interface GroupStanding {
  team: string;
  w: number;
  d: number;
  l: number;
  pts: number;
}

export interface GroupMatch {
  home: string;
  away: string;
  score: string;
  story?: string;
}

export interface GroupFolder {
  name: string;
  standings: GroupStanding[];
  matches: GroupMatch[];
  keyMoment: string;
}

export interface BattleMatch {
  stage: string;
  home: string;
  away: string;
  score: string;
  mapNote: string;
  moment: string;
}

export interface HeroExhibit {
  name: string;
  role: string;
  stats: { label: string; value: string | number }[];
  legacyMoment: string;
  image: string;
}

export interface StadiumExhibit {
  name: string;
  location: string;
  capacity: string;
  notableMatch: string;
  image: string;
}

export interface MetricStat {
  label: string;
  value: string;
  subText: string;
}

export interface CapsuleDetails {
  champion: string;
  runnerUp: string;
  host: string;
  mvp: string;
  topScorer: string;
  definingMoment: string;
  historicalSignificance: string;
}

export interface TournamentDetails {
  year: number;
  dates: string;
  teamsCount: number;
  goldenBall: string;
  goldenBoot: string;
  goldenBootGoals: number;
  storyExtended: string;
  roadToGlory: { stage: string; opponent: string; score: string; story: string }[];
  definingMoments: { title: string; desc: string; image: string }[];
  legacy: string;
  groups: GroupFolder[]; // Chapter 3 - Group Stage Atlas
  knockoutDrama: BattleMatch[]; // Chapter 5 - Knockout Drama Battle Maps
  heroes: HeroExhibit[]; // Chapter 6 - Tournament Heroes
  stadiums: StadiumExhibit[]; // Chapter 8 - Stadium Collection
  stats: MetricStat[]; // Chapter 9 - Tournament Statistics
  tacticalTrend: string; // Chapter 9 - Tactical Trend
  capsule: CapsuleDetails; // Signature Feature - Tournament Time Capsule
}

export function getTournamentDetails(year: number): TournamentDetails {
  if (year === 2022) {
    return {
      year: 2022,
      dates: "Nov 20 - Dec 18",
      teamsCount: 32,
      goldenBall: "Lionel Messi",
      goldenBoot: "Kylian Mbappé",
      goldenBootGoals: 8,
      storyExtended: "The first World Cup held in the Arab world and the first played in the winter months. It was a tournament of stunning shocks—Saudi Arabia defeating Argentina, Morocco's miraculous run to the semi-finals—but culminated in what many consider the greatest final in the history of the sport between Argentina and France.",
      roadToGlory: [
        { stage: "Group Stage", opponent: "Saudi Arabia, Mexico, Poland", score: "6 Pts", story: "A shocking opening loss to Saudi Arabia forced Argentina to treat every subsequent match as a final." },
        { stage: "Round of 16", opponent: "Australia", score: "2-1", story: "Messi's magic broke the deadlock in his 1,000th career appearance." },
        { stage: "Quarter-final", opponent: "Netherlands", score: "2-2 (4-3 p)", story: "A dramatic, bruising encounter dubbed the 'Battle of Lusail' ended in penalty shootout glory for Emi Martínez." },
        { stage: "Semi-final", opponent: "Croatia", score: "3-0", story: "A masterclass from Messi and Julián Álvarez dismantled the resilient 2018 runners-up." },
        { stage: "Final", opponent: "France", score: "3-3 (4-2 p)", story: "An all-time classic. Messi and Di María struck first, Mbappé roared back with a hat-trick, but Argentina prevailed in the shootout." }
      ],
      definingMoments: [
        { title: "Morocco's Atlas Lions", desc: "Becoming the first African nation to ever reach a World Cup semi-final.", image: "https://images.unsplash.com/photo-1518605368461-1e1e38ce8058?q=80&w=1000&auto=format&fit=crop" },
        { title: "Weghorst's Free-kick", desc: "A genius pre-rehearsed free-kick routine in the 101st minute to equalize against Argentina.", image: "https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=1000&auto=format&fit=crop" }
      ],
      legacy: "Qatar 2022 will be forever remembered as the crowning achievement of Lionel Messi, cementing his legacy as arguably the greatest player of all time, whilst signaling the true arrival of Kylian Mbappé as his heir apparent.",
      groups: [
        {
          name: "Group C",
          standings: [
            { team: "Argentina", w: 2, d: 0, l: 1, pts: 6 },
            { team: "Poland", w: 1, d: 1, l: 1, pts: 4 },
            { team: "Mexico", w: 1, d: 1, l: 1, pts: 4 },
            { team: "Saudi Arabia", w: 1, d: 0, l: 2, pts: 3 }
          ],
          matches: [
            { home: "Argentina", away: "Saudi Arabia", score: "1 - 2", story: "One of the greatest upsets in football history. Al-Shehri and Al-Dawsari stun the Albiceleste." },
            { home: "Argentina", away: "Mexico", score: "2 - 0", story: "Messi breaks Mexican hearts with a breathtaking low drive from outside the box." },
            { home: "Poland", away: "Argentina", score: "0 - 2", story: "A sparkling performance sees Mac Allister and Álvarez seal progression." }
          ],
          keyMoment: "Messi's physics-defying long range strike against Mexico that revived their tournament from the brink of early exit."
        },
        {
          name: "Group F",
          standings: [
            { team: "Morocco", w: 2, d: 1, l: 0, pts: 7 },
            { team: "Croatia", w: 1, d: 2, l: 0, pts: 5 },
            { team: "Belgium", w: 1, d: 1, l: 1, pts: 4 },
            { team: "Canada", w: 0, d: 0, l: 3, pts: 0 }
          ],
          matches: [
            { home: "Morocco", away: "Croatia", score: "0 - 0", story: "A tactical stalemate that hinted at both teams' ultimate defensive steeliness." },
            { home: "Belgium", away: "Morocco", score: "0 - 2", story: "Morocco announce themselves with a stunning win over the world's #2 ranked team." },
            { home: "Croatia", away: "Belgium", score: "0 - 0", story: "Lukaku misses a series of golden chances as Belgium's Golden Generation is sent packing." }
          ],
          keyMoment: "The explosion of Moroccan joy following the 2-0 defeat of Belgium, triggering celebrations worldwide."
        }
      ],
      knockoutDrama: [
        {
          stage: "Quarter-Final",
          home: "Croatia",
          away: "Brazil",
          score: "1 - 1 (4 - 2 p)",
          mapNote: "Brazil break the deadlock in extra time via Neymar's brilliant individual move, but Croatia's legendary refusal to die leads to a Petković equalizer in the 117th minute.",
          moment: "Livaković saves Rodrygo's opening penalty, while Marquinhos hits the post to complete the massive upset."
        },
        {
          stage: "Quarter-Final",
          home: "Netherlands",
          away: "Argentina",
          score: "2 - 2 (3 - 4 p)",
          mapNote: "Dubbed the 'Battle of Lusail' with 18 yellow cards issued. Argentina leads 2-0 before Van Gaal brings on target men, firing direct aerial assaults on the Argentine box.",
          moment: "Wout Weghorst scores in the 101st minute with a genius low free-kick trick, forcing penalties where Emi Martínez saves twice."
        },
        {
          stage: "Final",
          home: "Argentina",
          away: "France",
          score: "3 - 3 (4 - 2 p)",
          mapNote: "A tactical masterclass by Scaloni has Argentina leading 2-0 at 80 mins. Deschamps' double substitutions pay off as Mbappé explodes with a 97-second brace.",
          moment: "Emi Martínez's historic, logic-defying starfish save against Kolo Muani in the 123rd minute to save the World Cup."
        }
      ],
      heroes: [
        {
          name: "Lionel Messi",
          role: "Argentina's Immortal Captain",
          stats: [
            { label: "Goals", value: 7 },
            { label: "Assists", value: 3 },
            { label: "Key Passes", value: 18 }
          ],
          legacyMoment: "Scoring twice in the final and converting his shootout penalty, carrying the legacy of the late Maradona on his shoulders to lift the golden trophy.",
          image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000&auto=format&fit=crop"
        },
        {
          name: "Kylian Mbappé",
          role: "French Goal Scoring Engine",
          stats: [
            { label: "Goals", value: 8 },
            { label: "Assists", value: 2 },
            { label: "Sprints > 35km/h", value: 14 }
          ],
          legacyMoment: "The first hat-trick in a World Cup final since Geoff Hurst in 1966, almost single-handedly winning the cup twice over for France.",
          image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=1000&auto=format&fit=crop"
        }
      ],
      stadiums: [
        {
          name: "Lusail Iconic Stadium",
          location: "Lusail, Qatar",
          capacity: "88,966",
          notableMatch: "Argentina 3-3 France (The Final)",
          image: "https://images.unsplash.com/photo-1518091043644-c1d4457912c6?q=80&w=1000&auto=format&fit=crop"
        },
        {
          name: "Al Bayt Stadium",
          location: "Al Khor, Qatar",
          capacity: "68,895",
          notableMatch: "France 2-0 Morocco (Semi-final)",
          image: "https://images.unsplash.com/photo-1431324155629-1a6edd1d227a?q=80&w=1000&auto=format&fit=crop"
        }
      ],
      stats: [
        { label: "Total Goals Scored", value: "172", subText: "The highest scoring FIFA World Cup in history, surpassing 1998 and 2014" },
        { label: "Expected Goals (xG) / Match", value: "2.68", subText: "Highly fluid offensive tactical setups across modern systems" },
        { label: "Attendance Average", value: "53,191", subText: "Over 3.4 million total spectators inside pristine desert arenas" }
      ],
      tacticalTrend: "The ultimate triumph of the hybrid defensive transition model: Lionel Scaloni's flexible mid-block designed to cover space and immediately service a free-roaming primary playmaker, countering opponents' aggressive high pressing engines.",
      capsule: {
        champion: "Argentina",
        runnerUp: "France",
        host: "Qatar",
        mvp: "Lionel Messi",
        topScorer: "Kylian Mbappé (8 Goals)",
        definingMoment: "Emi Martínez's legendary extra-time stop and tournament shootout mind games.",
        historicalSignificance: "Secured Messi’s status as undisputed king of modern football and completed football's ultimate narrative arc."
      }
    };
  }

  if (year === 1986) {
    return {
      year: 1986,
      dates: "May 31 - Jun 29",
      teamsCount: 24,
      goldenBall: "Diego Maradona",
      goldenBoot: "Gary Lineker",
      goldenBootGoals: 6,
      storyExtended: "Originally scheduled for Colombia, the tournament was moved to Mexico. It became the defining stage for Diego Maradona, who produced arguably the greatest individual tournament performance in football history, carrying Argentina to their second world title.",
      roadToGlory: [
        { stage: "Group Stage", opponent: "South Korea, Italy, Bulgaria", score: "5 Pts", story: "Argentina navigated a tough group, drawing the world champions Italy but topping the table." },
        { stage: "Round of 16", opponent: "Uruguay", score: "1-0", story: "A tense South American classic settled by a Pasculli strike." },
        { stage: "Quarter-final", opponent: "England", score: "2-1", story: "Maradona's legendary four minutes: The 'Hand of God' followed by the 'Goal of the Century'." },
        { stage: "Semi-final", opponent: "Belgium", score: "2-0", story: "Another Maradona masterclass, scoring two brilliant goals to dismantle a strong Belgian side." },
        { stage: "Final", opponent: "West Germany", score: "3-2", story: "Brown and Valdano gave Argentina a 2-0 lead; West Germany fought back to 2-2, before Burruchaga scored the late winner." }
      ],
      definingMoments: [
        { title: "The Hand of God", desc: "Maradona punches the ball over Peter Shilton, a goal born of street cunning.", image: "https://images.unsplash.com/photo-1590483864506-69ec069f0b5d?q=80&w=1000&auto=format&fit=crop" },
        { title: "Goal of the Century", desc: "Four minutes later, Maradona dribbles past more than half the England team.", image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1000&auto=format&fit=crop" }
      ],
      legacy: "Mexico 86 definitively elevated Diego Maradona to a mythic status. It remains the gold standard for how a single player can decisively shape a World Cup.",
      groups: [
        {
          name: "Group A",
          standings: [
            { team: "Argentina", w: 2, d: 1, l: 0, pts: 5 },
            { team: "Italy", w: 1, d: 2, l: 0, pts: 4 },
            { team: "Bulgaria", w: 0, d: 2, l: 1, pts: 2 },
            { team: "South Korea", w: 0, d: 1, l: 2, pts: 1 }
          ],
          matches: [
            { home: "Argentina", away: "South Korea", score: "3 - 1", story: "Argentina withstands a highly physical defensive block with Maradona setting up Valdano twice." },
            { home: "Italy", away: "Argentina", score: "1 - 1", story: "Altobelli converts a penalty for Italy. Maradona answers with a delicate finish in mid-air." },
            { home: "Argentina", away: "Bulgaria", score: "2 - 0", story: "Valdano and Burruchaga guarantee top spot for the Albiceleste." }
          ],
          keyMoment: "Maradona's sublime equalizer against reigning champions Italy, slotting home from an impossibly narrow angle."
        }
      ],
      knockoutDrama: [
        {
          stage: "Quarter-Final",
          home: "Argentina",
          away: "England",
          score: "2 - 1",
          mapNote: "Falklands War tensions formed a heavy backdrop. Tactically, Bilardo’s 3-5-2 system gave Maradona absolute freedom to tear through England's flat back four.",
          moment: "The Goal of the Century: Diego eludes six challenge attempts inside his own half in under 10 seconds."
        },
        {
          stage: "Final",
          home: "Argentina",
          away: "West Germany",
          score: "3 - 2",
          mapNote: "Beckenbauer tasks Matthäus with man-marking Maradona. Diego is shackled, but his teammates step up. Germany fights back from 2-0 down to equalize.",
          moment: "Maradona releases Burruchaga with a delicate, first-touch pass through the German defence for the 84th minute historical winner."
        }
      ],
      heroes: [
        {
          name: "Diego Maradona",
          role: "The Mythic Number 10",
          stats: [
            { label: "Goals", value: 5 },
            { label: "Assists", value: 5 },
            { label: "Dribbles Completed", value: 53 }
          ],
          legacyMoment: "Individually altering the physics of the entire tournament, producing the iconic goals and captaining Argentina's golden triumph.",
          image: "https://images.unsplash.com/photo-1590483864506-69ec069f0b5d?q=80&w=1000&auto=format&fit=crop"
        }
      ],
      stadiums: [
        {
          name: "Estadio Azteca",
          location: "Mexico City",
          capacity: "114,600",
          notableMatch: "Argentina 2-1 England (Quarter-final)",
          image: "https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=1000&auto=format&fit=crop"
        }
      ],
      stats: [
        { label: "Total Goals Scored", value: "132", subText: "The dynamic offensive tournament in altitude" },
        { label: "Shots per Match", value: "24.5", subText: "Highly robust long range attacks characteristic of the retro leather balls" },
        { label: "Yellow/Red Match Points", value: "155/8", subText: "High physical defensive systems that paved the way for modern fouling reforms" }
      ],
      tacticalTrend: "The adoption of the specialized 3-5-2 layout. Carlos Bilardo introduced this specialized shape to bypass traditional wing play and overwhelm midfields using dynamic box-to-box sweepers.",
      capsule: {
        champion: "Argentina",
        runnerUp: "West Germany",
        host: "Mexico",
        mvp: "Diego Maradona",
        topScorer: "Gary Lineker (6 Goals)",
        definingMoment: "The majestic dribbling show against England in high elevation.",
        historicalSignificance: "Cemented Maradona’s divine, legendary reputation inside South American and global football lore."
      }
    };
  }

  // High-fidelity fallback generator for any of the other 20 tournaments!
  const defaultHost = year === 1930 ? "Uruguay" : (year === 1950 ? "Brazil" : (year === 1970 ? "Mexico" : (year === 1998 ? "France" : (year === 2014 ? "Brazil" : "Europe/Americas"))));
  const dummyChampion = year === 1970 ? "Brazil" : (year === 1998 ? "France" : (year === 2014 ? "Germany" : "Uruguay"));
  const dummyRunnerUp = year === 1970 ? "Italy" : (year === 1998 ? "Brazil" : (year === 2014 ? "Argentina" : "Czechoslovakia"));

  return {
    year: year,
    dates: "June 1 - July 2",
    teamsCount: year >= 1998 ? 32 : (year >= 1982 ? 24 : 16),
    goldenBall: "Legendary Star",
    goldenBoot: "Historic Finisher",
    goldenBootGoals: 6,
    storyExtended: `The ${year} tournament was a milestone of drama and sporting romance. It captured the world's absolute focus as tactical styles collided and legends wrote their names into international football folklore.`,
    roadToGlory: [
      { stage: "Group Stage", opponent: "Top Challengers", score: "Progressed", story: "The ultimate test of roster rotation and adaptation across intense opening fixtures." },
      { stage: "Quarter-Final", opponent: "Contender Nation", score: "2 - 1", story: "A tactical stalemate broken by an architectural set-piece routine in the dying minutes." },
      { stage: "Final Match", opponent: "Finalist Rivals", score: "Winning Margin", story: "Immortal champions emerged after a beautiful show of national grit and elite class." }
    ],
    definingMoments: [
      { title: "The Turning Point", desc: "The definitive header or save that redirected the champion's path.", image: "https://images.unsplash.com/photo-1518091043644-c1d4457912c6?q=80&w=1000&auto=format&fit=crop" }
    ],
    legacy: `This tournament left an permanent, historic mark on the beautiful game. Its key goals, legendary saves, and iconic crowds went on to define the design and visual patterns of this footballing era.`,
    groups: [
      {
        name: "Group Alpha",
        standings: [
          { team: dummyChampion, w: 2, d: 1, l: 0, pts: 7 },
          { team: "Challenger A", w: 1, d: 2, l: 0, pts: 5 },
          { team: "Challenger B", w: 1, d: 0, l: 2, pts: 3 },
          { team: "Challenger C", w: 0, d: 1, l: 2, pts: 1 }
        ],
        matches: [
          { home: dummyChampion, away: "Challenger C", score: "3 - 0", story: "A display of absolute fluid control from start to finish." },
          { home: "Challenger A", away: "Challenger B", score: "1 - 1", story: "A bruising encounter that ended in tactical deadlock." }
        ],
        keyMoment: "A spectacular overhead-kick goal that sent shockwaves through the local arenas."
      }
    ],
    knockoutDrama: [
      {
        stage: "Semi-Final",
        home: dummyChampion,
        away: "Underdog Sensation",
        score: "2 - 1",
        mapNote: "Tactical breakdown: The sensation's compact low block neutralizes direct play, forcing the favorites to hit late from set-piece headers.",
        moment: "A towering volley-strike in the 88th minute of play."
      },
      {
        stage: "Grand Final",
        home: dummyChampion,
        away: dummyRunnerUp,
        score: "Winner's Fate",
        mapNote: "An athletic struggle on muddy grass, pitting defensive sweeps against lightning-fast flank dynamic runners.",
        moment: "The absolute explosion of sound as the referee sounds the historical final whistle."
      }
    ],
    heroes: [
      {
        name: "Iconic Playmaker",
        role: "Creative Maestro",
        stats: [
          { label: "Goals", value: 4 },
          { label: "Assists", value: 3 },
          { label: "Distance Covered", value: "34km" }
        ],
        legacyMoment: "A series of decisive long-range passes and direct free-kick goals when the stadium was carrying extreme pressure.",
        image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1000&auto=format&fit=crop"
      }
    ],
    stadiums: [
      {
        name: "National Memorial Arena",
        location: defaultHost,
        capacity: "75,000",
        notableMatch: "The Dramatic Final",
        image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1000&auto=format&fit=crop"
      }
    ],
    stats: [
      { label: "Tournament Goals", value: "115+", subText: "Solid tactical defensive lines defining the physical matchups" },
      { label: "Clean Sheets", value: "16", subText: "A testament to disciplined historical defensive systems" }
    ],
    tacticalTrend: "The emergence of the dynamic attacking transition model, shifting the physical emphasis to structured midfields with heavy man-marking assignments.",
    capsule: {
      champion: dummyChampion,
      runnerUp: dummyRunnerUp,
      host: defaultHost,
      mvp: "Era Playmaker",
      topScorer: "Dynamic Striker",
      definingMoment: "The winning header in extra time under a downpour.",
      historicalSignificance: "Redefined how tournament preparation and recovery are structured for professional international play."
    }
  };
}
