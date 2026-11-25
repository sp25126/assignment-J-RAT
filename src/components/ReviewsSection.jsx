import React, { useState } from 'react';
import { 
  Star, CheckCircle2, ExternalLink, ShieldCheck, 
  MapPin, ThumbsUp, Clock, ArrowUpRight, Wrench, Sparkles
} from 'lucide-react';

// Google Official Multi-Color "G" Icon
const GoogleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

const REVIEW_CATEGORIES = [
  { id: 'all', label: 'All Reviews', count: 182 },
  { id: 'plumbing', label: 'Plumbing & Drainage', count: 64 },
  { id: 'ac', label: 'AC Jet & Cooling', count: 48 },
  { id: 'electrical', label: 'Electrical Diagnostics', count: 38 },
  { id: 'renovation', label: 'Civil & Carpentry', count: 32 }
];

const VERIFIED_REVIEWS = [
  {
    id: 1,
    name: "Akib Mansuri",
    initials: "AM",
    locality: "Vejalpur, Ahmedabad",
    landmark: "Near Bakeri City",
    category: "plumbing",
    service: "Concealed Pipe Repair & Drain Diagnostics",
    rating: 5,
    date: "14 days ago",
    verifiedResident: true,
    technician: "Ashok Nath (Lead Plumber)",
    text: "Fantastic job done by Ashok Nath. We had persistent seepage leaking into the lower flat's ceiling that two local plumbers couldn't locate. Ashok brought an electronic acoustic leak detector, pin-pointed the cracked UPVC tee behind the tile wall, and replaced it with minimal tile removal. Tested under 4-bar pressure before sealing. Highly recommended to all Amdavadis.",
    helpful: 19
  },
  {
    id: 2,
    name: "Dr. Neha Parikh",
    initials: "NP",
    locality: "Prahlad Nagar, Ahmedabad",
    landmark: "Near Titanium City Centre",
    category: "ac",
    service: "Dual Split AC Deep Foam-Jet Wash",
    rating: 5,
    date: "3 weeks ago",
    verifiedResident: true,
    technician: "Ramesh Patel (HVAC Tech)",
    text: "Booked deep foam-jet servicing for our 2 Daikin inverter ACs before peak summer. The technician arrived right on time with the waterproof spill catch-bag and high-pressure jet pump. Didn't drop a single splash on our wooden flooring. The airflow temperature dropped from 24°C to 16.5°C on the spot. Transparent ₹499 pricing with digital GST bill.",
    helpful: 14
  },
  {
    id: 3,
    name: "Arman Ali",
    initials: "AA",
    locality: "Jodhpur Gam, Satellite",
    landmark: "Near Shivranjani Cross Roads",
    category: "renovation",
    service: "Shop Civil Tiling & Counter Masonry",
    rating: 5,
    date: "1 month ago",
    verifiedResident: true,
    technician: "Suresh Mistri (Masonry Head)",
    text: "Recently got our 380 sq.ft retail shop civil work and 600x1200 vitrified floor tiles laid. Suresh and his crew worked with laser levels and vibration suction lifters—not a single hollow sound or uneven joint anywhere. Handed over clean and dust-free 6 hours ahead of our opening deadline.",
    helpful: 11
  },
  {
    id: 4,
    name: "Chirag K. Patel",
    initials: "CP",
    locality: "South Bopal, Ahmedabad",
    landmark: "Near Gala Gymkhana Road",
    category: "electrical",
    service: "Main MCB Tripping Diagnostics & Rewiring",
    rating: 5,
    date: "1 month ago",
    verifiedResident: true,
    technician: "Vikram Sinh (A-Grade Electrician)",
    text: "Our master bedroom circuit breaker kept tripping whenever the geyser and AC switched on simultaneously. Vikram tested each leg with a digital clamp meter, isolated a burnt neutral terminal in the concealed junction box, and balanced the phase loads. Safe, disciplined, and cleaned up the wire clippings before leaving.",
    helpful: 8
  },
  {
    id: 5,
    name: "Rohan Yadav",
    initials: "RY",
    locality: "Vejalpur Road, Ahmedabad",
    landmark: "Near Shrinand Nagar",
    category: "renovation",
    service: "Master Bathroom Sanitary Fitting",
    rating: 5,
    date: "2 months ago",
    verifiedResident: true,
    technician: "Ashok Nath (Lead Plumber)",
    text: "Best renovation service in West Ahmedabad. Complete wall-hung commode, concealed diverter, and glass shower partition installation. The quote given on WhatsApp matched the final invoice to the exact rupee. No hidden travel charges or haggling.",
    helpful: 16
  },
  {
    id: 6,
    name: "Ram Brish Kumar",
    initials: "RK",
    locality: "Bodakdev, Ahmedabad",
    landmark: "Near Judges Bungalow Road",
    category: "renovation",
    service: "Wall Dampness Treatment & Royal Matte Finish",
    rating: 5,
    date: "2 months ago",
    verifiedResident: true,
    technician: "Dinesh K. (Waterproofing Specialist)",
    text: "Very nice painting and waterproofing work. They used moisture meters to scan the internal wall efflorescence, applied 3 coats of elastomeric polymer barrier, and topped with Asian Paints Royale. Still immaculate after continuous monsoon rains.",
    helpful: 7
  }
];

export default function ReviewsSection() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredReviews = activeTab === 'all' 
    ? VERIFIED_REVIEWS 
    : VERIFIED_REVIEWS.filter(r => r.category === activeTab);

  return (
    <section 
      id="reviews" 
      className="py-16 sm:py-24 bg-[var(--surface-canvas)] border-b border-[var(--border-subtle)] relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-12">
        
        {/* ========================================================
            HEADER: GOOGLE TRUST ARCHITECTURE & RATING METRICS
            Clean, verified, high-trust header (Unslop + Hallmark)
           ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[var(--border-subtle)]">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <GoogleIcon className="w-6 h-6 shrink-0" />
              <span className="text-xs font-semibold text-[var(--ink-secondary)]">
                Verified Google Business Profile · Ahmedabad
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.1] text-[var(--ink-primary)]">
              Customer Reviews on Google
            </h2>

            <p className="text-sm sm:text-base text-[var(--ink-secondary)] max-w-2xl leading-relaxed">
              Real homeowners across Vejalpur, Satellite, Prahlad Nagar, and Bopal. Every review reflects verified on-site diagnostic repairs and transparent billing.
            </p>
          </div>

          {/* Official Google Score Card */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 bg-[var(--surface-card)] border border-[var(--border-subtle)] p-4 sm:p-5 rounded-2xl shadow-sm shrink-0">
            <div className="text-center sm:text-left pr-4 sm:border-r sm:border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink-primary)] font-mono">
                  4.9
                </span>
                <div className="space-y-0.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="text-[11px] font-medium text-[var(--ink-muted)]">
                    182+ Verified Reviews
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1 text-xs text-[var(--ink-secondary)] pl-1">
              <div className="flex items-center gap-1.5 font-medium text-[var(--ink-primary)]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Fixed Upfront Pricing</span>
              </div>
              <div className="flex items-center gap-1.5 text-[var(--ink-muted)]">
                <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Avg 45-Min Arrival in West Ahmedabad</span>
              </div>
            </div>

            <a
              href="https://maps.google.com/?cid=13745266497914041753"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 rounded-xl bg-[var(--surface-muted)] hover:bg-[var(--border-subtle)] text-[var(--ink-primary)] text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[var(--border-subtle)] shrink-0 ml-auto"
              title="View on Google Maps"
            >
              <span>View Google Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--ink-muted)]" />
            </a>
          </div>
        </div>

        {/* ========================================================
            FILTER PILLS: VERIFIED TRADE CATEGORIES
           ======================================================== */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {REVIEW_CATEGORIES.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer border flex items-center gap-2 ${
                  isActive
                    ? 'bg-[var(--surface-card)] text-[var(--accent-primary)] border-[var(--accent-primary)] font-semibold shadow-sm'
                    : 'bg-[var(--surface-card)]/60 text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] border-[var(--border-subtle)] hover:bg-[var(--surface-card)]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-blue-50 text-[var(--accent-primary)] font-bold'
                      : 'bg-[var(--surface-muted)] text-[var(--ink-muted)]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================
            REVIEWS GRID: AUTHENTIC, DETAILED AMENDMENT CARDS
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[var(--surface-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-md relative group"
            >
              <div className="space-y-4">
                {/* Author Info & Verified Google Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-[var(--border-subtle)] flex items-center justify-center text-xs font-bold font-mono text-[var(--ink-primary)] shrink-0">
                      {rev.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-semibold text-[var(--ink-primary)]">
                          {rev.name}
                        </h4>
                        <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[var(--ink-muted)]">
                        <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                        <span>{rev.locality}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-[var(--ink-muted)] shrink-0">
                    {rev.date}
                  </span>
                </div>

                {/* Rating & Verified Service Tag */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Customer</span>
                    </span>
                  </div>

                  <div className="text-xs font-medium text-[var(--ink-secondary)] bg-[var(--surface-muted)] px-2.5 py-1 rounded-lg border border-[var(--border-subtle)] inline-flex items-center gap-1.5">
                    <Wrench className="w-3 h-3 text-[var(--accent-primary)] shrink-0" />
                    <span className="truncate max-w-[240px]">{rev.service}</span>
                  </div>
                </div>

                {/* Review Narrative Body */}
                <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed pt-1">
                  "{rev.text}"
                </p>
              </div>

              {/* Card Footer: Technician & Helpful Affirmation */}
              <div className="pt-4 mt-5 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--ink-muted)]">
                <span className="text-[10px] font-mono text-slate-500">
                  {rev.technician}
                </span>

                <div className="flex items-center gap-1 text-slate-600">
                  <ThumbsUp className="w-3 h-3 text-slate-400" />
                  <span className="text-[10px] font-mono">{rev.helpful} helpful</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================
            DIRECT GOOGLE BUSINESS ACTION BANNER
           ======================================================== */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-[var(--border-subtle)] flex items-center justify-center shrink-0">
              <GoogleIcon className="w-7 h-7" />
            </div>
            <div className="space-y-0.5">
              <div className="text-sm font-semibold text-[var(--ink-primary)]">
                Read all 182+ unfiltered reviews on Google Maps
              </div>
              <div className="text-xs text-[var(--ink-secondary)]">
                Home Hancer Services Pvt Ltd · Vejalpur, Ahmedabad · 4.9 Star Rating
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <a
              href="https://maps.google.com/?cid=13745266497914041753"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto h-11 px-5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Open Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://maps.google.com/?cid=13745266497914041753"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto h-11 px-4 rounded-xl bg-[var(--surface-muted)] hover:bg-[var(--border-subtle)] text-[var(--ink-primary)] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-[var(--border-subtle)]"
            >
              <span>Write a Review</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
