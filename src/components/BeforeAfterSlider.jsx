import React, { useState, useRef } from 'react';
import { 
  ArrowLeftRight, ShieldCheck, Clock, CheckCircle2, 
  MapPin, AlertCircle, Sparkles, ChevronRight, ArrowRight 
} from 'lucide-react';
import { BEFORE_AFTER_ITEMS } from '../data/transformationsData';

export default function BeforeAfterSlider({ onOpenBooking }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const containerRef = useRef(null);

  const activeProject = BEFORE_AFTER_ITEMS[activeProjectIdx];

  // Drag interaction support for mouse and touch
  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const offsetX = clientX - rect.left;
    const percent = Math.min(Math.max((offsetX / rect.width) * 100, 5), 95);
    setSliderPos(percent);
  };

  return (
    <section
      id="transformations"
      className="py-16 sm:py-24 bg-[var(--surface-canvas)] border-b border-[var(--border-subtle)] relative overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-10 sm:space-y-12">
        
        {/* ========================================================
            HEADER
           ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[var(--border-subtle)]">
          <div className="space-y-2.5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.1] text-[var(--ink-primary)]">
              Before vs. After Craftsmanship
            </h2>

            <p className="text-sm sm:text-base text-[var(--ink-secondary)] max-w-2xl leading-relaxed">
              Drag the interactive slider across this master renovation in Vejalpur, Ahmedabad to inspect our concealed structural plumbing and precision surface tile finish.
            </p>
          </div>

          {/* Single Verified Badge */}
          <div className="flex items-center gap-2">
            <div className="px-3.5 py-2 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)] text-xs font-medium text-[var(--ink-primary)] shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold">Vejalpur Villa Project</span>
              <span className="text-[var(--ink-muted)]">Master Bathroom Handover</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            MAIN WORKMANSHIP SHOWCASE STAGE
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Context & Technical Verification Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Title & Location Header */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] font-semibold uppercase tracking-wider">
                <span>{activeProject.category}</span>
                <span>•</span>
                <span className="text-[var(--ink-muted)] flex items-center gap-1 font-normal lowercase tracking-normal">
                  <MapPin className="w-3 h-3 text-[var(--ink-muted)]" />
                  {activeProject.locality}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[var(--ink-primary)]">
                {activeProject.title}
              </h3>
            </div>

            {/* Visual Contrast Cards (Before vs. After Comparison) */}
            <div className="space-y-3">
              {/* Original Condition Card (Red/Alert Cue) */}
              <div className="p-4 rounded-xl bg-[var(--surface-card)] border border-rose-200/80 shadow-[0_1px_3px_rgba(244,63,94,0.04)]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-5 h-5 rounded-md bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-rose-700 tracking-wide uppercase">
                    Initial Inspection (Before)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed pl-7">
                  {activeProject.beforeCondition}
                </p>
              </div>

              {/* Handover Quality Card (Emerald/Success Cue) */}
              <div className="p-4 rounded-xl bg-[var(--surface-card)] border border-emerald-200/80 shadow-[0_1px_3px_rgba(16,185,129,0.04)]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">
                    Engineered Handover (After)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--ink-primary)] font-medium leading-relaxed pl-7">
                  {activeProject.afterSolution}
                </p>
              </div>
            </div>

            {/* Spec & Timing Badges */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)]">
                <div className="flex items-center gap-1.5 text-xs text-[var(--ink-muted)] mb-0.5">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                  <span>Execution Speed</span>
                </div>
                <div className="text-sm font-semibold text-[var(--ink-primary)]">
                  {activeProject.timeTaken}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[var(--surface-card)] border border-[var(--border-subtle)]">
                <div className="flex items-center gap-1.5 text-xs text-[var(--ink-muted)] mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Protection</span>
                </div>
                <div className="text-sm font-semibold text-emerald-600">
                  {activeProject.warranty}
                </div>
              </div>
            </div>

            {/* Client Testimonial Snippet */}
            <div className="p-3.5 rounded-xl bg-[var(--surface-muted)]/70 border border-[var(--border-subtle)] text-xs text-[var(--ink-secondary)] italic">
              "{activeProject.clientQuote}"
            </div>

            {/* Direct Consultation Trigger */}
            <button
              type="button"
              onClick={() => onOpenBooking && onOpenBooking({ name: activeProject.title })}
              className="mayfly-btn w-full h-11 text-xs"
            >
              <span className="btn-txt flex items-center justify-center gap-2">
                <span>Book Free Inspection For Your Home</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          {/* RIGHT: Interactive Tactile Slider (7 Cols) */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-slate-900 shadow-xl select-none group touch-none cursor-ew-resize"
              onMouseMove={(e) => e.buttons === 1 && handlePointerMove(e)}
              onTouchMove={handlePointerMove}
            >
              {/* After Layer (Full Viewport) */}
              <img
                src={activeProject.afterImg}
                alt={`After ${activeProject.title}`}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />

              {/* After Floating Badge */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wide flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>AFTER COMPLETED WORK</span>
              </div>

              {/* Before Layer (Clipped by slider position) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10"
                style={{ width: `${sliderPos}%` }}
              >
                {/* Mirror Container to maintain proper image scaling */}
                <div
                  className="absolute inset-y-0 left-0 h-full"
                  style={{
                    width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%'
                  }}
                >
                  <img
                    src={activeProject.beforeImg}
                    alt={`Before ${activeProject.title}`}
                    className="w-full h-full object-cover filter contrast-[1.05] brightness-90"
                    draggable={false}
                  />
                </div>

                {/* Before Floating Badge */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wide flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>BEFORE INTERVENTION</span>
                </div>
              </div>

              {/* Tactile Splitter Handle */}
              <div
                className="absolute inset-y-0 z-30 pointer-events-none flex items-center justify-center"
                style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
              >
                {/* Vertical Divider Line with Glow */}
                <div className="w-0.5 h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />

                {/* Center Circular Grab Button */}
                <div className="absolute w-11 h-11 rounded-full bg-white text-[var(--ink-primary)] shadow-2xl flex items-center justify-center border-2 border-[var(--accent-primary)] group-hover:scale-105 transition-transform duration-150">
                  <ArrowLeftRight className="w-4 h-4 text-[var(--accent-primary)]" strokeWidth={2.5} />
                </div>
              </div>

              {/* Range Input for Instant Drag Interaction */}
              <input
                type="range"
                min="5"
                max="95"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
                aria-label="Drag to compare before and after craftsmanship"
              />

              {/* Drag Prompt Hint Pill */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/90 text-[11px] font-medium tracking-wide pointer-events-none flex items-center gap-1.5">
                <ArrowLeftRight className="w-3 h-3 text-white" />
                <span>Drag to compare workmanship</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
