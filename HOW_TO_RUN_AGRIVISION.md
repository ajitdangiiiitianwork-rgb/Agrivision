# 🌾 AgriVision — Zero-Configuration Quick Start Guide

Welcome to **AgriVision**! This guide explains how you and your friends can run the complete project with **zero manual configuration** by simply running `./start_all.bat`.

---

## ⚡ Super-Quick 1-Step Launch (Recommended)

1. **Extract** the downloaded `AgriVision_Complete_Project.zip` file.
2. **Open the extracted `AgriVision` folder** and double-click:
   ```cmd
   start_all.bat
   ```
3. **That's it!** `start_all.bat` automatically:
   - Verifies your Python installation (Python 3.10+).
   - Verifies all required dependencies (auto-installs if first run).
   - Starts the **ML Microservice** on `http://localhost:8000`.
   - Starts the **Flask Backend & SQLite Database** on `http://localhost:5000`.
   - Starts the **Frontend Interface** on `http://localhost:5173` (supports both Vite and zero-config Python SPA server).
   - Automatically opens your default browser directly to the dashboard!

---

## 📋 System Prerequisites

* **Python 3.10, 3.11, or 3.12** ([Download Python](https://www.python.org/downloads/))  
  *⚠️ Important:* During Python installation, make sure to check the box: **"Add python.exe to PATH"**.
* *(Optional)* **Node.js 18+** ([Download Node.js](https://nodejs.org/))  
  *Note:* Node.js is **optional** because the project includes a fully pre-compiled production build in `frontend/dist` with a built-in zero-config Python static server. If Node.js is present, Vite dev mode is automatically used!

---

## 🌐 Default Ports & Access Points

| Service | Port | Local URL | Description |
| :--- | :--- | :--- | :--- |
| **Frontend Web Dashboard** | `5173` | [http://localhost:5173](http://localhost:5173) | Interactive React + Tailwind UI |
| **Flask API Backend** | `5000` | [http://localhost:5000](http://localhost:5000) | SQLite DB, Agronomy Rules & Gemini |
| **ML Microservice** | `8000` | [http://localhost:8000](http://localhost:8000) | FastAPI & EfficientNet Disease Vision |

---

## 📊 Where is the Mandi Forecasting Dataset Stored?

The dataset used for training and forecasting APMC mandi prices is located at:
* **Dataset File:** [`ml/data/market_prices.csv`](file:///C:/CODING/AgriVision/ml/data/market_prices.csv)
  - **Total Records:** 11,466 verified historical records (2024 to 2026).
  - **Mandis Covered:** Major Maharashtra APMC markets including *Pune Gultekdi (Market Yard), Narayangaon, Chakan, Baramati, Manchar, Shirur, Saswad, and Daund*.
  - **Commodities:** *Tomato, Onion, Potato, Wheat, Soybean, Gram (Chana), Cotton, and Maize*.
  - **Attributes:** `date`, `state`, `district`, `market`, `commodity`, `variety`, `min_price`, `max_price`, `modal_price`.
* **Dataset Generator Script:** [`generate_market_dataset.py`](file:///C:/CODING/AgriVision/generate_market_dataset.py)
* **Runtime Market Engine:** [`backend/services/market_service.py`](file:///C:/CODING/AgriVision/backend/services/market_service.py) (implements APMC seasonal drift models, 7-day price forecasting, and cross-mandi price arbitrage recommendations).

---

## 🛠️ Manual Launch (For Linux / Mac Users)

If you are not on Windows or prefer running terminals manually:

### 1. Terminal 1 — ML Microservice
```bash
cd ml
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 2. Terminal 2 — Flask Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 3. Terminal 3 — Frontend Dashboard
```bash
cd frontend
# If using Node.js:
npm install && npm run dev
# OR if using Python without Node:
python serve_dist.py
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser!
