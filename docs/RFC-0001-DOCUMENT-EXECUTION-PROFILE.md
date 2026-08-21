# RFC 0001: Document Execution Profile

Status: Working Draft  
Version: 0.1  
License: Apache-2.0

## 1. Problem

An AI agent may prepare a final document but should not impersonate its principal, receive the principal's unrestricted signing key, or execute a materially different document than the one approved.

This profile defines evidence that connects:

1. principal identity;
2. bounded authority granted to a distinct agent;
3. approval of an exact final document and execution parameters;
4. the action actually performed;
5. a verifier-readable receipt.

It does not define the legal effect of an electronic signature in any jurisdiction.

## 2. Base protocol

The authorization envelope follows APOA's signed JWT profile. APOA remains responsible for token identity, service audience, expiration, revocation, delegation attenuation, and audit requirements.

This profile adds one service identifier:

```text
candao-document-execution
```

Normative scopes:

- `documents:read`
- `documents:create_draft`
- `documents:modify`
- `documents:flag_for_review`
- `documents:submit`

`documents:submit` MUST require explicit approval of the final execution bundle. Approval for drafting MUST NOT imply approval for submission.

## 3. Namespaced metadata

The following flat keys live under `definition.metadata` to remain compatible with the APOA v0.1 data model:

| Key | Meaning |
|---|---|
| `candao_profile` | `document-execution/0.1` |
| `candao_document_id` | Stable non-secret document reference |
| `candao_document_version` | Approved document version |
| `candao_content_hash` | SHA-256 of exact final bytes |
| `candao_execution_id` | Unique execution attempt |
| `candao_approval_ref` | Reference to approval evidence |
| `candao_idempotency_key` | Prevents repeated submission |
| `candao_output_ref` | Receipt or provider result reference |

Personal data and document contents MUST NOT appear in these fields.

## 4. Final execution bundle

Before approval, the principal MUST be shown at least:

- document identity and content hash;
- action to perform;
- destination or counterparty;
- execution provider;
- expiration;
- whether the action can be reversed;
- material constraints.

The approval evidence MUST bind all those values. Changing any bound value invalidates approval.

## 5. Execution receipt

The receipt SHOULD include:

- mandate token ID;
- execution ID and idempotency key;
- agent identity;
- service/provider;
- action and timestamp;
- approved input hash;
- provider result reference;
- status;
- receipt signature or integrity proof where supported.

Receipts MUST contain references and hashes rather than document bodies.

## 6. Required verifier behavior

A conformant verifier MUST reject when:

- token signature, audience, time, or revocation state is invalid;
- `documents:submit` is absent;
- confirmation is not required and evidenced;
- content hash or execution parameters differ from approval;
- idempotency key was already consumed;
- agent or provider identity differs from the mandate;
- required receipt evidence is missing.

## 7. Open questions

- How should provider receipts be normalized without hiding provider-specific evidence?
- Which approval ceremonies satisfy particular jurisdictions and risk levels?
- Should profile metadata remain flat or move to a registered APOA extension container?
- Which generic changes should be contributed to APOA upstream?

