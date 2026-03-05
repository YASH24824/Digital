import { useState, useEffect, useRef } from "react";

const steps = [
  { id: "discover", number: "01", title: "Discover", italic: "& Understand" },
  { id: "strategy", number: "02", title: "Strategy", italic: "& Plan" },
  { id: "design",   number: "03", title: "Design",   italic: "& Create" },
  { id: "develop",  number: "04", title: "Develop",  italic: "& Build" },
  { id: "launch",   number: "05", title: "Launch",   italic: "& Grow" },
];

const ACCENT = "#9B7B5E";
const W = 1200;
const H = 380;

// Control point positions for the snake curve
const points = [
  { x: 130,  y: 240 },
  { x: 370,  y: 130 },
  { x: 600,  y: 280 },
  { x: 840,  y: 100 },
  { x: 1070, y: 250 },
];

function buildPath(pts) {
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], c = pts[i];
    const cp1x = p.x + (c.x - p.x) * 0.5;
    const cp1y = p.y;
    const cp2x = c.x - (c.x - p.x) * 0.5;
    const cp2y = c.y;
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${c.x},${c.y}`;
  }
  return d;
}

const PATH_D = buildPath(points);

// Hook to get path total length
function useTraveler(pathRef, running) {
  const [state, setState] = useState({ x: points[0].x, y: points[0].y, hidden: false });
  const rafRef = useRef();
  const startRef = useRef(null);

  useEffect(() => {
    if (!running || !pathRef.current) return;
    const el = pathRef.current;
    const total = el.getTotalLength();
    const duration = 4000; // ms per loop
    const HIDE_RADIUS = 58; // px in SVG coords — hide dot within this distance of a circle center

    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) % duration;
      const t = elapsed / duration;
      const pt = el.getPointAtLength(t * total);

      // Check if dot is near any step circle
      const nearCircle = points.some(
        (p) => Math.hypot(pt.x - p.x, pt.y - p.y) < HIDE_RADIUS
      );

      setState({ x: pt.x, y: pt.y, hidden: nearCircle });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running, pathRef]);

  return state;
}

function useIntersection(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

export default function HowWeWork() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const visible = useIntersection(sectionRef);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const dotState = useTraveler(pathRef, visible && !isMobile);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .hww-section {
          font-family: 'DM Sans', sans-serif;
          background: #faf9f7;
          padding: 80px 48px 100px;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hww-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 20% 50%, rgba(155,123,94,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 40% 50% at 80% 30%, rgba(155,123,94,0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .hww-inner { max-width: 1300px; margin: 0 auto; width: 100%; }

        /* Header */
        .hww-header { margin-bottom: 56px; }

        .hww-eyebrow {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: ${ACCENT};
          margin-bottom: 14px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .hww-eyebrow.visible { opacity: 1; transform: none; }

        .hww-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.6rem, 4.5vw, 4rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.08;
          color: #1a1209;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
        }
        .hww-title.visible { opacity: 1; transform: none; }
        .hww-title em { font-style: italic; color: ${ACCENT}; }

        .hww-rule {
          width: 64px; height: 1.5px;
          background: ${ACCENT};
          margin-top: 28px;
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left;
          transition: opacity 0.6s ease 0.3s, transform 0.8s ease 0.3s;
        }
        .hww-rule.visible { opacity: 0.35; transform: scaleX(1); }

        /* SVG Container */
        .hww-canvas {
          position: relative;
          width: 100%;
        }

        .hww-svg { width: 100%; display: block; overflow: visible; }

        /* Circles */
        .step-circle {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid ${ACCENT};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform: translate(-50%, -50%) scale(0);
          box-shadow: 0 16px 40px -12px rgba(155,123,94,0.25), 0 2px 8px rgba(0,0,0,0.06);
          cursor: pointer;
          transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
          z-index: 10;
        }
        .step-circle.popped { transform: translate(-50%, -50%) scale(1); }
        .step-circle:hover {
          box-shadow: 0 20px 50px -10px rgba(155,123,94,0.4), 0 4px 12px rgba(0,0,0,0.08);
          transform: translate(-50%, -50%) scale(1.1) !important;
        }

        .step-num {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: ${ACCENT};
          margin-bottom: 3px;
        }
        .step-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: #1a1a1a;
          letter-spacing: 0.01em;
        }
        .step-sub {
          font-size: 0.65rem;
          color: #aaa;
          letter-spacing: 0.04em;
          margin-top: 1px;
        }

        /* Glow ring on hover */
        .step-circle::after {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          background: ${ACCENT};
          opacity: 0;
          filter: blur(14px);
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        .step-circle:hover::after { opacity: 0.18; }

        /* Dot */
        .traveler-dot {
          position: absolute;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #e8c99a, #9B7B5E);
          box-shadow: 0 0 24px 6px rgba(155,123,94,0.55), 0 0 6px 2px rgba(155,123,94,0.3);
          transform: translate(-50%, -50%);
          z-index: 20;
          transition: none;
          pointer-events: none;
        }

        /* Footer labels */
        .hww-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 28px;
          padding: 0 0;
          opacity: 0;
          transition: opacity 0.8s ease 1.8s;
        }
        .hww-labels.visible { opacity: 1; }

        .label-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .label-num {
          font-size: 0.65rem;
          font-weight: 700;
          color: ${ACCENT};
          letter-spacing: 0.12em;
        }
        .label-text { font-size: 0.72rem; color: #888; letter-spacing: 0.03em; }

        @media (max-width: 768px) {
          .hww-section { padding: 28px 16px 36px; min-height: unset; }
          .hww-header { margin-bottom: 24px; }
          .hww-canvas { min-height: unset; }
          .step-circle { width: 58px; height: 58px; }
          .step-name { font-size: 0.65rem; }
          .step-num { font-size: 0.55rem; }
          .step-sub { display: none; }
          .hww-labels { display: none; }
          .traveler-dot { display: none; }
        }
      `}</style>

      <section className="hww-section" ref={sectionRef}>
        <div className="hww-inner">

          {/* Header */}
          <div className="hww-header">
            <p className={`hww-eyebrow ${visible ? "visible" : ""}`}>Our Process</p>
            <h2 className={`hww-title ${visible ? "visible" : ""}`}>
              How <em>We Work</em>
            </h2>
            <div className={`hww-rule ${visible ? "visible" : ""}`} />
          </div>

          {/* Canvas */}
          <div className="hww-canvas">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="hww-svg"
              style={{ height: "auto", aspectRatio: `${W}/${H}` }}
            >
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C6A97E" />
                  <stop offset="50%" stopColor="#9B7B5E" />
                  <stop offset="100%" stopColor="#B89B7A" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {/* Shadow track */}
              <path
                d={PATH_D}
                stroke="rgba(155,123,94,0.08)"
                strokeWidth={14}
                fill="none"
                strokeLinecap="round"
              />

              {/* Animated path */}
              <path
                ref={pathRef}
                d={PATH_D}
                stroke="url(#lineGrad)"
                strokeWidth={3.5}
                fill="none"
                strokeLinecap="round"
                strokeDasharray="2400"
                strokeDashoffset={visible ? "0" : "2400"}
                style={{
                  transition: visible ? "stroke-dashoffset 2.4s cubic-bezier(0.4,0,0.2,1) 0.4s" : "none",
                }}
                filter="url(#glow)"
              />
            </svg>

            {/* Step circles */}
            {steps.map((step, i) => {
              const pct = { x: (points[i].x / W) * 100, y: (points[i].y / H) * 100 };
              return (
                <div
                  key={step.id}
                  className={`step-circle ${visible ? "popped" : ""}`}
                  style={{
                    left: `${pct.x}%`,
                    top: `${pct.y}%`,
                    transitionDelay: visible ? `${0.85 + i * 0.14}s` : "0s",
                  }}
                >
                  <span className="step-num">{step.number}</span>
                  <span className="step-name">{step.title}</span>
                  <span className="step-sub">{step.italic}</span>
                </div>
              );
            })}

            {/* Traveling dot — desktop only */}
            {visible && !isMobile && (
              <div
                className="traveler-dot"
                style={{
                  left: `${(dotState.x / W) * 100}%`,
                  top: `${(dotState.y / H) * 100}%`,
                  opacity: dotState.hidden ? 0 : 1,
                  transition: "opacity 0.18s ease",
                }}
              />
            )}
          </div>

          {/* Bottom labels */}
          <div className={`hww-labels ${visible ? "visible" : ""}`}>
            {steps.map((s) => (
              <div className="label-item" key={s.id}>
                <span className="label-num">{s.number}</span>
                <span className="label-text">{s.title} {s.italic}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}