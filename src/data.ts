export interface Tournament {
  year: number;
  host: string;
  champion: string;
  runnerUp: string;
  historicMoment: string;
  keyPlayer: string;
  image: string; // url or placeholder
}

export const tournaments: Tournament[] = [
  { year: 1930, host: 'Uruguay', champion: 'Uruguay', runnerUp: 'Argentina', historicMoment: 'The First Final', keyPlayer: 'Guillermo Stábile', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1400&auto=format&fit=crop' },
  { year: 1934, host: 'Italy', champion: 'Italy', runnerUp: 'Czechoslovakia', historicMoment: 'Pozzo’s Masterclass', keyPlayer: 'Giuseppe Meazza', image: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=1400&auto=format&fit=crop' },
  { year: 1938, host: 'France', champion: 'Italy', runnerUp: 'Hungary', historicMoment: 'Back-to-Back Glory', keyPlayer: 'Leônidas', image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1400&auto=format&fit=crop' },
  { year: 1950, host: 'Brazil', champion: 'Uruguay', runnerUp: 'Brazil', historicMoment: 'The Maracanazo', keyPlayer: 'Obdulio Varela', image: 'https://images.unsplash.com/photo-1518091043644-c1d4457912c6?q=80&w=1400&auto=format&fit=crop' },
  { year: 1954, host: 'Switzerland', champion: 'West Germany', runnerUp: 'Hungary', historicMoment: 'The Miracle of Bern', keyPlayer: 'Ferenc Puskás', image: 'https://images.unsplash.com/photo-1489721345928-2f16186fd044?q=80&w=1400&auto=format&fit=crop' },
  { year: 1958, host: 'Sweden', champion: 'Brazil', runnerUp: 'Sweden', historicMoment: 'A King is Born', keyPlayer: 'Pelé', image: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?q=80&w=1400&auto=format&fit=crop' },
  { year: 1962, host: 'Chile', champion: 'Brazil', runnerUp: 'Czechoslovakia', historicMoment: 'Garrincha’s Show', keyPlayer: 'Garrincha', image: 'https://images.unsplash.com/photo-1600250395350-10118b625ca4?q=80&w=1400&auto=format&fit=crop' },
  { year: 1966, host: 'England', champion: 'England', runnerUp: 'West Germany', historicMoment: 'They Think It’s All Over', keyPlayer: 'Bobby Moore', image: 'https://images.unsplash.com/photo-1605335198948-2612741ef063?q=80&w=1400&auto=format&fit=crop' },
  { year: 1970, host: 'Mexico', champion: 'Brazil', runnerUp: 'Italy', historicMoment: 'The Beautiful Team', keyPlayer: 'Pelé', image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1400&auto=format&fit=crop' },
  { year: 1974, host: 'West Germany', champion: 'West Germany', runnerUp: 'Netherlands', historicMoment: 'Total Football vs Efficiency', keyPlayer: 'Johan Cruyff', image: 'https://images.unsplash.com/photo-1549419141-94817a58da81?q=80&w=1400&auto=format&fit=crop' },
  { year: 1978, host: 'Argentina', champion: 'Argentina', runnerUp: 'Netherlands', historicMoment: 'Ticker Tape in Buenos Aires', keyPlayer: 'Mario Kempes', image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1400&auto=format&fit=crop' },
  { year: 1982, host: 'Spain', champion: 'Italy', runnerUp: 'West Germany', historicMoment: 'Rossi’s Redemption', keyPlayer: 'Paolo Rossi', image: 'https://images.unsplash.com/photo-1605786358826-6df633215286?q=80&w=1400&auto=format&fit=crop' },
  { year: 1986, host: 'Mexico', champion: 'Argentina', runnerUp: 'West Germany', historicMoment: 'The Hand of God', keyPlayer: 'Diego Maradona', image: 'https://images.unsplash.com/photo-1590483864506-69ec069f0b5d?q=80&w=1400&auto=format&fit=crop' },
  { year: 1990, host: 'Italy', champion: 'West Germany', runnerUp: 'Argentina', historicMoment: 'Nights in Rome', keyPlayer: 'Lothar Matthäus', image: 'https://images.unsplash.com/photo-1601633519102-df98a964f58c?q=80&w=1400&auto=format&fit=crop' },
  { year: 1994, host: 'USA', champion: 'Brazil', runnerUp: 'Italy', historicMoment: 'Baggio’s Miss', keyPlayer: 'Romário', image: 'https://images.unsplash.com/photo-1550882142-997f64244fe5?q=80&w=1400&auto=format&fit=crop' },
  { year: 1998, host: 'France', champion: 'France', runnerUp: 'Brazil', historicMoment: 'Zidane’s Headers', keyPlayer: 'Zinedine Zidane', image: 'https://images.unsplash.com/photo-1554521743-300438cf565f?q=80&w=1400&auto=format&fit=crop' },
  { year: 2002, host: 'Japan/South Korea', champion: 'Brazil', runnerUp: 'Germany', historicMoment: 'Ronaldo’s Redemption', keyPlayer: 'Ronaldo', image: 'https://images.unsplash.com/photo-1518335010972-e16e6edbca82?q=80&w=1400&auto=format&fit=crop' },
  { year: 2006, host: 'Germany', champion: 'Italy', runnerUp: 'France', historicMoment: 'The Headbutt', keyPlayer: 'Fabio Cannavaro', image: 'https://images.unsplash.com/photo-1534065939-5047b973f7dc?q=80&w=1400&auto=format&fit=crop' },
  { year: 2010, host: 'South Africa', champion: 'Spain', runnerUp: 'Netherlands', historicMoment: 'Iniesta’s Strike', keyPlayer: 'Andrés Iniesta', image: 'https://images.unsplash.com/photo-1554316315-8bf26259ce50?q=80&w=1400&auto=format&fit=crop' },
  { year: 2014, host: 'Brazil', champion: 'Germany', runnerUp: 'Argentina', historicMoment: '7-1', keyPlayer: 'Thomas Müller', image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1400&auto=format&fit=crop' },
  { year: 2018, host: 'Russia', champion: 'France', runnerUp: 'Croatia', historicMoment: 'Mbappé Emerges', keyPlayer: 'Luka Modrić', image: 'https://images.unsplash.com/photo-1512411603520-2182fc657152?q=80&w=1400&auto=format&fit=crop' },
  { year: 2022, host: 'Qatar', champion: 'Argentina', runnerUp: 'France', historicMoment: 'Messi Completes Football', keyPlayer: 'Lionel Messi', image: 'https://images.unsplash.com/photo-1627627256672-027a4613d028?q=80&w=1400&auto=format&fit=crop' }
];

export interface Legend {
  name: string;
  nation: string;
  era: string;
  achievements: string;
  quote: string;
  image: string;
}

export const legends: Legend[] = [
  { name: 'Pelé', nation: 'Brazil', era: '1958-1970', achievements: '3x World Cup Winner', quote: 'Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing.', image: 'https://images.unsplash.com/photo-1551061985-021c5b8b939e?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Diego Maradona', nation: 'Argentina', era: '1982-1994', achievements: '1x World Cup Winner', quote: 'I am Maradona, who makes goals, who makes mistakes. I can take it all, I have shoulders big enough to fight with everybody.', image: 'https://images.unsplash.com/photo-1563299723-86b6a03ff8fd?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Johan Cruyff', nation: 'Netherlands', era: '1974', achievements: '1x Finalist', quote: 'Playing football is very simple, but playing simple football is the hardest thing there is.', image: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Zinedine Zidane', nation: 'France', era: '1998-2006', achievements: '1x World Cup Winner, 1x Finalist', quote: 'Magic is sometimes very close to nothing at all.', image: 'https://images.unsplash.com/photo-1605335198948-2612741ef063?q=80&w=1000&auto=format&fit=crop' },
  { name: 'Lionel Messi', nation: 'Argentina', era: '2006-2022', achievements: '1x World Cup Winner, 1x Finalist', quote: 'I start early and I stay late, day after day, year after year. It took me 17 years and 114 days to become an overnight success.', image: 'https://images.unsplash.com/photo-1583095116742-99d750fa46cb?q=80&w=1000&auto=format&fit=crop' }
];

export interface Record {
  title: string;
  value: string;
  holder: string;
}

export const records: Record[] = [
  { title: 'Most Goals', value: '16', holder: 'Miroslav Klose (GER)' },
  { title: 'Most Appearances', value: '26', holder: 'Lionel Messi (ARG)' },
  { title: 'Most Titles', value: '5', holder: 'Brazil' },
  { title: 'Youngest Scorer', value: '17y 239d', holder: 'Pelé (BRA)' },
  { title: 'Fastest Goal', value: '10.8s', holder: 'Hakan Şükür (TUR)' }
];

export interface HistoricalMoment {
  id: string;
  title: string;
  description: string;
  year: number;
  image: string;
}

export const moments: HistoricalMoment[] = [
  { id: 'miracle-bern', title: 'The Miracle of Bern', description: 'West Germany achieves the impossible, coming back against the Mighty Magyars in the driving rain of Switzerland.', year: 1954, image: 'https://images.unsplash.com/photo-1489721345928-2f16186fd044?q=80&w=1600&auto=format&fit=crop' },
  { id: 'brazil-1970', title: 'The Beautiful Team', description: 'The 1970 Brazil squad reached the pinnacle of football aesthetics, culminating in Carlos Alberto\'s stunning team goal.', year: 1970, image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1600&auto=format&fit=crop' },
  { id: 'hand-of-god', title: 'The Hand of God & Goal of the Century', description: 'Diego Maradona writes his own mythology in four minutes against England at the Estadio Azteca.', year: 1986, image: 'https://images.unsplash.com/photo-1590483864506-69ec069f0b5d?q=80&w=1600&auto=format&fit=crop' },
  { id: 'mineirazo', title: 'The 7-1 Shock', description: 'A night of disbelief in Belo Horizonte as the hosts are dismantled on their own soil.', year: 2014, image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1600&auto=format&fit=crop' },
  { id: 'messis-triumph', title: 'End of a Wait', description: 'One of the greatest finals in history finishes with Lionel Messi finally lifting the trophy in Lusail.', year: 2022, image: 'https://images.unsplash.com/photo-1627627256672-027a4613d028?q=80&w=1600&auto=format&fit=crop' }
];

