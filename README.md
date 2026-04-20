# 🧠 Virtual Try-On with Pose Detection & Segmentation

A browser-based virtual try-on system that explores **two different approaches** to body tracking:

* 🎯 **Pose Estimation (ml5.js / BlazePose)** for accessories
* 🧩 **Body Segmentation (TensorFlow BodyPix)** for clothing

This project demonstrates how different computer vision techniques can be used for real-time augmented reality in the browser.

---

## 🚀 Features

### 👓 Face Accessories (Pose-Based)

* Try on multiple glasses styles
* Add earrings dynamically
* Real-time face tracking
* Rotation-aware placement

### 👕 Virtual Try-On (Segmentation-Based)

* Overlay t-shirts and pants
* Uses body segmentation for placement
* Works on full body (upper + lower)

### 🎥 General

* Live webcam integration
* Runs fully in browser (no backend)

---

## 🛠️ Tech Stack

* **p5.js** – Canvas rendering & interaction
* **ml5.js (BlazePose)** – Pose estimation
* **TensorFlow.js** – ML runtime
* **BodyPix** – Body segmentation model

---

## 📁 Project Structure

```plaintext
POSENET/
│── README.md
│
├── face-accessories/          # Pose-based (ml5)
│   ├── index.html
│   ├── sketch.js
│   └── images/
│       ├── specs.png
│       ├── specs2.png
│       ├── specs3.png
│       ├── specs4.png
│       ├── earring.png
│       ├── earring1.png
│       └── earring2.png
│
├── virtual-tryon/             # BodyPix-based
│   ├── try.html
│   ├── try.js
│   └── images/
│       ├── tshirt.png
│       ├── tshirt2.png
│       └── jeans.png
```

---

## 🧪 Implementations

### 1️⃣ Pose Estimation (ml5 / BlazePose)

📂 Path: `face-accessories/index.html`

* Detects key facial points (eyes, ears)
* Places glasses and earrings using coordinates
* Lightweight and fast

---

### 2️⃣ Body Segmentation (BodyPix)

📂 Path: `virtual-tryon/try.html`

* Segments the human body from background
* Uses shoulder & hip positions for clothing placement
* More advanced, but heavier than pose estimation

---

## ⚙️ How to Run

### ✅ Option 1: Live Server (Recommended)

1. Open project in VS Code
2. Install **Live Server extension**
3. Run either:

   * `face-accessories/index.html`
   * `virtual-tryon/try.html`

---

### ✅ Option 2: Open Manually

Open in browser:

```plaintext
face-accessories/index.html
```

or

```plaintext
virtual-tryon/try.html
```

⚠️ Make sure to allow **camera permissions**

---

## 🧩 How It Works

### Pose-Based Approach

* Uses keypoints like:

  * eyes → glasses placement
  * ears → earrings placement
* Calculates:

  * distance → scaling
  * angle → rotation

---

### Segmentation-Based Approach

* Uses BodyPix to detect body regions
* Extracts:

  * shoulders
  * hips
* Overlays clothing based on bounding positions

---

## 🔄 Controls

### Face Accessories

* **Next Glasses** → Switch styles
* **Next Earring** → Switch styles

---

## ⚠️ Limitations

* Works best with good lighting
* Accuracy depends on camera quality
* Single-person detection only
* Clothing overlay is approximate (no cloth physics)

---

## 🌱 Future Improvements

* Merge both systems into a single UI
* Improve clothing fit using mesh warping
* Add outfit selection panel
* Mobile optimization
* Multi-person tracking

---

