export default function MapTrafficDots({ dots }) {
  return (
    <g>
      {dots.map((d, i) => {
        const isCar = d.type === 'car'
        return (
          <circle
            key={i}
            cx={d.x.toFixed(1)}
            cy={d.y.toFixed(1)}
            r={isCar ? '2.4' : '1.7'}
            fill={isCar ? '#7AABFF' : '#F5C000'}
            opacity={isCar ? '.82' : '.88'}
            filter={isCar ? 'url(#fc)' : 'url(#fy)'}
          />
        )
      })}
    </g>
  )
}
