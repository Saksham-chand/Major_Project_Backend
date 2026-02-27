# AgriSmart – Soil Analysis & Crop Recommendations

ML-powered agricultural analysis: crop recommendations, yield prediction, soil health, and fertilizer suggestions.

## Project Structure

```
├── app/              # FastAPI backend
│   ├── main.py       # API + serves frontend when built
│   ├── services.py   # ML predictions
│   ├── models/       # Trained models (crop, yield)
│   └── ...
├── frontend/         # React + Vite UI
├── train/            # Model training scripts
└── requirements.txt
```

## Quick Start (Integrated – single server)

```bash
pip3 install -r requirements.txt
cd frontend && npm install && cd ..
./run.sh
```

Opens **http://localhost:8000** – app and API from one server.

**macOS:** If you get `libomp.dylib` error, run: `brew install libomp`

## Development (separate servers)

**Terminal 1 – Backend:**
```bash
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 – Frontend:**
```bash
cd frontend && npm run dev
```

Open http://localhost:5173 (proxies `/api` to backend).

## Deployment

```bash
cd frontend && npm run build && cd ..
uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
```

Single process serves API + frontend. Set `VITE_API_URL` before building if the API lives on a different host.
