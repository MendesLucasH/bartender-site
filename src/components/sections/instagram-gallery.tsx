"use client";

import { Instagram, ExternalLink } from "lucide-react";
import { BRAND } from "@/mocks/brand";
import { instagramTiles } from "@/mocks/instagram";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export function InstagramGallery() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative bg-brand-plum py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-brand-plum to-brand-plum opacity-50" />
      
      <div className="site-container relative z-10 px-0 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16 text-center px-4">
            <p className="section-kicker mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-primary/50" />
              Nosso Instagram
              <span className="h-px w-8 bg-primary/50" />
            </p>
            <h2 id="gallery-title" className="editorial-title text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Acompanhe nossa <br />
              <span className="font-editorial italic text-primary font-light">
                arte em cada drink.
              </span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base text-gray-400 sm:text-lg font-light">
              Mixologia, eventos exclusivos e os bastidores da alta coquetelaria em Piracicaba.
            </p>
          </div>
        </ScrollReveal>

        <div className="w-full">
          <Swiper
            modules={[Autoplay, Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            loop={true}
            speed={1000}
            autoplay={{
              delay: 4500,
              pauseOnMouseEnter: false,
              disableOnInteraction: false,
            }}
            navigation={true}
            className="pb-12"
          >
            {[...instagramTiles, ...instagramTiles].map((tile, index) => {
              // Remove query params para o embed funcionar
              const url = new URL(tile.href);
              url.search = "";
              const baseUrl = url.href.endsWith("/") ? url.href : `${url.href}/`;
              const embedSrc = `${baseUrl}embed/`;

              return (
                <SwiperSlide key={`${tile.id}-${index}`}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-2xl h-[680px]">
                    <iframe
                      src={embedSrc}
                      className="w-full h-full border-0"
                      allow="encrypted-media"
                      loading="lazy"
                      title={`Instagram post ${tile.title}`}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <ScrollReveal>
          <div className="mt-4 md:mt-8 text-center">
             <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border-b border-primary/40 pb-2 text-sm font-medium text-primary hover:text-white hover:border-white transition-colors uppercase tracking-widest"
            >
              <Instagram size={18} />
              Acessar Perfil Completo
              <ExternalLink size={16} />
            </a>
          </div>
        </ScrollReveal>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .swiper-button-next,
        .swiper-button-prev {
          color: #D4AF37 !important;
          background-color: rgba(20, 15, 25, 0.95);
          width: 48px !important;
          height: 48px !important;
          border-radius: 50%;
          border: 1px solid rgba(212, 175, 55, 0.4);
          box-shadow: 0 4px 15px rgba(0,0,0,0.5);
          transition: all 0.3s ease;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: bold;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background-color: #D4AF37;
          color: #000 !important;
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
        }
      `}} />
    </section>
  );
}
