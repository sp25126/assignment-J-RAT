import React, { useState, useRef, useEffect } from 'react';
import { 
  Star, MapPin, Phone, Check, ArrowDown, ChevronDown, 
  Wrench, Snowflake, Bath, Droplets, Zap, Hammer, 
  Paintbrush, ShieldCheck, Utensils, Grid, ArrowRight, MessageCircle 
} from 'lucide-react';

const HERO_SERVICES = [
  { name: 'Air Conditioning', icon: Snowflake, badge: 'Popular' },
  { name: 'Bathroom Remodeling', icon: Bath, badge: 'Specialist' },
  { name: 'Plumber', icon: Droplets, badge: 'Fast Visit' },
  { name: 'Electrician', icon: Zap, badge: 'Licensed' },
  { name: 'Carpenter', icon: Hammer, badge: 'Woodwork' },
  { name: 'Painting', icon: Paintbrush, badge: 'Interior' },
  { name: 'Waterproofing', icon: ShieldCheck, badge: 'Monsoon' },
  { name: 'Kitchen Remodeling', icon: Utensils, badge: 'Modular' },
  { name: 'Tile contractor', icon: Grid, badge: 'Flooring' }
];

const STAGES = [
  {
    id: 'assembled',
    label: 'Overview',
    title: 'Home Hancer Services Pvt Ltd',
    subtitle: 'Complete property maintenance and renovation in Ahmedabad since 2023.',
    src: '/assets/hero-villa.png',
    startAt: 0.0,
    zoom: 1.0,
    panX: 0,
    panY: 0.04
  },
  {
    id: 'exploded',
    label: 'Exploded view',
    title: 'Every floor, inside and out',
    subtitle: 'From rooftop air conditioning to ground-floor plumbing and modular kitchens.',
    src: '/assets/hero-villa-exploded.png',
    startAt: 0.18,
    zoom: 1.06,
    panX: 0,
    panY: 0.02
  },
  {
    id: 'workers',
    label: 'Active teams',
    title: 'Specialists across every trade',
    subtitle: 'Dedicated craftsmen working simultaneously across electrical, plumbing, AC, and carpentry.',
    src: '/assets/hero-villa-workers.jpg',
    startAt: 0.36,
    zoom: 1.1,
    panX: 0,
    panY: 0.0
  },
  {
    id: 'ac',
    label: 'Air conditioning',
    title: 'Air conditioning repair and service',
    subtitle: 'Split and window AC servicing, coil cleaning, installation, and inspection visits.',
    src: '/assets/hero-room-ac.png',
    startAt: 0.54,
    zoom: 1.16,
    panX: -0.02,
    panY: -0.02
  },
  {
    id: 'carpentry',
    label: 'Carpenter & electrician',
    title: 'Carpentry and electrical repairs',
    subtitle: 'Custom woodwork, cabinet fitting, switchboards, and home electrical maintenance.',
    src: '/assets/hero-room-carpenter.jpg',
    startAt: 0.72,
    zoom: 1.16,
    panX: 0.02,
    panY: 0.0
  },
  {
    id: 'plumbing',
    label: 'Plumber & kitchen',
    title: 'Plumbing and bathroom renovation',
    subtitle: 'Leak detection, tap and pipe repair, waterproofing, and complete bathroom remodeling.',
    src: '/assets/hero-room-plumber.jpg',
    startAt: 0.88,
    zoom: 1.18,
    panX: 0,
    panY: 0.02
  }
];

const TOTAL_FRAMES = 120; // 5 seconds @ 24 fps

export default function Hero({ onOpenBooking }) {
  const [selectedService, setSelectedService] = useState(HERO_SERVICES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  const dropdownRef = useRef(null);
  const trackRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Preload all 6 Flow keyframes
  useEffect(() => {
    imagesRef.current = STAGES.map((stage) => {
      const img = new Image();
      img.src = stage.src;
      return img;
    });
  }, []);

  // 24fps Scroll-Scrubbed Canvas Engine (Samba OG style)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const onScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      targetProgressRef.current = progress;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const drawHeroImage = (img, alpha, zoom, panX, panY, w, h) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      ctx.save();
      ctx.globalAlpha = alpha;

      const isMobile = w < 768;
      // Desktop: cover so there are zero side margins; Mobile: contain + centered so full house fits
      const scale = isMobile
        ? Math.min(w / img.naturalWidth, h / img.naturalHeight) * 1.15
        : Math.max(w / img.naturalWidth, h / img.naturalHeight) * zoom;

      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;

      const dx = (w - drawW) / 2 + panX * w;
      const dy = isMobile ? (h - drawH) / 2 : (h - drawH) / 2 + panY * h;
      ctx.drawImage(img, dx, dy, drawW, drawH);
      ctx.restore();
    };

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    let animId;
    let lastStage = 0;

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);

      // Smooth inertia toward scroll target
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.12;
      const p = currentProgressRef.current;

      // Quantize to 24fps discrete steps (120 frames)
      const quantizedFrame = Math.min(TOTAL_FRAMES - 1, Math.round(p * (TOTAL_FRAMES - 1)));
      const qProgress = quantizedFrame / (TOTAL_FRAMES - 1);

      // Determine current and next keyframe indices
      let idx = 0;
      for (let i = STAGES.length - 1; i >= 0; i--) {
        if (qProgress >= STAGES[i].startAt) {
          idx = i;
          break;
        }
      }

      if (idx !== lastStage) {
        lastStage = idx;
        setActiveStageIdx(idx);
      }

      const nextIdx = Math.min(STAGES.length - 1, idx + 1);
      const currStage = STAGES[idx];
      const nextStage = STAGES[nextIdx];

      let blend = 0;
      if (idx !== nextIdx) {
        const span = nextStage.startAt - currStage.startAt;
        const rawBlend = span > 0 ? Math.min(Math.max((qProgress - currStage.startAt) / span, 0), 1) : 0;
        blend = easeInOutCubic(rawBlend);
      }

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.fillStyle = '#e9ecf3';
      ctx.fillRect(0, 0, w, h);

      // Draw current & next keyframes
      const currImg = imagesRef.current[idx];
      const nextImg = imagesRef.current[nextIdx];

      const interpZoom = currStage.zoom + (nextStage.zoom - currStage.zoom) * blend;
      const interpPanX = currStage.panX + (nextStage.panX - currStage.panX) * blend;
      const interpPanY = currStage.panY + (nextStage.panY - currStage.panY) * blend;

      if (currImg && currImg.complete && currImg.naturalWidth > 0) {
        drawHeroImage(currImg, 1 - blend * 0.85, interpZoom, interpPanX, interpPanY, w, h);
      }
      if (blend > 0.01 && nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
        drawHeroImage(nextImg, blend, interpZoom, interpPanX, interpPanY, w, h);
      }
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  const jumpToStage = (stageIndex) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const docTop = window.scrollY + rect.top;
    const scrollable = rect.height - window.innerHeight;
    const targetY = docTop + scrollable * STAGES[stageIndex].startAt;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setSubmitted(true);
  };

  const activeStage = STAGES[activeStageIdx] || STAGES[0];
  const isIntroVisible = activeStageIdx === 0;

  return (
    <section
      ref={trackRef}
      className="relative bg-[var(--surface-canvas)] h-[300vh] md:h-[380vh] border-b border-[var(--border-subtle)]"
    >
      {/* Sticky Full-Bleed Viewport */}
      <div className="sticky top-16 h-[calc(100dvh-4rem)] w-full overflow-hidden">
        {/* Background 24fps Scrubbed Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none"
          aria-label="Scroll-animated 3D exploded architectural villa showing home maintenance services"
        />

        {/* Soft Top Gradient Scrim so Hero Text stays 100% legible */}
        <div
          className={`absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[var(--surface-canvas)] via-[var(--surface-canvas)]/85 to-transparent pointer-events-none transition-opacity duration-500 ${
            isIntroVisible ? 'opacity-100' : 'opacity-30'
          }`}
        />

        {/* Foreground Content Container */}
        <div className="relative z-10 max-w-[1280px] mx-auto h-full px-4 sm:px-8 flex flex-col justify-between py-6 sm:py-8 pointer-events-none">
          {/* Top Hero Header & 2-Input Enquiry Bar (Fades subtly as user scrubs into rooms) */}
          <div
            className={`pointer-events-auto transition-[opacity,transform] duration-500 ${
              isIntroVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
          >
            <div className="max-w-3xl mx-auto text-center space-y-3.5">
              {/* Trust & Locality Pill */}
              <div className="inline-flex items-center justify-center">
                <div className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 px-3.5 py-1.5 rounded-full bg-[var(--surface-card)]/90 backdrop-blur-md border border-[var(--border-subtle)] shadow-[0_2px_8px_rgba(15,23,42,0.04)] text-xs sm:text-sm text-[var(--ink-secondary)]">
                  <span className="inline-flex items-center gap-1.5 font-medium text-[var(--ink-primary)]">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" strokeWidth={1} />
                    <span className="tabular-nums">4.8 / 5</span>
                    <span className="font-normal text-[var(--ink-secondary)]">from 353+ Google reviews</span>
                  </span>
                  <span className="hidden sm:inline w-1 h-1 rounded-full bg-[var(--border-strong)]" aria-hidden="true" />
                  <span className="inline-flex items-center gap-1.5 font-medium text-[var(--ink-secondary)]">
                    <MapPin className="w-3.5 h-3.5 text-[var(--ink-muted)]" strokeWidth={1.5} />
                    <span>Vejalpur, Ahmedabad</span>
                  </span>
                </div>
              </div>

              {/* Heading strictly untouched */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.1] text-[var(--ink-primary)]">
                Property maintenance and renovation in Ahmedabad
              </h1>

              {/* Elevated Subheading: high contrast, comfortable reading width, crisp typography */}
              <p className="text-sm sm:text-base md:text-[17px] text-[var(--ink-secondary)] leading-relaxed max-w-2xl mx-auto font-normal text-balance">
                Home Hancer Services is your premier partner for exceptional property maintenance and renovation in Ahmedabad.
              </p>
            </div>

            {/* Horizontal 2-Input Enquiry Bar */}
            <div className="max-w-3xl mx-auto mt-5">
              {submitted ? (
                <div className="bg-[var(--surface-card)]/95 backdrop-blur-md border border-[var(--border-subtle)] rounded-xl p-3.5 sm:px-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary-soft)] text-[var(--accent-primary)] flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-[var(--ink-primary)]">
                        Enquiry received for {selectedService.name}
                      </p>
                      <p className="text-[var(--ink-secondary)] tabular-nums text-xs">
                        We will contact {phone} during business hours (Monday–Saturday, 9am–8pm).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={`https://wa.me/919157691572?text=${encodeURIComponent(
                        `I want to know more about ${selectedService.name}. My mobile number is ${phone}.`
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
                  className="bg-[var(--surface-card)]/95 backdrop-blur-md border border-[var(--border-subtle)] rounded-xl p-2 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-2 items-center relative"
                >
                  {/* Custom Designed Service Dropdown Menu */}
                  <div className="md:col-span-5 relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full h-11 px-3.5 bg-[var(--surface-canvas)] md:bg-transparent text-sm font-medium text-[var(--ink-primary)] rounded-lg border border-[var(--border-subtle)] md:border-transparent hover:bg-[var(--surface-muted)] focus:bg-[var(--surface-card)] focus:border-[var(--border-strong)] focus:outline-none transition-all flex items-center justify-between gap-2 cursor-pointer"
                      aria-haspopup="listbox"
                      aria-expanded={isDropdownOpen}
                    >
                      <span className="flex items-center gap-2.5 truncate">
                        {React.createElement(selectedService.icon, {
                          className: 'w-4 h-4 text-[var(--accent-primary)] shrink-0',
                          strokeWidth: 1.75
                        })}
                        <span className="truncate">{selectedService.name}</span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[var(--ink-muted)] shrink-0 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180 text-[var(--ink-primary)]' : ''
                        }`}
                      />
                    </button>

                    {/* Popover Menu: Flows UPWARDS with elevated shadow */}
                    {isDropdownOpen && (
                      <div
                        role="listbox"
                        className="absolute left-0 bottom-full mb-2 w-full md:w-80 bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl py-2 z-[100] max-h-80 overflow-y-auto animate-in fade-in slide-in-from-bottom-2 duration-150"
                      >
                        <div className="px-3.5 py-1.5 text-xs font-semibold text-[var(--ink-muted)] border-b border-[var(--border-subtle)]/70 mb-1">
                          Choose service trade
                        </div>
                        {HERO_SERVICES.map((service) => {
                          const IconComp = service.icon;
                          const isSelected = selectedService.name === service.name;
                          return (
                            <button
                              key={service.name}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => {
                                setSelectedService(service);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full px-3.5 py-2.5 text-sm text-left flex items-center justify-between gap-2.5 transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[var(--accent-primary-soft)] text-[var(--accent-primary)] font-semibold'
                                  : 'text-[var(--ink-primary)] hover:bg-[var(--surface-muted)]'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                <IconComp
                                  className={`w-4 h-4 shrink-0 ${
                                    isSelected ? 'text-[var(--accent-primary)]' : 'text-[var(--ink-muted)]'
                                  }`}
                                  strokeWidth={1.75}
                                />
                                <span className="truncate">{service.name}</span>
                              </div>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                  isSelected
                                    ? 'bg-[var(--accent-primary)] text-white'
                                    : 'bg-[var(--surface-muted)] text-[var(--ink-muted)]'
                                }`}
                              >
                                {service.badge}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="hidden md:block md:col-span-1 h-5 w-px bg-[var(--border-subtle)] mx-auto" />

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

                  {/* High-Converting Clear CTA Button */}
                  <div className="md:col-span-3">
                    <button
                      type="submit"
                      className="w-full h-11 px-5 text-sm font-semibold text-white bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] active:scale-[0.98] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <span>Get Instant Quote</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </form>
              )}

              {/* Quick Actions & Operating Hours Trust Row */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm">
                <button
                  type="button"
                  onClick={() => onOpenBooking && onOpenBooking()}
                  className="h-9 px-4 rounded-xl text-xs font-semibold text-[var(--ink-primary)] bg-[var(--surface-card)] hover:bg-white backdrop-blur-md border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                >
                  <Wrench className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                  <span>Book Free Inspection</span>
                </button>

                <a
                  href={`https://wa.me/919157691572?text=${encodeURIComponent(
                    'Hello Home Hancer, I want to inquire about home maintenance and renovation services in Ahmedabad.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-4 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 backdrop-blur-md border border-emerald-200 transition-all flex items-center gap-1.5 shadow-xs active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/20" />
                  <span>WhatsApp Desk</span>
                </a>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[var(--surface-card)]/80 backdrop-blur-sm border border-[var(--border-subtle)] text-[var(--ink-secondary)] shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                  <span className="font-medium text-[var(--ink-primary)] text-xs">Mon–Sat, 9am–8pm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stage Switcher Dock & Room Info */}
          <div className="pointer-events-auto w-full max-w-4xl mx-auto pb-2 sm:pb-4">
            {isIntroVisible ? (
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto p-1.5 rounded-2xl bg-[var(--surface-card)]/90 backdrop-blur-md border border-[var(--border-subtle)] shadow-md mx-auto w-fit max-w-full">
                {STAGES.map((stg, idx) => {
                  const isActive = activeStageIdx === idx;
                  return (
                    <button
                      key={stg.id}
                      type="button"
                      onClick={() => jumpToStage(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[var(--accent-primary)] text-white font-semibold shadow-xs'
                          : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-muted)]'
                      }`}
                    >
                      <span>{stg.label}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="bg-[var(--surface-card)]/95 backdrop-blur-md border border-[var(--border-subtle)] rounded-2xl p-4 sm:px-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="text-center sm:text-left space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-[var(--ink-primary)]">
                    {activeStage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--ink-secondary)] max-w-lg leading-relaxed">
                    {activeStage.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onOpenBooking && onOpenBooking(activeStage.id)}
                    className="h-10 px-5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Book This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => jumpToStage(0)}
                    className="h-10 px-3.5 rounded-xl bg-[var(--surface-muted)] hover:bg-[var(--border-subtle)] text-[var(--ink-secondary)] text-xs font-medium transition-colors border border-[var(--border-subtle)] cursor-pointer"
                    title="Back to top overview"
                  >
                    Overview
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
