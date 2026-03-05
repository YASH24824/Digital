"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #ffffff; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scrollLine {
  0% { opacity: 0; transform: scaleY(0); }
  50% { opacity: 1; transform: scaleY(1); }
  100% { opacity: 0; transform: scaleY(0); }
}

@keyframes badgeFloat {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
`;

/* ─────────────────────────────────────────
   CLASSIC COLOUR PALETTE
───────────────────────────────────────── */
const C = {
  base:      "#FDFAF5",  // Warm antique white
  primary:   "#8B3A3A",  // Rich burgundy
  darkAcc:   "#5C2122",  // Deep mahogany
  secondary: "#EADBC6",  // Creamy parchment
  highlight: "#C19A6B",  // Antique gold
  text:      "#2C1810",  // Deep brown
  textMid:   "#5C4033",  // Warm brown
  textSoft:  "#8B6B5E",  // Muted taupe
};

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const categories = [
  {
    id: "seo", label: "SEO", icon: "◈",
    tagline: "Ascend the ranks. Be discovered.",
    tiers: [
      { name: "Silver",
        features: ["15 Strategic Keywords","On-Page Foundation","Monthly Performance Analysis","Google My Business","2 Bespoke Blog Posts","Quarterly Review"] },
      { name: "Gold", popular: true,
        features: ["35 High-Value Keywords","Advanced On & Off-Page","4 Feature Articles","Authority Link Building","Local Market Dominance","Technical Site Audit","Competitor Intelligence","Bi-Monthly Strategy"] },
      { name: "Platinum",
        features: ["50 Premium Keywords","Holistic SEO Architecture","8 Long-Form Articles","Premium Link Acquisition","Schema & Rich Results","International Expansion","Weekly Performance Brief","Dedicated Strategist"] },
    ],
  },
  {
    id: "web", label: "Web Development", icon: "◉",
    tagline: "Digital craftsmanship, meticulously built.",
    tiers: [
      { name: "Silver",
        features: ["Curated Template Design","Responsive Across Devices","Foundational SEO","Contact & Inquiry Forms","Location Integration","30 Days Concierge Care","3 Refinement Rounds"] },
      { name: "Gold", popular: true,
        features: ["Bespoke Design System","Artful UI/UX","Seamless CMS","Integrated Blog","Advanced Automations","Performance Optimisation","SSL Security Protocol","90 Days White-Glove Care","5 Refinement Rounds"] },
      { name: "Platinum",
        features: ["Enterprise-Grade Architecture","Custom Feature Development","Secure Payment Gateway","Tailored API Integration","Multi-Lingual Experience","Advanced Security Suite","Speed & Core Web Vitals","6 Months Concierge Care","Unlimited Refinements","Executive Project Lead"] },
    ],
  },
  {
    id: "smm", label: "Social Media", icon: "◎",
    tagline: "Cultivate community. Inspire loyalty.",
    tiers: [
      { name: "Bronze",
        features: ["Two Platform Presence","12 Curated Posts + 2 Reels","Authentic Content Creation","Community Engagement","Monthly Growth Report","Profile Refinement"] },
      { name: "Silver",
        features: ["Two Platform Strategy","36 Posts + 6 Reels","Consistent Content Cadence","Active Community Management","Bi-Monthly Analytics","Profile Optimisation"] },
      { name: "Gold", popular: true,
        features: ["2–3 Platform Ecosystem","72 Posts + 12 Reels","Art Direction & Design","Reel & Story Innovation","Strategic Community Building","Competitor Landscape","Fortnightly Intelligence"] },
      { name: "Platinum",
        features: ["3–4 Platform Mastery","145 Posts + 24 Reels","Premium Visual Identity","Paid Social Strategy","A/B Creative Testing","Weekly Performance Review","Dedicated Social Curator"] },
    ],
  },
  {
    id: "ads", label: "Advertising", icon: "◆",
    tagline: "Every impression, meticulously placed.",
    tiers: [
      { name: "Silver",
        features: ["1–2 Platform Presence","Campaign Foundation","Keyword Curation","5 Ad Variations","Budget Stewardship","Monthly Performance Memo"] },
      { name: "Gold", popular: true,
        features: ["1–2 Platform Excellence","Strategic Campaign Architecture","Audience Intelligence","Creative A/B Testing","Landing Page Optimisation","Retargeting Framework","Conversion Alchemy","Bi-Weekly Optimisation"] },
      { name: "Platinum",
        features: ["Multi-Platform Command","Holistic Growth Strategy","Predictive Audience Modelling","Dynamic Creative Engine","Full-Funnel Orchestration","Custom Attribution Science","Weekly Strategic Review","Campaign Concierge"] },
    ],
  },
  {
    id: "branding", label: "Branding", icon: "✦",
    tagline: "An identity etched in memory.",
    tiers: [
      { name: "Silver",
        features: ["3 Distinct Logo Directions","Business Stationery","Visual Identity Foundations","Basic Style Guide","2 Refinement Rounds","Production-Ready Files"] },
      { name: "Gold", popular: true,
        features: ["Complete Visual Universe","5 Logo Explorations","Brand Narrative & Voice","Comprehensive Guidelines","Stationery Collection","Social Media Templates","Brand Story Framework","4 Logo Refinements"] },
      { name: "Platinum",
        features: ["Holistic Brand Architecture","Market & Audience Insight","Total Visual Identity System","Positioning & Strategy","Complete Marketing Suite","Packaging Design","Launch Strategy & Assets","Rebranding Expertise","Unlimited Refinements","Brand Stewardship"] },
    ],
  },
  {
    id: "content", label: "Content", icon: "◇",
    tagline: "Words that resonate, convert, endure.",
    tiers: [
      { name: "Silver",
        features: ["Thoughtful Blog Articles","Website Copy per Page","Social Narratives","Email Correspondences","Product Storytelling","Press Announcements"] },
      { name: "Gold", popular: true,
        features: ["Distinguished Long-Form","SEO-Artful Articles","Impactful Case Studies","Monthly Content Membership","Strategy & Research","Dedicated Wordsmith"] },
      { name: "Platinum",
        features: ["Signature Long-Form Stories","Premium Content Subscription","Subject Matter Authority","Editorial Excellence","Content Calendar Curation","Brand Voice Architecture"] },
    ],
  },
  {
    id: "video", label: "Video", icon: "▷",
    tagline: "Moving pictures that move people.",
    tiers: [
      { name: "Silver",
        features: ["Short Feature (30–60 sec)","Elegant Editing","Text & Score","One Refinement","MP4 Master","Standard Colour"] },
      { name: "Gold", popular: true,
        features: ["Cinematic Short (2–3 min)","Advanced Post-Production","Script & Storyboard","Professional Voice","Colour Artistry","Motion Elements"] },
      { name: "Platinum",
        features: ["Full Production House","Half/Full Day Capture","Custom Animation","Premium Colour Grading","Complete Post-Production","Dedicated Director","Multi-Format Delivery"] },
    ],
  },
  {
    id: "app", label: "App Development", icon: "◐",
    tagline: "Crafted for the palm of your hand.",
    tiers: [
      { name: "Silver",
        features: ["Single Platform Focus","Thoughtful Interface","Essential Functionality","90 Days Support","Store Submission","Core Analytics"] },
      { name: "Gold", popular: true,
        features: ["Cross-Platform Excellence","Artful UI/UX","Advanced Capabilities","Push Engagement","Secure Payments","6 Months Support","Performance Refinement"] },
      { name: "Platinum",
        features: ["Premium Cross-Platform","Enterprise Architecture","Custom API Crafting","Advanced Security","Real-Time Features","AI/ML Integration","12 Months Support","Dedicated Engineering","Ongoing Evolution"] },
    ],
  },
  {
    id: "combo", label: "Combos", icon: "◈",
    tagline: "Harmonious solutions, thoughtfully combined.",
    tiers: [
      { name: "Startup Launch",
        features: ["Essential Web Presence","Foundational Identity","Core Stationery","Basic SEO Foundation","Social Platform Setup","30 Days Social Care"] },
      { name: "Business Growth", popular: true,
        features: ["Professional Digital Estate","Complete Identity System","Quarterly SEO Investment","Quarterly Social Presence","12 Insightful Articles","Product Portfolio (50 items)"] },
      { name: "Enterprise",
        features: ["E-commerce / Custom Platform","Premium Brand Universe","6 Months SEO Mastery","6 Months Social Excellence","Monthly Video Craft","PPC Strategic Management","Executive Account Lead"] },
    ],
  },
];

/* ─────────────────────────────────────────
   DECORATIVE SIDE ORNAMENTS
───────────────────────────────────────── */
function SideOrnament({ side }) {
  return (
    <div style={{
      position: "fixed",
      top: "50%",
      [side]: 20,
      transform: "translateY(-50%)",
      width: 80,
      height: 200,
      zIndex: 20,
      pointerEvents: "none",
      opacity: 0.4,
    }}>
      <svg width="80" height="200" viewBox="0 0 80 200" fill="none">
        <path d="M40 0 L40 200" stroke={C.primary} strokeWidth="0.5" strokeDasharray="4 6" opacity="0.3"/>
        <circle cx="40" cy="40" r="4" stroke={C.primary} strokeWidth="0.5" fill="none" opacity="0.4"/>
        <circle cx="40" cy="100" r="6" stroke={C.primary} strokeWidth="0.5" fill="none" opacity="0.4"/>
        <circle cx="40" cy="160" r="4" stroke={C.primary} strokeWidth="0.5" fill="none" opacity="0.4"/>
        <path d="M20 20 Q40 30, 60 20" stroke={C.primary} strokeWidth="0.5" fill="none" opacity="0.2"/>
        <path d="M20 180 Q40 170, 60 180" stroke={C.primary} strokeWidth="0.5" fill="none" opacity="0.2"/>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   TIER CARD
───────────────────────────────────────── */
function TierCard({ tier }) {
  const [hov, setHov] = useState(false);
  const pop = tier.popular;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        background: pop 
          ? `linear-gradient(165deg, ${C.darkAcc} 0%, #3A2420 100%)`
          : hov 
          ? C.secondary 
          : C.base,
        border: pop
          ? `1px solid ${C.highlight}`
          : `1px solid ${C.primary}15`,
        borderRadius: 4,
        padding: "36px 28px",
        transition: "all 0.4s ease",
        transform: hov && !pop ? "translateY(-4px)" : pop ? "translateY(-2px)" : "none",
        boxShadow: pop
          ? `0 20px 40px -12px ${C.primary}40`
          : hov
          ? `0 15px 30px -10px ${C.primary}20`
          : "0 4px 12px rgba(0,0,0,0.02)",
        position: "relative",
        fontFamily: "'Playfair Display', serif",
        cursor: "default",
      }}
    >
      {/* Decorative top border */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "10%",
        right: "10%",
        height: 2,
        background: `linear-gradient(90deg, transparent, ${C.highlight}, transparent)`,
        opacity: pop ? 0.8 : 0.3,
      }} />

      {pop && (
        <div style={{
          position: "absolute",
          top: -10,
          left: 24,
          background: C.highlight,
          color: C.darkAcc,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.55rem",
          letterSpacing: "0.2em",
          padding: "4px 16px",
          textTransform: "uppercase",
          fontWeight: 600,
        }}>
          THE COLLECTOR'S CHOICE
        </div>
      )}

      {/* Tier name */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.7rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: pop ? "rgba(255,255,255,0.6)" : C.textSoft,
        marginBottom: 12,
        fontWeight: 400,
      }}>
        {tier.name}
      </div>

      {/* Price placeholder */}
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.8rem",
        fontWeight: 500,
        fontStyle: "italic",
        color: pop ? "#fff" : C.primary,
        lineHeight: 1.1,
        marginBottom: 8,
        letterSpacing: "-0.02em",
      }}>
        Upon Request
      </div>

      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.8rem",
        color: pop ? "rgba(255,255,255,0.4)" : C.textSoft,
        marginBottom: 24,
      }}>
        Tailored to your vision
      </div>

      {/* Divider */}
      <div style={{
        height: 1,
        width: "40px",
        background: pop ? C.highlight : C.primary,
        marginBottom: 28,
        opacity: pop ? 0.8 : 0.3,
      }} />

      {/* Features */}
      <ul style={{
        flex: 1,
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}>
        {tier.features.map((f, i) => (
          <li key={i} style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem",
            color: pop ? "rgba(255,255,255,0.8)" : C.textMid,
            lineHeight: 1.5,
            fontWeight: 400,
          }}>
            <span style={{
              color: pop ? C.highlight : C.primary,
              fontSize: "0.7rem",
              marginTop: 4,
            }}>✦</span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/#contact"
        style={{
          display: "block",
          marginTop: 30,
          padding: "12px 0",
          background: pop ? "transparent" : "transparent",
          border: `1px solid ${pop ? C.highlight : C.primary}`,
          color: pop ? "#fff" : C.primary,
          textAlign: "center",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.8rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          textDecoration: "none",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = pop ? C.highlight : C.primary;
          e.currentTarget.style.color = pop ? C.darkAcc : "#fff";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = pop ? "#fff" : C.primary;
        }}
      >
        Request Proposal
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────
   SERVICE SECTION
───────────────────────────────────────── */
function ServiceSection({ cat, index }) {
  return (
    <section id={cat.id} style={{
      padding: "90px 0",
      borderBottom: `1px solid ${C.primary}10`,
      position: "relative",
    }}>
      {/* Section number */}
      <div style={{
        position: "absolute",
        top: 90,
        left: -20,
        fontSize: "8rem",
        fontWeight: 300,
        color: C.primary,
        opacity: 0.03,
        fontFamily: "'Playfair Display', serif",
        pointerEvents: "none",
        userSelect: "none",
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <div style={{ marginBottom: 48, position: "relative" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
        }}>
          <span style={{
            fontSize: "1.4rem",
            color: C.primary,
          }}>{cat.icon}</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: C.textSoft,
          }}>
            {cat.label}
          </span>
        </div>
        
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
          fontWeight: 600,
          color: C.text,
          lineHeight: 1.1,
          marginBottom: 10,
          letterSpacing: "-0.02em",
        }}>
          {cat.label}
        </h2>
        
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.1rem",
          fontStyle: "italic",
          color: C.textSoft,
          maxWidth: 500,
        }}>
          {cat.tagline}
        </p>
      </div>

      {/* Grid */}
      <div
        className="tier-grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cat.tiers.length}, 1fr)`,
          gap: 24,
          alignItems: "stretch",
        }}
      >
        {cat.tiers.map(t => <TierCard key={t.name} tier={t} />)}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function Hero({ onExplore }) {
  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: C.base,
      position: "relative",
      overflow: "hidden",
      padding: "0 24px",
    }}>
      {/* Classic grid texture */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          repeating-linear-gradient(45deg, ${C.primary}05 0px, ${C.primary}05 1px, transparent 1px, transparent 12px)
        `,
        pointerEvents: "none",
        opacity: 0.5,
      }} />

      {/* Warm vignette */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(circle at 50% 50%, transparent 30%, ${C.base} 90%)`,
        pointerEvents: "none",
      }} />

      {/* Corner elements */}
      <div style={{
        position: "absolute",
        top: 40,
        left: 40,
        width: 60,
        height: 60,
        borderLeft: `1px solid ${C.primary}20`,
        borderTop: `1px solid ${C.primary}20`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: 40,
        right: 40,
        width: 60,
        height: 60,
        borderRight: `1px solid ${C.primary}20`,
        borderBottom: `1px solid ${C.primary}20`,
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative",
        maxWidth: 800,
        textAlign: "center",
      }}>
        {/* Emblem */}
        <div style={{
          marginBottom: 40,
          animation: "fadeInUp 0.8s ease",
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: C.primary,
            display: "block",
            marginBottom: 10,
          }}>EST. 2026</span>
          <div style={{
            width: 40,
            height: 1,
            background: C.primary,
            margin: "0 auto",
            opacity: 0.3,
          }} />
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(3rem, 7vw, 5.5rem)",
          fontWeight: 700,
          color: C.text,
          lineHeight: 1,
          marginBottom: 20,
          letterSpacing: "-0.03em",
          animation: "fadeInUp 0.8s ease 0.2s both",
        }}>
          Digital <em style={{ color: C.primary, fontStyle: "italic" }}>Sahaay</em>
        </h1>

        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
          fontStyle: "italic",
          color: C.textSoft,
          maxWidth: 540,
          margin: "0 auto 40px",
          lineHeight: 1.8,
          animation: "fadeInUp 0.8s ease 0.3s both",
        }}>
          A curated collection of digital services, thoughtfully crafted for those who seek distinction.
        </p>

        {/* Service tags */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 48,
          animation: "fadeInUp 0.8s ease 0.4s both",
        }}>
          {["SEO", "Web", "Social", "Brand", "Content", "Video"].map(t => (
            <span key={t} style={{
              padding: "6px 16px",
              border: `1px solid ${C.primary}15`,
              borderRadius: 30,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              color: C.textMid,
              background: C.base,
              cursor: "default",
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          flexWrap: "wrap",
          animation: "fadeInUp 0.8s ease 0.5s both",
        }}>
          <button onClick={onExplore} style={{
            padding: "14px 42px",
            background: "transparent",
            border: `1px solid ${C.primary}`,
            color: C.primary,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = C.primary;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = C.primary;
            }}
          >
            Explore Collection
          </button>
          <Link href="/#contact" style={{
            padding: "14px 42px",
            background: C.primary,
            color: "#fff",
            border: `1px solid ${C.primary}`,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = C.darkAcc;
              e.currentTarget.style.borderColor = C.darkAcc;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = C.primary;
              e.currentTarget.style.borderColor = C.primary;
            }}
          >
            Private Consultation
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div onClick={onExplore} style={{
        position: "absolute",
        bottom: 40,
        left: "50%",
        transform: "translateX(-50%)",
        cursor: "pointer",
        animation: "fadeIn 0.8s ease 1s both",
      }}>
        <div style={{
          width: 1,
          height: 60,
          background: `linear-gradient(${C.primary}, transparent)`,
          margin: "0 auto",
          animation: "scrollLine 2s ease infinite",
        }} />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
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