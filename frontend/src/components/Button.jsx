export default function Button({ children, variant = 'primary', size = 'md', className = '', disabled, ...props }) {
  const base = 'font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-sage-600 hover:bg-sage-700 text-white shadow-lg shadow-sage-500/25 hover:shadow-sage-600/30',
    secondary: 'bg-earth-100 dark:bg-earth-700/50 hover:bg-earth-200 dark:hover:bg-earth-600 text-earth-800 dark:text-earth-100',
    outline: 'border-2 border-sage-500 text-sage-600 dark:text-sage-400 hover:bg-sage-50 dark:hover:bg-sage-900/30',
    ghost: 'text-earth-600 dark:text-earth-300 hover:bg-earth-100 dark:hover:bg-earth-800',
  }
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
