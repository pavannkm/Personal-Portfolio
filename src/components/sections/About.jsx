import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, GraduationCap, Award, MapPin, ChevronRight } from 'lucide-react';
import profile from '../../data/profile.json';
import experience from '../../data/experience.json';
import SectionHeader from '../SectionHeader';
import ParticleBackground from '../ParticleBackground';

const TABS = [
  { id: 'about',           label: 'About Me',       icon: User,          color: 'primary' },
  { id: 'experience',      label: 'Experience',     icon: Briefcase,     color: 'primary' },
  { id: 'education',       label: 'Education',      icon: GraduationCap, color: 'primary' },
  { id: 'certifications',  label: 'Certifications', icon: Award,         color: 'primary' },
];

/* ─── Shared Components ────────────────────────────────────────────── */
const PanelHeader = ({ title, icon: Icon }) => (
  <div className="section-label mb-6">
    <span className="section-label-bar bg-primary" />
    <div className="flex items-center gap-2">
      {Icon && <Icon size={16} className="text-primary" />}
      <span className="section-label-text text-primary">{title}</span>
    </div>
  </div>
);

/* ─── Tab: About Me ─────────────────────────────────────────────────── */
const AboutPanel = () => (
  <div className="flex flex-col gap-8 items-center lg:items-start max-w-4xl mx-auto lg:mx-0">
    <div className="w-full">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-5 leading-tight text-center lg:text-left">
        Cybersecurity Professional specializing in <span className="text-primary">Offensive Security</span>
      </h3>
      <p className="text-text-muted leading-relaxed text-base md:text-lg text-center lg:text-left">
        {profile.about.bio}
      </p>
    </div>
  </div>
);

/* ─── Tab: Experience ───────────────────────────────────────────────── */
const ExperiencePanel = () => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="space-y-8">
      <PanelHeader title="Work History" icon={Briefcase} />
      <div className="relative pl-6 sm:pl-8">
        {/* Beautiful vertical timeline line — visible on all screen sizes */}
        <div className="absolute left-[7px] sm:left-[11px] top-3 bottom-3 w-[1px] bg-gradient-to-b from-primary/50 via-primary/15 to-transparent" />

        <div className="space-y-8">
          {experience.map((item, idx) => {
            const isExpanded = expandedId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="relative flex gap-6 sm:gap-8 group"
              >
                {/* Timeline Dot Indicator */}
                <div className="absolute -left-[23px] sm:-left-[31px] top-5 flex flex-col items-center z-10">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-neon-cyan group-hover:scale-110 transition-transform">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                  </div>
                </div>

                <div 
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="flex-1 glass-panel p-5 sm:p-7 rounded-[2rem] border border-white/5 group hover:border-primary/25 transition-all duration-500 cursor-pointer select-none"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex gap-4 sm:gap-5 items-center">
                       <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                         <Briefcase size={22} className="text-primary" />
                       </div>
                       <div>
                         <div className="flex items-center gap-2">
                           <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-primary transition-colors leading-snug">{item.role}</h4>
                           <ChevronRight 
                             size={14} 
                             className={`text-primary/40 group-hover:text-primary transition-transform duration-300 shrink-0 ${
                               isExpanded ? 'rotate-90 text-primary' : 'group-hover:translate-x-1'
                             }`} 
                           />
                         </div>
                         <p className="text-primary font-bold text-xs sm:text-sm tracking-wide mt-1">{item.company}</p>
                       </div>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start text-xs sm:text-sm text-text-muted gap-2 mt-2 sm:mt-0 bg-white/5 sm:bg-transparent px-3 py-2 sm:px-0 sm:py-0 rounded-xl">
                      <span className="bg-white/5 px-2.5 py-1 rounded-full border border-white/10 font-bold text-[10px] sm:text-xs">{item.duration}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {item.location}</span>
                    </div>
                  </div>

                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isExpanded 
                      ? 'max-h-[1000px] opacity-100 mt-5 pt-5 border-t border-white/5' 
                      : 'max-h-0 opacity-0 group-hover:max-h-[1000px] group-hover:opacity-100 group-hover:mt-5 group-hover:pt-5 group-hover:border-t group-hover:border-white/5'
                  }`}>
                    <ul className="space-y-3.5">
                      {item.highlights.map((point, bIdx) => (
                        <li key={bIdx} className="flex gap-3 text-xs sm:text-sm text-text-muted leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2 shadow-neon-cyan" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ─── Tab: Education ────────────────────────────────────────────────── */
const EducationPanel = () => (
  <div className="space-y-6">
    <PanelHeader title="Academic Path" icon={GraduationCap} />
    <div className="grid grid-cols-1 gap-6">
      {profile.education.map((edu, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-5 sm:p-7 rounded-[2rem] border border-white/5 group hover:border-primary/20 transition-all duration-500"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex gap-4 sm:gap-5 items-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary/20 transition-all">
                <GraduationCap size={22} className="text-primary" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">{edu.institution}</h4>
                <p className="text-primary font-bold text-xs sm:text-sm uppercase tracking-widest mt-1">{edu.degree}</p>
                {edu.gpa && (
                  <div className="mt-2.5">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/5 text-text-muted border border-white/10 uppercase tracking-wider">
                      CGPA: {edu.gpa}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start text-xs sm:text-sm text-text-muted gap-2 bg-white/5 sm:bg-transparent px-3 py-2 sm:px-0 sm:py-0 rounded-xl">
              <span className="bg-white/5 px-2.5 py-1 rounded-full border border-white/10 font-bold text-[10px] sm:text-xs">
                {edu.period}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

/* ─── Tab: Certifications ───────────────────────────────────────────── */
const CertificationsPanel = () => (
  <div className="space-y-8">
    <PanelHeader title="Industry Validations" icon={Award} />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {profile.certifications.map((cert, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.06 }}
          className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary/20 transition-all duration-300">
              <Award size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              {/* Removed truncate so full certification names are readable */}
              <h4 className="font-bold text-sm sm:text-base text-white leading-snug group-hover:text-primary transition-colors">
                {cert.name}
              </h4>
              <p className="text-text-muted text-[11px] sm:text-xs mt-1.5 font-bold tracking-wide">{cert.issuer}</p>
              <div className="mt-3.5 flex items-center justify-between">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-text-muted uppercase tracking-wider">
                  Verified {cert.year}
                </span>
                <ChevronRight size={14} className="text-primary/40 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const PANELS = {
  about:          <AboutPanel />,
  experience:     <ExperiencePanel />,
  education:      <EducationPanel />,
  certifications: <CertificationsPanel />,
};

const About = () => {
  const [activeTab, setActiveTab] = useState('about');
  const navRef = useRef(null);

  const handleTabClick = (e, tabId) => {
    setActiveTab(tabId);
    if (e && e.currentTarget && navRef.current) {
      const button = e.currentTarget;
      const container = navRef.current;
      const containerWidth = container.offsetWidth;
      const buttonOffsetLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      
      const targetScrollLeft = buttonOffsetLeft - (containerWidth / 2) + (buttonWidth / 2);
      
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="about" className="flex-1 w-full py-14 lg:py-24 px-4 relative overflow-hidden">
      <ParticleBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader title="About" highlight="" color="primary" />
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Uniform Selection Sidebar */}
          <div className="w-full lg:w-80 shrink-0">
            <nav 
              ref={navRef}
              className="w-full flex lg:flex-col gap-2 p-3 bg-surface/20 backdrop-blur-md border border-white/5 rounded-2xl lg:rounded-[2.5rem] lg:sticky lg:top-24 z-20 overflow-x-auto lg:overflow-visible no-scrollbar shadow-2xl hover:border-primary/10 transition-all duration-500"
            >
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={(e) => handleTabClick(e, tab.id)}
                    className={`
                      relative flex items-center gap-3.5 px-6 py-4 rounded-xl lg:rounded-2xl text-sm font-bold transition-colors duration-300 whitespace-nowrap lg:w-full select-none cursor-pointer group
                      ${isActive ? 'text-white' : 'text-text-muted hover:text-white'}
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabBackground"
                        className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl lg:rounded-2xl shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon 
                      size={16} 
                      className={`relative z-10 transition-colors duration-300 ${
                        isActive ? 'text-primary' : 'text-text-muted group-hover:text-white'
                      }`} 
                    />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Details Display Panel */}
          <main className="flex-1 w-full min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.99 }}
                transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
                className="glass-panel p-5 md:p-8 lg:p-12 rounded-2xl lg:rounded-[2.5rem] border border-white/5 shadow-2xl"
              >
                {PANELS[activeTab]}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </section>
  );
};

export default About;
