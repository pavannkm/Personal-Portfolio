import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiTryhackme } from 'react-icons/si';
import SectionHeader from '../SectionHeader';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScLdKF5JpfYLgAjPc02Xsdy9kjq4-QLpwa0Kb3SQQJmHIS9_g/formResponse";
    const formDataObj = new FormData();
    formDataObj.append("entry.703014842", formData.name);
    formDataObj.append("entry.665059620", formData.email);
    formDataObj.append("entry.706309898", formData.message);

    try {
      await fetch(googleFormUrl, {
        method: "POST",
        mode: "no-cors",
        body: formDataObj
      });
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus({ type: 'success', text: 'Message delivered.' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      setSubmitStatus({ type: 'error', text: 'Error connecting. Please try again.' });
    }
  };

  return (
    <section id="contact" className="flex-1 w-full py-12 md:py-24 lg:py-32 px-4 relative overflow-hidden scroll-mt-16 bg-background">
      {/* Background ambient glowing shapes */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cta opacity-[0.07] blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader title="Initiate" highlight="Contact" align="center" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel p-6 md:p-8 lg:p-16 relative overflow-hidden rounded-3xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 relative z-10">
            
            <div className="lg:col-span-2 flex flex-col justify-between gap-6 lg:gap-10">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6 font-display tracking-tight text-text-main">Get in touch</h3>
                <p className="text-text-muted text-base mb-6 lg:mb-10 leading-relaxed font-sans">
                  Open for new opportunities, offensive security engagements, or collaborative projects. Let's discuss your next big idea.
                </p>
 
                {/* Email */}
                <div className="flex flex-col">
                  <a 
                    href="mailto:pavankm146@gmail.com" 
                    className="flex items-center gap-4 p-3 lg:p-4 rounded-2xl bg-surface-glass/30 border border-border/40 hover:border-cta/50 hover:bg-surface-glass/60 transition-all duration-300 group shadow-sm w-full"
                  >
                    <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-surface-glass border border-border/50 flex items-center justify-center group-hover:border-cta/50 transition-all duration-300 shrink-0 shadow-sm">
                      <Mail className="text-text-main group-hover:text-cta transition-colors w-4.5 h-4.5 lg:w-5.5 lg:h-5.5" strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted mb-0.5 lg:mb-1">Direct Line</p>
                      <span className="font-semibold text-sm lg:text-base text-text-main group-hover:text-cta transition-colors font-sans block truncate">pavankm146@gmail.com</span>
                    </div>
                  </a>
                </div>
              </div>
 
              {/* Social icons */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted mb-3 lg:mb-4">Digital Presence</p>
                <div className="flex gap-3 lg:gap-4">
                  {[
                    { icon: FaLinkedin, href: "https://www.linkedin.com/in/-pavankm", label: "LinkedIn" },
                    { icon: FaGithub, href: "https://github.com/pavannkm", label: "GitHub" },
                    { icon: SiTryhackme, href: "https://tryhackme.com/p/cs22.1693", label: "TryHackMe" }
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-surface-glass border border-border/50 flex items-center justify-center text-text-muted hover:text-cta hover:border-cta/50 transition-all duration-300 active:scale-95 shadow-sm shrink-0"
                      aria-label={social.label}
                    >
                      <social.icon size={18} className="lg:w-5 lg:h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
 
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:gap-5 font-sans h-full justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] ml-1">Your Name</label>
                    <input
                      type="text" id="name" name="name"
                      value={formData.name} onChange={handleChange}
                      required
                      className="input w-full bg-surface-glass/40 border-border/50 rounded-xl"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] ml-1">Email Address</label>
                    <input
                      type="email" id="email" name="email"
                      value={formData.email} onChange={handleChange}
                      required
                      className="input w-full bg-surface-glass/40 border-border/50 rounded-xl"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>
                <div className="space-y-2 flex-1 flex flex-col">
                  <label htmlFor="message" className="text-[10px] font-bold text-text-muted uppercase tracking-[0.15em] ml-1">Message</label>
                  <textarea
                    id="message" name="message"
                    value={formData.message} onChange={handleChange}
                    required
                    className="input w-full bg-surface-glass/40 border-border/50 rounded-xl resize-none flex-1 min-h-[120px] lg:min-h-[160px]"
                    placeholder="How can I assist you?"
                  ></textarea>
                </div>
 
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full sm:w-auto px-8 flex items-center justify-center gap-3 disabled:opacity-70 group"
                  >
                    {isSubmitting ? 'Transmitting...' : (
                      <>
                        Send Message <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
 
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-4 rounded-xl flex items-center gap-3 border ${submitStatus.type === 'success' ? 'bg-cta/10 text-cta border-cta/30' : 'bg-red-500/10 text-red-500 border-red-500/30'}`}
                  >
                    {submitStatus.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    <p className="text-sm font-semibold tracking-wide">{submitStatus.text}</p>
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
