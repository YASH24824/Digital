export const globalStyles = `
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

  /* Proper stacking contexts */
  .hero-section {
    isolation: isolate;
    position: relative;
    z-index: 1;
  }
  
  .content-section {
    isolation: isolate;
    position: relative;
    z-index: 2;
  }
`;