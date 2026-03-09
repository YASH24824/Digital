"use client";
import { useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────
   COLOUR PALETTE — matching Testimonials
───────────────────────────────────────── */
const C = {
  base:      "#FAFAF9",
  primary:   "#9B7B5E",
  darkAcc:   "#6B4C35",
  secondary: "#F5EFE6",
  highlight: "#B89578",
  text:      "#1a1a1a",
  textMid:   "#3d2e22",
  textSoft:  "#8a7060",
};

/* ─────────────────────────────────────────
   HALF-CIRCLE SIDE ORB
───────────────────────────────────────── */
function SideOrb({ side }) {
  const push = side === "right" ? "left" : "right";
  const tx   = side === "right" ? "-50%" : "50%";
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
          borderTopColor:   i === 2 ? C.primary : undefined,
          borderRightColor: i === 2 ? C.primary : undefined,
          transform: `translate(${tx}, -50%)`,
          animation: `sideOrb${i + 1} ${[14, 9, 4][i]}s linear infinite${i === 1 ? " reverse" : ""}`,
        }} />
      ))}
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
    borderBottom: `1.5px solid ${active ? C.primary : C.primary + "30"}`,
    padding: "22px 0 8px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "1rem",
    color: C.text,
    outline: "none",
    resize: "none",
    transition: "border-color 0.3s ease",
    lineHeight: 1.6,
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <label style={{
        position: "absolute",
        top: active ? 3 : 20,
        left: 0,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: active ? "0.62rem" : "0.95rem",
        letterSpacing: active ? "0.2em" : "0.04em",
        textTransform: active ? "uppercase" : "none",
        color: active ? C.primary : C.textSoft,
        transition: "all 0.25s ease",
        pointerEvents: "none",
        fontWeight: active ? 500 : 400,
      }}>
        {label}{required && <span style={{ color: C.primary }}> *</span>}
      </label>

      {textarea ? (
        <textarea
          name={name} rows={4}
          value={value} onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          style={base}
        />
      ) : (
        <input
          type={type} name={name}
          value={value} onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          style={base}
        />
      )}

      <div style={{
        position: "absolute", bottom: 0, left: 0,
        height: "1.5px", width: active ? "100%" : "0%",
        background: C.primary,
        transition: "width 0.4s ease",
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
        padding: "22px 20px",
        border: `1px solid ${hov ? C.primary + "60" : C.primary + "18"}`,
        borderRadius: 14,
        background: hov ? C.secondary : C.base,
        transition: "all 0.3s ease",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? `0 10px 32px ${C.primary}14` : "0 2px 8px rgba(0,0,0,0.03)",
        cursor: link ? "pointer" : "default",
        display: "flex", alignItems: "flex-start", gap: 16,
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
        background: `linear-gradient(135deg, ${C.primary}18, ${C.secondary})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        border: `1px solid ${C.primary}20`,
        fontSize: "1.1rem", marginTop: 2,
      }}>
        {icon}
      </div>
      <div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem",
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: C.textSoft, marginBottom: 5, fontWeight: 500,
        }}>
          {title}
        </div>
        {lines.map((l, i) =>
          link && i === 0 ? (
            <a key={i} href={link} style={{
              display: "block",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem",
              color: hov ? C.primary : C.textMid,
              textDecoration: "none", lineHeight: 1.6,
              transition: "color 0.2s ease",
            }}>
              {l}
            </a>
          ) : (
            <p key={i} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem",
              color: i === 0 ? C.textMid : C.textSoft,
              lineHeight: 1.6, margin: 0,
            }}>
              {l}
            </p>
          )
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   FAQ ITEM
───────────────────────────────────────── */
function FaqItem({ number, q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        padding: "22px 24px",
        background: C.base,
        borderRadius: 14,
        border: `1px solid ${open ? C.primary + "40" : C.primary + "15"}`,
        cursor: "pointer",
        transition: "all 0.25s ease",
        boxShadow: open ? `0 6px 24px ${C.primary}0e` : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem",
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: C.primary, flexShrink: 0, marginTop: 3, fontWeight: 500,
          }}>
            {number}
          </span>
          <span style={{
            fontFamily: "'Playfair Display', serif", fontSize: "0.98rem",
            fontWeight: 400, color: C.text, lineHeight: 1.4,
          }}>
            {q}
          </span>
        </div>
        <span style={{
          color: C.primary, fontSize: "0.8rem",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.25s ease",
          flexShrink: 0, marginTop: 2,
        }}>
          ✦
        </span>
      </div>
      {open && (
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem",
          color: C.textSoft, lineHeight: 1.75, fontWeight: 300,
          margin: "14px 0 0 36px",
          borderLeft: `1.5px solid ${C.primary}25`,
          paddingLeft: 14,
        }}>
          {a}
        </p>
      )}
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
  const [loading,   setLoading]   = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap');

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
          50%      { opacity: 1;   transform: scale(1.25); }
        }
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes successPop {
          0%   { opacity: 0; transform: scale(0.88) translateY(16px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes drawCheck {
          from { stroke-dashoffset: 60; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }

        select option { background: ${C.base}; color: ${C.text}; }

        .contact-grid { display: grid; grid-template-columns: 1fr 1.55fr; gap: 64px; align-items: start; }
        .form-row     { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }

        @media (max-width: 960px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .form-row      { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
        @media (max-width: 600px) {
          .hero-stats { flex-direction: column; align-items: center; }
          .hero-cta   { flex-direction: column; align-items: center; }
        }
      `}</style>

      <SideOrb side="right" />
      <SideOrb side="left" />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: C.base,
        position: "relative", overflow: "hidden",
        padding: "0 clamp(24px, 8vw, 120px)",
        textAlign: "center",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(${C.primary}06 1px, transparent 1px),
            linear-gradient(90deg, ${C.primary}06 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }} />
        <div style={{
          position: "absolute", top: "-18%", left: "-12%",
          width: "52vw", height: "52vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${C.secondary} 0%, transparent 68%)`,
          pointerEvents: "none", opacity: 0.9,
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", right: "-8%",
          width: "36vw", height: "36vw", borderRadius: "50%",
          background: `radial-gradient(circle, ${C.primary}12 0%, transparent 68%)`,
          pointerEvents: "none",
        }} />
        {[180, 124, 70].map((s, i) => (
          <div key={i} style={{
            position: "absolute",
            top: `calc(5% + ${i * 28}px)`, right: `calc(5% + ${i * 28}px)`,
            width: s, height: s, borderRadius: "50%",
            border: `1px solid ${i === 2 ? C.primary + "35" : C.primary + "12"}`,
            animation: `spinRing ${15 - i * 3}s linear infinite${i % 2 ? " reverse" : ""}`,
            pointerEvents: "none",
          }} />
        ))}

        <div style={{ position: "relative", zIndex: 2, maxWidth: 780 }}>
          {/* Eyebrow */}
      

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3.2rem, 7.5vw, 7rem)",
            fontWeight: 600, color: C.text,
            lineHeight: 0.92, letterSpacing: "-0.03em",
            marginBottom: 28,
            animation: "fadeUp 0.8s ease 0.1s both",
          }}>
            Start a<br />
            <em style={{ color: C.primary, fontStyle: "italic" }}>Conversation</em>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            color: C.textSoft, lineHeight: 1.85, fontWeight: 300,
            maxWidth: 540, margin: "0 auto 44px",
            animation: "fadeUp 0.8s ease 0.2s both",
          }}>
            Whether you're launching a brand, scaling a business, or just exploring what's possible — we're here to help make it real.
          </p>


          {/* CTAs */}
          <div className="hero-cta" style={{
            display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap",
            animation: "fadeUp 0.8s ease 0.4s both",
          }}>
            <a href="#contact-form" style={{
              padding: "14px 44px",
              background: C.primary, color: "#fff",
              borderRadius: 50, border: "none",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
              fontWeight: 500, letterSpacing: "0.1em",
              textDecoration: "none", cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: `0 10px 32px ${C.primary}30`,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = C.darkAcc; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${C.primary}38`; }}
              onMouseLeave={e => { e.currentTarget.style.background = C.primary; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 10px 32px ${C.primary}30`; }}
            >
              Send a Message
            </a>
            <a href="tel:+91XXXXXXXXXX" style={{
              padding: "14px 44px",
              background: "transparent", color: C.primary,
              border: `1.5px solid ${C.primary}45`, borderRadius: 50,
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
              fontWeight: 500, letterSpacing: "0.1em",
              textDecoration: "none", transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = C.secondary; e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = C.primary + "45"; e.currentTarget.style.transform = "none"; }}
            >
              Call Us Now
            </a>
          </div>
        </div>

      
      </section>

      {/* ══════════════════════════════════════
          CONTACT BODY
      ══════════════════════════════════════ */}
      <div id="contact-form" style={{
        maxWidth: 1260, margin: "0 auto",
        padding: "90px clamp(20px, 5vw, 64px) 110px",
      }}>
        <div style={{ marginBottom: 64, textAlign: "center" }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem",
            letterSpacing: "0.4em", textTransform: "uppercase",
            color: C.primary, marginBottom: 14, fontWeight: 500,
          }}>
            Reach Out
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 400,
            color: C.text, letterSpacing: "-0.02em",
          }}>
            How Can We{" "}
            <em style={{ color: C.primary, fontStyle: "italic" }}>Help You?</em>
          </h2>
          <div style={{
            width: 60, height: 1.5, background: C.primary,
            margin: "22px auto 0", opacity: 0.3,
          }} />
        </div>

        <div className="contact-grid">
          {/* LEFT */}
          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "1rem",
              color: C.textSoft, lineHeight: 1.9, fontWeight: 300,
              marginBottom: 36,
              borderLeft: `2px solid ${C.primary}25`,
              paddingLeft: 18,
            }}>
              We're a collective of designers, developers & strategists who believe in genuine partnerships. Tell us about your project and we'll get back within 48 hours.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 44 }}>
              <InfoCard icon="✉" title="Email Us"  lines={["info@digitalsahaay.com"]}                    link="mailto:info@digitalsahaay.com" />
              <InfoCard icon="☎" title="Call Us"   lines={["+91 XXXXX XXXXX", "Mon–Sat · 9am–7pm IST"]} link="tel:+91XXXXXXXXXX" />
              <InfoCard icon="◎" title="Location"  lines={["India", "Remote-first · Nationwide"]} />
              <InfoCard icon="◈" title="Website"   lines={["www.digitalsahaay.com"]}                     link="https://www.digitalsahaay.com" />
            </div>

            <div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem",
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: C.textSoft, marginBottom: 14, fontWeight: 500,
              }}>
                Follow Us
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["Instagram","LinkedIn","Twitter / X","Facebook"].map(s => (
                  <a key={s} href="#" style={{
                    padding: "7px 17px",
                    border: `1px solid ${C.primary}22`, borderRadius: 30,
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem",
                    color: C.textSoft, textDecoration: "none",
                    transition: "all 0.22s ease", background: C.base,
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.primary; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = C.primary; }}
                    onMouseLeave={e => { e.currentTarget.style.background = C.base; e.currentTarget.style.color = C.textSoft; e.currentTarget.style.borderColor = C.primary + "22"; }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div style={{
            background: C.base,
            border: `1px solid ${C.primary}12`,
            borderRadius: 24,
            padding: "50px clamp(24px, 4vw, 52px) 48px",
            boxShadow: `0 8px 40px ${C.primary}08`,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", bottom: -24, right: -4,
              fontFamily: "'Playfair Display', serif", fontSize: "10rem",
              fontWeight: 600, fontStyle: "italic",
              color: `${C.primary}04`, userSelect: "none",
              lineHeight: 1, pointerEvents: "none",
            }}>
              DS
            </div>
            <div style={{
              position: "absolute", top: 0, left: "12%", right: "12%", height: 2,
              background: `linear-gradient(90deg, transparent, ${C.primary}, transparent)`,
              borderRadius: "0 0 4px 4px",
            }} />

            {submitted ? (
              <div style={{
                textAlign: "center", padding: "48px 0",
                animation: "successPop 0.5s ease both",
              }}>
                <div style={{
                  width: 76, height: 76, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.primary}18, ${C.secondary})`,
                  border: `1.5px solid ${C.primary}35`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 26px",
                  animation: "floatY 3s ease-in-out infinite",
                }}>
                  <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
                    <path d="M8 16 L13 21 L24 11"
                      stroke={C.primary} strokeWidth={2.5}
                      strokeLinecap="round" strokeLinejoin="round"
                      strokeDasharray={60} strokeDashoffset={0}
                      style={{ animation: "drawCheck 0.6s ease 0.3s both" }}
                    />
                  </svg>
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem", fontWeight: 400, fontStyle: "italic",
                  color: C.text, marginBottom: 12,
                }}>
                  Message Received
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
                  color: C.textSoft, lineHeight: 1.8, fontWeight: 300,
                  maxWidth: 360, margin: "0 auto 34px",
                }}>
                  Thank you for reaching out. We'll review your enquiry and get back to you within 48 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name:"",email:"",phone:"",company:"",service:"",budget:"",message:"" }); }}
                  style={{
                    padding: "12px 32px",
                    background: "transparent", color: C.primary,
                    border: `1px solid ${C.primary}40`, borderRadius: 10,
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem",
                    letterSpacing: "0.08em", cursor: "pointer",
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
                <div style={{ marginBottom: 34 }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif", fontSize: "1.55rem",
                    fontWeight: 400, fontStyle: "italic", color: C.text, marginBottom: 6,
                  }}>
                    Tell us about your project
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem",
                    color: C.textSoft, fontWeight: 300,
                  }}>
                    Fields marked <span style={{ color: C.primary }}>*</span> are required
                  </p>
                </div>

                <div className="form-row" style={{ marginBottom: 30 }}>
                  <FloatField label="Full Name"     name="name"  value={form.name}  onChange={handleChange} required />
                  <FloatField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-row" style={{ marginBottom: 30 }}>
                  <FloatField label="Phone Number"    name="phone"   type="tel" value={form.phone}   onChange={handleChange} />
                  <FloatField label="Company / Brand" name="company"            value={form.company} onChange={handleChange} />
                </div>

                {/* Service */}
                <div style={{ position: "relative", marginBottom: 30 }}>
                  <label style={{
                    display: "block",
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem",
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: form.service ? C.primary : C.textSoft,
                    marginBottom: 8, transition: "color 0.2s ease", fontWeight: 500,
                  }}>
                    Service Required <span style={{ color: C.primary }}>*</span>
                  </label>
                  <select name="service" value={form.service} onChange={handleChange} required
                    style={{
                      width: "100%", background: "transparent", border: "none",
                      borderBottom: `1.5px solid ${form.service ? C.primary : C.primary + "25"}`,
                      padding: "8px 0", fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.95rem", color: form.service ? C.text : C.textSoft,
                      outline: "none", cursor: "pointer", appearance: "none",
                    }}
                  >
                    <option value="" disabled>Select a service…</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <span style={{ position: "absolute", right: 0, top: "62%", color: C.primary, fontSize: "0.65rem", pointerEvents: "none" }}>▼</span>
                </div>

                {/* Budget */}
                <div style={{ position: "relative", marginBottom: 30 }}>
                  <label style={{
                    display: "block",
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem",
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: form.budget ? C.primary : C.textSoft,
                    marginBottom: 8, transition: "color 0.2s ease", fontWeight: 500,
                  }}>
                    Approximate Budget
                  </label>
                  <select name="budget" value={form.budget} onChange={handleChange}
                    style={{
                      width: "100%", background: "transparent", border: "none",
                      borderBottom: `1.5px solid ${form.budget ? C.primary : C.primary + "25"}`,
                      padding: "8px 0", fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.95rem", color: form.budget ? C.text : C.textSoft,
                      outline: "none", cursor: "pointer", appearance: "none",
                    }}
                  >
                    <option value="" disabled>Select budget range…</option>
                    {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <span style={{ position: "absolute", right: 0, top: "62%", color: C.primary, fontSize: "0.65rem", pointerEvents: "none" }}>▼</span>
                </div>

                {/* Message */}
                <div style={{ marginBottom: 38 }}>
                  <FloatField label="Your Message" name="message" value={form.message} onChange={handleChange} required textarea />
                </div>

                {/* Submit */}
                <button type="submit" disabled={loading}
                  style={{
                    width: "100%", padding: "16px 0",
                    background: loading ? C.primary + "80" : C.primary,
                    color: "#fff", border: "none", borderRadius: 12,
                    fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
                    fontWeight: 500, letterSpacing: "0.14em",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: `0 8px 28px ${C.primary}28`,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = C.darkAcc; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 14px 38px ${C.primary}38`; }}}
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
                  ) : <>Send Message ◆</>}
                </button>

                <p style={{
                  marginTop: 16, textAlign: "center",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem",
                  color: C.textSoft, fontWeight: 300,
                }}>
                  We respect your privacy. Your details will never be shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>


   

    
    </>
  );
}