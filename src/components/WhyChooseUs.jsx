import React from 'react';
import { Check, X, ShieldCheck, Award, Zap, FileCheck2 } from 'lucide-react';

export default function WhyChooseUs() {
  const COMPARISONS = [
    {
      feature: "Technician Background & Identity",
      homeHancer: "100% Police & Background Verified Staff",
      localHandymen: "Unknown identity, unverified individuals"
    },
    {
      feature: "Pricing Transparency",
      homeHancer: "Certified upfront rate card before work begins",
      localHandymen: "Vague quotes, on-the-spot price hiking"
    },
    {
      feature: "Workmanship Guarantee",
      homeHancer: "30-Day Free Rework Warranty on all jobs",
      localHandymen: "Zero warranty, will not answer callback"
    },
    {
      feature: "Diagnostic Equipment",
      homeHancer: "FLIR thermal cameras & ultrasonic leak sensors",
      localHandymen: "Guesswork, unnecessary tile breaking"
    },
    {
      feature: "Invoicing & Payment",
      homeHancer: "Digital itemized GST invoice, pay via UPI/Card",
      localHandymen: "Cash only, no receipt or proof of service"
    },
    {
      feature: "Post-Service Cleanup",
      homeHancer: "Full debris sweep and zero-mess protocol",
      localHandymen: "Customer left to clean construction dust"
    }
  ];

  return (
    <section id="why-us" className="py-20 px-4 sm:px-8 bg-[#121316] text-[#f6f5f0] border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Why Ahmedabad Trusts Home Hancer
            </h2>
          </div>
          <p className="text-sm text-[#a0a4b0] max-w-md font-normal">
            We eliminated the frustrations of dealing with unreliable street handymen. Here is our certified operational standard.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs font-mono uppercase text-[#a0a4b0]">
                <th className="py-4 px-6 w-1/3">Evaluation Metric</th>
                <th className="py-4 px-6 w-1/3 text-[#ccff00] bg-[#1a1c21] rounded-t-xl">
                  Home Hancer Standard
                </th>
                <th className="py-4 px-6 w-1/3 text-white/50">
                  Unorganized Street Contractors
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {COMPARISONS.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 text-[#f6f5f0] bg-[#1a1c21]/80 font-medium">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                      <span>{row.homeHancer}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#787c87]">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{row.localHandymen}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
