import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import About from "./components/About";
import Work from "./components/Work";
import Process from "./components/Process";
import Testimonial from "./components/Testimonial";
import Contact from "./components/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Docs from "./components/Docs";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import { audioEngine } from "./utils/audio";

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "docs" | "privacy-policy">("home");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("theme");
    return (saved === "light" || saved === "dark") ? saved : "dark";
  });
  const [isLoading, setIsLoading] = useState(true);

  // Lock scrolling when loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  // Handle back button / scroll reset when view changes
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentView]);

  // Handle theme updates on document classList
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      {/* High performance dynamic magnetic cursor */}
      <CustomCursor />

      {/* Absolute Fullscreen Preloader */}
      <Preloader theme={theme} onComplete={() => {
        setIsLoading(false);
        audioEngine.playCinematicSwell();
        // Force a resize/reflow event so that Framer Motion useScroll recalculates correct boundaries
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 150);
      }} />

      <div className={`min-h-screen flex flex-col font-sans selection:bg-teal-500 selection:text-black antialiased transition-all duration-700 ${
        theme === "dark" ? "bg-black text-white" : "bg-[#fbfbf9] text-[#111111]"
      } ${isLoading ? "opacity-0 select-none pointer-events-none" : "opacity-100"}`}>
        {/* Sticky Top Navbar */}
        <Navbar currentView={currentView} onNavigate={setCurrentView} theme={theme} onToggleTheme={toggleTheme} />

        {/* Main Container */}
        <div className="flex-grow pt-[72px]">
          {currentView === "home" ? (
            <>
              {/* Dark/Light Hero Section with Watermarks */}
              <Hero theme={theme} />

              {/* Continuous Marquee Banner */}
              <Marquee theme={theme} />

              {/* Services Catalog */}
              <Services theme={theme} />

              {/* Split Statement About */}
              <About theme={theme} />

              {/* Horizontal Projects Portfolio */}
              <Work theme={theme} />

              {/* Process Blueprint Timeline */}
              <Process theme={theme} />

              {/* Atmospheric Block Quotes */}
              <Testimonial theme={theme} />

              {/* Sharp-Edged Contact Forms */}
              <Contact theme={theme} />
            </>
          ) : currentView === "docs" ? (
            <Docs onNavigateHome={() => setCurrentView("home")} theme={theme} />
          ) : (
            /* Static legal layouts */
            <PrivacyPolicy onNavigateHome={() => setCurrentView("home")} theme={theme} />
          )}
        </div>

        {/* Standard Footer */}
        <Footer currentView={currentView} onNavigate={setCurrentView} theme={theme} />
      </div>
    </>
  );
}

