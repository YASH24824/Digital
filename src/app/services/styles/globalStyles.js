export const globalStyles = `
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

@media (max-width: 900px) {
  .tier-grid { grid-template-columns: 1fr 1fr !important; }
}

@media (max-width: 580px) {
  .tier-grid { grid-template-columns: 1fr !important; }
  .tab-bar { overflow-x: auto; }
  .tab-bar::-webkit-scrollbar { height: 0; }
}
`;