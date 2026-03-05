"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ACCENT = "#9B7B5E";

const testimonials = [
  { id: 1, name: "Michael Carter", role: "CEO, TechNova", rating: 5, initial: "MC", content: "Amazing service and execution." },
  { id: 2, name: "Sophia Martinez", role: "Founder, Elevate Studio", rating: 5, initial: "SM", content: "Very professional and premium quality." },
  { id: 3, name: "Daniel Kim", role: "Product Lead, InnovateX", rating: 5, initial: "DK", content: "Helped us scale confidently." },
  { id: 4, name: "Emma Johnson", role: "Marketing Head, BrightCo", rating: 5, initial: "EJ", content: "Great communication and results." },
  { id: 5, name: "James Wilson", role: "Director, Nexa Labs", rating: 5, initial: "JW", content: "Clean design and fast delivery." },
  { id: 6, name: "Olivia Brown", role: "Founder, Bloom Agency", rating: 5, initial: "OB", content: "Highly recommend for serious brands." },
];

function RatingStars({ rating }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: ACCENT }}>
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [isMobile, setIsMobile] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const desktopSlides = [
    testimonials.slice(0, 3),
    testimonials.slice(3, 6),
  ];

  const nextSlide = () => {
    if (isMobile) {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    } else {
      setCurrent((prev) => (prev + 1) % desktopSlides.length);
    }
  };

  const prevSlide = () => {
    if (isMobile) {
      setCurrent((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
    } else {
      setCurrent((prev) =>
        prev === 0 ? desktopSlides.length - 1 : prev - 1
      );
    }
  };

  return (
    <section style={{ padding: isMobile ? "40px 16px" : "60px 80px" }}>

      {/* ===== TITLE SECTION ===== */}
      {/* ================= HEADER (LEFT ALIGNED) ================= */}
<div
  style={{
    maxWidth: 1400,
    margin: "0 auto",
    marginBottom: isMobile ? 40 : 60,
  }}
>
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: isMobile ? "0.7rem" : "0.75rem",
      letterSpacing: "0.4em",
      textTransform: "uppercase",
      color: "#9B7B5E",
      marginBottom: isMobile ? 8 : 12,
      fontWeight: 500,
    }}
  >
    Testimonials
  </motion.p>

  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: isMobile
        ? "clamp(1.8rem, 6vw, 2.5rem)"
        : "clamp(2.2rem, 4vw, 3.5rem)",
      fontWeight: 400,
      letterSpacing: "-0.02em",
      lineHeight: 1.1,
      color: "#1a1a1a",
      maxWidth: isMobile ? "100%" : "60%",
    }}
  >
    What Our{" "}
    <em style={{ fontStyle: "italic", color: "#9B7B5E" }}>
      Clients Say
    </em>
  </motion.h2>

  {!isMobile && (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        width: 60,
        height: 1.5,
        background: "#9B7B5E",
        marginTop: 24,
        opacity: 0.3,
        transformOrigin: "left",
      }}
    />
  )}
</div>

      {/* ===== MOBILE ===== */}
      {isMobile ? (
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                background: "#fff",
                borderRadius: 24,
                padding: "24px 20px",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 15px 30px -12px rgba(0,0,0,0.15)",
              }}
            >
              <RatingStars rating={testimonials[current].rating} />
              <p style={{ margin: "16px 0", lineHeight: 1.7 }}>
                "{testimonials[current].content}"
              </p>

              <div style={{ display: "flex", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: ACCENT,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {testimonials[current].initial}
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>
                    {testimonials[current].name}
                  </div>
                  <div style={{ fontSize: 12, color: "#888" }}>
                    {testimonials[current].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

      
        </div>
      ) : (
        /* ===== DESKTOP ===== */
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 30,
              }}
            >
              {desktopSlides[current].map((t) => (
                <div
                  key={t.id}
                  style={{
                    background: "#fff",
                    borderRadius: 24,
                    padding: 32,
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 15px 35px -15px rgba(0,0,0,0.08)",
                  }}
                >
                  <RatingStars rating={t.rating} />
                  <p style={{ margin: "20px 0", lineHeight: 1.7 }}>
                    "{t.content}"
                  </p>

                  <div style={{ display: "flex", gap: 12 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: ACCENT,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {t.initial}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "#888" }}>
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

         
        </div>
      )}
    </section>
  );
}