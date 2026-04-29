"use client";

import { useState } from "react";
import { Copy, Check, Loader2, Sparkles } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Platform = "facebook-ad" | "email-subject" | "website-hero" | "instagram" | "google-ad";
type Tone = "professional" | "casual" | "urgent" | "inspirational" | "bold";

interface CopyVariation {
  label: string;
  copy: string;
  note: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const platforms: { id: Platform; label: string; icon: string }[] = [
  { id: "facebook-ad", label: "Facebook Ad", icon: "📘" },
  { id: "email-subject", label: "Email Subject", icon: "📧" },
  { id: "website-hero", label: "Website Hero", icon: "🌐" },
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "google-ad", label: "Google Ad", icon: "🔍" },
];

const tones: { id: Tone; label: string }[] = [
  { id: "professional", label: "Professional" },
  { id: "casual", label: "Casual" },
  { id: "urgent", label: "Urgent" },
  { id: "inspirational", label: "Inspirational" },
  { id: "bold", label: "Bold" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function CopyGeneratorPage() {
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [platform, setPlatform] = useState<Platform>("facebook-ad");
  const [tone, setTone] = useState<Tone>("professional");

  const [results, setResults] = useState<CopyVariation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<number | null>(null);

  const isValid = product.trim() && description.trim() && audience.trim();

  const handleGenerate = async () => {
    if (!isValid) return;
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch("/api/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, description, audience, platform, tone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Generation failed.");
      setResults(data.variations);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      {/* ── Header ── */}
      <div
        className="rounded-2xl border p-6"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">✍️</span>
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={{ background: "rgba(139,92,246,0.1)", color: "#8b5cf6" }}
          >
            AI-POWERED
          </span>
        </div>
        <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
          Marketing Copy Generator
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Describe your product, pick a platform and tone — get 3 ready-to-use copy variations
          powered by Groq AI.
        </p>
      </div>

      {/* ── Form ── */}
      <div
        className="rounded-2xl border p-6 space-y-5"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        {/* Product name */}
        <div>
          <label
            className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            Product / Service Name
          </label>
          <input
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="e.g. PH Web Dev Services"
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors"
            style={{
              background: "var(--bg)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>

        {/* Description */}
        <div>
          <label
            className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            What does it do?
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. We build fast, mobile-first websites for small businesses in the Philippines — helping them get more leads and look professional online."
            rows={3}
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors resize-none"
            style={{
              background: "var(--bg)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>

        {/* Target audience */}
        <div>
          <label
            className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            Target Audience
          </label>
          <input
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g. Small business owners in the Philippines aged 30–50"
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors"
            style={{
              background: "var(--bg)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>

        {/* Platform */}
        <div>
          <label
            className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            Platform
          </label>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => {
              const selected = platform === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150"
                  style={{
                    background: selected ? "var(--accent)" : "var(--bg)",
                    borderColor: selected ? "var(--accent)" : "var(--border)",
                    color: selected ? "#fff" : "var(--text-secondary)",
                  }}
                >
                  {p.icon} {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tone */}
        <div>
          <label
            className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            Tone
          </label>
          <div className="flex flex-wrap gap-2">
            {tones.map((t) => {
              const selected = tone === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150"
                  style={{
                    background: selected ? "var(--accent)" : "var(--bg)",
                    borderColor: selected ? "var(--accent)" : "var(--border)",
                    color: selected ? "#fff" : "var(--text-secondary)",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate */}
        <button
          onClick={handleGenerate}
          disabled={!isValid || loading}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          {loading ? (
            <>
              <Loader2 size={15} className="animate-spin" /> Generating…
            </>
          ) : (
            <>
              <Sparkles size={15} /> Generate Copy
            </>
          )}
        </button>

        {error && (
          <p className="text-sm text-center" style={{ color: "#ef4444" }}>
            {error}
          </p>
        )}
      </div>

      {/* ── Results ── */}
      {results.length > 0 && (
        <div
          className="rounded-2xl border p-6"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <h2
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            Generated Variations
          </h2>
          <div className="space-y-3">
            {results.map((v, i) => (
              <div
                key={i}
                className="rounded-xl border p-4"
                style={{ background: "var(--bg)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    {v.label}
                  </span>
                  <button
                    onClick={() => handleCopy(v.copy, i)}
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-all duration-150 hover:-translate-y-0.5"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                  >
                    {copied === i ? (
                      <Check size={11} style={{ color: "#10b981" }} />
                    ) : (
                      <Copy size={11} />
                    )}
                    {copied === i ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-primary)" }}
                >
                  {v.copy}
                </p>
                {v.note && (
                  <p
                    className="text-xs mt-2.5 italic"
                    style={{ color: "var(--text-muted)" }}
                  >
                    💡 {v.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Re-generate */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-4 flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-all duration-150 hover:-translate-y-0.5 disabled:opacity-40"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            <Sparkles size={11} /> Regenerate
          </button>
        </div>
      )}
    </div>
  );
}
