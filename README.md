Create a modern standalone React UI for an agriculture-based suggestion app called "AgriSmart".

Requirements:
- Use Tailwind CSS
- Clean, minimal, modern design
- Earthy color palette (green, brown, beige)
- Mobile responsive

Main Sections:
1. Top Navbar with logo and weather info
2. Sidebar with:
   - Dashboard
   - Crop Recommendation
   - Soil Analysis
   - Weather Forecast
   - Market Prices
3. Main Dashboard showing:
   - Weather card
   - Soil health card
   - Crop suggestion card
   - Market price trends (chart)
4. Use cards with soft shadows and rounded corners
5. Include icons from lucide-react
6. Use dummy data
7. Make it a single file React component

Design vibe: Clean AgriTech startup UI# AgriSmart – Soil Analysis & Crop Recommendations

ML-powered agricultural analysis: crop recommendations, yield prediction, soil health, and fertilizer suggestions.

**Backend and frontend are integrated** – a single server serves both the React UI and the FastAPI API.

## Project Structure

```
├── app/              # FastAPI backend (API + serves built frontend)
│   ├── main.py       # API endpoints + static file serving
│   ├── services.py   # ML predictions (crop, yield)
│   ├── models/       # Trained models
│   └── ...
├── frontend/         # React + Vite UI (built into dist/, served by backend)
├── train/            # Model training scripts
├── run.sh            # Build frontend + start integrated server
└── requirements.txt
```

## Quick Start

```bash
pip3 install -r requirements.txt
cd frontend && npm install && cd ..
./run.sh
```

Open **http://localhost:8000** – the app and API run from one server.

**macOS:** If you get `libomp.dylib` error, run: `brew install libomp`

| URL | Description |
|-----|-------------|
| http://localhost:8000 | App (React UI) |
| http://localhost:8000/api/analyze | Analysis API |
| http://localhost:8000/docs | Swagger API docs |

## Development Mode (hot reload)

Run backend and frontend separately for faster iteration:

**Terminal 1 – Backend:**
```bash
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 – Frontend:**
```bash
cd frontend && npm run dev
```

Open http://localhost:5173 (Vite proxies `/api` to backend).

## Deployment

```bash
cd frontend && npm run build && cd ..
uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
```

One process serves both the UI and API. Set `VITE_API_URL` before building only if the API is on a different host.
