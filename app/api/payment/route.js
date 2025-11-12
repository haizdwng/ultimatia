// app/api/payment/route.js
import crypto from "crypto";
import { NextResponse } from "next/server";

const PAYOS_CLIENT_ID = process.env.PAYOS_CLIENT_ID;
const PAYOS_API_KEY = process.env.PAYOS_API_KEY;
const PAYOS_CHECKSUM_KEY = process.env.PAYOS_CHECKSUM_KEY;

export async function POST(req) {
  const { amount, orderId } = await req.json();

  const body = {
    orderCode: orderId,
    amount: amount,
    description: `Thanh toan don hang ${orderId}`,
  };

  // Ký checksum
  const rawData = `${body.orderCode}${body.amount}${body.description}${PAYOS_CHECKSUM_KEY}`;
  const checksum = crypto.createHash("sha256").update(rawData).digest("hex");

  const res = await fetch("https://api.payos.vn/v2/payment-requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-id": PAYOS_CLIENT_ID,
      "x-api-key": PAYOS_API_KEY,
    },
    body: JSON.stringify({ ...body, checksum }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
