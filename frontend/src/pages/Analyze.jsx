import { useState } from 'react'
import { Leaf, Droplets, Thermometer, CloudOff } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import LoadingSpinner from '../components/LoadingSpinner'
import { useOfflineResults } from '../hooks/useOfflineResults'

const API_URL = import.meta.env.VITE_API_URL ?? '/api'

const initialForm = {
  district: '',
  N: 50, P: 50, K: 50,
  Zn: 10, Fe: 30, Mn: 20, B: 2, S: 20,
  ph: 6.5, temperature: 25, humidity: 70, rainfall: 100,
}

export default function Analyze() {
  const { isOnline, cached, cachedAt, persist } = useOfflineResults()
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  // Prefer fresh result; when offline, fall back to cached
  const displayResult = result ?? (isOnline ? null : cached)
  const isCached = !result && cached && !isOnline

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
          N: Number(form.N), P: Number(form.P), K: Number(form.K),
          Zn: Number(form.Zn), Fe: Number(form.Fe), Mn: Number(form.Mn),
          B: Number(form.B), S: Number(form.S),
          ph: Number(form.ph), temperature: Number(form.temperature),
          humidity: Number(form.humidity), rainfall: Number(form.rainfall),
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
      persist(data, form)
    } catch (err) {
      if (!isOnline) setError(cached ? 'You’re offline. Showing last saved results below.' : 'You’re offline. Connect to run a new analysis.')
      else setError(err.message || 'Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  const soilColor = (s) => ({ Excellent: 'text-emerald-600', Good: 'text-sage-600', Moderate: 'text-amber-600', Poor: 'text-red-600' }[s] || 'text-earth-500')

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-earth-800 dark:text-earth-100 mb-2">Soil Analysis</h1>
      <p className="text-earth-500 dark:text-earth-400 mb-8">Enter soil data to get crop recommendations and insights</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h2 className="font-semibold text-earth-800 dark:text-earth-100 mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-sage-600" /> Location
          </h2>
          <FormInput label="District" value={form.district} onChange={(v) => handleChange('district', v)} placeholder="e.g. Dehradun" required />
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold text-earth-800 dark:text-earth-100 mb-4 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-sage-600" /> Macronutrients (kg/ha)
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {['N', 'P', 'K'].map((f) => (
              <FormInput key={f} label={f} type="number" step="0.1" value={form[f]} onChange={(v) => handleChange(f, v)} />
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold text-earth-800 dark:text-earth-100 mb-4">Micronutrients (ppm)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {['Zn', 'Fe', 'Mn', 'B', 'S'].map((f) => (
              <FormInput key={f} label={f} type="number" step="0.1" value={form[f]} onChange={(v) => handleChange(f, v)} />
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold text-earth-800 dark:text-earth-100 mb-4 flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-sage-600" /> Environment
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <FormInput label="pH" type="number" step="0.1" min="0" max="14" value={form.ph} onChange={(v) => handleChange('ph', v)} />
            <FormInput label="Temp (°C)" type="number" step="0.1" value={form.temperature} onChange={(v) => handleChange('temperature', v)} />
            <FormInput label="Humidity (%)" type="number" step="0.1" min="0" max="100" value={form.humidity} onChange={(v) => handleChange('humidity', v)} />
            <FormInput label="Rainfall (mm)" type="number" step="0.1" value={form.rainfall} onChange={(v) => handleChange('rainfall', v)} />
          </div>
        </Card>

        {error && (
          <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" disabled={loading} className="w-full">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <LoadingSpinner size="sm" /> Analyzing...
            </span>
          ) : (
            'Analyze Soil & Get Recommendations'
          )}
        </Button>
      </form>

      {displayResult && (
        <div className="mt-12 space-y-6 animate-in fade-in duration-500">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-semibold text-earth-800 dark:text-earth-100">Results</h2>
            {isCached && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800">
                <CloudOff className="w-4 h-4" /> Sync later
              </span>
            )}
          </div>

          <Card className={`p-6 border-l-4 ${isCached ? 'border-l-amber-500' : 'border-l-sage-500'}`}>
            <h3 className="text-sm font-medium text-earth-500 dark:text-earth-400 mb-1">Recommended Crop</h3>
            <p className="text-2xl font-bold text-sage-600 dark:text-sage-400 capitalize">{displayResult.cropRecommendation.bestCrop}</p>
            <p className="text-earth-500 dark:text-earth-400 text-sm mt-1">Confidence: {displayResult.cropRecommendation.confidence}%</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {displayResult.cropRecommendation.top3Crops.map((c, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-earth-100 dark:bg-earth-700 text-earth-600 dark:text-earth-300 text-sm capitalize">
                  {c.crop} ({c.confidence}%)
                </span>
              ))}
            </div>
          </Card>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="text-sm font-medium text-earth-500 dark:text-earth-400 mb-1">Expected Yield</h3>
              <p className="text-2xl font-bold text-earth-800 dark:text-earth-100">{displayResult.yieldPrediction.estimatedYield} <span className="text-base font-normal text-earth-500">t/ha</span></p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-earth-500 dark:text-earth-400 mb-1">Soil Health</h3>
              <p className={`text-2xl font-bold ${soilColor(displayResult.soilHealth.status)}`}>{displayResult.soilHealth.score}</p>
              <p className={`text-sm font-medium mt-1 ${soilColor(displayResult.soilHealth.status)}`}>{displayResult.soilHealth.status}</p>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-earth-500 dark:text-earth-400 mb-3">Fertilizer Suggestions</h3>
            <ul className="space-y-2">
              {displayResult.fertilizerRecommendation.map((rec, i) => (
                <li key={i} className="text-earth-700 dark:text-earth-300 text-sm">
                  {rec.nutrient && (
                    <><strong>{rec.nutrient}</strong>{rec.deficiency != null && <span className="text-earth-500"> (deficit: {rec.deficiency})</span>}: {rec.fertilizer} — {rec.suggested_dose}</>
                  )}
                  {rec.message && <span>{rec.message}</span>}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  )
}
