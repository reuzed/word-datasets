#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DATA_DIR="$ROOT_DIR/data"

# Python package
PY_DATA_DST="$ROOT_DIR/python-lib/src/word_datasets/data"
mkdir -p "$PY_DATA_DST"
rsync -av --delete "$DATA_DIR/" "$PY_DATA_DST/" 2>/dev/null || true

# JS package
JS_DATA_DST="$ROOT_DIR/js-lib/dist/data"
mkdir -p "$JS_DATA_DST"
rsync -av --delete "$DATA_DIR/" "$JS_DATA_DST/" 2>/dev/null || true

echo "Data copied into python-lib and js-lib."


