"use client";

export default function CustomCursor({ mouse, hovered, ACCENT }) {
  return (
    <div
      className="cursor"
      style={{
        width: hovered ? 1 : 12,
        height: hovered ? 1: 12,
        background: hovered ? ACCENT : "#fff",
        left: mouse.x - (hovered ? 19 : 6),
        top: mouse.y - (hovered ? 19 : 6),
        boxShadow: hovered ? `0 0 24px ${ACCENT}` : "0 0 8px rgba(255,255,255,0.4)",
      }}
    />
  );
}