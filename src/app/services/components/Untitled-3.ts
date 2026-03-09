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
const currentSection = document.querySelector("#hero-section");
const nextSection = currentSection?.nextElementSibling;


if (nextSection) {
  nextSection.scrollIntoView({
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


  {/* Splash Cursor */}
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
    }}
  >
    <h1
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(3rem, 8vw, 7rem)",
        fontWeight: 700,
        color: "#fff",
        marginBottom: 28,
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
  </div>

  {/* MOBILE SCROLL BUTTON */}
  {isMobile && (
    <button
      onClick={scrollToNextSection}
      style={{
        position: "absolute",
        bottom: "160px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "42px",
        height: "42px",
        borderRadius: "12px",
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.25)",
        color: "#fff",
        fontSize: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(12px)",
        cursor: "pointer",
        zIndex: 20,
        animation: "mobilePulse 2s infinite",
      }}
    >
      ↓
    </button>
  )}

  {/* DESKTOP SCROLL INDICATOR */}
  {!isMobile && (
    <div
      onClick={scrollToNextSection}
      style={{
        position: "absolute",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "1.6rem",
        color: "rgba(255,255,255,0.6)",
        cursor: "pointer",
        animation: "desktopBounce 2s infinite",
        zIndex: 10,
      }}
    >
      ↓
    </div>
  )}

  <style jsx>{`

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

  `}</style>

</section>


);
}
