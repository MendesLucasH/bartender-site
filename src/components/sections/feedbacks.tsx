import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { BRAND } from "@/mocks/brand";

const reviews = [
  {
    name: "Alexia Cruz",
    image: null,
    text: "Pedro e sua equipe são excelentes, atenderam nosso casamento com maestria. Qualidade do início ao fim, muito cuidado e atenção ao nosso gosto desde a degustação até o evento, só temos a agradecer a empresa por fazer parte do nosso sonho e entregar tudo perfeito. Indicamos de olhos fechados, com certeza contrataremos os serviços novamente.",
  },
  {
    name: "Denis Righi",
    image: "/images/reviews/denis-righi.png",
    text: "Pessoal fez um evento agora dia 08/05. Foi muito bom, eles tem uma padronização incrível dos drinks, além de serem sensacionais. Todos gostaram e elogiaram. Pedro e Camila são muito atenciosos e gente boa. Recomendo muito.",
  },
  {
    name: "Camila Bezerra",
    image: "/images/reviews/camila-bezerra.png",
    text: "Empresa com qualidade impecável e um atendimento incrível. Drinks deliciosos, preparados com muito capricho, e uma equipe extremamente atenciosa!",
  },
] as const;

export function Feedbacks() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="bg-brand-ink py-20 md:py-28"
    >
      <div className="site-container">
        <ScrollReveal>
          <div className="mb-12 flex flex-col gap-8 border-b border-white/15 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-kicker">04 / Avaliações no Google</p>
              <h2 id="reviews-title" className="editorial-title max-w-3xl">
                A experiência continua
                <br />
                <span className="font-editorial italic text-primary">
                  depois do último brinde.
                </span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
                Quem viveu o momento conta melhor. Confira o que nossos clientes
                compartilharam sobre a PHP Bartenders.
              </p>
            </div>
            <a
              href={BRAND.googleBusiness}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-3 border-b border-primary pb-3 text-sm font-semibold text-primary transition-colors hover:text-white"
            >
              Ver no Google
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </ScrollReveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <ScrollReveal key={review.name} delay={index * 90}>
              <figure className="flex h-full flex-col border border-white/15 bg-brand-plum p-6 md:p-8">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {review.image ? (
                      <Image
                        src={review.image}
                        alt=""
                        width={48}
                        height={48}
                        className="size-12 rounded-full object-cover"
                      />
                    ) : (
                      <span
                        aria-label="Google"
                        className="grid size-12 place-items-center rounded-full bg-white text-2xl font-bold text-blue-600"
                      >
                        G
                      </span>
                    )}
                    <figcaption className="font-semibold text-white">
                      {review.name}
                    </figcaption>
                  </div>
                  <span className="text-xs font-medium uppercase tracking-widest text-stone-400">
                    Google
                  </span>
                </div>

                <div
                  className="mb-6 flex gap-1 text-primary"
                  aria-label="5 de 5 estrelas"
                >
                  {Array.from({ length: 5 }, (_, star) => (
                    <Star
                      key={star}
                      aria-hidden="true"
                      className="size-4 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="flex-1 text-base leading-relaxed text-stone-200">
                  <p>“{review.text}”</p>
                </blockquote>
                <p className="mt-8 border-t border-white/15 pt-5 text-xs uppercase tracking-widest text-stone-400">
                  Avaliação compartilhada no Google
                </p>
              </figure>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <div className="mt-12 flex flex-col items-center gap-5 text-center">
            <p className="text-base text-stone-300">
              Também viveu essa experiência? Conte para a gente como foi.
            </p>
            <a
              href={BRAND.googleReview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 font-semibold text-brand-ink transition-colors hover:bg-white"
            >
              <Star aria-hidden="true" className="size-5 fill-current" />
              Avaliar a PHP no Google
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
