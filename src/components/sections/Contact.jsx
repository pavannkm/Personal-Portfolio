import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiTryhackme } from 'react-icons/si';
import SectionHeader from '../SectionHeader';
import ParticleBackground from '../ParticleBackground';

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
      setSubmitStatus({ type: 'success', text: 'Message sent successfully!' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      setSubmitStatus({ type: 'error', text: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <section id="contact" className="flex-1 w-full py-14 lg:py-24 px-4 relative overflow-hidden scroll-mt-16">
      <ParticleBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader title="Let's" highlight="Connect" color="primary" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-6 md:p-12 rounded-3xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h3 className="text-3xl font-bold mb-6">Get in touch</h3>
              <p className="text-text-muted text-lg mb-12 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Whether it's a security consultation or a full-stack build, let's talk.
              </p>

              <div className="flex flex-col gap-6 mb-12">
                <a href="mailto:pavankm146@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-text-muted mb-1">Email Me</p>
                    <span className="font-bold text-white group-hover:text-primary transition-colors">pavankm146@gmail.com</span>
                  </div>
                </a>
              </div>

              <div className="flex gap-4">
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
                    className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-all active:scale-90"
                    aria-label={social.label}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-text-muted ml-2">Name</label>
                    <input
                      type="text" id="name" name="name"
                      value={formData.name} onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/20"
                      placeholder="Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-text-muted ml-2">Email</label>
                    <input
                      type="email" id="email" name="email"
                      value={formData.email} onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/20"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-text-muted ml-2">Message</label>
                  <textarea
                    id="message" name="message"
                    value={formData.message} onChange={handleChange}
                    required rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-white/20"
                    placeholder="How can I help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="pill-button bg-primary text-background hover:bg-primary/90 flex items-center justify-center gap-3 disabled:opacity-70 mt-4 group"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl flex items-center gap-3 border ${submitStatus.type === 'success' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}
                  >
                    {submitStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <p className="text-sm font-bold">{submitStatus.text}</p>
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
