import React, { useState } from "react";
import { submitLead } from "../lib/supabase";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactProps {
  theme: "dark" | "light";
}

export default function Contact({ theme }: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!name.trim()) tempErrors.name = "Name is required";
    
    if (!email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = "Please specify a valid email address";
    }
    
    if (!message.trim()) tempErrors.message = "Message text is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setErrorMessage("");

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await submitLead(name, email, company, message);
      if (response && response.success) {
        setSubmitStatus("success");
        // Clear fields on success
        setName("");
        setEmail("");
        setCompany("");
        setMessage("");
      }
    } catch (err: any) {
      console.error("Submission failed:", err);
      setSubmitStatus("error");
      setErrorMessage(err.message || "Something went wrong. Try again or email us directly at hariyanipal2212@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={`py-24 md:py-32 px-6 md:px-12 border-t relative overflow-hidden transition-colors duration-500 ${
        theme === "dark" 
          ? "bg-black text-white border-white/10" 
          : "bg-[#fbfbf9] text-black border-black/10"
      }`}
    >
      {/* Structural background graphics */}
      <div className="absolute left-[-20%] top-[-20%] w-[500px] h-[500px] bg-emerald-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10">
        
        {/* Left Side: Headline + Info (5 Cols) */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col items-start justify-between gap-12">
          <div className="flex flex-col items-start gap-4">
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${theme === "dark" ? "bg-white" : "bg-black"}`} />
              <span className={`font-mono text-sm font-semibold uppercase tracking-[0.22em] ${theme === "dark" ? "text-white/60" : "text-black/60"}`}>
                GET IN TOUCH
              </span>
            </div>

            <h2 className={`font-cabinet text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-left leading-tight mb-4 ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}>
              Let's build something together.
            </h2>
            
            <p className={`font-sans text-base text-left leading-relaxed max-w-[420px] mb-8 ${
              theme === "dark" ? "text-white/70" : "text-black/70"
            }`}>
              We'd love to hear about your project. Please fill out our form, and our design partners will connect with you within 24 hours.
            </p>
          </div>

          {/* Core Team Contact Label */}
          <div className={`hidden xl:flex flex-col items-start gap-2 pl-6 text-left border-l-2 ${
            theme === "dark" ? "border-white/20" : "border-black/20"
          }`}>
            <span className={`font-mono text-[9px] uppercase tracking-widest ${theme === "dark" ? "text-white/40" : "text-black/40"}`}>
              EMAIL CHANNEL
            </span>
            <a
              href="mailto:hariyanipal2212@gmail.com"
              className={`font-general text-sm border-b transition-all pb-1 font-medium ${
                theme === "dark" 
                  ? "text-white hover:text-white/70 border-white/20 hover:border-white" 
                  : "text-zinc-900 hover:text-zinc-900/60 border-black/20 hover:border-black"
              }`}
            >
              hariyanipal2212@gmail.com
            </a>
          </div>
        </div>

        {/* Right Side: High-fidelity Contact Form (7 Cols) */}
        <div className={`lg:col-span-12 xl:col-span-7 p-8 md:p-10 border rounded-xl relative transition-colors duration-500 ${
          theme === "dark"
            ? "bg-zinc-950/40 border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.4)]"
            : "bg-white border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
        }`}>
          
          {submitStatus === "success" ? (
            /* Success State Overlay with clean fade-in */
            <div
              id="contact-success"
              className="flex flex-col items-center justify-center min-h-[400px] text-center gap-6"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                theme === "dark" ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]" : "bg-black text-white shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
              }`}>
                <Sparkles size={28} />
              </div>
              <h3 className={`font-cabinet text-3xl font-extrabold tracking-tight ${theme === "dark" ? "text-white" : "text-black"}`}>
                Message Received
              </h3>
              <p className={`font-sans text-base max-w-[400px] leading-relaxed ${theme === "dark" ? "text-white/75" : "text-black/75"}`}>
                We got your message. We'll be in touch soon. <span className="font-mono font-black">✦</span>
              </p>
              <button
                onClick={() => setSubmitStatus("idle")}
                className={`font-mono text-xs uppercase tracking-widest underline mt-6 transition-colors ${
                  theme === "dark" ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"
                }`}
              >
                Send another message
              </button>
            </div>
          ) : (
            /* Contact Form Fields */
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left" noValidate>
              
              {/* Name field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className={`font-mono text-[11px] uppercase tracking-widest ${theme === "dark" ? "text-white/50" : "text-black/55"}`}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Marcus Thorne"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`px-4 py-3.5 outline-none font-sans text-sm focus:bg-transparent transition-all border w-full ${
                    theme === "dark"
                      ? "bg-black text-white hover:border-white/30 " + (errors.name ? "border-red-500 focus:border-red-500 ring-2 ring-red-500/20" : "border-white/20 focus:border-white focus:ring-4 focus:ring-white/10")
                      : "bg-zinc-50 text-black hover:border-black/30 " + (errors.name ? "border-red-500 focus:border-red-500 ring-2 ring-red-500/20" : "border-black/20 focus:border-black focus:ring-4 focus:ring-black/10")
                  }`}
                  style={{ borderRadius: "0px" }} // Mandated sharp edges
                  disabled={isSubmitting}
                />
                {errors.name && <span className="text-red-500 font-mono text-xs mt-1">{errors.name}</span>}
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className={`font-mono text-[11px] uppercase tracking-widest ${theme === "dark" ? "text-white/50" : "text-black/55"}`}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="e.g. marcus@auratech.io"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`px-4 py-3.5 outline-none font-sans text-sm focus:bg-transparent transition-all border w-full ${
                    theme === "dark"
                      ? "bg-black text-white hover:border-white/30 " + (errors.email ? "border-red-500 focus:border-red-500 ring-2 ring-red-500/20" : "border-white/20 focus:border-white focus:ring-4 focus:ring-white/10")
                      : "bg-zinc-50 text-black hover:border-black/30 " + (errors.email ? "border-red-500 focus:border-red-500 ring-2 ring-red-500/20" : "border-black/20 focus:border-black focus:ring-4 focus:ring-black/10")
                  }`}
                  style={{ borderRadius: "0px" }} // Mandated sharp edges
                  disabled={isSubmitting}
                />
                {errors.email && <span className="text-red-500 font-mono text-xs mt-1">{errors.email}</span>}
              </div>

              {/* Company field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="company" className={`font-mono text-[11px] uppercase tracking-widest ${theme === "dark" ? "text-white/40" : "text-black/45"}`}>
                  Company / Organization <span className="opacity-40">(Optional)</span>
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder="e.g. Aura Technologies"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={`px-4 py-3.5 border focus:bg-transparent focus:ring-4 outline-none font-sans text-sm transition-all w-full ${
                    theme === "dark"
                      ? "bg-black text-white hover:border-white/30 border-white/25 focus:border-white focus:ring-white/10"
                      : "bg-zinc-50 text-black hover:border-black/30 border-black/20 focus:border-black focus:ring-black/10"
                  }`}
                  style={{ borderRadius: "0px" }} // Mandated sharp edges
                  disabled={isSubmitting}
                />
              </div>

              {/* Message textarea field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className={`font-mono text-[11px] uppercase tracking-widest ${theme === "dark" ? "text-white/50" : "text-black/55"}`}>
                  Project Brief <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about the features, scope, or design updates you need built in Figma..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  className={`px-4 py-3.5 outline-none font-sans text-sm focus:bg-transparent transition-all border resize-none w-full ${
                    theme === "dark"
                      ? "bg-black text-white hover:border-white/30 " + (errors.message ? "border-red-500 focus:border-red-500 ring-2 ring-red-500/20" : "border-white/20 focus:border-white focus:ring-4 focus:ring-white/10")
                      : "bg-zinc-50 text-black hover:border-black/30 " + (errors.message ? "border-red-500 focus:border-red-500 ring-2 ring-red-500/20" : "border-black/20 focus:border-black focus:ring-4 focus:ring-black/10")
                  }`}
                  style={{ borderRadius: "0px" }} // Mandated sharp edges
                  disabled={isSubmitting}
                />
                {errors.message && <span className="text-red-500 font-mono text-xs mt-1">{errors.message}</span>}
              </div>

              {/* Submit panel holding submit button & feedback alerts */}
              <div className="flex flex-col gap-4 mt-2">
                <button
                  id="submit-message"
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 py-4 px-8 font-general text-xs font-bold uppercase tracking-widest rounded-full cursor-pointer hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-75 disabled:pointer-events-none ${
                    theme === "dark"
                      ? "bg-white text-black hover:bg-black hover:text-white hover:border border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                      : "bg-black text-white hover:bg-white hover:text-black hover:border border-black hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={14} />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>

                {submitStatus === "error" && (
                  <p className="text-red-500 font-mono text-xs leading-relaxed mt-2 text-center">
                    {errorMessage}
                  </p>
                )}
              </div>
            </form>
          )}

          {/* Mobile visible email fallback */}
          <div className={`flex xl:hidden flex-col items-center gap-2 border-t pt-8 mt-8 text-center bg-transparent ${
            theme === "dark" ? "border-white/10" : "border-black/10"
          }`}>
            <span className={`font-mono text-[9px] uppercase tracking-widest ${theme === "dark" ? "text-white/40" : "text-black/40"}`}>
              DIRECT EMAIL
            </span>
            <a href="mailto:hariyanipal2212@gmail.com" className={`font-general text-xs underline tracking-wider font-semibold ${
              theme === "dark" ? "text-white" : "text-zinc-900"
            }`}>
              hariyanipal2212@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
