'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const images = [
  '/sample1.jpg',
  '/sample2.jpg',
  '/sample3.jpg',
  '/sample4.jpg',
];

export default function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleGetStarted = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const enhanceSection = document.getElementById('enhance');
    if (enhanceSection) {
      enhanceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
            >
              Transform your photos with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                AI magic
              </span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg leading-8 text-gray-300"
            >
              Experience the future of photo enhancement. Our AI-powered tool brings out the best in your images while maintaining their natural beauty.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <a
                href="#enhance"
                onClick={handleGetStarted}
                className="relative rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 text-base font-semibold text-white shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:scale-105 group"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-70" />
              </a>
              <a
                href="#features"
                className="text-base font-semibold leading-7 text-white hover:text-purple-300 transition-colors"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Sample images grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-16 flow-root sm:mt-24"
          >
            <div className="relative -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div className="grid grid-cols-2 gap-2 lg:gap-4">
                {images.map((src, index) => (
                  <motion.div
                    key={src}
                    variants={itemVariants}
                    className="relative aspect-[3/2] rounded-lg overflow-hidden bg-gray-800"
                  >
                    <Image
                      src={src}
                      alt={`Sample image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 