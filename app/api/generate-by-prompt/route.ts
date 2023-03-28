import { NextResponse } from "next/server";

const OpenAIAPIKEY = process.env["OPENAI_API_KEY"];

export async function POST(request: Request) {
  const { prompt } = await request.json();
  if (!prompt) {
    return NextResponse.json({ message: "Missing prompt" }, { status: 400 });
  }

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OpenAIAPIKEY}`,
    },
    cache: "no-store",
    body: JSON.stringify({
      prompt,
      n: 4,
      size: "256x256",
    }),
  });
  if (res.status !== 200) {
    return NextResponse.json(
      { message: "OpenAI API call failed" },
      { status: 500 }
    );
  }

  const { data }: { data: { url: string }[] } = await res.json();
  const urls = data.map((d) => d.url);

  return NextResponse.json({ message: "Hello World!", urls });
}
