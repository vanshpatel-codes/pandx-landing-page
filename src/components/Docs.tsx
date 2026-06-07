import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Palette, 
  Type, 
  Layers, 
  Sliders, 
  Code, 
  Copy, 
  Check, 
  Search, 
  FileCode, 
  Heart,
  ExternalLink,
  ChevronRight,
  Monitor,
  Cpu
} from "lucide-react";

interface DocsProps {
  onNavigateHome: () => void;
  theme?: "dark" | "light";
}

type TabType = "philosophy" | "colors" | "typography" | "logo-spec" | "snippets" | "3d-config";

export default function Docs({ onNavigateHome, theme }: DocsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("philosophy");
  const [searchQuery, setSearchQuery] = useState("");
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  
  // States for interactive 3D slider preview
  const [warpFactor, setWarpFactor] = useState(0.8);
  const [sphereColor, setSphereColor] = useState("#14b8a6");
  const [scaleFactor, setScaleFactor] = useState(1.0);
  
  // Sandbox live font text
  const [sandboxText, setSandboxText] = useState("We design brands that mean something.");

  const triggerCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(label);
    setTimeout(() => {
      setCopyStatus(null);
    }, 2000);
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode; category: string }[] = [
    { id: "philosophy", label: "Brand Philosophy", icon: <BookOpen size={16} />, category: "GET STARTED" },
    { id: "colors", label: "Color Tokens", icon: <Palette size={16} />, category: "DESIGN TOKENS" },
    { id: "typography", label: "Typography System", icon: <Type size={16} />, category: "DESIGN TOKENS" },
    { id: "logo-spec", label: "Logo Geometry", icon: <Layers size={16} />, category: "VECTOR SPECS" },
    { id: "3d-config", label: "3D Component Specs", icon: <Sliders size={16} />, category: "DEVELOPMENT" },
    { id: "snippets", label: "Glassmorphic Snippets", icon: <Code size={16} />, category: "DEVELOPMENT" },
  ];

  // Filter tabs based on search
  const filteredTabs = tabs.filter(t => 
    t.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isDark = theme !== "light";

  return (
    <div className={`min-h-screen py-12 px-6 md:px-12 relative overflow-hidden transition-colors duration-500 ${
      isDark ? "bg-black text-white" : "bg-zinc-50 text-black border-t border-black/10"
    }`}>
      {/* Background Ambience Dots & Gradient Grid */}
      <div className={`absolute inset-0 opacity-[0.12] [background-size:24px_24px] pointer-events-none ${
        isDark ? "bg-[radial-gradient(#ffffff_1px,transparent_1px)]" : "bg-[radial-gradient(#000000_1px,transparent_1px)]"
      }`} />
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#ff7f50]/10 blur-[150px] pointer-events-none" />

      {/* Floating Alert Notice for Copy Clipboard feedback */}
      <AnimatePresence>
        {copyStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#14b8a6] text-black font-mono text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full shadow-[0_10px_30px_rgba(20,184,166,0.3)] flex items-center gap-2 border border-teal-300"
          >
            <Check size={14} className="stroke-[3]" />
            Copied {copyStatus} to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
        
        {/* Navigation Breadcrumbs & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={onNavigateHome}
              className="text-white/60 hover:text-white transition-colors text-sm font-semibold tracking-wider font-mono uppercase"
            >
              PANDX
            </button>
            <ChevronRight size={14} className="text-white/30" />
            <span className="text-white text-sm font-bold font-mono uppercase tracking-wider bg-white/10 px-3 py-1 rounded-md border border-white/5">
              Brand Documentation
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-teal-400 font-bold bg-teal-500/10 border border-teal-500/30 px-2.5 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
              <Cpu size={10} /> Live Tokens v2.4
            </span>
            <button 
              onClick={onNavigateHome}
              className="bg-white hover:bg-white/90 text-black text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all hover:scale-[1.03] duration-300"
            >
              Back to Studio ✦
            </button>
          </div>
        </div>

        {/* Master Flex Grid layout (Sidebar + main viewer) */}
        <div className="flex flex-col lg:flex-row gap-8 mt-4">
          
          {/* Left Navigation Rail (Doc Tree & Search) */}
          <div className="w-full lg:w-72 flex flex-col gap-6 shrink-0">
            
            {/* Realtime filter input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search specs & code..."
                className="w-full bg-white/[0.03] border border-white/15 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#14b8a6]/40 focus:bg-white/[0.05] transition-all duration-300 placeholder-white/30"
              />
              <Search size={16} className="absolute left-3.5 top-3.5 text-white/30" />
            </div>

            {/* Sticky/Scrollable navigation link block */}
            <div className="flex flex-col gap-6 bg-white/[0.02] border border-white/5 rounded-2xl p-4 backdrop-blur-md">
              
              {/* Dynamic categories mapping */}
              {Array.from(new Set(filteredTabs.map(t => t.category))).map(cat => (
                <div key={cat} className="flex flex-col gap-1.5">
                  <span className="font-mono text-[9px] font-bold text-white/40 tracking-[0.2em] px-2.5 uppercase select-none">
                    {cat}
                  </span>
                  
                  <div className="flex flex-col gap-1">
                    {filteredTabs.filter(t => t.category === cat).map(t => (
                      <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                          activeTab === t.id 
                            ? "bg-white text-black font-bold shadow-lg" 
                            : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                        }`}
                      >
                        {t.icon}
                        <span className="flex-1 truncate">{t.label}</span>
                        {activeTab === t.id && (
                          <motion.span 
                            layoutId="indicator" 
                            className="w-1.5 h-1.5 rounded-full bg-[#14b8a6]" 
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {filteredTabs.length === 0 && (
                <div className="text-center py-8 text-xs font-mono text-white/30">
                  No specifications matched.
                </div>
              )}
            </div>

            {/* Quick reference banner card */}
            <div className="hidden lg:flex flex-col gap-3 bg-[#ff7f50]/10 border border-[#ff7f50]/20 rounded-2xl p-5 text-left">
              <Heart size={18} className="text-[#ff7f50]" />
              <h4 className="font-cabinet text-sm font-bold text-white tracking-wide">Figma Shared Tokens</h4>
              <p className="text-[11px] font-sans text-white/70 leading-relaxed">
                Connect your Figma Workspace using variables to automatically synchronize variables with our styling.
              </p>
              <a 
                href="#figma-auth"
                onClick={(e) => { e.preventDefault(); alert("Figma workspace link configuration is automatically populated in production."); }}
                className="text-xs font-mono font-bold text-[#ff7f50] flex items-center gap-1.5 hover:underline mt-1"
              >
                Launch Linker <ExternalLink size={10} />
              </a>
            </div>
          </div>

          {/* Right Main Viewer (Displays selected specification panel) */}
          <div className="flex-grow min-w-0 bg-white/[0.01] border border-white/5 rounded-3xl p-6 md:p-10 backdrop-blur-md">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                
                {/* BRAND PHILOSOPHY TAB */}
                {activeTab === "philosophy" && (
                  <div className="text-left flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-xs text-[#14b8a6] uppercase tracking-widest font-black">GET STARTED</span>
                      <h2 className="font-cabinet text-3xl md:text-4xl font-black text-white tracking-tight leading-none">
                        Brand Spacing & Visual Grammar
                      </h2>
                    </div>
                    
                    <p className="font-sans text-base text-white/70 leading-relaxed max-w-4xl">
                      Designed to bypass superficial decorations, pandx is anchored in strict structural constraints, bold geometric negative margins, and playful fluid curves. Our design tokens establish a cohesive brand identity that commands attention on display channels and desktop environments alike.
                    </p>

                    {/* Visual concept block */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      
                      {/* Principle Card 1 */}
                      <div className="border border-white/10 p-6 rounded-2xl bg-white/[0.02] flex flex-col gap-3 transition-colors hover:border-white/20">
                        <span className="font-mono text-2xl font-black text-[#14b8a6]">01. Symmetry & Flow</span>
                        <h4 className="font-cabinet text-lg font-bold text-white">Compound Curves</h4>
                        <p className="font-sans text-xs text-white/60 leading-relaxed">
                          All visual glyphs (including our panda logo stems and joints) must maintain matching inner counter radii. This builds visual coherence that prevents elements from breaking at tiny densities.
                        </p>
                      </div>

                      {/* Principle Card 2 */}
                      <div className="border border-white/10 p-6 rounded-2xl bg-white/[0.02] flex flex-col gap-3 transition-colors hover:border-white/20">
                        <span className="font-mono text-2xl font-black text-[#ff7f50]">02. Space Grotesk Scaling</span>
                        <h4 className="font-cabinet text-lg font-bold text-white">Dynamic Typographical Rhythm</h4>
                        <p className="font-sans text-xs text-white/60 leading-relaxed">
                          We pairing dense display headings with monospaced metadata markers, giving readers instant hierarchy, contrasting mechanical details against soft curved layout loops.
                        </p>
                      </div>

                    </div>

                    {/* Developer Code Snippet Quick Start */}
                    <div className="flex flex-col gap-3 mt-6">
                      <div className="flex justify-between items-center bg-white/[0.04] px-4 py-2 mt-4 rounded-t-xl border-t border-x border-white/10 font-mono text-[11px] text-white/50">
                        <span className="flex items-center gap-1.5"><FileCode size={12} /> package.json Setup</span>
                        <button 
                          onClick={() => triggerCopy(`npm install @pandx/design-tokens`, "Package Install")}
                          className="hover:text-white transition-colors flex items-center gap-1"
                        >
                          <Copy size={12} /> COPY
                        </button>
                      </div>
                      <pre className="bg-zinc-950 p-5 rounded-b-xl border border-white/10 font-mono text-xs overflow-x-auto text-teal-400">
                        {`// Install the core token system\nnpm install @pandx/design-tokens\n\n// Import variables directly into your root global CSS\n@import "@pandx/design-tokens/vars.css";`}
                      </pre>
                    </div>
                  </div>
                )}

                {/* COLOR TOKENS TAB */}
                {activeTab === "colors" && (
                  <div className="text-left flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-xs text-[#14b8a6] uppercase tracking-widest font-black">DESIGN TOKENS</span>
                      <h2 className="font-cabinet text-3xl md:text-4xl font-black text-white tracking-tight">
                        Color Token Swatches
                      </h2>
                      <p className="font-sans text-xs text-white/60">
                        Tap any color block to copy its hex value directly to your web clipboard.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      
                      {/* Black Onyx */}
                      <div 
                        onClick={() => triggerCopy("#000000", "Black Onyx")}
                        className="group border border-white/10 rounded-2xl p-4 bg-zinc-950/80 cursor-pointer flex flex-col gap-4 transition-all hover:-translate-y-1 hover:border-white/30"
                      >
                        <div className="w-full aspect-square bg-[#000000] border border-white/10 rounded-xl" />
                        <div className="flex flex-col leading-none gap-1.5">
                          <span className="font-sans text-xs font-bold text-white">Black Onyx</span>
                          <span className="font-mono text-[10px] text-white/50 group-hover:text-[#14b8a6] transition-colors">#000000</span>
                        </div>
                      </div>

                      {/* White Core */}
                      <div 
                        onClick={() => triggerCopy("#ffffff", "Core Snow")}
                        className="group border border-white/10 rounded-2xl p-4 bg-zinc-950/80 cursor-pointer flex flex-col gap-4 transition-all hover:-translate-y-1 hover:border-white/30"
                      >
                        <div className="w-full aspect-square bg-[#ffffff] border border-white/10 rounded-xl" />
                        <div className="flex flex-col leading-none gap-1.5">
                          <span className="font-sans text-xs font-bold text-white">Core Snow</span>
                          <span className="font-mono text-[10px] text-white/50 group-hover:text-[#14b8a6] transition-colors">#ffffff</span>
                        </div>
                      </div>

                      {/* Emerald Flare */}
                      <div 
                        onClick={() => triggerCopy("#14b8a6", "Emerald Flow")}
                        className="group border border-white/10 rounded-2xl p-4 bg-zinc-950/80 cursor-pointer flex flex-col gap-4 transition-all hover:-translate-y-1 hover:border-white/30"
                      >
                        <div className="w-full aspect-square bg-[#14b8a6] border border-white/10 rounded-xl" />
                        <div className="flex flex-col leading-none gap-1.5">
                          <span className="font-sans text-xs font-bold text-white">Emerald Flow</span>
                          <span className="font-mono text-[10px] text-white/50 group-hover:text-[#14b8a6] transition-colors">#14b8a6</span>
                        </div>
                      </div>

                      {/* Coral Flare */}
                      <div 
                        onClick={() => triggerCopy("#ff7f50", "Coral Flare")}
                        className="group border border-white/10 rounded-2xl p-4 bg-zinc-950/80 cursor-pointer flex flex-col gap-4 transition-all hover:-translate-y-1 hover:border-white/30"
                      >
                        <div className="w-full aspect-square bg-[#ff7f50] border border-white/10 rounded-xl" />
                        <div className="flex flex-col leading-none gap-1.5">
                          <span className="font-sans text-xs font-bold text-white">Coral Flare</span>
                          <span className="font-mono text-[10px] text-white/50 group-hover:text-[#14b8a6] transition-colors">#ff7f50</span>
                        </div>
                      </div>

                    </div>

                    {/* Theme Map */}
                    <div className="mt-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col gap-3">
                      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">SYSTEM TAILWIND VARS</span>
                      <div className="flex flex-col gap-2 font-mono text-xs">
                        <div className="flex justify-between py-1.5 border-b border-white/5">
                          <span className="text-white/60">--color-onyx:</span>
                          <span className="text-white">rgb(0, 0, 0)</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-white/5">
                          <span className="text-white/60">--color-emerald-glowing:</span>
                          <span className="text-white">rgb(20, 184, 166)</span>
                        </div>
                        <div className="flex justify-between py-1.5">
                          <span className="text-white/60">--color-deep-amber:</span>
                          <span className="text-white">rgb(255, 127, 80)</span>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* TYPOGRAPHY SYSTEM TAB */}
                {activeTab === "typography" && (
                  <div className="text-left flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-xs text-[#14b8a6] uppercase tracking-widest font-black">DESIGN TOKENS</span>
                      <h2 className="font-cabinet text-3xl md:text-4xl font-black text-white tracking-tight">
                        Typography System
                      </h2>
                    </div>

                    {/* Interactive Sandbox for Font Testing */}
                    <div className="p-6 bg-[#14b8a6]/5 border border-[#14b8a6]/20 rounded-2xl flex flex-col gap-3">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#14b8a6] font-bold">LIVE SANDBOX TYPING</span>
                      <input 
                        type="text" 
                        value={sandboxText} 
                        onChange={(e) => setSandboxText(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 px-4 py-3 rounded-lg text-sm font-sans text-white focus:outline-none focus:border-white/30"
                      />
                    </div>

                    {/* Display styles rendering live sandbox */}
                    <div className="flex flex-col gap-6 mt-2">
                      
                      {/* Family 1: Cabinet Grotesk / Space Grotesk Display Headings */}
                      <div className="pb-6 border-b border-white/5">
                        <span className="font-mono text-[10px] text-white/40 block mb-2">DISPLAY TYPEFACE (Cabinet Grotesk ExtraBold)</span>
                        <span className="font-cabinet font-black text-3xl md:text-5xl text-white tracking-tight leading-none block">
                          {sandboxText}
                        </span>
                      </div>

                      {/* Family 2: Inter Sans-serif Body */}
                      <div className="pb-6 border-b border-white/5">
                        <span className="font-mono text-[10px] text-white/40 block mb-2">BODY CONTENT TYPEFACE (Inter Sans Medium)</span>
                        <span className="font-sans font-medium text-base text-white/80 block">
                          {sandboxText}
                        </span>
                      </div>

                      {/* Family 3: JetBrains Mono metadata */}
                      <div>
                        <span className="font-mono text-[10px] text-white/40 block mb-2">SYSTEM METADATA TYPEFACE (JetBrains Mono)</span>
                        <span className="font-mono text-xs text-teal-400 block tracking-widest">
                          {sandboxText.toUpperCase()}
                        </span>
                      </div>

                    </div>
                  </div>
                )}

                {/* GRAPHIC LOGO SPECS TAB */}
                {activeTab === "logo-spec" && (
                  <div className="text-left flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-xs text-[#14b8a6] uppercase tracking-widest font-black">VECTOR SPECIFICATIONS</span>
                      <h2 className="font-cabinet text-3xl md:text-4xl font-black text-white tracking-tight">
                        Organic Smooth Logo Grid
                      </h2>
                    </div>

                    {/* Brand Vector graphic on blueprint matrix background */}
                    <div className="relative border border-teal-500/30 rounded-2xl p-8 bg-zinc-950 flex items-center justify-center overflow-hidden min-h-[160px]">
                      {/* Engineering/CAD line templates */}
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:12px_12px]" />
                      <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-teal-500/15" />
                      <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-teal-500/15" />
                      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-teal-500/15 animate-pulse" />
                      <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-teal-500/15" />
                      
                      {/* Center render of Logo */}
                      <div className="relative text-white flex flex-col items-center select-none scale-125 md:scale-150">
                        <div className="flex items-center">
                          <svg
                            width="145"
                            height="52"
                            viewBox="0 0 500 220"
                            className="text-white fill-current overflow-visible"
                          >
                            <defs>
                              <mask id="panda-face-mask-docs">
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
                            <g mask="url(#panda-face-mask-docs)">
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
                      </div>
                    </div>

                    {/* Clipboard copy for raw SVG node */}
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center bg-white/[0.04] px-4 py-2 mt-4 rounded-t-xl border-t border-x border-white/10 font-mono text-[11px] text-white/50">
                        <span className="flex items-center gap-1.5"><Monitor size={12} /> Inline Vector SVG Code</span>
                        <button 
                          onClick={() => {
                            const raw = `<svg width="130" height="56" viewBox="0 0 500 220" fill="currentColor">\n  <defs>\n    <mask id="panda-face-mask">\n      <rect width="500" height="220" fill="white" />\n      <ellipse cx="114" cy="112" rx="12" ry="17" transform="rotate(-24 114 112)" fill="black" />\n      <ellipse cx="202" cy="112" rx="12" ry="17" transform="rotate(24 202 112)" fill="black" />\n    </mask>\n  </defs>\n  <circle cx="86" cy="65" r="17" />\n  <circle cx="230" cy="65" r="17" />\n  <g mask="url(#panda-face-mask)">\n    <circle cx="114" cy="112" r="42" />\n    <circle cx="202" cy="112" r="42" />\n  </g>\n  <path d="M 82,112 L 82,176 C 82,192 72,198 62,190" fill="none" stroke="currentColor" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />\n  <path d="M 234,112 L 234,158 C 234,166 242,168 248,162" fill="none" stroke="currentColor" strokeWidth="21" strokeLinecap="round" strokeLinejoin="round" />\n  <path d="M 144,146 Q 158,157 172,146" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />\n  <path d="M 272,148 L 272,112 C 272,94 286,82 302,82 C 318,82 326,94 326,112 L 326,148" fill="none" stroke="currentColor" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />\n  <path d="M 374,146 C 356,146 342,132 342,114 C 342,96 356,82 374,82" fill="none" stroke="currentColor" strokeWidth="22" strokeLinecap="round" />\n  <path d="M 374,50 L 374,148" fill="none" stroke="currentColor" strokeWidth="22" strokeLinecap="round" />\n  <line x1="412" y1="88" x2="456" y2="142" stroke="currentColor" strokeWidth="22" strokeLinecap="round" />\n  <line x1="412" y1="142" x2="456" y2="88" stroke="currentColor" strokeWidth="22" strokeLinecap="round" />\n</svg>`;
                            triggerCopy(raw, "Mascot Design Logo SVG");
                          }}
                          className="hover:text-white transition-colors flex items-center gap-1"
                        >
                          <Copy size={12} /> COPY MARKUP
                        </button>
                      </div>
                      <pre className="bg-zinc-950 p-5 rounded-b-xl border border-white/10 font-mono text-xs overflow-x-auto text-teal-400">
                        {`<!-- High-Fidelity pandx Brand Vector Logo Markup -->\n<svg width="130" height="56" viewBox="0 0 500 220" fill="currentColor">\n  <defs>\n    <mask id="panda-face-mask">\n      <rect width="500" height="220" fill="white" />\n      <ellipse cx="114" cy="112" rx="12" ... />\n      ...\n    </mask>\n  </defs>\n  ...\n</svg>`}
                      </pre>
                    </div>

                  </div>
                )}

                {/* INTERACTIVE 3D CONFIG TAB */}
                {activeTab === "3d-config" && (
                  <div className="text-left flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-xs text-[#14b8a6] uppercase tracking-widest font-black">DEVELOPMENT TOOLS</span>
                      <h2 className="font-cabinet text-3xl md:text-4xl font-black text-white tracking-tight">
                        3D WebGL Web Audio Controller
                      </h2>
                    </div>

                    <p className="font-sans text-xs text-white/60 leading-relaxed md:max-w-xl">
                      Adjust coordinates in the panel below to simulate modifications to our WebGL liquid metallic sculpture, testing variable bindings and physics parameters.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/[0.02] border border-white/5 p-6 rounded-2xl mt-4">
                      
                      {/* Controller sliders */}
                      <div className="flex flex-col gap-5">
                        
                        {/* Distortion Factor */}
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center text-xs font-mono text-white/60 font-medium">
                            <span className="uppercase">DISTORTION RANGE:</span>
                            <span className="text-[#14b8a6] font-bold">{warpFactor.toFixed(2)}</span>
                          </div>
                          <input 
                            type="range" 
                            min="0.1" 
                            max="3.0" 
                            step="0.05"
                            value={warpFactor} 
                            onChange={(e) => setWarpFactor(parseFloat(e.target.value))}
                            className="accent-[#14b8a6] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        {/* Orbit Scale Factor */}
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center text-xs font-mono text-white/60 font-medium">
                            <span className="uppercase">ROTATION SPEED MULTIPLIER:</span>
                            <span className="text-[#ff7f50] font-bold">{scaleFactor.toFixed(2)}x</span>
                          </div>
                          <input 
                            type="range" 
                            min="0.5" 
                            max="4.0" 
                            step="0.1"
                            value={scaleFactor} 
                            onChange={(e) => setScaleFactor(parseFloat(e.target.value))}
                            className="accent-[#ff7f50] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        {/* Theme Accent selector */}
                        <div className="flex flex-col gap-2">
                          <span className="text-xs font-mono text-white/60 uppercase">CORE SHADER COLOR BINDING:</span>
                          <div className="flex gap-2">
                            {["#14b8a6", "#ff7f50", "#a855f7", "#ec4899"].map((hex) => (
                              <button 
                                key={hex}
                                onClick={() => setSphereColor(hex)}
                                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                                  sphereColor === hex ? "border-white" : "border-transparent"
                                }`}
                                style={{ backgroundColor: hex }}
                              />
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Display live model rendering mock visualization or variables state map */}
                      <div className="border border-white/10 p-5 rounded-2xl bg-zinc-950 flex flex-col gap-3 font-mono text-xs">
                        <span className="text-[10px] text-white/40 uppercase tracking-widest block border-b border-white/5 pb-2">VERTEX SHADER STATE</span>
                        <div className="flex justify-between">
                          <span className="text-white/50">uniform float uTime;</span>
                          <span className="text-teal-400">Math.sin(elapsed)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50">uniform float uDistortion;</span>
                          <span className="text-teal-400">{warpFactor.toFixed(3)}f</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50">uniform vec3 uColor;</span>
                          <span style={{ color: sphereColor }} className="font-bold">{sphereColor}</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-[#ff7f50] font-bold mt-2 border-t border-white/5 pt-2">
                          <span>SYSTEM LOG:</span>
                          <span className="animate-pulse">REACTIVE METALLIC BINDING READY</span>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* GLASMOPRHIC CODE SNIPPETS TAB */}
                {activeTab === "snippets" && (
                  <div className="text-left flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-xs text-[#14b8a6] uppercase tracking-widest font-black">DEVELOPMENT TOOLS</span>
                      <h2 className="font-cabinet text-3xl md:text-4xl font-black text-white tracking-tight">
                        Framer Glassmorphic Cards
                      </h2>
                    </div>

                    <p className="font-sans text-xs text-white/60 leading-relaxed max-w-xl">
                      Deploy premium responsive physical cards with glassmorphic backing layouts. Perfect for landing grids.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-4">
                      
                      {/* Live View */}
                      <div className="border border-white/10 p-8 rounded-2xl bg-white/[0.01] backdrop-blur-md relative overflow-hidden flex flex-col gap-4">
                        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-teal-500/10 blur-xl" />
                        <span className="font-mono text-[9px] uppercase tracking-wide text-[#14b8a6] block">CARD PREVIEW</span>
                        <h3 className="font-cabinet text-lg font-bold text-white leading-tight">Interactive Glass Block</h3>
                        <p className="font-sans text-xs text-white/70 leading-relaxed">
                          Hover over this card to witness simulated real-time inertia alignment using standard hardware-accelerated transforms.
                        </p>
                      </div>

                      {/* Code Block Copy */}
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center bg-white/[0.04] px-4 py-2 rounded-t-xl border-t border-x border-white/10 font-mono text-[11px] text-white/50">
                          <span className="flex items-center gap-1.5"><FileCode size={12} /> React GlassCard.tsx</span>
                          <button 
                            onClick={() => {
                              const snippet = `export const GlassCard = () => (\n  <div className="bg-white/[0.01] border border-white/10 backdrop-blur-md p-6 rounded-2xl relative overflow-hidden">\n    {/* Content */}\n  </div>\n);`;
                              triggerCopy(snippet, "Glass Snippet");
                            }}
                            className="hover:text-white transition-colors flex items-center gap-1"
                          >
                            <Copy size={12} /> COPY CARD STYLE
                          </button>
                        </div>
                        <pre className="bg-zinc-950 p-5 rounded-b-xl border border-white/10 font-mono text-xs overflow-x-auto text-teal-400">
                          {`export const GlassCard = () => (\n  <div className="bg-white/[0.01] border border-white/10 backdrop-blur-md p-8 rounded-2xl relative overflow-hidden flex flex-col gap-4 shadow-xl">\n    <div className="absolute top-0 right-0 w-24 h-24 bg-[#14b8a6]/10 blur-xl rounded-full" />\n    <h3 className="font-cabinet text-lg font-bold">Liquid Card</h3>\n  </div>\n);`}
                        </pre>
                      </div>

                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </div>
  );
}
