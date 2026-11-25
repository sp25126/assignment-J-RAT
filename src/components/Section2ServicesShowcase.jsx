import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Play, Pause, MapPin, ShieldCheck, 
  ArrowRight, Clock, CheckCircle2, MessageCircle, Droplets, 
  Snowflake, Zap, Hammer, Paintbrush, Bath, Sparkles, SlidersHorizontal,
  Search, X, Flame
} from 'lucide-react';
import { REAL_GALLERY } from '../data/galleryData';
import { POPULAR_SERVICES, SERVICE_CATEGORIES } from '../data/servicesData';
import HairlineCardBackdrop from './HairlineCardBackdrop';

const BEST_RECOMMENDATIONS = [
  { label: 'Tap Leakage', query: 'tap' },
  { label: 'AC Jet Wash', query: 'ac' },
  { label: 'Switchboard Wiring', query: 'switch' },
  { label: 'Modular Kitchen', query: 'kitchen' },
  { label: 'Wall Dampness', query: 'waterproofing' },
  { label: 'Bathroom Tiles', query: 'bath' }
];

export default function Section2ServicesShowcase({ onOpenBooking, onSelectService }) {
  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Autoplay Timer (4.5s)
  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % REAL_GALLERY.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying, isHovered]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? REAL_GALLERY.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % REAL_GALLERY.length);
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const activeProject = REAL_GALLERY[currentSlide];

  // Combined Search & Category Filter
  const filteredServices = POPULAR_SERVICES.filter((s) => {
    const matchesCategory = activeCategory === 'all' || s.category === activeCategory;
    if (!matchesCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      (s.features && s.features.some((f) => f.toLowerCase().includes(q)))
    );
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'plumbing': return <Droplets className="w-4 h-4 text-blue-600" />;
      case 'ac': return <Snowflake className="w-4 h-4 text-cyan-600" />;
      case 'electrical': return <Zap className="w-4 h-4 text-amber-500" />;
      case 'carpentry': return <Hammer className="w-4 h-4 text-amber-700" />;
      case 'painting': return <Paintbrush className="w-4 h-4 text-rose-600" />;
      case 'renovation': return <Bath className="w-4 h-4 text-emerald-600" />;
      default: return <ShieldCheck className="w-4 h-4 text-[var(--accent-primary)]" />;
    }
  };

  return (
    <section
      id="services-section"
      className="py-16 sm:py-24 bg-[var(--surface-canvas)] border-b border-[var(--border-subtle)] relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-16 sm:space-y-20">
        
        {/* ========================================================
            PART 1: SECTION HEADER
            "Engineered Home Services & Repairs"
           ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--border-subtle)]">
          <div className="space-y-2.5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.1] text-[var(--ink-primary)]">
              Engineered Home Services & Repairs
            </h2>
            
            <p className="text-sm sm:text-base text-[var(--ink-secondary)] max-w-2xl leading-relaxed">
              No vague quotes. Every service is backed by fixed transparent rates, genuine diagnostic tools, and authentic proof of on-site execution across Ahmedabad.
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] text-right">
              <div className="text-xs text-[var(--ink-muted)]">Fixed Rates</div>
              <div className="text-sm font-semibold text-[var(--ink-primary)]">From ₹149</div>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] text-right">
              <div className="text-xs text-[var(--ink-muted)]">Warranty</div>
              <div className="text-sm font-semibold text-emerald-600">30-Day Guarantee</div>
            </div>
          </div>
        </div>

        {/* ========================================================
            PART 2: REAL ON-SITE CRAFTSMANSHIP CAROUSEL (AUTOPLAYING)
            Context-Aware Verified Project Work with Smooth Scrubbing
           ======================================================== */}
        <div
          className="space-y-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Carousel Controls */}
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-8 px-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] text-xs font-medium text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:border-[var(--border-strong)] flex items-center gap-1.5 transition-colors cursor-pointer"
              title={isPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
              <span className="hidden sm:inline">{isPlaying ? 'Autoplaying' : 'Paused'}</span>
            </button>

            <div className="h-4 w-px bg-[var(--border-subtle)] mx-1" />

            <button
              type="button"
              onClick={handlePrev}
              className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:border-[var(--border-strong)] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:border-[var(--border-strong)] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Featured Stage (Slider Card) */}
          <div
            className="relative bg-[var(--surface-card)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden shadow-sm"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] sm:min-h-[460px]">
              {/* Visual Image Viewport */}
              <div className="lg:col-span-8 relative bg-slate-900 aspect-[16/10] lg:aspect-auto overflow-hidden">
                {REAL_GALLERY.map((project, idx) => (
                  <div
                    key={project.name}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      idx === currentSlide
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-[1.02] pointer-events-none z-0'
                    }`}
                  >
                    <img
                      src={project.src}
                      alt={project.title}
                      className="w-full h-full object-cover object-center"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none lg:hidden" />
                  </div>
                ))}

                {/* Mobile Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 text-white lg:hidden">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium mb-1">
                    {activeProject.category}
                  </span>
                  <h3 className="text-base font-semibold drop-shadow-sm">{activeProject.title}</h3>
                </div>
              </div>

              {/* Sidebar Info & Booking Trigger */}
              <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-[var(--surface-card)]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
                      {activeProject.category}
                    </span>
                    <span className="text-xs font-mono tabular-nums text-[var(--ink-muted)]">
                      {String(currentSlide + 1).padStart(2, '0')} / {String(REAL_GALLERY.length).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-[var(--ink-primary)]">
                    {activeProject.title}
                  </h3>

                  <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
                    {activeProject.desc}
                  </p>

                  <div className="pt-1 flex items-center gap-2 text-xs text-[var(--ink-muted)]">
                    <MapPin className="w-3.5 h-3.5 text-[var(--ink-muted)]" strokeWidth={1.5} />
                    <span>Vejalpur & West Ahmedabad</span>
                  </div>
                </div>

                {/* CTA Action & Progress Indicator */}
                <div className="pt-6 space-y-4 border-t border-[var(--border-subtle)]">
                  <button
                    type="button"
                    onClick={() => onOpenBooking && onOpenBooking({ name: activeProject.title })}
                    className="mayfly-btn w-full h-11 text-xs"
                  >
                    <span className="btn-txt flex items-center justify-center gap-1.5">
                      <span>Book Service for This Trade</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  {/* Autoplay Micro Bar */}
                  <div className="flex items-center gap-1.5">
                    {REAL_GALLERY.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentSlide(idx)}
                        className="flex-1 h-1.5 rounded-full overflow-hidden bg-[var(--surface-muted)] transition-all cursor-pointer relative"
                        aria-label={`Jump to slide ${idx + 1}`}
                      >
                        <span
                          className={`absolute inset-0 bg-[var(--accent-primary)] transition-all ${
                            idx === currentSlide
                              ? isPlaying && !isHovered
                                ? 'w-full duration-[4500ms] ease-linear'
                                : 'w-full'
                              : 'w-0'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick-Scrub Thumbnails */}
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
            {REAL_GALLERY.map((project, idx) => (
              <button
                key={project.name}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  idx === currentSlide
                    ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary-soft)] opacity-100 scale-100'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                title={project.title}
              >
                <img
                  src={project.src}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================
            PART 3: SEARCH & EXPLORE CATALOG (HIGH READABILITY & RECCOMENDATIONS)
            Structured Pricing & Transparent Same-Day Booking
           ======================================================== */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
            <div className="space-y-1.5 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[var(--ink-primary)]">
                Instant Search & Certified Trade Directory
              </h3>
              <p className="text-xs sm:text-sm text-[var(--ink-secondary)]">
                Search repairs by problem (e.g., tap leak, AC cooling, switchboard, dampness) or click quick recommendations.
              </p>
            </div>

            {/* Smart Search Bar */}
            <div className="w-full lg:w-96 relative">
              <label htmlFor="service-search-input" className="sr-only">
                Search services and repairs
              </label>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-[var(--ink-muted)] absolute left-3.5 pointer-events-none" />
                <input
                  id="service-search-input"
                  type="text"
                  placeholder="Search repairs (e.g. tap, ac jet, tiles)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-10 pr-9 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] focus:border-[var(--accent-primary)] text-sm text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] focus:outline-none transition-colors shadow-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 p-1 rounded-full text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Recommendations & Category Filter Pills */}
          <div className="space-y-3 pt-1">
            {/* Top Recommendations Row */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-[var(--ink-muted)] flex items-center gap-1 shrink-0">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Popular Searches:</span>
              </span>
              {BEST_RECOMMENDATIONS.map((rec) => {
                const isSelected = searchQuery.toLowerCase() === rec.query.toLowerCase();
                return (
                  <button
                    key={rec.label}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setSearchQuery('');
                      } else {
                        setSearchQuery(rec.query);
                        setActiveCategory('all');
                      }
                    }}
                    className={`px-2.5 py-1 rounded-full text-xs transition-colors cursor-pointer border ${
                      isSelected
                        ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)] font-medium shadow-sm'
                        : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:border-[var(--border-strong)] border-[var(--border-subtle)]'
                    }`}
                  >
                    {rec.label}
                  </button>
                );
              })}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[var(--accent-primary)] hover:underline ml-1 cursor-pointer font-medium"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Standard Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {SERVICE_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                      isActive
                        ? 'bg-[var(--surface-card)] text-[var(--accent-primary)] border-[var(--accent-primary)] font-semibold shadow-sm'
                        : 'bg-[var(--surface-card)]/70 text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] border-[var(--border-subtle)] hover:bg-[var(--surface-card)]'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid with Spicy Rat 83 Inset Border Animation */}
          {filteredServices.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-3">
              <p className="text-sm text-[var(--ink-secondary)]">
                No services found matching "<span className="font-semibold text-[var(--ink-primary)]">{searchQuery}</span>".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 rounded-lg bg-[var(--accent-primary)] text-white text-xs font-medium cursor-pointer"
              >
                View all available services
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="spicy-card p-6 flex flex-col justify-between group relative"
              >
                {/* Hairline Interactive Isometric Blueprint Hover Effect */}
                <HairlineCardBackdrop category={service.category} />

                {/* Spicy Rat 83 Animated Rotating Border */}
                <div className="spicy-border" aria-hidden="true" />
                <span className="spicy-bottom-text" aria-hidden="true">Verified Service</span>

                <div className="relative z-10">
                  {/* Category Icon & Arrival Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--surface-muted)] flex items-center justify-center border border-[var(--border-subtle)]">
                      {getCategoryIcon(service.category)}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-[var(--ink-primary)] bg-[var(--surface-muted)] border border-[var(--border-subtle)] px-2.5 py-0.5 rounded-full">
                      <Clock className="w-3 h-3 text-[var(--accent-primary)]" />
                      <span>{service.time}</span>
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-[var(--ink-primary)] mb-1.5 group-hover:text-[var(--accent-primary)] transition-colors">
                    {service.name}
                  </h4>
                  <p className="text-xs text-[var(--ink-secondary)] leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <ul className="space-y-1.5 mb-6">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[var(--ink-secondary)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Action Row */}
                <div className="pt-4 border-t border-[var(--border-subtle)] relative z-10">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-[11px] font-medium text-[var(--ink-muted)]">Starting Rate</span>
                    <span className="text-lg font-bold text-[var(--ink-primary)] tabular-nums">
                      {service.price}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectService && onSelectService(service)}
                      className="w-full py-2.5 px-3 text-xs font-medium rounded-lg text-white bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm active:scale-[0.98]"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <a
                      href={`https://wa.me/919157691572?text=${encodeURIComponent(`Hello Home Hancer, I want to inquire about ${service.name} (Starting ${service.price}) in Ahmedabad.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 text-xs font-medium text-[var(--ink-primary)] hover:text-[var(--accent-primary)] bg-[var(--surface-muted)] hover:bg-[var(--surface-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] rounded-lg transition-all flex items-center justify-center gap-1 active:scale-[0.98]"
                    >
                      <MessageCircle className="w-3 h-3 text-emerald-600 fill-emerald-600/20" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
