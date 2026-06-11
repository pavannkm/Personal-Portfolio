import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Wrench, Briefcase, Mail, Sun, Moon } from 'lucide-react';

/* ── Section definitions — id must match the section's id="…" attribute ── */
const navLinks = [
  { label: 'Home', id: 'home', icon: Home },
  { label: 'About', id: 'about', icon: User },
  { label: 'Skills', id: 'skills', icon: Wrench },
  { label: 'Projects', id: 'projects', icon: Briefcase },
  { label: 'Contact', id: 'contact', icon: Mail },
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
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  /* ── Detect scroll position for navbar glass effect ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Apply Light/Dark Class to HTML element ── */
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  /* ── IntersectionObserver — highlights the section currently in view ── */
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.id);
    const observers = [];
    const visibilityMap = {};

    const updateActiveSection = () => {
      let bestId = activeSection;
      let bestRatio = 0;
      for (const [id, ratio] of Object.entries(visibilityMap)) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
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
          rootMargin: '-64px 0px -35% 0px',
          threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [activeSection]);

  /* ── Click handler ── */
  const handleNavClick = useCallback((id) => {
    setActiveSection(id);   // optimistic highlight
    scrollToSection(id);
  }, []);

  return (
    <>
      {/* ── Top App Bar (Visible on all screens) ── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
          ${scrolled
            ? 'bg-background/80 border-b border-border/30 shadow-sm backdrop-blur-md'
            : 'bg-transparent'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo — clicking scrolls back to top */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center group cursor-pointer"
            aria-label="Back to top"
          >
            <div className="relative w-10 h-10 rounded-xl bg-surface-glass border border-border/50 flex items-center justify-center transition-all duration-500 group-hover:border-cta/50 group-hover:shadow-[0_0_20px_var(--cta-glow)] shadow-sm group-hover:-translate-y-[1px]">
              {/* Glass reflection gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 opacity-50 z-0 rounded-xl"></div>
              {/* Inner glow accent */}
              <div className="absolute -inset-px rounded-xl bg-gradient-to-tr from-cta/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              <span className="font-display font-black text-xl text-text-main group-hover:text-cta transition-all duration-500 tracking-tighter relative z-10">
                P<span className="text-cta">.</span>
              </span>
            </div>
          </button>

          {/* Nav Actions */}
          <div className="flex items-center gap-4">
            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map(({ label, id }) => {
                const isActive = activeSection === id;
                return (
                  <li key={id} className="relative">
                    <button
                      onClick={() => handleNavClick(id)}
                      className={`relative px-6 py-2 text-sm font-semibold transition-all duration-300 block z-10 cursor-pointer
                        ${isActive ? 'text-cta font-bold' : 'text-text-muted hover:text-text-main'}`}
                    >
                      {label}
                      {isActive && (
                         <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-cta/5 rounded-full border border-cta/25 -z-10 shadow-[0_0_15px_var(--cta-glow)]"
                          transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Theme Toggle */}
            <div className="md:border-l md:border-border/30 md:pl-4">
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl bg-surface-glass border border-border/50 flex items-center justify-center hover:border-cta/50 transition-all duration-300 active:scale-95 cursor-pointer relative overflow-hidden group shadow-sm hover:shadow-md"
                title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'dark' ? (
                      <Sun size={18} className="text-text-main group-hover:text-cta transition-colors" />
                    ) : (
                      <Moon size={18} className="text-text-main group-hover:text-cta transition-colors" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Bottom Navigation Bar ── */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-background/90 border-t border-border/30 pb-safe shadow-lg backdrop-blur-md"
      >
        <ul className="flex items-center justify-around h-16 px-2">
          {navLinks.map(({ label, id, icon: Icon }) => {
            const isActive = activeSection === id;
            return (
              <li key={id} className="flex-1 max-w-[80px]">
                <button
                  onClick={() => handleNavClick(id)}
                  className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300
                    ${isActive ? 'text-cta font-bold' : 'text-text-muted hover:text-text-main'}`}
                >
                  <div className="relative flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          layoutId="active-indicator"
                          className="absolute inset-0 -m-2 bg-cta/10 border border-cta/20 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        />
                      )}
                    </AnimatePresence>
                    <Icon size={20} className={isActive ? 'text-cta' : ''} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider font-sans">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </motion.nav>
    </>
  );
}
