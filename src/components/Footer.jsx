export default function Footer({ uptime, trustDisplay }) {
  return (
    <footer>
      <span className="seek">SEEK 1970</span>
      <span>Uptime: <span>{uptime}</span></span>
      <span>Trust &#x394;: <span>{trustDisplay}</span></span>
    </footer>
  )
}
