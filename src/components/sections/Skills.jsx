import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Network, BookOpen, Monitor, Eye, Code2, ChevronDown } from 'lucide-react';
import skillsData from '../../data/skills.json';
import SectionHeader from '../SectionHeader';

const iconMap = {
  ShieldAlert,
  Network,
  BookOpen,
  Monitor,
  Eye,
  Code2
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const Skills = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => {
      const wasExpanded = !!prev[categoryName];
      return wasExpanded ? {} : { [categoryName]: true };
    });
  };

  return (
    <section id="skills" className="flex-1 w-full py-12 md:py-24 lg:py-32 px-4 relative overflow-hidden bg-background scroll-mt-16">
      {/* Background ambient glowing shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cta opacity-5 blur-[130px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cta opacity-5 blur-[130px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader title="Technical" highlight="Arsenal" align="center" />

        {/* ── Desktop/Large Screen View: Interactive Tactical Dashboard (>= 1024px) ── */}
        <div className="hidden lg:block glass-panel rounded-3xl overflow-hidden mt-12 border border-border/50 bg-surface-glass backdrop-blur-xl">
          <div className="grid grid-cols-12 min-h-[500px]">
            
            {/* Dashboard Sidebar Navigation */}
            <div className="col-span-4 bg-background/40 border-r border-border/30 p-8 flex flex-col gap-2">
              {skillsData.map((cat, idx) => {
                const IconComponent = iconMap[cat.icon] || ShieldAlert;
                const isActive = activeCategoryIndex === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveCategoryIndex(idx)}
                    className={`relative w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-300 group cursor-pointer ${
                      isActive 
                        ? 'text-cta font-bold' 
                        : 'text-text-muted hover:text-text-main'
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute inset-0 bg-cta/5 border border-cta/20 rounded-xl z-0 shadow-[0_0_15px_var(--cta-glow)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className="relative z-10 flex items-center gap-4 w-full">
                      <IconComponent size={20} className={isActive ? 'text-cta' : 'text-text-muted group-hover:text-text-main'} strokeWidth={1.5} />
                      <span className="font-display tracking-wide text-base">{cat.category}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dashboard Workspace Display Screen */}
            <div className="col-span-8 p-12 relative flex flex-col justify-start bg-surface-glass/20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategoryIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex flex-col justify-start"
                >
                  <h3 className="text-3xl lg:text-4xl font-bold font-display tracking-tight text-text-main mb-10 flex items-center gap-4">
                    <span className="text-cta">/</span> 
                    {skillsData[activeCategoryIndex].category}
                  </h3>

                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {skillsData[activeCategoryIndex].skills.map((skill, sIdx) => (
                      <motion.div
                        key={sIdx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: sIdx * 0.05, duration: 0.4 }}
                        className="group flex items-center gap-4 p-3 rounded-xl hover:bg-surface/30 border border-transparent hover:border-border/30 transition-all duration-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-cta/40 group-hover:bg-cta group-hover:shadow-[0_0_8px_var(--cta-glow)] transition-all duration-300"></div>
                        <span className="font-sans text-base font-medium text-text-muted group-hover:text-text-main tracking-wide">
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* ── Mobile/Tablet Screen View: Static Cards Grid or Accordions (< 1024px) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mt-12"
        >
          {skillsData.map((categoryGroup) => {
            const IconComponent = iconMap[categoryGroup.icon] || ShieldAlert;
            const isExpanded = !!expandedCategories[categoryGroup.category];

            return (
              <motion.div
                key={categoryGroup.category}
                variants={itemVariants}
                onClick={() => isMobile && toggleCategory(categoryGroup.category)}
                className={`glass-panel p-6 rounded-3xl flex flex-col border border-border/50 bg-surface-glass backdrop-blur-xl shadow-md transition-all duration-500 relative overflow-hidden group h-full ${
                  isMobile ? 'cursor-pointer hover:border-cta/40' : 'cursor-default'
                }`}
              >
                {/* Top glowing accent line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cta/10 to-transparent group-hover:via-cta/40 transition-all duration-500" />

                {/* Card content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Category Header */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-surface/50 border border-border/50 flex items-center justify-center text-text-main group-hover:text-cta group-hover:scale-105 group-hover:border-cta/30 transition-all duration-500 shrink-0 shadow-sm">
                        <IconComponent size={22} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-lg font-bold text-text-main tracking-wider uppercase group-hover:text-cta transition-colors duration-300 font-display">
                        {categoryGroup.category}
                      </h3>
                    </div>

                    {isMobile && (
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-300 shrink-0 ${
                          isExpanded ? 'rotate-180 text-cta' : 'text-text-muted'
                        }`}
                      />
                    )}
                  </div>

                  {/* Skills List (Collapsible on Mobile, open on Tablet) */}
                  <motion.div
                    initial={isMobile ? { height: 0, opacity: 0 } : { height: "auto", opacity: 1 }}
                    animate={
                      isMobile 
                        ? { 
                            height: isExpanded ? "auto" : 0, 
                            opacity: isExpanded ? 1 : 0,
                            marginTop: isExpanded ? 16 : 0
                          }
                        : { height: "auto", opacity: 1, marginTop: 16 }
                    }
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-2 pt-2">
                      {categoryGroup.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center gap-3 p-1.5 px-3 -mx-3 rounded-xl hover:bg-surface/40 border border-transparent hover:border-border/30 transition-all duration-300 group/item"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-cta/40 group-hover/item:bg-cta group-hover/item:shadow-[0_0_8px_var(--cta-glow)] transition-all duration-300 shrink-0"></div>
                          <span className="font-sans text-base font-medium text-text-muted group-hover/item:text-text-main tracking-wide transition-colors">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
