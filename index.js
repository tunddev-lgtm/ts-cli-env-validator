#!/usr/bin/env node
function validateEnv(requiredKeys) {
  const missing = requiredKeys.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }
  return true;
}
module.exports = { validateEnv };
