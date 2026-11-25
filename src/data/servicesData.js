export const AHMEDABAD_AREAS = [
  "Vejalpur",
  "Prahlad Nagar",
  "Satellite",
  "Bopal & South Bopal",
  "Bodakdev",
  "SG Highway",
  "Thaltej",
  "Navrangpura",
  "Maninagar",
  "Gota",
  "Chandkheda",
  "Paldi",
  "Science City",
  "Ghatlodia",
  "Shela"
];

export const SERVICE_CATEGORIES = [
  { id: "all", name: "All Services" },
  { id: "plumbing", name: "Plumbing", icon: "Droplets" },
  { id: "ac", name: "AC & Cooling", icon: "Snowflake" },
  { id: "electrical", name: "Electrical", icon: "Zap" },
  { id: "carpentry", name: "Carpentry", icon: "Hammer" },
  { id: "painting", name: "Painting & Waterproofing", icon: "Paintbrush" },
  { id: "renovation", name: "Bathroom & Remodel", icon: "Bath" }
];

export const POPULAR_SERVICES = [
  {
    id: "tap-repair",
    name: "Tap Leakage & Pipe Repair",
    category: "plumbing",
    price: "₹149",
    time: "45 mins arrival",
    description: "Fix dripping taps, mixer leaks, flush valves, and damaged internal pipe lines.",
    features: ["Pressure testing", "Genuine washer & seal replacement", "30-day warranty"],
    popular: true
  },
  {
    id: "ac-service",
    name: "AC Deep Foam-Jet Service",
    category: "ac",
    price: "₹499",
    time: "Same day",
    description: "High-pressure jet wash for indoor cooling coils, outdoor condenser, and filter sanitization.",
    features: ["Boosts cooling by 40%", "Saves electricity bills", "Anti-bacterial coating"],
    popular: true
  },
  {
    id: "switchboard-repair",
    name: "Switchboard & Wiring Diagnostics",
    category: "electrical",
    price: "₹199",
    time: "45 mins arrival",
    description: "Repair faulty switches, MCB tripping, short circuits, and appliance wiring issues.",
    features: ["Certified A-grade electricians", "Insulated safety equipment", "Shock-hazard audit"],
    popular: false
  },
  {
    id: "ac-installation",
    name: "Split / Window AC Installation",
    category: "ac",
    price: "₹1,399",
    time: "Same day",
    description: "Flawless core-drilling, copper pipe insulation, bracket mounting, and vacuum testing.",
    features: ["Zero-vibration bracket setup", "Refrigerant leak detection", "Clean debris cleanup"],
    popular: false
  },
  {
    id: "bathroom-renovation",
    name: "Complete Bathroom Remodeling",
    category: "renovation",
    price: "Custom / Free Visit",
    time: "3-7 days",
    description: "End-to-end bathroom transformation: designer tiling, concealed plumbing, sanitaryware & false ceiling.",
    features: ["3D design consultation", "Premium anti-skid tiles", "10-year waterproofing guarantee"],
    popular: true
  },
  {
    id: "door-cabinet-repair",
    name: "Door, Lock & Cabinet Carpentry",
    category: "carpentry",
    price: "₹249",
    time: "1 hour arrival",
    description: "Fix squeaky hinges, stuck sliding doors, modular kitchen cabinets, and modern smart lock fitting.",
    features: ["High-precision alignment", "Premium hardware fitting", "No scratch guarantee"],
    popular: false
  },
  {
    id: "waterproofing-solutions",
    name: "Terrace & Wall Waterproofing",
    category: "painting",
    price: "From ₹28/sq.ft",
    time: "Inspection in 24h",
    description: "Advanced chemical polymer injection and elastomeric membrane for roof seeping and damp walls.",
    features: ["Thermal moisture scan", "5 to 10 year written warranty", "Weatherproof topcoat"],
    popular: true
  },
  {
    id: "home-painting",
    name: "Full Home Interior & Exterior Painting",
    category: "painting",
    price: "Free On-Site Quote",
    time: "Flexible slot",
    description: "Dust-free mechanized sanding, putty smoothing, and luxury emulsion finishes with Asian Paints / Berger.",
    features: ["Laser-guided masking", "Furniture protective covering", "Full site post-clean"],
    popular: false
  }
];

export const TRUST_STATS = [
  { value: "4.8★", label: "Google Rating", subtext: "353+ verified customer reviews" },
  { value: "45 Mins", label: "Average Response Time", subtext: "Rapid dispatch across Ahmedabad" },
  { value: "100%", label: "Verified Technicians", subtext: "Background & police verified staff" },
  { value: "30 Days", label: "Workmanship Warranty", subtext: "Free rework if not 100% satisfied" }
];

export const BEFORE_AFTER_ITEMS = [
  {
    title: "Vejalpur Villa — Master Bathroom Renovation",
    category: "Bathroom Remodeling",
    beforeText: "Old leaking sanitaryware, stained ceramic tiles, rusty iron pipes",
    afterText: "Concealed Grohe fittings, Italian matte finish tiles, glass shower partition",
    savings: "Saved 25% vs traditional contractor",
    timeTaken: "5 Days turnaround"
  },
  {
    title: "Prahlad Nagar Apartment — Complete Wall Waterproofing",
    category: "Waterproofing & Painting",
    beforeText: "Heavy dampness, peeling paint, fungal discoloration from terrace seepage",
    afterText: "Polymer membrane coating, moisture barrier, pristine Royal Matte emulsion",
    savings: "10-Year written warranty",
    timeTaken: "2 Days turnaround"
  }
];

export const REVIEWS = [
  {
    name: "Akib Mansuri",
    locality: "Vejalpur, Ahmedabad",
    rating: 5,
    date: "August 2026",
    service: "Emergency Plumbing & Tap Repair",
    text: "Fantastic job done by Ashok Nath. Very quick and satisfying service. The team reached my house in 35 minutes and fixed the concealed pipe leakage without breaking extra tiles. Recommended to all Ahmedabadies!"
  },
  {
    name: "Rohan Yadav",
    locality: "Satellite, Ahmedabad",
    rating: 5,
    date: "June 2026",
    service: "Full Bathroom Renovation",
    text: "Best renovation service in town. They completely transformed our 15-year-old bathroom with modern anti-skid tiles and premium fixtures. Transparent estimate with zero hidden costs. Extremely professional."
  },
  {
    name: "Arman Ali",
    locality: "SG Highway, Ahmedabad",
    rating: 5,
    date: "June 2026",
    service: "Shop Civil & Tiles Work",
    text: "Recently got my commercial shop's civil and flooring work done. Clean execution, punctual crew, and fair pricing. They even handled the debris cleanup after the job."
  },
  {
    name: "Ram Brish Kumar",
    locality: "Bopal, Ahmedabad",
    rating: 5,
    date: "May 2026",
    service: "Interior Home Painting",
    text: "Very nice painting work. The painters covered all our furniture carefully with plastic sheets and used mechanized sanding. Walls look brand new with no dust left behind."
  }
];

export const FAQS = [
  {
    q: "How fast can a Home Hancer technician reach my home in Ahmedabad?",
    a: "For urgent electrical, plumbing, and AC breakdowns, our dispatch centers across Vejalpur, Prahlad Nagar, Bopal, and SG Highway typically ensure an expert arrives at your doorstep within 45 to 60 minutes."
  },
  {
    q: "Are the prices fixed, or will the technician change the quote on-site?",
    a: "We believe in 100% price transparency. Standard repairs (like tap servicing at ₹149 or AC jet wash at ₹499) have fixed upfront rates. For complex custom jobs, you receive a written itemized quote before any work begins. No hidden fees, ever."
  },
  {
    q: "What does your 30-Day Workmanship Warranty cover?",
    a: "If the exact issue recurs within 30 days of service, our technician will revisit and resolve it completely free of charge. Your satisfaction and peace of mind are guaranteed."
  },
  {
    q: "Are your technicians background-checked and trustworthy?",
    a: "Yes. Every technician in our network undergoes thorough identity verification, background screening, and practical skill vetting before joining Home Hancer Services."
  },
  {
    q: "Do you offer Annual Maintenance Contracts (AMC) for apartments and offices?",
    a: "Yes, we provide flexible AMC packages covering scheduled preventive maintenance for ACs, plumbing inspections, electrical audits, and priority emergency response for societies, villas, and commercial spaces."
  }
];
