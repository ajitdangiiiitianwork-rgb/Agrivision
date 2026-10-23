import os

root = os.path.dirname(os.path.abspath(__file__))
ignored = {".git", "venv", "node_modules", "**pycache**", ".pytest_cache", "dist", "build"}

with open(os.path.join(root, "project_structure.txt"), "w", encoding="utf-8") as f:
  for current, dirs, files in os.walk(root):
    dirs[:] = sorted(d for d in dirs if d not in ignored)
    level = os.path.relpath(current, root).count(os.sep)
    indent = "  " * level
    folder = os.path.basename(current)
    f.write(f"{indent}{folder}/\n")


    for name in sorted(files):
        if name == "project_structure.txt":
            continue
        path = os.path.join(current, name)
        size = os.path.getsize(path)
        if size < 2 * 1024 * 1024:
            f.write(f"{indent}  {name}\n")
        else:
            f.write(f"{indent}  {name} [LARGE FILE: {size / (1024 * 1024):.1f} MB]\n")


print("Project structure saved to project_structure.txt")
