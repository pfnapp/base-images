# Java (Eclipse Temurin JRE) Hardened Base Images

Hardened, unprivileged Java Runtime Environment (JRE) container images based on Alpine Linux and official Eclipse Temurin OpenJDK builds.

## 📦 Supported Tags

| Java Version | Base OS | Status | Pull Tag |
| :--- | :--- | :--- | :--- |
| **Java 21 (LTS)** | Alpine Linux | Active (`latest`) | `ghcr.io/pfnapp/base/languages/java:21-alpine` |
| **Java 17 (LTS)** | Alpine Linux | Active (Supported) | `ghcr.io/pfnapp/base/languages/java:17-alpine` |

---

## 🔒 Security & Hardening Features

- **Non-Root Execution**: Runs under UID `10001` (`appuser`) and GID `10001` (`appgroup`).
- **Unprivileged Ingress**: Listens on port `8080` by default (`server.port=8080`).
- **Container Memory Aware**: Configured with `-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0` to respect Kubernetes cgroup memory limits.
- **Process Supervisor**: Equipped with `dumb-init` for proper signal routing (`SIGTERM`, `SIGINT`) to gracefully stop the JVM.
- **SUID/SGID Elimination**: All binary privilege escalation bits are stripped at build time.
- **Pre-installed Tooling**: Includes `ca-certificates`, `tzdata`, and `curl` for container liveness/readiness health probes.

---

## 🚀 Usage Example

### Multi-stage Dockerfile (Spring Boot / Gradle / Maven)
```dockerfile
# Build stage
FROM maven:3.9-eclipse-temurin-21-alpine AS builder
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Production runner
FROM ghcr.io/pfnapp/base/languages/java:21-alpine
COPY --from=builder /build/target/*.jar /app/app.jar

EXPOSE 8080
CMD ["/usr/local/bin/entrypoint.sh"]
```
