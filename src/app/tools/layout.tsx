import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in srgb, var(--bg) 80%, transparent)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 h-12 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono transition-colors hover:text-[var(--accent)]"
            style={{ color: "var(--text-muted)" }}
          >
            <ArrowLeft size={12} />
            portfolio.jhgdp
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">{children}</div>
    </main>
  );
}
