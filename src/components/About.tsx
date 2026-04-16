import { personal } from "@/lib/data";

export default function About() {
  return (
    <div
      className="rounded-2xl border p-6 animate-fade-in delay-200"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <h2
        className="text-xs font-semibold uppercase tracking-widest mb-3"
        style={{ color: "var(--text-muted)" }}
      >
        About
      </h2>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {personal.bio}
      </p>
    </div>
  );
}
