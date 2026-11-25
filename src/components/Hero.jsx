import React, { useState, useRef, useEffect } from 'react';
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
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  const trackRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

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

    const drawCoverImage = (img, alpha, zoom, panX, panY, w, h) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      ctx.save();
      ctx.globalAlpha = alpha;

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = w / h;

      let drawW, drawH;
      if (canvasRatio > imgRatio) {
        drawW = w * zoom;
        drawH = (w / imgRatio) * zoom;
      } else {
        drawH = h * zoom;
        drawW = h * imgRatio * zoom;
      }

      const dx = (w - drawW) / 2 + panX * w;
      const dy = (h - drawH) / 2 + panY * h;
      ctx.drawImage(img, dx, dy, drawW, drawH);
      ctx.restore();
    };

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
        blend = span > 0 ? Math.min(Math.max((qProgress - currStage.startAt) / span, 0), 1) : 0;
      }

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, w, h);

      // Draw current keyframe with subtle zoom/pan progression
      const currImg = imagesRef.current[idx];
      const nextImg = imagesRef.current[nextIdx];

      const interpZoom = currStage.zoom + (nextStage.zoom - currStage.zoom) * blend;
      const interpPanX = currStage.panX + (nextStage.panX - currStage.panX) * blend;
      const interpPanY = currStage.panY + (nextStage.panY - currStage.panY) * blend;

      if (currImg && currImg.complete && currImg.naturalWidth > 0) {
        drawCoverImage(currImg, 1 - blend * 0.85, interpZoom, interpPanX, interpPanY, w, h);
      }
      if (blend > 0.01 && nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
        drawCoverImage(nextImg, blend, interpZoom, interpPanX, interpPanY, w, h);
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
      className="relative bg-[var(--surface-canvas)] h-[420vh] border-b border-[var(--border-subtle)]"
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
          className={`absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[var(--surface-canvas)]/95 via-[var(--surface-canvas)]/75 to-transparent pointer-events-none transition-opacity duration-500 ${
            isIntroVisible ? 'opacity-100' : 'opacity-40'
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
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <div className="inline-flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[var(--ink-secondary)]">
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

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.1] text-[var(--ink-primary)]">
                Property maintenance and renovation in Ahmedabad
              </h1>

              <p className="text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed max-w-2xl mx-auto">
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
                        Enquiry received for {selectedService}
                      </p>
                      <p className="text-[var(--ink-secondary)] tabular-nums text-xs">
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
                  className="bg-[var(--surface-card)]/95 backdrop-blur-md border border-[var(--border-subtle)] rounded-xl p-2 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-2 items-center"
                >
                  <div className="md:col-span-5">
                    <label htmlFor="hero-service-select" className="sr-only">
                      Select service
                    </label>
                    <select
                      id="hero-service-select"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full h-10 px-3 bg-transparent text-sm font-medium text-[var(--ink-primary)] rounded-lg border border-transparent hover:bg-[var(--surface-muted)] focus:bg-[var(--surface-card)] focus:border-[var(--border-strong)] focus:outline-none transition-colors cursor-pointer"
                    >
                      {HERO_SERVICES.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="hidden md:block md:col-span-1 h-5 w-px bg-[var(--border-subtle)] mx-auto" />

                  <div className="md:col-span-3 flex items-center h-10 px-3 rounded-lg border border-[var(--border-subtle)] md:border-transparent focus-within:border-[var(--border-strong)] bg-[var(--surface-canvas)] md:bg-transparent">
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

                  <div className="md:col-span-3">
                    <button
                      type="submit"
                      className="w-full h-10 px-5 text-sm font-medium text-[var(--ink-inverse)] bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] active:scale-[0.99] rounded-lg transition-[transform,background-color] cursor-pointer"
                    >
                      Contact us
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-2.5 flex flex-wrap items-center justify-center gap-5 text-xs sm:text-sm text-[var(--ink-secondary)]">
                <a
                  href="tel:9157691572"
                  className="inline-flex items-center gap-1.5 hover:text-[var(--ink-primary)] transition-colors tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5 text-[var(--ink-muted)]" strokeWidth={1.5} />
                  <span>9157691572</span>
                </a>
                <span className="text-[var(--ink-muted)]">Monday to Saturday, 9am to 8pm</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
