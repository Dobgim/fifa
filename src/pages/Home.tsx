import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Ticket, Users, ArrowRight, Zap, Star,
  ChevronRight, Clock, MapPin, Calendar, Trophy,
  CheckCircle, Globe, Headphones, CreditCard, PlayCircle,
  TrendingUp, Award, Lock
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import {
  MATCH_SCHEDULE,
  getTodayStr,
  getMatchesForDate,
  getTodaysFeaturedMatch,
  getMatchesByDate,
  formatMatchDate,
  type Match
} from '../data/products';

// ─── Local Time Badge ────────────────────────────────────────────────────────
function LocalTimeBadge({ utcTime, venueTime }: { utcTime: string; venueTime: string }) {
  const [localTime, setLocalTime] = React.useState('');

  React.useEffect(() => {
    try {
      const d = new Date(utcTime);
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const formatted = d.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: tz,
      });
      const tzLabel = new Intl.DateTimeFormat('en-US', {
        timeZoneName: 'short',
        timeZone: tz,
      }).formatToParts(d).find((p) => p.type === 'timeZoneName')?.value ?? '';
      setLocalTime(`${formatted} ${tzLabel} (Your Time)`);
    } catch {
      setLocalTime(venueTime);
    }
  }, [utcTime, venueTime]);

  return localTime ? (
    <span className="inline-flex items-center gap-1 bg-accent/15 border border-accent/25 text-accent text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider">
      🌍 {localTime}
    </span>
  ) : null;
}

// ─── Live Countdown Timer ────────────────────────────────────────────────────
function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const now = Date.now();
      const target = new Date(targetDate).getTime();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-2">
      {[
        { val: pad(timeLeft.h), label: 'HRS' },
        { val: pad(timeLeft.m), label: 'MIN' },
        { val: pad(timeLeft.s), label: 'SEC' },
      ].map((unit, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <span className="bg-accent/20 border border-accent/30 text-accent font-black text-xl sm:text-2xl tabular-nums px-3 py-1.5 rounded-lg min-w-[3rem] text-center">
              {unit.val}
            </span>
            <span className="text-[9px] text-slate-500 font-bold tracking-widest mt-1">{unit.label}</span>
          </div>
          {i < 2 && <span className="text-accent font-black text-xl mb-3">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Day Tab Selector ────────────────────────────────────────────────────────
interface DayGroup { date: string; matches: Match[] }

function DayTabs({
  groups,
  selectedDate,
  onSelect,
}: {
  groups: DayGroup[];
  selectedDate: string;
  onSelect: (d: string) => void;
}) {
  const today = getTodayStr();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {groups.map(({ date, matches }) => {
        const { relative, dateObj } = formatMatchDate(date);
        const isToday = date === today;
        const isSelected = date === selectedDate;
        const isPast = date < today;
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const dayNum = dateObj.getDate();
        const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' });

        return (
          <button
            key={date}
            onClick={() => onSelect(date)}
            className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer min-w-[80px] ${
              isSelected
                ? 'bg-accent text-white border-accent shadow-lg shadow-accent/30'
                : isPast
                ? 'bg-slate-900/40 border-white/5 text-slate-600 cursor-not-allowed'
                : isToday
                ? 'bg-accent/10 border-accent/40 text-accent hover:bg-accent/20'
                : 'bg-slate-900/60 border-white/5 text-slate-300 hover:border-white/20 hover:text-white'
            }`}
          >
            {isToday && !isSelected && (
              <span className="text-[9px] font-black tracking-widest text-accent mb-0.5 uppercase">TODAY</span>
            )}
            {isSelected && isToday && (
              <span className="text-[9px] font-black tracking-widest text-white/80 mb-0.5 uppercase">TODAY</span>
            )}
            {!isToday && (
              <span className="uppercase tracking-wider text-[9px] font-bold opacity-60 mb-0.5">{dayName}</span>
            )}
            <span className="text-lg font-black leading-none">{dayNum}</span>
            <span className="uppercase tracking-wider text-[9px] mt-0.5 opacity-70">{monthName}</span>
            <span className={`mt-1.5 text-[9px] font-black px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20' : 'bg-white/5'}`}>
              {matches.length} {matches.length === 1 ? 'match' : 'matches'}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Match Row Card ──────────────────────────────────────────────────────────
function MatchRow({ match }: { match: Match }) {
  const { relative } = formatMatchDate(match.calendarDate);
  const isToday = match.calendarDate === getTodayStr();

  return (
    <Link
      to={`/product/${match.id}?category=3`}
      className="group flex items-center gap-4 bg-slate-900/50 hover:bg-slate-800/60 border border-white/5 hover:border-accent/25 rounded-2xl px-5 py-4 transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Flags */}
      <div className="flex items-center gap-2 min-w-[95px] justify-center">
        {match.flagA === '🏆' || match.flagA === '⚽' || match.flagA.toLowerCase() === 'tbd' ? (
          <span className="text-xl">{match.flagA}</span>
        ) : (
          <img
            src={`https://flagcdn.com/w40/${match.flagA.toLowerCase()}.png`}
            alt={match.teamA}
            className="w-7 h-4 object-cover rounded shadow-sm border border-white/5"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        )}
        <span className="text-[9px] font-black text-slate-500">VS</span>
        {match.flagB === '🏆' || match.flagB === '⚽' || match.flagB.toLowerCase() === 'tbd' ? (
          <span className="text-xl">{match.flagB}</span>
        ) : (
          <img
            src={`https://flagcdn.com/w40/${match.flagB.toLowerCase()}.png`}
            alt={match.teamB}
            className="w-7 h-4 object-cover rounded shadow-sm border border-white/5"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-grow min-w-0">
        <span className="text-white font-bold text-sm leading-snug truncate group-hover:text-accent transition-colors">
          {match.teamA} vs {match.teamB}
        </span>
        <span className="text-[11px] text-slate-500 mt-0.5 truncate">
          {match.venue} · {match.city}
        </span>
      </div>

      {/* Time & Group */}
      <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
        <span className="text-xs font-bold text-white">{match.time}</span>
        {match.utcTime && (
          <LocalTimeBadge utcTime={match.utcTime} venueTime={match.time} />
        )}
        <span className="text-[10px] text-slate-500 font-semibold">{match.group}</span>
      </div>

      {/* Badge */}
      <div className="flex items-center gap-2 shrink-0">
        {isToday && match.isFeatured && (
          <span className="hidden sm:inline-flex items-center gap-1 bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-wider">
            🔥 Hot
          </span>
        )}
        <span
          className={`text-[10px] font-black px-2.5 py-1 rounded-lg ${
            match.inStock ? 'bg-pitch-green/15 text-pitch-green border border-pitch-green/20' : 'bg-slate-800 text-slate-500'
          }`}
        >
          {match.inStock ? 'Available' : 'Sold Out'}
        </span>
        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-accent transition-colors" />
      </div>
    </Link>
  );
}

// ─── Main Home Component ─────────────────────────────────────────────────────
const Home: React.FC = () => {
  const today = getTodayStr();
  const allGroups = getMatchesByDate();

  // Only show upcoming or today's groups
  const upcomingGroups = allGroups.filter(({ date }) => date >= today);
  const displayGroups = upcomingGroups.slice(0, 10);

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    if (displayGroups.length > 0) return displayGroups[0].date;
    return today;
  });

  const selectedMatches = getMatchesForDate(selectedDate);
  const featuredMatch = getTodaysFeaturedMatch();
  // heroImage removed — hero uses professional pitch-gradient background
  const heroTeamA = featuredMatch?.teamA ?? 'World Cup';
  const heroTeamB = featuredMatch?.teamB ?? '2026';
  const heroFlagA = featuredMatch?.flagA ?? '⚽';
  const heroFlagB = featuredMatch?.flagB ?? '🏆';

  // Featured (highest-rated available) 3 cards for "Featured Tickets"
  const featuredCards = [...MATCH_SCHEDULE]
    .filter((m) => m.inStock && m.calendarDate >= today)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // Real countdown to next match kickoff — using the UTC time field
  const nextMatch = MATCH_SCHEDULE
    .filter((m) => m.inStock && m.calendarDate >= today)
    .sort((a, b) => {
      // Sort by actual UTC time if available, fallback to calendar date
      if (a.utcTime && b.utcTime) return new Date(a.utcTime).getTime() - new Date(b.utcTime).getTime();
      return a.calendarDate.localeCompare(b.calendarDate);
    })[0];
  const countdownTarget = nextMatch?.utcTime ?? new Date(Date.now() + 3600000).toISOString();

  return (
    <div className="overflow-hidden">

      {/* ══════════════ 1. HERO SECTION ══════════════ */}
      <section className="relative min-h-screen flex items-center justify-center bg-slate-950 text-center px-4 sm:px-6 lg:px-8">
        {/* Professional pitch-green gradient background — no flag image clash */}
        <div className="absolute inset-0 z-0">
          {/* Base dark layer */}
          <div className="absolute inset-0 bg-slate-950" />
          {/* Radial FIFA-blue spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_120%,rgba(0,68,148,0.60),transparent_65%)]" />
          {/* Pitch-green glow from bottom-left */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_100%,rgba(0,177,64,0.18),transparent_60%)]" />
          {/* Top-right accent glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_0%,rgba(0,68,148,0.25),transparent_60%)]" />
          {/* Subtle football pitch grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(255,255,255,0.5) 60px,rgba(255,255,255,0.5) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(255,255,255,0.5) 60px,rgba(255,255,255,0.5) 61px)' }}
          />
        </div>
        {/* Bottom fade to page */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-0" />

        {/* Content */}
        <div className="relative max-w-6xl mx-auto flex flex-col items-center z-10 select-none pt-28 pb-16">

          {/* Live badge */}
          <span className="px-4 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-xs font-bold text-red-400 tracking-widest uppercase mb-6 flex items-center gap-2">
            <span className="live-pulse" />
            LIVE · FIFA World Cup 2026™
          </span>

          {/* Featured match banner */}
          {featuredMatch && (
            <div className="flex items-center gap-4 sm:gap-8 mb-6 bg-white/5 backdrop-blur-md border border-white/10 px-6 sm:px-10 py-4 rounded-3xl">
              {featuredMatch.flagA === '🏆' || featuredMatch.flagA === '⚽' || featuredMatch.flagA.toLowerCase() === 'tbd' ? (
                <span className="text-5xl sm:text-7xl drop-shadow-2xl">{heroFlagA}</span>
              ) : (
                <img
                  src={`https://flagcdn.com/w160/${featuredMatch.flagA.toLowerCase()}.png`}
                  alt={featuredMatch.teamA}
                  className="h-10 sm:h-16 w-auto object-contain rounded shadow-lg border border-white/10"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              )}
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-black text-accent tracking-widest uppercase mb-1">
                  {featuredMatch.isFeatured ? '🔥 Most Watched Today' : "Today's Match"}
                </span>
                <span className="text-lg sm:text-2xl font-black text-white tracking-widest uppercase">VS</span>
                <span className="text-[10px] font-semibold text-slate-400 mt-1">{featuredMatch.group}</span>
              </div>
              {featuredMatch.flagB === '🏆' || featuredMatch.flagB === '⚽' || featuredMatch.flagB.toLowerCase() === 'tbd' ? (
                <span className="text-5xl sm:text-7xl drop-shadow-2xl">{heroFlagB}</span>
              ) : (
                <img
                  src={`https://flagcdn.com/w160/${featuredMatch.flagB.toLowerCase()}.png`}
                  alt={featuredMatch.teamB}
                  className="h-10 sm:h-16 w-auto object-contain rounded shadow-lg border border-white/10"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              )}
            </div>
          )}

          <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wide uppercase leading-none drop-shadow-2xl max-w-5xl text-center">
            {featuredMatch
              ? <><span className="text-accent">{heroTeamA}</span> vs <span className="text-accent">{heroTeamB}</span></>
              : <><span className="text-accent">FIFA</span> World Cup <span className="text-accent">Tickets</span></>
            }
          </h1>

          {featuredMatch && (
            <div className="mt-4 flex flex-col items-center gap-2">
              <p className="text-slate-300 text-sm sm:text-base flex items-center gap-3 flex-wrap justify-center">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-accent" />
                  {featuredMatch.venue}, {featuredMatch.city}
                </span>
                <span className="text-slate-600">·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-accent" />
                  {featuredMatch.time} · {formatMatchDate(featuredMatch.calendarDate).full}
                </span>
              </p>
              {/* Local time badge — auto-converts to viewer's timezone (WAT, GMT, etc.) */}
              {featuredMatch.utcTime && (
                <LocalTimeBadge utcTime={featuredMatch.utcTime} venueTime={featuredMatch.time} />
              )}
            </div>
          )}

          {/* Countdown */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Next Kickoff In
            </span>
            <CountdownTimer targetDate={countdownTarget} />
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/tickets"
              className="bg-accent hover:bg-accent-dark text-white font-bold uppercase tracking-wider text-xs py-4 px-10 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer shadow-xl shadow-accent/30"
            >
              <Ticket className="w-4 h-4" /> Browse All Tickets
            </Link>
            {featuredMatch && (
              <Link
                to={`/product/${featuredMatch.id}?category=3`}
                className="bg-white/10 hover:bg-white/15 text-white font-bold uppercase tracking-wider text-xs py-4 px-8 rounded-xl transition-all hover:scale-105 border border-white/10 hover:border-white/20 flex items-center gap-2 justify-center"
              >
                Buy Today's Tickets <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Quick trust row */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-slate-400 font-semibold">
            {[
              { icon: ShieldCheck, text: '100% Guaranteed' },
              { icon: Lock, text: 'Secure Checkout' },
              { icon: Zap, text: 'Instant Transfer' },
              { icon: Star, text: '4.8/5 Rated' },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-accent" /> {text}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] text-white font-bold uppercase tracking-widest">Scroll</span>
          <div className="w-px h-10 bg-white/30 rounded-full" />
        </div>
      </section>

      {/* ══════════════ 2. TRUST BADGES ══════════════ */}
      <section className="bg-slate-900 border-y border-white/5 py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: '100% Verified Tickets', desc: 'Secure escrow guarantees authenticity and valid stadium entry.' },
              { icon: Zap, title: 'Safe Mobile Direct Transfer', desc: 'Tickets transferred directly to your official FIFA Tickets account.' },
              { icon: Users, title: 'Guaranteed Adjacent Seats', desc: 'All group orders placed together receive adjacent seating.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 text-left p-3 rounded-2xl hover:bg-white/3 transition-colors">
                <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/15 shrink-0">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-white font-bold uppercase text-sm tracking-wider">{title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 3. TODAY'S MATCHES (DAY-BY-DAY) ══════════════ */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-accent tracking-widest uppercase">
                📅 Match Schedule
              </span>
              <h2 className="text-white text-3xl sm:text-5xl font-extrabold tracking-wide mt-2">
                Matches by Day
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Real-time schedule — today is <span className="text-accent font-bold">{formatMatchDate(today).full}</span>
              </p>
            </div>
            <Link
              to="/tickets"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-accent transition-colors shrink-0"
            >
              View Full Catalog <ArrowRight className="w-4 h-4 text-accent" />
            </Link>
          </div>

          {/* Day Tabs */}
          {displayGroups.length > 0 ? (
            <>
              <DayTabs
                groups={displayGroups}
                selectedDate={selectedDate}
                onSelect={setSelectedDate}
              />

              {/* Match Rows */}
              <div className="mt-6 flex flex-col gap-3">
                {selectedMatches.length > 0 ? (
                  selectedMatches.map((match) => (
                    <MatchRow key={match.id} match={match} />
                  ))
                ) : (
                  <p className="text-slate-500 text-center py-12 font-semibold">
                    No matches scheduled for this day.
                  </p>
                )}
              </div>
            </>
          ) : (
            <p className="text-slate-500 text-center py-12">No upcoming matches found.</p>
          )}
        </div>
      </section>

      {/* ══════════════ 4. FEATURED TICKETS GRID ══════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-accent tracking-widest uppercase">🔥 Hot Tickets</span>
              <h2 className="text-white text-3xl sm:text-5xl font-extrabold tracking-wide mt-2">
                Most In-Demand Matches
              </h2>
            </div>
            <Link
              to="/tickets"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-accent transition-colors"
            >
              See All <ArrowRight className="w-4 h-4 text-accent" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCards.map((match) => (
              <ProductCard key={match.id} match={match} category={3} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 5. STATS BAR ══════════════ */}
      <section className="bg-gradient-to-r from-primary via-primary-light to-primary-dark py-14 border-y border-white/10 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMCAtMTh2NmgtNnYtNmg2em0tMTggMTh2NmgtNnYtNmg2em0wIC0xOHY2aC02di02aDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '4.8/5', label: 'Customer Rating', icon: Star },
              { num: '12k+', label: 'Tickets Delivered', icon: Ticket },
              { num: '100%', label: 'Delivery Guarantee', icon: CheckCircle },
              { num: '24/7', label: 'Customer Support', icon: Headphones },
            ].map(({ num, label, icon: Icon }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="w-6 h-6 text-white/50" />
                <span className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight">{num}</span>
                <span className="text-[11px] font-bold uppercase text-white/60 tracking-widest">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 6. HOW IT WORKS ══════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-accent tracking-widest uppercase">Simple Process</span>
            <h2 className="text-white text-3xl sm:text-5xl font-extrabold tracking-wide mt-2">
              How To Secure Your Tickets
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-accent/20 via-accent to-accent/20" />

            {[
              { num: '01', title: 'Choose Match & Tier', desc: 'Select your preferred World Cup match and seating category — Category 1 (Premium), 2 (Mid-Tier), or 3 (Budget).', icon: Trophy },
              { num: '02', title: 'Secure Checkout', desc: 'Enter your details and pay via SSL-encrypted gateway. We accept Visa, Mastercard, Amex, and PayPal.', icon: CreditCard },
              { num: '03', title: 'Instant Digital Transfer', desc: 'Tickets are transferred directly to your official FIFA Tickets account email — ready to scan at the stadium gate.', icon: Zap },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative flex flex-col items-center md:items-start text-center md:text-left p-6 bg-slate-900/40 rounded-3xl border border-white/5 hover:border-accent/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                    <span className="text-6xl font-black text-accent/30 leading-none">{step.num}</span>
                    <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-lg uppercase tracking-wider">{step.title}</h3>
                  <p className="text-sm text-slate-400 mt-3 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════ 7. TICKET CATEGORIES ══════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/80 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-accent tracking-widest uppercase">Seating Tiers</span>
            <h2 className="text-white text-3xl sm:text-5xl font-extrabold tracking-wide mt-2">
              Choose Your Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                cat: 1,
                label: 'Category 1',
                badge: 'PREMIUM',
                badgeColor: 'bg-yellow-500 text-yellow-950',
                desc: 'Prime sideline & lower tier seats with direct tactical sightlines. The closest you can get to the action.',
                features: ['Central sideline positions', 'Lower tier priority access', 'Best stadium sightlines', 'VIP stadium services'],
                priceFrom: '$1,380',
                path: '/category-1',
                gradient: 'from-yellow-500/10 to-transparent',
                border: 'border-yellow-500/20 hover:border-yellow-500/50',
              },
              {
                cat: 2,
                label: 'Category 2',
                badge: 'MID-TIER',
                badgeColor: 'bg-primary text-white',
                desc: 'Corner and upper sideline areas — perfect balance of atmosphere, view, and value.',
                features: ['Corner & upper sidelines', 'Elevated full-pitch view', 'High-energy fan sections', 'Premium food access'],
                priceFrom: '$960',
                path: '/category-2',
                gradient: 'from-primary/10 to-transparent',
                border: 'border-primary/20 hover:border-primary/50',
              },
              {
                cat: 3,
                label: 'Category 3',
                badge: 'BUDGET',
                badgeColor: 'bg-pitch-green text-white',
                desc: 'Behind-goal fan sections — maximum atmosphere, incredible energy, and the best prices.',
                features: ['Behind-goal fan zones', 'Intense stadium atmosphere', 'Most affordable option', 'Same transfer guarantee'],
                priceFrom: '$640',
                path: '/category-3',
                gradient: 'from-pitch-green/10 to-transparent',
                border: 'border-pitch-green/20 hover:border-pitch-green/50',
              },
            ].map((tier) => (
              <Link
                key={tier.cat}
                to={tier.path}
                className={`group relative flex flex-col bg-gradient-to-b ${tier.gradient} bg-slate-900/50 rounded-3xl border ${tier.border} p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden`}
              >
                <span className={`self-start text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase mb-4 ${tier.badgeColor}`}>
                  {tier.badge}
                </span>
                <h3 className="text-white text-2xl font-extrabold tracking-wide">{tier.label}</h3>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">{tier.desc}</p>

                <ul className="mt-6 flex flex-col gap-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-xs text-slate-300 font-semibold">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">From</span>
                    <span className="text-2xl font-black text-white">{tier.priceFrom}</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent group-hover:gap-3 transition-all">
                    Shop Now <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 8. UPCOMING TOURNAMENT BRACKET ══════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold text-accent tracking-widest uppercase">🏆 Tournament</span>
              <h2 className="text-white text-3xl sm:text-5xl font-extrabold tracking-wide mt-2">
                Knockout Stage Tickets
              </h2>
              <p className="text-slate-400 text-sm mt-2">High-demand knockout matches — book early before they sell out</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MATCH_SCHEDULE.filter(m => ['Round of 16', 'Quarter-Final', 'Semi-Final', 'FINAL'].includes(m.group) && m.inStock).map((match) => {
              const { full } = formatMatchDate(match.calendarDate);
              return (
                <Link
                  key={match.id}
                  to={`/product/${match.id}?category=1`}
                  className="group relative bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 hover:border-accent/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 text-[10px] font-black px-3 py-1 rounded-bl-xl tracking-widest uppercase ${
                    match.group === 'FINAL' ? 'bg-yellow-500 text-yellow-950' :
                    match.group === 'Semi-Final' ? 'bg-purple-600 text-white' :
                    match.group === 'Quarter-Final' ? 'bg-primary text-white' :
                    'bg-slate-700 text-white'
                  }`}>{match.group}</div>

                  <div className="flex items-center gap-3 mt-4">
                    {match.flagA === '🏆' || match.flagA === '⚽' || match.flagA.toLowerCase() === 'tbd' ? (
                      <span className="text-3xl">{match.flagA}</span>
                    ) : (
                      <img
                        src={`https://flagcdn.com/w80/${match.flagA.toLowerCase()}.png`}
                        alt={match.teamA}
                        className="w-10 h-6 object-cover rounded shadow border border-white/10"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    )}
                    <span className="text-xs font-black text-slate-500">VS</span>
                    {match.flagB === '🏆' || match.flagB === '⚽' || match.flagB.toLowerCase() === 'tbd' ? (
                      <span className="text-3xl">{match.flagB}</span>
                    ) : (
                      <img
                        src={`https://flagcdn.com/w80/${match.flagB.toLowerCase()}.png`}
                        alt={match.teamB}
                        className="w-10 h-6 object-cover rounded shadow border border-white/10"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                  <h3 className="text-white font-bold mt-3 text-base leading-snug group-hover:text-accent transition-colors">
                    {match.teamA} vs {match.teamB}
                  </h3>
                  <div className="mt-3 flex flex-col gap-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-accent" /> {full}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-accent" /> {match.venue}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-white font-black text-xl">${match.basePrice.toLocaleString()}</span>
                    <span className="text-[10px] text-accent font-black uppercase tracking-wider flex items-center gap-1">
                      Book Now <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════ 9. WHY CHOOSE US ══════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/70 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Left: Value Props */}
            <div>
              <span className="text-xs font-bold text-accent tracking-widest uppercase">Why Choose Us</span>
              <h2 className="text-white text-3xl sm:text-5xl font-extrabold tracking-wide mt-2 mb-10">
                The #1 Trusted FIFA Ticket Marketplace
              </h2>

              <div className="flex flex-col gap-6">
                {[
                  { icon: ShieldCheck, title: 'Buyer Protection Guarantee', desc: 'Every order is covered. If a match is cancelled, rescheduled, or tickets fail to transfer, you receive a full refund.' },
                  { icon: Globe, title: 'Global Delivery Network', desc: 'We deliver tickets to buyers in 50+ countries via the official FIFA Tickets digital portal — no physical shipping needed.' },
                  { icon: TrendingUp, title: 'Best Price Promise', desc: 'We track the secondary market in real-time so you always get the most competitive prices for your desired match and tier.' },
                  { icon: Award, title: '5-Star Seller Status', desc: 'Rated 4.8/5 by over 12,000 verified buyers. We maintain the highest seller ratings on all major ticket platforms.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/15 shrink-0 h-fit">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-white font-bold text-sm uppercase tracking-wider">{title}</h4>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Testimonials */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-bold text-accent tracking-widest uppercase">⭐ Customer Reviews</span>
              {[
                { name: 'James R.', country: '🇬🇧', rating: 5, text: 'Ordered 4 Category 1 tickets for England. Transfer was seamless — 3 days before kickoff as promised. Absolutely brilliant!' },
                { name: 'Sofia M.', country: '🇧🇷', rating: 5, text: 'Amazing experience. Got Brazil tickets within hours of ordering. The FIFA portal transfer worked perfectly. 10/10 will buy again.' },
                { name: 'Carlos T.', country: '🇲🇽', rating: 5, text: 'I was nervous about secondary market tickets but this site is completely legit. All 6 tickets for our group worked without issue.' },
                { name: 'Yuki N.', country: '🇯🇵', rating: 5, text: 'Bought Argentina vs Japan tickets. Amazing process, fast transfer. Best price I found anywhere online for these seats.' },
              ].map(({ name, country, rating, text }) => (
                <div key={name} className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 text-left hover:border-accent/20 transition-colors">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed italic">"{text}"</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-lg">{country}</span>
                    <span className="text-xs font-bold text-white">{name}</span>
                    <span className="text-[10px] text-slate-500">· Verified Buyer</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 10. FINAL CTA BANNER ══════════════ */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(255,107,0,0.15),transparent)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-accent tracking-widest uppercase mb-4 block">Limited Availability</span>
          <h2 className="text-white text-4xl sm:text-6xl font-extrabold tracking-wide leading-none">
            Don't Miss Out on <br /><span className="text-accent">History</span>
          </h2>
          <p className="mt-6 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            The FIFA World Cup 2026™ is the first 48-team edition — the biggest in history. Tickets are selling fast across all categories. Secure your place in the stands today.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tickets"
              className="bg-accent hover:bg-accent-dark text-white font-bold uppercase tracking-wider text-sm py-4 px-12 rounded-xl transition-all hover:scale-105 cursor-pointer shadow-xl shadow-accent/30 flex items-center gap-2 justify-center"
            >
              <PlayCircle className="w-5 h-5" /> Browse All Tickets
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/15 text-white font-bold uppercase tracking-wider text-sm py-4 px-10 rounded-xl border border-white/10 transition-all hover:scale-105 flex items-center gap-2 justify-center"
            >
              <Headphones className="w-5 h-5" /> Contact Support
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
