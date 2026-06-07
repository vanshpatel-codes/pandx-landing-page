interface PrivacyPolicyProps {
  onNavigateHome: () => void;
  theme: "dark" | "light";
}

export default function PrivacyPolicy({ onNavigateHome, theme }: PrivacyPolicyProps) {
  return (
    <main
      id="privacy-policy-view"
      className={`px-6 md:px-12 py-32 md:py-40 min-h-screen relative overflow-hidden grain-overlay transition-colors duration-500 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-zinc-900 border-t border-black/10"
      }`}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-start gap-12 relative z-10">
        
        {/* Back Link to Home */}
        <button
          onClick={onNavigateHome}
          className={`font-mono text-xs uppercase tracking-widest flex items-center gap-2 group cursor-pointer border-b border-transparent pb-0.5 transition-all text-left ${
            theme === "dark" ? "text-white/50 hover:text-white hover:border-white" : "text-black/50 hover:text-black hover:border-black"
          }`}
        >
          <span>←</span> Back to Main Site
        </button>

        {/* Title Block */}
        <div className={`flex flex-col items-start gap-4 border-b pb-8 w-full text-left ${theme === "dark" ? "border-white/10" : "border-black/10"}`}>
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${theme === "dark" ? "bg-white" : "bg-black"}`} />
            <span className={`font-mono text-xs uppercase tracking-[0.2em] ${theme === "dark" ? "text-white/60" : "text-black/65"}`}>
              LEGAL GENERAL
            </span>
          </div>
          
          <h1 className={`font-cabinet text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight m-0 ${theme === "dark" ? "text-white" : "text-black"}`}>
            Privacy Policy
          </h1>
          
          <span className={`font-mono text-[11px] uppercase tracking-widest ${theme === "dark" ? "text-white/40" : "text-black/40"}`}>
            Last updated: June 2026 // Version 1.0_PROD
          </span>
        </div>

        {/* Policy Contents Grid */}
        <div className="flex flex-col gap-10 text-left w-full">
          
          {/* Section 1 */}
          <section className="flex flex-col items-start gap-4">
            <h2 className={`font-cabinet text-xl md:text-2xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-black"}`}>
              1. Data Collected
            </h2>
            <p className={`font-sans text-base leading-relaxed max-w-2xl ${theme === "dark" ? "text-white/70" : "text-black/70"}`}>
              We collect information you directly provide when you submit our project contact form. This includes your name, email address, company name (if applicable), and any text outline specified within your project brief.
            </p>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col items-start gap-4">
            <h2 className={`font-cabinet text-xl md:text-2xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-black"}`}>
              2. How We Use Your Data
            </h2>
            <p className={`font-sans text-base leading-relaxed max-w-2xl ${theme === "dark" ? "text-white/70" : "text-black/70"}`}>
              Any details submitted are strictly used to coordinate brand design briefs, evaluate consultancy metrics, and discuss project partnerships directly with you. We do not use your email or personal information for automated spam or marketing lists.
            </p>
          </section>

          {/* Section 3 */}
          <section className="flex flex-col items-start gap-4">
            <h2 className={`font-cabinet text-xl md:text-2xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-black"}`}>
              3. Secure Storage & Third Parties
            </h2>
            <p className={`font-sans text-base leading-relaxed max-w-2xl ${theme === "dark" ? "text-white/70" : "text-black/70"}`}>
              Submissions are stored securely using our Postgres server, protected behind Row-Level Security parameters. We never share, sell, rent, or distribute your email or business credentials to advertising agencies or any external third parties.
            </p>
          </section>

          {/* Section 4 */}
          <section className="flex flex-col items-start gap-4">
            <h2 className={`font-cabinet text-xl md:text-2xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-black"}`}>
              4. Your Personal Rights
            </h2>
            <p className={`font-sans text-base leading-relaxed max-w-2xl ${theme === "dark" ? "text-white/70" : "text-black/70"}`}>
              You retain full rights regarding your data. You may contact us at any time to request a complete export of your submissions, or request that we permanently delete all records of your correspondence from our databases.
            </p>
          </section>

          {/* Section 5 */}
          <section className="flex flex-col items-start gap-4">
            <h2 className={`font-cabinet text-xl md:text-2xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-black"}`}>
              5. Contact Us
            </h2>
            <p className={`font-sans text-base leading-relaxed max-w-2xl pb-6 ${theme === "dark" ? "text-white/70" : "text-black/70"}`}>
              If you have any questions or concern regarding this policy or the privacy of your data, please email our lead compliance advisor at:{" "}
              <a href="mailto:hariyanipal2212@gmail.com" className={`font-semibold underline ${theme === "dark" ? "text-white hover:text-white/70" : "text-black hover:text-black/70"}`}>
                hariyanipal2212@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
