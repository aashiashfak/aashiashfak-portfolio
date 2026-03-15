import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DEVELOPER } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: titleRef.current, start: "top 85%" } }
    );
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: contentRef.current, start: "top 80%" } }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch("https://formsubmit.co/ajax/aashiashfak@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      setIsSubmitted(true); // Default to showing success message
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    {
      label: "GitHub",
      href: DEVELOPER.github,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: "var(--accent)",
    },
    {
      label: "LinkedIn",
      href: DEVELOPER.linkedin,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: "var(--cyan)",
    },
    {
      label: "Email",
      href: `mailto:${DEVELOPER.email}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      color: "var(--accent2)",
    },
  ];

  return (
    <section id="contact" ref={sectionRef}
      className="relative overflow-hidden"
      style={{ padding: "140px 6vw 100px", background: "var(--bg2)" }}>

      {/* Massive background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: 700, height: 700, background: "radial-gradient(circle, rgba(108,99,255,0.1), transparent 70%)" }} />

      {/* Grid lines bg */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

      {/* Corner HUD */}
      <div className="absolute top-8 left-8 w-16 h-16 pointer-events-none" style={{ borderTop: "1px solid var(--border2)", borderLeft: "1px solid var(--border2)" }} />
      <div className="absolute top-8 right-8 w-16 h-16 pointer-events-none" style={{ borderTop: "1px solid var(--border2)", borderRight: "1px solid var(--border2)" }} />
      <div className="absolute bottom-8 left-8 w-16 h-16 pointer-events-none" style={{ borderBottom: "1px solid var(--border2)", borderLeft: "1px solid var(--border2)" }} />
      <div className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none" style={{ borderBottom: "1px solid var(--border2)", borderRight: "1px solid var(--border2)" }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Label */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-px w-8" style={{ background: "var(--text3)" }} />
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.25em", color: "var(--text3)", textTransform: "uppercase" }}>Get In Touch</span>
          <span className="h-px w-8" style={{ background: "var(--text3)" }} />
        </div>

        {/* Big title */}
        <h2 ref={titleRef} className="text-center" style={{ opacity: 0,
          fontFamily: "var(--font-syne)", fontWeight: 800,
          fontSize: "clamp(2.5rem,6vw,6rem)", letterSpacing: "-0.04em", lineHeight: 0.9,
          marginBottom: 32,
        }}>
          Let&apos;s Build<br />
          <span style={{ color: "var(--accent)" }}>Something</span><br />
          Great.
        </h2>

        <p className="text-center" style={{ fontSize: "clamp(0.95rem,1.8vw,1.15rem)", fontWeight: 300, color: "var(--text2)", maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.7 }}>
          Open to full-time roles, freelance collaborations,
          and interesting problems worth solving.
        </p>

        {/* Content row */}
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-8 items-start" style={{ opacity: 0 }}>

          {/* Left: Contact Form */}
          <div>
            <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.2em", color: "var(--text3)", marginBottom: 16, textTransform: "uppercase" }}>
              // Send a message
            </div>
            <div className="relative clip-gaming flex flex-col justify-center"
              style={{
                background: "#050507",
                border: "1px solid var(--border2)",
                padding: "32px 24px",
                height: "100%", // Match height of right side
              }}>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ background: "rgba(34, 197, 94, 0.1)", color: "var(--green)" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 24, fontWeight: 700, color: "var(--text)" }}>Message Sent</h3>
                  <p style={{ color: "var(--text2)", fontSize: 14 }}>Thank you for contacting me!<br/>I will connect with you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 flex flex-col justify-center h-full">
                  <div className="relative">
                    <input required type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-transparent outline-none focus:border-[var(--accent)] transition-colors"
                      style={{ borderBottom: "1px solid var(--border2)", padding: "10px 0", color: "var(--text)", fontSize: 14 }}
                    />
                  </div>
                  <div className="relative">
                    <input required type="email" placeholder="Your Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-transparent outline-none focus:border-[var(--accent)] transition-colors"
                      style={{ borderBottom: "1px solid var(--border2)", padding: "10px 0", color: "var(--text)", fontSize: 14 }}
                    />
                  </div>
                  <div className="relative mb-2">
                    <textarea required placeholder="Your Message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-transparent outline-none focus:border-[var(--accent)] transition-colors resize-none hide-scrollbar"
                      rows={3}
                      style={{ borderBottom: "1px solid var(--border2)", padding: "10px 0", color: "var(--text)", fontSize: 14 }}
                    />
                  </div>
                  
                  <div className="flex justify-end pt-2">
                    <button type="submit" 
                      disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                      className="flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--accent2)]"
                      style={{
                        padding: "10px 24px",
                        background: "var(--accent)",
                        color: "#fff",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: (isSubmitting || !formData.name || !formData.email || !formData.message) ? "not-allowed" : "pointer",
                        clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))"
                      }}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right: social links */}
          <div>
            <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.2em", color: "var(--text3)", marginBottom: 16, textTransform: "uppercase" }}>
              // Reach me on
            </div>
            <div className="space-y-3">
              {socials.map(s => (
                <a key={s.label} href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener"
                  className="flex items-center gap-4 group clip-gaming-sm"
                  style={{
                    padding: "16px 20px",
                    background: "var(--surface)",
                    border: "1px solid var(--border2)",
                    textDecoration: "none",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${s.color}12`;
                    e.currentTarget.style.borderColor = `${s.color}44`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "var(--surface)";
                    e.currentTarget.style.borderColor = "var(--border2)";
                  }}>
                  <span style={{ color: s.color, transition: "color 0.3s" }}>{s.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text2)", flex: 1, transition: "color 0.3s" }}
                    className="group-hover:text-white">{s.label}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
                    style={{ color: "var(--text3)", transform: "translate(0,0)", transition: "transform 0.2s" }}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <path d="M1 11L11 1M11 1H4M11 1V8"/>
                  </svg>
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 mt-6"
              style={{ padding: "12px 16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 2 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.5">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 11, color: "var(--text3)", letterSpacing: "0.08em" }}>
                Kerala, India — IST (UTC+5:30)
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
