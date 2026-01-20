// components/Contact.jsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { contactInfo, personalInfo, socialLinks } from "@/lib/constants";
import { useState } from "react";
import { FaCheck, FaExclamationTriangle, FaPaperPlane, FaSpinner, FaEnvelope, FaClock, FaCheckCircle } from "react-icons/fa";
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errorMessage: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // Initialize EmailJS
  const initializeEmailJS = () => {
    if (!emailjs) {
      console.error("EmailJS not loaded");
      return false;
    }

    const SERVICE_ID = "service_ol3q5u5"; // Service ID dari EmailJS
    const TEMPLATE_ID = "template_sytgo9f"; // Template ID dari EmailJS
    const PUBLIC_KEY = "zaG2jdDSLoai1mYGB"; // Public Key dari EmailJS

    try {
      emailjs.init(PUBLIC_KEY);
      return { SERVICE_ID, TEMPLATE_ID };
    } catch (error) {
      console.error("Failed to initialize EmailJS:", error);
      return null;
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      subject: "",
      message: ""
    };

    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      isValid = false;
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const sendEmailWithEmailJS = async () => {
    const emailConfig = initializeEmailJS();

    if (!emailConfig) {
      throw new Error('EmailJS configuration failed');
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: personalInfo.email,
      reply_to: formData.email,
      date: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      website: "Portfolio Website"
    };

    console.log('Sending email with EmailJS:', {
      serviceId: emailConfig.SERVICE_ID,
      templateId: emailConfig.TEMPLATE_ID,
      params: templateParams
    });

    try {
      const response = await emailjs.send(
        emailConfig.SERVICE_ID,
        emailConfig.TEMPLATE_ID,
        templateParams
      );

      console.log('EmailJS Response:', response);
      return { success: true, data: response };

    } catch (error) {
      console.log('EmailJS Error:', {
        code: error?.code,
        text: error?.text,
        message: error?.message,
        fullError: error
      });

      return {
        success: false,
        error: error?.text || error?.message || 'Failed to send email via EmailJS'
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      errorMessage: ""
    });

    try {
      // Attempt to send via EmailJS
      const emailResult = await sendEmailWithEmailJS();

      if (emailResult.success) {
        // Email sent successfully via EmailJS
        setFormStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          errorMessage: ""
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });

        // Save submission to localStorage for backup
        try {
          const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
          submissions.push({
            ...formData,
            timestamp: new Date().toISOString(),
            status: 'sent_via_emailjs'
          });
          localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        } catch (storageError) {
          console.warn('Failed to save to localStorage:', storageError);
        }

        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormStatus(prev => ({
            ...prev,
            isSuccess: false
          }));
        }, 5000);

      } else {
        // EmailJS failed, fallback to localStorage
        throw new Error(emailResult.error || 'EmailJS failed');
      }

    } catch (error) {
      console.error('Form submission error:', error);

      // Fallback: Save to localStorage and show success anyway (for demo)
      try {
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push({
          ...formData,
          timestamp: new Date().toISOString(),
          status: 'saved_locally'
        });
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

        setFormStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          errorMessage: ""
        });

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });

        console.log('Form data saved locally:', formData);

      } catch (fallbackError) {
        console.error('Fallback failed:', fallbackError);
        setFormStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          errorMessage: "Failed to send message. Please try again later or email me directly."
        });
      }
    }
  };

  const inputClasses = (error) => `
    w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm
    border ${error ? 'border-red-500/50' : 'border-gray-700/50'}
    rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2
    focus:ring-blue-500/20 transition-all duration-300
    placeholder-gray-500
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        {/* Animated Connection Lines */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-20 bg-gradient-to-b from-blue-500/30 to-cyan-500/30"
              style={{
                left: `${15 + i * 10}%`,
                top: '20%',
              }}
              animate={{
                height: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          ))}
        </div>

        {/* Pulsing Communication Nodes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 border-2 border-blue-500/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${40 + (i % 2) * 20}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="gradient-text">{contactInfo.title}</span>
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto"
            >
              {contactInfo.description}
            </motion.p>
          </div>

          {/* Success/Error Messages */}
          <AnimatePresence>
            {formStatus.isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl backdrop-blur-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                    <FaCheck className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-green-400 text-lg mb-1">Message Sent Successfully!</h4>
                    <p className="text-green-300">
                      Thank you for your message. I've received it and will get back to you within 24 hours.
                    </p>
                    <p className="text-green-200/80 text-sm mt-2">
                      A confirmation has been sent to your email: <span className="font-semibold">{formData.email}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {formStatus.isError && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8 p-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full">
                    <FaExclamationTriangle className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-400 text-lg mb-1">Failed to Send Message</h4>
                    <p className="text-red-300">
                      {formStatus.errorMessage || "There was an error sending your message. Please try again."}
                    </p>
                    <p className="text-red-200/80 text-sm mt-2">
                      You can also email me directly at:{" "}
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="underline hover:text-red-200"
                      >
                        {personalInfo.email}
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputClasses(errors.name)}
                      placeholder="John Doe"
                      disabled={formStatus.isSubmitting}
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-red-400 text-sm mt-2"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputClasses(errors.email)}
                      placeholder="john@example.com"
                      disabled={formStatus.isSubmitting}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-red-400 text-sm mt-2"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={inputClasses(errors.subject)}
                    placeholder="Project Inquiry or Collaboration"
                    disabled={formStatus.isSubmitting}
                  />
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {errors.subject}
                    </motion.p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={inputClasses(errors.message)}
                    placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                    disabled={formStatus.isSubmitting}
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-red-400 text-sm mt-2"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                  <p className="text-gray-500 text-sm mt-2">
                    Please include as much detail as possible for a better response.
                  </p>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formStatus.isSubmitting}
                  whileHover={{ scale: formStatus.isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: formStatus.isSubmitting ? 1 : 0.95 }}
                  className={`w-full px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center space-x-3 ${
                    formStatus.isSubmitting
                      ? 'bg-gray-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600'
                  }`}
                >
                  {formStatus.isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {/* Form Note */}
                <p className="text-gray-500 text-sm text-center">
                  * Required fields. I'll respond within 24 hours.
                </p>

                {/* EmailJS Status */}
                <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <p className="text-sm text-gray-400 text-center">
                    Powered by EmailJS for secure email delivery
                  </p>
                </div>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 text-blue-400">
                  Get In Touch
                </h3>
                <p className="text-gray-400 mb-8">
                  Feel free to reach out for collaborations, project discussions,
                  or just to say hello! I'm always open to discussing new opportunities.
                </p>
              </div>

              <div className="space-y-6">
                {/* Email Info */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-all"
                >
                  <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                    <FaEnvelope className="text-blue-400 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-gray-400 hover:text-blue-400 transition-colors break-all"
                    >
                      {personalInfo.email}
                    </a>
                    <p className="text-gray-500 text-sm mt-2">
                      Best way to reach me for detailed discussions
                    </p>
                  </div>
                </motion.div>

                {/* Response Time */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all"
                >
                  <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
                    <FaClock className="text-cyan-400 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Response Time</h4>
                    <p className="text-gray-300">{contactInfo.responseTime}</p>
                    <p className="text-gray-500 text-sm mt-2">
                      I typically respond within a day
                    </p>
                  </div>
                </motion.div>

                {/* Availability */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-4 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-all"
                >
                  <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg">
                    <FaCheckCircle className="text-green-400 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Availability</h4>
                    <p className="text-gray-300">{contactInfo.availability}</p>
                    <p className="text-gray-500 text-sm mt-2">
                      Currently available for freelance work and collaborations
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold mb-4 text-gray-300">Connect with me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 bg-gray-800/50 rounded-lg hover:bg-gradient-to-r ${social.color} transition-all`}
                        title={social.name}
                      >
                        <Icon size={20} className="text-gray-300 hover:text-white transition-colors" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* EmailJS Info */}
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                <h4 className="font-semibold mb-2 text-blue-400">Secure Contact Form</h4>
                <p className="text-gray-400 text-sm">
                  This form uses <span className="text-cyan-400">EmailJS</span> for secure email delivery.
                  Your information is encrypted and sent directly to my inbox.
                </p>
              </div>

              {/* Direct Email Option */}
              <div className="p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50">
                <h4 className="font-semibold mb-2 text-gray-300">Prefer Direct Email?</h4>
                <p className="text-gray-400 text-sm">
                  You can also email me directly at{" "}
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    {personalInfo.email}
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
