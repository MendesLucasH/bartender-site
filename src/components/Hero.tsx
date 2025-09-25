import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Sparkles, Award, Users } from 'lucide-react'
import { BRAND } from '../config'

const Hero: React.FC = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const stats = [
    { icon: Award, number: '500+', label: 'Drinks Criados' },
    { icon: Users, number: '1000+', label: 'Clientes Felizes' },
    { icon: Sparkles, number: '15+', label: 'Anos de Experiência' }
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background parallax */}

      {/*<motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/50 to-black" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div> */}
      {/* Background VIDEO (parallax) */}
<motion.div style={{ y }} className="absolute inset-0 z-0 pointer-events-none">
  <video
    className="absolute inset-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
    preload="metadata"
    poster="/media/hero-poster.jpg"
    aria-hidden="true"
  >
    {/* Se tiver .webm, mantenha primeiro */}
    {/* <source src="/media/hero.webm" type="video/webm" /> */}
    <source src="/media/VideoFundo.mp4" type="video/mp4" />
  </video>

  <div className="absolute inset-0 bg-black/85 z-10" />
</motion.div>



      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        {/* Bloco: LOGO + SLOGAN + CTAs */}
        <div className="flex flex-col items-center">
          {/* Logo grande */}
          <img
            src="/images/logo/logopng.png"
            alt={BRAND.name}
            decoding="async"
            loading="eager"
            className="block h-[300px] md:h-[360px] lg:h-[420px] w-auto m-0 p-0 select-none"
          />

          {/* Slogan COLADO (margem negativa pra compensar o espaço do PNG) */}
          <p
            className="
              text-lg md:text-2xl text-gray-300 leading-tight
              mt-[-64px] md:mt-[-84px] lg:mt-[-96px]   /* COLA no logo */
              mb-2
            "
          >
            {BRAND.slogan}
          </p>

          {/* Botões – colados no slogan */}
<div className="flex flex-col sm:flex-row gap-3 mt-1 group">
  <motion.a
    href={BRAND.whatsapp}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{
      scale: 1.08,
      rotate: 1,
      boxShadow: "0 0 25px rgba(251, 191, 36, 0.6)",
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
    className="
      px-8 py-4 
      bg-gradient-to-r from-amber-400 to-orange-500 
      text-black font-semibold rounded-full text-lg
      relative overflow-hidden
    "
  >
    <span className="relative z-10">Solicitar Orçamento</span>
    {/* Efeito de brilho que passa */}
    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent 
      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
  </motion.a>

  <a
    href="#gallery"
    className="px-8 py-4 border-2 border-amber-400 text-amber-400 font-semibold rounded-full text-lg hover:bg-amber-400 hover:text-black transition-all duration-300"
  >
    Ver Portfólio
  </a>
</div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-amber-400/20"
            >
              <stat.icon className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-1">{stat.number}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center">
          <p className="text-amber-400 mb-2 text-xs uppercase tracking-wider">Role para descobrir mais</p>
          <div className="p-2 border border-amber-400/50 rounded-full">
            <ChevronDown className="w-6 h-6 text-amber-400" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero