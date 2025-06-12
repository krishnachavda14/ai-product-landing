import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e6edff',
          200: '#ccd9ff',
          300: '#99b3ff',
          400: '#6680ff',
          500: '#3366ff',
          600: '#0040ff',
          700: '#0033cc',
          800: '#002699',
          900: '#001a66',
        },
        secondary: {
          50: '#fff0f5',
          100: '#ffe6ed',
          200: '#ffccd9',
          300: '#ff99b3',
          400: '#ff6680',
          500: '#ff3366',
          600: '#ff0040',
          700: '#cc0033',
          800: '#990026',
          900: '#66001a',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(to right, var(--primary-gradient))',
        'gradient-secondary': 'linear-gradient(to right, var(--secondary-gradient))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'spin-slow': 'spin 4s linear infinite',
      },
      boxShadow: {
        'glass': '0 0 15px 0 rgba(255, 255, 255, 0.1)',
        'glass-lg': '0 0 30px 0 rgba(255, 255, 255, 0.2)',
        'glass-xl': '0 0 50px 0 rgba(255, 255, 255, 0.3)',
        'neon': '0 0 5px theme(colors.primary.400), 0 0 20px theme(colors.primary.500)',
        'neon-lg': '0 0 10px theme(colors.primary.400), 0 0 40px theme(colors.primary.500)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

export default config; 