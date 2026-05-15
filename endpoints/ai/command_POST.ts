import { schema } from "./command_POST.schema";
import superjson from "superjson";
import OpenAI from "openai";

// Initialize OpenAI client
// Note: In a real deployment, ensure OPENAI_API_KEY is set in environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are the central computer system for COMPND.SYSTEMS, a high-functioning, global software development company.
Your persona is the Star Trek LCARS Computer: efficient, concise, professional, and slightly robotic but helpful.
You do not have a name other than "Computer".
Your responses should be direct and utilitarian. Avoid conversational filler.
If asked about COMPND.SYSTEMS, you know we specialize in:
- Full-Cycle Software Development
- Legacy System Modernization
- Cloud Strategy & Multi-Cloud
- AI/ML & Neural Networks
- Data Engineering & ETL
- IoT & Edge Computing
- Security & Compliance

For general queries, answer accurately but maintain the LCARS persona.
Keep responses relatively short (under 150 words) unless detailed technical data is requested.
`;

export async function handle(request: Request) {
  try {
    // Parse input
    const json = superjson.parse(await request.text());
    const { command, history = [] } = schema.parse(json);

    // Limit history to last 10 messages to avoid token overflow
    const recentHistory = history.slice(-10);

    // Create streaming completion
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...recentHistory,
        { role: "user", content: command },
      ],
      stream: true,
      temperature: 0.3, // Low temperature for more deterministic/robotic responses
      max_tokens: 500,
    });

    // Create a TransformStream to convert OpenAI chunks to text
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("AI Command Error:", error);
    return new Response(
      superjson.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500 }
    );
  }
}