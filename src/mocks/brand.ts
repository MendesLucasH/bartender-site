export const BRAND = {
  name: "PHP Bartenders",
  legalName: "Pedro H Paschoalini",
  contactName: "Comercial",
  slogan: "Elevamos o nível do seu sonho",
  headline: "Open bar para casamentos e eventos em Piracicaba",
  description:
    "Bar de drinks para casamentos, aniversários, eventos corporativos e celebrações sociais em Piracicaba e região. Coquetelaria artesanal e carta personalizada.",
  phone_display: "+55 (19) 99750-8975",
  phone_number: "+5519997508975",
  phone_link: "tel:+5519997508975",
  whatsapp_display: "+55 (19) 99750-8975",
  whatsapp_number: "5519997508975",
  whatsapp: "https://wa.me/5519997508975",
  email: "Php.bartenders@gmail.com",
  city: "Piracicaba, SP",
  region: "Piracicaba e região",
  street: "Av. Conceição, 1133",
  neighborhood: "Algodoal",
  postalCode: "13405-280",
  address: "Av. Conceição, 1133, Algodoal, Piracicaba/SP — CEP 13405-280",
  instagram: "https://www.instagram.com/phpbartenders/",
  googleBusiness: "https://share.google/dDjvaxmYqt2XosXKX",
  googleReview:
    "https://www.google.com/search?q=PHP+Bartenders+Piracicaba&hl=pt-BR#lrd=0xa269196ab0a682ed:0xa98667d6ae1646df,3,,,,",
  operationSince: "2023-11",
};

export const whatsappLink = (message: string) =>
  `${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
