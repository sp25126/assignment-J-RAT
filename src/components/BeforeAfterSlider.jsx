import React, { useState } from 'react';
import { ArrowLeftRight, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { BEFORE_AFTER_ITEMS } from '../data/servicesData';

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const activeProject = BEFORE_AFTER_ITEMS[activeProjectIdx];

  return (
    <section id="transformations" className="py-20 px-4 sm:px-8 bg-[#121316] text-[#f6f5f0] border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="text-[11px] font-mono text-[#ccff00] uppercase tracking-wider mb-2">
              REAL TRANSFORMATIONS // AHMEDABAD PORTFOLIO
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Before vs. After Craftsmanship
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {BEFORE_AFTER_ITEMS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveProjectIdx(idx)}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold uppercase transition-all ${
                  activeProjectIdx === idx
                    ? 'bg-[#ccff00] text-[#121316]'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Project 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Project Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 items-center">
          {/* Left Metadata & Details (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs font-mono text-[#ccff00] uppercase tracking-wider">
              {activeProject.category}
            </span>
            <h3 className="text-2xl font-bold text-white font-display">
              {activeProject.title}
            </h3>

            {/* Before Diagnostic */}
            <div className="bg-[#1a1c21] border border-white/10 p-4 rounded-xl">
              <span className="text-[11px] font-mono text-rose-400 font-bold block mb-1">
                ORIGINAL CONDITION (BEFORE):
              </span>
              <p className="text-xs text-white/70 leading-relaxed">
                {activeProject.beforeText}
              </p>
            </div>

            {/* After Solution */}
            <div className="bg-[#1a1c21] border border-[#ccff00]/30 p-4 rounded-xl">
              <span className="text-[11px] font-mono text-[#ccff00] font-bold block mb-1">
                HOME HANCER EXECUTION (AFTER):
              </span>
              <p className="text-xs text-white/90 leading-relaxed font-medium">
                {activeProject.afterText}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-[#a0a4b0]">
              <span className="flex items-center gap-1.5 text-white">
                <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                {activeProject.timeTaken}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#ccff00]">
                <ShieldCheck className="w-3.5 h-3.5" />
                {activeProject.savings}
              </span>
            </div>
          </div>

          {/* Right Interactive Comparison Visualizer (8 Cols) */}
          <div className="lg:col-span-8">
            <div className="relative h-[380px] sm:h-[460px] rounded-2xl overflow-hidden border border-white/15 bg-black select-none shadow-2xl">
              {/* After Layer (Background) */}
              <div 
                className="absolute inset-0 bg-cover bg-center flex items-center justify-center p-8 text-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(18, 19, 22, 0.4), rgba(18, 19, 22, 0.6)), url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80')`
                }}
              >
                <div className="bg-black/75 backdrop-blur-md border border-[#ccff00]/40 p-6 rounded-xl max-w-md">
                  <span className="text-[10px] font-mono text-[#ccff00] font-bold uppercase tracking-widest block mb-1">
                    AFTER COMPLETED MAKEOVER
                  </span>
                  <h4 className="text-white font-bold text-lg">Pristine Engineered Finish</h4>
                  <p className="text-xs text-white/80 mt-1">
                    Concealed piping, Italian tile layout, seamless grouting & zero leaks.
                  </p>
                </div>
              </div>

              {/* Before Layer (Clipped Foreground) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden bg-cover bg-center border-r-2 border-[#ccff00]"
                style={{
                  width: `${sliderPos}%`,
                  backgroundImage: `linear-gradient(rgba(18, 19, 22, 0.6), rgba(18, 19, 22, 0.8)), url('https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80')`
                }}
              >
                <div className="absolute top-6 left-6 bg-black/85 px-3 py-1.5 rounded border border-white/20 text-xs font-mono font-bold text-rose-400">
                  BEFORE INTERVENTION
                </div>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute inset-y-0 flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-10 h-10 rounded-full bg-[#ccff00] text-[#121316] flex items-center justify-center shadow-lg pointer-events-auto cursor-ew-resize">
                  <ArrowLeftRight className="w-5 h-5" />
                </div>
              </div>

              {/* Range Input Slider (Overlay) */}
              <input
                type="range"
                min="5"
                max="95"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                aria-label="Drag to compare before and after"
              />

              {/* Hint badge */}
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur px-3 py-1 rounded text-[11px] font-mono text-white/70 pointer-events-none">
                DRAG SLIDER TO COMPARE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
