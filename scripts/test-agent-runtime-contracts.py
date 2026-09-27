#!/usr/bin/env python3
"""Targeted static contracts; live dashboard/auth/persistence need Compose tests."""

import json
import os
import re
from pathlib import Path
import subprocess
import unittest


ROOT = Path(__file__).resolve().parents[1]


def manifest(app):
    return json.loads((ROOT / "patches" / app / "runtime-manifest.json").read_text())


def compose_service(app):
    # Do not load a developer's .env or render their bootstrap credentials.
    env = {key: value for key, value in os.environ.items()
           if not key.startswith(("OPENCLAW_", "HERMES_", "API_SERVER_", "COMPOSE_"))}
    env.update({
        "OPENCLAW_GATEWAY_TOKEN": "static-contract-test-not-a-real-secret",
        "HERMES_DASHBOARD_BASIC_AUTH_USERNAME": "contract-test",
        "HERMES_DASHBOARD_BASIC_AUTH_PASSWORD": "static-contract-test-not-a-real-secret",
    })
    result = subprocess.run(
        ["docker", "compose", "--env-file", "/dev/null", "-f",
         str(ROOT / "patches" / app / "docker-compose.yml"),
         "config", "--format", "json"],
        env=env, check=True, capture_output=True, text=True,
    )
    return json.loads(result.stdout)["services"][app]


class AgentRuntimeContracts(unittest.TestCase):
    def test_versions_match_dockerfile_and_compose(self):
        for app in ("hermes-agent", "openclaw"):
            with self.subTest(app=app):
                data = manifest(app)
                base = next(line for line in (ROOT / "patches" / app / "Dockerfile").read_text().splitlines()
                            if line.startswith("FROM "))
                self.assertEqual(base.rsplit(":", 1)[1], data["version"])
                self.assertEqual(data["baseImage"].rsplit(":", 1)[1], data["version"])
                self.assertEqual(compose_service(app)["image"].rsplit(":", 1)[1], data["version"])

    def test_preserve_entrypoints_and_publish_only_dashboard_on_loopback(self):
        for app, port in (("hermes-agent", 9119), ("openclaw", 18789)):
            with self.subTest(app=app):
                service = compose_service(app)
                self.assertIsNone(service.get("entrypoint"))
                self.assertEqual(len(service["ports"]), 1)
                self.assertEqual(service["ports"][0].get("host_ip"), "127.0.0.1")
                self.assertEqual(service["ports"][0]["target"], port)
                self.assertTrue(service["volumes"])
                self.assertEqual(manifest(app)["ports"]["default"], port)
                for probe in manifest(app)["probes"].values():
                    self.assertEqual(probe["port"], port)

    def test_openclaw_explicit_lan_binding_and_bootstrap(self):
        command = compose_service("openclaw")["command"]
        self.assertEqual(command[:3], ["node", "openclaw.mjs", "gateway"])
        self.assertIn("--allow-unconfigured", command)
        self.assertIn("--bind", command)
        self.assertEqual(command[command.index("--bind") + 1], "lan")
        self.assertNotIn("OPENCLAW_GATEWAY_BIND", compose_service("openclaw")["environment"])
        self.assertEqual(manifest("openclaw")["security"]["runAsUser"], 1000)
        self.assertEqual(manifest("openclaw")["probes"]["liveness"]["path"], "/healthz")
        self.assertEqual(manifest("openclaw")["probes"]["readiness"]["path"], "/startupz")

    def test_kubernetes_examples_do_not_use_compose_shell_escaping(self):
        for app in ("hermes-agent", "openclaw"):
            with self.subTest(app=app):
                readme = (ROOT / "patches" / app / "README.md").read_text()
                pods = [block for block in re.findall(r"```yaml\n(.*?)```", readme, re.DOTALL)
                        if "containers:" in block]
                self.assertTrue(pods, "Missing Kubernetes startup example")
                for pod in pods:
                    self.assertNotIn("$$", pod, "Kubernetes does not need Compose $$ escaping")
                    self.assertIn("args:", pod)
                    self.assertIn("startupProbe:", pod)
                    self.assertIn("persistentVolumeClaim:", pod)

    def test_hermes_bootstrap_keeps_dashboard_and_gateway(self):
        service = compose_service("hermes-agent")
        self.assertEqual(service["command"][:2], ["sh", "-c"])
        self.assertIn("exec hermes gateway run", service["command"][2])
        self.assertEqual(manifest("hermes-agent")["security"]["runAsUser"], 0)
        self.assertEqual(manifest("hermes-agent")["security"]["runAsGroup"], 0)
        self.assertFalse(manifest("hermes-agent")["security"]["readOnlyRoot"])
        for probe in manifest("hermes-agent")["probes"].values():
            self.assertEqual(probe["path"], "/api/health")
        self.assertIn(str(service["environment"]["HERMES_DASHBOARD"]).lower(), ("1", "true"))
        self.assertEqual(service["environment"]["HERMES_DASHBOARD_HOST"], "0.0.0.0")
        self.assertEqual(str(service["environment"]["API_SERVER_ENABLED"]).lower(), "false")
        self.assertIn("platforms.api_server.enabled false", service["command"][2])


if __name__ == "__main__":
    unittest.main()
