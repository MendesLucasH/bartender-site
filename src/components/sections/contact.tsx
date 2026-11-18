"use client";

import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Wine,
  Instagram,
} from "lucide-react";
import { BRAND, whatsappLink } from "@/mocks/brand";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const contacts = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    info: BRAND.whatsapp_display,
    detail: "Converse com o comercial sobre o seu evento",
    href: BRAND.whatsapp,
  },
  {
    icon: Phone,
    title: "Telefone",
    info: BRAND.phone_display,
    detail: "Contato da PHP Bartenders",
    href: BRAND.phone_link,
  },
  {
    icon: Mail,
    title: "E-mail",
    info: BRAND.email,
    detail: "Envie os detalhes do evento para uma proposta",
    href: `mailto:${BRAND.email}`,
  },
  {
    icon: MapPin,
    title: "Nosso espaço",
    info: BRAND.address,
    detail: "Atendemos Piracicaba e região. Ver localização no Google.",
    href: BRAND.googleBusiness,
  },
  {
    icon: Wine,
    title: "Degustação personalizada",
    info: "Conheça e prove nossa coquetelaria",
    detail: "Entre em contato para combinar sua visita ao espaço da empresa",
    href: whatsappLink(
      "Olá! Gostaria de combinar uma degustação personalizada na PHP Bartenders.",
    ),
  },
  {
    icon: Instagram,
    title: "Instagram",
    info: "@phpbartenders",
    detail: "Acompanhe os drinks e os eventos da PHP Bartenders",
    href: BRAND.instagram,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-brand-plum py-20 md:py-28"
    >
      <div className="site-container relative z-10">
        <ScrollReveal direction="up" delay={100}>
          <div className="mb-12 text-left md:mb-16">
            <h2 id="contact-title" className="editorial-title">
              Vamos planejar
              <br />
              <span className="font-editorial italic text-primary">
                o seu evento?
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
              Fale com o comercial para solicitar um orçamento de open bar em
              Piracicaba e região. Conte sobre a sua celebração e vamos pensar
              juntos na carta de drinks, no bar e nos detalhes da experiência.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2">
          {contacts.map((item, index) => (
            <ScrollReveal
              key={item.title}
              direction="up"
              delay={100 + index * 60}
            >
              <a
                href={item.href}
                target={item.href.startsWith("https:") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("https:")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group flex h-full items-start gap-5 border-t border-white/20 py-7 transition-colors hover:border-primary"
              >
                <span className="shrink-0 pt-1 text-primary">
                  <item.icon aria-hidden="true" className="size-6" />
                </span>
                <div className="min-w-0">
                  <h3 className="mb-1 text-lg font-semibold text-white group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p
                    className={`font-medium text-primary ${item.title === "E-mail" ? "break-all" : "break-words"}`}
                  >
                    {item.info}
                  </p>
                  <p className="mt-2 text-sm text-gray-400">{item.detail}</p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
