"use client";
import TierCard from "./TierCard";

/* ─────────────────────────────────────────
   CLASSIC COLOUR PALETTE
───────────────────────────────────────── */
const C = {
  base:      "#FDFAF5",
  primary:   "#8B3A3A",
  text:      "#2C1810",
  textSoft:  "#8B6B5E",
};

export default function ServiceSection({ cat, index }) {
  return (
    <section id={cat.id} style={{
      padding: "90px 0",
      borderBottom: `1px solid ${C.primary}10`,
      position: "relative",
    }}>
      {/* Section number */}
      <div style={{
        position: "absolute",
        top: 90,
        left: -20,
        fontSize: "8rem",
        fontWeight: 300,
        color: C.primary,
        opacity: 0.03,
        fontFamily: "'Playfair Display', serif",
        pointerEvents: "none",
        userSelect: "none",
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <div style={{ marginBottom: 48, position: "relative" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
        }}>
          <span style={{
            fontSize: "1.4rem",
            color: C.primary,
          }}>{cat.icon}</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: C.textSoft,
          }}>
            {cat.label}
          </span>
        </div>
        
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
          fontWeight: 600,
          color: C.text,
          lineHeight: 1.1,
          marginBottom: 10,
          letterSpacing: "-0.02em",
        }}>
          {cat.label}
        </h2>
        
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.1rem",
          fontStyle: "italic",
          color: C.textSoft,
          maxWidth: 500,
        }}>
          {cat.tagline}
        </p>
      </div>

      {/* Grid */}
      <div
        className="tier-grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cat.tiers.length}, 1fr)`,
          gap: 24,
          alignItems: "stretch",
        }}
      >
        {cat.tiers.map(t => <TierCard key={t.name} tier={t} />)}
      </div>
    </section>
  );
}