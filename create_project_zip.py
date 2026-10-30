"""
AgriVision Complete Project Packaging Script
Packages the full production codebase, pre-trained ML models, datasets,
built frontend, backend database, documentation, and one-click launcher
into a self-contained ZIP archive.
"""
import os
import zipfile
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent
OUTPUT_ZIP = ROOT_DIR / "AgriVision_Complete_Project.zip"

# Explicit folders to package
INCLUDE_DIRS = [
    'backend',
    'frontend',
    'ml',
    'docs',
]

# Folders to strictly exclude from the package
EXCLUDE_DIRS = {
    'venv',
    '.venv',
    'node_modules',
    '__pycache__',
    '.git',
    '.idea',
    '.vscode',
    '.pytest_cache',
    'SE',
    'tools',  # JMeter installation binaries (230 MB) - reports & plans are in docs/jmeter_testing
}

# Extensions to exclude
EXCLUDE_EXTS = {
    '.pyc',
    '.pyo',
    '.tmp',
    '.log',
    '.bak',
    '.zip'
}

# Specific root files to include
ROOT_FILES = [
    'start_all.bat',
    'HOW_TO_RUN_AGRIVISION.md',
    'README.md',
    'Farmer_Problem_Survey_Questionnaire.docx',
    'Farmer_Problem_Survey_Questionnaire_Trilingual.docx',
    'AgriVision_Presentation_Deck.pptx',
    'generate_market_dataset.py',
    'generate_uml_diagrams.py',
    'create_srs_doc.py',
    'create_ml_and_testing_docx.py',
]

def build_zip():
    print("=" * 70)
    print("        AgriVision Complete Project Packager")
    print("=" * 70)
    print(f"Source Directory: {ROOT_DIR}")
    print(f"Target Archive:   {OUTPUT_ZIP}\n")

    if OUTPUT_ZIP.exists():
        print(f"Removing existing archive {OUTPUT_ZIP.name}...")
        OUTPUT_ZIP.unlink()

    file_count = 0
    total_uncompressed_bytes = 0

    with zipfile.ZipFile(OUTPUT_ZIP, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as zipf:
        # 1. Package root files
        print("Packaging Root Files...")
        for fname in ROOT_FILES:
            fpath = ROOT_DIR / fname
            if fpath.exists():
                arcname = f"AgriVision/{fname}"
                zipf.write(fpath, arcname=arcname)
                fsize = fpath.stat().st_size
                total_uncompressed_bytes += fsize
                file_count += 1
                print(f"  + {arcname} ({fsize / 1024:.1f} KB)")
            else:
                print(f"  ! Warning: {fname} not found in root")

        # 2. Package directories
        for dir_name in INCLUDE_DIRS:
            target_dir = ROOT_DIR / dir_name
            if not target_dir.exists():
                print(f"Directory {dir_name} not found, skipping...")
                continue

            print(f"\nPackaging Directory: {dir_name}/ ...")
            dir_files_count = 0
            dir_bytes = 0

            for root, dirs, files in os.walk(target_dir):
                # Filter out excluded directories in-place
                dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

                for file in files:
                    if any(file.endswith(ext) for ext in EXCLUDE_EXTS):
                        continue

                    full_path = Path(root) / file
                    if full_path.resolve() == OUTPUT_ZIP.resolve():
                        continue

                    rel_path = full_path.relative_to(ROOT_DIR)
                    arcname = f"AgriVision/{rel_path.as_posix()}"

                    zipf.write(full_path, arcname=arcname)
                    fsize = full_path.stat().st_size
                    dir_bytes += fsize
                    total_uncompressed_bytes += fsize
                    file_count += 1
                    dir_files_count += 1

            print(f"  -> Added {dir_files_count} files ({dir_bytes / (1024 * 1024):.2f} MB)")

    zip_size_mb = OUTPUT_ZIP.stat().st_size / (1024 * 1024)
    raw_size_mb = total_uncompressed_bytes / (1024 * 1024)
    savings = (1 - (zip_size_mb / raw_size_mb)) * 100 if raw_size_mb > 0 else 0

    print("\n" + "=" * 70)
    print(" [SUCCESS] AgriVision Complete Project Archive Created Successfully!")
    print(f" Archive Location:    {OUTPUT_ZIP.resolve()}")
    print(f" Total Files:         {file_count:,}")
    print(f" Uncompressed Size:   {raw_size_mb:.2f} MB")
    print(f" Compressed ZIP Size: {zip_size_mb:.2f} MB")
    print(f" Compression Ratio:   {savings:.1f}% space saved")
    print("=" * 70)

if __name__ == "__main__":
    build_zip()
