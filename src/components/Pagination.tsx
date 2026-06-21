import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination Navigation">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2.5 rounded-xl border border-white/5 bg-slate-950 text-slate-400 hover:text-white hover:border-accent/40 disabled:opacity-40 disabled:hover:border-white/5 disabled:hover:text-slate-400 transition-all cursor-pointer"
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10.5 h-10.5 rounded-xl font-bold transition-all text-xs tracking-wider cursor-pointer ${
            currentPage === page
              ? 'bg-accent text-white shadow-md shadow-accent/20 border border-accent'
              : 'border border-white/5 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-800'
          }`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2.5 rounded-xl border border-white/5 bg-slate-950 text-slate-400 hover:text-white hover:border-accent/40 disabled:opacity-40 disabled:hover:border-white/5 disabled:hover:text-slate-400 transition-all cursor-pointer"
        aria-label="Next Page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
};

export default Pagination;
