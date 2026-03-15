"use client";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-400"
      style={{
        padding: scrolled ? "14px 6vw" : "24px 6vw",
        background: scrolled ? "rgba(3,6,9,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}>

      {/* Logo */}
      <a href="#" style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em", color: "var(--text)", textDecoration: "none" }}>
        A<span style={{ color: "var(--accent)" }}>.</span>A
      </a>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map(link => (
          <a key={link.href} href={link.href}
            onClick={() => setActive(link.href)}
            className="relative group"
            style={{
              fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase",
              color: active === link.href ? "var(--text)" : "var(--text2)",
              textDecoration: "none", transition: "color 0.2s",
              fontWeight: 400,
            }}>
            {link.label}
            <span className="absolute bottom-[-3px] left-0 h-px transition-all duration-300 group-hover:w-full w-0"
              style={{ background: "var(--accent)" }} />
          </a>
        ))}
      </div>

      {/* Status badge */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-sm"
        style={{ border: "1px solid var(--border2)", background: "var(--surface)" }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)", boxShadow: "0 0 6px var(--green)", animation: "neon-pulse 2s ease-in-out infinite" }} />
        <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--text2)" }}>AVAILABLE</span>
      </div>
    </nav>
  );
}
