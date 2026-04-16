import { certifications } from "@/lib/data";

export default function Certifications() {
  return (
    <div
      className="rounded-2xl border p-6 animate-fade-in delay-600"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <h2
        className="text-xs font-semibold uppercase tracking-widest mb-5"
        style={{ color: "var(--text-muted)" }}
      >
        Certifications
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="rounded-xl border p-3 text-center transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "var(--bg)",
              borderColor: "var(--border)",
            }}
          >
            <div className="text-2xl mb-2">{cert.icon}</div>
            <p
              className="text-[11px] font-semibold leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {cert.name}
            </p>
            <p
              className="text-[10px] mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              {cert.issuer} · {cert.year}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
