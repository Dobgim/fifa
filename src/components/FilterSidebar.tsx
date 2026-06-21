import React from 'react';
import { X, SlidersHorizontal, Trash2, Calendar, MapPin, Search } from 'lucide-react';
import { MATCH_SCHEDULE } from '../data/products';

interface FilterState {
  searchQuery: string;
  city: string;
  dateFilter: string; // 'all' | 'today' | 'tomorrow' | 'week'
  maxPrice: number;
}

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  maxPriceLimit: number;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  isOpen,
  setIsOpen,
  maxPriceLimit
}) => {
  // Extract unique cities
  const uniqueCities = Array.from(new Set(MATCH_SCHEDULE.map((m) => m.city))).sort();

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      city: '',
      dateFilter: 'all',
      maxPrice: maxPriceLimit
    });
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-80 bg-slate-950 p-6 lg:p-0 flex flex-col border-r border-white/5 lg:border-none lg:static lg:w-auto lg:z-auto transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between lg:hidden border-b border-white/5 pb-4 mb-6">
          <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider">
            <SlidersHorizontal className="w-5 h-5 text-accent" />
            Filter Tickets
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Body */}
        <div className="flex flex-col gap-6 text-left overflow-y-auto lg:sticky lg:top-28">
          <div className="hidden lg:flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-accent" />
              Filter Options
            </h3>
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-accent font-bold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
          </div>

          {/* Search Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Search Teams / Matches
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search teams (e.g. USA)..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white placeholder-slate-500 rounded-xl py-2.5 pl-4 pr-10 outline-none text-xs"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            </div>
          </div>

          {/* City / Venue Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-accent" /> Filter by Host City
            </label>
            <select
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 text-white focus:border-accent rounded-xl py-2.5 px-4 outline-none text-xs cursor-pointer"
            >
              <option value="">All Host Cities / Venues</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Date Offset Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-accent" /> Filter by Date Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'All Dates', value: 'all' },
                { label: 'Today', value: 'today' },
                { label: 'Tomorrow', value: 'tomorrow' },
                { label: 'Next 7 Days', value: 'week' }
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFilters({ ...filters, dateFilter: opt.value })}
                  className={`py-2 px-3 rounded-lg border text-left text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    filters.dateFilter === opt.value
                      ? 'bg-accent/15 border-accent text-accent'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Max Price Range
              </label>
              <span className="text-xs font-extrabold text-white">
                ${filters.maxPrice}
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={maxPriceLimit}
              step={10}
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-bold">
              <span>$100</span>
              <span>${maxPriceLimit}</span>
            </div>
          </div>

          {/* Help Card */}
          <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-left">
            <h4 className="font-bold text-white uppercase tracking-wider mb-2">Need Group Tickets?</h4>
            <p className="text-slate-400 leading-relaxed">
              For bookings of 10+ tickets or customized suite options, contact our corporate department directly.
            </p>
            <a
              href="mailto:support@affordablefifatickets.com"
              className="mt-3 inline-block text-accent hover:underline font-bold"
            >
              Contact Support
            </a>
          </div>

          {/* Mobile Apply Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-accent hover:bg-accent-dark text-white font-semibold uppercase tracking-wider text-xs py-3 rounded-xl lg:hidden mt-4 transition-colors cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
