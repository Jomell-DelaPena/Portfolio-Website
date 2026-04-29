"use client";

import { useMemo, useState } from "react";
import { BriefcaseBusiness, Calculator, Check, Clipboard, RefreshCw } from "lucide-react";

type Currency = "USD" | "PHP";
type Experience = "starter" | "experienced" | "specialist";
type Service = "admin" | "marketing" | "technical" | "executive";

const currencySymbols: Record<Currency, string> = {
  USD: "$",
  PHP: "₱",
};

const experienceLevels: { id: Experience; label: string; multiplier: number }[] = [
  { id: "starter", label: "Starter", multiplier: 1 },
  { id: "experienced", label: "Experienced", multiplier: 1.25 },
  { id: "specialist", label: "Specialist", multiplier: 1.5 },
];

const services: { id: Service; label: string; multiplier: number }[] = [
  { id: "admin", label: "Admin VA", multiplier: 1 },
  { id: "marketing", label: "Marketing VA", multiplier: 1.2 },
  { id: "technical", label: "Technical VA", multiplier: 1.4 },
  { id: "executive", label: "Executive VA", multiplier: 1.3 },
];

function money(value: number, currency: Currency) {
  return `${currencySymbols[currency]}${Math.round(value).toLocaleString("en-US")}`;
}

export default function VARateCalculatorPage() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [monthlyTarget, setMonthlyTarget] = useState(1200);
  const [hoursPerWeek, setHoursPerWeek] = useState(30);
  const [buffer, setBuffer] = useState(20);
  const [experience, setExperience] = useState<Experience>("experienced");
  const [service, setService] = useState<Service>("marketing");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const safeHours = Math.max(hoursPerWeek, 1);
    const monthlyHours = safeHours * 4.33;
    const experienceMultiplier =
      experienceLevels.find((item) => item.id === experience)?.multiplier ?? 1;
    const serviceMultiplier = services.find((item) => item.id === service)?.multiplier ?? 1;
    const baseHourly = monthlyTarget / monthlyHours;
    const recommended = baseHourly * (1 + buffer / 100) * experienceMultiplier * serviceMultiplier;

    return {
      floor: recommended * 0.85,
      recommended,
      premium: recommended * 1.25,
      weekly: recommended * safeHours,
      monthly: recommended * monthlyHours,
      retainer10: recommended * 10,
      retainer20: recommended * 20,
      retainer40: recommended * 40,
    };
  }, [buffer, experience, hoursPerWeek, monthlyTarget, service]);

  const summary = [
    `Recommended hourly rate: ${money(result.recommended, currency)} ${currency}`,
    `Starter floor: ${money(result.floor, currency)} ${currency}`,
    `Premium rate: ${money(result.premium, currency)} ${currency}`,
    `Weekly estimate: ${money(result.weekly, currency)} ${currency}`,
    `Monthly estimate: ${money(result.monthly, currency)} ${currency}`,
  ].join("\n");

  const copySummary = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const reset = () => {
    setCurrency("USD");
    setMonthlyTarget(1200);
    setHoursPerWeek(30);
    setBuffer(20);
    setExperience("experienced");
    setService("marketing");
  };

  return (
    <div className="space-y-4">
      <div
        className="rounded-2xl border p-6"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <BriefcaseBusiness size={15} style={{ color: "var(--accent)" }} />
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b" }}
          >
            VA NICHE
          </span>
        </div>
        <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
          VA Rate Calculator
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Estimate hourly, weekly, and monthly pricing for virtual assistant and remote work.
        </p>
      </div>

      <div
        className="rounded-2xl border p-6 space-y-5"
        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        <div>
          <Label>Currency</Label>
          <div className="flex flex-wrap gap-2">
            {(["USD", "PHP"] as Currency[]).map((item) => (
              <button
                key={item}
                onClick={() => setCurrency(item)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150"
                style={{
                  background: currency === item ? "var(--accent)" : "var(--bg)",
                  borderColor: currency === item ? "var(--accent)" : "var(--border)",
                  color: currency === item ? "#fff" : "var(--text-secondary)",
                }}
              >
                {currencySymbols[item]} {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <NumberField
            label="Monthly Target"
            value={monthlyTarget}
            min={1}
            onChange={setMonthlyTarget}
          />
          <NumberField
            label="Hours / Week"
            value={hoursPerWeek}
            min={1}
            max={80}
            onChange={setHoursPerWeek}
          />
          <NumberField label="Buffer %" value={buffer} min={0} max={100} onChange={setBuffer} />
        </div>

        <SegmentedControl
          label="Experience"
          value={experience}
          options={experienceLevels}
          onChange={setExperience}
        />
        <SegmentedControl label="Service Type" value={service} options={services} onChange={setService} />
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
            Suggested Rates
          </h2>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-all duration-150 hover:-translate-y-0.5"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            <RefreshCw size={11} /> Reset
          </button>
        </div>

        <div
          className="rounded-xl p-5 mb-4"
          style={{ background: "var(--accent-subtle)", border: "1.5px solid var(--accent)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            Recommended hourly
          </p>
          <p className="text-3xl font-bold font-mono mt-1" style={{ color: "var(--accent)" }}>
            {money(result.recommended, currency)}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            {currency} per hour, based on your target and workload.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <RateCard label="Starter Floor" value={money(result.floor, currency)} />
          <RateCard label="Weekly Estimate" value={money(result.weekly, currency)} />
          <RateCard label="Premium Rate" value={money(result.premium, currency)} />
        </div>

        <div
          className="rounded-xl border p-4"
          style={{ background: "var(--bg)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--accent)" }}>
              <Calculator size={12} /> Retainer Ideas
            </span>
            <button
              onClick={copySummary}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-all duration-150 hover:-translate-y-0.5"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              {copied ? <Check size={11} style={{ color: "#10b981" }} /> : <Clipboard size={11} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="space-y-2">
            <Retainer hours={10} value={result.retainer10} currency={currency} />
            <Retainer hours={20} value={result.retainer20} currency={currency} />
            <Retainer hours={40} value={result.retainer40} currency={currency} />
          </div>
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

function NumberField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max?: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
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

function SegmentedControl<T extends string>({
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

function RateCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
        {label}
      </p>
      <p className="text-lg font-bold font-mono mt-1" style={{ color: "var(--text-primary)" }}>
        {value}
      </p>
    </div>
  );
}

function Retainer({ hours, value, currency }: { hours: number; value: number; currency: Currency }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span style={{ color: "var(--text-secondary)" }}>{hours} hours / month</span>
      <span className="font-mono font-semibold" style={{ color: "var(--text-primary)" }}>
        {money(value, currency)}
      </span>
    </div>
  );
}
