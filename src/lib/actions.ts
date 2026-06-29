"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactResult = { ok: true } | { ok: false; error: string };

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function sendContact(formData: FormData): Promise<ContactResult> {
  const segment = String(formData.get("segment") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const org = String(formData.get("org") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  // Honeypot — bots fill hidden fields; humans don't.
  const trap = String(formData.get("company_website") ?? "").trim();

  if (trap) return { ok: true }; // silently drop bots
  if (!name || !email || !message) {
    return { ok: false, error: "Please fill in your name, email, and message." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!process.env.RESEND_API_KEY) {
    return { ok: false, error: "Email is not configured. Please try again later." };
  }

  try {
    const { error } = await resend.emails.send({
      from: "Vellon Website <no-reply@vellon.ca>",
      to: ["hello@vellon.ca"],
      replyTo: email,
      subject: `New enquiry from ${name}${org ? ` (${org})` : ""}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#111">
          <h2 style="margin:0 0 16px">New website enquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${org ? `<p><strong>Organization:</strong> ${escapeHtml(org)}</p>` : ""}
          ${segment ? `<p><strong>Reaching out as:</strong> ${escapeHtml(segment)}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;padding:12px 16px;background:#f4f4f5;border-radius:8px">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { ok: false, error: "Something went wrong sending your message." };
    }
    return { ok: true };
  } catch (err) {
    console.error("Contact send failed:", err);
    return { ok: false, error: "Something went wrong sending your message." };
  }
}
