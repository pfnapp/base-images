SHELL := /bin/bash

# ==============================================================================
# PHP Language Configurations
# ==============================================================================
PHP_VERSIONS ?= 8.5 8.4 8.3 8.2 8.1 7.4
PHP_VERSION ?= 8.4
IMAGE_TAG ?= local/php:$(PHP_VERSION)-test
DOCKERFILE ?= languages/php/Dockerfile.alpine
BUILD_CONTEXT ?= languages/php
CONTAINER_NAME ?= php-test-runner
TEST_PORT ?= 8080

# ==============================================================================
# Laravel Framework Configurations
# ==============================================================================
LARAVEL_VERSIONS ?= 8.4 8.3 8.2 8.1 7.4
LARAVEL_PHP_VERSION ?= 8.4
LARAVEL_IMAGE_TAG ?= local/laravel:$(LARAVEL_PHP_VERSION)-test
LARAVEL_DOCKERFILE ?= frameworks/laravel/Dockerfile
LARAVEL_BUILD_CONTEXT ?= frameworks/laravel
LARAVEL_CONTAINER_NAME ?= laravel-test-runner
LARAVEL_TEST_PORT ?= 8080
LARAVEL_BASE_IMAGE ?= local/php:$(LARAVEL_PHP_VERSION)-test

# ==============================================================================
# Node.js Language Configurations
# ==============================================================================
NODE_VERSIONS ?= 22 20 18
NODE_VERSION ?= 22
NODE_IMAGE_TAG ?= local/node:$(NODE_VERSION)-test
NODE_DOCKERFILE ?= languages/node/Dockerfile.alpine
NODE_BUILD_CONTEXT ?= languages/node
NODE_CONTAINER_NAME ?= node-test-runner
NODE_TEST_PORT ?= 8080

# ==============================================================================
# Bun Language Configurations
# ==============================================================================
BUN_VERSIONS ?= 1.4 1.2
BUN_VERSION ?= 1.4
BUN_IMAGE_TAG ?= local/bun:$(BUN_VERSION)-test
BUN_DOCKERFILE ?= languages/bun/Dockerfile.alpine
BUN_BUILD_CONTEXT ?= languages/bun
BUN_CONTAINER_NAME ?= bun-test-runner
BUN_TEST_PORT ?= 8080

# ==============================================================================
# Python Language Configurations
# ==============================================================================
PYTHON_VERSIONS ?= 3.12 3.11
PYTHON_VERSION ?= 3.12
PYTHON_IMAGE_TAG ?= local/python:$(PYTHON_VERSION)-test
PYTHON_DOCKERFILE ?= languages/python/Dockerfile.slim
PYTHON_BUILD_CONTEXT ?= languages/python
PYTHON_CONTAINER_NAME ?= python-test-runner
PYTHON_TEST_PORT ?= 8080

# ==============================================================================
# Go Language Configurations
# ==============================================================================
GO_VERSIONS ?= 1.27 1.26 1.25
GO_VERSION ?= 1.27
GO_IMAGE_TAG ?= local/go:$(GO_VERSION)-test
GO_DOCKERFILE ?= languages/go/Dockerfile.alpine
GO_BUILD_CONTEXT ?= languages/go
GO_CONTAINER_NAME ?= go-test-runner
GO_TEST_PORT ?= 8080

# ==============================================================================
# Java Language Configurations
# ==============================================================================
JAVA_VERSIONS ?= 21 17
JAVA_VERSION ?= 21
JAVA_IMAGE_TAG ?= local/java:$(JAVA_VERSION)-test
JAVA_DOCKERFILE ?= languages/java/Dockerfile.alpine
JAVA_BUILD_CONTEXT ?= languages/java
JAVA_CONTAINER_NAME ?= java-test-runner
JAVA_TEST_PORT ?= 8080

# ==============================================================================
# Next.js Framework Configurations
# ==============================================================================
NEXTJS_VERSIONS ?= 22 20 18
NEXTJS_NODE_VERSION ?= 22
NEXTJS_IMAGE_TAG ?= local/nextjs:$(NEXTJS_NODE_VERSION)-test
NEXTJS_DOCKERFILE ?= frameworks/nextjs/Dockerfile
NEXTJS_BUILD_CONTEXT ?= frameworks/nextjs
NEXTJS_CONTAINER_NAME ?= nextjs-test-runner
NEXTJS_TEST_PORT ?= 8080
NEXTJS_BASE_IMAGE ?= local/node:$(NEXTJS_NODE_VERSION)-test

# ==============================================================================
# Vite Framework Configurations
# ==============================================================================
VITE_IMAGE_TAG ?= local/vite:test
VITE_DOCKERFILE ?= frameworks/vite/Dockerfile
VITE_BUILD_CONTEXT ?= frameworks/vite
VITE_CONTAINER_NAME ?= vite-test-runner
VITE_TEST_PORT ?= 8080

# ==============================================================================
# NestJS Framework Configurations
# ==============================================================================
NESTJS_VERSIONS ?= 22 20 18
NESTJS_NODE_VERSION ?= 22
NESTJS_IMAGE_TAG ?= local/nestjs:$(NESTJS_NODE_VERSION)-test
NESTJS_DOCKERFILE ?= frameworks/nestjs/Dockerfile
NESTJS_BUILD_CONTEXT ?= frameworks/nestjs
NESTJS_CONTAINER_NAME ?= nestjs-test-runner
NESTJS_TEST_PORT ?= 8080
NESTJS_BASE_IMAGE ?= local/node:$(NESTJS_NODE_VERSION)-test

.PHONY: all build test scan build-all test-all clean \
        build-laravel build-laravel-all test-laravel scan-laravel \
        build-node build-node-all test-node test-node-all scan-node \
        build-bun build-bun-all test-bun test-bun-all scan-bun \
        build-python build-python-all test-python test-python-all scan-python \
        build-go build-go-all test-go test-go-all scan-go \
        build-java build-java-all test-java test-java-all scan-java \
        build-nextjs build-nextjs-all test-nextjs test-nextjs-all scan-nextjs \
        build-vite test-vite scan-vite \
        build-nestjs build-nestjs-all test-nestjs test-nestjs-all scan-nestjs \
        build-php-distroless-all build-php-distroless-google build-php-distroless-wolfi build-php-distroless-pfnapp \
        observatory

all: build test scan

# ==============================================================================
# PHP Language Targets
# ==============================================================================
build:
	@echo "==> Building PHP $(PHP_VERSION) Alpine base image..."
	docker build --build-arg PHP_VERSION=$(PHP_VERSION) -t $(IMAGE_TAG) -f $(DOCKERFILE) $(BUILD_CONTEXT)

build-php-distroless-google:
	@echo "==> Building PHP 8.5 Distroless (Google Debian 13 base)..."
	docker build -t local/php:8.5-distroless -f languages/php/Dockerfile.distroless-google languages/php

build-php-distroless-wolfi:
	@echo "==> Building PHP 8.5 Distroless (Wolfi / Chainguard static base)..."
	docker build -t local/php:8.5-distroless-wolfi -f languages/php/Dockerfile.distroless-wolfi languages/php

build-php-distroless-pfnapp:
	@echo "==> Building PHP 8.5 Distroless (PFNApp in-house scratch base)..."
	docker build -t local/php:8.5-distroless-pfnapp -f languages/php/Dockerfile.distroless-pfnapp languages/php

build-php-distroless-all: build-php-distroless-google build-php-distroless-wolfi build-php-distroless-pfnapp
	@echo "==> All PHP 8.5 Distroless variants built successfully!"

build-all:
	@echo "==> Building all PHP versions: $(PHP_VERSIONS)..."
	@for v in $(PHP_VERSIONS); do \
		echo "===> Building PHP $$v..."; \
		docker build --build-arg PHP_VERSION=$$v -t local/php:$$v-test -f $(DOCKERFILE) $(BUILD_CONTEXT) || exit 1; \
	done
	@echo "==> All PHP base images built successfully!"

test:
	@echo "==> Testing runtime environment for $(IMAGE_TAG)..."
	@docker rm -f $(CONTAINER_NAME) 2>/dev/null || true
	@docker run -d --name $(CONTAINER_NAME) -p $(TEST_PORT):8080 $(IMAGE_TAG)
	@echo "Waiting for container services to start..."
	@for i in {1..15}; do \
		if curl -sf http://127.0.0.1:$(TEST_PORT)/healthz > /dev/null 2>&1; then \
			echo "Container is ready."; \
			break; \
		fi; \
		sleep 1; \
	done
	@echo "==> Verifying HTTP response..."
	@curl -fsS http://127.0.0.1:$(TEST_PORT)/ | grep -q '"status": "healthy"' || { \
		echo "Health verification failed!"; \
		docker logs $(CONTAINER_NAME); \
		docker rm -f $(CONTAINER_NAME); \
		exit 1; \
	}
	@echo "==> Verifying non-root execution (UID 10001)..."
	@UID_CHECK=$$(docker exec $(CONTAINER_NAME) id -u); \
	if [ "$$UID_CHECK" != "10001" ]; then \
		echo "Security violation: Process running as UID $$UID_CHECK (expected 10001)"; \
		docker rm -f $(CONTAINER_NAME); \
		exit 1; \
	fi; \
	echo "Verified UID: $$UID_CHECK (appuser)"
	@docker rm -f $(CONTAINER_NAME) > /dev/null
	@echo "==> Runtime test for $(IMAGE_TAG) passed successfully!"

test-all:
	@echo "==> Testing runtime environments for all PHP versions..."
	@for v in $(PHP_VERSIONS); do \
		echo "===> Testing PHP $$v..."; \
		C_NAME="$(CONTAINER_NAME)-$$v"; \
		docker rm -f $$C_NAME 2>/dev/null || true; \
		docker run -d --name $$C_NAME -p $(TEST_PORT):8080 local/php:$$v-test || exit 1; \
		READY=0; \
		for i in {1..15}; do \
			if curl -sf http://127.0.0.1:$(TEST_PORT)/healthz > /dev/null 2>&1; then \
				READY=1; \
				break; \
			fi; \
			sleep 1; \
		done; \
		if [ $$READY -ne 1 ]; then \
			echo "Container for PHP $$v failed to start within 15 seconds!"; \
			docker logs $$C_NAME; \
			docker rm -f $$C_NAME; \
			exit 1; \
		fi; \
		curl -fsS http://127.0.0.1:$(TEST_PORT)/ | grep -q '"status": "healthy"' || { \
			echo "Health check failed for PHP $$v!"; \
			docker logs $$C_NAME; \
			docker rm -f $$C_NAME; \
			exit 1; \
		}; \
		UID_CHECK=$$(docker exec $$C_NAME id -u); \
		if [ "$$UID_CHECK" != "10001" ]; then \
			echo "Security violation in PHP $$v: running as UID $$UID_CHECK"; \
			docker rm -f $$C_NAME; \
			exit 1; \
		fi; \
		echo "Verified PHP $$v: UID $$UID_CHECK"; \
		docker rm -f $$C_NAME > /dev/null; \
	done
	@echo "==> All PHP runtime tests passed successfully!"

scan:
	@echo "==> Running Aqua Trivy vulnerability scanner for $(IMAGE_TAG)..."
	@if command -v trivy > /dev/null 2>&1 && trivy image --version > /dev/null 2>&1 && [ ! -d "/snap" ]; then \
		trivy image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(IMAGE_TAG); \
	else \
		docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(IMAGE_TAG); \
	fi
	@echo "==> Trivy scan passed with zero CRITICAL/HIGH vulnerabilities!"

# ==============================================================================
# Laravel Framework Targets
# ==============================================================================
build-laravel:
	@echo "==> Building Laravel (PHP $(LARAVEL_PHP_VERSION)) Alpine framework image..."
	docker build -t $(LARAVEL_IMAGE_TAG) \
		--build-arg PHP_VERSION=$(LARAVEL_PHP_VERSION) \
		--build-arg BASE_IMAGE=$(LARAVEL_BASE_IMAGE) \
		-f $(LARAVEL_DOCKERFILE) $(LARAVEL_BUILD_CONTEXT)

build-laravel-all:
	@echo "==> Building all Laravel PHP versions: $(LARAVEL_VERSIONS)..."
	@for v in $(LARAVEL_VERSIONS); do \
		echo "===> Building Laravel PHP $$v..."; \
		docker build -t local/laravel:$$v-test \
			--build-arg PHP_VERSION=$$v \
			--build-arg BASE_IMAGE=local/php:$$v-test \
			-f $(LARAVEL_DOCKERFILE) $(LARAVEL_BUILD_CONTEXT) || exit 1; \
	done
	@echo "==> All Laravel framework images built successfully!"

test-laravel:
	@echo "==> 1. Testing direct CLI execution and extensions for $(LARAVEL_IMAGE_TAG)..."
	@UID_VAL=$$(docker run --rm $(LARAVEL_IMAGE_TAG) id -u); \
	if [ "$$UID_VAL" != "10001" ]; then \
		echo "Security failure: Process running as UID $$UID_VAL (expected 10001)"; \
		exit 1; \
	fi; \
	echo "Verified UID: $$UID_VAL (appuser)"
	@docker run --rm $(LARAVEL_IMAGE_TAG) php -m | grep -q "pcntl" || { echo "Missing pcntl extension!"; exit 1; }
	@docker run --rm $(LARAVEL_IMAGE_TAG) php -m | grep -q "exif" || { echo "Missing exif extension!"; exit 1; }
	@docker run --rm $(LARAVEL_IMAGE_TAG) composer --version > /dev/null || { echo "Composer failed!"; exit 1; }
	@docker run --rm $(LARAVEL_IMAGE_TAG) node -v > /dev/null || { echo "Node.js failed!"; exit 1; }
	@docker run --rm $(LARAVEL_IMAGE_TAG) npm -v > /dev/null || { echo "npm failed!"; exit 1; }
	@echo "Verified: pcntl, exif, Composer v2, Node.js, and npm"

	@echo "==> 2. Testing Web Role (HTTP 8080 & /healthz)..."
	@docker rm -f $(LARAVEL_CONTAINER_NAME)-web 2>/dev/null || true
	@docker run -d --name $(LARAVEL_CONTAINER_NAME)-web -p $(LARAVEL_TEST_PORT):8080 $(LARAVEL_IMAGE_TAG)
	@READY=0; \
	for i in {1..15}; do \
		if curl -sf http://127.0.0.1:$(LARAVEL_TEST_PORT)/healthz > /dev/null 2>&1; then \
			READY=1; \
			break; \
		fi; \
		sleep 1; \
	done; \
	if [ $$READY -ne 1 ]; then \
		echo "Web container failed to start!"; \
		docker logs $(LARAVEL_CONTAINER_NAME)-web; \
		docker rm -f $(LARAVEL_CONTAINER_NAME)-web; \
		exit 1; \
	fi
	@curl -fsS http://127.0.0.1:$(LARAVEL_TEST_PORT)/ | grep -q '"framework": "Laravel Base Image"' || { \
		echo "Root JSON health check failed!"; \
		docker logs $(LARAVEL_CONTAINER_NAME)-web; \
		docker rm -f $(LARAVEL_CONTAINER_NAME)-web; \
		exit 1; \
	}
	@docker rm -f $(LARAVEL_CONTAINER_NAME)-web > /dev/null
	@echo "Verified: Web Role (Nginx + PHP-FPM) healthy"

	@echo "==> 3. Testing Worker Role (CONTAINER_ROLE=worker)..."
	@docker rm -f $(LARAVEL_CONTAINER_NAME)-worker 2>/dev/null || true
	@docker run -d --name $(LARAVEL_CONTAINER_NAME)-worker -e CONTAINER_ROLE=worker -e LARAVEL_QUEUE_NUMPROCS=3 $(LARAVEL_IMAGE_TAG)
	@sleep 3
	@docker exec $(LARAVEL_CONTAINER_NAME)-worker ps aux | grep -q "queue:work" || { \
		echo "Worker process not running!"; \
		docker logs $(LARAVEL_CONTAINER_NAME)-worker; \
		docker rm -f $(LARAVEL_CONTAINER_NAME)-worker; \
		exit 1; \
	}
	@if docker exec $(LARAVEL_CONTAINER_NAME)-worker ps aux | grep -v grep | grep -E "nginx|php-fpm"; then \
		echo "Isolation error: Nginx or PHP-FPM running in worker role!"; \
		docker rm -f $(LARAVEL_CONTAINER_NAME)-worker; \
		exit 1; \
	fi
	@docker rm -f $(LARAVEL_CONTAINER_NAME)-worker > /dev/null
	@echo "Verified: Worker Role (Supervisor queue:work, no web server)"

	@echo "==> 4. Testing Scheduler Role (CONTAINER_ROLE=scheduler)..."
	@docker rm -f $(LARAVEL_CONTAINER_NAME)-scheduler 2>/dev/null || true
	@docker run -d --name $(LARAVEL_CONTAINER_NAME)-scheduler -e CONTAINER_ROLE=scheduler $(LARAVEL_IMAGE_TAG)
	@sleep 3
	@docker exec $(LARAVEL_CONTAINER_NAME)-scheduler ps aux | grep -q "laravel-scheduler" || { \
		echo "Scheduler process not running!"; \
		docker logs $(LARAVEL_CONTAINER_NAME)-scheduler; \
		docker rm -f $(LARAVEL_CONTAINER_NAME)-scheduler; \
		exit 1; \
	}
	@if docker exec $(LARAVEL_CONTAINER_NAME)-scheduler ps aux | grep -v grep | grep -E "nginx|php-fpm"; then \
		echo "Isolation error: Nginx or PHP-FPM running in scheduler role!"; \
		docker rm -f $(LARAVEL_CONTAINER_NAME)-scheduler; \
		exit 1; \
	fi
	@docker rm -f $(LARAVEL_CONTAINER_NAME)-scheduler > /dev/null
	@echo "Verified: Scheduler Role (cron daemon, no web server)"
	@echo "==> All Laravel framework tests passed successfully!"

scan-laravel:
	@echo "==> Running Aqua Trivy scanner for $(LARAVEL_IMAGE_TAG)..."
	@if command -v trivy > /dev/null 2>&1 && trivy image --version > /dev/null 2>&1 && [ ! -d "/snap" ]; then \
		trivy image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(LARAVEL_IMAGE_TAG); \
	else \
		docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(LARAVEL_IMAGE_TAG); \
	fi
	@echo "==> Trivy scan passed for $(LARAVEL_IMAGE_TAG)!"

# ==============================================================================
# Node.js Language Targets
# ==============================================================================
build-node:
	@echo "==> Building Node.js $(NODE_VERSION) Alpine base image..."
	docker build --build-arg NODE_VERSION=$(NODE_VERSION) -t $(NODE_IMAGE_TAG) -f $(NODE_DOCKERFILE) $(NODE_BUILD_CONTEXT)

build-node-all:
	@echo "==> Building all Node.js versions: $(NODE_VERSIONS)..."
	@for v in $(NODE_VERSIONS); do \
		echo "===> Building Node.js $$v..."; \
		docker build --build-arg NODE_VERSION=$$v -t local/node:$$v-test -f $(NODE_DOCKERFILE) $(NODE_BUILD_CONTEXT) || exit 1; \
	done
	@echo "==> All Node.js base images built successfully!"

test-node:
	@echo "==> Testing runtime environment for $(NODE_IMAGE_TAG)..."
	@docker rm -f $(NODE_CONTAINER_NAME) 2>/dev/null || true
	@docker run -d --name $(NODE_CONTAINER_NAME) -p $(NODE_TEST_PORT):8080 $(NODE_IMAGE_TAG)
	@echo "Waiting for container services to start..."
	@for i in {1..15}; do \
		if curl -sf http://127.0.0.1:$(NODE_TEST_PORT)/ > /dev/null 2>&1; then \
			echo "Container is ready."; \
			break; \
		fi; \
		sleep 1; \
	done
	@echo "==> Verifying HTTP response..."
	@curl -fsS http://127.0.0.1:$(NODE_TEST_PORT)/ | grep -q '"status":"healthy"' || curl -fsS http://127.0.0.1:$(NODE_TEST_PORT)/ | grep -q '"status": "healthy"' || { \
		echo "Health verification failed!"; \
		docker logs $(NODE_CONTAINER_NAME); \
		docker rm -f $(NODE_CONTAINER_NAME); \
		exit 1; \
	}
	@echo "==> Verifying non-root execution (UID 10001)..."
	@UID_CHECK=$$(docker exec $(NODE_CONTAINER_NAME) id -u); \
	if [ "$$UID_CHECK" != "10001" ]; then \
		echo "Security violation: Process running as UID $$UID_CHECK (expected 10001)"; \
		docker rm -f $(NODE_CONTAINER_NAME); \
		exit 1; \
	fi; \
	echo "Verified UID: $$UID_CHECK (appuser)"
	@docker rm -f $(NODE_CONTAINER_NAME) > /dev/null
	@echo "==> Runtime test for $(NODE_IMAGE_TAG) passed successfully!"

test-node-all:
	@echo "==> Testing runtime environments for all Node.js versions..."
	@for v in $(NODE_VERSIONS); do \
		echo "===> Testing Node.js $$v..."; \
		C_NAME="$(NODE_CONTAINER_NAME)-$$v"; \
		docker rm -f $$C_NAME 2>/dev/null || true; \
		docker run -d --name $$C_NAME -p $(NODE_TEST_PORT):8080 local/node:$$v-test || exit 1; \
		READY=0; \
		for i in {1..15}; do \
			if curl -sf http://127.0.0.1:$(NODE_TEST_PORT)/ > /dev/null 2>&1; then \
				READY=1; \
				break; \
			fi; \
			sleep 1; \
		done; \
		if [ $$READY -ne 1 ]; then \
			echo "Container for Node.js $$v failed to start within 15 seconds!"; \
			docker logs $$C_NAME; \
			docker rm -f $$C_NAME; \
			exit 1; \
		fi; \
		curl -fsS http://127.0.0.1:$(NODE_TEST_PORT)/ | grep -q 'healthy' || { \
			echo "Health check failed for Node.js $$v!"; \
			docker logs $$C_NAME; \
			docker rm -f $$C_NAME; \
			exit 1; \
		}; \
		UID_CHECK=$$(docker exec $$C_NAME id -u); \
		if [ "$$UID_CHECK" != "10001" ]; then \
			echo "Security violation in Node.js $$v: running as UID $$UID_CHECK"; \
			docker rm -f $$C_NAME; \
			exit 1; \
		fi; \
		echo "Verified Node.js $$v: UID $$UID_CHECK"; \
		docker rm -f $$C_NAME > /dev/null; \
	done
	@echo "==> All Node.js runtime tests passed successfully!"

scan-node:
	@echo "==> Running Aqua Trivy vulnerability scanner for $(NODE_IMAGE_TAG)..."
	@if command -v trivy > /dev/null 2>&1 && trivy image --version > /dev/null 2>&1 && [ ! -d "/snap" ]; then \
		trivy image --severity CRITICAL,HIGH --ignore-unfixed --ignorefile .trivyignore --exit-code 1 $(NODE_IMAGE_TAG); \
	else \
		docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$$(pwd)/.trivyignore:/.trivyignore:ro" aquasec/trivy:latest image --severity CRITICAL,HIGH --ignore-unfixed --ignorefile /.trivyignore --exit-code 1 $(NODE_IMAGE_TAG); \
	fi
	@echo "==> Trivy scan passed for $(NODE_IMAGE_TAG)!"

# ==============================================================================
# Bun Language Targets
# ==============================================================================
build-bun:
	@echo "==> Building Bun $(BUN_VERSION) Alpine base image..."
	docker build --build-arg BUN_VERSION=$(BUN_VERSION) -t $(BUN_IMAGE_TAG) -f $(BUN_DOCKERFILE) $(BUN_BUILD_CONTEXT)

build-bun-all:
	@echo "==> Building all Bun versions: $(BUN_VERSIONS)..."
	@for v in $(BUN_VERSIONS); do \
		echo "===> Building Bun $$v..."; \
		docker build --build-arg BUN_VERSION=$$v -t local/bun:$$v-test -f $(BUN_DOCKERFILE) $(BUN_BUILD_CONTEXT) || exit 1; \
	done
	@echo "==> All Bun base images built successfully!"

test-bun:
	@echo "==> Testing runtime environment for $(BUN_IMAGE_TAG)..."
	@docker rm -f $(BUN_CONTAINER_NAME) 2>/dev/null || true
	@docker run -d --name $(BUN_CONTAINER_NAME) -p $(BUN_TEST_PORT):8080 $(BUN_IMAGE_TAG)
	@echo "Waiting for container services to start..."
	@for i in {1..15}; do \
		if curl -sf http://127.0.0.1:$(BUN_TEST_PORT)/ > /dev/null 2>&1; then \
			echo "Container is ready."; \
			break; \
		fi; \
		sleep 1; \
	done
	@echo "==> Verifying HTTP response..."
	@curl -fsS http://127.0.0.1:$(BUN_TEST_PORT)/ | grep -q '"status":"healthy"' || curl -fsS http://127.0.0.1:$(BUN_TEST_PORT)/ | grep -q '"status": "healthy"' || { \
		echo "Health verification failed!"; \
		docker logs $(BUN_CONTAINER_NAME); \
		docker rm -f $(BUN_CONTAINER_NAME); \
		exit 1; \
	}
	@echo "==> Verifying non-root execution (UID 10001)..."
	@UID_CHECK=$$(docker exec $(BUN_CONTAINER_NAME) id -u); \
	if [ "$$UID_CHECK" != "10001" ]; then \
		echo "Security violation: Process running as UID $$UID_CHECK (expected 10001)"; \
		docker rm -f $(BUN_CONTAINER_NAME); \
		exit 1; \
	fi; \
	echo "Verified UID: $$UID_CHECK (appuser)"
	@docker rm -f $(BUN_CONTAINER_NAME) > /dev/null
	@echo "==> Runtime test for $(BUN_IMAGE_TAG) passed successfully!"

test-bun-all:
	@echo "==> Testing runtime environments for all Bun versions..."
	@for v in $(BUN_VERSIONS); do \
		echo "===> Testing Bun $$v..."; \
		C_NAME="$(BUN_CONTAINER_NAME)-$$v"; \
		docker rm -f $$C_NAME 2>/dev/null || true; \
		docker run -d --name $$C_NAME -p $(BUN_TEST_PORT):8080 local/bun:$$v-test || exit 1; \
		READY=0; \
		for i in {1..15}; do \
			if curl -sf http://127.0.0.1:$(BUN_TEST_PORT)/ > /dev/null 2>&1; then \
				READY=1; \
				break; \
			fi; \
			sleep 1; \
		done; \
		if [ $$READY -ne 1 ]; then \
			echo "Container for Bun $$v failed to start within 15 seconds!"; \
			docker logs $$C_NAME; \
			docker rm -f $$C_NAME; \
			exit 1; \
		fi; \
		curl -fsS http://127.0.0.1:$(BUN_TEST_PORT)/ | grep -q 'healthy' || { \
			echo "Health check failed for Bun $$v!"; \
			docker logs $$C_NAME; \
			docker rm -f $$C_NAME; \
			exit 1; \
		}; \
		UID_CHECK=$$(docker exec $$C_NAME id -u); \
		if [ "$$UID_CHECK" != "10001" ]; then \
			echo "Security violation in Bun $$v: running as UID $$UID_CHECK"; \
			docker rm -f $$C_NAME; \
			exit 1; \
		fi; \
		echo "Verified Bun $$v: UID $$UID_CHECK"; \
		docker rm -f $$C_NAME > /dev/null; \
	done
	@echo "==> All Bun runtime tests passed successfully!"

scan-bun:
	@echo "==> Running Aqua Trivy vulnerability scanner for $(BUN_IMAGE_TAG)..."
	@if command -v trivy > /dev/null 2>&1 && trivy image --version > /dev/null 2>&1 && [ ! -d "/snap" ]; then \
		trivy image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(BUN_IMAGE_TAG); \
	else \
		docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(BUN_IMAGE_TAG); \
	fi
	@echo "==> Trivy scan passed for $(BUN_IMAGE_TAG)!"

# ==============================================================================
# Python Language Targets
# ==============================================================================
build-python:
	@echo "==> Building Python $(PYTHON_VERSION) Slim base image..."
	docker build --build-arg PYTHON_VERSION=$(PYTHON_VERSION) -t $(PYTHON_IMAGE_TAG) -f $(PYTHON_DOCKERFILE) $(PYTHON_BUILD_CONTEXT)

build-python-all:
	@echo "==> Building all Python versions: $(PYTHON_VERSIONS)..."
	@for v in $(PYTHON_VERSIONS); do \
		echo "===> Building Python $$v..."; \
		docker build --build-arg PYTHON_VERSION=$$v -t local/python:$$v-test -f $(PYTHON_DOCKERFILE) $(PYTHON_BUILD_CONTEXT) || exit 1; \
	done
	@echo "==> All Python base images built successfully!"

test-python:
	@echo "==> Testing runtime environment for $(PYTHON_IMAGE_TAG)..."
	@docker rm -f $(PYTHON_CONTAINER_NAME) 2>/dev/null || true
	@docker run -d --name $(PYTHON_CONTAINER_NAME) -p $(PYTHON_TEST_PORT):8080 $(PYTHON_IMAGE_TAG)
	@echo "Waiting for container services to start..."
	@for i in {1..15}; do \
		if curl -sf http://127.0.0.1:$(PYTHON_TEST_PORT)/ > /dev/null 2>&1; then \
			echo "Container is ready."; \
			break; \
		fi; \
		sleep 1; \
	done
	@echo "==> Verifying HTTP response..."
	@curl -fsS http://127.0.0.1:$(PYTHON_TEST_PORT)/ | grep -q 'healthy' || { \
		echo "Health verification failed!"; \
		docker logs $(PYTHON_CONTAINER_NAME); \
		docker rm -f $(PYTHON_CONTAINER_NAME); \
		exit 1; \
	}
	@echo "==> Verifying non-root execution (UID 10001)..."
	@UID_CHECK=$$(docker exec $(PYTHON_CONTAINER_NAME) id -u); \
	if [ "$$UID_CHECK" != "10001" ]; then \
		echo "Security violation: Process running as UID $$UID_CHECK (expected 10001)"; \
		docker rm -f $(PYTHON_CONTAINER_NAME); \
		exit 1; \
	fi; \
	echo "Verified UID: $$UID_CHECK (appuser)"
	@docker rm -f $(PYTHON_CONTAINER_NAME) > /dev/null
	@echo "==> Runtime test for $(PYTHON_IMAGE_TAG) passed successfully!"

test-python-all:
	@echo "==> Testing runtime environments for all Python versions..."
	@for v in $(PYTHON_VERSIONS); do \
		echo "===> Testing Python $$v..."; \
		C_NAME="$(PYTHON_CONTAINER_NAME)-$$v"; \
		docker rm -f $$C_NAME 2>/dev/null || true; \
		docker run -d --name $$C_NAME -p $(PYTHON_TEST_PORT):8080 local/python:$$v-test || exit 1; \
		READY=0; \
		for i in {1..15}; do \
			if curl -sf http://127.0.0.1:$(PYTHON_TEST_PORT)/ > /dev/null 2>&1; then \
				READY=1; \
				break; \
			fi; \
			sleep 1; \
		done; \
		if [ $$READY -ne 1 ]; then \
			echo "Container for Python $$v failed to start within 15 seconds!"; \
			docker logs $$C_NAME; \
			docker rm -f $$C_NAME; \
			exit 1; \
		fi; \
		curl -fsS http://127.0.0.1:$(PYTHON_TEST_PORT)/ | grep -q 'healthy' || { \
			echo "Health check failed for Python $$v!"; \
			docker logs $$C_NAME; \
			docker rm -f $$C_NAME; \
			exit 1; \
		}; \
		UID_CHECK=$$(docker exec $$C_NAME id -u); \
		if [ "$$UID_CHECK" != "10001" ]; then \
			echo "Security violation in Python $$v: running as UID $$UID_CHECK"; \
			docker rm -f $$C_NAME; \
			exit 1; \
		fi; \
		echo "Verified Python $$v: UID $$UID_CHECK"; \
		docker rm -f $$C_NAME > /dev/null; \
	done
	@echo "==> All Python runtime tests passed successfully!"

scan-python:
	@echo "==> Running Aqua Trivy vulnerability scanner for $(PYTHON_IMAGE_TAG)..."
	@if command -v trivy > /dev/null 2>&1 && trivy image --version > /dev/null 2>&1 && [ ! -d "/snap" ]; then \
		trivy image --severity CRITICAL,HIGH --ignore-unfixed --ignorefile .trivyignore --exit-code 1 $(PYTHON_IMAGE_TAG); \
	else \
		docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$$(pwd)/.trivyignore:/.trivyignore:ro" aquasec/trivy:latest image --severity CRITICAL,HIGH --ignore-unfixed --ignorefile /.trivyignore --exit-code 1 $(PYTHON_IMAGE_TAG); \
	fi
	@echo "==> Trivy scan passed for $(PYTHON_IMAGE_TAG)!"

# ==============================================================================
# Go Language Targets
# ==============================================================================
build-go:
	@echo "==> Building Go $(GO_VERSION) Alpine base image..."
	docker build --build-arg GO_VERSION=$(GO_VERSION) -t $(GO_IMAGE_TAG) -f $(GO_DOCKERFILE) $(GO_BUILD_CONTEXT)

build-go-all:
	@echo "==> Building all Go versions: $(GO_VERSIONS)..."
	@for v in $(GO_VERSIONS); do \
		echo "===> Building Go $$v..."; \
		docker build --build-arg GO_VERSION=$$v -t local/go:$$v-test -f $(GO_DOCKERFILE) $(GO_BUILD_CONTEXT) || exit 1; \
	done
	@echo "==> All Go base images built successfully!"

test-go:
	@echo "==> Testing runtime environment for $(GO_IMAGE_TAG)..."
	@docker rm -f $(GO_CONTAINER_NAME) 2>/dev/null || true
	@docker run -d --name $(GO_CONTAINER_NAME) -p $(GO_TEST_PORT):8080 $(GO_IMAGE_TAG)
	@READY=0; \
	for i in {1..15}; do \
		if curl -sf http://127.0.0.1:$(GO_TEST_PORT)/ > /dev/null 2>&1; then \
			READY=1; \
			break; \
		fi; \
		sleep 1; \
	done; \
	if [ $$READY -ne 1 ]; then \
		echo "Container failed to start within 15 seconds!"; \
		docker logs $(GO_CONTAINER_NAME); \
		docker rm -f $(GO_CONTAINER_NAME); \
		exit 1; \
	fi
	curl -fsS http://127.0.0.1:$(GO_TEST_PORT)/ | grep -q 'healthy' || { \
		echo "Health check failed!"; \
		docker logs $(GO_CONTAINER_NAME); \
		docker rm -f $(GO_CONTAINER_NAME); \
		exit 1; \
	}
	@UID_CHECK=$$(docker exec $(GO_CONTAINER_NAME) id -u); \
	if [ "$$UID_CHECK" != "10001" ]; then \
		echo "Security violation: Process running as UID $$UID_CHECK (expected 10001)"; \
		docker rm -f $(GO_CONTAINER_NAME); \
		exit 1; \
	fi; \
	echo "Verified UID: $$UID_CHECK (appuser)"
	@docker rm -f $(GO_CONTAINER_NAME) > /dev/null
	@echo "==> Runtime test for $(GO_IMAGE_TAG) passed successfully!"

test-go-all:
	@echo "==> Testing runtime environments for all Go versions..."
	@for v in $(GO_VERSIONS); do \
		echo "===> Testing Go $$v..."; \
		C_NAME="$(GO_CONTAINER_NAME)-$$v"; \
		docker rm -f $$C_NAME 2>/dev/null || true; \
		docker run -d --name $$C_NAME -p $(GO_TEST_PORT):8080 local/go:$$v-test || exit 1; \
		READY=0; \
		for i in {1..15}; do \
			if curl -sf http://127.0.0.1:$(GO_TEST_PORT)/ > /dev/null 2>&1; then \
				READY=1; \
				break; \
			fi; \
			sleep 1; \
		done; \
		if [ $$READY -ne 1 ]; then \
			echo "Container for Go $$v failed to start within 15 seconds!"; \
			docker logs $$C_NAME; \
			docker rm -f $$C_NAME; \
			exit 1; \
		fi; \
		curl -fsS http://127.0.0.1:$(GO_TEST_PORT)/ | grep -q 'healthy' || { \
			echo "Health check failed for Go $$v!"; \
			docker logs $$C_NAME; \
			docker rm -f $$C_NAME; \
			exit 1; \
		}; \
		UID_CHECK=$$(docker exec $$C_NAME id -u); \
		if [ "$$UID_CHECK" != "10001" ]; then \
			echo "Security violation in Go $$v: running as UID $$UID_CHECK"; \
			docker rm -f $$C_NAME; \
			exit 1; \
		fi; \
		echo "Verified Go $$v: UID $$UID_CHECK"; \
		docker rm -f $$C_NAME > /dev/null; \
	done
	@echo "==> All Go runtime tests passed successfully!"

scan-go:
	@echo "==> Running Aqua Trivy vulnerability scanner for $(GO_IMAGE_TAG)..."
	@if command -v trivy > /dev/null 2>&1 && trivy image --version > /dev/null 2>&1 && [ ! -d "/snap" ]; then \
		trivy image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(GO_IMAGE_TAG); \
	else \
		docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(GO_IMAGE_TAG); \
	fi
	@echo "==> Trivy scan passed for $(GO_IMAGE_TAG)!"

# ==============================================================================
# Java Language Targets
# ==============================================================================
build-java:
	@echo "==> Building Java $(JAVA_VERSION) Alpine base image..."
	docker build --build-arg JAVA_VERSION=$(JAVA_VERSION) -t $(JAVA_IMAGE_TAG) -f $(JAVA_DOCKERFILE) $(JAVA_BUILD_CONTEXT)

build-java-all:
	@echo "==> Building all Java versions: $(JAVA_VERSIONS)..."
	@for v in $(JAVA_VERSIONS); do \
		echo "===> Building Java $$v..."; \
		docker build --build-arg JAVA_VERSION=$$v -t local/java:$$v-test -f $(JAVA_DOCKERFILE) $(JAVA_BUILD_CONTEXT) || exit 1; \
	done
	@echo "==> All Java base images built successfully!"

test-java:
	@echo "==> Testing runtime environment for $(JAVA_IMAGE_TAG)..."
	@docker rm -f $(JAVA_CONTAINER_NAME) 2>/dev/null || true
	@docker run -d --name $(JAVA_CONTAINER_NAME) -p $(JAVA_TEST_PORT):8080 $(JAVA_IMAGE_TAG)
	@READY=0; \
	for i in {1..15}; do \
		if curl -sf http://127.0.0.1:$(JAVA_TEST_PORT)/ > /dev/null 2>&1; then \
			READY=1; \
			break; \
		fi; \
		sleep 1; \
	done; \
	if [ $$READY -ne 1 ]; then \
		echo "Container failed to start within 15 seconds!"; \
		docker logs $(JAVA_CONTAINER_NAME); \
		docker rm -f $(JAVA_CONTAINER_NAME); \
		exit 1; \
	fi
	curl -fsS http://127.0.0.1:$(JAVA_TEST_PORT)/ | grep -q 'healthy' || { \
		echo "Health check failed!"; \
		docker logs $(JAVA_CONTAINER_NAME); \
		docker rm -f $(JAVA_CONTAINER_NAME); \
		exit 1; \
	}
	@UID_CHECK=$$(docker exec $(JAVA_CONTAINER_NAME) id -u); \
	if [ "$$UID_CHECK" != "10001" ]; then \
		echo "Security violation: Process running as UID $$UID_CHECK (expected 10001)"; \
		docker rm -f $(JAVA_CONTAINER_NAME); \
		exit 1; \
	fi; \
	echo "Verified UID: $$UID_CHECK (appuser)"
	@docker rm -f $(JAVA_CONTAINER_NAME) > /dev/null
	@echo "==> Runtime test for $(JAVA_IMAGE_TAG) passed successfully!"

test-java-all:
	@echo "==> Testing runtime environments for all Java versions..."
	@for v in $(JAVA_VERSIONS); do \
		echo "===> Testing Java $$v..."; \
		C_NAME="$(JAVA_CONTAINER_NAME)-$$v"; \
		docker rm -f $$C_NAME 2>/dev/null || true; \
		docker run -d --name $$C_NAME -p $(JAVA_TEST_PORT):8080 local/java:$$v-test || exit 1; \
		READY=0; \
		for i in {1..15}; do \
			if curl -sf http://127.0.0.1:$(JAVA_TEST_PORT)/ > /dev/null 2>&1; then \
				READY=1; \
				break; \
			fi; \
			sleep 1; \
		done; \
		if [ $$READY -ne 1 ]; then \
			echo "Container for Java $$v failed to start within 15 seconds!"; \
			docker logs $$C_NAME; \
			docker rm -f $$C_NAME; \
			exit 1; \
		fi; \
		curl -fsS http://127.0.0.1:$(JAVA_TEST_PORT)/ | grep -q 'healthy' || { \
			echo "Health check failed for Java $$v!"; \
			docker logs $$C_NAME; \
			docker rm -f $$C_NAME; \
			exit 1; \
		}; \
		UID_CHECK=$$(docker exec $$C_NAME id -u); \
		if [ "$$UID_CHECK" != "10001" ]; then \
			echo "Security violation in Java $$v: running as UID $$UID_CHECK"; \
			docker rm -f $$C_NAME; \
			exit 1; \
		fi; \
		echo "Verified Java $$v: UID $$UID_CHECK"; \
		docker rm -f $$C_NAME > /dev/null; \
	done
	@echo "==> All Java runtime tests passed successfully!"

scan-java:
	@echo "==> Running Aqua Trivy vulnerability scanner for $(JAVA_IMAGE_TAG)..."
	@if command -v trivy > /dev/null 2>&1 && trivy image --version > /dev/null 2>&1 && [ ! -d "/snap" ]; then \
		trivy image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(JAVA_IMAGE_TAG); \
	else \
		docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(JAVA_IMAGE_TAG); \
	fi
	@echo "==> Trivy scan passed for $(JAVA_IMAGE_TAG)!"

# ==============================================================================
# Next.js Framework Targets
# ==============================================================================
build-nextjs:
	@echo "==> Building Next.js (Node $(NEXTJS_NODE_VERSION)) Alpine framework image..."
	docker build -t $(NEXTJS_IMAGE_TAG) \
		--build-arg NODE_VERSION=$(NEXTJS_NODE_VERSION) \
		--build-arg BASE_IMAGE=$(NEXTJS_BASE_IMAGE) \
		-f $(NEXTJS_DOCKERFILE) $(NEXTJS_BUILD_CONTEXT)

build-nextjs-all:
	@echo "==> Building all Next.js Node versions: $(NEXTJS_VERSIONS)..."
	@for v in $(NEXTJS_VERSIONS); do \
		echo "===> Building Next.js Node $$v..."; \
		docker build -t local/nextjs:$$v-test \
			--build-arg NODE_VERSION=$$v \
			--build-arg BASE_IMAGE=local/node:$$v-test \
			-f $(NEXTJS_DOCKERFILE) $(NEXTJS_BUILD_CONTEXT) || exit 1; \
	done
	@echo "==> All Next.js framework images built successfully!"

test-nextjs:
	@echo "==> Testing runtime environment for $(NEXTJS_IMAGE_TAG)..."
	@docker rm -f $(NEXTJS_CONTAINER_NAME) 2>/dev/null || true
	@docker run -d --name $(NEXTJS_CONTAINER_NAME) -p $(NEXTJS_TEST_PORT):8080 $(NEXTJS_IMAGE_TAG)
	@echo "Waiting for container services to start..."
	@for i in {1..15}; do \
		if curl -sf http://127.0.0.1:$(NEXTJS_TEST_PORT)/ > /dev/null 2>&1; then \
			echo "Container is ready."; \
			break; \
		fi; \
		sleep 1; \
	done
	@echo "==> Verifying HTTP response..."
	@curl -fsS http://127.0.0.1:$(NEXTJS_TEST_PORT)/ | grep -q '"framework":"Next.js Standalone Runner"' || curl -fsS http://127.0.0.1:$(NEXTJS_TEST_PORT)/ | grep -q '"framework": "Next.js Standalone Runner"' || { \
		echo "Health verification failed!"; \
		docker logs $(NEXTJS_CONTAINER_NAME); \
		docker rm -f $(NEXTJS_CONTAINER_NAME); \
		exit 1; \
	}
	@echo "==> Verifying non-root execution (UID 10001)..."
	@UID_CHECK=$$(docker exec $(NEXTJS_CONTAINER_NAME) id -u); \
	if [ "$$UID_CHECK" != "10001" ]; then \
		echo "Security violation: Process running as UID $$UID_CHECK (expected 10001)"; \
		docker rm -f $(NEXTJS_CONTAINER_NAME); \
		exit 1; \
	fi; \
	echo "Verified UID: $$UID_CHECK (appuser)"
	@docker rm -f $(NEXTJS_CONTAINER_NAME) > /dev/null
	@echo "==> Runtime test for $(NEXTJS_IMAGE_TAG) passed successfully!"

test-nextjs-all:
	@echo "==> Testing runtime environments for all Next.js versions..."
	@for v in $(NEXTJS_VERSIONS); do \
		echo "===> Testing Next.js Node $$v..."; \
		C_NAME="$(NEXTJS_CONTAINER_NAME)-$$v"; \
		docker rm -f $$C_NAME 2>/dev/null || true; \
		docker run -d --name $$C_NAME -p $(NEXTJS_TEST_PORT):8080 local/nextjs:$$v-test || exit 1; \
		READY=0; \
		for i in {1..15}; do \
			if curl -sf http://127.0.0.1:$(NEXTJS_TEST_PORT)/ > /dev/null 2>&1; then \
				READY=1; \
				break; \
			fi; \
			sleep 1; \
		done; \
		if [ $$READY -ne 1 ]; then \
			echo "Container for Next.js Node $$v failed to start within 15 seconds!"; \
			docker logs $$C_NAME; \
			docker rm -f $$C_NAME; \
			exit 1; \
		fi; \
		curl -fsS http://127.0.0.1:$(NEXTJS_TEST_PORT)/ | grep -q 'Next.js Standalone Runner' || { \
			echo "Health check failed for Next.js Node $$v!"; \
			docker logs $$C_NAME; \
			docker rm -f $$C_NAME; \
			exit 1; \
		}; \
		UID_CHECK=$$(docker exec $$C_NAME id -u); \
		if [ "$$UID_CHECK" != "10001" ]; then \
			echo "Security violation in Next.js Node $$v: running as UID $$UID_CHECK"; \
			docker rm -f $$C_NAME; \
			exit 1; \
		fi; \
		echo "Verified Next.js Node $$v: UID $$UID_CHECK"; \
		docker rm -f $$C_NAME > /dev/null; \
	done
	@echo "==> All Next.js runtime tests passed successfully!"

scan-nextjs:
	@echo "==> Running Aqua Trivy scanner for $(NEXTJS_IMAGE_TAG)..."
	@if command -v trivy > /dev/null 2>&1 && trivy image --version > /dev/null 2>&1 && [ ! -d "/snap" ]; then \
		trivy image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(NEXTJS_IMAGE_TAG); \
	else \
		docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(NEXTJS_IMAGE_TAG); \
	fi
	@echo "==> Trivy scan passed for $(NEXTJS_IMAGE_TAG)!"

# ==============================================================================
# Vite Framework Targets
# ==============================================================================
build-vite:
	@echo "==> Building Vite Nginx Alpine framework image..."
	docker build -t $(VITE_IMAGE_TAG) -f $(VITE_DOCKERFILE) $(VITE_BUILD_CONTEXT)

test-vite:
	@echo "==> Testing runtime environment for $(VITE_IMAGE_TAG)..."
	@docker rm -f $(VITE_CONTAINER_NAME) 2>/dev/null || true
	@docker run -d --name $(VITE_CONTAINER_NAME) -p $(VITE_TEST_PORT):8080 $(VITE_IMAGE_TAG)
	@echo "Waiting for Nginx to start..."
	@for i in {1..15}; do \
		if curl -sf http://127.0.0.1:$(VITE_TEST_PORT)/healthz > /dev/null 2>&1; then \
			echo "Container is ready."; \
			break; \
		fi; \
		sleep 1; \
	done
	@echo "==> Verifying HTTP response & healthcheck..."
	@curl -fsS http://127.0.0.1:$(VITE_TEST_PORT)/ | grep -q 'Vite Static Runner' || { \
		echo "Root verification failed!"; \
		docker logs $(VITE_CONTAINER_NAME); \
		docker rm -f $(VITE_CONTAINER_NAME); \
		exit 1; \
	}
	@curl -fsS http://127.0.0.1:$(VITE_TEST_PORT)/healthz | grep -q 'Vite Static' || { \
		echo "Healthz verification failed!"; \
		docker logs $(VITE_CONTAINER_NAME); \
		docker rm -f $(VITE_CONTAINER_NAME); \
		exit 1; \
	}
	@echo "==> Verifying non-root execution (UID 10001)..."
	@UID_CHECK=$$(docker exec $(VITE_CONTAINER_NAME) id -u); \
	if [ "$$UID_CHECK" != "10001" ]; then \
		echo "Security violation: Process running as UID $$UID_CHECK (expected 10001)"; \
		docker rm -f $(VITE_CONTAINER_NAME); \
		exit 1; \
	fi; \
	echo "Verified UID: $$UID_CHECK (appuser)"
	@docker rm -f $(VITE_CONTAINER_NAME) > /dev/null
	@echo "==> Runtime test for $(VITE_IMAGE_TAG) passed successfully!"

scan-vite:
	@echo "==> Running Aqua Trivy scanner for $(VITE_IMAGE_TAG)..."
	@if command -v trivy > /dev/null 2>&1 && trivy image --version > /dev/null 2>&1 && [ ! -d "/snap" ]; then \
		trivy image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(VITE_IMAGE_TAG); \
	else \
		docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(VITE_IMAGE_TAG); \
	fi
	@echo "==> Trivy scan passed for $(VITE_IMAGE_TAG)!"

# ==============================================================================
# NestJS Framework Targets
# ==============================================================================
build-nestjs:
	@echo "==> Building NestJS (Node $(NESTJS_NODE_VERSION)) Alpine framework image..."
	docker build -t $(NESTJS_IMAGE_TAG) \
		--build-arg NODE_VERSION=$(NESTJS_NODE_VERSION) \
		--build-arg BASE_IMAGE=$(NESTJS_BASE_IMAGE) \
		-f $(NESTJS_DOCKERFILE) $(NESTJS_BUILD_CONTEXT)

build-nestjs-all:
	@echo "==> Building all NestJS Node versions: $(NESTJS_VERSIONS)..."
	@for v in $(NESTJS_VERSIONS); do \
		echo "===> Building NestJS Node $$v..."; \
		docker build -t local/nestjs:$$v-test \
			--build-arg NODE_VERSION=$$v \
			--build-arg BASE_IMAGE=local/node:$$v-test \
			-f $(NESTJS_DOCKERFILE) $(NESTJS_BUILD_CONTEXT) || exit 1; \
	done
	@echo "==> All NestJS framework images built successfully!"

test-nestjs:
	@echo "==> Testing runtime environment for $(NESTJS_IMAGE_TAG)..."
	@docker rm -f $(NESTJS_CONTAINER_NAME) 2>/dev/null || true
	@docker run -d --name $(NESTJS_CONTAINER_NAME) -p $(NESTJS_TEST_PORT):8080 $(NESTJS_IMAGE_TAG)
	@echo "Waiting for container services to start..."
	@for i in {1..15}; do \
		if curl -sf http://127.0.0.1:$(NESTJS_TEST_PORT)/ > /dev/null 2>&1; then \
			echo "Container is ready."; \
			break; \
		fi; \
		sleep 1; \
	done
	@echo "==> Verifying HTTP response..."
	@curl -fsS http://127.0.0.1:$(NESTJS_TEST_PORT)/ | grep -q 'NestJS Base Image Runner' || { \
		echo "Health verification failed!"; \
		docker logs $(NESTJS_CONTAINER_NAME); \
		docker rm -f $(NESTJS_CONTAINER_NAME); \
		exit 1; \
	}
	@echo "==> Verifying non-root execution (UID 10001)..."
	@UID_CHECK=$$(docker exec $(NESTJS_CONTAINER_NAME) id -u); \
	if [ "$$UID_CHECK" != "10001" ]; then \
		echo "Security violation: Process running as UID $$UID_CHECK (expected 10001)"; \
		docker rm -f $(NESTJS_CONTAINER_NAME); \
		exit 1; \
	fi; \
	echo "Verified UID: $$UID_CHECK (appuser)"
	@docker rm -f $(NESTJS_CONTAINER_NAME) > /dev/null
	@echo "==> Runtime test for $(NESTJS_IMAGE_TAG) passed successfully!"

test-nestjs-all:
	@echo "==> Testing runtime environments for all NestJS versions..."
	@for v in $(NESTJS_VERSIONS); do \
		echo "===> Testing NestJS Node $$v..."; \
		C_NAME="$(NESTJS_CONTAINER_NAME)-$$v"; \
		docker rm -f $$C_NAME 2>/dev/null || true; \
		docker run -d --name $$C_NAME -p $(NESTJS_TEST_PORT):8080 local/nestjs:$$v-test || exit 1; \
		READY=0; \
		for i in {1..15}; do \
			if curl -sf http://127.0.0.1:$(NESTJS_TEST_PORT)/ > /dev/null 2>&1; then \
				READY=1; \
				break; \
			fi; \
			sleep 1; \
		done; \
		if [ $$READY -ne 1 ]; then \
			echo "Container for NestJS Node $$v failed to start within 15 seconds!"; \
			docker logs $$C_NAME; \
			docker rm -f $$C_NAME; \
			exit 1; \
		fi; \
		curl -fsS http://127.0.0.1:$(NESTJS_TEST_PORT)/ | grep -q 'NestJS Base Image Runner' || { \
			echo "Health check failed for NestJS Node $$v!"; \
			docker logs $$C_NAME; \
			docker rm -f $$C_NAME; \
			exit 1; \
		}; \
		UID_CHECK=$$(docker exec $$C_NAME id -u); \
		if [ "$$UID_CHECK" != "10001" ]; then \
			echo "Security violation in NestJS Node $$v: running as UID $$UID_CHECK"; \
			docker rm -f $$C_NAME; \
			exit 1; \
		fi; \
		echo "Verified NestJS Node $$v: UID $$UID_CHECK"; \
		docker rm -f $$C_NAME > /dev/null; \
	done
	@echo "==> All NestJS runtime tests passed successfully!"

scan-nestjs:
	@echo "==> Running Aqua Trivy scanner for $(NESTJS_IMAGE_TAG)..."
	@if command -v trivy > /dev/null 2>&1 && trivy image --version > /dev/null 2>&1 && [ ! -d "/snap" ]; then \
		trivy image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(NESTJS_IMAGE_TAG); \
	else \
		docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity CRITICAL,HIGH --ignore-unfixed --exit-code 1 $(NESTJS_IMAGE_TAG); \
	fi
	@echo "==> Trivy scan passed for $(NESTJS_IMAGE_TAG)!"

# ==============================================================================
# Upstream Observatory Target
# ==============================================================================
observatory:
	@echo "==> Running Upstream Template Observatory scan..."
	node scripts/upstream-observatory.js

# ==============================================================================
# Clean Target
# ==============================================================================
clean:
	@echo "==> Cleaning up test containers and images..."
	@docker rm -f $(CONTAINER_NAME) $(LARAVEL_CONTAINER_NAME)-web $(LARAVEL_CONTAINER_NAME)-worker $(LARAVEL_CONTAINER_NAME)-scheduler \
		$(NODE_CONTAINER_NAME) $(BUN_CONTAINER_NAME) $(NEXTJS_CONTAINER_NAME) $(VITE_CONTAINER_NAME) $(NESTJS_CONTAINER_NAME) 2>/dev/null || true
	@for v in $(PHP_VERSIONS); do \
		docker rm -f $(CONTAINER_NAME)-$$v 2>/dev/null || true; \
		docker rmi local/php:$$v-test 2>/dev/null || true; \
	done
	@for v in $(LARAVEL_VERSIONS); do \
		docker rmi local/laravel:$$v-test 2>/dev/null || true; \
	done
	@for v in $(NODE_VERSIONS); do \
		docker rm -f $(NODE_CONTAINER_NAME)-$$v 2>/dev/null || true; \
		docker rmi local/node:$$v-test 2>/dev/null || true; \
	done
	@for v in $(BUN_VERSIONS); do \
		docker rm -f $(BUN_CONTAINER_NAME)-$$v 2>/dev/null || true; \
		docker rmi local/bun:$$v-test 2>/dev/null || true; \
	done
	@for v in $(NEXTJS_VERSIONS); do \
		docker rm -f $(NEXTJS_CONTAINER_NAME)-$$v 2>/dev/null || true; \
		docker rmi local/nextjs:$$v-test 2>/dev/null || true; \
	done
	@for v in $(NESTJS_VERSIONS); do \
		docker rm -f $(NESTJS_CONTAINER_NAME)-$$v 2>/dev/null || true; \
		docker rmi local/nestjs:$$v-test 2>/dev/null || true; \
	done
	@docker rmi $(IMAGE_TAG) $(LARAVEL_IMAGE_TAG) $(NODE_IMAGE_TAG) $(BUN_IMAGE_TAG) $(NEXTJS_IMAGE_TAG) $(VITE_IMAGE_TAG) $(NESTJS_IMAGE_TAG) 2>/dev/null || true
	@echo "Clean completed."
