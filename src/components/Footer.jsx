import React from 'react';
import { Phone, MapPin, Clock, MessageCircle, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function Footer({ onOpenBooking, onOpenAdmin }) {
  return (
    <footer id="contact-footer" className="bg-[var(--surface-dark)] text-slate-300 pt-16 pb-24 lg:pb-16 px-4 sm:px-8 border-t border-slate-800">
      <div className="max-w-[1280px] mx-auto space-y-12">
        
        {/* Main Grid: Brand, Navigation, Verification, Operating Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission Statement (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="space-y-1">
              <span className="text-xl font-semibold tracking-tight text-white block">
                Home Hancer Services
              </span>
              <p className="text-xs text-slate-400">
                Pvt Ltd • Vejalpur, Ahmedabad (Since 2023)
              </p>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Ahmedabad’s premier engineered property maintenance and turnkey architectural renovation platform. Providing verified tradesmen, upfront fixed-rate tariffs, and 30-day workmanship warranties.
            </p>

            {/* Quality Standard Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>30-Day Workmanship & Leak-Free Guarantee</span>
            </div>
          </div>

          {/* Quick Service Links (3 Cols) */}
          <div className="md:col-span-3 space-y-3 text-sm">
            <span className="text-xs font-semibold text-white tracking-wider uppercase block">
              Core Specialties
            </span>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#services-section" className="hover:text-white transition-colors">
                  Plumbing & Leak Diagnostics
                </a>
              </li>
              <li>
                <a href="#services-section" className="hover:text-white transition-colors">
                  AC Deep Foam-Jet Cleaning
                </a>
              </li>
              <li>
                <a href="#services-section" className="hover:text-white transition-colors">
                  Switchboard & Wiring Repairs
                </a>
              </li>
              <li>
                <a href="#services-section" className="hover:text-white transition-colors">
                  Custom Carpentry & Cabinetry
                </a>
              </li>
              <li>
                <a href="#services-section" className="hover:text-white transition-colors">
                  Terrace & Wall Waterproofing
                </a>
              </li>
              <li>
                <a href="#services-section" className="hover:text-white transition-colors">
                  Turnkey Bathroom Remodeling
                </a>
              </li>
            </ul>
          </div>

          {/* Operational Headquarters & Contact (4 Cols) */}
          <div className="md:col-span-4 space-y-3 text-sm">
            <span className="text-xs font-semibold text-white tracking-wider uppercase block">
              Operational Office
            </span>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  C-901 PNTC, Times Of India Press Road behind Titanium City Centre, Vejalpur, Ahmedabad, Gujarat, 380015
                </span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
                <a
                  href="tel:9157691572"
                  className="text-white hover:text-[var(--accent-primary)] font-semibold transition-colors tabular-nums text-sm"
                >
                  +91 91576 91572
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Monday – Saturday: 09:00 – 20:00</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?cid=13745266497914041753"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[var(--accent-primary)] hover:underline font-medium"
              >
                <span>View on Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Legal & Copyright Bottom Strip with Admin Gateway */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Home Hancer Services Pvt Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Property Maintenance & Renovation</span>
            <span>•</span>
            <a
              href="#admin"
              onClick={(e) => {
                e.preventDefault();
                onOpenAdmin && onOpenAdmin();
              }}
              className="text-slate-400 hover:text-white transition-colors underline decoration-slate-600 underline-offset-2 cursor-pointer font-medium"
            >
              Operations CMS / Backend
            </a>
            <span>•</span>
            <span>Vejalpur & West Ahmedabad</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
