import { motion, useMotionValue, useTransform, useSpring, useScroll } from "motion/react";
import { ArrowRight, Move, Sparkles } from "lucide-react";
import * as React from "react";
import ThreeCanvas from "./ThreeCanvas";
import { audioEngine } from "../utils/audio";

interface HeroProps {
  theme: "dark" | "light";
}

export default function Hero({ theme }: HeroProps) {
  const headlineWords = "We design brands that mean something.".split(" ");
  const [shapeMode, setShapeMode] = React.useState<"sphere" | "torus" | "wave">("sphere");

  // Move tracking for interactive 3D rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to eliminate jitter and run fluidly
  const springConfig = { damping: 25, stiffness: 120, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

  // Lift factors for 3D layered parallax drift
  const driftX = useSpring(useTransform(x, [-0.5, 0.5], [-25, 25]), springConfig);
  const driftY = useSpring(useTransform(y, [-0.5, 0.5], [-25, 25]), springConfig);

  // --- Scroll-driven animations integration (Scroll Animation 4: Hero zoom parallax) ---
  const { scrollY } = useScroll();
  const watermarkScale = useSpring(useTransform(scrollY, [0, 800], [1, 1.35]), { damping: 45, stiffness: 120 });
  const watermarkRotate = useSpring(useTransform(scrollY, [0, 1000], [0, 30]), { damping: 45, stiffness: 100 });
  const cardScale = useSpring(useTransform(scrollY, [0, 800], [1, 0.94]), { damping: 30, stiffness: 140 });
  const cardTranslateY = useTransform(scrollY, [0, 800], [0, -50]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;

    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleCtaClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay px-6 md:px-12 py-32 lg:py-40 transition-colors duration-500 ${
        theme === "dark" ? "bg-black text-white" : "bg-zinc-50 text-black"
      }`}
    >
      {/* Background Watermark - High-fidelity visual icon with scale & rotate scroll interaction */}
      <motion.div 
        style={{ scale: watermarkScale, rotate: watermarkRotate }}
        className="absolute right-[-10%] bottom-[-10%] md:right-[5%] md:bottom-[5%] w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] opacity-[0.035] select-none pointer-events-none z-0"
      >
        <svg
          viewBox="0 0 100 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full fill-current ${theme === "dark" ? "text-white" : "text-black"}`}
        >
          <path d="M25 37.5C25 51.3 36.2 62.5 50 62.5C50 48.7 38.8 37.5 25 37.5Z" />
          <path d="M25 75C25 88.8 36.2 100 50 100V75H25Z" />
          <path d="M50 75C63.8 75 75 86.2 75 100C75 113.8 63.8 125 50 125C36.2 125 25 113.8 25 100C25 86.2 36.2 75 50 75Z" />
          <path d="M75 37.5C75 51.3 63.8 62.5 50 62.5H75V37.5Z" />
          <path d="M50 0C63.8 0 75 11.2 75 25C75 38.8 63.8 50 50 50C36.2 50 25 38.8 25 25C25 11.2 36.2 0 50 0Z" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side Column: Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start gap-8">
          {/* Eyebrow Label in Geist Mono */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <span className={`w-2 h-2 rounded-full animate-pulse ${theme === "dark" ? "bg-white" : "bg-black"}`} />
            <span className={`font-mono text-sm font-semibold uppercase tracking-[0.22em] ${theme === "dark" ? "text-white/60" : "text-black/60"}`}>
              DESIGN CONSULTANCY
            </span>
          </motion.div>

          {/* Headline WordbyWord Reveal in Clash Display */}
          <h1 className="font-clash text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05] max-w-4xl text-left">
            {headlineWords.map((word, idx) => (
              <motion.span
                key={idx}
                className={`inline-block mr-3 md:mr-4 ${theme === "dark" ? "text-white" : "text-black"}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + idx * 0.08,
                  ease: [0.215, 0.61, 0.355, 1], // power3.out ease
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtext in DM Sans */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className={`font-sans text-lg md:text-xl max-w-[520px] text-left leading-relaxed font-normal ${
              theme === "dark" ? "text-white/70" : "text-black/70"
            }`}
          >
            Design consultancy & brand strategy — built in Figma, built for impact. We deliver premium UI/UX structures and scalable design tokens for high-growth ventures.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            {/* See Our Work - Outlined with dynamic spring hover */}
            <motion.button
              id="hero-cta-work"
              data-cursor="work"
              onMouseEnter={() => audioEngine.playTick()}
              onClick={() => {
                handleCtaClick("work");
                audioEngine.playClick();
              }}
              whileHover={{ scale: 1.05, boxShadow: theme === "dark" ? "0px 0px 25px rgba(255,255,255,0.15)" : "0px 10px 25px rgba(0,0,0,0.08)" }}
              whileTap={{ scale: 0.96 }}
              className={`group font-general text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded-full border transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer ${
                theme === "dark" 
                  ? "bg-black text-white border-white/25 hover:border-white" 
                  : "bg-white text-black border-black/20 hover:border-black"
              }`}
            >
              See Our Work
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
            </motion.button>

            {/* Start a Project - Outlined pill */}
            <motion.button
              id="hero-cta-contact"
              data-cursor="start"
              onMouseEnter={() => audioEngine.playTick()}
              onClick={() => {
                handleCtaClick("contact");
                audioEngine.playClick();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className={`font-general text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded-full border transition-all duration-300 text-center cursor-pointer ${
                theme === "dark" 
                  ? "bg-transparent text-white border-white hover:bg-white hover:text-black" 
                  : "bg-transparent text-black border-black hover:bg-black hover:text-white"
              }`}
            >
              Start a Project
            </motion.button>
          </motion.div>
        </div>

        {/* Right Side Column: Interactive 3D Figma Stage Wrapper with dynamic scale based on scroll */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 w-full flex items-center justify-center py-6"
          style={{ perspective: 1200, y: cardTranslateY }}
        >
          {/* Main 3D Card base frame */}
          <motion.div
            style={{ rotateX, rotateY, scale: cardScale, transformStyle: "preserve-3d" }}
            className={`relative w-full max-w-[420px] aspect-[4/5] border-2 rounded-3xl p-6 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col justify-between overflow-hidden cursor-crosshair group/canvas transition-colors duration-500 ${
              theme === "dark" 
                ? "bg-zinc-950/80 border-white/15" 
                : "bg-white border-black/15 shadow-[0_30px_100px_rgba(0,0,0,0.1)]"
            }`}
          >
            {/* Ambient vector blueprint background grid overlay on the base layer */}
            <div className={`absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent`} />
            <div className={`absolute inset-0 opacity-[0.08] [background-size:20px_20px] ${
              theme === "dark" 
                ? "bg-[radial-gradient(#ffffff_1px,transparent_1px)]" 
                : "bg-[radial-gradient(#000000_1px,transparent_1px)]"
            }`} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl" />

            {/* Canvas Header */}
            <div className={`flex justify-between items-center z-10 border-b pb-4 ${theme === "dark" ? "border-white/5" : "border-black/5"}`}>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-[#ff7f50] border border-black" />
                <span className={`font-mono text-[10px] uppercase tracking-widest ${theme === "dark" ? "text-white/50" : "text-black/50"}`}>✦ 3D_PLAYGROUND</span>
              </div>
              <div className="flex gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
                {(["sphere", "torus", "wave"] as const).map((mode) => (
                  <button
                    key={mode}
                    data-cursor="morph"
                    onMouseEnter={() => audioEngine.playTick(1.2)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShapeMode(mode);
                      audioEngine.playClick();
                    }}
                    className={`font-mono text-[9px] font-bold uppercase py-1 px-2 rounded-md transition-all duration-200 cursor-pointer ${
                      shapeMode === mode
                        ? "bg-teal-400 text-black shadow-[0_0_8px_rgba(20,184,166,0.5)]"
                        : theme === "dark"
                        ? "text-white/50 hover:text-white"
                        : "text-zinc-400 hover:text-black"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Core Interactive Layout Body with real-time 3D WebGL Canvas */}
            <div className={`flex-1 flex items-center justify-center relative overflow-hidden my-4 rounded-xl border bg-black/60 shadow-inner min-h-[300px] ${
              theme === "dark" ? "border-white/5" : "border-black/5"
            }`}>
              <ThreeCanvas shapeMode={shapeMode} />
            </div>

            {/* Canvas Footer bar */}
            <div className={`flex justify-between items-center z-10 border-t pt-4 ${theme === "dark" ? "border-white/5" : "border-black/5"}`}>
              <span className={`font-mono text-[8px] uppercase tracking-widest ${theme === "dark" ? "text-white/30" : "text-black/40"}`}>DRAG OR HOVER MOUSE TO BEND</span>
              <div className="flex items-center gap-1 text-[8px] font-mono text-emerald-500">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>ACTIVE AUDIO SYNTH</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

