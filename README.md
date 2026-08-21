<p align="center">
  <strong>Candao Agentic Mandates</strong><br>
  Verifiable document execution for AI agents acting under explicit human authority.
</p>

<p align="center">
  <a href="https://github.com/gizmuf/candao-agentic-mandates/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/gizmuf/candao-agentic-mandates/actions/workflows/ci.yml/badge.svg"></a>
  <a href="LICENSE"><img alt="License: Apache 2.0" src="https://img.shields.io/badge/license-Apache--2.0-blue.svg"></a>
  <img alt="Status: working draft" src="https://img.shields.io/badge/status-working%20draft-f59e0b.svg">
</p>

AI agents can prepare a document, but the final execution step is often manual or performed with overly broad borrowed credentials. Candao Agentic Mandates defines a narrower path:

```text
final document -> human approval -> bounded APOA mandate -> agent execution -> receipt
```

The human remains the principal. The agent is a distinct, visible actor. Approval binds one final document hash, one action, one destination, one provider, and one time window. The resulting receipt shows what was authorized and what actually happened.

## Why this matters

- **No impersonation:** the agent never pretends to be the human.
- **No private-key handoff:** principal credentials stay outside the model context.
- **Exact intent:** approval is invalid if the document or execution parameters change.
- **Bounded authority:** scopes, expiry, revocation, confirmation, and idempotency are enforceable.
- **Portable evidence:** a verifier can inspect the mandate, approval, and receipt independently.
- **Provider compatibility:** existing e-sign platforms remain the execution rail.

## Relationship to APOA

This is an independent interoperability profile built to work with [Agentic Power of Attorney (APOA)](https://github.com/agenticpoa/apoa). We reuse APOA's authorization envelope—principal, agent, scopes, constraints, expiry, revocation, and audit—and add document-execution semantics.

Our preferred strategy is to contribute generic improvements upstream rather than fork APOA core. See the [compatibility plan](docs/UPSTREAM-APOA.md).

## Architecture

```text
Principal device      Authorization layer      Agent runtime      E-sign provider
----------------      -------------------      -------------      ---------------
review final bundle -> signed APOA mandate --> policy gate -----> exact submission
passkey approval       hash + scope + expiry    vault isolation    provider evidence
       ^                        |                      |                   |
       +------------------------+--- verifier <-------+-------------------+
                                   mandate + approval + execution receipt
```

Open the exportable [architecture diagram](diagrams/document-execution.html) or read the [architecture notes](docs/ARCHITECTURE.md).

## Current implementation

- RFC for an APOA-compatible document execution profile;
- normative example mandate;
- dependency-free profile verifier;
- negative tests for missing confirmation, malformed hashes, and delegation;
- task/result manifests and content-addressed artifact cache for cost-aware agent maintenance;
- public governance, security, adoption, and contribution paths.

This is a `v0.1 working draft`. It is research and prototype software—not a legal opinion, qualified electronic signature, production authorization service, or claim of legal validity.

## Quick start

Requirements: Node.js 20 or newer.

```bash
git clone https://github.com/gizmuf/candao-agentic-mandates.git
cd candao-agentic-mandates
npm test
npm run verify:example
```

The project has no runtime dependencies at this stage.

## How to contribute

We are looking for contributors in:

- authorization, OAuth, DIDs, verifiable credentials, and passkeys;
- e-signature and document-workflow integrations;
- security, threat modeling, audit, and policy engines;
- legal-tech and jurisdiction-specific research;
- MCP/A2A agent tooling and conformance testing;
- developer experience and independent implementations.

Start with [Contributing](CONTRIBUTING.md), the [adoption guide](docs/ADOPTION.md), or a scoped GitHub issue. Generic APOA improvements should be discussed upstream first.

## Roadmap

1. **Verifier-first profile:** deterministic fixtures and negative tests.
2. **One NDA flow:** exact PDF, explicit approval, sandbox execution, receipt.
3. **Three design partners:** legal practice, document-heavy business, UAE innovation partner.
4. **Ecosystem decision:** upstream profile, neutral group, or hosted services around the open standard.

The full roadmap includes explicit [GO/STOP gates](docs/ROADMAP.md).

## Maintainer operations

The repository uses bounded agent tasks, deterministic artifacts, stable prompt prefixes, delta handoffs, and a cost ledger. See [Cost-aware agent workflow](docs/COST-CONTROL.md) and [Codex maintenance plan](docs/CODEX-MAINTENANCE.md).

## License

Apache License 2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).

Candao Agentic Mandates is not endorsed by APOA, DocuSign, Adobe, PandaDoc, OpenAI, or any standards body mentioned in project materials.

