import { toolRows } from "@/lib/data";

export default function TechStack() {
  return (
    <div
      className="rounded-2xl border p-6 sm:p-7 animate-fade-in delay-400"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <h2
        className="text-xs font-semibold uppercase tracking-widest mb-1"
        style={{ color: "var(--text-muted)" }}
      >
        Tools & Platforms
      </h2>
      <p className="text-xs mb-5" style={{ color: "var(--text-secondary)" }}>
        Developer tools, CRM platforms, funnel systems, and automation software I can work with.
      </p>

      <div className="space-y-5">
        {toolRows.map((row, rowIndex) => {
          const loopItems = [...row.items, ...row.items];
          const reverse = rowIndex % 2 === 1;

          return (
            <div key={row.label}>
              <div className="mb-2.5">
                <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                  {row.label}
                </p>
              </div>

              <div className="tools-marquee">
                <div
                  className={`tools-marquee-track ${
                    reverse ? "tools-marquee-track-reverse" : ""
                  }`}
                >
                  {loopItems.map((item, index) => {
                    const darkText = item.color === "#f7df1e" || item.color === "#facc15";

                    return (
                      <div
                        key={`${row.label}-${item.name}-${index}`}
                        className="tools-chip"
                        style={{ background: "var(--bg)", borderColor: "var(--border)" }}
                      >
                        <span
                          className="tools-chip-mark"
                          style={{
                            background: item.color,
                            color: darkText ? "#111827" : "#fff",
                          }}
                        >
                          {item.short}
                        </span>
                        <span
                          className="tools-chip-label"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
