// Automated CLI Environment Validation Example (Rev #8 - 2026-10-31T16:50:44Z)
const assert = require('node:assert');

function validatePort(raw) {
  const n = Number(raw);
  return Number.isInteger(n) && n >= 1 && n <= 65535;
}

assert.strictEqual(validatePort('8080'), true);
assert.strictEqual(validatePort('0'), false);
assert.strictEqual(validatePort('70000'), false);
console.log('Validation suite rev #8 passed at 2026-10-31T16:50:44Z');
