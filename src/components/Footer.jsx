const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-border/30 bg-background overflow-hidden font-sans z-10">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3 group cursor-default">
              <div className="relative w-10 h-10 rounded-xl bg-surface-glass border border-border/50 flex items-center justify-center transition-all duration-500 group-hover:border-cta/50 group-hover:shadow-[0_0_20px_var(--cta-glow)] shadow-sm">
                {/* Glass reflection gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 opacity-50 z-0 rounded-xl"></div>
                {/* Inner glow accent */}
                <div className="absolute -inset-px rounded-xl bg-gradient-to-tr from-cta/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                <span className="font-display font-black text-xl text-text-main group-hover:text-cta transition-all duration-500 tracking-tighter relative z-10">
                  P<span className="text-cta">.</span>
                </span>
              </div>
              <span className="font-display font-bold text-xl tracking-wide text-text-main flex items-center gap-1.5">
                <span>Pavan</span>
                <span className="text-cta">KM</span>
              </span>
            </div>
            <p className="text-text-muted text-sm max-w-sm text-center md:text-left leading-relaxed">
              Securing digital frontiers through professional VAPT and offensive security methodology.
            </p>
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center md:items-end gap-2 text-sm text-text-muted">
            <p>© {currentYear} Pavan KM. All rights reserved.</p>
            <p className="text-[10px] text-text-main tracking-[0.2em] uppercase font-bold bg-surface-glass px-3 py-1.5 rounded-lg border border-border/50 shadow-sm">
              Offensive Security & VAPT Portfolio
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
