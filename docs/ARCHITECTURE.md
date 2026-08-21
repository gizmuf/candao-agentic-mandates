# Architecture

## Trust boundaries

```text
Principal device        Authorization layer       Agent runtime       External provider
----------------        -------------------       -------------       -----------------
review final bundle --> issue APOA mandate -----> policy gate ------> submit exact action
passkey approval         hash + scope + expiry     vault isolation      provider receipt
       ^                         |                       |                      |
       +-------------------------+---- verifier <-------+----------------------+
                                     mandate + approval + execution evidence
```

The principal is the legal/business decision maker. The agent is a separately identified actor. The authorization service signs bounded authority but does not give the agent the principal's private key. The policy gate verifies the mandate before every mutation. The provider performs its normal workflow and returns its own evidence.

## MVP components

1. **Bundle builder** freezes document bytes and execution parameters.
2. **Approval UI** displays the final bundle and captures passkey-capable approval evidence.
3. **APOA issuer adapter** issues the bounded mandate.
4. **Policy gate** validates scope, hash, approval, expiration, revocation, and idempotency.
5. **Provider adapter** initially targets one sandbox or mocked e-sign flow.
6. **Receipt builder** joins mandate, approval, action, and provider evidence.
7. **Verifier** returns a machine-readable result and a short human explanation.

Blockchain anchoring is out of scope for the MVP. It can be evaluated later as an optional timestamp or transparency mechanism.

