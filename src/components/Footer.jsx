


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-white/10 bg-[#111111] overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3 group cursor-default">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:-rotate-12 transition-all duration-300">
                <span className="font-bold text-xl text-primary">P</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Pavan <span className="text-primary">KM</span>
              </span>
            </div>
            <p className="text-text-muted text-sm max-w-xs text-center md:text-left">
              Securing digital frontiers through professional VAPT and offensive security methodology.
            </p>
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center md:items-end gap-2 text-sm text-text-muted">
            <p>© {currentYear} Pavan KM. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
