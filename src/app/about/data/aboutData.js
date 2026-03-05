export const ACCENT = "#9B7B5E";
export const DARK = "#1a1a1a";

export const projects = [
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

export const teamMembers = [
  { name: "Yash Patel",    initials: "YP", role: "Founder & Creative Director", bio: "Visionary leader with 10+ years in digital transformation. Built Digital Sahaay from the ground up.", quote: "Great design is not just how it looks, but how it works.", color: "#4A6FA5" },
  { name: "Priya Sharma",  initials: "PS", role: "Lead Designer",               bio: "Award-winning designer who believes in creating experiences that resonate deeply with users.", quote: "Design is intelligence made visible.", color: "#2E8B57" },
  { name: "Rahul Mehta",   initials: "RM", role: "Technical Architect",          bio: "Full-stack expert with a passion for scalable architecture handling millions of users.", quote: "Code is poetry, but architecture is literature.", color: "#9B7B5E" },
  { name: "Anjali Desai",  initials: "AD", role: "Strategy Lead",               bio: "Data-driven strategist who turns insights into impact. Helped clients achieve 200%+ growth.", quote: "Strategy without execution is just a dream.", color: "#C44536" },
];

// Particle positions pre-computed
export const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  left: `${10 + i * 11}%`,
  delay: `${i * 0.4}s`,
  duration: `${2.5 + i * 0.5}s`,
}));