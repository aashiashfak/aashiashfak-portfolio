"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const total = cards.length;

    cards.forEach((card, i) => {
      // Each card scales down as you scroll past it
      gsap.to(card, {
        scale: 1 - (total - 1 - i) * 0.035,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top top+=120",
          end: "bottom top+=120",
          scrub: true,
        },
      });

      // Opacity fade out of older cards
      if (i < total - 1) {
        gsap.to(card, {
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top top+=200",
            end: "top top+=120",
            scrub: true,
          },
        });
      }
    });

    // Title reveal
    gsap.fromTo(".projects-title", { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power4.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } });

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <section id="projects" ref={sectionRef}
      className="relative"
      style={{ padding: "120px 6vw 0", background: "var(--bg2)" }}>

      {/* Header */}
      <div className="projects-title mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6" style={{ opacity: 0 }}>
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="block h-px w-6" style={{ background: "var(--text3)" }} />
            <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.25em", color: "var(--text3)", textTransform: "uppercase" }}>Selected Work</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(2.5rem,6vw,5.5rem)", letterSpacing: "-0.03em", lineHeight: 0.95 }}>
            Featured<br /><span style={{ color: "var(--accent)" }}>Projects</span>
          </h2>
        </div>
        <div style={{ maxWidth: 300 }}>
          <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.7, fontWeight: 300, marginBottom: 12 }}>
            Scroll through projects — each card stacks as you descend.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2" style={{ background: "var(--accent)", animation: "neon-pulse 1.5s infinite" }} />
            <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, color: "var(--text3)", letterSpacing: "0.1em" }}>
              {PROJECTS.length} PROJECTS DEPLOYED
            </span>
          </div>
        </div>
      </div>

      {/* Stack cards — each sticky */}
      <div>
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            ref={el => { if (el) cardsRef.current[i] = el; }}
            className="project-stack-card"
            style={{
              position: "sticky",
              top: 120 + i * 16,
              transformOrigin: "top center",
              marginBottom: i === PROJECTS.length - 1 ? "80px" : "0",
              zIndex: 10 + i,
            }}>
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const statusColors: Record<string, string> = {
    "SHIPPED": "var(--accent)",
    "LIVE": "var(--green)",
    "WIP": "var(--amber)",
  };

  return (
    <div ref={cardRef}
      className="relative w-full group"
      style={{
        background: "var(--bg3)",
        border: "1px solid var(--border2)",
        overflow: "hidden",
        borderRadius: 4,
        minHeight: 360,
      }}>

      {/* Gaming corner cuts */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 10 }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: 20, height: 20, borderTop: `2px solid ${project.color}`, borderLeft: `2px solid ${project.color}` }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: 20, height: 20, borderTop: `2px solid ${project.color}`, borderRight: `2px solid ${project.color}` }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 20, height: 20, borderBottom: `2px solid ${project.color}`, borderLeft: `2px solid ${project.color}` }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 20, height: 20, borderBottom: `2px solid ${project.color}`, borderRight: `2px solid ${project.color}` }} />
      </div>

      {/* Background accent glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 60% 60% at 80% 50%, ${project.accentColor}, transparent 70%)`,
        opacity: 0.7,
      }} />

      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, opacity: 0.3,
        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.05) 2px,rgba(0,0,0,0.05) 4px)",
      }} />

      {/* Card index (large faded) */}
      <div style={{
        position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)",
        fontFamily: "var(--font-syne)", fontWeight: 800,
        fontSize: "clamp(6rem,12vw,14rem)", letterSpacing: "-0.05em",
        color: project.color, opacity: 0.06, lineHeight: 1,
        userSelect: "none", pointerEvents: "none", zIndex: 1,
      }}>{project.id}</div>

      {/* Main content */}
      <div className="relative z-5 flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center"
        style={{ padding: "48px 48px 40px" }}>

        {/* Left */}
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          {/* Header row */}
          <div className="flex items-center gap-4 mb-6">
            <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.2em", color: "var(--text3)" }}>
              PROJECT {project.id}
            </span>
            <span style={{ height: 1, flex: 1, background: "var(--border)", maxWidth: 40 }} />
            {/* Status badge */}
            <div className="clip-gaming-sm flex items-center gap-1.5"
              style={{
                fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.15em",
                padding: "4px 10px",
                background: `${statusColors[project.status] || "var(--accent)"}18`,
                border: `1px solid ${statusColors[project.status] || "var(--accent)"}44`,
                color: statusColors[project.status] || "var(--accent)",
              }}>
              <span className="w-1 h-1 rounded-full" style={{ background: statusColors[project.status] || "var(--accent)", animation: "neon-pulse 1.5s infinite" }} />
              {project.status}
            </div>
            <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, color: "var(--text3)" }}>{project.year}</span>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(1.8rem,3.5vw,3rem)",
            letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 8,
            color: "var(--text)",
          }}>{project.title}</h3>
          <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: 11, color: project.color, letterSpacing: "0.1em", marginBottom: 20 }}>
            // {project.subtitle}
          </div>

          {/* Description */}
          <p style={{ fontSize: 14, fontWeight: 300, color: "var(--text2)", lineHeight: 1.8, maxWidth: 480, marginBottom: 28 }}>
            {project.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(tag => (
              <span key={tag} className="clip-gaming-sm"
                style={{
                  fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.08em",
                  padding: "4px 10px",
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                  color: "var(--text3)",
                }}>{tag}</span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a href={project.github} target="_blank" rel="noopener"
              className="flex items-center gap-2 group/link"
              style={{
                fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
                color: "var(--text3)", textDecoration: "none", transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = project.color)}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text3)")}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ transition: "transform 0.2s" }}
                className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                <path d="M1 9L9 1M9 1H3M9 1V7"/>
              </svg>
            </a>

            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener"
                className="flex items-center gap-2"
                style={{
                  fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "var(--text3)", textDecoration: "none", transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text3)")}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="6" cy="6" r="5"/><path d="M6 1C6 1 4 3.5 4 6s2 5 2 5M6 1c0 0 2 2.5 2 5s-2 5-2 5M1 6h10"/>
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Right: Preview visual */}
        <div style={{ flexShrink: 0, width: "clamp(160px,22vw,260px)" }}>
          <div className="clip-gaming relative overflow-hidden"
            style={{
              aspectRatio: "4/3",
              background: `linear-gradient(135deg, ${project.color}18, var(--bg2))`,
              border: `1px solid ${project.color}33`,
            }}>
            {/* Grid inside preview */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `linear-gradient(${project.color}15 1px, transparent 1px), linear-gradient(90deg,${project.color}15 1px,transparent 1px)`,
              backgroundSize: "20px 20px",
            }} />
            {/* Big emoji center */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", filter: "drop-shadow(0 0 20px " + project.color + "66)" }}>
              {project.emoji}
            </div>
            {/* Tech count */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "8px 12px",
              background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
              borderTop: `1px solid ${project.color}22`,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, color: "var(--text3)", letterSpacing: "0.1em" }}>STACK</span>
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 11, color: project.color, fontWeight: 400 }}>{project.tags.length} TECH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom progress bar (stack progress) */}
      <div style={{ height: 2, background: "var(--border)" }}>
        <div style={{ height: "100%", width: `${((index + 1) / PROJECTS.length) * 100}%`, background: `linear-gradient(90deg, ${project.color}, var(--cyan))` }} />
      </div>
    </div>
  );
}
