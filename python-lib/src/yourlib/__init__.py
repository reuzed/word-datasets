from __future__ import annotations

import json
import os
from pathlib import Path
from typing import List, Dict, Any


def data_dir() -> Path:
    """Return the path to the installed package data directory."""
    return Path(__file__).resolve().parent / "data"


def list_datasets() -> List[str]:
    """List dataset files included with the package (relative to data directory)."""
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
    """Read a JSON file from the packaged data directory."""
    p = data_dir() / rel_path
    with p.open("r", encoding="utf-8") as f:
        return json.load(f)


__all__ = ["data_dir", "list_datasets", "read_json"]


