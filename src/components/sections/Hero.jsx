
import { motion } from 'framer-motion';
import { Download, ChevronRight, Mail } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import profile from '../../data/profile.json';
import ParticleBackground from '../ParticleBackground';

const Hero = () => {
  return (
    <section id="home" className="flex-1 w-full flex flex-col justify-center items-center px-4 py-12 lg:py-0 relative overflow-hidden">
      {/* Three.js particle backdrop — contained to this section */}
      <ParticleBackground />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center relative z-10">

        {/* ── Text ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for hire
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight text-white tracking-tight">
            Hi, I'm <span className="text-primary">Pavan</span>
          </h1>

          <p className="text-base md:text-xl text-text-muted mb-7 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {profile.hero.subheadline}
          </p>

          {/* Buttons — elegant wrapped flex row */}
          <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-3">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button bg-primary text-background flex items-center justify-center gap-2.5 shadow-neon-cyan hover:shadow-lg transition-all"
            >
              <Download size={18} />
              Download Resume
            </a>
            <NavLink
              to="/projects"
              className="pill-button bg-white/5 border border-white/10 text-white hover:bg-white/10 flex items-center justify-center gap-2"
            >
              View Work <ChevronRight size={18} />
            </NavLink>
            <NavLink
              to="/contact"
              className="pill-button bg-white/5 border border-white/10 text-white hover:bg-white/10 flex items-center justify-center gap-2 transition-all"
            >
              <Mail size={18} />
              Connect Me
            </NavLink>
          </div>
        </motion.div>

        {/* ── Image — featured top on mobile ── */}
        <motion.div
          className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="relative w-72 h-[340px] sm:w-80 sm:h-[380px] md:w-96 md:h-[460px] lg:w-[420px] lg:h-[520px] group flex items-end justify-center mx-auto lg:mx-0">
            {/* Glow — optimized static glow on mobile, pulsing on desktop */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-4/5 bg-primary/20 rounded-full blur-3xl z-0 pointer-events-none md:bg-primary/30 md:animate-pulse-slow" />
            <div className="absolute bottom-[-1rem] left-1/2 -translate-x-1/2 w-full h-3/4 bg-primary/10 rounded-full blur-2xl z-0 pointer-events-none md:bg-primary/15 md:animate-pulse-slow" style={{ animationDelay: '1s' }} />

            {/* Background image — original photo with background, darkened, desaturated & blurred */}
            <img
              src={profile.heroImageBack}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-contain object-bottom z-10 pointer-events-none select-none opacity-35 brightness-[0.25] saturate-[0.6] blur-[1px] transition-all duration-700"
            />

            {/* Foreground image — transparent subject cutout that zooms on hover */}
            <img
              src={profile.heroImage}
              alt={profile.name}
              loading="eager"
              fetchpriority="high"
              decoding="async"
              className="w-full h-full object-contain object-bottom relative z-20 transition-transform duration-700 group-hover:scale-108 drop-shadow-2xl"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
