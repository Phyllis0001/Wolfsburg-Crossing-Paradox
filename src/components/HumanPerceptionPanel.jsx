import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function HumanPerceptionPanel({ entries, onSubmit }) {
  const [text, setText] = useState('')
  const feedRef = useRef(null)

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight
  }, [entries])

  function handleSubmit() {
    const t = text.trim()
    if (!t) return
    onSubmit(t)
    setText('')
  }

  return (
    <div className="bp human">
      <div className="btag">Human Perception</div>
      <div className="hfeed" ref={feedRef}>
        {entries.map(entry => (
          <div key={entry.id} className="hcmt">
            <span className="hu">{entry.user}</span>
            {entry.text}
          </div>
        ))}
      </div>
      <div className="hrow">
        <Input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="I see no cars, I'm crossing…"
          maxLength={80}
        />
        <Button onClick={handleSubmit}>&#8594;</Button>
      </div>
    </div>
  )
}
