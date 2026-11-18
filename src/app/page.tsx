import type { Metadata } from "next";
import { Header } from "@/components/navbar/menu";
import { Hero } from "@/components/sections/hero";
import About from "@/components/sections/about";
import Services from "@/components/sections/services";
// Galeria anterior preservada em @/components/sections/gallery.tsx.
// import { Gallery } from "@/components/sections/gallery";
import { InstagramGallery } from "@/components/sections/instagram-gallery";
import { Feedbacks } from "@/components/sections/feedbacks";
import { Faq } from "@/components/sections/faq";
import { faq } from "@/mocks/content";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import { JsonLd } from "@/components/seo/jsonLd";
import { getHomeContent } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";
import { BRAND } from "@/mocks/brand";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function Home() {
  const { hero, services } = await getHomeContent();
  return (
    <div className="relative min-h-screen overflow-x-clip bg-black text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: BRAND.name,
          legalName: BRAND.legalName,
          description: BRAND.description,
          areaServed: BRAND.region,
          hasMap: BRAND.googleBusiness,
          url: getSiteUrl().href,
          logo: new URL("/images/logo/logopng.png", getSiteUrl()).href,
          telephone: BRAND.phone_number,
          email: BRAND.email,
          sameAs: [BRAND.instagram, BRAND.googleBusiness],
          address: {
            "@type": "PostalAddress",
            streetAddress: `${BRAND.street}, ${BRAND.neighborhood}`,
            postalCode: BRAND.postalCode,
            addressLocality: "Piracicaba",
            addressRegion: "SP",
            addressCountry: "BR",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <div className="relative z-20">
        <Header />
        <main id="conteudo">
          <Hero hero={hero} />
          <About />
          <Services items={services} />
          {/* <Gallery items={gallery} /> — versão anterior preservada. */}
          <InstagramGallery />
          <Feedbacks />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
