export default function StatsBar({ blue, red, fixes, entropyEvents }) {
  return (
    <div className="stats">
      <div className="sc"><span className="sn bl">{blue}</span><span className="sl">Ordered</span></div>
      <div className="sc"><span className="sn rd">{red}</span><span className="sl">Disrupted</span></div>
      <div className="sc"><span className="sn yl">{fixes}</span><span className="sl">Corrections</span></div>
      <div className="sc"><span className="sn">{entropyEvents}</span><span className="sl">Entropy Events</span></div>
    </div>
  )
}
