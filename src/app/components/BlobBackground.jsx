// components/BlobBackground.jsx
"use client";
import { useEffect, useRef } from 'react';

export default function BlobBackground({ 
  color = "#9B7B5E", 
  children,
  className = ""
}) {
  const blobRef = useRef(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    let mouseX = 0, mouseY = 0;
    let blobX = 0, blobY = 0;
    let raf;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Smooth follow
      blobX += (mouseX - blobX) * 0.03;
      blobY += (mouseY - blobY) * 0.03;
      
      blob.style.transform = `translate(${blobX - 250}px, ${blobY - 250}px)`;
      
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`relative ${className}`} style={{ isolation: 'isolate' }}>
      {/* Blob */}
      <div
        ref={blobRef}
        style={{
          position: 'fixed',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${color}, transparent 70%)`,
          filter: 'blur(60px)',
          opacity: 0.15,
          pointerEvents: 'none',
          zIndex: 0,
          willChange: 'transform',
        }}
      />
      
      {/* Content with higher z-index */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}