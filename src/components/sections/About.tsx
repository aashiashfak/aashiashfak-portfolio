"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);

  const lines = [
    { text: <>I'm a <em style={{ color: "var(--text)", fontStyle: "normal", fontWeight: 500 }}>Python Full Stack Developer</em> passionate about crafting digital experiences that live at the intersection of design and engineering.</> },
    { text: <>Specializing in <strong style={{ color: "var(--accent3)", fontWeight: 400 }}>React, Django, and PostgreSQL</strong>, I build scalable platforms that handle real-world complexity with elegant solutions.</> },
    { text: <>From <em style={{ color: "var(--cyan)", fontStyle: "normal" }}>animated UI experiences</em> to containerized microservices with Docker and Redis — every layer of the stack is a canvas for creativity.</> },
  ];

  useEffect(() => {
    gsap.fromTo(avatarRef.current, { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: avatarRef.current, start: "top 80%" } });

    linesRef.current.forEach((line, i) => {
      const inner = line.querySelector("span");
      if (inner) {
        gsap.to(inner, {
          y: 0, duration: 1, ease: "power4.out", delay: i * 0.12,
          scrollTrigger: { trigger: line, start: "top 88%" }
        });
      }
    });
  }, []);

  return (
    <section id="about" ref={sectionRef}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center"
      style={{ padding: "120px 6vw", background: "var(--bg2)" }}>

      {/* Left: Avatar */}
      <div ref={avatarRef} className="relative" style={{ opacity: 0 }}>
        <div className="relative max-w-[420px] mx-auto md:mx-0" style={{ aspectRatio: "3/4" }}>
          {/* Corner decorations */}
          <div className="absolute -top-3 -left-3 w-10 h-10 z-10" style={{ borderTop: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" }} />
          <div className="absolute -bottom-3 -right-3 w-10 h-10 z-10" style={{ borderBottom: "1px solid var(--cyan)", borderRight: "1px solid var(--cyan)" }} />

          {/* Avatar block */}
          <div className="w-full h-full relative overflow-hidden flex items-end justify-center" style={{ background: "var(--bg)", borderRadius: 4 }}>
            {/* Grid bg */}
            <div className="absolute inset-0 z-0" style={{
              backgroundImage: "linear-gradient(rgba(108,99,255,0.06) 1px, transparent 1px), linear-gradient(90deg,rgba(108,99,255,0.06) 1px,transparent 1px)",
              backgroundSize: "40px 40px"
            }} />
            
            {/* You can replace the src with /avatar.png or /avatar.jpg depending on how you save it */ }
            <img 
              src="/aashi_ashfak.png" 
              alt="Aashi Ashfak"
              className="relative z-10 w-full h-full object-cover"
              style={{ filter: "contrast(1.05) brightness(0.95)" }}
            />

            {/* Scan line */}
            <div className="absolute left-0 right-0 h-px z-20 pointer-events-none" style={{ background: "linear-gradient(90deg,transparent,var(--accent),transparent)", animation: "scan 3s linear infinite", opacity: 0.3 }} />
          </div>

          {/* XP Badge */}
          <div className="absolute -bottom-4 -right-4 z-20 rounded-sm"
            style={{ background: "var(--bg3)", border: "1px solid var(--border2)", padding: "16px 20px" }}>
            <div className="text-gradient" style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "2.4rem", lineHeight: 1 }}>3+</div>
            <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, color: "var(--text3)", letterSpacing: "0.1em", marginTop: 4 }}>YRS EXPERIENCE</div>
          </div>
        </div>
      </div>

      {/* Right: Text */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="block h-px w-6" style={{ background: "var(--text3)" }} />
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.25em", color: "var(--text3)", textTransform: "uppercase" }}>About Me</span>
        </div>

        <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(2rem,5vw,4rem)", letterSpacing: "-0.03em", lineHeight: 0.95, marginBottom: 36 }}>
          Building<br /><span style={{ color: "var(--accent)" }}>the web</span><br />of tomorrow.
        </h2>

        <div className="space-y-5">
          {lines.map((line, i) => (
            <div key={i} ref={el => { if (el) linesRef.current[i] = el; }} className="overflow-hidden">
              <span className="block" style={{ fontSize: "clamp(0.95rem,1.5vw,1.1rem)", fontWeight: 300, color: "var(--text2)", lineHeight: 1.8, transform: "translateY(100%)" }}>
                {line.text}
              </span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 mt-10 overflow-hidden" style={{ border: "1px solid var(--border)", borderRadius: 4 }}>
          {[["4+", "Projects Shipped"], ["3+", "Years Coding"], ["7+", "Technologies"]].map(([n, l]) => (
            <div key={l} className="text-center" style={{ padding: "24px 16px", background: "var(--surface)", borderRight: "1px solid var(--border)" }}>
              <div className="text-gradient" style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "2rem" }}>{n}</div>
              <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, color: "var(--text3)", letterSpacing: "0.1em", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
