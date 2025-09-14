export function dataUrl(relPath: string): string {
  // Resolve relative to the compiled module URL in browsers
  // dist/browser.js will live next to dist/data/
  // e.g., new URL('./data/words.txt', import.meta.url)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseUrl = (import.meta as any)?.url;
  if (typeof baseUrl === "string") {
    return new URL(`./data/${relPath}`, baseUrl).toString();
  }
  return relPath;
}

export async function* iterTextLinesFromUrl(
  url: string
): AsyncGenerator<string, void, void> {
  const resp = await fetch(url);
  if (!resp.ok || !resp.body)
    throw new Error(`Failed to fetch ${url}: ${resp.status}`);
  const reader = resp.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffered = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffered += decoder.decode(value, { stream: true });
    const parts = buffered.split(/\r?\n/);
    buffered = parts.pop() ?? "";
    for (const line of parts) yield line.trim();
  }
  if (buffered.length) yield buffered.trim();
}

export async function* iterTextLinesBrowser(
  relPath: string
): AsyncGenerator<string, void, void> {
  const url = dataUrl(relPath);
  yield* iterTextLinesFromUrl(url);
}

export async function readTextLinesBrowser(
  relPath: string,
  limit?: number
): Promise<string[]> {
  const out: string[] = [];
  let count = 0;
  for await (const line of iterTextLinesBrowser(relPath)) {
    out.push(line);
    count += 1;
    if (typeof limit === "number" && count >= limit) break;
  }
  return out;
}

export async function listDatasetsBrowser(): Promise<string[]> {
  // Optionally fetch a manifest if available; else try directory listing fallback via index.json we generate in build
  const url = dataUrl("index.json");
  const resp = await fetch(url);
  if (!resp.ok) return [];
  const data = (await resp.json()) as { files: string[] };
  return data.files ?? [];
}

export default {
  dataUrl,
  iterTextLinesFromUrl,
  iterTextLinesBrowser,
  readTextLinesBrowser,
  listDatasetsBrowser,
};
