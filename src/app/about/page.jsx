"use client";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "./hooks/useInView";
import { ACCENT, projects } from "./data/aboutData";
import { globalStyles } from "./styles/aboutStyles";

// Components
import CustomCursor from "./components/CustomCursor";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";
import TeamSection from "./components/TeamSection";
export default function AboutPage() {
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
      <style>{globalStyles}</style>

      {/* Global Custom Cursor */}
      <CustomCursor mouse={mouse} hovered={hovered} ACCENT={ACCENT} />

      {/* Hero Section - with SplashCursor only */}
      <HeroSection heroVisible={heroVisible} setHovered={setHovered} />

      {/* Project Sections - each wrapped with BlobBackground */}
      {projects.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))}

      {/* Team Section - with BlobBackground */}
      <TeamSection 
        teamRef={teamRef} 
        teamVisible={teamVisible} 
        setHovered={setHovered} 
      />

    
    </>
  );
}