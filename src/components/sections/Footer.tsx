import { DEVELOPER } from "@/lib/data";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "28px 6vw", background: "var(--bg)" }}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: 11, color: "var(--text3)", letterSpacing: "0.05em" }}>
          © 2025 {DEVELOPER.name} — Built with Next.js, GSAP &amp; Three.js
        </div>

        {/* Center: logo */}
        <div style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em", color: "var(--text3)" }}>
          A<span style={{ color: "var(--accent)" }}>.</span>A
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)", boxShadow: "0 0 6px var(--green)", animation: "neon-pulse 2s infinite" }} />
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 11, color: "var(--text3)", letterSpacing: "0.1em" }}>
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </div>
    </footer>
  );
}
