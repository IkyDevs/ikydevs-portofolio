// components/Contact.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { contactInfo, personalInfo, socialLinks } from "@/lib/constants";
import { useState, ChangeEvent, FormEvent } from "react";
import {
  FaCheck,
  FaPaperPlane,
  FaSpinner,
  FaEnvelope,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { themeColor } from "@/lib/colors";

const theme = themeColor.dark;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const initializeEmailJS = () => {
    const SERVICE_ID = "service_ol3q5u5";
    const TEMPLATE_ID = "template_sytgo9f";
    const PUBLIC_KEY = "zaG2jdDSLoai1mYGB";
    try {
      emailjs.init(PUBLIC_KEY);
      return { SERVICE_ID, TEMPLATE_ID };
    } catch {
      return null;
    }
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "", subject: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((p) => ({ ...p, [name]: "" }));
    }
  };

  const sendEmailWithEmailJS = async () => {
    const emailConfig = initializeEmailJS();
    if (!emailConfig) throw new Error("EmailJS init failed");

    return emailjs.send(emailConfig.SERVICE_ID, emailConfig.TEMPLATE_ID, {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: personalInfo.email,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      errorMessage: "",
    });

    try {
      await sendEmailWithEmailJS();
      setFormStatus({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        errorMessage: "",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(
        () => setFormStatus((p) => ({ ...p, isSuccess: false })),
        5000,
      );
    } catch {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: "Failed to send message. Please try again.",
      });
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-400 transition";

  return (
    <section
      id="contact"
      className={`py-24 px-4 sm:px-6 lg:px-8 ${theme.bg}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400"
          >
            05 / Contact
          </motion.p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-zinc-100">
            Let&apos;s{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              Build Together
            </span>
          </h2>
          <div className="h-0.5 w-20 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full" />
          <p className="mt-6 text-zinc-400 max-w-2xl mx-auto">
            {contactInfo.description}
          </p>
        </motion.div>

        {/* STATUS */}
        <AnimatePresence>
          {formStatus.isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-8 rounded-xl border border-green-400/40 bg-green-500/10 p-6"
            >
              <div className="flex items-center gap-3 font-semibold text-green-300">
                <FaCheck /> Message sent successfully!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 space-y-6"
          >
            {(["name", "email", "subject"] as const).map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-zinc-400 mb-1.5"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  id={field}
                  name={field}
                  placeholder={field.toUpperCase()}
                  value={formData[field]}
                  onChange={handleChange}
                  aria-invalid={!!errors[field]}
                  className={`${inputBase} ${
                    errors[field] ? "border-red-500/70" : ""
                  }`}
                />
                {errors[field] && (
                  <p className="mt-2 text-sm font-medium text-red-400">
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-zinc-400 mb-1.5"
              >
                Message
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                rows={5}
                id="message"
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
                className={`${inputBase} ${
                  errors.message ? "border-red-500/70" : ""
                }`}
              />
              {errors.message && (
                <p className="mt-2 text-sm font-medium text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              disabled={formStatus.isSubmitting}
              className={`${theme.accent} w-full rounded-lg px-6 py-3.5 font-semibold flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_rgba(99,102,241,0.8)]`}
            >
              {formStatus.isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Send Message
                </>
              )}
            </motion.button>

            {formStatus.isError && (
              <p className="text-sm font-medium text-red-400 text-center">
                {formStatus.errorMessage}
              </p>
            )}
          </motion.form>

          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                icon: <FaEnvelope />,
                title: "Email",
                value: personalInfo.email,
              },
              {
                icon: <FaClock />,
                title: "Response Time",
                value: contactInfo.responseTime,
              },
              {
                icon: <FaCheckCircle />,
                title: "Availability",
                value: contactInfo.availability,
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ x: 6 }}
                className="glass glass-hover rounded-xl p-5 flex gap-4"
              >
                <div className={`${theme.accentSoft} rounded-lg w-10 h-10 flex items-center justify-center text-lg`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-100">{item.title}</h4>
                  <p className="text-zinc-400 text-sm">{item.value}</p>
                </div>
              </motion.div>
            ))}

            {/* SOCIAL */}
            <div className="flex gap-3">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="glass glass-hover rounded-lg p-3 text-zinc-300"
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}