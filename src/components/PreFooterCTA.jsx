import React from 'react';
import { ArrowRight, MessageCircle, MapPin, Phone, ShieldCheck, Clock } from 'lucide-react';

export default function PreFooterCTA({ onOpenBooking }) {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[var(--surface-canvas)] border-b border-[var(--border-subtle)]">
      <div className="max-w-[1280px] mx-auto">
        <div className="relative rounded-3xl bg-[var(--surface-dark)] text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-xl border border-slate-800">
          
          {/* Subtle Ambient Background Depth */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent-primary)]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available Across 15 Ahmedabad Zones</span>
            </div>

            {/* Exact Words Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.1] text-white">
              Your next step starts here.
            </h2>

            {/* Exact Words Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Tell Home Hancer Services Pvt Ltd what you’re looking for. We’re here to help you get started.
            </p>

            {/* High-Converting Action Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => onOpenBooking && onOpenBooking()}
                className="w-full sm:w-auto px-8 h-12 rounded-xl text-sm font-semibold text-white bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] active:scale-[0.98] shadow-lg shadow-blue-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Schedule Free Inspection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <a
                href="https://wa.me/919157691572?text=Hello%20Home%20Hancer%20Services%20Pvt%20Ltd,%20I%20am%20looking%20for%20property%20maintenance%20in%20Ahmedabad."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 h-12 rounded-xl bg-white/10 hover:bg-white/15 active:scale-[0.98] text-white text-sm font-medium flex items-center justify-center gap-2 border border-white/20 hover:border-white/30 transition-all cursor-pointer backdrop-blur-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Quiet Location & Contact Footnote */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>PNTC, Vejalpur, Ahmedabad</span>
              </span>
              <span>•</span>
              <a
                href="tel:9157691572"
                className="flex items-center gap-1.5 hover:text-white transition-colors tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>+91 91576 91572</span>
              </a>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Monday–Saturday: 9am–8pm</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
