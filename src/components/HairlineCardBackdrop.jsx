import React, { useRef, useEffect } from 'react';

/**
 * HairlineCardBackdrop
 * Minimal, category-specific isometric line drawings inspired by @lucasmarkes/hairline.
 * Renders an authentic isometric architectural figure per trade:
 * - 'ac': Split AC unit with louvre vents & ambient airflow streams
 * - 'carpentry': Modern isometric armchair / sofa with tapered legs & cushions
 * - 'plumbing': Isometric pipe manifold, bibcock tap & water drop
 * - 'electrical': Modular switchboard plate with rocker switches & MCB
 * - 'painting': Paint roller with angled frame & wall swatch
 * - 'renovation': Freestanding oval bathtub with swan-neck mixer
 *
 * Adheres strictly to Hairline principles:
 * - Minimal, quiet single-stroke geometry (no slop glows or heavy fills)
 * - Spring inertia tracking answering the pointer
 * - Dim crease inside, crisp silhouette outside
 */
export default function HairlineCardBackdrop({ category }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const currentRef = useRef({ x: 0.5, y: 0.5, opacity: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const parent = canvas.parentElement;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const handlePointerEnter = () => {
      mouseRef.current.active = true;
    };
    const handlePointerLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = 0.5;
      mouseRef.current.y = 0.5;
    };
    const handlePointerMove = (e) => {
      const rect = parent.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        mouseRef.current.x = (e.clientX - rect.left) / rect.width;
        mouseRef.current.y = (e.clientY - rect.top) / rect.height;
      }
    };

    parent.addEventListener('mouseenter', handlePointerEnter);
    parent.addEventListener('mouseleave', handlePointerLeave);
    parent.addEventListener('mousemove', handlePointerMove);

    // Dynamic animation loop with spring inertia
    const render = () => {
      const targetOpacity = mouseRef.current.active ? 1 : 0;
      currentRef.current.opacity += (targetOpacity - currentRef.current.opacity) * 0.14;
      currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * 0.16;
      currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * 0.16;

      const w = parent.offsetWidth;
      const h = parent.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      if (currentRef.current.opacity > 0.008 && w > 0 && h > 0) {
        ctx.save();
        // Keep it restrained & minimal: quiet backdrop that doesn't compete with card copy
        ctx.globalAlpha = currentRef.current.opacity * 0.38;

        // Origin anchor: positioned gracefully in the upper-right / center backdrop
        const mx = (currentRef.current.x - 0.5) * 14;
        const my = (currentRef.current.y - 0.5) * 12;
        const ox = w * 0.72 + mx;
        const oy = h * 0.32 + my;

        ctx.strokeStyle = '#2563eb'; // Cobalt hairline
        ctx.fillStyle = 'transparent';
        ctx.lineWidth = 1;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        // 30-degree isometric projection constants
        const cos30 = Math.cos(Math.PI / 6); // ~0.866
        const sin30 = Math.sin(Math.PI / 6); // 0.5

        const isoX = (x, y) => (x - y) * cos30;
        const isoY = (x, y, z = 0) => (x + y) * sin30 - z;

        switch (category) {
          case 'ac': {
            // ==========================================
            // ISOMETRIC SPLIT AIR CONDITIONER UNIT
            // ==========================================
            const length = 52;
            const depth = 22;
            const height = 24;

            // Chassis Top Rhombus
            ctx.beginPath();
            ctx.moveTo(ox + isoX(0, 0), oy + isoY(0, 0, height));
            ctx.lineTo(ox + isoX(length, 0), oy + isoY(length, 0, height));
            ctx.lineTo(ox + isoX(length, depth), oy + isoY(length, depth, height));
            ctx.lineTo(ox + isoX(0, depth), oy + isoY(0, depth, height));
            ctx.closePath();
            ctx.stroke();

            // Front Face (facing viewer along Y axis)
            ctx.beginPath();
            ctx.moveTo(ox + isoX(length, 0), oy + isoY(length, 0, height));
            ctx.lineTo(ox + isoX(length, depth), oy + isoY(length, depth, height));
            ctx.lineTo(ox + isoX(length, depth), oy + isoY(length, depth, 0));
            ctx.lineTo(ox + isoX(length, 0), oy + isoY(length, 0, 0));
            ctx.closePath();
            ctx.stroke();

            // Bottom & Side Silhouette
            ctx.beginPath();
            ctx.moveTo(ox + isoX(0, depth), oy + isoY(0, depth, height));
            ctx.lineTo(ox + isoX(0, depth), oy + isoY(0, depth, 0));
            ctx.lineTo(ox + isoX(length, depth), oy + isoY(length, depth, 0));
            ctx.stroke();

            // Horizontal Airflow Louvre Vent Slot
            ctx.strokeStyle = '#64748b'; // Dim crease inside
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            const ventZ1 = 4;
            const ventZ2 = 9;
            ctx.moveTo(ox + isoX(length, 3), oy + isoY(length, 3, ventZ1));
            ctx.lineTo(ox + isoX(length, depth - 3), oy + isoY(length, depth - 3, ventZ1));
            ctx.lineTo(ox + isoX(length, depth - 3), oy + isoY(length, depth - 3, ventZ2));
            ctx.lineTo(ox + isoX(length, 3), oy + isoY(length, 3, ventZ2));
            ctx.closePath();
            ctx.stroke();

            // Digital Temp Display Accent Diamond
            ctx.beginPath();
            const tx = ox + isoX(length, depth - 7);
            const ty = oy + isoY(length, depth - 7, 16);
            ctx.moveTo(tx, ty - 2.5);
            ctx.lineTo(tx + 2.5, ty);
            ctx.lineTo(tx, ty + 2.5);
            ctx.lineTo(tx - 2.5, ty);
            ctx.closePath();
            ctx.stroke();

            // Gentle Airflow Streamlines
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 0.85;
            const sway = (currentRef.current.x - 0.5) * 8;
            for (let i = 0; i < 3; i++) {
              const startX = ox + isoX(length, 6 + i * 5);
              const startY = oy + isoY(length, 6 + i * 5, 4);
              ctx.beginPath();
              ctx.moveTo(startX, startY);
              ctx.bezierCurveTo(
                startX + 14 + sway, startY + 12,
                startX + 18 + sway, startY + 24,
                startX + 26 + sway, startY + 36
              );
              ctx.stroke();
            }
            break;
          }

          case 'carpentry': {
            // ==========================================
            // ISOMETRIC MODERN ARMCHAIR / SOFA
            // ==========================================
            const seatW = 34;
            const seatD = 32;
            const seatH = 14;
            const backH = 34;

            // Seat Cushion (isometric slab)
            ctx.beginPath();
            ctx.moveTo(ox + isoX(0, 0), oy + isoY(0, 0, seatH));
            ctx.lineTo(ox + isoX(seatW, 0), oy + isoY(seatW, 0, seatH));
            ctx.lineTo(ox + isoX(seatW, seatD), oy + isoY(seatW, seatD, seatH));
            ctx.lineTo(ox + isoX(0, seatD), oy + isoY(0, seatD, seatH));
            ctx.closePath();
            ctx.stroke();

            // Seat Front Drop
            ctx.beginPath();
            ctx.moveTo(ox + isoX(seatW, 0), oy + isoY(seatW, 0, seatH));
            ctx.lineTo(ox + isoX(seatW, seatD), oy + isoY(seatW, seatD, seatH));
            ctx.lineTo(ox + isoX(seatW, seatD), oy + isoY(seatW, seatD, seatH - 5));
            ctx.lineTo(ox + isoX(seatW, 0), oy + isoY(seatW, 0, seatH - 5));
            ctx.closePath();
            ctx.stroke();

            // Angled Backrest
            ctx.beginPath();
            ctx.moveTo(ox + isoX(0, 0), oy + isoY(0, 0, seatH));
            ctx.lineTo(ox + isoX(0, seatD), oy + isoY(0, seatD, seatH));
            ctx.lineTo(ox + isoX(-4, seatD), oy + isoY(-4, seatD, seatH + backH));
            ctx.lineTo(ox + isoX(-4, 0), oy + isoY(-4, 0, seatH + backH));
            ctx.closePath();
            ctx.stroke();

            // Armrests (Left & Right)
            ctx.beginPath();
            // Left Armrest
            ctx.moveTo(ox + isoX(0, 0), oy + isoY(0, 0, seatH));
            ctx.lineTo(ox + isoX(seatW, 0), oy + isoY(seatW, 0, seatH));
            ctx.lineTo(ox + isoX(seatW, 0), oy + isoY(seatW, 0, seatH + 10));
            ctx.lineTo(ox + isoX(0, 0), oy + isoY(0, 0, seatH + 10));
            ctx.closePath();
            // Right Armrest
            ctx.moveTo(ox + isoX(0, seatD), oy + isoY(0, seatD, seatH));
            ctx.lineTo(ox + isoX(seatW, seatD), oy + isoY(seatW, seatD, seatH));
            ctx.lineTo(ox + isoX(seatW, seatD), oy + isoY(seatW, seatD, seatH + 10));
            ctx.lineTo(ox + isoX(0, seatD), oy + isoY(0, seatD, seatH + 10));
            ctx.closePath();
            ctx.stroke();

            // 4 Slender Tapered Legs
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            // Front-Left Leg
            ctx.moveTo(ox + isoX(seatW - 2, 2), oy + isoY(seatW - 2, 2, seatH - 5));
            ctx.lineTo(ox + isoX(seatW + 2, 0), oy + isoY(seatW + 2, 0, 0));
            // Front-Right Leg
            ctx.moveTo(ox + isoX(seatW - 2, seatD - 2), oy + isoY(seatW - 2, seatD - 2, seatH - 5));
            ctx.lineTo(ox + isoX(seatW + 2, seatD), oy + isoY(seatW + 2, seatD, 0));
            // Rear-Left Leg
            ctx.moveTo(ox + isoX(2, 2), oy + isoY(2, 2, seatH - 5));
            ctx.lineTo(ox + isoX(-2, 0), oy + isoY(-2, 0, 0));
            // Rear-Right Leg
            ctx.moveTo(ox + isoX(2, seatD - 2), oy + isoY(2, seatD - 2, seatH - 5));
            ctx.lineTo(ox + isoX(-2, seatD), oy + isoY(-2, seatD, 0));
            ctx.stroke();
            break;
          }

          case 'plumbing': {
            // ==========================================
            // ISOMETRIC WATER TAP & FAUCET VALVE
            // ==========================================
            const pipeR = 4;
            const pipeH = 36;
            const spoutLen = 26;

            // Vertical Supply Pipe
            ctx.beginPath();
            ctx.moveTo(ox + isoX(-pipeR, 0), oy + isoY(-pipeR, 0, 0));
            ctx.lineTo(ox + isoX(-pipeR, 0), oy + isoY(-pipeR, 0, pipeH));
            ctx.moveTo(ox + isoX(pipeR, 0), oy + isoY(pipeR, 0, 0));
            ctx.lineTo(ox + isoX(pipeR, 0), oy + isoY(pipeR, 0, pipeH));
            ctx.stroke();

            // Faucet Body Tee & 90-deg Spout
            ctx.beginPath();
            ctx.moveTo(ox + isoX(pipeR, 0), oy + isoY(pipeR, 0, pipeH - 4));
            ctx.bezierCurveTo(
              ox + isoX(pipeR + 6, 0), oy + isoY(pipeR + 6, 0, pipeH - 2),
              ox + isoX(spoutLen, 0), oy + isoY(spoutLen, 0, pipeH - 6),
              ox + isoX(spoutLen, 0), oy + isoY(spoutLen, 0, pipeH - 14)
            );
            ctx.lineTo(ox + isoX(spoutLen - 6, 0), oy + isoY(spoutLen - 6, 0, pipeH - 14));
            ctx.bezierCurveTo(
              ox + isoX(spoutLen - 6, 0), oy + isoY(spoutLen - 6, 0, pipeH - 10),
              ox + isoX(pipeR, 0), oy + isoY(pipeR, 0, pipeH - 10),
              ox + isoX(pipeR, 0), oy + isoY(pipeR, 0, pipeH - 10)
            );
            ctx.stroke();

            // Aerator Spout Ring
            ctx.beginPath();
            ctx.ellipse(
              ox + isoX(spoutLen - 3, 0),
              oy + isoY(spoutLen - 3, 0, pipeH - 14),
              3.5, 1.8, 0, 0, Math.PI * 2
            );
            ctx.stroke();

            // Top Turn-Handle Cross Wheel
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            const vY = oy + isoY(0, 0, pipeH + 8);
            // Handle spindle
            ctx.moveTo(ox, oy + isoY(0, 0, pipeH));
            ctx.lineTo(ox, vY);
            // 4-prong wheel
            ctx.moveTo(ox - 10, vY - 4);
            ctx.lineTo(ox + 10, vY + 4);
            ctx.moveTo(ox + 10, vY - 4);
            ctx.lineTo(ox - 10, vY + 4);
            ctx.stroke();

            // Delicate Suspended Falling Water Droplet
            ctx.strokeStyle = '#0284c7';
            ctx.lineWidth = 0.9;
            const dropX = ox + isoX(spoutLen - 3, 0);
            const dropY = oy + isoY(spoutLen - 3, 0, pipeH - 20) + (currentRef.current.y * 8);
            ctx.beginPath();
            ctx.moveTo(dropX, dropY - 5);
            ctx.bezierCurveTo(dropX + 2.5, dropY - 2, dropX + 2.5, dropY + 3, dropX, dropY + 3);
            ctx.bezierCurveTo(dropX - 2.5, dropY + 3, dropX - 2.5, dropY - 2, dropX, dropY - 5);
            ctx.closePath();
            ctx.stroke();

            // Ground Surface Ripple Ring
            ctx.beginPath();
            ctx.ellipse(dropX, dropY + 16, 8, 3.5, 0, 0, Math.PI * 2);
            ctx.stroke();
            break;
          }

          case 'electrical': {
            // ==========================================
            // ISOMETRIC MODULAR SWITCHBOARD & MCB
            // ==========================================
            const plateW = 48;
            const plateH = 34;
            const plateDepth = 5;

            // Faceplate Front
            ctx.beginPath();
            ctx.moveTo(ox + isoX(0, 0), oy + isoY(0, 0, plateH));
            ctx.lineTo(ox + isoX(plateW, 0), oy + isoY(plateW, 0, plateH));
            ctx.lineTo(ox + isoX(plateW, 0), oy + isoY(plateW, 0, 0));
            ctx.lineTo(ox + isoX(0, 0), oy + isoY(0, 0, 0));
            ctx.closePath();
            ctx.stroke();

            // Plate Bevel Side / Top
            ctx.beginPath();
            ctx.moveTo(ox + isoX(0, 0), oy + isoY(0, 0, plateH));
            ctx.lineTo(ox + isoX(0, -plateDepth), oy + isoY(0, -plateDepth, plateH));
            ctx.lineTo(ox + isoX(plateW, -plateDepth), oy + isoY(plateW, -plateDepth, plateH));
            ctx.lineTo(ox + isoX(plateW, 0), oy + isoY(plateW, 0, plateH));
            ctx.stroke();

            // Two Modular Rocker Switches
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 0.85;
            for (let i = 0; i < 2; i++) {
              const swX = 8 + i * 14;
              ctx.beginPath();
              ctx.rect(ox + isoX(swX, 0) - 4, oy + isoY(swX, 0, 22) - 8, 8, 14);
              ctx.stroke();
              // Rocker crease
              ctx.beginPath();
              ctx.moveTo(ox + isoX(swX, 0) - 4, oy + isoY(swX, 0, 22) - 1);
              ctx.lineTo(ox + isoX(swX, 0) + 4, oy + isoY(swX, 0, 22) - 1);
              ctx.stroke();
            }

            // MCB Miniature Breaker Toggle Slot
            const mcbX = 36;
            ctx.beginPath();
            ctx.rect(ox + isoX(mcbX, 0) - 4, oy + isoY(mcbX, 0, 22) - 9, 8, 16);
            ctx.stroke();
            // Trip Lever
            ctx.beginPath();
            ctx.moveTo(ox + isoX(mcbX, 0) - 2, oy + isoY(mcbX, 0, 25));
            ctx.lineTo(ox + isoX(mcbX, 0) + 2, oy + isoY(mcbX, 0, 21));
            ctx.stroke();

            // Diagnostic Conduit Trace Spark
            ctx.strokeStyle = '#eab308';
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            const sx = ox + isoX(plateW, 0);
            const sy = oy + isoY(plateW, 0, plateH / 2);
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx + 8, sy - 4);
            ctx.lineTo(sx + 6, sy + 3);
            ctx.lineTo(sx + 16, sy - 2);
            ctx.stroke();
            break;
          }

          case 'painting': {
            // ==========================================
            // ISOMETRIC PAINT ROLLER & WALL SWATCH
            // ==========================================
            // Wall Swatch Background Panel
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.rect(ox - 24, oy - 26, 42, 46);
            ctx.stroke();

            // Diagonal Texture Hatching on Wall
            ctx.beginPath();
            for (let d = -20; d < 40; d += 8) {
              ctx.moveTo(ox + d - 18, oy - 26);
              ctx.lineTo(ox + d + 8, oy + 20);
            }
            ctx.stroke();

            // Cylindrical Paint Roller Drum
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 1;
            const rLen = 28;
            const rRad = 7;
            ctx.beginPath();
            // Left Ellipse
            ctx.ellipse(ox - 10, oy - 2, rRad, rRad * 0.5, Math.PI / 4, 0, Math.PI * 2);
            // Cylinder Body
            ctx.moveTo(ox - 10 + rRad * 0.7, oy - 2 - rRad * 0.7);
            ctx.lineTo(ox - 10 + rLen + rRad * 0.7, oy - 2 + rLen * 0.3 - rRad * 0.7);
            ctx.moveTo(ox - 10 - rRad * 0.7, oy - 2 + rRad * 0.7);
            ctx.lineTo(ox - 10 + rLen - rRad * 0.7, oy - 2 + rLen * 0.3 + rRad * 0.7);
            // Right Ellipse
            ctx.ellipse(ox - 10 + rLen, oy - 2 + rLen * 0.3, rRad, rRad * 0.5, Math.PI / 4, 0, Math.PI * 2);
            ctx.stroke();

            // Roller Wire Steel Frame & Handle
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            const axisX = ox - 10 + rLen;
            const axisY = oy - 2 + rLen * 0.3;
            ctx.moveTo(axisX, axisY);
            ctx.lineTo(axisX + 8, axisY + 3);
            ctx.lineTo(axisX + 6, axisY + 18);
            ctx.lineTo(axisX - 4, axisY + 22);
            // Ergonomic grip handle
            ctx.lineTo(axisX - 16, axisY + 36);
            ctx.stroke();
            break;
          }

          case 'renovation':
          default: {
            // ==========================================
            // ISOMETRIC FREESTANDING BATHTUB & MIXER
            // ==========================================
            const tubRx = 28;
            const tubRy = 14;
            const tubH = 18;

            // Outer Top Rim Ellipse
            ctx.beginPath();
            ctx.ellipse(ox, oy, tubRx, tubRy, 0, 0, Math.PI * 2);
            ctx.stroke();

            // Inner Water Rim Ellipse (dim crease)
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.ellipse(ox, oy, tubRx - 3, tubRy - 2, 0, 0, Math.PI * 2);
            ctx.stroke();

            // Tub Basin Bottom Silhouette
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ox - tubRx, oy);
            ctx.bezierCurveTo(
              ox - tubRx + 3, oy + tubH,
              ox + tubRx - 3, oy + tubH,
              ox + tubRx, oy
            );
            ctx.stroke();

            // Floor Base Plinth
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.ellipse(ox, oy + tubH - 2, tubRx * 0.65, tubRy * 0.5, 0, 0, Math.PI * 2);
            ctx.stroke();

            // Slender Swan-Neck Mixer Faucet
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            const fx = ox - tubRx * 0.45;
            const fy = oy - tubRy * 0.6;
            ctx.moveTo(fx, fy + 8);
            ctx.lineTo(fx, fy - 16);
            ctx.bezierCurveTo(fx, fy - 24, fx + 10, fy - 24, fx + 10, fy - 14);
            ctx.stroke();
            break;
          }
        }

        // Corner Calibration Drafting Tick Marks (Architectural touch)
        const mLen = 6;
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        // Top-right corner
        ctx.moveTo(w - 14 - mLen, 14); ctx.lineTo(w - 14, 14); ctx.lineTo(w - 14, 14 + mLen);
        // Bottom-right corner
        ctx.moveTo(w - 14 - mLen, h - 14); ctx.lineTo(w - 14, h - 14); ctx.lineTo(w - 14, h - 14 - mLen);
        ctx.stroke();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      parent.removeEventListener('mouseenter', handlePointerEnter);
      parent.removeEventListener('mouseleave', handlePointerLeave);
      parent.removeEventListener('mousemove', handlePointerMove);
    };
  }, [category]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 rounded-2xl"
      aria-hidden="true"
    />
  );
}
