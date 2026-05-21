import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ─────────────────────────────────────────────────────────────────────
   ParticleBackground — Three.js r180
   Desktop only. Returns null on mobile (< 768px) to preserve
   smooth scrolling and prevent GPU overload on mobile devices.
   Installed securely from npm: three@0.180.0
   ───────────────────────────────────────────────────────────────────── */

const PARTICLE_COUNT  = 260;
const SPREAD          = 600;
const MOUSE_RADIUS    = 140;
const MOUSE_STRENGTH  = 6.5;
const DRIFT_SPEED     = 0.00018;
const DRIFT_AMPLITUDE = 1.4;
const RETURN_SPRING   = 0.018;
const DAMPING         = 0.88;
const DOT_SIZE        = 3.2;
const DOT_OPACITY     = 0.6;

export default function ParticleBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    // ── Hard bail on mobile — no WebGL at all ───────────────────────────
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    const container = containerRef.current;
    if (!container) return;

    /* ── Renderer ───────────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* ── Scene & Camera ─────────────────────────────────────────── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 1, 2000);
    camera.position.z = 350;

    /* ── Size from container ────────────────────────────────────── */
    const getSize = () => ({
      w: container.clientWidth  || window.innerWidth,
      h: container.clientHeight || window.innerHeight,
    });

    const resize = () => {
      const { w, h } = getSize();
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    /* ── Mouse — offset relative to container ───────────────────── */
    const mouse = { px: -9999, py: -9999 };
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.px = e.clientX - rect.left;
      mouse.py = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    /* ── Pause when section leaves viewport ─────────────────────── */
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(container);

    /* ── Particle data ──────────────────────────────────────────── */
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const base      = new Float32Array(PARTICLE_COUNT * 3);
    const vel       = new Float32Array(PARTICLE_COUNT * 3);
    const phaseX    = new Float32Array(PARTICLE_COUNT);
    const phaseY    = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const x  = (Math.random() - 0.5) * SPREAD;
      const y  = (Math.random() - 0.5) * SPREAD;
      const z  = (Math.random() - 0.5) * 200;
      positions[i3]     = base[i3]     = x;
      positions[i3 + 1] = base[i3 + 1] = y;
      positions[i3 + 2] = base[i3 + 2] = z;
      phaseX[i] = Math.random() * Math.PI * 2;
      phaseY[i] = Math.random() * Math.PI * 2;
    }

    /* ── Geometry & Material ────────────────────────────────────── */
    const geometry = new THREE.BufferGeometry();
    const posAttr  = new THREE.BufferAttribute(positions, 3);
    geometry.setAttribute('position', posAttr);

    const material = new THREE.PointsMaterial({
      color:           0x06b6d4,
      size:            DOT_SIZE,
      transparent:     true,
      opacity:         DOT_OPACITY,
      sizeAttenuation: true,
      depthWrite:      false,
    });

    scene.add(new THREE.Points(geometry, material));

    /* ── Project 3D → container-local screen coords ─────────────── */
    const v3 = new THREE.Vector3();
    const toLocal = (x, y, z) => {
      const { w, h } = getSize();
      v3.set(x, y, z).project(camera);
      return {
        sx: (v3.x *  0.5 + 0.5) * w,
        sy: (v3.y * -0.5 + 0.5) * h,
      };
    };

    /* ── Animation loop ─────────────────────────────────────────── */
    let t = 0, raf;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible) return;
      t += DRIFT_SPEED;

      const arr = posAttr.array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;

        const targetX = base[i3]     + Math.sin(t * 1300 + phaseX[i]) * DRIFT_AMPLITUDE;
        const targetY = base[i3 + 1] + Math.cos(t * 1000 + phaseY[i]) * DRIFT_AMPLITUDE;

        const { sx, sy } = toLocal(arr[i3], arr[i3 + 1], arr[i3 + 2]);
        const dx   = sx - mouse.px;
        const dy   = sy - mouse.py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0.5) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_STRENGTH;
          vel[i3]     += (dx / dist) * force;
          vel[i3 + 1] -= (dy / dist) * force;
        }

        vel[i3]     += (targetX - arr[i3])     * RETURN_SPRING;
        vel[i3 + 1] += (targetY - arr[i3 + 1]) * RETURN_SPRING;
        vel[i3]     *= DAMPING;
        vel[i3 + 1] *= DAMPING;

        arr[i3]     += vel[i3];
        arr[i3 + 1] += vel[i3 + 1];
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    /* ── Cleanup ─────────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
      io.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (isMobile) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position:      'absolute',
        inset:         0,
        zIndex:        0,
        pointerEvents: 'none',
      }}
    />
  );
}
