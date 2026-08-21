import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { taskCacheKey } from "../src/cache-key.mjs";

test("cache key is deterministic for the same manifest and inputs", async () => {
  const manifest = JSON.parse(await readFile("ops/task-manifest.example.json", "utf8"));
  assert.equal(await taskCacheKey(manifest), await taskCacheKey(manifest));
});

