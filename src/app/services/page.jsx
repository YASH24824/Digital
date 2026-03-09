"use client";
import { useState, useEffect, useRef } from "react";
import { SideOrnament, Hero, ServiceSection } from "./components";
import { categories } from "./data/categories";
import { globalStyles } from "./styles/globalStyles";
import Link from "next/link";

/* ─────────────────────────────────────────
   CLASSIC COLOUR PALETTE
───────────────────────────────────────── */
const C = {
  base:      "#FDFAF5",
  primary:   "#8B3A3A",
  textSoft:  "#8B6B5E",
};

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState(null);
  const bodyRef = useRef(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveTab(id);
  };

  const scrollToBody = () => {
    bodyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const onScroll = () => {
      for (const cat of categories) {
        const el = document.getElementById(cat.id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= 120 && bottom > 120) {
          setActiveTab(cat.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{globalStyles}</style>

      {/* Side ornaments */}
      <SideOrnament side="left" />
      <SideOrnament side="right" />

      {/* Hero */}
      <Hero onExplore={scrollToBody} />

      {/* Sticky navigation */}
      <div style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: C.base,
        borderBottom: `1px solid ${C.primary}10`,
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(253,250,245,0.9)",
      }}>
        <div className="tab-bar" style={{
          maxWidth: 1300,
          margin: "0 auto",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.id)}
              style={{
                padding: "16px 16px",
                background: "transparent",
                border: "none",
                borderBottom: activeTab === cat.id
                  ? `2px solid ${C.primary}`
                  : "2px solid transparent",
                color: activeTab === cat.id ? C.primary : C.textSoft,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Service sections */}
      <div ref={bodyRef} style={{
        maxWidth: 1300,
        margin: "0 auto",
        padding: "0 40px 80px",
      }}>
        {categories.map((cat, i) => (
          <ServiceSection key={cat.id} cat={cat} index={i} />
        ))}
      </div>

      {/* Terms */}
      <div style={{
        background: C.secondary,
        padding: "80px 40px",
        borderTop: `1px solid ${C.primary}10`,
        borderBottom: `1px solid ${C.primary}10`,
      }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2rem",
            fontWeight: 600,
            fontStyle: "italic",
            color: C.text,
            marginBottom: 40,
            letterSpacing: "-0.02em",
          }}>
            Terms of Engagement
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 24,
          }}>
            {[
              { title: "Payment", desc: "A 50% commission begins the journey. Final balance upon completion. Monthly retainers due on the first." },
              { title: "Revisions", desc: "Each tier includes thoughtful refinements. Additional requests quoted with care." },
              { title: "Expedited", desc: "For those with urgency, a 25% expedite fee applies. Timeline begins upon receipt." },
              { title: "Cancellation", desc: "Initial payment is non-refundable. Monthly engagements require 30 days notice." },
            ].map(item => (
              <div key={item.title} style={{
                padding: "28px",
                border: `1px solid ${C.primary}15`,
                background: C.base,
              }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: C.primary,
                  marginBottom: 12,
                }}>
                  {item.title}
                </div>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.9rem",
                  color: C.textSoft,
                  lineHeight: 1.7,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div style={{
        background: C.darkAcc,
        padding: "80px 40px",
        textAlign: "center",
        position: "relative",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(45deg, ${C.highlight}05 0px, ${C.highlight}05 2px, transparent 2px, transparent 10px)`,
          pointerEvents: "none",
        }} />
        
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 16,
          }}>
            Bespoke Solutions
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 600,
            fontStyle: "italic",
            color: "#fff",
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}>
            Let Us Craft Your Vision
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            color: "rgba(255,255,255,0.6)",
            marginBottom: 36,
          }}>
            Every project begins with a conversation.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/#contact" style={{
              padding: "14px 42px",
              background: "#fff",
              color: C.darkAcc,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = C.highlight; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
            >
              Schedule a Call
            </Link>
            <a href="mailto:info@digitalsahaay.com" style={{
              padding: "14px 42px",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
            >
              Write to Us
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: C.base,
        padding: "24px 40px",
        borderTop: `1px solid ${C.primary}08`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.75rem",
          color: C.textSoft,
        }}>
          © 2026 Digital Sahaay · All services subject to GST
        </p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.75rem",
          color: C.textSoft,
        }}>
          www.digitalsahaay.com
        </p>
      </div>
    </>
  );
}