#!/usr/bin/env node

/**
 * scripts/prepare-codex-prompt.js
 *
 * Prepares a structured prompt file for Codex Action from a GitHub Issue,
 * embedding the issue details, current Dockerfile, and runtime manifest contract.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const [,, issueNumber, outputPromptFile] = process.argv;

if (!issueNumber || !outputPromptFile) {
  console.error('Usage: node scripts/prepare-codex-prompt.js <issueNumber> <outputPromptFile>');
  process.exit(1);
}

console.log(`Fetching context for issue #${issueNumber}...`);

let issueJson;
try {
  const raw = execSync(`gh issue view "${issueNumber}" --json number,title,body,labels`, {
    cwd: ROOT_DIR,
    encoding: 'utf8'
  });
  issueJson = JSON.parse(raw);
} catch (err) {
  console.error(`Failed to fetch issue #${issueNumber}:`, err.message);
  process.exit(1);
}

const { title, body, labels } = issueJson;

// Clean up redundant instructions from body to keep prompt concise
const cleanedBody = (body || '').split('### 🤖 Remediation Instructions')[0].trim();

// Extract App ID from labels or body
let appId = null;
for (const lbl of (labels || [])) {
  if (lbl.name.startsWith('app:')) {
    appId = lbl.name.replace(/^app:/, '');
    break;
  }
}

if (!appId) {
  const match = body.match(/`patches\/([^/]+)\/Dockerfile`/);
  if (match) {
    appId = match[1];
  }
}

if (!appId) {
  console.error('❌ Could not determine target application ID from issue.');
  process.exit(1);
}

const dockerfilePath = path.join(ROOT_DIR, 'patches', appId, 'Dockerfile');
const manifestPath = path.join(ROOT_DIR, 'patches', appId, 'runtime-manifest.json');

if (!fs.existsSync(dockerfilePath)) {
  console.error(`❌ Target Dockerfile does not exist: ${dockerfilePath}`);
  process.exit(1);
}

const currentDockerfile = fs.readFileSync(dockerfilePath, 'utf8');
let currentManifest = 'None';
if (fs.existsSync(manifestPath)) {
  currentManifest = fs.readFileSync(manifestPath, 'utf8');
}

const promptContent = `You are a Principal Security Hardening Engineer for container images.
Your objective is to remediate the actionable Critical and High vulnerabilities reported for application: \`${appId}\`.

### ISSUE CONTEXT (Issue #${issueNumber})
**Title:** ${title}

${cleanedBody}

---

### CURRENT DOCKERFILE (\`patches/${appId}/Dockerfile\`):
\`\`\`dockerfile
${currentDockerfile}
\`\`\`

---

### RUNTIME MANIFEST CONTRACT (\`patches/${appId}/runtime-manifest.json\`):
\`\`\`json
${currentManifest}
\`\`\`

---

### SPEED & EFFICIENCY DIRECTIVE:
- Complete the remediation swiftly and decisively.
- **DO NOT** execute terminal commands or run package managers (apt, pip, npm). Local command execution is sandboxed without external network. Formulate all Dockerfile instructions through direct synthesis.
- Focus purely on formulating the hardened Dockerfile.

---

### HARDENING DIRECTIVES & ZERO-REGRESSION RULES:
1. **Preserve Runtime Contract (CRITICAL):**
   - The container MUST be able to boot, listen on the port declared in the runtime manifest, and answer health probes.
   - DO NOT remove required runtime engines (Node runtime, Python virtualenv, Go binary, etc.).
   - DO NOT alter user permissions (UID/GID) or entrypoint behaviors required by the application.
2. **System Layer Hardening (OS packages):**
   - If Debian/Ubuntu: identify unneeded packages bringing CVEs (e.g. build tools, ffmpeg, xvfb, x11, openssh-client) and purge them: \`apt-get purge -y --auto-remove <pkgs> && rm -rf /var/lib/apt/lists/*\`.
   - If Alpine: update & upgrade installed packages: \`apk update && apk upgrade --no-cache && rm -rf /var/cache/apk/*\`.
3. **Application Layer Hardening (Dependencies):**
   - For Node apps: strip unused npm/npx tools (\`/usr/local/lib/node_modules/npm\`, \`/root/.npm\`), prune devDependencies.
   - For Python apps: upgrade vulnerable packages via pip in the container virtualenv (e.g. \`pip install --no-cache-dir --upgrade anyio httpx2\`).
   - For Tooling binaries (like \`uv\`): upgrade binary download to the latest patched stable version.
4. **Idempotence & Buildability:**
   - Every command in the Dockerfile MUST build without error or interactive prompts.

---

### REQUIRED OUTPUT FORMAT:
You MUST format your response using EXACTLY these two tags:

<<<SUMMARY>>>
### 🛡️ Remediation Summary
- **Packages Purged / Upgraded:** <list of changes>
- **CVEs Mitigated:** <list of targeted CVEs>
- **Zero-Regression Analysis:** <verification that runtime contract is preserved>
<<<END_SUMMARY>>>

<<<DOCKERFILE>>>
<Complete, updated, and hardened Dockerfile content starting with FROM or ARG>
<<<END_DOCKERFILE>>>
`;

fs.writeFileSync(outputPromptFile, promptContent, 'utf8');
console.log(`✅ Generated prompt file at: ${outputPromptFile}`);

// Export to GITHUB_OUTPUT if available
if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `has_target=true\napp_id=${appId}\ndockerfile=patches/${appId}/Dockerfile\n`);
}
