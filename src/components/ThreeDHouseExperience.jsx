import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Snowflake, Bath, Zap, Hammer, Droplets, Utensils, Maximize2, ArrowRight, MessageCircle } from 'lucide-react';

export default function ThreeDHouseExperience({ onOpenBooking }) {
  const mountRef = useRef(null);
  const [activeZone, setActiveZone] = useState('ac');
  const [isOverview, setIsOverview] = useState(false);
  const targetCamRef = useRef({
    pos: new THREE.Vector3(12, 10, 14),
    look: new THREE.Vector3(0, 1.8, 0)
  });

  // Services matching original Home Hancer catalog & pricing
  const ZONES = {
    ac: {
      id: 'ac',
      title: 'Air Conditioning',
      originalService: 'Air Conditioning',
      price: '₹500',
      time: 'Monday-Saturday: 9am-8pm',
      tag: 'ROOM 01 // UPPER LEVEL HVAC',
      icon: Snowflake,
      desc: 'Complete air conditioning repair shop and maintenance services including split/window AC wet jet service, installation, and inspection visit.',
      camPos: new THREE.Vector3(4.2, 5.0, 5.8),
      lookAt: new THREE.Vector3(2.2, 3.8, 0)
    },
    bathroom: {
      id: 'bathroom',
      title: 'Bathroom Remodeling',
      originalService: 'Bathroom Remodeling',
      price: 'Free Visit',
      time: 'Call Now: 91576-91572',
      tag: 'ROOM 02 // MASTER BATHROOM',
      icon: Bath,
      desc: 'Complete bathroom renovator and tile contractor services. Specializing in plumbing repairs, sophisticated fixtures, and complete bathroom overhauls.',
      camPos: new THREE.Vector3(-4.2, 5.0, 5.8),
      lookAt: new THREE.Vector3(-2.2, 3.8, 0)
    },
    electrical: {
      id: 'electrical',
      title: 'Electrician & Repairs',
      originalService: 'Electrician',
      price: '₹199',
      time: '45 mins arrival',
      tag: 'ROOM 03 // OFFICE & WIRING',
      icon: Zap,
      desc: 'Electrical repairs, fan installation, switchboard repair, short circuit diagnostics, and home electrical maintenance with precision and care.',
      camPos: new THREE.Vector3(-4.2, 2.5, 5.8),
      lookAt: new THREE.Vector3(-2.2, 1.5, 0)
    },
    carpentry: {
      id: 'carpentry',
      title: 'Carpenter & Furniture',
      originalService: 'Carpenter',
      price: '₹249',
      time: 'Same day',
      tag: 'ROOM 04 // LIVING & WOODWORK',
      icon: Hammer,
      desc: 'Sophisticated carpentry, cabinet repair, door repair, custom closet design and installation, and furniture assembly by expert craftsmen.',
      camPos: new THREE.Vector3(4.2, 2.5, 5.8),
      lookAt: new THREE.Vector3(2.2, 1.5, 0)
    },
    plumbing: {
      id: 'plumbing',
      title: 'Plumber & Leak Repair',
      originalService: 'Plumber',
      price: '₹149',
      time: 'Diwali Special @ ₹149',
      tag: 'ROOM 05 // GROUND LEVEL UTILITY',
      icon: Droplets,
      desc: 'Plumbing contractor, unclog drain, find leak, plumbing leak repair, pipe repair, faucet install, toilet repair, and water tank repair.',
      camPos: new THREE.Vector3(-3.8, -0.2, 5.8),
      lookAt: new THREE.Vector3(-2.0, -0.8, 0)
    },
    painting: {
      id: 'painting',
      title: 'Painting & Tile Work',
      originalService: 'Painting',
      price: 'Free Quote',
      time: 'On-site estimate',
      tag: 'ROOM 06 // KITCHEN & DINING',
      icon: Utensils,
      desc: 'Interior fitting contractor, indoor and outdoor painting, tile installation, replace tile work, and complete property renovation.',
      camPos: new THREE.Vector3(3.8, -0.2, 5.8),
      lookAt: new THREE.Vector3(2.0, -0.8, 0)
    }
  };

  const currentZone = ZONES[activeZone] || ZONES.ac;

  // Update target camera destination
  useEffect(() => {
    if (isOverview) {
      targetCamRef.current.pos.set(11, 9, 13);
      targetCamRef.current.look.set(0, 1.5, 0);
    } else {
      const z = ZONES[activeZone];
      if (z) {
        targetCamRef.current.pos.copy(z.camPos);
        targetCamRef.current.look.copy(z.lookAt);
      }
    }
  }, [activeZone, isOverview]);

  // Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 460;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121316);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(11, 9, 13);
    const currentLook = new THREE.Vector3(0, 1.5, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    sunLight.position.set(12, 18, 14);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0xccff00, 0.6);
    rimLight.position.set(-10, 8, -10);
    scene.add(rimLight);

    // Materials
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x22252c, roughness: 0.6 });
    const wallExteriorMat = new THREE.MeshStandardMaterial({ color: 0x181a1f, roughness: 0.5 });
    const interiorWallMat = new THREE.MeshStandardMaterial({ color: 0x2d313b, roughness: 0.7 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xb58a63, roughness: 0.4 });
    const limeAccentMat = new THREE.MeshStandardMaterial({ color: 0xccff00, roughness: 0.2, emissive: 0x223300 });
    const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
    const metalMat = new THREE.MeshStandardMaterial({ color: 0xdde2ea, metalness: 0.8, roughness: 0.2 });

    // Root House Group
    const houseGroup = new THREE.Group();
    scene.add(houseGroup);

    // 1. Concrete Base Slab
    const baseGeo = new THREE.BoxGeometry(9.6, 0.4, 6.4);
    const baseMesh = new THREE.Mesh(baseGeo, floorMat);
    baseMesh.position.y = -1.6;
    baseMesh.receiveShadow = true;
    houseGroup.add(baseMesh);

    // 2. Three Level Floor Slabs
    const levelsY = [-1.4, 0.9, 3.2];
    levelsY.forEach((y, i) => {
      const slab = new THREE.Mesh(new THREE.BoxGeometry(9.0, 0.15, 5.8), floorMat);
      slab.position.y = y;
      slab.receiveShadow = true;
      houseGroup.add(slab);
    });

    // 3. Back & Center Dividing Walls
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(9.0, 6.2, 0.2), wallExteriorMat);
    backWall.position.set(0, 1.6, -2.8);
    houseGroup.add(backWall);

    const centerWall = new THREE.Mesh(new THREE.BoxGeometry(0.2, 6.2, 5.6), interiorWallMat);
    centerWall.position.set(0, 1.6, 0);
    houseGroup.add(centerWall);

    // 4. Roof Gable (Top Cross-Section)
    const roofShape = new THREE.Shape();
    roofShape.moveTo(-4.6, 3.3);
    roofShape.lineTo(0, 5.8);
    roofShape.lineTo(4.6, 3.3);
    roofShape.lineTo(-4.6, 3.3);
    const extrudeSettings = { depth: 5.8, bevelEnabled: false };
    const roofGeo = new THREE.ExtrudeGeometry(roofShape, extrudeSettings);
    const roofMesh = new THREE.Mesh(roofGeo, wallExteriorMat);
    roofMesh.position.z = -2.9;
    houseGroup.add(roofMesh);

    // Safety Lime Architectural Roof Ridge
    const ridgeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 6.0), limeAccentMat);
    ridgeMesh.position.set(0, 5.8, 0);
    houseGroup.add(ridgeMesh);

    // -------------------------------------------------------------------------
    // Detailed Room Geometry
    // -------------------------------------------------------------------------

    // ROOM 1: AC & Bedroom (Upper Right: x ~ +2.2, y ~ 3.8)
    const bedBase = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.35, 2.0), woodMat);
    bedBase.position.set(2.4, 3.45, -0.6);
    const mattress = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.3, 1.8), ceramicMat);
    mattress.position.set(2.4, 3.75, -0.6);
    // AC Indoor Split Unit on Back Wall
    const acUnit = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 0.3), limeAccentMat);
    acUnit.position.set(2.4, 4.7, -2.6);
    houseGroup.add(bedBase, mattress, acUnit);

    // ROOM 2: Bathroom & Plumbing (Upper Left: x ~ -2.2, y ~ 3.8)
    const tub = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.6, 0.65, 24), ceramicMat);
    tub.position.set(-2.4, 3.6, -0.6);
    const vanity = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.6, 0.6), woodMat);
    vanity.position.set(-2.4, 3.55, -2.4);
    const tap = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.3), metalMat);
    tap.position.set(-2.4, 3.95, -2.4);
    houseGroup.add(tub, vanity, tap);

    // ROOM 3: Electrical & Home Office (Middle Left: x ~ -2.2, y ~ 1.5)
    const desk = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 1.2), woodMat);
    desk.position.set(-2.4, 1.5, -1.2);
    const monitor = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.08), metalMat);
    monitor.position.set(-2.4, 1.85, -1.5);
    const mcbBox = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.15), limeAccentMat);
    mcbBox.position.set(-3.8, 1.8, -2.6);
    houseGroup.add(desk, monitor, mcbBox);

    // ROOM 4: Carpentry & Living Room (Middle Right: x ~ +2.2, y ~ 1.5)
    const sofa = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.5, 1.2), interiorWallMat);
    sofa.position.set(2.4, 1.35, -1.2);
    const wallPanel = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.8, 0.08), woodMat);
    wallPanel.position.set(2.4, 2.0, -2.65);
    houseGroup.add(sofa, wallPanel);

    // ROOM 5: Plumbing Utility & Laundry (Ground Left: x ~ -2.2, y ~ -0.8)
    const washer = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.1, 0.9), ceramicMat);
    washer.position.set(-2.8, -0.85, -1.2);
    const waterHeater = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.9, 16), metalMat);
    waterHeater.position.set(-1.4, -0.75, -2.3);
    houseGroup.add(washer, waterHeater);

    // ROOM 6: Kitchen & Dining (Ground Right: x ~ +2.2, y ~ -0.8)
    const kitchenCounter = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.85, 1.0), woodMat);
    kitchenCounter.position.set(2.4, -0.95, -2.1);
    const fridge = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.8, 0.8), metalMat);
    fridge.position.set(3.8, -0.5, -2.1);
    houseGroup.add(kitchenCounter, fridge);

    // Subtly Rotating Floating Room Indicator Pins
    const pinGroup = new THREE.Group();
    scene.add(pinGroup);

    const pinCoords = [
      { id: 'ac', pos: new THREE.Vector3(2.4, 4.7, -0.6) },
      { id: 'bathroom', pos: new THREE.Vector3(-2.4, 4.4, -0.6) },
      { id: 'electrical', pos: new THREE.Vector3(-2.4, 2.1, -1.2) },
      { id: 'carpentry', pos: new THREE.Vector3(2.4, 2.1, -1.2) },
      { id: 'plumbing', pos: new THREE.Vector3(-2.4, -0.4, -1.2) },
      { id: 'painting', pos: new THREE.Vector3(2.4, -0.4, -1.2) }
    ];

    const pinMeshes = [];
    pinCoords.forEach((p) => {
      const pin = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xccff00 })
      );
      pin.position.copy(p.pos);
      pin.userData = { id: p.id };
      pinGroup.add(pin);
      pinMeshes.push(pin);
    });

    // Pointer Parallax
    let mouseX = 0, mouseY = 0;
    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    container.addEventListener('pointermove', onPointerMove);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth camera interpolation towards target
      camera.position.lerp(targetCamRef.current.pos, 0.05);
      currentLook.lerp(targetCamRef.current.look, 0.05);
      camera.lookAt(currentLook);

      // Micro parallax based on mouse
      camera.position.x += mouseX * 0.005;
      camera.position.y += mouseY * 0.005;

      // Pulse indicator pins
      const elapsed = clock.getElapsedTime();
      pinMeshes.forEach((p, idx) => {
        const s = 1 + Math.sin(elapsed * 4 + idx) * 0.15;
        p.scale.set(s, s, s);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', onPointerMove);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section id="services-3d" className="py-20 px-4 sm:px-8 bg-[#121316] text-[#f6f5f0] border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Exact Section Header from Original Site */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="text-[11px] font-mono text-[#ccff00] uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
              <span>PROPERTY MAINTENANCE // 3D VILLA CAMERA ZOOM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
              Services From The Best Property Maintenance in Ahmedabad
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOverview(!isOverview)}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-bold uppercase rounded-lg border border-white/20 bg-[#1a1c21] hover:bg-[#252830] text-white transition-all cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>{isOverview ? 'Zoom Into Room' : 'View Full 3D Villa'}</span>
            </button>
          </div>
        </div>

        {/* Room Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
          <button
            onClick={() => setIsOverview(true)}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
              isOverview
                ? 'bg-[#ccff00] text-[#121316]'
                : 'bg-[#1a1c21] text-[#a0a4b0] hover:text-white border border-white/10'
            }`}
          >
            Full 3D House Overview
          </button>
          {Object.keys(ZONES).map((key) => {
            const z = ZONES[key];
            const Icon = z.icon;
            const isActive = !isOverview && activeZone === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveZone(key);
                  setIsOverview(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#ccff00] text-[#121316] shadow-md'
                    : 'bg-[#1a1c21] text-[#a0a4b0] hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{z.title}</span>
              </button>
            );
          })}
        </div>

        {/* Split Grid: 3D Viewport on Left, Exact Original Service Info on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          {/* Left Column: True 3D Three.js Canvas (7 Cols) */}
          <div className="lg:col-span-7 bg-[#18191e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="p-3 bg-[#0f1013] border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-[#a0a4b0]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span>
                <span className="text-white font-semibold">
                  CAMERA TARGET: {isOverview ? 'FULL ISOMETRIC VILLA' : currentZone.tag}
                </span>
              </div>
              <span className="text-[#ccff00]">3D REAL-TIME WEBGL</span>
            </div>

            {/* Three.js Canvas Mount */}
            <div 
              ref={mountRef} 
              className="w-full h-[420px] sm:h-[480px] cursor-grab active:cursor-grabbing relative"
            ></div>

            {/* Bottom Controls Telemetry */}
            <div className="p-3 bg-[#0f1013] border-t border-white/10 flex items-center justify-between text-xs text-[#a0a4b0] font-mono">
              <span>Select any service above to fly the 3D camera directly into that room</span>
              <span className="text-white/80">6 Dedicated Rooms</span>
            </div>
          </div>

          {/* Right Column: Original Copy & Direct Booking (5 Cols) */}
          <div className="lg:col-span-5 bg-[#18191e] border border-white/15 rounded-2xl p-6 sm:p-7 shadow-2xl relative space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-[#ccff00] tracking-wider uppercase">
                {currentZone.tag}
              </span>
              <span className="text-[10px] font-mono bg-white/10 text-white/90 px-2 py-0.5 rounded">
                Ahmedabad, Gujarat
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {currentZone.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#a0a4b0] mt-2 leading-relaxed font-normal">
                {currentZone.desc}
              </p>
            </div>

            {/* Exact Original Price from Site Posts */}
            <div className="bg-[#121316] border border-white/10 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-[#a0a4b0] uppercase block">Service Rate</span>
                <span className="text-2xl font-extrabold text-white font-display">
                  {currentZone.price}
                </span>
              </div>
              <div className="text-right font-mono">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#121316] bg-[#ccff00] px-2.5 py-0.5 rounded">
                  {currentZone.time}
                </span>
                <span className="text-[11px] text-[#a0a4b0] block mt-1">
                  Vejalpur & Ahmedabad
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-3">
              <button
                onClick={() => onOpenBooking(currentZone)}
                className="w-full py-3.5 px-4 bg-[#ccff00] hover:bg-[#b8e600] active:scale-99 text-[#121316] font-mono font-bold text-xs uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>Enquire About {currentZone.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/919157691572?text=${encodeURIComponent(
                  `Hello Home Hancer Services, I want to enquire about ${currentZone.originalService} in Ahmedabad.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#121316] hover:bg-black text-white font-mono font-bold text-xs uppercase rounded-xl flex items-center justify-center gap-2 border border-white/20 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#ccff00] fill-current" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>

            {/* Contact Micro-Details from Original Site */}
            <div className="text-[11px] font-mono text-[#a0a4b0] pt-3 border-t border-white/10 space-y-1">
              <div>C-901 PNTC, Times Of India Press Road behind Titanium City Centre</div>
              <div className="text-white/60">Phone: 9157691572 • Monday-Saturday: 9am-8pm</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
