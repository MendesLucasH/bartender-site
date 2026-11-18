export interface InstagramTile {
  id: string;
  kind: "reel" | "photo";
  title: string;
  image: string;
  href: string;
  featured?: boolean;
  wide?: boolean;
}

export const instagramTiles: InstagramTile[] = [
  {
    id: "DYuo7w9xICy",
    kind: "reel",
    title: "Post 1",
    image: "/galeria/foto1.png",
    href: "https://www.instagram.com/reel/DYuo7w9xICy/?stkn=aGwzZndrYmptZXhp",
  },
  {
    id: "DaBT7EZPOps",
    kind: "reel",
    title: "Post 2",
    image: "/galeria/foto2.jpg",
    href: "https://www.instagram.com/reel/DaBT7EZPOps/?stkn=MXhpemE2b3J6MTgxcA==",
  },
  {
    id: "DPfDdkeCfh0",
    kind: "reel",
    title: "Post 3",
    image: "/galeria/foto3.jpg",
    href: "https://www.instagram.com/reel/DPfDdkeCfh0/?stkn=bjNpNnI1YWR6cDJ3",
  },
  {
    id: "DbB3qrND7Oj",
    kind: "photo",
    title: "Post 4",
    image: "/galeria/foto4.jpg",
    href: "https://www.instagram.com/p/DbB3qrND7Oj/?stkn=dHQxZ29nZGY0and4",
  },
  {
    id: "DbrOZY1xiQV",
    kind: "reel",
    title: "Post 5",
    image: "/galeria/foto5.jpg",
    href: "https://www.instagram.com/reel/DbrOZY1xiQV/?stkn=MWRkeXA4bWJ6cW8yZA==",
  },
];
