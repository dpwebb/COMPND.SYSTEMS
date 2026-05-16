#!/usr/bin/env node

const [, , url, timeoutArg = "30000"] = process.argv;
const timeoutMs = Number(timeoutArg);
const startedAt = Date.now();

if (!url) {
  console.error("Usage: node scripts/wait-for-url.mjs <url> [timeoutMs]");
  process.exit(2);
}

if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
  console.error("timeoutMs must be a positive number.");
  process.exit(2);
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  let lastError = "";

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        console.log(`Ready: ${url} status=${response.status}`);
        return;
      }
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }

    await sleep(500);
  }

  console.error(`Timed out waiting for ${url}: ${lastError || "no response"}`);
  process.exit(1);
}

main();
