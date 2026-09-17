import { sendContactLetter } from "@/lib/emails";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

function parseMessage(payload: ContactPayload): {
  contact: { name: string; email: string; message: string } | null;
  error: string | null;
} {
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";

  if (name.length < 2 || name.length > 80) {
    return { contact: null, error: "Please enter your name." };
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return { contact: null, error: "A valid email address is required." };
  }
  if (message.length < 10 || message.length > 2000) {
    return { contact: null, error: "Your message should be between 10 and 2000 characters." };
  }

  return { contact: { name, email, message }, error: null };
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { contact, error } = parseMessage(payload);
  if (!contact) {
    return Response.json({ error }, { status: 400 });
  }

  const delivered = await sendContactLetter(contact);

  return Response.json({ ok: true, emailPending: !delivered });
}