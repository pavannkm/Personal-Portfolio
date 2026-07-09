import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import profile from '../../data/profile.json';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top: y, behavior: 'smooth' });
};

const Hero = () => {
  return (
    <section
      id="home"
      className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4 py-10 md:py-20 lg:py-0 relative overflow-hidden"
    >
      {/* Ambient glowing background shapes */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cta opacity-10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cta opacity-10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 relative z-10">

        {/* ── Text Content ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-left flex-1 max-w-2xl"
        >

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-bold mb-0.5 md:mb-1 leading-[1.05] tracking-tighter font-display text-text-main">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cta to-blue-400">Pavan</span>
          </h1>

          {/* Role Label */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-base sm:text-lg font-sans font-medium text-cta tracking-wide mb-6 md:mb-8 flex items-center justify-center lg:justify-start gap-2"
          >
            Cybersecurity Intern at <span className="text-text-main">Beagle Security</span>
          </motion.p>

          <p className="text-lg md:text-xl text-text-muted mb-12 md:mb-14 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0 font-medium">
            {profile.hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
            <button
              onClick={() => scrollTo('projects')}
              className="btn-primary w-full sm:w-auto"
            >
              Explore Work <ArrowRight size={18} />
            </button>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto"
            >
              <Download size={18} />
              Resume
            </a>
          </div>
        </motion.div>

        {/* ── Image & Fluid Mask (Visible on tablet/desktop only) ── */}
        <motion.div
          className="hidden md:flex relative flex-1 justify-center lg:justify-end w-full max-w-[420px]"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Outer Wrapper Container */}
          <div className="relative w-full aspect-[4/5] group">

            {/* Background Glass Panel Card (Inside Grid) */}
            <div className="absolute inset-0 rounded-[3rem] overflow-hidden glass-panel transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-xl z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface/90 z-10 pointer-events-none"></div>

              <img
                src={profile.heroImageBack}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-bottom opacity-40 mix-blend-luminosity transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

            {/* Foreground Cutout (Outside Grid, overflows top and sides on hover) */}
            <img
              src={profile.heroImage}
              alt={profile.name}
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover object-bottom z-10 drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.08] origin-bottom pointer-events-none rounded-b-[3rem]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
