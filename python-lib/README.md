## yourlib (Python)

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
import yourlib
print(yourlib.list_datasets())
```
