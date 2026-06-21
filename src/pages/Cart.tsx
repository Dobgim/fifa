import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORY_NAMES } from '../data/products';

const Cart: React.FC = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    processingFee,
    cartTotal
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-24 text-center max-w-md mx-auto px-4 min-h-[60vh] flex flex-col justify-center items-center">
        <div className="p-4 bg-slate-900 border border-white/5 rounded-full text-slate-500 mb-6 animate-pulse">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Your Cart is Empty</h2>
        <p className="text-slate-400 mt-2 text-sm leading-relaxed">
          You haven't added any FIFA World Cup 2026™ match tickets to your cart yet. Explore our categories to secure your seats!
        </p>
        <Link
          to="/tickets"
          className="mt-8 bg-accent hover:bg-accent-dark text-white font-bold uppercase tracking-wider text-xs py-3.5 px-8 rounded-xl transition-all hover:scale-102 cursor-pointer shadow-lg shadow-accent/20"
        >
          Browse Tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-left mb-10">
          <span className="text-xs font-bold text-accent tracking-widest uppercase">
            YOUR SELECTIONS
          </span>
          <h1 className="text-white text-3xl sm:text-5xl font-extrabold tracking-wide mt-2">
            Shopping Cart
          </h1>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={`${item.matchId}-${item.category}`}
                className="glass-panel border border-white/5 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-white/10 transition-colors"
              >
                {/* Product Meta */}
                <div className="flex items-center gap-4 text-left w-full sm:w-auto">
                  <div className="h-16 w-16 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-white/5 hidden sm:block">
                    <img src={item.image} alt={item.matchTitle} className="h-full w-full object-cover opacity-60" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base leading-snug">
                      {item.matchTitle}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {item.venueStr}
                    </p>
                    <p className="text-[10px] text-accent font-bold uppercase tracking-widest mt-1">
                      {CATEGORY_NAMES[item.category]}
                    </p>
                  </div>
                </div>

                {/* Quantity Adjuster & Subtotal Controls */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-white/5 sm:border-none">
                  {/* Quantity adjusts */}
                  <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
                    <button
                      onClick={() => updateQuantity(item.matchId, item.category, item.quantity - 1)}
                      className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-bold text-white text-xs select-none">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.matchId, item.category, item.quantity + 1)}
                      className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price info */}
                  <div className="text-right min-w-24">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
                      Subtotal
                    </span>
                    <span className="text-lg font-extrabold text-white">
                      ${item.price * item.quantity}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      ${item.price} / ticket
                    </span>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(item.matchId, item.category)}
                    className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer shadow-sm shrink-0"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary Side Card */}
          <div className="lg:col-span-4 flex flex-col gap-6 text-left">
            <div className="glass-panel border border-white/5 p-6 rounded-3xl flex flex-col gap-6 sticky top-28 shadow-2xl">
              <h3 className="text-white font-bold uppercase tracking-wider text-sm border-b border-white/5 pb-3">
                Order Summary
              </h3>

              {/* Fee list */}
              <div className="flex flex-col gap-3.5 text-sm font-semibold border-b border-white/5 pb-5">
                <div className="flex justify-between text-slate-400">
                  <span>Tickets Subtotal</span>
                  <span className="text-white">${cartSubtotal}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span className="flex items-center gap-1">
                    Booking Processing Fee
                    <span className="text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 px-1.5 py-0.5 rounded">3.5%</span>
                  </span>
                  <span className="text-white">${processingFee}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Delivery Method</span>
                  <span className="text-pitch-green">Instant Direct Mobile Transfer</span>
                </div>
              </div>

              {/* Total display */}
              <div className="flex justify-between items-baseline">
                <span className="text-white font-bold uppercase tracking-wider text-xs">Total Order Cost</span>
                <span className="text-3xl font-black text-white">${cartTotal}</span>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Link
                  to="/checkout"
                  className="w-full bg-accent hover:bg-accent-dark text-white font-bold uppercase tracking-wider text-xs py-4 rounded-xl text-center flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer shadow-lg shadow-accent/20"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/tickets"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold uppercase tracking-wider text-xs py-4 rounded-xl text-center border border-slate-800 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Guarantee info */}
              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5 mt-2">
                <ShieldCheck className="w-6 h-6 text-pitch-green shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider">Secure Escrow Guarantee</h4>
                  <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                    Your checkout is processed under full SSL security. Funds are kept in escrow until tickets are safely deposited.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
