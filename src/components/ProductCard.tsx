import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Star, ShoppingCart, CheckCircle, AlertTriangle } from 'lucide-react';
import { formatMatchDate, getTicketPrice, getTodayStr } from '../data/products';
import type { Match } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  match: Match;
  category: 1 | 2 | 3;
}

const ProductCard: React.FC<ProductCardProps> = ({ match, category }) => {
  const { addToCart } = useCart();
  const today = getTodayStr();
  const dateInfo = formatMatchDate(match.calendarDate);
  const ticketPrice = getTicketPrice(match.basePrice, category);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!match.inStock) return;
    
    addToCart({
      matchId: match.id,
      matchTitle: match.title,
      category: category,
      price: ticketPrice,
      image: match.image,
      dateStr: dateInfo.full,
      venueStr: `${match.venue}, ${match.city}`
    });
  };

  return (
    <Link
      to={`/product/${match.id}?category=${category}`}
      className="group glass-panel rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-white/5 hover:border-accent/30 hover:-translate-y-1.5"
    >
      {/* Product Image / Match Graphic Banner */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-900">
        <img
          src={match.image}
          alt={match.title}
          className="w-full h-full object-cover opacity-60 group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
        {/* Pitch overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Dynamic Relative Date Badge */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
            match.calendarDate === today
              ? 'bg-red-500 text-white animate-pulse'
              : dateInfo.relative === 'Tomorrow'
              ? 'bg-orange-500 text-white'
              : match.calendarDate > today
              ? 'bg-primary text-white'
              : 'bg-slate-700 text-slate-400'
          }`}>
            {dateInfo.relative}
          </span>
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-slate-900/80 text-slate-300 backdrop-blur-sm">
            {match.group}
          </span>
        </div>

        {/* Stock Status Badge */}
        <div className="absolute top-4 right-4">
          {match.inStock ? (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-pitch-green/90 text-white backdrop-blur-sm flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> IN STOCK
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-slate-800/90 text-slate-400 backdrop-blur-sm flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> SOLD OUT
            </span>
          )}
        </div>

        {/* Large Flag Display Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl drop-shadow-md">{match.flagA}</span>
            <span className="text-xs font-black text-slate-400">VS</span>
            <span className="text-3xl sm:text-4xl drop-shadow-md">{match.flagB}</span>
          </div>
          {/* Star Rating */}
          <div className="flex items-center gap-1 bg-slate-950/70 backdrop-blur-sm px-2 py-0.5 rounded-md text-xs font-bold text-yellow-500">
            <Star className="w-3 h-3 fill-yellow-500" />
            {match.rating.toFixed(1)}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow text-left">
        <h3 className="text-white font-bold text-lg leading-snug tracking-wide group-hover:text-accent transition-colors">
          {match.teamA} vs {match.teamB}
        </h3>
        <p className="text-xs text-slate-400 mt-1 line-clamp-1">
          {match.title}
        </p>

        {/* Details List */}
        <div className="mt-4 flex flex-col gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent shrink-0" />
            <span className="line-clamp-1">{match.venue}, {match.city}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent shrink-0" />
            <span className="line-clamp-1">{dateInfo.full} &bull; {match.time}</span>
          </div>
        </div>

        {/* Price & Cart Actions Section */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-4 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              Category {category}
            </span>
            <span className="text-xl font-extrabold text-white">
              ${ticketPrice} <span className="text-xs font-medium text-slate-400">/ ticket</span>
            </span>
          </div>

          <div className="flex gap-2">
            {match.inStock ? (
              <button
                onClick={handleAddToCart}
                className="bg-accent hover:bg-accent-dark text-white p-2.5 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer shadow-md shadow-accent/15"
                title="Add to Cart"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            ) : (
              <button
                disabled
                className="bg-slate-800 text-slate-500 p-2.5 rounded-xl cursor-not-allowed"
                title="Sold Out"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            )}
            <Link
              to={`/product/${match.id}?category=${category}`}
              className="bg-white/5 hover:bg-white/10 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center border border-white/5 hover:border-white/15"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
