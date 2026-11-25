import React from 'react';
import { ArrowRight, ShieldCheck, Clock, Zap, CheckCircle2 } from 'lucide-react';
import HairlineHeroMotion from './HairlineHeroMotion';
import QuickBookingWidget from './QuickBookingWidget';

export default function Hero({ onOpenBooking, selectedArea, onBookSuccess }) {
  return (
    <section className="relative bg-[#121316] text-[#f6f5f0] pt-12 pb-20 px-4 sm:px-8 border-b border-white/10 overflow-hidden">
      {/* Background Subtle Architectural Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Technical Metadata Bar (Savee & Halden Inspired) */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-8 text-[11px] font-mono text-[#a0a4b0] border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-[#ccff00] font-semibold tracking-wider">AHMEDABAD RESIDENTIAL & COMMERCIAL</span>
            <span>//</span>
            <span>COORDS: 23.0225° N, 72.5714° E</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/80">353+ GOOGLE VERIFIED RATINGS</span>
            <span className="text-[#ccff00]">★ 4.8 / 5.0</span>
          </div>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10 items-start">
          {/* Left Column: Architectural Value Statement (7 Cols) */}
          <div className="lg:col-span-7 space-y-7">
            {/* High-Visibility Safety Lime Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-[#ccff00]/10 border border-[#ccff00]/30 px-3 py-1 rounded text-[11px] font-mono text-[#ccff00] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span>
              <span>CERTIFIED FIELD TECHNICIANS AT YOUR DOORSTEP</span>
            </div>

            {/* Bold Headline (Savee + Halden Typographic Hybrid) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white font-display">
              Precision Property Maintenance. <br />
              <span className="text-[#ccff00]">Zero Guesswork.</span>
            </h1>

            {/* One Clear Sentence (Hallmark & Unslop Floor) */}
            <p className="text-base sm:text-lg text-[#a0a4b0] leading-relaxed max-w-xl font-normal">
              Ahmedabad’s on-demand network for plumbing, electrical diagnostics, AC servicing, and turnkey bathroom remodeling. Vetted experts arrive in 45 minutes with upfront fixed pricing and a 30-day warranty.
            </p>

            {/* Core Trust Triplets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#1a1c21] border border-white/10 p-3.5 rounded-xl">
                <div className="flex items-center gap-2 text-[#ccff00] font-mono text-xs font-bold">
                  <Clock className="w-4 h-4" />
                  <span>45-MIN ARRIVAL</span>
                </div>
                <p className="text-[11px] text-[#a0a4b0] mt-1">Rapid response across all Western Ahmedabad corridors</p>
              </div>

              <div className="bg-[#1a1c21] border border-white/10 p-3.5 rounded-xl">
                <div className="flex items-center gap-2 text-[#ccff00] font-mono text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>30-DAY WARRANTY</span>
                </div>
                <p className="text-[11px] text-[#a0a4b0] mt-1">100% free rework guarantee on every repair completed</p>
              </div>

              <div className="bg-[#1a1c21] border border-white/10 p-3.5 rounded-xl">
                <div className="flex items-center gap-2 text-[#ccff00] font-mono text-xs font-bold">
                  <Zap className="w-4 h-4" />
                  <span>FIXED RATE SHIELD</span>
                </div>
                <p className="text-[11px] text-[#a0a4b0] mt-1">Itemized digital invoice, no on-site price negotiation</p>
              </div>
            </div>

            {/* Hairline 3D Isometric Motion Interactive Stage */}
            <div className="pt-2">
              <HairlineHeroMotion />
            </div>
          </div>

          {/* Right Column: Instant Booking & Cost Estimator Engine (5 Cols) */}
          <div className="lg:col-span-5" id="estimator">
            <QuickBookingWidget 
              onBookSuccess={onBookSuccess} 
              initialArea={selectedArea} 
            />

            {/* Micro proof quote below estimator */}
            <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 text-xs text-[#a0a4b0]">
              <span className="text-[#ccff00] text-lg font-bold leading-none">“</span>
              <span>
                "Ashok Nath from Home Hancer reached my house in Vejalpur within 35 minutes and fixed a concealed pipe leak without breaking extra tiles."
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
