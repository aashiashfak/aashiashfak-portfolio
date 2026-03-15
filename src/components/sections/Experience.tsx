"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Line fill on scroll
    if (lineRef.current) {
      gsap.fromTo(lineRef.current, { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        }
      });
    }

    // Items reveal
    itemsRef.current.filter(Boolean).forEach((el, i) => {
      const isLeft = i % 2 === 0;
      gsap.fromTo(el,
        { opacity: 0, x: isLeft ? -30 : 30 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" }
        }
      );
    });
  }, []);

  return (
    <section id="experience" ref={sectionRef}
      className="relative"
      style={{ padding: "120px 6vw", background: "var(--bg)" }}>

      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="block h-px w-6" style={{ background: "var(--text3)" }} />
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.25em", color: "var(--text3)", textTransform: "uppercase" }}>Journey</span>
        </div>
        <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(2.5rem,6vw,5.5rem)", letterSpacing: "-0.03em", lineHeight: 0.95 }}>
          Experience &amp;<br /><span style={{ color: "var(--cyan)" }}>Evolution</span>
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative hidden md:grid" style={{ gridTemplateColumns: "1fr 2px 1fr", gap: "0 48px" }}>

        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: "var(--border2)", transform: "translateX(-50%)" }}>
          <div ref={lineRef} className="absolute top-0 left-0 right-0"
            style={{ background: "linear-gradient(to bottom,var(--accent),var(--cyan))", transformOrigin: "top", transform: "scaleY(0)", height: "100%" }} />
        </div>

        {/* Left column items */}
        <div className="pr-12 space-y-16">
          {EXPERIENCE.filter(e => e.side === "left").map((exp, i) => (
            <div key={i} ref={el => { if (el) itemsRef.current[i * 2] = el; }} style={{ opacity: 0 }}>
              <TimelineItem exp={exp} align="right" />
            </div>
          ))}
        </div>

        {/* Spacer for center line */}
        <div />

        {/* Right column items */}
        <div className="pl-12 space-y-16" style={{ paddingTop: 80 }}>
          {EXPERIENCE.filter(e => e.side === "right").map((exp, i) => (
            <div key={i} ref={el => { if (el) itemsRef.current[i * 2 + 1] = el; }} style={{ opacity: 0 }}>
              <TimelineItem exp={exp} align="left" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: single column */}
      <div className="md:hidden space-y-8 relative pl-8" style={{ borderLeft: "1px solid var(--border2)" }}>
        {EXPERIENCE.map((exp, i) => (
          <div key={i}>
            <div className="absolute left-0 w-2 h-2 rounded-full -translate-x-1/2" style={{ background: exp.color || "var(--accent)", marginTop: 4 }} />
            <TimelineItem exp={exp} align="left" />
          </div>
        ))}
      </div>
    </section>
  );
}

function TimelineItem({ exp, align }: { exp: (typeof EXPERIENCE)[0]; align: "left" | "right" }) {
  return (
    <div className={`relative ${align === "right" ? "text-right" : "text-left"}`}>
      {/* Dot */}
      <div style={{
        position: "absolute",
        [align === "right" ? "right" : "left"]: align === "right" ? "-60px" : "-60px",
        top: 4,
        width: 10, height: 10, borderRadius: "50%",
        background: exp.color || "var(--accent)",
        boxShadow: `0 0 16px ${exp.color || "var(--accent)"}`,
      }} />
      <div style={{ position: "absolute", [align === "right" ? "right" : "left"]: align === "right" ? "-66px" : "-66px", top: -2, width: 22, height: 22, borderRadius: "50%", border: `1px solid ${exp.color || "var(--accent)"}44` }} />

      {/* Year badge */}
      <div className="inline-flex items-center gap-2 mb-3">
        <span style={{
          fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.2em",
          color: exp.color || "var(--accent3)", padding: "3px 8px",
          background: `${exp.color || "var(--accent)"}15`,
          border: `1px solid ${exp.color || "var(--accent)"}30`,
          borderRadius: 2,
        }}>{exp.year}</span>
      </div>

      {/* Role */}
      <h3 style={{
        fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "clamp(1.1rem,2vw,1.4rem)",
        letterSpacing: "-0.02em", marginBottom: 4, color: "var(--text)",
      }}>{exp.role}</h3>

      {/* Org */}
      <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: 11, color: "var(--text3)", letterSpacing: "0.05em", marginBottom: 12 }}>
        // {exp.org}
      </div>

      {/* Description */}
      <p style={{ fontSize: 14, fontWeight: 300, color: "var(--text2)", lineHeight: 1.7 }}>{exp.desc}</p>
    </div>
  );
}
