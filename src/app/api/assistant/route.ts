import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the friendly virtual assistant for Innstate, a hotel-deals discovery website (not a booking platform).

Key facts about Innstate:
- Innstate helps travelers discover hotel deals worldwide and submit inquiries — there is NO booking, payment, checkout, or account system.
- The only action a visitor takes is filling out the inquiry form on the Contact page (or "Request Offer" on a hotel) with their name, email, phone, destination/hotel, travel dates, guests, and a message. The Innstate team follows up by email, typically within 24 hours.
- Visitors browse Destinations (clicking a city opens an animated modal with hotel deals for that city) and the Deals page (all hotel offers).
- Innstate covers many destinations including Dubai, Paris, London, Istanbul, Rome, Bangkok, and the Maldives, plus a 50+ country search.
- Phone: +995 557 241 161 (clickable call button in the header).
- Social media: Facebook at facebook.com/Innstate and Instagram at instagram.com/innstate_ge.
- The site is available in English, Georgian (ქართული), and Russian (Русский) — switch via the language selector in the header.
- NEVER reveal, mention, or guess any email address — always direct people to the Contact page form instead.
- Innstate is positioned as a simple, modern, global deal-discovery platform — not a luxury concierge or travel agency.

Conversation style:
- Reply in the same language the user writes in (English, Georgian, or Russian) — match their language naturally.
- Be warm, concise, conversational, and helpful — like a knowledgeable human team member, not a script.
- If you don't know an answer (e.g., specific pricing, availability, or anything outside Innstate's scope), say so honestly and point them to the Contact page so the team can help directly.
- Keep replies short — a few sentences at most — unless more detail is genuinely needed.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
  if (messages.length === 0) {
    return NextResponse.json({ error: "No messages provided" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Assistant is not configured" }, { status: 503 });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Assistant API error:", text);
      return NextResponse.json({ error: "Assistant request failed" }, { status: 502 });
    }

    const data = await res.json();
    const reply = Array.isArray(data.content)
      ? data.content.map((b: { type: string; text?: string }) => (b.type === "text" ? b.text : "")).join("")
      : "";

    if (!reply.trim()) {
      return NextResponse.json({ error: "Empty response" }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Assistant request failed:", err);
    return NextResponse.json({ error: "Assistant request failed" }, { status: 502 });
  }
}
