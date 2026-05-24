import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronDown, Shield, Flame, Code2, Network } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import projectsData from '../../data/projects.json';
import SectionHeader from '../SectionHeader';
import ParticleBackground from '../ParticleBackground';

/* Map a domain-relevant icon to each project by index */
const PROJECT_ICONS = [Shield, Flame, Code2, Network];

const ProjectCard = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = PROJECT_ICONS[index] ?? Shield;


  return (
    <motion.article
      key={project.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-panel rounded-3xl border border-white/5 flex flex-col group hover:border-primary/20 transition-all duration-500 overflow-hidden"
    >
      {/* Card top accent bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent group-hover:via-primary/60 transition-all duration-500" />

      <div className="p-6 lg:p-8 flex flex-col flex-1 gap-5">

        {/* Header row (Logo, Title, Links) */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex items-center gap-4">
            {/* Domain icon */}
            <div className="w-12 h-12 rounded-2xl bg-primary/5 border border-primary/15 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500">
              <Icon size={22} />
            </div>
            {/* Title */}
            <h3 className="text-lg lg:text-xl font-bold text-white group-hover:text-primary transition-colors duration-300 leading-snug">
              {project.title}
            </h3>
          </div>

          {/* Links */}
          <div className="flex gap-2 shrink-0">
            {project.githubLink !== '#' && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-90"
              >
                <FaGithub size={16} />
              </a>
            )}
            {project.liveLink !== '#' && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-90"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Description — expandable with smooth height animation */}
        <div className="flex-1">
          <div
            style={{
              maxHeight: expanded ? '400px' : '66px',
              overflow: 'hidden',
              transition: 'max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <p className="text-text-muted text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-primary/60 hover:text-primary tracking-wider uppercase transition-colors duration-200"
          >
            <span>{expanded ? 'Show less' : 'Read more'}</span>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ display: 'inline-flex' }}
            >
              <ChevronDown size={13} />
            </motion.span>
          </button>
        </div>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="chip text-[10px] text-primary/80 border-primary/10 bg-primary/5 uppercase tracking-wider hover:border-primary/30 hover:text-primary transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="flex-1 w-full py-14 lg:py-24 px-4 relative overflow-hidden scroll-mt-16">
      <ParticleBackground />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader title="Featured" highlight="Projects" color="primary" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
