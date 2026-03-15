"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TECH_STACK } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".tech-card");
    gsap.fromTo(cards,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.06, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" }
      }
    );
  }, []);

  return (
    <section id="tech" ref={sectionRef}
      className="relative"
      style={{ padding: "120px 6vw", background: "var(--bg)" }}>

      {/* BG decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, var(--border2), transparent)" }} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="block h-px w-6" style={{ background: "var(--text3)" }} />
            <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.25em", color: "var(--text3)", textTransform: "uppercase" }}>Tech Stack</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(2.5rem,6vw,5rem)", letterSpacing: "-0.03em", lineHeight: 0.95 }}>
            My<br /><span style={{ color: "var(--cyan)" }}>Arsenal</span>
          </h2>
        </div>
        <p style={{ maxWidth: 280, fontSize: 14, color: "var(--text3)", lineHeight: 1.7, fontWeight: 300 }}>
          Tools and technologies I use to architect and ship production-grade applications.
        </p>
      </div>

      {/* Grid — 4 cols ensures full rows, no orphaned cards */}
      <div ref={gridRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "var(--border)",
          border: "1px solid var(--border)",
          borderRadius: 4,
          overflow: "hidden",
        }}>
        {TECH_STACK.map((tech, i) => (
          <div key={tech.name}
            className="tech-card relative group"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === i ? "var(--bg3)" : "var(--bg)",
              padding: "36px 24px",
              display: "flex", flexDirection: "column", alignItems: "center",
              textAlign: "center", gap: 12,
              cursor: "default", transition: "background 0.3s",
              position: "relative", overflow: "hidden",
            }}>

            {/* Glow on hover */}
            <div style={{
              position: "absolute", inset: 0,
              background: `radial-gradient(circle at center, ${tech.color}22, transparent 70%)`,
              opacity: hovered === i ? 1 : 0,
              transition: "opacity 0.4s",
              pointerEvents: "none",
            }} />

            {/* Gaming number tag */}
            <div style={{
              position: "absolute", top: 10, right: 12,
              fontFamily: "var(--font-dm-mono)", fontSize: 9, color: "var(--text3)",
              letterSpacing: "0.1em", opacity: hovered === i ? 1 : 0.4,
              transition: "opacity 0.3s",
            }}>/{String(i + 1).padStart(2, "0")}</div>

            {/* Icon */}
            <div style={{
              fontSize: "2.2rem", lineHeight: 1,
              transform: hovered === i ? "translateY(-4px) scale(1.15)" : "none",
              transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
              position: "relative", zIndex: 1,
            }}>{tech.icon}</div>

            {/* Name */}
            <div style={{
              fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 14, letterSpacing: "0.04em",
              color: hovered === i ? "var(--text)" : "var(--text2)",
              transition: "color 0.3s", zIndex: 1,
            }}>{tech.name}</div>

            {/* Tag pill */}
            <div className="clip-gaming-sm" style={{
              fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.1em",
              padding: "3px 8px",
              background: hovered === i ? `${tech.color}22` : "var(--surface2)",
              color: hovered === i ? tech.color : "var(--text3)",
              border: `1px solid ${hovered === i ? tech.color + "44" : "var(--border)"}`,
              transition: "all 0.3s", zIndex: 1,
            }}>{tech.tag}</div>

            {/* Skill bar */}
            <div style={{ width: "100%", height: 2, background: "var(--border2)", borderRadius: 1, marginTop: 4, position: "relative", zIndex: 1 }}>
              <div style={{
                height: "100%", borderRadius: 1,
                background: `linear-gradient(90deg, ${tech.color}, var(--cyan))`,
                width: hovered === i ? `${tech.level}%` : "0%",
                transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
              }} />
            </div>
            {hovered === i && (
              <div style={{
                fontFamily: "var(--font-dm-mono)", fontSize: 9, color: "var(--text3)",
                letterSpacing: "0.1em", position: "absolute", bottom: 8, right: 12, zIndex: 2,
              }}>{tech.level}%</div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom label */}
      <div className="flex items-center justify-center gap-3 mt-8">
        <span className="h-px flex-1 max-w-24" style={{ background: "var(--border)" }} />
        <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, color: "var(--text3)", letterSpacing: "0.2em" }}>AND MORE EVERY DAY</span>
        <span className="h-px flex-1 max-w-24" style={{ background: "var(--border)" }} />
      </div>
    </section>
  );
}
