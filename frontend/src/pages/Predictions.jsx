import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Sprout, TrendingUp } from 'lucide-react'
import Card from '../components/Card'

const CROP_DATA = [
  { crop: 'Rice', confidence: 82 },
  { crop: 'Wheat', confidence: 65 },
  { crop: 'Maize', confidence: 58 },
  { crop: 'Cotton', confidence: 42 },
  { crop: 'Sugarcane', confidence: 35 },
]

const YIELD_DATA = [
  { month: 'Jan', yield: 3.1 },
  { month: 'Feb', yield: 3.4 },
  { month: 'Mar', yield: 3.8 },
  { month: 'Apr', yield: 4.0 },
  { month: 'May', yield: 4.2 },
  { month: 'Jun', yield: 4.1 },
  { month: 'Jul', yield: 3.9 },
  { month: 'Aug', yield: 3.7 },
]

export default function Predictions() {
  const [tab, setTab] = useState('crop')

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-earth-800 dark:text-earth-100 mb-2">Predictions</h1>
      <p className="text-earth-500 dark:text-earth-400 mb-8">Crop recommendations and yield forecasts</p>

      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setTab('crop')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors ${tab === 'crop' ? 'bg-sage-600 text-white' : 'bg-earth-100 dark:bg-earth-800 text-earth-600 dark:text-earth-400 hover:bg-earth-200 dark:hover:bg-earth-700'}`}
        >
          <Sprout className="w-4 h-4" /> Crop Recommendation
        </button>
        <button
          onClick={() => setTab('yield')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors ${tab === 'yield' ? 'bg-sage-600 text-white' : 'bg-earth-100 dark:bg-earth-800 text-earth-600 dark:text-earth-400 hover:bg-earth-200 dark:hover:bg-earth-700'}`}
        >
          <TrendingUp className="w-4 h-4" /> Yield Prediction
        </button>
      </div>

      {tab === 'crop' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-earth-800 dark:text-earth-100 mb-4">Top Crop Matches</h3>
            <div className="space-y-3">
              {CROP_DATA.map((row, i) => (
                <div key={row.crop} className="flex items-center gap-4">
                  <span className="w-8 text-earth-500 dark:text-earth-400 text-sm">{i + 1}</span>
                  <span className="flex-1 font-medium text-earth-800 dark:text-earth-100 capitalize">{row.crop}</span>
                  <div className="flex-1 max-w-[200px]">
                    <div className="h-3 rounded-full bg-earth-200 dark:bg-earth-700 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-sage-500 transition-all duration-500"
                        style={{ width: `${row.confidence}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-12 text-right text-sage-600 dark:text-sage-400 font-medium">{row.confidence}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'yield' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-earth-800 dark:text-earth-100 mb-6">Expected Yield vs Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={YIELD_DATA}>
                  <defs>
                    <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2d6b20" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#2d6b20" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-earth-200 dark:stroke-earth-700" />
                  <XAxis dataKey="month" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-earth-500" />
                  <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} className="text-earth-500" />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid var(--color-earth-200)' }}
                    formatter={(v) => [`${v} t/ha`, 'Yield']}
                    labelFormatter={(l) => l}
                  />
                  <Area type="monotone" dataKey="yield" stroke="#2d6b20" strokeWidth={2} fill="url(#yieldGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
