"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, motion, useSpring, type MotionValue } from "framer-motion";

const TOTAL_FRAMES = 42;

export default function GrowthAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [autoPlayIndex, setAutoPlayIndex] = useState(1);

  // Use window scroll progress
  const { scrollYProgress } = useScroll();

  // Smooth scroll sync
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map scroll progress (0-1) to frame index (1-42)
  const scrollFrameIndex = useTransform(smoothProgress, [0, 1], [1, TOTAL_FRAMES]);

  useEffect(() => {
    // Preload images
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, "0");
      img.src = `/frames/ezgif-frame-${frameNumber}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    // Subtle Auto-Play on Load
    const timer = setInterval(() => {
      setAutoPlayIndex((prev) => (prev < 5 ? prev + 1 : prev));
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const renderFrame = useCallback((index: number) => {
    if (!canvasRef.current || imagesRef.current.length === 0) return;
    
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index - 1] || imagesRef.current[0];

    if (img && img.complete) {
      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;
      const imgWidth = img.width;
      const imgHeight = img.height;
      // Zoom in slightly to cover better part of the screen
      const scaleFactor = 1.25; 
      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight) * scaleFactor;
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
      const x = (canvasWidth - newWidth) / 2;
      const y = (canvasHeight - newHeight) / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, x, y, newWidth, newHeight);
    }
  }, []);

  useEffect(() => {
    const handleFrameUpdate = () => {
      const scrollIdx = Math.floor(scrollFrameIndex.get());
      // Use scroll index if scrolled, otherwise use auto-play index
      const targetIndex = scrollYProgress.get() > 0 ? scrollIdx : autoPlayIndex;
      renderFrame(targetIndex);
    };

    const unsubscribe = scrollFrameIndex.on("change", handleFrameUpdate);
    if (imagesLoaded) handleFrameUpdate();

    return () => unsubscribe();
  }, [scrollFrameIndex, imagesLoaded, autoPlayIndex, scrollYProgress, renderFrame]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 h-screen w-full overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="h-full w-full object-cover"
        style={{ filter: "contrast(1.1) brightness(0.9) drop-shadow(0 0 10px rgba(212,175,55,0.2))" }}
      />
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal opacity-60" />
      <div className="absolute inset-0 kenyan-pattern" />
      

      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-charcoal z-30">
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gold font-mono text-sm tracking-widest uppercase"
          >
            Loading Cinematic Assets...
          </motion.div>
        </div>
      )}

      {/* Dynamic Context Tags */}
      <ContextTag 
        progress={scrollYProgress} 
        range={[0.1, 0.2]} 
        title="GERMINATION PHASE" 
        desc="Carbon nodes initializing. IoT sensors active deep within the root network." 
        side="left"
      />
      
      <ContextTag 
        progress={scrollYProgress} 
        range={[0.3, 0.4]} 
        title="SEQUESTRATION SPIKE" 
        desc="Satellite oracles confirm 12.4% increase in organic soil carbon." 
        side="right"
      />

      <ContextTag 
        progress={scrollYProgress} 
        range={[0.6, 0.7]} 
        title="MATURITY REACHED" 
        desc="$AGRI-CO2 NFTs minted. SoilVault banking mechanism fully collateralized." 
        side="left"
      />
    </div>
  );
}

type ContextTagProps = {
  progress: MotionValue<number>;
  range: [number, number];
  title: string;
  desc: string;
  side: "left" | "right";
};

function ContextTag({ progress, range, title, desc, side }: ContextTagProps) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [20, 0]);

  return (
    <motion.div 
      style={{ opacity, y }}
      className={`absolute top-1/3 max-w-xs rounded-sm p-6 glass-gold border-gold ${
        side === "left" ? "left-10 border-l-4" : "right-10 border-r-4"
      }`}
    >
      <h3 className="text-gold font-bold text-lg mb-1 tracking-tight">{title}</h3>
      <p className="text-white/60 text-xs font-light leading-snug">{desc}</p>
      <div className="mt-3 h-0.5 w-full bg-gold/10 overflow-hidden">
        <motion.div 
          className="h-full bg-gold"
          style={{ width: useTransform(progress, range, ["0%", "100%"]) }}
        />
      </div>
    </motion.div>
  );
}
