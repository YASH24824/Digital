"use client";

import { useState, useEffect } from "react";

const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #ffffff; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

export default function Hero() {
  const [hoveredWord, setHoveredWord] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Array of hoverable words with their properties and images
  const hoverableWords = [
    { 
      id: "growth", 
      text: "Digital Growth.", 
      color: "#5C2122",
      image: "/image.png" // Image for Digital Growth hover
    },
    { 
      id: "dominance", 
      text: "dominance.", 
      color: "#8B1A1A",
      image: "/image1.png" // Image for dominance hover
    }
  ];

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!mounted) return null;

  const isHovering = hoverableWords.some(word => word.id === hoveredWord);
  
  // Get the current hovered word's image
  const getCurrentImage = () => {
    if (!hoveredWord) return "none";
    const word = hoverableWords.find(w => w.id === hoveredWord);
    return word ? `url('${word.image}')` : "none";
  };

  const getOpacity = (wordId) => {
    if (!isHovering) return 1; // Normal state - all visible
    if (hoveredWord === wordId) return 1; // Hovered word - fully visible
    return 0; // All other words - completely invisible
  };

  const getColor = (wordId) => {
    if (!isHovering) return "#000000"; // Normal state - black
    if (hoveredWord === wordId) {
      // Hovered word gets its special color
      return wordId === "growth" ? "#5C2122" : "#8B1A1A";
    }
    return "#000000"; // Other words fade out via opacity
  };

  /* ─── Shared transition ─────────────────────────── */
  const fade = (delay = 0) => ({
    animation: `0.8s ease ${delay}s both`,
  });

  return (
    <>
      <style>{globalStyles}</style>

      {/* Background Image Overlay - Changes based on hovered word */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        backgroundImage: getCurrentImage(),
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: isHovering ? 1 : 0,
        transition: "opacity 0.5s ease",
        pointerEvents: "none",
      }} />

      {/* Dark overlay for better text visibility on image */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        background: "rgba(0, 0, 0, 0.3)",
        opacity: isHovering ? 1 : 0,
        transition: "opacity 0.5s ease",
        pointerEvents: "none",
      }} />

      <section style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "transparent",
        fontFamily: "'Playfair Display', serif",
        display: "flex",
        flexDirection: "column",
        zIndex: 3,
        paddingTop: 0,
        paddingBottom: 0,
        overflow: "hidden",
      }}>

       
{isMobile ? (
  /* ════════════════════════════════════════
     MOBILE LAYOUT - REDUCED SPACING
  ════════════════════════════════════════ */
  <div style={{
    position: "relative",
    width: "100%",
    height: "90vh",
      display: "flex",
    flexDirection: "column",
    zIndex: 4,
  }}>

    {/* ── TEXT CONTENT - TIGHTER SPACING ── */}
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      padding: "12vh 20px 0vh", // Reduced from 15vh to 12vh top, 10vh to 5vh bottom
      position: "relative",
      zIndex: 5,
    }}>

      {/* Empowering Your */}
      <h1 style={{
        fontSize: "clamp(2rem, 7vw, 2.4rem)",
        fontWeight: 400,
        color: getOpacity("normal") ? "#000000" : "transparent",
        lineHeight: 1,
        letterSpacing: "-0.02em",
        textAlign: "center",
        margin: 0,
        opacity: getOpacity("normal"),
        transition: "opacity 0.4s ease-in-out",
        ...fade(0.1),
      }}>
        Empowering Your
      </h1>

      {/* Digital Growth */}
      <h1
        onMouseEnter={() => setHoveredWord("growth")}
        onMouseLeave={() => setHoveredWord(null)}
        style={{
          fontSize: "clamp(2.2rem, 8vw, 2.8rem)",
          fontWeight: 500,
          color: hoveredWord === "growth" ? "#FFFFFF" : "#000000",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          textAlign: "center",
          margin: "2px 0 5px", // Reduced from 5px 0 10px
          cursor: "pointer",
          position: "relative",
          zIndex: 10,
          opacity: getOpacity("growth"),
          transform: hoveredWord === "growth" ? "scale(1.05)" : "scale(1)",
          transition: "all 0.4s cubic-bezier(0.2, 0, 0, 1)",
          textShadow: hoveredWord === "growth" ? "0 0 30px rgba(255,255,255,0.8)" : "none",
          padding: "6px 12px", // Reduced padding
          borderRadius: "50px",
          background: hoveredWord === "growth" ? "rgba(92,33,34,0.9)" : "transparent",
          display: "inline-block",
          width: "auto",
          ...fade(0.15),
        }}
      >
        Digital Growth.
      </h1>

      {/* Sub lines container */}
      <div style={{
        marginTop: 0, // Removed margin
        marginBottom: 5, // Reduced from 10
        opacity: getOpacity("normal"),
        transition: "opacity 0.4s ease-in-out",
      }}>
        {["We craft, build, and elevate", "brands to achieve online"].map((line, i) => (
          <p key={i} style={{
            fontSize: "clamp(0.9rem, 3.5vw, 1.1rem)",
            fontWeight: 400,
            color: "#333333",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            textAlign: "center",
            margin: i === 0 ? "0 0 2px" : "0 0 4px", // Reduced margins
            transition: "opacity 0.4s ease-in-out",
            ...fade(0.2 + i * 0.05),
          }}>
            {line}
          </p>
        ))}
      </div>

      {/* dominance */}
      <p
        onMouseEnter={() => setHoveredWord("dominance")}
        onMouseLeave={() => setHoveredWord(null)}
        style={{
          fontSize: "clamp(0.95rem, 3.8vw, 1.2rem)",
          fontWeight: 500,
          color: hoveredWord === "dominance" ? "#FFFFFF" : "#000000",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          textAlign: "center",
          margin: "0 0 12px", // Reduced from 0 0 20px
          cursor: "pointer",
          position: "relative",
          zIndex: 10,
          opacity: getOpacity("dominance"),
          transform: hoveredWord === "dominance" ? "scale(1.05)" : "scale(1)",
          transition: "all 0.4s cubic-bezier(0.2, 0, 0, 1)",
          textShadow: hoveredWord === "dominance" ? "0 0 30px rgba(255,255,255,0.8)" : "none",
          padding: "6px 16px", // Reduced padding
          borderRadius: "50px",
          background: hoveredWord === "dominance" ? "rgba(139,26,26,0.9)" : "transparent",
          display: "inline-block",
          ...fade(0.3),
        }}
      >
        dominance.
      </p>

      {/* Divider line */}
      <div style={{
        width: 40, // Reduced from 50
        height: 2,
        background: "#000",
        opacity: getOpacity("normal") ? 0.2 : 0,
        margin: "4px 0 8px", // Reduced from 10px 0 15px
        transition: "opacity 0.4s ease-in-out",
        ...fade(0.35),
      }} />

      {/* Caption */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.55rem", // Slightly smaller
        fontWeight: 500,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "#666",
        textAlign: "center",
        opacity: getOpacity("normal"),
        transition: "opacity 0.4s ease-in-out",
        ...fade(0.4),
      }}>
        Web & Marketing Solutions
      </p>

      {/* Decorative dots */}
      <div style={{
        display: 'flex',
        gap: 6,
        justifyContent: 'center',
        marginTop: 8, // Reduced from 15
        opacity: getOpacity("normal") ? 0.3 : 0,
        transition: "opacity 0.4s ease-in-out",
        ...fade(0.45),
      }}>
        <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#999' }} />
        <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#999' }} />
        <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#999' }} />
      </div>
    </div>

    {/* Threefriends IMAGE - TIGHTER */}
    <div style={{
      position: "relative",
      width: "100%",
      height: "60vh", // Reduced from 35vh
      zIndex: 4,
      opacity: isHovering ? 0 : 1,
      transition: "opacity 0.5s ease-in-out",
      pointerEvents: isHovering ? "none" : "auto",
      overflow: "hidden",
      borderTopLeftRadius: '24px', // Slightly smaller
      borderTopRightRadius: '24px',
      willChange: "opacity",
    }}>
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '40px', // Reduced from 60px
        background: 'linear-gradient(to bottom, rgba(255,255,255,1), transparent)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />
      
      <img
        src="/Threefriends.png"
        alt="Three friends looking at smartphone"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "cover",
          objectPosition: "center 30%",
          transform: isHovering ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.5s ease-in-out',
          willChange: "transform",
        }}
      />
    </div>

    {/* Interactive hint - adjusted position */}

  </div>
) 
        : (
          /* ════════════════════════════════════════
             DESKTOP LAYOUT
          ════════════════════════════════════════ */
          <>
            {/* Threefriends Image - hidden when hovering */}
            <div style={{
              position: "absolute",
              left: "0%", 
              bottom: "10%",
              width: 800,
              height: 400,
              maxWidth: "40vw",
              zIndex: 4,
              opacity: isHovering ? 0 : 1,
              transition: "opacity 0.1s ease",
              pointerEvents: isHovering ? "none" : "auto",
            }}>
              <img
                src="/Threefriends.png"
                alt="Three friends looking at smartphone"
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  display: "block",
                }}
              />
            </div>

            {/* Desktop text block */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: 900,
              margin: "0 auto",
              padding: "20px",
              position: "relative",
              zIndex: 5,
              minHeight: "100vh",
            }}>

              {/* Empowering Your - hidden when hovering */}
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 400,
                color: "#000000",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                textAlign: "center",
                opacity: getOpacity("normal"),
                transition: "opacity 0.1s ease",
                ...fade(0.1),
              }}>
                Empowering Your
              </h1>

              {/* Digital Growth — hoverable */}
              <h1
                onMouseEnter={() => setHoveredWord("growth")}
                onMouseLeave={() => setHoveredWord(null)}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.8rem, 6.5vw, 5rem)",
                  fontWeight: 400,
                  color: hoveredWord === "growth" ? "#ffffff" : "#000000",
                  margin: "0.05em 0 0.2em",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  textAlign: "center",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: 10,
                  opacity: getOpacity("growth"),
                  transform: hoveredWord === "growth" ? "scale(1.08)" : "scale(1)",
                  transition: "all 0.4s ease",
                  textShadow: hoveredWord === "growth" ? "0 0 20px rgba(255,255,255,0.5)" : "none",
                  ...fade(0.15),
                }}
              >
                Digital Growth.
              </h1>

              {/* Sub lines - hidden when hovering */}
              {["We craft, build, and elevate", "brands to achieve online"].map((line, i) => (
                <p key={i} style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.3rem, 3.5vw, 2.2rem)",
                  fontWeight: 400,
                  color: "#000000",
                  margin: i === 0 ? "0.1em 0 0" : "0.05em 0 0",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  textAlign: "center",
                  opacity: getOpacity("normal"),
                  transition: "opacity 0.4s ease",
                  ...fade(0.2 + i * 0.05),
                }}>
                  {line}
                </p>
              ))}

              {/* dominance — hoverable */}
              <p
                onMouseEnter={() => setHoveredWord("dominance")}
                onMouseLeave={() => setHoveredWord(null)}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.3rem, 3.5vw, 2.2rem)",
                  fontWeight: 400,
                  color: hoveredWord === "dominance" ? "#ffffff" : "#000000",
                  margin: "0.1em 0 1.5em",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  textAlign: "center",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: 10,
                  opacity: getOpacity("dominance"),
                  transform: hoveredWord === "dominance" ? "scale(1.08)" : "scale(1)",
                  transition: "all 0.4s ease",
                  textShadow: hoveredWord === "dominance" ? "0 0 20px rgba(255,255,255,0.5)" : "none",
                  ...fade(0.3),
                }}
              >
                dominance.
              </p>

              {/* Divider - hidden when hovering */}
              <div style={{
                width: 60, height: 1,
                background: "#000",
                opacity: isHovering ? 0 : 0.2,
                margin: "0.5em 0 1.5em",
                transition: "opacity 0.4s ease",
                ...fade(0.35),
              }} />

              {/* Caption - hidden when hovering */}
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#666",
                textAlign: "center",
                opacity: getOpacity("normal"),
                transition: "opacity 0.4s ease",
                ...fade(0.4),
              }}>
                Web & Marketing Solutions
              </p>
            </div>
          </>
        )}

      </section>
    </>
  );
}