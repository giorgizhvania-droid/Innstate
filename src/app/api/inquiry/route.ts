import { NextRequest, NextResponse } from "next/server";

const RECIPIENT = "innstate01@proton.me";

type InquiryPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  destination?: string;
  dates?: string;
  guests?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  let payload: InquiryPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { fullName, email, phone, destination, dates, guests, message } = payload;
  if (!fullName || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const lines = [
    `New inquiry from Innstate website`,
    ``,
    `Full Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone ?? "-"}`,
    `Destination / Hotel: ${destination ?? "-"}`,
    `Travel Dates: ${dates ?? "-"}`,
    `Guests: ${guests ?? "-"}`,
    ``,
    `Message:`,
    message,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM ?? "Innstate <onboarding@resend.dev>",
          to: [RECIPIENT],
          reply_to: email,
          subject: `New Inquiry — ${destination || fullName}`,
          text: lines,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
    } catch (err) {
      console.error("Failed to send inquiry email:", err);
      return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
    }
  } else {
    console.log("Inquiry received (RESEND_API_KEY not set, logging only):\n", lines);
  }

  return NextResponse.json({ ok: true });
}
