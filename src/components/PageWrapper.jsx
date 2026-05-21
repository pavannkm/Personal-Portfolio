import { motion } from 'framer-motion';

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.35,
        ease: [0.23, 1, 0.32, 1], // premium custom ease-out
      }}
      className="w-full min-h-[calc(100vh-4rem)] flex flex-col"
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
