
import { motion } from 'framer-motion';

const SectionHeader = ({ title, highlight, color = 'primary' }) => {
  return (
    <div className="mb-12 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-6xl font-bold tracking-tight"
      >
        {title} <span className={`text-${color}`}>{highlight}</span>
      </motion.h2>
    </div>
  );
};

export default SectionHeader;
