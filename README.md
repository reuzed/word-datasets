## word-datasets monorepo

An open-source data library monorepo containing:

- data_raw/: unprocessed datasets (sources)
- scripts_py/: Python scripts to process raw data → cleaned data
- data/: cleaned data (JSON/CSV/YAML) consumed by libraries
- python-lib/: Python package bundling datasets and providing a simple API
- js-lib/: JavaScript/TypeScript package bundling datasets and providing a simple API

### Data flow

1. Place source datasets in `data_raw/`.
2. Run processing scripts in `scripts_py/` to generate cleaned outputs in `data/`.
3. Both libraries consume only `data/`.

### Building

- Python library

  - Prepare data into the package: `python python-lib/tools/prepare_data.py`
  - Build: `cd python-lib && python -m build`
  - Publish (after configuring credentials): `twine upload dist/*`

- JS/TS library
  - Build: `cd js-lib && npm install && npm run build`
  - Publish: `npm publish`

You can also copy shared data into both packages before building:

```bash
./scripts/copy_data_to_packages.sh
```

### Usage after publish

- Python:

```python
import yourlib
print(yourlib.list_datasets())
```

- JavaScript/TypeScript:

```ts
import { listDatasets } from "yourlib";
console.log(listDatasets());
```

### Contributing

1. Fork and clone the repo.
2. Add raw data to `data_raw/`.
3. Add or update processing scripts in `scripts_py/` to transform raw → cleaned data.
4. Run processing scripts to populate `data/`.
5. Build libraries and run basic checks.

Please keep `data/` canonical—both packages read only from there. Avoid duplicating datasets inside package source; use the provided copy scripts to stage data for builds.

License: MIT
