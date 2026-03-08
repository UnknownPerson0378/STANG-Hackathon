import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

let geminiModel: GenerativeModel | null = null;

export function getGeminiModel(): GenerativeModel {
  if (geminiModel) {
    return geminiModel;
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  geminiModel = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  return geminiModel;
}