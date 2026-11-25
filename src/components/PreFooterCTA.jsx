import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function PreFooterCTA({ onOpenBooking }) {
  return (
    <section className="py-20 px-4 sm:px-8 bg-[#18191e] text-[#f6f5f0] border-b border-white/10">
      <div className="max-w-5xl mx-auto bg-[#121316] border border-white/15 rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
        <div className="inline-flex items-center gap-2 bg-[#ccff00]/10 border border-[#ccff00]/30 px-3 py-1 rounded text-xs font-mono text-[#ccff00] uppercase tracking-wider mb-4">
          PROPERTY MAINTENANCE
        </div>

        {/* Exact Original Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display max-w-2xl mx-auto">
          Your next step starts here.
        </h2>

        {/* Exact Original Subtitle */}
        <p className="text-sm sm:text-base text-[#a0a4b0] mt-4 max-w-xl mx-auto leading-relaxed font-normal">
          Tell Home Hancer Services Pvt Ltd what you’re looking for. We’re here to help you get started.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onOpenBooking()}
            className="px-8 py-3.5 bg-[#ccff00] hover:bg-[#b8e600] active:scale-98 text-[#121316] font-mono font-bold text-xs uppercase rounded-xl flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="https://wa.me/919157691572?text=Hello%20Home%20Hancer%20Services%20Pvt%20Ltd,%20I%20am%20looking%20for%20property%20maintenance%20in%20Ahmedabad."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-[#1a1c21] hover:bg-[#252830] text-white font-mono font-bold text-xs uppercase rounded-xl flex items-center gap-2 border border-white/20 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#ccff00] fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="mt-6 text-[11px] font-mono text-[#787c87]">
          C-901 PNTC, Times Of India Press Road behind Titanium City Centre, Vejalpur, Ahmedabad • Phone: 9157691572
        </div>
      </div>
    </section>
  );
}
