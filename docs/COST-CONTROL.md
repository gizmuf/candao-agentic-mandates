# Cost-aware agent workflow

## Operating loop

```text
objective
   |
coordinator -> normalize + deduplicate -> cache key
   |                                      | hit
   | miss                                 +------> validated artifact
task manifest
   |
bounded worker -> result manifest -> acceptance gate
   |                                      |
token/time stop                       cost ledger
```

## Rules that reduce billed model usage

- Do not forward full conversation history to workers.
- Keep stable policies, output schema, and repository rules as a reusable prompt prefix.
- Append volatile task data after the stable prefix to maximize provider prompt-cache eligibility.
- Pass file paths, hashes, line ranges, and deltas instead of whole files.
- Cache artifacts by the hash of prompt version, task scope, tool version, and relevant file hashes.
- Deduplicate equivalent tasks before dispatch.
- Set output caps, retry limits, and early stop gates.
- Use the smallest adequate model for bounded extraction or formatting; use stronger models only for high-risk synthesis or implementation.

Prompt caching is provider-side and conditional. The repository cache is deterministic and under our control. A cache hit MUST still be invalidated when inputs, policy version, tool version, or relevant upstream state changes.

## Task manifest

Every delegated task should declare:

- task ID and objective;
- exact read/write scope;
- dependency artifact hashes;
- expected output;
- acceptance criteria;
- token, time, tool-call, and retry budgets;
- stop conditions;
- cache policy.

## Result manifest

Every worker returns status, evidence references, changed paths, remaining uncertainty, cacheability, elapsed time, and measured token fields when the provider exposes them.

## Cost ledger

Track model, input tokens, cached input tokens, output tokens, tool calls, retries, cache result, elapsed time, and estimated cost per task. Never fabricate missing usage: record it as `unknown`.

