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
  time: string; // Venue local time (e.g. "12:00 EDT")
  utcTime: string; // UTC ISO string "2026-06-21T16:00:00Z"
  group: string;
  inStock: boolean;
  rating: number;
  image: string; // Generic stadium background
  isFeatured?: boolean; // Most-watched / headliner match of the day
}

// ─── Generic Stadium Images ──────────────────────────────────────────────────
const STADIUM_IMAGES = [
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop", // Lights and crowd
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop", // Green pitch empty
  "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=800&auto=format&fit=crop", // Stadium night close-up
  "https://images.unsplash.com/photo-1431324155629-1a6edd1d1414?q=80&w=800&auto=format&fit=crop", // Corner flag field
  "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=800&auto=format&fit=crop", // Stadium floodlights
  "https://images.unsplash.com/photo-1556056504-517cd025e3e4?q=80&w=800&auto=format&fit=crop", // Packed stadium crowd
  "https://images.unsplash.com/photo-1504156806530-22d26505a2de?q=80&w=800&auto=format&fit=crop", // Grass turf closeup
];

export const MATCH_SCHEDULE: Match[] = [
  // ─── June 11 (Opening Match) ───────────────────────────────────────────────
  {
    id: "mexico-south-africa-opening",
    title: "Mexico vs South Africa - Opening Match",
    teamA: "Mexico",
    teamB: "South Africa",
    flagA: "mx",
    flagB: "za",
    venue: "Estadio Azteca",
    city: "Mexico City",
    calendarDate: "2026-06-11",
    basePrice: 850,
    time: "20:30 CST",
    utcTime: "2026-06-12T02:30:00Z",
    group: "Group A",
    inStock: false,
    rating: 5.0,
    image: STADIUM_IMAGES[0],
    isFeatured: true,
  },

  // ─── June 12 ────────────────────────────────────────────────────────────────
  {
    id: "canada-bosnia",
    title: "Canada vs Bosnia and Herzegovina",
    teamA: "Canada",
    teamB: "Bosnia & Herz.",
    flagA: "ca",
    flagB: "ba",
    venue: "Toronto Stadium",
    city: "Toronto",
    calendarDate: "2026-06-12",
    basePrice: 750,
    time: "18:00 EDT",
    utcTime: "2026-06-12T22:00:00Z",
    group: "Group B",
    inStock: false,
    rating: 4.9,
    image: STADIUM_IMAGES[1],
  },
  {
    id: "usa-paraguay",
    title: "United States vs Paraguay",
    teamA: "USA",
    teamB: "Paraguay",
    flagA: "us",
    flagB: "py",
    venue: "Los Angeles Stadium",
    city: "Los Angeles",
    calendarDate: "2026-06-12",
    basePrice: 790,
    time: "19:00 PDT",
    utcTime: "2026-06-13T02:00:00Z",
    group: "Group D",
    inStock: false,
    rating: 5.0,
    image: STADIUM_IMAGES[2],
    isFeatured: true,
  },

  // ─── June 13 ────────────────────────────────────────────────────────────────
  {
    id: "qatar-switzerland",
    title: "Qatar vs Switzerland",
    teamA: "Qatar",
    teamB: "Switzerland",
    flagA: "qa",
    flagB: "ch",
    venue: "San Francisco Bay Area Stadium",
    city: "San Francisco",
    calendarDate: "2026-06-13",
    basePrice: 650,
    time: "18:00 PDT",
    utcTime: "2026-06-14T01:00:00Z",
    group: "Group B",
    inStock: false,
    rating: 4.6,
    image: STADIUM_IMAGES[3],
  },
  {
    id: "brazil-morocco-gstage",
    title: "Brazil vs Morocco",
    teamA: "Brazil",
    teamB: "Morocco",
    flagA: "br",
    flagB: "ma",
    venue: "New York New Jersey Stadium",
    city: "New York/New Jersey",
    calendarDate: "2026-06-13",
    basePrice: 850,
    time: "17:00 EDT",
    utcTime: "2026-06-13T21:00:00Z",
    group: "Group C",
    inStock: false,
    rating: 5.0,
    image: STADIUM_IMAGES[4],
    isFeatured: true,
  },
  {
    id: "haiti-scotland-gstage",
    title: "Haiti vs Scotland",
    teamA: "Haiti",
    teamB: "Scotland",
    flagA: "ht",
    flagB: "gb-sct",
    venue: "Boston Stadium",
    city: "Boston",
    calendarDate: "2026-06-13",
    basePrice: 630,
    time: "19:00 EDT",
    utcTime: "2026-06-13T23:00:00Z",
    group: "Group C",
    inStock: false,
    rating: 4.5,
    image: STADIUM_IMAGES[5],
  },
  {
    id: "australia-turkiye-gstage",
    title: "Australia vs Türkiye",
    teamA: "Australia",
    teamB: "Türkiye",
    flagA: "au",
    flagB: "tr",
    venue: "BC Place",
    city: "Vancouver",
    calendarDate: "2026-06-13",
    basePrice: 680,
    time: "20:00 PDT",
    utcTime: "2026-06-14T03:00:00Z",
    group: "Group D",
    inStock: false,
    rating: 4.7,
    image: STADIUM_IMAGES[6],
  },

  // ─── June 14 ────────────────────────────────────────────────────────────────
  {
    id: "germany-curacao",
    title: "Germany vs Curaçao",
    teamA: "Germany",
    teamB: "Curaçao",
    flagA: "de",
    flagB: "cw",
    venue: "Houston Stadium",
    city: "Houston",
    calendarDate: "2026-06-14",
    basePrice: 720,
    time: "17:00 CDT",
    utcTime: "2026-06-14T22:00:00Z",
    group: "Group E",
    inStock: false,
    rating: 4.8,
    image: STADIUM_IMAGES[0],
    isFeatured: true,
  },
  {
    id: "netherlands-japan-gstage",
    title: "Netherlands vs Japan",
    teamA: "Netherlands",
    teamB: "Japan",
    flagA: "nl",
    flagB: "jp",
    venue: "Dallas Stadium",
    city: "Dallas",
    calendarDate: "2026-06-14",
    basePrice: 750,
    time: "18:00 CDT",
    utcTime: "2026-06-14T23:00:00Z",
    group: "Group F",
    inStock: false,
    rating: 4.9,
    image: STADIUM_IMAGES[1],
  },
  {
    id: "cotedivoire-ecuador",
    title: "Côte d'Ivoire vs Ecuador",
    teamA: "Côte d'Ivoire",
    teamB: "Ecuador",
    flagA: "ci",
    flagB: "ec",
    venue: "Philadelphia Stadium",
    city: "Philadelphia",
    calendarDate: "2026-06-14",
    basePrice: 650,
    time: "19:00 EDT",
    utcTime: "2026-06-14T23:00:00Z",
    group: "Group E",
    inStock: false,
    rating: 4.6,
    image: STADIUM_IMAGES[2],
  },
  {
    id: "sweden-tunisia",
    title: "Sweden vs Tunisia",
    teamA: "Sweden",
    teamB: "Tunisia",
    flagA: "se",
    flagB: "tn",
    venue: "Estadio Monterrey",
    city: "Monterrey",
    calendarDate: "2026-06-14",
    basePrice: 640,
    time: "20:00 CST",
    utcTime: "2026-06-15T02:00:00Z",
    group: "Group F",
    inStock: false,
    rating: 4.5,
    image: STADIUM_IMAGES[3],
  },

  // ─── June 15 ────────────────────────────────────────────────────────────────
  {
    id: "spain-caboverde",
    title: "Spain vs Cabo Verde",
    teamA: "Spain",
    teamB: "Cabo Verde",
    flagA: "es",
    flagB: "cv",
    venue: "Atlanta Stadium",
    city: "Atlanta",
    calendarDate: "2026-06-15",
    basePrice: 780,
    time: "12:00 EDT",
    utcTime: "2026-06-15T16:00:00Z",
    group: "Group H",
    inStock: false,
    rating: 4.9,
    image: STADIUM_IMAGES[4],
    isFeatured: true,
  },
  {
    id: "belgium-egypt-gstage",
    title: "Belgium vs Egypt",
    teamA: "Belgium",
    teamB: "Egypt",
    flagA: "be",
    flagB: "eg",
    venue: "Seattle Stadium",
    city: "Seattle",
    calendarDate: "2026-06-15",
    basePrice: 740,
    time: "15:00 PDT",
    utcTime: "2026-06-15T22:00:00Z",
    group: "Group G",
    inStock: false,
    rating: 4.8,
    image: STADIUM_IMAGES[5],
  },
  {
    id: "saudiarabia-uruguay",
    title: "Saudi Arabia vs Uruguay",
    teamA: "Saudi Arabia",
    teamB: "Uruguay",
    flagA: "sa",
    flagB: "uy",
    venue: "Miami Stadium",
    city: "Miami",
    calendarDate: "2026-06-15",
    basePrice: 710,
    time: "18:00 EDT",
    utcTime: "2026-06-15T22:00:00Z",
    group: "Group H",
    inStock: false,
    rating: 4.7,
    image: STADIUM_IMAGES[6],
  },
  {
    id: "iran-newzealand",
    title: "Iran vs New Zealand",
    teamA: "Iran",
    teamB: "New Zealand",
    flagA: "ir",
    flagB: "nz",
    venue: "Los Angeles Stadium",
    city: "Los Angeles",
    calendarDate: "2026-06-15",
    basePrice: 650,
    time: "19:30 PDT",
    utcTime: "2026-06-16T02:30:00Z",
    group: "Group G",
    inStock: false,
    rating: 4.5,
    image: STADIUM_IMAGES[0],
  },

  // ─── June 16 ────────────────────────────────────────────────────────────────
  {
    id: "france-senegal-gstage",
    title: "France vs Senegal",
    teamA: "France",
    teamB: "Senegal",
    flagA: "fr",
    flagB: "sn",
    venue: "New York New Jersey Stadium",
    city: "New York/New Jersey",
    calendarDate: "2026-06-16",
    basePrice: 810,
    time: "15:00 EDT",
    utcTime: "2026-06-16T19:00:00Z",
    group: "Group I",
    inStock: false,
    rating: 5.0,
    image: STADIUM_IMAGES[1],
    isFeatured: true,
  },
  {
    id: "iraq-norway-gstage",
    title: "Iraq vs Norway",
    teamA: "Iraq",
    teamB: "Norway",
    flagA: "iq",
    flagB: "no",
    venue: "Boston Stadium",
    city: "Boston",
    calendarDate: "2026-06-16",
    basePrice: 690,
    time: "15:00 EDT",
    utcTime: "2026-06-16T19:00:00Z",
    group: "Group I",
    inStock: false,
    rating: 4.6,
    image: STADIUM_IMAGES[2],
  },
  {
    id: "argentina-algeria",
    title: "Argentina vs Algeria",
    teamA: "Argentina",
    teamB: "Algeria",
    flagA: "ar",
    flagB: "dz",
    venue: "Arrowhead Stadium",
    city: "Kansas City",
    calendarDate: "2026-06-16",
    basePrice: 820,
    time: "20:00 CDT",
    utcTime: "2026-06-17T01:00:00Z",
    group: "Group J",
    inStock: false,
    rating: 5.0,
    image: STADIUM_IMAGES[3],
  },
  {
    id: "austria-jordan",
    title: "Austria vs Jordan",
    teamA: "Austria",
    teamB: "Jordan",
    flagA: "at",
    flagB: "jo",
    venue: "Levi's Stadium",
    city: "Santa Clara",
    calendarDate: "2026-06-16",
    basePrice: 650,
    time: "18:00 PDT",
    utcTime: "2026-06-17T01:00:00Z",
    group: "Group J",
    inStock: false,
    rating: 4.5,
    image: STADIUM_IMAGES[4],
  },

  // ─── June 17 ────────────────────────────────────────────────────────────────
  {
    id: "portugal-drcongo",
    title: "Portugal vs DR Congo",
    teamA: "Portugal",
    teamB: "DR Congo",
    flagA: "pt",
    flagB: "cd",
    venue: "Houston Stadium",
    city: "Houston",
    calendarDate: "2026-06-17",
    basePrice: 790,
    time: "17:00 CDT",
    utcTime: "2026-06-17T22:00:00Z",
    group: "Group K",
    inStock: false,
    rating: 4.9,
    image: STADIUM_IMAGES[5],
    isFeatured: true,
  },
  {
    id: "england-croatia",
    title: "England vs Croatia",
    teamA: "England",
    teamB: "Croatia",
    flagA: "gb-eng",
    flagB: "hr",
    venue: "Boston Stadium",
    city: "Boston",
    calendarDate: "2026-06-17",
    basePrice: 770,
    time: "19:00 EDT",
    utcTime: "2026-06-17T23:00:00Z",
    group: "Group L",
    inStock: false,
    rating: 4.9,
    image: STADIUM_IMAGES[6],
  },
  {
    id: "ghana-panama",
    title: "Ghana vs Panama",
    teamA: "Ghana",
    teamB: "Panama",
    flagA: "gh",
    flagB: "pa",
    venue: "Toronto Stadium",
    city: "Toronto",
    calendarDate: "2026-06-17",
    basePrice: 640,
    time: "15:00 EDT",
    utcTime: "2026-06-17T19:00:00Z",
    group: "Group L",
    inStock: false,
    rating: 4.6,
    image: STADIUM_IMAGES[0],
  },
  {
    id: "colombia-uzbekistan",
    title: "Colombia vs Uzbekistan",
    teamA: "Colombia",
    teamB: "Uzbekistan",
    flagA: "co",
    flagB: "uz",
    venue: "Guadalajara Stadium",
    city: "Guadalajara",
    calendarDate: "2026-06-17",
    basePrice: 710,
    time: "18:00 CST",
    utcTime: "2026-06-18T00:00:00Z",
    group: "Group K",
    inStock: false,
    rating: 4.7,
    image: STADIUM_IMAGES[1],
  },

  // ─── June 18 ────────────────────────────────────────────────────────────────
  {
    id: "czechia-southafrica",
    title: "Czechia vs South Africa",
    teamA: "Czechia",
    teamB: "South Africa",
    flagA: "cz",
    flagB: "za",
    venue: "BC Place",
    city: "Vancouver",
    calendarDate: "2026-06-18",
    basePrice: 670,
    time: "18:00 PST",
    utcTime: "2026-06-19T01:00:00Z",
    group: "Group A",
    inStock: false,
    rating: 4.6,
    image: STADIUM_IMAGES[2],
    isFeatured: true,
  },

  // ─── June 19 ────────────────────────────────────────────────────────────────
  {
    id: "usa-australia",
    title: "USA vs Australia",
    teamA: "USA",
    teamB: "Australia",
    flagA: "us",
    flagB: "au",
    venue: "Seattle Stadium",
    city: "Seattle",
    calendarDate: "2026-06-19",
    basePrice: 750,
    time: "17:30 PDT",
    utcTime: "2026-06-20T00:30:00Z",
    group: "Group D",
    inStock: false,
    rating: 4.9,
    image: STADIUM_IMAGES[3],
    isFeatured: true,
  },
  {
    id: "scotland-morocco",
    title: "Scotland vs Morocco",
    teamA: "Scotland",
    teamB: "Morocco",
    flagA: "gb-sct",
    flagB: "ma",
    venue: "Boston Stadium",
    city: "Boston",
    calendarDate: "2026-06-19",
    basePrice: 680,
    time: "19:00 EDT",
    utcTime: "2026-06-19T23:00:00Z",
    group: "Group C",
    inStock: false,
    rating: 4.7,
    image: STADIUM_IMAGES[4],
  },
  {
    id: "turkiye-paraguay",
    title: "Türkiye vs Paraguay",
    teamA: "Türkiye",
    teamB: "Paraguay",
    flagA: "tr",
    flagB: "py",
    venue: "San Francisco Bay Area Stadium",
    city: "San Francisco",
    calendarDate: "2026-06-19",
    basePrice: 670,
    time: "18:00 PST",
    utcTime: "2026-06-20T01:00:00Z",
    group: "Group D",
    inStock: false,
    rating: 4.6,
    image: STADIUM_IMAGES[5],
  },
  {
    id: "brazil-haiti-gstage",
    title: "Brazil vs Haiti",
    teamA: "Brazil",
    teamB: "Haiti",
    flagA: "br",
    flagB: "ht",
    venue: "New York New Jersey Stadium",
    city: "New York/New Jersey",
    calendarDate: "2026-06-19",
    basePrice: 830,
    time: "20:00 EDT",
    utcTime: "2026-06-20T00:00:00Z",
    group: "Group C",
    inStock: false,
    rating: 5.0,
    image: STADIUM_IMAGES[6],
  },

  // ─── June 20 ────────────────────────────────────────────────────────────────
  {
    id: "netherlands-sweden",
    title: "Netherlands vs Sweden",
    teamA: "Netherlands",
    teamB: "Sweden",
    flagA: "nl",
    flagB: "se",
    venue: "Dallas Stadium",
    city: "Dallas",
    calendarDate: "2026-06-20",
    basePrice: 750,
    time: "18:00 CDT",
    utcTime: "2026-06-20T23:00:00Z",
    group: "Group F",
    inStock: false,
    rating: 4.8,
    image: STADIUM_IMAGES[0],
    isFeatured: true,
  },
  {
    id: "germany-cotedivoire",
    title: "Germany vs Côte d'Ivoire",
    teamA: "Germany",
    teamB: "Côte d'Ivoire",
    flagA: "de",
    flagB: "ci",
    venue: "Houston Stadium",
    city: "Houston",
    calendarDate: "2026-06-20",
    basePrice: 740,
    time: "17:00 CDT",
    utcTime: "2026-06-20T22:00:00Z",
    group: "Group E",
    inStock: false,
    rating: 4.8,
    image: STADIUM_IMAGES[1],
  },
  {
    id: "ecuador-curacao",
    title: "Ecuador vs Curaçao",
    teamA: "Ecuador",
    teamB: "Curaçao",
    flagA: "ec",
    flagB: "cw",
    venue: "Philadelphia Stadium",
    city: "Philadelphia",
    calendarDate: "2026-06-20",
    basePrice: 650,
    time: "19:00 EDT",
    utcTime: "2026-06-20T23:00:00Z",
    group: "Group E",
    inStock: false,
    rating: 4.6,
    image: STADIUM_IMAGES[2],
  },

  // ─── June 21 (TODAY) ─────────────────────────────────────────────────────────
  {
    id: "spain-saudi-arabia-today",
    title: "Spain vs Saudi Arabia",
    teamA: "Spain",
    teamB: "Saudi Arabia",
    flagA: "es",
    flagB: "sa",
    venue: "Atlanta Stadium",
    city: "Atlanta",
    calendarDate: "2026-06-21",
    basePrice: 790,
    time: "12:00 EDT",
    utcTime: "2026-06-21T16:00:00Z",
    group: "Group H",
    inStock: true,
    rating: 4.9,
    image: STADIUM_IMAGES[0], // Spain vs Saudi - lights and crowd
    isFeatured: true,
  },
  {
    id: "belgium-iran-today",
    title: "Belgium vs Iran",
    teamA: "Belgium",
    teamB: "Iran",
    flagA: "be",
    flagB: "ir",
    venue: "Los Angeles Stadium",
    city: "Los Angeles",
    calendarDate: "2026-06-21",
    basePrice: 750,
    time: "15:00 PDT",
    utcTime: "2026-06-21T22:00:00Z",
    group: "Group G",
    inStock: true,
    rating: 4.8,
    image: STADIUM_IMAGES[1],
  },
  {
    id: "uruguay-cape-verde-today",
    title: "Uruguay vs Cape Verde",
    teamA: "Uruguay",
    teamB: "Cape Verde",
    flagA: "uy",
    flagB: "cv",
    venue: "Miami Stadium",
    city: "Miami",
    calendarDate: "2026-06-21",
    basePrice: 730,
    time: "18:00 EDT",
    utcTime: "2026-06-21T22:00:00Z",
    group: "Group H",
    inStock: true,
    rating: 4.7,
    image: STADIUM_IMAGES[2],
  },
  {
    id: "new-zealand-egypt-today",
    title: "New Zealand vs Egypt",
    teamA: "New Zealand",
    teamB: "Egypt",
    flagA: "nz",
    flagB: "eg",
    venue: "BC Place",
    city: "Vancouver",
    calendarDate: "2026-06-21",
    basePrice: 690,
    time: "21:00 PDT",
    utcTime: "2026-06-22T04:00:00Z",
    group: "Group G",
    inStock: true,
    rating: 4.6,
    image: STADIUM_IMAGES[3],
  },

  // ─── June 22 (TOMORROW) ──────────────────────────────────────────────────────
  {
    id: "argentina-austria-tomorrow",
    title: "Argentina vs Austria",
    teamA: "Argentina",
    teamB: "Austria",
    flagA: "ar",
    flagB: "at",
    venue: "Dallas Stadium",
    city: "Dallas",
    calendarDate: "2026-06-22",
    basePrice: 830,
    time: "17:00 CDT",
    utcTime: "2026-06-22T22:00:00Z",
    group: "Group J",
    inStock: true,
    rating: 5.0,
    image: STADIUM_IMAGES[4], // Argentina vs Austria
    isFeatured: true,
  },
  {
    id: "france-iraq-tomorrow",
    title: "France vs Iraq",
    teamA: "France",
    teamB: "Iraq",
    flagA: "fr",
    flagB: "iq",
    venue: "Philadelphia Stadium",
    city: "Philadelphia",
    calendarDate: "2026-06-22",
    basePrice: 820,
    time: "20:00 EDT",
    utcTime: "2026-06-23T00:00:00Z",
    group: "Group I",
    inStock: true,
    rating: 4.9,
    image: STADIUM_IMAGES[5],
  },
  {
    id: "norway-senegal-tomorrow",
    title: "Norway vs Senegal",
    teamA: "Norway",
    teamB: "Senegal",
    flagA: "no",
    flagB: "sn",
    venue: "New York New Jersey Stadium",
    city: "New York/New Jersey",
    calendarDate: "2026-06-22",
    basePrice: 710,
    time: "14:00 EDT",
    utcTime: "2026-06-22T18:00:00Z",
    group: "Group I",
    inStock: true,
    rating: 4.7,
    image: STADIUM_IMAGES[6],
  },
  {
    id: "jordan-algeria-tomorrow",
    title: "Jordan vs Algeria",
    teamA: "Jordan",
    teamB: "Algeria",
    flagA: "jo",
    flagB: "dz",
    venue: "San Francisco Bay Area Stadium",
    city: "San Francisco",
    calendarDate: "2026-06-22",
    basePrice: 650,
    time: "18:00 PDT",
    utcTime: "2026-06-23T01:00:00Z",
    group: "Group J",
    inStock: true,
    rating: 4.5,
    image: STADIUM_IMAGES[0],
  },

  // ─── June 23 ────────────────────────────────────────────────────────────────
  {
    id: "portugal-uzbekistan",
    title: "Portugal vs Uzbekistan",
    teamA: "Portugal",
    teamB: "Uzbekistan",
    flagA: "pt",
    flagB: "uz",
    venue: "Houston Stadium",
    city: "Houston",
    calendarDate: "2026-06-23",
    basePrice: 780,
    time: "17:00 CDT",
    utcTime: "2026-06-23T22:00:00Z",
    group: "Group K",
    inStock: true,
    rating: 4.9,
    image: STADIUM_IMAGES[1],
    isFeatured: true,
  },
  {
    id: "england-ghana",
    title: "England vs Ghana",
    teamA: "England",
    teamB: "Ghana",
    flagA: "gb-eng",
    flagB: "gh",
    venue: "Boston Stadium",
    city: "Boston",
    calendarDate: "2026-06-23",
    basePrice: 790,
    time: "19:00 EDT",
    utcTime: "2026-06-23T23:00:00Z",
    group: "Group L",
    inStock: true,
    rating: 4.9,
    image: STADIUM_IMAGES[2],
  },
  {
    id: "panama-croatia",
    title: "Panama vs Croatia",
    teamA: "Panama",
    teamB: "Croatia",
    flagA: "pa",
    flagB: "hr",
    venue: "Toronto Stadium",
    city: "Toronto",
    calendarDate: "2026-06-23",
    basePrice: 690,
    time: "15:00 EDT",
    utcTime: "2026-06-23T19:00:00Z",
    group: "Group L",
    inStock: true,
    rating: 4.7,
    image: STADIUM_IMAGES[3],
  },
  {
    id: "colombia-drcongo",
    title: "Colombia vs DR Congo",
    teamA: "Colombia",
    teamB: "DR Congo",
    flagA: "co",
    flagB: "cd",
    venue: "Guadalajara Stadium",
    city: "Guadalajara",
    calendarDate: "2026-06-23",
    basePrice: 720,
    time: "18:00 CST",
    utcTime: "2026-06-24T00:00:00Z",
    group: "Group K",
    inStock: true,
    rating: 4.8,
    image: STADIUM_IMAGES[4],
  },

  // ─── June 24 ────────────────────────────────────────────────────────────────
  {
    id: "switzerland-canada",
    title: "Switzerland vs Canada",
    teamA: "Switzerland",
    teamB: "Canada",
    flagA: "ch",
    flagB: "ca",
    venue: "BC Place",
    city: "Vancouver",
    calendarDate: "2026-06-24",
    basePrice: 710,
    time: "18:00 PDT",
    utcTime: "2026-06-25T01:00:00Z",
    group: "Group B",
    inStock: true,
    rating: 4.8,
    image: STADIUM_IMAGES[5],
    isFeatured: true,
  },
  {
    id: "bosnia-qatar",
    title: "Bosnia and Herzegovina vs Qatar",
    teamA: "Bosnia & Herz.",
    teamB: "Qatar",
    flagA: "ba",
    flagB: "qa",
    venue: "Lumen Field",
    city: "Seattle",
    calendarDate: "2026-06-24",
    basePrice: 650,
    time: "15:00 PDT",
    utcTime: "2026-06-24T22:00:00Z",
    group: "Group B",
    inStock: true,
    rating: 4.5,
    image: STADIUM_IMAGES[6],
  },
  {
    id: "scotland-brazil-today",
    title: "Scotland vs Brazil",
    teamA: "Scotland",
    teamB: "Brazil",
    flagA: "gb-sct",
    flagB: "br",
    venue: "Hard Rock Stadium",
    city: "Miami",
    calendarDate: "2026-06-24",
    basePrice: 850,
    time: "19:00 EDT",
    utcTime: "2026-06-24T23:00:00Z",
    group: "Group C",
    inStock: true,
    rating: 5.0,
    image: STADIUM_IMAGES[0], // Scotland vs Brazil
  },
  {
    id: "morocco-haiti",
    title: "Morocco vs Haiti",
    teamA: "Morocco",
    teamB: "Haiti",
    flagA: "ma",
    flagB: "ht",
    venue: "Mercedes-Benz Stadium",
    city: "Atlanta",
    calendarDate: "2026-06-24",
    basePrice: 640,
    time: "21:00 EDT",
    utcTime: "2026-06-25T01:00:00Z",
    group: "Group C",
    inStock: true,
    rating: 4.6,
    image: STADIUM_IMAGES[1],
  },
  {
    id: "czechia-mexico",
    title: "Czechia vs Mexico",
    teamA: "Czechia",
    teamB: "Mexico",
    flagA: "cz",
    flagB: "mx",
    venue: "Estadio Azteca",
    city: "Mexico City",
    calendarDate: "2026-06-24",
    basePrice: 760,
    time: "18:00 CST",
    utcTime: "2026-06-25T00:00:00Z",
    group: "Group A",
    inStock: true,
    rating: 4.8,
    image: STADIUM_IMAGES[2],
  },
  {
    id: "southafrica-southkorea",
    title: "South Africa vs South Korea",
    teamA: "South Africa",
    teamB: "South Korea",
    flagA: "za",
    flagB: "kr",
    venue: "Los Angeles Stadium",
    city: "Los Angeles",
    calendarDate: "2026-06-24",
    basePrice: 690,
    time: "15:00 PDT",
    utcTime: "2026-06-24T22:00:00Z",
    group: "Group A",
    inStock: true,
    rating: 4.7,
    image: STADIUM_IMAGES[3],
  },

  // ─── June 25 ────────────────────────────────────────────────────────────────
  {
    id: "curacao-cotedivoire-gstage",
    title: "Curaçao vs Côte d'Ivoire",
    teamA: "Curaçao",
    teamB: "Côte d'Ivoire",
    flagA: "cw",
    flagB: "ci",
    venue: "Philadelphia Stadium",
    city: "Philadelphia",
    calendarDate: "2026-06-25",
    basePrice: 650,
    time: "16:00 EDT",
    utcTime: "2026-06-25T20:00:00Z",
    group: "Group E",
    inStock: true,
    rating: 4.5,
    image: STADIUM_IMAGES[4],
  },
  {
    id: "ecuador-germany-gstage",
    title: "Ecuador vs Germany",
    teamA: "Ecuador",
    teamB: "Germany",
    flagA: "ec",
    flagB: "de",
    venue: "New York New Jersey Stadium",
    city: "New York/New Jersey",
    calendarDate: "2026-06-25",
    basePrice: 770,
    time: "16:00 EDT",
    utcTime: "2026-06-25T20:00:00Z",
    group: "Group E",
    inStock: true,
    rating: 4.8,
    image: STADIUM_IMAGES[5],
    isFeatured: true,
  },
  {
    id: "paraguay-australia-gstage",
    title: "Paraguay vs Australia",
    teamA: "Paraguay",
    teamB: "Australia",
    flagA: "py",
    flagB: "au",
    venue: "Levi's Stadium",
    city: "Santa Clara",
    calendarDate: "2026-06-25",
    basePrice: 690,
    time: "19:00 PDT",
    utcTime: "2026-06-26T02:00:00Z",
    group: "Group D",
    inStock: true,
    rating: 4.6,
    image: STADIUM_IMAGES[6],
  },

  // ─── June 26 ────────────────────────────────────────────────────────────────
  {
    id: "norway-france-gstage",
    title: "Norway vs France",
    teamA: "Norway",
    teamB: "France",
    flagA: "no",
    flagB: "fr",
    venue: "Gillette Stadium",
    city: "Boston",
    calendarDate: "2026-06-26",
    basePrice: 820,
    time: "15:00 EDT",
    utcTime: "2026-06-26T19:00:00Z",
    group: "Group I",
    inStock: true,
    rating: 4.9,
    image: STADIUM_IMAGES[0],
    isFeatured: true,
  },
  {
    id: "senegal-iraq-gstage",
    title: "Senegal vs Iraq",
    teamA: "Senegal",
    teamB: "Iraq",
    flagA: "sn",
    flagB: "iq",
    venue: "BMO Field",
    city: "Toronto",
    calendarDate: "2026-06-26",
    basePrice: 680,
    time: "15:00 EDT",
    utcTime: "2026-06-26T19:00:00Z",
    group: "Group I",
    inStock: true,
    rating: 4.6,
    image: STADIUM_IMAGES[1],
  },
  {
    id: "egypt-iran-gstage",
    title: "Egypt vs Iran",
    teamA: "Egypt",
    teamB: "Iran",
    flagA: "eg",
    flagB: "ir",
    venue: "Lumen Field",
    city: "Seattle",
    calendarDate: "2026-06-26",
    basePrice: 700,
    time: "20:00 PDT",
    utcTime: "2026-06-27T03:00:00Z",
    group: "Group G",
    inStock: true,
    rating: 4.7,
    image: STADIUM_IMAGES[2],
  },

  // ─── Knockout Stages (June 28 onwards) ──────────────────────────────────────
  {
    id: "knockout-match-1",
    title: "Round of 32 - Match 1",
    teamA: "Germany",
    teamB: "Spain",
    flagA: "de",
    flagB: "es",
    venue: "AT&T Stadium",
    city: "Dallas",
    calendarDate: "2026-06-28",
    basePrice: 950,
    time: "20:00 CDT",
    utcTime: "2026-06-29T01:00:00Z",
    group: "Round of 32",
    inStock: true,
    rating: 5.0,
    image: STADIUM_IMAGES[3], // Germany vs Spain
    isFeatured: true,
  },
  {
    id: "knockout-match-2",
    title: "Round of 32 - Match 2",
    teamA: "Brazil",
    teamB: "France",
    flagA: "br",
    flagB: "fr",
    venue: "MetLife Stadium",
    city: "New York/New Jersey",
    calendarDate: "2026-06-30",
    basePrice: 1050,
    time: "21:00 EDT",
    utcTime: "2026-07-01T01:00:00Z",
    group: "Round of 32",
    inStock: true,
    rating: 5.0,
    image: STADIUM_IMAGES[4],
    isFeatured: true,
  },
  {
    id: "quarterfinal-1",
    title: "Quarter-Final - Match 1",
    teamA: "USA",
    teamB: "Argentina",
    flagA: "us",
    flagB: "ar",
    venue: "SoFi Stadium",
    city: "Los Angeles",
    calendarDate: "2026-07-04",
    basePrice: 1200,
    time: "20:00 PDT",
    utcTime: "2026-07-05T03:00:00Z",
    group: "Quarter-Final",
    inStock: true,
    rating: 5.0,
    image: STADIUM_IMAGES[5],
    isFeatured: true,
  },
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
    time: "18:00 EDT",
    utcTime: "2026-07-14T22:00:00Z",
    group: "FINAL",
    inStock: true,
    rating: 5.0,
    image: STADIUM_IMAGES[6],
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

/**
 * Formats a match UTC time into local venue time and the browser's local time (WAT, etc.).
 */
export function formatMatchTime(utcTimeString: string, venueTimeStr: string): string {
  try {
    const date = new Date(utcTimeString);
    const browserTime = date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    
    // Get browser's timezone name (WAT, EST, etc.)
    const tzString = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
      .format(date)
      .split(', ')[1] || '';
      
    return `${venueTimeStr} (Converted: ${browserTime} ${tzString})`;
  } catch (e) {
    return venueTimeStr;
  }
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
