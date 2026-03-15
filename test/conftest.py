"""
pytest フィクスチャ: ローカル HTTP サーバーの起動・停止、sys.path 設定。
"""

import http.server
import socket
import sys
import threading
from pathlib import Path

import pytest

# test/ ディレクトリを sys.path に追加（helpers, lesson_params を直接インポートできるようにする）
sys.path.insert(0, str(Path(__file__).parent))

DOCS_DIR = Path(__file__).parent.parent / "docs"


class _QuietHandler(http.server.SimpleHTTPRequestHandler):
    """docs/ ディレクトリを静的配信するハンドラ（ログ抑制）"""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DOCS_DIR), **kwargs)

    def log_message(self, *args):
        pass  # サーバーログを抑制


@pytest.fixture(scope="session")
def base_url():
    """docs/ を配信するローカル HTTP サーバーを起動し、base URL を返す。"""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("", 0))
        port = s.getsockname()[1]

    server = http.server.HTTPServer(("localhost", port), _QuietHandler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

    yield f"http://localhost:{port}"

    server.shutdown()
