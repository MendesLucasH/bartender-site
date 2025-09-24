import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Instagram, Facebook } from 'lucide-react'
import { BRAND } from '../config'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Serviços', href: '#services' },
    { name: 'Galeria', href: '#gallery' },
    { name: 'Contato', href: '#contact' }
  ]

  // Caminho público do Vite: tudo que está em /Public é servido na raiz.
  const LOGO_SRC = 'Public/images/logo/logopng.png' // troque para '/images/logo/logo.svg' se usar SVG

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-amber-500/20' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Marca */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.03 }}
            className="flex items-center space-x-3"
            aria-label={BRAND.name}
          >
            {/* Logo em tamanho considerável, encolhe levemente ao rolar */}
            <img
              src={LOGO_SRC}
              alt={BRAND.name}
              className={`w-auto transition-all duration-300 ${
                scrolled ? 'h-10' : 'h-14'
              }`}
            />

            {/* Slogan abaixo/ao lado da logo em telas médias para cima */}
            <div className="hidden md:flex flex-col leading-tight">
              <span className="sr-only">{BRAND.name}</span>
              <span className="text-xs text-gray-300">{BRAND.slogan}</span>
            </div>
          </motion.a>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="relative text-white hover:text-amber-400 transition-colors duration-300 group"
              >
                {item.name}
                <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          {/* Contatos / Sociais Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              href={BRAND.phone_link}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-black hover:shadow-lg hover:shadow-amber-400/50 transition-all duration-300"
              aria-label={`Ligar para ${BRAND.phone_display}`}
            >
              <Phone className="w-4 h-4" />
            </motion.a>
            <motion.a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="p-2 border border-amber-400/30 rounded-full text-amber-400 hover:bg-amber-400 hover:text-black transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </motion.a>
            <motion.a
              href={BRAND.facebook}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-2 border border-amber-400/30 rounded-full text-amber-400 hover:bg-amber-400 hover:text-black transition-all duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Botão Menu Mobile */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:text-amber-400 transition-colors"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 py-4 border-t border-amber-500/20"
            >
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-amber-400 transition-colors duration-300 py-2"
                  >
                    {item.name}
                  </motion.a>
                ))}

                <div className="flex items-center space-x-4 pt-4">
                  <motion.a
                    href={BRAND.phone_link}
                    whileHover={{ scale: 1.05 }}
                    className="p-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-black"
                    aria-label={`Ligar para ${BRAND.phone_display}`}
                  >
                    <Phone className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href={BRAND.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="p-2 border border-amber-400/30 rounded-full text-amber-400"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href={BRAND.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="p-2 border border-amber-400/30 rounded-full text-amber-400"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </motion.a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header
