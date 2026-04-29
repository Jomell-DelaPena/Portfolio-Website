import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tools = [
  {
    icon: "⚡",
    badge: "LIVE DEMO",
    badgeStyle: { background: "rgba(16,185,129,0.1)", color: "#10b981" },
    name: "Project Quote Estimator",
    description:
      "Pick your project type and features — get an instant price range and a downloadable PDF summary.",
    url: "/tools/quote-estimator",
    cta: "Estimate my project",
  },
  {
    icon: "✍️",
    badge: "AI-POWERED",
    badgeStyle: { background: "rgba(139,92,246,0.1)", color: "#8b5cf6" },
    name: "Marketing Copy Generator",
    description:
      "Enter your product, audience, and platform — get 3 ready-to-use copy variations in seconds.",
    url: "/tools/copy-generator",
    cta: "Generate copy",
  },
];

export default function Tools() {
  return (
    <div
      className="rounded-2xl border p-6 animate-fade-in delay-600"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <h2
        className="text-xs font-semibold uppercase tracking-widest mb-1"
        style={{ color: "var(--text-muted)" }}
      >
        Free Tools
      </h2>
      <p className="text-xs mb-5" style={{ color: "var(--text-secondary)" }}>
        Live, working tools — try them free. These are exactly what I build for clients.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.url}
            className="group rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] block"
            style={{ background: "var(--bg)", borderColor: "var(--border)" }}
          >
            {/* Icon + badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">{tool.icon}</span>
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={tool.badgeStyle}
              >
                {tool.badge}
              </span>
            </div>

            {/* Name */}
            <p
              className="text-sm font-semibold group-hover:text-[var(--accent)] transition-colors"
              style={{ color: "var(--text-primary)" }}
            >
              {tool.name}
            </p>

            {/* Description */}
            <p
              className="text-xs mt-1.5 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {tool.description}
            </p>

            {/* CTA */}
            <div
              className="flex items-center gap-1 mt-3 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5"
              style={{ color: "var(--accent)" }}
            >
              {tool.cta} <ArrowRight size={11} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
