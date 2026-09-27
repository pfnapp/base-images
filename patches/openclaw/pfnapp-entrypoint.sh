#!/bin/sh
# Seeds ingress-related gateway config from env so platform templates need no
# long command: OpenClaw reads trustedProxies/allowedOrigins only from its
# config file. Comma-separated lists; unset vars leave the config untouched.
#   OPENCLAW_TRUSTED_PROXIES=10.42.0.0/16
#   OPENCLAW_ALLOWED_ORIGINS=https://app.example.com
set -e

batch=$(node -e '
const list = (v) => (v || "").split(",").map((s) => s.trim()).filter(Boolean);
const ops = [];
const proxies = list(process.env.OPENCLAW_TRUSTED_PROXIES);
const origins = list(process.env.OPENCLAW_ALLOWED_ORIGINS);
if (proxies.length) ops.push({ path: "gateway.trustedProxies", value: proxies });
if (origins.length) ops.push({ path: "gateway.controlUi.allowedOrigins", value: origins });
if (ops.length) console.log(JSON.stringify(ops));
')

if [ -n "$batch" ]; then
  node /app/openclaw.mjs config set --batch-json "$batch" >/dev/null
fi

exec "$@"
