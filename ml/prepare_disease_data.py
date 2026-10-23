from datasets import load_dataset
from pathlib import Path
from collections import defaultdict
import random

DATA_DIR = Path(__file__).resolve().parent / "data" / "leaves"
SEED = 42

random.seed(SEED)

dataset = load_dataset(
    "geraldmc/plantvillage-tiny",
    revision="v0.1.0",
    split="train"
)

class_images = defaultdict(list)

for index, label in enumerate(dataset["class_label"]):
    class_images[label].append(index)

for split in ["train", "val"]:
    for label in class_images:
        (DATA_DIR / split / label).mkdir(
            parents=True,
            exist_ok=True
        )

total_train = 0
total_val = 0

for label, indices in class_images.items():
    random.shuffle(indices)

    train_indices = indices[:40]
    val_indices = indices[40:]

    for index in train_indices:
        image = dataset[index]["image"].convert("RGB")
        image.save(
            DATA_DIR / "train" / label / f"{index}.jpg",
            format="JPEG",
            quality=90
        )
        total_train += 1

    for index in val_indices:
        image = dataset[index]["image"].convert("RGB")
        image.save(
            DATA_DIR / "val" / label / f"{index}.jpg",
            format="JPEG",
            quality=90
        )
        total_val += 1

print("Dataset preparation completed.")
print("Number of classes:", len(class_images))
print("Training images:", total_train)
print("Validation images:", total_val)
print("Dataset location:", DATA_DIR)