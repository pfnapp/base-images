#!/usr/bin/env node

/**
 * scripts/run-codex-remediation.js
 *
 * Fast, streaming LLM remediation client for GitHub Actions.
 * Supports OpenAI Chat Completions & Responses API with streaming
 * to prevent gateway/proxy socket timeouts.
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

const model = process.env.CODEX_MODEL || process.env.OPENAI_MODEL || 'mimo-v2.6-flash-free';
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

  const systemInstruction = 'You are an automated container security hardening agent. You strictly adhere to user instructions and zero-regression rules. Output the complete <<<SUMMARY>>> and <<<DOCKERFILE>>> blocks in plain text.';

  let bodyPayload;
  if (isResponsesApi) {
    bodyPayload = JSON.stringify({
      model: model,
      input: `${systemInstruction}\n\n${promptText}`,
      stream: true
    });
  } else {
    bodyPayload = JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: promptText }
      ],
      temperature: 0.2,
      stream: true
    });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 600000); // 10 minutes timeout

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'text/event-stream, application/json'
      },
      body: bodyPayload,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text();
      console.error(`❌ API request failed with HTTP ${res.status} (${res.statusText}):`);
      console.error(errText);
      process.exit(1);
    }

    let fullText = '';
    const contentType = res.headers.get('content-type') || '';

    // Handle Streaming (SSE)
    if (contentType.includes('text/event-stream') || res.body) {
      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf8');
      let buffer = '';
      let chunkCount = 0;
      let lastLog = Date.now();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // retain incomplete line

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith(':')) continue;
          if (trimmed === 'data: [DONE]') continue;

          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6);
            try {
              const parsed = JSON.parse(dataStr);
              chunkCount++;

              // 1. Chat completions delta
              if (parsed.choices && typeof parsed.choices[0]?.delta?.content === 'string') {
                fullText += parsed.choices[0].delta.content;
              }
              // 2. Responses API text deltas (response.output_text.delta, output_text_delta, etc.)
              else if (typeof parsed.delta === 'string') {
                fullText += parsed.delta;
              }
              else if (parsed.delta && typeof parsed.delta.text === 'string') {
                fullText += parsed.delta.text;
              }
              else if (typeof parsed.text === 'string') {
                fullText += parsed.text;
              }
              // 3. Complete response in final event
              else if (parsed.response || parsed.output) {
                const resp = parsed.response || parsed;
                if (Array.isArray(resp.output)) {
                  let extracted = '';
                  for (const item of resp.output) {
                    if (Array.isArray(item.content)) {
                      for (const c of item.content) {
                        if (typeof c.text === 'string') extracted += c.text;
                        else if (typeof c.output_text === 'string') extracted += c.output_text;
                      }
                    } else if (typeof item.content === 'string') {
                      extracted += item.content;
                    }
                  }
                  if (extracted && extracted.length > fullText.length) {
                    fullText = extracted;
                  }
                }
              }
            } catch {
              // Non-JSON SSE line or raw text chunk
            }
          }
        }

        if (Date.now() - lastLog > 15000) {
          const elapsed = Math.round((Date.now() - startTime) / 1000);
          console.log(`⏳ Streaming response... (${elapsed}s elapsed, ${fullText.length} chars received)`);
          lastLog = Date.now();
        }
      }
    }

    // Fallback if not streamed or fullText empty
    if (!fullText) {
      const fallbackData = await res.json().catch(() => null);
      if (fallbackData) {
        if (fallbackData.choices && fallbackData.choices[0]?.message?.content) {
          fullText = fallbackData.choices[0].message.content;
        } else if (Array.isArray(fallbackData.output)) {
          for (const item of fallbackData.output) {
            if (Array.isArray(item.content)) {
              for (const c of item.content) {
                if (c.text) fullText += c.text + '\n';
                else if (c.output_text) fullText += c.output_text + '\n';
              }
            } else if (typeof item.content === 'string') {
              fullText += item.content + '\n';
            }
          }
        } else if (fallbackData.output_text) {
          fullText = fallbackData.output_text;
        }
      }
    }

    fullText = fullText.trim();

    if (!fullText) {
      console.error(`❌ Could not extract any text content from API response (received ${chunkCount} chunks).`);
      console.error(`Debug last buffer:`, buffer.slice(0, 500));
      process.exit(1);
    }

    fs.writeFileSync(outputFile, fullText, 'utf8');
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`✅ Remediation response generated successfully in ${elapsed}s!`);
    console.log(`- Output saved to: ${outputFile} (${fullText.length} characters)`);
    console.log(`--- RESPONSE PREVIEW ---\n${fullText.slice(0, 600)}\n-----------------------`);
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('❌ Request timed out after 600 seconds.');
    } else {
      console.error('❌ Error communicating with LLM API:', err.message);
    }
    process.exit(1);
  }
}

generate();
