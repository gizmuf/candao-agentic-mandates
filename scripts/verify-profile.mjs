import { readFile } from "node:fs/promises";
import { verifyProfile } from "../src/verify-profile.mjs";

const path = process.argv[2];
if (!path) {
  console.error("usage: node scripts/verify-profile.mjs <token.json>");
  process.exit(2);
}

const token = JSON.parse(await readFile(path, "utf8"));
const result = verifyProfile(token);
console.log(JSON.stringify(result, null, 2));
if (!result.valid) process.exit(1);

