export default function MapDrone({ x, y }) {
  return (
    <g transform={`translate(${x.toFixed(2)},${y.toFixed(2)})`}>
      <g className="drone-spin">
        <circle cx="0" cy="0" r="14" fill="none" stroke="rgba(245,192,0,0.55)" strokeWidth="1.5" strokeDasharray="4,3"/>
      </g>
      {/* Arms */}
      <line x1="-8"  y1="0"  x2="-17" y2="-7"  stroke="rgba(255,255,255,0.65)" strokeWidth="1"/>
      <circle cx="-17" cy="-7"  r="3.5" fill="rgba(18,18,30,0.95)" stroke="rgba(255,255,255,0.4)" strokeWidth=".8"/>
      <line x1="8"   y1="0"  x2="17"  y2="-7"  stroke="rgba(255,255,255,0.65)" strokeWidth="1"/>
      <circle cx="17"  cy="-7"  r="3.5" fill="rgba(18,18,30,0.95)" stroke="rgba(255,255,255,0.4)" strokeWidth=".8"/>
      <line x1="-5"  y1="4"  x2="-14" y2="11"  stroke="rgba(255,255,255,0.65)" strokeWidth=".9"/>
      <circle cx="-14" cy="11"  r="3"   fill="rgba(18,18,30,0.95)" stroke="rgba(255,255,255,0.4)" strokeWidth=".8"/>
      <line x1="5"   y1="4"  x2="14"  y2="11"  stroke="rgba(255,255,255,0.65)" strokeWidth=".9"/>
      <circle cx="14"  cy="11"  r="3"   fill="rgba(18,18,30,0.95)" stroke="rgba(255,255,255,0.4)" strokeWidth=".8"/>
      {/* Body */}
      <circle cx="0" cy="0" r="9"   fill="#F5C000" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" filter="url(#fy)"/>
      <circle cx="0" cy="0" r="4"   fill="rgba(0,0,0,0.75)"/>
      <circle cx="-1.2" cy="-1.2" r="1.5" fill="rgba(255,255,255,0.18)"/>
    </g>
  )
}
