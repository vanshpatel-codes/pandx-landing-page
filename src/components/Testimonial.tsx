import { testimonialData } from "../data/cms";
import { motion } from "motion/react";

interface TestimonialProps {
  theme: "dark" | "light";
}

export default function Testimonial({ theme }: TestimonialProps) {
  return (
    <section
      id="testimonial"
      className={`py-32 md:py-40 px-6 md:px-12 relative overflow-hidden flex flex-col justify-center items-center transition-colors duration-500 border-y ${
        theme === "dark" 
          ? "bg-black text-white border-white/10" 
          : "bg-white text-black border-black/10"
      }`}
    >
      {/* Oversized Decorative Quotation Mark (3% opacity) */}
      <span className={`absolute text-[30vw] font-clash font-extrabold select-none pointer-events-none top-[-10%] left-[5%] transform -rotate-12 transition-colors duration-500 ${
        theme === "dark" ? "text-white/[0.025]" : "text-black/[0.035]"
      }`}>
        “
      </span>
      <span className={`absolute text-[30vw] font-clash font-extrabold select-none pointer-events-none bottom-[-20%] right-[10%] transform rotate-12 transition-colors duration-500 ${
        theme === "dark" ? "text-white/[0.025]" : "text-black/[0.035]"
      }`}>
        ”
      </span>

      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 relative z-10 text-center">
        {/* Geometric Accent Emblem */}
        <div className="flex justify-center items-center gap-1.5 mb-2">
          <span className={`w-1.5 h-1.5 rounded-full scale-100 ${theme === "dark" ? "bg-white" : "bg-black"}`} />
          <span className={`w-1.5 h-1.5 rounded-full scale-75 ${theme === "dark" ? "bg-white/40" : "bg-black/40"}`} />
          <span className={`w-1.5 h-1.5 rounded-full scale-50 ${theme === "dark" ? "bg-white/20" : "bg-black/20"}`} />
        </div>

        {/* Quote text centered in Clash Display Italic */}
        <motion.p
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`font-clash italic font-medium text-2xl md:text-4xl lg:text-5xl tracking-tight leading-relaxed max-w-3xl ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          "{testimonialData.quote}"
        </motion.p>

        {/* Divider dot */}
        <span className={`${theme === "dark" ? "text-white/20" : "text-black/20"} font-mono text-xs tracking-widest`}>✦</span>

        {/* Attribution below quote in Geist Mono */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`font-mono text-xs uppercase tracking-[0.2em] ${
            theme === "dark" ? "text-white/50" : "text-black/55"
          }`}
        >
          {testimonialData.attribution}
        </motion.span>
      </div>
    </section>
  );
}
