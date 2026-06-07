import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [hasPointer, setHasPointer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clickActive, setClickActive] = useState(false);
  const [hoverText, setHoverText] = useState("");

  // Target mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for fluid rubbery follow latency
  const springConfig = { damping: 30, stiffness: 220, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable customized cursor on coarse touch screens
    const hasTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (hasTouchDevice) {
      setHasPointer(false);
      return;
    }

    setHasPointer(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setClickActive(true);
    const handleMouseUp = () => setClickActive(false);

    // Track targets dynamically across DOM to apply bespoke hover responses
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Class or tag matchers for high fidelity magnetic interactions
      const nearestInteractive = target.closest("button, a, [data-cursor], .cursor-pointer, input, select, textarea");
      
      if (nearestInteractive) {
        setIsHovered(true);
        const cursorData = nearestInteractive.getAttribute("data-cursor");
        if (cursorData) {
          setHoverText(cursorData);
        } else {
          setHoverText("");
        }
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    const handleMouseLeaveWindow = () => {
      // Offscreen reset
      mouseX.set(-100);
      mouseY.set(-100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
    };
  }, [mouseX, mouseY]);

  if (!hasPointer) return null;

  return (
    <>
      {/* 1. Primary Inner Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-teal-400 mix-blend-difference pointer-events-none z-[99999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: clickActive ? 0.4 : isHovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />

      {/* 2. Secondary Elastic Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-teal-400/50 pointer-events-none z-[99998]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: clickActive ? 14 : isHovered ? (hoverText ? 76 : 52) : 26,
          height: clickActive ? 14 : isHovered ? (hoverText ? 76 : 52) : 26,
          backgroundColor: isHovered ? "rgba(20, 184, 166, 0.08)" : "rgba(20, 184, 166, 0)",
          borderColor: isHovered ? "rgba(20, 184, 166, 0.8)" : "rgba(20, 184, 166, 0.45)",
          borderRadius: "50%",
        }}
        transition={{ 
          type: "spring", 
          stiffness: 280, 
          damping: 24,
          mass: 0.6
        }}
      >
        {/* Hover Label tag integrated directly inside the magnetic ring */}
        {hoverText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center font-mono text-[8px] font-bold text-teal-400 tracking-wider uppercase"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
