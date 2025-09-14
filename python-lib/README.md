## word-datasets (Python)

Python package for the word datasets.

### Install

```bash
pip install word-datasets
```

### Build and publish

```bash
# (from repo root) stage data into the package source
python python-lib/tools/prepare_data.py

# build the package
cd python-lib
python -m build

# upload
twine upload dist/*
```

### Usage

```python
import word_datasets as wd
print(wd.list_datasets())

for i, w in enumerate(wd.iter_text_lines("words.txt")):
    if i < 5:
        print(w)
    else:
        break
```

### API

- `word_datasets.data_dir() -> pathlib.Path`
- `word_datasets.dataset_path(rel_path: str) -> pathlib.Path`
- `word_datasets.list_datasets() -> list[str]`
- `word_datasets.iter_text_lines(rel_path: str, *, strip: bool = True) -> Iterator[str]`
- `word_datasets.read_text_lines(rel_path: str, *, limit: int | None = None, strip: bool = True) -> list[str]`
- `word_datasets.read_json(rel_path: str) -> Any`

### Datasets

One word per line, UTF-8 text files:

- `words.txt` – mixed/common words (~466k lines)
- `francais.txt` – French (~208k)
- `espanol.txt` – Spanish (~175k)
- `deutsch.txt` – German (~166k)
- `italiano.txt` – Italian (~88k)
- `nederlands.txt` – Dutch (~53k)
- `norsk.txt` – Norwegian (~61k)
- `dansk.txt` – Danish (~24k)
