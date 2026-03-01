import { Sprout, FlaskConical } from 'lucide-react'
import Card from '../components/Card'

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-earth-800 dark:text-earth-100 mb-2">About AgriSmart</h1>
      <p className="text-earth-500 dark:text-earth-400 mb-8">ML-powered agriculture analytics</p>

      <Card className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-sage-100 dark:bg-sage-900/50 flex items-center justify-center">
            <Sprout className="w-8 h-8 text-sage-600 dark:text-sage-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-earth-800 dark:text-earth-100">AgriSmart</h2>
            <p className="text-earth-500 dark:text-earth-400">Soil Analysis & Crop Recommendations</p>
          </div>
        </div>
        <p className="text-earth-600 dark:text-earth-300 leading-relaxed mb-4">
          AgriSmart uses machine learning to analyze soil data and provide crop recommendations, 
          yield predictions, and fertilizer suggestions. Built with FastAPI and React.
        </p>
        <div className="flex items-center gap-2 text-sm text-earth-500 dark:text-earth-400">
          <FlaskConical className="w-4 h-4" />
          <span>API: /api/analyze · Swagger docs available</span>
        </div>
      </Card>
    </div>
  )
}
