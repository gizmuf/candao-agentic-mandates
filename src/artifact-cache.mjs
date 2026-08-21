import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const KEY = /^sha256:([a-f0-9]{64})$/;

function location(root, key) {
  const match = KEY.exec(key);
  if (!match) throw new Error("cache key must be sha256:<64 lowercase hex>");
  return path.join(root, `${match[1]}.json`);
}

export async function putArtifact({ root = ".cache/agent-artifacts", key, value, provenance = {} }) {
  await mkdir(root, { recursive: true });
  const target = location(root, key);
  const temporary = `${target}.${process.pid}.tmp`;
  const artifact = {
    key,
    created_at: new Date().toISOString(),
    provenance,
    value
  };
  await writeFile(temporary, `${JSON.stringify(artifact, null, 2)}\n`, { flag: "wx" });
  await rename(temporary, target);
  return artifact;
}

export async function getArtifact({ root = ".cache/agent-artifacts", key, ttlSeconds }) {
  const target = location(root, key);
  let artifact;
  try {
    artifact = JSON.parse(await readFile(target, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return { status: "miss" };
    throw error;
  }

  if (artifact.key !== key) return { status: "invalid", reason: "embedded key mismatch" };
  if (Number.isFinite(ttlSeconds)) {
    const ageMs = Date.now() - Date.parse(artifact.created_at);
    if (!Number.isFinite(ageMs) || ageMs > ttlSeconds * 1000) return { status: "stale", artifact };
  }
  return { status: "hit", artifact };
}

export async function deleteArtifact({ root = ".cache/agent-artifacts", key }) {
  await rm(location(root, key), { force: true });
}

