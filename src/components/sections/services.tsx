"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { ServiceCard } from "@/@types/content";
import { services as serviceContent } from "@/mocks/content";
import { whatsappLink } from "@/mocks/brand";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function Services({ items }: { items?: ServiceCard[] }) {
  const services = items?.length ? items : serviceContent;
  const [active, setActive] = useState(0);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const articles = Array.from(
      list.current?.querySelectorAll<HTMLElement>("[data-service]") || [],
    );
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.isIntersecting
            ? visible.add(entry.target)
            : visible.delete(entry.target),
        );
        const nearest = [...visible].sort(
          (a, b) =>
            Math.abs(a.getBoundingClientRect().top - window.innerHeight * 0.3) -
            Math.abs(b.getBoundingClientRect().top - window.innerHeight * 0.3),
        )[0];
        if (nearest) setActive(articles.indexOf(nearest as HTMLElement));
      },
      { rootMargin: "-20% 0px -25% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    articles.forEach((article) => observer.observe(article));
    return () => observer.disconnect();
  }, [services]);

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative bg-brand-ink py-20 md:py-28"
    >
      <div className="site-container">
        <ScrollReveal>
          <div className="mb-14 grid gap-6 border-b border-white/15 pb-10 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="section-kicker">02 / O bar do seu evento</p>
              <h2 id="services-title" className="editorial-title">
                Da primeira taça
                <br />
                <span className="font-editorial italic text-primary">
                  ao último brinde.
                </span>
              </h2>
            </div>
            <div className="max-w-md lg:justify-self-end">
              <p className="leading-relaxed text-stone-300">
                Uma carta com a sua personalidade. Um bar que conversa com a
                festa. Conheça os serviços que compõem a experiência PHP
                Bartenders.
              </p>
              <p className="mt-6 flex items-center gap-3 text-xs uppercase tracking-widest text-primary">
                <ArrowDown size={16} /> Explore nossos serviços
              </p>
            </div>
          </div>
        </ScrollReveal>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="hidden self-start lg:sticky lg:top-28 lg:col-span-5 lg:block">
            <div className="relative aspect-service max-h-128 overflow-hidden bg-brand-plum">
              {services.map((service, index) => (
                <Image
                  key={`${service.title}-${index}`}
                  src={service.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className={`object-cover transition-opacity duration-700 ${index === active ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <span className="font-editorial text-5xl text-primary">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-xl text-white">
                  {services[active]?.title}
                </p>
              </div>
              <span className="absolute left-5 top-5 border border-white/40 bg-black/30 px-3 py-2 text-xs uppercase tracking-widest text-white">
                PHP / Serviços
              </span>
            </div>
            <nav
              aria-label="Escolher serviço"
              className="mt-5 flex flex-wrap gap-1"
            >
              {services.map((service, index) => (
                <a
                  key={service.title}
                  href={`#service-${index + 1}`}
                  aria-label={service.title}
                  aria-current={active === index ? "step" : undefined}
                  className={`flex size-10 items-center justify-center border-b text-xs transition-colors ${active === index ? "border-primary text-primary" : "border-white/15 text-stone-400 hover:border-primary hover:text-white"}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </a>
              ))}
            </nav>
            <p className="mt-5 text-xs text-stone-500">
              Piracicaba e região · Eventos sociais e corporativos
            </p>
          </div>
          <div ref={list} className="lg:col-span-7">
            {services.map((service, index) => (
              <article
                data-service
                key={`${service.title}-${index}`}
                id={`service-${index + 1}`}
                className="service-chapter scroll-mt-28 border-b border-white/15 py-10 first:pt-0 lg:py-14"
              >
                <ScrollReveal>
                  <div className="mb-5 flex items-center gap-4">
                    <span className="font-mono text-sm text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-12 bg-primary/40" />
                  </div>
                  <div className="relative mb-6 aspect-video overflow-hidden lg:hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                  <h3
                    className={`max-w-xl text-3xl font-medium tracking-tight transition-colors duration-500 md:text-4xl ${active === index ? "text-primary" : "text-stone-100"}`}
                  >
                    {service.title}
                  </h3>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-stone-400 md:text-lg">
                    {service.description}
                  </p>
                  {service.features.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-wider text-stone-300">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <span className="size-1 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  <a
                    href={whatsappLink(service.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex items-center gap-6 border-b border-primary/50 pb-2 text-sm font-medium text-white transition-colors hover:text-primary"
                  >
                    Conversar sobre este serviço
                    <ArrowUpRight
                      size={18}
                      className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </a>
                </ScrollReveal>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-6 border-y border-primary/25 py-8 md:flex-row md:items-center">
          <p className="font-editorial text-3xl text-stone-200">
            Qual é o próximo motivo para brindar?
          </p>
          <a
            href={whatsappLink(
              "Olá! Quero planejar o bar do meu evento com a PHP Bartenders.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-5 text-sm font-semibold text-primary"
          >
            Planejar meu evento
            <ArrowUpRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
