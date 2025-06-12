'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SparklesIcon,
  PhotoIcon,
  ArrowPathIcon,
  SwatchIcon,
  CameraIcon,
  AdjustmentsHorizontalIcon,
  CloudArrowUpIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'AI-Powered Enhancement',
    description: 'Advanced machine learning algorithms that analyze and enhance your photos in seconds.',
    icon: SparklesIcon,
    gradient: 'from-primary-500 to-secondary-500',
  },
  {
    name: 'Smart Color Correction',
    description: 'Automatically adjusts colors and tones for perfect balance and vibrancy.',
    icon: SwatchIcon,
    gradient: 'from-blue-500 to-purple-500',
  },
  {
    name: 'Portrait Enhancement',
    description: 'Intelligent facial recognition for perfect portrait retouching.',
    icon: CameraIcon,
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Batch Processing',
    description: 'Process multiple photos simultaneously with consistent quality.',
    icon: ArrowPathIcon,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Custom Presets',
    description: 'Create and save your own enhancement presets for consistent style.',
    icon: AdjustmentsHorizontalIcon,
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Cloud Storage',
    description: 'Securely store and access your enhanced photos from anywhere.',
    icon: CloudArrowUpIcon,
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Privacy First',
    description: 'Your photos are processed securely and never stored without permission.',
    icon: ShieldCheckIcon,
    gradient: 'from-indigo-500 to-violet-500',
  },
  {
    name: 'Original Backup',
    description: 'Always keep your original photos safe with automatic backups.',
    icon: PhotoIcon,
    gradient: 'from-red-500 to-pink-500',
  },
];

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="features" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-primary-400 to-secondary-400 bg-clip-text text-transparent"
          >
            Powerful Features for Perfect Photos
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 sm:mt-6 text-base sm:text-lg leading-8 text-gray-300"
          >
            Transform your photos with our advanced AI-powered features. From color correction to portrait enhancement, we've got everything you need.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mx-auto mt-8 sm:mt-12 lg:mt-16"
        >
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 lg:gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 ring-1 ring-gray-800/10 hover:ring-gray-700/20 transition-all duration-300"
              >
                <dt className="flex items-center text-base font-semibold leading-7 text-white">
                  <div className={`flex-shrink-0 flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-gradient-to-r ${feature.gradient} p-2`}>
                    <feature.icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" aria-hidden="true" />
                  </div>
                  <span className="ml-3">{feature.name}</span>
                </dt>
                <dd className="mt-2 text-sm sm:text-base leading-7 text-gray-400">{feature.description}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
} 