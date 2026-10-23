# 🌱 AgriVision

AgriVision is a full-stack smart farming solution built for **Smart India Hackathon 2025**.  
It provides farmers with tools for **field management, crop/disease detection, market prices, and advisory** through an intuitive **React + Vite frontend** and a **Flask backend**.

---

## 📂 Project Structure

```text
AgriVision/
│
├── agrivision-backend/        # Flask backend
│   ├── blueprints/            # Modular route handlers (auth, fields, markets, weather, etc.)
│   ├── services/              # Service layer for APIs/ML models
│   ├── app.py                 # Flask entry point
│   ├── config.py              # Config (CORS, DB, API keys)
│   ├── db.py                  # SQLAlchemy DB connection
│   ├── models.py              # Database models
│   └── requirements.txt       # Python dependencies
│
├── agrivision-frontend/       # React + Vite frontend
│   ├── src/                   # Components, pages, hooks
│   ├── vite.config.js         # Dev server + API proxy
│   └── package.json           # Frontend dependencies
│
└── README.md                  # Project documentation

---

## 🚀 Features

- **Authentication**
  - Register with name/email/phone/village
  - OTP-based login (demo OTP printed in backend console)

- **Field Management**
  - Add and view fields with soil type, irrigation, and village info

- **Crop & Disease Detection**
  - Image upload with ML prediction (backend service)

- **Market Prices & Recommendations**
  - Real-time prices, crop suggestions based on soil/weather

- **Weather Advisory**
  - Hyper-local weather data integration

- **Dashboard UI**
  - Modern React + Tailwind + Vite frontend
  - Dark/Light theme toggle
  - Multilingual support

---

## 🛠️ Tech Stack

**Frontend**
- React + Vite
- React Router
- Tailwind CSS
- ShadCN UI + Lucide icons

**Backend**
- Python 3.11+
- Flask
- Flask-CORS
- SQLAlchemy + SQLite
- Modular Blueprints
- Optional: AI/ML microservices (FastAPI, Torch, etc.)

---

## ⚙️ Setup & Installation

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/AgriVision.git
cd AgriVision
2. Backend (Flask)
bash
Copy code
cd backend
python -m venv .venv
# activate venv
.venv\Scripts\activate


pip install -r requirements.txt
Run backend:

bash
Copy code
python app.py
Backend runs at: http://127.0.0.1:5000

Backend Environment
Create .env in agrivision-backend/:

env
Copy code
FLASK_ENV=development
SECRET_KEY=supersecret
CORS_ORIGINS=http://localhost:5173
3. Frontend (React + Vite)
bash
Copy code
cd agrivision-frontend
npm install
Run frontend:

bash
Copy code
npm run dev
Frontend runs at: http://localhost:5173

Frontend Environment
Create .env in agrivision-frontend/:

env
Copy code
# Option A — use direct backend
VITE_API_URL=http://127.0.0.1:5000

# Option B — use proxy (recommended)
# configured in vite.config.js

cd agrivision-frontend
npm install

npm run dev


Create .env in agrivision-frontend/:

VITE_API_URL=http://127.0.0.1:5000


ml-service/
├─ app/
│  ├─ main.py                  # FastAPI app
│  ├─ routes_crop.py           # /predict/crops, /train/crops
│  ├─ routes_disease.py        # /predict/disease, /train/disease
│  ├─ schemas.py               # Pydantic request/response models
│  ├─ deps_market.py           # market price loader/cache
│  ├─ utils_preprocess.py      # soil/weather preprocessing
│  ├─ model_registry.py        # load/save/version models
│  └─ settings.py              # env config
├─ models/
│  ├─ crop_reco_v1.joblib      # sklearn/xgboost pipeline
│  ├─ crop_meta.json           # label list, feature config
│  └─ disease_efficientnet_v1.keras
├─ data/
│  ├─ soil_readings.csv
│  ├─ weather_daily.csv
│  ├─ crop_history.csv
│  ├─ yields.csv               # historical yield by crop/field/date
│  └─ market_prices.csv        # date, crop, mandi/state, modal
├─ training/
│  ├─ train_crop.py
│  └─ train_disease.py
├─ requirements.txt
└─ Dockerfile

cd ml
python -m venv .venv
# On Windows PowerShell
.\.venv\Scripts\Activate.ps1
# On Linux/Mac
source .venv/bin/activate

pip install -r requirements.txt

# from project root (AgriVision/)
uvicorn ml.app.main:app --reload --port 8001
