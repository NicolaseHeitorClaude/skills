"""Amplia 2x com Real-ESRGAN (ONNX, CPU) em blocos e mistura com Lanczos para manter textura natural."""
import sys, numpy as np, onnxruntime as ort
from PIL import Image, ImageFilter
model, src, dst, mix = sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4])
so = ort.SessionOptions(); so.intra_op_num_threads = 0
sess = ort.InferenceSession(model, so, providers=["CPUExecutionProvider"])
im = Image.open(src).convert("RGB")
w, h = im.size
pw, ph = w + (w % 2), h + (h % 2)
a = np.asarray(im, dtype=np.float32) / 255.0
a = np.pad(a, ((0, ph - h), (0, pw - w), (0, 0)), mode="edge")
T, P = 256, 16
out = np.zeros((ph * 2, pw * 2, 3), np.float32)
for y in range(0, ph, T):
    for x in range(0, pw, T):
        y0, x0 = max(0, y - P), max(0, x - P)
        y1, x1 = min(ph, y + T + P), min(pw, x + T + P)
        tile = a[y0:y1, x0:x1].transpose(2, 0, 1)[None]
        r = sess.run(None, {"input": tile})[0][0].transpose(1, 2, 0)
        ty, tx = (y - y0) * 2, (x - x0) * 2
        th, tw = min(T, ph - y) * 2, min(T, pw - x) * 2
        out[y * 2:y * 2 + th, x * 2:x * 2 + tw] = r[ty:ty + th, tx:tx + tw]
out = np.clip(out[:h * 2, :w * 2], 0, 1)
sr = Image.fromarray((out * 255 + .5).astype(np.uint8))
lz = im.resize((w * 2, h * 2), Image.LANCZOS).filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
res = Image.blend(lz, sr, mix)
res.save(dst, quality=88, optimize=True, progressive=True)
print(dst, res.size)
