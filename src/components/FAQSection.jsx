import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { FAQS } from '../data/servicesData';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faqs" className="py-20 px-4 sm:px-8 bg-[#121316] text-[#f6f5f0] border-b border-white/10">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center pb-12">
          <div className="text-[11px] font-mono text-[#ccff00] uppercase tracking-wider mb-2">
            FREQUENT QUESTIONS // OPERATIONAL PROTOCOL
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Clear Answers Before You Book
          </h2>
          <p className="text-sm text-[#a0a4b0] mt-2 font-normal">
            Everything you need to know about our response times, guarantees, and pricing policy in Ahmedabad.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="bg-[#1a1c21] border border-white/10 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white hover:text-[#ccff00] transition-colors cursor-pointer"
                >
                  <span className="font-display">{faq.q}</span>
                  <span className="text-[#ccff00] shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#a0a4b0] leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
