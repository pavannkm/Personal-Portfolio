import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, GraduationCap, Award, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import profile from '../../data/profile.json';
import experience from '../../data/experience.json';
import SectionHeader from '../SectionHeader';
import ParticleBackground from '../ParticleBackground';

/* ─── Shared Components ────────────────────────────────────────────── */
const PanelHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
      {Icon && <Icon size={20} className="text-primary" />}
    </div>
    <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
  </div>
);

/* ─── Bento Box: About Me ───────────────────────────────────────────── */
const AboutPanel = () => (
  <div className="h-full flex flex-col justify-center">
    <PanelHeader title="About Me" icon={User} />
    <h4 className="text-2xl font-bold text-white mb-4 leading-tight">
      Cybersecurity Professional specializing in <span className="text-primary">Offensive Security</span>
    </h4>
    <p className="text-text-muted leading-relaxed text-base">
      {profile.about.bio}
    </p>
    <div className="mt-6 flex flex-wrap gap-3">
       {["VAPT", "Red Teaming"].map((tag, i) => (
         <span key={i} className="px-3 py-1.5 bg-primary/5 border border-primary/10 rounded-lg text-xs font-semibold text-primary/90 flex items-center gap-1.5">
           <CheckCircle2 size={12} className="text-primary/60" /> {tag}
         </span>
       ))}
    </div>
  </div>
);

/* ─── Bento Box: Education ──────────────────────────────────────────── */
const EducationPanel = () => (
  <div className="h-full flex flex-col">
    <PanelHeader title="Academic Path" icon={GraduationCap} />
    <div className="flex-1 flex flex-col justify-center py-2">
      {profile.education.map((edu, idx) => (
        <div key={idx} className="relative pl-6 group">
          {/* Vertical timeline line accent */}
          <div className="absolute left-[7px] top-1.5 bottom-1.5 w-[2px] bg-gradient-to-b from-primary/50 to-primary/5" />
          
          {/* Glowing tech node */}
          <div className="absolute left-0 top-1.5 w-[16px] h-[16px] rounded-full bg-background border-2 border-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10 shadow-[0_0_8px_rgba(6,182,212,0.4)]">
            <div className="w-[6px] h-[6px] rounded-full bg-primary animate-pulse" />
          </div>

          <div className="space-y-3">
            {/* Institution Header */}
            <div>
              <h4 className="font-bold text-white text-base sm:text-lg group-hover:text-primary transition-colors duration-300 leading-snug">
                {edu.institution}
              </h4>
              <p className="text-primary text-xs font-bold uppercase tracking-wider mt-1">
                {edu.degree}
              </p>
            </div>

            {/* Academic stats & timeline info */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="bg-white/5 border border-white/10 text-text-muted px-2.5 py-1 rounded-md">
                {edu.period}
              </span>
              
              {edu.gpa && (
                <span className="bg-primary/10 border border-primary/20 text-primary px-2.5 py-1 rounded-md font-mono font-bold tracking-wider uppercase shadow-[0_0_10px_rgba(6,182,212,0.05)]">
                  GPA: {edu.gpa}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Bento Box: Experience ─────────────────────────────────────────── */
const ExperiencePanel = () => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="h-full flex flex-col">
      <PanelHeader title="Work History" icon={Briefcase} />
      <div className="relative pl-6">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-3 bottom-3 w-[1px] bg-gradient-to-b from-primary/50 via-primary/15 to-transparent" />

        <div className="space-y-6">
          {experience.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[23px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary flex items-center justify-center group-hover:scale-110 transition-transform z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>

                <div 
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/5 hover:border-primary/25 transition-all duration-300 cursor-pointer select-none"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-primary transition-colors">{item.role}</h4>
                        <ChevronRight 
                          size={14} 
                          className={`text-primary/40 group-hover:text-primary transition-transform duration-300 shrink-0 ${
                            isExpanded ? 'rotate-90 text-primary' : 'group-hover:translate-x-1'
                          }`} 
                        />
                      </div>
                      <p className="text-primary font-semibold text-xs sm:text-sm mt-0.5">{item.company}</p>
                    </div>
                    <div className="flex items-center text-xs text-text-muted gap-3">
                      <span className="bg-white/5 px-2 py-1 rounded-md border border-white/10">{item.duration}</span>
                      <span className="flex items-center gap-1 hidden sm:flex"><MapPin size={12} /> {item.location}</span>
                    </div>
                  </div>

                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isExpanded ? 'max-h-[500px] opacity-100 mt-4 pt-4 border-t border-white/5' : 'max-h-0 opacity-0'
                  }`}>
                    <ul className="space-y-2.5">
                      {item.highlights.map((point, bIdx) => (
                        <li key={bIdx} className="flex gap-3 text-xs sm:text-sm text-text-muted leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ─── Bento Box: Certifications ─────────────────────────────────────── */
const CertificationsPanel = () => (
  <div className="h-full flex flex-col">
    <PanelHeader title="Certifications" icon={Award} />
    <div className="flex flex-col gap-4 flex-1">
      {profile.certifications.map((cert, idx) => (
        <div key={idx} className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary/20 transition-all">
            <Award size={18} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm text-white leading-snug group-hover:text-primary transition-colors">
              {cert.name}
            </h4>
            <div className="flex items-center justify-between mt-2">
              <p className="text-text-muted text-xs font-semibold">{cert.issuer}</p>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-text-muted uppercase tracking-wider">
                {cert.year}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Main Section: About (Bento Grid) ──────────────────────────────── */
const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="about" className="flex-1 w-full py-14 lg:py-24 px-4 relative overflow-hidden scroll-mt-16">
      <ParticleBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader title="About" highlight="" color="primary" />
        
        {/* Bento Box Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* About Me Card - Spans 2 cols on lg, full on mobile/md */}
          <motion.div variants={itemVariants} className="glass-panel p-6 sm:p-8 rounded-3xl lg:col-span-2 shadow-xl border border-white/5 hover:border-primary/20 transition-colors duration-500">
            <AboutPanel />
          </motion.div>

          {/* Education Card - Spans 1 col */}
          <motion.div variants={itemVariants} className="glass-panel p-6 sm:p-8 rounded-3xl md:col-span-1 shadow-xl border border-white/5 hover:border-primary/20 transition-colors duration-500">
            <EducationPanel />
          </motion.div>

          {/* Experience Card - Spans 2 cols on lg, full on mobile/md */}
          <motion.div variants={itemVariants} className="glass-panel p-6 sm:p-8 rounded-3xl lg:col-span-2 shadow-xl border border-white/5 hover:border-primary/20 transition-colors duration-500">
            <ExperiencePanel />
          </motion.div>

          {/* Certifications Card - Spans 1 col */}
          <motion.div variants={itemVariants} className="glass-panel p-6 sm:p-8 rounded-3xl md:col-span-1 shadow-xl border border-white/5 hover:border-primary/20 transition-colors duration-500">
            <CertificationsPanel />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
