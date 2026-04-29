"use client";

import { useMemo, useState } from "react";
import { Check, Clipboard, Code2, RefreshCw, Search } from "lucide-react";

type Tone = "professional" | "friendly" | "premium" | "direct";
type PageType = "Homepage" | "Service Page" | "Landing Page" | "About Page";

const tones: { id: Tone; label: string }[] = [
  { id: "professional", label: "Professional" },
  { id: "friendly", label: "Friendly" },
  { id: "premium", label: "Premium" },
  { id: "direct", label: "Direct" },
];

const pageTypes: PageType[] = ["Homepage", "Service Page", "Landing Page", "About Page"];

function clean(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function clampText(value: string, max: number) {
  const text = clean(value);
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}...`;
}

export default function MetaTagsPage() {
  const [businessName, setBusinessName] = useState("PH Web Dev Services");
  const [pageType, setPageType] = useState<PageType>("Homepage");
  const [primaryOffer, setPrimaryOffer] = useState("fast, mobile-friendly websites for small businesses");
  const [audience, setAudience] = useState("small business owners");
  const [location, setLocation] = useState("Philippines");
  const [keywords, setKeywords] = useState("web design, SEO, landing pages");
  const [tone, setTone] = useState<Tone>("professional");
  const [copied, setCopied] = useState<string | null>(null);

  const tags = useMemo(() => {
    const name = clean(businessName) || "Your Business";
    const offer = clean(primaryOffer) || "professional services";
    const target = clean(audience) || "business owners";
    const place = clean(location);
    const keywordList = clean(keywords);

    const toneLead: Record<Tone, string> = {
      professional: "Build trust with",
      friendly: "Make it easier to grow with",
      premium: "Elevate your brand with",
      direct: "Get",
    };

    const titleBase =
      pageType === "Homepage"
        ? `${name} | ${offer}`
        : `${name} ${pageType.replace(" Page", "")} | ${offer}`;

    const descriptionBase = `${toneLead[tone]} ${offer} for ${target}${
      place ? ` in ${place}` : ""
    }. Clear strategy, clean execution, and results-focused delivery.`;

    const title = clampText(titleBase, 60);
    const description = clampText(descriptionBase, 155);
    const ogTitle = clampText(`${name} - ${offer}`, 70);
    const ogDescription = clampText(
      `${description}${keywordList ? ` Keywords: ${keywordList}.` : ""}`,
      180
    );

    const snippet = [
      `<title>${title}</title>`,
      `<meta name="description" content="${description}" />`,
      `<meta property="og:title" content="${ogTitle}" />`,
      `<meta property="og:description" content="${ogDescription}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${ogTitle}" />`,
      `<meta name="twitter:description" content="${ogDescription}" />`,
    ].join("\n");

    return { title, description, ogTitle, ogDescription, snippet };
  }, [audience, businessName, keywords, location, pageType, primaryOffer, tone]);

  const copy = async (id: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };

  const reset = () => {
    setBusinessName("");
    setPageType("Homepage");
    setPrimaryOffer("");
    setAudience("");
    setLocation("");
    setKeywords("");
    setTone("professional");
  };

  return (
    <div className="space-y-4">
      <div
        className="rounded-2xl border p-6"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Search size={15} style={{ color: "var(--accent)" }} />
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={{ background: "rgba(14,165,233,0.1)", color: "#0ea5e9" }}
          >
            SEO TOOL
          </span>
        </div>
        <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
          Meta Tags Generator
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Create SEO titles, meta descriptions, and social sharing tags for client websites.
        </p>
      </div>

      <div
        className="rounded-2xl border p-6 space-y-5"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Business Name" value={businessName} onChange={setBusinessName} />
          <div>
            <Label>Page Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {pageTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setPageType(type)}
                  className="px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-150"
                  style={{
                    background: pageType === type ? "var(--accent)" : "var(--bg)",
                    borderColor: pageType === type ? "var(--accent)" : "var(--border)",
                    color: pageType === type ? "#fff" : "var(--text-secondary)",
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Field label="Primary Offer" value={primaryOffer} onChange={setPrimaryOffer} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Audience" value={audience} onChange={setAudience} />
          <Field label="Location" value={location} onChange={setLocation} />
        </div>
        <Field label="Keywords" value={keywords} onChange={setKeywords} />

        <div>
          <Label>Tone</Label>
          <div className="flex flex-wrap gap-2">
            {tones.map((item) => (
              <button
                key={item.id}
                onClick={() => setTone(item.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150"
                style={{
                  background: tone === item.id ? "var(--accent)" : "var(--bg)",
                  borderColor: tone === item.id ? "var(--accent)" : "var(--border)",
                  color: tone === item.id ? "#fff" : "var(--text-secondary)",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="rounded-2xl border p-6"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            Generated Tags
          </h2>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-all duration-150 hover:-translate-y-0.5"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            <RefreshCw size={11} /> Reset
          </button>
        </div>

        <div className="space-y-3">
          <ResultRow label="SEO Title" value={tags.title} count={`${tags.title.length}/60`} />
          <ResultRow
            label="Meta Description"
            value={tags.description}
            count={`${tags.description.length}/155`}
          />
          <ResultRow label="OG Title" value={tags.ogTitle} count={`${tags.ogTitle.length}/70`} />
          <ResultRow
            label="OG Description"
            value={tags.ogDescription}
            count={`${tags.ogDescription.length}/180`}
          />
        </div>

        <div
          className="rounded-xl border p-4 mt-4"
          style={{ background: "var(--bg)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--accent)" }}>
              <Code2 size={12} /> HTML Snippet
            </span>
            <CopyButton id="snippet" copied={copied} onClick={() => copy("snippet", tags.snippet)} />
          </div>
          <pre
            className="text-xs leading-relaxed overflow-hidden"
            style={{ color: "var(--text-secondary)", whiteSpace: "pre-wrap" }}
          >
            {tags.snippet}
          </pre>
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label
      className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
      style={{ color: "var(--text-muted)" }}
    >
      {children}
    </label>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors"
        style={{
          background: "var(--bg)",
          borderColor: "var(--border)",
          color: "var(--text-primary)",
        }}
        onFocus={(event) => (event.target.style.borderColor = "var(--accent)")}
        onBlur={(event) => (event.target.style.borderColor = "var(--border)")}
      />
    </div>
  );
}

function ResultRow({ label, value, count }: { label: string; value: string; count: string }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>
          {label}
        </span>
        <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>
          {count}
        </span>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
        {value}
      </p>
    </div>
  );
}

function CopyButton({
  id,
  copied,
  onClick,
}: {
  id: string;
  copied: string | null;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-all duration-150 hover:-translate-y-0.5"
      style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
    >
      {copied === id ? <Check size={11} style={{ color: "#10b981" }} /> : <Clipboard size={11} />}
      {copied === id ? "Copied" : "Copy"}
    </button>
  );
}
