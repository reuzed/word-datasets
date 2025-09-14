## word-datasets (JS/TS)

JS/TS package for the word datasets.

### Install

```bash
npm install word-datasets
# or pnpm add word-datasets / yarn add word-datasets
```

### Build and publish

```bash
cd js-lib
npm install
npm run build
npm publish
```

### Usage

```ts
import { listDatasets, iterTextLines } from "word-datasets";
console.log(listDatasets());
let i = 0;
for await (const w of iterTextLines("words.txt")) {
  if (i++ < 5) console.log(w);
  else break;
}
```

### Browser usage

This package now ships a browser-friendly build that fetches the text files via HTTP.

You can load files directly from a CDN like unpkg:

```html
<script type="module">
  import {
    listDatasetsBrowser,
    readTextLinesBrowser,
  } from "https://unpkg.com/word-datasets@0.1.0/dist/browser.js";
  console.log(await listDatasetsBrowser());
  console.log(await readTextLinesBrowser("words.txt", 5));
</script>
```

Or, if bundling with Vite/Webpack, just import from the package:

```ts
import {
  listDatasetsBrowser,
  readTextLinesBrowser,
} from "word-datasets/dist/browser.js";
console.log(await listDatasetsBrowser());
console.log(await readTextLinesBrowser("words.txt", 5));
```

### API

- `dataDir(): string`
- `listDatasets(): string[]`
- `async iterTextLines(relPath: string): AsyncIterable<string>`
- `readTextLines(relPath: string, limit?: number): Promise<string[]>`
- `readJson(relPath: string): unknown`

### Datasets

One word per line, UTF-8 text files shipped inside the package:

- `words.txt` – mixed/common words (~466k lines)
- `francais.txt` – French (~208k)
- `espanol.txt` – Spanish (~175k)
- `deutsch.txt` – German (~166k)
- `italiano.txt` – Italian (~88k)
- `nederlands.txt` – Dutch (~53k)
- `norsk.txt` – Norwegian (~61k)
- `dansk.txt` – Danish (~24k)
