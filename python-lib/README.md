## word-datasets (Python)

Python package for the word datasets.

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
