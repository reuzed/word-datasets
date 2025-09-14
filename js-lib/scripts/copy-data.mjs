import { cpSync, mkdirSync } from "node:fs";
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
  console.log("Copied data");
} catch {
  console.log("No repo data to copy");
}
