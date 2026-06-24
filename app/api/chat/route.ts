import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT =
  "אתה עוזר שיא מקצועי, ברמת סלון ועולמי, לצביעת שיער וכימיה קוסמטית עבור אפליקציית 'TintMe'. " +
  "עליך לענות בצורה בטוחה, מדויקת ואך ורק בעברית (פריסת RTL). " +
  "תקבל את הקשר השיער הספציפי של המשתמשת (כמו רמת הבסיס הנוכחית, גוון היעד, ונוסחת הגרמים המחושבת). " +
  "תן עצות מעשיות ברמת סלון, תמיד הזהיר לגבי בטיחות כימית, " +
  "ושמור על תשובות תמציתיות, קלות לקריאה ואמפתיות.";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type GeminiPart = { text: string };
type GeminiContent = { role: "user" | "model"; parts: GeminiPart[] };

export async function POST(req: NextRequest) {
  try {
    const { messages, hairContext } = (await req.json()) as {
      messages: ChatMessage[];
      hairContext?: string;
    };

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const systemText = hairContext
      ? `${SYSTEM_PROMPT}\n\n--- נתוני שיער של המשתמשת ---\n${hairContext}`
      : SYSTEM_PROMPT;

    const contents: GeminiContent[] = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemText }] },
          contents,
          generationConfig: { temperature: 0.75, maxOutputTokens: 1024 },
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: "AI service error" }, { status: response.status });
    }

    const data = await response.json();
    const text: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "מצטערת, לא הצלחתי לעבד את הבקשה. אנא נסי שוב.";

    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
