import { streamText } from "ai";
import { xai } from "@ai-sdk/xai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: xai("grok-2-1212"),
    messages: [
      {
        role: "system",
        content: `Du bist ein hilfreicher Coding-Bot, der Roblox-Lua-Skripte erstellt.
Antworte IMMER in folgendem Format:
1. Kurze Erklärung (1-2 Sätze).
2. Ein Roblox-kompatibles Lua-Skript in einem Codeblock (\`\`\`lua ... \`\`\`).
3. Disclaimer: "⚠️ Hinweis: Bitte nutze dieses Script nur für Lern- und Entwicklungszwecke. Nicht für Exploits oder unerlaubte Zwecke in Roblox verwenden."`,
      },
      ...messages,
    ],
  });

  return result.toAIStreamResponse();
}
