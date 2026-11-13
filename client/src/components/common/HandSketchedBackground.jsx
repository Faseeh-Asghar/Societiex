import React from 'react';

/**
 * HandSketchedBackground Component
 * -----------------------------------------------------------------
 * Color theme and vibe matched directly to the cinematic aesthetic of Photo 1 (1.1.jpeg):
 * - Moody mountain dusk & warm sandstone sky atmosphere.
 * - Deep earthy rock slate, warm umber, and soft dusky beige glow.
 * - Synthetic blue water removed for natural environmental harmony.
 * - 16 University & society sketches in warm bone chalk & graphite ink.
 */
export default function HandSketchedBackground({ isLanded = false }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden select-none transition-opacity duration-1000 ${
        isLanded ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* 1. Cinematic Mountain Dusk & Sandstone Sky Gradient (Matched to Photo 1.1) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c1815] via-[#241e1a] to-[#14110f]" />

      {/* Warm atmospheric dusky light glow (matching the sky of 1.1.jpeg) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[55vh] bg-[#c8bcae]/12 rounded-full blur-[160px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[60vw] h-[45vh] bg-[#8c7a6b]/15 rounded-full blur-[170px]" />
      <div className="absolute top-1/2 left-1/3 w-[50vw] h-[40vh] bg-[#d5cbbe]/10 rounded-full blur-[150px]" />

      {/* 2. 16 Society & Campus Sketches in Warm Bone Chalk & Graphite Ink */}
      <svg
        viewBox="0 0 1920 1080"
        className="w-full h-full object-cover absolute inset-0 z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Warm Bone Chalk Ink for sketches */}
          <linearGradient id="sandstone-chalk" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(245, 240, 235, 0.88)" />
            <stop offset="100%" stopColor="rgba(209, 196, 182, 0.75)" />
          </linearGradient>

          {/* Warm Sandstone Accent Ink */}
          <linearGradient id="warm-sandstone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(214, 199, 184, 0.85)" />
            <stop offset="100%" stopColor="rgba(168, 150, 134, 0.65)" />
          </linearGradient>
        </defs>

        {/* -------------------------------------------------------------
            SKETCH 1: 🎛️ DJ Turntable & Sound Deck (Far Top Left)
            ------------------------------------------------------------- */}
        <g stroke="url(#sandstone-chalk)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(60, 60) scale(0.9)">
            <rect x="20" y="20" width="145" height="125" rx="10" strokeWidth="2.2" />
            <circle cx="85" cy="82" r="46" strokeWidth="2.0" stroke="url(#warm-sandstone)" />
            <circle cx="85" cy="82" r="30" strokeWidth="1.0" strokeDasharray="4 3" />
            <circle cx="85" cy="82" r="12" fill="rgba(209, 196, 182, 0.15)" strokeWidth="1.5" />
            <circle cx="85" cy="82" r="3" fill="#f5f0eb" />
            <line x1="140" y1="35" x2="140" y2="45" strokeWidth="2.0" />
            <circle cx="140" cy="45" r="5" strokeWidth="1.5" />
            <line x1="140" y1="45" x2="112" y2="92" strokeWidth="2.0" />
            <rect x="107" y="90" width="10" height="6" rx="1" strokeWidth="1.2" />
            <line x1="145" y1="70" x2="145" y2="120" strokeWidth="1.4" />
            <rect x="141" y="90" width="8" height="6" rx="1" fill="#f5f0eb" />
          </g>
        </g>

        {/* -------------------------------------------------------------
            SKETCH 2: 🎭 Drama Masks (Upper Left Mid)
            ------------------------------------------------------------- */}
        <g stroke="url(#sandstone-chalk)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(260, 90) scale(0.85)">
            <path d="M 40 20 Q 80 5 120 20 Q 145 60 135 110 Q 110 150 80 155 Q 50 150 25 110 Q 15 60 40 20 Z" strokeWidth="2.2" />
            <path d="M 45 60 Q 60 50 75 60" strokeWidth="2.4" />
            <path d="M 85 60 Q 100 50 115 60" strokeWidth="2.4" />
            <path d="M 50 100 Q 80 140 110 100 Q 80 115 50 100 Z" fill="rgba(245, 240, 235, 0.08)" strokeWidth="2.0" />
            <g transform="translate(65, 20)" stroke="url(#warm-sandstone)">
              <path d="M 40 20 Q 80 5 120 20 Q 145 60 135 110 Q 110 150 80 155 Q 50 150 25 110 Q 15 60 40 20 Z" strokeWidth="1.8" />
              <path d="M 45 65 Q 60 75 75 65" strokeWidth="2.0" />
              <path d="M 85 65 Q 100 75 115 65" strokeWidth="2.0" />
              <path d="M 50 120 Q 80 95 110 120 Q 80 105 50 120 Z" strokeWidth="1.8" />
            </g>
          </g>
        </g>

        {/* -------------------------------------------------------------
            SKETCH 3: 🎧 Studio Over-Ear Headphones (Left Edge)
            ------------------------------------------------------------- */}
        <g stroke="url(#sandstone-chalk)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(40, 270) scale(0.85)">
            <path d="M 20 90 A 70 70 0 0 1 160 90" strokeWidth="3.0" fill="none" />
            <rect x="10" y="80" width="22" height="45" rx="10" strokeWidth="2.0" fill="rgba(245, 240, 235, 0.08)" />
            <rect x="148" y="80" width="22" height="45" rx="10" strokeWidth="2.0" fill="rgba(245, 240, 235, 0.08)" />
            <path d="M 21 125 Q 40 160 70 170" stroke="url(#warm-sandstone)" strokeWidth="1.4" strokeDasharray="3 3" />
          </g>
        </g>

        {/* -------------------------------------------------------------
            SKETCH 4: 🎸 Acoustic Guitar (Mid-Left)
            ------------------------------------------------------------- */}
        <g stroke="url(#sandstone-chalk)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(60, 480) rotate(-22) scale(0.85)">
            <path d="M 80 180 Q 20 220 30 300 Q 40 370 120 380 Q 200 370 210 300 Q 220 220 160 180 Q 190 140 180 90 Q 170 40 120 40 Q 70 40 60 90 Q 50 140 80 180 Z" strokeWidth="2.4" />
            <circle cx="120" cy="200" r="30" strokeWidth="2.0" stroke="url(#warm-sandstone)" />
            <rect x="90" y="305" width="60" height="14" rx="3" strokeWidth="1.6" />
            <line x1="108" y1="40" x2="108" y2="-110" strokeWidth="2.0" />
            <line x1="132" y1="40" x2="132" y2="-110" strokeWidth="2.0" />
            <polygon points="104,-110 136,-110 140,-170 100,-170" strokeWidth="2.0" />
            <path d="M 225 195 Q 255 165 285 195 Q 315 225 345 195" stroke="url(#warm-sandstone)" strokeWidth="1.3" strokeDasharray="5 3" />
          </g>
        </g>

        {/* -------------------------------------------------------------
            SKETCH 5: 🏏 Cricket Bat & Ball (Bottom Left)
            ------------------------------------------------------------- */}
        <g stroke="url(#sandstone-chalk)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(130, 770) rotate(-35) scale(0.9)">
            <path d="M 30 60 L 30 240 Q 30 260 50 260 L 60 260 Q 80 260 80 240 L 80 60 Q 55 50 30 60 Z" strokeWidth="2.4" />
            <line x1="55" y1="60" x2="55" y2="245" strokeWidth="1.4" strokeDasharray="6 3" />
            <rect x="47" y="-20" width="16" height="80" rx="4" strokeWidth="2.0" />
            <line x1="47" y1="-5" x2="63" y2="-5" strokeWidth="1.2" />
            <line x1="47" y1="10" x2="63" y2="10" strokeWidth="1.2" />
            <line x1="47" y1="25" x2="63" y2="25" strokeWidth="1.2" />
            <g transform="translate(115, 140)">
              <circle cx="0" cy="0" r="26" strokeWidth="2.2" stroke="url(#warm-sandstone)" />
              <path d="M 0 -26 Q 16 0 0 26" strokeWidth="1.8" />
              <line x1="4" y1="-18" x2="10" y2="-14" strokeWidth="1.0" />
              <line x1="7" y1="-9" x2="13" y2="-5" strokeWidth="1.0" />
              <line x1="8" y1="0" x2="14" y2="4" strokeWidth="1.0" />
              <line x1="7" y1="9" x2="13" y2="13" strokeWidth="1.0" />
              <line x1="4" y1="18" x2="10" y2="22" strokeWidth="1.0" />
            </g>
          </g>
        </g>

        {/* -------------------------------------------------------------
            SKETCH 6: 🏸 Badminton Racket & Shuttlecock (Lower Mid Left)
            ------------------------------------------------------------- */}
        <g stroke="url(#sandstone-chalk)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(360, 720) rotate(15) scale(0.85)">
            <ellipse cx="60" cy="60" rx="42" ry="54" strokeWidth="2.2" stroke="url(#warm-sandstone)" />
            <line x1="60" y1="114" x2="60" y2="220" strokeWidth="2.2" />
            <rect x="56" y="200" width="8" height="55" rx="3" strokeWidth="1.6" fill="#241e1a" />
            <line x1="35" y1="60" x2="85" y2="60" strokeWidth="0.8" opacity="0.6" />
            <line x1="40" y1="40" x2="80" y2="40" strokeWidth="0.8" opacity="0.6" />
            <line x1="40" y1="80" x2="80" y2="80" strokeWidth="0.8" opacity="0.6" />
            <line x1="60" y1="20" x2="60" y2="100" strokeWidth="0.8" opacity="0.6" />
            <g transform="translate(115, 30)">
              <circle cx="10" cy="10" r="10" strokeWidth="1.8" />
              <path d="M 3 5 L -20 -15 L 20 -25 L 17 5 Z" strokeWidth="1.4" fill="rgba(245,240,235,0.06)" />
            </g>
          </g>
        </g>

        {/* -------------------------------------------------------------
            SKETCH 7: 📚 Stack of Textbooks (Lower Center)
            ------------------------------------------------------------- */}
        <g stroke="url(#sandstone-chalk)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(680, 800) scale(0.9)">
            <polygon points="10,60 160,35 190,50 40,75" strokeWidth="2.0" />
            <rect x="10" y="60" width="30" height="20" rx="2" strokeWidth="1.6" />
            <polygon points="10,80 160,55 190,70 40,95" strokeWidth="2.0" />
            <polygon points="25,40 155,20 180,32 50,52" strokeWidth="2.0" stroke="url(#warm-sandstone)" />
            <polygon points="25,56 155,36 180,48 50,68" strokeWidth="2.0" stroke="url(#warm-sandstone)" />
            <path d="M 120 40 Q 130 75 140 85 L 132 90 L 125 80" stroke="url(#sandstone-chalk)" strokeWidth="1.5" />
          </g>
        </g>

        {/* -------------------------------------------------------------
            SKETCH 8: 🏛️ Classical Colonnade Campus Hall (Top Center)
            ------------------------------------------------------------- */}
        <g stroke="url(#sandstone-chalk)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(850, 40) scale(0.85)">
            <path d="M 40 100 L 200 30 L 360 100 Z" strokeWidth="2.2" />
            <line x1="20" y1="100" x2="380" y2="100" strokeWidth="2.6" />
            <line x1="10" y1="115" x2="390" y2="115" strokeWidth="1.8" />
            <line x1="60" y1="115" x2="60" y2="230" strokeWidth="1.6" />
            <line x1="75" y1="115" x2="75" y2="230" strokeWidth="1.6" />
            <line x1="140" y1="115" x2="140" y2="230" strokeWidth="1.6" />
            <line x1="155" y1="115" x2="155" y2="230" strokeWidth="1.6" />
            <line x1="245" y1="115" x2="245" y2="230" strokeWidth="1.6" />
            <line x1="260" y1="115" x2="260" y2="230" strokeWidth="1.6" />
            <line x1="325" y1="115" x2="325" y2="230" strokeWidth="1.6" />
            <line x1="340" y1="115" x2="340" y2="230" strokeWidth="1.6" />
            <line x1="30" y1="230" x2="370" y2="230" strokeWidth="2.2" />
            <line x1="15" y1="242" x2="385" y2="242" strokeWidth="2.2" />
          </g>
        </g>

        {/* -------------------------------------------------------------
            SKETCH 9: 🕰️ Campus Clock Tower (Upper Right Mid)
            ------------------------------------------------------------- */}
        <g stroke="url(#sandstone-chalk)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(1260, 40) scale(0.8)">
            <line x1="80" y1="10" x2="80" y2="50" strokeWidth="2.2" stroke="url(#warm-sandstone)" />
            <path d="M 80 50 L 50 130 L 110 130 Z" strokeWidth="2.0" />
            <rect x="40" y="130" width="80" height="90" strokeWidth="2.2" />
            <circle cx="80" cy="175" r="28" stroke="url(#warm-sandstone)" strokeWidth="2.0" />
            <line x1="80" y1="175" x2="80" y2="160" strokeWidth="1.8" />
            <line x1="80" y1="175" x2="94" y2="175" strokeWidth="1.5" />
            <line x1="35" y1="220" x2="35" y2="400" strokeWidth="2.0" />
            <line x1="125" y1="220" x2="125" y2="400" strokeWidth="2.0" />
            <path d="M 60 280 Q 80 260 100 280 L 100 320 L 60 320 Z" strokeWidth="1.5" />
          </g>
        </g>

        {/* -------------------------------------------------------------
            SKETCH 10: 💻 Tech Microchip & Circuit Traces (Far Top Right)
            ------------------------------------------------------------- */}
        <g stroke="url(#warm-sandstone)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(1620, 50) scale(0.9)">
            <rect x="50" y="30" width="70" height="70" rx="8" strokeWidth="2.2" stroke="url(#sandstone-chalk)" />
            <circle cx="85" cy="65" r="9" fill="rgba(214, 199, 184, 0.2)" strokeWidth="1.6" />
            <line x1="35" y1="45" x2="50" y2="45" strokeWidth="1.8" />
            <line x1="35" y1="65" x2="50" y2="65" strokeWidth="1.8" />
            <line x1="35" y1="85" x2="50" y2="85" strokeWidth="1.8" />
            <line x1="120" y1="45" x2="135" y2="45" strokeWidth="1.8" />
            <line x1="120" y1="65" x2="135" y2="65" strokeWidth="1.8" />
            <line x1="120" y1="85" x2="135" y2="85" strokeWidth="1.8" />
            <path d="M 135 65 L 175 65 L 205 35 L 245 35" strokeWidth="1.6" />
            <circle cx="245" cy="35" r="3.5" fill="none" strokeWidth="1.6" />
            <text x="175" y="105" fontSize="32" fontFamily="'JetBrains Mono', monospace" fill="#f5f0eb" stroke="none">
              &lt; / &gt;
            </text>
          </g>
        </g>

        {/* -------------------------------------------------------------
            SKETCH 11: 🤖 Robotics Mechanical Gear (Right Edge Mid)
            ------------------------------------------------------------- */}
        <g stroke="url(#sandstone-chalk)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(1730, 260) scale(0.85)">
            <circle cx="50" cy="50" r="32" strokeWidth="2.0" />
            <circle cx="50" cy="50" r="16" stroke="url(#warm-sandstone)" strokeWidth="1.8" fill="rgba(209,196,182,0.1)" />
            <rect x="44" y="10" width="12" height="10" rx="2" strokeWidth="1.4" />
            <rect x="44" y="80" width="12" height="10" rx="2" strokeWidth="1.4" />
            <rect x="10" y="44" width="10" height="12" rx="2" strokeWidth="1.4" />
            <rect x="80" y="44" width="10" height="12" rx="2" strokeWidth="1.4" />
          </g>
        </g>

        {/* -------------------------------------------------------------
            SKETCH 12: 🎙️ Retro Speech Ribbon Microphone (Right Mid)
            ------------------------------------------------------------- */}
        <g stroke="url(#sandstone-chalk)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(1580, 290) scale(0.85)">
            <rect x="40" y="30" width="34" height="65" rx="17" strokeWidth="2.2" stroke="url(#warm-sandstone)" />
            <line x1="40" y1="50" x2="74" y2="50" strokeWidth="1.2" />
            <line x1="40" y1="65" x2="74" y2="65" strokeWidth="1.2" />
            <line x1="40" y1="80" x2="74" y2="80" strokeWidth="1.2" />
            <path d="M 28 65 L 28 100 Q 57 125 86 100 L 86 65" strokeWidth="2.0" />
            <line x1="57" y1="116" x2="57" y2="155" strokeWidth="2.4" />
            <path d="M 30 155 L 84 155 L 94 170 L 20 170 Z" strokeWidth="2.0" />
            <path d="M 85 45 Q 110 65 85 85" stroke="url(#warm-sandstone)" strokeWidth="1.4" strokeDasharray="3 3" />
          </g>
        </g>

        {/* -------------------------------------------------------------
            SKETCH 13: 📜 Antique Scroll & Feather Quill (Right Lower Mid)
            ------------------------------------------------------------- */}
        <g stroke="url(#sandstone-chalk)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(1620, 510) scale(0.85)">
            <path d="M 20 20 Q 80 5 140 20 Q 150 70 140 120 Q 80 105 20 120 Q 10 70 20 20 Z" strokeWidth="2.0" fill="rgba(245,240,235,0.06)" />
            <path d="M 35 45 L 125 45 M 35 65 L 125 65 M 35 85 L 105 85" strokeWidth="1.2" opacity="0.6" />
            <path d="M 120 -20 Q 110 40 80 90 L 76 94 L 84 88 Q 115 45 130 -20 Z" stroke="url(#warm-sandstone)" strokeWidth="1.6" />
          </g>
        </g>

        {/* -------------------------------------------------------------
            SKETCH 14: 🎓 Graduation Mortarboard & Tassel (Far Right)
            ------------------------------------------------------------- */}
        <g stroke="url(#sandstone-chalk)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(1420, 520) rotate(-15) scale(0.9)">
            <polygon points="80,10 150,40 80,70 10,40" strokeWidth="2.4" fill="rgba(245,240,235,0.08)" />
            <path d="M 35 48 L 35 75 Q 80 105 125 75 L 125 48" strokeWidth="1.8" />
            <circle cx="80" cy="40" r="3.5" fill="#f5f0eb" />
            <path d="M 80 40 Q 130 50 140 80" stroke="url(#warm-sandstone)" strokeWidth="1.6" />
            <rect x="136" y="80" width="8" height="22" rx="2" stroke="url(#warm-sandstone)" strokeWidth="1.6" />
          </g>
        </g>

        {/* -------------------------------------------------------------
            SKETCH 15: ✈️ Origami Paper Airplanes (Upper Right Sky)
            ------------------------------------------------------------- */}
        <g stroke="url(#sandstone-chalk)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(1480, 210) rotate(-28) scale(0.85)">
            <polygon points="10,60 110,10 60,80" strokeWidth="2.0" fill="rgba(245,240,235,0.08)" />
            <line x1="110" y1="10" x2="60" y2="80" strokeWidth="1.5" />
            <path d="M 5 65 Q -30 90 -60 70" stroke="url(#warm-sandstone)" strokeWidth="1.4" strokeDasharray="4 3" />
          </g>
        </g>

        {/* -------------------------------------------------------------
            SKETCH 16: ⚽ Classic Football / Soccer Ball (Bottom Right)
            ------------------------------------------------------------- */}
        <g stroke="url(#sandstone-chalk)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(1500, 780) scale(0.92)">
            <circle cx="0" cy="0" r="46" strokeWidth="2.4" />
            <polygon
              points="0,-16 15,-5 9,13 -9,13 -15,-5"
              fill="rgba(214, 199, 184, 0.35)"
              stroke="url(#warm-sandstone)"
              strokeWidth="2.0"
            />
            <line x1="0" y1="-16" x2="0" y2="-45" strokeWidth="1.6" />
            <line x1="15" y1="-5" x2="42" y2="-15" strokeWidth="1.6" />
            <line x1="9" y1="13" x2="26" y2="38" strokeWidth="1.6" />
            <line x1="-9" y1="13" x2="-26" y2="38" strokeWidth="1.6" />
            <line x1="-15" y1="-5" x2="-42" y2="-15" strokeWidth="1.6" />
            <path d="M 0 -45 Q 22 -35 42 -15" strokeWidth="1.5" />
            <path d="M 42 -15 Q 38 15 26 38" strokeWidth="1.5" />
            <path d="M 26 38 Q 0 45 -26 38" strokeWidth="1.5" />
            <path d="M -26 38 Q -38 15 -42 -15" strokeWidth="1.5" />
            <path d="M -42 -15 Q -22 -35 0 -45" strokeWidth="1.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
