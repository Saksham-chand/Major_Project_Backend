import { useState, useEffect } from 'react'
import { useOnlineStatus } from './useOnlineStatus'

const STORAGE_KEY = 'agrismart-analysis-results'
const HISTORY_KEY = 'agrismart-analysis-history'
const MAX_HISTORY = 50

function loadCached() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    return data.result ? { ...data, result: data.result } : null
  } catch {
    return null
  }
}

function appendToHistory(result, formInput) {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    const list = raw ? JSON.parse(raw) : []
    list.push({
      id: crypto.randomUUID?.() ?? Date.now().toString(),
      result,
      formInput,
      savedAt: new Date().toISOString(),
    })
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(-MAX_HISTORY)))
    window.dispatchEvent(new CustomEvent('agrismart-history-updated'))
  } catch {
    // ignore
  }
}

function saveCached(result, formInput) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      result,
      formInput,
      savedAt: new Date().toISOString(),
    }))
    appendToHistory(result, formInput)
  } catch {
    // ignore quota / private mode
  }
}

export function useOfflineResults() {
  const isOnline = useOnlineStatus()
  const [cached, setCached] = useState(null)

  useEffect(() => {
    setCached(loadCached())
  }, [])

  const persist = (result, formInput) => {
    saveCached(result, formInput)
    setCached(loadCached())
  }

  return { isOnline, cached: cached?.result, cachedAt: cached?.savedAt, persist }
}
