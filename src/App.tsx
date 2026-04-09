import React, { lazy, Suspense } from 'react'
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'

import Header from './components/Header'
import Hero from './components/Hero'
import ParticlesBackground from './components/ParticlesBackground'
const About = lazy(() => import('./components/About'))
const Services = lazy(() => import('./components/Services'))
const Gallery = lazy(() => import('./components/Gallery'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

const App: React.FC = () => {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user" transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}>
        <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
          {/* Fundo */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-90" />
            <div className="absolute inset-0 bg-cover bg-center opacity-20 bg-hero" aria-hidden="true" />
          </div>

          {/* Partículas visíveis (entre fundo e conteúdo) */}
          <ParticlesBackground />
          {/* Conteúdo */}
          <div className="relative z-20">
            <Header />
            <Hero />
            <Suspense fallback={<div className="h-16" />}>
              <About />
              <Services />
              <Gallery />
              <Contact />
              <Footer />
            </Suspense>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  )
}

export default App
