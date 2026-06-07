import { aboutData } from "../data/cms";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface AboutProps {
  theme: "dark" | "light";
}

// Word-by-Word highlight component (Scroll Animation 2)
interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
  theme: "dark" | "light";
}

function Word({ children, progress, range, theme }: WordProps) {
  // Translate scroll location into word progress color weights
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(
    progress,
    range,
    theme === "dark" 
      ? ["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 1)"]
      : ["rgba(0, 0, 0, 0.15)", "rgba(0, 0, 0, 1)"]
  );

  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-2.5 select-none font-medium">
      {children}
    </motion.span>
  );
}

export default function About({ theme }: AboutProps) {
  const textRef = useRef<HTMLDivElement>(null);
  
  // Track scroll space targeting the text container block
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 75%", "end 45%"]
  });

  const bodyWords = aboutData.body.split(" ");

  return (
    <section
      id="about"
      className={`py-24 md:py-32 px-6 md:px-12 border-t transition-colors duration-500 ${
        theme === "dark" 
          ? "bg-zinc-950 text-white border-white/10" 
          : "bg-white text-black border-black/10"
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        {/* Left Side: Statement (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col items-start gap-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-1.5 h-1.5 rounded-full ${theme === "dark" ? "bg-white" : "bg-black"}`} />
            <span className={`font-mono text-sm font-semibold uppercase tracking-[0.22em] ${theme === "dark" ? "text-white/60" : "text-black/65"}`}>
              OUR STATEMENT
            </span>
          </div>
          
          <h2 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-left leading-[1.1]">
            {aboutData.headline}
          </h2>
        </motion.div>

        {/* Right Side: Interactive Word Reveal Paragraph + Figma Badge (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col items-start gap-8 lg:pt-10"
        >
          {/* Scroll-driven Word-by-Word Highlight Paragraph section */}
          <div ref={textRef} className="w-full max-w-[580px] text-left">
            <p className="font-sans text-lg md:text-xl leading-relaxed flex flex-wrap">
              {bodyWords.map((word, idx) => {
                const totalWords = bodyWords.length;
                const progressUnit = 1 / totalWords;
                // Calculate thresholds for highlight range
                const start = idx * progressUnit;
                const end = start + progressUnit;
                
                // Add soft fade-in pad buffer around ranges
                const startPadded = Math.max(0, start - 0.1);
                const endPadded = Math.min(1, end + 0.12);

                return (
                  <Word
                    key={idx}
                    progress={scrollYProgress}
                    range={[startPadded, endPadded]}
                    theme={theme}
                  >
                    {word}
                  </Word>
                );
              })}
            </p>
          </div>
          
          {/* Badge: Proudly Figma-native */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full max-w-[580px]">
            <motion.div
              id="figma-badge"
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 450, damping: 15 }}
              className={`flex items-center gap-3 border-2 px-6 py-3 rounded-full shadow-[4px_4px_0_rgba(0,0,0,1)] cursor-pointer select-none transition-colors duration-300 ${
                theme === "dark" 
                  ? "bg-black text-white border-white shadow-[4px_4px_0_rgba(255,255,255,1)] hover:bg-zinc-900" 
                  : "bg-white text-black border-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:bg-zinc-100"
              }`}
            >
              {/* Minimal SVG Figma Vector Icon */}
              <svg
                width="18"
                height="26"
                viewBox="0 0 100 150"
                fill="currentColor"
                className={`${theme === "dark" ? "text-white" : "text-black"} transition-colors duration-300`}
              >
                <circle cx="25" cy="25" r="25" />
                <path d="M50 0 C63.81 0 75 11.19 75 25 C75 38.81 63.81 50 50 50 L75 50 L75 25" />
                <path d="M25 50 H50 V100 H25 Z" />
                <circle cx="75" cy="75" r="25" />
                <path d="M25 100 C25 113.8 36.19 125 50 125 C50 111.2 38.81 100 25 100" />
              </svg>
              
              <span className={`font-mono text-xs font-bold uppercase tracking-widest ${theme === "dark" ? "text-white" : "text-black"}`}>
                Proudly Figma-native ✦
              </span>
            </motion.div>
          </div>

          {/* Founder, Pal Hariyani */}
          <div className={`w-full max-w-[580px] pt-8 mt-4 border-t ${theme === "dark" ? "border-white/10" : "border-black/10"}`}>
            <div className="flex flex-col sm:flex-row items-start gap-4 text-left">
              <div className="relative shrink-0">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-cabinet text-[17px] font-bold select-none ${
                  theme === "dark" 
                    ? "bg-white text-black shadow-[0_4px_12px_rgba(255,255,255,0.12)]" 
                    : "bg-black text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                }`}>
                  PH
                </div>
                <div className={`absolute -bottom-1 -right-1 text-[8px] font-mono px-1.5 py-0.5 rounded-full border font-bold uppercase tracking-wider scale-95 ${
                  theme === "dark" ? "bg-white text-black border-black" : "bg-black text-white border-white"
                }`}>
                  ✦
                </div>
              </div>
              <div className="flex flex-col items-start pt-1">
                <span className={`font-mono text-[9px] uppercase tracking-[0.15em] font-bold ${theme === "dark" ? "text-white/50" : "text-black/50"}`}>
                  FOUNDER & DESIGN CONSULTANT
                </span>
                <h3 className={`font-cabinet text-xl font-extrabold mt-1 ${theme === "dark" ? "text-white" : "text-black"}`}>Pal Hariyani</h3>
                <p className={`font-sans text-sm mt-1.5 leading-relaxed ${theme === "dark" ? "text-white/70" : "text-black/70"}`}>
                  Partnering with forward-minds to build absolute typographic clarity, highly-interactive digital surfaces, and fluid pixel structures that anchor attention.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
