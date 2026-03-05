"use client";

import { useState, useEffect } from "react";

export default function Hero() {
  const [hoveredWord, setHoveredWord] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isHovering =
    hoveredWord === "growth" || hoveredWord === "dominance";

  const getOpacity = (word) => {
    if (!isHovering) return 1; // Normal state - all visible
    if (hoveredWord === word) return 1; // Hovered word - fully visible
    return 0; // All other words - completely invisible
  };

  return (
    <section
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#ffffff", // PURE WHITE
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Playfair Display, serif",
        transition: "background 0.4s ease",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: 900,
          padding: 20,
        }}
      >
        {/* Empowering Your */}
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 400,
            color: "#000000",
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            opacity: getOpacity("normal"),
            transition: "opacity 0.4s ease",
          }}
        >
          Empowering Your
        </h1>

        {/* Digital Growth */}
        <h1
          onMouseEnter={() => setHoveredWord("growth")}
          onMouseLeave={() => setHoveredWord(null)}
          style={{
            fontSize: "clamp(3rem, 6vw, 5rem)",
            fontWeight: 400,
            color: hoveredWord === "growth" ? "#5C2122" : "#000000",
            margin: "0.1em 0 0.3em",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            cursor: "pointer",
            opacity: getOpacity("growth"),
            transform:
              hoveredWord === "growth" ? "scale(1.08)" : "scale(1)",
            transition: "all 0.4s ease",
            textShadow: hoveredWord === "growth" ? "0 0 30px rgba(92,33,34,0.3)" : "none",
          }}
        >
          Digital Growth.
        </h1>

        {/* Sub Lines */}
        <p
          style={{
            fontSize: "clamp(1.3rem, 3vw, 2rem)",
            fontWeight: 400,
            color: "#000000",
            margin: "0.1em 0 0",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            opacity: getOpacity("normal"),
            transition: "opacity 0.4s ease",
          }}
        >
          We craft, build, and elevate
        </p>

        <p
          style={{
            fontSize: "clamp(1.3rem, 3vw, 2rem)",
            fontWeight: 400,
            color: "#000000",
            margin: "0.1em 0 0",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            opacity: getOpacity("normal"),
            transition: "opacity 0.4s ease",
          }}
        >
          brands to achieve online
        </p>

        {/* Dominance */}
        <p
          onMouseEnter={() => setHoveredWord("dominance")}
          onMouseLeave={() => setHoveredWord(null)}
          style={{
            fontSize: "clamp(1.3rem, 3vw, 2rem)",
            fontWeight: 400,
            color: hoveredWord === "dominance" ? "#8B1A1A" : "#000000",
            margin: "0.2em 0 1.5em",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            cursor: "pointer",
            opacity: getOpacity("dominance"),
            transform:
              hoveredWord === "dominance"
                ? "scale(1.08)"
                : "scale(1)",
            transition: "all 0.4s ease",
            textShadow: hoveredWord === "dominance" ? "0 0 30px rgba(139,26,26,0.3)" : "none",
          }}
        >
          dominance.
        </p>

        {/* Divider - completely hidden when hovering */}
        <div
          style={{
            width: 60,
            height: 1,
            background: "#000",
            margin: "0.5em auto 1.5em",
            opacity: isHovering ? 0 : 0.2,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Caption - hidden when hovering */}
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#666",
            opacity: isHovering ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
        >
          Web & Marketing Solutions
        </p>
      </div>
    </section>
  );
}