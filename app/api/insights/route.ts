import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { tickets } = await request.json();

    if (!Array.isArray(tickets) || tickets.length === 0) {
      return NextResponse.json({
        insights: [
          {
            title: "No data yet",
            description: "Log a few tickets to generate AI insights.",
            type: "insight",
            confidence: 60,
            isNew: true,
          },
        ],
      });
    }

    const trimmedTickets = tickets.slice(-50);

    const prompt = `
You are analyzing lottery intuition logs for behavioral reflection only.

Do not give gambling advice.
Do not predict future wins.
Focus on calibration, confidence, excitement, emotional bias, spending patterns, and location habits.

Input data:
${JSON.stringify(trimmedTickets, null, 2)}

Return valid JSON only in this exact format:
{
  "insights": [
    {
      "title": "short title",
      "description": "short sentence under 16 words",
      "type": "positive" | "warning" | "insight",
      "confidence": 0-100,
      "isNew": true
    }
  ]
}

Rules:
- Return exactly 4 insights.
- Keep descriptions short.
- No markdown.
`;

    const result = await geminiModel.generateContent(prompt);
    const text = result.response.text().trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        insights: [
          {
            title: "AI formatting issue",
            description: "Gemini returned an unexpected format.",
            type: "warning",
            confidence: 70,
            isNew: true,
          },
        ],
      };
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Insights route error:", error);
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}