import React, { useState } from 'react';
import { Sparkles, Clock, Shield, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { POPULAR_SERVICES, AHMEDABAD_AREAS } from '../data/servicesData';

export default function QuickBookingWidget({ onBookSuccess, initialArea }) {
  const [selectedServiceId, setSelectedServiceId] = useState(POPULAR_SERVICES[0].id);
  const [area, setArea] = useState(initialArea || AHMEDABAD_AREAS[0]);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);

  const selectedService = POPULAR_SERVICES.find(s => s.id === selectedServiceId) || POPULAR_SERVICES[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBooked(true);
      if (onBookSuccess) {
        onBookSuccess({ service: selectedService.name, area, phone, price: selectedService.price });
      }
    }, 600);
  };

  const handleWhatsAppInstant = () => {
    const text = encodeURIComponent(
      `Hello Home Hancer, I want to book ${selectedService.name} in ${area}, Ahmedabad. Starting rate: ${selectedService.price}. My contact is ${phone || 'provided here'}. Please confirm technician availability.`
    );
    window.open(`https://wa.me/919157691572?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/90 overflow-hidden transition-all">
      {/* Widget Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 p-5 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs uppercase tracking-wider font-bold text-blue-200">Instant Estimate & Dispatch</span>
          </div>
          <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-400/30 font-medium">
            No Upfront Payment
          </span>
        </div>
        <h3 className="text-lg font-bold mt-1 text-white">Check Availability & Pricing</h3>
        <p className="text-xs text-slate-300 mt-0.5">Verified technicians available in {area} today</p>
      </div>

      {booked ? (
        <div className="p-6 text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900">Booking Request Received!</h4>
            <p className="text-xs text-slate-600 mt-1">
              A Home Hancer coordinator for <span className="font-semibold text-slate-900">{area}</span> will call <span className="font-semibold text-slate-900">{phone}</span> within 10 minutes with technician ETA.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-left text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Service:</span>
              <span className="font-semibold text-slate-800">{selectedService.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Base Estimate:</span>
              <span className="font-bold text-emerald-600">{selectedService.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Warranty:</span>
              <span className="text-blue-600 font-medium">30-Day Free Rework</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleWhatsAppInstant}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Speed up on WhatsApp
            </button>
            <button
              onClick={() => setBooked(false)}
              className="text-xs text-slate-500 hover:text-slate-800 underline mt-1"
            >
              Book another service
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Service Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
              1. What service do you need?
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
            >
              {POPULAR_SERVICES.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} ({service.price})
                </option>
              ))}
            </select>
          </div>

          {/* Area Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
              2. Your Locality in Ahmedabad
            </label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-xl px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
            >
              {AHMEDABAD_AREAS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}, Ahmedabad
                </option>
              ))}
            </select>
          </div>

          {/* Pricing & ETA Preview Card */}
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-blue-700 uppercase block tracking-wider">Estimated Starting Rate</span>
              <span className="text-xl font-extrabold text-blue-900">{selectedService.price}</span>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                <Clock className="w-3 h-3" />
                {selectedService.time}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Pay after service</span>
            </div>
          </div>

          {/* Mobile Phone Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
              3. Mobile Number (For technician dispatch)
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm font-semibold text-slate-600 bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl">
                +91
              </span>
              <input
                type="tel"
                placeholder="Enter 10-digit number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-r-xl px-3 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-99 text-white font-bold rounded-xl text-sm shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {loading ? (
                <span>Checking Tech Availability...</span>
              ) : (
                <>
                  <span>Dispatch Technician to {area}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleWhatsAppInstant}
              className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 border border-emerald-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-current" />
              <span>Book via WhatsApp Instead (Instant Confirmation)</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-blue-600" />
              30-Day Warranty
            </span>
            <span>•</span>
            <span>No Hidden Charges</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">Pay After Work</span>
          </div>
        </form>
      )}
    </div>
  );
}
