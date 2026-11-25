import React from 'react';
import { ArrowRight, Clock, MapPin, Star, Phone, MessageCircle } from 'lucide-react';
import HairlineHeroMotion from './HairlineHeroMotion';
import QuickBookingWidget from './QuickBookingWidget';

export default function Hero({ onOpenBooking, selectedArea, onBookSuccess }) {
  return (
    <section className="relative bg-[#121316] text-[#f6f5f0] pt-12 pb-20 px-4 sm:px-8 border-b border-white/10 overflow-hidden">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Eyebrow Tag from Original Site */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-6 border-b border-white/10 text-xs font-mono">
          <div className="inline-flex items-center gap-2 bg-[#ccff00]/10 border border-[#ccff00]/30 px-3 py-1 rounded text-[#ccff00] font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span>
            <span>PROPERTY MAINTENANCE</span>
          </div>
          <div className="flex items-center gap-2 text-[#a0a4b0]">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-white font-bold">4.8 / 5</span>
            <span>· Based on 353+ Google reviews</span>
          </div>
        </div>

        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 items-start">
          {/* Left Column: Exact Original Words from Before State (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Exact Original Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] text-white font-display">
              Home Hancer Services Pvt Ltd - <span className="text-[#ccff00]">Property Maintenance</span>
            </h1>

            {/* Exact Original Body Copy */}
            <p className="text-sm sm:text-base text-[#a0a4b0] leading-relaxed font-normal">
              Home Hancer Services is your premier partner for exceptional property maintenance and renovation in Ahmedabad. Since 2023, their dedicated team of professionals has provided a complete suite of services designed to transform and maintain your home with precision and care. Specializing in everything from electrical and plumbing repairs to sophisticated carpentry and complete bathroom renovations, they handle every project with an unwavering commitment to quality. Whether you need a simple fix or a major overhaul, Home Hancer's expert craftsmen ensure your vision for a beautiful and functional home becomes a reality.
            </p>

            {/* Action Buttons with Original Context */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-3 bg-[#ccff00] hover:bg-[#b8e600] active:scale-98 text-[#121316] font-mono font-bold text-xs uppercase rounded-xl flex items-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/919157691572?text=Hello%20Home%20Hancer%20Services,%20I%20am%20interested%20in%20Property%20Maintenance.%20Please%20share%20more%20information."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#1a1c21] hover:bg-[#252830] text-white font-mono font-bold text-xs uppercase rounded-xl flex items-center gap-2 border border-white/20 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#ccff00] fill-current" />
                <span>Enquire on WhatsApp</span>
              </a>

              <a
                href="tel:9157691572"
                className="px-5 py-3 text-xs font-mono text-[#a0a4b0] hover:text-white flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>9157691572</span>
              </a>
            </div>

            {/* Hairline 3D Isometric Motion Canvas */}
            <div className="pt-4">
              <HairlineHeroMotion />
            </div>
          </div>

          {/* Right Column: "At a glance" Card from Before State (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#18191e] border border-white/15 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-[#ccff00]"></div>

              <div className="text-[11px] font-mono text-[#ccff00] font-bold uppercase tracking-wider mb-2">
                AT A GLANCE
              </div>
              <h3 className="text-xl font-bold text-white font-display mb-4">
                Home Hancer Services Pvt Ltd
              </h3>

              {/* Exact Original 'What we do' */}
              <div className="space-y-4 text-xs">
                <div className="border-b border-white/10 pb-3">
                  <span className="text-[#787c87] font-mono block text-[11px] mb-1">What we do:</span>
                  <p className="text-white/90 leading-relaxed font-medium">
                    Property Maintenance, Plumber, Painting, Carpenter, Electrician, Tile contractor, Bathroom Renovator, Real Estate Builders & Construction Company, Interior fitting contractor, Air conditioning repair shop
                  </p>
                </div>

                {/* Exact Location */}
                <div className="border-b border-white/10 pb-3">
                  <span className="text-[#787c87] font-mono block text-[11px] mb-1">Location:</span>
                  <div className="flex items-start gap-2 text-white/90">
                    <MapPin className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      C-901 PNTC, Times Of India Press Road behind Titanium City Centre, Vejalpur, Ahmedabad, Gujarat, 380015
                    </p>
                  </div>
                </div>

                {/* Exact Business Hours */}
                <div className="border-b border-white/10 pb-3">
                  <span className="text-[#787c87] font-mono block text-[11px] mb-1">Business hours:</span>
                  <div className="flex items-center justify-between text-white/90">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#ccff00]" />
                      <span>Monday-Saturday: 9am-8pm</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#787c87] mt-1 font-mono">
                    You can contact us anytime during the day with your query.
                  </p>
                </div>

                {/* Rating Strip */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-white font-bold font-mono">4.8 / 5</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#a0a4b0]">353+ Google reviews</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <QuickBookingWidget 
              onBookSuccess={onBookSuccess} 
              initialArea={selectedArea} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
