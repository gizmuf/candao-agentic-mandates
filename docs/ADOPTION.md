# Adoption guide

The profile is useful only if independent systems can produce and verify the same evidence. Early adopters should choose one role rather than implement the entire stack.

## Contribution paths

### Authorization and identity

Review the APOA token mapping, approval binding, revocation, agent identity, and confirmation semantics. Propose generic APOA changes upstream.

### E-sign and document workflows

Build a sandbox adapter that accepts an already-approved execution bundle and returns a sanitized provider receipt. Do not automate production signatures in early contributions.

### Independent verifier

Consume fixtures without trusting Candao services. Return precise machine errors and a short explanation of principal, agent, document hash, action, destination, and outcome.

### Legal-tech research

Map the evidence to one jurisdiction or institutional workflow. Clearly distinguish technical evidence, contractual acceptance, and statutory signature requirements.

### Security

Threat-model prompt injection, replay, confused deputy, approval substitution, credential leakage, revocation races, provider mismatch, and audit disclosure.

## First design-partner profile

The first target is a low-risk NDA workflow using a mocked or provider sandbox:

1. freeze the final PDF bytes;
2. display the exact bundle to the principal;
3. capture approval bound to all execution parameters;
4. issue an APOA-compatible mandate;
5. enforce it before one idempotent submission;
6. produce an independently verifiable receipt.

## What adoption is not

- accepting Candao as a certificate authority;
- transferring a human private key to an agent;
- claiming automatic legal validity;
- requiring blockchain infrastructure;
- replacing APOA or established e-sign providers.
