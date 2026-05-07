import { Bot, Filter, Workflow } from "lucide-react";
import { capabilities } from "@/lib/data";

const icons = [Workflow, Filter, Bot];

export default function Capabilities() {
  return (
    <div
      className="rounded-2xl border p-6 sm:p-7 animate-fade-in delay-500"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <h2
        className="text-xs font-semibold uppercase tracking-widest mb-1"
        style={{ color: "var(--text-muted)" }}
      >
        Business Systems
      </h2>
      <p className="text-xs mb-5" style={{ color: "var(--text-secondary)" }}>
        GHL, funnel, and automation work that connects websites to real client operations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {capabilities.map((capability, index) => {
          const Icon = icons[index] ?? Workflow;

          return (
            <div
              key={capability.name}
              className="rounded-xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]"
              style={{ background: "var(--bg)", borderColor: "var(--border)" }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}
              >
                <Icon size={16} />
              </div>

              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {capability.name}
              </p>
              <p
                className="text-xs mt-1.5 leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {capability.description}
              </p>

              <div className="flex flex-wrap gap-1 mt-3">
                {capability.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                    style={{
                      background: "var(--accent-subtle)",
                      color: "var(--accent)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
