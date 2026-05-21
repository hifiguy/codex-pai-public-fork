<div align="center">

<img src="pai-packs-icon.png" alt="PAI Packs" width="256">

# PAI Packs

</div>

Standalone, AI-installable capabilities for ChatGPT Codex and other AI agent systems. Each pack is a self-contained directory — point your DA at it and say "install this," and it sets everything up.

Every v5.0.0 skill ships as its own pack below. Each pack contains `README.md`, `INSTALL.md`, `VERIFY.md`, and `src/` (the actual skill source).

## How to Install

```
"Install the Research pack from PAI/Packs/Research/"
```

Your DA reads `INSTALL.md` and walks through a 5-phase wizard: system analysis, user questions, backup, installation, verification.

---

## All Skills (v5.0.0 — 45)

| Skill | What it does |
|-------|--------------|
| [Agents](Agents/) | Compose custom agents from base traits, voice, and specialization; manage functional teams |
| [ApertureOscillation](ApertureOscillation/) | 3-pass scope oscillation: narrow tactical, wide strategic, then synthesis to surface design tensions |
| [Aphorisms](Aphorisms/) | Curated aphorism collection with content matching, themed search, thinker research |
| [Apify](Apify/) | Scrape Instagram, LinkedIn, TikTok, YouTube, Facebook, Google Maps, e-commerce via Apify actors |
| [Art](Art/) | Static visual content across 20+ formats via Flux, Nano Banana Pro, GPT-Image-1 |
| [ArXiv](ArXiv/) | Search and retrieve arXiv academic papers with AlphaXiv-enriched AI summaries |
| [AudioEditor](AudioEditor/) | Whisper transcription → Claude classification → ffmpeg cuts for audio/video editing |
| [BeCreative](BeCreative/) | Divergent ideation via Verbalized Sampling and extended thinking |
| [BitterPillEngineering](BitterPillEngineering/) | Audit AI instruction sets for over-prompting; classify rules CUT/RESOLVE/MERGE/KEEP |
| [BrightData](BrightData/) | 4-tier progressive scraping with auto-escalation through WebFetch, curl, browser, MCP proxy |
| [Browser](Browser/) | Headless browser automation via agent-browser Rust CLI for batch and parallel work |
| [ContextSearch](ContextSearch/) | 2-phase context search across session registry, work directories, and ISAs for cold-start recovery |
| [Council](Council/) | Multi-agent collaborative debate with round-by-round transcripts and intellectual friction |
| [CreateCLI](CreateCLI/) | Generate production TypeScript CLIs via 3-tier template system (manual, Commander, oclif) |
| [CreateSkill](CreateSkill/) | Complete PAI skill development lifecycle — scaffold, validate, canonicalize, evaluate |
| [Daemon](Daemon/) | Manage public daemon profile — living digital presence with deterministic security filtering |
| [Delegation](Delegation/) | Six parallelization patterns: built-in agents, worktrees, background tasks, custom agents |
| [Evals](Evals/) | Agent evaluation framework with code-based, model-based, and human graders; pass@k scoring |
| [ExtractWisdom](ExtractWisdom/) | Content-adaptive wisdom extraction that detects domains and builds custom sections |
| [Fabric](Fabric/) | Execute any of 240+ Fabric prompt patterns natively across extraction, analysis, creation |
| [FirstPrinciples](FirstPrinciples/) | Physics-based reasoning that deconstructs problems to irreducible truths |
| [Ideate](Ideate/) | Evolutionary ideation engine — 9-phase loop for novel solution generation |
| [Interceptor](Interceptor/) | Real Chrome browser automation with zero CDP fingerprint; mandatory for visual verification |
| [Interview](Interview/) | Phased conversational interview across all PAI context files (TELOS first) |
| [ISA](ISA/) | Owns the Ideal State Artifact primitive — articulate "done" for any kind of work |
| [IterativeDepth](IterativeDepth/) | Multi-angle exploration through 2-8 sequential passes from different scientific lenses |
| [Knowledge](Knowledge/) | Manage typed Knowledge Archive across People, Companies, Ideas, Research with 8 link types |
| [Loop](Loop/) | Iterative improvement loop — refine a target across multiple Algorithm cycles |
| [Migrate](Migrate/) | Intake external content (Obsidian, Notion, Apple Notes, journals) and classify into PAI taxonomy |
| [Optimize](Optimize/) | Autonomous optimization loop — hill-climb any target with metrics or LLM-as-judge eval |
| [PAIUpgrade](PAIUpgrade/) | Generate prioritized PAI upgrade recommendations via 4 parallel research threads |
| [PrivateInvestigator](PrivateInvestigator/) | Ethical people-finding and identity verification via 15 parallel research agents |
| [Prompting](Prompting/) | Meta-prompting standard library — generate, optimize, and compose prompts programmatically |
| [RedTeam](RedTeam/) | Adversarial analysis via 32 parallel expert agents to stress-test ideas, strategies, plans |
| [Remotion](Remotion/) | Programmatic video with React via Remotion — compositions, sequences, motion graphics to MP4 |
| [Research](Research/) | Multi-agent research with 4 depth modes (quick, standard, extensive, deep investigation) |
| [RootCauseAnalysis](RootCauseAnalysis/) | Structured incident investigation: 5 Whys, Fishbone, Postmortem, Fault Tree, Kepner-Tregoe |
| [Sales](Sales/) | Transform product docs into sales narratives with charcoal sketch art and talking points |
| [Science](Science/) | Scientific method as a universal problem-solving algorithm — goal, hypotheses, experiments |
| [SystemsThinking](SystemsThinking/) | Structural analysis via Iceberg, Causal Loop, Archetypes, Leverage Points, Concept Map |
| [Telos](Telos/) | Dual-context Life OS — read and update goals, beliefs, wisdom, missions, mental models |
| [USMetrics](USMetrics/) | 68 US economic indicators from FRED, EIA, Treasury, BLS, Census APIs |
| [Webdesign](Webdesign/) | Web/UI design via Anthropic's Claude Design (claude.ai/design) with frontend handoff |
| [WorldThreatModel](WorldThreatModel/) | Stress-test ideas, strategies, investments against 11 time horizons from 6 months to 50 years |
| [WriteStory](WriteStory/) | Fiction across seven narrative layers — Storr, Pressfield, Forsyth |

---

## Curated Bundles

Pre-built combinations with their own install wizards. Useful when you want a thematic grouping installed in one shot.

| Bundle | What's inside |
|--------|---------------|
| [ContextSearch](ContextSearch/) | `/context-search` and `/cs` slash commands |
| [Agents](Agents/) | Custom agent composition |
| [ContentAnalysis](ContentAnalysis/) | Wisdom extraction from videos, podcasts, articles, YouTube |
| [Investigation](Investigation/) | People search and identity verification |
| [Media](Media/) | Visual and video content — illustrations, diagrams, Remotion |
| [Research](Research/) | Multi-agent research with quick/standard/extensive/deep modes |
| [Scraping](Scraping/) | Bright Data + Apify scraping bundle |
| [Telos](Telos/) | Life OS goals, beliefs, wisdom, dashboards |
| [Thinking](Thinking/) | First principles, council, red team, science, brainstorming |
| [USMetrics](USMetrics/) | 68 US economic indicators |
| [Utilities](Utilities/) | Developer tools — CLI generation, skill scaffolding, Fabric, browser automation |

---

## Pack Structure

```
PackName/
├── README.md    # What it does and why
├── INSTALL.md   # Step-by-step wizard for AI-assisted installation
├── VERIFY.md    # Post-install verification checklist
└── src/         # Source files to copy
```
