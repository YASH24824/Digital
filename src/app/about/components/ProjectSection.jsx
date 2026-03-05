"use client";
import { useInView } from "../hooks/useInView";
import BlobBackground from "./BlobBackground";
import { DARK, PARTICLES } from "../data/aboutData";
import { useEffect, useState } from "react";

// Website links from your chart
const websiteLinks = {
  "Industrial & Engineering": {
    "theinfinityengineering.com": "https://theinfinityengineering.com",
    "royalsandcorporation.in": "https://royalsandcorporation.in",
    "vkelectricals.com": "https://vkelectricals.com",
    "hariindia.in": "https://hariindia.in"
  },
  "Trading, Export & Distribution": {
    "devamurthyagencies.com": "https://devamurthyagencies.com",
    "saranyaexport.in": "https://saranyaexport.in",
    "anantaprime.com": "https://anantaprime.com"
  },
  "E-Commerce & Consumer Brands": {
    "cuddlecrew.co.in": "https://cuddlecrew.co.in",
    "endlesstrips.in": "https://endlesstrips.in",
    "celestialrift.in": "https://celestialrift.in"
  },
  "Energy & Sustainability": {
    "greenvoltev.in": "https://greenvoltev.in"
  },
  "Social, Education & Community Services": {
    "tathhastu.in": "https://tathhastu.in",
    "vithaldasswelfare.in": "https://vithaldasswelfare.in",
    "htc18.com": "https://htc18.com"
  }
};

// Professional font styles
const fonts = {
  heading: "'Crimson Text', 'Playfair Display', Georgia, serif",
  subheading: "'Crimson Pro', 'Crimson Text', Georgia, serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
  stats: "'Crimson Pro', 'Times New Roman', serif"
};

// Contrast colors that work with black & white
const getContrastColor = (isEven) => {
  if (isEven) {
    // White background sections - dark colors for contrast
    return {
      primary: '#1A1A1A',      // Rich black
      secondary: '#2C2C2C',    // Dark gray
      accent: '#4A4A4A',       // Medium gray
      highlight: '#636363',     // Warm gray
      text: '#000000',          // Pure black
      lightText: '#333333',     // Dark gray text
      border: 'rgba(0,0,0,0.1)',
      gradient: 'linear-gradient(135deg, #1A1A1A, #2C2C2C)'
    };
  } else {
    // Black background sections - light colors for contrast
    return {
      primary: '#FFFFFF',       // Pure white
      secondary: '#F5F5F5',     // Off white
      accent: '#E0E0E0',        // Light gray
      highlight: '#CCCCCC',      // Silver
      text: '#FFFFFF',           // White text
      lightText: '#E0E0E0',      // Light gray text
      border: 'rgba(255,255,255,0.2)',
      gradient: 'linear-gradient(135deg, #FFFFFF, #F0F0F0)'
    };
  }
};

export default function ProjectSection({ project, index }) {
  const [ref, visible] = useInView(0.2);
  const [isMobile, setIsMobile] = useState(false);
  const isEven = index % 2 === 0;
  const contrast = getContrastColor(isEven);
  
  // Get website URL for this project
  const getWebsiteUrl = () => {
    const categoryLinks = websiteLinks[project.category];
    if (categoryLinks && project.client) {
      // Convert client name to domain format if needed
      const clientDomain = project.client.toLowerCase().replace(/\s+/g, '') + '.com';
      return categoryLinks[clientDomain] || categoryLinks[project.client] || '#';
    }
    return '#';
  };

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle website visit
  const handleVisitSite = () => {
    const url = getWebsiteUrl();
    if (url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Black & white blob colors based on project color
  const blobColor = isEven ? '#ffffff' : '#000000';
  const blobOpacity = isEven ? 0.15 : 0.1;

  return (
    <BlobBackground color={blobColor}>
      <section
        ref={ref}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: isEven ? '#FFFFFF' : '#1A1A1A',
          position: "relative",
          overflow: "hidden",
          padding: isMobile ? "60px 0" : "80px 0",
        }}
      >
        {/* Black & White blob - alternating between sections */}
        <div style={{
          position: "absolute",
          width: isMobile ? 300 : 500,
          height: isMobile ? 300 : 500,
          borderRadius: "50%",
          background: blobColor,
          filter: "blur(100px)",
          opacity: blobOpacity,
          top: isMobile ? "30%" : "50%",
          left: isMobile 
            ? (isEven ? "70%" : "30%") 
            : (isEven ? "60%" : "30%"),
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
          transition: "all 0.3s ease",
        }} />

        {/* Content container */}
        <div style={{
          maxWidth: 1300,
          margin: "0 auto",
          padding: isMobile ? "0 24px" : "0 48px",
          width: "100%",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 48 : 80,
          alignItems: isMobile ? "stretch" : "center",
        }}>
          {/* Text Section */}
          <div style={{ 
            order: isMobile ? 1 : (isEven ? 1 : 2),
            width: isMobile ? "100%" : "50%",
          }}>
            {/* Category Badge with Website Link */}
            <a
              href={getWebsiteUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`proj-badge fade-up ${visible ? "in" : ""}`}
              style={{
                display: "inline-block",
                padding: isMobile ? "8px 18px" : "10px 22px",
                background: isEven 
                  ? 'linear-gradient(135deg, #1A1A1A, #2C2C2C)'
                  : 'linear-gradient(135deg, #FFFFFF, #F0F0F0)',
                borderRadius: 40,
                color: isEven ? '#FFFFFF' : '#1A1A1A',
                fontSize: isMobile ? "0.7rem" : "0.75rem",
                letterSpacing: "0.2em",
                fontWeight: 600,
                marginBottom: isMobile ? 20 : 28,
                boxShadow: `0 8px 24px ${blobColor}40`,
                transitionDelay: "0s",
                border: `1px solid ${contrast.border}`,
                textDecoration: 'none',
                cursor: 'pointer',
                fontFamily: fonts.subheading,
                textTransform: 'uppercase',
              }}
            >
              {project.icon} {project.category} ↗
            </a>

            {/* Title with Crimson font */}
            <h2
              className={`fade-up ${visible ? "in" : ""}`}
              style={{
                fontFamily: fonts.heading,
                fontSize: isMobile ? "clamp(1.8rem, 6vw, 2.2rem)" : "clamp(2.2rem, 4vw, 3.6rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: isEven ? DARK : '#FFFFFF',
                marginBottom: isMobile ? 16 : 24,
                transitionDelay: "0.1s",
                fontStyle: 'normal',
              }}
            >
              {project.title}
              <span style={{
                display: "block",
                width: visible ? (isMobile ? 60 : 80) : 0,
                height: 4,
                background: isEven ? DARK : '#FFFFFF',
                borderRadius: 2,
                marginTop: isMobile ? 8 : 12,
                transition: "width 0.8s cubic-bezier(0.4,0,0.2,1) 0.5s",
              }} />
            </h2>

            {/* Meta with website links */}
            <div
              className={`fade-up ${visible ? "in" : ""}`}
              style={{ 
                display: "flex", 
                gap: isMobile ? 20 : 40, 
                marginBottom: isMobile ? 16 : 24, 
                transitionDelay: "0.15s",
                flexWrap: isMobile ? "wrap" : "nowrap",
              }}
            >
              {[
                ["CLIENT", project.client, getWebsiteUrl()],
                ["YEAR", project.year]
              ].map(([label, val, url]) => (
                <div key={label}>
                  <div style={{ 
                    fontSize: isMobile ? "0.6rem" : "0.65rem", 
                    color: isEven ? '#666' : '#AAA', 
                    letterSpacing: "0.12em", 
                    marginBottom: 4,
                    fontFamily: fonts.mono,
                    textTransform: 'uppercase',
                  }}>
                    {label}
                  </div>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: isMobile ? "0.9rem" : "1.1rem",
                        fontWeight: 700,
                        color: isEven ? '#1A1A1A' : '#FFFFFF',
                        textDecoration: 'none',
                        fontFamily: fonts.stats,
                        borderBottom: `1px dotted ${isEven ? '#1A1A1A' : '#FFFFFF'}`,
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => e.target.style.borderBottom = '1px solid'}
                      onMouseLeave={(e) => e.target.style.borderBottom = '1px dotted'}
                    >
                      {val} ↗
                    </a>
                  ) : (
                    <div style={{ 
                      fontSize: isMobile ? "0.9rem" : "1.1rem", 
                      fontWeight: 700, 
                      color: isEven ? '#1A1A1A' : '#FFFFFF',
                      fontFamily: fonts.stats,
                    }}>
                      {val}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Description */}
            <p
              className={`fade-up ${visible ? "in" : ""}`}
              style={{ 
                fontSize: isMobile ? "0.95rem" : "1.05rem", 
                lineHeight: 1.8, 
                color: isEven ? '#444' : '#CCC', 
                marginBottom: isMobile ? 24 : 32, 
                transitionDelay: "0.2s",
                fontFamily: fonts.body,
                fontWeight: 400,
              }}
            >
              {project.description}
            </p>

            {/* Stats with Crimson font */}
            <div
              className={`fade-up ${visible ? "in" : ""}`}
              style={{ 
                display: "grid", 
                gridTemplateColumns: isMobile ? "repeat(3,1fr)" : "repeat(3,1fr)", 
                gap: isMobile ? 8 : 16, 
                marginBottom: isMobile ? 28 : 36, 
                transitionDelay: "0.25s" 
              }}
            >
              {Object.entries(project.stats).map(([key, value]) => (
                <div
                  key={key}
                  className="stat-card"
                  style={{
                    padding: isMobile ? "12px 8px" : "18px 12px",
                    background: isEven ? '#F8F8F8' : '#2C2C2C',
                    borderRadius: isMobile ? 12 : 16,
                    textAlign: "center",
                    boxShadow: `0 8px 24px -8px ${blobColor}80`,
                    border: `1px solid ${isEven ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
                  }}
                >
                  <div style={{ 
                    fontSize: isMobile ? "1.3rem" : "1.8rem", 
                    fontWeight: 700, 
                    color: isEven ? '#1A1A1A' : '#FFFFFF', 
                    lineHeight: 1,
                    fontFamily: fonts.stats,
                  }}>
                    {value}
                  </div>
                  <div style={{ 
                    fontSize: isMobile ? "0.55rem" : "0.65rem", 
                    color: isEven ? '#666' : '#AAA', 
                    textTransform: "uppercase", 
                    letterSpacing: "0.1em", 
                    marginTop: 4,
                    fontFamily: fonts.mono,
                  }}>
                    {key}
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div
              className={`fade-up ${visible ? "in" : ""}`}
              style={{ 
                display: "flex", 
                gap: isMobile ? 10 : 14, 
                transitionDelay: "0.3s",
                flexDirection: isMobile ? "column" : "row",
                width: isMobile ? "100%" : "auto",
              }}
            >
              <button 
                className="btn-primary" 
                style={{ 
                  background: isEven 
                    ? 'linear-gradient(135deg, #1A1A1A, #2C2C2C)'
                    : 'linear-gradient(135deg, #FFFFFF, #F0F0F0)',
                  boxShadow: `0 16px 32px -8px ${blobColor}80`,
                  color: isEven ? '#FFFFFF' : '#1A1A1A',
                  width: isMobile ? "100%" : "auto",
                  padding: isMobile ? "14px 24px" : "16px 32px",
                  fontSize: isMobile ? "0.85rem" : "0.95rem",
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: fonts.subheading,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                VIEW CASE STUDY
              </button>
              <button 
                onClick={handleVisitSite}
                className="btn-outline" 
                style={{ 
                  borderColor: isEven ? '#1A1A1A' : '#FFFFFF', 
                  color: isEven ? '#1A1A1A' : '#FFFFFF',
                  background: 'transparent',
                  width: isMobile ? "100%" : "auto",
                  padding: isMobile ? "14px 24px" : "16px 32px",
                  fontSize: isMobile ? "0.85rem" : "0.95rem",
                  borderRadius: '50px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: `2px solid ${isEven ? '#1A1A1A' : '#FFFFFF'}`,
                  fontFamily: fonts.subheading,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = isEven ? '#1A1A1A' : '#FFFFFF';
                  e.target.style.color = isEven ? '#FFFFFF' : '#1A1A1A';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = isEven ? '#1A1A1A' : '#FFFFFF';
                }}
              >
                VISIT SITE ↗
              </button>
            </div>
          </div>

          {/* Image Card Section */}
          <div
            className={`fade-up ${visible ? "in" : ""}`}
            style={{ 
              order: isMobile ? 2 : (isEven ? 2 : 1),
              width: isMobile ? "100%" : "50%",
              transitionDelay: "0.15s",
            }}
          >
            <a
              href={getWebsiteUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="image-card"
                style={{
                  width: "100%",
                  height: isMobile ? 380 : 520,
                  borderRadius: isMobile ? 20 : 28,
                  background: isEven 
                    ? 'linear-gradient(135deg, #F0F0F0, #FFFFFF)'
                    : 'linear-gradient(135deg, #2C2C2C, #1A1A1A)',
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: `0 40px 80px -20px ${blobColor}80`,
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {/* Shine overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: isEven
                    ? "linear-gradient(135deg, rgba(0,0,0,0.05) 0%, transparent 50%)"
                    : "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
                  zIndex: 2,
                }} />

                {/* Icon center */}
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: isMobile ? "6rem" : "8rem",
                  opacity: 0.35,
                  zIndex: 1,
                  userSelect: "none",
                  color: isEven ? '#1A1A1A' : '#FFFFFF',
                }}>
                  {project.icon}
                </div>

                {/* Floating particles */}
                {PARTICLES.map((p, i) => (
                  <div
                    key={i}
                    className="particle"
                    style={{
                      position: "absolute",
                      bottom: 20,
                      left: p.left,
                      width: isMobile ? 4 : 5,
                      height: isMobile ? 4 : 5,
                      background: isEven ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)',
                      borderRadius: "50%",
                      animationDuration: p.duration,
                      animationDelay: p.delay,
                    }}
                  />
                ))}

                {/* Top badge - Website Category */}
                <div style={{
                  position: "absolute", top: isMobile ? 16 : 24, right: isMobile ? 16 : 24,
                  padding: isMobile ? "8px 16px" : "10px 20px",
                  background: isEven 
                    ? 'rgba(0,0,0,0.8)' 
                    : 'rgba(255,255,255,0.9)',
                  backdropFilter: "blur(12px)",
                  borderRadius: 40,
                  color: isEven ? '#FFFFFF' : '#1A1A1A',
                  fontSize: isMobile ? "0.7rem" : "0.8rem",
                  fontWeight: 600,
                  border: `1px solid ${contrast.border}`,
                  zIndex: 3,
                  fontFamily: fonts.mono,
                  letterSpacing: '0.05em',
                }}>
                  {project.category}
                </div>

                {/* Bottom info strip with website */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: isMobile ? "20px 20px" : "28px 28px",
                  background: isEven
                    ? "linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                    : "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                  zIndex: 3,
                }}>
                  <div style={{ 
                    color: '#FFFFFF', 
                    fontSize: isMobile ? "0.6rem" : "0.7rem", 
                    letterSpacing: "0.15em",
                    fontFamily: fonts.mono,
                    textTransform: 'uppercase',
                    opacity: 0.8,
                  }}>
                    LIVE WEBSITE
                  </div>
                  <div style={{ 
                    color: '#FFFFFF', 
                    fontWeight: 700, 
                    fontSize: isMobile ? "0.9rem" : "1.1rem", 
                    letterSpacing: "0.05em",
                    fontFamily: fonts.heading,
                  }}>
                    {project.client} ↗
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </BlobBackground>
  );
}