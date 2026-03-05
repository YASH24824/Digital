"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes spin        { to { transform: rotate(360deg); } }
  @keyframes spinReverse { to { transform: rotate(-360deg); } }
  @keyframes pulseGlow {
    0%,100%{ opacity:0.2; transform: scale(1); }
    50%{ opacity:0.6; transform: scale(1.2); }
  }

  .footer-link {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 300;
    letter-spacing: 0.04em;
    color: rgba(255,255,255,0.4);
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
    position: relative;
    padding: 2px 0;
  }
  .footer-link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    height: 1px; width: 0;
    background: #9B7B5E;
    transition: width 0.4s cubic-bezier(0.2, 0.9, 0.3, 1);
  }
  .footer-link:hover { 
    color: rgba(255,255,255,0.9);
    transform: translateX(4px);
  }
  .footer-link:hover::after { width: 100%; }

  .social-btn {
    width: 38px; height: 38px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.12);
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.4);
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 0.75rem;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
  }
  .social-btn:hover {
    border-color: #9B7B5E;
    color: #ffffff;
    background: rgba(155,123,94,0.15);
    transform: translateY(-3px);
  }

  .contact-item {
    transition: transform 0.3s ease;
  }
  .contact-item:hover {
    transform: translateX(4px);
  }
`;

const LINKS = [
  { label: "Services",  href: "#services" },
  { label: "Work",      href: "#portfolio" },
  { label: "Process",   href: "#process" },
  { label: "Contact",   href: "#contact" },
];

const SERVICES_LIST = [
  { label: "Web Design & Dev", href: "#services" },
  { label: "Brand Identity",   href: "#services" },
  { label: "SEO & Content",    href: "#services" },
  { label: "Digital Marketing",href: "#services" },
];

const SOCIALS = [
  { label: "in",  href: "https://linkedin.com",  icon: "in" },
  { label: "tw",  href: "https://twitter.com",   icon: "𝕏" },
  { label: "ig",  href: "https://instagram.com", icon: "ig" },
];

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <>
      <style>{globalStyles}</style>

      <footer style={{
        position: "relative",
        backgroundColor: "#0C0C0C",
        overflow: "hidden",
        padding: "100px 24px 0",
        marginTop: "auto",
      }}>

        {/* Decorative background elements */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {/* Animated rings */}
          <div style={{ 
            position: "absolute", 
            right: -150, 
            top: -100, 
            width: 500, 
            height: 500, 
            borderRadius: "50%", 
            border: "1px solid rgba(155,123,94,0.08)", 
            animation: "spin 120s linear infinite" 
          }} />
          <div style={{ 
            position: "absolute", 
            left: -120, 
            bottom: -80, 
            width: 400, 
            height: 400, 
            borderRadius: "50%", 
            border: "1px solid rgba(155,123,94,0.08)", 
            animation: "spinReverse 150s linear infinite" 
          }} />
          
          {/* Glowing orbs */}
          <div style={{ 
            position: "absolute", 
            top: "20%", 
            right: "15%", 
            width: 150, 
            height: 150, 
            borderRadius: "50%", 
            background: "rgba(155,123,94,0.03)", 
            filter: "blur(60px)",
            animation: "pulseGlow 8s ease-in-out infinite" 
          }} />
          <div style={{ 
            position: "absolute", 
            bottom: "30%", 
            left: "10%", 
            width: 200, 
            height: 200, 
            borderRadius: "50%", 
            background: "rgba(155,123,94,0.03)", 
            filter: "blur(80px)",
            animation: "pulseGlow 12s ease-in-out infinite reverse" 
          }} />
        </div>

        {/* Top gradient line */}
        <div style={{
          position: "absolute", 
          top: 0, 
          left: 0, 
          right: 0,
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(155,123,94,0.2), transparent)",
        }} />

        <div style={{
          position: "relative", 
          zIndex: 10,
          maxWidth: 1200, 
          margin: "0 auto",
        }}>

          {/* Main grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
            gap: "0 60px",
            paddingBottom: 80,
          }}
          className="footer-grid"
          >

            {/* Brand column */}
            <div style={{ animation: "fadeUp 0.8s ease 0.1s forwards", opacity: 0 }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.6rem", 
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "rgba(155,123,94,0.5)",
                marginBottom: 16,
                fontWeight: 400,
              }}>
                Digital Agency
              </p>

              {/* Company Name - Properly formatted */}
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 400, 
                letterSpacing: "-0.02em",
                color: "#ffffff", 
                marginBottom: 12, 
                lineHeight: 1.1,
              }}>
                Digital{" "}
                <span style={{ 
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic", 
                  color: "#9B7B5E",
                  fontWeight: 500,
                }}>
                  Sahaay
                </span>
                <span style={{ 
                  color: "#9B7B5E",
                  fontSize: "2.8rem",
                  fontWeight: 400,
                  marginLeft: 2,
                }}>.</span>
              </h2>

              {/* Tagline */}
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem", 
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(155,123,94,0.6)",
                marginBottom: 24,
                fontWeight: 300,
              }}>
                Digital Solutions & Marketing
              </p>

              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem", 
                fontWeight: 300,
                lineHeight: 1.8, 
                color: "rgba(255,255,255,0.4)",
                maxWidth: 300, 
                marginBottom: 32,
              }}>
                We build modern, scalable websites and marketing systems that help businesses grow online — sustainably and with purpose.
              </p>

              {/* Social icons */}
              <div style={{ display: "flex", gap: 12 }}>
                {SOCIALS.map(s => (
                  <a 
                    key={s.label} 
                    href={s.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label={`Follow us on ${s.label}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div style={{ animation: "fadeUp 0.8s ease 0.2s forwards", opacity: 0 }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.6rem", 
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#9B7B5E",
                marginBottom: 24,
                fontWeight: 500,
              }}>
                Navigate
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {LINKS.map(link => (
                  <Link key={link.label} href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div style={{ animation: "fadeUp 0.8s ease 0.3s forwards", opacity: 0 }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.6rem", 
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#9B7B5E",
                marginBottom: 24,
                fontWeight: 500,
              }}>
                Services
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {SERVICES_LIST.map(s => (
                  <Link key={s.label} href={s.href} className="footer-link">
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div style={{ animation: "fadeUp 0.8s ease 0.4s forwards", opacity: 0 }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.6rem", 
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#9B7B5E",
                marginBottom: 24,
                fontWeight: 500,
              }}>
                Contact
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { label: "Email",  value: "hello@digitalsahaay.com", href: "mailto:hello@digitalsahaay.com" },
                  { label: "Phone",  value: "+91 98765 43210", href: "tel:+919876543210" },
                  { label: "Studio", value: "Ahmedabad, India" },
                ].map(item => (
                  <div key={item.label} className="contact-item">
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.55rem", 
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.25)",
                      marginBottom: 4,
                    }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a 
                        href={item.href} 
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.85rem", 
                          fontWeight: 300,
                          color: "rgba(255,255,255,0.6)",
                          textDecoration: "none",
                          transition: "color 0.3s ease",
                        }}
                        className="footer-link"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.85rem", 
                        fontWeight: 300,
                        color: "rgba(255,255,255,0.6)",
                      }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: "1px solid rgba(155,123,94,0.15)",
            padding: "24px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.65rem", 
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
            }}>
              © 2026 Digital Sahaay. All rights reserved.
            </p>

            <div style={{ display: "flex", gap: 28 }}>
              {["Privacy", "Terms", "Cookies"].map(item => (
                <Link 
                  key={item} 
                  href="#" 
                  className="footer-link" 
                  style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive styles */}
        <style>{`
          @media (max-width: 900px) {
            .footer-grid {
              grid-template-columns: 1fr 1fr !important;
              gap: 48px 40px !important;
            }
          }
          @media (max-width: 600px) {
            .footer-grid {
              grid-template-columns: 1fr !important;
              gap: 44px !important;
            }
            footer {
              padding: 80px 20px 0 !important;
            }
          }
        `}</style>
      </footer>
    </>
  );
}