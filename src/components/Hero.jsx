import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Star, MapPin, Phone, Check, ArrowDown } from 'lucide-react';

const HERO_SERVICES = [
  'Air Conditioning',
  'Bathroom Remodeling',
  'Plumber',
  'Electrician',
  'Carpenter',
  'Painting',
  'Waterproofing',
  'Kitchen Remodeling',
  'Tile contractor'
];

export default function Hero({ onOpenBooking }) {
  const [selectedService, setSelectedService] = useState(HERO_SERVICES[0]);
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Scrollcraft: Subtle GPU-composited rise & scale on the 3D house anchor
  const houseY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const houseScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setSubmitted(true);
  };

  return (
    <section
      ref={heroRef}
      className="relative bg-[var(--surface-canvas)] pt-14 sm:pt-20 pb-0 px-4 sm:px-8 border-b border-[var(--border-subtle)] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Centered Editorial & Utilitarian Stack */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center space-y-5"
        >
          {/* Quiet Verifiable Trust Line (Sentence case, no middle dots, uniform 16px icons) */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--ink-secondary)]">
            <span className="inline-flex items-center gap-1.5">
              <Star className="w-4 h-4 text-[var(--ink-primary)]" strokeWidth={1.5} />
              <span className="font-medium text-[var(--ink-primary)] tabular-nums">4.8 / 5</span>
              <span>from 353+ Google reviews</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[var(--ink-muted)]" strokeWidth={1.5} />
              <span>Vejalpur, Ahmedabad</span>
            </span>
          </div>

          {/* Headline: One weight, one color, tight tracking */}
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.1] text-[var(--ink-primary)] break-words min-width-0">
            Property maintenance and renovation in Ahmedabad
          </h1>

          {/* One Clear Sentence (Exact wording from before state) */}
          <p className="text-base sm:text-lg text-[var(--ink-secondary)] leading-relaxed max-w-2xl mx-auto">
            Home Hancer Services is your premier partner for exceptional property maintenance and renovation in Ahmedabad.
          </p>
        </motion.div>

        {/* Horizontal 2-Input Enquiry Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto mt-8"
        >
          {submitted ? (
            <div className="bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-xl p-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary-soft)] text-[var(--accent-primary)] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-[var(--ink-primary)]">
                    Enquiry received for {selectedService}
                  </p>
                  <p className="text-[var(--ink-secondary)] tabular-nums">
                    We will contact {phone} during business hours (Monday–Saturday, 9am–8pm).
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={`https://wa.me/919157691572?text=${encodeURIComponent(
                    `I want to know more about ${selectedService}. My mobile number is ${phone}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium text-[var(--ink-inverse)] bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] rounded-lg transition-colors"
                >
                  Open WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-sm font-medium text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] px-2 py-2 cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-xl p-2 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-2 items-center"
            >
              {/* Input 1: Select Service */}
              <div className="md:col-span-5">
                <label htmlFor="hero-service-select" className="sr-only">
                  Select service
                </label>
                <select
                  id="hero-service-select"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full h-11 px-3 bg-transparent text-sm font-medium text-[var(--ink-primary)] rounded-lg border border-transparent hover:bg-[var(--surface-muted)] focus:bg-[var(--surface-card)] focus:border-[var(--border-strong)] focus:outline-none transition-colors cursor-pointer"
                >
                  {HERO_SERVICES.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Divider on desktop */}
              <div className="hidden md:block md:col-span-1 h-6 w-px bg-[var(--border-subtle)] mx-auto" />

              {/* Input 2: Mobile Number */}
              <div className="md:col-span-3 flex items-center h-11 px-3 rounded-lg border border-[var(--border-subtle)] md:border-transparent focus-within:border-[var(--border-strong)] bg-[var(--surface-canvas)] md:bg-transparent">
                <span className="text-sm font-medium text-[var(--ink-muted)] mr-2 tabular-nums select-none">
                  +91
                </span>
                <label htmlFor="hero-phone-input" className="sr-only">
                  Mobile number
                </label>
                <input
                  id="hero-phone-input"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  required
                  className="w-full bg-transparent text-sm font-medium text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] focus:outline-none tabular-nums"
                />
              </div>

              {/* Primary Action */}
              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="w-full h-11 px-5 text-sm font-medium text-[var(--ink-inverse)] bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] active:scale-[0.99] rounded-lg transition-[transform,background-color] cursor-pointer"
                >
                  Contact us
                </button>
              </div>
            </form>
          )}

          {/* Quiet Secondary Link & Hours below bar */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--ink-secondary)]">
            <a
              href="tel:9157691572"
              className="inline-flex items-center gap-1.5 hover:text-[var(--ink-primary)] transition-colors tabular-nums"
            >
              <Phone className="w-4 h-4 text-[var(--ink-muted)]" strokeWidth={1.5} />
              <span>Call 9157691572</span>
            </a>
            <span className="text-[var(--ink-muted)]">Monday to Saturday, 9am to 8pm</span>
            <button
              type="button"
              onClick={() => onOpenBooking({ name: selectedService })}
              className="text-[var(--accent-primary)] hover:underline font-medium cursor-pointer"
            >
              Add project details
            </button>
          </div>
        </motion.div>

        {/* Bottom Edge Anchor: 3D Architectural House Cross-Section rising into view */}
        <motion.div
          style={{ y: houseY, scale: houseScale }}
          className="mt-10 sm:mt-14 max-w-4xl mx-auto relative"
        >
          <div className="bg-[var(--surface-card)] border border-b-0 border-[var(--border-subtle)] rounded-t-2xl pt-4 px-4 sm:pt-6 sm:px-8 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--ink-secondary)]">
              <span className="font-medium text-[var(--ink-primary)]">
                Home Hancer Services Pvt Ltd
              </span>
              <a
                href="#services-3d"
                className="inline-flex items-center gap-1.5 text-[var(--accent-primary)] font-medium hover:underline"
              >
                <span>Explore 3D services</span>
                <ArrowDown className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>

            <div className="relative flex justify-center">
              <img
                src="/assets/hero-villa-exploded.png"
                alt="Exploded 3D isometric architectural villa showing rooftop AC unit, bathroom, office, living room, kitchen, and laundry utility"
                className="w-full max-w-3xl h-auto object-contain block mx-auto"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
