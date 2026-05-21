import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Wrench, Briefcase, Mail } from 'lucide-react';

const navLinks = [
  { label: 'Home',     to: '/',         icon: Home },
  { label: 'About',    to: '/about',    icon: User },
  { label: 'Skills',   to: '/skills',   icon: Wrench },
  { label: 'Projects', to: '/projects', icon: Briefcase },
  { label: 'Contact',  to: '/contact',  icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

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
          <NavLink to="/" className="flex items-center group">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300">
              <span className="font-bold text-xl text-primary">P</span>
            </div>
          </NavLink>

          <ul className="flex items-center gap-1">
            {navLinks.map(({ label, to }) => (
              <li key={to} className="relative">
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `relative px-6 py-2 text-sm font-semibold transition-all duration-300 block z-10
                     ${isActive ? 'text-white' : 'text-text-muted hover:text-white'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-white/10 rounded-full border border-white/10 -z-10 shadow-neon-cyan"
                          transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
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
          {navLinks.map(({ label, to, icon: Icon }) => (
            <li key={to} className="flex-1 max-w-[80px]">
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => `
                  flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300
                  ${isActive ? 'text-primary' : 'text-text-muted'}
                `}
              >
                {({ isActive }) => (
                  <>
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
                      <Icon size={20} className={isActive ? "fill-primary/20" : ""} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
}
