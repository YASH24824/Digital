"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/*
  Add to layout.tsx <head>:
  <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600&family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500&display=swap" rel="stylesheet" />
*/

const HomeIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const WhoWeAreIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 110-8 4 4 0 010 8zm6 0a3 3 0 100-6 3 3 0 000 6zM3 14a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);

const ServicesIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const ContactIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const navItems = [
  { name: "Home",       href: "/",          icon: HomeIcon      },
  { name: "Who We Are", href: "/about",     icon: WhoWeAreIcon  },
  { name: "Services",   href: "/services",  icon: ServicesIcon  },
  { name: "Contact Us", href: "/contact",   icon: ContactIcon   },
];

export default function Navbar() {
  const [isOpen,      setIsOpen]      = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [scrolled,    setScrolled]    = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const MOBILE_NAV_H = 80; // ← increased mobile navbar height

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600&family=Cormorant+Garamond:wght@500;600&family=Jost:wght@300;400;500&display=swap');

        @keyframes tickAppear {
          0%   { opacity: 0; transform: scale(0.5) translateY(5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Right-side drawer slide */
        @keyframes drawerIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes drawerOut {
          from { transform: translateX(0);    opacity: 1; }
          to   { transform: translateX(100%); opacity: 0; }
        }
        @keyframes itemIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .drawer-open  { animation: drawerIn  0.38s cubic-bezier(0.32,0.72,0,1) forwards; }
        .drawer-close { animation: drawerOut 0.3s  cubic-bezier(0.32,0.72,0,1) forwards; }
      `}</style>

      {/* ── Navbar bar ── */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          fontFamily: "'Jost', sans-serif",
          height: isMobile
            ? `${MOBILE_NAV_H}px`
            : "clamp(64px, 8vw, 100px)",
          /* When drawer open → navbar bg goes transparent on mobile */
          background: isOpen && isMobile
            ? "transparent"
            : scrolled
              ? "rgba(255,255,255,0.98)"
              : "rgba(255,255,255,0.96)",
          backdropFilter: "none",
          boxShadow: scrolled && !(isOpen && isMobile)
            ? "0 2px 20px rgba(0,0,0,0.07)"
            : "none",
          transition: "background 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* ── Blur backdrop — isolated so it NEVER bleeds onto logo ── */}
        {!(isOpen && isMobile) && (
          <div style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backdropFilter: scrolled ? "blur(16px)" : "blur(6px)",
            WebkitBackdropFilter: scrolled ? "blur(16px)" : "blur(6px)",
            pointerEvents: "none",
          }} />
        )}

        {/* Nav content — above blur layer */}
        <div style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          height: "100%",
          padding: "0 clamp(16px, 4vw, 48px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>

          {/* Logo */}
          <Link href="/" style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
            <Image
              src="/DigitalSaahaylog3.png"
              alt="Digital Saahay"
              width={isMobile ? (scrolled ? 100 : 120) : (scrolled ? 140 : 170)}
              height={isMobile ? (scrolled ? 28 : 32) : (scrolled ? 38 : 45)}
              className="object-contain transition-all duration-500"
              style={{ isolation: "isolate" }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isHov = hoveredItem === item.name;
              return (
                <div
                  key={item.name}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Floating icon */}
                  <div style={{
                    position: "absolute", top: -28,
                    left: "50%", transform: "translateX(-50%)",
                    opacity: isHov ? 1 : 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                    color: "#dc2626",
                  }}>
                    <Icon />
                  </div>

                  <Link
                    href={item.href}
                    style={{
                      display: "block",
                      padding: "6px 8px",
                      fontFamily: "'Crimson Pro', serif",
                      fontSize: "clamp(16px, 2.2vw, 19px)",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      color: isHov ? "#dc2626" : "#1f2937",
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      whiteSpace: "nowrap",
                      position: "relative",
                    }}
                  >
                    <span style={{ position: "relative", display: "inline-block" }}>
                      {item.name}
                      {/* top rule */}
                      <span style={{
                        position: "absolute", top: -4, left: 0,
                        width: "100%", height: 2,
                        background: "#ef4444",
                        transformOrigin: "left",
                        transform: `scaleX(${isHov ? 1 : 0})`,
                        transition: "transform 0.3s ease",
                      }} />
                      {/* tick */}
                      {isHov && (
                        <span style={{
                          position: "absolute",
                          bottom: -14, left: "20%",
                          transform: "translateX(-50%)",
                          animation: "tickAppear 0.4s ease forwards",
                        }}>
                          <Image src="/tick.png" alt="✓" width={70} height={35} className="object-contain" />
                        </span>
                      )}
                    </span>
                  </Link>
                </div>
              );
            })}

            {/* CTA pill */}
            <Link
              href="/contact"
              style={{
                marginLeft: 8,
                height: 44,
                minWidth: 200,
                background: "#5C2122",
                color: "#ffffff",
                borderRadius: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                fontFamily: "'Crimson Pro', serif",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "0.08em",
                transition: "background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#7A2E2F";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(92,33,34,0.25)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#5C2122";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Free Consultation
            </Link>
          </div>

          {/* Hamburger */}
          <button
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(p => !p)}
            className="md:hidden"
            style={{
              padding: 10, borderRadius: 8,
              background: "transparent",
              border: "none", cursor: "pointer",
              color: isOpen ? "#ffffff" : "#374151",
              transition: "color 0.3s ease",
            }}
          >
            <div style={{ position: "relative", width: 24, height: 24 }}>
              {/* Hamburger lines */}
              <svg style={{
                position: "absolute", inset: 0,
                opacity: isOpen ? 0 : 1,
                transform: isOpen ? "rotate(90deg)" : "rotate(0)",
                transition: "all 0.3s ease",
              }} fill="none" stroke="currentColor" viewBox="0 0 24 24" width={24} height={24}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* X */}
              <svg style={{
                position: "absolute", inset: 0,
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "rotate(0)" : "rotate(-90deg)",
                transition: "all 0.3s ease",
              }} fill="none" stroke="currentColor" viewBox="0 0 24 24" width={24} height={24}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </button>
        </div>
      </nav>

      {/* ── Backdrop (dim left side when drawer open) ── */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 55,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(2px)",
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* ── Right-side drawer ── */}
      <div
        className={isOpen ? "drawer-open" : "drawer-close"}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "clamp(280px, 75vw, 340px)",
          zIndex: 60,
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.4)",
          // always rendered so animation works; hide when closed
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {/* Drawer header */}
        <div style={{
          height: MOBILE_NAV_H,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: "'Crimson Pro', serif",
            fontSize: "0.7rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}>
            Menu
          </span>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "none", border: "none",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer", padding: 6,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
          >
            <svg width={20} height={20} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 24px 24px" }}>
          {navItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "16px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  textDecoration: "none",
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "'Crimson Pro', serif",
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  transition: "color 0.25s ease, padding-left 0.25s ease",
                  animation: isOpen ? `itemIn 0.4s ease ${0.1 + i * 0.07}s both` : "none",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.paddingLeft = "6px";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                  e.currentTarget.style.paddingLeft = "0";
                }}
              >
                <span style={{ color: "#dc2626", flexShrink: 0 }}>
                  <Icon />
                </span>
                {item.name}
                <svg
                  style={{ marginLeft: "auto", opacity: 0.25 }}
                  width={16} height={16} fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </div>

        {/* Drawer CTA */}
        <div style={{ padding: "24px", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
          <Link
            href="/#contact"
            onClick={() => setIsOpen(false)}
            style={{
              display: "block",
              width: "100%",
              padding: "14px 0",
              background: "#5C2122",
              color: "#ffffff",
              borderRadius: 12,
              textAlign: "center",
              textDecoration: "none",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.1em",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#7A2E2F"}
            onMouseLeave={e => e.currentTarget.style.background = "#5C2122"}
          >
            Free Consultation
          </Link>

          <p style={{
            marginTop: 20,
            textAlign: "center",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.15)",
          }}>
            Digital Solutions & Marketing
          </p>
        </div>
      </div>

      {/* Spacer */}
      <div style={{
        height: isMobile
          ? `${MOBILE_NAV_H}px`
          : "clamp(64px, 8vw, 100px)",
        width: "100%",
        transition: "height 0.3s ease",
      }} />
    </>
  );
}