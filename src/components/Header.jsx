import React, { useState } from 'react';
import { Phone, MapPin, Clock, MessageCircle, Menu, X, ChevronRight, ShieldCheck } from 'lucide-react';

export default function Header({ onOpenBooking, selectedArea, setSelectedArea, areas }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#121316] text-[#f6f5f0] border-b border-white/10">
      {/* Top Utility & Locality Telemetry Bar */}
      <div className="bg-[#0b0c0e] py-1.5 px-4 sm:px-8 border-b border-white/5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-[#ccff00]/10 text-[#ccff00] font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded border border-[#ccff00]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]"></span>
              DISPATCH: 45-MIN ACTIVE IN AHMEDABAD
            </span>
            <div className="hidden md:flex items-center gap-1.5 text-[#a0a4b0] text-[11px] font-mono">
              <MapPin className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>ZONE:</span>
              <select 
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="bg-[#1a1c21] text-[#f6f5f0] border border-white/10 rounded px-2 py-0.5 text-[11px] focus:outline-none focus:border-[#ccff00] cursor-pointer"
              >
                {areas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto text-[11px] font-mono">
            <div className="hidden lg:flex items-center gap-1 text-[#a0a4b0]">
              <Clock className="w-3 h-3 text-[#ccff00]" />
              <span>MON-SAT: 09:00 - 20:00</span>
            </div>
            <a 
              href="tel:9157691572" 
              className="flex items-center gap-1.5 text-[#ccff00] hover:text-white font-bold transition-colors"
            >
              <Phone className="w-3 h-3 fill-current" />
              <span>24/7 HOTLINE: +91 91576 91572</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
        {/* Brand Wordmark (Halden Roofing Inspired) */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded bg-[#ccff00] text-[#121316] font-extrabold flex items-center justify-center text-lg shadow-sm">
            H
          </div>
          <div>
            <div className="font-extrabold text-lg text-white tracking-tight flex items-center gap-1.5 font-display">
              <span>HOME HANCER</span>
              <span className="text-[10px] bg-white/10 text-white/80 font-mono px-1.5 py-0.5 rounded tracking-widest">
                AHMEDABAD
              </span>
            </div>
            <p className="text-[10px] text-[#a0a4b0] font-mono tracking-wider">PROPERTY MAINTENANCE & CRAFT</p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-[#a0a4b0] uppercase tracking-wider font-mono">
          <a href="#services" className="hover:text-[#ccff00] transition-colors">Services</a>
          <a href="#estimator" className="hover:text-[#ccff00] transition-colors">Cost Estimator</a>
          <a href="#transformations" className="hover:text-[#ccff00] transition-colors">Before & After</a>
          <a href="#pricing" className="hover:text-[#ccff00] transition-colors">Rate Card</a>
          <a href="#why-us" className="hover:text-[#ccff00] transition-colors">Protocol</a>
          <a href="#reviews" className="hover:text-[#ccff00] transition-colors">Reviews</a>
          <a href="#faqs" className="hover:text-[#ccff00] transition-colors">FAQs</a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wa.me/919157691572?text=Hello%20Home%20Hancer,%20I%20need%20property%20maintenance%20in%20Ahmedabad."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold font-mono uppercase text-[#121316] bg-[#ccff00] hover:bg-[#b8e600] rounded transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp Quick</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold font-mono uppercase text-white bg-[#1a1c21] hover:bg-[#252830] border border-white/20 rounded transition-all cursor-pointer"
          >
            <span>Book Visit</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => onOpenBooking()}
            className="sm:hidden px-3 py-1.5 text-xs font-bold text-[#121316] bg-[#ccff00] rounded font-mono"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/80 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#121316] px-4 pt-4 pb-6 space-y-4">
          <div className="pb-3 border-b border-white/10">
            <span className="text-[11px] font-mono text-[#a0a4b0] block mb-1">SELECTED LOCALITY:</span>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full bg-[#1a1c21] border border-white/10 text-white rounded p-2 text-xs font-mono"
            >
              {areas.map((area) => (
                <option key={area} value={area}>{area}, Ahmedabad</option>
              ))}
            </select>
          </div>
          <nav className="flex flex-col space-y-3 font-mono text-sm text-[#a0a4b0]">
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ccff00]">Services</a>
            <a href="#estimator" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ccff00]">Cost Estimator</a>
            <a href="#transformations" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ccff00]">Before & After</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ccff00]">Rate Card</a>
            <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ccff00]">Why Us</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ccff00]">Reviews</a>
            <a href="#faqs" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ccff00]">FAQs</a>
          </nav>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href="https://wa.me/919157691572?text=Hello%20Home%20Hancer,%20I%20need%20property%20maintenance%20in%20Ahmedabad."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-center text-xs font-mono font-bold uppercase text-[#121316] bg-[#ccff00] rounded flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              WhatsApp Dispatch
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-center text-xs font-mono font-bold uppercase text-white bg-[#1a1c21] border border-white/20 rounded"
            >
              Schedule Service
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
