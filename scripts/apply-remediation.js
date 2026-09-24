#!/usr/bin/env node

/**
 * scripts/apply-remediation.js
 *
 * Parses the AI model's response from Codex Action, extracts the hardened Dockerfile,
 * and writes it to the target application Dockerfile for local build testing.
 */

const fs = require('fs');

const [,, responseFile, targetDockerfile, summaryOutputFile] = process.argv;

if (!responseFile || !targetDockerfile) {
  console.error('Usage: node scripts/apply-remediation.js <responseFile> <targetDockerfile> [summaryOutputFile]');
  process.exit(1);
}

if (!fs.existsSync(responseFile)) {
  console.error(`Error: Response file ${responseFile} does not exist.`);
  process.exit(1);
}

const content = fs.readFileSync(responseFile, 'utf8');

// 1. Extract Dockerfile
let dockerfile = null;
const tagMatch = content.match(/<<<DOCKERFILE>>>([\s\S]*?)<<<END_DOCKERFILE>>>/);
if (tagMatch) {
  dockerfile = tagMatch[1].trim();
} else {
  const fenceMatch = content.match(/```(?:dockerfile|docker)?\s*([\s\S]*?)```/i);
  if (fenceMatch) {
    dockerfile = fenceMatch[1].trim();
  } else if (content.includes('FROM ') || content.includes('ARG ')) {
    dockerfile = content.trim();
  }
}

if (!dockerfile) {
  console.error('❌ Could not find valid Dockerfile content in Codex response.');
  process.exit(1);
}

// Ensure it starts with reasonable dockerfile tokens
const firstNonComment = dockerfile.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'))[0] || '';
if (!firstNonComment.startsWith('FROM') && !firstNonComment.startsWith('ARG') && !firstNonComment.startsWith('syntax=')) {
  console.error(`⚠️ Extracted content does not appear to be a valid Dockerfile (starts with: "${firstNonComment}")`);
  process.exit(1);
}

fs.writeFileSync(targetDockerfile, dockerfile + '\n', 'utf8');
console.log(`✅ Applied remediated Dockerfile to ${targetDockerfile}`);

// 2. Extract Summary
let summary = '### 🛡️ Remediation Summary\nAutomated remediation applied to Dockerfile.';
const sumMatch = content.match(/<<<SUMMARY>>>([\s\S]*?)<<<END_SUMMARY>>>/);
if (sumMatch) {
  summary = sumMatch[1].trim();
} else {
  // Use text before any code block
  const beforeCode = content.split('```')[0].trim();
  if (beforeCode.length > 20) {
    summary = beforeCode;
  }
}

if (summaryOutputFile) {
  fs.writeFileSync(summaryOutputFile, summary + '\n', 'utf8');
  console.log(`✅ Wrote remediation summary to ${summaryOutputFile}`);
}
