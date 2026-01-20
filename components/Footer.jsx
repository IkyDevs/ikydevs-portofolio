// components/Footer.jsx
"use client";
import { motion } from "framer-motion";
import { FaArrowUp, FaHeart } from "react-icons/fa";
import { socialLinks } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-blue-400 mb-4">IkyDevs</h3>
            <p className="text-gray-400 mb-4">
              Frontend Developer passionate about creating beautiful and
              functional web applications.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                "Home",
                "About",
                "Skills",
                "Projects",
                "Experience",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400 mb-2">Have a project in mind?</p>
            <a
              href="mailto:ahmadrofiki6146@gmail.com"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              ahmadrofiki6146@gmail.com
            </a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm mb-4 md:mb-0 flex items-center"
          >
            © {currentYear} Ahmad Rofiki. Made with
            <FaHeart className="mx-1 text-red-500" />
            using Next.js & Tailwind
          </motion.p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-full font-semibold transition-all"
          >
            <span>Back to Top</span>
            <FaArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
