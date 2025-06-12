'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import {
  EnvelopeIcon,
  UserIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'

type FormData = {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true)
      setSubmitStatus('idle')

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitStatus('success')
      reset()

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      
      <div className="relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            variants={itemVariants}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl bg-gradient-to-r from-white via-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-8 text-gray-300">
              Have questions about our AI photo enhancement? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mx-auto mt-8 sm:mt-12 lg:mt-16 max-w-xl"
          >
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-4 sm:p-8 ring-1 ring-gray-800/10 shadow-2xl"
            >
              <div className="grid grid-cols-1 gap-x-8 gap-y-6">
                <div>
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      Name
                    </label>
                    <div className="relative mt-2">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <UserIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                      </div>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        className={`block w-full rounded-md border-0 py-2.5 pl-10 bg-white/5 text-white shadow-sm ring-1 ring-inset ${
                          errors.name ? 'ring-red-500' : 'ring-gray-800'
                        } placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6`}
                        placeholder="Your name"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      Email
                    </label>
                    <div className="relative mt-2">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <EnvelopeIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
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
                        className={`block w-full rounded-md border-0 py-2.5 pl-10 bg-white/5 text-white shadow-sm ring-1 ring-inset ${
                          errors.email ? 'ring-red-500' : 'ring-gray-800'
                        } placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium leading-6 text-gray-300"
                    >
                      Message
                    </label>
                    <div className="relative mt-2">
                      <div className="pointer-events-none absolute left-0 top-2 flex items-center pl-3">
                        <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                      </div>
                      <textarea
                        {...register('message', { required: 'Message is required' })}
                        rows={4}
                        className={`block w-full rounded-md border-0 py-2.5 pl-10 bg-white/5 text-white shadow-sm ring-1 ring-inset ${
                          errors.message ? 'ring-red-500' : 'ring-gray-800'
                        } placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6`}
                        placeholder="Your message"
                      />
                    </div>
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-center gap-2 text-sm ${
                      submitStatus === 'success' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <>
                        <CheckCircleIcon className="h-5 w-5" />
                        Message sent successfully!
                      </>
                    ) : (
                      <>
                        <ExclamationCircleIcon className="h-5 w-5" />
                        Failed to send message. Please try again.
                      </>
                    )}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-2.5 text-base font-semibold text-white shadow-neon hover:shadow-neon-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="h-5 w-5 mx-auto border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 