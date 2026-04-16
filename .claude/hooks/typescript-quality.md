# TypeScript Quality Hook

Post-edit hook that runs TypeScript compilation, ESLint, and Prettier checks on modified files.

## Configuration (settings.local.json)

Add this to `.claude/settings.local.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/quality-check.js"
          }
        ]
      }
    ]
  }
}
```

## Rules for Next.js / React (this project)
- Console logs in components: **allowed** (warn only)
- `as any` TypeScript cast: **warn** (not error)
- JSX/TSX: fully supported
- Prettier: enforced on save
- ESLint: next/core-web-vitals ruleset

## What It Checks
1. `tsc --noEmit` — TypeScript type errors
2. `eslint --fix` — lint errors auto-fixed where possible
3. `prettier --write` — format consistency

## Manual Run

```bash
# Type check only
npx tsc --noEmit

# Lint + fix
npx eslint . --fix

# Format
npx prettier --write .
```
