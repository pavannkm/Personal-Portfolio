import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, GraduationCap, Award, MapPin, ChevronRight, CheckCircle2, Shield, Crosshair, Server, Globe } from 'lucide-react';
import profile from '../../data/profile.json';
import experience from '../../data/experience.json';
import SectionHeader from '../SectionHeader';
import ParticleBackground from '../ParticleBackground';

const PanelHeader = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/5">
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
      {Icon && <Icon size={24} className="text-primary" />}
    </div>
    <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
  </div>
);

// Profile
const ProfileSection = () => (
  <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
    <PanelHeader title="Profile" icon={User} />
    
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
      <div className="md:col-span-3">
        <h4 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-6">
          Cybersecurity Professional <br/>
          specializing in <span className="text-primary">Offensive Security</span>
        </h4>
        <p className="text-text-muted leading-relaxed text-base sm:text-lg mb-8">
          {profile.about.bio}
        </p>
        <div className="flex flex-wrap gap-3">
           {["VAPT", "Red Teaming"].map((tag, i) => (
             <span key={i} className="px-4 py-2 bg-primary/5 border border-primary/10 rounded-xl text-sm font-semibold text-primary/90 flex items-center gap-2">
               <CheckCircle2 size={16} className="text-primary/60" /> {tag}
             </span>
           ))}
        </div>
      </div>

      <div className="md:col-span-2 border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-8 flex flex-col justify-center space-y-6">
        {[
          { label: "Role Focus", value: "VAPT & Offensive Security", icon: Shield },
          { label: "Methodology", value: "OWASP & OSSTMM", icon: Crosshair },
          { label: "Targets", value: "Web, Network, APIs", icon: Server },
          { label: "Location", value: "Kerala, India", icon: Globe }
        ].map((stat, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 shrink-0 group-hover:bg-primary/5 group-hover:border-primary/10 transition-colors">
              <stat.icon size={20} className="text-primary/70" />
            </div>
            <div>
              <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-0.5">{stat.label}</p>
              <p className="text-white font-extrabold text-sm">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ExperienceSection = () => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden hover:border-primary/20 transition-all duration-500">
      <PanelHeader title="Experience" icon={Briefcase} />
      
      <div className="space-y-6">
        {experience.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div key={item.id} className="relative group">
              <div 
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="bg-black/20 p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-primary/20 hover:bg-black/30 transition-all duration-300 cursor-pointer select-none"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{item.role}</h4>
                      <ChevronRight 
                        size={18} 
                        className={`text-primary/40 group-hover:text-primary transition-transform duration-300 shrink-0 ${
                          isExpanded ? 'rotate-90 text-primary' : 'group-hover:translate-x-1'
                        }`} 
                      />
                    </div>
                    <p className="text-primary font-bold tracking-wide text-sm mt-1">{item.company}</p>
                  </div>
                  <div className="flex flex-wrap items-center text-sm text-text-muted gap-3 md:justify-end">
                    <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                      <MapPin size={14} className="text-primary/70"/> {item.location}
                    </span>
                    <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg border border-primary/20 font-mono font-bold text-xs">
                      {item.duration}
                    </span>
                  </div>
                </div>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded ? 'max-h-[500px] opacity-100 mt-5 pt-5 border-t border-white/5' : 'max-h-0 opacity-0'
                }`}>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {item.highlights.map((point, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-sm text-text-muted leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
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
    <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden hover:border-primary/20 transition-all duration-500">
      <PanelHeader title="Education" icon={GraduationCap} />
      <div className="space-y-6">
        {profile.education.map((edu, idx) => (
          <div key={idx} className="group bg-black/20 p-6 sm:p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-all">
            <h4 className="font-bold text-white text-lg leading-snug group-hover:text-primary transition-colors duration-300">
              {edu.degree}
            </h4>
            <p className="text-text-muted text-sm font-medium mt-1 mb-4">
              {edu.institution}
            </p>
            <div className="flex items-center justify-between text-sm pt-5 border-t border-white/5">
              <span className="text-text-muted bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 font-medium">{edu.period}</span>
              {edu.gpa && (
                <span className="font-mono px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 font-bold uppercase text-xs">
                  CGPA: {edu.gpa}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Certifications */}
    <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden hover:border-primary/20 transition-all duration-500">
      <PanelHeader title="Certifications" icon={Award} />
      <div className="space-y-4">
        {profile.certifications.map((cert, idx) => (
          <div key={idx} className="bg-black/20 p-5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary/20 group-hover:scale-105 transition-all shadow-inner">
              <Award size={24} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-base text-white leading-snug group-hover:text-primary transition-colors mb-1 truncate">
                {cert.name}
              </h4>
              <div className="flex items-center justify-between mt-2">
                <p className="text-text-muted text-sm font-medium">{cert.issuer}</p>
                <span className="text-xs font-mono px-2 py-1 rounded-md bg-white/5 text-text-muted uppercase tracking-wider border border-white/5">
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
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="about" className="flex-1 w-full py-16 lg:py-28 px-4 relative overflow-hidden scroll-mt-16 bg-background">
      <ParticleBackground />
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader title="About" highlight="Me" color="primary" />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col space-y-8 mt-12"
        >
          <motion.div variants={itemVariants}>
            <ProfileSection />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ExperienceSection />
          </motion.div>

          <motion.div variants={itemVariants}>
            <EducationAndCertsSection />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
