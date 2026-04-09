import { useRef, useState, useEffect, useCallback, memo } from 'react'
import { ZONES } from '../data/zones'
import MapSvgStatic from './MapSvgStatic'
import MapZones from './MapZones'
import MapDrone from './MapDrone'
import MapTrafficDots from './MapTrafficDots'

// MapCanvas receives zoom/pan from MapSection and reports back via onTransform(zoom, panX, panY).
// This lets zoom buttons live in the header row while all DOM-aware clamping stays here.
const MapCanvas = memo(function MapCanvas({ zoneStates, dronePos, dotPositions, zoom, panX, panY, onTransform }) {
  const wrapRef = useRef(null)
  const svgRef  = useRef(null)
  const [tooltip, setTooltip] = useState({ visible: false, zoneIdx: 0, x: 0, y: 0 })
  const [grabbing, setGrabbing] = useState(false)

  // Refs so event handlers always see latest values without stale closures
  const zRef = useRef(zoom)
  const pRef = useRef({ x: panX, y: panY })
  zRef.current = zoom
  pRef.current = { x: panX, y: panY }

  // Apply CSS transform when props change
  useEffect(() => {
    if (!svgRef.current) return
    svgRef.current.style.transition = 'transform .22s ease'
    svgRef.current.style.transform  = `translate(${panX}px,${panY}px) scale(${zoom})`
  }, [zoom, panX, panY])

  // Clamp and fire onTransform with final values.
  // Also updates zRef/pRef immediately so rapid events (scroll, drag) always
  // see the latest values before React has a chance to re-render.
  const commit = useCallback((newZoom, newPanX, newPanY, instant) => {
    const wrap = wrapRef.current
    const svg  = svgRef.current
    if (!wrap || !svg) return
    const z = Math.max(1, Math.min(4, newZoom))
    let px = newPanX, py = newPanY
    if (z <= 1) { px = 0; py = 0 }
    else {
      const w = wrap.offsetWidth
      const h = svg.getBoundingClientRect().height
      const mx = w * (z - 1) / 2, my = h * (z - 1) / 2
      px = Math.max(-mx, Math.min(mx, px))
      py = Math.max(-my, Math.min(my, py))
    }
    // Update refs synchronously so next event handler sees correct values
    zRef.current = z
    pRef.current = { x: px, y: py }
    if (instant) {
      svg.style.transition = 'none'
      svg.style.transform  = `translate(${px}px,${py}px) scale(${z})`
    }
    onTransform(z, px, py)
  }, [onTransform])

  // Zoom toward a focal point (fx/fy relative to container centre)
  const zoomAt = useCallback((newZoom, fx, fy) => {
    const old = zRef.current
    const px = fx - (fx - pRef.current.x) * newZoom / old
    const py = fy - (fy - pRef.current.y) * newZoom / old
    commit(newZoom, px, py, false)
  }, [commit])

  // Wheel + touch (need passive:false)
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    function onWheel(e) {
      e.preventDefault()
      const wr = wrap.getBoundingClientRect()
      zoomAt(zRef.current * (e.deltaY < 0 ? 1.14 : 0.88),
        e.clientX - wr.left - wr.width  / 2,
        e.clientY - wr.top  - wr.height / 2)
    }

    let pinchSD = 0, pinchSZ = 1, pinchFX = 0, pinchFY = 0
    let isDrag = false, dragSX = 0, dragSY = 0, dragPX = 0, dragPY = 0

    function onTouchStart(e) {
      e.preventDefault()
      if (e.touches.length === 2) {
        isDrag = false
        const t1 = e.touches[0], t2 = e.touches[1]
        pinchSD = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)
        pinchSZ = zRef.current
        const wr = wrap.getBoundingClientRect()
        pinchFX = (t1.clientX + t2.clientX) / 2 - wr.left - wr.width  / 2
        pinchFY = (t1.clientY + t2.clientY) / 2 - wr.top  - wr.height / 2
      } else if (e.touches.length === 1) {
        isDrag = true
        dragSX = e.touches[0].clientX; dragSY = e.touches[0].clientY
        dragPX = pRef.current.x;       dragPY = pRef.current.y
        setGrabbing(true)
      }
    }

    function onTouchMove(e) {
      e.preventDefault()
      if (e.touches.length === 2) {
        const t1 = e.touches[0], t2 = e.touches[1]
        const nd = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)
        zoomAt(Math.max(1, Math.min(4, pinchSZ * nd / pinchSD)), pinchFX, pinchFY)
      } else if (isDrag && zRef.current > 1) {
        commit(zRef.current,
          dragPX + (e.touches[0].clientX - dragSX),
          dragPY + (e.touches[0].clientY - dragSY),
          true)
      }
    }

    function onTouchEnd(e) {
      if (e.touches.length < 1) { isDrag = false; setGrabbing(false) }
    }

    wrap.addEventListener('wheel',      onWheel,      { passive: false })
    wrap.addEventListener('touchstart', onTouchStart, { passive: false })
    wrap.addEventListener('touchmove',  onTouchMove,  { passive: false })
    wrap.addEventListener('touchend',   onTouchEnd)
    return () => {
      wrap.removeEventListener('wheel',      onWheel)
      wrap.removeEventListener('touchstart', onTouchStart)
      wrap.removeEventListener('touchmove',  onTouchMove)
      wrap.removeEventListener('touchend',   onTouchEnd)
    }
  }, [zoomAt, commit])

  // Mouse drag
  useEffect(() => {
    let mDrag = false, mSX = 0, mSY = 0, mPX = 0, mPY = 0
    const wrap = wrapRef.current

    function onMouseDown(e) {
      if (zRef.current <= 1) return
      mDrag = true; mSX = e.clientX; mSY = e.clientY
      mPX = pRef.current.x; mPY = pRef.current.y
      setGrabbing(true)
    }
    function onMouseMove(e) {
      if (!mDrag) return
      commit(zRef.current, mPX + (e.clientX - mSX), mPY + (e.clientY - mSY), true)
    }
    function onMouseUp() { mDrag = false; setGrabbing(false) }

    wrap.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup',   onMouseUp)
    return () => {
      wrap.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup',   onMouseUp)
    }
  }, [commit])

  function handleZoneClick(idx, e) {
    const wr = wrapRef.current.getBoundingClientRect()
    let tx = e.clientX - wr.left + 12
    let ty = e.clientY - wr.top  - 24
    tx = Math.max(2, Math.min(tx, wrapRef.current.offsetWidth  - 172))
    ty = Math.max(2, Math.min(ty, wrapRef.current.offsetHeight - 148))
    setTooltip({ visible: true, zoneIdx: idx, x: tx, y: ty })
  }

  const z = ZONES[tooltip.zoneIdx]
  const tipRed = tooltip.visible && zoneStates[tooltip.zoneIdx] === 'red'

  return (
    <div
      ref={wrapRef}
      className={`map-wrap${grabbing ? ' grabbing' : ''}`}
      onClick={e => { if (!e.target.closest('[data-zone]')) setTooltip(t => ({ ...t, visible: false })) }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 560 316"
        style={{ width: '100%', height: 'auto', display: 'block', transformOrigin: '50% 50%', willChange: 'transform' }}
      >
        <MapSvgStatic />
        <MapZones zoneStates={zoneStates} onZoneClick={handleZoneClick} />
        <MapTrafficDots dots={dotPositions} />
        <MapDrone x={dronePos.x} y={dronePos.y} />
      </svg>

      {tooltip.visible && z && (
        <div className="tip" style={{ left: tooltip.x, top: tooltip.y }}>
          <span className="tip-close" onClick={() => setTooltip(t => ({ ...t, visible: false }))}>&#x2715;</span>
          <div className="tip-name">{z.label}</div>
          <div className="tip-row">
            <span className="tip-lbl">AI Risk</span>
            <span className="tip-val">{z.aiRisk}</span>
          </div>
          <div className="tip-row">
            <span className="tip-lbl">Zone Status</span>
            <span className={`tip-val ${tipRed ? 'tv-red' : 'tv-blue'}`}>
              {tipRed ? '⚠ DISRUPTED — Reality vs. AI model' : '✓ ORDERED — AI prediction holding'}
            </span>
          </div>
          <div className="tip-row">
            <span className="tip-lbl">Human Observation</span>
            <span className="tip-val">{z.humanObs}</span>
          </div>
        </div>
      )}
    </div>
  )
})

export default MapCanvas
