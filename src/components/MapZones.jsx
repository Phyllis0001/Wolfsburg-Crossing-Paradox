import { ZONES } from '../data/zones'

export default function MapZones({ zoneStates, onZoneClick }) {
  return (
    <g>
      {ZONES.map((z, i) => {
        const red    = zoneStates[i] === 'red'
        const fill   = red ? 'rgba(196,26,26,0.11)'  : 'rgba(23,64,200,0.09)'
        const stroke = red ? 'rgba(196,26,26,0.65)'  : 'rgba(40,90,210,0.55)'
        const col    = red ? '#C41A1A' : '#1740C8'
        const filt   = red ? 'url(#fr)' : 'url(#fb)'
        const tlen   = z.label.toUpperCase().length * 4.3

        return (
          <g
            key={z.id}
            style={{ cursor: 'pointer' }}
            onClick={e => { e.stopPropagation(); onZoneClick(i, e) }}
          >
            {/* Zone boundary */}
            <rect
              x={z.x} y={z.y} width={z.w} height={z.h}
              fill={fill} stroke={stroke} strokeWidth="1" strokeDasharray="6,4" rx="2"
            />

            {/* Red pulse overlay */}
            {red && (
              <rect
                x={z.x} y={z.y} width={z.w} height={z.h}
                fill="rgba(196,26,26,0.07)" stroke="rgba(196,26,26,0.4)"
                strokeWidth=".8" strokeDasharray="6,4" rx="2"
              >
                <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite"/>
              </rect>
            )}

            {/* Glow halo */}
            <circle cx={z.cx} cy={z.cy} r="12" fill={col} opacity=".2" filter={filt}>
              {red && (
                <>
                  <animate attributeName="r" values="8;17;8" dur="1.8s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values=".25;.06;.25" dur="1.8s" repeatCount="indefinite"/>
                </>
              )}
            </circle>

            {/* Badge circle */}
            <circle
              cx={z.cx} cy={z.cy} r="9"
              fill={col} stroke="rgba(255,255,255,0.28)" strokeWidth="1" filter={filt}
            />

            {/* Icon */}
            <text
              x={z.cx} y={z.cy + 3.5} textAnchor="middle"
              fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700"
              fill="rgba(255,255,255,0.9)"
            >
              {red ? '!' : '✓'}
            </text>

            {/* Label background */}
            <rect
              x={z.lx - tlen / 2 - 4} y={z.ly - 9}
              width={tlen + 8} height={11}
              fill="rgba(0,0,0,0.72)" rx="1"
            />

            {/* Label text */}
            <text
              x={z.lx} y={z.ly} textAnchor="middle"
              fontFamily="'Space Grotesk',Arial,sans-serif" fontSize="6.5"
              fontWeight="700" fill="rgba(255,255,255,0.82)" letterSpacing=".3"
            >
              {z.label.toUpperCase()}
            </text>
          </g>
        )
      })}
    </g>
  )
}
