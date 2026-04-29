"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-lg border transition-colors duration-200 hover:bg-[var(--bg-card-hover)]"
      style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
