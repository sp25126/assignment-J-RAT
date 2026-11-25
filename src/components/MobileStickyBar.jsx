import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

export default function MobileStickyBar({ onOpenBooking }) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[var(--surface-dark)]/95 backdrop-blur-md border-t border-slate-800 p-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden shadow-2xl">
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        <a
          href="tel:9157691572"
          className="h-11 px-3 bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-all shadow-xs"
        >
          <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>Call 91576 91572</span>
        </a>

        <a
          href="https://wa.me/919157691572?text=Hello%20Home%20Hancer,%20I%20need%20property%20maintenance%20in%20Ahmedabad."
          target="_blank"
          rel="noopener noreferrer"
          className="h-11 px-3 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
        >
          <MessageCircle className="w-3.5 h-3.5 shrink-0" />
          <span>WhatsApp Desk</span>
        </a>
      </div>
    </div>
  );
}
