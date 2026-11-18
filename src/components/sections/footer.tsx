import React from "react";
import { Phone, Mail, MapPin, ChevronUp } from "lucide-react";
import { BRAND } from "@/mocks/brand";

const footerHref = (label: string) => {
  if (label === "WhatsApp" || label === "Orçamento") return BRAND.whatsapp;
  if (label === "Email") return "mailto:" + BRAND.email;
  if (label === "Localização") return "#contact";
  if (label === "Galeria") return "#gallery";
  if (["Nossa História", "Experiência", "Mixologia"].includes(label))
    return "#about";
  return "#services";
};

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const footerLinks = [
    {
      title: "Serviços",
      links: [
        "Bar para eventos",
        "Coquetelaria artesanal",
        "Carta personalizada",
        "Degustação personalizada",
      ],
    },
    {
      title: "Sobre",
      links: ["Nossa História", "Experiência", "Mixologia", "Galeria"],
    },
    {
      title: "Contato",
      links: ["Orçamento", "WhatsApp", "Email", "Localização"],
    },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-footer bg-cover bg-center" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-brand-orange bg-clip-text text-transparent">
                  {BRAND.name}
                </span>
              </h2>

              <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                Bar de drinks para casamentos, aniversários, eventos
                corporativos e celebrações sociais. Coquetelaria artesanal em
                Piracicaba e região desde novembro de 2023.
              </p>

              <p className="mb-4 text-sm text-gray-400">
                Responsável: {BRAND.legalName}
              </p>
              <div className="space-y-3 text-sm">
                <a
                  href={BRAND.phone_link}
                  className="flex items-center space-x-3 text-gray-400 hover:text-primary transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{BRAND.phone_display}</span>
                </a>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center space-x-3 text-gray-400 hover:text-primary transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="min-w-0 break-all">{BRAND.email}</span>
                </a>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{BRAND.address}</span>
                </div>
              </div>
            </div>

            {footerLinks.map((section) => (
              <div key={section.title}>
                <h2 className="text-white font-semibold text-lg mb-6">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={footerHref(link)}
                        className="text-gray-400 hover:text-primary transition-colors duration-200 text-sm inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>
                  © {year} {BRAND.name}.
                </span>
                <span>{BRAND.city}</span>
              </div>

              <a
                href="#home"
                className="bg-gradient-to-r from-primary to-brand-orange p-3 rounded-lg text-black hover:scale-110 shadow-md transition-all duration-300 hover:shadow-primary/30"
                aria-label="Voltar ao topo"
              >
                <ChevronUp className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
