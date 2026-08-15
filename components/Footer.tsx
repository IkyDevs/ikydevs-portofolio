// components/Footer.tsx
"use client";
import { motion } from "framer-motion";
import { FaArrowUp, FaHeart } from "react-icons/fa";
import { socialLinks, navItems } from "@/lib/constants";
import { themeColor } from "@/lib/colors";
import { useLenis } from "./LenisProvider";

const theme = themeColor.dark;

export default function Footer() {
  const year = new Date().getFullYear();
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToSection = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -96 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#0c0c10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold tracking-tight mb-4 text-zinc-100">
              Iky<span className="text-indigo-400">Devs</span>
            </h3>
            <p className="text-zinc-400 mb-4 text-sm">
              Frontend Developer passionate about creating beautiful and
              functional web applications.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="glass glass-hover rounded-lg p-2.5 text-zinc-300"
                  >
                    <Icon size={16} />
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
            <h4 className="text-sm font-semibold text-zinc-200 mb-4 uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(item.id, e)}
                    className="text-zinc-400 hover:text-indigo-300 transition-colors"
                  >
                    {item.name}
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
            <h4 className="text-sm font-semibold text-zinc-200 mb-4 uppercase tracking-widest">
              Contact
            </h4>
            <p className="mb-2 text-zinc-400 text-sm">Have a project in mind?</p>
            <a
              href="mailto:ahmadrofiki6146@gmail.com"
              className="font-medium text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              ahmadrofiki6146@gmail.com
            </a>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-zinc-500 flex items-center"
          >
            © {year} Ahmad Rofiki. Made with
            <FaHeart className="mx-1 text-indigo-400" /> Next.js
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${theme.accent} mt-4 md:mt-0 px-6 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-sm`}
          >
            Back to Top
            <FaArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}