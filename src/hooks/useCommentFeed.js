import { useState, useEffect, useRef } from 'react'

export function useCommentFeed(comments, user, minDelay, maxDelay, seedText) {
  const [entries, setEntries] = useState(() =>
    seedText ? [{ id: 0, user, text: seedText, ts: Date.now() }] : []
  )
  const indexRef = useRef(0)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const tidRef = { current: null }

    function schedule() {
      tidRef.current = setTimeout(() => {
        const text = comments[indexRef.current++ % comments.length]
        setEntries(prev => [
          ...prev,
          { id: Date.now() + Math.random(), user, text, ts: Date.now() },
        ].slice(-6))
        schedule()
      }, minDelay + Math.random() * (maxDelay - minDelay))
    }

    schedule()
    return () => clearTimeout(tidRef.current)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Tick every 5s so timestamps re-render
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 5000)
    return () => clearInterval(interval)
  }, [])

  function ageOf(ts) {
    const age = Math.floor((Date.now() - ts) / 1000)
    return age < 60 ? `${age}s ago` : `${Math.floor(age / 60)}m ago`
  }

  return { entries, ageOf, tick }
}
