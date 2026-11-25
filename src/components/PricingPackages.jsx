import React from 'react';
import { ShieldCheck, Check, X, ArrowRight, MessageCircle } from 'lucide-react';

export default function PricingPackages({ onOpenBooking }) {
  const PACKAGES = [
    {
      title: "Tap & Pipe Repair",
      category: "Plumbing",
      homeHancerPrice: "₹149",
      marketPrice: "₹350 - ₹500",
      time: "45 mins",
      warranty: "30-Day Warranty",
      inclusions: ["Washer & seal replacement", "Water pressure test", "Concealed leak check"]
    },
    {
      title: "AC Deep Foam Jet Wash",
      category: "HVAC & Cooling",
      homeHancerPrice: "₹499",
      marketPrice: "₹800 - ₹1,200",
      time: "Same Day",
      warranty: "30-Day Warranty",
      inclusions: ["High-pressure foam jet wash", "Condenser coil sanitization", "Refrigerant level check"]
    },
    {
      title: "Switchboard & MCB Diagnostic",
      category: "Electrical",
      homeHancerPrice: "₹199",
      marketPrice: "₹400 - ₹600",
      time: "45 mins",
      warranty: "30-Day Warranty",
      inclusions: ["Insulated tool diagnostics", "Load balance assessment", "Safe shock-hazard prevention"]
    },
    {
      title: "Bathroom Turnkey Overhaul",
      category: "Renovation",
      homeHancerPrice: "Free Site Estimate",
      marketPrice: "Unpredictable Quotes",
      time: "3-7 Days",
      warranty: "10-Year Waterproof Bond",
      inclusions: ["3D layout design visit", "Anti-skid tile laying", "Grohe/Kohler plumbing fit"]
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-8 bg-[#f6f5f0] border-b border-[#e5e3dc]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#e5e3dc]">
          <div>
            <div className="text-[11px] font-mono font-bold text-[#121316] uppercase tracking-wider mb-2">
              BENCHMARK // FIXED RATE TARIFFS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121316] tracking-tight font-display">
              Transparent Rates. No On-Site Haggling.
            </h2>
          </div>
          <p className="text-sm text-[#4a4d56] max-w-md font-normal">
            Unlike unorganized local handymen who change prices after opening your walls, Home Hancer publishes certified baseline rates upfront.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {PACKAGES.map((pkg, idx) => (
            <div 
              key={idx}
              className="bg-white border border-[#e5e3dc] rounded-2xl p-6 flex flex-col justify-between hover:border-[#121316] transition-all"
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#787c87] block mb-1">
                  {pkg.category}
                </span>
                <h3 className="text-lg font-bold text-[#121316] mb-3 font-display">
                  {pkg.title}
                </h3>

                {/* Price Display */}
                <div className="bg-[#f6f5f0] p-3 rounded-xl mb-4">
                  <div className="text-[11px] font-mono text-[#787c87]">Home Hancer Fixed Rate:</div>
                  <div className="text-2xl font-extrabold text-[#121316] font-display">
                    {pkg.homeHancerPrice}
                  </div>
                  <div className="text-[11px] font-mono text-rose-500 line-through mt-0.5">
                    Market Avg: {pkg.marketPrice}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded mb-4">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>{pkg.warranty}</span>
                </div>

                {/* Inclusions */}
                <ul className="space-y-2 mb-6">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#4a4d56]">
                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onOpenBooking(pkg.title)}
                className="w-full py-2.5 px-4 text-xs font-mono font-bold uppercase text-white bg-[#121316] hover:bg-black rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Book This Tariff</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
