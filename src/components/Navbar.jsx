import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Wrench, Briefcase, Mail } from 'lucide-react';

/* ── Section definitions — id must match the section's id="…" attribute ── */
const navLinks = [
  { label: 'Home',     id: 'home',     icon: Home },
  { label: 'About',    id: 'about',    icon: User },
  { label: 'Skills',   id: 'skills',   icon: Wrench },
  { label: 'Projects', id: 'projects', icon: Briefcase },
  { label: 'Contact',  id: 'contact',  icon: Mail },
];

/* Smooth-scroll helper — accounts for the 64px fixed navbar */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const yOffset = -64; // height of the fixed navbar
  const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [activeSection,  setActiveSection]  = useState('home');

  /* ── Detect scroll position for navbar glass effect ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── IntersectionObserver — highlights the section currently in view ── */
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.id);

    const observers = [];

    // We keep a map of which sections are currently visible and how much
    const visibilityMap = {};

    const updateActiveSection = () => {
      // Pick the section with the highest intersection ratio that's visible
      let bestId   = activeSection;
      let bestRatio = 0;
      for (const [id, ratio] of Object.entries(visibilityMap)) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId    = id;
        }
      }
      setActiveSection(bestId);
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          visibilityMap[id] = entry.intersectionRatio;
          updateActiveSection();
        },
        {
          // rootMargin pushes the top boundary below the navbar
          rootMargin: '-64px 0px -35% 0px',
          threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Click handler ── */
  const handleNavClick = useCallback((id) => {
    setActiveSection(id);   // optimistic highlight
    scrollToSection(id);
  }, []);

  return (
    <>
      {/* ── Desktop Top App Bar ── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0,    opacity: 1  }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 hidden md:block
          ${scrolled
            ? 'bg-[#0d0d0d]/95 border-b border-white/5 shadow-glass'
            : 'bg-transparent'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo — clicking scrolls back to top */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center group"
            aria-label="Back to top"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300">
              <span className="font-bold text-xl text-primary">P</span>
            </div>
          </button>

          <ul className="flex items-center gap-1">
            {navLinks.map(({ label, id }) => {
              const isActive = activeSection === id;
              return (
                <li key={id} className="relative">
                  <button
                    onClick={() => handleNavClick(id)}
                    className={`relative px-6 py-2 text-sm font-semibold transition-all duration-300 block z-10 cursor-pointer
                      ${isActive ? 'text-white' : 'text-text-muted hover:text-white'}`}
                  >
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/10 rounded-full border border-white/10 -z-10 shadow-neon-cyan"
                        transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </motion.header>

      {/* ── Mobile Bottom Navigation Bar ── */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#0d0d0d]/95 border-t border-white/10 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.5)]"
      >
        <ul className="flex items-center justify-around h-16 px-2">
          {navLinks.map(({ label, id, icon: Icon }) => {
            const isActive = activeSection === id;
            return (
              <li key={id} className="flex-1 max-w-[80px]">
                <button
                  onClick={() => handleNavClick(id)}
                  className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300
                    ${isActive ? 'text-primary' : 'text-text-muted'}`}
                >
                  <div className="relative flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          layoutId="active-indicator"
                          className="absolute inset-0 -m-2 bg-primary/10 rounded-full blur-sm"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        />
                      )}
                    </AnimatePresence>
                    <Icon size={20} className={isActive ? 'fill-primary/20' : ''} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </motion.nav>
    </>
  );
}
