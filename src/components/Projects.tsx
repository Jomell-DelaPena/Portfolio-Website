import { ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <div
      className="rounded-2xl border p-6 animate-fade-in delay-500"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <h2
        className="text-xs font-semibold uppercase tracking-widest mb-5"
        style={{ color: "var(--text-muted)" }}
      >
        Recent Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] block"
            style={{
              background: "var(--bg)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <p
                className="text-sm font-semibold group-hover:text-[var(--accent)] transition-colors"
                style={{ color: "var(--text-primary)" }}
              >
                {project.name}
              </p>
              <ExternalLink
                size={12}
                className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "var(--accent)" }}
              />
            </div>
            <p
              className="text-xs mt-1.5 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1 mt-3">
              {project.tags.map((tag) => (
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
          </a>
        ))}
      </div>
    </div>
  );
}
