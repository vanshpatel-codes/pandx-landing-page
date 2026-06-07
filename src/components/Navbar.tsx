import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { audioEngine } from "../utils/audio";

interface NavbarProps {
  currentView: "home" | "docs" | "privacy-policy";
  onNavigate: (view: "home" | "docs" | "privacy-policy") => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export default function Navbar({ currentView, onNavigate, theme, onToggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const navItems = [
    { id: "work", label: "Work" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "process", label: "Process" },
    { id: "docs", label: "Docs & Tokens" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    audioEngine.playClick();
    
    if (sectionId === "docs") {
      onNavigate("docs");
      return;
    }
    
    if (currentView !== "home") {
      onNavigate("home");
      // Wait for view transition
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleHomeClick = () => {
    setIsMobileMenuOpen(false);
    audioEngine.playClick();
    onNavigate("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        id="navbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? theme === "dark"
              ? "bg-black/95 border-b border-white/10 py-3 shadow-xl backdrop-blur-md text-white" 
              : "bg-[#fbfbf9]/95 border-b border-black/10 py-3 shadow-sm backdrop-blur-md text-black"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={handleHomeClick}
            onMouseEnter={() => audioEngine.playTick(0.9)}
            data-cursor="home"
            aria-label="pandx home"
            className="focus:outline-none flex items-center cursor-pointer z-50 transition-transform hover:scale-105 duration-300"
          >
            {/* Custom High-Fidelity pandx Brand Vector Logo */}
            <div className="flex items-center">
              <svg
                width="130"
                height="56"
                viewBox="0 0 500 220"
                className={`${theme === "dark" ? "text-white" : "text-black"} fill-current overflow-visible transition-colors duration-300`}
              >
                <defs>
                  <mask id="panda-face-mask-nav">
                    <rect width="500" height="220" fill="white" />
                    {/* Left Eye Cutout inside 'p' */}
                    <ellipse cx="114" cy="112" rx="12" ry="17" transform="rotate(-24 114 112)" fill="black" />
                    {/* Right Eye Cutout inside 'a' */}
                    <ellipse cx="202" cy="112" rx="12" ry="17" transform="rotate(24 202 112)" fill="black" />
                  </mask>
                </defs>

                {/* Left Ear sitting on 'p' loop */}
                <circle cx="86" cy="65" r="17" fill="currentColor" />

                {/* Right Ear sitting on 'a' loop */}
                <circle cx="230" cy="65" r="17" fill="currentColor" />

                {/* Left eye loop (p) and right eye loop (a) grouped under mask */}
                <g mask="url(#panda-face-mask-nav)">
                  <circle cx="114" cy="112" r="42" fill="currentColor" />
                  <circle cx="202" cy="112" r="42" fill="currentColor" />
                </g>

                {/* Lower Stem (Leg) of P on the Left */}
                <path
                  d="M 82,112 L 82,176 C 82,192 72,198 62,190"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Stem of A on the Right */}
                <path
                  d="M 234,112 L 234,158 C 234,166 242,168 248,162"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="21"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Smile line hanging between P and A */}
                <path
                  d="M 144,146 Q 158,157 172,146"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="9"
                  strokeLinecap="round"
                />

                {/* Letter N */}
                <path
                  d="M 272,148 L 272,112 C 272,94 286,82 302,82 C 318,82 326,94 326,112 L 326,148"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="22"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Left loop of D */}
                <path
                  d="M 374,146 C 356,146 342,132 342,114 C 342,96 356,82 374,82"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="22"
                  strokeLinecap="round"
                />

                {/* Rising organic Stem of D */}
                <path
                  d="M 374,50 L 374,148"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="22"
                  strokeLinecap="round"
                />

                {/* Letter X */}
                <line x1="412" y1="88" x2="456" y2="142" stroke="currentColor" strokeWidth="22" strokeLinecap="round" />
                <line x1="412" y1="142" x2="456" y2="88" stroke="currentColor" strokeWidth="22" strokeLinecap="round" />
              </svg>
            </div>
          </button>

          {/* Desktop Glide Navigation Links */}
          <div 
            className="hidden md:flex items-center gap-1.5 bg-white/[0.04] border border-white/5 p-1 rounded-full backdrop-blur-md"
            onMouseLeave={() => setHoveredTab(null)}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                data-cursor={item.label}
                onMouseEnter={() => {
                  setHoveredTab(item.id);
                  audioEngine.playTick(1.1);
                }}
                onClick={() => handleSectionClick(item.id)}
                className={`relative px-5 py-2 rounded-full font-general text-[13px] font-semibold tracking-wider uppercase transition-colors duration-200 ${
                  theme === "dark" ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black"
                }`}
              >
                {(hoveredTab === item.id || currentView === item.id) && (
                  <motion.span
                    layoutId="active-pill"
                    className={`absolute inset-0 border rounded-full ${
                      theme === "dark" ? "bg-white/10 border-white/5" : "bg-black/5 border-black/10"
                    }`}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Action Tools: Theme Switcher & Let's Talk CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Sun/Moon Theme Switch Toggle */}
            <motion.button
              onClick={() => {
                onToggleTheme();
                audioEngine.playClick();
              }}
              onMouseEnter={() => audioEngine.playTick(1.2)}
              data-cursor="theme"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-mono tracking-wider transition-all cursor-pointer ${
                theme === "dark" 
                  ? "bg-[#18181b] text-white border-white/10 hover:border-white/20" 
                  : "bg-white text-black border-black/10 hover:border-black/25"
              }`}
            >
              {theme === "dark" ? (
                <>
                  <Sun size={12} className="text-amber-400 fill-amber-400" />
                  <span>LIGHT MODE</span>
                </>
              ) : (
                <>
                  <Moon size={12} className="text-indigo-600 fill-indigo-600" />
                  <span>DARK MODE</span>
                </>
              )}
            </motion.button>

            <motion.button
              id="nav-cta"
              data-cursor="chat"
              onMouseEnter={() => audioEngine.playTick()}
              onClick={() => handleSectionClick("contact")}
              whileHover={{ scale: 1.05, boxShadow: theme === "dark" ? "0px 0px 20px rgba(255, 255, 255, 0.12)" : "0px 4px 15px rgba(0, 0, 0, 0.12)" }}
              whileTap={{ scale: 0.96 }}
              className={`font-general hover:cursor-pointer text-xs font-semibold uppercase tracking-widest px-6 py-2.5 rounded-full border transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-white text-black border-white"
                  : "bg-black text-white border-black"
              }`}
            >
              Let's Talk
            </motion.button>
          </div>

          {/* Mobile controllers row */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-full border ${theme === "dark" ? "text-white border-white/15" : "text-black border-black/15"}`}
              aria-label="Toggle mobile theme"
            >
              {theme === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} /> }
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${theme === "dark" ? "text-white" : "text-black"} focus:outline-none z-50 p-2`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer overlay using dynamic staggering with AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className={`fixed inset-0 z-40 flex flex-col justify-center px-12 md:hidden ${
              theme === "dark" ? "bg-black text-white" : "bg-[#fbfbf9] text-black"
            }`}
          >
            <div className="flex flex-col gap-6 text-left">
              
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, ease: "easeOut" }}
                  onClick={() => handleSectionClick(item.id)}
                  className={`font-clash text-4xl font-semibold tracking-tight transition-colors text-left ${
                    theme === "dark" ? "text-white hover:text-white/60" : "text-black hover:text-black/60"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className={`mt-8 pt-8 border-t ${theme === "dark" ? "border-white/10" : "border-black/10"}`}
              >
                <button
                  onClick={() => handleSectionClick("contact")}
                  className={`w-full text-center font-clash text-lg font-medium tracking-wider py-4 rounded-full transition-transform duration-300 hover:scale-95 flex justify-center items-center ${
                    theme === "dark" ? "bg-white text-black" : "bg-black text-white"
                  }`}
                >
                  Start a Project ✦
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

