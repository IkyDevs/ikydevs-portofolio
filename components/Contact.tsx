"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mounted, setMounted] = useState(false);

  // EmailJS Configuration - GANTI DENGAN DATA KAMU
  const EMAILJS_CONFIG = {
    serviceId: "service_ol3q5u5", // Ganti dengan Service ID kamu
    templateId: "template_sytgo9f", // Ganti dengan Template ID kamu
    publicKey: "zaG2jdDSLoai1mYGB", // Ganti dengan Public Key kamu
  };

  // Set mounted state untuk menghindari hydration error
  useEffect(() => {
    setMounted(true);
    // Initialize EmailJS
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }, []);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit dengan EmailJS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) {
      console.error('Form ref not found');
      return;
    }

    // Validasi form
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    setFormStatus('loading');

    try {
      console.log('Sending email via EmailJS...');

      // Kirim email menggunakan EmailJS
      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        EMAILJS_CONFIG.publicKey
      );

      console.log('Email sent successfully!', result);

      // Success state
      setFormStatus('success');

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Auto reset success message setelah 5 detik
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);

    } catch (error) {
      console.error('Failed to send email:', error);
      setFormStatus('error');

      // Auto reset error message setelah 5 detik
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }
  };

  // Jika belum mounted, tampilkan loading skeleton
  if (!mounted) {
    return (
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl p-8 border border-gray-800 animate-pulse">
              <div className="h-8 bg-gray-800 rounded w-3/4 mb-6"></div>
              <div className="space-y-4">
                <div className="h-12 bg-gray-800 rounded"></div>
                <div className="h-12 bg-gray-800 rounded"></div>
                <div className="h-32 bg-gray-800 rounded"></div>
                <div className="h-12 bg-gray-800 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Let's Build
            </span>{" "}
            <span className="text-white">Together</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can create something
            amazing.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl p-8 border border-gray-800"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
              noValidate
            >
              {/* Hidden fields untuk EmailJS template */}
              <input
                type="hidden"
                name="to_email"
                value="ahmadrofiki6146@gmail.com"
              />
              <input type="hidden" name="to_name" value="IkyDevs" />

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name" // Nama ini harus sesuai dengan template EmailJS
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={formStatus === "loading"}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                             outline-none transition-all disabled:opacity-50
                             disabled:cursor-not-allowed"
                    placeholder="John Doe"
                    aria-label="Your name"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email" // Nama ini harus sesuai dengan template EmailJS
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={formStatus === "loading"}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                             outline-none transition-all disabled:opacity-50
                             disabled:cursor-not-allowed"
                    placeholder="john@example.com"
                    aria-label="Your email address"
                  />
                </div>
              </div>

              {/* Subject Input */}
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-400"
                >
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject" // Nama ini harus sesuai dengan template EmailJS
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={formStatus === "loading"}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                           outline-none transition-all disabled:opacity-50
                           disabled:cursor-not-allowed"
                  placeholder="Project Inquiry"
                  aria-label="Email subject"
                />
              </div>

              {/* Message Textarea */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-400"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message" // Nama ini harus sesuai dengan template EmailJS
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  disabled={formStatus === "loading"}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                           outline-none transition-all resize-none disabled:opacity-50
                           disabled:cursor-not-allowed"
                  placeholder="Tell me about your project, timeline, and budget..."
                  aria-label="Your message"
                />
              </div>

              {/* Status Messages */}
              {formStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
                >
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-400 font-medium">
                      Message sent successfully! ✨
                    </p>
                    <p className="text-green-400/80 text-sm mt-1">
                      Thank you for contacting me. I'll respond to{" "}
                      <strong>{formData.email}</strong> within 24 hours.
                    </p>
                    <p className="text-green-400/60 text-xs mt-2">
                      Check your email for confirmation.
                    </p>
                  </div>
                </motion.div>
              )}

              {formStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-400 font-medium">
                      Failed to send message
                    </p>
                    <p className="text-red-400/80 text-sm mt-1">
                      Please try again or contact me directly at the email
                      below.
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500
                           rounded-lg font-semibold text-lg hover:shadow-lg
                           hover:shadow-blue-500/25 transition-all disabled:opacity-50
                           disabled:cursor-not-allowed flex items-center justify-center
                           space-x-3 group relative overflow-hidden"
                >
                  {/* Button Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Button Content */}
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    {formStatus === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <span>Send Message</span>
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Direct Email Link */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-500 pt-4 border-t border-gray-800/50">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Or email me directly:</span>
                  </div>
                  <a
                    href="mailto:ahmadrofiki6146@gmail.com?subject=Project Inquiry&body=Hello IkyDevs,"
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ahmadrofiki6146@gmail.com
                  </a>
                </div>
              </div>
            </form>
          </motion.div>

          
        </div>
      </div>
    </section>
  );
};

export default Contact;
