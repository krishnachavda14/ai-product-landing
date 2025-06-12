'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ImageEnhancer() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit for Gemini API
        setError('File size should be less than 4MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setEnhancedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const enhanceImage = async () => {
    if (!originalImage) return;

    try {
      setIsProcessing(true);
      setError(null);

      const response = await fetch('/api/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: originalImage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Failed to enhance image');
      }

      const result = await response.json();
      setEnhancedImage(result.output);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enhance image. Please try again.');
      console.error('Enhancement error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="enhance" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black opacity-90" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Enhance Your Photo
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col items-center space-y-6">
              {/* File Upload Area */}
              <div className="w-full">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 block w-full"
                >
                  <input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <div className="space-y-2">
                    <div className="text-gray-300">
                      {originalImage ? (
                        'Click to change image'
                      ) : (
                        <>
                          <span>Drop your image here, or </span>
                          <span className="text-purple-400">browse</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">
                      PNG, JPG up to 4MB
                    </p>
                  </div>
                </label>
              </div>

              {/* Image Preview Area */}
              {originalImage && (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-800">
                    <Image
                      src={originalImage}
                      alt="Original"
                      fill
                      className="object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                      Original
                    </div>
                  </div>

                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-800">
                    {enhancedImage ? (
                      <>
                        <Image
                          src={enhancedImage}
                          alt="Enhanced"
                          fill
                          className="object-contain"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                          Enhanced
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400">
                          Enhanced version will appear here
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Enhance Button */}
              {originalImage && !enhancedImage && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={enhanceImage}
                  disabled={isProcessing}
                  className="relative rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span className="relative z-10">
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Enhancing...</span>
                      </div>
                    ) : (
                      'Enhance Image'
                    )}
                  </span>
                  <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-70 disabled:opacity-0" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 