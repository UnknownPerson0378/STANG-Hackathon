import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini";

function safeString(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsedCost = Number(body.cost);
    const parsedAmountWon = Number(body.amountWon ?? 0);

    if (!body.ticketType) {
      return NextResponse.json({ error: "Missing ticket type." }, { status: 400 });
    }

    if (Number.isNaN(parsedCost) || parsedCost <= 0) {
      return NextResponse.json(
        { error: "Ticket cost must be a valid number greater than 0." },
        { status: 400 }
      );
    }

    if (Number.isNaN(parsedAmountWon) || parsedAmountWon < 0) {
      return NextResponse.json(
        { error: "Amount won must be a valid non-negative number." },
        { status: 400 }
      );
    }

    if (!body.date) {
      return NextResponse.json({ error: "Missing purchase date." }, { status: 400 });
    }

    const selectedDate = new Date(`${body.date}T00:00:00`);
    if (Number.isNaN(selectedDate.getTime())) {
      return NextResponse.json({ error: "Invalid purchase date." }, { status: 400 });
    }

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (selectedDate > today) {
      return NextResponse.json(
        { error: "Purchase date cannot be in the future." },
        { status: 400 }
      );
    }

    const prompt = `
You are analyzing a user's lottery intuition log for behavioral reflection only.

Do not give gambling advice.
Do not predict future wins.
Be concise and practical.
Keep each sentence short.

Ticket data:
- Input method: ${safeString(body.inputMethod) || "manual"}
- Ticket type: ${safeString(body.ticketType) || "Unknown"}
- Cost: ${safeString(body.cost) || "Unknown"}
- Date: ${safeString(body.date) || "Unknown"}
- Location: ${safeString(body.location) || "Unknown"}
- Confidence: ${safeString(body.confidence) || "Unknown"}
- Excitement: ${safeString(body.excitement) || "Unknown"}
- Feels different: ${safeString(body.feelsDifferent) || "Unknown"}
- Amount won: ${safeString(body.amountWon) || "Unknown"}
- Post satisfaction: ${safeString(body.postSatisfaction) || "Unknown"}
- Gut accuracy self-rating: ${safeString(body.wasRight) || "Unknown"}
- Image summary: ${safeString(body.imageSummary) || "None"}

Return valid JSON only in this exact format:
{
  "summary": "one short sentence",
  "calibration": "one short sentence",
  "observation": "one short sentence"
}
`;

    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    let parsed:
      | {
          summary?: string;
          calibration?: string;
          observation?: string;
        }
      | null = null;

    try {
      parsed = JSON.parse(text);
    } catch {
      const fencedMatch = text.match(/```json\s*([\s\S]*?)\s*```/i);
      if (fencedMatch?.[1]) {
        try {
          parsed = JSON.parse(fencedMatch[1]);
        } catch {
          parsed = null;
        }
      }
    }

    if (!parsed) {
      parsed = {
        summary: "Ticket saved and analyzed.",
        calibration: "Log more entries to improve behavioral insight.",
        observation: text.slice(0, 220) || "No structured observation was returned.",
      };
    }

    return NextResponse.json({
      summary: parsed.summary || "Ticket saved and analyzed.",
      calibration: parsed.calibration || "Log more entries to improve behavioral insight.",
      observation: parsed.observation || "No structured observation was returned.",
    });
  } catch (error) {
    console.error("Analyze route error:", error);

    return NextResponse.json(
      { error: "Failed to analyze ticket" },
      { status: 500 }
    );
  }
}