export function safeLink(value: string | undefined, fallback: string): string {
  if (!value) return fallback;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : fallback;
  } catch {
    return fallback;
  }
}
