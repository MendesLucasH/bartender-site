import type { Metadata, Viewport } from "next";
import { BRAND } from "@/mocks/brand";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { getSiteSeo } from "@/lib/content";
import { getSiteUrl, isIndexable } from "@/lib/seo";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSiteSeo();
  const title =
    seo?.title || "PHP Bartenders | Open bar para eventos em Piracicaba";
  const description = seo?.description || BRAND.description;
  return {
    metadataBase: getSiteUrl(),
    manifest: "/images/favicon/site.webmanifest",
    title: { default: title, template: "%s | PHP Bartenders" },
    description,
    authors: [{ name: seo?.author || "PHP Bartenders" }],
    creator: "TBrWeb - Tecnologia Brasil Web",
    robots: { index: isIndexable(), follow: isIndexable() },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "pt_BR",
      siteName: "PHP Bartenders",
      url: "/",
      images: [
        {
          url: "/images/social.jpg",
          width: 1200,
          height: 630,
          alt: "PHP Bartenders — elevamos o nível do seu sonho",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/social.jpg"],
    },
    icons: {
      icon: "/images/favicon/favicon.svg",
      apple: "/images/favicon/apple-touch-icon.png",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>
        <a
          href="#conteudo"
          className="sr-only fixed left-4 top-4 z-50 rounded-lg bg-primary p-4 text-black focus:not-sr-only focus:fixed"
        >
          Pular para o conteúdo
        </a>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
