import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Ticket, Users, ArrowRight, Zap, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { MATCH_SCHEDULE } from '../data/products';

const Home: React.FC = () => {
  // Grab 3 featured matches for homepage display
  const featuredMatches = MATCH_SCHEDULE.slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-slate-950 text-center px-4 sm:px-6 lg:px-8">
        {/* Parallax Background / Football Graphic */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 z-0 scale-105"
          style={{ 
            backgroundImage: "url('https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9806.jpg')" 
          }}
        />
        {/* Pitch overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20 z-0" />
        <div className="absolute inset-0 bg-slate-950/30 z-0" />

        {/* Content */}
        <div className="relative max-w-5xl mx-auto flex flex-col items-center z-10 select-none animate-fade-in mt-10">
          <span className="px-4 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-xs font-bold text-accent tracking-widest uppercase mb-6 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 fill-accent text-accent animate-bounce" />
            FIFA World Cup 2026™ Secondary Tickets
          </span>

          <h1 className="text-white text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-wide uppercase leading-none drop-shadow-2xl max-w-4xl text-center">
            Affordable FIFA <br className="hidden sm:inline" />
            <span className="text-accent">World Cup</span> Tickets
          </h1>

          <p className="mt-6 max-w-2xl text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed drop-shadow">
            Secure your presence at the largest sporting spectacle in history. Compare, filter, and buy Category 1, 2, and 3 tickets with 100% verified digital delivery.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/tickets"
              className="bg-accent hover:bg-accent-dark text-white font-bold uppercase tracking-wider text-xs py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer shadow-lg shadow-accent/25"
            >
              Browse Match Tickets <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/category-3"
              className="bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider text-xs py-4 px-8 rounded-xl transition-all hover:scale-105 border border-white/5 hover:border-white/15"
            >
              View Budget Category 3
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Trust Badges Row */}
      <section className="bg-slate-900 border-y border-white/5 py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: '100% Verified Tickets', desc: 'Secure escrow guarantees validity for entry.' },
              { icon: Ticket, title: 'Safe Mobile Direct Transfer', desc: 'Direct seat transfers to your official FIFA account.' },
              { icon: Users, title: 'Guaranteed Seats Together', desc: 'Adjacent seating arrangements for group purchases.' }
            ].map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div key={idx} className="flex items-start gap-4 text-left p-2">
                  <Icon className="w-8 h-8 text-accent shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-bold uppercase text-sm tracking-wider">{badge.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Featured Tickets Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 text-left">
            <div>
              <span className="text-xs font-bold text-accent tracking-widest uppercase">
                FEATURED MATCHES
              </span>
              <h2 className="text-white text-3xl sm:text-5xl font-extrabold tracking-wide mt-2">
                Matches Happening Soon
              </h2>
            </div>
            <Link
              to="/tickets"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-450 hover:text-accent transition-colors"
            >
              See All Tickets <ArrowRight className="w-4 h-4 text-accent" />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMatches.map((match) => (
              <ProductCard key={match.id} match={match} category={3} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Live Stats / Ticker */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-16 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '4.8/5', label: 'Customer Rating' },
              { num: '10k+', label: 'Tickets Transferred' },
              { num: '100%', label: 'Delivery Guarantee' },
              { num: '24/7', label: 'Customer Support' }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight">
                  {stat.num}
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase text-slate-400 tracking-widest mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How it Works / Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950/20">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-bold text-accent tracking-widest uppercase">
            EASY 3-STEP PROCESS
          </span>
          <h2 className="text-white text-3xl sm:text-5xl font-extrabold tracking-wide mt-2 mb-16">
            How to Secure Your Tickets
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: '01', title: 'Choose Match & Tier', desc: 'Select your preferred World Cup match and seating category (Category 1, 2, or 3).' },
              { num: '02', title: 'Complete Secure Checkout', desc: 'Enter customer info and credit card details on our SSL-encrypted secure gateway.' },
              { num: '03', title: 'Receive Direct Transfer', desc: 'Tickets are securely transferred directly to your official email account before kickoff.' }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left relative p-2">
                <span className="font-display text-accent font-black text-6xl leading-none">
                  {step.num}
                </span>
                <h3 className="text-white font-bold text-lg uppercase tracking-wider mt-4">{step.title}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
