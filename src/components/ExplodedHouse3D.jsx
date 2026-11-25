import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Snowflake, Bath, Zap, Hammer, Droplets, Utensils, Layers, Maximize2 } from 'lucide-react';

const ROOM_ZONES = [
  {
    id: 'ac',
    title: 'Air Conditioning',
    layer: 'Upper floor and roof condenser',
    price: '₹500',
    time: 'Monday-Saturday: 9am-8pm',
    icon: Snowflake,
    desc: 'Air conditioning repair shop and maintenance services including split and window AC wet jet service, installation, and inspection visit.',
    camPos: new THREE.Vector3(6.8, 7.6, 8.2),
    lookAt: new THREE.Vector3(2.2, 6.2, 1.4),
    explodeOffset: 1.0
  },
  {
    id: 'bathroom',
    title: 'Bathroom Remodeling',
    layer: 'Upper floor ensuite',
    price: 'Free Visit',
    time: 'Call 91576-91572',
    icon: Bath,
    desc: 'Bathroom renovator and tile contractor services. Specializing in plumbing repairs, fixtures, waterproofing, and complete bathroom renovations.',
    camPos: new THREE.Vector3(-6.8, 7.4, 8.0),
    lookAt: new THREE.Vector3(-2.2, 5.8, 1.2),
    explodeOffset: 1.0
  },
  {
    id: 'electrical',
    title: 'Electrician',
    layer: 'Middle floor office core',
    price: '₹199',
    time: 'Same day',
    icon: Zap,
    desc: 'Electrical repairs, fan installation and repair, switchboard wiring, and home electrical maintenance.',
    camPos: new THREE.Vector3(-6.8, 4.4, 8.0),
    lookAt: new THREE.Vector3(-2.4, 3.2, 1.4),
    explodeOffset: 1.0
  },
  {
    id: 'carpentry',
    title: 'Carpenter',
    layer: 'Middle floor living room',
    price: '₹249',
    time: 'Same day',
    icon: Hammer,
    desc: 'Sophisticated carpentry, cabinet repair, custom closet design and installation, finish carpentry, and furniture assembly.',
    camPos: new THREE.Vector3(6.8, 4.4, 8.0),
    lookAt: new THREE.Vector3(2.2, 3.2, 1.4),
    explodeOffset: 1.0
  },
  {
    id: 'plumbing',
    title: 'Plumber',
    layer: 'Ground floor utility',
    price: '₹149',
    time: 'Monday-Saturday: 9am-8pm',
    icon: Droplets,
    desc: 'Plumbing contractor, unclog drain, find leak, plumbing leak repair, pipe repair, faucet install, toilet repair, and water heater service.',
    camPos: new THREE.Vector3(-6.5, 2.2, 7.8),
    lookAt: new THREE.Vector3(-2.2, 0.8, 1.4),
    explodeOffset: 1.0
  },
  {
    id: 'painting',
    title: 'Painting & Tile Work',
    layer: 'Ground floor kitchen',
    price: 'Free Quote',
    time: 'On-site estimate',
    icon: Utensils,
    desc: 'Interior fitting contractor, indoor and outdoor painting, tile installation, replace tile work, and complete home renovation.',
    camPos: new THREE.Vector3(6.5, 2.2, 7.8),
    lookAt: new THREE.Vector3(2.2, 0.8, 1.4),
    explodeOffset: 1.0
  }
];

export default function ExplodedHouse3D({ onOpenBooking }) {
  const mountRef = useRef(null);
  const sectionRef = useRef(null);
  const [activeZoneId, setActiveZoneId] = useState('ac');
  const [isExploded, setIsExploded] = useState(true);
  const [isOverview, setIsOverview] = useState(true);

  const stateRef = useRef({
    exploded: true,
    overview: true,
    activeId: 'ac',
    scrollExplode: 0.75
  });

  useEffect(() => {
    stateRef.current.exploded = isExploded;
    stateRef.current.overview = isOverview;
    stateRef.current.activeId = activeZoneId;
  }, [isExploded, isOverview, activeZoneId]);

  const currentZone = ROOM_ZONES.find(z => z.id === activeZoneId) || ROOM_ZONES[0];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(13.5, 11.5, 15.5);
    const currentLook = new THREE.Vector3(0, 4.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // Studio Architectural Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 1.3);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffcf5, 2.0);
    keyLight.position.set(12, 20, 14);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.7);
    fillLight.position.set(-12, 8, -8);
    scene.add(fillLight);

    // Subtle ground shadow plane
    const groundGeo = new THREE.PlaneGeometry(30, 30);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.08 });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.3;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // Load Blender-exported GLB
    const layers = {
      ground: null,
      mid: null,
      upper: null,
      roof: null
    };
    const baseZ = { ground: 0, mid: 2.45, upper: 4.9, roof: 7.1 };

    const loader = new GLTFLoader();
    loader.load('/assets/exploded-house.glb', (gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        if (child.name === 'Layer_Ground') layers.ground = child;
        if (child.name === 'Layer_Mid') layers.mid = child;
        if (child.name === 'Layer_Upper') layers.upper = child;
        if (child.name === 'Layer_Roof') layers.roof = child;
      });
      scene.add(model);
    });

    // Continuous scroll progress for explode animation (no React re-render)
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height * 0.5), 0), 1);
      stateRef.current.scrollExplode = progress;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Pointer parallax
    let mouseX = 0;
    let mouseY = 0;
    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    container.addEventListener('pointermove', onPointerMove);

    let animId;
    let explodeFactor = 0;
    const targetCamPos = new THREE.Vector3(13.5, 11.5, 15.5);
    const targetLookAt = new THREE.Vector3(0, 4.2, 0);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const { exploded, overview, activeId, scrollExplode } = stateRef.current;
      const desiredExplode = exploded ? Math.max(0.45, scrollExplode) : 0;
      explodeFactor += (desiredExplode - explodeFactor) * 0.06;

      // Animate Blender layers vertically along Y-axis (Three.js Y-up from Blender Z-up)
      if (layers.mid) layers.mid.position.y = baseZ.mid + explodeFactor * 1.1;
      if (layers.upper) layers.upper.position.y = baseZ.upper + explodeFactor * 2.3;
      if (layers.roof) layers.roof.position.y = baseZ.roof + explodeFactor * 3.6;

      // Compute camera target
      if (overview) {
        targetCamPos.set(13.5 + mouseX * 1.2, 11.5 - mouseY * 0.6, 15.5);
        targetLookAt.set(0, 3.6 + explodeFactor * 1.6, 0);
      } else {
        const z = ROOM_ZONES.find(item => item.id === activeId) || ROOM_ZONES[0];
        const yBoost =
          activeId === 'ac' || activeId === 'bathroom'
            ? explodeFactor * 2.3
            : activeId === 'electrical' || activeId === 'carpentry'
              ? explodeFactor * 1.1
              : 0;
        targetCamPos.set(
          z.camPos.x + mouseX * 0.4,
          z.camPos.y + yBoost - mouseY * 0.3,
          z.camPos.z
        );
        targetLookAt.set(z.lookAt.x, z.lookAt.y + yBoost, z.lookAt.z);
      }

      camera.position.lerp(targetCamPos, 0.06);
      currentLook.lerp(targetLookAt, 0.06);
      camera.lookAt(currentLook);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', onPointerMove);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="services-3d"
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 sm:px-8 bg-[var(--surface-canvas)] border-b border-[var(--border-subtle)]"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section Heading (Exact Original Copy) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--border-subtle)]">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-[-0.025em] text-[var(--ink-primary)]">
              Services From The Best Property Maintenance in Ahmedabad
            </h2>
            <p className="text-sm sm:text-base text-[var(--ink-secondary)] mt-2">
              Select a room or service to inspect the exploded architectural floor plan.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsExploded(!isExploded)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-[var(--ink-primary)] bg-[var(--surface-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] rounded-lg transition-colors cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[var(--ink-secondary)]" strokeWidth={1.5} />
              <span>{isExploded ? 'Assemble view' : 'Explode floors'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsOverview(!isOverview)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-[var(--ink-primary)] bg-[var(--surface-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] rounded-lg transition-colors cursor-pointer"
            >
              <Maximize2 className="w-4 h-4 text-[var(--ink-secondary)]" strokeWidth={1.5} />
              <span>{isOverview ? 'Zoom to room' : 'Full house'}</span>
            </button>
          </div>
        </div>

        {/* Service Room Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-6">
          {ROOM_ZONES.map((zone) => {
            const Icon = zone.icon;
            const active = !isOverview && activeZoneId === zone.id;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => {
                  setActiveZoneId(zone.id);
                  setIsOverview(false);
                  setIsExploded(true);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[var(--accent-primary)] text-[var(--ink-inverse)] border-[var(--accent-primary)]'
                    : 'bg-[var(--surface-card)] text-[var(--ink-secondary)] border-[var(--border-subtle)] hover:text-[var(--ink-primary)] hover:border-[var(--border-strong)]'
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                <span>{zone.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Split Grid: 3D Exploded WebGL Viewport + Service Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Viewport (7 cols) */}
          <div className="lg:col-span-7 bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-2xl overflow-hidden shadow-xs">
            <div
              ref={mountRef}
              className="w-full h-[380px] sm:h-[460px] relative"
              aria-label="Interactive 3D exploded architectural house model"
            />
          </div>

          {/* Service Details Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <p className="text-sm font-medium text-[var(--ink-muted)]">
                {currentZone.layer}
              </p>
              <h3 className="text-2xl font-semibold text-[var(--ink-primary)] mt-1">
                {currentZone.title}
              </h3>
              <p className="text-sm text-[var(--ink-secondary)] mt-3 leading-relaxed">
                {currentZone.desc}
              </p>
            </div>

            <div className="py-4 border-y border-[var(--border-subtle)] flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[var(--ink-muted)] block">Rate</span>
                <span className="text-2xl font-semibold text-[var(--ink-primary)] tabular-nums">
                  {currentZone.price}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[var(--ink-muted)] block">Availability</span>
                <span className="text-sm font-medium text-[var(--ink-secondary)]">
                  {currentZone.time}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => onOpenBooking({ name: currentZone.title })}
                className="w-full py-3 px-4 text-sm font-medium text-[var(--ink-inverse)] bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] rounded-lg transition-colors cursor-pointer"
              >
                Enquire
              </button>

              <a
                href={`https://wa.me/919157691572?text=${encodeURIComponent(
                  `I want to know more about ${currentZone.title}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 text-sm font-medium text-[var(--ink-primary)] bg-[var(--surface-muted)] hover:bg-[var(--border-subtle)] rounded-lg transition-colors block text-center"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
