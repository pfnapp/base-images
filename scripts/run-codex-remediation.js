#!/usr/bin/env node

/**
 * scripts/run-codex-remediation.js
 *
 * Direct, fast LLM remediation client for GitHub Actions.
 * Bypasses fragile runner container sandboxing (bubblewrap/drop-sudo) that
 * hangs on Ubuntu 24.04 runners.
 *
 * Supports:
 * - Standard OpenAI Chat Completions API (/v1/chat/completions)
 * - OpenAI Responses API (/v1/responses)
 * - Custom Base URLs (OpenAI, Azure, OpenRouter, LiteLLM, Morph, etc.)
 */

const fs = require('fs');

const [,, promptFile, outputFile] = process.argv;

if (!promptFile || !outputFile) {
  console.error('Usage: node scripts/run-codex-remediation.js <promptFile> <outputFile>');
  process.exit(1);
}

if (!fs.existsSync(promptFile)) {
  console.error(`❌ Prompt file not found: ${promptFile}`);
  process.exit(1);
}

const apiKey = process.env.CODEX_API_KEY || process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('❌ Neither CODEX_API_KEY nor OPENAI_API_KEY is defined in environment.');
  process.exit(1);
}

let rawBaseUrl = process.env.CODEX_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
rawBaseUrl = rawBaseUrl.replace(/\/+$/, '');

const model = process.env.CODEX_MODEL || process.env.OPENAI_MODEL || 'gpt-4o';
const promptText = fs.readFileSync(promptFile, 'utf8');

console.log(`🤖 Starting Remediation Generation`);
console.log(`- Model: ${model}`);
console.log(`- Base URL: ${rawBaseUrl}`);
console.log(`- Prompt length: ${promptText.length} characters`);

const isResponsesApi = rawBaseUrl.endsWith('/responses');
const endpoint = isResponsesApi
  ? rawBaseUrl
  : (rawBaseUrl.endsWith('/chat/completions') ? rawBaseUrl : `${rawBaseUrl}/chat/completions`);

console.log(`- Target Endpoint: ${endpoint}`);

async function generate() {
  const startTime = Date.now();

  const systemInstruction = 'You are an automated container security hardening agent. You strictly adhere to user instructions and zero-regression rules. You have NO tool execution or terminal capabilities. Do NOT emit <tool_call> or function calls. Formulate all instructions directly and output the complete <<<SUMMARY>>> and <<<DOCKERFILE>>> blocks in plain text.';

  let bodyPayload;
  if (isResponsesApi) {
    bodyPayload = JSON.stringify({
      model: model,
      input: `${systemInstruction}\n\n${promptText}`
    });
  } else {
    bodyPayload = JSON.stringify({
      model: model,
      messages: [
        {
          role: 'system',
          content: systemInstruction
        },
        {
          role: 'user',
          content: promptText
        }
      ],
      temperature: 0.2
    });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 600000); // 10 minutes timeout

  const progressInterval = setInterval(() => {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    console.log(`⏳ Still generating remediation... (${elapsed}s elapsed)`);
  }, 15000);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: bodyPayload,
      signal: controller.signal
    });

    clearInterval(progressInterval);
    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text();
      console.error(`❌ API request failed with HTTP ${res.status} (${res.statusText}):`);
      console.error(errText);
      process.exit(1);
    }

    const data = await res.json();
    let content = '';

    if (data.choices && data.choices[0]?.message?.content) {
      content = data.choices[0].message.content;
    } else if (Array.isArray(data.output)) {
      for (const item of data.output) {
        if (Array.isArray(item.content)) {
          for (const c of item.content) {
            if (c.text) content += c.text + '\n';
            else if (c.output_text) content += c.output_text + '\n';
          }
        } else if (typeof item.content === 'string') {
          content += item.content + '\n';
        }
      }
      content = content.trim();
    } else if (data.output_text) {
      content = data.output_text;
    } else if (typeof data.response === 'string') {
      content = data.response;
    } else {
      console.error('⚠️ Unexpected response structure from API:', JSON.stringify(data).slice(0, 500));
      process.exit(1);
    }

    if (!content) {
      console.error('❌ Empty content extracted from API response:', JSON.stringify(data).slice(0, 500));
      process.exit(1);
    }

    fs.writeFileSync(outputFile, content, 'utf8');
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`✅ Remediation response generated successfully in ${elapsed}s!`);
    console.log(`- Output saved to: ${outputFile} (${content.length} characters)`);
  } catch (err) {
    clearInterval(progressInterval);
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      console.error('❌ Request timed out after 600 seconds.');
    } else {
      console.error('❌ Error communicating with LLM API:', err.message);
    }
    process.exit(1);
  }
}

generate();
