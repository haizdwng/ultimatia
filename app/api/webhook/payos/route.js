// app/api/webhook/payos/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  const { orderCode, amount, status } = data;

  if (status === "PAID") {
    await updateOrderStatus(orderCode, "paid");
    console.log(`✅ Đơn ${orderCode} đã thanh toán: ${amount} VND`);
  }

  return NextResponse.json({ ok: true });
}
