"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { BRAND } from "@/mocks/brand";
import type { SgcHero } from "@/@types/content";
import { safeLink } from "@/lib/safe-link";
import logo from "../../../public/images/logo/logopng.png";
import { HeroVideo } from "./heroVideo";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Hero({ hero }: { hero?: SgcHero }) {
  const stats = [
    { number: "2023", label: "Em operação desde novembro" },
    { number: "Eventos", label: "Sociais e corporativos" },
    { number: "Drinks", label: "Alta coquetelaria" },
  ];
  const background = safeLink(hero?.image_url, "");
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden pb-8 pt-20 md:pb-10 md:pt-24"
    >
      {background ? (
        <>
          <Image
            src={background}
            alt=""
            fill
            sizes="100vw"
            preload
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/85" />
        </>
      ) : (
        <HeroVideo />
      )}
      <div className="relative z-20 mx-auto max-w-5xl px-6 text-center">
        <ScrollReveal direction="up" delay={100}>
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <h1 id="hero-title">
              <span className="sr-only">
                {hero?.title || `PHP Bartenders — ${BRAND.headline}`}
              </span>
              <Image
                src={logo}
                alt=""
                preload
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, 220px"
                className="h-auto w-64 sm:w-72 md:w-80 lg:w-96 select-none object-contain drop-shadow-md"
              />
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl leading-snug text-gray-200 font-light">
              {hero?.description || BRAND.slogan}
            </p>
            <p className="max-w-2xl text-sm sm:text-base text-gray-300">
              Bar de drinks para casamentos, aniversários e eventos corporativos
              em Piracicaba e região. Carta personalizada, ingredientes frescos
              e uma equipe preparada para o seu evento.
            </p>
            <div className="mt-3 sm:mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href={safeLink(hero?.link, BRAND.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-brand-orange px-6 py-2.5 sm:px-7 sm:py-3 text-sm sm:text-base font-semibold text-black shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
              >
                {hero?.link_text || "Solicitar Orçamento"}
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-2.5 sm:px-7 sm:py-3 text-sm sm:text-base font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-black hover:scale-105"
              >
                Ver Portfólio
              </a>
            </div>
          </div>
        </ScrollReveal>

        <dl className="mx-auto mb-8 mt-10 grid max-w-3xl grid-cols-3 border-y border-white/20 py-5">
          {stats.map((stat, index) => (
            <ScrollReveal
              key={stat.label}
              direction="up"
              delay={200 + index * 100}
            >
              <div className="flex h-full flex-col px-3 sm:px-6">
                <dt className="order-2 text-xs sm:text-sm text-gray-400 font-medium">
                  {stat.label}
                </dt>
                <dd className="mb-0.5 text-xl sm:text-2xl font-medium text-primary">
                  {stat.number}
                </dd>
              </div>
            </ScrollReveal>
          ))}
        </dl>

        <ScrollReveal direction="up" delay={400}>
          <a
            href="#about"
            className="inline-flex flex-col items-center text-primary transition-transform duration-300 hover:translate-y-1"
          >
            <span className="mb-1.5 text-xs sm:text-xs uppercase tracking-widest text-primary/90 font-medium">
              Role para descobrir mais
            </span>
            <span className="rounded-full border border-primary/50 p-1.5">
              <ChevronDown size={18} />
            </span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
