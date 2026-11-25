import React, { useRef, useEffect } from 'react';

/**
 * HairlineCardBackdrop
 * Minimal, category-specific isometric line drawings inspired by @lucasmarkes/hairline.
 * Positioned in the right corner directly above the price and action row.
 *
 * Distinct minimal hairline figure per trade:
 * - 'ac': Split AC unit with louvre vents & ambient airflow streams
 * - 'carpentry': Modern isometric armchair / sofa with tapered legs & cushions
 * - 'plumbing': Isometric pipe manifold, bibcock tap & water drop
 * - 'electrical': Modular switchboard plate with rocker switches & MCB
 * - 'painting': Paint roller with angled frame & wall swatch
 * - 'renovation': Freestanding oval bathtub with swan-neck mixer
 *
 * Adheres strictly to Hairline principles:
 * - Minimal, quiet single-stroke geometry (no slop glows or heavy fills)
 * - Rest pose visible at low opacity; activates with spring inertia answering pointer on hover
 * - Dim crease inside, crisp silhouette outside
 */
export default function HairlineCardBackdrop({ category }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const currentRef = useRef({ x: 0.5, y: 0.5, opacity: 0.2 }); // Rest pose subtly visible

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

    // Spring inertia animation loop
    const render = () => {
      // Rest opacity ~0.2, Hover opacity ~0.65 (Hairline Rule 05: rest is designed)
      const targetOpacity = mouseRef.current.active ? 0.65 : 0.2;
      currentRef.current.opacity += (targetOpacity - currentRef.current.opacity) * 0.12;
      currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * 0.15;
      currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * 0.15;

      const w = parent.offsetWidth;
      const h = parent.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      if (w > 0 && h > 0) {
        ctx.save();
        ctx.globalAlpha = currentRef.current.opacity;

        // Position: In the right corner directly above the price
        // Price sits on the right side ~h - 90px; this places figure ~h - 150px
        const mx = (currentRef.current.x - 0.5) * 12;
        const my = (currentRef.current.y - 0.5) * 10;
        const ox = Math.max(w - 68, w * 0.72) + mx;
        const oy = Math.max(h - 152, h * 0.62) + my;

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
            const length = 44;
            const depth = 18;
            const height = 20;

            // Chassis Top Rhombus
            ctx.beginPath();
            ctx.moveTo(ox + isoX(0, 0), oy + isoY(0, 0, height));
            ctx.lineTo(ox + isoX(length, 0), oy + isoY(length, 0, height));
            ctx.lineTo(ox + isoX(length, depth), oy + isoY(length, depth, height));
            ctx.lineTo(ox + isoX(0, depth), oy + isoY(0, depth, height));
            ctx.closePath();
            ctx.stroke();

            // Front Face
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
            const ventZ1 = 3;
            const ventZ2 = 7;
            ctx.moveTo(ox + isoX(length, 2), oy + isoY(length, 2, ventZ1));
            ctx.lineTo(ox + isoX(length, depth - 2), oy + isoY(length, depth - 2, ventZ1));
            ctx.lineTo(ox + isoX(length, depth - 2), oy + isoY(length, depth - 2, ventZ2));
            ctx.lineTo(ox + isoX(length, 2), oy + isoY(length, 2, ventZ2));
            ctx.closePath();
            ctx.stroke();

            // Digital Temp Display Accent Diamond
            ctx.beginPath();
            const tx = ox + isoX(length, depth - 5);
            const ty = oy + isoY(length, depth - 5, 13);
            ctx.moveTo(tx, ty - 2);
            ctx.lineTo(tx + 2, ty);
            ctx.lineTo(tx, ty + 2);
            ctx.lineTo(tx - 2, ty);
            ctx.closePath();
            ctx.stroke();

            // Airflow Streamlines
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 0.85;
            const sway = (currentRef.current.x - 0.5) * 6;
            for (let i = 0; i < 3; i++) {
              const startX = ox + isoX(length, 4 + i * 4.5);
              const startY = oy + isoY(length, 4 + i * 4.5, 3);
              ctx.beginPath();
              ctx.moveTo(startX, startY);
              ctx.bezierCurveTo(
                startX + 10 + sway, startY + 8,
                startX + 14 + sway, startY + 16,
                startX + 20 + sway, startY + 24
              );
              ctx.stroke();
            }
            break;
          }

          case 'carpentry': {
            // ==========================================
            // ISOMETRIC MODERN ARMCHAIR / SOFA
            // ==========================================
            const seatW = 28;
            const seatD = 26;
            const seatH = 12;
            const backH = 26;

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
            ctx.lineTo(ox + isoX(seatW, seatD), oy + isoY(seatW, seatD, seatH - 4));
            ctx.lineTo(ox + isoX(seatW, 0), oy + isoY(seatW, 0, seatH - 4));
            ctx.closePath();
            ctx.stroke();

            // Angled Backrest
            ctx.beginPath();
            ctx.moveTo(ox + isoX(0, 0), oy + isoY(0, 0, seatH));
            ctx.lineTo(ox + isoX(0, seatD), oy + isoY(0, seatD, seatH));
            ctx.lineTo(ox + isoX(-3, seatD), oy + isoY(-3, seatD, seatH + backH));
            ctx.lineTo(ox + isoX(-3, 0), oy + isoY(-3, 0, seatH + backH));
            ctx.closePath();
            ctx.stroke();

            // Armrests
            ctx.beginPath();
            // Left Armrest
            ctx.moveTo(ox + isoX(0, 0), oy + isoY(0, 0, seatH));
            ctx.lineTo(ox + isoX(seatW, 0), oy + isoY(seatW, 0, seatH));
            ctx.lineTo(ox + isoX(seatW, 0), oy + isoY(seatW, 0, seatH + 8));
            ctx.lineTo(ox + isoX(0, 0), oy + isoY(0, 0, seatH + 8));
            ctx.closePath();
            // Right Armrest
            ctx.moveTo(ox + isoX(0, seatD), oy + isoY(0, seatD, seatH));
            ctx.lineTo(ox + isoX(seatW, seatD), oy + isoY(seatW, seatD, seatH));
            ctx.lineTo(ox + isoX(seatW, seatD), oy + isoY(seatW, seatD, seatH + 8));
            ctx.lineTo(ox + isoX(0, seatD), oy + isoY(0, seatD, seatH + 8));
            ctx.closePath();
            ctx.stroke();

            // 4 Tapered Legs
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(ox + isoX(seatW - 2, 2), oy + isoY(seatW - 2, 2, seatH - 4));
            ctx.lineTo(ox + isoX(seatW + 2, 0), oy + isoY(seatW + 2, 0, 0));
            ctx.moveTo(ox + isoX(seatW - 2, seatD - 2), oy + isoY(seatW - 2, seatD - 2, seatH - 4));
            ctx.lineTo(ox + isoX(seatW + 2, seatD), oy + isoY(seatW + 2, seatD, 0));
            ctx.moveTo(ox + isoX(2, 2), oy + isoY(2, 2, seatH - 4));
            ctx.lineTo(ox + isoX(-2, 0), oy + isoY(-2, 0, 0));
            ctx.moveTo(ox + isoX(2, seatD - 2), oy + isoY(2, seatD - 2, seatH - 4));
            ctx.lineTo(ox + isoX(-2, seatD), oy + isoY(-2, seatD, 0));
            ctx.stroke();
            break;
          }

          case 'plumbing': {
            // ==========================================
            // ISOMETRIC WATER TAP & FAUCET VALVE
            // ==========================================
            const pipeR = 3.5;
            const pipeH = 30;
            const spoutLen = 22;

            // Vertical Supply Pipe
            ctx.beginPath();
            ctx.moveTo(ox + isoX(-pipeR, 0), oy + isoY(-pipeR, 0, 0));
            ctx.lineTo(ox + isoX(-pipeR, 0), oy + isoY(-pipeR, 0, pipeH));
            ctx.moveTo(ox + isoX(pipeR, 0), oy + isoY(pipeR, 0, 0));
            ctx.lineTo(ox + isoX(pipeR, 0), oy + isoY(pipeR, 0, pipeH));
            ctx.stroke();

            // Faucet Body Tee & 90-deg Spout
            ctx.beginPath();
            ctx.moveTo(ox + isoX(pipeR, 0), oy + isoY(pipeR, 0, pipeH - 3));
            ctx.bezierCurveTo(
              ox + isoX(pipeR + 5, 0), oy + isoY(pipeR + 5, 0, pipeH - 2),
              ox + isoX(spoutLen, 0), oy + isoY(spoutLen, 0, pipeH - 5),
              ox + isoX(spoutLen, 0), oy + isoY(spoutLen, 0, pipeH - 12)
            );
            ctx.lineTo(ox + isoX(spoutLen - 5, 0), oy + isoY(spoutLen - 5, 0, pipeH - 12));
            ctx.bezierCurveTo(
              ox + isoX(spoutLen - 5, 0), oy + isoY(spoutLen - 5, 0, pipeH - 8),
              ox + isoX(pipeR, 0), oy + isoY(pipeR, 0, pipeH - 8),
              ox + isoX(pipeR, 0), oy + isoY(pipeR, 0, pipeH - 8)
            );
            ctx.stroke();

            // Aerator Spout Ring
            ctx.beginPath();
            ctx.ellipse(
              ox + isoX(spoutLen - 2.5, 0),
              oy + isoY(spoutLen - 2.5, 0, pipeH - 12),
              3, 1.5, 0, 0, Math.PI * 2
            );
            ctx.stroke();

            // Top Turn-Handle Cross Wheel
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            const vY = oy + isoY(0, 0, pipeH + 6);
            ctx.moveTo(ox, oy + isoY(0, 0, pipeH));
            ctx.lineTo(ox, vY);
            ctx.moveTo(ox - 8, vY - 3);
            ctx.lineTo(ox + 8, vY + 3);
            ctx.moveTo(ox + 8, vY - 3);
            ctx.lineTo(ox - 8, vY + 3);
            ctx.stroke();

            // Falling Water Droplet
            ctx.strokeStyle = '#0284c7';
            ctx.lineWidth = 0.9;
            const dropX = ox + isoX(spoutLen - 2.5, 0);
            const dropY = oy + isoY(spoutLen - 2.5, 0, pipeH - 17) + (currentRef.current.y * 6);
            ctx.beginPath();
            ctx.moveTo(dropX, dropY - 4);
            ctx.bezierCurveTo(dropX + 2, dropY - 1, dropX + 2, dropY + 2.5, dropX, dropY + 2.5);
            ctx.bezierCurveTo(dropX - 2, dropY + 2.5, dropX - 2, dropY - 1, dropX, dropY - 4);
            ctx.closePath();
            ctx.stroke();

            // Ground Surface Ripple Ring
            ctx.beginPath();
            ctx.ellipse(dropX, dropY + 12, 7, 3, 0, 0, Math.PI * 2);
            ctx.stroke();
            break;
          }

          case 'electrical': {
            // ==========================================
            // ISOMETRIC MODULAR SWITCHBOARD & MCB
            // ==========================================
            const plateW = 40;
            const plateH = 28;
            const plateDepth = 4;

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
              const swX = 6 + i * 11;
              ctx.beginPath();
              ctx.rect(ox + isoX(swX, 0) - 3, oy + isoY(swX, 0, 18) - 6, 6, 12);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(ox + isoX(swX, 0) - 3, oy + isoY(swX, 0, 18) - 1);
              ctx.lineTo(ox + isoX(swX, 0) + 3, oy + isoY(swX, 0, 18) - 1);
              ctx.stroke();
            }

            // MCB Miniature Breaker Toggle Slot
            const mcbX = 29;
            ctx.beginPath();
            ctx.rect(ox + isoX(mcbX, 0) - 3, oy + isoY(mcbX, 0, 18) - 7, 6, 14);
            ctx.stroke();
            // Trip Lever
            ctx.beginPath();
            ctx.moveTo(ox + isoX(mcbX, 0) - 1.5, oy + isoY(mcbX, 0, 20));
            ctx.lineTo(ox + isoX(mcbX, 0) + 1.5, oy + isoY(mcbX, 0, 17));
            ctx.stroke();

            // Diagnostic Conduit Trace Spark
            ctx.strokeStyle = '#eab308';
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            const sx = ox + isoX(plateW, 0);
            const sy = oy + isoY(plateW, 0, plateH / 2);
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx + 6, sy - 3);
            ctx.lineTo(sx + 5, sy + 2);
            ctx.lineTo(sx + 13, sy - 2);
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
            ctx.rect(ox - 20, oy - 22, 36, 38);
            ctx.stroke();

            // Diagonal Texture Hatching
            ctx.beginPath();
            for (let d = -16; d < 32; d += 6) {
              ctx.moveTo(ox + d - 14, oy - 22);
              ctx.lineTo(ox + d + 6, oy + 16);
            }
            ctx.stroke();

            // Cylindrical Paint Roller Drum
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 1;
            const rLen = 22;
            const rRad = 6;
            ctx.beginPath();
            ctx.ellipse(ox - 8, oy - 2, rRad, rRad * 0.5, Math.PI / 4, 0, Math.PI * 2);
            ctx.moveTo(ox - 8 + rRad * 0.7, oy - 2 - rRad * 0.7);
            ctx.lineTo(ox - 8 + rLen + rRad * 0.7, oy - 2 + rLen * 0.3 - rRad * 0.7);
            ctx.moveTo(ox - 8 - rRad * 0.7, oy - 2 + rRad * 0.7);
            ctx.lineTo(ox - 8 + rLen - rRad * 0.7, oy - 2 + rLen * 0.3 + rRad * 0.7);
            ctx.ellipse(ox - 8 + rLen, oy - 2 + rLen * 0.3, rRad, rRad * 0.5, Math.PI / 4, 0, Math.PI * 2);
            ctx.stroke();

            // Roller Wire Steel Frame & Handle
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            const axisX = ox - 8 + rLen;
            const axisY = oy - 2 + rLen * 0.3;
            ctx.moveTo(axisX, axisY);
            ctx.lineTo(axisX + 6, axisY + 2);
            ctx.lineTo(axisX + 4, axisY + 14);
            ctx.lineTo(axisX - 3, axisY + 18);
            ctx.lineTo(axisX - 12, axisY + 28);
            ctx.stroke();
            break;
          }

          case 'renovation':
          default: {
            // ==========================================
            // ISOMETRIC FREESTANDING BATHTUB & MIXER
            // ==========================================
            const tubRx = 24;
            const tubRy = 12;
            const tubH = 15;

            // Outer Top Rim Ellipse
            ctx.beginPath();
            ctx.ellipse(ox, oy, tubRx, tubRy, 0, 0, Math.PI * 2);
            ctx.stroke();

            // Inner Water Rim Ellipse
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.ellipse(ox, oy, tubRx - 2.5, tubRy - 1.8, 0, 0, Math.PI * 2);
            ctx.stroke();

            // Tub Basin Bottom Silhouette
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ox - tubRx, oy);
            ctx.bezierCurveTo(
              ox - tubRx + 2.5, oy + tubH,
              ox + tubRx - 2.5, oy + tubH,
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
            ctx.moveTo(fx, fy + 6);
            ctx.lineTo(fx, fy - 13);
            ctx.bezierCurveTo(fx, fy - 19, fx + 8, fy - 19, fx + 8, fy - 11);
            ctx.stroke();
            break;
          }
        }

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
