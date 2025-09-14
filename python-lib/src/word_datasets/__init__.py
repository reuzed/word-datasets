from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Generator, List, Optional


def data_dir() -> Path:
    return Path(__file__).resolve().parent / "data"


def dataset_path(rel_path: str) -> Path:
    return data_dir() / rel_path


def list_datasets() -> List[str]:
    base = data_dir()
    if not base.exists():
        return []
    files: List[str] = []
    for path in base.rglob("*"):
        if path.is_file():
            files.append(str(path.relative_to(base)))
    files.sort()
    return files


def read_json(rel_path: str) -> Any:
    p = dataset_path(rel_path)
    with p.open("r", encoding="utf-8") as f:
        return json.load(f)


def iter_text_lines(rel_path: str, *, strip: bool = True) -> Generator[str, None, None]:
    p = dataset_path(rel_path)
    with p.open("r", encoding="utf-8", newline="") as f:
        for line in f:
            yield line.strip() if strip else line


def read_text_lines(rel_path: str, *, limit: Optional[int] = None, strip: bool = True) -> List[str]:
    result: List[str] = []
    for i, line in enumerate(iter_text_lines(rel_path, strip=strip)):
        result.append(line)
        if limit is not None and i + 1 >= limit:
            break
    return result


__all__ = [
    "data_dir",
    "dataset_path",
    "list_datasets",
    "read_json",
    "iter_text_lines",
    "read_text_lines",
]


