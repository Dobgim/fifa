import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { MATCH_SCHEDULE, getTicketPrice, getTodayStr, getDateStrOffset } from '../data/products';

const Category3: React.FC = () => {
  const today = getTodayStr();
  const tomorrow = getDateStrOffset(1);
  const weekEnd = getDateStrOffset(7);

  const maxPriceLimit = Math.max(...MATCH_SCHEDULE.map((m) => getTicketPrice(m.basePrice, 3)));

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

  const filteredMatches = useMemo(() => {
    return MATCH_SCHEDULE.filter((match) => {
      const ticketPrice = getTicketPrice(match.basePrice, 3);

      const matchesSearch =
        match.teamA.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        match.teamB.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        match.title.toLowerCase().includes(filters.searchQuery.toLowerCase());

      const matchesCity = filters.city === '' || match.city === filters.city;
      const matchesPrice = ticketPrice <= filters.maxPrice;

      let matchesDate = true;
      if (filters.dateFilter === 'today') matchesDate = match.calendarDate === today;
      else if (filters.dateFilter === 'tomorrow') matchesDate = match.calendarDate === tomorrow;
      else if (filters.dateFilter === 'week') matchesDate = match.calendarDate >= today && match.calendarDate <= weekEnd;

      return matchesSearch && matchesCity && matchesPrice && matchesDate;
    }).sort((a, b) => {
      const priceA = getTicketPrice(a.basePrice, 3);
      const priceB = getTicketPrice(b.basePrice, 3);
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'name-asc') return a.teamA.localeCompare(b.teamA);
      return a.calendarDate.localeCompare(b.calendarDate);
    });
  }, [filters, sortBy, today, tomorrow, weekEnd]);

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
      <section className="relative bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,177,64,0.15),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-slate-950/40" />
        <div className="relative max-w-7xl mx-auto text-center flex flex-col items-center">
          <span className="px-3.5 py-1 rounded-full bg-pitch-green/15 border border-pitch-green/30 text-xs font-bold text-pitch-green tracking-widest uppercase mb-4">
            💚 BUDGET FRIENDLY
          </span>
          <h1 className="text-white text-5xl sm:text-7xl font-extrabold tracking-wide drop-shadow-md">
            Category 3 Tickets
          </h1>
          <p className="mt-4 max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed">
            Behind-goal fan sections — maximum atmosphere, incredible energy, and the most affordable tickets on the secondary market.
          </p>
          <div className="mt-4 flex items-center gap-2 bg-pitch-green/10 border border-pitch-green/20 px-5 py-2 rounded-xl text-pitch-green text-xs font-bold">
            From <span className="text-xl font-black">${Math.min(...MATCH_SCHEDULE.map(m => getTicketPrice(m.basePrice, 3)))}</span> / ticket
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4 shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} maxPriceLimit={maxPriceLimit} />
          </div>
          <div className="w-full lg:w-3/4 flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950/50 border border-white/5 p-4 rounded-2xl mb-8">
              <div className="text-sm font-semibold text-slate-400">
                Showing <span className="text-white font-extrabold">{filteredMatches.length}</span> Category 3 matches
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <button onClick={() => setIsFilterOpen(true)} className="lg:hidden flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer">
                  <SlidersHorizontal className="w-4 h-4 text-accent" /> Filters
                </button>
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-slate-900 border border-slate-800 text-slate-300 focus:border-accent rounded-xl py-2 px-3 outline-none text-xs cursor-pointer font-bold">
                    <option value="date-asc">Sort by: Date (Soonest)</option>
                    <option value="price-asc">Sort by: Price (Low to High)</option>
                    <option value="price-desc">Sort by: Price (High to Low)</option>
                    <option value="name-asc">Sort by: Team Name (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>
            {paginatedMatches.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedMatches.map((match) => <ProductCard key={match.id} match={match} category={3} />)}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-slate-950/20 border border-dashed border-white/5 rounded-2xl">
                <p className="text-slate-500 font-bold text-lg">No matches found matching your filters.</p>
                <button onClick={() => setFilters({ searchQuery: '', city: '', dateFilter: 'all', maxPrice: maxPriceLimit })} className="mt-4 bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer">Clear Filters</button>
              </div>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Category3;
