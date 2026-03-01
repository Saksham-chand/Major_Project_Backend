export default function LoadingSpinner({ size = 'md' }) {
  const sizes = { sm: 'w-6 h-6', md: 'w-12 h-12', lg: 'w-16 h-16' }
  return (
    <div className={`${sizes[size]} border-4 border-sage-200 dark:border-sage-800 border-t-sage-600 rounded-full animate-spin`} />
  )
}
