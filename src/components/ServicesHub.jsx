import React, { useState } from 'react';
import { 
  Droplets, Snowflake, Zap, Hammer, Paintbrush, Bath, 
  Clock, ShieldCheck, ArrowRight, CheckCircle2, MessageCircle 
} from 'lucide-react';
import { POPULAR_SERVICES, SERVICE_CATEGORIES } from '../data/servicesData';

export default function ServicesHub({ onSelectService }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = activeCategory === 'all'
    ? POPULAR_SERVICES
    : POPULAR_SERVICES.filter(s => s.category === activeCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'plumbing': return <Droplets className="w-5 h-5 text-blue-500" />;
      case 'ac': return <Snowflake className="w-5 h-5 text-cyan-400" />;
      case 'electrical': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'carpentry': return <Hammer className="w-5 h-5 text-amber-600" />;
      case 'painting': return <Paintbrush className="w-5 h-5 text-rose-500" />;
      case 'renovation': return <Bath className="w-5 h-5 text-emerald-500" />;
      default: return <ShieldCheck className="w-5 h-5 text-[#ccff00]" />;
    }
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-8 bg-[#f6f5f0] border-b border-[#e5e3dc]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#e5e3dc]">
          <div>
            <div className="text-[11px] font-mono font-bold text-[#121316] uppercase tracking-wider mb-2">
              CATALOG // AHMEDABAD CERTIFIED SPECIALTIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121316] tracking-tight font-display">
              Engineered Home Services & Repairs
            </h2>
          </div>
          <p className="text-sm text-[#4a4d56] max-w-md font-normal">
            No vague quotes. Every service is backed by fixed transparent rates, genuine diagnostic tools, and a 30-day rework warranty.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#121316] text-[#ccff00] shadow-sm'
                  : 'bg-white text-[#4a4d56] hover:bg-[#eeece5] border border-[#e5e3dc]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Structured Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-[#e5e3dc] rounded-2xl p-6 flex flex-col justify-between hover:border-[#121316] transition-all hover:shadow-lg group"
            >
              <div>
                {/* Card Top: Icon & Timing */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f6f5f0] flex items-center justify-center border border-[#e5e3dc]">
                    {getCategoryIcon(service.category)}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#121316] bg-[#ccff00]/25 px-2.5 py-0.5 rounded">
                    <Clock className="w-3 h-3" />
                    {service.time}
                  </span>
                </div>

                {/* Service Name & Description */}
                <h3 className="text-lg font-bold text-[#121316] mb-2 font-display group-hover:text-blue-700 transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-[#787c87] leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-1.5 mb-6">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#4a4d56]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer: Starting Price & CTAs */}
              <div className="pt-4 border-t border-[#f0eee6]">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-[11px] font-mono text-[#787c87]">Starting Rate</span>
                  <span className="text-xl font-extrabold text-[#121316] font-display">
                    {service.price}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectService(service)}
                    className="w-full py-2 px-3 text-xs font-mono font-bold uppercase text-white bg-[#121316] hover:bg-black rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <a
                    href={`https://wa.me/919157691572?text=${encodeURIComponent(`Hello Home Hancer, I want to inquire about ${service.name} (Starting ${service.price}) in Ahmedabad.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 text-xs font-mono font-bold uppercase text-[#121316] bg-[#ccff00] hover:bg-[#b8e600] rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
