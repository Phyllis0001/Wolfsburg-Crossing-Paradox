import { useState, useCallback, useRef } from 'react'
import MapCanvas from './MapCanvas'

export default function MapSection({ zoneStates, dronePos, dotPositions, cycle }) {
  const [zoom, setZoom] = useState(1)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)

  // Stable ref so zoom buttons can read latest zoom without stale closure
  const zoomRef = useRef(1)
  zoomRef.current = zoom

  // Called by MapCanvas with final clamped values
  const handleTransform = useCallback((z, px, py) => {
    setZoom(z); setPanX(px); setPanY(py)
    zoomRef.current = z
  }, [])

  function stepZoom(delta) {
    const next = Math.max(1, Math.min(4, parseFloat((zoomRef.current + delta).toFixed(1))))
    setZoom(next)
    zoomRef.current = next
    if (next <= 1) { setPanX(0); setPanY(0) }
  }

  return (
    <div className="map-sec">
      <div className="map-top">
        <span className="map-lbl">Wolfsburg Tactical Grid &mdash; Live</span>
        <div className="map-right">
          <span className="cycle-lbl">Cycle: {cycle}</span>
          <div className="zoom-ctrl">
            <button className="zbtn" onClick={() => stepZoom(-0.5)}>&#8722;</button>
            <span className="zlbl">{zoom.toFixed(1)}&#215;</span>
            <button className="zbtn" onClick={() => stepZoom(0.5)}>&#43;</button>
          </div>
        </div>
      </div>

      <MapCanvas
        zoneStates={zoneStates}
        dronePos={dronePos}
        dotPositions={dotPositions}
        zoom={zoom}
        panX={panX}
        panY={panY}
        onTransform={handleTransform}
      />

      <div className="map-legend">
        <div className="leg-i"><div className="leg-d" style={{ background: 'rgba(40,100,220,0.85)' }}></div>AI Ideal</div>
        <div className="leg-i"><div className="leg-d" style={{ background: '#C41A1A' }}></div>Disrupted</div>
        <div className="leg-i"><div className="leg-d" style={{ background: '#7AABFF' }}></div>Car</div>
        <div className="leg-i"><div className="leg-d" style={{ background: '#F5C000' }}></div>Pedestrian</div>
        <div className="leg-i" style={{ marginLeft: 'auto' }}>
          <div className="leg-d" style={{ background: '#F5C000', border: '1px solid rgba(255,255,255,0.4)' }}></div>AI Drone
        </div>
      </div>
    </div>
  )
}
