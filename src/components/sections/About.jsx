import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, GraduationCap, Award, MapPin, ChevronRight, CheckCircle2, Shield, Crosshair, Server, Globe } from 'lucide-react';
import profile from '../../data/profile.json';
import experience from '../../data/experience.json';
import SectionHeader from '../SectionHeader';

const PanelHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-4 md:gap-5 mb-6 md:mb-10 pb-4 md:pb-6 border-b border-border/30">
    <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-surface-glass border border-border/50 flex items-center justify-center shadow-sm shrink-0">
      {Icon && <Icon className="text-cta w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />}
    </div>
    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight font-display text-text-main">{title}</h3>
  </div>
);

// Profile
const ProfileSection = () => (
  <div className="glass-panel p-5 sm:p-8 lg:p-12 rounded-3xl">
    <PanelHeader title="Biography" icon={User} />

    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10">
      <div className="md:col-span-3 flex flex-col justify-center">
        <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 md:mb-6 font-display text-text-main">
          Cybersecurity Professional <br />
          specializing in <span className="text-cta relative inline-block">Offensive Security</span>
        </h4>
        <p className="text-text-muted leading-relaxed text-base lg:text-lg mb-6 md:mb-8 font-sans">
          {profile.about.bio}
        </p>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {["VAPT", "Red Teaming"].map((tag, i) => (
            <span key={i} className="px-4 py-2 md:px-5 md:py-2.5 bg-surface-glass border border-border/50 rounded-xl text-[10px] md:text-xs font-bold tracking-widest uppercase text-text-main flex items-center gap-2 backdrop-blur-md shadow-sm">
              <CheckCircle2 size={14} className="text-cta md:w-4 md:h-4" /> {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="md:col-span-2 border-t md:border-t-0 md:border-l border-border/30 pt-6 md:pt-0 md:pl-10 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-4 md:flex md:flex-col md:space-y-8">
          {[
            { label: "Role Focus", value: "VAPT & Offensive Security", icon: Shield },
            { label: "Methodology", value: "OWASP & OSSTMM", icon: Crosshair },
            { label: "Targets", value: "Web, Network, APIs", icon: Server },
            { label: "Location", value: "Kerala, India", icon: Globe }
          ].map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3 md:gap-5">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-surface-glass flex items-center justify-center border border-border/50 shrink-0 shadow-sm">
                <stat.icon className="text-cta w-4.5 h-4.5 md:w-5 md:h-5" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="text-text-muted text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5 md:mb-1">{stat.label}</p>
                <p className="font-semibold text-xs md:text-base font-sans text-text-main leading-snug break-words">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Experience
const ExperienceSection = () => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="glass-panel p-5 sm:p-8 lg:p-12 rounded-3xl">
      <PanelHeader title="Experience" icon={Briefcase} />

      <div className="space-y-4 md:space-y-6">
        {experience.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div key={item.id} className="relative group">
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="bg-surface-glass p-4 sm:p-6 lg:p-8 rounded-2xl border border-border/40 hover:border-cta/50 hover:bg-surface/40 transition-all duration-300 cursor-pointer select-none shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-5">
                  <div>
                    <div className="flex items-center gap-2 md:gap-3">
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold font-display text-text-main group-hover:text-cta transition-colors">{item.role}</h4>
                      <ChevronRight
                        size={18}
                        className={`text-text-muted group-hover:text-cta transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-90 text-cta' : 'group-hover:translate-x-1'
                          }`}
                      />
                    </div>
                    <p className="text-text-muted font-semibold tracking-wide text-xs sm:text-sm lg:text-base mt-1.5 font-sans">{item.company}</p>
                  </div>
                  <div className="flex flex-wrap items-center text-xs sm:text-sm gap-2 md:gap-3 md:justify-end">
                    <span className="bg-surface-glass px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-border/50 flex items-center gap-1.5 sm:gap-2 text-text-muted font-medium backdrop-blur-sm shadow-sm">
                      <MapPin size={12} className="text-cta sm:w-3.5 sm:h-3.5" /> {item.location}
                    </span>
                    <span className="bg-surface-glass px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-border/50 font-sans font-bold text-[10px] sm:text-xs uppercase tracking-widest text-text-main backdrop-blur-sm shadow-sm">
                      {item.duration}
                    </span>
                  </div>
                </div>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100 mt-4 pt-4 md:mt-6 md:pt-6 border-t border-border/30' : 'max-h-0 opacity-0'
                  }`}>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2.5 md:gap-y-4">
                    {item.highlights.map((point, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 md:gap-4 text-xs sm:text-sm lg:text-base text-text-muted leading-relaxed font-sans">
                        <div className="w-1.5 h-1.5 rounded-full bg-cta shrink-0 mt-2" />
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
  );
};

// Education & Certifications
const EducationAndCertsSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    {/* Education */}
    <div className="glass-panel p-5 sm:p-8 lg:p-12 rounded-3xl">
      <PanelHeader title="Education" icon={GraduationCap} />
      <div className="space-y-4 md:space-y-6">
        {profile.education.map((edu, idx) => (
          <div key={idx} className="group bg-surface-glass p-4 sm:p-6 lg:p-8 rounded-2xl border border-border/40 hover:border-cta/50 hover:bg-surface/40 transition-all duration-300 shadow-sm hover:shadow-md">
            <h4 className="font-bold text-lg sm:text-xl lg:text-2xl leading-snug font-display text-text-main group-hover:text-cta transition-colors duration-300">
              {edu.degree}
            </h4>
            <p className="text-text-muted text-sm sm:text-base font-medium mt-2 mb-4 md:mb-6 font-sans">
              {edu.institution}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm pt-4 md:pt-6 border-t border-border/30">
              <span className="text-text-muted font-sans font-semibold tracking-wide">{edu.period}</span>
              {edu.gpa && (
                <span className="px-2.5 py-1 rounded-md bg-surface-glass text-text-main border border-border/50 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] shadow-sm w-fit">
                  CGPA: {edu.gpa}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Certifications */}
    <div className="glass-panel p-5 sm:p-8 lg:p-12 rounded-3xl">
      <PanelHeader title="Credentials" icon={Award} />
      <div className="space-y-4 sm:space-y-5">
        {profile.certifications.map((cert, idx) => (
          <div key={idx} className="bg-surface-glass p-4 sm:p-5 rounded-2xl border border-border/40 hover:border-cta/50 hover:bg-surface/40 transition-all duration-300 group flex items-start gap-4 sm:gap-6 shadow-sm hover:shadow-md">
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-surface/50 flex items-center justify-center shrink-0 border border-border/50 group-hover:border-cta/30 transition-all backdrop-blur-sm shadow-sm">
              <Award className="text-text-main group-hover:text-cta transition-colors w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <h4 className="font-bold text-base sm:text-lg lg:text-xl leading-snug font-display text-text-main group-hover:text-cta transition-colors mb-1">
                {cert.name}
              </h4>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mt-1.5">
                <p className="text-text-muted text-xs sm:text-sm font-sans font-medium">{cert.issuer}</p>
                <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-surface-glass text-text-muted uppercase tracking-widest border border-border/50 shadow-sm w-fit shrink-0">
                  {cert.year}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
);

const About = () => {
  return (
    <section id="about" className="flex-1 w-full py-12 md:py-24 lg:py-32 px-4 relative overflow-hidden scroll-mt-16 bg-background">
      {/* Background ambient glowing shapes */}
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-cta opacity-5 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-1/3 -left-32 w-80 h-80 bg-cta opacity-5 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader title="Behind The" highlight="Terminal" align="center" />

        <div className="flex flex-col space-y-8 mt-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <ProfileSection />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            <ExperienceSection />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            <EducationAndCertsSection />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
