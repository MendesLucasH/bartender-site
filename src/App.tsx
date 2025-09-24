import React, { lazy, Suspense, useMemo } from 'react'
import { LazyMotion, domAnimation, MotionConfig, motion } from 'framer-motion'

import Header from './components/Header'
import Hero from './components/Hero'
const About = lazy(() => import('./components/About'))
const Services = lazy(() => import('./components/Services'))
const Gallery = lazy(() => import('./components/Gallery'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

const App: React.FC = () => {
  // acessibilidade
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  // quantidade adaptativa
  const COUNT = useMemo(() => {
    if (prefersReduced) return 0
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    return isMobile ? 6 : 10
  }, [prefersReduced])

  // seeds estáveis (geradas 1x; não "teleporta" em re-renders)
  const seeds = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        x: Math.random() * 100,   // %
        y: Math.random() * 100,   // %
        d: 3 + Math.random() * 2, // duração
        delay: Math.random() * 2, // atraso
      })),
    [COUNT]
  )

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
<div className="fixed inset-0 z-10 pointer-events-none mix-blend-screen">
  {Array.from({ length: 28 }).map((_, i) => {
    // posições fixas e animações variadas (sem Math.random no render)
    const x = (i * 37) % 100;          // % horizontal
    const y = (i * 53) % 100;          // % vertical
    const size = 10 + (i % 6) * 4;     // 10–30px
    const dur = 6 + (i % 5) * 1.2;     // 6–10s
    const delay = (i % 7) * 0.6;       // 0–3.6s
    return (
      <span
        key={i}
        className="absolute dot"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: `${size}px`,
          height: `${size}px`,
          animation: `floatY ${dur}s ease-in-out ${delay}s infinite, pulse ${dur *
            0.8}s ease-in-out ${delay}s infinite`,
        }}
      />
    );
  })}
</div>


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
