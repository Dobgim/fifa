import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import logoPng from '../assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col items-start gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <img src={logoPng} alt="Logo" className="h-10 w-auto" />
              <div className="flex flex-col text-left">
                <span className="font-display text-2xl leading-none text-white tracking-wide font-black">
                  AFFORDABLE
                </span>
                <span className="font-display text-sm leading-none text-accent tracking-widest font-bold">
                  FIFA TICKETS
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 text-left mt-2 leading-relaxed">
              We are a premier secondary marketplace specializing in making the FIFA World Cup 2026™ accessible and affordable. Buy premium, mid-tier, and budget tickets with 100% security guarantee.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-accent hover:text-white transition-all duration-300" aria-label="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h3v-9h3.6l.4-3H12V6c0-.9.2-1.2 1-1.2h2V2h-3c-3 0-5 1.5-5 4.8V8z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-accent hover:text-white transition-all duration-300" aria-label="Instagram">
                <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-accent hover:text-white transition-all duration-300" aria-label="Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.2 2.4h3.3L14 10.8l8.2 10.8H15.6L10.7 15.1l-6 6.5H1.4l7.8-8.9L1.4 2.4H8.2l4.4 5.8 5.6-5.8zm-1.2 17.1h1.8L7.1 4.2H5.1l11.9 15.3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start">
            <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-6 border-b-2 border-accent pb-1">
              Ticket Categories
            </h4>
            <ul className="flex flex-col gap-3 text-left text-sm">
              <li>
                <Link to="/tickets" className="hover:text-white transition-colors">All Tickets Catalog</Link>
              </li>
              <li>
                <Link to="/category-1" className="hover:text-white transition-colors">Category 1 (Premium)</Link>
              </li>
              <li>
                <Link to="/category-2" className="hover:text-white transition-colors">Category 2 (Mid-Tier)</Link>
              </li>
              <li>
                <Link to="/category-3" className="hover:text-white transition-colors">Category 3 (Budget)</Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="flex flex-col items-start">
            <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-6 border-b-2 border-accent pb-1">
              Quick Support
            </h4>
            <ul className="flex flex-col gap-3 text-left text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Refund & Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-start text-left">
            <h4 className="text-white font-semibold uppercase tracking-wider text-sm mb-6 border-b-2 border-accent pb-1">
              Get In Touch
            </h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>FIFA Tickets Inc.<br />Lincoln Financial Center, Philadelphia, PA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a href="tel:+18005553432" className="hover:text-white transition-colors">+1 (800) 555-FIFA</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:support@affordablefifatickets.com" className="hover:text-white transition-colors">support@affordablefifatickets.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-white/5 my-8">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
            <ShieldCheck className="w-8 h-8 text-pitch-green shrink-0" />
            <div className="text-left">
              <h5 className="text-white font-bold text-xs uppercase tracking-wider">100% Secure Checkout</h5>
              <p className="text-[11px] text-slate-400 mt-0.5">SSL-encrypted payment processing</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
            <Truck className="w-8 h-8 text-pitch-green shrink-0" />
            <div className="text-left">
              <h5 className="text-white font-bold text-xs uppercase tracking-wider">Instant Transfer</h5>
              <p className="text-[11px] text-slate-400 mt-0.5">Direct mobile delivery via FIFA portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
            <RotateCcw className="w-8 h-8 text-pitch-green shrink-0" />
            <div className="text-left">
              <h5 className="text-white font-bold text-xs uppercase tracking-wider">Buyer Guarantee</h5>
              <p className="text-[11px] text-slate-400 mt-0.5">Refund if match is cancelled</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 text-xs">
          <div className="text-slate-500">
            &copy; {new Date().getFullYear()} Affordable FIFA Tickets. This site is a secondary marketplace for tickets. We are not affiliated with FIFA.
          </div>
          {/* Payment Methods */}
          <div className="flex items-center gap-3">
            <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">We Accept:</span>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 font-bold text-[10px] text-white tracking-widest">
              VISA
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 font-bold text-[10px] text-white tracking-widest">
              MC
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 font-bold text-[10px] text-white tracking-widest">
              AMEX
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 font-bold text-[10px] text-white tracking-widest">
              PAYPAL
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
