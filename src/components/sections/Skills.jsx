
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Network, 
  BookOpen, 
  Monitor, 
  Eye, 
  Code2 
} from 'lucide-react';
import skillsData from '../../data/skills.json';
import SectionHeader from '../SectionHeader';
import ParticleBackground from '../ParticleBackground';

const iconMap = {
  ShieldAlert: ShieldAlert,
  Network: Network,
  BookOpen: BookOpen,
  Monitor: Monitor,
  Eye: Eye,
  Code2: Code2
};

const SkillChip = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="group relative px-4 py-2 text-xs font-medium tracking-wide rounded-2xl border bg-white/5 border-white/10 text-text-main hover:border-primary/40 hover:bg-primary/5 hover:text-white hover:shadow-[0_0_10px_rgba(6,182,212,0.15)] transition-all duration-300 cursor-default select-none flex items-center gap-2"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary shrink-0 transition-all duration-300" />
      {skill}
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="flex-1 w-full py-14 lg:py-24 px-4 relative overflow-hidden bg-background">
      <ParticleBackground />
      
      {/* High-tech glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader title="Technical" highlight="Skills" color="primary" />
        
        {/* Unified Command Deck Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 lg:p-12 rounded-3xl border border-white/5 bg-surface/20 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-primary/10 transition-all duration-500"
        >
          {/* Subtle tech dot grid background accent inside panel */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col">
            {skillsData.map((categoryGroup, groupIndex) => {
              const IconComponent = iconMap[categoryGroup.icon] || ShieldAlert;
              return (
                <motion.div 
                  key={categoryGroup.category}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: groupIndex * 0.05 }}
                  className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-8 border-b border-white/5 last:border-b-0 items-start group/row transition-all duration-300"
                >
                  {/* Left Column: Minimalist Category Header */}
                  <div className="lg:col-span-1 flex items-center gap-4 shrink-0">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/5 border border-primary/10 text-primary shadow-lg shadow-primary-glow group-hover/row:scale-110 group-hover/row:border-primary/30 group-hover/row:text-white transition-all duration-300 shrink-0">
                      <IconComponent size={20} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider group-hover/row:text-primary transition-colors duration-300 leading-tight">
                        {categoryGroup.category}
                      </h3>
                    </div>
                  </div>

                  {/* Right Column: Flexible Skills list */}
                  <div className="lg:col-span-3 flex flex-wrap gap-2.5">
                    {categoryGroup.skills.map((skill, index) => (
                      <SkillChip 
                        key={index} 
                        skill={skill} 
                        index={index} 
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
