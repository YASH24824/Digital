"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ScrollStory({ children }) {
  const { scrollYProgress } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateHeight = () => setWindowHeight(window.innerHeight);
    updateHeight();
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    window.addEventListener("resize", updateHeight);
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const y = useTransform(scrollYProgress, [0, 1], [10, windowHeight - 250]);

  // Responsive button size
  const buttonSize = isMobile ? 40 : 70;
  const logoSize = isMobile ? 30 : 50;

  return (
    <>
      {/* Floating Logo Button - Responsive sizing */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        style={{
          position: "fixed",
          right: isMobile ? "15px" : "20px",
          y: y,
          width: `${buttonSize}px`,
          height: `${buttonSize}px`,
          background: "#5C2122",
          borderRadius: "50%",
          zIndex: 9999,
          boxShadow: "0 15px 35px rgba(92,33,34,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          border: "2px solid rgba(255,255,255,0.1)",
          cursor: "pointer",
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 20px 45px rgba(92,33,34,0.4)",
        }}
        whileTap={{ scale: 0.95 }}
        aria-label="About Digital Sahaay"
      >
        <Image
          src="/DigitalSahaaylogo.png"
          alt="Digital Sahaay"
          width={logoSize}
          height={logoSize}
          style={{ objectFit: "contain" }}
          priority
        />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.85)",
                backdropFilter: "blur(8px)",
                zIndex: 10000,
              }}
            />

            {/* Modal Container - Centers content properly */}
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                zIndex: 10001,
              }}
            >
              {/* Modal Content - Responsive sizing */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                style={{
                  width: isMobile ? "92%" : "90%",
                  maxWidth: isMobile ? "400px" : "600px",
                  maxHeight: isMobile ? "70vh" : "80vh",
                  overflowY: "auto",
                  backgroundColor: "#ffffff",
                  borderRadius: isMobile ? "20px" : "24px",
                  zIndex: 10001,
                  boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
                  pointerEvents: "auto",
                  position: "relative",
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    position: "absolute",
                    top: isMobile ? "16px" : "20px",
                    right: isMobile ? "16px" : "20px",
                    width: isMobile ? "32px" : "36px",
                    height: isMobile ? "32px" : "36px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.05)",
                    border: "none",
                    fontSize: isMobile ? "18px" : "20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#666",
                    transition: "all 0.2s ease",
                    zIndex: 10002,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.1)";
                    e.currentTarget.style.color = "#000";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)";
                    e.currentTarget.style.color = "#666";
                  }}
                >
                  ✕
                </button>

                {/* Modal Inner Content - Responsive padding */}
                <div style={{ 
                  padding: isMobile ? "40px 24px" : "48px 40px" 
                }}>
                  {/* Logo in modal */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: isMobile ? "24px" : "32px",
                    }}
                  >
                    <div
                      style={{
                        width: isMobile ? "80px" : "100px",
                        height: isMobile ? "80px" : "100px",
                        backgroundColor: "#5C2122",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 15px 30px rgba(92,33,34,0.2)",
                      }}
                    >
                      <Image
                        src="/DigitalSahaaylogo.png"
                        alt="Digital Sahaay"
                        width={isMobile ? 55 : 70}
                        height={isMobile ? 55 : 70}
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: isMobile ? "clamp(1.6rem, 5vw, 2rem)" : "2rem",
                      fontWeight: 500,
                      color: "#1a1a1a",
                      textAlign: "center",
                      marginBottom: isMobile ? "8px" : "12px",
                    }}
                  >
                    Digital Sahaay
                  </h2>

                  {/* Subtitle */}
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: isMobile ? "0.8rem" : "0.9rem",
                      letterSpacing: isMobile ? "0.2em" : "0.3em",
                      textTransform: "uppercase",
                      color: "#9B7B5E",
                      textAlign: "center",
                      marginBottom: isMobile ? "20px" : "24px",
                    }}
                  >
                    Digital Solutions & Marketing
                  </p>

                  {/* Description */}
                  <p style={{ 
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                    lineHeight: isMobile ? 1.6 : 1.7, 
                    color: "#555",
                    marginBottom: isMobile ? "16px" : "24px",
                    textAlign: isMobile ? "left" : "center",
                  }}>
                    Digital Sahaay is a full-service digital agency dedicated to
                    helping businesses establish and grow their online presence.
                    We combine strategic thinking with creative execution to
                    deliver measurable results.
                  </p>

                  {/* Additional features for mobile */}
                  {isMobile && (
                    <div style={{
                      backgroundColor: "rgba(155,123,94,0.05)",
                      padding: "16px",
                      borderRadius: "12px",
                      marginBottom: "24px",
                    }}>
                      <p style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "0.9rem",
                        fontStyle: "italic",
                        color: "#5C2122",
                        textAlign: "center",
                      }}>
                        "Empowering Your Digital Growth"
                      </p>
                    </div>
                  )}

                  {/* Contact Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      width: "100%",
                      padding: isMobile ? "14px" : "16px",
                      backgroundColor: "#5C2122",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      marginTop: isMobile ? "24px" : "32px",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#7a2c2d"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#5C2122"}
                  >
                    Get in Touch
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}