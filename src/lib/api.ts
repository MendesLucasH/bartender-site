import "server-only";

// Same SGC headers as default-template, kept exclusively on the server.
export async function sgcGet<T>(path: string): Promise<T | null> {
  const key = process.env.SGC_KEY || process.env.NEXT_PUBLIC_SGC_KEY;
  if (!key) return null;

  const headers: Record<string, string> = { "x-sgc-header": key };
  if (process.env.NEXT_IS_SSR_ENABLED)
    headers["x-ssr-enabled"] = process.env.NEXT_IS_SSR_ENABLED;
  if (process.env.NEXT_SSR_HEADER && process.env.NEXT_SSR_ORIGIN) {
    headers[process.env.NEXT_SSR_HEADER] = process.env.NEXT_SSR_ORIGIN;
  }

  try {
    const response = await fetch(
      new URL(path, process.env.SGC_API_URL || "https://sgc.tbrweb.com.br"),
      {
        headers,
        next: { revalidate: 10800, tags: ["sgc"] },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return (await response.json()) as T;
  } catch (error) {
    console.warn(
      `[SGC] Falha ao consultar ${path}:`,
      error instanceof Error ? error.message : "resposta inválida",
    );
    return null;
  }
}
