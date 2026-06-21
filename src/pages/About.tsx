import React from 'react';
import { ShieldCheck, Ticket, Users, Landmark, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Header */}
      <section className="relative bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,68,148,0.25),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-slate-950/40" />
        
        <div className="relative max-w-7xl mx-auto text-center flex flex-col items-center">
          <span className="px-3.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-xs font-bold text-accent tracking-widest uppercase mb-4">
            WHO WE ARE
          </span>
          <h1 className="text-white text-5xl sm:text-7xl font-extrabold tracking-wide drop-shadow-md">
            Our Story & Mission
          </h1>
          <p className="mt-4 max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed">
            Making the beautiful game accessible. Read about our secondary ticketing platform and why we are trusted by thousands of soccer fans worldwide.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Story */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h2 className="text-white text-3xl sm:text-4xl font-extrabold tracking-wider leading-tight uppercase">
              Connecting Soccer Fans to the Pitch
            </h2>
            <p className="text-slate-350 text-sm leading-relaxed">
              Affordable FIFA Tickets was founded with a singular purpose: to break down the barriers of high ticketing costs and complicated booking platforms for soccer's biggest tournament. We operate a highly curated secondary marketplace, helping fans trade valid ticket allocations with confidence.
            </p>
            <p className="text-slate-350 text-sm leading-relaxed">
              We specialize in Category 3 (budget-friendly corner and goal-side seats), Category 2 (corners and mid-tiers), and Category 1 (sideline premium seats). By utilizing an escrow payout structure, we protect both buyers and sellers—funds are held securely until the direct mobile ticket transfer to your official FIFA account is fully confirmed.
            </p>
            <div className="flex gap-4 items-center bg-white/5 p-4 rounded-2xl border border-white/5 mt-2">
              <Heart className="w-10 h-10 text-accent shrink-0" />
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">Fan-First Focus</h4>
                <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
                  We believe that the passion of football belongs to the supporters. Our team works 24/7 to guarantee affordable pricing and seamless digital entry.
                </p>
              </div>
            </div>
          </div>

          {/* Graphical Trust Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="glass-panel border border-white/5 p-6 rounded-2xl flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-bold uppercase tracking-wider text-xs">Escrow Protection Guarantee</h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Your payment is stored in an encrypted escrow account. We pay the seller only after your digital mobile ticket successfully scans and registers.
                </p>
              </div>
            </div>

            <div className="glass-panel border border-white/5 p-6 rounded-2xl flex items-start gap-4">
              <Ticket className="w-8 h-8 text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-bold uppercase tracking-wider text-xs">Official Direct Seat Transfers</h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Every ticket is electronically linked and transferred to your email on the official ticketing portal, making entry 100% genuine and risk-free.
                </p>
              </div>
            </div>

            <div className="glass-panel border border-white/5 p-6 rounded-2xl flex items-start gap-4">
              <Users className="w-8 h-8 text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-bold uppercase tracking-wider text-xs">Group Seating Allocation</h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Traveling with family or club members? Orders of 2 or more tickets are guaranteed adjacent seats inside the stadium blocks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
