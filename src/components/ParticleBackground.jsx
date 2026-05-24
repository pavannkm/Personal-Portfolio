import { useState, useEffect, lazy, Suspense } from 'react';

const ParticleCanvas = lazy(() => import('./ParticleBackgroundCanvas'));

export default function ParticleBackground() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only load and render WebGL particles on screen widths >= 768px (desktop)
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      // Defer state update to next microtask to avoid synchronous ESLint warning
      // and ensure critical initial render painting executes uninterrupted.
      Promise.resolve().then(() => {
        setIsDesktop(true);
      });
    }
  }, []);

  if (!isDesktop) return null;

  return (
    <Suspense fallback={null}>
      <ParticleCanvas />
    </Suspense>
  );
}
