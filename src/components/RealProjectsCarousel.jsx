import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { REAL_GALLERY } from '../data/galleryData';

export default function RealProjectsCarousel({ onOpenBooking }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  // Autoplay timer (4 seconds per slide, pauses on hover or user pause toggle)
  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REAL_GALLERY.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, isHovered]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REAL_GALLERY.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REAL_GALLERY.length);
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const activeProject = REAL_GALLERY[currentIndex];

  return (
    <section
      id="portfolio"
      className="py-14 sm:py-20 bg-[var(--surface-canvas)] border-b border-[var(--border-subtle)] relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-muted)] text-xs font-medium text-[var(--ink-secondary)] mb-3 border border-[var(--border-subtle)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-primary)]" strokeWidth={1.75} />
              <span>Real Work in Ahmedabad</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.03em] text-[var(--ink-primary)]">
              Executed projects across residential & commercial spaces
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--ink-secondary)] max-w-2xl leading-relaxed">
              Authentic on-site craftsmanship captured from verified renovations, modular installations, and property maintenance in Vejalpur and greater Ahmedabad.
            </p>
          </div>

          {/* Autoplay & Navigation Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:border-[var(--border-strong)] flex items-center justify-center transition-colors cursor-pointer"
              title={isPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
              aria-label={isPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <div className="h-4 w-px bg-[var(--border-subtle)] mx-1" />
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:border-[var(--border-strong)] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:border-[var(--border-strong)] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next Project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Showcase Stage (Autoplaying Slider) */}
        <div
          className="relative bg-[var(--surface-card)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden shadow-sm"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] sm:min-h-[480px]">
            {/* Visual Frame */}
            <div className="lg:col-span-8 relative bg-slate-900 aspect-[16/10] lg:aspect-auto overflow-hidden">
              {REAL_GALLERY.map((project, idx) => (
                <div
                  key={project.name}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    idx === currentIndex
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-0 scale-[1.03] pointer-events-none z-0'
                  }`}
                >
                  <img
                    src={project.src}
                    alt={project.title}
                    className="w-full h-full object-cover object-center"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                  {/* Subtle Gradient Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none lg:hidden" />
                </div>
              ))}

              {/* Mobile Project Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 text-white lg:hidden">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium mb-1">
                  {activeProject.category}
                </span>
                <h3 className="text-lg font-semibold drop-shadow-sm">{activeProject.title}</h3>
              </div>
            </div>

            {/* Project Details Sidebar */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-[var(--surface-card)]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
                    {activeProject.category}
                  </span>
                  <span className="text-xs font-mono tabular-nums text-[var(--ink-muted)]">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(REAL_GALLERY.length).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-[var(--ink-primary)]">
                  {activeProject.title}
                </h3>

                <p className="text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
                  {activeProject.desc}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs text-[var(--ink-muted)]">
                  <MapPin className="w-3.5 h-3.5 text-[var(--ink-muted)]" strokeWidth={1.5} />
                  <span>Vejalpur & West Ahmedabad</span>
                </div>
              </div>

              {/* Action & Autoplay Progress Bar */}
              <div className="pt-6 space-y-4 border-t border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={() => onOpenBooking && onOpenBooking({ name: activeProject.title })}
                  className="w-full py-2.5 px-4 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Enquire for similar work</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Autoplay Visual Progress Bar */}
                <div className="flex items-center gap-1.5">
                  {REAL_GALLERY.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className="flex-1 h-1.5 rounded-full overflow-hidden bg-[var(--surface-muted)] transition-all cursor-pointer relative"
                      aria-label={`Jump to slide ${idx + 1}`}
                    >
                      <span
                        className={`absolute inset-0 bg-[var(--accent-primary)] transition-all ${
                          idx === currentIndex
                            ? isPlaying && !isHovered
                              ? 'w-full duration-[4000ms] ease-linear'
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

        {/* Thumbnail Strip */}
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 overflow-x-auto pb-1">
          {REAL_GALLERY.map((project, idx) => (
            <button
              key={project.name}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary-soft)] opacity-100 scale-100'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
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
    </section>
  );
}
