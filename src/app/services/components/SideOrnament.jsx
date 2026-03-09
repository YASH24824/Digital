"use client";

/* ─────────────────────────────────────────
   CLASSIC COLOUR PALETTE
───────────────────────────────────────── */
const C = {
  primary: "#8B3A3A",
};

export default function SideOrnament({ side }) {
  return (
    <div style={{
      position: "fixed",
      top: "50%",
      [side]: 20,
      transform: "translateY(-50%)",
      width: 80,
      height: 200,
      zIndex: 20,
      pointerEvents: "none",
      opacity: 0.4,
    }}>
      <svg width="80" height="200" viewBox="0 0 80 200" fill="none">
        <path d="M40 0 L40 200" stroke={C.primary} strokeWidth="0.5" strokeDasharray="4 6" opacity="0.3"/>
        <circle cx="40" cy="40" r="4" stroke={C.primary} strokeWidth="0.5" fill="none" opacity="0.4"/>
        <circle cx="40" cy="100" r="6" stroke={C.primary} strokeWidth="0.5" fill="none" opacity="0.4"/>
        <circle cx="40" cy="160" r="4" stroke={C.primary} strokeWidth="0.5" fill="none" opacity="0.4"/>
        <path d="M20 20 Q40 30, 60 20" stroke={C.primary} strokeWidth="0.5" fill="none" opacity="0.2"/>
        <path d="M20 180 Q40 170, 60 180" stroke={C.primary} strokeWidth="0.5" fill="none" opacity="0.2"/>
      </svg>
    </div>
  );
}