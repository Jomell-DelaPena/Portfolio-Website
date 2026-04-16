import { GraduationCap } from "lucide-react";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <div
      className="rounded-2xl border p-6 animate-fade-in delay-300"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <h2
        className="text-xs font-semibold uppercase tracking-widest mb-5"
        style={{ color: "var(--text-muted)" }}
      >
        Experience
      </h2>

      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-[7px] top-2 bottom-2 w-px"
          style={{ background: "var(--border)" }}
        />

        <div className="space-y-6">
          {experience.map((item, i) => (
            <div key={i} className="flex gap-4 relative">
              {/* Node */}
              <div className="shrink-0 mt-1">
                <div
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center z-10 relative"
                  style={{
                    background: item.current ? "var(--accent)" : "var(--bg-card)",
                    borderColor: item.current ? "var(--accent)" : "var(--border)",
                  }}
                >
                  {item.isEducation && (
                    <GraduationCap size={8} style={{ color: "var(--text-muted)" }} />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="pb-1">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.role}
                    </p>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "var(--accent)" }}
                    >
                      {item.company}
                    </p>
                  </div>
                  <span
                    className="text-[10px] font-mono shrink-0"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.period}
                  </span>
                </div>
                <p
                  className="text-xs mt-1 leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
