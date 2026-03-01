export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`
        rounded-2xl bg-white dark:bg-earth-800/50 
        border border-earth-200 dark:border-earth-700
        shadow-sm dark:shadow-none
        ${hover ? 'hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ icon: Icon, title, className = '' }) {
  return (
    <div className={`flex items-center gap-3 p-6 pb-0 ${className}`}>
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-sage-100 dark:bg-sage-900/50 flex items-center justify-center text-sage-600 dark:text-sage-400">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="font-semibold text-earth-800 dark:text-earth-100">{title}</h3>
    </div>
  )
}
