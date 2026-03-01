import { Sprout } from 'lucide-react'

export default function EmptyState({ icon: Icon = Sprout, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-earth-100 dark:bg-earth-800 flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-earth-400 dark:text-earth-500" />
      </div>
      <h3 className="font-semibold text-earth-800 dark:text-earth-200 text-lg mb-2">{title}</h3>
      <p className="text-earth-500 dark:text-earth-400 max-w-sm">{description}</p>
    </div>
  )
}
