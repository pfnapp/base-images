# PFNApp — n8n Hardened Image

**Upstream:** `docker.io/n8nio/n8n:2.40.6`  
**PFNApp:** `ghcr.io/pfnapp/n8n:2.40.6`

## Overview

n8n is an open-source workflow automation platform and AI agent orchestrator.

## Services & Ports

| Service | Container Port | Sample Publish | Health Check Probe |
| --- | --- | --- | --- |
| n8n Web Editor & API | 5678 | `5678:5678` | `GET /healthz` (200 `{"status":"ok"}`) |

## Probes

- **Liveness probe:** `GET /healthz` (port 5678)
- **Readiness probe:** `GET /healthz/readiness` (port 5678)

## Quick Start

```bash
cd patches/n8n
docker compose up -d
```

Open browser at `http://localhost:5678/` to complete initial owner account onboarding.
