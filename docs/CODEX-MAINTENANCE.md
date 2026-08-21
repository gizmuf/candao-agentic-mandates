# Codex-assisted maintenance plan

Codex may support repository maintenance, but the maintainer remains accountable for every merge, release, security decision, and public statement.

## Intended workflows

- classify issues against profile, upstream APOA, provider adapter, or legal-research scope;
- review pull requests for conformance, compatibility, and secret exposure;
- generate and minimize sanitized negative fixtures;
- keep RFC, schema, examples, verifier, and diagrams synchronized;
- run release checks and produce reviewable changelog drafts;
- compare upstream APOA changes against pinned compatibility fixtures;
- assist with bounded security review where authorized.

## Cost controls

- coordinator-first decomposition;
- no full-history forwarding to workers;
- stable prompt prefixes and provider cache eligibility;
- content-addressed local artifacts;
- exact path and line-range handoffs;
- explicit token, time, tool-call, output, and retry budgets;
- smallest adequate model for extraction and formatting;
- stronger models reserved for high-risk synthesis and implementation;
- cost ledger with unknown values left unknown.

## Human gates

Codex must not independently:

- approve or merge normative protocol changes;
- publish legal conclusions;
- handle real signing credentials or private documents;
- execute production document signing;
- disclose vulnerabilities before coordinated review;
- represent itself as a human maintainer.
