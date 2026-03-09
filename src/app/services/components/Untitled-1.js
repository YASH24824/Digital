"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const ACCENT = "#9B7B5E";
const DARK = "#1a1a1a";

const projects = [
  {
    id: 1,
    title: "Industrial Automation Suite",
    category: "Industrial & Engineering",
    client: "TECHNO INDUSTRIES",
    year: "2024",
    description: "Comprehensive digital platform for industrial automation solutions with real-time monitoring and control systems.",
    color: "#4A6FA5",
    stats: { efficiency: "+45%", uptime: "99.9%", savings: "$2.5M" },
    icon: "🏭",
    gradient: "linear-gradient(135deg, #4A6FA5 0%, #2C3E6B 100%)",
    bg: "#EEF2F9",
  },
  {
    id: 2,
    title: "Global Trade Hub",
    category: "Trading, Export & Distribution",
    client: "WORLD TRADE CO.",
    year: "2024",
    description: "End-to-end trading platform connecting exporters with global markets, featuring real-time logistics tracking.",
    color: "#2E8B57",
    stats: { countries: "25+", volume: "50k tons", partners: "100+" },
    icon: "🌍",
    gradient: "linear-gradient(135deg, #2E8B57 0%, #1B5E3A 100%)",
    bg: "#EEF6F1",
  },
  {
    id: 3,
    title: "Luxe Market",
    category: "E-Commerce & Consumer Brands",
    client: "LUXE RETAIL",
    year: "2023",
    description: "Premium e-commerce experience for luxury brands with AR product visualization and seamless checkout.",
    color: "#9B7B5E",
    stats: { products: "10k+", revenue: "+156%", users: "50k+" },
    icon: "🛍️",
    gradient: "linear-gradient(135deg, #9B7B5E 0%, #6B4F3A 100%)",
    bg: "#F6F1EE",
  },
  {
    id: 4,
    title: "Green Energy Solutions",
    category: "Energy & Sustainability",
    client: "ECO POWER",
    year: "2024",
    description: "Interactive platform showcasing renewable energy solutions with carbon footprint calculators.",
    color: "#3A9B5E",
    stats: { energy: "500MW", co2: "-45%", projects: "50+" },
    icon: "⚡",
    gradient: "linear-gradient(135deg, #3A9B5E 0%, #1E6B3A 100%)",
    bg: "#EEF6F1",
  },
  {
    id: 5,
    title: "Hope Education Foundation",
    category: "Social, Education & Community",
    client: "HOPE FOUNDATION",
    year: "2024",
    description: "Community platform connecting educators and students with free educational resources and donation system.",
    color: "#C44536",
    stats: { students: "100k+", courses: "200+", donors: "5k+" },
    icon: "📚",
    gradient: "linear-gradient(135deg, #C44536 0%, #8B2C1E 100%)",
    bg: "#F9EEEE",
  },
];

const teamMembers = [
  { name: "Yash Patel",    initials: "YP", role: "Founder & Creative Director", bio: "Visionary leader with 10+ years in digital transformation. Built Digital Sahaay from the ground up.", quote: "Great design is not just how it looks, but how it works.", color: "#4A6FA5" },
  { name: "Priya Sharma",  initials: "PS", role: "Lead Designer",               bio: "Award-winning designer who believes in creating experiences that resonate deeply with users.", quote: "Design is intelligence made visible.", color: "#2E8B57" },
  { name: "Rahul Mehta",   initials: "RM", role: "Technical Architect",          bio: "Full-stack expert with a passion for scalable architecture handling millions of users.", quote: "Code is poetry, but architecture is literature.", color: "#9B7B5E" },
  { name: "Anjali Desai",  initials: "AD", role: "Strategy Lead",               bio: "Data-driven strategist who turns insights into impact. Helped clients achieve 200%+ growth.", quote: "Strategy without execution is just a dream.", color: "#C44536" },
];

// Particle positions pre-computed (avoid Math.random in render)
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  left: `${10 + i * 11}%`,
  delay: `${i * 0.4}s`,
  duration: `${2.5 + i * 0.5}s`,
}));

// ─── useInView hook ─────────────────────────────────────────────────────────
function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── ProjectSection — proper component (no hooks in map) ────────────────────
function ProjectSection({ project, index }) {
  const [ref, visible] = useInView(0.2);
  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: project.bg,
        position: "relative",
        overflow: "hidden",
        padding: "80px 0",
      }}
    >
      {/* Soft color blob */}
      <div style={{
        position: "absolute",
        width: 500, height: 500,
        borderRadius: "50%",
        background: project.color,
        filter: "blur(120px)",
        opacity: 0.07,
        top: "50%", left: isEven ? "60%" : "30%",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1300,
        margin: "0 auto",
        padding: "0 48px",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 80,
        alignItems: "center",
      }}>
        {/* ── Text ── */}
        <div style={{ order: isEven ? 1 : 2 }}>
          {/* Badge */}
          <div
            className={`proj-badge fade-up ${visible ? "in" : ""}`}
            style={{
              display: "inline-block",
              padding: "10px 22px",
              background: project.gradient,
              borderRadius: 40,
              color: "#fff",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              fontWeight: 600,
              marginBottom: 28,
              boxShadow: `0 8px 24px ${project.color}55`,
              transitionDelay: "0s",
            }}
          >
            {project.icon} {project.category}
          </div>

          {/* Title */}
          <h2
            className={`fade-up ${visible ? "in" : ""}`}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: DARK,
              marginBottom: 24,
              transitionDelay: "0.1s",
            }}
          >
            {project.title}
            <span style={{
              display: "block",
              width: visible ? 80 : 0,
              height: 4,
              background: project.color,
              borderRadius: 2,
              marginTop: 12,
              transition: "width 0.8s cubic-bezier(0.4,0,0.2,1) 0.5s",
            }} />
          </h2>

          {/* Meta */}
          <div
            className={`fade-up ${visible ? "in" : ""}`}
            style={{ display: "flex", gap: 40, marginBottom: 24, transitionDelay: "0.15s" }}
          >
            {[["CLIENT", project.client], ["YEAR", project.year]].map(([label, val]) => (
              <div key={label}>
                <div style={{ fontSize: "0.65rem", color: "#aaa", letterSpacing: "0.12em", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: project.color }}>{val}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <p
            className={`fade-up ${visible ? "in" : ""}`}
            style={{ fontSize: "1rem", lineHeight: 1.8, color: "#666", marginBottom: 32, transitionDelay: "0.2s" }}
          >
            {project.description}
          </p>

          {/* Stats */}
          <div
            className={`fade-up ${visible ? "in" : ""}`}
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 36, transitionDelay: "0.25s" }}
          >
            {Object.entries(project.stats).map(([key, value]) => (
              <div
                key={key}
                className="stat-card"
                style={{
                  padding: "18px 12px",
                  background: "#fff",
                  borderRadius: 16,
                  textAlign: "center",
                  boxShadow: `0 8px 24px -8px ${project.color}40`,
                  border: `1px solid ${project.color}18`,
                }}
              >
                <div style={{ fontSize: "1.7rem", fontWeight: 800, color: project.color, lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: "0.6rem", color: "#aaa", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{key}</div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div
            className={`fade-up ${visible ? "in" : ""}`}
            style={{ display: "flex", gap: 14, transitionDelay: "0.3s" }}
          >
            <button className="btn-primary" style={{ background: project.gradient, boxShadow: `0 16px 32px -8px ${project.color}70` }}>
              VIEW CASE STUDY
            </button>
            <button className="btn-outline" style={{ borderColor: project.color, color: project.color }}>
              VISIT SITE ↗
            </button>
          </div>
        </div>

        {/* ── Image Card ── */}
        <div
          className={`fade-up ${visible ? "in" : ""}`}
          style={{ order: isEven ? 2 : 1, transitionDelay: "0.15s" }}
        >
          <div
            className="image-card"
            style={{
              width: "100%",
              height: 520,
              borderRadius: 28,
              background: project.gradient,
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 40px 80px -20px ${project.color}60`,
            }}
          >
            {/* Shine overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
              zIndex: 2,
            }} />

            {/* Icon center */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "8rem",
              opacity: 0.35,
              zIndex: 1,
              userSelect: "none",
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
                  width: 5, height: 5,
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: "50%",
                  animationDuration: p.duration,
                  animationDelay: p.delay,
                }}
              />
            ))}

            {/* Top badge */}
            <div style={{
              position: "absolute", top: 24, right: 24,
              padding: "10px 20px",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              borderRadius: 40,
              color: "#fff",
              fontSize: "0.8rem",
              fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.25)",
              zIndex: 3,
            }}>
              {project.year}
            </div>

            {/* Bottom info strip */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "28px 28px",
              background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
              zIndex: 3,
            }}>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7rem", letterSpacing: "0.15em" }}>CLIENT</div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.05em" }}>{project.client}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [mouse, setMouse] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [teamRef, teamVisible] = useInView(0.1);
  const [ctaRef, ctaVisible] = useInView(0.2);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const onMouseMove = useCallback((e) => {
    setMouse({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background:#fff; overflow-x:hidden; cursor:none; }
        a,button { cursor:none; }

        /* ── Custom cursor ── */
        .cursor {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: width 0.2s ease, height 0.2s ease, background 0.2s ease, transform 0.08s ease;
          will-change: transform;
        }

        /* ── Fade-up utility ── */
        .fade-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.in {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Buttons ── */
        .btn-primary {
          padding: 14px 32px;
          color: #fff;
          border: none;
          border-radius: 50px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          cursor: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-primary:hover { transform: translateY(-3px) scale(1.04); }

        .btn-outline {
          padding: 14px 32px;
          background: transparent;
          border: 2px solid;
          border-radius: 50px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          cursor: none;
          transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease;
        }
        .btn-outline:hover { transform: translateY(-3px); }

        /* ── Stat card hover ── */
        .stat-card { transition: transform 0.2s ease; }
        .stat-card:hover { transform: translateY(-4px) scale(1.04); }

        /* ── Image card hover ── */
        .image-card { transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease; }
        .image-card:hover { transform: translateY(-8px) scale(1.015); }

        /* ── Floating particles animation ── */
        @keyframes floatUp {
          0%   { transform: translateY(0);    opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateY(-80px); opacity: 0; }
        }
        .particle { animation: floatUp linear infinite; }

        /* ── Hero badge float ── */
        @keyframes badgeFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }

        /* ── Scroll bounce ── */
        @keyframes scrollBounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(10px); }
        }

        /* ── Orb drift ── */
        @keyframes orbDrift {
          0%   { transform: translate(0, 0); }
          33%  { transform: translate(60px, -80px); }
          66%  { transform: translate(-40px, 40px); }
          100% { transform: translate(0, 0); }
        }

        /* ── Rotating rings ── */
        @keyframes spinCW  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes spinCCW { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }

        /* ── Team card ── */
        .team-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 28px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .team-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 40px 60px -20px rgba(0,0,0,0.5);
        }

        /* ── Shine sweep on CTA button ── */
        @keyframes shine {
          0%   { transform: translateX(-140%) skewX(-20deg); }
          100% { transform: translateX(240%)  skewX(-20deg); }
        }
        .btn-cta .shine { animation: shine 2.2s linear infinite; }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .proj-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .team-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-badges { gap: 10px !important; }
          .hero-badge  { padding: 6px 14px !important; font-size: 0.65rem !important; }
        }
        @media (max-width: 480px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Custom cursor */}
      <div
        className="cursor"
        style={{
          width: hovered ? 38 : 12,
          height: hovered ? 38 : 12,
          background: hovered ? ACCENT : "#fff",
          left: mouse.x - (hovered ? 19 : 6),
          top:  mouse.y - (hovered ? 19 : 6),
          boxShadow: hovered ? `0 0 24px ${ACCENT}` : "0 0 8px rgba(255,255,255,0.4)",
        }}
      />

      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background: "#0A0A0A",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Grid background */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }} />

        {/* Drifting orbs */}
        {[
          { top: "10%", right: "10%", size: 360, color: `${ACCENT}40`, duration: "22s" },
          { bottom: "10%", left: "10%", size: 440, color: "rgba(255,255,255,0.12)", duration: "28s" },
        ].map((o, i) => (
          <div key={i} style={{
            position: "absolute",
            width: o.size, height: o.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            filter: "blur(70px)",
            top: o.top, right: o.right, bottom: o.bottom, left: o.left,
            animation: `orbDrift ${o.duration} ease-in-out infinite`,
            pointerEvents: "none",
          }} />
        ))}

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 1100, padding: "0 24px" }}>

          {/* Badges */}
          <div className="hero-badges" style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 40 }}>
            {["DESIGN", "DEVELOP", "STRATEGY"].map((text, i) => (
              <span
                key={i}
                className="hero-badge fade-up"
                style={{
                  padding: "8px 20px",
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 40,
                  color: "#fff",
                  fontSize: "0.75rem",
                  letterSpacing: "0.22em",
                  animation: heroVisible ? `badgeFloat ${2.2 + i * 0.4}s ease-in-out ${i * 0.15}s infinite` : "none",
                  opacity: heroVisible ? 1 : 0,
                  transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
                  transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                }}
              >
                {text}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 700,
              lineHeight: 1,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              marginBottom: 28,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "scale(1)" : "scale(0.85)",
              transition: "opacity 0.9s ease 0.2s, transform 0.9s cubic-bezier(0.34,1.2,0.64,1) 0.2s",
            }}
          >
            DIGITAL{" "}
            <span style={{
              color: ACCENT,
              textShadow: `0 0 40px ${ACCENT}80`,
              fontStyle: "italic",
            }}>
              SAHAAY
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "rgba(255,255,255,0.75)",
            maxWidth: 680,
            margin: "0 auto 48px",
            lineHeight: 1.8,
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.45s",
          }}>
            A collective of designers, developers & strategists building digital solutions that don't just look beautiful —{" "}
            <span style={{ color: ACCENT, fontWeight: 600 }}>they drive real growth.</span>
          </p>

          {/* Orbit ring */}
          <div style={{
            position: "relative",
            width: 180,
            height: 180,
            margin: "0 auto",
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 1s ease 0.6s",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              border: `1px dashed ${ACCENT}40`,
              borderRadius: "50%",
              animation: "spinCW 16s linear infinite",
            }} />
            {["🏭", "🌍", "🛍️", "⚡", "📚", "🤝"].map((icon, i) => {
              const angle = (i / 6) * 360;
              const rad = (angle * Math.PI) / 180;
              const r = 90;
              return (
                <div key={i} style={{
                  position: "absolute",
                  top: "50%", left: "50%",
                  width: 36, height: 36,
                  marginTop: -18, marginLeft: -18,
                  transform: `translate(${Math.cos(rad) * r}px, ${Math.sin(rad) * r}px)`,
                  background: ACCENT,
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1rem",
                  boxShadow: `0 0 18px ${ACCENT}80`,
                }}>
                  {icon}
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          color: "rgba(255,255,255,0.5)",
          fontSize: "1.6rem",
          animation: "scrollBounce 2s ease-in-out infinite",
          opacity: heroVisible ? 1 : 0,
          transition: "opacity 1s ease 1s",
        }}>↓</div>
      </section>

      {/* ═══════════════════ PROJECT SECTIONS ══════════════════════════════ */}
      {projects.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))}

      {/* ════════════════════════ TEAM SECTION ══════════════════════════════ */}
      <section
        ref={teamRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: "#0A0A0A",
          color: "#fff",
          padding: "100px 48px",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Background glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse 50% 40% at 15% 30%, ${ACCENT}18 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 85% 70%, ${ACCENT}12 0%, transparent 60%)
          `,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1300, margin: "0 auto", width: "100%", position: "relative", zIndex: 5 }}>

          {/* Header */}
          <div
            className={`fade-up ${teamVisible ? "in" : ""}`}
            style={{ textAlign: "center", marginBottom: 64 }}
          >
            <p style={{
              fontSize: "0.72rem",
              letterSpacing: "0.45em",
              color: ACCENT,
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 14,
            }}>
              ✦ THE DREAM TEAM ✦
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.15,
            }}>
              The Architects Behind{" "}
              <em style={{ color: ACCENT, fontStyle: "italic" }}>The Magic</em>
            </h2>
          </div>

          {/* Grid */}
          <div
            className="team-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 28,
            }}
          >
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className={`team-card fade-up ${teamVisible ? "in" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Avatar area */}
                <div style={{
                  height: 220,
                  background: `linear-gradient(135deg, ${member.color}55, ${member.color})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: 100, height: 100,
                    borderRadius: "50%",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: member.color,
                    boxShadow: `0 12px 32px ${member.color}80`,
                    fontFamily: "'Playfair Display', serif",
                    zIndex: 2,
                  }}>
                    {member.initials}
                  </div>
                  {PARTICLES.slice(0, 5).map((p, pi) => (
                    <div key={pi} className="particle" style={{
                      position: "absolute", bottom: 10, left: p.left,
                      width: 4, height: 4,
                      background: "rgba(255,255,255,0.6)",
                      borderRadius: "50%",
                      animationDuration: p.duration,
                      animationDelay: p.delay,
                    }} />
                  ))}
                </div>

                {/* Info */}
                <div style={{ padding: "24px 24px 28px" }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: 4,
                  }}>
                    {member.name}
                  </h3>
                  <p style={{
                    fontSize: "0.75rem",
                    color: member.color,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}>
                    {member.role}
                  </p>
                  <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: 18 }}>
                    {member.bio}
                  </p>
                  <p style={{
                    fontSize: "0.85rem",
                    fontStyle: "italic",
                    color: member.color,
                    paddingTop: 14,
                    borderTop: `1px solid ${member.color}30`,
                    lineHeight: 1.5,
                  }}>
                    "{member.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ CTA SECTION ═══════════════════════════════ */}
      <section
        ref={ctaRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Spinning rings */}
        {[780, 580, 380].map((size, i) => (
          <div key={i} style={{
            position: "absolute",
            width: size, height: size,
            borderRadius: "50%",
            border: `${i === 2 ? 2 : 1}px ${i % 2 === 0 ? "dashed" : "solid"} ${ACCENT}${i === 0 ? "15" : i === 1 ? "20" : "35"}`,
            animation: `${i % 2 === 0 ? "spinCW" : "spinCCW"} ${50 - i * 10}s linear infinite`,
            pointerEvents: "none",
          }} />
        ))}

        {/* Glow blob */}
        <div style={{
          position: "absolute",
          width: 400, height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ACCENT}14 0%, transparent 70%)`,
          filter: "blur(50px)",
          animation: "orbDrift 12s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        {/* Content */}
        <div
          className={`fade-up ${ctaVisible ? "in" : ""}`}
          style={{ textAlign: "center", zIndex: 10, maxWidth: 760, padding: "0 24px" }}
        >
          <p style={{
            fontSize: "0.72rem",
            letterSpacing: "0.5em",
            color: ACCENT,
            fontWeight: 700,
            textTransform: "uppercase",
            marginBottom: 20,
          }}>
            ✦ READY FOR SOMETHING AMAZING? ✦
          </p>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            color: DARK,
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 24,
          }}>
            Let's Create Your{" "}
            <span style={{ fontStyle: "italic", color: ACCENT, position: "relative" }}>
              Masterpiece
              <span style={{
                position: "absolute",
                bottom: 6,
                left: 0,
                width: ctaVisible ? "100%" : "0%",
                height: 3,
                background: ACCENT,
                borderRadius: 2,
                transition: "width 1s cubic-bezier(0.4,0,0.2,1) 0.5s",
                display: "block",
              }} />
            </span>
          </h2>

          <p style={{
            fontSize: "1.1rem",
            color: "#777",
            lineHeight: 1.8,
            marginBottom: 48,
          }}>
            Every great project starts with a conversation.
            Let's turn your vision into reality.
          </p>

          <button
            className="btn-cta"
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "18px 56px",
              background: ACCENT,
              color: "#fff",
              border: "none",
              borderRadius: 60,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              cursor: "none",
              boxShadow: `0 24px 48px -10px ${ACCENT}80`,
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px) scale(1.05)"; e.currentTarget.style.boxShadow = `0 36px 60px -10px ${ACCENT}90`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 24px 48px -10px ${ACCENT}80`; }}
          >
            <span className="shine" style={{
              position: "absolute", top: 0, left: 0,
              width: "40%", height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
              pointerEvents: "none",
            }} />
            START YOUR PROJECT
          </button>
        </div>
      </section>
    </>
  );
}