import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Contact from '@/components/Contact'
import ImageEnhancer from '@/components/ImageEnhancer'

export default function Home() {
  return (
    <Layout>
      <Hero />
      <ImageEnhancer />
      <Features />
      <Contact />
    </Layout>
  )
} 