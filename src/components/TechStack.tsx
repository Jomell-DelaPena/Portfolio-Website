import { techStack } from "@/lib/data";

const categories = [
  { label: "Frontend", items: techStack.frontend, icon: "⚡" },
  { label: "Backend", items: techStack.backend, icon: "🛠" },
  { label: "DevOps", items: techStack.devops, icon: "☁️" },
];

export default function TechStack() {
  return (
    <div
      className="rounded-2xl border p-6 animate-fade-in delay-400"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <h2
        className="text-xs font-semibold uppercase tracking-widest mb-5"
        style={{ color: "var(--text-muted)" }}
      >
        Tech Stack
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.label}>
            <p
              className="text-xs font-semibold mb-2 flex items-center gap-1"
              style={{ color: "var(--text-primary)" }}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                  style={{
                    background: "var(--accent-subtle)",
                    color: "var(--accent)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
