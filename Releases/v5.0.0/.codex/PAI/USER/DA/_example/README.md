# Creating Your DA Identity

1. Copy this `_example/` directory and rename it (e.g., `{da-name}/`, `aria/`, `max/`)
2. Edit `identity.yaml` with your DA's configuration
3. Edit `identity.md` with your DA's personality and style
4. Register your DA in `../_registry.yaml`
5. Reference your DA in your `AGENTS.md` via `@PAI/USER/DA/{name}/identity.md`

## Template Variables

Replace these placeholders with your values:
- `{DA_IDENTITY.NAME}` — Your DA's name
- `{DA_IDENTITY.DISPLAY_NAME}` — Display name (often uppercase)
- `{PRINCIPAL.NAME}` — Your name

## Multiple DAs

PAI supports multiple DA identities. Set `role: primary` for your main assistant.
Additional DAs can have `role: secondary` or specialized roles.
