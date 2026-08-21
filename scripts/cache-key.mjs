import { readFile } from "node:fs/promises";
import { taskCacheKey } from "../src/cache-key.mjs";

const manifestPath = process.argv[2] ?? "ops/task-manifest.example.json";
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
console.log(await taskCacheKey(manifest));

