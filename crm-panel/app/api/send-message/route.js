import { NextResponse } from "next/server";
import { sendMessageToCustomer } from "@/index"; // fonksiyonunu buraya taşı

export async function POST(req) {
  const body = await req.json();
  const { number, text } = body;

  await sendMessageToCustomer(number, text);


  


  return NextResponse.json({ success: true });
}