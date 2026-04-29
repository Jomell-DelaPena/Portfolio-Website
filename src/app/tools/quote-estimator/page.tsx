"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Download,
  RefreshCw,
  Calendar,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3;

interface ProjectType {
  id: string;
  icon: string;
  name: string;
  description: string;
  low: number;
  high: number;
}

interface Addon {
  id: string;
  name: string;
  description: string;
  low: number;
  high: number;
}

interface Timeline {
  id: string;
  label: string;
  duration: string;
  multiplier: number;
  note?: string;
  noteColor?: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────

const projectTypes: ProjectType[] = [
  {
    id: "landing",
    icon: "🌐",
    name: "Landing Page",
    description: "Single-page, conversion-focused site",
    low: 300,
    high: 600,
  },
  {
    id: "business",
    icon: "💼",
    name: "Business Website",
    description: "Multi-page professional site",
    low: 800,
    high: 2000,
  },
  {
    id: "ecommerce",
    icon: "🛒",
    name: "E-Commerce Store",
    description: "Full online store with payments",
    low: 1500,
    high: 4500,
  },
  {
    id: "webapp",
    icon: "⚡",
    name: "Custom Web App",
    description: "Complex interactive application",
    low: 2500,
    high: 8000,
  },
  {
    id: "wordpress",
    icon: "📝",
    name: "WordPress Site",
    description: "CMS-powered, easy to manage",
    low: 400,
    high: 1200,
  },
  {
    id: "api",
    icon: "🔌",
    name: "API Integration",
    description: "Connect systems & automate workflows",
    low: 600,
    high: 2000,
  },
];

const addons: Addon[] = [
  {
    id: "seo",
    name: "SEO Setup",
    description: "Meta tags, sitemap, robots.txt",
    low: 150,
    high: 300,
  },
  {
    id: "cms",
    name: "CMS Integration",
    description: "Content management system",
    low: 200,
    high: 500,
  },
  {
    id: "auth",
    name: "User Authentication",
    description: "Login, register, role-based access",
    low: 250,
    high: 500,
  },
  {
    id: "payment",
    name: "Payment Gateway",
    description: "Stripe, PayPal, or local PH payment",
    low: 200,
    high: 400,
  },
  {
    id: "dashboard",
    name: "Admin Dashboard",
    description: "Manage content, users, and data",
    low: 400,
    high: 800,
  },
  {
    id: "email",
    name: "Email Marketing",
    description: "Newsletter & automation integration",
    low: 100,
    high: 250,
  },
  {
    id: "analytics",
    name: "Analytics & Tracking",
    description: "GA4, heatmaps, conversion tracking",
    low: 100,
    high: 200,
  },
];

const timelines: Timeline[] = [
  {
    id: "urgent",
    label: "Urgent",
    duration: "< 2 weeks",
    multiplier: 1.3,
    note: "+30%",
    noteColor: "#f59e0b",
  },
  {
    id: "standard",
    label: "Standard",
    duration: "3–4 weeks",
    multiplier: 1.0,
  },
  {
    id: "relaxed",
    label: "Relaxed",
    duration: "1–2 months",
    multiplier: 0.9,
    note: "−10%",
    noteColor: "#10b981",
  },
  {
    id: "flexible",
    label: "Flexible",
    duration: "3+ months",
    multiplier: 0.8,
    note: "−20%",
    noteColor: "#10b981",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function QuoteEstimatorPage() {
  const [step, setStep] = useState<Step>(1);
  const [projectTypeId, setProjectTypeId] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
  const [timelineId, setTimelineId] = useState("standard");

  const selectedProject = projectTypes.find((p) => p.id === projectTypeId);
  const selectedTimeline = timelines.find((t) => t.id === timelineId)!;

  const estimate = (() => {
    if (!selectedProject) return { low: 0, high: 0 };
    let low = selectedProject.low;
    let high = selectedProject.high;
    selectedAddons.forEach((id) => {
      const a = addons.find((x) => x.id === id);
      if (a) { low += a.low; high += a.high; }
    });
    return {
      low: Math.round(low * selectedTimeline.multiplier),
      high: Math.round(high * selectedTimeline.multiplier),
    };
  })();

  const toggleAddon = (id: string) =>
    setSelectedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  const reset = () => {
    setStep(1);
    setProjectTypeId(null);
    setSelectedAddons(new Set());
    setTimelineId("standard");
  };

  const handleDownloadPDF = async () => {
    if (!selectedProject) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const accent: [number, number, number] = [6, 182, 212];
    const gray: [number, number, number] = [100, 100, 100];
    const dark: [number, number, number] = [15, 23, 42];

    // Header bar
    doc.setFillColor(...accent);
    doc.rect(0, 0, 210, 14, "F");

    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...dark);
    doc.text("Project Quote Estimate", 20, 30);

    // Meta
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...gray);
    doc.text(
      `Prepared by Jomell Hope Dela Peña  ·  ${new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}`,
      20,
      40
    );
    doc.text("jomellhopedelapena@gmail.com  ·  jhgdp.netlify.app", 20, 47);

    // Divider
    doc.setDrawColor(220, 220, 220);
    doc.line(20, 53, 190, 53);

    // Project type
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...dark);
    doc.text("Project Type", 20, 65);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`${selectedProject.name}  ($${fmt(selectedProject.low)} – $${fmt(selectedProject.high)})`, 20, 74);

    // Add-ons
    let y = 74;
    if (selectedAddons.size > 0) {
      y += 16;
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...dark);
      doc.text("Add-ons Selected", 20, y);
      y += 10;
      selectedAddons.forEach((id) => {
        const a = addons.find((x) => x.id === id);
        if (!a) return;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`• ${a.name}  (+$${fmt(a.low)} – $${fmt(a.high)})`, 20, y);
        y += 9;
      });
    }

    // Timeline
    y += 14;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...dark);
    doc.text("Timeline", 20, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      `${selectedTimeline.label} (${selectedTimeline.duration})${selectedTimeline.multiplier !== 1 ? `  ·  ${selectedTimeline.multiplier > 1 ? "+" : "−"}${Math.round(Math.abs(1 - selectedTimeline.multiplier) * 100)}%` : ""}`,
      20,
      y
    );

    // Estimate box
    y += 20;
    doc.setFillColor(236, 254, 255);
    doc.roundedRect(20, y - 6, 170, 28, 3, 3, "F");
    doc.setDrawColor(...accent);
    doc.roundedRect(20, y - 6, 170, 28, 3, 3, "S");
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...accent);
    doc.text(`$${fmt(estimate.low)} — $${fmt(estimate.high)} USD`, 28, y + 10);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...gray);
    doc.text("Ballpark estimate. Final pricing depends on exact scope.", 28, y + 18);

    // Footer
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...dark);
    doc.text("Ready for an exact quote?", 20, 260);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...accent);
    doc.text("Schedule a free discovery call → calendly.com/jomellhopedelapena/30min", 20, 268);

    doc.save("quote-estimate.pdf");
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  const stepLabels = ["Choose project type", "Select add-ons", "Pick timeline"];

  return (
    <div className="space-y-4">
      {/* ── Header ── */}
      <div
        className="rounded-2xl border p-6"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">⚡</span>
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}
          >
            LIVE DEMO
          </span>
        </div>
        <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
          Project Quote Estimator
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Pick your project type, add-ons, and timeline — get an instant price range with a
          downloadable PDF summary.
        </p>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mt-5">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  background: step >= s ? "var(--accent)" : "var(--bg)",
                  color: step >= s ? "#fff" : "var(--text-muted)",
                  border: `1.5px solid ${step >= s ? "var(--accent)" : "var(--border)"}`,
                }}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className="w-8 h-0.5 rounded transition-all duration-300"
                  style={{ background: step > s ? "var(--accent)" : "var(--border)" }}
                />
              )}
            </div>
          ))}
          <span className="ml-2 text-xs" style={{ color: "var(--text-muted)" }}>
            {stepLabels[step - 1]}
          </span>
        </div>
      </div>

      {/* ── Step 1: Project Type ── */}
      {step === 1 && (
        <div
          className="rounded-2xl border p-6"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            What are you building?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projectTypes.map((pt) => {
              const selected = projectTypeId === pt.id;
              return (
                <button
                  key={pt.id}
                  onClick={() => setProjectTypeId(pt.id)}
                  className="rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: selected ? "var(--accent-subtle)" : "var(--bg)",
                    borderColor: selected ? "var(--accent)" : "var(--border)",
                  }}
                >
                  <span className="text-xl">{pt.icon}</span>
                  <p
                    className="text-sm font-semibold mt-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {pt.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    {pt.description}
                  </p>
                  <p
                    className="text-xs mt-2 font-mono font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    ${fmt(pt.low)} – ${fmt(pt.high)}
                  </p>
                </button>
              );
            })}
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setStep(2)}
              disabled={!projectTypeId}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Next <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2: Add-ons ── */}
      {step === 2 && (
        <div
          className="rounded-2xl border p-6"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <h2 className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
            Any add-ons?{" "}
            <span className="font-normal" style={{ color: "var(--text-muted)" }}>
              (optional)
            </span>
          </h2>
          <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
            Select everything you need — prices stack on top of your base.
          </p>
          <div className="space-y-2">
            {addons.map((addon) => {
              const selected = selectedAddons.has(addon.id);
              return (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className="w-full flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-150"
                  style={{
                    background: selected ? "var(--accent-subtle)" : "var(--bg)",
                    borderColor: selected ? "var(--accent)" : "var(--border)",
                  }}
                >
                  {selected ? (
                    <CheckCircle2
                      size={16}
                      style={{ color: "var(--accent)", flexShrink: 0 }}
                    />
                  ) : (
                    <Circle size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {addon.name}
                    </span>
                    <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>
                      {addon.description}
                    </span>
                  </div>
                  <span
                    className="text-xs font-mono font-semibold shrink-0"
                    style={{ color: "var(--accent)" }}
                  >
                    +${addon.low}–${addon.high}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            >
              <ArrowLeft size={14} /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Next <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Timeline + Result ── */}
      {step === 3 && (
        <>
          <div
            className="rounded-2xl border p-6"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
              What&apos;s your timeline?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {timelines.map((t) => {
                const selected = timelineId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTimelineId(t.id)}
                    className="rounded-xl border p-3 text-left transition-all duration-150"
                    style={{
                      background: selected ? "var(--accent-subtle)" : "var(--bg)",
                      borderColor: selected ? "var(--accent)" : "var(--border)",
                    }}
                  >
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t.label}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {t.duration}
                    </p>
                    {t.note && (
                      <p
                        className="text-[10px] mt-1.5 font-bold"
                        style={{ color: t.noteColor }}
                      >
                        {t.note}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-start mt-4">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
              >
                <ArrowLeft size={14} /> Back
              </button>
            </div>
          </div>

          {/* ── Result Card ── */}
          <div
            className="rounded-2xl border p-6"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <h2
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Your Estimate
            </h2>

            {/* Big number */}
            <div
              className="rounded-xl p-5 mb-5"
              style={{
                background: "var(--accent-subtle)",
                border: "1.5px solid var(--accent)",
              }}
            >
              <p
                className="text-3xl font-bold font-mono"
                style={{ color: "var(--accent)" }}
              >
                ${fmt(estimate.low)} — ${fmt(estimate.high)}
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                USD · Ballpark estimate. Final quote depends on exact scope.
              </p>
            </div>

            {/* Breakdown */}
            <div className="space-y-2 mb-5 pb-5 border-b" style={{ borderColor: "var(--border)" }}>
              <p
                className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                Breakdown
              </p>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--text-secondary)" }}>
                  {selectedProject?.icon} {selectedProject?.name}
                </span>
                <span className="font-mono font-medium" style={{ color: "var(--text-primary)" }}>
                  ${fmt(selectedProject!.low)} – ${fmt(selectedProject!.high)}
                </span>
              </div>
              {Array.from(selectedAddons).map((id) => {
                const a = addons.find((x) => x.id === id);
                if (!a) return null;
                return (
                  <div key={id} className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-secondary)" }}>+ {a.name}</span>
                    <span
                      className="font-mono font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      +${a.low} – ${a.high}
                    </span>
                  </div>
                );
              })}
              {selectedTimeline.multiplier !== 1 && (
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--text-secondary)" }}>
                    ⏱ {selectedTimeline.label} timeline
                  </span>
                  <span
                    className="font-mono font-medium"
                    style={{
                      color:
                        selectedTimeline.multiplier > 1 ? "#f59e0b" : "#10b981",
                    }}
                  >
                    {selectedTimeline.multiplier > 1 ? "+" : "−"}
                    {Math.round(Math.abs(1 - selectedTimeline.multiplier) * 100)}%
                  </span>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "var(--accent)", color: "#fff" }}
              >
                <Download size={14} /> Download PDF
              </button>
              <a
                href="https://calendly.com/jomellhopedelapena/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
              >
                <Calendar size={14} /> Get an exact quote
              </a>
              <button
                onClick={reset}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200"
                style={{ color: "var(--text-muted)" }}
              >
                <RefreshCw size={13} /> Start over
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
