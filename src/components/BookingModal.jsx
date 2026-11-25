import React, { useState } from 'react';
import { X, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { POPULAR_SERVICES, AHMEDABAD_AREAS } from '../data/servicesData';

export default function BookingModal({ isOpen, onClose, preselectedService, area }) {
  const [selectedServiceId, setSelectedServiceId] = useState(
    preselectedService ? preselectedService.id : POPULAR_SERVICES[0].id
  );
  const [selectedArea, setSelectedArea] = useState(area || AHMEDABAD_AREAS[0]);
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentService = POPULAR_SERVICES.find(s => s.id === selectedServiceId) || POPULAR_SERVICES[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Home Hancer, I want to book ${currentService.name} in ${selectedArea}, Ahmedabad. Contact: ${phone || 'Not provided'}. Notes: ${notes || 'None'}. Please dispatch technician.`
    );
    window.open(`https://wa.me/919157691572?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#121316] border border-white/20 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-[#f6f5f0]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#1a1c21]">
          <div>
            <span className="text-[10px] font-mono text-[#ccff00] uppercase tracking-wider block">
              BOOKING // AHMEDABAD DISPATCH
            </span>
            <h3 className="text-lg font-bold text-white font-display">Schedule Technician Visit</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-[#ccff00]/15 text-[#ccff00] rounded-full flex items-center justify-center mx-auto border border-[#ccff00]/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white font-display">Booking Dispatched</h4>
            <p className="text-xs text-[#a0a4b0] leading-relaxed">
              Our Ahmedabad coordinator is assigning a vetted technician for <span className="text-white font-semibold">{selectedArea}</span>. You will receive a confirmation call at <span className="text-[#ccff00] font-mono">{phone}</span> shortly.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleWhatsApp}
                className="w-full py-2.5 px-4 bg-[#ccff00] hover:bg-[#b8e600] text-[#121316] font-mono font-bold text-xs uppercase rounded-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                Track on WhatsApp
              </button>
              <button
                onClick={onClose}
                className="text-xs text-white/50 hover:text-white underline mt-1 font-mono"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#a0a4b0] mb-1 uppercase">
                Service Category & Tariff
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full bg-[#1a1c21] border border-white/10 rounded-xl p-2.5 text-xs text-white font-medium focus:border-[#ccff00] focus:outline-none"
              >
                {POPULAR_SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — {s.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#a0a4b0] mb-1 uppercase">
                Ahmedabad Locality
              </label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full bg-[#1a1c21] border border-white/10 rounded-xl p-2.5 text-xs text-white font-medium focus:border-[#ccff00] focus:outline-none"
              >
                {AHMEDABAD_AREAS.map((a) => (
                  <option key={a} value={a}>
                    {a}, Ahmedabad
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#a0a4b0] mb-1 uppercase">
                Mobile Number (10 digits)
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-xs font-mono text-white/70 bg-[#1a1c21] border border-r-0 border-white/10 rounded-l-xl">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="Enter 10-digit number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full bg-[#1a1c21] border border-white/10 rounded-r-xl p-2.5 text-xs text-white font-mono focus:border-[#ccff00] focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#a0a4b0] mb-1 uppercase">
                Specific Issue Notes (Optional)
              </label>
              <textarea
                placeholder="E.g., kitchen sink pipe leakage under counter, water pressure drop..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full bg-[#1a1c21] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:border-[#ccff00] focus:outline-none"
              />
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#ccff00] hover:bg-[#b8e600] text-[#121316] font-mono font-bold text-xs uppercase rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Confirm Dispatch Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase rounded-xl flex items-center justify-center gap-2 border border-white/10"
              >
                <MessageCircle className="w-4 h-4 text-[#ccff00] fill-current" />
                <span>Book Direct via WhatsApp</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#a0a4b0] pt-2 border-t border-white/10">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#ccff00]" />
                30-Day Warranty
              </span>
              <span>•</span>
              <span>Fixed Rate Guarantee</span>
              <span>•</span>
              <span>Pay After Work</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
