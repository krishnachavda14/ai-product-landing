# AIEnhance - Modern AI Photo Enhancement Landing Page

A stunning, modern landing page for an AI-powered photo enhancement service. Built with Next.js, TailwindCSS, and Framer Motion.

## Features

- 🎨 Modern, dark-themed design with glassmorphism effects
- ✨ Smooth animations and transitions using Framer Motion
- 📱 Fully responsive layout
- 🌈 Beautiful gradient effects and hover states
- 🎭 Interactive components with micro-interactions
- 🔍 SEO optimized
- 🚀 Performance optimized

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Heroicons](https://heroicons.com/) - Icons
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-product-landing.git
cd ai-product-landing
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
│   ├── Layout.tsx   # Main layout wrapper
│   ├── Header.tsx   # Navigation header
│   ├── Hero.tsx     # Hero section
│   ├── Features.tsx # Features section
│   └── Contact.tsx  # Contact form section
└── styles/          # Global styles
```

## Customization

### Colors

The color scheme can be customized in `tailwind.config.ts`. The current theme uses a combination of primary and secondary colors with gradients.

### Content

Update the content in the respective component files:
- Hero section: `src/components/Hero.tsx`
- Features: `src/components/Features.tsx`
- Contact form: `src/components/Contact.tsx`

### Images

Replace the sample images in the `public` directory with your own images. Update the image paths in `src/components/Hero.tsx`.

## Deployment

The site can be easily deployed to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ai-product-landing)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 