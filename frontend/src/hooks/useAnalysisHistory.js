import { useState, useEffect } from 'react'

const HISTORY_KEY = 'agrismart-analysis-history'
const CACHE_KEY = 'agrismart-analysis-results'

function loadHistory() {
  try {
    let raw = localStorage.getItem(HISTORY_KEY)
    let data = raw ? JSON.parse(raw) : []

    if (!Array.isArray(data)) data = []

    // Migrate: if history empty but we have cached result, backfill
    if (data.length === 0) {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        try {
          const { result, formInput, savedAt } = JSON.parse(cached)
          if (result) {
            data = [{ id: 'migrated', result, formInput, savedAt }]
            localStorage.setItem(HISTORY_KEY, JSON.stringify(data))
          }
        } catch {
          // ignore
        }
      }
    }

    return data
  } catch {
    return []
  }
}

export function useAnalysisHistory() {
  const [history, setHistory] = useState(() => loadHistory())

  useEffect(() => {
    setHistory(loadHistory())
    const onUpdate = () => setHistory(loadHistory())
    window.addEventListener('agrismart-history-updated', onUpdate)
    return () => window.removeEventListener('agrismart-history-updated', onUpdate)
  }, [])

  return { history, refresh: () => setHistory(loadHistory()) }
}
