import {
  assertCompndAutonomyAdmin,
  auditCompndAutonomyAdminFailure,
  AutonomyHttpError,
  startCompndAutonomyRun,
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
    const body = await request.json().catch(() => ({}));
    return json(
      await startCompndAutonomyRun({
        prompt: String(body?.prompt || ""),
        runId: body?.runId ? String(body.runId) : "",
        model: body?.model ? String(body.model) : "",
      }),
      202
    );
  } catch (error) {
    auditCompndAutonomyAdminFailure(request, error);
    const status = error instanceof AutonomyHttpError ? error.status : 500;
    return json({ error: error instanceof Error ? error.message : String(error) }, status);
  }
}
