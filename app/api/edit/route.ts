import fs from "node:fs";
// import { blob } from "node:stream/consumers";
import { NextResponse } from "next/server";

const OpenAIAPIKEY = process.env["OPENAI_API_KEY"];

export async function POST(request: Request) {
  const formData = new FormData();

  formData.append(
    "image",
    new Blob([fs.readFileSync("./assets/composite.png")]),
    "composite.png"
  );
  formData.append(
    "prompt",
    "classic 2d RPG background, top view, crossing roads, cells, strange objects, night"
  );

  const res = await fetch("https://api.openai.com/v1/images/edits", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OpenAIAPIKEY}`,
    },
    cache: "no-store",
    body: formData,
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
