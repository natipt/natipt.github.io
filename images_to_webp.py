from PIL import Image
from pathlib import Path

ROOT_DIR = Path("media")
QUALITY = 85  # 0–100

EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".tiff"}

for img_path in ROOT_DIR.rglob("*"):
    if img_path.is_file() and img_path.suffix.lower() in EXTENSIONS:
        webp_path = img_path.with_suffix(".webp")

        try:
            with Image.open(img_path) as img:
                lossless = img_path.suffix.lower() == ".png"

                img.save(
                    webp_path,
                    format="WEBP",
                    quality=QUALITY,
                    lossless=lossless,
                    method=6
                )

            img_path.unlink()  # delete original
            print(f"Replaced: {img_path} → {webp_path}")

        except Exception as e:
            print(f"Failed: {img_path} ({e})")
