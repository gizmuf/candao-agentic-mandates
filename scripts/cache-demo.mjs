import { readFile } from "node:fs/promises";
import { taskCacheKey } from "../src/cache-key.mjs";
import { getArtifact, putArtifact } from "../src/artifact-cache.mjs";

const manifest = JSON.parse(await readFile("ops/task-manifest.example.json", "utf8"));
const key = await taskCacheKey(manifest);
let result = await getArtifact({ key, ttlSeconds: manifest.cache.ttl_seconds });

if (result.status === "miss" || result.status === "stale") {
  await putArtifact({
    key,
    value: { status: "demo", task_id: manifest.task_id },
    provenance: { prompt_version: manifest.prompt_version, source: "cache-demo" }
  });
  result = await getArtifact({ key, ttlSeconds: manifest.cache.ttl_seconds });
}

console.log(JSON.stringify({ status: result.status, key }, null, 2));

