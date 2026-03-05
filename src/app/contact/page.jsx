"use client";
import { useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────
   COLOUR PALETTE 1
───────────────────────────────────────── */
const C = {
  base:      "#FFFFFF",
  primary:   "#A03048",
  darkAcc:   "#5C1A1A",
  secondary: "#FDF6D8",
  highlight: "#B06070",
  text:      "#111111",
  textMid:   "#4a2020",
  textSoft:  "#8a5050",
};

/* ─────────────────────────────────────────
   HALF-CIRCLE SIDE ORB
───────────────────────────────────────── */
function SideOrb({ side }) {
  const push = side === "right" ? "left" : "right";
  const tx = side === "right" ? "-50%" : "50%";
  return (
    <div style={{
      position: "fixed", top: "50%", [side]: 0,
      transform: "translateY(-50%)",
      width: 90, height: 260,
      zIndex: 30, pointerEvents: "none", overflow: "hidden",
    }}>
      {[200, 140, 86].map((s, i) => (
        <div key={i} style={{
          position: "absolute", top: "50%", [push]: 0,
          width: s, height: s, borderRadius: "50%",
          border: i === 2
            ? `2.5px solid transparent`
            : `${i === 0 ? "1.5px" : "1px"} solid ${i === 0 ? C.primary + "22" : C.highlight + "30"}`,
          borderTopColor: i === 2 ? C.primary : undefined,
          borderRightColor: i === 2 ? C.primary : undefined,
          transform: `translate(${tx}, -50%)`,
          animation: `sideOrb${i + 1} ${[14, 9, 4][i]}s linear infinite${i === 1 ? " reverse" : ""}`,
        }} />
      ))}
      {/* travelling dot */}
      <div style={{
        position: "absolute", top: "50%", [push]: 0,
        width: 7, height: 7, borderRadius: "50%",
        background: C.primary, boxShadow: `0 0 10px ${C.primary}`,
        transform: `translate(${tx}, -50%)`,
        transformOrigin: `${side === "right" ? "-93px" : "93px"} 0`,
        animation: "sideOrbDot 14s linear infinite",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────
   FLOATING INPUT
───────────────────────────────────────── */
function FloatField({ label, name, type = "text", value, onChange, required, textarea }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const base = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `2px solid ${active ? C.primary : C.primary + "30"}`,
    padding: "22px 0 8px",
    fontFamily: "'Crimson Pro', serif",
    fontSize: "1rem",
    color: C.text,
    outline: "none",
    resize: "none",
    transition: "border-color 0.3s ease",
    lineHeight: 1.5,
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <label style={{
        position: "absolute",
        top: active ? 4 : 20,
        left: 0,
        fontFamily: "'Crimson Pro', serif",
        fontSize: active ? "0.68rem" : "1rem",
        letterSpacing: active ? "0.18em" : "0.04em",
        textTransform: active ? "uppercase" : "none",
        color: active ? C.primary : C.textSoft,
        fontStyle: active ? "normal" : "italic",
        transition: "all 0.25s ease",
        pointerEvents: "none",
      }}>
        {label}{required && <span style={{ color: C.primary }}> *</span>}
      </label>

      {textarea ? (
        <textarea
          name={name}
          rows={4}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          style={base}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          style={base}
        />
      )}

      {/* underline glow */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        height: 2, width: active ? "100%" : "0%",
        background: C.primary,
        transition: "width 0.35s ease",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────
   CONTACT INFO CARD
───────────────────────────────────────── */
function InfoCard({ icon, title, lines, link }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "28px 24px",
        border: `1.5px solid ${hov ? C.primary + "60" : C.primary + "14"}`,
        borderRadius: 16,
        background: hov ? C.secondary : C.base,
        transition: "all 0.3s ease",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? `0 12px 36px ${C.primary}14` : "0 2px 10px rgba(0,0,0,0.03)",
        cursor: link ? "pointer" : "default",
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: `linear-gradient(135deg, ${C.primary}18, ${C.secondary})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 16,
        border: `1px solid ${C.primary}20`,
        fontSize: "1.2rem",
      }}>
        {icon}
      </div>
      <div style={{
        fontFamily: "'Crimson Pro', serif", fontSize: "0.65rem",
        letterSpacing: "0.3em", textTransform: "uppercase",
        color: C.textSoft, marginBottom: 8,
      }}>
        {title}
      </div>
      {lines.map((l, i) => (
        link && i === 0 ? (
          <a key={i} href={link} style={{
            display: "block",
            fontFamily: "'Crimson Pro', serif", fontSize: "1rem",
            color: hov ? C.primary : C.textMid, fontStyle: "italic",
            textDecoration: "none", lineHeight: 1.6,
            transition: "color 0.2s ease",
          }}>
            {l}
          </a>
        ) : (
          <p key={i} style={{
            fontFamily: "'Crimson Pro', serif", fontSize: "1rem",
            color: C.textMid, fontStyle: "italic", lineHeight: 1.6,
          }}>
            {l}
          </p>
        )
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    service: "", budget: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  const services = [
    "SEO", "Web Development", "Social Media Marketing",
    "Advertising / PPC", "Branding", "Content Writing",
    "Video Production", "App Development", "Combo Package",
  ];

  const budgets = [
    "Under ₹25,000", "₹25,000 – ₹75,000",
    "₹75,000 – ₹2,00,000", "₹2,00,000 – ₹5,00,000",
    "₹5,00,000+", "Let's Discuss",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.base}; color: ${C.text}; }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: ${C.secondary}; }
        ::-webkit-scrollbar-thumb { background: ${C.primary}; border-radius: 2px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sideOrb1 {
          from { transform: translate(var(--tx,-50%), -50%) rotate(0deg); }
          to   { transform: translate(var(--tx,-50%), -50%) rotate(360deg); }
        }
        @keyframes sideOrb2 {
          from { transform: translate(var(--tx,-50%), -50%) rotate(0deg); }
          to   { transform: translate(var(--tx,-50%), -50%) rotate(-360deg); }
        }
        @keyframes sideOrb3 {
          from { transform: translate(var(--tx,-50%), -50%) rotate(0deg); }
          to   { transform: translate(var(--tx,-50%), -50%) rotate(360deg); }
        }
        @keyframes sideOrbDot {
          0%   { transform: translate(-50%, -50%) rotate(0deg)   translateX(-93px); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(-93px); }
        }
        @keyframes pulseAnim {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.2); }
        }
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes successPop {
          0%   { opacity: 0; transform: scale(0.85) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes drawCheck {
          from { stroke-dashoffset: 60; }
          to   { stroke-dashoffset: 0; }
        }

        select option { background: ${C.base}; color: ${C.text}; }

        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row      { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Fixed side orbs */}
      <SideOrb side="right" />
      <SideOrb side="left" />

      {/* ═══════════════════════════════════════
          HERO — full screen
      ════════════════════════════════════════ */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: C.base,
        position: "relative", overflow: "hidden",
        padding: "0 clamp(24px, 8vw, 120px)",
        textAlign: "center",
      }}>
        {/* Grid texture */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(${C.primary}07 1px, transparent 1px),
            linear-gradient(90deg, ${C.primary}07 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }} />

        {/* Warm wash top-left */}
        <div style={{
          position: "absolute", top: "-20%", left: "-14%",
          width: "55vw", height: "55vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${C.secondary} 0%, transparent 65%)`,
          pointerEvents: "none", opacity: 0.85,
        }} />

        {/* Blush bottom-right */}
        <div style={{
          position: "absolute", bottom: "-12%", right: "-10%",
          width: "38vw", height: "38vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${C.primary}14 0%, transparent 65%)`,
          pointerEvents: "none",
        }} />

        {/* Decorative rings — top right */}
        {[170, 120, 68].map((s, i) => (
          <div key={i} style={{
            position: "absolute",
            top: `calc(6% + ${i * 26}px)`, right: `calc(6% + ${i * 26}px)`,
            width: s, height: s, borderRadius: "50%",
            border: `1px solid ${i === 2 ? C.primary + "28" : C.primary + "12"}`,
            animation: `spinRing ${14 - i * 3}s linear infinite${i % 2 ? " reverse" : ""}`,
            pointerEvents: "none",
          }} />
        ))}

        {/* Hero content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 760 }}>
          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "7px 22px",
            border: `1px solid ${C.primary}28`, borderRadius: 40,
            fontFamily: "'Crimson Pro', serif",
            fontSize: "0.68rem", letterSpacing: "0.28em", textTransform: "uppercase",
            color: C.primary, marginBottom: 36,
            background: C.secondary + "90",
            animation: "fadeUp 0.8s ease both",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: C.primary, animation: "pulseAnim 2s infinite",
            }} />
            Digital Sahaay · Let's Connect · 2026
          </div>

          <h1 style={{
            fontFamily: "'Crimson Pro', serif",
            fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 600,
            color: C.text, lineHeight: 0.95, letterSpacing: "-0.03em",
            marginBottom: 26, animation: "fadeUp 0.9s ease 0.1s both",
          }}>
            Start a<br />
            <em style={{ color: C.primary }}>Conversation</em>
          </h1>

          <p style={{
            fontFamily: "'Crimson Pro', serif",
            fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
            color: C.textSoft, lineHeight: 1.8, fontStyle: "italic",
            maxWidth: 520, margin: "0 auto 44px",
            animation: "fadeUp 0.9s ease 0.2s both",
          }}>
            Whether you're launching a brand, scaling a business, or just exploring what's possible — we're here to help make it real.
          </p>

          {/* Stat pills */}
          <div style={{
            display: "flex", justifyContent: "center",
            gap: 16, flexWrap: "wrap", marginBottom: 52,
            animation: "fadeUp 0.9s ease 0.3s both",
          }}>
            {[
              { val: "500+", label: "Clients Served" },
              { val: "48hr", label: "Response Time" },
              { val: "100%", label: "Free First Consult" },
              { val: "Pan-India", label: "We Operate" },
            ].map(s => (
              <div key={s.val} style={{
                padding: "10px 22px",
                border: `1px solid ${C.primary}22`, borderRadius: 40,
                background: C.secondary + "70",
                textAlign: "center",
              }}>
                <div style={{
                  fontFamily: "'Crimson Pro', serif", fontSize: "1.2rem",
                  fontWeight: 600, color: C.primary,
                }}>
                  {s.val}
                </div>
                <div style={{
                  fontFamily: "'Crimson Pro', serif", fontSize: "0.68rem",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: C.textSoft,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{
            display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap",
            animation: "fadeUp 0.9s ease 0.4s both",
          }}>
            <a href="#contact-form" style={{
              padding: "14px 42px",
              background: C.primary, color: "#fff",
              borderRadius: 50, border: "none",
              fontFamily: "'Crimson Pro', serif", fontSize: "1rem",
              fontWeight: 600, letterSpacing: "0.1em",
              textDecoration: "none", cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: `0 10px 30px ${C.primary}28`,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = C.darkAcc; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.primary; e.currentTarget.style.transform = "none"; }}
            >
              Send a Message
            </a>
            <a href="tel:+91XXXXXXXXXX" style={{
              padding: "14px 42px",
              background: "transparent", color: C.primary,
              border: `1.5px solid ${C.primary}45`, borderRadius: 50,
              fontFamily: "'Crimson Pro', serif", fontSize: "1rem",
              fontWeight: 600, letterSpacing: "0.1em",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = C.secondary; e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = C.primary + "45"; e.currentTarget.style.transform = "none"; }}
            >
              Call Us Now
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <a href="#contact-form" style={{
          position: "absolute", bottom: 32, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 8,
          animation: "fadeUp 1s ease 0.6s both",
          cursor: "pointer", textDecoration: "none",
          zIndex: 2,
        }}>
          <span style={{
            fontFamily: "'Crimson Pro', serif", fontSize: "0.58rem",
            letterSpacing: "0.32em", textTransform: "uppercase", color: C.textSoft,
          }}>Scroll</span>
          <div style={{
            width: 1, height: 38,
            background: `linear-gradient(${C.primary}, transparent)`,
          }} />
        </a>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT BODY
      ════════════════════════════════════════ */}
      <div id="contact-form" style={{
        maxWidth: 1240, margin: "0 auto",
        padding: "80px clamp(20px, 5vw, 60px) 100px",
      }}>

        {/* ── Section label ── */}
        <div style={{ marginBottom: 60, textAlign: "center" }}>
          <div style={{
            fontFamily: "'Crimson Pro', serif", fontSize: "0.63rem",
            letterSpacing: "0.35em", textTransform: "uppercase",
            color: C.textSoft, marginBottom: 12,
          }}>
            ◆ Reach Out
          </div>
          <h2 style={{
            fontFamily: "'Crimson Pro', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600,
            color: C.text, letterSpacing: "-0.01em",
          }}>
            How Can We <em style={{ color: C.primary }}>Help You?</em>
          </h2>
        </div>

        {/* ── Two-column grid ── */}
        <div className="contact-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: 60,
          alignItems: "start",
        }}>

          {/* ── LEFT: Info ── */}
          <div>
            <p style={{
              fontFamily: "'Crimson Pro', serif", fontSize: "1.08rem",
              color: C.textSoft, fontStyle: "italic", lineHeight: 1.8,
              marginBottom: 40,
            }}>
              We're a collective of designers, developers & strategists who believe in genuine partnerships. Tell us about your project and we'll get back within 48 hours.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
              <InfoCard
                icon="✉"
                title="Email Us"
                lines={["info@digitalsahaay.com"]}
                link="mailto:info@digitalsahaay.com"
              />
              <InfoCard
                icon="☎"
                title="Call Us"
                lines={["+91 XXXXX XXXXX", "Mon–Sat · 9am–7pm IST"]}
                link="tel:+91XXXXXXXXXX"
              />
              <InfoCard
                icon="◎"
                title="Our Location"
                lines={["India", "Remote-first · Serving clients nationwide"]}
              />
              <InfoCard
                icon="◈"
                title="Website"
                lines={["www.digitalsahaay.com"]}
                link="https://www.digitalsahaay.com"
              />
            </div>

            {/* Social links */}
            <div>
              <div style={{
                fontFamily: "'Crimson Pro', serif", fontSize: "0.62rem",
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: C.textSoft, marginBottom: 16,
              }}>
                Follow Us
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[
                  { label: "Instagram", href: "#" },
                  { label: "LinkedIn", href: "#" },
                  { label: "Twitter / X", href: "#" },
                  { label: "Facebook", href: "#" },
                ].map(s => (
                  <a key={s.label} href={s.href} style={{
                    padding: "8px 18px",
                    border: `1px solid ${C.primary}22`, borderRadius: 30,
                    fontFamily: "'Crimson Pro', serif", fontSize: "0.82rem",
                    color: C.textSoft, textDecoration: "none",
                    transition: "all 0.22s ease",
                    background: C.base,
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.primary; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = C.primary; }}
                    onMouseLeave={e => { e.currentTarget.style.background = C.base; e.currentTarget.style.color = C.textSoft; e.currentTarget.style.borderColor = C.primary + "22"; }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div style={{
            background: C.base,
            border: `1.5px solid ${C.primary}14`,
            borderRadius: 22,
            padding: "48px clamp(24px, 4vw, 48px)",
            boxShadow: `0 8px 40px ${C.primary}08`,
            position: "relative",
            overflow: "hidden",
          }}>
            {/* BG watermark */}
            <div style={{
              position: "absolute", bottom: -30, right: -10,
              fontFamily: "'Crimson Pro', serif", fontSize: "11rem",
              fontWeight: 600, fontStyle: "italic",
              color: `${C.primary}04`, userSelect: "none",
              lineHeight: 1, pointerEvents: "none",
            }}>
              DS
            </div>

            {/* Top accent line */}
            <div style={{
              position: "absolute", top: 0, left: "12%", right: "12%", height: 3,
              background: `linear-gradient(90deg, transparent, ${C.primary}, transparent)`,
              borderRadius: "0 0 4px 4px",
            }} />

            {submitted ? (
              /* Success state */
              <div style={{
                textAlign: "center", padding: "40px 0",
                animation: "successPop 0.5s ease both",
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.primary}18, ${C.secondary})`,
                  border: `2px solid ${C.primary}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px",
                }}>
                  <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
                    <path
                      d="M8 16 L13 21 L24 11"
                      stroke={C.primary} strokeWidth={2.5}
                      strokeLinecap="round" strokeLinejoin="round"
                      strokeDasharray={60} strokeDashoffset={0}
                      style={{ animation: "drawCheck 0.6s ease 0.3s both" }}
                    />
                  </svg>
                </div>
                <h3 style={{
                  fontFamily: "'Crimson Pro', serif",
                  fontSize: "1.9rem", fontWeight: 600, fontStyle: "italic",
                  color: C.text, marginBottom: 10,
                }}>
                  Message Received
                </h3>
                <p style={{
                  fontFamily: "'Crimson Pro', serif", fontSize: "1rem",
                  color: C.textSoft, fontStyle: "italic", lineHeight: 1.7,
                  maxWidth: 360, margin: "0 auto 32px",
                }}>
                  Thank you for reaching out. We'll review your enquiry and get back to you within 48 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name:"",email:"",phone:"",company:"",service:"",budget:"",message:"" }); }}
                  style={{
                    padding: "12px 30px",
                    background: "transparent", color: C.primary,
                    border: `1.5px solid ${C.primary}40`, borderRadius: 10,
                    fontFamily: "'Crimson Pro', serif", fontSize: "0.9rem",
                    letterSpacing: "0.1em", cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.primary; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.primary; }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ position: "relative" }}>
                <div style={{ marginBottom: 32 }}>
                  <div style={{
                    fontFamily: "'Crimson Pro', serif", fontSize: "1.6rem",
                    fontWeight: 600, fontStyle: "italic", color: C.text,
                    marginBottom: 6,
                  }}>
                    Tell us about your project
                  </div>
                  <p style={{
                    fontFamily: "'Crimson Pro', serif", fontSize: "0.88rem",
                    color: C.textSoft, fontStyle: "italic",
                  }}>
                    Fields marked <span style={{ color: C.primary }}>*</span> are required
                  </p>
                </div>

                {/* Row 1: Name + Email */}
                <div className="form-row" style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: 32, marginBottom: 32,
                }}>
                  <FloatField label="Full Name" name="name" value={form.name} onChange={handleChange} required />
                  <FloatField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>

                {/* Row 2: Phone + Company */}
                <div className="form-row" style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: 32, marginBottom: 32,
                }}>
                  <FloatField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} />
                  <FloatField label="Company / Brand Name" name="company" value={form.company} onChange={handleChange} />
                </div>

                {/* Row 3: Service dropdown */}
                <div style={{ position: "relative", marginBottom: 32 }}>
                  <label style={{
                    display: "block",
                    fontFamily: "'Crimson Pro', serif", fontSize: "0.68rem",
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: form.service ? C.primary : C.textSoft,
                    marginBottom: 8, transition: "color 0.2s ease",
                  }}>
                    Service Required <span style={{ color: C.primary }}>*</span>
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      borderBottom: `2px solid ${form.service ? C.primary : C.primary + "30"}`,
                      padding: "8px 0",
                      fontFamily: "'Crimson Pro', serif", fontSize: "1rem",
                      fontStyle: "italic", color: form.service ? C.text : C.textSoft,
                      outline: "none", cursor: "pointer",
                      appearance: "none",
                    }}
                  >
                    <option value="" disabled>Select a service…</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <span style={{
                    position: "absolute", right: 0, top: "60%",
                    color: C.primary, fontSize: "0.7rem", pointerEvents: "none",
                  }}>▼</span>
                </div>

                {/* Row 4: Budget */}
                <div style={{ position: "relative", marginBottom: 32 }}>
                  <label style={{
                    display: "block",
                    fontFamily: "'Crimson Pro', serif", fontSize: "0.68rem",
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: form.budget ? C.primary : C.textSoft,
                    marginBottom: 8, transition: "color 0.2s ease",
                  }}>
                    Approximate Budget
                  </label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      borderBottom: `2px solid ${form.budget ? C.primary : C.primary + "30"}`,
                      padding: "8px 0",
                      fontFamily: "'Crimson Pro', serif", fontSize: "1rem",
                      fontStyle: "italic", color: form.budget ? C.text : C.textSoft,
                      outline: "none", cursor: "pointer",
                      appearance: "none",
                    }}
                  >
                    <option value="" disabled>Select budget range…</option>
                    {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <span style={{
                    position: "absolute", right: 0, top: "60%",
                    color: C.primary, fontSize: "0.7rem", pointerEvents: "none",
                  }}>▼</span>
                </div>

                {/* Row 5: Message */}
                <div style={{ marginBottom: 36 }}>
                  <FloatField label="Your Message" name="message" value={form.message} onChange={handleChange} required textarea />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "16px 0",
                    background: loading ? C.primary + "80" : C.primary,
                    color: "#fff", border: "none", borderRadius: 12,
                    fontFamily: "'Crimson Pro', serif", fontSize: "1rem",
                    fontWeight: 600, letterSpacing: "0.14em",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: `0 8px 28px ${C.primary}28`,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = C.darkAcc; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 14px 36px ${C.primary}38`; }}}
                  onMouseLeave={e => { e.currentTarget.style.background = loading ? C.primary + "80" : C.primary; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 8px 28px ${C.primary}28`; }}
                >
                  {loading ? (
                    <>
                      <span style={{
                        width: 16, height: 16, borderRadius: "50%",
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                        animation: "spinRing 0.7s linear infinite",
                        display: "inline-block",
                      }} />
                      Sending…
                    </>
                  ) : (
                    <>Send Message ◆</>
                  )}
                </button>

                <p style={{
                  marginTop: 16, textAlign: "center",
                  fontFamily: "'Crimson Pro', serif", fontSize: "0.75rem",
                  color: C.textSoft, fontStyle: "italic",
                }}>
                  We respect your privacy. Your details will never be shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          FAQ STRIP
      ════════════════════════════════════════ */}
      <div style={{
        background: C.secondary,
        borderTop: `1px solid ${C.primary}10`,
        borderBottom: `1px solid ${C.primary}10`,
        padding: "70px clamp(20px, 5vw, 60px)",
      }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{
              fontFamily: "'Crimson Pro', serif", fontSize: "0.62rem",
              letterSpacing: "0.35em", textTransform: "uppercase",
              color: C.textSoft, marginBottom: 10,
            }}>◈ Common Questions</div>
            <h2 style={{
              fontFamily: "'Crimson Pro', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 600,
              color: C.text, fontStyle: "italic",
            }}>
              Before You <em style={{ color: C.primary }}>Reach Out</em>
            </h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}>
            {[
              { q: "How quickly do you respond?", a: "We aim to respond to all enquiries within 48 business hours. For urgent matters, call us directly." },
              { q: "Is the first consultation really free?", a: "Absolutely. Our initial consultation is completely free with no obligation. We want to understand your needs first." },
              { q: "Do you work with small businesses?", a: "Yes — our Silver packages are specifically designed for startups and small businesses with focused budgets." },
              { q: "Can I customise a package?", a: "Every business is different. All our packages can be customised and we're happy to create bespoke solutions." },
              { q: "Do you work across India?", a: "We operate remotely and serve clients pan-India. For local clients in our city, we also offer in-person meetings." },
              { q: "What information should I prepare?", a: "A brief on your business, your goals, target audience, and any existing brand assets will help us get started faster." },
            ].map((faq, i) => (
              <div key={i} style={{
                padding: "24px",
                background: C.base, borderRadius: 14,
                border: `1px solid ${C.primary}12`,
              }}>
                <div style={{
                  fontFamily: "'Crimson Pro', serif", fontSize: "0.62rem",
                  letterSpacing: "0.25em", textTransform: "uppercase",
                  color: C.primary, marginBottom: 8,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{
                  fontFamily: "'Crimson Pro', serif", fontSize: "1rem",
                  fontWeight: 600, color: C.text, marginBottom: 10,
                  lineHeight: 1.4,
                }}>
                  {faq.q}
                </div>
                <p style={{
                  fontFamily: "'Crimson Pro', serif", fontSize: "0.9rem",
                  color: C.textSoft, fontStyle: "italic", lineHeight: 1.7,
                }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════ */}
      <div style={{
        background: C.darkAcc,
        padding: "80px clamp(24px, 6vw, 80px)",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        {[220, 155, 90].map((s, i) => (
          <div key={i} style={{
            position: "absolute", top: "50%", left: "50%",
            width: s, height: s, borderRadius: "50%",
            border: `1px solid rgba(255,255,255,${0.04 + i * 0.02})`,
            transform: "translate(-50%, -50%)",
            animation: `spinRing ${14 + i * 4}s linear infinite${i % 2 ? " reverse" : ""}`,
          }} />
        ))}
        <div style={{ position: "relative", zIndex: 2 }}>
          <p style={{
            fontFamily: "'Crimson Pro', serif", fontSize: "0.62rem",
            letterSpacing: "0.35em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)", marginBottom: 14,
          }}>
            Ready to grow?
          </p>
          <h2 style={{
            fontFamily: "'Crimson Pro', serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 600, fontStyle: "italic",
            color: "#fff", marginBottom: 14, letterSpacing: "-0.02em",
          }}>
            Your Next Chapter Starts Here
          </h2>
          <p style={{
            fontFamily: "'Crimson Pro', serif", fontSize: "1.1rem",
            color: "rgba(255,255,255,0.5)", fontStyle: "italic", marginBottom: 38,
          }}>
            A free consultation is just one message away.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#contact-form" style={{
              padding: "14px 40px", background: "#fff", color: C.darkAcc,
              borderRadius: 50, fontFamily: "'Crimson Pro', serif",
              fontSize: "1rem", fontWeight: 600, letterSpacing: "0.1em",
              textDecoration: "none", transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = C.secondary; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "none"; }}
            >
              Get in Touch
            </a>
            <Link href="/services" style={{
              padding: "14px 40px", background: "transparent", color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.28)", borderRadius: 50,
              fontFamily: "'Crimson Pro', serif", fontSize: "1rem",
              fontWeight: 600, letterSpacing: "0.1em",
              textDecoration: "none", transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"; e.currentTarget.style.transform = "none"; }}
            >
              View Our Services
            </Link>
          </div>
        </div>
      </div>

      {/* ── Footer note ── */}
      <div style={{
        background: C.base,
        padding: "22px clamp(20px, 5vw, 60px)",
        borderTop: `1px solid ${C.primary}08`,
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 10,
      }}>
        <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "0.75rem", color: C.textSoft, fontStyle: "italic" }}>
          © 2026 Digital Sahaay · Your Digital Growth Partner
        </p>
        <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "0.75rem", color: C.textSoft }}>
          www.digitalsahaay.com
        </p>
      </div>
    </>
  );
}