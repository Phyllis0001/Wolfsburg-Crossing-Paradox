// Static SVG content: backgrounds, buildings, roads, canal, compass, labels.
// This never re-renders (no props, no state).
export default function MapSvgStatic() {
  return (
    <>
      <defs>
        <pattern id="pg" patternUnits="userSpaceOnUse" width="40" height="40">
          <path d="M40,0 L0,0 0,40" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth=".5"/>
        </pattern>
        <pattern id="ps" patternUnits="userSpaceOnUse" width="1" height="4">
          <rect width="1" height="2" fill="rgba(255,255,255,0.012)"/>
        </pattern>
        <filter id="fy" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="fb" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="fr" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="fc" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(45,145,220,0.55)"/>
          <stop offset="100%" stopColor="rgba(25,100,175,0.38)"/>
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="560" height="316" fill="#06060D"/>
      <rect width="560" height="316" fill="url(#pg)"/>
      <rect width="560" height="316" fill="url(#ps)"/>

      {/* NW cluster */}
      <rect x="2"   y="2"   width="100" height="78"  fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.09)" strokeWidth=".5" rx="1"/>
      <rect x="6"   y="6"   width="42"  height="30"  fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth=".5" rx="1"/>
      <rect x="56"  y="6"   width="40"  height="36"  fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth=".5" rx="1"/>
      <rect x="6"   y="44"  width="90"  height="32"  fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth=".5" rx="1"/>
      {/* N centre blocks */}
      <rect x="164" y="4"   width="62"  height="46"  fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth=".5" rx="1"/>
      <rect x="236" y="4"   width="70"  height="62"  fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.09)" strokeWidth=".5" rx="1"/>
      <rect x="164" y="58"  width="130" height="50"  fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth=".5" rx="1"/>
      {/* VW WERK */}
      <rect x="320" y="4"   width="236" height="110" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" rx="1"/>
      <rect x="328" y="12"  width="56"  height="40"  fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.13)" strokeWidth=".6" rx="1"/>
      <rect x="392" y="12"  width="44"  height="30"  fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.13)" strokeWidth=".6" rx="1"/>
      <rect x="445" y="8"   width="106" height="54"  fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.13)" strokeWidth=".6" rx="1"/>
      <rect x="328" y="60"  width="220" height="42"  fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)"  strokeWidth=".6" rx="1"/>
      {/* Chimneys */}
      <rect x="344" y="0" width="4" height="22" fill="rgba(255,255,255,0.22)" rx="1"/>
      <rect x="358" y="0" width="4" height="16" fill="rgba(255,255,255,0.17)" rx="1"/>
      <rect x="460" y="0" width="5" height="26" fill="rgba(255,255,255,0.22)" rx="1"/>
      <rect x="476" y="0" width="5" height="19" fill="rgba(255,255,255,0.17)" rx="1"/>
      {/* VW label */}
      <text x="438" y="82" textAnchor="middle" fontFamily="'Space Grotesk',Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="rgba(255,255,255,0.32)" letterSpacing="2">VOLKSWAGENWERK</text>
      {/* Autostadt strip */}
      <rect x="328" y="114" width="125" height="13" fill="rgba(90,200,110,0.1)" stroke="rgba(90,200,110,0.28)" strokeWidth=".6" rx="1"/>
      <text x="390" y="123" textAnchor="middle" fontFamily="'Space Grotesk',Arial,sans-serif" fontSize="6" fill="rgba(90,200,110,0.5)" letterSpacing=".3">Autostadt</text>
      {/* S centre blocks */}
      <rect x="164" y="171" width="98"  height="38"  fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth=".5" rx="1"/>
      <rect x="164" y="220" width="88"  height="90"  fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth=".5" rx="1"/>
      <rect x="278" y="171" width="88"  height="38"  fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth=".5" rx="1"/>
      <rect x="278" y="220" width="100" height="90"  fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth=".5" rx="1"/>
      <rect x="390" y="171" width="168" height="142" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth=".5" rx="1"/>
      <rect x="4"   y="175" width="100" height="36"  fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth=".5" rx="1"/>
      {/* Porsche Arena */}
      <ellipse cx="72" cy="268" rx="52" ry="36" fill="rgba(255,255,255,0.028)" stroke="rgba(255,255,255,0.13)" strokeWidth=".8"/>
      <ellipse cx="72" cy="268" rx="37" ry="25" fill="rgba(255,255,255,0.02)"  stroke="rgba(255,255,255,0.08)"  strokeWidth=".5"/>
      <text x="72" y="272" textAnchor="middle" fontFamily="'Space Grotesk',Arial,sans-serif" fontSize="5.5" fill="rgba(255,255,255,0.28)" letterSpacing=".4">PORSCHE ARENA</text>

      {/* Canal */}
      <path
        d="M0,116 C70,112 145,122 235,117 C320,112 375,122 475,116 C515,114 545,120 560,117
           L560,133 C545,136 515,130 475,133 C375,138 320,128 235,133 C145,138 70,128 0,133Z"
        fill="url(#cg)"
      />
      <path d="M18,121 Q155,116 285,122 Q405,117 542,121" stroke="rgba(120,210,255,0.28)" strokeWidth=".9" fill="none"/>
      <text x="230" y="126" textAnchor="middle" fontFamily="'Space Grotesk',Arial,sans-serif"
            fontSize="6.5" fill="rgba(90,195,255,0.45)" letterSpacing=".4" fontStyle="italic">Mittellandkanal</text>

      {/* B188 (N-S) */}
      <rect x="146" y="0"   width="12"  height="316" fill="rgba(255,255,255,0.33)"/>
      <line x1="152" y1="0"   x2="152" y2="114"  stroke="rgba(255,255,255,0.14)" strokeWidth=".9" strokeDasharray="8,6"/>
      <line x1="152" y1="135" x2="152" y2="316"  stroke="rgba(255,255,255,0.14)" strokeWidth=".9" strokeDasharray="8,6"/>
      {/* Heinrich-Nordhoff (E-W major) */}
      <rect x="0"   y="158"  width="560" height="11"  fill="rgba(255,255,255,0.32)"/>
      <line x1="0"   y1="163" x2="146" y2="163"  stroke="rgba(255,255,255,0.13)" strokeWidth=".9" strokeDasharray="8,6"/>
      <line x1="158" y1="163" x2="560" y2="163"  stroke="rgba(255,255,255,0.13)" strokeWidth=".9" strokeDasharray="8,6"/>
      {/* Porschestrasse (pedestrian) */}
      <rect x="158" y="222"  width="228" height="7"   fill="rgba(245,192,0,0.22)"/>
      {/* Central N-S */}
      <rect x="268" y="133"  width="8"   height="183" fill="rgba(255,255,255,0.26)"/>
      <line x1="272" y1="133" x2="272" y2="316"  stroke="rgba(255,255,255,0.1)"  strokeWidth=".8" strokeDasharray="6,5"/>
      {/* VW Factory road */}
      <rect x="378" y="0"    width="8"   height="114" fill="rgba(255,255,255,0.26)"/>
      {/* Secondary E-W */}
      <rect x="0"   y="190"  width="560" height="5"   fill="rgba(255,255,255,0.17)"/>
      {/* Arena access */}
      <rect x="0"   y="247"  width="148" height="5"   fill="rgba(255,255,255,0.14)"/>
      {/* Railway */}
      <line x1="0" y1="175" x2="146" y2="175" stroke="rgba(180,180,255,0.35)" strokeWidth="2" strokeDasharray="7,4"/>
      {/* Road labels */}
      <text x="90" y="208" fontFamily="'Space Grotesk',Arial,sans-serif" fontSize="5.5"
            fill="rgba(255,255,255,0.2)" letterSpacing=".3" transform="rotate(-90 90 208)">B188</text>
      <text x="348" y="155" fontFamily="'Space Grotesk',Arial,sans-serif" fontSize="6"
            fill="rgba(255,255,255,0.18)" letterSpacing=".3">Heinrich-Nordhoff-Str.</text>
      <text x="182" y="218" fontFamily="'Space Grotesk',Arial,sans-serif" fontSize="6"
            fill="rgba(245,192,0,0.5)" letterSpacing=".4" fontWeight="700">Porschestrasse</text>

      {/* Compass */}
      <g transform="translate(536,297)">
        <circle cx="0" cy="0" r="10" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.1)" strokeWidth=".7"/>
        <text x="0" y="-3.5" textAnchor="middle" fontFamily="'Space Grotesk',Arial,sans-serif"
              fontSize="5.5" fontWeight="700" fill="rgba(255,255,255,0.45)">N</text>
        <line x1="0" y1="-2" x2="0" y2="-8" stroke="#C41A1A" strokeWidth="1.5" opacity=".8"/>
        <line x1="0" y1="2"  x2="0" y2="8"  stroke="rgba(255,255,255,0.38)" strokeWidth="1"/>
        <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.38)"/>
      </g>
    </>
  )
}
