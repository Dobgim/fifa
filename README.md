# FIFA World Cup 2026™ Tickets Secondary E-Commerce Platform

A production-ready, highly responsive, and modern React 18 + Vite + TypeScript web application cloned from the design principles of ticket listings on the web. It is stylized with a premium dark theme tailored for football fans.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16+ recommended, tested on v24) installed.

### Installation & Local Run
1. Clone or extract this project folder.
2. Open terminal in the directory and run:
   ```bash
   npm install
   ```
3. Start the local Vite development server:
   ```bash
   npm run dev
   ```
4. Open the displayed URL (normally `http://localhost:5173`) in your browser.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [React 18 / 19](https://react.dev/) + [Vite](https://vite.dev/) + [TypeScript](https://www.typescript.org/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/) (supports smooth client-side SPA pagination & navigation)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + PostCSS (compiled via `@tailwindcss/postcss` for maximum utility compilation speed and clean style hooks)
- **Icons**: [Lucide React](https://lucide.dev/) (standard UI actions and indicators)
- **Animations**: [GSAP](https://gsap.com/) (registered ScrollTrigger plugins for section entries, plus micro-animations like cart badges and hover lifts)

---

## 📁 Project Structure

```text
/src/
  ├── assets/                 # Brand Assets (Logo, Favicon)
  ├── components/
  │   ├── Header.tsx          # Sticky Navbar with Search overlay, Mobile Drawer, and Cart counter
  │   ├── Footer.tsx          # Structured columns, Trust Badges, Payment Icons
  │   ├── ProductCard.tsx     # Match card displaying Flags, Dates, Venues, Category Prices, Add to Cart
  │   ├── FilterSidebar.tsx   # Sidebar filtering (Search Query, Host City, Date Offsets, Max Price)
  │   └── Pagination.tsx      # Page control buttons
  ├── context/
  │   └── CartContext.tsx     # Global cart state provider (persists to localStorage, handles fees)
  ├── data/
  │   └── products.ts         # Match Database with relative date offset shifting logic
  ├── lib/
  │   └── gsap-config.ts      # ScrollTrigger helper registrations
  ├── styles/
  │   └── index.css           # Custom styles, theme variables, glassmorphic panel classes
  ├── App.tsx                 # Routing table wrapping all 10 views
  └── main.tsx                # StrictMode root renderer
/public/                      # Public asset directory (contains favicon.png/ico)
/vercel.json                  # Vercel Single Page App routing overrides
/postcss.config.js            # Tailwind v4 PostCSS compilation
```

---

## 📅 Dynamic Match Rollover Feature

To satisfy the requirement of showing matches day-by-day and rolling over automatically when a day finishes:
1. Every match in `src/data/products.ts` defines a `dateOffset` integer representing days in the future relative to **today**.
2. At runtime, the helper function `getFormattedDate(dateOffset)` calculates the exact calendar day relative to the user's current local date:
   - `dateOffset: 0` is calculated as **"Today"**
   - `dateOffset: 1` is calculated as **"Tomorrow"**
   - `dateOffset: 2` is calculated as **"In 2 Days"** (e.g. Wednesday, June 24)
3. As the calendar day rolls over, "Tomorrow's" match automatically becomes "Today's" match, keeping the ticket list evergreen and dynamic without any database updates.

---

## 💳 Payment & Email Integration Extensions

### Form Handling & Mail Alerts
- Both contact and checkout submission flows are wired with full JavaScript regex validation (validates email structure, card formats, card CVV length, required fields).
- Currently, successful submissions trigger a beautiful success overlay modal and reset inputs.
- For production, easily wire [EmailJS](https://www.emailjs.com/) or Formspree inside `src/pages/Contact.tsx` and `src/pages/Checkout.tsx` by replacing the simulated `setTimeout` submission blockers with real API post requests.

### Real Tickets Integration
To fetch real matches and pricing from an external WooCommerce or WordPress GraphQL API:
- Replace the mock list `MATCH_SCHEDULE` in `src/data/products.ts` with a React `useEffect` fetch request to retrieve data from your API.
- Keep the pricing formulas (`getTicketPrice(basePrice, category)`) to scale ticket prices for Category 1, 2, and 3.

---

## ☁️ Vercel Deployment

Deploy the project to Vercel in seconds using the CLI or repository import:
1. Install vercel CLI globally: `npm install -g vercel`
2. Run command: `vercel`
3. The project includes [vercel.json](file:///C:/Users/Dobgima%2520Joshua/Desktop/FIFA/vercel.json) to handle Single Page Application rewrite configurations automatically, preventing 404 errors when reloading path pages like `/tickets` or `/checkout` directly in the browser.
