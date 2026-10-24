// Automated CLI Environment Validation Example (Rev #2 - 2026-10-24T10:30:51Z)
const assert = require('node:assert');

function validatePort(raw) {
  const n = Number(raw);
  return Number.isInteger(n) && n >= 1 && n <= 65535;
}

assert.strictEqual(validatePort('8080'), true);
assert.strictEqual(validatePort('0'), false);
assert.strictEqual(validatePort('70000'), false);
console.log('Validation suite rev #2 passed at 2026-10-24T10:30:51Z');
