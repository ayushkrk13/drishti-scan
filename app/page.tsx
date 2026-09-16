"use client";

import Link from "next/link";
import { useStoryStore } from "@/lib/store";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useCursor } from "@/lib/CursorContext";
import { useRef, useEffect } from "react";

export default function Home() {
  const { stories, isLoaded } = useStoryStore();
  const { setVariant } = useCursor();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const frameCount = 151;

  useEffect(() => {
    // Preload images for smooth transition
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, '0');
      img.src = `/img-1/ezgif-frame-${frameNum}.jpg`;
    }
  }, []);

  // Track scroll progress of this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress for opacity and translations
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  
  const narrativeOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const narrativeY = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [50, 0, -50]);

  const endOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const endY = useTransform(scrollYProgress, [0.8, 1], [50, 0]);

  // Handle image sequence scrubbing
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (imgRef.current) {
      const index = Math.min(
        frameCount,
        Math.max(1, Math.ceil(latest * frameCount))
      );
      const frameNum = index.toString().padStart(3, '0');
      imgRef.current.src = `/img-1/ezgif-frame-${frameNum}.jpg`;
    }
  });

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-black">
      {/* Fixed Image Sequence Background */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
        <img 
          ref={imgRef}
          src="/img-1/ezgif-frame-001.jpg" 
          alt="Background Sequence"
          className="w-full h-full object-cover opacity-80 mix-blend-screen"
          style={{ filter: 'contrast(1.2) brightness(0.9) saturate(1.5) hue-rotate(-10deg)' }}
        />
        {/* Gradient overlay to add warmth and contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-red-950/40 to-orange-900/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Hero Section (Scroll 0 - 0.2) */}
      <motion.div 
        style={{ opacity: textOpacity, y: textY }}
        className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 md:p-12 lg:p-16"
      >
        {/* Top Header */}
        <div className="flex justify-between items-start pointer-events-auto w-full">
            <div className="flex items-center gap-3" onMouseEnter={() => setVariant("text")} onMouseLeave={() => setVariant("default")}>
               <div className="w-12 h-12 bg-red-600/20 rounded-2xl flex items-center justify-center border border-red-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                  <span className="text-white font-rajdhani font-bold text-2xl">D</span>
               </div>
               <span className="text-white font-rajdhani font-bold text-3xl tracking-widest drop-shadow-md">DRISHTI</span>
            </div>
            <div className="flex gap-4 items-center">
                <Link 
                  href="/login" 
                  onMouseEnter={() => setVariant("button")} 
                  onMouseLeave={() => setVariant("default")}
                  className="px-8 py-3 rounded-full bg-white text-black font-rajdhani font-bold text-lg hover:bg-gray-200 transition-colors shadow-lg"
                >
                  Log in
                </Link>
                <div 
                  onMouseEnter={() => setVariant("button")} 
                  onMouseLeave={() => setVariant("default")}
                  className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                >
                    <div className="flex flex-col gap-1.5 w-5">
                      <span className="h-[2px] w-full bg-white rounded-full"></span>
                      <span className="h-[2px] w-full bg-white rounded-full"></span>
                    </div>
                </div>
            </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row justify-between items-end w-full pb-10 pointer-events-auto h-full mt-24 md:mt-0">
            {/* Left Side */}
            <div className="flex flex-col max-w-2xl h-full justify-end">
                {/* Big Headers */}
                <div className="flex flex-wrap md:flex-nowrap gap-x-8 gap-y-2 mb-12 md:mb-20" onMouseEnter={() => setVariant("text")} onMouseLeave={() => setVariant("default")}>
                    <div className="flex flex-col">
                        <h1 className="font-rajdhani text-7xl md:text-8xl lg:text-[10rem] font-black text-white leading-none tracking-tighter drop-shadow-2xl">
                          READ
                        </h1>
                        <span className="font-ubuntu italic text-3xl md:text-4xl text-gray-400 mt-2 pl-2">beyond</span>
                    </div>
                    <div className="flex flex-col md:mt-24">
                        <h1 className="font-rajdhani text-7xl md:text-8xl lg:text-[10rem] font-black text-white leading-none tracking-tighter drop-shadow-2xl">
                          LIMITS
                        </h1>
                        <span className="font-ubuntu italic text-3xl md:text-4xl text-gray-400 mt-2 pl-2">boundaries</span>
                    </div>
                </div>
                
                {/* Description */}
                <div onMouseEnter={() => setVariant("text")} onMouseLeave={() => setVariant("default")}>
                  <h3 className="text-white font-rajdhani font-bold text-2xl md:text-3xl mb-4 tracking-widest max-w-lg leading-tight">
                      IMMERSIVE PHYGITAL NARRATIVES TO INSPIRE YOUR MIND.
                  </h3>
                  <p className="text-gray-400 font-ubuntu text-lg mb-10 max-w-md leading-relaxed">
                      High-quality. AI-generated. Completely interactive. For readers, by creators.
                  </p>
                </div>
                <Link 
                  href="/library" 
                  onMouseEnter={() => setVariant("button")} 
                  onMouseLeave={() => setVariant("default")}
                  className="w-fit group flex items-center gap-4 px-10 py-4 rounded-full border border-white/30 text-white font-rajdhani font-bold text-xl hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm bg-black/20"
                >
                    EXPLORE STORIES 
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
            </div>

            {/* Right Side - "Referrals" / Features List */}
            <div 
              className="flex flex-col mt-16 md:mt-0 w-full md:w-96 border-l border-white/20 pl-8 md:pl-12"
              onMouseEnter={() => setVariant("text")} 
              onMouseLeave={() => setVariant("default")}
            >
                <div className="flex flex-col">
                    {[
                      "NEW STORIES ADDED DAILY",
                      "INTERACTIVE SCROLL-DRIVEN",
                      "CINEMATIC AUDIO & VIDEO",
                      "100% IMMERSIVE FOREVER"
                    ].map((feature, idx) => (
                      <div key={idx} className="border-b border-white/10 py-6 last:border-0 group hover:border-white/40 transition-colors">
                          <span className="text-gray-300 group-hover:text-white transition-colors font-rajdhani font-bold tracking-[0.2em] text-sm md:text-base">
                            {feature}
                          </span>
                      </div>
                    ))}
                </div>
            </div>
        </div>
      </motion.div>

      {/* Middle Narrative Section (Scroll 0.3 - 0.7) */}
      <motion.div 
        style={{ opacity: narrativeOpacity, y: narrativeY }}
        className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none bg-black/40 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center text-center max-w-4xl px-8 pointer-events-auto">
          <div className="inline-block px-6 py-2 rounded-full border border-red-500/30 bg-red-950/40 backdrop-blur-md mb-8">
            <span className="text-red-400 font-rajdhani font-bold tracking-widest text-sm">+ Real-Time Narrative Visualization</span>
          </div>
          <h2 
            onMouseEnter={() => setVariant("text")} 
            onMouseLeave={() => setVariant("default")}
            className="font-rajdhani text-6xl md:text-8xl font-black text-white mb-8 leading-none tracking-tighter"
          >
            VISUALIZE<br/>
            YOUR MIND<br/>
            IN MOTION
          </h2>
          <p 
            onMouseEnter={() => setVariant("text")} 
            onMouseLeave={() => setVariant("default")}
            className="text-lg md:text-xl font-ubuntu text-gray-300 leading-relaxed max-w-2xl font-light tracking-wide uppercase"
          >
            Put the story's voice into visual speak. Discover ambient soundscapes, handle immersive visuals, and decode the plot in real time.
          </p>
        </div>
      </motion.div>

      {/* Footer Section (Scroll 0.8 - 1.0) */}
      <motion.div 
        style={{ opacity: endOpacity, y: endY }}
        className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none bg-black/80 backdrop-blur-md"
      >
        <div className="flex flex-col items-center pointer-events-auto" onMouseEnter={() => setVariant("footer")} onMouseLeave={() => setVariant("default")}>
          <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-12 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.05)] cursor-pointer hover:scale-105 transition-transform duration-500 group">
             <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[14px] border-l-white border-b-8 border-b-transparent ml-1 group-hover:scale-110 transition-transform"></div>
          </div>
          <h3 className="font-rajdhani text-4xl font-bold text-white mb-12 tracking-[0.3em]">JOIN THE REVOLUTION</h3>
          
          <div className="flex gap-8">
            {['Twitter', 'Instagram', 'Facebook', 'YouTube'].map((social, i) => (
              <a 
                key={i} 
                href="#" 
                onMouseEnter={() => setVariant("button")} 
                onMouseLeave={() => setVariant("footer")}
                className="text-gray-400 hover:text-white font-rajdhani font-bold tracking-wider text-sm uppercase transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
