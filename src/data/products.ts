export interface Match {
  id: string;
  title: string;
  teamA: string;
  teamB: string;
  flagA: string;
  flagB: string;
  venue: string;
  city: string;
  dateOffset: number; // Days from today
  basePrice: number;   // Base price for Category 3
  time: string;
  group: string;
  inStock: boolean;
  rating: number;
  image: string;
}

export const MATCH_SCHEDULE: Match[] = [
  {
    id: "usa-england",
    title: "USA vs England - Group B Match",
    teamA: "USA",
    teamB: "England",
    flagA: "🇺🇸",
    flagB: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    venue: "Lincoln Financial Field",
    city: "Philadelphia",
    dateOffset: 0, // Today
    basePrice: 690,
    time: "20:00 EST",
    group: "Group B",
    inStock: true,
    rating: 4.9,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9806-247x247.jpg"
  },
  {
    id: "australia-turkiye",
    title: "Australia vs Turkiye - Group A Match",
    teamA: "Australia",
    teamB: "Türkiye",
    flagA: "🇦🇺",
    flagB: "🇹🇷",
    venue: "MetLife Stadium",
    city: "New York/New Jersey",
    dateOffset: 1, // Tomorrow
    basePrice: 639,
    time: "17:00 EST",
    group: "Group A",
    inStock: true,
    rating: 4.7,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9784-247x247.jpg"
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
    dateOffset: 2, // In 2 days
    basePrice: 677,
    time: "19:30 PST",
    group: "Group C",
    inStock: true,
    rating: 5.0,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9782-247x247.jpg"
  },
  {
    id: "canada-bosnia",
    title: "Canada vs Bosnia and Herzegovina - Group D Match",
    teamA: "Canada",
    teamB: "Bosnia and Herzegovina",
    flagA: "🇨🇦",
    flagB: "🇧🇦",
    venue: "BC Place",
    city: "Vancouver",
    dateOffset: 3, // In 3 days
    basePrice: 669,
    time: "18:00 PST",
    group: "Group D",
    inStock: true,
    rating: 4.5,
    image: "https://affordablefifatickets.com/wp-content/uploads/2025/09/IMG_9778-247x247.jpg"
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
    dateOffset: 4, // In 4 days
    basePrice: 650,
    time: "21:00 EST",
    group: "Group E",
    inStock: true,
    rating: 4.8,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9806-247x247.jpg"
  },
  {
    id: "haiti-scotland",
    title: "Haiti vs Scotland - Group F Match",
    teamA: "Haiti",
    teamB: "Scotland",
    flagA: "🇭🇹",
    flagB: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    venue: "Hard Rock Stadium",
    city: "Miami",
    dateOffset: 5, // In 5 days
    basePrice: 645,
    time: "19:00 EST",
    group: "Group F",
    inStock: true,
    rating: 4.6,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9783-247x247.jpg"
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
    dateOffset: 6, // In 6 days
    basePrice: 690,
    time: "20:30 CST",
    group: "Group A",
    inStock: true,
    rating: 4.9,
    image: "https://affordablefifatickets.com/wp-content/uploads/2025/09/IMG_9779-247x247.jpg"
  },
  {
    id: "qatar-switzerland",
    title: "Qatar vs Switzerland - Group G Match",
    teamA: "Qatar",
    teamB: "Switzerland",
    flagA: "🇶🇦",
    flagB: "🇨🇭",
    venue: "AT&T Stadium",
    city: "Dallas",
    dateOffset: 7, // In 7 days
    basePrice: 699,
    time: "18:30 CST",
    group: "Group G",
    inStock: false,
    rating: 4.4,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9781-247x247.jpg"
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
    dateOffset: 8, // In 8 days
    basePrice: 670,
    time: "16:00 CST",
    group: "Group H",
    inStock: true,
    rating: 4.7,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9776-247x247.jpg"
  },
  {
    id: "argentina-japan",
    title: "Argentina vs Japan - Group C Match",
    teamA: "Argentina",
    teamB: "Japan",
    flagA: "🇦🇷",
    flagB: "🇯🇵",
    venue: "MetLife Stadium",
    city: "New York/New Jersey",
    dateOffset: 9, // In 9 days
    basePrice: 720,
    time: "20:00 EST",
    group: "Group C",
    inStock: true,
    rating: 5.0,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9782-247x247.jpg"
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
    dateOffset: 10, // In 10 days
    basePrice: 680,
    time: "19:00 EST",
    group: "Group D",
    inStock: true,
    rating: 4.8,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9784-247x247.jpg"
  },
  {
    id: "italy-cameroon",
    title: "Italy vs Cameroon - Group H Match",
    teamA: "Italy",
    teamB: "Cameroon",
    flagA: "🇮🇹",
    flagB: "🇨🇲",
    venue: "Lumen Field",
    city: "Seattle",
    dateOffset: 11, // In 11 days
    basePrice: 660,
    time: "17:30 PST",
    group: "Group H",
    inStock: true,
    rating: 4.6,
    image: "https://affordablefifatickets.com/wp-content/uploads/2026/06/IMG_9783-247x247.jpg"
  }
];

// Helper to get formatted date from offset
export function getFormattedDate(offset: number): { relative: string; full: string; dateObj: Date } {
  const date = new Date();
  date.setDate(date.getDate() + offset);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const full = date.toLocaleDateString('en-US', options);
  
  let relative = "";
  if (offset === 0) relative = "Today";
  else if (offset === 1) relative = "Tomorrow";
  else relative = `In ${offset} Days`;

  return { relative, full, dateObj: date };
}

// Category Multipliers
export const CATEGORY_MULTIPLIERS = {
  1: 2.0, // Premium (Sides)
  2: 1.5, // Mid-tier (Corners)
  3: 1.0  // Budget (Behind Goals)
};

export const CATEGORY_NAMES = {
  1: "Category 1 (Premium)",
  2: "Category 2 (Mid-Tier)",
  3: "Category 3 (Budget)"
};

export function getTicketPrice(basePrice: number, category: 1 | 2 | 3): number {
  return Math.round(basePrice * CATEGORY_MULTIPLIERS[category]);
}
