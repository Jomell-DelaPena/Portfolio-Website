"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { recommendations } from "@/lib/data";

export default function Recommendations() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % recommendations.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + recommendations.length) % recommendations.length);
  const next = () => setCurrent((c) => (c + 1) % recommendations.length);

  return (
    <div
      className="rounded-2xl border p-6 animate-fade-in delay-700"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <h2
        className="text-xs font-semibold uppercase tracking-widest mb-5"
        style={{ color: "var(--text-muted)" }}
      >
        Recommendations
      </h2>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {recommendations.map((rec, i) => (
            <div key={i} className="w-full shrink-0 pr-1">
              <Quote size={20} style={{ color: "var(--accent)", opacity: 0.5 }} className="mb-3" />
              <p
                className="text-sm leading-relaxed italic"
                style={{ color: "var(--text-secondary)", fontFamily: "Georgia, serif" }}
              >
                &ldquo;{rec.quote}&rdquo;
              </p>
              <div className="mt-4">
                <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                  {rec.name}
                </p>
                <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                  {rec.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-5">
        {/* Dot indicators */}
        <div className="flex gap-1.5">
          {recommendations.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === current ? "16px" : "6px",
                background: i === current ? "var(--accent)" : "var(--border)",
              }}
              aria-label={`Go to recommendation ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <div className="flex gap-1.5">
          <button
            onClick={prev}
            className="p-1.5 rounded-lg border transition-colors hover:bg-[var(--bg-card-hover)]"
            style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
            aria-label="Previous"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={next}
            className="p-1.5 rounded-lg border transition-colors hover:bg-[var(--bg-card-hover)]"
            style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
            aria-label="Next"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
