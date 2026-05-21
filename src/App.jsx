import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageWrapper from './components/PageWrapper';

// Lazy-loaded page sections — only downloaded when a user navigates to that page
const Hero     = lazy(() => import('./components/sections/Hero'));
const About    = lazy(() => import('./components/sections/About'));
const Skills   = lazy(() => import('./components/sections/Skills'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Contact  = lazy(() => import('./components/sections/Contact'));

/* ── Minimal loading fallback — matches background so no flash ── */
const PageLoading = () => (
  <div className="flex-1 w-full flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

/* ── Animated Routes wrapper ── */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<PageLoading />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"        element={<PageWrapper><Hero /></PageWrapper>} />
          <Route path="/about"   element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/skills"  element={<PageWrapper><Skills /></PageWrapper>} />
          <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-background text-text-main min-h-screen font-sans flex flex-col selection:bg-primary/30 selection:text-white">
        {/* Navigation Layer */}
        <Navbar />

        {/* Content Layer — flex-grow ensures main takes up available space */}
        <main className="flex-grow md:pt-16 pb-20 md:pb-0">
          <AnimatedRoutes />
        </main>

        {/* Stable Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
