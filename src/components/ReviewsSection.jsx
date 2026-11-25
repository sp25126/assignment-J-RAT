import React from 'react';
import { Star, CheckCircle, MapPin } from 'lucide-react';
import { REVIEWS } from '../data/servicesData';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 px-4 sm:px-8 bg-[#f6f5f0] border-b border-[#e5e3dc]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#e5e3dc]">
          <div>
            <div className="text-[11px] font-mono font-bold text-[#121316] uppercase tracking-wider mb-2">
              VERIFIED REVIEWS // AHMEDABAD HOMEOWNERS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121316] tracking-tight font-display">
              Rated 4.8 / 5.0 on Google
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs font-mono font-bold text-[#121316]">
              Based on 353+ Google Reviews
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#e5e3dc] rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-[#121316] transition-all"
            >
              <div>
                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-[#787c87]">{rev.date}</span>
                </div>

                <div className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded inline-block mb-3">
                  {rev.service}
                </div>

                <p className="text-xs text-[#4a4d56] leading-relaxed mb-6 italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-[#f0eee6] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#121316] font-display">{rev.name}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#787c87] mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{rev.locality}</span>
                  </div>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
