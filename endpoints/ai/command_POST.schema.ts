import { z } from "zod";

export const MAX_COMMAND_LENGTH = 2000;
export const MAX_HISTORY_MESSAGES = 10;
export const MAX_HISTORY_MESSAGE_LENGTH = 2000;

export const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(MAX_HISTORY_MESSAGE_LENGTH, "History message is too long"),
});

export const schema = z.object({
  command: z.string().min(1, "Command cannot be empty").max(MAX_COMMAND_LENGTH, "Command is too long"),
  history: z.array(messageSchema).max(MAX_HISTORY_MESSAGES, "History contains too many messages").optional(),
});

export type InputType = z.infer<typeof schema>;

// Output is a stream, so we don't define a strict JSON output type for the body content itself in the traditional sense,
// but the client helper will handle the stream.
export type OutputType = ReadableStream;

// We don't export a helper function here because streaming requires specific handling (ReadableStream)
// that is better implemented directly in the useAiCommand hook rather than a generic fetch wrapper
// that expects JSON.
