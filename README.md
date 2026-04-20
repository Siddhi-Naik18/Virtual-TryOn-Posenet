# 🧠 Virtual Try-On with Pose Detection

A browser-based virtual try-on system using **Pose Estimation**. This project overlays accessories (glasses, earrings) and clothing (t-shirt, pants) on a live webcam feed using AI-based body tracking.

---

## 🚀 Features

* 👓 Try on multiple glasses styles
* 💎 Add earrings dynamically
* 👕 Virtual t-shirt overlay
* 👖 Pants overlay using body segmentation
* 🎥 Real-time webcam tracking
* 🔄 Switch accessories with buttons

---

## 🛠️ Tech Stack

* **p5.js** – Canvas rendering & UI
* **ml5.js (BlazePose)** – Pose detection
* **TensorFlow.js**
* **BodyPix** – Body segmentation

---

## 📁 Project Structure

```
project-folder/
│── index.html
│── sketch.js
│── try.html
│── try.js
│── images/
│    ├── specs.png
│    ├── specs2.png
│    ├── earring.png
│    ├── tshirt.png
│    └── jeans.png
```

---

## ⚙️ How to Run

### Option 1: Live Server (Recommended)

1. Install VS Code
2. Install **Live Server extension**
3. Right-click `index.html`
4. Click **"Open with Live Server"**

---

### Option 2: Manual

Just open:

```
index.html
```

in your browser

⚠️ Camera access must be allowed

---

## 🧩 How It Works

### Pose Detection

* Uses BlazePose via ml5.js
* Detects key body points (eyes, shoulders, hips, ears)

### Accessory Placement

* Glasses:

  * Positioned between eyes
  * Rotated based on face angle
* Earrings:

  * Attached to ear keypoints

### Clothing Overlay

* Shirt:

  * Positioned between shoulders & hips
  * Rotates with body tilt
* Pants:

  * Based on hip positions

---

## 🔄 Controls

* **Next Glasses** → Switch glasses styles
* **Next Earring** → Switch earrings

---

## 📸 Demo Ideas

You can add screenshots or GIFs here later.

---

## ⚠️ Limitations

* Works best in good lighting
* Accuracy depends on camera quality
* Single-person tracking only

---

## 🌱 Future Improvements

* Multiple people support
* Better clothing fitting (mesh warping)
* Drag & drop outfit selection
* Mobile optimization

