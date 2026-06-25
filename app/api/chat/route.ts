import Anthropic from "@anthropic-ai/sdk";
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

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { messages, hairContext } = (await req.json()) as {
      messages: ChatMessage[];
      hairContext?: string;
    };

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const systemText = hairContext
      ? `${SYSTEM_PROMPT}\n\n--- נתוני שיער של המשתמשת ---\n${hairContext}`
      : SYSTEM_PROMPT;

    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      system: systemText,
      messages,
    });

    const text =
      response.content[0]?.type === "text"
        ? response.content[0].text
        : "מצטערת, לא הצלחתי לעבד את הבקשה. אנא נסי שוב.";

    return NextResponse.json({ text });
  } catch (err) {
    console.error("Claude API error", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
