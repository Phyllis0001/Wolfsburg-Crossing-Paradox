export default function AiAssessmentPanel({ redZoneLabels }) {
  return (
    <div className="bp ai">
      <div className="btag">AI System Assessment</div>
      <div className="aitxt">
        Risk rating <strong>medium-high</strong>. Sensor data inconclusive. Hold position.
      </div>
      <div style={{ marginTop: '3px' }}>
        <span className="rpill">Do Not Cross</span>
      </div>
      <div className="aizones">
        {redZoneLabels.length > 0
          ? `Disruptions: ${redZoneLabels.join(', ')}`
          : 'All zones nominal.'}
      </div>
    </div>
  )
}
