"use client";
import { useInView } from "../hooks/useInView";
import BlobBackground from "./BlobBackground";
import { DARK, PARTICLES } from "../data/aboutData";
import { useEffect, useState } from "react";
import Image from "next/image";

// Accent colors
const ACCENT = "#9B7B5E";
const ACCENT_SOFT = "rgba(155,123,94,0.10)";
const ACCENT_MID = "rgba(155,123,94,0.30)";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes arrowSlide {
    0% { transform: translateX(0); }
    50% { transform: translateX(6px); }
    100% { transform: translateX(0); }
  }

  @keyframes shimmer {
    0% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.2); }
    100% { opacity: 0.2; transform: scale(1); }
  }

  @keyframes imageZoom {
    0% { transform: scale(1); }
    100% { transform: scale(1.05); }
  }

  .fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s cubic-bezier(0.2, 0.9, 0.3, 1), transform 0.8s cubic-bezier(0.2, 0.9, 0.3, 1);
  }

  .fade-up.in {
    opacity: 1;
    transform: translateY(0);
  }

  .project-card {
    transition: all 0.5s cubic-bezier(0.2, 0.9, 0.3, 1);
  }

  .project-card:hover {
    transform: scale(1.02) translateY(-8px);
  }

  .project-card:active {
    transform: scale(0.98);
  }

  .project-image {
    transition: transform 0.7s cubic-bezier(0.2, 0.9, 0.3, 1);
  }

  .project-card:hover .project-image {
    transform: scale(1.05);
  }

  .website-link {
    transition: all 0.2s ease;
  }

  .website-link:hover {
    color: ${ACCENT};
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    .project-card:active {
      background: linear-gradient(135deg, #2C2C2C, #1A1A1A);
      transition: background 0.2s ease;
    }
  }
`;

// Website links organized by categories as per your structure
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

// Category order as per your list
const categoryOrder = [
  "Industrial & Engineering",
  "Trading, Export & Distribution",
  "E-Commerce & Consumer Brands",
  "Energy & Sustainability",
  "Social, Education & Community Services"
];

// Professional font styles
const fonts = {
  heading: "'Playfair Display', Georgia, serif",
  subheading: "'DM Sans', sans-serif",
  body: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'DM Sans', monospace",
};

// Colors with accent for both light and dark sections
const getContrastColor = (isEven) => {
  if (isEven) {
    // Light sections - dark text with accent
    return {
      primary: '#1A1A1A',
      secondary: '#2C2C2C',
      accent: ACCENT,
      accentSoft: ACCENT_SOFT,
      accentMid: ACCENT_MID,
      highlight: '#636363',
      text: '#1A1A1A',
      lightText: '#555555',
      lighterText: '#777777',
      border: 'rgba(0,0,0,0.08)',
      borderAccent: `${ACCENT_MID}`,
      gradient: `linear-gradient(135deg, #F8F8F8, #FFFFFF)`,
      cardGradient: `linear-gradient(135deg, #F5F5F5, #FFFFFF)`,
    };
  } else {
    // Dark sections - light text with accent
    return {
      primary: '#FFFFFF',
      secondary: '#F5F5F5',
      accent: ACCENT,
      accentSoft: ACCENT_SOFT,
      accentMid: ACCENT_MID,
      highlight: '#CCCCCC',
      text: '#FFFFFF',
      lightText: '#AAAAAA',
      lighterText: '#888888',
      border: 'rgba(255,255,255,0.1)',
      borderAccent: `${ACCENT_MID}`,
      gradient: `linear-gradient(135deg, #1A1A1A, #2C2C2C)`,
      cardGradient: `linear-gradient(135deg, #2C2C2C, #1A1A1A)`,
    };
  }
};

// Image mapping for each sector
const getCategoryImage = (category) => {
  const imageMap = {
    "Industrial & Engineering": "/industrial-engineering.jpg",
    "Trading, Export & Distribution": "/trading-export.jpg",
    "E-Commerce & Consumer Brands": "/ecommerce-consumer.jpg",
    "Energy & Sustainability": "/energy-sustainability.jpg",
    "Social, Education & Community Services": "/social-education.jpg"
  };
  return imageMap[category] || "/social-education.jpg";
};

export default function ProjectSection({ project, index }) {
  const [ref, visible] = useInView(0.2);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredWebsite, setHoveredWebsite] = useState(null);
  const [imageError, setImageError] = useState(false);
  const isEven = index % 2 === 0;
  const contrast = getContrastColor(isEven);
  
  // Get websites for this category
  const getCategoryWebsites = () => {
    return websiteLinks[project.category] || {};
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
  const handleVisitSite = (url) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Get category number
  const getCategoryNumber = () => {
    const categoryIndex = categoryOrder.indexOf(project.category);
    return categoryIndex !== -1 ? categoryIndex + 1 : index + 1;
  };

  const categoryWebsites = getCategoryWebsites();
  const categoryNumber = getCategoryNumber();
  const categoryImage = getCategoryImage(project.category);

  // Accent blob
  const blobColor = ACCENT;
  const blobOpacity = 0.08;

  return (
    <>
      <style>{globalStyles}</style>
      
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
        {/* Accent blob */}
        <div style={{
          position: "absolute",
          width: isMobile ? 300 : 600,
          height: isMobile ? 300 : 600,
          borderRadius: "50%",
          background: blobColor,
          filter: "blur(120px)",
          opacity: blobOpacity,
          top: "50%",
          left: isEven ? "60%" : "40%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          transition: "all 0.3s ease",
        }} />

        {/* Content container */}
        <div style={{
          maxWidth: 1300,
          margin: "0 auto",
          padding: isMobile ? "0 24px" : "0 48px",
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}>
          
          {/* Section header with category number */}
          <div
            className={`fade-up ${visible ? "in" : ""}`}
            style={{
              marginBottom: isMobile ? 40 : 60,
              textAlign: "left",
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: isMobile ? 8 : 12,
            }}>
              <span style={{
                fontFamily: fonts.subheading,
                fontSize: isMobile ? "0.8rem" : "0.9rem",
                fontWeight: 500,
                color: contrast.accent,
                opacity: 0.8,
              }}>
                0{categoryNumber}
              </span>
              <div style={{
                width: 40,
                height: 1,
                background: contrast.accent,
                opacity: 0.3,
              }} />
            </div>

            <h2 style={{
              fontFamily: fonts.heading,
              fontSize: isMobile ? "clamp(1.8rem, 6vw, 2.2rem)" : "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: isEven ? '#1A1A1A' : ACCENT,
              maxWidth: isMobile ? "100%" : "80%",
            }}>
              {project.category}
            </h2>

            <div style={{
              width: isMobile ? 40 : 60,
              height: 1.5,
              background: contrast.accent,
              margin: isMobile ? "16px 0 0" : "20px 0 0",
              opacity: 0.3,
            }} />
          </div>

          {/* Project content - alternating layout */}
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : (isEven ? "row" : "row-reverse"),
            gap: isMobile ? 40 : 80,
            alignItems: isMobile ? "stretch" : "flex-start",
          }}>
            {/* Text Section with Website List */}
            <div style={{ 
              width: isMobile ? "100%" : "45%",
            }}>
              {/* Project Title */}
              <h3
                className={`fade-up ${visible ? "in" : ""}`}
                style={{
                  fontFamily: fonts.heading,
                  fontSize: isMobile ? "1.4rem" : "1.8rem",
                  fontWeight: 500,
                  lineHeight: 1.2,
                  color: isEven ? '#1A1A1A' : '#FFFFFF',
                  marginBottom: isMobile ? 20 : 28,
                  transitionDelay: "0.1s",
                }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                className={`fade-up ${visible ? "in" : ""}`}
                style={{ 
                  fontSize: isMobile ? "0.95rem" : "1rem", 
                  lineHeight: 1.7, 
                  color: isEven ? '#555' : '#AAA', 
                  marginBottom: isMobile ? 28 : 36, 
                  transitionDelay: "0.15s",
                  fontFamily: fonts.body,
                  fontWeight: 300,
                }}
              >
                {project.description}
              </p>

              {/* Websites List - Formatted as per your structure */}
              <div
                className={`fade-up ${visible ? "in" : ""}`}
                style={{ 
                  marginBottom: isMobile ? 28 : 36,
                  transitionDelay: "0.2s",
                }}
              >
                <div style={{
                  fontFamily: fonts.subheading,
                  fontSize: isMobile ? "0.7rem" : "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: contrast.accent,
                  marginBottom: isMobile ? 16 : 20,
                  fontWeight: 500,
                }}>
                  Websites
                </div>

                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: isMobile ? 12 : 16,
                }}>
                  {Object.entries(categoryWebsites).map(([domain, url], idx) => (
                    <div
                      key={domain}
                      className="website-link"
                      onClick={() => handleVisitSite(url)}
                      onMouseEnter={() => setHoveredWebsite(domain)}
                      onMouseLeave={() => setHoveredWebsite(null)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        cursor: "pointer",
                        padding: isMobile ? "8px 0" : "6px 0",
                        borderBottom: idx < Object.keys(categoryWebsites).length - 1 
                          ? `1px solid ${contrast.border}` 
                          : 'none',
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span style={{
                        fontFamily: fonts.body,
                        fontSize: isMobile ? "0.9rem" : "1rem",
                        color: hoveredWebsite === domain 
                          ? contrast.accent 
                          : (isEven ? '#333' : '#DDD'),
                        fontWeight: hoveredWebsite === domain ? 500 : 400,
                        transition: "all 0.2s ease",
                      }}>
                        {domain}
                      </span>
                      
                      {/* Arrow indicator on hover */}
                      <span style={{
                        opacity: hoveredWebsite === domain ? 1 : 0,
                        transform: hoveredWebsite === domain ? "translateX(0)" : "translateX(-10px)",
                        transition: "all 0.2s ease",
                        color: contrast.accent,
                        fontSize: isMobile ? "1rem" : "1.1rem",
                      }}>
                        ↗
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Meta - Year */}
              <div
                className={`fade-up ${visible ? "in" : ""}`}
                style={{ 
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  transitionDelay: "0.25s",
                }}
              >
                <div>
                  <div style={{ 
                    fontSize: isMobile ? "0.6rem" : "0.65rem", 
                    color: isEven ? '#999' : '#777', 
                    letterSpacing: "0.12em", 
                    marginBottom: 4,
                    fontFamily: fonts.subheading,
                    textTransform: 'uppercase',
                  }}>
                    Year
                  </div>
                  <div style={{ 
                    fontSize: isMobile ? "0.9rem" : "1rem",
                    fontWeight: 500,
                    color: contrast.accent,
                    fontFamily: fonts.subheading,
                  }}>
                    {project.year}
                  </div>
                </div>
              </div>
            </div>

            {/* Image Card Section with actual images */}
            <div
              className={`fade-up ${visible ? "in" : ""}`}
              style={{ 
                width: isMobile ? "100%" : "50%",
                transitionDelay: "0.2s",
              }}
            >
              <a
                href={Object.values(categoryWebsites)[0]}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div
                  className="project-card"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    borderRadius: isMobile ? 20 : 24,
                    background: isEven 
                      ? contrast.cardGradient
                      : contrast.cardGradient,
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: isHovered 
                      ? `0 40px 60px -20px ${contrast.accent}80`
                      : `0 30px 40px -20px rgba(0,0,0,0.3)`,
                    border: `1px solid ${contrast.border}`,
                    cursor: 'pointer',
                  }}
                >
                  {/* Background Image */}
                  {!imageError ? (
                    <Image
                      src={categoryImage}
                      alt={project.category}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="project-image"
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 0.7s cubic-bezier(0.2, 0.9, 0.3, 1)',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      }}
                      onError={() => setImageError(true)}
                      priority={index < 2}
                    />
                  ) : (
                    // Fallback gradient if image fails to load
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(135deg, ${ACCENT_SOFT}, ${ACCENT_MID})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <span style={{
                        fontFamily: fonts.heading,
                        fontSize: isMobile ? '3rem' : '4rem',
                        color: ACCENT,
                        opacity: 0.3,
                      }}>
                        {project.icon || "◈"}
                      </span>
                    </div>
                  )}

                  {/* Dark overlay for text readability */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                    zIndex: 2,
                  }} />

                  {/* Shine overlay on hover */}
                  {isHovered && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                      zIndex: 3,
                      pointerEvents: 'none',
                    }} />
                  )}

                  {/* Top right badge - Category */}
                

                  {/* Bottom info strip - Project Title */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: isMobile ? "20px 20px" : "24px 24px",
                    zIndex: 4,
                  }}>
             
                    <div style={{ 
                      color: '#FFFFFF', 
                      fontWeight: 500, 
                      fontSize: isMobile ? "1rem" : "1.2rem", 
                      fontFamily: fonts.heading,
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    }}>
                      {project.title}
                    </div>
                  </div>

                  {/* Floating particles with accent (only show if no image or as decorative) */}
                  {imageError && PARTICLES.map((p, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        bottom: 20 + (i * 8),
                        left: p.left,
                        width: isMobile ? 3 : 4,
                        height: isMobile ? 3 : 4,
                        background: ACCENT,
                        borderRadius: "50%",
                        opacity: 0.3,
                        animation: `shimmer ${p.duration} ease-in-out infinite`,
                        animationDelay: p.delay,
                        zIndex: 3,
                      }}
                    />
                  ))}
                </div>
              </a>
            </div>
          </div>

          {/* Footer line with accent */}
          <div
            className={`fade-up ${visible ? "in" : ""}`}
            style={{
              width: "100%",
              marginTop: isMobile ? 48 : 60,
              borderTop: `1px solid ${contrast.accentMid}`,
              transitionDelay: "0.3s",
            }}
          />
        </div>
      </section>
    </>
  );
}  