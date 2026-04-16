import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Recommendations from "@/components/Recommendations";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Top nav bar */}
      <nav
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in srgb, var(--bg) 80%, transparent)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 h-12 flex items-center justify-between">
          <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
            portfolio.jhgdp
          </span>
          <ThemeToggle />
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <Projects />
        <Certifications />
        <Recommendations />
        <Footer />
      </div>
    </main>
  );
}
