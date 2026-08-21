import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  }
  return value;
}

export async function taskCacheKey(manifest, root = process.cwd()) {
  const inputs = [];
  for (const relativePath of [...(manifest.scope?.read ?? [])].sort()) {
    const bytes = await readFile(new URL(relativePath, `file://${root.replace(/\/$/, "")}/`));
    inputs.push({ path: relativePath, sha256: createHash("sha256").update(bytes).digest("hex") });
  }

  const payload = stable({
    prompt_version: manifest.prompt_version,
    objective: manifest.objective,
    scope: manifest.scope,
    dependencies: manifest.dependencies ?? [],
    inputs
  });

  return `sha256:${createHash("sha256").update(JSON.stringify(payload)).digest("hex")}`;
}

