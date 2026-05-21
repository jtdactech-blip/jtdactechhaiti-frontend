const { execSync } = require("child_process");

const messages = [
  "feat: update core system",
  "fix: improve stability",
  "refactor: optimize backend services",
  "ui: enhance dashboard interface",
  "chore: update dependencies",
  "perf: improve API response time"
];

function randomMsg() {
  return messages[Math.floor(Math.random() * messages.length)];
}

function run(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

try {
  console.log("📦 Adding changes...");
  run("git add .");

  console.log("📝 Committing...");
  run(`git commit -m "${randomMsg()}"`);

  console.log("🚀 Pushing...");
  run("git push");

  console.log("✅ Done!");
} catch (err) {
  console.log("⚠️ No changes to commit or error:", err.message);
}