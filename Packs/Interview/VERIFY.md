# Interview — Verification

> **For AI agents:** Complete this checklist after installation. All file checks must pass before declaring the pack installed.

---

## File Verification

```bash
CLAUDE_DIR="$HOME/.codex"
SKILL_DIR="$CLAUDE_DIR/skills/Interview"

[ -d "$SKILL_DIR" ]            && echo "OK directory exists"        || echo "MISSING directory"
[ -f "$SKILL_DIR/SKILL.md" ]   && echo "OK SKILL.md present"        || echo "MISSING SKILL.md"
```

```bash
# Optional substructure (skill-dependent — informational)
[ -d "$SKILL_DIR/Workflows" ]  && echo "OK Workflows/ present"      || echo "INFO no Workflows/"
[ -d "$SKILL_DIR/Tools" ]      && echo "OK Tools/ present"          || echo "INFO no Tools/"
[ -d "$SKILL_DIR/References" ] && echo "OK References/ present"     || echo "INFO no References/"
```

---

## Frontmatter Check

```bash
CLAUDE_DIR="$HOME/.codex"
head -1 "$CLAUDE_DIR/skills/Interview/SKILL.md" | grep -q "^---" && echo "OK frontmatter delimited" || echo "ERROR missing frontmatter"
grep -q "^name:" "$CLAUDE_DIR/skills/Interview/SKILL.md" && echo "OK has name" || echo "ERROR missing name"
grep -q "^description:" "$CLAUDE_DIR/skills/Interview/SKILL.md" && echo "OK has description" || echo "ERROR missing description"
```

---

## Functional Test

After install, restart ChatGPT Codex (or open a new session) and trigger the skill via its USE WHEN keywords. Refer to `SKILL.md` for the trigger phrases and example invocations.

---

## Installation Checklist

```markdown
## Interview Installation Verification

- [ ] Skill directory exists at ~/.codex/skills/Interview/
- [ ] SKILL.md present with valid frontmatter
- [ ] Frontmatter has name and description fields
- [ ] Restarted ChatGPT Codex after install
- [ ] Skill triggers on its declared USE WHEN keywords
```
