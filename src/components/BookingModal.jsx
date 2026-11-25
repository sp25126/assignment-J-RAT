import React, { useState } from 'react';
import { X, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, MapPin, Wrench } from 'lucide-react';
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
    try {
      const existing = JSON.parse(localStorage.getItem('homehancer_leads_crm') || '[]');
      const newLead = {
        id: `LEAD-${Date.now().toString().slice(-4)}`,
        customer: 'Website Homeowner',
        phone: phone,
        service: currentService.name,
        area: selectedArea,
        time: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
        status: 'Pending',
        technician: 'Unassigned'
      };
      localStorage.setItem('homehancer_leads_crm', JSON.stringify([newLead, ...existing]));
    } catch (err) {
      console.error(err);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-2xl w-full max-w-lg max-h-[92dvh] flex flex-col overflow-hidden shadow-2xl text-[var(--ink-primary)]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--surface-muted)]/50 shrink-0">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
            <h3 className="text-base sm:text-lg font-bold text-[var(--ink-primary)]">
              Schedule Technician Visit
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[var(--ink-muted)] hover:text-[var(--ink-primary)] rounded-lg hover:bg-[var(--surface-muted)] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-6 flex-1">
          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[var(--ink-primary)]">
                Booking Request Dispatched
              </h4>
              <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed max-w-sm mx-auto">
                Our Ahmedabad desk is assigning a certified technician for <span className="font-semibold text-[var(--ink-primary)]">{selectedArea}</span>. You will receive a confirmation call at <span className="font-mono font-semibold text-[var(--accent-primary)]">+91 {phone}</span> shortly.
              </p>
              
              <div className="pt-3 flex flex-col gap-2.5 max-w-sm mx-auto">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full h-11 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp to Track</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-[var(--ink-muted)] hover:text-[var(--ink-primary)] py-2 transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--ink-primary)] mb-1.5">
                  Select Service & Starting Tariff
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full bg-[var(--surface-canvas)] border border-[var(--border-subtle)] focus:border-[var(--accent-primary)] rounded-xl p-2.5 text-xs text-[var(--ink-primary)] font-medium focus:outline-none transition-colors"
                >
                  {POPULAR_SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} — {s.price} ({s.time})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--ink-primary)] mb-1.5">
                  Ahmedabad Locality
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full bg-[var(--surface-canvas)] border border-[var(--border-subtle)] focus:border-[var(--accent-primary)] rounded-xl p-2.5 text-xs text-[var(--ink-primary)] font-medium focus:outline-none transition-colors"
                >
                  {AHMEDABAD_AREAS.map((a) => (
                    <option key={a} value={a}>
                      {a}, Ahmedabad
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--ink-primary)] mb-1.5">
                  Mobile Number (10 digits)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-xs font-mono text-[var(--ink-muted)] bg-[var(--surface-muted)] border border-r-0 border-[var(--border-subtle)] rounded-l-xl select-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full bg-[var(--surface-canvas)] border border-[var(--border-subtle)] focus:border-[var(--accent-primary)] rounded-r-xl p-2.5 text-xs text-[var(--ink-primary)] tabular-nums focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--ink-primary)] mb-1.5">
                  Specific Issue Notes (Optional)
                </label>
                <textarea
                  placeholder="E.g., bathroom pipe leaking behind wall, AC jet wash required..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-[var(--surface-canvas)] border border-[var(--border-subtle)] focus:border-[var(--accent-primary)] rounded-xl p-2.5 text-xs text-[var(--ink-primary)] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full h-11 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] active:scale-[0.98] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Confirm Dispatch Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full h-11 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 active:scale-[0.98] font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Book Direct on WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[var(--ink-muted)] pt-3 border-t border-[var(--border-subtle)]">
                <span className="flex items-center gap-1 font-medium text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  30-Day Guarantee
                </span>
                <span>•</span>
                <span>Fixed Rate Tariff</span>
                <span>•</span>
                <span>Pay After Service</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
