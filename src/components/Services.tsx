import React from 'react'
import { motion } from 'framer-motion'
import { Users, Heart, Building, Sparkles, Clock, MapPin, CheckCircle, Star } from 'lucide-react'

const Services = () => {
  // número em formato internacional: 55 + DDD + número (sem +, (), -, espaço)
  const WHATSAPP = '5519997508975'

  const services = [
    {
      icon: Heart,
      title: 'Casamentos',
      description: 'Drinks especiais para o dia mais importante da sua vida',
      features: ['Bar personalizado', 'Drinks autorais', 'Decoração temática', 'Equipe completa'],
      image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg',
      gradient: 'from-pink-500 to-rose-500',
      message: 'Olá! Gostaria de um orçamento para um CASAMENTO.'
    },
    {
      icon: Building,
      title: 'Eventos Corporativos',
      description: 'Impressione seus clientes e colaboradores',
      features: ['Open bar premium', 'Networking drinks', 'Apresentação profissional', 'Logística completa'],
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
      gradient: 'from-blue-500 to-cyan-500',
      message: 'Olá! Gostaria de um orçamento para um EVENTO CORPORATIVO.'
    },
    {
      icon: Users,
      title: 'Festas Privadas',
      description: 'Celebre com estilo e sofisticação',
      features: ['Menu personalizado', 'Drinks exclusivos', 'Animação interativa', 'Setup completo'],
      image: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg',
      gradient: 'from-purple-500 to-indigo-500',
      message: 'Olá! Gostaria de contratar o bar para uma FESTA PRIVADA.'
    },
    {
      icon: Sparkles,
      title: 'Eventos Especiais',
      description: 'Aniversários, formaturas e comemorações',
      features: ['Tematização única', 'Show de drinks', 'Drinks instagramáveis', 'Experiência memorável'],
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg',
      gradient: 'from-amber-500 to-orange-500',
      message: 'Olá! Gostaria de um orçamento para um EVENTO ESPECIAL (aniversário, formatura etc.).'
    }
  ]

  const additionalServices = [
    { icon: Clock, title: 'Disponibilidade 24/7', description: 'Atendimento flexível para seus horários' },
    { icon: MapPin, title: 'Atendimento em Domicílio', description: 'Levamos a experiência até você' },
    { icon: CheckCircle, title: 'Ingredientes Premium', description: 'Apenas os melhores produtos' },
    { icon: Star, title: 'Satisfação Garantida', description: '100% de aprovação dos clientes' }
  ]

  const waLink = (text: string) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-white">Nossos</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Serviços
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Oferecemos experiências únicas em mixologia para todos os tipos de eventos,
            sempre com a excelência que você merece
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-400/50 transition-all duration-500"
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8">
                <div className="flex items-center mb-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`p-3 rounded-full bg-gradient-to-r ${service.gradient} mr-4`}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center text-gray-300"
                    >
                      <CheckCircle className="w-4 h-4 text-amber-400 mr-3 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-400">
                    {/* {service.price} */}
                  </span>

                  {/* Link do WhatsApp */}
                  <motion.a
                    href={waLink(service.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-amber-400/30 transition-all duration-300"
                  >
                    Solicitar
                  </motion.a>
                </div>
              </div>

              {/* Hover effect */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                className="absolute top-4 right-4 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center"
              >
                <Star className="w-4 h-4 text-black" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {additionalServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-amber-400/30 transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-flex p-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-4"
              >
                <service.icon className="w-6 h-6 text-black" />
              </motion.div>

              <h3 className="text-white font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href={waLink('Olá! Gostaria de um orçamento PERSONALIZADO.')}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(245, 158, 11, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold rounded-full text-lg hover:shadow-2xl transition-all duration-300"
          >
            Solicitar Orçamento Personalizado
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
