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
