import { readdirSync, statSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

export function dataDir(): string {
  // __dirname works in CJS; for ESM, fallback to URL resolution
  // At runtime after build, both CJS/ESM place files in dist/, so resolve relative to this file
  const here =
    typeof __dirname !== "undefined"
      ? __dirname
      : dirname(fileURLToPath(import.meta.url));
  return join(here, "data");
}

export function listDatasets(): string[] {
  const base = dataDir();
  const results: string[] = [];
  const walk = (dir: string, prefix = "") => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      const rel = relative(base, full);
      const st = statSync(full);
      if (st.isDirectory()) walk(full, join(prefix, name));
      else results.push(rel);
    }
  };
  try {
    walk(base);
  } catch {
    // no data bundled yet
  }
  results.sort();
  return results;
}

export function readJson(relPath: string): unknown {
  const p = join(dataDir(), relPath);
  const text = readFileSync(p, "utf8");
  return JSON.parse(text);
}

export default { dataDir, listDatasets, readJson };
