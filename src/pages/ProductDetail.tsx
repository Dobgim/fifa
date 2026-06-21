import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Calendar, ShieldCheck, Ticket, Users, FileText, ArrowLeft, Plus, Minus, Info, Sparkles, Clock } from 'lucide-react';
import { MATCH_SCHEDULE, formatMatchDate, getTicketPrice, CATEGORY_NAMES } from '../data/products';
import { useCart } from '../context/CartContext';
import MatchBackground from '../components/MatchBackground';

// Local time auto-converter
function LocalTime({ utcTime }: { utcTime: string }) {
  const [label, setLabel] = useState('');
  useEffect(() => {
    try {
      const d = new Date(utcTime);
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const time = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz });
      const tzShort = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short', timeZone: tz })
        .formatToParts(d).find((p) => p.type === 'timeZoneName')?.value ?? '';
      setLabel(`${time} ${tzShort}`);
    } catch { setLabel(''); }
  }, [utcTime]);
  return label ? <span className="font-bold text-accent">{label} (your time)</span> : null;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Find match details
  const match = MATCH_SCHEDULE.find((m) => m.id === id);

  // Read category from URL params or default to 3
  const urlCategory = parseInt(searchParams.get('category') || '3') as 1 | 2 | 3;
  const [selectedCategory, setSelectedCategory] = useState<1 | 2 | 3>(urlCategory);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'info' | 'stadium' | 'policy'>('info');

  // Handle case where match isn't found
  if (!match) {
    return (
      <div className="pt-32 pb-20 text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Match Not Found</h2>
        <p className="text-slate-400 mt-2 text-sm">The match ticket you are looking for does not exist or has expired.</p>
        <Link
          to="/tickets"
          className="mt-6 inline-block bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-colors"
        >
          Back to Tickets Catalog
        </Link>
      </div>
    );
  }

  const dateInfo = formatMatchDate(match.calendarDate);
  const ticketPrice = getTicketPrice(match.basePrice, selectedCategory);

  const incrementQty = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decrementQty = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleAddToCart = () => {
    if (!match.inStock) return;
    addToCart({
      matchId: match.id,
      matchTitle: match.title,
      category: selectedCategory,
      price: ticketPrice,
      image: match.image,
      dateStr: dateInfo.full,
      venueStr: `${match.venue}, ${match.city}`
    }, quantity);
  };

  const handleBuyNow = () => {
    if (!match.inStock) return;
    // Add to cart first
    addToCart({
      matchId: match.id,
      matchTitle: match.title,
      category: selectedCategory,
      price: ticketPrice,
      image: match.image,
      dateStr: dateInfo.full,
      venueStr: `${match.venue}, ${match.city}`
    }, quantity);
    // Navigate straight to checkout
    navigate('/checkout');
  };

  return (
    <div className="pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          to="/tickets"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-accent" /> Back to Catalog
        </Link>

        {/* Product Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Image Banner */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-white/5 shadow-2xl h-80 sm:h-110">
              <MatchBackground flagA={match.flagA} flagB={match.flagB} className="opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              {/* Graphic Teams flags */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="flex items-center gap-6 sm:gap-10">
                  {match.flagA === '🏆' || match.flagA === '⚽' || match.flagA.toLowerCase() === 'tbd' ? (
                    <span className="text-6xl sm:text-8xl drop-shadow-2xl animate-pulse">{match.flagA}</span>
                  ) : (
                    <img
                      src={`https://flagcdn.com/w160/${match.flagA.toLowerCase()}.png`}
                      alt={match.teamA}
                      className="h-16 sm:h-24 w-auto object-contain rounded shadow-2xl border border-white/10 animate-pulse"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  )}
                  <span className="text-2xl sm:text-3xl font-black text-accent drop-shadow-lg">VS</span>
                  {match.flagB === '🏆' || match.flagB === '⚽' || match.flagB.toLowerCase() === 'tbd' ? (
                    <span className="text-6xl sm:text-8xl drop-shadow-2xl animate-pulse">{match.flagB}</span>
                  ) : (
                    <img
                      src={`https://flagcdn.com/w160/${match.flagB.toLowerCase()}.png`}
                      alt={match.teamB}
                      className="h-16 sm:h-24 w-auto object-contain rounded shadow-2xl border border-white/10 animate-pulse"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  )}
                </div>
                <h2 className="text-white font-extrabold text-3xl sm:text-5xl mt-4 tracking-wider drop-shadow-md">
                  {match.teamA} vs {match.teamB}
                </h2>
              </div>

              {/* Status Badges */}
              <div className="absolute bottom-6 left-6 flex gap-3">
                <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm">
                  {match.group}
                </span>
                <span className="bg-slate-900/80 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm flex items-center gap-1.5">
                  <span className="live-pulse"></span> Dynamic Ticket Feed
                </span>
              </div>
            </div>

            {/* Tabbed Info details below the image */}
            <div className="glass-panel rounded-2xl p-6 border border-white/5 text-left">
              <div className="flex border-b border-white/5 pb-3 mb-5 gap-6">
                {[
                  { id: 'info', label: 'Match Description', icon: FileText },
                  { id: 'stadium', label: 'Stadium Details', icon: MapPin },
                  { id: 'policy', label: 'Transfer Policy', icon: ShieldCheck }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 font-bold uppercase tracking-wider text-xs pb-2 border-b-2 transition-all cursor-pointer ${
                        activeTab === tab.id
                          ? 'border-accent text-accent'
                          : 'border-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Contents */}
              {activeTab === 'info' && (
                <div className="text-slate-350 text-sm leading-relaxed flex flex-col gap-4">
                  <p>
                    Experience the matches of the FIFA World Cup 2026™ live in person. Watch {match.teamA} face off against {match.teamB} in this critical {match.group} match. Both teams enter the match looking to secure points in the tournament standings, ensuring an intense, competitive display on the field.
                  </p>
                  <p>
                    Category {selectedCategory} tickets place you in {selectedCategory === 3 ? 'the corner or behind-the-goal sections, offering an intense fan-focused environment' : selectedCategory === 2 ? 'mid-tier corner and upper sideline areas, balancing excellent sightlines with high stadium atmosphere' : 'prime sideline and lower tier seats, offering a direct tactical view of the gameplay'}.
                  </p>
                </div>
              )}

              {activeTab === 'stadium' && (
                <div className="text-slate-350 text-sm leading-relaxed flex flex-col gap-3">
                  <div className="flex items-center gap-2 font-bold text-white text-xs uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-accent" /> Location & Venue
                  </div>
                  <p>
                    <strong>Stadium:</strong> {match.venue}<br />
                    <strong>City:</strong> {match.city}<br />
                    <strong>Capacity:</strong> Approx. 65,000+ seats
                  </p>
                  <p>
                    Our tickets are divided across designated blocks. Specific block numbers, rows, and seats are automatically allocated to sit together if purchased in the same order.
                  </p>
                  {/* Seating Map Graphics */}
                  <div className="mt-3 bg-slate-900 border border-slate-800 rounded-xl p-6 text-center text-xs font-bold text-slate-400">
                    [ Interactive Stadium Seating Map Available On Checkout ]
                  </div>
                </div>
              )}

              {activeTab === 'policy' && (
                <div className="text-slate-350 text-sm leading-relaxed flex flex-col gap-3">
                  <div className="flex items-center gap-2 font-bold text-white text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-accent" /> Digital Seat Transfer
                  </div>
                  <p>
                    All ticket operations are conducted digitally. Tickets will be transferred directly to your email address registered with the FIFA Tickets portal.
                  </p>
                  <ul className="list-disc pl-5 flex flex-col gap-1 text-slate-400">
                    <li>Digital transfers complete 3-5 days before the match kickoff.</li>
                    <li>Secure delivery is backed by our 100% money-back buyer guarantee.</li>
                    <li>Tickets can be scanned directly from your mobile smartphone.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Pricing & Purchase Card */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="glass-panel rounded-3xl p-6 border border-white/5 shadow-2xl flex flex-col gap-6 sticky top-28">
              
              {/* Header Info */}
              <div>
                <h1 className="text-white text-3xl sm:text-4xl font-extrabold tracking-wide mb-2 leading-none">
                  {match.teamA} vs {match.teamB}
                </h1>
                <div className="flex flex-col gap-2 mt-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                    <MapPin className="w-4 h-4 text-accent shrink-0" />
                    <span>{match.venue}, {match.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                    <Calendar className="w-4 h-4 text-accent shrink-0" />
                    <span>{dateInfo.full} &bull; {match.time} (Venue Time)</span>
                  </div>
                  {match.utcTime && (
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                      <Clock className="w-4 h-4 text-accent shrink-0" />
                      <LocalTime utcTime={match.utcTime} />
                    </div>
                  )}
                </div>
              </div>

              {/* Seating Tier Category Selector */}
              <div className="border-y border-white/5 py-5 flex flex-col gap-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Ticket className="w-4 h-4 text-accent" /> Select Ticket Tier
                </label>
                <div className="flex flex-col gap-2.5">
                  {([1, 2, 3] as const).map((cat) => {
                    const price = getTicketPrice(match.basePrice, cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-accent/15 border-accent text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            selectedCategory === cat ? 'border-accent bg-accent' : 'border-slate-600'
                          }`}>
                            {selectedCategory === cat && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                          </span>
                          {CATEGORY_NAMES[cat]}
                        </div>
                        <span className="text-sm font-extrabold text-white">${price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price & Quantity Adjuster */}
              <div className="flex items-center justify-between gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Price</span>
                  <span className="text-3xl font-extrabold text-white">
                    ${ticketPrice * quantity}
                    <span className="text-xs font-medium text-slate-400"> for {quantity} x tkt</span>
                  </span>
                </div>

                {/* Quantity adjust */}
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 shrink-0">
                  <button
                    onClick={decrementQty}
                    className="p-2 text-slate-400 hover:text-white cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 font-extrabold text-white text-sm select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQty}
                    className="p-2 text-slate-400 hover:text-white cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                {match.inStock ? (
                  <>
                    <button
                      onClick={handleBuyNow}
                      className="w-full bg-accent hover:bg-accent-dark text-white font-bold uppercase tracking-wider text-xs py-4 rounded-xl transition-all duration-300 hover:scale-102 cursor-pointer shadow-lg shadow-accent/20"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider text-xs py-4 rounded-xl transition-all duration-300 border border-white/5 hover:border-white/15 cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    className="w-full bg-slate-800 text-slate-500 font-bold uppercase tracking-wider text-xs py-4 rounded-xl cursor-not-allowed"
                  >
                    Sold Out
                  </button>
                )}
              </div>

              {/* Trust badges checklist */}
              <div className="border-t border-white/5 pt-5 flex flex-col gap-3">
                {[
                  { text: '100% Guaranteed Official Tickets', desc: 'Secure secondary seat ownership transfer' },
                  { text: 'Instant Mobile Direct Delivery', desc: 'Tickets sent to your FIFA registered account' },
                  { text: 'Full Refund on Cancellations', desc: 'Covered by buyer guarantee insurance' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 text-left">
                    <ShieldCheck className="w-5 h-5 text-pitch-green shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-white text-xs font-bold leading-tight">{item.text}</h5>
                      <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
