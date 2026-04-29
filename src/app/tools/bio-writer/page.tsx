"use client";

import { useMemo, useState } from "react";
import { Check, Clipboard, RefreshCw, UserRoundPen } from "lucide-react";

type Tone = "professional" | "warm" | "bold" | "approachable";
type Length = "short" | "medium" | "long";

const tones: { id: Tone; label: string }[] = [
  { id: "professional", label: "Professional" },
  { id: "warm", label: "Warm" },
  { id: "bold", label: "Bold" },
  { id: "approachable", label: "Approachable" },
];

const lengths: { id: Length; label: string }[] = [
  { id: "short", label: "Short" },
  { id: "medium", label: "Medium" },
  { id: "long", label: "Long" },
];

function clean(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export default function BioWriterPage() {
  const [name, setName] = useState("Jomell Hope Dela Pena");
  const [role, setRole] = useState("full-stack developer");
  const [business, setBusiness] = useState("modern websites and web applications");
  const [audience, setAudience] = useState("business owners and growing teams");
  const [proof, setProof] = useState("clean design, reliable delivery, and practical digital systems");
  const [location, setLocation] = useState("Philippines");
  const [tone, setTone] = useState<Tone>("professional");
  const [length, setLength] = useState<Length>("medium");
  const [copied, setCopied] = useState<number | null>(null);

  const bios = useMemo(() => {
    const safeName = clean(name) || "This professional";
    const safeRole = clean(role) || "business owner";
    const safeBusiness = clean(business) || "helpful services";
    const safeAudience = clean(audience) || "clients";
    const safeProof = clean(proof) || "clear communication and dependable work";
    const safeLocation = clean(location);
    const place = safeLocation ? ` based in ${safeLocation}` : "";

    const openers: Record<Tone, string> = {
      professional: `${safeName} is a ${safeRole}${place} specializing in ${safeBusiness}.`,
      warm: `${safeName} helps ${safeAudience} feel confident about ${safeBusiness}.`,
      bold: `${safeName} builds ${safeBusiness} for ${safeAudience} who want better results.`,
      approachable: `${safeName} is a ${safeRole}${place} who makes ${safeBusiness} easier to understand and use.`,
    };

    const short = `${openers[tone]} Known for ${safeProof}.`;
    const medium = `${openers[tone]} ${safeName.split(" ")[0]} works with ${safeAudience} to turn ideas into polished, practical outcomes. Known for ${safeProof}, ${safeName.split(" ")[0]} focuses on work that is clear, useful, and built around real client goals.`;
    const long = `${openers[tone]} With a practical, client-focused approach, ${safeName.split(" ")[0]} works with ${safeAudience} to shape ideas into polished outcomes that are easy to use and easy to maintain. Their work is grounded in ${safeProof}, making each project feel thoughtful, organized, and ready for real-world use.`;

    const variants = {
      short: [
        { label: "Website Bio", copy: short },
        {
          label: "Social Bio",
          copy: `${safeRole.charAt(0).toUpperCase()}${safeRole.slice(1)}${place}. Helping ${safeAudience} with ${safeBusiness}.`,
        },
        {
          label: "Profile Intro",
          copy: `${safeName} helps ${safeAudience} create ${safeBusiness} with ${safeProof}.`,
        },
      ],
      medium: [
        { label: "Website Bio", copy: medium },
        {
          label: "About Section",
          copy: `${safeName} is a ${safeRole}${place} helping ${safeAudience} with ${safeBusiness}. Their approach combines ${safeProof}, giving clients a smoother path from idea to finished result.`,
        },
        {
          label: "Profile Intro",
          copy: `${safeName} works with ${safeAudience} to create ${safeBusiness}. With a focus on ${safeProof}, they help clients present their work clearly and move faster online.`,
        },
      ],
      long: [
        { label: "Website Bio", copy: long },
        {
          label: "About Section",
          copy: `${safeName} is a ${safeRole}${place} focused on creating ${safeBusiness} for ${safeAudience}. Their process emphasizes ${safeProof}, so each project feels aligned with the client's goals, audience, and day-to-day needs. Whether the work involves a new digital presence, a clearer message, or a smoother client experience, ${safeName.split(" ")[0]} brings structure and care to every step.`,
        },
        {
          label: "Profile Intro",
          copy: `${safeName} helps ${safeAudience} bring ${safeBusiness} to life through a practical and thoughtful process. Known for ${safeProof}, they focus on creating work that communicates clearly, supports real business needs, and feels ready for people to use.`,
        },
      ],
    };

    return variants[length];
  }, [audience, business, length, location, name, proof, role, tone]);

  const copy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 1800);
  };

  const reset = () => {
    setName("");
    setRole("");
    setBusiness("");
    setAudience("");
    setProof("");
    setLocation("");
    setTone("professional");
    setLength("medium");
  };

  return (
    <div className="space-y-4">
      <div
        className="rounded-2xl border p-6"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <UserRoundPen size={15} style={{ color: "var(--accent)" }} />
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={{ background: "rgba(236,72,153,0.1)", color: "#ec4899" }}
          >
            LOCAL TOOL
          </span>
        </div>
        <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
          Bio Writer
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Generate polished bios for business owners, freelancers, and professional profiles.
        </p>
      </div>

      <div
        className="rounded-2xl border p-6 space-y-5"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Name" value={name} onChange={setName} />
          <Field label="Role" value={role} onChange={setRole} />
        </div>
        <Field label="What They Offer" value={business} onChange={setBusiness} />
        <Field label="Audience" value={audience} onChange={setAudience} />
        <Field label="Proof / Strengths" value={proof} onChange={setProof} />
        <Field label="Location" value={location} onChange={setLocation} />

        <Segmented label="Tone" value={tone} options={tones} onChange={setTone} />
        <Segmented label="Length" value={length} options={lengths} onChange={setLength} />
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
            Bio Variations
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
          {bios.map((bio, index) => (
            <div
              key={bio.label}
              className="rounded-xl border p-4"
              style={{ background: "var(--bg)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>
                  {bio.label}
                </span>
                <button
                  onClick={() => copy(bio.copy, index)}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-all duration-150 hover:-translate-y-0.5"
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                >
                  {copied === index ? (
                    <Check size={11} style={{ color: "#10b981" }} />
                  ) : (
                    <Clipboard size={11} />
                  )}
                  {copied === index ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
                {bio.copy}
              </p>
            </div>
          ))}
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

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {options.map((item) => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className="px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-150"
            style={{
              background: value === item.id ? "var(--accent)" : "var(--bg)",
              borderColor: value === item.id ? "var(--accent)" : "var(--border)",
              color: value === item.id ? "#fff" : "var(--text-secondary)",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
