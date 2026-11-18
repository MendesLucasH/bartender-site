"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Instagram } from "lucide-react";
import { BRAND } from "@/mocks/brand";
import logo from "../../../public/images/logo/logopng.png";

const links = [
  ["Início", "#home"],
  ["Sobre", "#about"],
  ["Serviços", "#services"],
  ["Galeria", "#gallery"],
  ["Contato", "#contact"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-primary/20 bg-slate-950/85 backdrop-blur-md shadow-lg shadow-purple-950/20 py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between gap-6">
          <a
            href="#home"
            className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
            aria-label="PHP Bartenders — início"
          >
            <Image
              src={logo}
              alt="PHP Bartenders"
              loading="eager"
              sizes="80px"
              className={`w-auto transition-all duration-300 ${scrolled ? "h-10" : "h-13 md:h-14"}`}
            />
            <span className="hidden text-xs text-gray-300 xl:block">
              {BRAND.slogan}
            </span>
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-8 md:flex"
          >
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="py-2 text-sm font-medium tracking-wide transition-colors duration-200 hover:text-primary"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Conversar no WhatsApp com a PHP Bartenders"
              className="rounded-full bg-gradient-to-r from-primary to-brand-orange p-3 text-black shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30"
            >
              <svg
                className="h-4 w-4 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da PHP Bartenders"
              className="rounded-full border border-primary/30 p-3 text-primary transition-all duration-300 hover:scale-110 hover:border-primary hover:bg-primary/10"
            >
              <Instagram size={16} />
            </a>
          </div>

          <button
            ref={toggle}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen(!open)}
            className="p-3 text-white transition-colors hover:text-primary md:hidden"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <nav
            id="mobile-menu"
            aria-label="Navegação móvel"
            className="mt-4 border-t border-primary/20 py-4 md:hidden flex flex-col space-y-2 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block py-2.5 px-3 rounded-lg text-base font-medium hover:bg-white/10 hover:text-primary transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10 px-3">
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-brand-orange px-5 py-2.5 text-sm font-semibold text-black shadow-md"
              >
                <svg
                  className="h-3.5 w-3.5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>WhatsApp</span>
              </a>
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-semibold text-primary"
              >
                <Instagram size={14} />
                <span>Instagram</span>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
