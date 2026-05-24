import { Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Sections — all rendered on one page
import Hero     from './components/sections/Hero';
import About    from './components/sections/About';
import Skills   from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact  from './components/sections/Contact';

/* ── Minimal loading fallback ── */
const PageLoading = () => (
  <div className="flex-1 w-full flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

export default function App() {
  return (
    <div className="bg-background text-text-main min-h-screen font-sans flex flex-col selection:bg-primary/30 selection:text-white">
      {/* Fixed Navigation */}
      <Navbar />

      {/* Single scrollable content area — top padding clears the fixed navbar */}
      <main className="flex-grow pt-16 pb-20 md:pb-0">
        <Suspense fallback={<PageLoading />}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
