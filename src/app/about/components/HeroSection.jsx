"use client";
import { useState, useEffect } from "react";
import SplashCursor from "./SplashCursor";
import { ACCENT } from "../data/aboutData";

export default function HeroSection({ heroVisible, setHovered = () => {} }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const badges = [
    {
      text: "DESIGN",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
        </svg>
      ),
    },
    {
      text: "DEVELOP",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      text: "STRATEGY",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 20h20" />
          <path d="M5 20V10l7-7 7 7v10" />
          <path d="M9 20v-5h6v5" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="hero-section"
      style={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "#0A0A0A",
        touchAction: "pan-y",
      }}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
    >
      {/* SPLASH CURSOR */}
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <SplashCursor
            SIM_RESOLUTION={128}
            DYE_RESOLUTION={1024}
            DENSITY_DISSIPATION={3.5}
            VELOCITY_DISSIPATION={2}
            PRESSURE={0.1}
            PRESSURE_ITERATIONS={20}
            CURL={3}
            SPLAT_RADIUS={0.2}
            SPLAT_FORCE={6000}
            COLOR_UPDATE_SPEED={10}
          />
        </div>
      )}

      {/* GRID BACKGROUND */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          maxWidth: 1100,
          padding: "0 24px",
          pointerEvents: "none",
        }}
      >
        {/* BADGES */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: isMobile ? 25 : 40,
            flexWrap: "wrap",
          }}
        >
          {badges.map((badge, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                animation: heroVisible
                  ? `badgeFloat ${2.2 + i * 0.4}s ease-in-out infinite`
                  : "none",
                animationDelay: `${i * 0.2}s`,
              }}
            >
              {isMobile && <div style={{ opacity: 0.9 }}>{badge.icon}</div>}

              <span
                style={{
                  padding: "8px 18px",
                  background: "#000",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 40,
                  color: "#fff",
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                }}
              >
                {badge.text}
              </span>
            </div>
          ))}
        </div>

        {/* TITLE */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? "3rem" : "clamp(3rem, 8vw, 7rem)",
            fontWeight: 700,
            lineHeight: 1,
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            marginBottom: isMobile ? 18 : 28,
          }}
        >
          DIGITAL{" "}
          <span
            style={{
              textShadow: `0 0 40px ${ACCENT}80`,
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              color: ACCENT,
            }}
          >
            SAHAAY
          </span>
        </h1>

        {/* SUBTITLE */}
        <p
          style={{
            fontSize: isMobile ? "0.95rem" : "1.15rem",
            color: "rgba(255,255,255,0.75)",
            maxWidth: 600,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          A collective of designers, developers & strategists building digital
          solutions that don't just look beautiful —{" "}
          <span style={{ color: ACCENT, fontWeight: 600 }}>
            they drive real growth.
          </span>
        </p>
      </div>

      
    </section>
  );
}