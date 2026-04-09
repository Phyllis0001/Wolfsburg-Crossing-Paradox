import CommentFeed from './CommentFeed'

export default function LiveFeeds({ lightFeed, sensorFeed }) {
  return (
    <div className="live-wrap">
      <CommentFeed
        icon="🚦"
        title="@traffic_light.wolfsburg"
        entries={lightFeed.entries}
        ageOf={lightFeed.ageOf}
      />
      <CommentFeed
        icon="📡"
        title="@ground_sensor.wolfsburg"
        entries={sensorFeed.entries}
        ageOf={sensorFeed.ageOf}
      />
    </div>
  )
}
