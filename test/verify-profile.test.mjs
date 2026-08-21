import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { verifyProfile } from "../src/verify-profile.mjs";

const fixture = JSON.parse(await readFile("examples/nda-mandate.json", "utf8"));

test("accepts the normative fixture", () => {
  assert.deepEqual(verifyProfile(fixture), { valid: true, errors: [] });
});

test("rejects document submission without explicit confirmation", () => {
  const token = structuredClone(fixture);
  token.definition.services[0].constraints.require_confirmation = [];
  assert.match(verifyProfile(token).errors.join("\n"), /must require confirmation/);
});

test("rejects a malformed document hash", () => {
  const token = structuredClone(fixture);
  token.definition.metadata.candao_content_hash = "sha256:not-a-hash";
  assert.match(verifyProfile(token).errors.join("\n"), /64 lowercase hex/);
});

test("rejects delegation for a v0.1 submission mandate", () => {
  const token = structuredClone(fixture);
  token.definition.delegatable = true;
  assert.match(verifyProfile(token).errors.join("\n"), /must not be delegatable/);
});
