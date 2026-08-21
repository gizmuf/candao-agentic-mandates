# APOA compatibility plan

Pinned audit source: APOA commit `232d35c94f6aa76392171ee4c6367c7ff642dbad` (2026-06-30).

## Reuse unchanged

- signed JWT envelope and asymmetric algorithms;
- principal, agent, provider, services, scopes, constraints, and rules;
- expiration, revocation, delegation attenuation, and audit requirements;
- API and browser access modes;
- authorization-server, agent-provider, and optional service conformance roles.

## Profile extension

Candao adds document scopes and flat `candao_*` metadata under `definition.metadata`. The first profile forbids delegation for submission and binds approval to an exact document hash, execution ID, approval reference, and idempotency key.

## Upstream candidates

- namespaced metadata and unknown-field preservation rules;
- registered service-profile examples;
- metadata round-trip fixtures across TypeScript and Python;
- custom-constraint namespace guidance;
- an idempotent document execution example.

## Known risks

- APOA v0.1 does not guarantee preservation of arbitrary metadata across every implementation;
- hard rules do not validate hashes or document state, so the policy gate must enforce those semantics;
- broad document scopes can become over-permissive unless exact constraints are service-enforced;
- high-authority legal execution is beyond APOA's current limited-action baseline;
- upstream SDK/example versions need compatibility fixtures.

The preferred strategy is an independent profile plus upstream contributions, not a branded fork.

