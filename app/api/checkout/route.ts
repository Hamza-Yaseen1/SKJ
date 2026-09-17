import { OrderValidationError, resolveOrder } from "@/lib/orders";
import { sendOrderEmails } from "@/lib/emails";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  let order;
  try {
    order = resolveOrder(payload);
  } catch (err) {
    const message =
      err instanceof OrderValidationError
        ? err.message
        : "The order could not be processed.";
    return Response.json({ error: message }, { status: 400 });
  }

  const emails = await sendOrderEmails(order);
  const emailDelivered = Boolean(emails.owner && emails.customer);

  return Response.json({
    ok: true,
    orderNumber: order.number,
    createdAt: order.createdAt.toISOString(),
    emailPending: !emailDelivered,
  });
}