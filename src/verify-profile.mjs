const HASH = /^sha256:[a-f0-9]{64}$/;
const REQUIRED_METADATA = [
  "candao_profile",
  "candao_document_id",
  "candao_document_version",
  "candao_content_hash",
  "candao_execution_id",
  "candao_approval_ref",
  "candao_idempotency_key"
];

export function verifyProfile(token) {
  const errors = [];
  const definition = token?.definition;
  if (!definition) return { valid: false, errors: ["definition is required"] };

  const service = definition.services?.find((item) => item.service === "candao-document-execution");
  if (!service) errors.push("candao-document-execution service is required");
  if (!service?.scopes?.includes("documents:submit")) errors.push("documents:submit scope is required");
  if (!service?.constraints?.require_confirmation?.includes("documents:submit")) {
    errors.push("documents:submit must require confirmation");
  }

  const metadata = definition.metadata ?? {};
  for (const key of REQUIRED_METADATA) {
    if (typeof metadata[key] !== "string" || metadata[key].length === 0) errors.push(`metadata.${key} is required`);
  }
  if (metadata.candao_profile !== "document-execution/0.1") errors.push("unsupported candao_profile");
  if (!HASH.test(metadata.candao_content_hash ?? "")) errors.push("candao_content_hash must be sha256:<64 lowercase hex>");
  if (definition.delegatable !== false) errors.push("document submission mandates must not be delegatable in v0.1");
  if (token.aud && !token.aud.includes("candao-document-execution")) errors.push("audience must include candao-document-execution");

  return { valid: errors.length === 0, errors };
}

