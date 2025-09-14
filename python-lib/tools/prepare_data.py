#!/usr/bin/env python3
from __future__ import annotations

import shutil
from pathlib import Path


def main() -> None:
    repo_root = Path(__file__).resolve().parents[2]
    data_src = repo_root / "data"
    data_dst = Path(__file__).resolve().parents[1] / "src" / "word_datasets" / "data"
    data_dst.mkdir(parents=True, exist_ok=True)
    if not data_src.exists():
        print(f"No data found at {data_src}; creating empty data directory")
        return
    # Copy tree
    for path in data_src.rglob("*"):
        if path.is_dir():
            continue
        rel = path.relative_to(data_src)
        dst = data_dst / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, dst)
        print(f"Copied {rel}")


if __name__ == "__main__":
    main()


