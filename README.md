# Candao Agentic Mandates

An open document-execution profile for AI agents acting under explicit, bounded human authority.

The project does **not** replace electronic-signature providers and does not let an agent impersonate a person. It binds one final document, one approved action, one agent, and one execution receipt into an auditable flow.

```text
final document -> human approval -> APOA mandate -> agent execution -> receipt
```

## Why this exists

Agents can draft and prepare documents, but the final execution step is usually either manual or performed with broad borrowed credentials. Candao Agentic Mandates explores a narrower model:

- the human remains the principal;
- the agent is identified as the actor;
- authority is limited to a document hash, action, recipient, provider, and time window;
- approval and execution are separate evidence objects;
- credentials remain outside the model context;
- every mutation is auditable and idempotent.

## Relationship to APOA

This repository is an independent, Apache-2.0-licensed interoperability profile built to work with [Agentic Power of Attorney (APOA)](https://github.com/agenticpoa/apoa). It reuses APOA's authorization envelope and adds document-execution semantics under namespaced metadata and service scopes.

We intend to contribute generic interoperability improvements upstream instead of forking APOA core.

## Status

`v0.1 working draft` — research and prototype only. Not a legal opinion, qualified electronic signature, or production authorization system.

## Start here

- [RFC 0001](docs/RFC-0001-DOCUMENT-EXECUTION-PROFILE.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Cost-aware agent workflow](docs/COST-CONTROL.md)
- [Roadmap and go/no-go gates](docs/ROADMAP.md)
- [Contributing](CONTRIBUTING.md)

Run the dependency-free checks:

```bash
npm test
npm run verify:example
```

## MVP

The first end-to-end target is deliberately narrow: an agent prepares an NDA, the principal approves the exact PDF with a passkey-capable flow, the agent submits it through an existing e-sign provider, and a verifier checks the mandate and execution receipt.

