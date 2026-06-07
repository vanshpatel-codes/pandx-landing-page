import { Instagram, Linkedin, Globe } from "lucide-react";

interface FooterProps {
  currentView: "home" | "docs" | "privacy-policy";
  onNavigate: (view: "home" | "docs" | "privacy-policy") => void;
  theme: "dark" | "light";
}

export default function Footer({ currentView, onNavigate, theme }: FooterProps) {
  const handleSectionClick = (sectionId: string) => {
    if (currentView !== "home") {
      onNavigate("home");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleHomeClick = () => {
    onNavigate("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrivacyClick = () => {
    onNavigate("privacy-policy");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className={`border-t py-16 px-6 md:px-12 relative transition-colors duration-500 ${
        theme === "dark" 
          ? "bg-black text-white border-white/10" 
          : "bg-zinc-50 text-zinc-900 border-black/10"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Segment */}
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b ${
          theme === "dark" ? "border-white/5" : "border-black/5"
        }`}>
          
          {/* Brand Logo left */}
          <button
            onClick={handleHomeClick}
            aria-label="Back to home"
            className="flex items-center gap-2 cursor-pointer focus:outline-none bg-transparent"
          >
            <svg
              width="110"
              height="48"
              viewBox="0 0 500 220"
              className={`fill-current overflow-visible hover:scale-105 transition-transform duration-300 ${
                theme === "dark" ? "text-white animate-pulse" : "text-black animate-none"
              }`}
            >
              <defs>
                <mask id="panda-face-mask-footer">
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
              <g mask="url(#panda-face-mask-footer)">
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
          </button>

          {/* Nav links center */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <button
              onClick={() => handleSectionClick("work")}
              className={`font-general text-xs uppercase tracking-widest transition-colors ${
                theme === "dark" ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"
              }`}
            >
              Work
            </button>
            <button
              onClick={() => handleSectionClick("services")}
              className={`font-general text-xs uppercase tracking-widest transition-colors ${
                theme === "dark" ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => handleSectionClick("about")}
              className={`font-general text-xs uppercase tracking-widest transition-colors ${
                theme === "dark" ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleSectionClick("process")}
              className={`font-general text-xs uppercase tracking-widest transition-colors ${
                theme === "dark" ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"
              }`}
            >
              Process
            </button>
            <button
              onClick={() => onNavigate("docs")}
              className="font-general text-xs uppercase tracking-widest text-[#14b8a6] hover:text-[#0d9488] transition-colors font-bold"
            >
              Docs & Tokens ✦
            </button>
            <button
              onClick={() => handleSectionClick("contact")}
              className={`font-general text-xs uppercase tracking-widest transition-colors ${
                theme === "dark" ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"
              }`}
            >
              Contact
            </button>
            <button
              onClick={handlePrivacyClick}
              className={`font-general text-xs uppercase tracking-widest underline transition-colors ${
                theme === "dark" ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"
              }`}
            >
              Privacy Policy
            </button>
          </div>

          {/* Social icons right */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/pandx_graphix_web?igsh=dGMyOG11c2ppZmh0"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className={`hover:scale-110 active:scale-95 transition-all p-2 rounded-full border ${
                theme === "dark" 
                  ? "text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border-white/5" 
                  : "text-black/60 hover:text-black bg-black/5 hover:bg-black/10 border-black/5"
              }`}
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://behance.net"
              target="_blank"
              rel="noreferrer"
              aria-label="Behance"
              className={`hover:scale-110 active:scale-95 transition-all p-2 rounded-full border ${
                theme === "dark" 
                  ? "text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border-white/5" 
                  : "text-black/60 hover:text-black bg-black/5 hover:bg-black/10 border-black/5"
              }`}
            >
              <Globe size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/pandx-graphics-web-528263414"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className={`hover:scale-110 active:scale-95 transition-all p-2 rounded-full border ${
                theme === "dark" 
                  ? "text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border-white/5" 
                  : "text-black/60 hover:text-black bg-black/5 hover:bg-black/10 border-black/5"
              }`}
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Bottom Segment */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className={`font-mono text-[10px] uppercase tracking-widest ${
            theme === "dark" ? "text-white/40" : "text-black/40"
          }`}>
            © 2026 pandx. All rights reserved.
          </span>
          
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className={`font-mono text-[10px] uppercase tracking-widest ${
              theme === "dark" ? "text-white/40" : "text-black/40"
            }`}>
              Live Connection Secure
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
