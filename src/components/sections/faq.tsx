import { faq } from "@/mocks/content";
import { BRAND } from "@/mocks/brand";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative bg-brand-ink py-20 md:py-28"
    >
      <div className="site-container">
        <h2 id="faq-title" className="editorial-title mb-6 text-center">
          Dúvidas sobre
          <br />
          <span className="font-editorial italic text-primary">
            o bar do seu evento
          </span>
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-gray-300">
          Da carta de drinks à estrutura, conheça os detalhes para começar a
          planejar sua experiência com a PHP Bartenders.
        </p>
        <div className="mx-auto max-w-3xl space-y-4">
          {faq.map((item) => (
            <details
              key={item.question}
              className="group border-b border-white/20 py-6 open:border-primary/50"
            >
              <summary className="cursor-pointer font-semibold text-white marker:text-primary">
                {item.question}
              </summary>
              <p className="mt-4 leading-relaxed text-gray-300">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary underline underline-offset-4"
          >
            Tire outras dúvidas pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
