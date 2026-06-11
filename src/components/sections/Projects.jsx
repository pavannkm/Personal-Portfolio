import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Shield, Flame, Code2, Network, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import projectsData from '../../data/projects.json';
import SectionHeader from '../SectionHeader';

const PROJECT_ICONS = [Shield, Flame, Code2, Network];

const ProjectGlassCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = PROJECT_ICONS[index] ?? Shield;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-panel relative overflow-hidden rounded-3xl flex flex-col group h-full min-h-[400px]"
    >
      {/* Background ambient glow that moves/reveals on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/50 to-surface z-0 pointer-events-none"></div>
      
      <motion.div 
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-gradient-to-t from-cta/20 to-transparent z-0 pointer-events-none"
      ></motion.div>

      {/* Decorative Icon Background */}
      <motion.div 
        animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.05 : 0.02 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute -right-12 -top-12 z-0 pointer-events-none text-text-main"
      >
        <Icon size={300} strokeWidth={0.5} />
      </motion.div>

      <div className="relative z-10 p-8 lg:p-10 flex flex-col h-full flex-grow flex-1">
        
        {/* Top Content (Header, Title, and Description aligned to top) */}
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div className="w-14 h-14 rounded-2xl bg-surface border border-border/50 flex items-center justify-center text-text-main group-hover:text-cta transition-colors duration-500 shadow-sm shrink-0">
              <Icon size={24} strokeWidth={1.5} />
            </div>

            <div className="flex gap-3">
              {project.githubLink !== '#' && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-text-muted hover:text-white hover:bg-cta hover:border-cta transition-all duration-300 backdrop-blur-md">
                  <FaGithub size={18} />
                </a>
              )}
              {project.liveLink !== '#' && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-text-muted hover:text-white hover:bg-cta hover:border-cta transition-all duration-300 backdrop-blur-md">
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-3xl lg:text-4xl font-bold font-display tracking-tight text-text-main mb-4 group-hover:text-cta transition-colors duration-500">
              {project.title}
            </h3>
            
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? "auto" : 76 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="text-text-muted font-sans text-base leading-relaxed">
                {project.description}
              </p>
            </motion.div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-cta text-sm font-semibold font-sans mt-2 hover:underline cursor-pointer focus:outline-none block"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          </div>
        </div>

        {/* Bottom Content (Tech Stack pushed to floor) */}
        <div className="mt-auto pt-6 border-t border-border/30">
          <motion.div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <span key={i} className="px-3 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full border border-border/50 bg-surface/50 text-text-muted backdrop-blur-sm group-hover:border-cta/30 group-hover:text-text-main transition-colors duration-300">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="flex-1 w-full py-12 md:py-24 lg:py-32 px-4 relative overflow-hidden scroll-mt-16 bg-background">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader title="Featured" highlight="Work" align="center" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {projectsData.map((project, index) => (
            <ProjectGlassCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
