import { useState } from 'react'
import { Sprout, Leaf, TrendingUp, BarChart3, FlaskConical, ChevronDown, ChevronUp, Calendar } from 'lucide-react'
import Card, { CardHeader } from '../components/Card'
import EmptyState from '../components/EmptyState'
import { useAnalysisHistory } from '../hooks/useAnalysisHistory'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatEntryLabel(savedAt) {
  const d = new Date(savedAt)
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`
}

function formatFullDate(savedAt) {
  const d = new Date(savedAt)
  return d.toLocaleDateString(undefined, { dateStyle: 'medium' })
}

export default function Dashboard({ onNavigate }) {
  const { history } = useAnalysisHistory()
  const [showHistory, setShowHistory] = useState(false)

  const latest = history.length > 0 ? history[history.length - 1] : null
  const latestResult = latest?.result

  // Build yield trend from history (last 12 entries, newest last)
  const yieldTrend = history
    .slice(-12)
    .map((e) => ({
      label: formatEntryLabel(e.savedAt),
      value: e.result?.yieldPrediction?.estimatedYield ?? 0,
    }))

  const fallback = {
    crop: { name: '—', confidence: 0 },
    soil: { score: 0, status: '—' },
    yield: { value: 0, unit: 't/ha' },
  }

  const crop = latestResult?.cropRecommendation ? { name: latestResult.cropRecommendation.bestCrop, confidence: latestResult.cropRecommendation.confidence } : fallback.crop
  const soil = latestResult?.soilHealth ?? fallback.soil
  const yieldVal = latestResult?.yieldPrediction ? { value: latestResult.yieldPrediction.estimatedYield, unit: 't/ha' } : fallback.yield

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-earth-800 dark:text-earth-100 mb-2">Dashboard</h1>
      <p className="text-earth-500 dark:text-earth-400 mb-8">Overview of your agriculture analytics</p>

      {history.length === 0 && (
        <Card className="mb-8 p-8">
          <EmptyState
            icon={FlaskConical}
            title="No analyses yet"
            description="Run a soil analysis to see your crop recommendations, yield forecast, and historical trends here."
          />
          {onNavigate && (
            <button
              onClick={() => onNavigate('analyze')}
              className="mt-4 mx-auto block px-6 py-3 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-semibold transition-colors"
            >
              Run Analysis
            </button>
          )}
        </Card>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card hover className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-sage-100 dark:bg-sage-900/50 flex items-center justify-center text-sage-600 dark:text-sage-400">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-earth-800 dark:text-earth-100">Crop Prediction</h3>
          </div>
          <p className="text-2xl font-bold text-earth-800 dark:text-earth-100 capitalize">{crop.name}</p>
          <p className="text-sm text-sage-600 dark:text-sage-400">{(crop.confidence ?? 0)}% match</p>
        </Card>

        <Card hover className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-earth-800 dark:text-earth-100">Soil Health</h3>
          </div>
          <p className="text-2xl font-bold text-earth-800 dark:text-earth-100">{soil.score}</p>
          <p className="text-sm text-amber-600 dark:text-amber-400">{soil.status}</p>
        </Card>

        <Card hover className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-earth-800 dark:text-earth-100">Yield Forecast</h3>
          </div>
          <p className="text-2xl font-bold text-earth-800 dark:text-earth-100">{yieldVal.value}</p>
          <p className="text-sm text-sky-600 dark:text-sky-400">t/ha</p>
        </Card>

        <button
          type="button"
          onClick={() => setShowHistory((v) => !v)}
          className="text-left"
        >
          <Card hover className="p-6 cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-earth-100 dark:bg-earth-700 flex items-center justify-center text-earth-600 dark:text-earth-400">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-earth-800 dark:text-earth-100">Historical Data</h3>
              <span className="ml-auto">{showHistory ? <ChevronUp className="w-5 h-5 text-earth-500" /> : <ChevronDown className="w-5 h-5 text-earth-500" />}</span>
            </div>
            <p className="text-2xl font-bold text-earth-800 dark:text-earth-100">{history.length}</p>
            <p className="text-sm text-earth-500 dark:text-earth-400">analyses saved · {showHistory ? 'Hide' : 'Click to view'}</p>
          </Card>
        </button>
      </div>

      {showHistory && (
        <Card className="mb-10 overflow-hidden">
          <CardHeader icon={Calendar} title="Past Analyses" />
          <div className="p-6 pt-0">
            {history.length === 0 ? (
              <EmptyState
                icon={BarChart3}
                title="No past analyses"
                description="Run a soil analysis to build your history."
              />
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {[...history].reverse().map((entry) => (
                  <div
                    key={entry.id}
                    className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-earth-50 dark:bg-earth-800/50 border border-earth-200 dark:border-earth-700"
                  >
                    <span className="text-sm font-medium text-earth-600 dark:text-earth-400 whitespace-nowrap">
                      {formatFullDate(entry.savedAt)}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-sage-100 dark:bg-sage-900/50 text-sage-700 dark:text-sage-300 text-sm font-medium capitalize">
                      {entry.result?.cropRecommendation?.bestCrop ?? '—'}
                    </span>
                    <span className="text-earth-500 dark:text-earth-400 text-sm">
                      Yield: <strong className="text-earth-700 dark:text-earth-200">{entry.result?.yieldPrediction?.estimatedYield ?? '—'} t/ha</strong>
                    </span>
                    <span className="text-earth-500 dark:text-earth-400 text-sm">
                      Soil: <strong className="text-earth-700 dark:text-earth-200">{entry.result?.soilHealth?.score ?? '—'}</strong> ({entry.result?.soilHealth?.status ?? '—'})
                    </span>
                    {entry.formInput?.district && (
                      <span className="text-earth-500 dark:text-earth-400 text-sm ml-auto">
                        {entry.formInput.district}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}

      <Card className="p-6">
        <CardHeader icon={BarChart3} title="Yield Trend" />
        <div className="p-6 pt-4">
          {yieldTrend.length > 0 ? (
            <div className="flex items-end gap-2 h-40 overflow-x-auto pb-2">
              {yieldTrend.map((d, i) => (
                <div key={i} className="flex-1 min-w-[48px] flex flex-col items-center" title={`${d.label}: ${d.value} t/ha`}>
                  <div
                    className="w-full rounded-t-lg bg-sage-200 dark:bg-sage-700 min-h-[8px] transition-all hover:bg-sage-400"
                    style={{ height: `${Math.max(8, ((d.value || 0) / Math.max(...yieldTrend.map((x) => x.value || 0), 0.1)) * 80)}%` }}
                  />
                  <span className="text-xs text-earth-500 dark:text-earth-400 mt-2 truncate w-full text-center">{d.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={BarChart3}
              title="No yield data yet"
              description="Run soil analyses to build your yield trend chart."
            />
          )}
        </div>
      </Card>
    </div>
  )
}
