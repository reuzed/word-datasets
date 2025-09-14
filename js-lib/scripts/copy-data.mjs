import {
  cpSync,
  mkdirSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const root = join(__dirname, "..", "..");
const repoData = join(root, "data");
const distData = join(__dirname, "..", "dist", "data");

mkdirSync(distData, { recursive: true });
try {
  cpSync(repoData, distData, { recursive: true });
  // generate index.json with flat file list
  const files = [];
  const walk = (dir, base) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      const rel = full.slice(distData.length + 1);
      const st = statSync(full);
      if (st.isDirectory()) walk(full, base);
      else files.push(rel);
    }
  };
  walk(distData, distData);
  writeFileSync(
    join(distData, "index.json"),
    JSON.stringify({ files }, null, 2)
  );
  console.log("Copied data and wrote index.json");
} catch {
  console.log("No repo data to copy");
}
