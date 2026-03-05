"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const ACCENT      = "#9B7B5E";
const ACCENT_SOFT = "rgba(155,123,94,0.10)";
const ACCENT_MID  = "rgba(155,123,94,0.30)";

const cards = [
  {
    id: 1,
    number: "01",
    title: "Social Media Marketing",
    desc: "Stack builds creative strategies to connect your brand with the right audience, increase engagement, and grow your online presence across every platform.",
  },
  {
    id: 2,
    number: "02",
    title: "Performance Marketing",
    desc: "Our performance marketing approach focuses on delivering measurable results — boosting conversions, maximising ROI, and driving sustained business growth.",
  },
  {
    id: 3,
    number: "03",
    title: "Billboard Advertising",
    desc: "Increase brand visibility with expert out-of-home advertising. We offer tailored billboard solutions across Ahmedabad and Gandhinagar to engage your audience.",
  },
  {
    id: 4,
    number: "04",
    title: "Content Strategy",
    desc: "Data-driven content that tells your story and connects with your audience. From blog posts to video scripts — messages that resonate and drive action.",
  },
  {
    id: 5,
    number: "05",
    title: "SEO Optimisation",
    desc: "Rank higher and attract more visitors with comprehensive SEO strategies. We optimise your presence so you're found by the right people at the right time.",
  },
  {
    id: 6,
    number: "06",
    title: "Brand Identity",
    desc: "Build a brand that stands out with cohesive visual systems, compelling narratives, and consistent messaging across every single touchpoint.",
  },
];

export default function HorizontalScrollSection() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "-80%" : "-50%"]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes arrowTipUp {
          0%   { transform: translateX(0) translateY(0); }
          50%  { transform: translateX(4px) translateY(-3px); }
          100% { transform: translateX(0) translateY(0); }
        }

        .service-card:hover .card-arrow {
          animation: arrowTipUp 1s ease-in-out infinite;
        }

        /* Hide scroll indicator on mobile */
        @media (max-width: 768px) {
          .scroll-indicator {
            display: none !important;
          }
        }

        /* Better touch scrolling on mobile */
        .cards-container {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          position: "relative",
          height: isMobile ? "200vh" : "300vh",
          background: "#ffffff",
        }}
      >
        {/* ── Sticky viewport ── */}
        <div style={{
          position: "sticky",
          top: isMobile ? 90 : 70,
          height: isMobile? "90vh":"100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "#ffffff",
        }}>

          {/* ── Section header — responsive positioning ── */}
          <div style={{
            position: "absolute",
            top: isMobile ? "20px" : "clamp(32px, 5vh, 60px)",
            left: 0,
            width: "100%",
            zIndex: 20,
            padding: isMobile ? "0 20px" : "0 clamp(20px, 6vw, 80px)",
            pointerEvents: "none",
          }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: isMobile ? "0.7rem" : "0.75rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: isMobile ? 8 : 12,
                fontWeight: 500,
              }}
            >
              Our Services
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile ? "clamp(1.8rem, 8vw, 2.8rem)" : "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "#1a1a1a",
                maxWidth: isMobile ? "100%" : "80%",
              }}
            >
              What{" "}
              <em style={{ fontStyle: "italic", color: ACCENT, fontWeight: 400 }}>
                We Do Best
              </em>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                width: isMobile ? 40 : 60,
                height: 1.5,
                background: ACCENT,
                marginTop: isMobile ? 16 : 20,
                transformOrigin: "left",
                opacity: 0.3,
              }}
            />
          </div>

          {/* ── Horizontal card strip ── */}
          <motion.div
            className="cards-container"
            style={{
              x,
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "12px" : "clamp(16px, 2vw, 24px)",
              paddingLeft: isMobile ? "20px" : "clamp(24px, 8vw, 120px)",
              paddingRight: isMobile ? "20px" : "clamp(24px, 8vw, 100px)",
              paddingTop: isMobile ? "80px" : "clamp(100px, 4vh, 150px)",
              paddingBottom: isMobile ? "60px" : "clamp(40px, 4vh, 80px)",
              willChange: "transform",
            }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                className="service-card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={!isMobile ? {
                  y: -6,
                  backgroundColor: "#9B7B5E",
                  boxShadow: "0 25px 35px -15px rgba(155,123,94,0.35)",
                  borderColor: "transparent",
                } : {}}
                whileTap={isMobile ? {
                  scale: 0.98,
                  backgroundColor: "#9B7B5E",
                } : {}}
                style={{
                  position: "relative",
                  minWidth: isMobile ? "260px" : "clamp(280px, 26vw, 380px)",
                  height: isMobile ? "380px" : "320px",
                  backgroundColor: "#ffffff",
                  borderRadius: isMobile ? "16px" : "12px",
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 10px 25px -12px rgba(0,0,0,0.08)",
                  padding: isMobile ? "32px 16px" : "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, transform 0.2s ease",
                }}
              >
                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: isMobile ? "1.2rem" : "clamp(1.3rem, 2vw, 1.6rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                    color: "#1a1a1a",
                    marginBottom: isMobile ? 12 : 16,
                    transition: "color 0.3s ease",
                  }}
                  className="card-title"
                >
                  {card.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: isMobile ? "0.85rem" : "0.9rem",
                    fontWeight: 300,
                    lineHeight: isMobile ? 1.5 : 1.6,
                    color: "#555555",
                    flex: 1,
                    transition: "color 0.3s ease",
                    display: "-webkit-box",
                    WebkitLineClamp: isMobile ? 3 : 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                  className="card-desc"
                >
                  {card.desc}
                </p>

                {/* Read More row */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: "auto",
                  paddingTop: isMobile ? 0 : 16,
                }}>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: isMobile ? "0.85rem" : "0.9rem",
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                      color: ACCENT,
                      transition: "color 0.3s ease",
                    }}
                    className="card-cta"
                  >
                    Read More
                  </span>

                  <svg
                    className="card-arrow"
                    width={isMobile ? "18" : "20"}
                    height={isMobile ? "12" : "14"}
                    viewBox="0 0 20 14"
                    fill="none"
                    style={{ transition: "all 0.3s ease", flexShrink: 0 }}
                  >
                    <path
                      d="M1 7C0.44772 7 0 7.44772 0 8C0 8.55228 0.44772 9 1 9V7ZM19.7071 8.70711C20.0976 8.31658 20.0976 7.68342 19.7071 7.29289L13.3431 0.928932C12.9526 0.538408 12.3195 0.538408 11.9289 0.928932C11.5384 1.31946 11.5384 1.95262 11.9289 2.34315L17.5858 8L11.9289 13.6569C11.5384 14.0474 11.5384 14.6805 11.9289 15.0711C12.3195 15.4616 12.9526 15.4616 13.3431 15.0711L19.7071 8.70711ZM1 9H19V7H1V9Z"
                      fill={ACCENT}
                      className="arrow-fill"
                    />
                  </svg>
                </div>

                {/* Hover overlay styles */}
                <style>{`
                  .service-card:hover .card-title { color: ${!isMobile ? '#ffffff' : '#1a1a1a'} !important; }
                  .service-card:hover .card-desc  { color: ${!isMobile ? 'rgba(255,255,255,0.88)' : '#555555'} !important; }
                  .service-card:hover .card-cta   { color: ${!isMobile ? '#ffffff' : ACCENT} !important; }
                  .service-card:hover .arrow-fill { fill: ${!isMobile ? '#ffffff' : ACCENT} !important; }
                  
                  /* Active state for mobile tap */
                  .service-card:active {
                    background-color: ${isMobile ? '#9B7B5E' : 'transparent'} !important;
                  }
                  .service-card:active .card-title,
                  .service-card:active .card-desc,
                  .service-card:active .card-cta {
                    color: ${isMobile ? '#ffffff' : 'inherit'} !important;
                  }
                  .service-card:active .arrow-fill {
                    fill: ${isMobile ? '#ffffff' : ACCENT} !important;
                  }
                `}</style>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Scroll indicator (hidden on mobile) ── */}
          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              position: "absolute",
              bottom: isMobile ? "30px" : "clamp(90px, 1vh, 40px)",
              left: "50%",
              transform: "translateX(-50%)",
              display: isMobile ? "none" : "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              pointerEvents: "none",
              zIndex: 20,
            }}
          >
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#aaa",
              fontWeight: 500,
            }}>
              Scroll to explore
            </span>
            <div style={{
              width: 22, height: 36,
              border: `1.5px solid rgba(155,123,94,0.25)`,
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              paddingTop: 6,
            }}>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 4, height: 6, borderRadius: 4, background: ACCENT }}
              />
            </div>
          </motion.div>

          {/* Mobile scroll hint */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.9)",
                padding: "8px 16px",
                borderRadius: 40,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                backdropFilter: "blur(4px)",
                zIndex: 20,
                pointerEvents: "none",
              }}
            >
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                color: ACCENT,
                fontWeight: 500,
              }}>
                Scroll to explore
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.div>
          )}

          {/* Edge lines - adjusted for mobile */}
          <div style={{
            position: "absolute", 
            left: isMobile ? "10px" : "clamp(16px, 3vw, 40px)",
            top: "50%", 
            transform: "translateY(-50%)",
            width: 1, 
            height: isMobile ? 40 : 80,
            background: `linear-gradient(to bottom, transparent, ${ACCENT_MID}, transparent)`,
            opacity: isMobile ? 0.5 : 1,
          }} />
          <div style={{
            position: "absolute", 
            right: isMobile ? "10px" : "clamp(16px, 3vw, 40px)",
            top: "50%", 
            transform: "translateY(-50%)",
            width: 1, 
            height: isMobile ? 40 : 80,
            background: `linear-gradient(to bottom, transparent, ${ACCENT_MID}, transparent)`,
            opacity: isMobile ? 0.5 : 1,
          }} />
        </div>
      </section>
    </>
  );
}