import { Sprout, Leaf, TrendingUp } from 'lucide-react'
import Button from '../components/Button'

export default function Home({ onNavigate }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-100/80 dark:from-sage-950/50 via-earth-50 dark:via-earth-950 to-sky-50/50 dark:to-earth-950" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Farmland illustration - layered field rows */}
          <svg className="absolute bottom-0 left-0 right-0 w-full h-2/3 opacity-20" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice">
            <defs>
              <linearGradient id="field1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2d6b20" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#4d8b3d" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="field2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5c4d36" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#7d6b4a" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x="0" y={250 + i * 35} width="1200" height="40" fill={`url(#field${i % 2 + 1})`} rx="4" />
            ))}
            <ellipse cx="200" cy="320" rx="80" ry="20" fill="url(#field1)" />
            <ellipse cx="900" cy="350" rx="120" ry="25" fill="url(#field2)" />
          </svg>
        </div>
        <div className="relative max-w-5xl mx-auto px-6 text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-100 dark:bg-sage-900/50 text-sage-700 dark:text-sage-300 text-sm font-medium mb-8">
            <Sprout className="w-4 h-4" /> ML-Powered Agriculture Analytics
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-earth-800 dark:text-earth-100 mb-6 leading-tight">
            Grow smarter with
            <span className="text-sage-600 dark:text-sage-400"> AgriSmart</span>
          </h1>
          <p className="text-xl text-earth-600 dark:text-earth-400 max-w-2xl mx-auto mb-12">
            Soil analysis, crop recommendations, and yield forecasts — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => onNavigate('analyze')}>
              Analyze Soil
            </Button>
            <Button variant="secondary" size="lg" onClick={() => onNavigate('predictions')}>
              Crop Prediction
            </Button>
            <Button variant="outline" size="lg" onClick={() => onNavigate('dashboard')}>
              Yield Forecast
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Leaf,
              title: 'Soil Analysis',
              desc: 'Upload or input soil data to get instant health insights and recommendations.',
              action: () => onNavigate('analyze'),
            },
            {
              icon: Sprout,
              title: 'Crop Recommendation',
              desc: 'ML-powered suggestions for the best crops based on your soil and climate.',
              action: () => onNavigate('predictions'),
            },
            {
              icon: TrendingUp,
              title: 'Yield Forecast',
              desc: 'Predict harvest yields and plan ahead with data-driven insights.',
              action: () => onNavigate('dashboard'),
            },
          ].map((f) => (
            <button
              key={f.title}
              onClick={f.action}
              className="group p-8 rounded-2xl bg-white dark:bg-earth-800/50 border border-earth-200 dark:border-earth-700 text-left hover:shadow-xl hover:border-sage-300 dark:hover:border-sage-700 transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-xl bg-sage-100 dark:bg-sage-900/50 flex items-center justify-center text-sage-600 dark:text-sage-400 mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-earth-800 dark:text-earth-100 text-lg mb-2">{f.title}</h3>
              <p className="text-earth-500 dark:text-earth-400 text-sm">{f.desc}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
