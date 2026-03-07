import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "node:buffer";
import { geminiModel } from "@/lib/gemini";

export const runtime = "nodejs";

function extractJson(text: string) {
  const trimmed = text.trim();

  try {
    return JSON.parse(trimmed);
  } catch {}

  const fencedMatch = trimmed.match(/```json\s*([\s\S]*?)\s*```/i);
  if (fencedMatch?.[1]) {
    try {
      return JSON.parse(fencedMatch[1]);
    } catch {}
  }

  const braceMatch = trimmed.match(/\{[\s\S]*\}/);
  if (braceMatch?.[0]) {
    try {
      return JSON.parse(braceMatch[0]);
    } catch {}
  }

  return null;
}

function normalizeTicketType(value: unknown) {
  const raw = String(value ?? "").toLowerCase().trim();

  if (["scratch", "scratch-off", "scratch off", "scratcher"].includes(raw)) {
    return "scratch";
  }
  if (["powerball", "power ball"].includes(raw)) {
    return "powerball";
  }
  if (["mega", "mega millions", "megamillions"].includes(raw)) {
    return "mega";
  }
  if (["daily", "daily numbers", "daily number"].includes(raw)) {
    return "daily";
  }
  if (["pick3", "pick 3"].includes(raw)) {
    return "pick3";
  }
  if (raw === "other") {
    return "other";
  }

  return "other";
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No image file was uploaded." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Uploaded file must be an image." },
        { status: 400 }
      );
    }

    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image is too large. Keep it under 8 MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const prompt = `
You are reading a lottery ticket or lottery receipt image.

Extract only what is visible or reasonably inferable.
If uncertain, use an empty string instead of inventing details.

Return valid JSON only in this exact format:
{
  "ticketType": "scratch" | "powerball" | "mega" | "daily" | "pick3" | "other",
  "cost": number | "",
  "date": "YYYY-MM-DD" | "",
  "location": "short place string" | "",
  "summary": "one short practical sentence"
}

Rules:
- ticketType must be one of the allowed values above
- date must be YYYY-MM-DD if visible, otherwise ""
- location should be short
- summary should be short
- no markdown
- JSON only
`;

    const result = await geminiModel.generateContent([
      {
        text: prompt,
      },
      {
        inlineData: {
          mimeType: file.type,
          data: base64,
        },
      },
    ]);

    const text = result.response.text();
    const parsed = extractJson(text);

    if (!parsed) {
      return NextResponse.json(
        {
          error: "Gemini returned text, but it was not valid JSON.",
          raw: text.slice(0, 500),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ticketType: normalizeTicketType(parsed.ticketType),
      cost:
        parsed.cost === "" || parsed.cost == null || Number.isNaN(Number(parsed.cost))
          ? ""
          : Number(parsed.cost),
      date: typeof parsed.date === "string" ? parsed.date : "",
      location: typeof parsed.location === "string" ? parsed.location : "",
      summary: typeof parsed.summary === "string" ? parsed.summary : "",
    });
  } catch (error) {
    console.error("Extract ticket error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `Failed to analyze the uploaded image: ${error.message}`
            : "Failed to analyze the uploaded image.",
      },
      { status: 500 }
    );
  }
}