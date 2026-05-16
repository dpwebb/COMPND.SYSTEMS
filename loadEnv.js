import fs from "fs";

const envPath = new URL("./env.json", import.meta.url);

if (fs.existsSync(envPath)) {
  const envConfig = JSON.parse(fs.readFileSync(envPath, "utf8"));

  Object.keys(envConfig).forEach((key) => {
    if (process.env[key] === undefined) {
      process.env[key] = envConfig[key];
    }
  });
}
