import {
  assertCompndAutonomyAdmin,
  AutonomyHttpError,
  getCompndAutonomyStatus,
} from "../../../helpers/compndAutonomyBridge";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function handle(request: Request) {
  try {
    assertCompndAutonomyAdmin(request);
    return json(await getCompndAutonomyStatus());
  } catch (error) {
    const status = error instanceof AutonomyHttpError ? error.status : 500;
    return json({ error: error instanceof Error ? error.message : String(error) }, status);
  }
}
