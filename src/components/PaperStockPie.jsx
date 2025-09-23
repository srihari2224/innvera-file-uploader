import React from "react"

const PaperStockPie = ({ capacity = 0, left = 0, size = 80, strokeWidth = 16 }) => {
  const cap = Math.max(0, Number(capacity) || 0)
  const remaining = Math.max(0, Number(left) || 0)
  const used = Math.max(0, Math.min(cap, cap - remaining))

  // circumference
  const r = (size - strokeWidth) / 2
  const c = 2 * Math.PI * r

  // arc lengths
  const usedLen = cap === 0 ? 0 : (used / cap) * c
  const remLen = Math.max(0, c - usedLen)

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: 16,
    color: "#ededed",
    fontSize: 14,
    marginTop: 30,
    marginLeft:10
  }

  const legendItem = (color, label) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 12, height: 12, background: color, borderRadius: 3, display: "inline-block" }} />
      <span>{label}</span>
    </div>
  )

  return (
    <div style={containerStyle} aria-label="Paper stock status">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-hidden>
        <g transform={`translate(${size / 2}, ${size / 2}) rotate(-90)`}>
          {/* Full white background ring */}
          <circle
            r={r}
            cx="0"
            cy="0"
            fill="transparent"
            stroke="#ffffff"
            strokeOpacity={1}
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
            style={{ transition: "stroke 200ms" }}
          />

          {/* Used arc drawn on top (blue). strokeDasharray = usedLen, remLen */}
          <circle
            r={r}
            cx="0"
            cy="0"
            fill="transparent"
            stroke="#007bff"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${usedLen} ${remLen}`}
            style={{ transition: "stroke-dasharray 600ms ease, stroke 200ms" }}
          />
        </g>
      </svg>

      <div>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Paper status</div>

        <div style={{ marginBottom: 8 }}>
          {/* <strong style={{ color: "#fff", fontSize: 16 }}>{used}</strong>
          <span style={{ color: "#bbb" }}> used</span>
          <span style={{ margin: "0 8px", color: "#888" }}>•</span>
          <strong style={{ color: "#fff", fontSize: 16 }}>{remaining}</strong>
          <span style={{ color: "#bbb" }}> left</span> */}
          <div style={{ color: "#999", fontSize: 13, marginTop: 4 }}>{cap} total capacity</div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {legendItem("#007bff", `Used ${used} `)}
          {legendItem("#ffffff", `Left ${remaining} `)}
        </div>
      </div>
    </div>
  )
}

export default PaperStockPie