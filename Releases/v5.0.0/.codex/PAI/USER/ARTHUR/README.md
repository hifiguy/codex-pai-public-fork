# ARTHUR

**Purpose:** Dormant credential-broker persona and deterministic policy engine planned for PAI v6 — the gatekeeper between skills and the secrets they need.

**What lives here:** A `policies.yaml` describing how credential access is constrained — keyed by credential name, with rules covering which skills may request the credential, under what conditions, and with what audit trail. Currently scaffold-only; the runtime that enforces these policies ships in a future PAI version.

**How it gets populated:** By the user explicitly when defining access policies for credentials stored in `CREDENTIALS/`. Until the v6 broker is live, edits here are forward-looking — they document intent and prepare the policy file for when the engine activates.

**Sample state for fresh installs:** Empty / Just this README. Real content appears as you use PAI.
