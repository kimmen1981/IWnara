const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('../apps/web/node_modules/typescript');
const source = fs.readFileSync('apps/web/app/api/interest/route.ts', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
let sent; let providerStatus = 200;
const environment = { RESEND_API_KEY: 'test-only', MAIL_FROM: 'test@example.invalid' };
const sandbox = { exports: {}, Request, Response, URL, TextDecoder, AbortSignal, Map, Date, process: { env: environment }, require: id => id === '@/lib/membership' ? { bookingSubject: 'bokning av medlemskap i Skönsmon' } : require(id), fetch: async (url, options) => { sent = { url, ...options, body: JSON.parse(options.body) }; return Response.json(providerStatus === 200 ? { id: 'test-id' } : { error: 'unavailable' }, { status: providerStatus }); } };
vm.runInNewContext(compiled, sandbox);
let ip = 0;
const payload = { name: 'Test Person', phone: '0701234567', purpose: 'skonsmon', requestId: '12345678-1234-4234-8234-123456789012' };
function req(body = payload, headers = {}) { return new Request('https://example.test/api/interest', { method: 'POST', headers: { origin: 'https://example.test', 'content-type': 'application/json', 'x-forwarded-for': String(++ip), ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) }); }
(async () => {
  const post = sandbox.exports.POST;
  assert.equal((await post(req())).status, 200);
  assert.equal(sent.url, 'https://api.resend.com/emails');
  assert.deepEqual(sent.body.to, ['info@iwnara.se']);
  assert.equal(sent.body.subject, 'bokning av medlemskap i Skönsmon');
  assert.match(sent.body.text, /Test Person/);
  assert.match(sent.body.text, /0701234567/);
  const idempotency = sent.headers['Idempotency-Key'];
  await post(req()); assert.equal(sent.headers['Idempotency-Key'], idempotency);
  assert.equal((await post(req(payload, { origin: 'https://other.test' }))).status, 403);
  assert.equal((await post(req(payload, { 'content-type': 'text/plain' }))).status, 415);
  for (const bad of [null, [], {}, { ...payload, name: 'x' }, { ...payload, phone: 'abc' }, { ...payload, purpose: 'unexpected' }, { ...payload, name: 'Test\nInjected' }, { ...payload, requestId: '' }]) assert.equal((await post(req(bad))).status, 400);
  assert.equal((await post(req('x'.repeat(2049)))).status, 413);
  assert.equal((await post(req('{'))).status, 400);
  providerStatus = 500; assert.equal((await post(req())).status, 502);
  delete environment.RESEND_API_KEY; assert.equal((await post(req())).status, 503);
  for (let i = 0; i < 5; i++) await post(req(payload, { 'x-forwarded-for': 'limited' }));
  assert.equal((await post(req(payload, { 'x-forwarded-for': 'limited' }))).status, 429);
  console.log('PASS: interest endpoint validation, recipient, exact subject, idempotency, provider failure, missing configuration and throttling. No emails sent.');
})().catch(error => { console.error(error); process.exitCode = 1; });

