"""
AgriVision Project Packager
Creates a clean, lightweight, ready-to-share ZIP file of the AgriVision project
by excluding node_modules, Python virtual environments (venv), build caches, and temporary files.
"""
import os
import zipfile
import sys
from pathlib import Path

# Directories to exclude from the shared archive
EXCLUDED_DIRS = {
    'node_modules',
    'venv',
    '.venv',
    '__pycache__',
    '.git',
    '.vscode',
    '.idea',
    'dist',
    'build',
    '.pytest_cache'
}

# Extensions to exclude
EXCLUDED_EXTS = {
    '.pyc',
    '.pyo',
    '.pyd',
    '.log',
    '.tmp',
    '.bak'
}

def create_shared_zip(source_dir: Path, output_zip: Path):
    print(f"Creating clean package from: {source_dir}")
    print(f"Output archive: {output_zip}\n")
    
    file_count = 0
    total_bytes = 0
    
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as zipf:
        for root, dirs, files in os.walk(source_dir):
            # Prune excluded directories
            dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]
            
            for file in files:
                # Skip excluded extensions
                if any(file.endswith(ext) for ext in EXCLUDED_EXTS):
                    continue
                
                # Skip output zip if inside the same directory
                file_path = Path(root) / file
                if file_path.resolve() == output_zip.resolve():
                    continue
                
                # Relative path inside the zip archive
                rel_path = file_path.relative_to(source_dir)
                zipf.write(file_path, arcname=str(rel_path))
                
                file_count += 1
                total_bytes += file_path.stat().st_size
                
    zip_size_mb = output_zip.stat().st_size / (1024 * 1024)
    raw_size_mb = total_bytes / (1024 * 1024)
    
    print("=" * 60)
    print(" [SUCCESS] Package created successfully!")
    print(f" Total files packaged: {file_count}")
    print(f" Uncompressed size:   {raw_size_mb:.2f} MB")
    print(f" Zipped package size: {zip_size_mb:.2f} MB")
    print(f" Saved to:            {output_zip.resolve()}")
    print("=" * 60)

if __name__ == '__main__':
    root = Path(__file__).resolve().parent
    dest = root.parent / "AgriVision_Shared.zip"
    create_shared_zip(root, dest)
