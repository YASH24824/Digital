"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ACCENT = "#9B7B5E";

const testimonials = [
  { id: 1, name: "Michael Carter", role: "CEO, TechNova", rating: 5, initial: "MC", content: "Amazing service and execution. The team delivered beyond our expectations and truly understood our vision from day one." },
  { id: 2, name: "Sophia Martinez", role: "Founder, Elevate Studio", rating: 5, initial: "SM", content: "Very professional and premium quality. Every detail was handled with care and the final result was absolutely stunning." },
  { id: 3, name: "Daniel Kim", role: "Product Lead, InnovateX", rating: 5, initial: "DK", content: "Helped us scale confidently. Their strategic approach gave us clarity and the execution was flawless throughout." },
  { id: 4, name: "Emma Johnson", role: "Marketing Head, BrightCo", rating: 5, initial: "EJ", content: "Great communication and results. We always knew what was happening and the outcomes exceeded our targets significantly." },
  { id: 5, name: "James Wilson", role: "Director, Nexa Labs", rating: 5, initial: "JW", content: "Clean design and fast delivery. The work was polished, on-brand, and delivered ahead of schedule. Truly impressive." },
  { id: 6, name: "Olivia Brown", role: "Founder, Bloom Agency", rating: 5, initial: "OB", content: "Highly recommend for serious brands. They bring creativity and professionalism together in a way that's rare to find." },
];

function RatingStars({ rating }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: ACCENT, fontSize: "1rem" }}>
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [isMobile, setIsMobile] = useState(false);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

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
  const totalSlides = isMobile ? testimonials.length : desktopSlides.length;

  // Auto-play every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 7000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section
      style={{
        padding: isMobile ? "60px 20px" : "80px 80px",
        background: "#fafaf9",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          marginBottom: isMobile ? 36 : 56,
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
            color: ACCENT,
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
            fontSize: isMobile ? "clamp(1.8rem, 6vw, 2.5rem)" : "clamp(2.2rem, 4vw, 3.5rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "#1a1a1a",
            margin: 0,
          }}
        >
          What Our{" "}
          <em style={{ fontStyle: "italic", color: ACCENT }}>Clients Say</em>
        </motion.h2>

        {!isMobile && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              width: 60,
              height: 1.5,
              background: ACCENT,
              marginTop: 24,
              opacity: 0.3,
              transformOrigin: "left",
            }}
          />
        )}
      </div>

      {/* DESKTOP CAROUSEL */}
      {!isMobile && (
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ overflow: "hidden" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeInOut" }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 24,
                }}
              >
                {desktopSlides[current].map((t) => (
                  <div
                    key={t.id}
                    style={{
                      background: "#fff",
                      borderRadius: 20,
                      padding: "32px 28px",
                      border: "1px solid rgba(0,0,0,0.06)",
                      boxShadow: "0 8px 30px -10px rgba(0,0,0,0.08)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    <RatingStars rating={t.rating} />
                    <p style={{ margin: 0, lineHeight: 1.75, color: "#333", fontSize: "0.95rem", flex: 1 }}>
                      "{t.content}"
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                        paddingTop: 16,
                        borderTop: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
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
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          flexShrink: 0,
                        }}
                      >
                        {t.initial}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1a1a1a" }}>{t.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "#999", marginTop: 2 }}>{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* DOTS */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 36 }}>
            {desktopSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                style={{
                  width: i === current ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === current ? ACCENT : "rgba(155,123,94,0.25)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* MOBILE CAROUSEL */}
      {isMobile && (
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          <div style={{ overflow: "hidden" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "28px 22px",
                  border: "1px solid rgba(0,0,0,0.07)",
                  boxShadow: "0 12px 30px -10px rgba(0,0,0,0.12)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <RatingStars rating={testimonials[current].rating} />
                <p style={{ margin: 0, lineHeight: 1.75, color: "#333", fontSize: "0.92rem" }}>
                  "{testimonials[current].content}"
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    paddingTop: 14,
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
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
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {testimonials[current].initial}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "#1a1a1a" }}>
                      {testimonials[current].name}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#999", marginTop: 2 }}>
                      {testimonials[current].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* MOBILE DOTS ONLY */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 24 }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                style={{
                  width: i === current ? 22 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === current ? ACCENT : "rgba(155,123,94,0.25)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}