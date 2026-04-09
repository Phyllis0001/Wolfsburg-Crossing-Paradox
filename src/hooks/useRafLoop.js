import { useEffect, useRef } from 'react'

// Runs `callback` every animation frame. callback is stored in a ref so it's
// always current — no stale-closure bugs. Safe to call from render body.
export function useRafLoop(callback) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    let rafId
    function loop() {
      callbackRef.current()
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [])
}
