"use client";

import { motion } from 'framer-motion';
import { Code, Palette, Rocket } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Clean Code',
      description: 'Writing maintainable and scalable code following best practices',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'UI/UX Design',
      description: 'Creating beautiful interfaces with exceptional user experience',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Performance',
      description: 'Optimizing applications for speed and efficiency',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
              About Me
            </span>
            <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Who I Am ?
            </span>{' '}

          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            im new in the development world, but im very passionate about learning and creating amazing things with code. I specialize in front-end development and love crafting beautiful, responsive websites and applications.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="relative bg-gradient-to-b from-gray-900/50 to-black/50 rounded-2xl p-8 border border-gray-800 overflow-hidden">
                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>

                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
