'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, Copy, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  contact: {
    email: string;
    phone: string;
    whatsapp?: string;
  };
}

export default function ContactSection({ contact }: ContactSectionProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const email = contact?.email || 'alvihasan.dev@gmail.com';
  const phone = contact?.phone || '+880 1700 000000';
  const whatsapp = contact?.whatsapp || '+880 1700 000000';

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetric Header Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold text-pink-400 tracking-widest uppercase mb-2">
              Get In Touch
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Let&apos;s Build Together
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-md">
            Have an engineering project, distributed system challenge, or career opportunity? Reach out directly.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Contact Methods (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-4 justify-center"
          >
            {/* Email Card */}
            <div className="solid-card p-5 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-medium tracking-wider">Email</span>
                  <p className="text-white font-display font-semibold text-sm">{email}</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(email, 'email')}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
                title="Copy Email"
              >
                {copiedField === 'email' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="solid-card p-5 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-medium tracking-wider">Phone</span>
                  <p className="text-white font-display font-semibold text-sm">{phone}</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(phone, 'phone')}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
                title="Copy Phone Number"
              >
                {copiedField === 'phone' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* WhatsApp Card */}
            {whatsapp && (
              <div className="solid-card p-5 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-medium tracking-wider">WhatsApp</span>
                    <p className="text-white font-display font-semibold text-sm">{whatsapp}</p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
                  title="Open WhatsApp Chat"
                >
                  <Send className="w-4 h-4" />
                </a>
              </div>
            )}
          </motion.div>

          {/* Right Column: Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 solid-card p-8"
          >
            <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Send A Direct Message</span>
            </h3>

            {formSubmitted ? (
              <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                <h4 className="font-display text-lg font-bold text-white">Message Delivered</h4>
                <p className="text-xs text-gray-300">
                  Thank you for reaching out. I will respond to your message shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 glass-input text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 glass-input text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Message Body
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, timeline, or opportunity..."
                    className="w-full px-3.5 py-2.5 glass-input text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="gradient-pill-btn flex items-center justify-center gap-2 text-sm py-3 mt-2 self-start"
                >
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
