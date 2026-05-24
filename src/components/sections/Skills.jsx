
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

const SkillListItem = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay: index * 0.02 }}
      className="flex items-center gap-2.5 group/item cursor-default select-none py-1"
    >
      <span className="text-primary font-mono text-sm select-none opacity-70 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-200 shrink-0">
        &gt;
      </span>
      <span className="text-[15px] font-medium text-white/80 group-hover/item:text-white transition-colors duration-200 truncate">
        {skill}
      </span>
    </motion.div>
  );
};

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section id="skills" className="flex-1 w-full py-14 lg:py-24 px-4 relative overflow-hidden bg-background scroll-mt-16">
      <ParticleBackground />
      
      {/* High-tech glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader title="Technical" highlight="Skills" color="primary" />
        
        {/* Multi-Card Grid for Categories */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          {skillsData.map((categoryGroup) => {
            const IconComponent = iconMap[categoryGroup.icon] || ShieldAlert;
            return (
              <motion.div 
                key={categoryGroup.category}
                variants={itemVariants}
                className="glass-panel p-6 rounded-3xl flex flex-col border border-white/5 bg-surface/20 backdrop-blur-md shadow-xl hover:border-primary/20 hover:bg-surface/30 transition-all duration-500 relative overflow-hidden group h-full"
              >
                {/* Top glowing accent line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:via-primary/50 transition-all duration-500" />
                
                {/* Subtle tech dot grid background accent inside panel */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:scale-105 group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-500 shrink-0">
                      <IconComponent size={20} />
                    </div>
                    <h3 className="text-sm font-bold text-white tracking-wider uppercase group-hover:text-primary transition-colors duration-300 leading-none">
                      {categoryGroup.category}
                    </h3>
                  </div>

                  {/* Skills List - Styled as single-column vertical bulleted list */}
                  <div className="flex flex-col gap-2.5">
                    {categoryGroup.skills.map((skill, index) => (
                      <SkillListItem 
                        key={index} 
                        skill={skill} 
                        index={index} 
                      />
                    ))}
                  </div>
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



