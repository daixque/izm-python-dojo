#!/usr/bin/env python3
"""
ブラウザテストのエントリーポイント。

使用方法:
    python test.py              # 全レッスンをテスト
    python test.py -k 01_01     # 特定のレッスンのみ
    python test.py --headed     # ブラウザを表示しながら実行

依存パッケージのインストール:
    pip install pytest pytest-playwright
    playwright install chromium
"""

import subprocess
import sys


def main():
    args = ["pytest", "test/", "-v", "--tb=short", "--browser", "chromium"] + sys.argv[1:]
    result = subprocess.run(args)
    sys.exit(result.returncode)


if __name__ == "__main__":
    main()
