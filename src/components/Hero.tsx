import { MapPin, BadgeCheck, Calendar, Mail, BookOpen } from "lucide-react";
import { personal } from "@/lib/data";

export default function Hero() {
  return (
    <div
      className="rounded-2xl border p-6 animate-fade-in delay-100"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        {/* Avatar */}
        <div className="shrink-0">
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-4xl font-bold"
            style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}
          >
            {personal.name.charAt(0)}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* Name + badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <h1
              className="text-xl sm:text-2xl font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {personal.name}
            </h1>
            <BadgeCheck size={18} style={{ color: "var(--accent)" }} />
            {personal.availableForWork && (
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: "var(--badge-bg)",
                  color: "var(--badge-text)",
                }}
              >
                Available for work
              </span>
            )}
          </div>

          {/* Title */}
          <p
            className="text-sm font-medium mt-0.5"
            style={{ color: "var(--accent)" }}
          >
            {personal.title}
          </p>

          {/* Location */}
          <div className="flex items-center gap-1 mt-1.5">
            <MapPin size={12} style={{ color: "var(--text-muted)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {personal.location}
            </span>
          </div>

          {/* Tagline */}
          <p
            className="text-sm mt-3 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {personal.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            <a
              href={personal.calendarUrl}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "var(--accent)",
                color: "#fff",
              }}
            >
              <Calendar size={12} />
              Schedule a Call
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--bg-card-hover)]"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            >
              <Mail size={12} />
              Send Email
            </a>
            {personal.blogUrl !== "#" && (
              <a
                href={personal.blogUrl}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--bg-card-hover)]"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                <BookOpen size={12} />
                Read my blog
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
