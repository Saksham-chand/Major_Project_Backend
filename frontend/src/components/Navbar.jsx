import { Sprout, Home, FlaskConical, TrendingUp, Info, Sun, Moon, CloudOff } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useOnlineStatus } from '../hooks/useOnlineStatus'

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
  { id: 'analyze', label: 'Analyze', icon: FlaskConical },
  { id: 'predictions', label: 'Predictions', icon: TrendingUp },
  { id: 'about', label: 'About', icon: Info },
]

export default function Navbar({ currentPage, onNavigate, mobile }) {
  const { dark, toggle } = useTheme()
  const isOnline = useOnlineStatus()

  if (mobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-earth-900/95 backdrop-blur-lg border-t border-earth-200 dark:border-earth-700 safe-area-pb">
        <div className="flex items-center justify-around py-2 px-2 max-w-lg mx-auto gap-1">
          {!isOnline && (
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200">
              <CloudOff className="w-3 h-3" /> Offline
            </span>
          )}
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                flex flex-col items-center gap-1 px-4 py-2 rounded-xl min-w-[64px]
                ${currentPage === item.id ? 'text-sage-600 dark:text-sage-400' : 'text-earth-500 dark:text-earth-500'}
              `}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-earth-900/80 backdrop-blur-xl border-b border-earth-200 dark:border-earth-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 gap-4">
        <div className="flex items-center gap-3">
          {!isOnline && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200">
              <CloudOff className="w-3.5 h-3.5" /> Offline
            </span>
          )}
          <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-sage-500 flex items-center justify-center">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-earth-800 dark:text-earth-100">AgriSmart</span>
          </div>
        </div>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                transition-colors hidden sm:flex
                ${currentPage === item.id
                  ? 'bg-sage-100 dark:bg-sage-900/50 text-sage-700 dark:text-sage-300'
                  : 'text-earth-600 dark:text-earth-400 hover:bg-earth-100 dark:hover:bg-earth-800'}
              `}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={toggle}
          className="p-2.5 rounded-xl hover:bg-earth-100 dark:hover:bg-earth-800 transition-colors"
          aria-label="Toggle theme"
        >
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  )
}
