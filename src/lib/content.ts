import "server-only";
import { cache } from "react";
import type {
  GalleryItem,
  ServiceCard,
  SgcGallery,
  SgcHero,
  SgcPhoto,
  SgcSeo,
  SgcService,
} from "@/@types/content";
import { gallery as localGallery } from "@/mocks/gallery";
import { sgcGet } from "./api";

import { safeLink } from "./safe-link";
export { safeLink };

const available = <T extends { available: boolean; order: number }>(
  data: T[] | null,
): T[] =>
  Array.isArray(data)
    ? data
        .filter((item) => item.available !== false)
        .sort((a, b) => a.order - b.order)
    : [];

export const getSiteSeo = cache(() => sgcGet<SgcSeo>("/seo"));

export const getHomeContent = cache(async () => {
  const [heroData, serviceData, galleryData] = await Promise.all([
    sgcGet<SgcHero[]>("/heros/available"),
    sgcGet<SgcService[]>("/services/available"),
    sgcGet<SgcGallery[]>("/galleries/available"),
  ]);
  const services: ServiceCard[] = available(serviceData)
    .filter((item) => item.title)
    .map((item) => ({
      title: item.title,
      description: item.abstract || "",
      image: safeLink(item.image_url, "/images/backgroundsobre.jpg"),
      features: [],
      message: `Olá! Gostaria de um orçamento para ${item.title}.`,
    }));
  const galleries = available(galleryData);
  const groups = await Promise.all(
    galleries.map(async (group) => {
      // Swagger documents an array by ID; the template also supports an object with photos.
      const result =
        group.photos ||
        (await sgcGet<SgcPhoto[] | SgcGallery>(
          `/galleries/photos/available/${encodeURIComponent(group.id)}`,
        ));
      const photos = Array.isArray(result) ? result : result?.photos;
      return (Array.isArray(photos) ? photos : [])
        .filter((photo) => photo.available !== false && photo.image_url)
        .map((photo) => ({
          id: `${group.id}-${photo.id}`,
          title: photo.title || group.title,
          description: "",
          category: group.title,
          image: safeLink(photo.image_url, ""),
        }))
        .filter((photo) => photo.image) satisfies GalleryItem[];
    }),
  );
  const photos = groups.flat();
  return {
    hero: available(heroData)[0],
    services,
    gallery: photos.length ? photos : localGallery,
  };
});
