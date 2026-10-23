
import json
import tensorflow as tf
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras import layers, models
from pathlib import Path

DATA = Path(__file__).resolve().parents[1] / "data" / "leaves"
MODELS = Path(__file__).resolve().parents[1] / "models"

IMG_SIZE = (224, 224)
BATCH = 8
EPOCHS = 8
FINE_TUNE_EPOCHS = 4
SEED = 42

tf.keras.utils.set_random_seed(SEED)


def build_model(num_classes):
    base = EfficientNetB0(
        include_top=False,
        input_shape=IMG_SIZE + (3,),
        weights="imagenet"
    )

    base.trainable = False

    inputs = layers.Input(shape=IMG_SIZE + (3,))
    x = base(inputs, training=False)
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.Dropout(0.3)(x)
    outputs = layers.Dense(num_classes, activation="softmax")(x)

    model = models.Model(inputs, outputs)

    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"]
    )

    return model, base


def main():
    train_ds = tf.keras.utils.image_dataset_from_directory(
        DATA / "train",
        image_size=IMG_SIZE,
        batch_size=BATCH,
        label_mode="int",
        shuffle=True,
        seed=SEED
    )

    val_ds = tf.keras.utils.image_dataset_from_directory(
        DATA / "val",
        image_size=IMG_SIZE,
        batch_size=BATCH,
        label_mode="int",
        shuffle=False
    )

    class_names = train_ds.class_names

    if class_names != val_ds.class_names:
        raise ValueError("Training and validation class names do not match.")

    num_classes = len(class_names)

    print("Number of classes:", num_classes)
    print("Class names:", class_names)

    train_ds = train_ds.prefetch(tf.data.AUTOTUNE)
    val_ds = val_ds.prefetch(tf.data.AUTOTUNE)

    MODELS.mkdir(parents=True, exist_ok=True)

    checkpoint = MODELS / "disease_efficientnet_v1.keras"

    callbacks = [
        tf.keras.callbacks.ModelCheckpoint(
            filepath=str(checkpoint),
            monitor="val_accuracy",
            save_best_only=True,
            mode="max",
            verbose=1
        ),
        tf.keras.callbacks.EarlyStopping(
            monitor="val_loss",
            patience=3,
            restore_best_weights=True,
            verbose=1
        )
    ]

    model, base = build_model(num_classes)

    print("\nStarting transfer-learning training...")

    model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=EPOCHS,
        callbacks=callbacks
    )

    print("\nStarting fine-tuning...")

    base.trainable = True

    for layer in base.layers[:-20]:
        layer.trainable = False

    for layer in base.layers:
        if isinstance(layer, layers.BatchNormalization):
            layer.trainable = False

    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"]
    )

    model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=FINE_TUNE_EPOCHS,
        callbacks=callbacks
    )

    model = tf.keras.models.load_model(checkpoint)

    labels_path = MODELS / "disease_labels.json"

    labels_path.write_text(
        json.dumps(class_names, indent=2),
        encoding="utf-8"
    )

    print("\nTraining completed.")
    print("Model saved to:", checkpoint)
    print("Labels saved to:", labels_path)


if __name__ == "__main__":
    main()
