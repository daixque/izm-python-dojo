#!/usr/bin/env python3
"""開発用HTTPサーバー（キャッシュ無効化）"""
import http.server
import socketserver

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

PORT = 8080

with socketserver.TCPServer(("", PORT), NoCacheHTTPRequestHandler) as httpd:
    print(f"サーバー起動: http://localhost:{PORT}")
    print("キャッシュ無効化モードで実行中...")
    print("Ctrl+C で停止")
    httpd.serve_forever()
