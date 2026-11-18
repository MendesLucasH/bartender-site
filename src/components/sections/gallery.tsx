"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, X, ZoomIn } from "lucide-react";
import type { GalleryItem } from "@/@types/content";
import { BRAND } from "@/mocks/brand";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState("Todos");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const categories = [
    "Todos",
    ...new Set(
      items.map((item) => item.category).filter((value) => value !== "Todos"),
    ),
  ];
  const filtered =
    category === "Todos"
      ? items
      : items.filter((item) => item.category === category);
  useEffect(() => {
    if (!selected) return;
    const element = dialog.current;
    element?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previous;
      opener.current?.focus();
    };
  }, [selected]);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative overflow-hidden bg-brand-plum py-20 md:py-28"
    >
      <div className="site-container relative z-10">
        <div className="mb-10 md:mb-12 text-left">
          <ScrollReveal direction="up" delay={100}>
            <p className="section-kicker">
              03 / Galeria — por trás de cada brinde
            </p>
            <h2 id="gallery-title" className="editorial-title">
              É sobre o que{" "}
              <span className="font-editorial italic text-primary">fica.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="mt-6 mb-6 md:mb-8 max-w-2xl text-base sm:text-lg leading-relaxed text-gray-300">
              Conheça a coquetelaria e os eventos da PHP Bartenders. Drinks e
              apresentações que fazem parte da nossa história em Piracicaba e
              região.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div
              role="group"
              aria-label="Filtrar galeria"
              className="flex flex-wrap gap-x-6 gap-y-2 border-b border-white/20"
            >
              {categories.map((value) => (
                <button
                  type="button"
                  key={value}
                  aria-pressed={category === value}
                  onClick={() => setCategory(value)}
                  className={`border-b-2 px-1 py-4 text-sm transition-colors duration-300 ${
                    category === value
                      ? "border-primary text-primary"
                      : "border-transparent text-stone-400 hover:text-white"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <p className="sr-only" role="status">
            {filtered.length} fotos exibidas
          </p>
        </div>

        <div className="gallery-grid">
          {filtered.map((item, index) => (
            <ScrollReveal
              key={item.id}
              className={
                index === 0
                  ? "gallery-feature"
                  : index === 3
                    ? "gallery-wide"
                    : ""
              }
              direction="up"
              delay={100 + (index % 4) * 80}
            >
              <figure className="group relative h-full overflow-hidden bg-brand-ink">
                <button
                  type="button"
                  aria-label={`Ampliar foto: ${item.title}`}
                  onClick={(event) => {
                    opener.current = event.currentTarget;
                    setSelected(item);
                  }}
                  className="relative block h-full w-full text-left"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100" />
                  <span className="absolute inset-x-0 bottom-0 p-6 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                    <span className="mb-2 inline-block text-xs uppercase tracking-widest text-primary">
                      {item.category}
                    </span>
                    <span className="block text-lg font-bold text-white">
                      {item.title}
                    </span>
                    <span className="mt-2 block text-sm text-gray-300">
                      {item.description}
                    </span>
                  </span>
                  <ZoomIn
                    aria-hidden="true"
                    className="absolute right-4 top-4 h-8 w-8 rounded-full bg-black/50 p-1.5 text-white transition-transform duration-300 group-hover:scale-110"
                  />
                </button>
                <figcaption className="sr-only">
                  {item.title} — {item.category}
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={300}>
          <div className="mt-10 md:mt-12 text-center">
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-5 border-b border-primary/50 pb-3 text-sm font-medium text-primary"
            >
              <span>Ver Mais Trabalhos</span>
              <ExternalLink size={20} />
            </a>
          </div>
        </ScrollReveal>
      </div>

      {selected && (
        <dialog
          ref={dialog}
          aria-labelledby="photo-title"
          className="gallery-dialog"
          onCancel={() => setSelected(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <div className="relative">
            <button
              type="button"
              autoFocus
              onClick={() => setSelected(null)}
              aria-label="Fechar foto"
              className="absolute right-0 top-0 z-10 rounded-full bg-black/80 p-3 hover:bg-primary hover:text-black transition-colors"
            >
              <X />
            </button>
            <div className="relative aspect-gallery w-full overflow-hidden rounded-xl">
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-contain"
              />
            </div>
            <div className="mt-4">
              <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-sm font-semibold text-black">
                {selected.category}
              </span>
              <h3
                id="photo-title"
                className="mb-1 text-2xl font-bold text-white"
              >
                {selected.title}
              </h3>
              <p className="text-gray-300">{selected.description}</p>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
}
