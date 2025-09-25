
import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Award, BookOpen, Heart, Star } from 'lucide-react'

const About = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -100])
  const rotate = useTransform(scrollY, [0, 1000], [0, 360])

  const achievements = [
    {
      icon: Award,
      title: 'Certificação',
      description: 'Cada drink é estudado e pensado'
    },
    {
      icon: BookOpen,
      title: 'Mixologia Avançada',
      description: 'Especialista em técnicas clássicas e modernas'
    },
    {
      icon: Heart,
      title: 'Paixão pela Arte',
      description: 'Cada drink é uma obra de arte única'
    },
    {
      icon: Star,
      title: 'Reconhecimento',
      description: 'Reconhecido e bem avaliado pelos nossos clientes'
    }
  ]

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('/images/backgroundsobre.jpg')" 
          }}
        />
      </motion.div>

      {/* Floating elements */}
      <motion.div
        style={{ rotate }}
        className="absolute top-20 right-20 w-32 h-32 border border-amber-400/20 rounded-full opacity-30"
      />
      <motion.div
        style={{ rotate: useTransform(scrollY, [0, 1000], [0, -180]) }}
        className="absolute bottom-20 left-20 w-24 h-24 border border-orange-500/20 rounded-full opacity-30"
      />

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
            >
              <span className="text-white">A Arte da</span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Mixologia
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-gray-300 mb-8 leading-relaxed"
            >
              Com mais de 15 anos de experiência, transformo ingredientes simples em experiências
              extraordinárias. Cada drink conta uma história, cada sabor desperta uma emoção.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-lg text-gray-300 mb-12 leading-relaxed"
            >
              Minha paixão é criar momentos únicos através da combinação perfeita de técnica,
              criatividade e ingredientes premium. Do clássico ao inovador, cada criação é
              pensada para surpreender e encantar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-amber-400/20 hover:border-amber-400/40 transition-all duration-300"
                >
                  <achievement.icon className="w-8 h-8 text-amber-400 mb-4" />
                  <h3 className="text-white font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src="/images/fotosobre.jpg"   // <- usa o caminho dentro de /public
                alt="Bartender profissional"
                className="w-full h-[600px] object-cover"
              />


              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Floating quote */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                viewport={{ once: true }}
                className="absolute bottom-8 left-8 right-8 p-6 bg-black/70 backdrop-blur-sm rounded-xl border border-amber-400/30"
              >
                <p className="text-amber-400 font-semibold text-lg italic mb-2">
                  "A mixologia é poesia líquida"
                </p>
                <p className="text-gray-300 text-sm">
                  — Filosofia que guia cada criação
                </p>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-70"
            />

            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
