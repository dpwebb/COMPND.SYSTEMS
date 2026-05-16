import "./loadEnv.js";
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { serve } from '@hono/node-server';

const app = new Hono();

app.post('_api/ai/command',async c => {
  try {
    const { handle } = await import("./endpoints/ai/command_POST.js");
    let request = c.req.raw;
    const response = await handle(request);
    if (!(response instanceof Response) && response.constructor.name !== "Response") {
      return c.text("Invalid response format. handle should always return a Response object." + response.constructor.name, 500);
    }
    return response;
  } catch (e) {
    console.error(e);
    return c.text("Error loading endpoint code " + e.message,  500)
  }
})
app.get('_api/admin/autonomy/status',async c => {
  try {
    const { handle } = await import("./endpoints/admin/autonomy/status_GET.js");
    let request = c.req.raw;
    const response = await handle(request);
    if (!(response instanceof Response) && response.constructor.name !== "Response") {
      return c.text("Invalid response format. handle should always return a Response object." + response.constructor.name, 500);
    }
    return response;
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : String(e);
    return c.text("Error loading endpoint code " + message, 500)
  }
})
app.post('_api/admin/autonomy/start_run',async c => {
  try {
    const { handle } = await import("./endpoints/admin/autonomy/start_run_POST.js");
    let request = c.req.raw;
    const response = await handle(request);
    if (!(response instanceof Response) && response.constructor.name !== "Response") {
      return c.text("Invalid response format. handle should always return a Response object." + response.constructor.name, 500);
    }
    return response;
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : String(e);
    return c.text("Error loading endpoint code " + message, 500)
  }
})
app.use("/*", serveStatic({ root: "./static" }));
app.use('/*', serveStatic({ root: './dist' }))
app.get("*", async (c, next) => {
  const p = c.req.path;
  if (p.startsWith("/_api")) {
    return next();
  }
  return serveStatic({ path: "./dist/index.html" })(c, next);
});
const port = Number(process.env.PORT || 3336);
serve({ fetch: app.fetch, port });
console.log(`Running at http://localhost:${port}`)
