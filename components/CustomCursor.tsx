"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/lib/CursorContext";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { variant } = useCursor();

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      width: 32,
      height: 32,
      backgroundColor: "rgba(155, 174, 251, 0)", // transparent accent
      border: "2px solid rgba(155, 174, 251, 0.5)",
      mixBlendMode: "normal" as const,
    },
    text: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      width: 80,
      height: 80,
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "none",
      mixBlendMode: "difference" as const,
    },
    button: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      width: 48,
      height: 48,
      backgroundColor: "rgba(155, 174, 251, 0.2)",
      border: "2px solid rgba(155, 174, 251, 1)",
      mixBlendMode: "normal" as const,
    },
    header: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      width: 32,
      height: 32,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      border: "none",
      mixBlendMode: "normal" as const,
    },
    footer: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      width: 48,
      height: 48,
      backgroundColor: "rgba(155, 174, 251, 0.1)",
      border: "1px dashed rgba(155, 174, 251, 0.8)",
      mixBlendMode: "normal" as const,
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        body * {
          cursor: none !important;
        }
      `}} />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center"
        variants={variants}
        animate={variant}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: variant === 'text' ? 0 : 1
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
    </>
  );
}
