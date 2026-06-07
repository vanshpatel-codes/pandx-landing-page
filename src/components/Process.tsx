import { processSteps } from "../data/cms";
import { motion } from "motion/react";

interface ProcessProps {
  theme: "dark" | "light";
}

export default function Process({ theme }: ProcessProps) {
  return (
    <section
      id="process"
      className={`py-24 md:py-32 px-6 md:px-12 relative border-t transition-colors duration-500 ${
        theme === "dark" 
          ? "bg-zinc-950 text-white border-white/10" 
          : "bg-[#fbfbf9] text-black border-black/15"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-start gap-16">
        
        {/* Eyebrow Label in Geist Mono */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${theme === "dark" ? "bg-white" : "bg-black"}`} />
          <span className={`font-mono text-sm font-semibold uppercase tracking-[0.22em] ${theme === "dark" ? "text-white/60" : "text-black/65"}`}>
            HOW WE WORK
          </span>
        </motion.div>

        {/* Section Heading Left-Aligned */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-left max-w-2xl leading-none"
        >
          Our design blueprint.
        </motion.h2>

        {/* Steps Grid: 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {processSteps.map((step, idx) => {
            return (
              <motion.div
                id={`process-step-${step.number}`}
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{
                  y: -10,
                  boxShadow: theme === "dark" 
                    ? "12px 12px 0px rgba(255,255,255,1)" 
                    : "12px 12px 0px rgba(0,0,0,1)",
                  borderColor: theme === "dark" ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)"
                }}
                transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                className={`group relative flex flex-col items-start p-8 md:p-10 border-2 rounded-2xl transition-all duration-350 cursor-default w-full ${
                  theme === "dark" 
                    ? "bg-black border-white/10 text-white" 
                    : "bg-white border-black/10 text-black shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
                }`}
              >
                {/* Massive 10% opacity backdrop number positioned behind card elements */}
                <span className={`absolute right-6 top-4 font-cabinet font-black text-8xl md:text-9xl select-none pointer-events-none transition-colors duration-500 ${
                  theme === "dark" ? "text-white/[0.04] group-hover:text-white/[0.08]" : "text-black/[0.04] group-hover:text-black/[0.1]"
                }`}>
                  {step.number}
                </span>

                {/* Combined Step Number & Title over the backdrop */}
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-4 z-10 w-full text-left">
                  <span className={`font-mono text-xs font-bold tracking-widest ${theme === "dark" ? "text-teal-400" : "text-teal-600"}`}>
                    PHASE {step.number}
                  </span>
                  
                  <h3 className={`font-cabinet text-2xl md:text-3xl font-extrabold tracking-tight text-left ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}>
                    {step.title}
                  </h3>
                </div>

                {/* Short Step Description in DM Sans */}
                <p className={`font-sans text-base text-left leading-relaxed max-w-[460px] z-10 font-normal ${
                  theme === "dark" ? "text-white/75" : "text-black/75"
                }`}>
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
