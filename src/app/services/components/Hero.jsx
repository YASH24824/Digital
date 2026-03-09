"use client";
import Link from "next/link";

const C = {
  base:      "#FAFAF9",
  primary:   "#9B7B5E",
  darkAcc:   "#6B4C35",
  secondary: "#F5EFE6",
  highlight: "#B89578",
  text:      "#1a1a1a",
  textMid:   "#3d2e22",
  textSoft:  "#8a7060",
};

export default function Hero({ onExplore }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap');

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroPulse {
          0%,100% { opacity: 0.45; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.3); }
        }
        @keyframes heroLineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes heroFloatScroll {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(-7px); }
        }
        @keyframes heroSpinCW {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes heroSpinCCW {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(-360deg); }
        }
        @keyframes heroSpinCorner {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes tagFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
        @keyframes breatheGlow {
          0%,100% { transform: translate(-50%,-50%) scale(1);    opacity: 0.15; }
          50%      { transform: translate(-50%,-50%) scale(1.2);  opacity: 0.28; }
        }
        @keyframes orbitA {
          from { transform: rotate(0deg)   translateX(148px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(148px) rotate(-360deg); }
        }
        @keyframes orbitB {
          from { transform: rotate(200deg) translateX(210px) rotate(-200deg); }
          to   { transform: rotate(560deg) translateX(210px) rotate(-560deg); }
        }
        @keyframes orbitC {
          from { transform: rotate(100deg) translateX(270px) rotate(-100deg); }
          to   { transform: rotate(460deg) translateX(270px) rotate(-460deg); }
        }
        @keyframes sideFloat {
          0%,100% { transform: translateY(0)   scale(1);    opacity: 0.45; }
          50%      { transform: translateY(-12px) scale(1.2); opacity: 1; }
        }

        .hero-cta-primary {
          padding: 14px 46px;
          background: ${C.primary};
          color: #fff;
          border: 1.5px solid ${C.primary};
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          border-radius: 3px;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px ${C.primary}28;
        }
        .hero-cta-primary:hover {
          background: ${C.darkAcc};
          border-color: ${C.darkAcc};
          transform: translateY(-2px);
          box-shadow: 0 14px 32px ${C.primary}38;
        }
        .hero-cta-outline {
          padding: 14px 46px;
          background: transparent;
          color: ${C.primary};
          border: 1.5px solid ${C.primary}55;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          border-radius: 3px;
          transition: all 0.3s ease;
        }
        .hero-cta-outline:hover {
          background: ${C.secondary};
          border-color: ${C.primary};
          transform: translateY(-2px);
        }
        .hero-service-tag {
          padding: 7px 18px;
          border: 1px solid ${C.primary}22;
          border-radius: 30px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          color: ${C.textSoft};
          background: ${C.base};
          transition: all 0.25s ease;
          cursor: default;
        }
        .hero-service-tag:hover {
          background: ${C.secondary};
          border-color: ${C.primary}45;
          color: ${C.textMid};
        }
      `}</style>

      <section style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: C.base,
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}>

        {/* ── Grid texture ── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(${C.primary}06 1px, transparent 1px),
            linear-gradient(90deg, ${C.primary}06 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }} />

        {/* ── Warm wash top-left ── */}
        <div style={{
          position: "absolute", top: "-20%", left: "-10%",
          width: "55vw", height: "55vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${C.secondary} 0%, transparent 68%)`,
          pointerEvents: "none", opacity: 0.85,
        }} />

        {/* ── Blush bottom-right ── */}
        <div style={{
          position: "absolute", bottom: "-12%", right: "-8%",
          width: "38vw", height: "38vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${C.primary}10 0%, transparent 68%)`,
          pointerEvents: "none",
        }} />

        {/* ════════════════════════════════════
            CIRCLE ANIMATION SYSTEM
        ════════════════════════════════════ */}

        {/* 1 — Breathing soft glow blob */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 500, height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.primary}20 0%, transparent 65%)`,
          animation: "breatheGlow 5s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        {/* 2 — Outermost faint ring, very slow CW */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 620, height: 620, borderRadius: "50%",
          border: `1px solid ${C.primary}07`,
          borderLeftColor: `${C.primary}18`,
          animation: "heroSpinCW 50s linear infinite",
          pointerEvents: "none",
        }} />

        {/* 3 — Dashed ring, medium slow CCW */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 480, height: 480, borderRadius: "50%",
          border: `1px dashed ${C.primary}18`,
          animation: "heroSpinCCW 30s linear infinite",
          pointerEvents: "none",
        }} />

        {/* 4 — Accent arc ring, medium CW */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 380, height: 380, borderRadius: "50%",
          border: `1px solid ${C.primary}10`,
          borderTopColor: `${C.primary}50`,
          borderRightColor: `${C.primary}28`,
          animation: "heroSpinCW 18s linear infinite",
          pointerEvents: "none",
        }} />

        {/* 5 — Fast thin arc, CCW */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 280, height: 280, borderRadius: "50%",
          border: `1.5px solid transparent`,
          borderTopColor: `${C.primary}48`,
          borderBottomColor: `${C.primary}18`,
          animation: "heroSpinCCW 9s linear infinite",
          pointerEvents: "none",
        }} />

        {/* 6 — Innermost small solid ring, fast CW */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 180, height: 180, borderRadius: "50%",
          border: `1px solid ${C.primary}14`,
          borderBottomColor: `${C.primary}40`,
          animation: "heroSpinCW 6s linear infinite",
          pointerEvents: "none",
        }} />

        {/* 7 — Orbiting dot A — inner orbit */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 9, height: 9,
          marginTop: -4.5, marginLeft: -4.5,
          borderRadius: "50%",
          background: C.primary,
          boxShadow: `0 0 12px ${C.primary}90, 0 0 24px ${C.primary}40`,
          animation: "orbitA 7s linear infinite",
          pointerEvents: "none",
        }} />

        {/* 8 — Orbiting dot B — mid orbit */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 7, height: 7,
          marginTop: -3.5, marginLeft: -3.5,
          borderRadius: "50%",
          background: C.highlight,
          boxShadow: `0 0 10px ${C.highlight}80`,
          animation: "orbitB 13s linear infinite",
          pointerEvents: "none",
        }} />

        {/* 9 — Orbiting dot C — outer orbit, very slow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 5, height: 5,
          marginTop: -2.5, marginLeft: -2.5,
          borderRadius: "50%",
          background: `${C.primary}95`,
          boxShadow: `0 0 8px ${C.primary}60`,
          animation: "orbitC 22s linear infinite",
          pointerEvents: "none",
        }} />

        {/* ── Corner spinning rings (top-right) ── */}
        {[160, 110, 64].map((s, i) => (
          <div key={i} style={{
            position: "absolute",
            top: `calc(4% + ${i * 26}px)`,
            right: `calc(4% + ${i * 26}px)`,
            width: s, height: s, borderRadius: "50%",
            border: `1px solid ${i === 2 ? C.primary + "32" : C.primary + "10"}`,
            animation: `heroSpinCorner ${14 - i * 3}s linear infinite${i % 2 ? " reverse" : ""}`,
            pointerEvents: "none",
          }} />
        ))}

        {/* ── Corner brackets ── */}
        <div style={{
          position: "absolute", top: 36, left: 36,
          width: 52, height: 52,
          borderLeft: `1.5px solid ${C.primary}28`,
          borderTop: `1.5px solid ${C.primary}28`,
          animation: "heroFadeUp 0.8s ease 0.8s both",
        }} />
        <div style={{
          position: "absolute", bottom: 36, right: 36,
          width: 52, height: 52,
          borderRight: `1.5px solid ${C.primary}28`,
          borderBottom: `1.5px solid ${C.primary}28`,
          animation: "heroFadeUp 0.8s ease 0.9s both",
        }} />

        {/* ── Side floating dot columns ── */}
        <div style={{ position: "absolute", left: 28, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 14, pointerEvents: "none" }}>
          {[8, 5, 4, 5, 8].map((s, i) => (
            <div key={i} style={{
              width: s, height: s, borderRadius: "50%",
              background: i === 2 ? C.primary : `${C.primary}${i === 1 || i === 3 ? "60" : "28"}`,
              animation: `sideFloat ${2.4 + i * 0.35}s ease-in-out infinite`,
              animationDelay: `${i * 0.28}s`,
            }} />
          ))}
        </div>
        <div style={{ position: "absolute", right: 28, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 14, pointerEvents: "none" }}>
          {[8, 5, 4, 5, 8].map((s, i) => (
            <div key={i} style={{
              width: s, height: s, borderRadius: "50%",
              background: i === 2 ? C.primary : `${C.primary}${i === 1 || i === 3 ? "60" : "28"}`,
              animation: `sideFloat ${2.4 + i * 0.35}s ease-in-out infinite`,
              animationDelay: `${i * 0.28 + 0.5}s`,
            }} />
          ))}
        </div>

        {/* ════════════════════════════════════
            CONTENT
        ════════════════════════════════════ */}
        <div style={{
          position: "relative", zIndex: 2,
          maxWidth: 860, width: "100%",
          textAlign: "center",
          display: "flex", flexDirection: "column",
          alignItems: "center",
          padding: "0 24px",
        }}>

     

          {/* Title */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3.4rem, 6.5vw, 5.8rem)",
            fontWeight: 600, color: C.text,
            lineHeight: 1.02, marginBottom: 20,
            letterSpacing: "-0.025em",
            animation: "heroFadeUp 0.8s ease 0.1s both",
          }}>
            Digital{" "}
            <em style={{ color: C.primary, fontStyle: "italic", fontFamily: "'Playfair Display', serif" }}>
              Sahaay
            </em>
          </h1>

          {/* Divider */}
          <div style={{
            width: 52, height: 1.5, background: C.primary,
            opacity: 0.35, marginBottom: 24,
            transformOrigin: "center",
            animation: "heroLineGrow 0.7s ease 0.3s both",
          }} />

          {/* Subtitle */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            fontWeight: 300, color: C.textSoft,
            maxWidth: 520, marginBottom: 44, lineHeight: 1.9,
            animation: "heroFadeUp 0.8s ease 0.2s both",
          }}>
            A curated collection of digital services, thoughtfully crafted for
            those who seek distinction.
          </p>

        

          {/* CTAs */}
          <div style={{
            display: "flex", gap: 14,
            justifyContent: "center", flexWrap: "wrap",
            animation: "heroFadeUp 0.8s ease 0.4s both",
          }}>
            <button onClick={onExplore} className="hero-cta-outline">
              Explore Collection
            </button>
            <Link href="/contact" className="hero-cta-primary">
              Private Consultation
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div onClick={onExplore} style={{
          position: "absolute", bottom: 32, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 7,
          cursor: "pointer", zIndex: 2,
          animation: "heroFadeUp 1s ease 0.7s both",
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.54rem", fontWeight: 500,
            letterSpacing: "0.32em", textTransform: "uppercase",
            color: C.textSoft,
          }}>
            Scroll
          </span>
          <div style={{
            width: 1, height: 38,
            background: `linear-gradient(${C.primary}, transparent)`,
            animation: "heroFloatScroll 2s ease-in-out infinite",
          }} />
        </div>
      </section>
    </>
  );
}