import { useState, useRef, useEffect, useCallback } from 'react'
import { ZONES } from '../data/zones'
import { PATHS, DOT_CFGS, buildMeta, pathPos } from '../data/paths'
import { useRafLoop } from './useRafLoop'

const LERP = 0.038

export function useSimulation() {
  const initialStates = ['blue', 'red', 'blue', 'blue', 'red']

  const [zoneStates, setZoneStates] = useState(initialStates)
  const zoneStatesRef = useRef(initialStates)

  const [cycle, setCycle] = useState(0)
  const [fixes, setFixes] = useState(0)
  const [entropyEvents, setEntropyEvents] = useState(0)
  const [trustDelta, setTrustDelta] = useState(0)

  // Drone: mutable ref for lerp math; state for React rendering
  const droneRef = useRef({
    targetIdx: 1,
    targetX: ZONES[1].cx,
    targetY: ZONES[1].cy,
    curX: ZONES[1].cx,
    curY: ZONES[1].cy,
    moving: false,
  })
  const [dronePos, setDronePos] = useState({ x: ZONES[1].cx, y: ZONES[1].cy })

  // Traffic dots: mutable ref for animation math; state for rendering
  const dotsRef = useRef(
    DOT_CFGS.map(cfg => {
      const pts = PATHS[cfg.p]
      const meta = buildMeta(pts)
      const sp = pathPos(pts, meta, cfg.t)
      return { pts, meta, t: cfg.t, dir: cfg.s > 0 ? 1 : -1, speed: Math.abs(cfg.s), x: sp.x, y: sp.y, type: cfg.type }
    })
  )
  const [dotPositions, setDotPositions] = useState(() =>
    dotsRef.current.map(d => ({ x: d.x, y: d.y, type: d.type }))
  )

  // RAF step: lerp drone + advance traffic dots each frame
  const rafStep = useCallback(() => {
    const drone = droneRef.current

    drone.curX += (drone.targetX - drone.curX) * LERP
    drone.curY += (drone.targetY - drone.curY) * LERP

    if (drone.moving && Math.hypot(drone.targetX - drone.curX, drone.targetY - drone.curY) < 1.5) {
      drone.moving = false
    }

    setDronePos({ x: drone.curX, y: drone.curY })

    dotsRef.current.forEach(d => {
      d.t += d.speed * d.dir
      if (d.t >= 1) { d.t = 1; d.dir = -1 }
      else if (d.t <= 0) { d.t = 0; d.dir = 1 }
      const p = pathPos(d.pts, d.meta, d.t)
      d.x = p.x
      d.y = p.y
    })

    setDotPositions(dotsRef.current.map(d => ({ x: d.x, y: d.y, type: d.type })))
  }, [])

  useRafLoop(rafStep)

  // Entropy tick loop: drone flies to red zones and fixes them
  useEffect(() => {
    const tidRef = { current: null }

    function nearestRed(fromIdx) {
      const f = ZONES[fromIdx]
      let best = -1, bd = Infinity
      zoneStatesRef.current.forEach((s, i) => {
        if (s !== 'red') return
        const d = Math.hypot(ZONES[i].cx - f.cx, ZONES[i].cy - f.cy)
        if (d < bd) { bd = d; best = i }
      })
      return best
    }

    function randomBlue(exc) {
      const pool = zoneStatesRef.current
        .map((s, i) => (s === 'blue' && i !== exc) ? i : -1)
        .filter(i => i !== -1)
      return pool.length ? pool[Math.floor(Math.random() * pool.length)] : -1
    }

    function waitArrival(cb) {
      if (!droneRef.current.moving) { cb(); return }
      tidRef.current = setTimeout(() => waitArrival(cb), 120)
    }

    function tick() {
      const target = nearestRed(droneRef.current.targetIdx)

      if (target === -1) {
        const r = Math.floor(Math.random() * ZONES.length)
        const ns = [...zoneStatesRef.current]
        ns[r] = 'red'
        zoneStatesRef.current = ns
        setZoneStates([...ns])
        setEntropyEvents(e => e + 1)
        tidRef.current = setTimeout(tick, 1300)
        return
      }

      droneRef.current.targetIdx = target
      droneRef.current.targetX = ZONES[target].cx
      droneRef.current.targetY = ZONES[target].cy
      droneRef.current.moving = true

      waitArrival(() => {
        if (zoneStatesRef.current[target] === 'red') {
          const ns = [...zoneStatesRef.current]
          ns[target] = 'blue'
          zoneStatesRef.current = ns
          setZoneStates([...ns])
          setFixes(f => f + 1)
          setCycle(c => c + 1)
          setTrustDelta(t => t + 0.8)

          tidRef.current = setTimeout(() => {
            const nb = randomBlue(target)
            if (nb !== -1) {
              const ns2 = [...zoneStatesRef.current]
              ns2[nb] = 'red'
              zoneStatesRef.current = ns2
              setZoneStates([...ns2])
              setEntropyEvents(e => e + 1)
              setTrustDelta(t => Math.max(0, t - 1.3))
            }
            tidRef.current = setTimeout(tick, 700)
          }, 480)
        } else {
          tidRef.current = setTimeout(tick, 700)
        }
      })
    }

    tidRef.current = setTimeout(tick, 1600)
    return () => clearTimeout(tidRef.current)
  }, [])

  return { zoneStates, dronePos, dotPositions, cycle, fixes, entropyEvents, trustDelta }
}
