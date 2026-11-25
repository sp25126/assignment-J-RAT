import React, { useState, useEffect, useRef } from 'react';
import { 
  Snowflake, Droplets, Zap, Hammer, Bath, Utensils, 
  Clock, ShieldCheck, ArrowRight, MessageCircle, Eye, Maximize2 
} from 'lucide-react';

export default function InteractiveHouseServices({ onOpenBooking }) {
  const [activeServiceId, setActiveServiceId] = useState('ac');
  const [isZoomed, setIsZoomed] = useState(true);

  const SERVICES = [
    {
      id: 'ac',
      title: 'Air Conditioning & Cooling',
      room: 'UPPER LEVEL // BEDROOM & ATTIC DUCTING',
      price: '₹499',
      marketPrice: '₹950',
      time: '45 mins arrival',
      warranty: '30-Day Warranty',
      icon: Snowflake,
      accentColor: '#00e5ff',
      tag: 'SUMMER ESSENTIAL',
      zoomConfig: { scale: 2.3, x: -22, y: 32 },
      pinPos: { left: '72%', top: '22%' },
      description: 'High-pressure foam jet wash, filter sterilisation, condenser coil descaling, and R32/R410 gas pressure diagnostics.',
      inclusions: [
        'Restores cooling airflow by up to 40%',
        'Lowers monthly electricity consumption',
        'Anti-bacterial coil disinfectant spray'
      ]
    },
    {
      id: 'bathroom',
      title: 'Bathroom Remodeling & Sanitary',
      room: 'UPPER LEVEL // MASTER ATELIER ENSUITE',
      price: '₹149 / Free Quote',
      marketPrice: '₹350+',
      time: 'Same day inspection',
      warranty: '10-Year Water Bond',
      icon: Bath,
      accentColor: '#10b981',
      tag: 'ZERO LEAKAGE',
      zoomConfig: { scale: 2.4, x: 22, y: 32 },
      pinPos: { left: '26%', top: '20%' },
      description: 'Diverter valve repair, concealed Grohe/Kohler plumbing line testing, Italian tile grouting, and luxury sanitaryware installation.',
      inclusions: [
        'Ultrasonic acoustic leak detection',
        'Pressure balanced thermostatic fixtures',
        'Anti-skid vitrified slab alignment'
      ]
    },
    {
      id: 'electrical',
      title: 'Electrical Diagnostics & Wiring',
      room: 'MID LEVEL // OFFICE & DISTRIBUTION CORE',
      price: '₹199',
      marketPrice: '₹450',
      time: '45 mins arrival',
      warranty: '30-Day Warranty',
      icon: Zap,
      accentColor: '#f59e0b',
      tag: 'SAFETY CERTIFIED',
      zoomConfig: { scale: 2.4, x: 22, y: 2 },
      pinPos: { left: '28%', top: '50%' },
      description: 'Short-circuit isolation, MCB tripping resolution, heavy appliance wiring, smart touch switchboards, and chandelier mounting.',
      inclusions: [
        'Certified A-grade licensed electricians',
        'Megger insulation resistance audit',
        'Zero-shock hazard safety guarantee'
      ]
    },
    {
      id: 'carpentry',
      title: 'Carpentry & Architectural Woodwork',
      room: 'MID LEVEL // LIVING ROOM & WALL PANELS',
      price: '₹249',
      marketPrice: '₹500',
      time: '1 hour arrival',
      warranty: '30-Day Warranty',
      icon: Hammer,
      accentColor: '#f97316',
      tag: 'MASTER CRAFT',
      zoomConfig: { scale: 2.4, x: -22, y: 2 },
      pinPos: { left: '72%', top: '50%' },
      description: 'Modular sliding wardrobe alignment, Häfele/Blum hydraulic soft-close hinges, fluted acoustic wooden paneling, and smart locks.',
      inclusions: [
        'Laser-guided vertical alignment',
        'Concealed hardware fitting',
        'Zero scratch / dust-free execution'
      ]
    },
    {
      id: 'utility',
      title: 'Plumbing & Water Heaters',
      room: 'GROUND LEVEL // UTILITY & DRAINAGE',
      price: '₹149',
      marketPrice: '₹400',
      time: '45 mins arrival',
      warranty: '30-Day Warranty',
      icon: Droplets,
      accentColor: '#3b82f6',
      tag: 'RAPID REPAIR',
      zoomConfig: { scale: 2.4, x: 22, y: -26 },
      pinPos: { left: '28%', top: '78%' },
      description: 'Geyser installation, clogged drain unclogging, washing machine inlet plumbing, sink trap replacement, and booster pumps.',
      inclusions: [
        'High-flow descaling of heating elements',
        'Heavy-duty brass valve replacement',
        'Free post-repair pressure verification'
      ]
    },
    {
      id: 'kitchen',
      title: 'Modular Kitchen Repairs',
      room: 'GROUND LEVEL // KITCHEN & DINING',
      price: '₹299 / Estimate',
      marketPrice: '₹650',
      time: 'Same day',
      warranty: '30-Day Warranty',
      icon: Utensils,
      accentColor: '#ccff00',
      tag: 'PRECISION FIT',
      zoomConfig: { scale: 2.4, x: -22, y: -26 },
      pinPos: { left: '72%', top: '78%' },
      description: 'Chimney ducting, under-sink RO water purifier plumbing, drawer channel realignment, and countertop leak sealing.',
      inclusions: [
        'Rust-proof stainless steel fittings',
        'Food-safe silicone waterproofing',
        'Smooth gliding hydraulic calibration'
      ]
    }
  ];

  const currentService = SERVICES.find(s => s.id === activeServiceId) || SERVICES[0];

  const currentTransform = isZoomed
    ? `scale(${currentService.zoomConfig.scale}) translate(${currentService.zoomConfig.x}%, ${currentService.zoomConfig.y}%)`
    : 'scale(1) translate(0%, 0%)';

  return (
    <section id="services-3d" className="py-20 px-4 sm:px-8 bg-[#121316] text-[#f6f5f0] border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="text-[11px] font-mono text-[#ccff00] uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
              <span>INTERACTIVE 3D VILLA CROSS-SECTION // ZONE ZOOM ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
              Services From The Best Property Maintenance in Ahmedabad
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-bold uppercase rounded-lg border border-white/20 bg-[#1a1c21] hover:bg-[#252830] text-white transition-all cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>{isZoomed ? 'View Whole House' : 'Re-Zoom Room'}</span>
            </button>
          </div>
        </div>

        {/* Quick Room Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
          <button
            onClick={() => setIsZoomed(false)}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
              !isZoomed
                ? 'bg-[#ccff00] text-[#121316]'
                : 'bg-[#1a1c21] text-[#a0a4b0] hover:text-white border border-white/10'
            }`}
          >
            🏠 Whole Villa Overview
          </button>
          {SERVICES.map((serv) => {
            const Icon = serv.icon;
            const isActive = isZoomed && activeServiceId === serv.id;
            return (
              <button
                key={serv.id}
                onClick={() => {
                  setActiveServiceId(serv.id);
                  setIsZoomed(true);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#ccff00] text-[#121316] shadow-md'
                    : 'bg-[#1a1c21] text-[#a0a4b0] hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{serv.title}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive 3D Zoom Cross-Section Canvas & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          {/* Left Column: 3D Cross-Section Stage with Dynamic Camera Zoom (7 Cols) */}
          <div className="lg:col-span-7 bg-[#1a1c21] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
            {/* Viewport Top Telemetry */}
            <div className="p-3 bg-[#0f1013] border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-[#a0a4b0]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span>
                <span className="text-white font-semibold">CAMERA: {isZoomed ? currentService.room : 'FULL CROSS-SECTION 1.0X'}</span>
              </div>
              <span className="text-[#ccff00]">AHMEDABAD ARCHITECTURAL SPEC</span>
            </div>

            {/* Cross-Section Visualizer Viewport */}
            <div className="relative h-[420px] sm:h-[480px] overflow-hidden bg-[#f4f3ee] flex items-center justify-center">
              {/* House Cross-Section Container with Smooth Zoom & Pan Transform */}
              <div
                className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none"
                style={{
                  transform: currentTransform,
                  transformOrigin: 'center center'
                }}
              >
                <img
                  src="/assets/3d-house-cross-section.png"
                  alt="Modern minimalist house cross-section 3D floor plan"
                  className="max-w-none w-[100%] h-auto object-contain block mx-auto pointer-events-none"
                />

                {/* Interactive Diagnostic Glowing Hotspot Pins across the House */}
                {SERVICES.map((serv) => {
                  const isCurrent = activeServiceId === serv.id;
                  return (
                    <div
                      key={serv.id}
                      onClick={() => {
                        setActiveServiceId(serv.id);
                        setIsZoomed(true);
                      }}
                      style={{
                        position: 'absolute',
                        left: serv.pinPos.left,
                        top: serv.pinPos.top,
                        transform: 'translate(-50%, -50%)',
                        cursor: 'pointer'
                      }}
                      className="group z-30 pointer-events-auto"
                    >
                      <div className="relative flex items-center justify-center">
                        <span 
                          className={`absolute w-8 h-8 rounded-full opacity-75 animate-ping`}
                          style={{ backgroundColor: serv.accentColor }}
                        ></span>
                        <div 
                          className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                            isCurrent ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'
                          }`}
                          style={{ backgroundColor: serv.accentColor, color: '#121316' }}
                        >
                          <serv.icon className="w-3.5 h-3.5 fill-current" />
                        </div>

                        {/* Hover Tooltip on Pin */}
                        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-[#121316] text-white text-[10px] font-mono px-2 py-1 rounded whitespace-nowrap shadow-xl border border-white/20">
                          {serv.title} — {serv.price}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Viewport Overlay HUD Grid Lines */}
              <div className="absolute inset-0 border-2 border-white/20 pointer-events-none"></div>
              
              {/* Active Zone Label Overlay in Viewport */}
              <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono">
                <span className="text-[#a0a4b0] block text-[10px]">CURRENT CAMERA FOCUS:</span>
                <span className="text-[#ccff00] font-bold">{isZoomed ? currentService.title : 'Full House Overview'}</span>
              </div>
            </div>

            {/* Stage Bottom Instruction */}
            <div className="p-3 bg-[#0f1013] border-t border-white/10 flex items-center justify-between text-xs text-[#a0a4b0] font-mono">
              <span>Click any service tab or glowing pin to zoom directly into that maintenance room</span>
              <span className="text-white/60">3D Architecture Layer</span>
            </div>
          </div>

          {/* Right Column: Dynamic Room Diagnostic & Booking Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#1a1c21] border border-white/15 rounded-2xl p-6 sm:p-7 shadow-2xl relative space-y-6">
            {/* Room Telemetry Eyebrow */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-[#ccff00] tracking-wider uppercase">
                {currentService.room}
              </span>
              <span className="text-[10px] font-mono font-bold bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/30 px-2 py-0.5 rounded">
                {currentService.tag}
              </span>
            </div>

            {/* Service Title */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {currentService.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#a0a4b0] mt-2 leading-relaxed font-normal">
                {currentService.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="bg-[#121316] border border-white/10 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-[#a0a4b0] uppercase block">Certified Starting Rate</span>
                <span className="text-2xl font-extrabold text-white font-display">
                  {currentService.price}
                </span>
                <span className="text-[11px] font-mono text-rose-400 line-through block mt-0.5">
                  Market Avg: {currentService.marketPrice}
                </span>
              </div>
              <div className="text-right font-mono">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#121316] bg-[#ccff00] px-2.5 py-0.5 rounded">
                  <Clock className="w-3 h-3" />
                  {currentService.time}
                </span>
                <span className="text-[11px] text-emerald-400 flex items-center justify-end gap-1 mt-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {currentService.warranty}
                </span>
              </div>
            </div>

            {/* Service Scope Inclusions */}
            <div>
              <span className="text-xs font-mono font-bold text-white uppercase block mb-3">
                Included in This Service Visit:
              </span>
              <ul className="space-y-2">
                {currentService.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#a0a4b0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] mt-1.5 shrink-0"></span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-3">
              <button
                onClick={() => onOpenBooking(currentService)}
                className="w-full py-3.5 px-4 bg-[#ccff00] hover:bg-[#b8e600] active:scale-99 text-[#121316] font-mono font-bold text-xs uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>Dispatch Technician for {currentService.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/919157691572?text=${encodeURIComponent(
                  `Hello Home Hancer, I am viewing the 3D Villa Cross-Section. I need to book ${currentService.title} (${currentService.room}) in Ahmedabad. Starting price: ${currentService.price}. Please confirm technician ETA.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#121316] hover:bg-black text-white font-mono font-bold text-xs uppercase rounded-xl flex items-center justify-center gap-2 border border-white/20 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#ccff00] fill-current" />
                <span>WhatsApp 1-Click Fast Track</span>
              </a>
            </div>

            {/* Local Ahmedabad Guarantee */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#a0a4b0] pt-3 border-t border-white/10">
              <span>Vejalpur & Prahlad Nagar Fleet</span>
              <span>•</span>
              <span className="text-white">Pay After Inspection</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
