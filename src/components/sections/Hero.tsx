"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { DEVELOPER } from "@/lib/data";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const float1Ref = useRef<HTMLDivElement>(null);
  const float2Ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // ── THREE.JS SCENE ─────────────
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.z = 30;

    // Primary particles (purple)
    const count1 = 2500;
    const geo1 = new THREE.BufferGeometry();
    const pos1 = new Float32Array(count1 * 3);
    for (let i = 0; i < count1; i++) {
      pos1[i * 3] = (Math.random() - 0.5) * 100;
      pos1[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos1[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    geo1.setAttribute("position", new THREE.BufferAttribute(pos1, 3));
    const mat1 = new THREE.PointsMaterial({ color: 0x6c63ff, size: 0.1, transparent: true, opacity: 0.7, sizeAttenuation: true });
    const particles1 = new THREE.Points(geo1, mat1);
    scene.add(particles1);

    // Secondary particles (cyan)
    const count2 = 1000;
    const geo2 = new THREE.BufferGeometry();
    const pos2 = new Float32Array(count2 * 3);
    for (let i = 0; i < count2; i++) {
      pos2[i * 3] = (Math.random() - 0.5) * 70;
      pos2[i * 3 + 1] = (Math.random() - 0.5) * 70;
      pos2[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    geo2.setAttribute("position", new THREE.BufferAttribute(pos2, 3));
    const mat2 = new THREE.PointsMaterial({ color: 0x39d0d8, size: 0.07, transparent: true, opacity: 0.5 });
    const particles2 = new THREE.Points(geo2, mat2);
    scene.add(particles2);

    // Grid perspective
    const gridVerts: number[] = [];
    const gs = 80, gd = 24, step = gs / gd;
    for (let i = 0; i <= gd; i++) {
      const x = i * step - gs / 2;
      gridVerts.push(x, -gs / 2, -20, x, gs / 2, -20);
      const y = i * step - gs / 2;
      gridVerts.push(-gs / 2, y, -20, gs / 2, y, -20);
    }
    const gridGeo = new THREE.BufferGeometry();
    gridGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(gridVerts), 3));
    const gridMat = new THREE.LineBasicMaterial({ color: 0x6c63ff, transparent: true, opacity: 0.05 });
    const grid = new THREE.LineSegments(gridGeo, gridMat);
    scene.add(grid);

    // Floating ring
    const ringGeo = new THREE.TorusGeometry(8, 0.02, 8, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x6c63ff, transparent: true, opacity: 0.15, wireframe: false });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(10, -2, -5);
    scene.add(ring);

    const ringGeo2 = new THREE.TorusGeometry(5, 0.015, 8, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x39d0d8, transparent: true, opacity: 0.1 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.position.set(-12, 4, -8);
    scene.add(ring2);

    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    let t = 0;
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.0008;
      particles1.rotation.y = t * 0.2 + mouseX * 0.04;
      particles1.rotation.x = t * 0.05 + mouseY * 0.02;
      particles2.rotation.y = -t * 0.15 + mouseX * 0.03;
      particles2.rotation.x = -t * 0.03;
      ring.rotation.x = t * 0.8;
      ring.rotation.y = t * 0.4;
      ring2.rotation.x = -t * 0.6;
      ring2.rotation.z = t * 0.3;
      grid.rotation.x = -0.25 + mouseY * 0.02;
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.04;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  // GSAP Hero Intro (called from parent after loader)
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo([line1Ref.current, line2Ref.current],
      { y: "110%", opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, stagger: 0.12, ease: "power4.out" }, 0)
      .fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.3)
      .fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.6)
      .fromTo(actionsRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.8)
      .fromTo([float1Ref.current, float2Ref.current], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" }, 1.0)
      .fromTo(statsRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7 }, 1.2)
      .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.4);
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ padding: "0 6vw 10vh" }}>

      {/* Three.js canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ width: "100%", height: "100%" }} />

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-1 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,99,255,0.12), transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-64 z-1 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--bg), transparent)" }} />

      {/* Gaming scanlines */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-30"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)" }} />

      {/* Floating badge 1 — status */}
      <div ref={float1Ref} className="absolute top-[22%] right-[6%] z-10 rounded-sm"
        style={{
          background: "rgba(7,9,15,0.85)", border: "1px solid var(--border2)",
          padding: "14px 18px", backdropFilter: "blur(20px)",
          animation: "float 6s ease-in-out infinite", opacity: 0,
        }}>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)", boxShadow: "0 0 8px var(--green)", animation: "neon-pulse 2s infinite" }} />
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.2em", color: "var(--text3)" }}>STATUS</span>
        </div>
        <div style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 14, color: "var(--text)" }}>Available for Work</div>
      </div>

      {/* Floating badge 2 — XP */}
      <div ref={float2Ref} className="absolute top-[38%] right-[18%] z-10 rounded-sm"
        style={{
          background: "rgba(7,9,15,0.85)", border: "1px solid var(--border2)",
          padding: "12px 16px", backdropFilter: "blur(20px)",
          animation: "float 7s ease-in-out infinite 2s", opacity: 0,
        }}>
        <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, letterSpacing: "0.2em", color: "var(--text3)", marginBottom: 4 }}>XP LEVEL</div>
        <div className="text-gradient" style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 24, lineHeight: 1 }}>LV.03+</div>
        <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: "var(--border2)", width: 80 }}>
          <div className="h-full rounded-full" style={{ width: "78%", background: "linear-gradient(90deg,var(--accent),var(--cyan))" }} />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="flex items-center gap-3 mb-5" style={{ opacity: 0 }}>
          <span className="block h-px w-8" style={{ background: "var(--cyan)" }} />
          <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)" }}>
            {DEVELOPER.role}
          </span>
        </div>

        {/* Name — massive */}
        <h1 className="overflow-hidden" style={{ lineHeight: 0.92, marginBottom: 10 }}>
          <span className="block overflow-hidden">
            <span ref={line1Ref} className="block" style={{
              fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(3rem,8vw,7rem)",
              letterSpacing: "-0.04em", color: "var(--text)", transform: "translateY(110%)",
            }}>Aashi</span>
          </span>
          <span className="block overflow-hidden">
            <span ref={line2Ref} className="block" style={{
              fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(3rem,8vw,7rem)",
              letterSpacing: "-0.04em", WebkitTextStroke: "1px rgba(255,255,255,0.18)",
              color: "transparent", transform: "translateY(110%)",
            }}>Ashfak</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p ref={subRef} className="mb-10" style={{ opacity: 0, fontSize: "clamp(0.9rem,1.8vw,1.1rem)", fontWeight: 300, color: "var(--text2)", maxWidth: 560, lineHeight: 1.7 }}>
          Building <span style={{ color: "var(--accent3)", fontWeight: 400 }}>scalable web experiences</span> —<br />
          from animated interfaces to high-performance backends.
        </p>

        {/* CTAs */}
        <div ref={actionsRef} className="flex items-center gap-4 flex-wrap" style={{ opacity: 0 }}>
          <a href="#projects"
            className="relative overflow-hidden inline-flex items-center gap-2 clip-gaming-sm"
            style={{
              padding: "14px 32px", background: "var(--accent)", color: "#fff",
              fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
              textDecoration: "none", transition: "all 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--cyan)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--accent)")}>
            <span>View Work</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 12L12 2M12 2H5M12 2V9" />
            </svg>
          </a>
          <a href="#contact"
            className="inline-flex items-center gap-2"
            style={{
              padding: "14px 32px", background: "transparent", color: "var(--text2)",
              fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
              textDecoration: "none", border: "1px solid var(--border2)", transition: "all 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--text2)"; e.currentTarget.style.borderColor = "var(--border2)"; }}>
            Contact
          </a>
        </div>

        {/* Inline stats */}
        <div ref={statsRef} className="flex items-center gap-6 mt-10 pt-8 flex-wrap" style={{ opacity: 0, borderTop: "1px solid var(--border)" }}>
          {[["3+", "Years Exp."], ["4+", "Projects"], ["7+", "Tech Stack"], ["∞", "Coffee"]].map(([n, l]) => (
            <div key={l}>
              <div className="text-gradient" style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "1.4rem", lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: 10, color: "var(--text3)", letterSpacing: "0.1em", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute right-[6vw] bottom-[10vh] flex flex-col items-center gap-2 z-10" style={{ opacity: 0 }}>
        <div className="w-px h-16 overflow-hidden relative" style={{ background: "var(--border2)" }}>
          <div className="absolute inset-x-0 top-0 h-full"
            style={{ background: "linear-gradient(to bottom,transparent,var(--accent))", animation: "scan 1.8s ease-in-out infinite" }} />
        </div>
        <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: 9, color: "var(--text3)", letterSpacing: "0.15em", writingMode: "vertical-rl", textTransform: "uppercase" }}>Scroll</span>
      </div>
    </section>
  );
}
