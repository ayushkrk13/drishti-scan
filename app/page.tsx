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
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // Handle video scrubbing
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (videoRef.current) {
      // Assuming the video has a duration, we map progress to time
      const duration = videoRef.current.duration || 0;
      if (duration > 0) {
        videoRef.current.currentTime = latest * duration;
      }
    }
  });

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-black">
      {/* Fixed Video Background */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
        <video 
          ref={videoRef}
          src="/bg-video.mp4" 
          className="w-full h-full object-cover opacity-60"
          muted 
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
      </div>

      {/* Hero Section (Scroll 0 - 0.2) */}
      <motion.div 
        style={{ opacity: textOpacity, y: textY }}
        className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <div className="flex flex-col items-center text-center max-w-4xl px-8 pointer-events-auto">
          <h1 
            onMouseEnter={() => setVariant("text")} 
            onMouseLeave={() => setVariant("default")}
            className="font-rajdhani text-7xl md:text-8xl lg:text-9xl font-bold leading-none mb-6 tracking-wide text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            EXPLORE
            <br />
            <span className="text-accent bg-none">THE FUTURE</span>
          </h1>
          
          <p 
            onMouseEnter={() => setVariant("text")} 
            onMouseLeave={() => setVariant("default")}
            className="text-[#B0B5C9] text-lg md:text-2xl font-ubuntu mb-12 max-w-2xl leading-relaxed"
          >
            Immerse yourself in interactive phygital reading. Dive into AI-generated cinematic worlds and experience storytelling like never before.
          </p>
          
          <Link
            href="/library"
            onMouseEnter={() => setVariant("button")} 
            onMouseLeave={() => setVariant("default")}
            className="group relative inline-flex items-center justify-center bg-accent text-white font-rajdhani font-bold text-xl px-12 py-5 rounded-full hover:opacity-90 transition-opacity shadow-[0_8px_20px_rgba(155,174,251,0.3)]"
          >
            <span className="relative z-10 tracking-widest">START READING</span>
          </Link>
        </div>
      </motion.div>

      {/* Middle Narrative Section (Scroll 0.3 - 0.7) */}
      <motion.div 
        style={{ opacity: narrativeOpacity, y: narrativeY }}
        className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <div className="flex flex-col items-center text-center max-w-3xl px-8 pointer-events-auto">
          <h2 
            onMouseEnter={() => setVariant("text")} 
            onMouseLeave={() => setVariant("default")}
            className="font-rajdhani text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Breathe Life Into Static Pages
          </h2>
          <p 
            onMouseEnter={() => setVariant("text")} 
            onMouseLeave={() => setVariant("default")}
            className="text-xl md:text-2xl font-ubuntu text-accent leading-relaxed"
          >
            Scroll to unveil dynamic narratives, ambient soundscapes, and AI-driven phygital immersion that reacts to your every move.
          </p>
        </div>
      </motion.div>

      {/* Footer Section (Scroll 0.8 - 1.0) */}
      <motion.div 
        style={{ opacity: endOpacity, y: endY }}
        className="fixed inset-0 flex items-end justify-center z-10 pointer-events-none pb-20"
      >
        <div className="flex flex-col items-center pointer-events-auto" onMouseEnter={() => setVariant("footer")} onMouseLeave={() => setVariant("default")}>
          <h3 className="font-rajdhani text-3xl font-bold text-white mb-8 tracking-widest">JOIN THE REVOLUTION</h3>
          
          <div className="flex gap-6">
            {['Twitter', 'Instagram', 'Facebook', 'YouTube'].map((social, i) => (
              <a 
                key={i} 
                href="#" 
                onMouseEnter={() => setVariant("button")} 
                onMouseLeave={() => setVariant("footer")}
                className="w-14 h-14 rounded-full bg-accent/20 border border-accent text-white flex items-center justify-center font-bold hover:bg-white hover:text-accent transition-colors shadow-[0_0_15px_rgba(155,174,251,0.2)] text-xl"
              >
                {social[0]}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
