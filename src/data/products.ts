export interface Match {
  id: string;
  title: string;
  teamA: string;
  teamB: string;
  flagA: string;
  flagB: string;
  venue: string;
  city: string;
  calendarDate: string; // ISO date string "YYYY-MM-DD"
  basePrice: number;
  time: string;
  group: string;
  inStock: boolean;
  rating: number;
  image: string;
  isFeatured?: boolean; // Most-watched / headliner match of the day
}

export const MATCH_SCHEDULE: Match[] = [
  // ─── June 11 ────────────────────────────────────────────────────────────────
  {
    id: "mexico-canada-opening",
    title: "Mexico vs Canada - Opening Match",
    teamA: "Mexico",
    teamB: "Canada",
    flagA: "🇲🇽",
    flagB: "🇨🇦",
    venue: "Estadio Azteca",
    city: "Mexico City",
    calendarDate: "2026-06-11",
    basePrice: 850,
    time: "20:30 CST",
    group: "Group A",
    inStock: false,
    rating: 5.0,
    image: "https://affordablefifatickets.com/wp-content/uploads/2025/09/IMG_9779-247x247.jpg",
    isFeatured: true,
  },

  // ─── June 12 ────────────────────────────────────────────────────────────────
  {
    id: "usa-uruguay",
    title: "USA vs Uruguay - Group B Match",
    teamA: "USA",
    teamB: "Uruguay",
    flagA: "🇺🇸",
    flagB: "🇺🇾",
    venue: "MetLife Stadium",
    city: "New York/New Jersey",
    calendarDate: "2026-06-12",
    basePrice: 750,
    time: "19:00 EST",
    group: "Group B",
    inStock: false,
    rating: 4.9,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9806-247x247.jpg",
    isFeatured: true,
  },

  // ─── June 13 ────────────────────────────────────────────────────────────────
  {
    id: "argentina-chile",
    title: "Argentina vs Chile - Group C Match",
    teamA: "Argentina",
    teamB: "Chile",
    flagA: "🇦🇷",
    flagB: "🇨🇱",
    venue: "Hard Rock Stadium",
    city: "Miami",
    calendarDate: "2026-06-13",
    basePrice: 820,
    time: "21:00 EST",
    group: "Group C",
    inStock: false,
    rating: 5.0,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9782-247x247.jpg",
    isFeatured: true,
  },

  // ─── June 14 ────────────────────────────────────────────────────────────────
  {
    id: "france-belgium",
    title: "France vs Belgium - Group D Match",
    teamA: "France",
    teamB: "Belgium",
    flagA: "🇫🇷",
    flagB: "🇧🇪",
    venue: "AT&T Stadium",
    city: "Dallas",
    calendarDate: "2026-06-14",
    basePrice: 780,
    time: "18:00 CST",
    group: "Group D",
    inStock: false,
    rating: 4.9,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9806-247x247.jpg",
    isFeatured: true,
  },

  // ─── June 15 ────────────────────────────────────────────────────────────────
  {
    id: "brazil-nigeria",
    title: "Brazil vs Nigeria - Group E Match",
    teamA: "Brazil",
    teamB: "Nigeria",
    flagA: "🇧🇷",
    flagB: "🇳🇬",
    venue: "SoFi Stadium",
    city: "Los Angeles",
    calendarDate: "2026-06-15",
    basePrice: 790,
    time: "19:30 PST",
    group: "Group E",
    inStock: false,
    rating: 5.0,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9782-247x247.jpg",
    isFeatured: true,
  },

  // ─── June 16 ────────────────────────────────────────────────────────────────
  {
    id: "spain-portugal",
    title: "Spain vs Portugal - Group F Match",
    teamA: "Spain",
    teamB: "Portugal",
    flagA: "🇪🇸",
    flagB: "🇵🇹",
    venue: "Lincoln Financial Field",
    city: "Philadelphia",
    calendarDate: "2026-06-16",
    basePrice: 810,
    time: "21:00 EST",
    group: "Group F",
    inStock: false,
    rating: 5.0,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9784-247x247.jpg",
    isFeatured: true,
  },

  // ─── June 17 ────────────────────────────────────────────────────────────────
  {
    id: "germany-japan",
    title: "Germany vs Japan - Group G Match",
    teamA: "Germany",
    teamB: "Japan",
    flagA: "🇩🇪",
    flagB: "🇯🇵",
    venue: "NRG Stadium",
    city: "Houston",
    calendarDate: "2026-06-17",
    basePrice: 720,
    time: "17:00 CST",
    group: "Group G",
    inStock: false,
    rating: 4.8,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9781-247x247.jpg",
    isFeatured: true,
  },

  // ─── June 18 ────────────────────────────────────────────────────────────────
  {
    id: "england-iran",
    title: "England vs Iran - Group H Match",
    teamA: "England",
    teamB: "Iran",
    flagA: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    flagB: "🇮🇷",
    venue: "Gillette Stadium",
    city: "Boston",
    calendarDate: "2026-06-18",
    basePrice: 720,
    time: "19:00 EST",
    group: "Group H",
    inStock: false,
    rating: 4.7,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9783-247x247.jpg",
    isFeatured: true,
  },

  // ─── June 19 ────────────────────────────────────────────────────────────────
  {
    id: "netherlands-senegal",
    title: "Netherlands vs Senegal - Group I Match",
    teamA: "Netherlands",
    teamB: "Senegal",
    flagA: "🇳🇱",
    flagB: "🇸🇳",
    venue: "Lumen Field",
    city: "Seattle",
    calendarDate: "2026-06-19",
    basePrice: 690,
    time: "17:30 PST",
    group: "Group I",
    inStock: false,
    rating: 4.7,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9783-247x247.jpg",
    isFeatured: true,
  },

  // ─── June 20 ────────────────────────────────────────────────────────────────
  {
    id: "italy-cameroon",
    title: "Italy vs Cameroon - Group J Match",
    teamA: "Italy",
    teamB: "Cameroon",
    flagA: "🇮🇹",
    flagB: "🇨🇲",
    venue: "BC Place",
    city: "Vancouver",
    calendarDate: "2026-06-20",
    basePrice: 680,
    time: "18:00 PST",
    group: "Group J",
    inStock: false,
    rating: 4.6,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9776-247x247.jpg",
    isFeatured: true,
  },

  // ─── June 21 (TODAY) ─────────────────────────────────────────────────────────
  {
    id: "usa-england",
    title: "USA vs England - Group B Match",
    teamA: "USA",
    teamB: "England",
    flagA: "🇺🇸",
    flagB: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    venue: "Lincoln Financial Field",
    city: "Philadelphia",
    calendarDate: "2026-06-21",
    basePrice: 690,
    time: "20:00 EST",
    group: "Group B",
    inStock: true,
    rating: 4.9,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9806-247x247.jpg",
    isFeatured: true,
  },
  {
    id: "mexico-south-africa",
    title: "Mexico vs South Africa - Group A Match",
    teamA: "Mexico",
    teamB: "South Africa",
    flagA: "🇲🇽",
    flagB: "🇿🇦",
    venue: "Estadio Azteca",
    city: "Mexico City",
    calendarDate: "2026-06-21",
    basePrice: 650,
    time: "18:00 CST",
    group: "Group A",
    inStock: true,
    rating: 4.7,
    image: "https://affordablefifatickets.com/wp-content/uploads/2025/09/IMG_9779-247x247.jpg",
  },

  // ─── June 22 ────────────────────────────────────────────────────────────────
  {
    id: "australia-turkiye",
    title: "Australia vs Türkiye - Group A Match",
    teamA: "Australia",
    teamB: "Türkiye",
    flagA: "🇦🇺",
    flagB: "🇹🇷",
    venue: "MetLife Stadium",
    city: "New York/New Jersey",
    calendarDate: "2026-06-22",
    basePrice: 639,
    time: "17:00 EST",
    group: "Group A",
    inStock: true,
    rating: 4.7,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9784-247x247.jpg",
    isFeatured: true,
  },
  {
    id: "brazil-morocco",
    title: "Brazil vs Morocco - Group C Match",
    teamA: "Brazil",
    teamB: "Morocco",
    flagA: "🇧🇷",
    flagB: "🇲🇦",
    venue: "SoFi Stadium",
    city: "Los Angeles",
    calendarDate: "2026-06-22",
    basePrice: 677,
    time: "19:30 PST",
    group: "Group C",
    inStock: true,
    rating: 5.0,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9782-247x247.jpg",
  },

  // ─── June 23 ────────────────────────────────────────────────────────────────
  {
    id: "canada-bosnia",
    title: "Canada vs Bosnia and Herzegovina - Group D Match",
    teamA: "Canada",
    teamB: "Bosnia & Herz.",
    flagA: "🇨🇦",
    flagB: "🇧🇦",
    venue: "BC Place",
    city: "Vancouver",
    calendarDate: "2026-06-23",
    basePrice: 669,
    time: "18:00 PST",
    group: "Group D",
    inStock: true,
    rating: 4.5,
    image: "https://affordablefifatickets.com/wp-content/uploads/2025/09/IMG_9778-247x247.jpg",
    isFeatured: true,
  },
  {
    id: "france-iraq",
    title: "France vs Iraq - Group E Match",
    teamA: "France",
    teamB: "Iraq",
    flagA: "🇫🇷",
    flagB: "🇮🇶",
    venue: "Mercedes-Benz Stadium",
    city: "Atlanta",
    calendarDate: "2026-06-23",
    basePrice: 650,
    time: "21:00 EST",
    group: "Group E",
    inStock: true,
    rating: 4.8,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9806-247x247.jpg",
  },

  // ─── June 24 ────────────────────────────────────────────────────────────────
  {
    id: "haiti-scotland",
    title: "Haiti vs Scotland - Group F Match",
    teamA: "Haiti",
    teamB: "Scotland",
    flagA: "🇭🇹",
    flagB: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    venue: "Hard Rock Stadium",
    city: "Miami",
    calendarDate: "2026-06-24",
    basePrice: 645,
    time: "19:00 EST",
    group: "Group F",
    inStock: true,
    rating: 4.6,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9783-247x247.jpg",
    isFeatured: true,
  },

  // ─── June 25 ────────────────────────────────────────────────────────────────
  {
    id: "qatar-switzerland",
    title: "Qatar vs Switzerland - Group G Match",
    teamA: "Qatar",
    teamB: "Switzerland",
    flagA: "🇶🇦",
    flagB: "🇨🇭",
    venue: "AT&T Stadium",
    city: "Dallas",
    calendarDate: "2026-06-25",
    basePrice: 699,
    time: "18:30 CST",
    group: "Group G",
    inStock: true,
    rating: 4.4,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9781-247x247.jpg",
    isFeatured: true,
  },
  {
    id: "south-korea-czechia",
    title: "South Korea vs Czechia - Group H Match",
    teamA: "South Korea",
    teamB: "Czechia",
    flagA: "🇰🇷",
    flagB: "🇨🇿",
    venue: "NRG Stadium",
    city: "Houston",
    calendarDate: "2026-06-25",
    basePrice: 670,
    time: "16:00 CST",
    group: "Group H",
    inStock: true,
    rating: 4.7,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9776-247x247.jpg",
  },

  // ─── June 26 ────────────────────────────────────────────────────────────────
  {
    id: "argentina-japan",
    title: "Argentina vs Japan - Group C Match",
    teamA: "Argentina",
    teamB: "Japan",
    flagA: "🇦🇷",
    flagB: "🇯🇵",
    venue: "MetLife Stadium",
    city: "New York/New Jersey",
    calendarDate: "2026-06-26",
    basePrice: 720,
    time: "20:00 EST",
    group: "Group C",
    inStock: true,
    rating: 5.0,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9782-247x247.jpg",
    isFeatured: true,
  },
  {
    id: "spain-senegal",
    title: "Spain vs Senegal - Group D Match",
    teamA: "Spain",
    teamB: "Senegal",
    flagA: "🇪🇸",
    flagB: "🇸🇳",
    venue: "Gillette Stadium",
    city: "Boston",
    calendarDate: "2026-06-26",
    basePrice: 680,
    time: "19:00 EST",
    group: "Group D",
    inStock: true,
    rating: 4.8,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9784-247x247.jpg",
  },

  // ─── June 28 ────────────────────────────────────────────────────────────────
  {
    id: "germany-spain-round16",
    title: "Germany vs Spain - Round of 16",
    teamA: "Germany",
    teamB: "Spain",
    flagA: "🇩🇪",
    flagB: "🇪🇸",
    venue: "AT&T Stadium",
    city: "Dallas",
    calendarDate: "2026-06-28",
    basePrice: 950,
    time: "20:00 CST",
    group: "Round of 16",
    inStock: true,
    rating: 5.0,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9806-247x247.jpg",
    isFeatured: true,
  },

  // ─── June 30 ────────────────────────────────────────────────────────────────
  {
    id: "brazil-france-round16",
    title: "Brazil vs France - Round of 16",
    teamA: "Brazil",
    teamB: "France",
    flagA: "🇧🇷",
    flagB: "🇫🇷",
    venue: "MetLife Stadium",
    city: "New York/New Jersey",
    calendarDate: "2026-06-30",
    basePrice: 1050,
    time: "21:00 EST",
    group: "Round of 16",
    inStock: true,
    rating: 5.0,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9782-247x247.jpg",
    isFeatured: true,
  },

  // ─── July 4 ────────────────────────────────────────────────────────────────
  {
    id: "usa-argentina-quarterfinal",
    title: "USA vs Argentina - Quarter-Final",
    teamA: "USA",
    teamB: "Argentina",
    flagA: "🇺🇸",
    flagB: "🇦🇷",
    venue: "SoFi Stadium",
    city: "Los Angeles",
    calendarDate: "2026-07-04",
    basePrice: 1200,
    time: "20:00 PST",
    group: "Quarter-Final",
    inStock: true,
    rating: 5.0,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9806-247x247.jpg",
    isFeatured: true,
  },

  // ─── July 14 ────────────────────────────────────────────────────────────────
  {
    id: "final-metlife",
    title: "FIFA World Cup Final 2026",
    teamA: "TBD",
    teamB: "TBD",
    flagA: "🏆",
    flagB: "⚽",
    venue: "MetLife Stadium",
    city: "New York/New Jersey",
    calendarDate: "2026-07-14",
    basePrice: 2500,
    time: "18:00 EST",
    group: "FINAL",
    inStock: true,
    rating: 5.0,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9806-247x247.jpg",
    isFeatured: true,
  },
];

// ─── Date Helpers ──────────────────────────────────────────────────────────────

/**
 * Returns today's date as "YYYY-MM-DD" in local time
 */
export function getTodayStr(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Returns date string offset by N days from today
 */
export function getDateStrOffset(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Formats a calendarDate "YYYY-MM-DD" into a human-readable string.
 * Also computes relative label (Today / Tomorrow / etc.)
 */
export function formatMatchDate(calendarDate: string): { relative: string; full: string; dateObj: Date } {
  const [year, month, day] = calendarDate.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const full = dateObj.toLocaleDateString('en-US', options);

  const today = getTodayStr();
  const tomorrow = getDateStrOffset(1);

  let relative = '';
  if (calendarDate === today) relative = 'Today';
  else if (calendarDate === tomorrow) relative = 'Tomorrow';
  else {
    // count days diff
    const todayMidnight = new Date(today);
    const matchMidnight = new Date(calendarDate);
    const diffMs = matchMidnight.getTime() - todayMidnight.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays > 0) relative = `In ${diffDays} Days`;
    else relative = 'Past';
  }

  return { relative, full, dateObj };
}

// Backward-compat helper that takes a dateOffset number (legacy)
export function getFormattedDate(offset: number): { relative: string; full: string; dateObj: Date } {
  return formatMatchDate(getDateStrOffset(offset));
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

export const CATEGORY_MULTIPLIERS = {
  1: 2.0,
  2: 1.5,
  3: 1.0,
};

export const CATEGORY_NAMES = {
  1: 'Category 1 (Premium)',
  2: 'Category 2 (Mid-Tier)',
  3: 'Category 3 (Budget)',
};

export function getTicketPrice(basePrice: number, category: 1 | 2 | 3): number {
  return Math.round(basePrice * CATEGORY_MULTIPLIERS[category]);
}

// ─── Grouped by date ──────────────────────────────────────────────────────────

/**
 * Returns matches grouped by calendarDate, sorted chronologically.
 */
export function getMatchesByDate(): { date: string; matches: Match[] }[] {
  const map = new Map<string, Match[]>();
  for (const m of MATCH_SCHEDULE) {
    const arr = map.get(m.calendarDate) ?? [];
    arr.push(m);
    map.set(m.calendarDate, arr);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, matches]) => ({ date, matches }));
}

/**
 * Returns matches for a specific calendar date string "YYYY-MM-DD"
 */
export function getMatchesForDate(dateStr: string): Match[] {
  return MATCH_SCHEDULE.filter((m) => m.calendarDate === dateStr);
}

/**
 * Returns today's featured (most-watched headliner) match, or first available.
 */
export function getTodaysFeaturedMatch(): Match | null {
  const today = getTodayStr();
  const todayMatches = getMatchesForDate(today);
  if (todayMatches.length === 0) {
    // Fall back to the next upcoming match
    const upcoming = MATCH_SCHEDULE.filter((m) => m.calendarDate >= today).sort((a, b) =>
      a.calendarDate.localeCompare(b.calendarDate)
    );
    return upcoming[0] ?? null;
  }
  return todayMatches.find((m) => m.isFeatured) ?? todayMatches[0];
}
