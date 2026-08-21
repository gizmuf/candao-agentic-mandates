# Agent operating contract

This repository optimizes for useful evidence per token, not maximum agent activity.

## Coordination

- One coordinator owns decomposition, deduplication, acceptance, and synthesis.
- Use workers only for independent, bounded tasks that materially advance a current milestone.
- Never forward the full chat or full repository by default.
- A worker receives a task manifest, exact paths or excerpts, acceptance criteria, and a hard output limit.
- Prefer references, hashes, diffs, and short deltas over copied source or transcript text.
- Close completed workers immediately.

## Cache before dispatch

Before creating a worker task:

1. Normalize the objective and input paths.
2. Hash the task manifest plus relevant file hashes and prompt version.
3. Reuse a valid artifact when the cache key matches.
4. Record cache hit or miss in the cost ledger.

Keep reusable prompt content at the beginning and volatile task data at the end. Provider-side prompt caching is an optimization, never a correctness assumption.

## Default budgets

| Task | Workers | Input scope | Output cap | Retries |
|---|---:|---|---:|---:|
| Repository lookup | 1 | exact files | 500 words | 0 |
| Standards comparison | 1 | named sources | 800 words | 0 |
| Small implementation | 1 | owned files | diff + 500 words | 1 |
| Verification | 1 | changed paths | 400 words | 0 |

The coordinator should not delegate a task that is faster to complete locally or whose result blocks the immediate next action.

## Stop gates

Stop when acceptance criteria are met, authority or evidence is missing, budget is exhausted, the task duplicates a cached result, or further work expands legal/production scope.

## Safety boundary

- No production signing or legally binding execution in the prototype.
- No private keys, e-sign credentials, personal documents, or secrets in prompts, fixtures, logs, or caches.
- Store hashes and references in audit records, not document contents.
- Human approval must bind the exact final document and execution parameters.

