"""
AgriVision Zero-Config Static Frontend Server
Serves the pre-compiled production build from frontend/dist on port 5173
with full Single-Page Application (SPA) routing support.
Runs with standard Python library (no dependencies needed).
"""
import http.server
import socketserver
import os
import sys
from pathlib import Path

PORT = 5173
DIST_DIR = Path(__file__).resolve().parent / "dist"

if not DIST_DIR.exists():
    print(f"Error: {DIST_DIR} does not exist. Please run npm run build first.")
    sys.exit(1)

class SPANoCacheHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIST_DIR), **kwargs)

    def end_headers(self):
        # Enable CORS and disable aggressive caching for local dev/run
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_GET(self):
        # If the requested path is not an actual file on disk, fallback to index.html for React Router
        target_file = DIST_DIR / self.path.lstrip("/").split("?")[0]
        if not target_file.exists() or target_file.is_dir():
            if not self.path.startswith("/assets") and not self.path.startswith("/locals") and not self.path.startswith("/docs"):
                self.path = "/index.html"
        return super().do_GET()

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), SPANoCacheHTTPHandler) as httpd:
        print("=" * 60)
        print(f"  AgriVision Production Frontend Server running on Port {PORT}")
        print(f"  Serving: {DIST_DIR}")
        print(f"  URL:     http://localhost:{PORT}")
        print("=" * 60)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down frontend server.")
            httpd.shutdown()

if __name__ == "__main__":
    run_server()
