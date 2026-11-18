import "server-only";

export function getSiteUrl() {
  const value = process.env.SITE_URL;
  if (!value) return new URL("http://localhost:3000");
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol))
    throw new Error("SITE_URL precisa ser uma URL HTTP(S).");
  return new URL(url.origin);
}

export function isIndexable() {
  const url = getSiteUrl();
  return (
    process.env.SITE_INDEXABLE === "true" &&
    url.protocol === "https:" &&
    !["localhost", "127.0.0.1"].includes(url.hostname)
  );
}
