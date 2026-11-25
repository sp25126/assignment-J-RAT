import React from 'react';
import { Phone, MapPin, Clock, MessageCircle, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenBooking }) {
  return (
    <footer id="contact-footer" className="bg-[#0b0c0e] text-[#f6f5f0] pt-16 pb-24 lg:pb-16 px-4 sm:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#ccff00] text-[#121316] font-extrabold flex items-center justify-center text-lg">
                H
              </div>
              <div>
                <span className="font-extrabold text-lg text-white font-display tracking-tight">HOME HANCER</span>
                <span className="text-[10px] bg-white/10 text-white/80 font-mono px-1.5 py-0.5 rounded ml-2">SERVICES</span>
                <p className="text-[10px] text-[#a0a4b0] font-mono">PVT LTD // AHMEDABAD</p>
              </div>
            </div>

            <p className="text-xs text-[#a0a4b0] leading-relaxed max-w-sm">
              Ahmedabad’s premier engineered property maintenance and turnkey architectural renovation platform. Since 2023, providing verified tradesmen, upfront fixed rate tariffs, and 30-day workmanship warranties.
            </p>

            {/* Embedded 3D Render Asset generated via Blender 5.2 */}
            <div className="pt-2 flex items-center gap-4 bg-[#121316] p-3 rounded-xl border border-white/10 max-w-sm">
              <img 
                src="/assets/3d-house-craft.png" 
                alt="Home Hancer 3D Architectural Maintenance Model" 
                className="w-14 h-14 object-contain shrink-0"
              />
              <div className="text-[11px] font-mono">
                <span className="text-[#ccff00] font-bold block">3D VERIFIED FLEET</span>
                <span className="text-[#a0a4b0]">Diagnostic tools & calibrated spares on all units</span>
              </div>
            </div>
          </div>

          {/* Service Links (3 Cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider block mb-2">
              Services
            </span>
            <ul className="space-y-2 text-[#a0a4b0]">
              <li><a href="#services" className="hover:text-[#ccff00]">Plumbing & Pipe Leakage</a></li>
              <li><a href="#services" className="hover:text-[#ccff00]">AC Deep Foam Jet Cleaning</a></li>
              <li><a href="#services" className="hover:text-[#ccff00]">Switchboard & MCB Repair</a></li>
              <li><a href="#services" className="hover:text-[#ccff00]">Precision Carpentry & Doors</a></li>
              <li><a href="#services" className="hover:text-[#ccff00]">Thermal Wall Waterproofing</a></li>
              <li><a href="#services" className="hover:text-[#ccff00]">Turnkey Bathroom Remodeling</a></li>
            </ul>
          </div>

          {/* Operating HQ & Address (4 Cols) */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider block mb-2">
              Operational Headquarters
            </span>
            <div className="space-y-2 text-[#a0a4b0]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                <span>
                  C-901 PNTC, Times Of India Press Road behind Titanium City Centre, Vejalpur, Ahmedabad, Gujarat, 380015
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-[#ccff00] shrink-0" />
                <a href="tel:9157691572" className="text-white hover:text-[#ccff00] font-bold">
                  +91 91576 91572
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ccff00] shrink-0" />
                <span>Monday - Saturday: 09:00 - 20:00 (Emergency 24/7)</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?cid=13745266497914041753"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#ccff00] hover:underline"
              >
                <span>Open in Google Maps</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Hallmark & Copyright Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#787c87]">
          <div>
            © 2026 Home Hancer Services Pvt Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/60">Built to Hallmark & Unslop Standards</span>
            <span>•</span>
            <span className="text-[#ccff00]">Halden & Savee Aesthetic</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
