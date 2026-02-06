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

const theme = themeColor.pastel;

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

  /* =======================
      LOGIC ASLI (UNCHANGED)
     ======================= */

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

  /* =======================
        UI CLASSES
     ======================= */

  const inputBase =
    "w-full px-4 py-3 bg-white border-2 border-black focus:outline-none focus:ring-2 focus:ring-black transition";

  const textFields: Array<keyof typeof formData> = ["name", "email", "subject"];

  return (
    <section
      id="contact"
      className={`py-24 px-4 sm:px-6 lg:px-8 ${theme.bg} ${theme.text}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            {contactInfo.title}
          </h2>
          <div className="h-1 w-20 bg-black mx-auto" />
          <p className="mt-6 text-neutral-600 max-w-2xl mx-auto">
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
              className="mb-8 border-4 border-black bg-green-100 p-6 shadow-[6px_6px_0_#000]"
            >
              <div className="flex items-center gap-4 font-bold">
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
            className={`${theme.surface} border-4 border-black p-8 shadow-[8px_8px_0_#000] space-y-6`}
          >
            {textFields.map((field) => (
              <motion.input
                key={field}
                whileFocus={{ scale: 1.02 }}
                type="text"
                name={field}
                placeholder={field.toUpperCase()}
                value={formData[field]}
                onChange={handleChange}
                className={inputBase}
              />
            ))}

            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              rows={5}
              name="message"
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              className={inputBase}
            />

            <motion.button
              type="submit"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              disabled={formStatus.isSubmitting}
              className={`${theme.primary} border-2 border-black px-6 py-3 font-black shadow-[4px_4px_0_#000] flex items-center justify-center gap-2`}
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
                className={`${theme.surface} border-4 border-black p-5 shadow-[6px_6px_0_#000] flex gap-4`}
              >
                <div className="text-xl">{item.icon}</div>
                <div>
                  <h4 className="font-black">{item.title}</h4>
                  <p className="text-neutral-600">{item.value}</p>
                </div>
              </motion.div>
            ))}

            {/* SOCIAL */}
            <div className="flex gap-4">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 border-2 border-black shadow-[3px_3px_0_#000]"
                  >
                    <Icon />
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
