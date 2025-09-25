import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Heart, ChevronUp } from 'lucide-react'
import { BRAND } from '../config'

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const year = new Date().getFullYear()

  const footerLinks = [
    { title: 'Serviços', links: ['Casamentos', 'Eventos Corporativos', 'Festas Privadas', 'Bartender Domiciliar'] },
    { title: 'Sobre',    links: ['Nossa História', 'Experiência', 'Depoimentos', 'Galeria'] },
    { title: 'Contato',  links: ['Orçamento', 'WhatsApp', 'Email', 'Localização'] }
  ]

  const socialLinks = [
    { icon: Instagram, href: BRAND.instagram, label: 'Instagram' },
    { icon: Facebook,  href: BRAND.facebook,  label: 'Facebook'  },
    { icon: Linkedin,  href: BRAND.linkedin,  label: 'LinkedIn'  }
  ]

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1089932/pexels-photo-1089932.jpeg')] bg-cover bg-center" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <motion.h3 className="text-3xl font-bold mb-4" whileHover={{ scale: 1.05 }}>
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  {BRAND.name}
                </span>
              </motion.h3>

              <p className="text-gray-400 mb-6 leading-relaxed">
                Criando experiências únicas através da arte da mixologia. Cada drink é uma história, cada evento uma
                memória inesquecível.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a href={BRAND.phone_link} className="flex items-center space-x-3 text-gray-400 hover:text-amber-400 transition-colors">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>{BRAND.phone_display}</span>
                </a>
                <a href={`mailto:${BRAND.email}`} className="flex items-center space-x-3 text-gray-400 hover:text-amber-400 transition-colors">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>{BRAND.email}</span>
                </a>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{BRAND.city}</span>
                </div>
              </div>
            </motion.div>

            {/* Links Sections */}
            {footerLinks.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-white font-semibold text-lg mb-6">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <motion.a
                        href="#"
                        className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center space-x-2 text-gray-400"
              >
                <span>© {year} {BRAND.name}. Feito em</span>      
                <span>{BRAND.city}</span>
              </motion.div>
              {/* Social Links */}
{/*
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    viewport={{ once: true }}
    className="flex items-center space-x-4"
  >
    {socialLinks.map((social) => (
      <motion.a
        key={social.label}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.label}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="bg-white/5 p-3 rounded-lg text-gray-400 hover:text-amber-400 hover:bg-white/10 transition-all duration-300"
      >
        <social.icon className="w-5 h-5" />
      </motion.a>
    ))}
  </motion.div>
*/}


              {/* Back to Top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gradient-to-r from-amber-400 to-orange-500 p-3 rounded-lg text-black hover:from-amber-500 hover:to-orange-600 transition-all duration-300"
                aria-label="Voltar ao topo"
              >
                <ChevronUp className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
