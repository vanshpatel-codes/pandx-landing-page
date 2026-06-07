import { servicesData } from "../data/cms";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

interface ServicesProps {
  theme: "dark" | "light";
}

export default function Services({ theme }: ServicesProps) {
  return (
    <section
      id="services"
      className={`py-24 md:py-32 px-6 md:px-12 relative transition-colors duration-500 ${
        theme === "dark" ? "bg-black text-white border-t border-white/10" : "bg-[#fbfbf9] text-black border-t border-black/10"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-start gap-12">
        
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
            WHAT WE DO
          </span>
        </motion.div>

        {/* Headline Left-Aligned in Cabinet Grotesk */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-left max-w-3xl leading-tight"
        >
          Services built for brands that think big.
        </motion.h2>

        {/* 2x2 Services Grid with Entrance Scroll Rotation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-6">
          {servicesData.map((service, index) => {
            const blockNum = `0${index + 1}`;
            const tiltDir = index % 2 === 0 ? -2.5 : 2.5; // slight scroll pivot angle

            return (
              <motion.div
                id={`service-card-${service.id}`}
                key={service.id}
                initial={{ opacity: 0, y: 50, rotateZ: tiltDir }}
                whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
                viewport={{ once: false, margin: "-80px" }}
                whileHover={{
                  y: -10,
                  boxShadow: theme === "dark" 
                    ? "12px 12px 0px rgba(255,255,255,1)" 
                    : "12px 12px 0px rgba(0,0,0,1)",
                  backgroundColor: theme === "dark" ? "#ffffff" : "#000000",
                  color: theme === "dark" ? "#000000" : "#ffffff",
                  borderColor: theme === "dark" ? "#ffffff" : "#000000"
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 20,
                  mass: 0.8
                }}
                className={`group relative border p-8 md:p-10 rounded-2xl flex flex-col justify-between min-h-[255px] cursor-pointer transition-all duration-300 select-none ${
                  theme === "dark" 
                    ? "bg-zinc-950/70 border-white/10 text-white" 
                    : "bg-white border-black/10 text-black shadow-[0_10px_35px_rgba(0,0,0,0.03)]"
                }`}
              >
                <div>
                  {/* Card Header: Static Mono Counter & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className={`font-mono text-xs font-semibold tracking-widest uppercase transition-colors duration-250 ${
                      theme === "dark" ? "text-white/40 group-hover:text-black/40" : "text-black/40 group-hover:text-white/40"
                    }`}>
                      SERVICE {blockNum}
                    </span>
                    <ArrowUpRight
                      size={20}
                      className={`transition-all transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                        theme === "dark" ? "text-white/30 group-hover:text-black" : "text-black/30 group-hover:text-white"
                      }`}
                    />
                  </div>

                  {/* Title in Cabinet Grotesk */}
                  <h3 className="font-cabinet text-2xl md:text-3xl font-extrabold tracking-tight mb-4 text-left">
                    {service.title}
                  </h3>
                </div>

                {/* Body Text in DM Sans */}
                <p className={`font-sans text-base transition-colors duration-300 max-w-[420px] text-left leading-relaxed ${
                  theme === "dark" ? "text-white/70 group-hover:text-black/85" : "text-black/70 group-hover:text-white/85"
                }`}>
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
