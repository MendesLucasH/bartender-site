import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ExternalLink } from 'lucide-react'

type Item = {
  id: number
  image: string
  title: string
  category: string
  description: string
}

const GALLERY: Item[] = [
  { id: 1, image: '/galeria/foto1.png', title: 'Texto sobre a foto',  category: 'Drinks',        description: 'Texto Explicativo' },
  { id: 2, image: '/galeria/foto2.jpg', title: 'Mixologia Moderna', category: 'Drinks',     description: 'Drink autoral com técnicas moleculares' },
  { id: 3, image: '/galeria/foto3.jpg', title: 'Texto sobre a foto', category: 'Drinks',   description: 'Texto Explicativo' },
  { id: 4, image: '/galeria/foto4.jpg', title: 'Casamento dos Sonhos', category: 'Eventos',     description: 'Bar personalizado para casamento' },
  { id: 5, image: '/galeria/foto5.jpg', title: 'Evento Corporativo', category: 'Eventos',      description: 'Open bar para empresa' },
  { id: 6, image: '/galeria/foto8.jpg',  title: 'Ingredientes Premium', category: 'Ingredientes', description: 'Seleção de destilados especiais' },
  { id: 7, image: '/galeria/foto7.jpg', title: 'Processo de layout',     category: 'Processo',      description: 'Processo de criação' },
  { id: 8, image: '/galeria/foto6.jpg', title: 'Drinks Autorais',   category: 'Criações',     description: 'Criações exclusivas da casa' }
]

const CATEGORIES = ['Todos', 'Drinks', 'Criações', 'Eventos', 'Processo', 'Ingredientes'] as const

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('Todos')

  const items = useMemo(
    () => (activeCategory === 'Todos' ? GALLERY : GALLERY.filter(i => i.category === activeCategory)),
    [activeCategory]
  )

  return (
    <section id="gallery" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/10 to-black" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Nossa</span><br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Galeria</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Explore nosso portfólio de criações e eventos que marcaram história
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-amber-400/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid com TAMANHO FIXO (4:3) e otimizações de pintura */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer will-change-transform [content-visibility:auto] [contain-intrinsic-size:300px_225px]"
              onClick={() => setSelectedImage(item.id)}
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                  <span className="inline-block px-3 py-1 bg-amber-400 text-black text-xs font-semibold rounded-full mb-2 self-start">
                    {item.category}
                  </span>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
       <AnimatePresence>
  {selectedImage && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setSelectedImage(null)}
      role="dialog" aria-modal="true"
      onKeyDown={(e) => e.key === 'Escape' && setSelectedImage(null)}
      tabIndex={-1}
    >
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative max-w-[90vw] md:max-w-5xl max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {(() => {
          const item = GALLERY.find(g => g.id === selectedImage)
          return item ? (
            <>
              {/* botão fechar */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 md:top-2 md:right-2 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-6 h-6" />
              </button>

              {/* imagem SEM CROP */}
     <img
  src={item.image}
  alt={item.title}
  className="w-[85vw] max-w-4xl h-[70vh] object-cover rounded-xl"
  loading="eager"
  decoding="async"
/>


              {/* legenda fora da imagem (evita sobreposição) */}
              <div className="w-full mt-4 md:mt-3 px-1 text-left">
                <span className="inline-block px-3 py-1 bg-amber-400 text-black text-sm font-semibold rounded-full mb-2">
                  {item.category}
                </span>
                <h3 className="text-white font-bold text-2xl mb-1">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            </>
          ) : null
        })()}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


        {/* CTA */}
     <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.25, ease: 'easeOut' }}
  className="text-center mt-16"
>
<a
  href="https://www.instagram.com/phpbartenders/"
  target="_blank"
  rel="noopener noreferrer"
  className="px-12 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold rounded-full text-lg 
             inline-flex items-center gap-3
             transition-all duration-300 ease-out
             hover:scale-105 hover:shadow-[0_0_25px_rgba(251,191,36,0.7)]"
>
  Ver Mais Trabalhos
  <ExternalLink className="w-5 h-5" />
</a>



</motion.div>

      </div>
    </section>
  )
}

export default Gallery
