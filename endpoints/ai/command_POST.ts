import { schema } from "./command_POST.schema";
import superjson from "superjson";
import OpenAI from "openai";
import { ZodError } from "zod";

const DEFAULT_REQUEST_BODY_LIMIT_BYTES = 32768;

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

function getRequestBodyLimitBytes() {
  const parsed = Number(process.env.COMPND_AI_REQUEST_BODY_LIMIT_BYTES || "");
  if (!Number.isFinite(parsed)) {
    return DEFAULT_REQUEST_BODY_LIMIT_BYTES;
  }
  return Math.max(4096, Math.min(262144, Math.floor(parsed)));
}

function getContentLength(request: Request) {
  const rawValue = request.headers.get("content-length") || "";
  const parsed = Number(rawValue);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function errorResponse(message: string, status: number) {
  return new Response(superjson.stringify({ error: message }), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function isConfiguredApiKey(value: string) {
  const normalized = value.trim().toLowerCase();
  if (!normalized || normalized.length < 20) {
    return false;
  }
  return !["fill", "placeholder", "replace", "your-api-key", "changeme"].some((token) => normalized.includes(token));
}

function redactSensitiveText(value: string) {
  return value
    .replace(/Incorrect API key provided:[^\r\n]*/gi, "Incorrect API key provided: [redacted]")
    .replace(/sk-(?:proj-)?[A-Za-z0-9_-]+/g, "[redacted-openai-key]")
    .replace(/ghp_[0-9A-Za-z]{36,}/g, "[redacted-github-token]")
    .replace(/github_pat_[0-9A-Za-z_]+/g, "[redacted-github-token]");
}

function getSafeErrorMessage(error: unknown) {
  return redactSensitiveText(error instanceof Error ? error.message : String(error));
}

export async function handle(request: Request) {
  try {
    const requestBodyLimitBytes = getRequestBodyLimitBytes();
    const contentLength = getContentLength(request);
    if (contentLength !== null && contentLength > requestBodyLimitBytes) {
      return errorResponse("AI command request is too large.", 413);
    }

    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > requestBodyLimitBytes) {
      return errorResponse("AI command request is too large.", 413);
    }

    const apiKey = String(process.env.OPENAI_API_KEY || "").trim();
    if (!isConfiguredApiKey(apiKey)) {
      return errorResponse("AI command service is not configured.", 503);
    }

    const json = superjson.parse(rawBody);
    const { command, history = [] } = schema.parse(json);

    const recentHistory = history.slice(-10);
    const openai = new OpenAI({ apiKey });

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
    if (error instanceof ZodError) {
      return errorResponse("Invalid AI command input.", 400);
    }

    console.error("AI Command Error:", getSafeErrorMessage(error));
    return errorResponse("AI command service is unavailable.", 500);
  }
}
