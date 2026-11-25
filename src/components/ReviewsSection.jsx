import React from 'react';
import { Star } from 'lucide-react';

export default function ReviewsSection() {
  const ORIGINAL_REVIEWS = [
    {
      name: "Akib Mansuri",
      date: "Aug 2, 2026",
      text: "Fantastic job done by Ashok nath. Very quick and satisfying service. Recommended to all the ahmedabadies."
    },
    {
      name: "arman ali",
      date: "Jun 10, 2026",
      text: "Recently my shop civil and tiles work veriy nice"
    },
    {
      name: "Ram brish Kumar",
      date: "Jun 10, 2026",
      text: "Very nice painting work"
    },
    {
      name: "Rohan Yadav",
      date: "Jun 10, 2026",
      text: "Best renovation service"
    }
  ];

  return (
    <section id="reviews" className="py-20 px-4 sm:px-8 bg-[#f6f5f0] border-b border-[#e5e3dc]">
      <div className="max-w-7xl mx-auto">
        {/* Exact Section Header from Original Site */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#e5e3dc]">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121316] tracking-tight font-display">
              Google reviews
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-bold text-[#121316] font-mono">
              4.8 · 353+ reviews
            </span>
          </div>
        </div>

        {/* Exact Original Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {ORIGINAL_REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#e5e3dc] rounded-2xl p-6 flex flex-col justify-between hover:border-[#121316] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[#787c87]">{rev.date}</span>
                </div>

                <p className="text-xs text-[#4a4d56] leading-relaxed mb-6 italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#f0eee6]">
                <h4 className="text-xs font-bold text-[#121316] font-display">{rev.name}</h4>
                <span className="text-[10px] text-[#787c87] font-mono">Google Reviewer</span>
              </div>
            </div>
          ))}
        </div>

        {/* Original Link to Read All Reviews */}
        <div className="pt-8 text-center">
          <a
            href="https://maps.google.com/?cid=13745266497914041753"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#121316] hover:text-blue-700 underline"
          >
            <span>Read all reviews on Google</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
