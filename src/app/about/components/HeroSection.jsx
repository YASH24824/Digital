"use client";
import { useState, useEffect } from "react";
import SplashCursor from "./SplashCursor";
import { ACCENT } from "../data/aboutData";

export default function HeroSection({ heroVisible, setHovered }) {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const scrollToNextSection = () => {
    const next = document.querySelector("#hero-section")?.nextElementSibling;

    if (next) {
      next.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="hero-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "#0A0A0A",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* SPLASH CURSOR */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <SplashCursor
          SIM_RESOLUTION={isMobile ? 64 : 128}
          DYE_RESOLUTION={isMobile ? 512 : 1024}
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

      {/* GRID */}
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
          {["DESIGN", "DEVELOP", "STRATEGY"].map((text, i) => (
            <span
              key={i}
              style={{
                padding: "8px 18px",
                background: "#000",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 40,
                color: "#fff",
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                animation: heroVisible
                  ? `badgeFloat ${2.2 + i * 0.4}s ease-in-out infinite`
                  : "none",
              }}
            >
              {text}
            </span>
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
              fontStyle: "italic",
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

      {/* MOBILE SCROLL BUTTON */}
      {isMobile && (
        <button
          onClick={scrollToNextSection}
          style={{
            position: "absolute",
            bottom: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "46px",
            height: "46px",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff",
            fontSize: "1.4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(10px)",
            cursor: "pointer",
            zIndex: 50,
            animation: "mobilePulse 2s infinite",
          }}
        >
          ↓
        </button>
      )}

      {/* DESKTOP SCROLL */}
      {!isMobile && (
        <div
          onClick={scrollToNextSection}
          style={{
            position: "absolute",
            bottom: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "1.8rem",
            color: "rgba(255,255,255,0.7)",
            cursor: "pointer",
            animation: "desktopBounce 2s infinite",
            zIndex: 20,
          }}
        >
          ↓
        </div>
      )}

      <style jsx>{`

        #hero-section canvas {
          pointer-events:none !important;
        }

        @keyframes desktopBounce {
          0%,20%,50%,80%,100%{
            transform:translateX(-50%) translateY(0);
          }
          40%{
            transform:translateX(-50%) translateY(-18px);
          }
          60%{
            transform:translateX(-50%) translateY(-10px);
          }
        }

        @keyframes mobilePulse {
          0%,100%{
            transform:translateX(-50%) scale(1);
          }
          50%{
            transform:translateX(-50%) scale(1.12);
          }
        }

        @keyframes badgeFloat {
          0%,100%{
            transform:translateY(0);
          }
          50%{
            transform:translateY(-6px);
          }
        }

      `}</style>
    </section>
  );
}