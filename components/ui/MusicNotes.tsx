// Decorative floating music notes — fixed behind all content

const NOTES = [
  { symbol: "𝄞", top: "4%",  left: "3%",   size: 72, opacity: 0.045, rotate: -12 },
  { symbol: "♩", top: "11%", left: "91%",  size: 48, opacity: 0.04,  rotate: 8  },
  { symbol: "♫", top: "24%", left: "7%",   size: 38, opacity: 0.035, rotate: -6 },
  { symbol: "♪", top: "36%", left: "95%",  size: 52, opacity: 0.04,  rotate: 14 },
  { symbol: "♬", top: "51%", left: "2%",   size: 44, opacity: 0.04,  rotate: -10 },
  { symbol: "♩", top: "62%", left: "88%",  size: 60, opacity: 0.035, rotate: 6  },
  { symbol: "𝄢", top: "74%", left: "5%",   size: 56, opacity: 0.04,  rotate: -8 },
  { symbol: "♫", top: "85%", left: "93%",  size: 40, opacity: 0.035, rotate: 10 },
  { symbol: "♪", top: "93%", left: "8%",   size: 46, opacity: 0.04,  rotate: -5 },
]

export function MusicNotes() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {NOTES.map((n, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: n.top,
            left: n.left,
            fontSize: n.size,
            opacity: n.opacity,
            color: "var(--t-text)",
            transform: `rotate(${n.rotate}deg)`,
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          {n.symbol}
        </span>
      ))}
    </div>
  )
}
