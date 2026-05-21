# PAISYSTEMUPDATES

`PAISYSTEMUPDATES/` is the queue and history of proposed and applied changes to the PAI system itself — Algorithm tweaks, hook adjustments, skill upgrades, configuration changes, and architectural refactors. The `PAIUpgrade` skill writes prioritized recommendations here, and applied upgrades are recorded with their before/after state.

This is how PAI improves itself across sessions: lessons in `LEARNING/` become candidate upgrades here, and the user (or the system, with permission) promotes them into actual code and config changes.

Empty in fresh installs. Populates when you run the `PAIUpgrade` skill or when a hook surfaces a structural improvement. Treat entries as proposals until explicitly applied.
