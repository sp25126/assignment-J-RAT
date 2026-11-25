# Home Hancer Services — Production Web Application

> High-performance, SEO-optimized property maintenance & turnkey architectural renovation platform for **Home Hancer Services Pvt Ltd** (Vejalpur, Ahmedabad).

---

## 🏗️ Project Architecture

```
assignment-J-RAT/
├── index.html                  # Semantic HTML5, Meta SEO, Geo-tags, Schema.org JSON-LD
├── package.json                # Lean dependencies (React 19, Vite 6, Tailwind v4)
├── vite.config.js              # Rollup manual chunk splitting & esbuild optimization
├── eslint.config.js            # Code quality and React standards
├── README.md                   # Engineering documentation
├── public/
│   ├── assets/                 # Flow 24fps scrubbed 3D villa architectural frames
│   └── gallery/                # Verified on-site Ahmedabad project photography
└── src/
    ├── main.jsx                # Application root mount
    ├── App.jsx                 # Master page orchestration & modal state
    ├── index.css               # Hallmark design tokens, typography, and card transitions
    ├── components/             # Active production component system (10 core modules)
    │   ├── Header.jsx                  # Sticky navbar, smooth offset scroll & scroll-spy
    │   ├── Hero.jsx                    # 24fps scrubbed exploded villa & smart enquiry engine
    │   ├── Section2ServicesShowcase.jsx# Autoplay site proof carousel & catalog search
    │   ├── HairlineCardBackdrop.jsx    # Category-specific isometric hairline line drawings
    │   ├── BeforeAfterSlider.jsx       # Interactive tactile master bathroom renovation slider
    │   ├── ReviewsSection.jsx          # Google Business 4.9★ reviews & verified trust metrics
    │   ├── PreFooterCTA.jsx            # High-conversion pre-footer call-to-action
    │   ├── Footer.jsx                  # Structured company details, legal & verified office HQ
    │   ├── BookingModal.jsx            # Mobile-responsive technician dispatch modal
    │   └── MobileStickyBar.jsx         # Bottom action dock with iOS/Android safe area support
    └── data/                   # Structured domain datasets
        ├── galleryData.js              # Real site photography catalog & captions
        ├── servicesData.js             # Transparent service tariffs & Ahmedabad zones
        └── transformationsData.js      # Flagship renovation case study data
```

---

## 🎨 Design System & Craft Philosophy

### 1. Hallmark & Unslop Standards
* **Restrained Palette:** Slate and cool stone canvas (`#f8fafc`), quiet chrome surfaces, and a single high-contrast cobalt accent (`#1d4ed8`). Zero gratuitous neon washes, slop gradients, or emoji clutter.
* **Typographic Rigor:** Standardized on `Plus Jakarta Sans` with tabular numeric figures for pricing and telemetry. Sentence case labels with strict 4px baseline rhythm.
* **Tactile Interactions:** Crisp button states with smooth cubic-bezier transitions (`0.2, 0.8, 0.2, 1`), active press scales (`0.98`), and high-elevation shadow cues.

### 2. Category-Specific Isometric Hairline Engine (`HairlineCardBackdrop.jsx`)
Minimal single-stroke architectural line drawings inspired by `@lucasmarkes/hairline` that dynamically answer cursor coordinates with spring inertia:
* **AC & Cooling (`ac`):** Split indoor unit with horizontal louvre vents and faint dynamic airflow streamlines.
* **Carpentry & Woodwork (`carpentry`):** Isometric modern armchair with cushioned seat slab and tapered legs.
* **Plumbing (`plumbing`):** Water pipe manifold with 90° bibcock tap, turn-valve handle, and falling water droplet.
* **Electrical (`electrical`):** Modular switchboard faceplate with dual rocker switches and MCB breaker lever.
* **Painting & Waterproofing (`painting`):** Paint roller drum with angled frame and wall texture swatch.
* **Renovation (`renovation`):** Freestanding oval bathtub with contoured rim and swan-neck mixer faucet.

---

## ⚡ Speed & SEO Optimizations

1. **Vite Manual Chunk Splitting:**
   * `vendor-react`: `react`, `react-dom`
   * `vendor-icons`: `lucide-react`
   * Enables parallel asset fetching, zero render-blocking warnings, and maximum HTTP cache efficiency.
2. **Local SEO Geo-Targeting:**
   * Exact GPS coordinates (`23.0039° N, 72.5278° E`) and `geo.region` (`IN-GJ`) for Ahmedabad search authority.
3. **Google Rich Snippets (Schema.org JSON-LD):**
   * Registered `HomeAndConstructionBusiness` schema including address, operating hours, phone, service areas across 11 Ahmedabad zones, and verified 4.9★ aggregate rating.
4. **Mobile Responsiveness:**
   * Universal `overflow-x: clip` preventing mobile horizontal shifts.
   * Mobile sticky bottom dock with safe-area inset padding (`env(safe-area-inset-bottom)`).
   * Upward-flowing dropdown popovers preventing mobile viewport clipping.

---

## 🛠️ Development & Production

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Compile optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📍 Business Information
* **Entity:** Home Hancer Services Pvt Ltd
* **Operational HQ:** C-901 PNTC, Times Of India Press Road behind Titanium City Centre, Vejalpur, Ahmedabad, Gujarat 380015
* **Contact Desk:** +91 91576 91572
* **Operating Hours:** Monday – Saturday: 09:00 AM – 08:00 PM (Emergency Desk Available)
