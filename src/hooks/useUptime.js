import { useState, useEffect, useRef } from 'react'

export function useUptime(trustDelta) {
  const startTime = useRef(Date.now())
  const [uptime, setUptime] = useState('00:00')

  useEffect(() => {
    const interval = setInterval(() => {
      const s = Math.floor((Date.now() - startTime.current) / 1000)
      const mm = String(Math.floor(s / 60)).padStart(2, '0')
      const ss = String(s % 60).padStart(2, '0')
      setUptime(`${mm}:${ss}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const sign = trustDelta >= 0 ? '△' : '▽'
  const trustDisplay = `${sign} ${Math.abs(trustDelta).toFixed(1)}%`

  return { uptime, trustDisplay }
}
