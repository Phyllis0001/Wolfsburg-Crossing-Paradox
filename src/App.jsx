import { useState, useRef } from 'react'
import { useSimulation }  from './hooks/useSimulation'
import { useCommentFeed } from './hooks/useCommentFeed'
import { useUptime }      from './hooks/useUptime'
import { ZONES }          from './data/zones'
import { LIGHT_C, SENSOR_C } from './data/comments'

import Header              from './components/Header'
import LiveFeeds           from './components/LiveFeeds'
import EntropyStrip        from './components/EntropyStrip'
import MapSection          from './components/MapSection'
import StatsBar            from './components/StatsBar'
import BottomPanel         from './components/BottomPanel'
import Footer              from './components/Footer'

export default function App() {
  // Simulation: zones, drone, traffic dots, stats
  const { zoneStates, dronePos, dotPositions, cycle, fixes, entropyEvents, trustDelta } = useSimulation()

  // Live comment feeds
  const lightFeed  = useCommentFeed(LIGHT_C,  '@traffic_light.wolfsburg',  5400, 8600, 'Phase 1 of 12. I am now green. Waiting.')
  const sensorFeed = useCommentFeed(SENSOR_C, '@ground_sensor.wolfsburg',  6200, 9500, 'Subsurface initialised. Reporting: nominal. Confidence: low.')

  // Uptime display
  const { uptime, trustDisplay } = useUptime(trustDelta)

  // Human perception log
  const [humanEntries, setHumanEntries] = useState([
    { id: 0, user: '@pedestrian_001', text: "Light is green. I see nothing. I'm crossing." }
  ])
  const humanCounter = useRef(1)

  function handleHumanSubmit(text) {
    humanCounter.current++
    const user = `@pedestrian_${String(humanCounter.current).padStart(3, '0')}`
    setHumanEntries(prev => [...prev, { id: Date.now(), user, text }].slice(-5))
  }

  const redZoneLabels = ZONES
    .filter((_, i) => zoneStates[i] === 'red')
    .map(z => z.label)

  const redCount  = zoneStates.filter(s => s === 'red').length
  const blueCount = zoneStates.filter(s => s === 'blue').length

  return (
    <div className="app-shell">
      <Header />
      <LiveFeeds lightFeed={lightFeed} sensorFeed={sensorFeed} />
      <EntropyStrip redCount={redCount} total={ZONES.length} />
      <MapSection
        zoneStates={zoneStates}
        dronePos={dronePos}
        dotPositions={dotPositions}
        cycle={cycle}
      />
      <StatsBar
        blue={blueCount}
        red={redCount}
        fixes={fixes}
        entropyEvents={entropyEvents}
      />
      <BottomPanel
        humanEntries={humanEntries}
        onHumanSubmit={handleHumanSubmit}
        redZoneLabels={redZoneLabels}
      />
      <Footer uptime={uptime} trustDisplay={trustDisplay} />
    </div>
  )
}
