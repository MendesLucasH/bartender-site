export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  image: string;
  features: string[];
  message: string;
}

export interface SgcSeo {
  title?: string;
  description?: string;
  author?: string;
  schema_instagram?: string;
}

export interface SgcHero {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
  link_text: string;
  order: number;
  available: boolean;
}

export interface SgcService {
  id: string;
  title: string;
  abstract: string;
  image_url: string;
  available: boolean;
  order: number;
}

export interface SgcPhoto {
  id: string;
  title: string;
  image_url: string;
  available: boolean;
}

export interface SgcGallery {
  id: string;
  title: string;
  slug: string;
  available: boolean;
  order: number;
  photos?: SgcPhoto[];
}
