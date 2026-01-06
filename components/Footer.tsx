"use client";

import { motion } from 'framer-motion';
import { Zap, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { socialLinks } from '@/lib/constants';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  IK<span className="text-white">Y</span>DEVS
                </span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">Building the future, one line at a time.</p>
          </div>

          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-gray-800/30">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} IkyDevs. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Designed and developed with ❤️ using Next.js, Tailwind & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
