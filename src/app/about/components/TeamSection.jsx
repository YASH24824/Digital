"use client";
import BlobBackground from "./BlobBackground";
import { ACCENT, teamMembers, PARTICLES } from "../data/aboutData";

export default function TeamSection({ teamRef, teamVisible, setHovered }) {
  return (
    <BlobBackground color={ACCENT}>
      <section
        ref={teamRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: "#0A0A0A",
          color: "#fff",
          padding: "100px 48px",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Background glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse 50% 40% at 15% 30%, ${ACCENT}18 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 85% 70%, ${ACCENT}12 0%, transparent 60%)
          `,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1300, margin: "0 auto", width: "100%", position: "relative", zIndex: 5 }}>
          {/* Header */}
          <div
            className={`fade-up ${teamVisible ? "in" : ""}`}
            style={{ textAlign: "center", marginBottom: 64 }}
          >
            <p style={{
              fontSize: "0.72rem",
              letterSpacing: "0.45em",
              color: ACCENT,
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 14,
            }}>
              ✦ THE DREAM TEAM ✦
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.15,
            }}>
              The Architects Behind{" "}
              <em style={{ color: ACCENT, fontStyle: "italic" }}>The Magic</em>
            </h2>
          </div>

          {/* Grid */}
          <div
            className="team-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 28,
            }}
          >
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className={`team-card fade-up ${teamVisible ? "in" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Avatar area */}
                <div style={{
                  height: 220,
                  background: `linear-gradient(135deg, ${member.color}55, ${member.color})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: 100, height: 100,
                    borderRadius: "50%",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: member.color,
                    boxShadow: `0 12px 32px ${member.color}80`,
                    fontFamily: "'Playfair Display', serif",
                    zIndex: 2,
                  }}>
                    {member.initials}
                  </div>
                  {PARTICLES.slice(0, 5).map((p, pi) => (
                    <div key={pi} className="particle" style={{
                      position: "absolute", bottom: 10, left: p.left,
                      width: 4, height: 4,
                      background: "rgba(255,255,255,0.6)",
                      borderRadius: "50%",
                      animationDuration: p.duration,
                      animationDelay: p.delay,
                    }} />
                  ))}
                </div>

                {/* Info */}
                <div style={{ padding: "24px 24px 28px" }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: 4,
                  }}>
                    {member.name}
                  </h3>
                  <p style={{
                    fontSize: "0.75rem",
                    color: member.color,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}>
                    {member.role}
                  </p>
                  <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: 18 }}>
                    {member.bio}
                  </p>
                  <p style={{
                    fontSize: "0.85rem",
                    fontStyle: "italic",
                    color: member.color,
                    paddingTop: 14,
                    borderTop: `1px solid ${member.color}30`,
                    lineHeight: 1.5,
                  }}>
                    "{member.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </BlobBackground>
  );
}