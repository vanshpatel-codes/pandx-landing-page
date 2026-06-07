import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  theme: "dark" | "light";
  onComplete: () => void;
}

// Cinematic design steps
const DESIGN_PHASES = [
  { range: [0, 18], label: "INTERPRETING VISION" },
  { range: [19, 42], label: "CURATING AESTHETICS" },
  { range: [43, 68], label: "REFINING GEOMETRY" },
  { range: [69, 88], label: "BREATHING INTERACTION" },
  { range: [89, 98], label: "ENGRAVING CODES" },
  { range: [99, 100], label: "IGNITING WORLD" }
];

export default function Preloader({ theme, onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [phaseText, setPhaseText] = useState("INITIALIZING");

  // Non-linear organic progress simulator
  useEffect(() => {
    let active = true;
    let currentProgress = 0;
    let timerId: NodeJS.Timeout;

    const tick = () => {
      if (!active) return;

      // Random organic step increments
      let increment = 0;
      if (currentProgress < 30) {
        increment = Math.floor(Math.random() * 5) + 3; // Fast start
      } else if (currentProgress < 45) {
        increment = Math.floor(Math.random() * 3) + 1; // Slide smoothly
      } else if (currentProgress < 75) {
        increment = Math.floor(Math.random() * 7) + 2; // Snappy jump
      } else if (currentProgress < 95) {
        increment = Math.floor(Math.random() * 3) + 1; // Detailed stabilization
      } else {
        increment = 1; // High anticipation crawl
      }

      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(currentProgress);

      // Determine label based on current progress
      const matchingPhase = DESIGN_PHASES.find(
        (p) => currentProgress >= p.range[0] && currentProgress <= p.range[1]
      );
      if (matchingPhase) {
        setPhaseText(matchingPhase.label);
      }

      if (currentProgress < 100) {
        // Dynamic wait times (simulates complex compiling beats)
        let nextDelay = Math.floor(Math.random() * 120) + 40;
        if (currentProgress === 42 || currentProgress === 78 || currentProgress === 99) {
          nextDelay = 350; // Dramatic stop/beat
        }
        timerId = setTimeout(tick, nextDelay);
      } else {
        // Hold on 100% for solid visual impact before sliding open
        timerId = setTimeout(() => {
          setIsVisible(false);
          // Let the split curtains run their exit animations before calling complete
          setTimeout(onComplete, 950);
        }, 500);
      }
    };

    // Begin loop
    timerId = setTimeout(tick, 100);

    return () => {
      active = false;
      clearTimeout(timerId);
    };
  }, [onComplete]);

  // We enforce a dark, rich, boutique cinema aesthetic regardless of theme for true cinematic value.
  // Dark mode makes the animated radial ambient light gradients stand out beautifully.
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="page-preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 1, 
            transition: { duration: 1 } // Keep parent mounted while child panels exit
          }}
          className="fixed inset-0 z-[9999] overflow-hidden select-none bg-[#060608] text-white flex flex-col items-center justify-center"
        >
          {/* CINEMATIC SHUTTER CURTAINS: Screen split reveal */}
          {/* Top Curtain Pane */}
          <motion.div 
            initial={{ y: "0%" }}
            exit={{ 
              y: "-100%",
              transition: { duration: 0.9, ease: [0.85, 0, 0.15, 1], delay: 0.1 }
            }}
            className="absolute top-0 left-0 w-full h-[50vh] bg-[#07070a] border-b border-white/[0.03] z-10 pointer-events-none"
          />
          {/* Bottom Curtain Pane */}
          <motion.div 
            initial={{ y: "0%" }}
            exit={{ 
              y: "100%",
              transition: { duration: 0.9, ease: [0.85, 0, 0.15, 1], delay: 0.1 }
            }}
            className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#07070a] border-t border-white/[0.03] z-10 pointer-events-none"
          />

          {/* BACKGROUND LAYER: Cinematic ambient lights & Grid overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden origin-center">
            {/* Fine Tech-grid overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
            {/* Soft, rotating atmospheric radial glows (Teal & Gold Amber) */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360],
                opacity: [0.15, 0.25, 0.15]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] rounded-full bg-radial from-teal-500/20 via-transparent to-transparent blur-[120px]"
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                rotate: [360, 0],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full bg-radial from-amber-500/15 via-transparent to-transparent blur-[120px]"
            />
          </div>

          {/* COGNITIVE PANEL CONTENT */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ 
              opacity: 0,
              scale: 0.94,
              filter: "blur(8px)",
              transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
            }}
            className="flex flex-col items-center justify-between h-[65vh] md:h-[55vh] max-h-[500px] w-full max-w-xl px-8 relative z-20"
          >
            {/* TOP BAR: Artistic branding indicator */}
            <div className="flex justify-between items-center w-full border-b border-white/5 pb-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
                PANDX STUDIO
              </span>
              <span className="font-mono text-[9px] text-white/30">
                [ EST. 2026 ]
              </span>
            </div>

            {/* MAIN CORE: SVG Logo with breathing glow & staggered letter reveal */}
            <div className="flex flex-col items-center gap-6 relative">
              {/* Outer halo light sync'd with progress */}
              <div 
                className="absolute inset-0 -m-12 bg-white/[0.015] rounded-full blur-[80px] transition-all duration-700 pointer-events-none"
                style={{ opacity: 0.3 + (progress / 100) * 0.7 }}
              />

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                {/* SVG Logo - Precise PandX shape */}
                <svg
                  width="180"
                  height="78"
                  viewBox="0 0 500 220"
                  className="fill-current overflow-visible text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.06)]"
                >
                  <defs>
                    <mask id="cinematic-panda-mask">
                      <rect width="500" height="220" fill="white" />
                      <ellipse cx="114" cy="112" rx="12" ry="17" transform="rotate(-24 114 112)" fill="black" />
                      <ellipse cx="202" cy="112" rx="12" ry="17" transform="rotate(24 202 112)" fill="black" />
                    </mask>
                  </defs>

                  {/* Ears with staggered visual balance */}
                  <circle cx="86" cy="65" r="17" fill="currentColor" />
                  <circle cx="230" cy="65" r="17" fill="currentColor" />

                  {/* Primary eye loops under mask */}
                  <g mask="url(#cinematic-panda-mask)">
                    <circle cx="114" cy="112" r="42" fill="currentColor" />
                    <circle cx="202" cy="112" r="42" fill="currentColor" />
                  </g>

                  {/* Lower Stems - Crafted curves */}
                  <path d="M 82,112 L 82,176 C 82,192 72,198 62,190" fill="none" stroke="currentColor" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 234,112 L 234,158 C 234,166 242,168 248,162" fill="none" stroke="currentColor" strokeWidth="21" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Gentle curved smile */}
                  <path d="M 144,146 Q 158,157 172,146" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />

                  {/* Letter N */}
                  <path d="M 272,148 L 272,112 C 272,94 286,82 302,82 C 318,82 326,94 326,112 L 326,148" fill="none" stroke="currentColor" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />

                  {/* D Loop */}
                  <path d="M 374,146 C 356,146 342,132 342,114 C 342,96 356,82 374,82" fill="none" stroke="currentColor" strokeWidth="22" strokeLinecap="round" />

                  {/* D Stem */}
                  <path d="M 374,50 L 374,148" fill="none" stroke="currentColor" strokeWidth="22" strokeLinecap="round" />

                  {/* Letter X */}
                  <line x1="412" y1="88" x2="456" y2="142" stroke="currentColor" strokeWidth="22" strokeLinecap="round" />
                  <line x1="412" y1="142" x2="456" y2="88" stroke="currentColor" strokeWidth="22" strokeLinecap="round" />
                </svg>
              </motion.div>

              {/* Subheading letter stretch scale */}
              <motion.span 
                initial={{ letterSpacing: "0.2em", opacity: 0 }}
                animate={{ letterSpacing: "0.45em", opacity: 0.6 }}
                transition={{ duration: 2.2, ease: "easeOut" }}
                className="font-mono text-[9px] uppercase tracking-[0.45em] text-white/70 block text-center pl-1 mt-1 font-medium"
              >
                GRAPHICS & WEB
              </motion.span>
            </div>

            {/* BOTTOM BAR: Progress Bar, Status label and Absolute ticker */}
            <div className="flex flex-col gap-4 w-full">
              {/* Active step loader indicator */}
              <div className="flex justify-between items-baseline w-full">
                {/* Rolling design phases aligned left */}
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={phaseText}
                      initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-teal-400"
                    >
                      {phaseText}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Big cinematic percentage */}
                <span className="font-mono text-xl font-bold tabular-nums tracking-tighter text-white">
                  {progress}%
                </span>
              </div>

              {/* High precision loading line with a subtle glowing thumb */}
              <div className="h-[2px] w-full relative bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full absolute left-0 top-0 bg-linear-to-r from-teal-400 via-teal-300 to-white shadow-[0_0_8px_#38bdf8]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              {/* Small status summary disclaimer */}
              <div className="flex justify-between items-center text-[9px] font-mono text-white/30 pt-1">
                <span>SYSTEM STABLE</span>
                <span>RENDERING HIGH_FIDELITY</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
