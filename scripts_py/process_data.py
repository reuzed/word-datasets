#!/usr/bin/env python3
"""
Minimal processing script: copies files from data_raw/ to data/.

Extend this to clean/normalize datasets as needed.
"""
from __future__ import annotations

import shutil
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
DATA_RAW = REPO_ROOT / "data_raw"
DATA_OUT = REPO_ROOT / "data"


def main() -> None:
    DATA_OUT.mkdir(parents=True, exist_ok=True)
    if not DATA_RAW.exists():
        print(f"No data_raw directory found at {DATA_RAW}")
        return

    for path in DATA_RAW.rglob("*"):
        if path.is_dir():
            continue
        rel = path.relative_to(DATA_RAW)
        dst = DATA_OUT / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, dst)
        print(f"Copied {rel}")


if __name__ == "__main__":
    main()


