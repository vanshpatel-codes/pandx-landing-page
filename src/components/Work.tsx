import { projectsData } from "../data/cms";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { audioEngine } from "../utils/audio";

interface WorkProps {
  theme: "dark" | "light";
}

export default function Work({ theme }: WorkProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Scroll-driven horizontal translate (Scroll Animation 3: Horizontal scroll track) ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Translate progress linearly from 0% to minus 28% sideways offset on desktop with snappier spring response
  const xTranslation = useTransform(scrollYProgress, [0.0, 1.0], ["0%", "-28%"]);
  const smoothX = useSpring(xTranslation, { damping: 25, stiffness: 95, mass: 0.6 });

  // Render high-fidelity Figma style previews
  const renderProjectPreview = (projectId: string) => {
    if (projectId === "p1") {
      return (
        <div className="relative w-full h-full overflow-hidden bg-zinc-950 flex items-center justify-center p-6 select-none">
          <div className="absolute inset-0 opacity-[0.14] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl" />

          <motion.div
            initial={{ y: 0 }}
            whileHover={{ y: -8, rotateZ: -1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-full max-w-[280px] bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-4 relative overflow-hidden text-left"
          >
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
            
            <div className="flex justify-between items-center">
              <span className="font-mono text-[9px] uppercase tracking-widest text-violet-400">Aura Ledger</span>
              <span className="font-mono text-[9px] text-white/50">PLATINUM v1.0</span>
            </div>

            <div className="flex flex-col items-start gap-1">
              <span className="text-white/40 text-[9px] font-mono uppercase tracking-wider">Available Assets</span>
              <span className="font-clash text-2xl font-semibold text-white tracking-wide">$94,220.00</span>
            </div>

            <div className="flex items-end gap-1.5 h-10 w-full mt-1">
              {[20, 35, 15, 45, 60, 30, 55, 75, 45, 80, 95].map((val, i) => (
                <div key={i} className="flex-1 bg-white/5 rounded-t-sm h-full flex flex-col justify-end">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 1.2, delay: i * 0.04, ease: "easeOut" }}
                    className="w-full bg-gradient-to-t from-violet-500 to-cyan-400 rounded-t-sm"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-white/40 mt-1 border-t border-white/5 pt-3">
              <span>● ACTIVE CURRENT</span>
              <span className="text-white/80">+12.4%</span>
            </div>
          </motion.div>
        </div>
      );
    }

    if (projectId === "p2") {
      return (
        <div className="relative w-full h-full overflow-hidden bg-zinc-950 flex items-center justify-center p-6 select-none">
          <div className="absolute inset-0 opacity-[0.25] bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="absolute inset-x-0 top-6 flex justify-between px-6 opacity-40">
            <span className="font-mono text-[8px] text-teal-400">X: 180.4px</span>
            <span className="font-mono text-[8px] text-teal-400">Y: -44.0px</span>
          </div>

          <div className="relative border border-teal-500/20 p-6 rounded-lg bg-zinc-900/50 flex flex-col gap-4 w-full max-w-[260px] text-left">
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border border-teal-500 bg-black" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border border-teal-500 bg-black" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border border-teal-500 bg-black" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border border-teal-500 bg-black" />

            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] uppercase tracking-wide text-white/50">STATE ACTIVE</span>
              <div className="h-[2px] flex-1 bg-teal-500/20" />
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-teal-500/10 border border-teal-500/40 rounded-full text-teal-400 text-[10px] font-mono uppercase tracking-widest">
                badge v2.0
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/70 text-[10px] font-mono uppercase tracking-widest">
                hover state
              </span>
            </div>

            <div className="flex justify-between items-center gap-4 bg-zinc-950/80 p-3 rounded border border-white/5">
              <span className="font-cabinet text-xs font-bold text-white tracking-wide">VEX SYSTEM</span>
              <div className="w-8 h-4 rounded-full bg-teal-500 flex items-center justify-end px-0.5">
                <div className="w-3 h-3 bg-white rounded-full shadow" />
              </div>
            </div>

            <motion.div
              animate={{
                x: [0, 40, -20, 0],
                y: [0, -20, 10, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-4 right-10 flex items-start gap-1"
            >
              <svg width="12" height="15" viewBox="0 0 12 15" fill="none">
                <path d="M0 0V14.5L3.8 11L9.2 12.8L11 8.2L5.8 6.5L10 2.5L0 0Z" fill="#ff7f50" />
              </svg>
              <span className="px-2 py-0.5 bg-[#ff7f50] text-black text-[7px] font-mono font-black uppercase rounded tracking-wider shadow">
                MARCUS (CEO)
              </span>
            </motion.div>
          </div>
        </div>
      );
    }

    if (projectId === "p3") {
      return (
        <div className="relative w-full h-full overflow-hidden bg-zinc-950 flex items-center justify-center p-6 select-none">
          <div className="absolute h-48 w-48 rounded-full bg-rose-500/5 blur-3xl" />
          
          <div className="relative flex flex-col items-center gap-4 text-center">
            <div className="relative h-28 w-28 flex items-center justify-center">
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full h-full text-rose-500/20"
                viewBox="0 0 100 100"
              >
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="16 8" fill="none" />
              </motion.svg>
              <motion.svg
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] text-rose-400"
                viewBox="0 0 100 100"
              >
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" strokeDasharray="80 200" strokeLinecap="round" fill="none" />
              </motion.svg>
              
              <div className="flex flex-col items-center">
                <span className="text-white font-clash text-2xl font-semibold tracking-tight">72</span>
                <span className="text-rose-400 text-[8px] font-mono uppercase tracking-widest font-black">BPM ACTIVE</span>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-zinc-900/60 border border-white/5 px-4 py-2 rounded-xl text-left">
              <div>
                <span className="block text-[8px] font-mono text-white/40 uppercase">Acoustic Status</span>
                <span className="text-[11px] font-sans font-bold text-white">REACTIVE FIT</span>
              </div>
              <div className="h-6 w-[1px] bg-white/10" />
              <div>
                <span className="block text-[8px] font-mono text-white/40 uppercase">Efficacy</span>
                <span className="text-[11px] font-sans font-bold text-white">98.4% SCORE</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      ref={containerRef}
      id="work"
      className={`transition-colors duration-500 relative ${
        theme === "dark" 
          ? "bg-black text-white" 
          : "bg-[#fbfbf9] text-[#111111] border-t border-black/10"
      } lg:h-[145vh]`} // Cinematic track size for gorgeous sticky scroll-driven horizontal slide
    >
      {/* Sticky layout framing */}
      <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-center lg:overflow-hidden py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-start gap-12 relative z-10">
          
          {/* Eyebrow Label in Geist Mono */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${theme === "dark" ? "bg-white" : "bg-black"}`} />
            <span className={`font-mono text-sm font-semibold uppercase tracking-[0.22em] ${theme === "dark" ? "text-white/60" : "text-black/60"}`}>
              SELECTED WORK
            </span>
          </motion.div>

          {/* Section Heading Left-Aligned in Cabinet Grotesk */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-left max-w-2xl leading-none"
          >
            Projects we're proud of.
          </motion.h2>

          {/* responsive Portfolio Track layout (Desktop horizontal vs Mobile vertical Grid) */}
          <div className="w-full mt-6 overflow-visible">
            {/* Desktop Sticky Horizontal Scroll Row wrapper */}
            <motion.div 
              style={{ x: smoothX }}
              className="hidden lg:flex gap-10 items-stretch min-w-[150%] xl:min-w-[130%]"
            >
              {projectsData.map((project, idx) => (
                <motion.div
                  id={`project-card-desktop-${project.id}`}
                  key={project.id}
                  data-cursor="view"
                  onMouseEnter={() => audioEngine.playTick(1.05)}
                  onClick={() => audioEngine.playClick()}
                  whileHover={{ 
                    y: -12, 
                    scale: 1.02,
                    boxShadow: theme === "dark" 
                      ? "0px 15px 40px rgba(20,184,166,0.18)" 
                      : "0px 20px 35px rgba(0,0,0,0.06)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`relative w-[420px] shrink-0 border rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-zinc-950/60 border-white/10 hover:border-teal-400/40"
                      : "bg-white border-black/15 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:border-teal-500/40"
                  }`}
                >
                  {/* Visual preview */}
                  <div className={`relative aspect-[4/3] w-full overflow-hidden bg-zinc-950 border-b ${
                    theme === "dark" ? "border-white/5" : "border-black/5"
                  }`}>
                    {renderProjectPreview(project.id)}
                    
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md rounded-full p-2.5 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight size={18} className="text-white" />
                    </div>
                  </div>

                  {/* Card descriptions block */}
                  <div className={`p-6 flex flex-col items-start gap-1.5 ${theme === "dark" ? "bg-zinc-950/80" : "bg-white"}`}>
                    <span className={`font-mono text-[10px] font-medium tracking-widest uppercase ${
                      theme === "dark" ? "text-teal-400" : "text-teal-600"
                    }`}>
                      {project.category}
                    </span>
                    <h3 className={`font-cabinet text-xl font-bold tracking-tight text-left transition-colors duration-200 ${
                      theme === "dark" ? "text-white" : "text-zinc-900"
                    }`}>
                      {project.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile / Tablet vertical Grid fallback */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full lg:hidden">
              {projectsData.map((project, idx) => (
                <motion.div
                  id={`project-card-mobile-${project.id}`}
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  data-cursor="view"
                  onMouseEnter={() => audioEngine.playTick(1.05)}
                  onClick={() => audioEngine.playClick()}
                  whileHover={{ scale: 1.01 }}
                  className={`group relative border rounded-xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-zinc-950 border-white/10 hover:border-teal-400/40"
                      : "bg-white border-black/15 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-teal-500/40"
                  }`}
                >
                  <div className={`relative aspect-[4/3] w-full overflow-hidden bg-zinc-950 border-b ${
                    theme === "dark" ? "border-white/5" : "border-black/5"
                  }`}>
                    {renderProjectPreview(project.id)}
                    
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md rounded-full p-3 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight size={18} className="text-white" />
                    </div>
                  </div>

                  <div className={`p-6 flex flex-col items-start gap-1.5 ${theme === "dark" ? "bg-zinc-950/40" : "bg-white"}`}>
                    <span className={`font-mono text-[10px] font-medium tracking-widest uppercase ${
                      theme === "dark" ? "text-teal-400" : "text-teal-600"
                    }`}>
                      {project.category}
                    </span>
                    
                    <h3 className={`font-cabinet text-xl font-bold tracking-tight text-left transition-colors duration-300 ${
                      theme === "dark" ? "text-white group-hover:text-teal-400" : "text-zinc-900 group-hover:text-teal-600"
                    }`}>
                      {project.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
