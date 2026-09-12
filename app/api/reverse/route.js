import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { question, mode } = await req.json();

  const personalities = {
    normal: "Ask why the user wants to know, in a neutral tone.",
    judgmental: "Ask why the user couldn't just Google this themselves, sounding a bit judgmental.",
    philosophical: "Ask a deep, philosophical question about what knowing the answer truly means.",
    rude: "Ask why the user is asking you instead of Googling it, in a blunt, rude tone.",
    therapist: "Ask what the user thinks knowing this answer would change for them, in a calm therapist tone.",
    genz: "Ask why they even wanna know, in a chaotic Gen Z tone with slang and emojis.",
  };

  const style = personalities[mode] || personalities.normal;

  const prompt = `
You are Reverse Google. Your job is NOT to answer the user's question.
Instead, respond with ONE short counter-question that asks why the user wants to know.
${style}

User question: "${question}"

Return only the counter-question, nothing else.
`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  return Response.json({ counterQuestion: text });
}