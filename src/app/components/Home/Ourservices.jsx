"use client";

import { useState, useEffect } from "react";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  @keyframes arrowTipUp {
    0% { transform: translateX(0) translateY(0); }
    50% { transform: translateX(4px) translateY(-3px); }
    100% { transform: translateX(0) translateY(0); }
  }

  @media (max-width: 768px) {
    .service-card {
      transform: translateY(0) !important;
    }
    
    .service-card:active {
      background-color: #9B7B5E;
      transition: background-color 0.2s ease;
    }
    
    .service-card:active h3,
    .service-card:active p,
    .service-card:active span,
    .service-card:active svg path {
      color: #ffffff !important;
      fill: #ffffff !important;
    }
  }
`;

// 6 SERVICES based on the image style
const SERVICES = [
  {
    id: "social",
    title: "Social Media Marketing",
    description: "Stack builds creative strategies to connect your brand with the right audience, increase engagement, and grow your online presence",
  },
  {
    id: "performance",
    title: "Performance Marketing",
    description: "Our performance marketing approach focuses on delivering measurable results—boosting conversions, maximizing ROI, and driving sustained business growth with every campaign we create.",
  },
  {
    id: "billboard",
    title: "Billboard Advertising",
    description: "Increase your brand visibility with Social Stack's expert out-of-home advertising solutions. We offer tailored billboard advertising across Ahmedabad and Gandhinagar to engage your audience and drive results.",
  },
  {
    id: "content",
    title: "Content Strategy",
    description: "Data-driven content that tells your story and connects with your audience. From blog posts to video scripts, we craft messages that resonate and drive action.",
  },
  {
    id: "seo",
    title: "SEO Optimization",
    description: "Rank higher and attract more visitors with our comprehensive SEO strategies. We optimize your online presence to ensure you're found by the right people at the right time.",
  },
  {
    id: "brand",
    title: "Brand Identity",
    description: "Build a brand that stands out with cohesive visual systems, compelling narratives, and consistent messaging across every touchpoint.",
  },
];

export default function WhatWeOffer() {
  const [hoveredId, setHoveredId] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style>{globalStyles}</style>

      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
    
          padding: isMobile ? "40px 16px" : "60px 120px",
        }}
      >
        {/* Section header */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: 1200,
            marginBottom: isMobile ? 32 : 48
          }}
        >
          <p style={{
            padding: "4px 12px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: isMobile ? "0.7rem" : "0.75rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#9B7B5E",
            marginBottom: isMobile ? 8 : 12,
            fontWeight: 500,
          
          }}>
            Our Services
          </p>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? "clamp(1.8rem, 6vw, 2.8rem)" : "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "#1a1a1a",
            maxWidth: isMobile ? "100%" : "80%",
          }}>
            What{" "}
            <em style={{
              fontStyle: "italic",
              color: "#9B7B5E",
              fontWeight: 400,
            }}>We Do Best</em>
          </h2>

          <div style={{
            width: isMobile ? 40 : 60,
            height: 1.5,
            background: "#9B7B5E",
            margin: isMobile ? "16px 0 0" : "24px 0 0",
            opacity: 0.3,
          }} />
        </div>

        {/* Services grid - Responsive grid layout */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: 1200,
            display: "grid",
            paddingLeft: isMobile ? 0 : 90,
            gridTemplateColumns: isMobile 
              ? "1fr" 
              : window.innerWidth >= 1024 
                ? "repeat(3, 1fr)" 
                : "repeat(2, 1fr)",
            gap: isMobile ? "16px" : "24px",
          }}
        >
          {SERVICES.map((service, index) => {
            const isHovered = hoveredId === service.id;

            return (
              <div
                key={service.id}
                className="service-card"
                onMouseEnter={() => !isMobile && setHoveredId(service.id)}
                onMouseLeave={() => !isMobile && setHoveredId(null)}
                onTouchStart={() => isMobile && setHoveredId(service.id)}
                onTouchEnd={() => isMobile && setTimeout(() => setHoveredId(null), 300)}
                style={{
                  width: "100%",
                  height: isMobile ? "280px" : "320px",
                  backgroundColor: isHovered ? "#9B7B5E" : "#ffffff",
                  borderRadius: isMobile ? "16px" : "12px",
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: isHovered 
                    ? "0 25px 35px -15px rgba(155,123,94,0.35)" 
                    : "0 10px 25px -12px rgba(0,0,0,0.08)",
                  padding: isMobile ? "20px 18px" : "28px 24px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  transform: isHovered && !isMobile ? "translateY(-6px)" : "translateY(0)",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {/* Title */}
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? "1.2rem" : "clamp(1.3rem, 2vw, 1.6rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                  color: isHovered ? "#ffffff" : "#1a1a1a",
                  marginBottom: isMobile ? 12 : 16,
                  transition: "color 0.3s ease",
                }}>
                  {service.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: isMobile ? "0.85rem" : "0.9rem",
                  fontWeight: 300,
                  lineHeight: isMobile ? 1.5 : 1.6,
                  color: isHovered ? "rgba(255,255,255,0.9)" : "#555555",
                  marginBottom: isMobile ? 16 : 20,
                  flex: 1,
                  transition: "color 0.3s ease",
                  display: "-webkit-box",
                  WebkitLineClamp: isMobile ? 3 : 4,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                  {service.description}
                </p>

                {/* Read More with arrow animation */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? 6 : 8,
                  transition: "all 0.3s ease",
                  marginTop: "auto",
                }}>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: isMobile ? "0.85rem" : "0.9rem",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    color: isHovered ? "#ffffff" : "#9B7B5E",
                    transition: "color 0.3s ease",
                  }}>
                    Read More
                  </span>
                  
                  {/* Arrow with tip-up animation */}
                  <svg 
                    width={isMobile ? "18" : "20"} 
                    height={isMobile ? "12" : "14"} 
                    viewBox="0 0 20 14" 
                    fill="none" 
                    style={{
                      animation: isHovered && !isMobile ? "arrowTipUp 1s ease-in-out infinite" : "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <path 
                      d="M1 7C0.44772 7 0 7.44772 0 8C0 8.55228 0.44772 9 1 9V7ZM19.7071 8.70711C20.0976 8.31658 20.0976 7.68342 19.7071 7.29289L13.3431 0.928932C12.9526 0.538408 12.3195 0.538408 11.9289 0.928932C11.5384 1.31946 11.5384 1.95262 11.9289 2.34315L17.5858 8L11.9289 13.6569C11.5384 14.0474 11.5384 14.6805 11.9289 15.0711C12.3195 15.4616 12.9526 15.4616 13.3431 15.0711L19.7071 8.70711ZM1 9H19V7H1V9Z" 
                      fill={isHovered ? "#ffffff" : "#9B7B5E"}
                    />
                    <path 
                      d="M14 4L17 7L14 10" 
                      stroke={isHovered ? "#ffffff" : "#9B7B5E"} 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile swipe hint */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 24,
              padding: "8px 16px",
              backgroundColor: "rgba(155,123,94,0.05)",
              borderRadius: 40,
            }}
          >
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              color: "#9B7B5E",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}>
              Tap cards to explore
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9B7B5E" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        )}

        {/* Footer divider */}
        <div style={{
          width: "100%",
          maxWidth: 1200,
          marginTop: isMobile ? 40 : 48,
          borderTop: "1px solid rgba(0,0,0,0.05)",
        }} />
      </section>
    </>
  );
} 