export default function EntropyStrip({ redCount, total }) {
  const pct = total > 0 ? (redCount / total) * 100 : 0
  return (
    <div className="entropy-strip">
      <div className="entropy-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}
