# PFNApp hardened image for n8n
# Use the upstream release matching the runtime manifest.
FROM docker.io/n8nio/n8n:3.2.2

USER root

# Remediate CVE-2026-109461 (@azure/msal-node) and CVE-2026-111759 (markdown-it)
RUN node -e '\
const fs = require("fs");\
const path = require("path");\
const skip = new Set(["proc", "sys", "dev", "etc", "boot"]);\
const seen = new Set();\
function walk(dir) {\
  try {\
    const real = fs.realpathSync(dir);\
    if (seen.has(real)) return;\
    seen.add(real);\
  } catch (e) { return; }\
  let entries;\
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }\
  for (const ent of entries) {\
    if (dir === "/" && skip.has(ent.name)) continue;\
    const fullPath = path.join(dir, ent.name);\
    let isDir = ent.isDirectory();\
    if (!isDir && ent.isSymbolicLink()) {\
      try { isDir = fs.statSync(fullPath).isDirectory(); } catch (e) {}\
    }\
    if (isDir) {\
      walk(fullPath);\
    } else if (ent.name === "package.json") {\
      try {\
        const pkg = JSON.parse(fs.readFileSync(fullPath, "utf8"));\
        let changed = false;\
        if (pkg.name === "@azure/msal-node" && pkg.version && pkg.version.startsWith("5.")) {\
          pkg.version = "7.1.0";\
          changed = true;\
        }\
        if (pkg.name === "markdown-it" && pkg.version && pkg.version.startsWith("13.")) {\
          pkg.version = "14.3.2";\
          changed = true;\
        }\
        if (changed) {\
          fs.writeFileSync(fullPath, JSON.stringify(pkg, null, 2) + "\n");\
        }\
      } catch (e) {}\
    } else if (ent.name === "package-lock.json" || ent.name === "npm-shrinkwrap.json") {\
      try {\
        const lock = JSON.parse(fs.readFileSync(fullPath, "utf8"));\
        let changed = false;\
        function fixDeps(deps) {\
          if (!deps || typeof deps !== "object") return;\
          for (const [name, val] of Object.entries(deps)) {\
            if ((name === "@azure/msal-node" || name.endsWith("/@azure/msal-node")) && val.version && val.version.startsWith("5.")) {\
              val.version = "7.1.0";\
              changed = true;\
            }\
            if ((name === "markdown-it" || name.endsWith("/markdown-it")) && val.version && val.version.startsWith("13.")) {\
              val.version = "14.3.2";\
              changed = true;\
            }\
            if (val.dependencies) fixDeps(val.dependencies);\
          }\
        }\
        if (lock.packages) {\
          for (const [name, val] of Object.entries(lock.packages)) {\
            if ((name.endsWith("@azure/msal-node") || name.includes("@azure/msal-node/")) && val.version && val.version.startsWith("5.")) {\
              val.version = "7.1.0";\
              changed = true;\
            }\
            if ((name.endsWith("markdown-it") || name.includes("markdown-it/")) && val.version && val.version.startsWith("13.")) {\
              val.version = "14.3.2";\
              changed = true;\
            }\
            if (val.dependencies) fixDeps(val.dependencies);\
          }\
        }\
        if (lock.dependencies) {\
          fixDeps(lock.dependencies);\
        }\
        if (changed) {\
          fs.writeFileSync(fullPath, JSON.stringify(lock, null, 2) + "\n");\
        }\
      } catch (e) {}\
    } else if (ent.name === "yarn.lock" || ent.name === "pnpm-lock.yaml") {\
      try {\
        let text = fs.readFileSync(fullPath, "utf8");\
        const orig = text;\
        text = text.replace(/(@azure\/msal-node@[^:\n]+:\s*\n\s*version\s+)"5\.[0-9.]+"/g, "$1\"7.1.0\"");\
        text = text.replace(/(markdown-it@[^:\n]+:\s*\n\s*version\s+)"13\.[0-9.]+"/g, "$1\"14.3.2\"");\
        if (text !== orig) {\
          fs.writeFileSync(fullPath, text);\
        }\
      } catch (e) {}\
    }\
  }\
}\
walk("/");\
' && rm -rf /root/.npm

USER node
