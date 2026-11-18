import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { whatsappLink } from "@/mocks/brand";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative overflow-hidden bg-brand-plum py-16 text-white md:py-20 lg:py-24"
    >
      <div className="site-container relative flex flex-col gap-12 lg:gap-16">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col gap-2 text-xs tracking-widest sm:flex-row sm:items-center sm:gap-6">
            <span className="font-bold uppercase text-primary">01 / SOBRE NÓS</span>
            <div className="hidden h-[1px] flex-1 bg-white/10 sm:block" />
            <span className="text-sm font-medium tracking-normal text-white/40">Mixologia & coquetelaria</span>
          </div>
        </ScrollReveal>

        {/* Main Content */}
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:grid-cols-[0.75fr_1.25fr] xl:gap-20">
          {/* Left Column - Image */}
          <ScrollReveal delay={80} className="flex flex-col gap-6">
            <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-brand-ink">
              <Image
                src="/images/Pedro e Lara 2.jpeg"
                alt="Lara e Pedro, à frente da PHP BAR"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
              
              {/* Badge 'Desde 2023' */}
              <div className="absolute left-4 top-4 z-10 flex flex-col items-center justify-center rounded-xl bg-primary px-3 py-2 text-brand-ink shadow-lg lg:left-6 lg:top-6 lg:px-4 lg:py-2.5">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-80 lg:text-[9px]">Desde</span>
                <span className="mt-0.5 font-editorial text-xl font-bold leading-none lg:text-2xl">2023</span>
              </div>
            </figure>
            <div className="flex items-center justify-between pb-2">
              <span className="font-editorial text-2xl font-medium text-white">Pedro & Lara</span>
              <span className="text-xs font-bold uppercase tracking-wider text-white/40">À FRENTE DA PHP BAR</span>
            </div>
          </ScrollReveal>

          {/* Right Column - Text */}
          <ScrollReveal delay={160} className="flex flex-col">
            <h2
              id="about-title"
              className="mb-8 text-3xl font-semibold leading-tight tracking-tight text-white lg:text-[2.5rem] lg:leading-[1.15]"
            >
              Elevando o nível do seu evento, com excelência e{" "}
              <span className="font-editorial text-primary italic font-medium">alta coquetelaria.</span>
            </h2>
            
            <div className="space-y-6 text-[15px] leading-relaxed text-stone-300">
              <p>
                A <strong className="font-medium text-white">PHP BAR</strong> nasceu para
                transformar o serviço de bar em uma verdadeira experiência.
                Atuamos em casamentos, eventos corporativos e celebrações,
                unindo presença, agilidade e excelência em cada detalhe.
              </p>
              <p>
                À frente da PHP estão <strong className="font-medium text-white">Pedro e Lara</strong>,
                com mais de 7 anos de experiência em mixologia e coquetelaria,
                trazendo conhecimento, criatividade e técnica para cada criação.
                Essa experiência se traduz em um serviço que vai muito além do
                preparo de bons drinks.
              </p>
              <p>
                Trabalhamos com insumos selecionados, preparos artesanais e uma
                coquetelaria que vai do clássico ao contemporâneo, criando menus
                personalizados de acordo com o perfil de cada evento.
              </p>
              <p>
                Nosso propósito é simples: cuidar de cada detalhe para que você
                aproveite seu momento enquanto cuidamos do bar.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Footer Area */}
        <ScrollReveal delay={240}>
          <div className="mt-4 flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-10 md:flex-row lg:mt-6">
            <p className="max-w-xl font-editorial text-2xl font-medium leading-relaxed text-white md:text-[1.75rem]">
              Mais do que servir drinks, criamos momentos para serem{" "}
              <span className="text-primary italic">vividos, compartilhados e lembrados.</span>
            </p>
            
            <a
              href={whatsappLink(
                "Olá! Gostaria de conversar sobre a experiência da PHP BAR para meu evento.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-6 text-right transition-all hover:opacity-80"
            >
              <span className="max-w-32 text-sm font-medium leading-snug text-white">
                Vamos conversar sobre seu evento?
              </span>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-primary group-hover:bg-primary">
                <ArrowUpRight size={20} className="text-white group-hover:text-brand-ink transition-colors" />
              </div>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
