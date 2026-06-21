import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, CreditCard, User, CheckCircle, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORY_NAMES } from '../data/products';

type CheckoutStep = 'info' | 'payment' | 'confirm';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, cartSubtotal, processingFee, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>('info');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  // Errors State
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (cartItems.length === 0 && !showSuccessModal) {
    return (
      <div className="pt-32 pb-24 text-center max-w-md mx-auto px-4 min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Empty Checkout</h2>
        <p className="text-slate-400 mt-2 text-sm">You do not have any ticket selections in your cart to checkout.</p>
        <Link
          to="/tickets"
          className="mt-6 inline-block bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-colors"
        >
          Return to Tickets
        </Link>
      </div>
    );
  }

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData((prev) => ({ ...prev, cardNumber: formatted.slice(0, 19) }));
      return;
    }

    // Format expiry date (MM/YY)
    if (name === 'cardExpiry') {
      const formatted = value.replace(/\//g, '').replace(/(\d{2})/g, '$1/').trim();
      // Remove trailing slash if backspacing
      const clean = formatted.endsWith('/') ? formatted.slice(0, -1) : formatted;
      setFormData((prev) => ({ ...prev, cardExpiry: clean.slice(0, 5) }));
      return;
    }

    // Limit CVV to 3 or 4 digits
    if (name === 'cardCvv') {
      const numbers = value.replace(/\D/g, '');
      setFormData((prev) => ({ ...prev, cardCvv: numbers.slice(0, 4) }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate Info Step
  const validateInfo = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{8,15}$/.test(formData.phone.trim())) {
      tempErrors.phone = 'Invalid phone number format';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Validate Payment Step
  const validatePayment = () => {
    const tempErrors: Record<string, string> = {};
    const cardClean = formData.cardNumber.replace(/\s/g, '');
    if (!formData.cardNumber.trim()) {
      tempErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardClean)) {
      tempErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!formData.cardExpiry.trim()) {
      tempErrors.cardExpiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
      tempErrors.cardExpiry = 'Expiry must be in MM/YY format';
    }

    if (!formData.cardCvv.trim()) {
      tempErrors.cardCvv = 'Security code (CVV) is required';
    } else if (!/^\d{3,4}$/.test(formData.cardCvv)) {
      tempErrors.cardCvv = 'CVV must be 3 or 4 digits';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Step Switch Actions
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'info') {
      if (validateInfo()) setStep('payment');
    } else if (step === 'payment') {
      if (validatePayment()) setStep('confirm');
    }
  };

  const handlePrevStep = () => {
    if (step === 'payment') setStep('info');
    if (step === 'confirm') setStep('payment');
  };

  // Submit Order Process
  const handlePurchaseSubmit = () => {
    setIsLoading(true);
    // Simulate transaction delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Save order details to localStorage
      const order = {
        orderId: `FIFA-${Math.floor(100000 + Math.random() * 900000)}`,
        customer: { name: formData.name, email: formData.email, phone: formData.phone },
        items: cartItems,
        total: cartTotal,
        date: new Date().toISOString()
      };
      localStorage.setItem('last_fifa_order', JSON.stringify(order));
      
      // Trigger success modal
      setShowSuccessModal(true);
      clearCart();
    }, 2000);
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-left mb-8">
          <span className="text-xs font-bold text-accent tracking-widest uppercase">
            SECURE CHECKOUT
          </span>
          <h1 className="text-white text-3xl sm:text-5xl font-extrabold tracking-wide mt-2">
            Complete Purchase
          </h1>
        </div>

        {/* Progress Stepper */}
        <div className="max-w-3xl mx-auto mb-12 flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-accent -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: step === 'info' ? '0%' : step === 'payment' ? '50%' : '100%' }}
          />

          {[
            { id: 'info', num: 1, label: 'Customer Info' },
            { id: 'payment', num: 2, label: 'Payment Method' },
            { id: 'confirm', num: 3, label: 'Order Confirmation' }
          ].map((s) => {
            const isCompleted =
              (step === 'payment' && s.id === 'info') ||
              (step === 'confirm' && (s.id === 'info' || s.id === 'payment'));
            const isActive = step === s.id;
            return (
              <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-full font-bold text-sm flex items-center justify-center border transition-all ${
                    isCompleted
                      ? 'bg-accent border-accent text-white'
                      : isActive
                      ? 'bg-slate-900 border-accent text-accent shadow-md shadow-accent/20 scale-110'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  {isCompleted ? '✓' : s.num}
                </div>
                <span
                  className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider hidden sm:block ${
                    isActive ? 'text-accent' : isCompleted ? 'text-white' : 'text-slate-500'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Interactive Form steps */}
          <div className="lg:col-span-7">
            <div className="glass-panel border border-white/5 p-6 sm:p-8 rounded-3xl flex flex-col text-left">
              
              {/* Step 1: Info Form */}
              {step === 'info' && (
                <form onSubmit={handleNextStep} className="flex flex-col gap-6">
                  <h3 className="text-white font-bold text-lg border-b border-white/5 pb-2 uppercase tracking-wider flex items-center gap-2">
                    <User className="w-5 h-5 text-accent" /> Customer Details
                  </h3>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white placeholder-slate-650 rounded-xl py-3 px-4 outline-none text-xs"
                    />
                    {errors.name && <span className="text-red-400 text-[10px] font-bold mt-1">{errors.name}</span>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white placeholder-slate-650 rounded-xl py-3 px-4 outline-none text-xs"
                      />
                      {errors.email && <span className="text-red-400 text-[10px] font-bold mt-1">{errors.email}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 019-2834"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white placeholder-slate-650 rounded-xl py-3 px-4 outline-none text-xs"
                      />
                      {errors.phone && <span className="text-red-400 text-[10px] font-bold mt-1">{errors.phone}</span>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent-dark text-white font-bold uppercase tracking-wider text-xs py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-102 mt-4 cursor-pointer shadow-lg shadow-accent/20"
                  >
                    Continue to Payment <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Step 2: Payment Form */}
              {step === 'payment' && (
                <form onSubmit={handleNextStep} className="flex flex-col gap-6">
                  <h3 className="text-white font-bold text-lg border-b border-white/5 pb-2 uppercase tracking-wider flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-accent" /> Payment Information
                  </h3>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Credit Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="4111 2222 3333 4444"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white placeholder-slate-650 rounded-xl py-3 pl-4 pr-10 outline-none text-xs"
                      />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    </div>
                    {errors.cardNumber && <span className="text-red-400 text-[10px] font-bold mt-1">{errors.cardNumber}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Expiration Date</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white placeholder-slate-650 rounded-xl py-3 px-4 outline-none text-xs text-center"
                      />
                      {errors.cardExpiry && <span className="text-red-400 text-[10px] font-bold mt-1">{errors.cardExpiry}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">CVV Code</label>
                      <input
                        type="password"
                        name="cardCvv"
                        placeholder="123"
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white placeholder-slate-650 rounded-xl py-3 px-4 outline-none text-xs text-center"
                      />
                      {errors.cardCvv && <span className="text-red-400 text-[10px] font-bold mt-1">{errors.cardCvv}</span>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-6">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex items-center gap-2 border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-350 font-bold uppercase tracking-wider text-xs py-3.5 px-6 rounded-xl transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="submit"
                      className="bg-accent hover:bg-accent-dark text-white font-bold uppercase tracking-wider text-xs py-3.5 px-8 rounded-xl flex items-center gap-2 transition-all hover:scale-102 cursor-pointer shadow-lg shadow-accent/20"
                    >
                      Confirm Order Details <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Final Confirm Page */}
              {step === 'confirm' && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-white font-bold text-lg border-b border-white/5 pb-2 uppercase tracking-wider">
                    Verify Your Purchase
                  </h3>

                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col gap-2 text-xs">
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">Customer & Contact Information</h4>
                    <p className="text-slate-400"><strong className="text-slate-300">Name:</strong> {formData.name}</p>
                    <p className="text-slate-400"><strong className="text-slate-300">Email:</strong> {formData.email}</p>
                    <p className="text-slate-400"><strong className="text-slate-300">Phone:</strong> {formData.phone}</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col gap-2 text-xs">
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">Payment Details</h4>
                    <p className="text-slate-400">
                      <strong className="text-slate-300">Method:</strong> Credit Card ending in **** {formData.cardNumber.slice(-4)}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    By clicking "Confirm Purchase", you authorize a hold of <strong>${cartTotal}</strong> on your selected card. Tickets will be transferred directly to your email within 3-5 days of the kickoff date.
                  </p>

                  <div className="flex items-center justify-between gap-4 mt-6">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex items-center gap-2 border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-350 font-bold uppercase tracking-wider text-xs py-3.5 px-6 rounded-xl transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handlePurchaseSubmit}
                      disabled={isLoading}
                      className="bg-accent hover:bg-accent-dark text-white font-bold uppercase tracking-wider text-xs py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-102 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-accent/20"
                    >
                      {isLoading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0"></span>
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          Confirm Purchase & Pay (${cartTotal})
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Mini Cart Summary */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="glass-panel border border-white/5 p-6 rounded-3xl flex flex-col gap-6 sticky top-28 shadow-2xl">
              <h3 className="text-white font-bold uppercase tracking-wider text-sm border-b border-white/5 pb-3 flex items-center justify-between">
                Order Review
                <span className="text-[10px] text-accent bg-accent/15 border border-accent/20 px-2 py-0.5 rounded-full font-bold">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
                </span>
              </h3>

              {/* Items List */}
              <div className="flex flex-col gap-4 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={`${item.matchId}-${item.category}`} className="flex justify-between items-center gap-4 text-xs">
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-white line-clamp-1">{item.matchTitle}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">
                        {CATEGORY_NAMES[item.category]} &bull; Qty {item.quantity}
                      </span>
                    </div>
                    <span className="font-black text-white shrink-0">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Subtotals */}
              <div className="border-t border-white/5 pt-4 flex flex-col gap-2.5 text-xs font-semibold text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee (3.5%)</span>
                  <span className="text-white">${processingFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery fee</span>
                  <span className="text-pitch-green uppercase tracking-wider text-[10px]">Free Digital</span>
                </div>
              </div>

              {/* Total Order Summary */}
              <div className="border-t border-white/5 pt-4 flex justify-between items-baseline">
                <span className="text-white font-bold uppercase tracking-wider text-xs">Order Total</span>
                <span className="text-2xl font-black text-white">${cartTotal}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Success Modal Overlay */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" />
          
          {/* Modal Container */}
          <div className="glass-panel border border-white/5 rounded-3xl max-w-md w-full p-8 text-center relative z-10 shadow-2xl animate-scale-up">
            <div className="inline-flex p-3 bg-pitch-green/10 border border-pitch-green/20 rounded-full text-pitch-green mb-6">
              <CheckCircle className="w-14 h-14" />
            </div>
            
            <h2 className="text-white font-extrabold text-3xl uppercase tracking-wider leading-none mb-3">
              Purchase Complete!
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
              Thank you for choosing Affordable FIFA Tickets. Your transaction was processed successfully. 
              An order confirmation receipt and direct seat transfer details have been sent to your email.
            </p>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-left text-xs mb-8 flex flex-col gap-1.5">
              <p className="text-slate-500 font-bold uppercase text-[9px] tracking-widest">ORDER TRACKING ID</p>
              <h4 className="text-white font-mono font-black text-lg">
                {localStorage.getItem('last_fifa_order') 
                  ? JSON.parse(localStorage.getItem('last_fifa_order')!).orderId 
                  : 'FIFA-998822'}
              </h4>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/');
              }}
              className="w-full bg-accent hover:bg-accent-dark text-white font-bold uppercase tracking-wider text-xs py-4.5 rounded-xl transition-colors cursor-pointer shadow-lg shadow-accent/20"
            >
              Return to Home Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
