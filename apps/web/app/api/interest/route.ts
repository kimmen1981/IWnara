import { createHash } from "node:crypto";
import { bookingSubject } from "@/lib/membership";

const attempts = new Map<string, { count: number; expires: number }>();
const reply = (status: number) => Response.json({ ok: status === 200 }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return reply(403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply(415);
  // Bound memory and request size; never log contact details.
  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires < now) attempts.delete(key);
  const ip = createHash("sha256").update(request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for") || "local").digest("hex");
  const limit = attempts.get(ip);
  if ((limit && limit.count >= 5) || (!limit && attempts.size >= 1000)) return reply(429);
  attempts.set(ip, { count: (limit?.count ?? 0) + 1, expires: limit?.expires ?? now + 600_000 });
  let body: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply(400);
    let raw = "";
    let bytes = 0;
    const decoder = new TextDecoder();
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.length;
      if (bytes > 2048) { await reader.cancel(); return reply(413); }
      raw += decoder.decode(value, { stream: true });
    }
    const parsed = JSON.parse(raw + decoder.decode());
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return reply(400);
    body = parsed;
  } catch { return reply(400); }
  const { name, phone, purpose, requestId } = body;
  if (typeof name !== "string" || name.trim().length < 2 || name.length > 100 || /[\r\n\x00-\x1f]/.test(name) || typeof phone !== "string" || !/^[+\d ()-]{7,25}$/.test(phone) || phone.replace(/\D/g, "").length < 7 || !["skonsmon", "intro", "member"].includes(String(purpose)) || typeof requestId !== "string" || !/^[a-f0-9-]{36}$/i.test(requestId)) return reply(400);
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!apiKey || !from) return reply(503);
  const subject = purpose === "skonsmon" ? bookingSubject : purpose === "intro" ? "Introduktion i Sörberge" : "Hjälp med medlemskap i Sörberge";
  const text = `Namn: ${name.trim()}\nMobilnummer: ${phone.trim()}\n\nFörfrågan via IW Nära: ${subject}`;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", signal: AbortSignal.timeout(10_000),
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": createHash("sha256").update(`${requestId}:${text}`).digest("hex") },
      body: JSON.stringify({ from, to: ["info@iwnara.se"], subject, text }),
    });
    if (!response.ok) return reply(502);
    const result = await response.json();
    return reply(typeof result.id === "string" && result.id ? 200 : 502);
  } catch { return reply(502); }
}
