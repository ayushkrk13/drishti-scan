"use client";

import { useEffect, useRef } from "react";
import { useCursor } from "@/lib/CursorContext";

export default function CustomCursor() {
  const { variant } = useCursor();
  
  // Use refs for high-performance tracking without re-renders
  const mouse = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const isInitialized = useRef(false);
  
  const targetSize = useRef(40);
  const currentSize = useRef(40);
  
  const requestRef = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Determine target size based on hover variant
    switch (variant) {
      case "text":
        targetSize.current = 120;
        break;
      case "button":
        targetSize.current = 80;
        break;
      case "header":
      case "footer":
        targetSize.current = 60;
        break;
      case "default":
      default:
        targetSize.current = 40;
        break;
    }
  }, [variant]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isInitialized.current) {
        // Snap to initial position on first movement
        currentPos.current = { x: e.clientX, y: e.clientY };
        currentSize.current = targetSize.current;
        isInitialized.current = true;
      }
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMouseMove);

    const updatePosition = () => {
      if (isInitialized.current) {
        // Smooth linear interpolation (lerp)
        currentPos.current.x += (mouse.current.x - currentPos.current.x) * 0.15;
        currentPos.current.y += (mouse.current.y - currentPos.current.y) * 0.15;
        currentSize.current += (targetSize.current - currentSize.current) * 0.15;

        if (containerRef.current) {
          // Update CSS variables instead of React state for smooth, un-janky rendering
          containerRef.current.style.setProperty('--mouse-x', `${currentPos.current.x}px`);
          containerRef.current.style.setProperty('--mouse-y', `${currentPos.current.y}px`);
          containerRef.current.style.setProperty('--mask-size', `${currentSize.current}px`);
          containerRef.current.style.opacity = '1';
        }
      }

      requestRef.current = requestAnimationFrame(updatePosition);
    };

    requestRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* Hide default cursor on devices that support hover */
        @media (hover: hover) and (pointer: fine) {
          body * {
            cursor: none !important;
          }
        }

        /* Disable custom cursor on touch/mobile devices */
        @media (hover: none) and (pointer: coarse) {
          .texture-cursor-container {
            display: none !important;
          }
        }
        
        .texture-cursor-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
          opacity: 0;
          
          /* 
           * 👉 CUSTOMIZE TEXTURE HERE 
           * Replace the url() with your preferred pattern, noise, or SVG image.
           */
          background-image: url('https://www.transparenttextures.com/patterns/cubes.png');
          background-color: rgba(155, 174, 251, 0.4); /* Theme accent tint */
          background-blend-mode: overlay;

          /* Apply dynamic mask using CSS variables updated via requestAnimationFrame */
          --mouse-x: 50%;
          --mouse-y: 50%;
          --mask-size: 40px;
          
          -webkit-mask-image: radial-gradient(
            circle var(--mask-size) at var(--mouse-x) var(--mouse-y),
            black 0%,
            transparent 100%
          );
          mask-image: radial-gradient(
            circle var(--mask-size) at var(--mouse-x) var(--mouse-y),
            black 0%,
            transparent 100%
          );
          
          transition: opacity 0.5s ease, background-color 0.3s ease, mix-blend-mode 0.3s ease;
        }

        /* Adjust blend mode or tint dynamically based on variant */
        .texture-cursor-container.variant-text {
          mix-blend-mode: difference;
          background-color: rgba(255, 255, 255, 1);
          background-image: none; /* Optional: clear texture for pure difference effect on text */
        }
        .texture-cursor-container.variant-button {
          background-color: rgba(155, 174, 251, 0.8);
          mix-blend-mode: normal;
        }
      `}} />
      <div 
        ref={containerRef} 
        className={`texture-cursor-container variant-${variant}`} 
      />
    </>
  );
}
