
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from "./components/ui/Cursor";
import Loader from "./components/ui/Loader";
import Navbar from "./components/ui/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import TechStack from "./components/sections/TechStack";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import { useLenis } from "./components/hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  useEffect(() => {
    if (loaded) setTimeout(() => ScrollTrigger.refresh(), 200);
  }, [loaded]);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[9000] opacity-40"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")` }} />
      <div className="hidden md:block"><Cursor /></div>
      <Loader onComplete={() => setLoaded(true)} />
      <main style={{ visibility: loaded ? "visible" : "hidden" }}>
        <Navbar />
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
