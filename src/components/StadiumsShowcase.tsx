import { motion } from 'motion/react';
import { X, Calendar, MapPin, Compass } from 'lucide-react';

interface StadiumsShowcaseProps {
  onClose: () => void;
}

const HISTORIC_STADIUMS = [
  {
    name: "Estadio Centenario",
    city: "Montevideo, Uruguay",
    yearBuilt: 1930,
    capacity: "60,000",
    legacy: "The Birthplace of World Cups",
    description: "Built in just nine months by workers laboring day and night, this stadium was completed specifically for the inaugural 1930 World Cup. It remains one of the most hallowed monuments of world football, declared by FIFA as the only historical monument of world football.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop"
  },
  {
    name: "Estadio Azteca",
    city: "Mexico City, Mexico",
    yearBuilt: 1966,
    capacity: "87,523",
    legacy: "The Colosseum of Legends",
    description: "Sitting over 2,200 meters above sea level, the Azteca is the first stadium to host two World Cup finals (1970 and 1986). It is the sacred turf where Pelé conducted his last beautiful symphony and Diego Maradona scored the controversial 'Hand of God' followed by the divine 'Goal of the Century' in a single four-minute span.",
    image: "https://images.unsplash.com/photo-1590483864506-69ec069f0b5d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    name: "Maracanã Stadium",
    city: "Rio de Janeiro, Brazil",
    yearBuilt: 1950,
    capacity: "78,838",
    legacy: "The Cathedral of Samba and Tears",
    description: "Originally built to hold a colossal 200,000 spectators for the 1950 World Cup, this legendary bowl witnessed the ultimate silence of the Maracanazo when Uruguay defeated Brazil. It was later rebuilt into a sleek modern arena that hosted the 2014 Final won by Germany in extra time.",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457912c6?q=80&w=1200&auto=format&fit=crop"
  },
  {
    name: "Olympiastadion",
    city: "Berlin, Germany",
    yearBuilt: 1936,
    capacity: "74,475",
    legacy: "The Theater of High Drama",
    description: "An architectural masterpiece with a suspended roof design, Berlin's Olympic arena hosted the dramatic 2006 Final. It is immortalized as the pitch where Zinedine Zidane scored a legendary Panenka, was red-carded for his infamous headbutt, and walked past the gold cup into quiet retirement.",
    image: "https://images.unsplash.com/photo-1534065939-5047b973f7dc?q=80&w=1200&auto=format&fit=crop"
  },
  {
    name: "Lusail Stadium",
    city: "Lusail, Qatar",
    yearBuilt: 2021,
    capacity: "88,966",
    legacy: "The Horizon of Modernity",
    description: "A golden bowl resembling traditional hand-crafted vessels, this state-of-the-art stadium was the stage for perhaps the greatest final ever played in 2022. Under the desert twilight, Lionel Messi finally conquered his final peak in a breathtaking 3-3 battle against Kylian Mbappé.",
    image: "https://images.unsplash.com/photo-1627627256672-027a4613d028?q=80&w=1200&auto=format&fit=crop"
  }
];

export function StadiumsShowcase({ onClose }: StadiumsShowcaseProps) {
  return (
    <motion.div 
      className="fixed inset-0 z-[500] bg-[#070707] text-[#F5F2EA] flex flex-col overflow-y-auto font-sans"
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
    >
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#070707]/90 backdrop-blur-md px-6 py-4 border-b border-[#4E5661]/25 flex justify-between items-center">
        <button 
          onClick={onClose} 
          className="text-[#69707A] hover:text-[#F5F2EA] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <X size={20} />
          <span className="font-sans text-xs uppercase tracking-widest font-semibold">Close Exhibit</span>
        </button>
        <span className="font-serif text-sm tracking-widest uppercase text-[#D4AF37]">Stadiums Exhibit</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 w-full">
        {/* Intro */}
        <div className="text-center mb-20">
          <p className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-xs mb-3">Historic Coloseums</p>
          <h2 className="font-serif text-4xl md:text-6xl text-[#F5F2EA] mb-6">The Grand Stages</h2>
          <div className="h-px w-20 bg-[#D4AF37] mx-auto opacity-35 mb-6" />
          <p className="font-serif text-[#69707A] text-lg max-w-2xl mx-auto italic">
            "They are more than fields of grass. They are hallowed theaters where dreams were forged, tears were shed, and legends rose to immortality."
          </p>
        </div>

        {/* Stadiums Stack */}
        <div className="space-y-32">
          {HISTORIC_STADIUMS.map((stadium, idx) => (
            <motion.div 
              key={stadium.name}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1 }}
            >
              {/* Image side - columns 1-7 for even, 6-12 for odd */}
              <div className={`lg:col-span-7 relative group ${idx % 2 === 1 ? 'lg:order-last' : ''}`}>
                <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-sm border border-[#4E5661]/20">
                  <img 
                    src={stadium.image} 
                    alt={stadium.name} 
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 filter grayscale contrast-[1.1] hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-80" />
                </div>
                {/* Vintage Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/50" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/50" />
              </div>

              {/* Info side - columns 8-12 */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#D4AF37] tracking-widest uppercase border border-[#D4AF37]/25 px-2.5 py-1 inline-block">
                    {stadium.legacy}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl text-[#F5F2EA] leading-tight">
                    {stadium.name}
                  </h3>
                  <p className="font-sans text-[#69707A] text-sm flex items-center gap-1.5 uppercase tracking-wider">
                    <MapPin size={14} className="text-[#D4AF37]" /> {stadium.city}
                  </p>
                </div>

                <div className="h-px bg-[#4E5661]/15" />

                <p className="font-sans text-[#DDD7C8] text-base leading-relaxed">
                  {stadium.description}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#4E5661]/15">
                  <div>
                    <span className="font-sans text-[10px] uppercase text-[#69707A] tracking-wider block mb-1">Year Opened</span>
                    <span className="font-serif text-[#F5F2EA] text-xl flex items-center gap-1.5 font-bold">
                      <Calendar size={16} className="text-[#D4AF37]" /> {stadium.yearBuilt}
                    </span>
                  </div>
                  <div>
                    <span className="font-sans text-[10px] uppercase text-[#69707A] tracking-wider block mb-1">Record Capacity</span>
                    <span className="font-serif text-[#F5F2EA] text-xl flex items-center gap-1.5 font-bold">
                      <Compass size={16} className="text-[#D4AF37]" /> {stadium.capacity}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
