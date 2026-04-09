import { useEffect, useRef } from 'react'

export default function CommentFeed({ icon, title, entries, ageOf }) {
  const feedRef = useRef(null)

  // Auto-scroll to bottom when new entries arrive
  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight
  }, [entries])

  return (
    <div className="live-col">
      <div className="live-hdr">
        <div className="lv-av">{icon}</div>
        <div>
          <div className="lv-name">{title}</div>
          <div className="lv-badge">&#9679; LIVE</div>
        </div>
      </div>
      <div className="lv-feed" ref={feedRef}>
        {entries.map(entry => (
          <div key={entry.id} className="c-item">
            <div className="c-top">
              <span className="c-user">{entry.user}</span>
              <span className="c-age">{ageOf(entry.ts)}</span>
            </div>
            <div className="c-txt">{entry.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
