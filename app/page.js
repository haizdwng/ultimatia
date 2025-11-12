// app/page.js
"use client";
import { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [qr, setQr] = useState(null);

  const handlePayment = async () => {
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 100000, orderId: Date.now() }),
    });
    const data = await res.json();
    setQr(data.data.qrCode);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <button onClick={handlePayment} className="bg-blue-500 text-white px-4 py-2 rounded">
        Tạo mã QR thanh toán
      </button>
      {qr && <Image src={qr} alt="QR Code" className="w-64" />}
    </div>
  );
}
