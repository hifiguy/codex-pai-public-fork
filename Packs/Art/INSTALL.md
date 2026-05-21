# Art — Installation Guide

**For AI agents installing this pack into a user's PAI infrastructure.**

---

## AI Agent Instructions

Use ChatGPT Codex's native tools (`AskUserQuestion`, `TodoWrite`, `Bash`, `Read`, `Write`) to walk the user through this wizard.

### Welcome Message

```
"I'm installing the Art skill from the PAI v5.0.0 release.

Generates static visual content across 20+ formats via Flux, Nano Banana Pro (Gemini 3 Pro), and GPT-Image-1. Covers blog header illustrations, editorial art, Mermaid flowcharts, technical architecture diagrams, D3.js dashboards, taxonomies, timelines, 2x2 framework matrices, comparisons, annotated screenshots, recipe cards, aphorism/quote cards, conceptual maps, stat cards, comic panels, YouTube thumbnails, PAI pack icons, and brand-logo wallpapers. Named workflows: Essay, D3Dashboards, Visualize, Mermaid, TechnicalDiagrams, Taxonomies, Timelines, Frameworks, Comparisons, AnnotatedScreenshots, RecipeCards, Aphorisms, Maps, Stats, Comics, YouTubeThumbnailChecklist, AdHocYouTubeThumbnail, CreatePAIPackIcon, LogoWallpaper, RemoveBackground. SKILLCUSTOMIZATIONS loads PREFERENCES.md, CharacterSpecs.md, and SceneConstruction.md. --remove-bg flag produces transparent-background PNG (can produce black backgrounds — verify visually). Up to 14 reference images per request (5 human, 6 object Gemini API limit). Output staged to ~/Downloads/ for preview before any project directory copy. Nano Banana Pro uses --size for resolution tier 1K/2K/4K and separate --aspect-ratio.

Let me check your system and install."
```

---

## Phase 1: System Analysis

```bash
ENGINE_DIR="$HOME/.codex"
SKILL_DIR="$ENGINE_DIR/skills/Art"

if [ -d "$SKILL_DIR" ]; then
  echo "EXISTING Art skill found at $SKILL_DIR — will back up before install"
else
  echo "Clean install — no existing Art skill"
fi
```

---

## Phase 2: Confirm with User

Ask the user (use `AskUserQuestion`):

1. "Install `Art` into `~/.codex/skills/Art/`? (yes/no)"
2. If existing skill found: "Back up the existing `Art` to `~/.codex/skills/Art.backup-{timestamp}/` first? (yes/no — recommend yes)"

---

## Phase 3: Backup (only if existing)

```bash
if [ -d "$SKILL_DIR" ]; then
  BACKUP="$SKILL_DIR.backup-$(date +%Y%m%d-%H%M%S)"
  mv "$SKILL_DIR" "$BACKUP"
  echo "Backed up to $BACKUP"
fi
```

---

## Phase 4: Install

```bash
mkdir -p "$ENGINE_DIR/skills"
cp -R src/ "$SKILL_DIR/"
echo "Installed to $SKILL_DIR"
```

---

## Phase 5: Verify

Run the file and functional checks in [VERIFY.md](VERIFY.md). Confirm to the user when all checks pass.
