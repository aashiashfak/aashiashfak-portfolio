"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mx = useRef(0);
  const my = useRef(0);
  const rx = useRef(0);
  const ry = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mx.current}px`;
        dotRef.current.style.top = `${my.current}px`;
      }
    };
    window.addEventListener("mousemove", move);

    const animRing = () => {
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx.current}px`;
        ringRef.current.style.top = `${ry.current}px`;
      }
      rafRef.current = requestAnimationFrame(animRing);
    };
    rafRef.current = requestAnimationFrame(animRing);

    // Hover effects
    const onEnter = () => {
      if (dotRef.current) { dotRef.current.style.width = "20px"; dotRef.current.style.height = "20px"; dotRef.current.style.background = "var(--cyan)"; }
      if (ringRef.current) { ringRef.current.style.width = "60px"; ringRef.current.style.height = "60px"; ringRef.current.style.borderColor = "rgba(57,208,216,0.4)"; }
    };
    const onLeave = () => {
      if (dotRef.current) { dotRef.current.style.width = "8px"; dotRef.current.style.height = "8px"; dotRef.current.style.background = "var(--accent)"; }
      if (ringRef.current) { ringRef.current.style.width = "40px"; ringRef.current.style.height = "40px"; ringRef.current.style.borderColor = "rgba(108,99,255,0.5)"; }
    };

    const targets = document.querySelectorAll("a, button, [data-cursor]");
    targets.forEach(el => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafRef.current);
      targets.forEach(el => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] mix-blend-screen"
        style={{ width: 8, height: 8, background: "var(--accent)", borderRadius: "50%", transform: "translate(-50%,-50%)", transition: "width 0.2s, height 0.2s, background 0.2s" }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998]"
        style={{ width: 40, height: 40, border: "1px solid rgba(108,99,255,0.5)", borderRadius: "50%", transform: "translate(-50%,-50%)", transition: "width 0.3s, height 0.3s, border-color 0.3s" }}
      />
    </>
  );
}
