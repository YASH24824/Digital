/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
export const categories = [
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