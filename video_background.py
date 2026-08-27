import cv2
import numpy as np
import os

in_path = "media/milnor-demo.mp4"
out_dir = "media/milnor_frames_rgba"
os.makedirs(out_dir, exist_ok=True)

# How "black" is detected (increase if your blacks are slightly noisy)
THRESH = 10

cap = cv2.VideoCapture(in_path)
if not cap.isOpened():
    raise RuntimeError(f"Could not open {in_path}")

i = 0
while True:
    ok, bgr = cap.read()
    if not ok:
        break

    # Convert to RGB
    rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB).astype(np.uint8)

    # Build alpha from brightness:
    # black -> 0 alpha, white -> 255 alpha, grays in-between
    gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY).astype(np.uint8)

    # If you want "black pixels become transparent", alpha should follow brightness.
    alpha = gray.copy()

    # Optional: force near-black to fully transparent
    alpha = np.full(gray.shape, 255, dtype=np.uint8)  # fully opaque
    alpha[gray < THRESH] = 0.1                         # transparent near-black


    # RGBA
    rgba = np.dstack([rgb, alpha])  # shape (H,W,4)

    # Save as PNG (supports alpha)
    out_path = os.path.join(out_dir, f"frame_{i:06d}.png")
    cv2.imwrite(out_path, cv2.cvtColor(rgba, cv2.COLOR_RGBA2BGRA))
    i += 1

cap.release()
print(f"Wrote {i} frames to {out_dir}/")
