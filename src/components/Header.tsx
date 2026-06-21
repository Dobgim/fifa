import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, Globe, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Logo from './Logo';

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const location = useLocation();

  // Detect scroll to add shadow/glass effect to header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger bounce animation on cart icon when item is added
  useEffect(() => {
    const handleCartAdd = () => {
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 800);
    };
    window.addEventListener('cart-item-added', handleCartAdd);
    return () => window.removeEventListener('cart-item-added', handleCartAdd);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tickets', path: '/tickets' },
    { name: 'Category 1', path: '/category-1' },
    { name: 'Category 2', path: '/category-2' },
    { name: 'Category 3', path: '/category-3' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to catalog page with search parameter
      window.location.href = `/tickets?search=${encodeURIComponent(searchQuery)}`;
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/85 backdrop-blur-md border-b border-white/5 py-3 shadow-lg'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <Logo size={44} className="transition-transform duration-300 group-hover:scale-105 shrink-0" />
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl leading-none text-white tracking-wide font-black">
                AFFORDABLE
              </span>
              <span className="font-display text-xs leading-none text-accent tracking-widest font-bold">
                FIFA TICKETS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-sm font-semibold uppercase tracking-wider transition-colors duration-300 hover:text-white ${
                    isActive ? 'text-accent' : 'text-slate-300'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            {/* Live Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400">
              <span className="live-pulse"></span>
              LIVE TICKET FEED
            </div>

            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-slate-300 hover:text-accent transition-colors cursor-pointer"
              aria-label="Search Tickets"
            >
              <Search className="w-5.5 h-5.5" />
            </button>

            {/* Cart Link with Badge */}
            <Link
              to="/cart"
              className={`p-2 text-slate-300 hover:text-accent transition-all duration-300 relative cursor-pointer ${
                cartBounce ? 'scale-120 text-accent animate-bounce' : ''
              }`}
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5.5 h-5.5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-slate-900 shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-accent transition-colors cursor-pointer"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search Overlay Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-slate-950/95 border-b border-white/10 px-4 py-4 sm:px-6 shadow-2xl animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex gap-3">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search by team (e.g., USA, England, France)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white placeholder-slate-500 rounded-lg py-2.5 pl-4 pr-10 outline-none text-sm"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <button
                type="submit"
                className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Drawer Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative ml-auto w-full max-w-sm h-full bg-slate-950 border-l border-white/5 p-6 flex flex-col shadow-2xl z-10 transition-transform duration-300 animate-slide-in">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Logo size={32} className="shrink-0" />
                <span className="font-display text-lg text-white font-bold tracking-wider">
                  TICKET MENU
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 text-left">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-3 px-4 rounded-lg font-semibold uppercase tracking-wider text-sm transition-all ${
                      isActive
                        ? 'bg-accent/15 text-accent border-l-4 border-accent'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto border-t border-white/5 pt-6 flex flex-col gap-4 text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-semibold">
                <Globe className="w-4 h-4 text-accent" />
                100% Guaranteed Tickets
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-yellow-500 font-bold">
                <Star className="w-4 h-4 fill-yellow-500" />
                4.8/5 Star Rated Seller
              </div>
              <div className="text-[11px] text-slate-500">
                &copy; {new Date().getFullYear()} Affordable FIFA Tickets. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
