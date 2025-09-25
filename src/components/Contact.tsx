import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Instagram, Facebook, Linkedin } from 'lucide-react'
import { BRAND } from '../config'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    guests: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 2500)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Cards de contato separados por coluna
  const leftColumn = [
    { icon: Phone, title: 'Telefone',    info: BRAND.phone_display, subInfo: 'WhatsApp disponível', href: BRAND.phone_link },
    { icon: Mail,  title: 'Email',       info: BRAND.email,         subInfo: 'Resposta em até 2h',  href: `mailto:${BRAND.email}` }
  ]
  const rightColumn = [
    { icon: MapPin, title: 'Localização', info: BRAND.city,       subInfo: 'Atendemos toda a região' },
    { icon: Clock,  title: 'Horário',     info: 'Seg - Dom: 24h', subInfo: 'Sempre disponível' }
  ]

  const socials = [
    { icon: Instagram, href: BRAND.instagram, color: 'hover:text-pink-400', label: 'Instagram' },
    { icon: Facebook,  href: BRAND.facebook,  color: 'hover:text-blue-400',  label: 'Facebook'  },
    { icon: Linkedin,  href: BRAND.linkedin,  color: 'hover:text-blue-600',  label: 'LinkedIn'  }
  ]

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-white">Entre em</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Contato
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Pronto para criar uma experiência inesquecível? Fale com a {BRAND.name} e vamos planejar seu evento perfeito.
          </motion.p>
        </motion.div>

        {/* === GRID PRINCIPAL SEM MAPA === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* ESQUERDA: Telefone + Email */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {leftColumn.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <a href={(item as any).href || undefined} className="block">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-3 rounded-lg">
                      <item.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                      <p className="text-amber-400 font-medium">{item.info}</p>
                      <p className="text-gray-400 text-sm">{item.subInfo}</p>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* DIREITA: Localização + Horário + Redes */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {rightColumn.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-3 rounded-lg">
                    <item.icon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                    <p className="text-amber-400 font-medium">{item.info}</p>
                    <p className="text-gray-400 text-sm">{item.subInfo}</p>
                  </div>
                </div>
              </motion.div>
            ))}

        
          </motion.div>
        </div>

        {/* ============================== */}
        {/* BLOCO ANTERIOR (MAPA/FORM)     */}
        {/* Mantido comentado para reuso    */}
        {/*
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          <div>... mapa ou formulário aqui ...</div>
          <div>... cards de contato ...</div>
        </div>
        */}
      </div>
    </section>
  )
}

export default Contact
