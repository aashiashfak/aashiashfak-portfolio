"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoaderProps { onComplete: () => void; }

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          y: "-100%", duration: 0.9, ease: "power4.inOut",
          onComplete: () => { if (loaderRef.current) loaderRef.current.style.display = "none"; onComplete(); }
        });
      }
    });

    tl.to(lettersRef.current, { y: 0, duration: 1.2, stagger: 0.05, ease: "power4.out" }, 0)
      .to(barRef.current, { scaleX: 1, duration: 1.4, ease: "power3.inOut" }, 0.2)
      .to(countRef.current, {
        innerText: 100, duration: 1.4, ease: "power3.inOut", snap: { innerText: 1 },
        modifiers: { innerText: (v: number) => String(Math.round(v)).padStart(3, "0") }
      }, 0.2);
  }, [onComplete]);

  const name = "Aashi Ashfak";

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[8000] flex flex-col items-center justify-center gap-8"
      style={{ background: "var(--bg)" }}>

      {/* Scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,var(--accent),transparent)", animation: "scan 2s linear infinite", opacity: 0.4 }} />
      </div>

      {/* Corner HUD decorations */}
      <div className="absolute top-8 left-8 w-12 h-12" style={{ borderTop: "1px solid var(--border2)", borderLeft: "1px solid var(--border2)" }} />
      <div className="absolute top-8 right-8 w-12 h-12" style={{ borderTop: "1px solid var(--border2)", borderRight: "1px solid var(--border2)" }} />
      <div className="absolute bottom-8 left-8 w-12 h-12" style={{ borderBottom: "1px solid var(--border2)", borderLeft: "1px solid var(--border2)" }} />
      <div className="absolute bottom-8 right-8 w-12 h-12" style={{ borderBottom: "1px solid var(--border2)", borderRight: "1px solid var(--border2)" }} />

      {/* Small HUD text */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] uppercase"
        style={{ color: "var(--text3)" }}>INITIALIZING PORTFOLIO</div>

      {/* Name */}
      <div className="overflow-hidden">
        <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(2.5rem,8vw,6rem)", letterSpacing: "-0.04em", lineHeight: 1 }}>
          {name.split("").map((ch, i) => (
            <span key={i} ref={el => { if (el) lettersRef.current[i] = el; }}
              className="inline-block"
              style={{ transform: "translateY(120%)", color: ch === " " ? "transparent" : i < 5 ? "var(--text)" : "var(--accent3)" }}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </div>
      </div>

      {/* Bar */}
      <div className="relative w-64 h-px" style={{ background: "var(--border2)" }}>
        <div ref={barRef} className="absolute inset-0 origin-left"
          style={{ background: "linear-gradient(90deg,var(--accent),var(--cyan))", transform: "scaleX(0)" }} />
      </div>

      {/* Count */}
      <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: 13, color: "var(--text3)", letterSpacing: "0.15em" }}>
        <span ref={countRef}>000</span>
        <span style={{ color: "var(--text3)", marginLeft: 2 }}> / 100</span>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.25em] uppercase"
        style={{ color: "var(--text3)" }}>
        PYTHON FULL STACK DEVELOPER
      </div>
    </div>
  );
}
