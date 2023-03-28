import fs from "node:fs";
import sharp from "sharp";

export async function GET(request: Request) {
  const topLeft = fs.readFileSync("./assets/top-left.png");
  const bottomLeft = fs.readFileSync("./assets/bottom-left.png");
  const bottomRight = fs.readFileSync("./assets/bottom-right.png");

  const composite = sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: topLeft, top: 0, left: 0 },
      // { input: bottomLeft, top: 255, left: 0 },
      { input: bottomRight, top: 255, left: 255 },
    ])
    .png();

  fs.writeFileSync("./assets/composite.png", await composite.toBuffer());
  return new Response("Hello, Next.js!");
}
