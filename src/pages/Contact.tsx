import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Info } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message content is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Header */}
      <section className="relative bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,68,148,0.25),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-slate-950/40" />
        
        <div className="relative max-w-7xl mx-auto text-center flex flex-col items-center">
          <span className="px-3.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-xs font-bold text-accent tracking-widest uppercase mb-4">
            GET IN TOUCH
          </span>
          <h1 className="text-white text-5xl sm:text-7xl font-extrabold tracking-wide drop-shadow-md">
            Contact Support
          </h1>
          <p className="mt-4 max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed">
            Have questions about ticket transfers, seating arrangements, or custom orders? Reach out to our 24/7 client relations department.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* Left Column: Contact details card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-panel border border-white/5 p-6 rounded-3xl flex flex-col gap-6 shadow-xl">
              <h3 className="text-white font-bold uppercase tracking-wider text-sm border-b border-white/5 pb-3">
                Corporate Contacts
              </h3>
              
              <div className="flex flex-col gap-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider">Office Address</h4>
                    <p className="text-slate-400 mt-1 leading-normal">
                      FIFA Tickets Marketplace Inc.<br />
                      Lincoln Financial Center, Suite 500,<br />
                      Philadelphia, PA 19148
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider">Direct Hotline</h4>
                    <p className="text-slate-400 mt-1">
                      <a href="tel:+18005553432" className="hover:text-white transition-colors">+1 (800) 555-FIFA</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-wider">Client Email</h4>
                    <p className="text-slate-400 mt-1">
                      <a href="mailto:support@affordablefifatickets.com" className="hover:text-white transition-colors">support@affordablefifatickets.com</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Informative help note */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 text-xs leading-relaxed text-slate-400">
                <Info className="w-5 h-5 text-accent shrink-0" />
                <span>
                  Support response times are currently under 10 minutes due to live tournament volumes. Provide your Order Tracking ID if applicable.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-8">
            <div className="glass-panel border border-white/5 p-6 sm:p-8 rounded-3xl shadow-xl">
              <h3 className="text-white font-bold uppercase tracking-wider text-sm border-b border-white/5 pb-3 mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Jane Smith"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white placeholder-slate-650 rounded-xl py-3 px-4 outline-none text-xs"
                    />
                    {errors.name && <span className="text-red-400 text-[10px] font-bold mt-1">{errors.name}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white placeholder-slate-650 rounded-xl py-3 px-4 outline-none text-xs"
                    />
                    {errors.email && <span className="text-red-400 text-[10px] font-bold mt-1">{errors.email}</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="e.g. Inquiry about usa vs england group tickets"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white placeholder-slate-650 rounded-xl py-3 px-4 outline-none text-xs"
                  />
                  {errors.subject && <span className="text-red-400 text-[10px] font-bold mt-1">{errors.subject}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Message Content</label>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Write details of your questions here..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-accent text-white placeholder-slate-650 rounded-xl py-3 px-4 outline-none text-xs resize-none"
                  />
                  {errors.message && <span className="text-red-400 text-[10px] font-bold mt-1">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent hover:bg-accent-dark text-white font-bold uppercase tracking-wider text-xs py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-102 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-accent/20"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0"></span>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>

      {/* Success Modal Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowSuccess(false)} />
          <div className="glass-panel border border-white/5 rounded-3xl max-w-sm w-full p-8 text-center relative z-10 shadow-2xl animate-scale-up">
            <div className="inline-flex p-3 bg-pitch-green/10 border border-pitch-green/20 rounded-full text-pitch-green mb-5">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-white font-bold text-xl uppercase tracking-wider mb-2">Message Sent!</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Thank you for contacting us. A support representative will review your message and reply via email within the next few minutes.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full bg-accent hover:bg-accent-dark text-white font-bold uppercase tracking-wider text-xs py-3.5 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
