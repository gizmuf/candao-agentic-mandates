import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { deleteArtifact, getArtifact, putArtifact } from "../src/artifact-cache.mjs";

const key = `sha256:${"b".repeat(64)}`;

test("artifact cache stores, retrieves, and deletes by content key", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "candao-cache-"));
  try {
    assert.deepEqual(await getArtifact({ root, key }), { status: "miss" });
    await putArtifact({ root, key, value: { answer: 42 }, provenance: { prompt_version: "v1" } });
    const hit = await getArtifact({ root, key, ttlSeconds: 60 });
    assert.equal(hit.status, "hit");
    assert.deepEqual(hit.artifact.value, { answer: 42 });
    assert.equal(hit.artifact.provenance.prompt_version, "v1");
    await deleteArtifact({ root, key });
    assert.deepEqual(await getArtifact({ root, key }), { status: "miss" });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("artifact cache rejects malformed keys", async () => {
  await assert.rejects(() => getArtifact({ key: "unsafe/path" }), /cache key must be/);
});
