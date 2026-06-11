import { motion } from 'framer-motion';

const SectionHeader = ({ title, highlight, align = 'center' }) => {
  return (
    <div className={`mb-16 md:mb-24 flex flex-col ${align === 'left' ? 'items-start' : 'items-center text-center'}`}>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-24 bg-gradient-to-r from-transparent via-text-muted/50 to-transparent mb-8"
      />
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter font-display text-text-main"
      >
        {title} <span className="text-cta relative inline-block">
          {highlight}
          <span className="absolute -inset-1 bg-cta-glow blur-2xl -z-10 rounded-full opacity-50"></span>
        </span>
      </motion.h2>
    </div>
  );
};

export default SectionHeader;
