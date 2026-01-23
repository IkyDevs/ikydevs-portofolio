// components/Footer.tsx
"use client";
import { motion } from "framer-motion";
import { FaArrowUp, FaHeart } from "react-icons/fa";
import { socialLinks } from "@/lib/constants";
import { themeColor } from "@/lib/colors";

const theme = themeColor.pastel;

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`${theme.bg} border-t-4 border-black`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-black mb-4">IkyDevs</h3>
            <p className="text-neutral-600 mb-4">
              Frontend Developer passionate about creating beautiful and
              functional web applications.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 border-2 border-black shadow-[3px_3px_0_#000]"
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-black mb-4">Quick Links</h4>
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
                    className="hover:underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-black mb-4">Contact</h4>
            <p className="mb-2">Have a project in mind?</p>
            <a
              href="mailto:ahmadrofiki6146@gmail.com"
              className="font-bold underline"
            >
              ahmadrofiki6146@gmail.com
            </a>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t-4 border-black pt-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm flex items-center"
          >
            © {year} Ahmad Rofiki. Made with
            <FaHeart className="mx-1 text-red-500" /> Next.js
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${theme.primary} mt-4 md:mt-0 px-6 py-2 border-2 border-black shadow-[3px_3px_0_#000] flex items-center gap-2 font-bold`}
          >
            Back to Top
            <FaArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
