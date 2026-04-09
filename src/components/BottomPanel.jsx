import HumanPerceptionPanel from './HumanPerceptionPanel'
import AiAssessmentPanel from './AiAssessmentPanel'

export default function BottomPanel({ humanEntries, onHumanSubmit, redZoneLabels }) {
  return (
    <div className="bottom">
      <HumanPerceptionPanel entries={humanEntries} onSubmit={onHumanSubmit} />
      <AiAssessmentPanel redZoneLabels={redZoneLabels} />
    </div>
  )
}
