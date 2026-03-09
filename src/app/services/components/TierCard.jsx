"use client";
import { useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────
   CLASSIC COLOUR PALETTE
───────────────────────────────────────── */
const C = {
  base:      "#FDFAF5",
  primary:   "#8B3A3A",
  darkAcc:   "#5C2122",
  secondary: "#EADBC6",
  highlight: "#C19A6B",
  text:      "#2C1810",
  textMid:   "#5C4033",
  textSoft:  "#8B6B5E",
};

export default function TierCard({ tier }) {
  const [hov, setHov] = useState(false);
  const pop = tier.popular;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        background: pop 
          ? `linear-gradient(165deg, ${C.darkAcc} 0%, #3A2420 100%)`
          : hov 
          ? C.secondary 
          : C.base,
        border: pop
          ? `1px solid ${C.highlight}`
          : `1px solid ${C.primary}15`,
        borderRadius: 4,
        padding: "36px 28px",
        transition: "all 0.4s ease",
        transform: hov && !pop ? "translateY(-4px)" : pop ? "translateY(-2px)" : "none",
        boxShadow: pop
          ? `0 20px 40px -12px ${C.primary}40`
          : hov
          ? `0 15px 30px -10px ${C.primary}20`
          : "0 4px 12px rgba(0,0,0,0.02)",
        position: "relative",
        fontFamily: "'Playfair Display', serif",
        cursor: "default",
      }}
    >
      {/* Decorative top border */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "10%",
        right: "10%",
        height: 2,
        background: `linear-gradient(90deg, transparent, ${C.highlight}, transparent)`,
        opacity: pop ? 0.8 : 0.3,
      }} />

      {pop && (
        <div style={{
          position: "absolute",
          top: -10,
          left: 24,
          background: C.highlight,
          color: C.darkAcc,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.55rem",
          letterSpacing: "0.2em",
          padding: "4px 16px",
          textTransform: "uppercase",
          fontWeight: 600,
        }}>
          THE COLLECTOR'S CHOICE
        </div>
      )}

      {/* Tier name */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.7rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: pop ? "rgba(255,255,255,0.6)" : C.textSoft,
        marginBottom: 12,
        fontWeight: 400,
      }}>
        {tier.name}
      </div>

      {/* Price placeholder */}
      {/* <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.8rem",
        fontWeight: 500,
        fontStyle: "italic",
        color: pop ? "#fff" : C.primary,
        lineHeight: 1.1,
        marginBottom: 8,
        letterSpacing: "-0.02em",
      }}>
        Upon Request
      </div> */}

      {/* <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.8rem",
        color: pop ? "rgba(255,255,255,0.4)" : C.textSoft,
        marginBottom: 24,
      }}>
        Tailored to your vision
      </div> */}

      {/* Divider */}
      <div style={{
        height: 1,
        width: "40px",
        background: pop ? C.highlight : C.primary,
        marginBottom: 28,
        opacity: pop ? 0.8 : 0.3,
      }} />

      {/* Features */}
      <ul style={{
        flex: 1,
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}>
        {tier.features.map((f, i) => (
          <li key={i} style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem",
            color: pop ? "rgba(255,255,255,0.8)" : C.textMid,
            lineHeight: 1.5,
            fontWeight: 400,
          }}>
            <span style={{
              color: pop ? C.highlight : C.primary,
              fontSize: "0.7rem",
              marginTop: 4,
            }}>✦</span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/#contact"
        style={{
          display: "block",
          marginTop: 30,
          padding: "12px 0",
          background: pop ? "transparent" : "transparent",
          border: `1px solid ${pop ? C.highlight : C.primary}`,
          color: pop ? "#fff" : C.primary,
          textAlign: "center",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.8rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          textDecoration: "none",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = pop ? C.highlight : C.primary;
          e.currentTarget.style.color = pop ? C.darkAcc : "#fff";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = pop ? "#fff" : C.primary;
        }}
      >
        Request Proposal
      </Link>
    </div>
  );
}