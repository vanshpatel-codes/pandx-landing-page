import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useAnimationFrame,
  useMotionValue
} from "motion/react";

interface MarqueeProps {
  theme: "dark" | "light";
}

export default function Marquee({ theme }: MarqueeProps) {
  const tickerItems = [
    "Brand Strategy",
    "UI/UX Design",
    "Figma Consulting",
    "Visual Identity",
    "Design Systems",
    "Motion Design"
  ];

  // Repeat items to fill width twice for a seamless infinite scroll loop
  const repeatedItems = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

  // --- Scroll Speed Dependent Velocity & Skew Tracking (Scroll Animation 1: Reactive Marquee) ---
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Smooth out velocity changes to eliminate jitter
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300
  });

  // Map scrolling velocity to reactive skew (tilt angle) and speed multiplier factors
  const skewX = useTransform(smoothVelocity, [-3000, 3000], [-18, 18]);
  const speedFactor = useTransform(smoothVelocity, [-3000, 3000], [-6, 6]);

  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => {
    // Loop/wrap position between -25% and 0% for seamless duplications layout
    const range = 25;
    const min = -25;
    const wrapped = ((((v - min) % range) + range) % range) + min;
    return `${wrapped}%`;
  });

  // Render animation loops frame-by-frame
  useAnimationFrame((time, delta) => {
    // Standard linear automated drift speed: -0.06% progress per frame
    let change = -0.012 * delta;

    // Retrieve interactive scroll velocity acceleration factor
    const factor = speedFactor.get();
    change += factor * 0.15; // responsive impact scaling multiplier

    baseX.set(baseX.get() + change);
  });

  return (
    <div
      id="marquee"
      className={`py-8 border-y overflow-hidden relative select-none transition-colors duration-500 ${
        theme === "dark" 
          ? "bg-black border-white/10" 
          : "bg-zinc-100 border-black/10"
      }`}
    >
      {/* Edge gradient fog masks */}
      <div className={`absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r z-10 pointer-events-none transition-colors duration-500 ${
        theme === "dark" ? "from-black to-transparent" : "from-zinc-100 to-transparent"
      }`} />
      <div className={`absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l z-10 pointer-events-none transition-colors duration-500 ${
        theme === "dark" ? "from-black to-transparent" : "from-zinc-100 to-transparent"
      }`} />

      {/* Skew & Position are driven cleanly via Framer Motion parameters */}
      <motion.div 
        style={{ x, skewX }}
        className="flex items-center gap-12 whitespace-nowrap"
      >
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-12 shrink-0">
            <span className={`font-clash italic font-bold text-3xl md:text-4xl uppercase tracking-wider transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}>
              {item}
            </span>
            <span className={`${theme === "dark" ? "text-white/30" : "text-black/30"} font-mono text-xl`}>✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
