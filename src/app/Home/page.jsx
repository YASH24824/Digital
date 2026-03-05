"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import Hero from "../components/Home/Hero";
import WhatWeOffer from "../components/Home/Whatweoffer";
import OurServices from "../components/Home/Ourservices";
import HowWeWork from "../components/Home/Howwework";
import ScrollStory from "../components/Home/ScrollStoryWrapper";
import Testimonials from "../components/Home/Testimonials";
import HeroSection from "../about/components/HeroSection";

export default function Home() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Store lenis instance in ref
    lenisRef.current = lenis;

    // RAF loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ScrollStory>
      <HeroSection/>
      {/* <Hero /> */}
      <WhatWeOffer />
      {/* <OurServices /> */}
      <HowWeWork />
      <Testimonials />
    </ScrollStory>
  );
}