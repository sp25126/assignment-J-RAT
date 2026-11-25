import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function MobileStickyBar({ onOpenBooking }) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#121316]/95 backdrop-blur-md border-t border-white/10 p-3 lg:hidden shadow-2xl">
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        <a
          href="tel:9157691572"
          className="py-3 px-4 bg-[#1a1c21] hover:bg-[#252830] text-white font-mono font-bold text-xs uppercase rounded-xl flex items-center justify-center gap-2 border border-white/15 active:scale-98 transition-all"
        >
          <Phone className="w-4 h-4 text-[#ccff00] fill-current" />
          <span>Call Desk</span>
        </a>

        <a
          href="https://wa.me/919157691572?text=Hello%20Home%20Hancer,%20I%20need%20property%20maintenance%20in%20Ahmedabad."
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-4 bg-[#ccff00] hover:bg-[#b8e600] text-[#121316] font-mono font-bold text-xs uppercase rounded-xl flex items-center justify-center gap-2 active:scale-98 shadow-sm transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
