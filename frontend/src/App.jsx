import { useState } from 'react'
import './App.css'

// Use /api when served from backend (integrated), or VITE_API_URL for custom
const API_URL = import.meta.env.VITE_API_URL ?? '/api'

const initialForm = {
  district: '',
  N: 50,
  P: 50,
  K: 50,
  Zn: 10,
  Fe: 30,
  Mn: 20,
  B: 2,
  S: 20,
  ph: 6.5,
  temperature: 25,
  humidity: 70,
  rainfall: 100,
}

export default function App() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const base = API_URL.replace(/\/$/, '')
      const res = await fetch(`${base}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          N: Number(form.N),
          P: Number(form.P),
          K: Number(form.K),
          Zn: Number(form.Zn),
          Fe: Number(form.Fe),
          Mn: Number(form.Mn),
          B: Number(form.B),
          S: Number(form.S),
          ph: Number(form.ph),
          temperature: Number(form.temperature),
          humidity: Number(form.humidity),
          rainfall: Number(form.rainfall),
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        const msg = Array.isArray(err.detail)
          ? err.detail.map((d) => d.msg || JSON.stringify(d)).join(', ')
          : err.detail || `HTTP ${res.status}`
        throw new Error(msg)
      }

      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message || 'Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  const soilStatusColor = (status) => {
    switch (status) {
      case 'Excellent': return 'var(--soil-excellent)'
      case 'Good': return 'var(--soil-good)'
      case 'Moderate': return 'var(--soil-moderate)'
      case 'Poor': return 'var(--soil-poor)'
      default: return 'var(--text-muted)'
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>AgriSmart</h1>
        <p>Soil analysis & crop recommendations powered by ML</p>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <section className="form-section">
          <h2>Location</h2>
          <div className="field">
            <label>District</label>
            <input
              type="text"
              value={form.district}
              onChange={(e) => handleChange('district', e.target.value)}
              placeholder="e.g. Nashik"
              required
            />
          </div>
        </section>

        <section className="form-section">
          <h2>Macronutrients (kg/ha)</h2>
          <div className="grid">
            <div className="field">
              <label>N (Nitrogen)</label>
              <input
                type="number"
                step="0.1"
                value={form.N}
                onChange={(e) => handleChange('N', e.target.value)}
              />
            </div>
            <div className="field">
              <label>P (Phosphorus)</label>
              <input
                type="number"
                step="0.1"
                value={form.P}
                onChange={(e) => handleChange('P', e.target.value)}
              />
            </div>
            <div className="field">
              <label>K (Potassium)</label>
              <input
                type="number"
                step="0.1"
                value={form.K}
                onChange={(e) => handleChange('K', e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Micronutrients (ppm)</h2>
          <div className="grid grid-5">
            <div className="field">
              <label>Zn</label>
              <input
                type="number"
                step="0.1"
                value={form.Zn}
                onChange={(e) => handleChange('Zn', e.target.value)}
              />
            </div>
            <div className="field">
              <label>Fe</label>
              <input
                type="number"
                step="0.1"
                value={form.Fe}
                onChange={(e) => handleChange('Fe', e.target.value)}
              />
            </div>
            <div className="field">
              <label>Mn</label>
              <input
                type="number"
                step="0.1"
                value={form.Mn}
                onChange={(e) => handleChange('Mn', e.target.value)}
              />
            </div>
            <div className="field">
              <label>B</label>
              <input
                type="number"
                step="0.1"
                value={form.B}
                onChange={(e) => handleChange('B', e.target.value)}
              />
            </div>
            <div className="field">
              <label>S</label>
              <input
                type="number"
                step="0.1"
                value={form.S}
                onChange={(e) => handleChange('S', e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Environment</h2>
          <div className="grid">
            <div className="field">
              <label>pH</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="14"
                value={form.ph}
                onChange={(e) => handleChange('ph', e.target.value)}
              />
            </div>
            <div className="field">
              <label>Temperature (°C)</label>
              <input
                type="number"
                step="0.1"
                value={form.temperature}
                onChange={(e) => handleChange('temperature', e.target.value)}
              />
            </div>
            <div className="field">
              <label>Humidity (%)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={form.humidity}
                onChange={(e) => handleChange('humidity', e.target.value)}
              />
            </div>
            <div className="field">
              <label>Rainfall (mm)</label>
              <input
                type="number"
                step="0.1"
                value={form.rainfall}
                onChange={(e) => handleChange('rainfall', e.target.value)}
              />
            </div>
          </div>
        </section>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Soil & Get Recommendations'}
        </button>
      </form>

      {result && (
        <div className="results">
          <h2>Analysis Results</h2>

          <div className="card crop-card">
            <h3>Best Crop</h3>
            <div className="best-crop">{result.cropRecommendation.bestCrop}</div>
            <div className="confidence">
              {result.cropRecommendation.confidence}% confidence
            </div>
            <div className="top3">
              {result.cropRecommendation.top3Crops.map((c, i) => (
                <span key={i} className="chip">
                  {c.crop} ({c.confidence}%)
                </span>
              ))}
            </div>
          </div>

          <div className="cards-row">
            <div className="card">
              <h3>Yield Estimate</h3>
              <div className="big-value">
                {result.yieldPrediction.estimatedYield} <small>t/ha</small>
              </div>
            </div>
            <div className="card">
              <h3>Soil Health</h3>
              <div
                className="big-value"
                style={{ color: soilStatusColor(result.soilHealth.status) }}
              >
                {result.soilHealth.score}
              </div>
              <div
                className="status"
                style={{ color: soilStatusColor(result.soilHealth.status) }}
              >
                {result.soilHealth.status}
              </div>
            </div>
          </div>

          <div className="card fertilizer-card">
            <h3>Fertilizer Recommendations</h3>
            <ul>
              {result.fertilizerRecommendation.map((rec, i) => (
                <li key={i}>
                  {rec.nutrient && (
                    <>
                      <strong>{rec.nutrient}</strong>
                      {rec.deficiency != null && (
                        <span className="deficiency"> (deficit: {rec.deficiency})</span>
                      )}
                      : {rec.fertilizer} — {rec.suggested_dose}
                    </>
                  )}
                  {rec.message && <span>{rec.message}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
