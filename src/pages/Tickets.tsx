import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { MATCH_SCHEDULE, getTicketPrice } from '../data/products';

const Tickets: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<1 | 2 | 3>(3); // Default to Category 3

  const maxPriceLimit = Math.max(
    ...MATCH_SCHEDULE.map((m) => getTicketPrice(m.basePrice, selectedCategory))
  );

  const [filters, setFilters] = useState({
    searchQuery: '',
    city: '',
    dateFilter: 'all',
    maxPrice: maxPriceLimit
  });

  const [sortBy, setSortBy] = useState('date-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 6;

  // Reset filters when category changes to update max price limits
  React.useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      maxPrice: maxPriceLimit
    }));
    setCurrentPage(1);
  }, [selectedCategory, maxPriceLimit]);

  // Filtered & Sorted Matches
  const filteredMatches = useMemo(() => {
    return MATCH_SCHEDULE.filter((match) => {
      const ticketPrice = getTicketPrice(match.basePrice, selectedCategory);

      // Search filter
      const matchesSearch =
        match.teamA.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        match.teamB.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        match.title.toLowerCase().includes(filters.searchQuery.toLowerCase());

      // City filter
      const matchesCity = filters.city === '' || match.city === filters.city;

      // Price filter
      const matchesPrice = ticketPrice <= filters.maxPrice;

      // Date offset filter
      let matchesDate = true;
      if (filters.dateFilter === 'today') {
        matchesDate = match.dateOffset === 0;
      } else if (filters.dateFilter === 'tomorrow') {
        matchesDate = match.dateOffset === 1;
      } else if (filters.dateFilter === 'week') {
        matchesDate = match.dateOffset <= 7;
      }

      return matchesSearch && matchesCity && matchesPrice && matchesDate;
    }).sort((a, b) => {
      const priceA = getTicketPrice(a.basePrice, selectedCategory);
      const priceB = getTicketPrice(b.basePrice, selectedCategory);
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'name-asc') return a.teamA.localeCompare(b.teamA);
      return a.dateOffset - b.dateOffset;
    });
  }, [filters, sortBy, selectedCategory]);

  // Paginated Matches
  const paginatedMatches = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMatches.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMatches, currentPage]);

  const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 min-h-screen">
      {/* Catalog Hero Section */}
      <section className="relative bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,68,148,0.25),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-slate-950/40" />
        
        <div className="relative max-w-7xl mx-auto text-center flex flex-col items-center">
          <span className="px-3.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-xs font-bold text-accent tracking-widest uppercase mb-4 animate-pulse">
            COMPLETE MATCH CATALOG
          </span>
          <h1 className="text-white text-5xl sm:text-7xl font-extrabold tracking-wide drop-shadow-md">
            FIFA World Cup 2026™ Tickets
          </h1>
          <p className="mt-4 max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed">
            Select your preferred match, seating tier, and complete your purchase securely. Experience soccer's grandest matches live on the field!
          </p>

          {/* Interactive Category Tabs */}
          <div className="mt-10 flex p-1 rounded-2xl bg-slate-900 border border-white/5 max-w-lg w-full">
            {([1, 2, 3] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`flex-grow py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-accent text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Category {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Filter Sidebar */}
          <div className="w-full lg:w-1/4 shrink-0">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              isOpen={isFilterOpen}
              setIsOpen={setIsFilterOpen}
              maxPriceLimit={maxPriceLimit}
            />
          </div>

          {/* Right Product Grid Column */}
          <div className="w-full lg:w-3/4 flex flex-col">
            
            {/* Grid Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950/50 border border-white/5 p-4 rounded-2xl mb-8">
              <div className="text-sm font-semibold text-slate-400 text-left">
                Showing <span className="text-white font-extrabold">{filteredMatches.length}</span> matches found in <span className="text-accent font-extrabold uppercase">Category {selectedCategory}</span>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4 text-accent" />
                  Filters
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-900 border border-slate-800 text-slate-300 focus:border-accent rounded-xl py-2 px-3 outline-none text-xs cursor-pointer font-bold"
                  >
                    <option value="date-asc">Sort by: Date (Soonest)</option>
                    <option value="price-asc">Sort by: Price (Low to High)</option>
                    <option value="price-desc">Sort by: Price (High to Low)</option>
                    <option value="name-asc">Sort by: Team Name (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Cards Grid */}
            {paginatedMatches.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedMatches.map((match) => (
                  <ProductCard key={match.id} match={match} category={selectedCategory} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-slate-950/20 border border-dashed border-white/5 rounded-2xl">
                <p className="text-slate-500 font-bold text-lg">No matches found matching your filters.</p>
                <button
                  onClick={() => {
                    setFilters({
                      searchQuery: '',
                      city: '',
                      dateFilter: 'all',
                      maxPrice: maxPriceLimit
                    });
                  }}
                  className="mt-4 bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tickets;
