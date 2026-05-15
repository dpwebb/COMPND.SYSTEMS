import { z } from "zod";

export const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

export const schema = z.object({
  command: z.string().min(1, "Command cannot be empty"),
  history: z.array(messageSchema).optional(),
});

export type InputType = z.infer<typeof schema>;

// Output is a stream, so we don't define a strict JSON output type for the body content itself in the traditional sense,
// but the client helper will handle the stream.
export type OutputType = ReadableStream;

// We don't export a helper function here because streaming requires specific handling (ReadableStream)
// that is better implemented directly in the useAiCommand hook rather than a generic fetch wrapper
// that expects JSON.