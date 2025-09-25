import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ExternalLink } from 'lucide-react'

type Item = {
  id: number
  image: string
  title: string
  category: string
  description: string
  w?: number
  h?: number
}

// ===== Helper de imagem (Netlify quando disponível, caso contrário usa a original) =====
const USE_NETLIFY =
  typeof window !== 'undefined' &&
  (location.hostname.endsWith('netlify.app') || location.hostname.includes('netlify'))

const imgCDN = (url: string, w: number, fm = 'webp', q = 72) => {
  if (!USE_NETLIFY) return url // fora do Netlify, mantém o arquivo original
  return `/.netlify/images?url=${encodeURIComponent(url)}&w=${w}&q=${q}&fm=${fm}&fit=cover&auto=compress`
}

// Tamanhos de thumb (apenas usados no Netlify; fora dele, usa a própria imagem)
const THUMB_WIDTHS = [360, 540, 720, 960]
const SIZES_ATTR = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
// Largura alvo para a imagem do lightbox
const FULL_W = 1600

const GALLERY: Item[] = [
  { id: 1, image: '/galeria/foto1.png', title: 'Texto sobre a foto',  category: 'Drinks',        description: 'Texto Explicativo', w: 1600, h: 1200 },
  { id: 2, image: '/galeria/foto2.jpg', title: 'Mixologia Moderna', category: 'Drinks',     description: 'Drink autoral com técnicas moleculares', w: 1600, h: 1200 },
  { id: 3, image: '/galeria/foto3.jpg', title: 'Texto sobre a foto', category: 'Drinks',   description: 'Texto Explicativo', w: 1600, h: 1200 },
  { id: 4, image: '/galeria/foto4.jpg', title: 'Casamento dos Sonhos', category: 'Eventos',     description: 'Bar personalizado para casamento', w: 1600, h: 1200 },
  { id: 5, image: '/galeria/foto5.jpg', title: 'Evento Corporativo', category: 'Eventos',      description: 'Open bar para empresa', w: 1600, h: 1200 },
  { id: 6, image: '/galeria/foto8.jpg',  title: 'Ingredientes Premium', category: 'Ingredientes', description: 'Seleção de destilados especiais', w: 1600, h: 1200 },
  { id: 7, image: '/galeria/foto7.jpg', title: 'Processo de layout',     category: 'Processo',      description: 'Processo de criação', w: 1600, h: 1200 },
  { id: 8, image: '/galeria/foto6.jpg', title: 'Drinks Autorais',   category: 'Criações',     description: 'Criações exclusivas da casa', w: 1600, h: 1200 }
]

const CATEGORIES = ['Todos', 'Drinks', 'Criações', 'Eventos', 'Processo', 'Ingredientes'] as const

// ======= Thumb com lazy + prefetch antes de entrar na tela (mantém o mesmo visual) =======
const Thumb: React.FC<{
  item: Item
  index: number
  onClick: () => void
  onHoverPrefetch?: (src: string) => void
}> = ({ item, index, onClick, onHoverPrefetch }) => {
  const ref = useRef<HTMLImageElement | null>(null)
  const [inView, setInView] = useState(false)

  // ativa o carregamento ~300px antes de aparecer
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
            io.disconnect()
          }
        })
      },
      { rootMargin: '300px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Construção de src/srcset quando no Netlify
  const webpSrcSet = USE_NETLIFY
    ? THUMB_WIDTHS.map(w => `${imgCDN(item.image, w, 'webp', 72)} ${w}w`).join(', ')
    : undefined
  const jpgSrcSet = USE_NETLIFY
    ? THUMB_WIDTHS.map(w => `${imgCDN(item.image, w, 'jpg', 72)} ${w}w`).join(', ')
    : undefined

  // src base: no Netlify mandamos 720px; fora, usamos o arquivo original
  const baseSrc = USE_NETLIFY ? imgCDN(item.image, 720, 'jpg', 72) : item.image

  return (
    <div
      className="group relative overflow-hidden rounded-2xl cursor-pointer will-change-transform [content-visibility:auto] [contain-intrinsic-size:300px_225px]"
      onClick={onClick}
      onMouseEnter={() => onHoverPrefetch?.(item.image)}
    >
      <div className="relative aspect-[4/3]">
        {USE_NETLIFY ? (
          <picture>
            {inView && <source type="image/webp" srcSet={webpSrcSet} sizes={SIZES_ATTR} />}
            <img
              ref={ref}
              src={inView ? baseSrc : item.image}
              srcSet={inView ? jpgSrcSet : undefined}
              sizes={inView ? SIZES_ATTR : undefined}
              alt={item.title}
              width={item.w ?? 1600}
              height={item.h ?? 1200}
              loading={index < 2 ? 'eager' : 'lazy'}
              fetchPriority={index < 2 ? ('high' as any) : ('auto' as any)}
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </picture>
        ) : (
          <img
            ref={ref}
            src={item.image}
            alt={item.title}
            width={item.w ?? 1600}
            height={item.h ?? 1200}
            loading={index < 2 ? 'eager' : 'lazy'}
            fetchPriority={index < 2 ? ('high' as any) : ('auto' as any)}
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}

        {/* Overlay (igual ao seu) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        {/* Conteúdo (igual ao seu) */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
          <span className="inline-block px-3 py-1 bg-amber-400 text-black text-xs font-semibold rounded-full mb-2 self-start">
            {item.category}
          </span>
          <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
          <p className="text-gray-300 text-sm">{item.description}</p>
        </div>

        {/* Ícone (igual) */}
        <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ZoomIn className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  )
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('Todos')

  const items = useMemo(
    () => (activeCategory === 'Todos' ? GALLERY : GALLERY.filter(i => i.category === activeCategory)),
    [activeCategory]
  )

  // Prefetch da imagem "grande" só quando o usuário passa o mouse/abre
  const prefetchMap = useRef<Record<string, boolean>>({})
  const prefetchFull = useCallback((src: string) => {
    if (prefetchMap.current[src]) return
    const img = new Image()
    img.decoding = 'async'
    img.src = USE_NETLIFY ? imgCDN(src, FULL_W, 'webp', 78) : src
    prefetchMap.current[src] = true
  }, [])

  return (
    <section id="gallery" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/10 to-black" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header (igual) */}
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

          {/* Filtros (igual) */}
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

        {/* Grid (mesmo layout 4:3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group"
            >
              <Thumb
                item={item}
                index={idx}
                onClick={() => setSelectedImage(item.id)}
                onHoverPrefetch={prefetchFull}
              />
            </motion.div>
          ))}
        </div>

        {/* Lightbox (igual visual) */}
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
                  if (!item) return null
                  const fullWebp = imgCDN(item.image, FULL_W, 'webp', 78)
                  const fullJpg  = imgCDN(item.image, FULL_W, 'jpg', 78)

                  return (
                    <>
                      {/* fechar */}
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute -top-2 -right-2 md:top-2 md:right-2 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                        aria-label="Fechar"
                      >
                        <X className="w-6 h-6" />
                      </button>

                      {/* imagem (mantém object-cover como seu original) */}
                      {USE_NETLIFY ? (
                        <picture>
                          <source type="image/webp" srcSet={fullWebp} />
                          <img
                            src={fullJpg}
                            alt={item.title}
                            className="w-[85vw] max-w-4xl h-[70vh] object-cover rounded-xl"
                            width={item.w ?? 1600}
                            height={item.h ?? 1200}
                            loading="eager"
                            decoding="async"
                            fetchPriority="high"
                          />
                        </picture>
                      ) : (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-[85vw] max-w-4xl h-[70vh] object-cover rounded-xl"
                          width={item.w ?? 1600}
                          height={item.h ?? 1200}
                          loading="eager"
                          decoding="async"
                          fetchPriority="high"
                        />
                      )}

                      {/* legenda (igual) */}
                      <div className="w-full mt-4 md:mt-3 px-1 text-left">
                        <span className="inline-block px-3 py-1 bg-amber-400 text-black text-sm font-semibold rounded-full mb-2">
                          {item.category}
                        </span>
                        <h3 className="text-white font-bold text-2xl mb-1">{item.title}</h3>
                        <p className="text-gray-300">{item.description}</p>
                      </div>
                    </>
                  )
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA (igual) */}
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
