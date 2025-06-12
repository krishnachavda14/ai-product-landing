'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { EnvelopeIcon, UserIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'initializing'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Check if it's a temporary service unavailability
        if (response.status === 503) {
          setSubmitStatus('initializing');
          // Retry after 30 seconds
          setTimeout(() => {
            setSubmitStatus('idle');
            setIsSubmitting(false);
          }, 30000);
          return;
        }
        throw new Error(result.details || result.error || 'Failed to submit form');
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      if (submitStatus !== 'initializing') {
        setIsSubmitting(false);
      }
      // Reset success/error message after 5 seconds
      if (submitStatus !== 'initializing') {
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    }
  };

  return (
    <div id="contact" className="relative isolate bg-white">
      {/* Background gradient */}
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-1/2 -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center mb-8"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative bg-white px-4">
              <span className="inline-flex items-center gap-x-2 rounded-full bg-purple-600/10 px-6 py-2 text-sm font-medium leading-6 text-purple-700 ring-1 ring-inset ring-purple-600/20">
                Join Waitlist
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Get Early Access to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              AI Magic
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-lg leading-8 text-gray-600 max-w-xl mx-auto"
          >
            Join our exclusive waitlist and be among the first to experience the future of photo enhancement.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-16 max-w-xl"
        >
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="relative space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div>
              <div className="relative">
                <label htmlFor="name" className="absolute -top-2.5 left-2 inline-block bg-white px-2 text-sm font-medium text-gray-900">
                  Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <UserIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    id="name"
                    autoComplete="name"
                    className={`block w-full rounded-xl border-0 py-4 pl-12 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.name ? 'ring-red-300' : 'ring-gray-300'
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6`}
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 pl-4"
                >
                  {errors.name.message}
                </motion.p>
              )}
            </div>

            <div>
              <div className="relative">
                <label htmlFor="email" className="absolute -top-2.5 left-2 inline-block bg-white px-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <EnvelopeIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    type="email"
                    id="email"
                    autoComplete="email"
                    className={`block w-full rounded-xl border-0 py-4 pl-12 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.email ? 'ring-red-300' : 'ring-gray-300'
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6`}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 pl-4"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            <div>
              <div className="relative">
                <label htmlFor="message" className="absolute -top-2.5 left-2 inline-block bg-white px-2 text-sm font-medium text-gray-900">
                  Message
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute top-4 left-0 flex items-start pl-4">
                    <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    id="message"
                    rows={4}
                    className={`block w-full rounded-xl border-0 py-4 pl-12 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.message ? 'ring-red-300' : 'ring-gray-300'
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6`}
                    placeholder="Tell us what you're excited about..."
                  />
                </div>
              </div>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-600 pl-4"
                >
                  {errors.message.message}
                </motion.p>
              )}
            </div>

            <motion.div
              className="flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className={`relative w-full rounded-xl bg-purple-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ${
                  isSubmitting ? 'cursor-not-allowed' : 'hover:translate-y-[-2px]'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  'Join Waitlist'
                )}
              </button>
            </motion.div>
          </motion.form>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex items-center justify-center gap-x-2 text-sm text-green-600 bg-green-50 rounded-xl px-6 py-4"
            >
              <CheckCircleIcon className="h-6 w-6" />
              <p>Thank you for your interest! We'll be in touch soon.</p>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex items-center justify-center gap-x-2 text-sm text-red-600 bg-red-50 rounded-xl px-6 py-4"
            >
              <XCircleIcon className="h-6 w-6" />
              <p>Something went wrong. Please try again later.</p>
            </motion.div>
          )}

          {submitStatus === 'initializing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex items-center justify-center gap-x-2 text-sm text-blue-600 bg-blue-50 rounded-xl px-6 py-4"
            >
              <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p>Service is initializing. Please wait a moment...</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 