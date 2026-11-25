import React, { useRef, useEffect, useState } from 'react';

/**
 * Hairline Motion Design Component
 * Interactive isometric line architecture answering pointer coordinates.
 * Pure isometric projection with mathematical rotation, live zone detection,
 * and high-contrast safety lime illumination.
 */
export default function HairlineHeroMotion() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [activeZone, setActiveZone] = useState('ROOF_CLIMATE');
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });

  const ZONES = {
    ROOF_CLIMATE: {
      tag: "ZONE 01 // ROOFTOP",
      title: "HVAC & Roof Waterproofing",
      detail: "High-pressure jet wash, R32 pressure testing & elastomeric seal"
    },
    BATH_PLUMBING: {
      tag: "ZONE 02 // SANITARY CORE",
      title: "Concealed Plumbing & Leak Sensor",
      detail: "Ultrasonic acoustic leak detection & zero-break pipe replacement"
    },
    POWER_ENTRY: {
      tag: "ZONE 03 // ELECTRICAL & FOYER",
      title: "MCB Safety & Smart Lock Entry",
      detail: "Tripping diagnostics, load balancing & biometric hardware calibration"
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let targetRotX = 0.55;
    let targetRotY = 0.65;
    let currentRotX = 0.55;
    let currentRotY = 0.65;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const width = 480;
    const height = 400;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handlePointerMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      targetRotY = 0.65 + normX * 0.25;
      targetRotX = 0.55 + normY * 0.15;
      setPointerPos({ x: normX, y: normY });

      // Determine active zone based on vertical pointer position
      if (normY < -0.15) {
        setActiveZone('ROOF_CLIMATE');
      } else if (normY <= 0.25) {
        setActiveZone('BATH_PLUMBING');
      } else {
        setActiveZone('POWER_ENTRY');
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('pointermove', handlePointerMove);
    }

    // 3D Point Projection Helper
    const project = (x, y, z, cx, cy) => {
      // Rotate Y
      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;

      // Rotate X
      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const scale = 1.35;
      return {
        px: cx + x1 * scale,
        py: cy + y2 * scale,
        depth: z2
      };
    };

    // Draw Isometric Box
    const drawIsometricSlab = (yBase, height, width, depth, cx, cy, isHighlighted, label) => {
      const hw = width / 2;
      const hd = depth / 2;

      // 8 Vertices
      const p = [
        project(-hw, yBase, -hd, cx, cy),
        project(hw, yBase, -hd, cx, cy),
        project(hw, yBase, hd, cx, cy),
        project(-hw, yBase, hd, cx, cy),
        project(-hw, yBase - height, -hd, cx, cy),
        project(hw, yBase - height, -hd, cx, cy),
        project(hw, yBase - height, hd, cx, cy),
        project(-hw, yBase - height, hd, cx, cy)
      ];

      ctx.save();
      
      // Face styling
      ctx.lineWidth = isHighlighted ? 2.0 : 1.2;
      ctx.strokeStyle = isHighlighted ? '#ccff00' : 'rgba(255, 255, 255, 0.22)';
      ctx.fillStyle = isHighlighted ? 'rgba(204, 255, 0, 0.06)' : 'rgba(255, 255, 255, 0.02)';

      // Draw Top Face
      ctx.beginPath();
      ctx.moveTo(p[4].px, p[4].py);
      ctx.lineTo(p[5].px, p[5].py);
      ctx.lineTo(p[6].px, p[6].py);
      ctx.lineTo(p[7].px, p[7].py);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Front Left Face
      ctx.beginPath();
      ctx.moveTo(p[7].px, p[7].py);
      ctx.lineTo(p[6].px, p[6].py);
      ctx.lineTo(p[2].px, p[2].py);
      ctx.lineTo(p[3].px, p[3].py);
      ctx.closePath();
      ctx.stroke();

      // Front Right Face
      ctx.beginPath();
      ctx.moveTo(p[6].px, p[6].py);
      ctx.lineTo(p[5].px, p[5].py);
      ctx.lineTo(p[1].px, p[1].py);
      ctx.lineTo(p[2].px, p[2].py);
      ctx.closePath();
      ctx.stroke();

      // Internal architectural grid lines on top face
      if (isHighlighted) {
        ctx.strokeStyle = 'rgba(204, 255, 0, 0.45)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Cross lines
        const mid1 = { px: (p[4].px + p[5].px) / 2, py: (p[4].py + p[5].py) / 2 };
        const mid2 = { px: (p[7].px + p[6].px) / 2, py: (p[7].py + p[6].py) / 2 };
        ctx.moveTo(mid1.px, mid1.py);
        ctx.lineTo(mid2.px, mid2.py);
        ctx.stroke();

        // Pulsing active marker
        ctx.fillStyle = '#ccff00';
        ctx.beginPath();
        ctx.arc(p[6].px - 14, p[6].py - 12, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const render = () => {
      // Spring inertia interpolation
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2 + 15;

      // Draw 3-tiered architectural home maintenance structure
      // 1. Lower Level: Electrical & Foyer
      drawIsometricSlab(70, 48, 160, 130, cx, cy, activeZone === 'POWER_ENTRY', 'POWER');

      // 2. Mid Level: Plumbing Core & Wet Wall
      drawIsometricSlab(14, 46, 140, 115, cx, cy, activeZone === 'BATH_PLUMBING', 'PLUMB');

      // 3. Top Level: Rooftop & AC Deck
      drawIsometricSlab(-40, 44, 115, 95, cx, cy, activeZone === 'ROOF_CLIMATE', 'ROOF');

      // Coordinate Hairline Crosshairs
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(30, cy);
      ctx.lineTo(width - 30, cy);
      ctx.moveTo(cx, 30);
      ctx.lineTo(cx, height - 30);
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener('pointermove', handlePointerMove);
      }
    };
  }, [activeZone]);

  const currentInfo = ZONES[activeZone];

  return (
    <div 
      ref={containerRef}
      className="relative bg-[#18191e] border border-white/10 rounded-2xl p-4 sm:p-5 overflow-hidden shadow-2xl hairline-stage group"
    >
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
          <span className="font-mono text-[#ccff00] tracking-wider text-[11px] font-semibold">
            HAIRLINE 3D DIAGNOSTIC ENGINE
          </span>
        </div>
        <span className="font-mono text-white/50 text-[10px]">
          INTERACTION: MOVE POINTER
        </span>
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative flex justify-center py-2">
        <canvas 
          ref={canvasRef} 
          style={{ width: '100%', maxWidth: '440px', height: '320px' }}
          className="mx-auto block"
        />

        {/* Hover Coordinate Tag */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono text-white/70">
          ROT: [{(pointerPos.x).toFixed(2)}, {(pointerPos.y).toFixed(2)}]
        </div>
      </div>

      {/* Dynamic Zone Read-out Bar */}
      <div className="mt-2 bg-[#121316] border border-white/10 rounded-xl p-3.5 transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#ccff00] uppercase">
            {currentInfo.tag}
          </span>
          <span className="text-[10px] bg-white/10 text-white/90 px-2 py-0.5 rounded font-mono">
            45m Dispatch Ready
          </span>
        </div>
        <h4 className="text-white font-bold text-sm mt-1">{currentInfo.title}</h4>
        <p className="text-white/60 text-xs mt-0.5">{currentInfo.detail}</p>
      </div>
    </div>
  );
}
